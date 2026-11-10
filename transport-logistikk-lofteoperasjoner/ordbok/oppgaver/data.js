/* =====================================================================
   OPPGAVER MED ORDBOKA OG STIKKORDREGISTERET – TLL Vg2
   Alle tekster og oppgaver er egenprodusert for TLLfluenseren.
   Faglig grunnlag: ordboka og stikkordregisteret i læreboka (bare oppslagsord og
   sidetall er brukt) og NDLA-ressurssamlingen for TP-TOL vg2 – lenket til, ikke kopiert.
   Personer og firma i oppgavene er oppdiktet.
   Bruker den felles motoren i /transport-logistikk-lofteoperasjoner/felles/.
   ===================================================================== */
(function(){
const ORDBOK = '/transport-logistikk-lofteoperasjoner/ordbok/';
const NDLA_FAG = 'https://ndla.no/nb/f/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/636ca61808a8';
const NDLA_ORDLISTE = 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/ordliste-for-lager-og-logistikk/0924071fc5';
const NDLA_LAGER = 'https://ndla.no/nb/e/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/drift-pa-terminal-og-lager/3e3d0bf6c9';
const NDLA_SIKRING = 'https://ndla.no/nb/e/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/sikring-av-last/63c9b82c0d';
const NDLA_EMB = 'https://ndla.no/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/emballering-og-klargjoring/05e70b9d62';
const NDLA_GODS = 'https://ndla.no/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/godshandtering/1154893d7c';
const NDLA_HJELP = 'https://ndla.no/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/tekniske-hjelpemidler/14bfa0c7a3';
const NDLA_TERMINAL = 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/hva-er-en-terminal/04f1384e9b';
const NDLA_LAGERSTYRING = 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/hva-er-lagerstyring/e0fce0eef4';
const NDLA_BEGREPER = 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/begreper-i-lastsikring/373cb41de2';
const NDLA_FRIKSJON = 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/friksjon/97a407eb6d';
const NDLA_BL = 'https://ndla.no/f/bransjelare-tp-tol-vg2---ressurssamling/5c1eeb1e84d6';
const NDLA_BL_E = 'https://ndla.no/e/bransjelare-tp-tol-vg2---ressurssamling/';
const NDLA_SOK = q => 'https://ndla.no/search?query=' + encodeURIComponent(q);

const LENKE_ORDBOK = `<p style="margin:0"><a class="btn" href="${ORDBOK}" target="_blank" rel="noopener">Åpne ordboka og stikkordregisteret i ny fane →</a></p>
<p class="small muted" style="margin:8px 0 0">Tips: Ha ordboka åpen i én fane og oppgavene i en annen. Trykk «Søk på NDLA» på et ordkort for å lese mer.</p>`;

/* Instruks som vises over NDLA-oppgavene */
const NDLA_INSTRUKS = `<div class="small muted" style="margin-bottom:6px">SLIK GJØR DU</div>
<ol style="margin:0;padding-left:20px;line-height:1.7">
<li>Finn ordet i <a href="${ORDBOK}" target="_blank" rel="noopener">ordboka</a> og les den korte forklaringen.</li>
<li>Trykk <b>«Søk på NDLA»</b> på ordkortet. Velg en artikkel eller film fra faget <i>Transport, logistikk og løfteoperasjonar (TP-TOL vg2)</i>.</li>
<li>Les eller se. Skriv ned tittelen på NDLA-ressursen – det er kilden din.</li>
<li>Skriv forklaringen <b>med egne ord</b>. Ikke kopier fra NDLA eller læreboka.</li>
</ol>`;

TLL.FAG = TLL.FAG || { id: 'tll', navn: 'Transport, logistikk og løfteoperasjoner' };

TLL.registrer({
  id: 'tll-ordbok',
  fag: 'Transport, logistikk og løfteoperasjoner',
  nr: 0,
  kortnavn: 'Ordbok-oppgaver',
  prove: false,
  ressursomrade: false,
  tittel: 'Fagord, stikkord og NDLA',
  ingress: 'Lær deg å slå opp, forstå og bruke fagordene i transport og logistikk – med ordboka, stikkordregistrene i TLL og bransjelære, og NDLA.',
  kompetansemal: [
    { kode: 'TOL02-01', tekst: 'gjøre rede for grunnleggende prinsipper for effektiv drift av lager og terminal' },
    { kode: 'TOL02-01', tekst: 'planlegge, gjennomføre og dokumentere logistikk-, transport- og løfteoppdrag etter gjeldende regelverk' },
    { kode: 'TOL02-01', tekst: 'bruke ulike metoder og utstyr for å utføre sikre laste-, losse- og løfteoperasjoner' },
    { kode: 'TOL02-01 · bransjelære', tekst: 'forklare prosedyrer ved transport over landegrenser' },
    { kode: 'TOL02-01 · bransjelære', tekst: 'gjøre enkle økonomiske beregninger og vurdere hvilke faktorer som har betydning for prisfastsettelse av oppdrag' }
  ],
  fotnote: 'Transport, logistikk og løfteoperasjoner · Oppgaver med ordboka. Tekster og oppgaver er egenprodusert. <a href="' + ORDBOK + '">Ordboka</a> viser til oppslagsord og sidetall i elevens egne lærebøker i TLL og bransjelære. Fagstoff fra <a href="' + NDLA_FAG + '" target="_blank" rel="noopener">NDLA</a> er lenket til, ikke kopiert. Kompetansemål fra Utdanningsdirektoratet (NLOD). Resultater lagres bare i nettleseren på denne enheten – <a href="#/lagring">les om lagring</a> · <a href="#/rapport">lever fremdrift</a>.',
  ressurser: {
    presentasjon: '',
    laerebok: 'TLL-boka: ordboka (s. 231 og utover) og stikkordregisteret (s. 245 og utover)',
    arbeidsbok: 'Bransjelære-boka: stikkordregisteret (s. 294 og utover)',
    ndlaEmne: NDLA_FAG,
    ndlaEmneNavn: 'Transport, logistikk og løfteoperasjonar (TP-TOL vg2) på NDLA',
    ordliste: NDLA_ORDLISTE
  },
  temaer: [
  /* ================================================================ T1 */
  {
    id: 't1', lok: 'O-01', tittel: 'Slå opp riktig',
    kort: 'Forskjellen på ordbok, stikkordregister og NDLA – og hvordan du bruker dem sammen.',
    mal: ['forklare forskjellen på en ordbok og et stikkordregister','bruke sidetall til å finne et fagord i læreboka','søke opp et fagord på NDLA og skrive en forklaring med egne ord'],
    punkter: [
      '<b>Ordboka</b> forteller hva et ord <i>betyr</i>. Den står bakerst i læreboka, og du finner alle ordene i <a href="' + ORDBOK + '">ordboka på TLLfluenseren</a>.',
      '<b>Stikkordregisteret</b> forteller <i>hvor</i> i boka ordet blir brukt. «surring 122–123, 135–148» betyr at du kan slå opp på de sidene.',
      '<b>NDLA</b> gir deg mer: fagstoff, filmer og oppgaver om ordet. Bruk det når du vil forstå mer enn en kort forklaring.',
      'Mange fagord er <b>forkortelser</b> (ADR, FIFO, CMR). Søk på forkortelsen – ordboka forteller hva bokstavene står for.',
      'Samme ting kan ha <b>flere navn</b>: konteiner/container, kryssdokking/crossdocking, volumgods/målegods. Søkeordene på ordkortene hjelper deg.',
      'Når du forklarer et fagord, bruk <b>egne ord</b> og gi et <b>eksempel</b> fra lager, terminal eller transport. Da viser du at du forstår.'
    ],
    ekstra: LENKE_ORDBOK,
    ndla: [
      ['Transport, logistikk og løfteoperasjonar – fagsiden', NDLA_FAG, 'Fag'],
      ['Ordliste for lager og logistikk', NDLA_ORDLISTE, 'Fagstoff']
    ],
    aktiviteter: [
      { type:'voks', id:'t1-voks', tittel:'Fagspråk er verktøy', tekst:['En snekker har hammer og sag. En fagarbeider i logistikk har ord: pall, lokasjon, plukkliste, avvik, surring. Fagordene gjør at alle på jobben forstår nøyaktig det samme.','Når du sier «sett den der borte», kan det gå galt. Når du sier «sett pallen på lokasjon B-14», går det riktig.','Du trenger ikke kunne alle ordene nå. Men du trenger å vite hvor du finner dem – og å tørre å spørre når du ikke forstår.'], sporsmal:['Hvilket fagord har du hørt i praksis eller på skolen uten å skjønne det helt?','Hva gjør du når noen bruker et ord du ikke forstår?'], handling:'Skriv ned ett fagord du har hørt denne uka, og slå det opp i ordboka i dag.' },
      { type:'flash', id:'t1-flash', tittel:'Begrepskort: slik slår du opp', kort:[
        ['Ordbok','En liste med ord og forklaringer på hva de betyr.'],
        ['Stikkordregister','En alfabetisk liste over viktige ord i boka, med sidetallene der ordet blir brukt.'],
        ['Sidehenvisning','Sidetallet du skal slå opp på, for eksempel «s. 135–148».'],
        ['Oppslagsord','Ordet du leter etter i en ordbok eller et register.'],
        ['Forkortelse','Et ord som er kortet ned, ofte til forbokstaver, for eksempel ADR eller FIFO.'],
        ['Synonym','Et ord som betyr det samme som et annet, for eksempel konteiner og container.'],
        ['Søkeord','Ordet du skriver i et søkefelt. Korte og presise søkeord gir best treff.'],
        ['NDLA','Nasjonal digital læringsarena: gratis læremidler for videregående skole, med fagstoff, filmer og oppgaver.'],
        ['Kilde','Stedet du har informasjonen fra, for eksempel læreboka side 24 eller en NDLA-artikkel.'],
        ['Med egne ord','Å forklare noe slik du selv sier det, uten å kopiere teksten fra kilden.']
      ]},
      { type:'quiz', id:'t1-q1', nivaa:1, tittel:'Hvor slår du opp?', sp:[
        { q:'Du vil vite hva «crossdocking» betyr. Hvor ser du først?', a:['I ordboka','I innholdsfortegnelsen','På forsiden av boka','I forordet'], r:0, f:'Ordboka forklarer hva ordet betyr.' },
        { q:'Du vil lese alt læreboka skriver om «surring». Hva bruker du?', a:['Stikkordregisteret, som viser sidetallene','Ordboka','Forordet','Bildene i boka'], r:0, f:'Stikkordregisteret viser hvilke sider ordet blir brukt på.' },
        { q:'I stikkordregisteret står det «europall 22, 101–102, 108». Hva betyr 101–102?', a:['Side 101 til og med side 102','Kapittel 101','Oppgave 101 og 102','At europallen er 101 cm bred'], r:0, f:'Tallene er sidetall i læreboka. Bindestreken betyr «til og med».' },
        { q:'Du har lest den korte forklaringen, men vil se en film om ordet. Hva gjør du?', a:['Søker på ordet på NDLA','Leser ordboka en gang til','Slår opp i innholdsfortegnelsen','Gjetter'], r:0, f:'NDLA har fagstoff, filmer og oppgaver om mange av ordene.' },
        { q:'Hvilket søk gir trolig best treff i ordboka?', a:['surring','hvordan sikrer man egentlig last på en lastebil','alt om last','sikring av last på lastebil i Norge 2026'], r:0, f:'Korte søkeord gir best treff. Ordboka finner også ord som inneholder «surring».' },
        { q:'Hva betyr det å forklare «med egne ord»?', a:['Å skrive forklaringen slik du selv ville sagt det','Å kopiere teksten fra NDLA','Å skrive av ordboka','Å bruke så mange fagord som mulig'], r:0, f:'Når du bruker egne ord, viser du at du har forstått – og du unngår å kopiere andres tekst.' }
      ]},
      { type:'order', id:'t1-o1', nivaa:1, tittel:'Fra ukjent ord til egen forklaring', instr:'Du møter et ord du ikke kan i en oppgave. Sett stegene i en fornuftig rekkefølge.', steg:[
        'Finn det ukjente ordet i oppgaveteksten',
        'Søk opp ordet i ordboka',
        'Les den korte forklaringen',
        'Slå opp på sidetallet i læreboka og les mer',
        'Søk på NDLA hvis du vil lære enda mer',
        'Skriv en forklaring med egne ord og et eksempel'
      ]},
      { type:'match', id:'t1-m1', nivaa:2, tittel:'Hva gir hvilken kilde deg?', instr:'Koble kilden med det den er best til.', par:[
        ['Ordboka','En kort forklaring på hva ordet betyr'],
        ['Stikkordregisteret','Sidene i læreboka der ordet blir brukt'],
        ['Innholdsfortegnelsen','Oversikt over kapitlene og delkapitlene'],
        ['NDLA','Fagstoff, filmer og oppgaver om temaet'],
        ['Læreren eller veilederen','Hvordan ordet brukes på akkurat din arbeidsplass']
      ]},
      { type:'reflect', id:'t1-r1', nivaa:1, vis: LENKE_ORDBOK, tittel:'Ordjakt: fem ord fra ett kapittel', q:'Åpne ordboka og velg ett kapittel i nedtrekkslista (for eksempel «Kap. 5»). Velg fem ord du ikke kunne fra før. Skriv for hvert ord: ordet, sidetallet i læreboka og en forklaring med egne ord på én setning.', punkter:[
        'Jeg har skrevet fem ord fra samme kapittel.',
        'Hvert ord har riktig sidetall fra ordboka eller stikkordregisteret.',
        'Hver forklaring er skrevet med egne ord.',
        'Hver forklaring er en hel setning.',
        'Jeg har slått opp i læreboka for minst ett av ordene.'
      ]}
    ]
  },
  /* ================================================================ T2 */
  {
    id: 't2', lok: 'O-02', tittel: 'Forkortelser i transport og logistikk',
    kort: 'ADR, CMR, FIFO, ERP, RFID – lær hva forkortelsene står for og hva de brukes til.',
    mal: ['forklare hva vanlige forkortelser i transport og logistikk står for','bruke forkortelsene riktig i en setning','sortere forkortelser etter hvilket område de hører til'],
    punkter: [
      'Transport og logistikk er fullt av <b>forkortelser</b>, ofte fra engelsk eller fransk. Du møter dem på dokumenter, i datasystemer og i regelverket.',
      '<b>Regelverk:</b> ADR (farlig gods på veg), CMR (internasjonal vegtransport), HMS (helse, miljø og sikkerhet).',
      '<b>Lager:</b> FIFO (eldste varer ut først), LIFO (sist inn, først ut), JIT (akkurat i tide), WMS (lagerstyringssystem).',
      '<b>Data og sporing:</b> ERP (system for hele bedriften), EDI (elektronisk utveksling av dokumenter), RFID (brikke som leses trådløst), SSCC (nummer på en transportenhet).',
      '<b>Konteinere:</b> TEU er måleenheten. En 20-fots konteiner er 1 TEU, en 40-fots er 2 TEU.',
      'Kryss av for <b>«Bare forkortelser»</b> i <a href="' + ORDBOK + '?fork=1">ordboka</a> for å se alle forkortelsene samlet.'
    ],
    ndla: [
      ['Søk på NDLA: ADR', NDLA_SOK('ADR farlig gods'), 'Søk'],
      ['Hva er lagerstyring?', NDLA_LAGERSTYRING, 'Fagstoff'],
      ['Søk på NDLA: CMR', NDLA_SOK('CMR fraktbrev'), 'Søk']
    ],
    aktiviteter: [
      { type:'flash', id:'t2-flash', tittel:'Begrepskort: forkortelser', kort:[
        ['ADR','Regler for transport av farlig gods på veg.'],
        ['CMR','Internasjonal avtale om godstransport på veg mellom land. CMR-fraktbrevet følger lasten.'],
        ['HMS','Helse, miljø og sikkerhet.'],
        ['FIFO','First In – First Out: de eldste varene plukkes først.'],
        ['LIFO','Last In – First Out: det som kom inn sist, tas ut først.'],
        ['JIT','Just in time: varene kommer akkurat når de trengs.'],
        ['ERP','Dataprogram som styrer innkjøp, lager, ordre og økonomi i én database.'],
        ['WMS','Lagerstyringssystem: holder oversikt over varer og lokasjoner på lageret.'],
        ['EDI','Elektronisk utveksling av ordrer, fakturaer og fraktbrev mellom bedrifter.'],
        ['RFID','Brikke med antenne som kan leses trådløst, uten å skanne en strekkode.'],
        ['SSCC','Unikt nummer for en transportenhet, for eksempel en pall.'],
        ['TEU','Måleenhet for konteinere: en 20-fots konteiner er 1 TEU.']
      ]},
      { type:'match', id:'t2-m1', nivaa:1, tittel:'Hva står forkortelsen for?', instr:'Koble forkortelsen med riktig forklaring.', par:[
        ['FIFO','De eldste varene ut først'],
        ['ADR','Farlig gods på veg'],
        ['HMS','Helse, miljø og sikkerhet'],
        ['TEU','Måleenhet for konteinere'],
        ['RFID','Trådløs brikke for sporing'],
        ['JIT','Varene kommer akkurat når de trengs']
      ]},
      { type:'sort', id:'t2-s1', nivaa:2, tittel:'Hvilket område hører forkortelsen til?', instr:'Sorter forkortelsene. Slå opp i ordboka hvis du er usikker.', kat:['Regelverk og avtaler','Lager','Data og sporing'], items:[
        ['ADR', 0, 'ADR er regelverket for farlig gods på veg.'],
        ['CMR', 0, 'CMR er en internasjonal avtale om godstransport på veg.'],
        ['FIFO', 1, 'FIFO er et plukkprinsipp på lageret.'],
        ['LIFO', 1, 'LIFO er et prinsipp for hvilke varer som tas ut først.'],
        ['ERP', 2, 'ERP er et datasystem for hele bedriften.'],
        ['RFID', 2, 'RFID er en brikke som brukes til sporing.'],
        ['ATP', 0, 'ATP er en avtale om transport av matvarer som lett blir dårlige.'],
        ['JIT', 1, 'JIT handler om at varene kommer akkurat når de trengs, slik at lageret blir lite.'],
        ['EDI', 2, 'EDI er elektronisk utveksling av dokumenter.'],
        ['SSCC', 2, 'SSCC er et nummer som brukes til å spore en transportenhet.']
      ]},
      { type:'quiz', id:'t2-q1', nivaa:2, tittel:'Forkortelser i praksis', sp:[
        { q:'Bilen skal frakte tønner med brannfarlig væske. Hvilket regelverk gjelder?', a:['ADR','FIFO','EDI','TEU'], r:0, f:'ADR er regelverket for farlig gods på veg.' },
        { q:'Lageret selger melk og yoghurt. Hvilket plukkprinsipp bør de bruke?', a:['FIFO','LIFO','JIT','ERP'], r:0, f:'Med FIFO går de eldste varene ut først, slik at ingenting blir for gammelt.' },
        { q:'En lastebil kjører fra Stavanger til Hamburg. Hvilket fraktbrev følger lasten?', a:['CMR-fraktbrev','ADR-fraktbrev','FIFO-brev','HMS-skjema'], r:0, f:'CMR gjelder internasjonal godstransport på veg.' },
        { q:'Et skip har plass til 2 000 TEU. Hvor mange 40-fots konteinere er det plass til?', a:['1 000','2 000','4 000','500'], r:0, f:'En 40-fots konteiner er 2 TEU. 2 000 / 2 = 1 000.' },
        { q:'Butikken sender bestillingen direkte fra sitt datasystem til grossistens datasystem. Hva kalles det?', a:['EDI','ADR','LIFO','HMS'], r:0, f:'EDI er elektronisk utveksling av dokumenter mellom bedrifter.' },
        { q:'Pallen har en etikett med et unikt nummer som skannes på hver terminal. Hva er nummeret?', a:['SSCC-nummer','TEU-nummer','ADR-nummer','HMS-nummer'], r:0, f:'SSCC-nummeret gjør at pallen kan spores gjennom hele transporten.' }
      ]},
      { type:'fill', id:'t2-fill', nivaa:2, tittel:'Fyll inn: en dag på terminalen', tekst:'Ahmed tar imot en pall med maling. Pallen har oransje merking, så den er farlig gods etter [[ADR]]. Han skanner etiketten med [[SSCC]]-nummeret, og pallen blir registrert i lagerstyringssystemet, [[WMS]]. Bestillingen kom inn elektronisk via [[EDI]]. Melkeprodukter plukkes etter [[FIFO]], slik at de eldste varene går ut først. Pallen skal videre til Sverige, og sjåføren får et [[CMR]]-fraktbrev.', ekstra:['TEU','JIT','LIFO','RFID'], f:'Alle forkortelsene finner du i ordboka. Kryss av for «Bare forkortelser».' },
      { type:'reflect', id:'t2-r1', nivaa:3, tittel:'Forkortelser jeg møter i praksis', q:'Finn tre forkortelser du har sett i praksis, i yrkesfaglig fordypning eller på et dokument (fraktbrev, etikett, skilt, datasystem). Skriv hva hver forkortelse står for, hva den betyr, og hvor du så den. Bruk ordboka og NDLA til å sjekke.', punkter:[
        'Jeg har skrevet tre forkortelser.',
        'Jeg har skrevet hva hver forkortelse står for.',
        'Jeg har forklart hva den betyr i praksis, med egne ord.',
        'Jeg har skrevet hvor jeg så forkortelsen.',
        'Jeg har sjekket forklaringen i ordboka eller på NDLA.'
      ]}
    ]
  },
  /* ================================================================ T3 */
  {
    id: 't3', lok: 'O-03', tittel: 'Lager, terminal og vareflyt',
    kort: 'Fagordene du trenger for å forklare hvordan varer flyter gjennom lager og terminal (kapittel 1).',
    mal: ['bruke riktige fagord om lagertyper og lagerprinsipper','forklare forskjellen på FIFO og LIFO med eksempler','beskrive vareflyten fra produsent til kunde med fagord'],
    punkter: [
      'Varene går gjennom flere ledd: <b>sentrallager</b> → <b>regionlager</b> → <b>butikklager</b>. Dette er en del av <b>varekretsløpet</b>.',
      'På en <b>terminal</b> blir gods sortert og lastet om. Ved <b>crossdocking</b> går godset rett fra innkommende til utgående bil uten å lagres.',
      'En <b>lokasjon</b> er den faste adressen til en plass på lageret. <b>Plukklageret</b> er i lett høyde, <b>volumlageret</b> (støtlager) har hele paller.',
      '<b>FIFO</b> brukes for varer med holdbarhetsdato. <b>LIFO</b> brukes der alderen ikke betyr noe.',
      '<b>Bestillingspunkt</b> og <b>sikkerhetslager</b> sørger for at lageret ikke går tomt i <b>ledetiden</b>.',
      'Filtrer på <a href="' + ORDBOK + '?kap=1">kapittel 1 i ordboka</a> for å se alle ordene.'
    ],
    ndla: [
      ['Drift på terminal og lager', NDLA_LAGER, 'Emne'],
      ['Hva er en terminal?', NDLA_TERMINAL, 'Fagstoff'],
      ['Hva er lagerstyring?', NDLA_LAGERSTYRING, 'Fagstoff'],
      ['Ordliste for lager og logistikk', NDLA_ORDLISTE, 'Fagstoff']
    ],
    aktiviteter: [
      { type:'match', id:'t3-m1', nivaa:1, tittel:'Lagerord', instr:'Koble ordet med riktig forklaring.', par:[
        ['Lokasjon','Den faste adressen til en plass på lageret'],
        ['Plukklager','Der varene plukkes til ordrer, i lett høyde'],
        ['Volumlager','Der varene står i hele paller'],
        ['Ledetid','Tiden fra bestilling til levering'],
        ['Pakkseddel','Liste over varene i en sending'],
        ['Crossdocking','Gods lastes rett over uten å lagres']
      ]},
      { type:'sort', id:'t3-s1', nivaa:1, tittel:'FIFO eller LIFO?', instr:'Hvilket prinsipp passer best for varen eller situasjonen?', kat:['FIFO – eldste først','LIFO – sist inn, først ut'], items:[
        ['Melk og yoghurt', 0, 'Matvarer med holdbarhetsdato skal ut i riktig rekkefølge.'],
        ['Medisiner', 0, 'Medisiner har utløpsdato. De eldste må brukes først.'],
        ['Sand i en haug', 1, 'Det spiller ingen rolle hvilken sand som er eldst. Du tar fra toppen.'],
        ['Brød', 0, 'Brød blir fort gammelt.'],
        ['Stålrør stablet i en reol der bare den ytterste enden er tilgjengelig', 1, 'Rør blir ikke dårlige, og det er enklest å ta det som ligger ytterst.'],
        ['Maling med «best før»-dato', 0, 'Maling kan bli for gammel. Eldste først.']
      ]},
      { type:'tf', id:'t3-tf', nivaa:2, tittel:'Sant eller usant: lager og terminal', ps:[
        ['Et regionlager forsyner butikkene i sin region.', true, 'Regionlageret ligger mellom sentrallageret og butikkene.'],
        ['Ved crossdocking blir godset lagret i flere uker.', false, 'Ved crossdocking går godset rett videre uten å lagres.'],
        ['Sikkerhetslageret er en buffer hvis leveransen blir forsinket.', true, 'Sikkerhetslageret skal hindre at lageret går tomt.'],
        ['Bestillingspunktet er dagen varen kommer fram.', false, 'Bestillingspunktet er lagernivået der du må bestille på nytt.'],
        ['En lokasjon kan for eksempel være gang B, reol 14, høyde 2.', true, 'Lokasjonen er adressen til plassen på lageret.'],
        ['ABC-analyse deler varene i tre grupper etter hvor mye de selges eller plukkes.', true, 'A-varene er viktigst og bør stå nærmest utleveringen.']
      ]},
      { type:'fill', id:'t3-fill', nivaa:2, tittel:'Fyll inn: vareflyten', tekst:'Varene kommer fra fabrikken til [[sentrallageret]], som forsyner flere [[regionlager]]. Derfra går varene til butikkene. På lageret står hele paller i [[volumlageret]], mens varene plukkes fra [[plukklageret]]. Plukkeren finner varen ved hjelp av [[lokasjonen]]. Når beholdningen når [[bestillingspunktet]], må lageret bestille nye varer.', ekstra:['ledetiden','pakkseddelen','tollageret','fraktbrevet'], f:'Alle ordene finner du i ordboka, filtrert på kapittel 1.' },
      { type:'reflect', id:'t3-r1', nivaa:3, tittel:'Forklar vareflyten med fagord', q:'Velg en vare du kjenner, for eksempel en pakke kjøttdeig eller en sekk sement. Beskriv veien fra produsenten til kunden. Bruk minst seks fagord fra ordboka, og marker dem med store bokstaver eller understreking.', punkter:[
        'Beskrivelsen har en tydelig rekkefølge fra produsent til kunde.',
        'Jeg har brukt minst seks fagord fra ordboka.',
        'Fagordene er brukt riktig.',
        'Jeg har forklart hvorfor FIFO eller LIFO passer for varen.',
        'Jeg har sjekket minst ett ord på NDLA eller i læreboka.'
      ]}
    ]
  },
  /* ================================================================ T4 */
  {
    id: 't4', lok: 'O-04', tittel: 'Lastsikring, utstyr og emballasje',
    kort: 'Fagordene for krefter, sikringsmetoder, utstyr og emballering (kapittel 4–7 og 9).',
    mal: ['skille mellom låsing, blokkering og surring','bruke riktige fagord om krefter og friksjon','forklare hva emballasjeenhetene F-pak, D-pak og T-pak er'],
    punkter: [
      'Lasten skal sikres med <b>låsing</b>, <b>blokkering</b> eller <b>surring</b> – ofte en kombinasjon.',
      'Surringsmetodene er <b>overfallssurring</b>, <b>loopsurring</b>, <b>grimesurring</b> og <b>direktesurring</b>.',
      '<b>Treghetskrefter</b> skyver lasten når bilen bremser, svinger eller setter fart. <b>Friksjon</b> holder igjen, men er aldri nok alene.',
      'Kraft måles i <b>newton (N)</b>. Tyngden av 1 kg er omtrent 10 N.',
      'Emballasjen deles i <b>F-pak</b> (forbrukerenhet), <b>D-pak</b> (detaljistenhet) og <b>T-pak</b> (transportenhet, ofte en pall).',
      'Filtrer på tema <a href="' + ORDBOK + '?tema=S">Lastsikring og krefter</a> eller <a href="' + ORDBOK + '?tema=E">Emballering og merking</a> i ordboka.'
    ],
    ndla: [
      ['Sikring av last', NDLA_SIKRING, 'Emne'],
      ['Begreper i lastsikring', NDLA_BEGREPER, 'Fagstoff'],
      ['Friksjon', NDLA_FRIKSJON, 'Fagstoff'],
      ['Emballering og klargjøring', NDLA_EMB, 'Emne'],
      ['Tekniske hjelpemidler', NDLA_HJELP, 'Fagstoff']
    ],
    aktiviteter: [
      { type:'sort', id:'t4-s1', nivaa:1, tittel:'Låsing, blokkering eller surring?', instr:'Hvilken sikringsmetode beskrives?', kat:['Låsing','Blokkering','Surring'], items:[
        ['Konteineren festes med twistlocks i hjørnene', 0, 'Konteinerlåser låser lasten fast.'],
        ['Pallene står tett inntil frontveggen', 1, 'Lasten står mot noe fast og kan ikke flytte seg.'],
        ['En stropp legges over lasten og strammes', 2, 'Det er overfallssurring.'],
        ['En sperrebom settes i veggskinnene bak lasten', 1, 'Sperrebommen blokkerer lasten.'],
        ['Kjetting går fra lasten direkte til surringsfestet', 2, 'Det er direktesurring.'],
        ['En luftpute fyller tomrommet mellom to paller', 1, 'Luftputen fyller hullet slik at lasten står tett.']
      ]},
      { type:'match', id:'t4-m1', nivaa:2, tittel:'Fagord om krefter og utstyr', instr:'Koble ordet med riktig forklaring.', par:[
        ['Friksjon','Motstand mot gliding mellom to flater'],
        ['Newton','Måleenhet for kraft'],
        ['Tyngdepunkt','Punktet der vekten er samlet'],
        ['Kantbeskytter','Beskytter last og stropp mot skarpe kanter'],
        ['Strammekraft','Kraften du strammer stroppen med'],
        ['Motvektstruck','Truck som balanserer lasten med vekt bak']
      ]},
      { type:'quiz', id:'t4-q1', nivaa:2, tittel:'Bruk fagordene', sp:[
        { q:'Sjåføren bråbremser. Hvilken vei skyves lasten?', a:['Framover','Bakover','Opp','Ingen vei'], r:0, f:'Treghetskreftene skyver lasten framover når bilen bremser.' },
        { q:'En pall veier 500 kg. Omtrent hvor mange newton er tyngden?', a:['5 000 N','500 N','50 N','50 000 N'], r:0, f:'1 kg gir omtrent 10 N. 500 × 10 = 5 000 N.' },
        { q:'Hvilken surringsmetode presser lasten mot lasteplanet slik at friksjonen øker?', a:['Overfallssurring','Direktesurring','Grimesurring','Låsing'], r:0, f:'Ved overfallssurring går stroppen over lasten og presser den ned.' },
        { q:'Butikken får en kartong med 12 bokser. Hva kalles kartongen?', a:['D-pak','F-pak','T-pak','SSCC'], r:0, f:'D-pak er detaljistenheten – enheten butikken får varene i.' },
        { q:'Hvorfor er en kantbeskytter viktig?', a:['Den hindrer at stroppen kuttes og at lasten blir skadet','Den gjør stroppen lengre','Den erstatter surringen','Den gjør lasten lettere'], r:0, f:'Skarpe kanter kan skade både stroppen og godset.' }
      ]},
      { type:'tf', id:'t4-tf', nivaa:1, tittel:'Sant eller usant: emballasje og utstyr', ps:[
        ['F-pak er den minste enheten forbrukeren kjøper.', true, 'F står for forbruker.'],
        ['T-pak er vanligvis en pall.', true, 'T-pak er transportenheten.'],
        ['En støtindikator viser om godset har vært utsatt for et kraftig støt.', true, 'Indikatoren skifter farge.'],
        ['Friksjon alene er alltid nok til å sikre lasten.', false, 'Friksjonen kan forsvinne ved humper og vibrasjoner. Lasten må sikres i tillegg.'],
        ['Bølgepapp er både lett og sterk.', true, 'Det bølgete laget inni gjør pappen stiv og støtdempende.'],
        ['En jekktralle løfter pallen høyt opp i reolen.', false, 'Jekktralla løfter bare pallen så vidt fra gulvet for å flytte den.']
      ]},
      { type:'reflect', id:'t4-r1', nivaa:3, tittel:'Lag en ordliste til lastsikringskurset', q:'Du skal lære opp en ny lærling i lastsikring. Lag en ordliste med åtte fagord fra kapittel 5 og 6 i ordboka. For hvert ord skal du skrive en forklaring med egne ord og et eksempel fra en lastebil eller et lager. Avslutt med å skrive hvilken NDLA-ressurs du ville anbefalt lærlingen, og hvorfor.', punkter:[
        'Ordlista har åtte fagord om lastsikring eller lasting.',
        'Hver forklaring er skrevet med egne ord.',
        'Hvert ord har et eksempel fra lastebil eller lager.',
        'Jeg har tatt med minst én sikringsmetode og minst én kraft.',
        'Jeg har anbefalt én NDLA-ressurs og begrunnet valget.'
      ]}
    ]
  },
  /* ================================================================ T5 */
  {
    id: 't5', lok: 'O-05', tittel: 'Handel, toll og leveringsbetingelser',
    kort: 'Incoterms, fraktbrev, toll og forsikring – ordene du trenger når varer krysser grenser.',
    mal: ['forklare hva Incoterms er og bruke noen av dem riktig','skille mellom fraktbrev for innenlands og internasjonal transport','forklare vanlige ord om toll'],
    punkter: [
      '<b>Incoterms</b> er internasjonale leveringsbetingelser. De avgjør hvem som betaler frakten, og hvor <b>risikoen</b> går over fra selger til kjøper. Gjeldende versjon er Incoterms 2020.',
      '<b>EXW</b>: kjøperen henter hos selgeren og tar alt ansvar. <b>DDP</b>: selgeren tar alt ansvar helt fram, også fortolling.',
      'Innenlands bruker du <b>fellesfraktbrev</b>. Mellom land på veg bruker du <b>CMR-fraktbrev</b>.',
      'Ved <b>transittering</b> fraktes ufortollede varer gjennom ett eller flere land under tollkontroll. <b>TIR</b> lar plomberte konteinere krysse grenser uten tollkontroll underveis.',
      '<b>Kabotasje</b> er innenlandskjøring i et annet land. Det er strenge grenser for hvor mye som er lov.',
      'Filtrer på tema <a href="' + ORDBOK + '?tema=I">Internasjonal handel og toll</a> i ordboka.'
    ],
    ndla: [
      ['Internasjonale transporter (Bransjelære)', NDLA_BL_E + 'internasjonale-transporter/9fc6c63b95', 'Emne'],
      ['Søk på NDLA: Incoterms', NDLA_SOK('Incoterms'), 'Søk'],
      ['Søk på NDLA: fortolling', NDLA_SOK('fortolling'), 'Søk'],
      ['Godshåndtering (Planlegging av oppdrag)', NDLA_GODS, 'Oppgave']
    ],
    aktiviteter: [
      { type:'sort', id:'t5-s1', nivaa:2, tittel:'Hvem tar ansvaret? (Incoterms 2020)', instr:'Sorter leveringsbetingelsene i tre grupper. Bruk ordboka.', kat:['Kjøperen betaler hovedfrakten','Selgeren betaler hovedfrakten, men risikoen går over tidlig','Selgeren tar ansvaret helt fram'], items:[
        ['EXW – Ex Works', 0, 'Kjøperen henter varen og tar alt ansvar fra selgerens dør.'],
        ['FCA – Free Carrier', 0, 'Kjøperen overtar når varen er levert til transportøren.'],
        ['FOB – Free On Board', 0, 'Kjøperen overtar når varen er om bord på skipet.'],
        ['CPT – Carriage Paid To', 1, 'Selgeren betaler frakten, men risikoen går over når varen leveres til transportøren.'],
        ['CIF – Cost, Insurance and Freight', 1, 'Selgeren betaler frakt og forsikring, men risikoen går over når varen er om bord.'],
        ['DAP – Delivered at Place', 2, 'Selgeren sørger for transport helt fram til avtalt sted.'],
        ['DDP – Delivered Duty Paid', 2, 'Selgeren tar alt ansvar, også fortollingen.']
      ]},
      { type:'match', id:'t5-m1', nivaa:2, tittel:'Ord om toll og dokumenter', instr:'Koble ordet med riktig forklaring.', par:[
        ['CMR-fraktbrev','Fraktbrev for internasjonal vegtransport'],
        ['Fellesfraktbrev','Fraktbrev for transport innenlands'],
        ['Transittering','Ufortollede varer fraktes gjennom land under tollkontroll'],
        ['Tollager','Lager der varer kan stå uten at tollen er betalt'],
        ['Opprinnelsesmerking','Viser hvilket land varen kommer fra'],
        ['Kabotasje','Innenlandskjøring i et annet land']
      ]},
      { type:'tf', id:'t5-tf', nivaa:2, tittel:'Sant eller usant: handel og forsikring', ps:[
        ['Med EXW har selgeren alt ansvar for transporten.', false, 'Med EXW har kjøperen alt ansvar fra selgerens dør.'],
        ['Med DDP leverer selgeren varen ferdig fortollet til kjøperen.', true, 'DDP er den betingelsen der selgeren tar mest ansvar.'],
        ['Force majeure er hendelser ingen kan rå over, for eksempel en naturkatastrofe.', true, 'Da har ingen erstatningsansvar.'],
        ['Kasko dekker bare skade du gjør på andres bil.', false, 'Kasko dekker skade på ditt eget kjøretøy.'],
        ['B2C betyr salg fra bedrift til privatperson.', true, 'Business to Consumer – for eksempel netthandel.']
      ]},
      { type:'case', id:'t5-case', nivaa:3, tittel:'Case: Pallene til Hamburg', intro:'Du jobber hos et oppdiktet transportfirma i Rogaland. En kunde skal sende fire paller med maskindeler fra Sandnes til Hamburg med lastebil. Kunden og kjøperen har avtalt DAP Hamburg.', steg:[
        { q:'Hvilket fraktbrev skal følge lasten?', valg:[
          { t:'CMR-fraktbrev', ok:true, f:'Riktig. Lasten krysser landegrenser på veg, og da gjelder CMR.' },
          { t:'Fellesfraktbrev', ok:false, f:'Fellesfraktbrev brukes ved transport innenlands.' },
          { t:'Ingen fraktbrev – fakturaen holder', ok:false, f:'Et fraktbrev skal følge sendingen. Det er beviset på fraktavtalen.' }
        ]},
        { q:'Avtalen er DAP Hamburg. Hvem sørger for transporten fram til Hamburg?', valg:[
          { t:'Selgeren i Sandnes', ok:true, f:'Riktig. Med DAP sørger selgeren for transporten fram til avtalt sted.' },
          { t:'Kjøperen i Hamburg', ok:false, f:'Det ville vært EXW eller en F-betingelse.' },
          { t:'Tolletaten', ok:false, f:'Tolletaten kontrollerer varene, men ordner ikke transporten.' }
        ]},
        { q:'Hvem tar seg av fortollingen inn til Tyskland når avtalen er DAP?', valg:[
          { t:'Kjøperen', ok:true, f:'Riktig. Med DAP er det kjøperen som fortoller. Med DDP ville selgeren gjort det.' },
          { t:'Selgeren', ok:false, f:'Det gjelder DDP, ikke DAP.' },
          { t:'Sjåføren betaler tollen av egen lomme', ok:false, f:'Sjåføren kan ha med dokumentene, men tollen er en sak mellom selger, kjøper og tollvesenet.' }
        ]},
        { q:'Varene skal fraktes ufortollet gjennom Sverige og Danmark under tollkontroll. Hva kalles det?', valg:[
          { t:'Transittering', ok:true, f:'Riktig. Ved transittering fraktes ufortollede varer gjennom land under tollkontroll.' },
          { t:'Kabotasje', ok:false, f:'Kabotasje er innenlandskjøring i et annet land.' },
          { t:'Crossdocking', ok:false, f:'Crossdocking er omlasting på en terminal.' }
        ]}
      ]}
    ]
  },
  /* ================================================================ T6 */
  {
    id: 't6', lok: 'O-06', tittel: 'NDLA-oppdrag: Bli ordjeger',
    kort: 'Bruk ordboka som startpunkt, gå videre til NDLA og vis at du forstår fagordene med egne ord og eksempler.',
    mal: ['søke opp fagord på NDLA og velge en relevant ressurs','forklare et fagord med egne ord og et eksempel fra yrket','oppgi hvilken kilde jeg har brukt'],
    punkter: [
      'Ordboka gir en <b>kort</b> forklaring. NDLA gir deg <b>mer</b>: fagstoff, filmer, bilder og oppgaver.',
      'Trykk <b>«Søk på NDLA»</b> på et ordkort i <a href="' + ORDBOK + '">ordboka</a>. Velg treff fra faget <i>Transport, logistikk og løfteoperasjonar (TP-TOL vg2)</i> eller <i>Bransjeteknikk</i> når du kan.',
      'Noen NDLA-sider bygger på eldre regler. Sjekk datoen, og spør læreren hvis læreboka og NDLA sier noe ulikt.',
      'Skriv alltid <b>med egne ord</b> og oppgi <b>kilden</b>: tittelen på NDLA-ressursen eller sidetallet i læreboka.',
      'Et godt <b>eksempel</b> fra lager, terminal eller lastebil viser at du har forstått ordet – ikke bare lært det utenat.'
    ],
    ekstra: NDLA_INSTRUKS,
    ndla: [
      ['Transport, logistikk og løfteoperasjonar – fagsiden', NDLA_FAG, 'Fag'],
      ['Drift på terminal og lager', NDLA_LAGER, 'Emne'],
      ['Sikring av last', NDLA_SIKRING, 'Emne'],
      ['Emballering og klargjøring', NDLA_EMB, 'Emne'],
      ['Ordliste for lager og logistikk', NDLA_ORDLISTE, 'Fagstoff']
    ],
    aktiviteter: [
      { type:'voks', id:'t6-voks', tittel:'Finn ut selv', tekst:['På jobb får du ikke alltid en lærer som forklarer. Du får en ny maskin, en ny kunde eller et nytt regelverk – og må finne ut av det selv.','Den som vet hvor hun skal lete, og som sjekker om kilden er til å stole på, blir fort trygg i jobben.','Å slå opp et ord er en liten ting. Men det er den samme ferdigheten du bruker når du skal sette deg inn i noe stort.'], sporsmal:['Hvor leter du først når du ikke skjønner noe?','Hvordan vet du om en kilde på nettet er til å stole på?'], handling:'Neste gang du lurer på et fagord i praksis, slå det opp før du spør – og spør så om du har forstått det riktig.' },
      { type:'reflect', id:'t6-r1', nivaa:1, vis: NDLA_INSTRUKS, fase:'ov', tittel:'Ordjeger: tre ord på NDLA', q:'Velg tre ord fra ordboka – gjerne fra ulike tema. Søk opp hvert ord på NDLA. For hvert ord skriver du: 1) ordet, 2) en forklaring med egne ord, 3) et eksempel fra lager, terminal eller transport, og 4) tittelen på NDLA-ressursen du brukte.', punkter:[
        'Jeg har valgt tre ord fra ordboka.',
        'Hvert ord har en forklaring med egne ord.',
        'Hvert ord har et eksempel fra yrket.',
        'Jeg har skrevet tittelen på NDLA-ressursen for hvert ord.',
        'Jeg har ikke kopiert tekst fra NDLA eller læreboka.'
      ]},
      { type:'reflect', id:'t6-r2', nivaa:2, fase:'ov', tittel:'Makkeroppdrag: begrepskort til klassen', q:'Jobb i par. Velg fire ord fra samme tema i ordboka. Rolle 1 er «søker»: finner ordet på NDLA og leser høyt det viktigste. Rolle 2 er «skriver»: skriver begrepskortet med egne ord. Bytt roller for hvert ord. Hvert kort skal ha: ordet, forklaring, eksempel, en enkel tegning eller beskrivelse av et bilde, og kilden. Skriv inn de fire kortene her, og skriv til slutt hvem som hadde hvilken rolle.', punkter:[
        'Vi har laget fire begrepskort fra samme tema.',
        'Hvert kort har forklaring, eksempel og kilde.',
        'Forklaringene er skrevet med egne ord.',
        'Vi byttet roller, og begge har vært søker og skriver.',
        'Kortene kan brukes av en medelev som ikke kjenner ordene.'
      ]},
      { type:'case', id:'t6-case', nivaa:2, tittel:'Case: Første dag på terminalen', intro:'Lina har sin første dag som lærling på en godsterminal. Veilederen bruker mange fagord. Hjelp Lina å forstå hva hun skal gjøre.', steg:[
        { q:'Veilederen sier: «Denne pallen skal på crossdock.» Hva gjør Lina?', valg:[
          { t:'Kjører pallen rett over til en utgående bil uten å sette den på lager', ok:true, f:'Riktig. Crossdocking betyr at godset går rett videre.' },
          { t:'Setter pallen på lager i volumlageret', ok:false, f:'Ved crossdocking skal godset ikke lagres.' },
          { t:'Returnerer pallen til avsenderen', ok:false, f:'Det ville vært retur, ikke crossdocking.' }
        ]},
        { q:'«Sjekk SSCC-nummeret før du laster.» Hva skal Lina se etter?', valg:[
          { t:'Nummeret på transportetiketten som identifiserer pallen', ok:true, f:'Riktig. SSCC-nummeret er unikt for hver transportenhet.' },
          { t:'Hvor mye pallen veier', ok:false, f:'Vekta står ofte på fraktbrevet, men SSCC er et identifikasjonsnummer.' },
          { t:'Hvilken dato varen går ut på dato', ok:false, f:'Det er holdbarhetsdatoen.' }
        ]},
        { q:'«Pallen er T-pak, kartongene inni er D-pak.» Hva betyr det?', valg:[
          { t:'Pallen er transportenheten, og kartongene er enhetene butikken får', ok:true, f:'Riktig. T = transport, D = detaljist.' },
          { t:'Pallen er tung og kartongene er lette', ok:false, f:'T-pak og D-pak handler om enheter, ikke vekt.' },
          { t:'Pallen skal til Tyskland og kartongene til Danmark', ok:false, f:'Bokstavene står ikke for land.' }
        ]},
        { q:'Lina skjønner ikke et ord veilederen bruker. Hva er lurest?', valg:[
          { t:'Spør veilederen, og slår ordet opp i ordboka i pausen', ok:true, f:'Riktig. Å spørre er profesjonelt – og det hindrer feil.' },
          { t:'Later som hun forstår', ok:false, f:'Da kan hun gjøre feil som koster tid og penger.' },
          { t:'Venter til neste uke med å finne ut av det', ok:false, f:'Da kan feilen allerede ha skjedd.' }
        ]}
      ]},
      { type:'reflect', id:'t6-r3', nivaa:3, tittel:'Sammenlign kildene', q:'Velg ett fagord som finnes både i ordboka og på NDLA, for eksempel crossdocking, FIFO, friksjon eller ombruksemballasje. Sammenlign forklaringen i ordboka med det du finner på NDLA. Hva får du vite på NDLA som ordboka ikke sier? Er noe forklart ulikt? Skriv til slutt din egen, forbedrede forklaring på to til tre setninger.', punkter:[
        'Jeg har oppgitt ordet og tittelen på NDLA-ressursen.',
        'Jeg har beskrevet minst én ting NDLA forklarer mer om.',
        'Jeg har vurdert om forklaringene er like eller ulike.',
        'Jeg har skrevet en egen, forbedret forklaring med egne ord.',
        'Forklaringen min har et eksempel fra yrket.'
      ]},
      { type:'reflect', id:'t6-r4', nivaa:3, tittel:'Skriv en instruks til sommervikaren', q:'En sommervikar starter på lageret i morgen. Skriv en kort instruks (8–12 setninger) om hvordan hun tar imot en leveranse, setter varene på riktig plass og plukker en ordre. Bruk minst åtte fagord fra ordboka, og marker dem med fet skrift eller store bokstaver. Legg ved én NDLA-lenke sommervikaren kan lese for å lære mer.', punkter:[
        'Instruksen har en tydelig rekkefølge.',
        'Jeg har brukt minst åtte fagord fra ordboka, og de er markert.',
        'Fagordene er brukt riktig.',
        'Språket er enkelt nok for en som er ny.',
        'Jeg har lagt ved en relevant NDLA-lenke.',
        'Jeg har tatt med minst ett HMS-råd.'
      ]}
    ]
  },
  /* ================================================================ T7 */
  {
    id: 't7', lok: 'O-07', tittel: 'Bransjelære: bedrift, økonomi og forsikring',
    kort: 'Selskapsformer, budsjett, lån, kalkyler og forsikringer – ordene du trenger for å starte og drive en transportbedrift.',
    mal: ['forklare forskjellen på de vanligste selskapsformene','skille mellom resultatbudsjett, likviditetsbudsjett og balansebudsjett','bruke riktige fagord om lån, kalkyler og forsikring'],
    punkter: [
      'Vanlige <b>selskapsformer</b> er <b>enkeltpersonforetak</b> (én eier med personlig ansvar), <b>ansvarlig selskap</b> (flere eiere med personlig ansvar) og <b>aksjeselskap</b> (eierne kan bare tape det de har skutt inn).',
      'En <b>forretningsplan</b> beskriver idé, marked, økonomi og organisering. <b>Finansieringsplanen</b> viser hvor pengene kommer fra: <b>egenkapital</b> og lån.',
      '<b>Resultatbudsjettet</b> viser om bedriften går med overskudd. <b>Likviditetsbudsjettet</b> viser om den kan betale regningene i tide. <b>Balansebudsjettet</b> viser hva den eier og skylder.',
      'Ved <b>annuitetslån</b> er terminbeløpet likt hele tiden. Ved <b>serielån</b> er avdraget likt, og terminbeløpet synker.',
      'En <b>selvkostkalkyle</b> dekker alle kostnader pluss fortjeneste. En <b>bidragskalkyle</b> dekker de variable kostnadene og en del av de faste.',
      '<b>Trafikkforsikring</b> er lovpålagt for alle motorvogner. <b>Kasko</b> og <b>delkasko</b> dekker mer. <b>Yrkesskadeforsikring</b> må alle arbeidsgivere ha.',
      'Filtrer på <a href="' + ORDBOK + '?bok=bl&tema=B">Bransjelære og tema «Etablering og drift av bedrift»</a> i ordboka.'
    ],
    ndla: [
      ['Bransjelære – fagsiden', NDLA_BL, 'Fag'],
      ['Etablering og drift av virksomhet', NDLA_BL_E + 'etablering-og-drift-av-virksomhet/a5b7718286', 'Emne'],
      ['Økonomiske kalkyler og prisberegninger', NDLA_BL_E + 'okonomiske-kalkyler-og-prisberegninger/a36ee8e1da', 'Emne'],
      ['Prising av persontransport', 'https://ndla.no/r/bransjelare-tp-tol-vg2---ressurssamling/prising-av-persontransport/7a69fca1dd', 'Fagstoff']
    ],
    aktiviteter: [
      { type:'flash', id:'t7-flash', tittel:'Begrepskort: bedrift og økonomi', kort:[
        ['Forretningsidé','Kort beskrivelse av hva bedriften skal tilby, til hvem, og hvordan den skiller seg fra andre.'],
        ['Egenkapital','Pengene eierne selv har skutt inn i bedriften.'],
        ['Gjeld','Penger bedriften skylder andre, for eksempel banken.'],
        ['Anleggsmidler','Ting bedriften eier og bruker lenge, for eksempel en lastebil.'],
        ['Omløpsmidler','Eiendeler som raskt blir til penger eller blir brukt opp, for eksempel varelager.'],
        ['Likviditet','Evnen til å betale regningene når de forfaller.'],
        ['Kassekreditt','Lånekonto der bedriften kan bruke penger opp til en avtalt grense.'],
        ['Dekningsbidrag','Det som er igjen av prisen når de variable kostnadene er trukket fra.'],
        ['Forsikringspremie','Det du betaler for en forsikring.'],
        ['Arbeidsgiveravgift','Avgift arbeidsgiveren betaler til staten, beregnet av lønnen.']
      ]},
      { type:'match', id:'t7-m1', nivaa:1, tittel:'Selskapsformer', instr:'Koble selskapsformen med riktig beskrivelse.', par:[
        ['Enkeltpersonforetak','Én eier som har personlig ansvar for all gjeld'],
        ['Ansvarlig selskap','Flere eiere som har personlig ansvar for gjelden'],
        ['Aksjeselskap','Eierne kan bare tape det de har skutt inn'],
        ['Forretningsplan','Plan for idé, marked, økonomi og organisering'],
        ['Samordnet registermelding','Skjemaet du registrerer bedriften med i Altinn']
      ]},
      { type:'sort', id:'t7-s1', nivaa:2, tittel:'Hvilket budsjett?', instr:'Hvilket budsjett gir svar på spørsmålet?', kat:['Resultatbudsjett','Likviditetsbudsjett','Balansebudsjett'], items:[
        ['Går bedriften med overskudd i år?', 0, 'Resultatbudsjettet sammenligner inntekter og kostnader.'],
        ['Har vi penger på konto til å betale lønn 15. mars?', 1, 'Likviditetsbudsjettet viser når pengene kommer inn og går ut.'],
        ['Hvor mye eier bedriften ved årsslutt?', 2, 'Balansebudsjettet viser eiendeler, gjeld og egenkapital.'],
        ['Må vi bruke kassekreditten i januar før kundene har betalt?', 1, 'Det handler om tidspunktet for innbetalinger og utbetalinger.'],
        ['Blir inntektene fra transportoppdragene større enn kostnadene til drivstoff, lønn og vedlikehold?', 0, 'Det er et spørsmål om overskudd eller underskudd.'],
        ['Hvor stor gjeld har bedriften etter at lastebilen er kjøpt?', 2, 'Gjeld og eiendeler står i balansen.']
      ]},
      { type:'quiz', id:'t7-q1', nivaa:2, tittel:'Lån, kalkyler og forsikring', sp:[
        { q:'Du vil betale det samme beløpet hver måned i hele lånets løpetid. Hvilken lånetype velger du?', a:['Annuitetslån','Serielån','Kassekreditt','Pantelån'], r:0, f:'Ved annuitetslån er terminbeløpet likt. Ved serielån er avdraget likt.' },
        { q:'Hvilken forsikring må alle motorvogner ha etter loven?', a:['Trafikkforsikring','Kasko','Reiseforsikring','Livsforsikring'], r:0, f:'Trafikkforsikringen er lovpålagt (bilansvarsloven).' },
        { q:'En bil skal hjem tom fra Bergen. Bedriften tar et billig oppdrag som dekker drivstoff og sjåførlønn, men ikke hele kostnaden til bilen. Hvilken kalkyle er brukt?', a:['Bidragskalkyle','Selvkostkalkyle','Resultatbudsjett','Balansebudsjett'], r:0, f:'Bidragskalkylen dekker de variable kostnadene og bare en del av de faste.' },
        { q:'Hvilken forsikring må alle arbeidsgivere tegne for de ansatte?', a:['Yrkesskadeforsikring','Kasko','Reiseforsikring','Flåteforsikring'], r:0, f:'Yrkesskadeforsikring er lovpålagt for arbeidsgivere.' },
        { q:'En pall tar 0,4 lastemeter. Hvor mange lastemeter tar fem paller?', a:['2,0','0,8','4,0','1,2'], r:0, f:'5 × 0,4 = 2,0 lastemeter.' }
      ]},
      { type:'fill', id:'t7-fill', nivaa:2, tittel:'Fyll inn: Emma starter transportbedrift', tekst:'Emma vil starte en budbilbedrift. Hun skriver en [[forretningsplan]] og registrerer bedriften med en samordnet registermelding. Hun velger [[enkeltpersonforetak]], fordi hun er eneste eier. Hun har 100 000 kroner i [[egenkapital]] og låner resten i banken. Før hun begynner å kjøre, må hun ha [[løyve]] og [[trafikkforsikring]] på bilen. For å se om hun får betalt regningene i tide, lager hun et [[likviditetsbudsjett]].', ekstra:['aksjeselskap','balansebudsjett','kasko','tollager'], f:'Alle ordene finner du i ordboka. Velg «Bransjelære-boka» i nedtrekkslista.' },
      { type:'reflect', id:'t7-r1', nivaa:3, tittel:'Min egen transportbedrift', q:'Tenk deg at du skal starte en liten bedrift innen transport eller logistikk. Skriv en kort forretningsidé (2–3 setninger). Forklar så hvilken selskapsform du velger, hvordan du vil finansiere oppstarten, og hvilke forsikringer bedriften trenger. Bruk minst seks fagord fra bransjelære-delen av ordboka, og sjekk minst ett av dem på NDLA.', punkter:[
        'Forretningsideen sier hva jeg skal tilby og til hvem.',
        'Jeg har valgt og begrunnet selskapsform.',
        'Jeg har forklart hvordan oppstarten skal finansieres.',
        'Jeg har nevnt minst to forsikringer og forklart hvorfor.',
        'Jeg har brukt minst seks fagord riktig.',
        'Jeg har oppgitt én NDLA-ressurs jeg har brukt.'
      ]}
    ]
  },
  /* ================================================================ T8 */
  {
    id: 't8', lok: 'O-08', tittel: 'Bransjelære: arbeidsliv, miljø og samferdsel',
    kort: 'Rettigheter og plikter på jobben, bærekraft og avfall, og hvordan transportsystemet i Norge henger sammen.',
    mal: ['bruke riktige fagord om rettigheter og plikter i arbeidslivet','forklare ord om bærekraft, utslipp og avfall','beskrive transportsystemet med ord som knutepunkt, lenke og infrastruktur'],
    punkter: [
      '<b>Arbeidsmiljøloven</b> gir regler om arbeidsmiljø, arbeidstid, <b>oppsigelse</b> og <b>avskjed</b>. Du har rett til å <b>varsle</b> om kritikkverdige forhold.',
      'En <b>individuell arbeidsavtale</b> gjelder deg. En <b>tariffavtale</b> (kollektiv avtale) gjelder mange og er inngått mellom fagforening og arbeidsgiver.',
      '<b>Bærekraftig utvikling</b> handler om å dekke behovene i dag uten å ødelegge for dem som kommer etter oss. <b>Karbonavtrykk</b> og <b>CO₂-ekvivalenter</b> brukes til å måle klimautslipp.',
      'Avfall deles i blant annet <b>husholdningsavfall</b>, <b>næringsavfall</b>, <b>farlig avfall</b> og <b>restavfall</b>. Mye kan gå til <b>gjenvinning</b>.',
      '<b>Transportsystemet</b> består av <b>knutepunkter</b> (terminaler, havner, stasjoner) og <b>lenker</b> (veger, jernbane, farleder) – til sammen <b>infrastrukturen</b>. <b>NTP</b> er planen for hvordan den skal bygges ut.',
      'Filtrer på tema <a href="' + ORDBOK + '?tema=A">Arbeidsliv, lover og etikk</a>, <a href="' + ORDBOK + '?tema=M">Miljø og avfall</a> eller <a href="' + ORDBOK + '?tema=N">Samferdsel og infrastruktur</a>.'
    ],
    ekstra: NDLA_INSTRUKS,
    ndla: [
      ['Plikter og rettigheter i arbeidslivet', NDLA_BL_E + 'plikter-og-rettigheter-i-arbeidslivet/e7ae78ef91', 'Emne'],
      ['Likeverd og inkludering i arbeidslivet', 'https://ndla.no/r/bransjelare-tp-tol-vg2---ressurssamling/likeverd-og-inkludering-i-arbeidslivet/bb1788fd77', 'Fagstoff'],
      ['Yrkesetikk', NDLA_BL_E + 'yrkesetikk/9c95f7712c', 'Emne'],
      ['Kosthold og helse', NDLA_BL_E + 'kosthold-og-helse/2a9ef4cddb', 'Emne'],
      ['Søk på NDLA: bærekraftig utvikling', NDLA_SOK('bærekraftig utvikling grønn logistikk'), 'Søk']
    ],
    aktiviteter: [
      { type:'match', id:'t8-m1', nivaa:1, tittel:'Ord fra arbeidslivet', instr:'Koble ordet med riktig forklaring.', par:[
        ['Oppsigelse','Arbeidsforholdet avsluttes med en oppsigelsestid'],
        ['Avskjed','Arbeidsforholdet avsluttes med en gang etter et grovt brudd'],
        ['Tariffavtale','Avtale mellom fagforening og arbeidsgiver om lønn og vilkår'],
        ['Varsling','Å si fra om kritikkverdige forhold på jobben'],
        ['Hersketeknikker','Måter å gjøre andre små på'],
        ['Feriepenger','Penger til ferien, beregnet av fjorårets lønn']
      ]},
      { type:'sort', id:'t8-s1', nivaa:1, tittel:'Hvor skal avfallet?', instr:'Sorter avfallet fra en transportbedrift.', kat:['Farlig avfall','Kan gjenvinnes (papp, plast, metall)','Restavfall'], items:[
        ['Spillolje fra verkstedet', 0, 'Spillolje er farlig avfall og skal leveres til godkjent mottak.'],
        ['Brukte batterier', 0, 'Batterier inneholder stoffer som er farlige for miljøet.'],
        ['Emballasjekartong fra varemottaket', 1, 'Papp kan materialgjenvinnes.'],
        ['Rene plastfilmer fra pallene', 1, 'Ren plastemballasje kan gjenvinnes.'],
        ['Rester av malingsspann med maling i', 0, 'Maling er farlig avfall.'],
        ['Skitten, sammensatt emballasje som ikke kan sorteres', 2, 'Det som ikke kan sorteres ut, går i restavfallet.']
      ]},
      { type:'tf', id:'t8-tf', nivaa:2, tittel:'Sant eller usant: miljø og samferdsel', ps:[
        ['En batterielektrisk lastebil har ikke utslipp fra eksosrøret.', true, 'Men produksjonen av bil og batteri gir utslipp.'],
        ['Euro VI er en strengere utslippsklasse enn Euro III.', true, 'Jo høyere euroklasse, jo renere motor.'],
        ['Et knutepunkt er en strekning mellom to byer.', false, 'Strekningen kalles en lenke. Knutepunktet er stedet der linjer møtes, for eksempel en terminal.'],
        ['NTP er planen for utbygging av veg, bane, sjø og luftfart.', true, 'Nasjonal transportplan lages på nytt hvert fjerde år.'],
        ['Svevestøv er ufarlig å puste inn.', false, 'Små partikler i lufta kan gi helseplager, særlig for luftveiene.'],
        ['Allmenningens tragedie betyr at en felles ressurs blir ødelagt når ingen tar ansvar.', true, 'Eksempler er overfiske og luftforurensning.']
      ]},
      { type:'case', id:'t8-case', nivaa:2, tittel:'Case: Noe er galt på lageret', intro:'Jonas er lærling på et oppdiktet lager. Han ser at en kollega kjører truck uten kompetansebevis, og at nødutgangen ofte er blokkert av paller.', steg:[
        { q:'Hva bør Jonas gjøre først?', valg:[
          { t:'Si fra til nærmeste leder eller verneombudet', ok:true, f:'Riktig. Kritikkverdige forhold skal meldes til noen som kan gjøre noe med dem.' },
          { t:'Legge ut bilder på sosiale medier', ok:false, f:'Det kan skade bedriften og andre. Varsle internt først.' },
          { t:'Ikke gjøre noe – han er bare lærling', ok:false, f:'Alle ansatte har rett, og noen ganger plikt, til å si fra om farlige forhold.' }
        ]},
        { q:'Hvordan kan Jonas melde fra skriftlig?', valg:[
          { t:'Skrive en avviksrapport', ok:true, f:'Riktig. Avviket blir registrert og skal følges opp.' },
          { t:'Skrive en oppsigelse', ok:false, f:'En oppsigelse avslutter arbeidsforholdet. Det har ingenting med saken å gjøre.' },
          { t:'Sende en faktura', ok:false, f:'En faktura brukes når bedriften skal ha betalt.' }
        ]},
        { q:'Kan Jonas bli straffet av arbeidsgiveren for å ha varslet på en forsvarlig måte?', valg:[
          { t:'Nei, arbeidsmiljøloven beskytter den som varsler mot gjengjeldelse', ok:true, f:'Riktig. Varslingsreglene gir vern mot gjengjeldelse.' },
          { t:'Ja, lærlinger har ikke lov til å varsle', ok:false, f:'Varslingsreglene gjelder også lærlinger.' },
          { t:'Ja, hvis sjefen blir sur', ok:false, f:'Gjengjeldelse mot en som varsler forsvarlig, er forbudt.' }
        ]}
      ]},
      { type:'reflect', id:'t8-r1', nivaa:3, vis: NDLA_INSTRUKS, fase:'ov', tittel:'Ordjeger i bransjelære', q:'Velg tre ord fra bransjelære-delen av ordboka – ett om arbeidsliv, ett om miljø og ett om samferdsel. Søk opp hvert ord på NDLA, gjerne i faget Bransjelære (TP-TOL vg2). Skriv for hvert ord: en forklaring med egne ord, et eksempel fra en transport- eller logistikkbedrift, og tittelen på NDLA-ressursen.', punkter:[
        'Jeg har valgt ett ord om arbeidsliv, ett om miljø og ett om samferdsel.',
        'Hver forklaring er skrevet med egne ord.',
        'Hvert ord har et eksempel fra en transport- eller logistikkbedrift.',
        'Jeg har oppgitt tittelen på NDLA-ressursen for hvert ord.',
        'Jeg har sjekket sidetallet i bransjelære-boka for minst ett av ordene.'
      ]},
      { type:'voks', id:'t8-voks', tittel:'Du har rettigheter – og ansvar', tekst:['Som lærling er det lett å tenke at du bare skal gjøre som du får beskjed om. Men arbeidslivet i Norge bygger på at også de ansatte sier fra.','Når du kjenner rettighetene dine, er det lettere å si nei til noe som er farlig – og lettere å stå opp for en kollega.','Samtidig har du plikter: å møte presist, følge sikkerhetsreglene og behandle andre med respekt.'], sporsmal:['Hvilken rettighet i arbeidslivet synes du er viktigst?','Hvem på arbeidsplassen din kan du gå til hvis noe er galt?'], handling:'Finn ut hvem som er verneombud eller tillitsvalgt der du har praksis.' }
    ]
  }

  ]
});
})();
