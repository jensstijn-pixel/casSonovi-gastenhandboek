/* =============================================================
   casSonovi — gastenhandboek
   Alle interacties zijn een extra: de pagina is zonder JS volledig
   leesbaar en de hulp- en wifisectie blijven bruikbaar.
   Bewust geen animaties (zie designhandoff).
   ============================================================= */
(function () {
  'use strict';

  var NAV_OFFSET = 56;          // scroll-offset onder de sticky nav
  var COPIED_MS  = 2500;        // hoe lang de kopieerbevestiging blijft staan
  var STORE_TASKS = 'casSonovi.vertrek';
  var STORE_LANG  = 'casSonovi.taal';
  var STORE_ACCESS = 'casSonovi.toegang';

  /* PLACEHOLDER: mock-upcode. De echte code komt van Norvin en hangt naast de QR-code.
     Dit is een drempel tegen per ongeluk delen, geen echte beveiliging: bij een statische
     site staat de code onvermijdelijk in de broncode. */
  var CODE = '1234';

  /* localStorage kan geblokkeerd zijn (privémodus). Nooit de pagina laten breken. */
  function load(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function save(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* stil negeren */ }
  }

  /* ---- nav: sprong naar sectie (instant, geen smooth scroll) ------------- */
  var chips = Array.prototype.slice.call(document.querySelectorAll('#chips button'));
  var sections = chips.map(function (c) { return document.getElementById(c.dataset.goto); });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var target = document.getElementById(chip.dataset.goto);
      if (target) window.scrollTo(0, target.offsetTop - NAV_OFFSET);
    });
  });

  /* ---- scroll-spy: laatste sectie boven scrollTop + 90 is actief --------- */
  var ticking = false;
  function spy() {
    var y = window.scrollY + 90;
    var active = 0;
    sections.forEach(function (sec, i) { if (sec && sec.offsetTop <= y) active = i; });

    /* Onderaan de pagina is de laatste sectie in beeld, ook al haalt hij de
       drempel hierboven niet. Zonder dit zou de laatste chip nooit oplichten. */
    var bodem = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    if (bodem) active = sections.length - 1;

    chips.forEach(function (c, i) {
      if (i === active) {
        c.setAttribute('aria-current', 'true');
        keepChipInView(c);
      } else {
        c.removeAttribute('aria-current');
      }
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(spy); }
  }, { passive: true });

  /* de actieve chip mag niet buiten beeld vallen in de scrollende chiprij */
  var chipRow = document.getElementById('chips');
  function keepChipInView(chip) {
    var left = chip.offsetLeft - 22;
    var right = chip.offsetLeft + chip.offsetWidth + 22;
    if (left < chipRow.scrollLeft) chipRow.scrollLeft = left;
    else if (right > chipRow.scrollLeft + chipRow.clientWidth) chipRow.scrollLeft = right - chipRow.clientWidth;
  }

  /* ---- accordeons: meerdere mogen tegelijk open, geen animatie ----------- */
  document.querySelectorAll('#acc-list .acc').forEach(function (acc) {
    var btn  = acc.querySelector('button');
    var body = acc.querySelector('.acc-body');
    var sign = acc.querySelector('.sign');
    btn.addEventListener('click', function () {
      var open = body.hidden;
      body.hidden = !open;
      btn.setAttribute('aria-expanded', String(open));
      sign.textContent = open ? '–' : '+';
    });
  });

  /* ---- kopiëren, met fallback voor oudere browsers ----------------------- */
  var copied = document.getElementById('copied');
  var copyTimer;

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* stil negeren */ }
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = document.getElementById(btn.dataset.copy);
      copyText(src ? src.textContent.trim() : '');
      copied.hidden = false;
      clearTimeout(copyTimer);
      copyTimer = setTimeout(function () { copied.hidden = true; }, COPIED_MS);
    });
  });

  /* ---- vertrekchecklist, bewaard in localStorage ------------------------- */
  var tasks = Array.prototype.slice.call(document.querySelectorAll('#tasks .task'));
  var done = {};
  try { done = JSON.parse(load(STORE_TASKS)) || {}; } catch (e) { done = {}; }

  function paintTask(task, on) {
    task.setAttribute('aria-pressed', String(on));
    task.querySelector('.box').textContent = on ? '✓' : '';
  }

  tasks.forEach(function (task) {
    if (done[task.dataset.task]) paintTask(task, true);
    task.addEventListener('click', function () {
      var on = task.getAttribute('aria-pressed') !== 'true';
      paintTask(task, on);
      if (on) done[task.dataset.task] = 1; else delete done[task.dataset.task];
      save(STORE_TASKS, JSON.stringify(done));
    });
  });

  /* ---- taalwissel -------------------------------------------------------
     In deze mock-up wisselt alleen de state; de Engelse teksten volgen later.
     De keuze wordt wel al bewaard, zoals in productie.                      */
  var notice = document.getElementById('en-notice');
  var langButtons = Array.prototype.slice.call(document.querySelectorAll('.lang button'));

  function setLang(lang) {
    langButtons.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    notice.hidden = lang !== 'en';
    save(STORE_LANG, lang);
  }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
  });

  var savedLang = load(STORE_LANG);
  if (savedLang === 'en') setLang('en');

  /* ---- toegangspoort -----------------------------------------------------
     Het handboek is verborgen tot de code klopt. Eenmaal open blijft het open
     op dit toestel, net als de checklist en de taalkeuze.                    */
  var gateForm  = document.getElementById('gate-form');
  var gateInput = document.getElementById('gate-code');
  var gateError = document.getElementById('gate-error');

  function unlock() {
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    /* Zolang het handboek verborgen was, is offsetTop van elke sectie 0 en klopt de
       actieve chip niet. Daarom hier opnieuw meten. */
    spy();
  }

  function tryCode() {
    if (gateInput.value.replace(/\s/g, '') !== CODE) {
      gateError.hidden = false;
      gateInput.value = '';
      gateInput.focus();
      return;
    }
    gateError.hidden = true;
    save(STORE_ACCESS, '1');
    unlock();
  }

  if (gateForm) {
    gateForm.addEventListener('submit', function (e) { e.preventDefault(); tryCode(); });

    gateInput.addEventListener('input', function () {
      /* alleen cijfers, en zodra er vier staan meteen controleren — scheelt een tik */
      var digits = gateInput.value.replace(/\D/g, '').slice(0, 4);
      if (digits !== gateInput.value) gateInput.value = digits;
      if (!gateError.hidden && digits.length < 4) gateError.hidden = true;
      if (digits.length === 4) tryCode();
    });

    if (load(STORE_ACCESS) === '1') unlock();
  } else {
    document.body.classList.remove('locked');   /* geen poort in de HTML: nooit dichtblijven */
  }

  spy();
})();
