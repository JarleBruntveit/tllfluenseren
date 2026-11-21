# TLL-podden (ikke publisert – mappa starter med `_`)

Podkastepisodene lages automatisk med ElevenLabs (Text to Dialogue) via GitHub Actions.

- `stemmer.json` – navn i manus → stemme-ID i ElevenLabs (ikke hemmelig).
- `manus/*.txt` – ett manus per episode. Første linjer: `# ut: <sti>/lyd/episode-N.mp3` og valgfritt `# modell:`.
  Replikker skrives `JARLE: …` og `LINE: …`. JARLE skrives på haugesundsk, LINE på bokmål.
- `lag-episode.mjs` – lager MP3. `--sjekk` kontrollerer manuset uten å bruke credits.
- `.github/workflows/podkast.yml` – kjører når et manus endres på en gren som starter med `podkast/`,
  og legger MP3-fila på samme gren. Nøkkelen ligger som GitHub-hemmelighet `ELEVENLABS_API_KEY`.

Arbeidsflyt: lag gren `podkast/<kapittel>` → legg inn manus → Actions lager lyd → Jarle lytter → PR flettes.
Manus skrives med egne ord (ikke kopiert fra læreboka). Introen sier at stemmene er KI-generert.

## Samleside og podkast-feed
`lag-oversikt.mjs` finner alle publiserte episoder og skriver `tllpodden/episoder.json` (siden tllfluenseren.no/tllpodden/)
og `tllpodden/feed.xml` (RSS for podkastapper). Kjøres automatisk av workflowen etter at lyd er laget.
