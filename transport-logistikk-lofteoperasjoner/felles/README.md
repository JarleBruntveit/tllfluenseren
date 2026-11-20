# Felles motor for kapitlene i TLL

Alle kapittelsider, prøvesiden og lærersiden bruker de samme filene her.

| Fil | Hva den gjør |
| --- | --- |
| `kapitler.js` | Liste over kapitlene. Legg til en linje når et nytt kapittel er klart. |
| `fremdrift.js` | Lagring i elevens nettleser og elevrapporten (fil eller tekstkode). |
| `motor.js` | Alle oppgavetypene, kapittelsiden og prøvesiden. |
| `motor.css` | Felles utseende. |

## Nytt kapittel

1. Kopier mappen `kap1` til for eksempel `kap2` (uten `lyd/`-filene).
2. Endre `data-kapittel="kap1"` til `kap2` i `kap2/index.html`, og tittelen.
3. Skriv nytt innhold i `kap2/data.js` (samme oppbygging som kap 1, `id: 'kap2'`).
4. Legg til kapitlet i `kapitler.js`.
5. Legg til et kort på fagsiden (`../index.html`).

Prøvesiden og lærersiden finner det nye kapitlet automatisk.

## Oppgavetyper i data.js

`flash` (begrepskort), `quiz`, `tf` (sant/usant), `fill` (fyll inn med `[[ord]]`), `match` (koble),
`order` (rekkefølge), `sort` (sorter i kategorier), `calc` (regneoppgaver med generator),
`check` (avvikskontroll i et dokument), `hotspot` (trykk i en egen SVG-tegning), `case`,
`reflect` (skriveoppgave med sjekkpunkter), `sim` (lagersimulering), `voks` (60 sekunder).

Fasen (Lær, Øv, Tenk, Voks) settes automatisk ut fra oppgavetypen, men kan overstyres med `fase:'tenk'` osv.

## Opphavsrett

Alt innhold skal være egenprodusert. Bruk læreboka, arbeidsboka og fasiten bare som faglig grunnlag –
ikke kopier tekst, oppgaver, figurer eller bilder fra forlagets bøker. Lenk til NDLA i stedet for å kopiere.

## Andre fag enn TLL (for eksempel Norsk)

Motoren kan også brukes av sider utenfor TLL-mappen, se `norsk/soknadsbrev/`. Lenk til filene med
absolutt sti (`/transport-logistikk-lofteoperasjoner/felles/motor.js` osv.) og la være å laste `kapitler.js`.
Valgfrie felt i `data.js`:

| Felt | Hva det gjør |
| --- | --- |
| `kortnavn` | Brukes i brødsmulestien i stedet for «Kap 1» (f.eks. «Søknadsbrev»). |
| `prove: false` | Skjuler kortet for kapittelprøve. |
| `ressursomrade: false` | Skjuler TLL-blokken «Se og lær – flere kilder». |
| `fotnote` | Egen bunntekst (HTML). |
| `kompetansemal` | Kan være en liste med flere mål. |
| `ressurser.ndlaEmneNavn` | Lenketekst for NDLA-emnet. `arbeidsbok` kan utelates. |
| `tema.figur` | Egen forklaringstegning under «Kort fortalt»: `{ svg, tekst }` eller en liste med flere. Tegningen er en egenprodusert SVG med `role="img"` og `aria-label`; `tekst` blir bildetekst. |
| `tema.ekstra` | HTML-panel under «Kort fortalt» (f.eks. en øvingsannonse). |
| `aktivitet.vis` | HTML-panel som vises over oppgaven. |
| `tema.ndla` | Lenker kan være hele URL-er (`https://…`), ikke bare TLL-stier. |

## Forsøk: enklere kapittelside (`oppsett: 'fokus'`)
Valgfritt felt i `data.js`. Prøves først i kap 5 (november 2026) etter tilbakemeldinger om at det er «så mange knapper».
- Kapittelsiden får én stor «Start/Fortsett»-knapp som peker på første tema som ikke er ferdig, og temaene vises som en liste med status.
- Nivålinjen øverst skjules. Eleven velger nivå inne i temaet («Hvor trygg er du på dette temaet?»), etter læringsmålene.
- Lagringsinfoen vises én gang med «Skjønner» (lagres som `lagringSett` i elevens nettleser). Kompetansemålene står under «Om kapitlet» nederst.
- `kortTittel` (valgfritt) gir kortere overskrift på kapittelsiden, f.eks. «Sikring av last».
Kapitler uten feltet ser ut som før. Hvis forsøket faller godt ut, kan feltet legges til i alle kapitler (eller bli standard).
