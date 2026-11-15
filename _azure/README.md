# Azure-backend for spillene (valgfri – AV som standard)

Mappen starter med `_` og blir **ikke** publisert på nettsiden. Koden kjører i Azure, ikke på GitHub Pages.

Spillene fungerer fullt ut **uten** Azure: eleven leverer rapporten i Teams, og du limer rapportene inn på
`/laererrom/spillresultater/`. Azure gjør bare at resultatene kommer inn automatisk.

## Før du slår det på – personvern
Selv uten navn er resultater koblet til en elevkode **personopplysninger** når du kan finne ut hvem eleven er.
- Avklar med skolen/fylkeskommunen at du kan behandle elevresultater i **din egen** Azure-konto
  (behandlingsgrunnlag, databehandleravtale og hvor dataene lagres). Bruk heller skolens Azure-abonnement hvis det finnes.
- Velg region **Norway East** (eller en annen i EU/EØS).
- Bruk elevkoder (f.eks. `B07`), aldri navn. Koblingen kode → navn har bare du, utenfor Azure.
- Data slettes automatisk etter 365 dager (funksjonen `rydd`). Slett tabellen ved skoleårets slutt hvis du vil.

## Hva som lagres
Klassekode, elevkode, spill, tidspunkt og poeng per vurderingsområde. **Ikke** navn, valg eller refleksjonstekst.

## Oppsett (ca. 20 minutter)
1. Installer [Azure Functions Core Tools v4](https://learn.microsoft.com/azure/azure-functions/functions-run-local) og Azure CLI.
2. Opprett ressursgruppe, lagringskonto og Function App i **Flex Consumption** med **Node.js 22**:
   ```bash
   az login
   az group create --name tll-spill --location norwayeast
   az storage account create --name tllspilldata --resource-group tll-spill --location norwayeast --sku Standard_LRS
   az functionapp create --name tll-spill --resource-group tll-spill --storage-account tllspilldata \
     --flexconsumption-location norwayeast --runtime node --runtime-version 22
   ```
3. Legg inn hemmelige innstillinger (aldri i GitHub):
   ```bash
   az functionapp config appsettings set --name tll-spill --resource-group tll-spill --settings \
     TABLES_CONNECTION="$(az storage account show-connection-string --name tllspilldata --resource-group tll-spill -o tsv)" \
     LAERER_KODE="<lang tilfeldig kode>" TILLATTE_KLASSER="2TLLA,2TLLB"
   ```
4. Tillat bare nettsiden: `az functionapp cors add --name tll-spill --resource-group tll-spill --allowed-origins https://tllfluenseren.no`
5. Publiser koden fra denne mappen: `npm install && func azure functionapp publish tll-spill`
6. Test: `curl https://tll-spill.azurewebsites.net/api/resultater?klasse=2TLLB -H "x-laerer-kode: <koden>"` skal gi `[]`.
7. Sett adressen i `spill/felles/konfig.js` (`azureUrl: 'https://tll-spill.azurewebsites.net'`) i en egen PR.
   Da får spillene et felt for elevkode, og lærersiden får «Hent fra Azure».

## Endepunkter
| Metode | Adresse | Hvem |
| --- | --- | --- |
| POST | `/api/resultat` | Spillet (eleven). Validerer alt, maks 30 innsendinger per elevkode per døgn, bare registrerte klasser. |
| GET | `/api/resultater?klasse=2TLLB` | Lærersiden. Krever header `x-laerer-kode`. |

Kostnad: med én klasse er bruken langt under gratiskvoten i Flex Consumption og Table Storage – i praksis noen få kroner i måneden.
Sett gjerne et budsjettvarsel i Azure.
