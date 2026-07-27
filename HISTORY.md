# HISTORY — casSonovi gastenhandboek (Norvin-site)

Projectgeheugen. Nieuwste bovenaan.

## 2026-07-27 — mock-up gebouwd

**Wat er lag bij de start**

- `design_handoff_gastenhandboek_2A/` — designhandoff van Claude Design, richting 2A
  ("zonnig & gezellig"). High-fidelity: kleuren, typografie, spacing en interacties zijn
  definitief. `2A-reference.html` is de bron van waarheid voor maten en kleuren.
- `Foto's Aruba/` — zes foto's van de host, precies passend bij de zes fotoslots in het design.

**Gebouwd**

- Statische site: `index.html` + `assets/css/styles.css` + `assets/js/app.js`. Geen framework,
  geen build-stap. Draait met `python3 -m http.server 4321`.
- Alle acht secties uit het design nagebouwd, inclusief sticky sectienav met scroll-spy,
  accordeons, kopieerknoppen en de vertrekchecklist.
- Foto's gekoppeld: hero = "Foto volledige complex", host = Norvin, zwembad, strand =
  eagle beach, supermarkt = Super Food, eten = gasparito.

**Keuzes en waarom**

- **Geen framework.** Eén pagina met statische content. React/Next voegt hier alleen gewicht toe.
- **Content in de HTML, niet in JS.** De handoff eist dat hulp en wifi werken zonder JS —
  een gast moet 911 kunnen bellen als het script faalt. `content/content.nl.json` staat er wel
  in als één plek waar alle teksten samen staan, voor als de host later zelf wil wijzigen.
- **Fonts self-hosted** (112 KB, alleen latin-subsets). Scheelt round-trips op mobiel op Aruba.
- **JPEG in plaats van WebP.** `cwebp`/ImageMagick ontbraken op deze machine en `sips` kan geen
  WebP. Zes foto's samen ~600 KB. Bij livegang alsnog naar WebP omzetten.
- **Uitsnedes via `object-position` in CSS**, foto's zelf niet bijgesneden. Zo is een uitsnede
  bij te stellen zonder de foto opnieuw te bewerken.
- **Presentatieframe op groot scherm** (≥560px): afgeronde hoeken en schaduw om de 390px-kolom.
  Puur presentatie, verandert niets op de telefoon.

**Afwijkingen van de handoff (bewust)**

- *Scroll-spy laatste sectie.* In de referentie kan "Vertrek" nooit actief worden: onderaan de
  pagina haalt de sectie de drempel (`offsetTop <= scrollTop + 90`) niet meer. Toegevoegd: bij
  het bereiken van de paginabodem is de laatste chip actief.
- *Hostfoto.* De foto van Norvin heeft weinig ruimte boven zijn hoofd; `object-position` alleen
  volstond niet. Het beeld wordt in de ronde uitsnede geschaald en verschoven zodat zijn gezicht
  gecentreerd staat.

**Getest (zelf, in Chrome op localhost)**

- Accordeon open/dicht incl. +/– wisseling, meerdere tegelijk open.
- Kopieerknop: bevestiging verschijnt en verdwijnt na 2500 ms.
- Vertrekchecklist: aan/uit en blijft bewaard na herladen (localStorage).
- Taalwissel: EN-melding verschijnt, keuze blijft bewaard.
- Nav-chips: sprong naar sectie op exact `offsetTop - 56`, scroll-spy volgt, actieve chip
  scrollt mee in de chiprij.
- Console schoon, geen errors. Fonts en foto's laden.
- **Niet getest:** echte telefoon, iOS Safari, en het klembord zelf (alleen dat de knop de
  bevestiging toont — uitlezen van het klembord vraagt een permissieprompt).

**Openstaand — moet van Norvin komen**

1. Echte wifi-naam en wachtwoord (nu `casSonovi` / `welkom2026`).
2. Echte sleutelkastcode (nu `2814`).
3. Echt WhatsApp-nummer (nu `+297 592 4180`, op drie plekken in `index.html`).
4. Bevestiging van de in-/uitchecktijden.
5. Bevestiging van de tips voor strand, supermarkt en eten.
6. Engelse vertaling — de EN-knop werkt al, maar toont nu een melding.

**Valkuilen — bespaart de volgende sessie tijd**

- **Geen WebP-tool op deze Mac.** `cwebp`, ImageMagick en `magick` ontbreken, en `sips` kan
  wél JPEG maar géén WebP (`-s format webp` faalt). Wie WebP wil: eerst `brew install webp`.
- **`sips` kan alleen gecentreerd bijsnijden**, geen offset. Daarom zijn de foto's alleen
  geschaald en wordt de uitsnede in CSS bepaald met `object-position` per foto.
- **Google Fonts levert Nunito Sans als één variable-fontbestand** voor alle gewichten; de
  css2-API geeft dan vier identieke URL's terug. In `fonts.css` staat het daarom als één
  `@font-face` met `font-weight: 400 800`, niet als vier losse blokken.
- **De nav is 64px hoog, de scroll-offset uit de handoff is 56px.** Dat is geen fout: de
  sectiekop begint 4px onder de sectietop, dus er wordt niets zichtbaars afgesneden. Niet
  "fixen" zonder eerst te kijken.
- **Chrome laadt `loading="lazy"`-foto's niet in een achtergrondtab.** Bij het testen via de
  Chrome-extensie lijken foto's dan kapot (`naturalWidth === 0`) terwijl ze prima zijn. Een
  screenshot forceert een paint; dáárna pas meten.
- **Geen `requestAnimationFrame` of lange `setTimeout` in geëvalueerde JS** via de
  Chrome-extensie: die vuren niet in een achtergrondtab en de call loopt in een timeout van
  45s. Klik in de ene call, lees de state in een volgende.

**Hoe het draait**

- Lokaal: `python3 -m http.server 4321` in de projectmap → <http://127.0.0.1:4321>
- Repo: <https://github.com/jensstijn-pixel/casSonovi-gastenhandboek> (publiek)
- Live: <https://jensstijn-pixel.github.io/casSonovi-gastenhandboek/> (GitHub Pages, branch `main`,
  root). Push naar `main` = automatisch live, build duurt ~1 minuut.
- De pagina staat op `noindex`: publiek bereikbaar, maar niet vindbaar via Google. Jens heeft
  bewust gekozen voor een publieke repo zodat Pages werkt en de link deelbaar is.

**Ideeën voor later**

- QR-code genereren zodra er een definitieve URL is.
- Foto's naar WebP.
- Content uit `content.nl.json` laten renderen zodat de host teksten kan wijzigen zonder deploy.
