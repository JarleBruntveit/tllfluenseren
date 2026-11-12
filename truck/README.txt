TLLfluenseren.no – Prosjekt 001
==================================

Dette er en statisk nettside som kan publiseres uten database eller serverkode.

INNHOLD
- index.html: forside
- truck/index.html: Truck-seksjonen (oversikt)
- truck/prove/index.html: opplesningsverktøy for truckførerprøven
- truck/nivaer/index.html: truckopplæring i tre nivåer (egenvurdering med bilde/video)
- assets/questions.js: begge truckprøvene, uten fasit
- assets/app.js: opplesning og navigasjon
- assets/styles.css: design
- assets/*.png: illustrasjoner/lastdiagram fra prøvegrunnlaget

TEST LOKALT
1. Pakk ut ZIP-filen.
2. Dobbeltklikk på index.html.
3. Trykk "Start truckprøven".
4. Velg prøve 1 eller 2.
5. Test opplesning i Chrome eller Edge.

VIKTIG
Opplesningen bruker nettleserens innebygde tale (Web Speech API). Hvilke norske stemmer som finnes
avhenger av elevens enhet/nettleser. Chrome/Edge på Windows fungerer normalt best.

INGEN FASIT
Nettsiden inneholder ikke svarnøkkel og vurderer ikke elevens valg.


VERSJON 1.1
- Lengre pause mellom spørsmål og svaralternativer.
- Standard talehastighet satt til 0,90x.
- Opplesningen deles opp i separate talebiter for tydeligere A/B/C-pauser.

VERSJON 1.2
- Lengre pause mellom «Svaralternativ A/B/C» og selve svarteksten.
- Hele tekstfeltet markeres mens det leses.
- Ordmarkering følger talen når nettleseren støtter ordgrenser.
- Norske/naturlige Microsoft-stemmer prioriteres automatisk dersom de finnes på enheten.


VERSJON 2.0
- Ny Truck-seksjon på /truck/ med to verktøy.
- Truckprøven er flyttet til /truck/prove/.
- Nytt verktøy: Truckopplæring i tre nivåer (/truck/nivaer/). Eleven vurderer 27 punkter,
  legger ved bilder/video og laster ned én innleveringsfil. Alt lagres lokalt i elevens nettleser.
