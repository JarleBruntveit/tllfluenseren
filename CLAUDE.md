# TLLfluenseren.no – arbeidsregler

Læringsnettsted for Vg2 Transport, logistikk og løfteoperasjoner (TLL), laget av Jarle Bruntveit.
Elever ved flere skoler bruker siden. Skriv alltid på **bokmål**, og forklar for Jarle på norsk.

## Slik er siden bygget
- **Statisk nettsted** på GitHub Pages (`CNAME` → tllfluenseren.no). Ingen byggesteg, ingen database, ingen serverkode.
  Det som ligger i `main`, er publisert. Mapper som starter med `_` (f.eks. `_verktoy/`) publiseres ikke.
- **Elevdata lagres bare i elevens nettleser** (`localStorage`). Ingen elevnavn, karakterer, passord eller tokens i repoet – det er offentlig.
- Fagområder har hver sin mappe: `transport-logistikk-lofteoperasjoner/`, `truck/`, `bransjelaere/`, `bransjeteknikk/`,
  `yff/`, `ungdomsbedrift/`, `norsk/`, `spill/`, `yrkesretninger/`, `video/`, `ressursbank/`, `assistent/`.
- **Lærerrom:** `laererrom/` (Jarles) og `gjestefag/<fag>/laererrom/` (kryptert innhold, se `gjestefag/README.md`).
  Fasit og lærernotater som ikke skal være offentlige, hører hjemme i det krypterte innholdet – ikke i vanlige filer.
- Felles filer i `assets/`: `elevflyt.css`, `global-footer.js`, `ressurser.js/.css`, `styles.css`, `vendor/` (Three.js, jsPDF, docx).

## TLL-kapitlene (viktigst)
Alle kapitler skal være **identisk oppbygd** og bruker én felles motor i `transport-logistikk-lofteoperasjoner/felles/`:

| Fil | Rolle |
| --- | --- |
| `motor.js` / `motor.css` | Alle oppgavetyper, kapittelside, prøveside, nivåer, faser, lyst/mørkt tema |
| `fremdrift.js`, `rapport-pdf.js` | Lagring i nettleseren og elevrapport |
| `kapitler.js` | Liste over publiserte kapitler (prøvesiden og lærersiden leser den) |
| `README.md` | Feltene i `data.js` og valgfrie felt |

Et kapittel er bare `kapN/index.html` (lik for alle, kun tittel/nummer endres) + `kapN/data.js` (alt innhold),
og eventuelt `lyd/episode-N.mp3` (podkast per tema, N = temaets plass), `dokumenter/`.
Ikke lag egne sider med eget design inne i et kapittel – alt skal gå gjennom motoren.

**Faste krav til innholdet i `data.js`:**
- Temaer heter `t1`, `t2` … i rekkefølge, med `lok` `A-01`, `A-02`, `B-01` … Aktivitets-id starter med tema-id (`t3-q1`) og er unike.
- Hvert tema har 2–4 læringsmål (`mal`), «Kort fortalt» (`punkter`), lærebokhenvisning (`bok`), NDLA-lenker og arbeidsbokoppgaver.
- Hvert tema dekker de fire fasene **Lær, Øv, Tenk, Voks** og nivåene **1 Nybegynner, 2 Trygg, 3 Ekspert**.
  Fasen settes ut fra oppgavetypen (`flash`=Lær, `quiz/tf/fill/match/order/sort/calc/hotspot`=Øv,
  `check/case/sim/reflect`=Tenk, `voks`=Voks) og kan overstyres med `fase`.
- `kompetansemal` er **ordrett** fra læreplanen (kontroller mot Udir). Læringsmålene er våre egne – hold dem adskilt.
- **Temaenes etikett (`lok`) er en hylleplass:** bokstaven er «reolen» (en del av kapitlet, i progresjon: A grunnlag →
  B metoder → C/D anvendelse), tallet er plassen i rekkefølgen. Elevene går gjennom temaene én gang, i rekkefølge.
- **Øvelsesbank** (valgfritt, bare noen kapitler – som kap 5): oppgaver elevene jobber med gjennom hele skoleåret.
  Legges som siste tema med `ovelsesbank: true` og `lok: 'ØB-01'`. Motoren viser den under egen overskrift
  «Øvelsesbank» foran Podkast, ikke i «Velg tema». Alle faser og nivåer kreves ikke i det temaet.
- Regneoppgaver (`calc`) trenger en generator i `GEN` i `motor.js`. Ny generator = endring i motoren (se under).
- `sim` er en lagersimulering som er skreddersydd for kap 1 – ikke gjenbruk den uten å utvide motoren.

## Opphavsrett – absolutt krav
Alt som publiseres, skal være **egenprodusert**. Læreboka, arbeidsboka og fasiten (PDF-ene i Claude-prosjektet)
brukes bare som faglig grunnlag: ikke kopier tekst, oppgaver, figurer eller bilder fra forlaget. Lenk til NDLA i stedet
for å kopiere. Tegninger lages som egne SVG-er. Podkastmanus skrives med egne ord.

## Nytt kapittel – oppskrift
1. `node _verktoy/nytt-kapittel.js <nr> "<full tittel>" "<kort tittel>"` – lager `kapN/` fra malen.
2. Les lærebokkapitlet, arbeidsboka og fasiten i Claude-prosjektet. Del kapitlet i temaer etter lærebokas underkapitler.
3. Fyll ut `kapN/data.js` (bruk kap 1 og kap 5 som mønster). Alle `TODO` må bort.
4. `node _verktoy/sjekk-kapitler.js kapN` – skal gi **0 feil**. Se på advarslene.
5. Test i nettleser (lokal server i rotmappen, f.eks. `python3 -m http.server`): kapittelsiden, minst én aktivitet av hver type,
   prøvesiden og lærersiden uten JavaScript-feil. 404 på `lyd/episode-N` er normalt når episoden ikke finnes.
6. **Publiser kapitlet** i samme PR:
   - legg det til i `felles/kapitler.js`,
   - gjør det ventende kortet på fagsiden (`transport-logistikk-lofteoperasjoner/index.html`) om til `<a class="chapter-card" href="kapN/">`,
   - legg URL-en i `sitemap.xml`,
   - legg temaene i `ressursbank/katalog.json` (`kapN-t1` …, samme titler som i `data.js`).
7. Kjør `node _verktoy/sjekk-kapitler.js` for alle kapitler før PR.

## Endringer i den felles motoren
`motor.js`/`motor.css` påvirker **alle** kapitler, Norsk (`norsk/soknadsbrev/`), ordbok-oppgaver og bransjeteknikk.
Endringer skal være bakoverkompatible. Øk versjonsnummeret (`?v=…`) på alle sider som laster filen
(`grep -rl "felles/motor.js" --include=index.html .`), og test kap 1, kap 5, prøvesiden og lærersiden etterpå.

## Design
- Hele kortet skal være klikkbart når det fører til én side (`<a>` rundt kortet, ingen nestede lenker/knapper),
  med synlig `:focus-visible`, og fungere med mus, berøring og tastatur. Kort uten mål skal ikke se klikkbare ut.
- Test på mobil og PC. Respekter `prefers-reduced-motion`.

## Arbeidsflyt i Git
- **Aldri direkte til `main`.** Lag en ny gren med beskrivende norsk navn (`kap6-arbeidsutstyr`, `fiks-ressursbank`)
  og åpne en Pull Request. Jarle ser over og fletter selv.
- PR-beskrivelsen skrives på norsk: *Hvorfor*, *Hva er endret*, *Testet*.
- Hold én PR til én sak. Slett grenen når PR-en er flettet.
- Før push fra en grunn klone: `git fetch origin main` og rebase ved behov.
