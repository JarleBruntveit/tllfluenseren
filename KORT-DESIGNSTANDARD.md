# Designregel: hele kortet er klikkbart

Denne regelen gjelder **alle eksisterende og nye rubrikker/kort** på TLLfluenseren, inkludert gjestefag, lærerrom, fagkapitler og fremtidige moduler.

- Hvis et kort fører til én side, skal **hele kortflaten** være en lenke, ikke bare «Åpne», «Les mer» eller «Start».
- Foretrekk semantisk `<a href="...">` som omslutter kortets innhold. Ikke legg andre lenker eller knapper inni denne lenken.
- Hvis kortet har flere handlinger, behold egne tilgjengelige lenker/knapper, og bruk en tydelig hovedhandling uten å skape nestede interaktive elementer.
- Kort må fungere med mus, berøring, Tab og Enter. Vis tydelig `:focus-visible` og hover, og sørg for tilstrekkelig kontrast.
- Kort uten en destinasjon skal **ikke** se klikkbare ut.
- Test på mobil og PC, og kontroller at hele kortflaten virker før hver publisering.

Denne regelen er en del av godkjenningskriteriene for nye sider og pull requests.
