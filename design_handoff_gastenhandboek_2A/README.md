# Handoff: Digitaal gastenhandboek "casSonovi" — richting 2A (zonnig & gezellig)

## Overzicht
Een digitaal gastenhandboek voor een 2-persoons vakantieappartement op Aruba, bereikbaar via een
QR-code in de keuken. Eén scrollpagina, mobile-first (390px), sticky sectienavigatie. Doel: de gast
vindt elk antwoord binnen twee tikken, in fel zonlicht of 's avonds laat, met één hand.

Doelgroep: gasten van casSonovi (Noord, Aruba). Nederlands leidend, Engels als zichtbare toggle
(in deze mock nog niet uitgewerkt). Geen techniekaffiniteit veronderstellen.

**Buiten scope (bewust weggelaten):** boekingsfunctie, login, kaartintegratie, chat, tweede
accommodatie, betaalde upsells, animaties.

## Over de designbestanden
De bestanden in deze bundel zijn **designreferenties, gemaakt in HTML** — prototypes die het
bedoelde uiterlijk en gedrag laten zien, geen productiecode om over te nemen. De opdracht is om dit
design te **herbouwen in de omgeving van de doelcodebase** (React/Next, Vue, SwiftUI, native, wat er
ook staat) met de daar gebruikelijke patronen en libraries. Bestaat er nog geen codebase, kies dan
het framework dat past bij het project (voor deze usecase is een statische site / Next.js met één
route ruim voldoende) en implementeer het design daar.

## Fidelity
**High-fidelity.** Kleuren, typografie, spacing, radii en interacties zijn definitief. Bouw de UI
pixel-nauwkeurig na met de libraries van de codebase. Alle waarden staan hieronder en in
`2A-reference.html`.

Let op twee dingen die géén design zijn maar placeholderdata:
- Wifi-naam/wachtwoord, sleutelkastcode en telefoonnummer zijn **verzonnen** — vervang door echte gegevens.
- De plekken bij "Ontdek de omgeving" zijn plausibele Aruba-suggesties, nog niet bevestigd door de host.
- Alle foto's zijn leeg; in de HTML staan gestreepte placeholders met een label.

## Screens / views
Er is één screen: **Gastenhandboek (one-pager)**. Volgorde is bewust: hulp bovenaan, niet onderaan.

### Layout (globaal)
- Canvas: 390px breed, verticaal scrollend, achtergrond `#FFF9F0`, tekst `#3B2A1E`.
- Contentmarge: `22px` links/rechts overal.
- Verticale rangschikking: hero (296px) → welkomstregel → sticky nav → 8 secties.
- Sectiepadding: eerste sectie `24px 22px 22px`, daarna `4px 22px 22px`; laatste sectie `4px 22px 36px`.
- Geen scheidingslijnen tussen secties (de koppen dragen de ritmiek), anders dan in richting A/B.
- Alle raakvlakken minimaal 44px hoog. Kaarten hebben `min-height: 66px` (hulp) / `58px` (accordeon) / `52px` (checklist).

### 1. Hero (header)
- Hoogte 296px, full-bleed foto (`object-fit: cover`), fallbackkleur `#F3E3CE`.
- Scrim onderin: `height:170px; background: linear-gradient(to top, rgba(45,28,18,.78), rgba(45,28,18,0))`, `pointer-events:none`.
- Titel: "casSonovi" — DM Serif Display 38px / line-height 1.05, kleur `#FFF9F0`, links 22px, bottom 20px.
- Ondertitel: "Noord, Aruba · 12 minuten van Eagle Beach" — Nunito Sans 14.5px/600, `#F6DFC8`, 6px onder de titel.
- Taalwissel rechtsboven (top 14, right 14): pill `border-radius:999px`, achtergrond `rgba(255,249,240,.94)`, padding 4px, gap 4px.
  - Actief (NL): background `#D9603B`, kleur `#FFF9F0`, 14px/800, min-height 44px, min-width 52px, padding 0 16px.
  - Inactief (EN): transparant, kleur `#6B4F3A`, 14px/700, zelfde maten.

### 2. Welkomstregel
- Padding `20px 22px 16px`. Tekst 16px/600, line-height 1.5:
  "Welkom. Alles wat je nodig hebt staat hieronder — wifi, tijden, en waar je lekker eet."
- Bij taal = EN verschijnt hieronder een melding (12px marge boven): 13.5px/600, kleur `#9E4426`,
  achtergrond `#FBEDE6`, radius 12px, padding 10px 12px: "De Engelse versie is in deze mock-up nog niet uitgewerkt."

### 3. Sticky sectienavigatie
- `position: sticky; top: 0; z-index: 5`, achtergrond `rgba(255,249,240,.97)`, `border-bottom: 1px solid #F1E1CC`, padding `10px 0`.
- Horizontaal scrollende rij chips, gap 7px, padding `0 22px`, geen zichtbare scrollbar.
- Chip: 14.5px/700, min-height 44px, padding `0 17px`, `border-radius: 999px`.
  - Inactief: background `#FFFFFF`, border `1.5px solid #F2DCC4`, kleur `#6B4F3A`.
  - Actief: background + border `#D9603B`, kleur `#FFF9F0`.
- Labels/ankers: Hulp (`hulp`), Wifi (`wifi`), Aankomst (`aankomst`), In huis (`inhuis`), Regels (`regels`), Omgeving (`omgeving`), Vertrek (`vertrek`).

### 4. Hulp nodig?
- Kop: DM Serif Display 25px "Hulp nodig?".
- Hostkaart (14px marge boven): wit, border `1.5px solid #F2DCC4`, radius 18px, padding 14px, flex met gap 14px.
  - Ronde foto 64×64 (`border-radius:999px`, fallback `#F3E3CE`).
  - Tekst 14.5px/line-height 1.5: **Norvin** (800) " — je host. Bereikbaar van 08:00 tot 22:00, meestal binnen een uur antwoord."
- Drie actiekaarten, kolom met gap 10px, elk `min-height:66px`, radius 18px, padding `14px 18px`, titel 16.5px/800, subregel 13.5px met 2px marge:
  1. "Iets is stuk" / "Stuur een foto via WhatsApp" — background `#E9F3EF`, titel `#1F5C50`, subregel `#2E5B51`. Actie: WhatsApp-deeplink.
  2. "Vraag over je verblijf" / "WhatsApp of bel +297 592 4180" — background `#FCF0DA`, titel `#7A5514`, subregel `#6F4C0F`. Actie: WhatsApp of `tel:`.
  3. "Noodgeval — bel 911" / "Politie, ambulance en brandweer" — background `#A83E22`, titel `#FFFFFF`, subregel `#FBE7DF`. Actie: `tel:911`.
- Variant (prop `emergencyProminent = false`): kaart 3 wordt zacht — background `#FBEDE6`, titel `#9E4426`, subregel `#8C4327`. Alle combinaties zijn WCAG AA (≥4.5:1).

### 5. Wifi
- Kop 25px "Wifi". Kaart: background `#1F5C50`, radius 22px, padding 20px.
- Labels "NETWERK" / "WACHTWOORD": 12.5px/800, `letter-spacing:.1em`, uppercase, `#9EC6BB`.
- Waarden in IBM Plex Mono 600, `#FFF9F0`: netwerk 21px ("casSonovi"), wachtwoord 25px ("welkom2026").
- Scheiding tussen de twee: `1px #33695D`, marge `16px 0`.
- Kopieerknoppen (min-height 44px, padding `0 16px`, radius 999px, label "Kopieer"):
  - netwerk: transparant met `1.5px solid #4C7F73`, kleur `#FFF9F0`, 14.5px/700.
  - wachtwoord: background `#F2B233`, kleur `#3B2A1E`, 14.5px/800.
- Na kopiëren verschijnt in de kaart (13px marge boven): "Gekopieerd naar het klembord." 13.5px/700, `#F2B233`, verdwijnt na 2500ms.
- Onder de kaart, 11px marge: "Eén netwerk in het hele appartement, ook op het terras." 13.5px, `#8A6A52`.

### 6. Aankomst & vertrek
- Kop 25px "Aankomst & vertrek".
- Twee tegels naast elkaar (`grid-template-columns: 1fr 1fr`, gap 10px, radius 18px, padding `14px 16px`):
  - "Inchecken" (13.5px/700, `#96702A`) + "12:00–01:00" (20px/800) — background `#FCF0DA`.
  - "Uitchecken" (13.5px/700, `#3F7368`) + "voor 15:00" (20px/800) — background `#E9F3EF`.
- Daaronder drie tekstblokken (kolom, gap 14px, 16px marge boven), titel 16px/800, tekst 14.5px/1.55 in `#6B5340`:
  - **Sleutel** — "Sleutelkastje rechts van de voordeur, code `2814`. Draai de knop na sluiten door." (code in IBM Plex Mono 600, `#3B2A1E`)
  - **Parkeren** — "Eigen plek links van het hek. Gratis, geen registratie nodig."
  - **Later aankomen?** — "Geen probleem, laat het even weten zodat het licht aan staat."

### 7. In huis
- Kop 25px "In huis". Daaronder foto 150px hoog, radius 20px (zwembad).
- Vijf uitklapbare kaarten (kolom, gap 10px): wit, border `1.5px solid #F2DCC4`, radius 18px, `overflow:hidden`.
  - Kop-rij = button: `min-height:58px`, padding `14px 18px`, titel 16.5px/800 links, teken rechts in IBM Plex Mono 19px `#B08A63` — "+" dicht, "–" open.
  - Body: padding `0 18px 16px`, 14.5px/1.55, `#6B5340`. Meerdere items mogen tegelijk open staan. Geen animatie.
- Items en teksten staan in `content.nl.json` (zwembad, keuken, airco, wasgoed, tv en apparaten).

### 8. Huisregels
- Kop 25px "Huisregels". Vier regelkaarten (kolom, gap 9px): background `#FCF0DA`, radius 14px,
  padding `13px 16px`, 14.5px/600, line-height 1.45. Teksten in `content.nl.json`.

### 9. Ontdek de omgeving
- Kop 25px "Ontdek de omgeving". Drie fotokaarten (kolom, gap 14px): wit, border `1.5px solid #F2DCC4`,
  radius 20px, `overflow:hidden`.
  - Foto 132px hoog bovenaan (fallback `#F3E3CE`).
  - Body padding `14px 16px 16px`: kop DM Serif Display 21px, tekst 14.5px/1.55 `#6B5340` met `<br>` per plek.
- Blokken: Strand, Supermarkt, Eten (teksten in `content.nl.json`).

### 10. Voordat je vertrekt
- Kop 25px + subregel "Tik af wat je hebt gedaan." (13.5px, `#8A6A52`).
- Vijf afvinkbare rijen (kolom, gap 9px), elk een button: `min-height:52px`, padding `11px 15px`,
  radius 14px, 14.5px/600, gap 13px.
  - Uit: background `#FFFFFF`, border `1.5px solid #F2DCC4`, kleur `#3B2A1E`; rondje 26×26, border `1.5px solid #DCC7AE`, leeg.
  - Aan: background `#FBEDE6`, border `1.5px solid #D9603B`, kleur `#9E4426`; rondje gevuld `#D9603B` met wit vinkje (14px/800).
- Afsluiter: background `#E9F3EF`, radius 18px, padding `16px 18px`, 14.5px/1.5, `#1F5C50`:
  "Fijne reis terug — en kom gerust weer langs. Laat weten wat we beter kunnen doen."

## Interacties & gedrag
| Interactie | Gedrag |
|---|---|
| Nav-chip tikken | Scrollt de pagina naar de sectie, offset **56px** boven de sectietop (`scrollTop = section.offsetTop - 56`). Geen smooth-scroll: instant, bewust geen animaties. |
| Scrollen | Scroll-spy: de laatste sectie waarvan `offsetTop <= scrollTop + 90` is actief; die chip krijgt de actieve stijl. |
| Accordeon tikken | Toggle open/dicht. Meerdere tegelijk open toegestaan. Teken wisselt +/–. |
| Kopieerknop | `navigator.clipboard.writeText()` van de zichtbare waarde; bevestigingsregel 2500ms zichtbaar. Fallback nodig voor oudere browsers (`document.execCommand('copy')`). |
| Checklist tikken | Toggle. Bewaar in `localStorage` per verblijf, zodat de gast tussen sessies niet opnieuw begint (in de mock zit dit in geheugenstate). |
| Taalwissel | Zet de taal; in productie de hele pagina in NL/EN. Bewaar de keuze in `localStorage`. |
| Noodgeval | `tel:911` — moet ook zonder wifi werken; zet deze sectie niet achter JS. |
| Hover/focus | Geen hover-ontwerp (touch-first). Voeg wél een zichtbare focus-ring toe voor toetsenbord: `outline: 2px solid #D9603B; outline-offset: 2px`. |
| Animaties | Geen. Geen transitions op open/dicht, geen smooth scroll. |

## State
- `lang: 'nl' | 'en'` — taalkeuze (persist).
- `openItems: Set<string>` — open accordeonitems ('zwembad' | 'keuken' | 'airco' | 'wasgoed' | 'apparaten').
- `activeSection: string` — actieve nav-chip, afgeleid van scrollpositie.
- `copied: 'net' | 'pw' | null` — bevestiging kopiëren, met timer van 2500ms.
- `doneTasks: Set<number>` — afgevinkte vertrekitems (persist).
- Geen datafetching nodig: alle content is statisch. Zet de content in één JSON/CMS-object per taal
  (zie `content.nl.json`) zodat de host het zonder deploy kan wijzigen.

## Design tokens
### Kleuren
| Token | Hex | Gebruik |
|---|---|---|
| `bg` | `#FFF9F0` | pagina-achtergrond |
| `surface` | `#FFFFFF` | kaarten |
| `ink` | `#3B2A1E` | primaire tekst |
| `ink-soft` | `#6B5340` | body-tekst in secties |
| `ink-muted` | `#8A6A52` | hulpteksten |
| `border` | `#F2DCC4` | kaartranden (1.5px) |
| `border-nav` | `#F1E1CC` | onderrand sticky nav |
| `photo-fallback` | `#F3E3CE` | achtergrond fotoslots |
| `terracotta` | `#D9603B` | actieve nav, taalwissel, checklist-aan |
| `terracotta-deep` | `#A83E22` | noodgevalkaart |
| `terracotta-tint` | `#FBEDE6` | zachte noodgeval-/checklistvulling |
| `terracotta-text` | `#9E4426` | tekst op terracotta-tint |
| `teal` | `#1F5C50` | wifi-kaart, afsluiter-tekst |
| `teal-tint` | `#E9F3EF` | kaart "Iets is stuk", uitchecktegel, afsluiter |
| `teal-line` | `#33695D` | scheiding in wifi-kaart |
| `teal-border` | `#4C7F73` | rand kopieerknop op teal |
| `teal-label` | `#9EC6BB` | labels op teal |
| `teal-text` | `#2E5B51` / `#3F7368` | subregels op teal-tint |
| `saffron` | `#F2B233` | kopieerknop wachtwoord, bevestiging |
| `saffron-tint` | `#FCF0DA` | huisregels, incheck-tegel, kaart "Vraag" |
| `saffron-text` | `#7A5514` / `#6F4C0F` / `#96702A` | tekst op saffron-tint |
| `cream` | `#FFF9F0` | tekst op donkere vlakken |
| `hero-scrim` | `rgba(45,28,18,.78) → transparant` | leesbaarheid herotitel |

### Typografie
- Koppen: **DM Serif Display** (400) — 38px hero, 25px sectiekop, 21px kaartkop.
- UI/body: **Nunito Sans** — 400/600/700/800. Maten: 16.5 (kaarttitel), 16 (welkom, blokkop),
  14.5 (body, chips, knoppen, checklist), 13.5 (subregels), 12.5 (labels, uppercase +.1em).
- Data: **IBM Plex Mono** 600 — wifi-waarden (21/25px), sleutelcode, +/–-teken (19px).
- Line-heights: 1.05 hero, 1.45–1.55 body, 1.5 welkom.

### Spacing & vorm
- Horizontale marge 22px; kolomgaps 9/10/14px; sectie-onderpadding 22px (laatste 36px).
- Radii: 999px (pills, rondjes), 22px (wifi), 20px (omgevingskaart, foto in huis), 18px (kaarten),
  14px (huisregels, checklist), 12px (EN-melding).
- Randen: 1.5px op kaarten, 1px op nav-onderrand en wifi-scheiding.
- Schaduwen: geen binnen het scherm (de framerand in de mock is alleen presentatie).
- Minimale raakvlakhoogte: 44px.

## Assets
- Zes foto's, allemaal nog te leveren door de host: hero (terras/uitzicht, 390×296 → 2× = 780×592),
  hostportret (64×64 rond), zwembad (390×150), strand (390×132), supermarkt (390×132), restaurant (390×132).
  In de referentie-HTML staan gestreepte placeholders met een label.
- Iconen: geen. Richting 2A werkt bewust zonder iconen (richting B gebruikte ze wel).
- Fonts: Google Fonts — DM Serif Display, Nunito Sans, IBM Plex Mono. Self-hosten aanbevolen
  (Aruba, mobiel netwerk: minder round-trips = sneller openen na QR-scan).

## Aanbevelingen voor de bouw
- De pagina moet snel openen na een QR-scan op 4G: kritieke CSS inline, foto's als WebP met
  `width/height` erop, `loading="lazy"` behalve de hero, fonts `display: swap` en self-hosted.
- Zorg dat de hulp- en wifisectie ook zonder JS bruikbaar zijn (kopieerknop is een extra, geen vereiste;
  het wachtwoord staat altijd als tekst op het scherm).
- Overweeg `prefers-color-scheme: dark` bewust niet te ondersteunen, of maak een aparte donkere
  variant: de crème achtergrond is 's avonds fel. Niet ontworpen — vraag design als je dit wilt.
- Taalstructuur: één contentobject per taal, dezelfde sleutels; URL `/` (nl) en `/en`.

## Bestanden in deze bundel
| Bestand | Wat |
|---|---|
| `2A-reference.html` | Zelfstandige, framework-vrije referentie van richting 2A. Open in de browser; alle interacties werken. Dit is de bron van waarheid voor maten en kleuren. |
| `content.nl.json` | Alle Nederlandse teksten, gestructureerd per sectie. |
| `Gastenhandboek casSonovi.dc.html` | Het originele designbestand uit de designtool met alle drie richtingen (1a warm, 1b tool-achtig, 2a zonnig). Alleen als context — 2a is het gekozen design. |
| `image-slot.js` | Hulpcomponent die in het originele designbestand de fotoslots verzorgt. Niet nodig in productie. |
| `screenshots/` | Schermafbeeldingen van 2A (volledige pagina en open states). |

## Openstaande punten voor de host
1. Echte wifi-naam en wachtwoord, sleutelkastcode, WhatsApp-nummer.
2. Bevestiging van de tijden (inchecken 12:00–01:00, uitchecken voor 15:00 — nu overgenomen uit de briefing).
3. De echte tips voor strand, supermarkt en eten.
4. Zes foto's.
5. Engelse vertaling.
