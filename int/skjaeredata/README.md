# Gjestefag INT – Skjæredata

Interaktiv simulator og nivåtester for skjæredata ved fresing, dreiing og boring.

| Fil | Hva den gjør |
| --- | --- |
| `index.html` | Elevsiden med fasene Lær, Tenk, Øv og Voks. |
| `skjaeredata.js` | Simulator (canvas), forutsi-utfordringer, oppgavegeneratorer, lagring og rapport. |
| `rapport.js` | Felles for elev- og lærersiden: rapportformat, kontrollsum, PDF og innlesing. |
| `/laererrom/skjaeredata/` | Lærersiden: les inn PDF-er fra Teams, klasseoversikt, kjennetegn, muntlig og praktisk kontroll. |

## Endre innhold

- **Skjæredatatabellen** står i `MAT` øverst i `skjaeredata.js`. Verdiene er veiledende startverdier for undervisning.
- **Maskiner** (maks turtall) står i `MASKINER`.
- **Tenk-utfordringene** står i `UTF`. Hver har et oppsett, en endring som animeres, svaralternativer og en forklaring.
- **Oppgaver** står i `OPPG` per nivå (`nybegynner`, `trygg`, `ekspert`). Hver linje er en generator som lager nye tall hver gang.
  `num(...)` er en regneoppgave med hint. `mc(...)` er flervalg. Sett `fase: 'tenk'` for misoppfatningsoppgaver.
- Testen trekker 8 oppgaver. 80 % låser opp neste nivå.

## Feildiagnose

Når eleven svarer feil på en regneoppgave, sammenlignes svaret med fasit. Er svaret omtrent ×1000, ×2, ×π, ×z eller ×60 feil,
registreres feiltypen (glemte ·1000, radius i stedet for diameter, glemte π, glemte z, minutter/sekunder). Lærersiden viser
de vanligste feilene i klassen med forslag til oppfølging (`FEILTYPER` i `rapport.js`).

## Personvern

Alt lagres bare i elevens nettleser (`localStorage`). Refleksjonstekst lagres bare hvis eleven krysser av for det.
Rapporten er en PDF med rapportkoden i Keywords-feltet (prefiks `SKJAERERAPPORT:`) og en kontrollsum som avslører endringer.
Lærersiden leser filene lokalt og sender ingenting.

## Opphavsrett

Alt innhold er egenprodusert. Ingen tekst, figurer eller tabeller er kopiert fra forlag eller verktøyleverandører.
