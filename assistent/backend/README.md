# TLL-assistenten: KI-backend

`worker.js` er en Cloudflare Worker som tar imot POST `/api/chat` og kaller OpenAI Responses API. **Den er ikke deployet.**

## Aktivering
1. Opprett Cloudflare Worker og deploy `worker.js`.
2. Legg `OPENAI_API_KEY` inn som en hemmelig Worker-variabel. Legg aldri nøkkelen i GitHub eller frontend.
3. Sett eventuelt `OPENAI_MODEL` og `ALLOWED_ORIGIN=https://tllfluenseren.no`.
4. Sett opp rate limiting/botbeskyttelse og API-budsjett før offentlig bruk. CORS alene gir ikke tilgangskontroll.
5. Test endpointet og oppdater deretter frontend til å kalle den verifiserte Worker-adressen.
6. Fagkilder og kildehenvisninger må implementeres separat før assistenten kan hevde å være kildebasert.
7. Lærerpanel krever autentisering og serverbasert autorisasjon. Ingen læreradministrasjon er aktivert.
8. Avklar personvern og databehandlerforhold før bruk med elever. Ikke send elevopplysninger.
