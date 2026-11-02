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
