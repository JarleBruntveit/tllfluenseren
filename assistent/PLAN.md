# TLL-assistenten

## Nå (fase 1): søkebasert fagkamerat uten KI
Assistenten svarer bare med innhold som allerede finnes på TLLfluenseren. Ingenting sendes noe sted, og spørsmålene lagres ikke.

| Kilde | Fil |
| --- | --- |
| Ordboka (TLL og bransjelære) | `transport-logistikk-lofteoperasjoner/ordbok/ord.js`, `ord-bransjelaere.js` |
| Begrepskort og temaer i kapitlene | `kapN/data.js` – lastes automatisk fra `felles/kapitler.js` |
| Andre sider («Hvor finner jeg …?») | `assistent/sider.js` – legg til en linje per ny side |
| Filmer | `ressursbank/katalog.json` |

Nye kapitler, nye ord i ordboka og nye filmer i ressursbanken blir altså med i assistenten uten at assistenten må endres.
Forklaringsnivået styrer hvor mye som vises (Enkelt: kort forklaring + ett sted å øve; Vanlig: hele forklaringen + lenker;
Avansert: også punkter fra kapitlet, sidetall i læreboka og et tenkespørsmål).

Knappen «Kopier spørsmålet» lar eleven ta spørsmålet videre til KI-verktøyet skolen har godkjent (skolekonto).

## Senere (fase 2): ekte KI – bare etter avklaring
`backend/` har et utkast til en Cloudflare Worker. Den er ikke deployet og skal ikke kobles på før dette er avklart:
- personvern og databehandleravtale med skoleeier (elever under 18 år, elever fra flere skoler),
- kostnadstak, bruksgrense og tilgangskontroll (for eksempel klassekode),
- at svarene bygger på TLLfluenserens eget innhold, ikke forlagets bøker.

Sikkerhet: Ingen API-nøkler i GitHub eller nettleserkode. Ingen elevpersonopplysninger til KI.
