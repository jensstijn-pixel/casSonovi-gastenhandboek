# casSonovi — digitaal gastenhandboek

Eén scrollpagina die gasten van het vakantieappartement **casSonovi** (Noord, Aruba) via een
QR-code in de keuken openen. Doel: elk antwoord binnen twee tikken, in fel zonlicht of 's avonds
laat, met één hand te bedienen.

> **Status: mock-up.** Het ontwerp en alle interacties staan. Een deel van de inhoud is nog
> placeholder — zie [Nog in te vullen](#nog-in-te-vullen).

## Bekijken

Geen build-stap, geen dependencies. Puur HTML, CSS en een beetje JavaScript.

```bash
cd Norvin-site
python3 -m http.server 4321
```

Open daarna <http://127.0.0.1:4321>. Het handboek is ontworpen voor een telefoon (390px breed);
op een groot scherm staat de pagina gecentreerd in een frame — dat frame is alleen presentatie.

`index.html` direct openen (dubbelklikken) werkt ook, maar dan laden de self-hosted fonts niet.
Gebruik dus liever het commando hierboven.

## Wat er in zit

| Sectie | Wat de gast er vindt |
|---|---|
| Hulp nodig? | Host Norvin, WhatsApp-knoppen, en `tel:911` voor noodgevallen |
| Wifi | Netwerk en wachtwoord, met kopieerknoppen |
| Aankomst & vertrek | In-/uitchecktijden, sleutelkastje, parkeren |
| In huis | Vijf uitklapbare kaarten: zwembad, keuken, airco, wasgoed, apparaten |
| Huisregels | Vier korte regels |
| Ontdek de omgeving | Strand, supermarkt en eten, met foto |
| Voordat je vertrekt | Afvinklijst die onthouden wordt |

Verder: sticky sectienavigatie met scroll-spy, en een NL/EN-schakelaar (Engels volgt nog).

## Bestanden

```
index.html                  de hele pagina
assets/css/styles.css       alle styling, design tokens bovenaan
assets/css/fonts.css        @font-face voor de self-hosted fonts
assets/fonts/               DM Serif Display, Nunito Sans, IBM Plex Mono (woff2, latin)
assets/img/                 de zes foto's, geschaald en gecomprimeerd
assets/js/app.js            nav, accordeon, kopiëren, checklist, taalwissel
content/content.nl.json     alle Nederlandse teksten op één plek
design_handoff_gastenhandboek_2A/   de originele designhandoff (referentie)
Foto's Aruba/               de originele foto's van de host
```

## Keuzes

- **Statische site, geen framework.** Eén pagina met statische inhoud; React of Next.js zou hier
  alleen maar gewicht toevoegen. Draait zo op elke host, inclusief GitHub Pages.
- **Inhoud staat in de HTML, niet in JavaScript.** De hulp- en wifisectie moeten werken als JS
  faalt of traag laadt — een gast met een slechte verbinding moet 911 kunnen bellen. Alle
  interactie is een extra bovenop een pagina die zonder JS al compleet is.
- **Fonts self-hosted.** Scheelt DNS-lookups en round-trips naar Google op een mobiel netwerk op
  Aruba. Alleen de latin-subsets, samen 112 KB.
- **Foto's als JPEG.** Voor WebP was op deze machine geen tool beschikbaar; JPEG op de juiste maat
  komt hier dichtbij (~600 KB voor zes foto's). Bij een echte livegang alsnog naar WebP omzetten.
- **Geen animaties.** Bewuste designkeuze uit de handoff: geen transitions, geen smooth scroll.
- **Uitsnedes in CSS.** De foto's zijn niet bijgesneden maar op maat geschaald; per foto staat er
  een `object-position` in `styles.css`. Zo is een uitsnede bij te stellen zonder de foto opnieuw
  te bewerken.

## Nog in te vullen

Alles hieronder is placeholder of nog te bevestigen door Norvin. In `index.html` staat bij elk
punt een `<!-- PLACEHOLDER -->`-comment.

1. **Wifi-naam en wachtwoord** — nu `casSonovi` / `welkom2026`.
2. **Sleutelkastcode** — nu `2814`.
3. **WhatsApp-nummer** — nu `+297 592 4180`, staat op drie plekken.
4. **In- en uitchecktijden** — nu 12:00–01:00 en voor 15:00, overgenomen uit de briefing.
5. **Tips voor strand, supermarkt en eten** — plausibele Aruba-suggesties, nog niet bevestigd.
6. **Engelse vertaling** — de EN-knop werkt, maar toont nu alleen een melding.

## Nog niet gebouwd

Bewust buiten scope gehouden: boekingsfunctie, login, kaartintegratie, chat, een tweede
accommodatie en betaalde upsells.

---

Ontwerp: designhandoff "richting 2A (zonnig & gezellig)", zie
`design_handoff_gastenhandboek_2A/README.md` voor alle tokens en maten.
