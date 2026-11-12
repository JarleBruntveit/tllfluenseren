# TLLfluenseren.no

Interaktiv undervisning for Vg2 Transport, logistikk og løfteoperasjoner (TLL).
Statisk nettsted publisert med GitHub Pages fra `main`.

- **Regler, oppbygning og oppskrift for nye kapitler:** [CLAUDE.md](CLAUDE.md)
- **Felles kapittelmotor:** [transport-logistikk-lofteoperasjoner/felles/README.md](transport-logistikk-lofteoperasjoner/felles/README.md)
- **Gjestefag og krypterte lærerrom:** [gjestefag/README.md](gjestefag/README.md)
- **Ressursbanken:** [RESSURSBANK.md](RESSURSBANK.md)
- **Truck-seksjonen (versjonshistorikk):** [truck/README.txt](truck/README.txt)

## Verktøy (publiseres ikke)

```bash
node _verktoy/nytt-kapittel.js 6 "Bruk og vedlikehold av arbeidsutstyr" "Arbeidsutstyr"   # nytt kapittel fra malen
node _verktoy/sjekk-kapitler.js            # kontroller alle publiserte kapitler
node _verktoy/sjekk-kapitler.js kap6       # kontroller ett kapittel (også før publisering)
```

Kontrollen kjøres også automatisk på hver Pull Request.
