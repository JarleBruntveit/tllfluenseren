/* Førerkort klasse B – egenprodusert læringsinnhold for Bransjeteknikk (Vg2 TOL).
   Faglig grunnlag: Statens vegvesens sider om førerkort klasse B og øvelseskjøring, vegtrafikkloven og trafikkreglene.
   Ingen tekst er kopiert fra lærebøker eller fra Statens vegvesen. */
const SVV_B = 'https://www.vegvesen.no/forerkort/ta-forerkort/veien-til-forerkortet/personbil-b/';
const SVV_OVING = 'https://www.vegvesen.no/forerkort/ta-forerkort/ovelseskjoring/personbil';
const SVV_GENERELT = 'https://www.vegvesen.no/forerkort/ta-forerkort/ovelseskjoring/generelt-om-ovelseskjoring/';
const SVV_MORKE = 'https://www.vegvesen.no/forerkort/ta-forerkort/trafikant-i-morket/';
const SVV_HEFTE = 'https://www.vegvesen.no/globalassets/forerkort/har-forerkort/forerkort-klasse-b.-bokmal.pdf';
const LOVDATA_VTRL = 'https://lovdata.no/lov/1965-06-18-4';
const LOVDATA_TRAFIKK = 'https://lovdata.no/forskrift/1986-03-21-747';

/* ---------- Egne tegninger (SVG). Klikkbare områder har data-z. ---------- */
const S = 'font-family="Inter,system-ui,sans-serif"';

/* Veg med oppmerking sett ovenfra */
const SVG_VEG = `<svg viewBox="0 0 600 340" ${S} role="img" aria-label="En veg sett ovenfra med vegoppmerking, gangfelt og et kryss">
  <rect x="0" y="0" width="600" height="340" fill="#dfe7d6"/>
  <rect x="0" y="110" width="600" height="120" fill="#5b6168"/>
  <rect x="380" y="0" width="90" height="110" fill="#5b6168"/>
  <rect data-z="kant" x="0" y="216" width="370" height="5" fill="#ffffff"/>
  <rect data-z="kant" x="0" y="119" width="370" height="5" fill="#ffffff"/>
  <g data-z="sperre" fill="#f2c200"><rect x="20" y="166" width="150" height="7"/></g>
  <g data-z="varsel" fill="#f2c200"><rect x="185" y="166" width="40" height="7"/><rect x="235" y="166" width="40" height="7"/><rect x="285" y="166" width="40" height="7"/></g>
  <g data-z="gangfelt" fill="#ffffff"><rect x="490" y="118" width="70" height="12"/><rect x="490" y="142" width="70" height="12"/><rect x="490" y="166" width="70" height="12"/><rect x="490" y="190" width="70" height="12"/><rect x="490" y="212" width="70" height="12"/></g>
  <g data-z="vike" fill="#ffffff"><path d="M386 100l10 -14 10 14z"/><path d="M408 100l10 -14 10 14z"/><path d="M430 100l10 -14 10 14z"/><path d="M452 100l10 -14 10 14z"/></g>
  <rect data-z="stopp" x="345" y="174" width="10" height="44" fill="#ffffff"/>
  <path d="M60 196h40l-10 -8M100 196l-10 8" stroke="#ffffff" stroke-width="3" fill="none" pointer-events="none"/>
  <path d="M370 148h-40l10 -8M330 148l10 8" stroke="#ffffff" stroke-width="3" fill="none" pointer-events="none"/>
  <text x="20" y="30" font-size="13" fill="#1b2128">Sidevegen kommer inn ovenfra →</text>
  <text x="300" y="262" text-anchor="middle" font-size="12" fill="#1b2128">Kjøreretning vises med hvite piler. Tegningen er forenklet og ikke i målestokk.</text>
</svg>`;

/* Personbil sett fra siden – kontroll før kjøring */
const SVG_BIL = `<svg viewBox="0 0 600 320" ${S} role="img" aria-label="En personbil sett fra siden med punkter som skal kontrolleres før kjøring">
  <rect x="0" y="0" width="600" height="320" fill="#ffffff"/>
  <path d="M60 210 L80 150 Q100 140 170 138 L230 92 Q250 82 300 82 L390 82 Q420 84 445 110 L480 140 Q540 146 548 170 L552 210 Z" fill="#cfd8e3" stroke="#334" stroke-width="3"/>
  <path d="M240 98 L300 92 L300 136 L196 138 Z" fill="#eaf2fb" stroke="#334" stroke-width="2"/>
  <path d="M312 92 L388 92 Q410 96 430 120 L436 136 L312 136 Z" fill="#eaf2fb" stroke="#334" stroke-width="2"/>
  <circle data-z="dekk" cx="150" cy="214" r="38" fill="#2a2f35"/><circle cx="150" cy="214" r="15" fill="#9aa3ab" pointer-events="none"/>
  <circle data-z="dekk" cx="460" cy="214" r="38" fill="#2a2f35"/><circle cx="460" cy="214" r="15" fill="#9aa3ab" pointer-events="none"/>
  <rect data-z="lys" x="532" y="160" width="20" height="16" rx="4" fill="#ffe27a" stroke="#334"/>
  <rect data-z="baklys" x="58" y="160" width="18" height="18" rx="4" fill="#e04848" stroke="#334"/>
  <rect data-z="speil" x="200" y="118" width="22" height="14" rx="4" fill="#9aa3ab" stroke="#334"/>
  <path data-z="vindu" d="M445 112 L478 140 L440 138 Z" fill="#bfe0ff" stroke="#334" stroke-width="2"/>
  <rect data-z="motor" x="470" y="146" width="62" height="14" rx="3" fill="#b6c2cf" stroke="#334"/>
  <text x="300" y="300" text-anchor="middle" font-size="12" fill="#5c6670">Forenklet tegning av en personbil sett fra venstre side. Fronten er til høyre.</text>
</svg>`;

TLL.registrer({
  id: 'forerkort-b',
  fag: 'Bransjeteknikk',
  kortnavn: 'Førerkort B',
  kortTittel: 'Førerkort klasse B',
  oppsett: 'fokus',
  nr: 'B',
  tittel: 'Førerkort klasse B',
  ingress: 'Lær reglene, forstå risikoen og ta trygge valg bak rattet. Temaene følger veien fra trafikalt grunnkurs til førerprøven.',
  prove: false,
  ressursomrade: 'bransjeteknikk',
  kompetansemal: [
    { kode: 'TOL02-01 · KV426', tekst: 'føre personbil i henhold til gjeldende regelverk' },
    { kode: 'TOL02-01 · KV426', tekst: 'reflektere over og vurdere risiko i ulike situasjoner knyttet til føring av personbil' }
  ],
  ressurser: {
    presentasjon: '',
    laerebok: 'Faget har ingen lærebok her. Bruk Statens vegvesens sider og trafikkskolens materiell.',
    arbeidsbok: '',
    ndlaEmne: SVV_B,
    ndlaEmneTag: 'Vegvesen',
    ndlaEmneNavn: 'Veien til førerkortet – personbil (B) hos Statens vegvesen',
    ordliste: SVV_HEFTE,
    ordlisteTag: 'Vegvesen',
    ordlisteNavn: 'Veiledning: opplæring, øvelseskjøring og mengdetrening (PDF)'
  },
  fotnote: 'Førerkort klasse B · Innholdet er læringsstøtte. Vegtrafikkloven, trafikkreglene og Statens vegvesens regler har forrang, og regler kan endres – kontroller alltid hos Statens vegvesen. Siden erstatter ikke trafikalt grunnkurs, obligatorisk opplæring på trafikkskole eller førerprøven. Resultater lagres bare i nettleseren på denne enheten – <a href="#/lagring">les om lagring</a> · <a href="#/rapport">lever fremdrift</a>.',
  temaer: [
    /* ================================================================ FK-01 */
    {
      id: 'veien', lok: 'FK-01', tittel: 'Veien til førerkortet',
      kort: 'De fire trinnene, øvelseskjøring og hva som må være på plass før førerprøven.',
      bok: 'Statens vegvesen: Veien til førerkortet – personbil (B) og Generelt om øvelseskjøring',
      mal: ['forklare de fire trinnene i opplæringen for klasse B','gjøre rede for kravene til elev og ledsager ved øvelseskjøring','forklare hva prøvetiden betyr for en ny sjåfør'],
      punkter: [
        'Opplæringen har <b>fire trinn</b>: 1 Trafikalt grunnkurs, 2 Grunnleggende kjøretøy- og kjørekompetanse, 3 Trafikal del og 4 Avsluttende opplæring.',
        '<b>Trafikalt grunnkurs</b> må være fullført før du kan øvelseskjøre. Kurset har blant annet førstehjelp og plikter ved trafikkuhell og <b>Trafikant i mørket</b> (mørkekjøring).',
        'Mørkekjøring kan bare tas mellom <b>1. november og 15. mars</b>. Uten den gjelder øvelseskjøringsbeviset bare i den lyse delen av året.',
        'For å øvelseskjøre må du ha fylt <b>16 år</b>, ha med <b>øvelseskjøringsbevis</b> og legitimasjon, og bilen skal ha <b>L-skilt</b>. Ledsageren må ha fylt <b>25 år</b> og ha hatt førerkort for klassen sammenhengende i minst fem år.',
        'Det er <b>obligatoriske veiledningstimer</b> mellom trinn 2 og 3 og mellom trinn 3 og 4, og obligatoriske sikkerhetskurs på trinn 3 og 4.',
        'Førerprøven består av en <b>teoriprøve</b> og en <b>praktisk prøve</b>. De første to årene med førerkort er <b>prøvetid</b> – da teller prikker dobbelt.'
      ],
      ndla: [['Veien til førerkortet – personbil (B)', SVV_B, 'Vegvesen'],['Øvelseskjøring med personbil', SVV_OVING, 'Vegvesen'],['Trafikant i mørket', SVV_MORKE, 'Vegvesen']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'veien-voks', tittel:'Førerkortet er et ansvar', tekst:['Mange gleder seg til førerkortet fordi det gir frihet. Det er helt riktig. Men samme dag som du får kortet, får du også ansvaret for alle som sitter i bilen og alle du møter på vegen.','En trygg sjåfør er ikke den som kjører fortest eller tøffest. Det er den som tar gode valg også når ingen ser på.'], sporsmal:['Hva betyr det for deg å være en sjåfør andre føler seg trygge med?','Hvem i livet ditt har lært deg noe om å kjøre trygt – og hva var det?'], handling:'Skriv én setning om hva slags sjåfør du vil være. Les den igjen før neste kjøretime.' },
        { type:'flash', id:'veien-flash', tittel:'Begrepskort: veien til førerkortet', kort:[
          ['Trafikalt grunnkurs','Trinn 1. Obligatorisk kurs som må være fullført før du kan øvelseskjøre.'],
          ['Øvelseskjøringsbevis','Beviset som viser at du har rett til å øvelseskjøre. Det skal være med under kjøringen.'],
          ['Trafikant i mørket','Mørkekjøring. Obligatorisk del av grunnkurset som tas mellom 1. november og 15. mars.'],
          ['Ledsager','Personen som sitter ved siden av deg ved privat øvelseskjøring. Må ha fylt 25 år og ha hatt førerkort for klassen i minst fem år sammenhengende.'],
          ['L-skilt','Skilt som viser at bilen brukes til øvelseskjøring.'],
          ['Veiledningstime','Obligatorisk time med trafikklærer der dere vurderer om du er klar for neste trinn.'],
          ['Førerprøve','Teoriprøve og praktisk prøve hos Statens vegvesen.'],
          ['Prøvetid','De to første årene med førerkort. Prikker teller dobbelt.']
        ]},
        { type:'order', id:'veien-o1', nivaa:1, tittel:'Sett trinnene i rekkefølge', instr:'Sett stegene på veien til førerkortet i riktig rekkefølge.', steg:[
          'Trafikalt grunnkurs (trinn 1)','Grunnleggende kjøretøy- og kjørekompetanse (trinn 2)','Veiledningstime','Trafikal del (trinn 3)','Veiledningstime','Avsluttende opplæring (trinn 4)','Teoriprøve','Praktisk førerprøve'
        ], f:'Teoriprøven må være bestått før du kan ta den praktiske prøven.' },
        { type:'quiz', id:'veien-q1', nivaa:1, tittel:'Hva kreves for å øvelseskjøre?', sp:[
          {q:'Hvor gammel må du være for å øvelseskjøre med personbil?',a:['16 år','15 år','17 år','18 år'],r:0,f:'Du må ha fylt 16 år og ha fullført trafikalt grunnkurs.'},
          {q:'Hvor gammel må ledsageren være?',a:['25 år','18 år','20 år','30 år'],r:0,f:'Ledsageren må ha fylt 25 år og ha hatt førerkort for klassen i minst fem år sammenhengende.'},
          {q:'Når kan du ta Trafikant i mørket?',a:['Mellom 1. november og 15. mars','Hele året','Bare i desember','Mellom 16. mars og 31. oktober'],r:0,f:'Det må være mørkt nok ute til å gjennomføre kurset.'},
          {q:'Hva skal bilen ha på seg når du øvelseskjører?',a:['L-skilt','P-skilt','Gult nummerskilt','Ingenting spesielt'],r:0,f:'L-skiltet viser andre trafikanter at føreren er under opplæring.'}
        ]},
        { type:'tf', id:'veien-tf', nivaa:2, tittel:'Sant eller usant: øvelseskjøring', ps:[
          ['Du kan begynne å øvelseskjøre før trafikalt grunnkurs er fullført hvis ledsageren er erfaren.',false,'Under 25 år må grunnkurset være fullført før øvelseskjøring.'],
          ['Det er lov å betale en privat person for å øvelseskjøre med deg.',false,'Statens vegvesen sier tydelig at du ikke skal betale noen for privat øvelseskjøring. Betalt opplæring skal skje på trafikkskole.'],
          ['Har du ikke tatt mørkekjøring, kan øvelseskjøringsbeviset være begrenset til den lyse delen av året.',true,'Beviset blir oppdatert når mørkekjøringen er gjennomført.'],
          ['Prikker teller dobbelt i prøvetiden.',true,'Prøvetiden er de to første årene med førerkort.'],
          ['Du må ikke øvelseskjøre hvis du er trøtt eller syk.',true,'Helsekravene gjelder både for eleven og ledsageren.']
        ]},
        { type:'case', id:'veien-case', nivaa:3, tittel:'Case: Søndagstur med onkel', intro:'Emma er 16 år og har fullført trafikalt grunnkurs i september. Det er nå midt i januar. Onkelen hennes er 27 år og fikk førerkort for tre år siden. De vil øvelseskjøre til hytta.', steg:[
          {q:'Kan onkelen være ledsager?',valg:[{t:'Nei – han har ikke hatt førerkort i fem år sammenhengende',ok:true,f:'Både alderskravet (25 år) og femårskravet må være oppfylt.'},{t:'Ja – han er over 25 år',ok:false,f:'Alder er bare ett av kravene.'},{t:'Ja – hvis de kjører sakte',ok:false,f:'Farten endrer ikke kravene til ledsager.'}]},
          {q:'Emma har ikke tatt mørkekjøring. Hva betyr det i januar?',valg:[{t:'Øvelseskjøringsbeviset hennes gjelder ikke nå, før mørkekjøringen er tatt',ok:true,f:'Et bevis fra den lyse perioden gjelder bare 16. mars–31. oktober.'},{t:'Det har ingen betydning',ok:false,f:'Sjekk øvelseskjøringsbeviset – det kan være begrenset.'},{t:'Hun kan kjøre så lenge det er dagslys',ok:false,f:'Det er perioden på beviset som gjelder, ikke klokkeslettet.'}]},
          {q:'Hva er det beste å gjøre?',valg:[{t:'Melde seg på mørkekjøring og finne en ledsager som oppfyller kravene',ok:true,f:'Da blir øvelseskjøringen lovlig og trygg.'},{t:'Kjøre likevel og håpe at de ikke blir stoppet',ok:false,f:'Kjøringen er ulovlig, og forsikringen kan få problemer ved et uhell.'},{t:'La onkelen kjøre første halvdel',ok:false,f:'Det løser ikke problemet for Emmas øvelseskjøring.'}]}
        ]},
        { type:'reflect', id:'veien-r1', nivaa:3, tittel:'Lag en plan for førerkortet', q:'Lag en realistisk plan for hvordan du (eller en tenkt elev) kan ta førerkort klasse B. Ta med trinnene, de obligatoriske kursene og hvordan du vil bruke øvelseskjøring for å bli en trygg sjåfør.', punkter:['nevner de fire trinnene i riktig rekkefølge','tar med trafikalt grunnkurs og mørkekjøring','nevner veiledningstimene og sikkerhetskursene','beskriver krav til ledsager og øvelseskjøring','forklarer hvorfor mengdetrening er viktig','nevner teoriprøve, praktisk prøve og prøvetid'] }
      ]
    },
    /* ================================================================ FK-02 */
    {
      id: 'regler', lok: 'FK-02', tittel: 'Trafikkregler og førerens ansvar',
      kort: 'Grunnregelen, vikeplikt, fart, rus, mobil og ansvaret for passasjerene.',
      bok: 'Vegtrafikkloven § 3 og forskrift om kjørende og gående trafikk (trafikkreglene)',
      mal: ['forklare grunnregelen i vegtrafikkloven § 3 med egne ord','bruke reglene for vikeplikt i vanlige kryss','gjøre rede for regler om fart, rus, mobilbruk og sikring av passasjerer'],
      punkter: [
        '<b>Grunnregelen</b> (vegtrafikkloven § 3): Du skal være aktpågivende og ta hensyn, slik at det ikke oppstår fare eller skade, og slik at andre ikke blir unødig hindret eller forstyrret.',
        '<b>Høyreregelen:</b> Når ingen skilt eller lysregulering sier noe annet, har du vikeplikt for kjørende som kommer fra høyre.',
        'Du har alltid vikeplikt når du kjører ut fra <b>parkeringsplass, gårdsplass, bensinstasjon</b> og lignende. Ved gangfelt skal du stoppe for gående som er i eller på vei ut i feltet.',
        'Når det ikke er skiltet noe annet, er fartsgrensen <b>50 km/t i tettbygd strøk</b> og <b>80 km/t utenfor</b>. Fartsgrensen er en øvre grense – ikke et mål.',
        'Promillegrensen er <b>0,2</b>. Det er forbudt å bruke <b>håndholdt mobiltelefon</b> under kjøring.',
        'Føreren har ansvar for at passasjerer <b>under 15 år</b> er sikret. Barn under 135 cm skal bruke godkjent sikringsutstyr.'
      ],
      ndla: [['Vegtrafikkloven', LOVDATA_VTRL, 'Lovdata'],['Trafikkreglene', LOVDATA_TRAFIKK, 'Lovdata']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'regler-voks', tittel:'Regler er avtaler mellom mennesker', tekst:['Trafikkreglene er en avtale mellom alle som bruker vegen. Når alle følger den, kan vi forutse hva andre gjør. Når noen bryter den, blir trafikken uforutsigbar – og farlig.','Grunnregelen sier egentlig dette: Kjør slik du vil at andre skal kjøre rundt deg og dem du er glad i.'], sporsmal:['Hvilken trafikkregel ser du oftest at folk bryter?','Hvorfor tror du noen bryter regler selv om de vet at de er farlige?'], handling:'Legg merke til én situasjon i trafikken i dag der noen viser hensyn. Fortell om den i neste økt.' },
        { type:'flash', id:'regler-flash', tittel:'Begrepskort: trafikkregler', kort:[
          ['Grunnregelen','Vegtrafikkloven § 3: Vær aktpågivende og hensynsfull, så det ikke oppstår fare eller skade.'],
          ['Vikeplikt','Du skal la andre kjøre først. Du må vise tydelig, i god tid, at du har tenkt å vike.'],
          ['Høyreregelen','Vikeplikt for kjørende fra høyre når skilt eller lys ikke sier noe annet.'],
          ['Tettbygd strøk','Område med sammenhengende bebyggelse. Generell fartsgrense 50 km/t.'],
          ['Promille','Mengden alkohol i blodet. Grensen for å kjøre er 0,2.'],
          ['Sikringsutstyr','Barnesete, beltepute og lignende for barn under 135 cm.'],
          ['Førerkortet','Skal være med når du kjører.']
        ]},
        { type:'quiz', id:'regler-q1', nivaa:1, tittel:'Kan du reglene?', sp:[
          {q:'Hva er den generelle fartsgrensen i tettbygd strøk?',a:['50 km/t','30 km/t','60 km/t','80 km/t'],r:0,f:'50 km/t gjelder når det ikke er skiltet noe annet.'},
          {q:'Hva er den generelle fartsgrensen utenfor tettbygd strøk?',a:['80 km/t','70 km/t','90 km/t','100 km/t'],r:0,f:'80 km/t gjelder når det ikke er skiltet noe annet.'},
          {q:'Hva er promillegrensen for å kjøre bil i Norge?',a:['0,2','0,0','0,5','0,8'],r:0,f:'Grensen er 0,2. Det tryggeste er å ikke drikke i det hele tatt før du kjører.'},
          {q:'Hvem har ansvar for at en 12-åring bruker bilbelte?',a:['Føreren','12-åringen selv','Foreldrene, selv om de ikke er i bilen','Ingen'],r:0,f:'Føreren har ansvaret for passasjerer under 15 år.'}
        ]},
        { type:'sort', id:'regler-s1', nivaa:2, tittel:'Hvem har vikeplikt?', instr:'Det er ingen skilt eller lys. Sorter situasjonene: Har DU vikeplikt, eller har DEN ANDRE vikeplikt?', kat:['Jeg har vikeplikt','Den andre har vikeplikt'], items:[
          ['En bil kommer fra høyre i et uregulert kryss',0,'Høyreregelen.'],
          ['En bil kommer fra venstre i et uregulert kryss',1,'Den andre har deg på høyre side.'],
          ['Du kjører ut fra en parkeringsplass',0,'Du har vikeplikt når du kjører ut fra parkeringsplass.'],
          ['En bil kjører ut fra en bensinstasjon foran deg',1,'Den som kjører ut fra bensinstasjon, har vikeplikt.'],
          ['En fotgjenger er på vei ut i et gangfelt',0,'Du skal stoppe for gående i eller på vei ut i gangfeltet.'],
          ['Du kjører ut fra en gårdsplass',0,'Utkjøring fra gårdsplass gir vikeplikt.']
        ], f:'Vikeplikten må vises tydelig: Senk farten i god tid.' },
        { type:'tf', id:'regler-tf', nivaa:2, tittel:'Sant eller usant: ansvar og rus', ps:[
          ['Det er lov å holde mobilen i hånda så lenge du står i kø.',false,'Forbudet gjelder under kjøring, også i kø. Bruk handsfree eller la telefonen være.'],
          ['Fartsgrensen er den farten du skal kjøre i.',false,'Fartsgrensen er den høyeste lovlige farten. Forholdene kan kreve lavere fart.'],
          ['Barn under 135 cm skal bruke godkjent sikringsutstyr.',true,'For eksempel barnesete eller beltepute.'],
          ['Grunnregelen gjelder bare når det ikke finnes andre regler.',false,'Grunnregelen gjelder alltid, i tillegg til de andre reglene.'],
          ['Noen medisiner kan gjøre det ulovlig å kjøre.',true,'Se etter den røde varseltrekanten på pakningen og spør lege eller apotek.']
        ]},
        { type:'case', id:'regler-case', nivaa:3, tittel:'Case: Etter fotballkampen', intro:'Jonas (19) har hatt førerkort i fire måneder. Etter kampen skal han kjøre tre lagkamerater hjem. Han drakk en øl for to timer siden. En av kameratene er 14 år og vil sitte uten belte fordi turen er kort.', steg:[
          {q:'Jonas føler seg helt edru. Hva bør han gjøre?',valg:[{t:'La være å kjøre – han kan ikke vite at promillen er under grensen, og han har prøvetid',ok:true,f:'Følelsen av å være edru er ikke et sikkert mål. Det tryggeste er null alkohol før kjøring.'},{t:'Kjøre forsiktig',ok:false,f:'Alkohol påvirker reaksjonsevne og vurderinger selv i små mengder.'},{t:'Drikke kaffe og kjøre',ok:false,f:'Kaffe fjerner ikke alkohol fra blodet.'}]},
          {q:'En annen voksen og edru person kjører i stedet. 14-åringen vil sitte uten belte. Hvem har ansvaret?',valg:[{t:'Føreren – passasjeren er under 15 år',ok:true,f:'Føreren skal sørge for at passasjerer under 15 år er sikret.'},{t:'14-åringen selv',ok:false,f:'Ansvaret ligger hos føreren for passasjerer under 15 år.'},{t:'Ingen, fordi turen er kort',ok:false,f:'Belte gjelder på alle turer, også korte.'}]},
          {q:'Hva er den beste beslutningen for hele gruppa?',valg:[{t:'Alle bruker belte, og en edru sjåfør kjører',ok:true,f:'Da er både lovkrav og sikkerhet ivaretatt.'},{t:'Kjøre på småveger for å unngå kontroll',ok:false,f:'Det handler om sikkerhet, ikke om å unngå kontroll.'},{t:'Kjøre to turer så bilen ikke blir så full',ok:false,f:'Det løser ikke problemet med alkohol og belte.'}]}
        ]},
        { type:'reflect', id:'regler-r1', nivaa:3, tittel:'Forklar grunnregelen', q:'Forklar grunnregelen i vegtrafikkloven § 3 med egne ord. Gi to eksempler fra trafikken der grunnregelen betyr noe selv om ingen annen regel blir brutt.', punkter:['forklarer aktpågivenhet og hensyn med egne ord','forklarer at målet er å unngå fare og skade','nevner at andre ikke skal hindres eller forstyrres unødig','gir et konkret eksempel (f.eks. tilpasse fart ved skole)','gir et eksempel med myke trafikanter eller dårlig føre','forklarer at grunnregelen gjelder i tillegg til andre regler'] }
      ]
    },
    /* ================================================================ FK-03 */
    {
      id: 'skilt', lok: 'FK-03', tittel: 'Skilt og vegoppmerking',
      kort: 'Kjenn igjen skiltgruppene og forstå hva linjene i vegen forteller deg.',
      bok: 'Skiltforskriften og trafikkreglene om vegoppmerking',
      mal: ['kjenne igjen hovedgruppene av trafikkskilt på form og farge','forklare forskjellen på gule og hvite linjer','vite hva sperrelinje, varsellinje, vikelinje og stopplinje betyr'],
      punkter: [
        '<b>Fareskilt</b> er trekantede med rød kant og spissen opp. De varsler om fare framover.',
        '<b>Vikepliktskilt</b> er blant annet trekanten med spissen ned (vikeplikt) og det åttekantede stoppskiltet. <b>Forkjørsveg</b> vises med et gult kvadrat på høykant.',
        '<b>Forbudsskilt</b> er runde med rød kant. <b>Påbudsskilt</b> er runde og blå. <b>Opplysningsskilt</b> er firkantede og ofte blå.',
        '<b>Gule linjer</b> skiller kjørefelt med motsatt kjøreretning. <b>Hvite linjer</b> skiller felt med samme retning og markerer kanten av vegen.',
        'En <b>heltrukket linje</b> (sperrelinje) skal du ikke krysse. <b>Varsellinje</b> har lange streker og korte mellomrom og varsler at sperrelinje eller fare kommer.',
        '<b>Vikelinje</b> (trekanter, «haitenner») viser hvor du skal stanse hvis du må vike. <b>Stopplinje</b> viser hvor du skal stoppe ved stoppskilt eller lys.'
      ],
      ndla: [['Veien til førerkortet – personbil (B)', SVV_B, 'Vegvesen'],['Trafikkreglene', LOVDATA_TRAFIKK, 'Lovdata']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'skilt-voks', tittel:'Å lese det som ikke blir sagt', tekst:['Et skilt snakker ikke, men det forteller deg mye: hva som venter, hva du må gjøre og hva andre forventer av deg.','Mennesker sender også signaler uten ord – med ansiktsuttrykk og kroppsspråk. Den som er god til å lese signaler, både i trafikken og i klasserommet, gjør det lettere for alle.'], sporsmal:['Hvordan merker du at en klassekamerat trenger hjelp, uten at han eller hun sier det?','Hvilket signal sender du selv når du er usikker?'], handling:'Spør én person i gruppa om de trenger hjelp før de spør deg.' },
        { type:'flash', id:'skilt-flash', tittel:'Begrepskort: skilt og linjer', kort:[
          ['Fareskilt','Trekant med rød kant og spissen opp. Varsler fare.'],
          ['Vikepliktskilt','Trekant med spissen ned. Du har vikeplikt.'],
          ['Stoppskilt','Åttekantet rødt skilt. Full stopp ved stopplinjen, deretter vikeplikt.'],
          ['Forkjørsveg','Gult kvadrat på høykant. De som kommer fra sidevegene, har vikeplikt for deg.'],
          ['Forbudsskilt','Rundt med rød kant. Noe er forbudt.'],
          ['Påbudsskilt','Rundt og blått. Noe er påbudt.'],
          ['Sperrelinje','Heltrukket linje. Skal ikke krysses.'],
          ['Varsellinje','Lange streker og korte mellomrom. Varsler sperrelinje eller fare.'],
          ['Vikelinje','Trekanter («haitenner») på tvers av feltet. Stans her hvis du må vike.']
        ]},
        { type:'match', id:'skilt-m1', nivaa:1, tittel:'Form og farge', instr:'Koble skiltgruppen med riktig form og farge.', par:[
          ['Fareskilt','Trekant med rød kant og spissen opp'],
          ['Vikeplikt','Trekant med spissen ned'],
          ['Stopp','Rødt åttekantet skilt'],
          ['Forbudsskilt','Rundt med rød kant'],
          ['Påbudsskilt','Rundt og blått'],
          ['Forkjørsveg','Gult kvadrat på høykant']
        ], f:'Formen alene forteller deg mye, også når skiltet er skittent eller dekket av snø.' },
        { type:'hotspot', id:'skilt-hs1', nivaa:2, tittel:'Les vegen', instr:'Tegningen viser en veg sett ovenfra. Trykk på riktig sted.', svg:SVG_VEG, sp:[
          { q:'Trykk på sperrelinjen.', z:'sperre', f:'Den heltrukne gule linjen skal ikke krysses.' },
          { q:'Trykk på varsellinjen.', z:'varsel', f:'Lange streker med korte mellomrom varsler at noe kommer.' },
          { q:'Trykk på en linje som markerer kanten av kjørebanen.', z:'kant', f:'Kantlinjen er hvit.' },
          { q:'Du kommer fra sidevegen ovenfra. Hvor skal du stanse hvis du må vike?', z:'vike', f:'Vikelinjen (trekantene) viser hvor du skal stanse.' },
          { q:'Trykk på gangfeltet.', z:'gangfelt', f:'Her skal du stoppe for gående som er i eller på vei ut i feltet.' },
          { q:'Trykk på stopplinjen.', z:'stopp', f:'Ved stoppskilt skal du stoppe helt ved stopplinjen.' }
        ]},
        { type:'tf', id:'skilt-tf', nivaa:2, tittel:'Sant eller usant: oppmerking', ps:[
          ['Gule linjer skiller felt med motsatt kjøreretning.',true,'Hvite linjer skiller felt med samme kjøreretning.'],
          ['Du kan krysse en sperrelinje hvis du har god oversikt.',false,'Sperrelinjen skal ikke krysses, uansett oversikt.'],
          ['Ved stoppskilt holder det å senke farten hvis vegen er tom.',false,'Du skal stoppe helt, også når det ikke kommer noen.'],
          ['En varsellinje forteller at det kommer en sperrelinje eller en farlig strekning.',true,'Gjør deg ferdig med en eventuell forbikjøring.'],
          ['På forkjørsveg har du vikeplikt for biler fra høyre.',false,'Kjører du på forkjørsveg, har de som kommer fra sidevegene vikeplikt.']
        ]},
        { type:'case', id:'skilt-case', nivaa:3, tittel:'Case: Forbikjøring på landevegen', intro:'Du kjører i 80 km/t bak en traktor som holder 35 km/t. Vegen er svingete, og det er en varsellinje i midten. Passasjeren din sier: «Nå er det klart, bare kjør!»', steg:[
          {q:'Hva forteller varsellinjen deg?',valg:[{t:'At sperrelinje eller fare kommer snart – du har kort strekning til rådighet',ok:true,f:'Varsellinjen betyr: Vær forsiktig, og ikke start en forbikjøring du ikke rekker å fullføre.'},{t:'At det er fritt fram',ok:false,f:'Varsellinjen er en advarsel.'},{t:'At du må stoppe',ok:false,f:'Varsellinjen krever ikke stopp.'}]},
          {q:'Du ser ikke langt nok fram til å vite om det kommer møtende. Hva gjør du?',valg:[{t:'Venter til du har full oversikt over en lang nok strekning',ok:true,f:'Du må se at forbikjøringen kan fullføres uten fare for møtende.'},{t:'Stoler på passasjeren',ok:false,f:'Det er du som fører som har ansvaret.'},{t:'Kjører forbi raskt med høy fart',ok:false,f:'Høy fart øker risikoen og bryter fartsgrensen.'}]},
          {q:'Traktoren blinker til høyre og kjører inn i en lomme. Hva betyr det?',valg:[{t:'Traktorføreren slipper deg forbi – kontroller likevel at det er fritt',ok:true,f:'Et høflig tegn, men ansvaret for forbikjøringen er fortsatt ditt.'},{t:'At du må stoppe bak traktoren',ok:false,f:'Det er et tegn på at du kan kjøre forbi når det er trygt.'},{t:'Ingenting',ok:false,f:'Tegngiving skal tas på alvor og leses.'}]}
        ]}
      ]
    },
    /* ================================================================ FK-04 */
    {
      id: 'bilen', lok: 'FK-04', tittel: 'Bilen, kontroll og last',
      kort: 'Kontroll før kjøring, dekk, EU-kontroll og hva du kan laste og trekke med klasse B.',
      bok: 'Statens vegvesen om kjøretøy, dekk og førerkort klasse B',
      mal: ['gjennomføre en enkel kontroll av bilen før kjøring','forklare kravene til mønsterdybde og vinterdekk','gjøre rede for hva klasse B gir rett til å kjøre og trekke'],
      punkter: [
        'Før kjøring: Sjekk at <b>lysene</b> virker, at <b>dekkene</b> er hele og har riktig lufttrykk, at <b>ruter og speil</b> er rene og at det ikke lyser <b>varsellamper</b> i dashbordet.',
        'Minste <b>mønsterdybde</b> er 1,6 mm på sommerdekk. På vinterdekk kreves minst 3 mm i vinterperioden.',
        'Personbilen skal til <b>EU-kontroll</b> første gang innen fire år, og deretter hvert andre år.',
        'Bilen skal ha <b>varseltrekant</b>, og det skal være <b>refleksvest</b> lett tilgjengelig for føreren.',
        'Klasse B gjelder bil med <b>tillatt totalvekt opptil 3500 kg</b> og høyst åtte passasjerer. Du kan trekke tilhenger med tillatt totalvekt opptil <b>750 kg</b> – eller tyngre hvis bil og henger til sammen ikke har over 3500 kg tillatt totalvekt.',
        'Løs last i kupeen kan bli et farlig prosjektil ved bråbremsing. <b>Sikre bagasjen</b> og hold deg innenfor tillatt taklast og nyttelast i vognkortet.'
      ],
      ndla: [['Veien til førerkortet – personbil (B)', SVV_B, 'Vegvesen'],['Veiledning klasse B (PDF)', SVV_HEFTE, 'Vegvesen']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'bilen-voks', tittel:'Små kontroller, stor forskjell', tekst:['En kontroll av bilen tar to minutter. Det er lett å hoppe over den når man har dårlig tid. Men en lampe som ikke virker, eller et dekk med for lite luft, kan være forskjellen på en vanlig tur og et uhell.','Det samme gjelder i en arbeidsgruppe: Den som sjekker detaljene, er ofte den som redder hele jobben.'], sporsmal:['Når har du hoppet over en kontroll fordi du hadde dårlig tid?','Hvordan kan du gjøre kontroller til en vane?'], handling:'Velg én kontroll du skal gjøre hver gang før du kjører (eller før du starter på verkstedet).' },
        { type:'flash', id:'bilen-flash', tittel:'Begrepskort: bilen', kort:[
          ['Mønsterdybde','Hvor dype sporene i dekket er. Minst 1,6 mm (sommer) og 3 mm (vinter i vinterperioden).'],
          ['Lufttrykk','Riktig trykk står ofte i dørkarmen eller i instruksjonsboka.'],
          ['EU-kontroll','Periodisk kontroll av bilen. Første gang innen fire år, deretter hvert andre år.'],
          ['Vognkort','Dokumentet med bilens data, blant annet tillatt totalvekt og tillatt tilhengervekt.'],
          ['Tillatt totalvekt','Hva bilen maks kan veie med last og personer.'],
          ['Varseltrekant','Settes ut for å varsle andre trafikanter ved stans eller uhell.'],
          ['Refleksvest','Skal være lett tilgjengelig for føreren.'],
          ['Varsellampe','Lampe i dashbordet som varsler feil, for eksempel lavt oljetrykk eller feil på bremsene.']
        ]},
        { type:'hotspot', id:'bilen-hs1', nivaa:1, tittel:'Kontroll før tur', instr:'Tegningen viser en bil fra siden. Trykk der du kontrollerer det som er beskrevet.', svg:SVG_BIL, sp:[
          { q:'Hvor kontrollerer du mønsterdybde og lufttrykk?', z:'dekk', f:'På dekkene. Se også etter kutt og bulker.' },
          { q:'Hvor sjekker du at nærlys og fjernlys virker?', z:'lys', f:'Frontlyset. Husk at du ikke selv ser om bremselysene virker – be noen hjelpe deg.' },
          { q:'Hvor sjekker du bremselys og baklys?', z:'baklys', f:'Baklysene. Be noen stå bak bilen mens du bremser.' },
          { q:'Hva må være rent og riktig innstilt før du kjører?', z:'speil', f:'Speilene. Still dem inn før du kjører, ikke under kjøringen.' },
          { q:'Hvor sjekker du spylervæske og oljenivå?', z:'motor', f:'Under panseret. Følg instruksjonsboka for bilen.' },
          { q:'Hva må være fritt for is, snø og dugg?', z:'vindu', f:'Rutene. Du skal ha fri sikt i alle retninger.' }
        ]},
        { type:'check', id:'bilen-chk1', nivaa:2, tittel:'Kan bilen brukes i dag?', instr:'Det er 20. januar. Du går gjennom bilen før du skal kjøre. Kryss av punktene som må ordnes før du kan kjøre.', dok:'Kontroll før kjøring', meta:'Personbil · Vinterperioden', kolonner:['Punkt','Det du finner'], kryss:'Må ordnes', rader:[
          { c:['Dekk foran','Vinterdekk, 6 mm mønster'], avvik:false, f:'Godt over kravet på 3 mm.' },
          { c:['Dekk bak','Vinterdekk, 2 mm mønster'], avvik:true, f:'Under 3 mm i vinterperioden. Dekkene må byttes.' },
          { c:['Bremselys','Det venstre lyser ikke'], avvik:true, f:'Feil på bremselys må rettes. Andre ser ikke at du bremser.' },
          { c:['Frontrute','Liten steinsprut nederst i hjørnet'], avvik:false, f:'Få den sjekket, men en liten skade utenfor siktfeltet stopper ikke turen nødvendigvis.' },
          { c:['Varselbelysning','Oljelampa lyser når motoren går'], avvik:true, f:'Lavt oljetrykk kan ødelegge motoren. Ikke kjør før det er sjekket.' },
          { c:['Varseltrekant','Ligger i bagasjerommet'], avvik:false, f:'Riktig.' },
          { c:['Refleksvest','Ligger i hanskerommet'], avvik:false, f:'Lett tilgjengelig for føreren.' },
          { c:['Rutene','Bakruta er dekket av is'], avvik:true, f:'Du skal ha fri sikt. Skrap og avis alle ruter.' }
        ]},
        { type:'sort', id:'bilen-s1', nivaa:2, tittel:'Kan du trekke hengeren med klasse B?', instr:'Bilen har tillatt totalvekt 2 200 kg. Sorter hengerne.', kat:['Lov med klasse B','Krever mer enn klasse B'], items:[
          ['Henger med tillatt totalvekt 750 kg',0,'Opptil 750 kg er alltid lov med klasse B (hvis bilen har lov til å trekke den).'],
          ['Henger med tillatt totalvekt 1 300 kg',0,'2 200 + 1 300 = 3 500 kg. Det er akkurat innenfor.'],
          ['Henger med tillatt totalvekt 1 500 kg',1,'2 200 + 1 500 = 3 700 kg. Over 3 500 kg krever klasse B kode 96 eller BE.'],
          ['Henger med tillatt totalvekt 500 kg',0,'Under 750 kg.'],
          ['Hestehenger med tillatt totalvekt 2 000 kg',1,'2 200 + 2 000 = 4 200 kg. Krever mer enn klasse B.']
        ], f:'Det er tillatt totalvekt i vognkortene som teller – ikke hva hengeren faktisk veier i dag. Kontroller også hva bilen har lov til å trekke.' },
        { type:'quiz', id:'bilen-q2', nivaa:3, tittel:'Bruk reglene', sp:[
          {q:'Bilen er tre år gammel og har aldri vært på EU-kontroll. Hva gjelder?',a:['Den skal på kontroll innen den er fire år','Den skulle vært på kontroll etter to år','Personbiler trenger ikke EU-kontroll','Den skal på kontroll hvert år'],r:0,f:'Første EU-kontroll er innen fire år, deretter hvert andre år.'},
          {q:'Hvorfor er løs last i kupeen farlig?',a:['Ved bråbremsing fortsetter lasten framover med stor kraft','Den gjør bilen tyngre å styre','Den gir mer luftmotstand','Den er ikke farlig'],r:0,f:'Selv en vanlig vannflaske kan treffe hardt ved en kollisjon.'},
          {q:'Hvor finner du hvor mye bilen har lov til å trekke?',a:['I vognkortet','På dekket','I førerkortet','På registreringsskiltet'],r:0,f:'Vognkortet viser tillatt tilhengervekt med og uten brems.'}
        ]}
      ]
    },
    /* ================================================================ FK-05 */
    {
      id: 'risiko', lok: 'FK-05', tittel: 'Fart, stopplengde og risiko',
      kort: 'Hvorfor fart, rus, trøtthet og mobil øker risikoen – og hvordan du regner på stopplengde.',
      bok: 'Statens vegvesen: Veiledning klasse B – risikoforståelse og selvinnsikt',
      mal: ['regne ut reaksjonslengde og forklare stopplengde','forklare hvordan fart påvirker bremselengde og skade','vurdere hvordan rus, trøtthet og distraksjon øker risikoen'],
      punkter: [
        '<b>Stopplengde = reaksjonslengde + bremselengde.</b> Reaksjonslengden er strekningen du kjører før du begynner å bremse.',
        'Reaksjonstiden er ofte rundt <b>1 sekund</b>, men blir lengre når du er trøtt, ruset eller ser på mobilen. Fart i m/s ≈ <b>km/t ÷ 3,6</b>.',
        'Bremselengden øker med <b>kvadratet av farten</b>: Dobbelt så høy fart gir omtrent <b>fire ganger så lang</b> bremselengde. Glatt føre gjør den mye lengre.',
        'Energien i et sammenstøt øker også med kvadratet av farten. Litt høyere fart gir <b>mye større skader</b>, særlig for myke trafikanter.',
        'Hold <b>god avstand</b> – minst 3 sekunder til bilen foran, og mer på glatt føre og i mørke.',
        'Unge og nye førere har høyere risiko. De største risikofaktorene er <b>fart, rus, trøtthet, distraksjon og uerfarenhet</b> – ofte flere på én gang.'
      ],
      ndla: [['Veiledning klasse B (PDF)', SVV_HEFTE, 'Vegvesen'],['Veien til førerkortet – personbil (B)', SVV_B, 'Vegvesen']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'risiko-voks', tittel:'Å si nei i bilen', tekst:['Det vanskeligste med risiko er ofte ikke å forstå den. Det er å si fra når andre presser deg – når kameratene vil at du skal kjøre fortere, eller når sjåføren har drukket.','Å si «jeg vil ikke» krever mot. Men det er nesten alltid lettere enn å leve med det som kunne ha skjedd.'], sporsmal:['Hva kan du si hvis du sitter på med en sjåfør som kjører farlig?','Hvordan kan du hjelpe en venn til å si nei uten at han eller hun mister ansikt?'], handling:'Bli enig med én venn om en kort setning dere kan bruke når en kjøretur føles utrygg.' },
        { type:'flash', id:'risiko-flash', tittel:'Begrepskort: risiko', kort:[
          ['Reaksjonstid','Tiden fra du oppdager en fare til du begynner å bremse. Ofte rundt 1 sekund.'],
          ['Reaksjonslengde','Strekningen bilen kjører i reaksjonstiden. Fart (m/s) × reaksjonstid.'],
          ['Bremselengde','Strekningen fra du begynner å bremse til bilen står. Øker med kvadratet av farten.'],
          ['Stopplengde','Reaksjonslengde + bremselengde.'],
          ['3-sekundersregelen','Minst 3 sekunder avstand til bilen foran når den passerer et fast punkt.'],
          ['Distraksjon','Alt som tar oppmerksomheten bort fra kjøringen, for eksempel mobil eller passasjerer.'],
          ['Selvinnsikt','Å kjenne egne svakheter og ta hensyn til dem når du kjører.']
        ]},
        { type:'quiz', id:'risiko-q1', nivaa:1, tittel:'Regn på reaksjonslengden', sp:[
          {q:'Du kjører i 36 km/t. Hvor mange meter kjører du i sekundet?',a:['10 m','36 m','3,6 m','20 m'],r:0,f:'36 ÷ 3,6 = 10 m/s.'},
          {q:'Du kjører i 72 km/t og har 1 sekund reaksjonstid. Hvor lang er reaksjonslengden?',a:['20 m','72 m','7,2 m','40 m'],r:0,f:'72 ÷ 3,6 = 20 m/s. 20 m/s × 1 s = 20 m.'},
          {q:'Du kjører i 90 km/t og ser på mobilen i 2 sekunder. Hvor langt kjører du i blinde?',a:['50 m','25 m','90 m','180 m'],r:0,f:'90 ÷ 3,6 = 25 m/s. 25 × 2 = 50 m – mer enn en fotballbane på bredden.'},
          {q:'Hva er stopplengde?',a:['Reaksjonslengde + bremselengde','Bare bremselengden','Avstanden til bilen foran','Lengden på bilen'],r:0,f:'Begge delene må med.'}
        ]},
        { type:'quiz', id:'risiko-q2', nivaa:2, tittel:'Når farten dobles', sp:[
          {q:'Bremselengden er 12 m i 50 km/t. Omtrent hvor lang er den i 100 km/t på samme føre?',a:['48 m','24 m','36 m','100 m'],r:0,f:'Dobbel fart gir omtrent fire ganger så lang bremselengde: 12 × 4 = 48 m.'},
          {q:'Bremselengden er 20 m i 60 km/t. Omtrent hvor lang er den i 30 km/t?',a:['5 m','10 m','15 m','40 m'],r:0,f:'Halv fart gir en fjerdedel av bremselengden: 20 ÷ 4 = 5 m.'},
          {q:'Hvorfor er 60 km/t mye farligere enn 50 km/t for en fotgjenger som blir påkjørt?',a:['Energien øker med kvadratet av farten','Bilen blir tyngre','Bremsene virker dårligere','Det er ingen stor forskjell'],r:0,f:'(60/50)² ≈ 1,44 – omtrent 44 % mer energi.'},
          {q:'Hva skjer med reaksjonslengden når du er trøtt?',a:['Den blir lengre fordi reaksjonstiden øker','Den blir kortere','Den endrer seg ikke','Bare bremselengden endrer seg'],r:0,f:'Trøtthet, rus og distraksjon øker reaksjonstiden.'}
        ]},
        { type:'sort', id:'risiko-s1', nivaa:2, tittel:'Øker eller minsker risikoen?', instr:'Sorter faktorene.', kat:['Øker risikoen','Minsker risikoen'], items:[
          ['Tre venner i baksetet som tuller og ler',0,'Passasjerer kan distrahere, særlig for nye førere.'],
          ['Mobilen i flymodus i hanskerommet',1,'Fjerner fristelsen.'],
          ['Kjøring kl. 03 etter en lang arbeidsdag',0,'Trøtthet øker reaksjonstiden og kan gi mikrosøvn.'],
          ['3–4 sekunders avstand til bilen foran',1,'Gir tid til å reagere.'],
          ['Vinterdekk med god mønsterdybde',1,'Gir bedre grep.'],
          ['Tidspress for å rekke en avtale',0,'Fører ofte til høyere fart og dårligere vurderinger.'],
          ['Planlegge ruten før du kjører',1,'Mindre stress og mindre fikling med GPS under kjøring.']
        ], f:'Risiko oppstår ofte når flere faktorer kommer sammen.' },
        { type:'case', id:'risiko-case', nivaa:3, tittel:'Case: Hjem fra jobb i november', intro:'Sara (18) har hatt førerkort i to måneder. Hun har jobbet ekstravakt og skal kjøre 40 km hjem kl. 23. Det er mørkt, 0 grader og vått på vegen. Hun er sliten.', steg:[
          {q:'Hva er den største risikoen før hun setter seg i bilen?',valg:[{t:'Trøtthet kombinert med glatt føre og lite erfaring',ok:true,f:'Flere risikofaktorer på én gang gir høy samlet risiko.'},{t:'At bilen er skitten',ok:false,f:'Rene ruter og lys er viktig, men ikke den største risikoen her.'},{t:'At radioen ikke virker',ok:false,f:'Det påvirker ikke sikkerheten.'}]},
          {q:'Rundt 0 grader og vått. Hva betyr det for kjøringen?',valg:[{t:'Det kan være svært glatt – senk farten og øk avstanden',ok:true,f:'Rundt null grader er ofte det glatteste føret.'},{t:'Ingenting, det er ikke minusgrader',ok:false,f:'Is kan dannes på bruer og i skygge selv ved 0 grader.'},{t:'Hun bør kjøre fortere for å komme fort hjem',ok:false,f:'Høyere fart gir mye lengre bremselengde på glatt føre.'}]},
          {q:'Etter 20 minutter gjesper hun og merker at øynene glipper. Hva gjør hun?',valg:[{t:'Stopper på et trygt sted, tar en pause eller ringer etter skyss',ok:true,f:'Det eneste som virker mot trøtthet, er søvn og hvile.'},{t:'Skrur opp musikken og åpner vinduet',ok:false,f:'Det hjelper bare i noen sekunder.'},{t:'Kjører fortere for å bli ferdig',ok:false,f:'Det øker risikoen enda mer.'}]}
        ]},
        { type:'reflect', id:'risiko-r1', nivaa:3, tittel:'Vurder egen risiko', q:'Beskriv en kjøresituasjon (ekte eller tenkt) der risikoen er høy. Forklar hvilke risikofaktorer som virker sammen, og hva du som sjåfør kan gjøre for å redusere risikoen. Bruk stopplengde i forklaringen.', punkter:['beskriver en konkret situasjon','nevner minst to risikofaktorer som virker sammen','forklarer stopplengde med reaksjons- og bremselengde','viser et regneeksempel med km/t ÷ 3,6','foreslår konkrete tiltak (fart, avstand, pause, mobil)','reflekterer over egne svakheter eller press fra andre'] }
      ]
    },
    /* ================================================================ FK-06 */
    {
      id: 'sikkerhet', lok: 'FK-06', tittel: 'Trafikksikkerhet og menneskelige faktorer',
      kort: 'Hvorfor skjer ulykker? Kravene fra trafikken mot det sjåføren klarer – og hvordan du holder god margin.',
      bok: 'NDLA: Trafikksikkerhet (TP-TOL vg2) – menneskelige faktorer ved trafikkuhell',
      mal: ['forklare forholdet mellom kravene fra trafikken og førerens ytelse','gi eksempler på menneskelige faktorer som ofte bidrar til trafikkulykker','foreslå konkrete tiltak som gir større sikkerhetsmargin i et transportoppdrag'],
      punkter: [
        'De fleste trafikkulykker har en <b>menneskelig faktor</b>: noe sjåføren gjorde, ikke gjorde eller ikke klarte å oppfatte i tide.',
        '<b>Kravene fra trafikken</b> er alt situasjonen krever av deg: vegen, været, føret, mørket, trafikkmengden, kjøretøyet, lasten og tidsfristen.',
        '<b>Førerens ytelse</b> er det du faktisk klarer akkurat nå: erfaring, ferdigheter, oppmerksomhet og form. Den går ned når du er trøtt, stresset, syk, ruset eller ser på mobilen.',
        'Så lenge ytelsen er større enn kravene, har du en <b>sikkerhetsmargin</b>. Når kravene blir større enn det du klarer, oppstår nestenulykker og ulykker.',
        'Du kan øke marginen på to måter: <b>senke kravene</b> (lavere fart, mer avstand, planlegge ruten, utsette turen) eller <b>holde ytelsen oppe</b> (sove nok, ta pauser, legge bort mobilen, si nei til rus).',
        'I jobb kommer ofte <b>tidspress</b> i tillegg. En god sjåfør og en god arbeidsgiver planlegger slik at ingen må velge mellom å rekke fristen og å kjøre trygt. Målet i Norge er <b>nullvisjonen</b>: ingen drepte eller hardt skadde i trafikken.'
      ],
      ndla: [['Trafikksikkerhet – emnet', 'https://ndla.no/e/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/trafikksikkerhet/4201ecd6af', 'NDLA'],['Oppgave: Trafikksikkerhet (menneskelige faktorer)', 'https://ndla.no/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/trafikksikkerhet/76610be654', 'NDLA'],['Trafikksikkerhet – hva har du lært? (egentest)', 'https://ndla.no/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/trafikksikkerhet---hva-har-du-lart/43e120b437', 'NDLA'],['Veiledning klasse B (PDF)', SVV_HEFTE, 'Vegvesen']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'sikkerhet-voks', tittel:'Å kjenne sine egne grenser', tekst:['Alle har dager der de ikke er på topp: lite søvn, mye i hodet eller en krangel rett før man går ut døra. Det er helt vanlig. Det farlige er å late som om alt er som normalt.','En trygg sjåfør – og en god kollega – sier fra når formen ikke strekker til, og justerer etter det. Det er ikke svakhet. Det er profesjonalitet.'], sporsmal:['Hvordan merker du at du ikke er i form til å gjøre en krevende jobb?','Hva kan du si til en kollega eller venn som tydelig er for sliten til å kjøre?'], handling:'Tenk gjennom én ting du gjør for å være i form før en viktig oppgave – og gjør den i morgen.' },
        { type:'flash', id:'sikkerhet-flash', tittel:'Begrepskort: trafikksikkerhet', kort:[
          ['Menneskelig faktor','Noe ved sjåføren – valg, oppmerksomhet, form eller erfaring – som bidrar til en ulykke.'],
          ['Krav fra trafikken','Alt situasjonen krever av sjåføren: veg, vær, føre, mørke, trafikk, kjøretøy, last og tid.'],
          ['Førerens ytelse','Det sjåføren faktisk klarer akkurat nå. Påvirkes av erfaring, ferdigheter og form.'],
          ['Sikkerhetsmargin','Avstanden mellom det du klarer og det situasjonen krever.'],
          ['Nestenulykke','En hendelse som kunne blitt en ulykke, men som gikk bra. Et varsel om at marginen var for liten.'],
          ['Uoppmerksomhet','Når blikket eller tankene er et annet sted enn på trafikken, f.eks. på mobilen.'],
          ['Mikrosøvn','Noen sekunders søvn uten at du merker det selv. Kommer når du er svært trøtt.'],
          ['Nullvisjonen','Målet om at ingen skal bli drept eller hardt skadd i trafikken i Norge.']
        ]},
        { type:'quiz', id:'sikkerhet-q1', nivaa:1, tittel:'Hva vet du om ulykker?', sp:[
          {q:'Hva er oftest med på å forårsake en trafikkulykke?',a:['En menneskelig faktor','Feil på vegen alene','Feil på bilen alene','Uflaks'],r:0,f:'Veg og kjøretøy spiller inn, men i de fleste ulykker er det også en menneskelig faktor.'},
          {q:'Hva skjer når kravene fra trafikken blir større enn det sjåføren klarer?',a:['Risikoen for nestenulykker og ulykker øker kraftig','Sjåføren blir automatisk mer oppmerksom','Ingenting, så lenge bilen er ny','Bilen bremser selv'],r:0,f:'Da er sikkerhetsmarginen borte.'},
          {q:'Hvilket av disse senker kravene fra trafikken?',a:['Å kjøre saktere og holde lengre avstand','Å drikke energidrikk','Å kjøre om natta for å unngå kø','Å skru opp musikken'],r:0,f:'Lavere fart og mer avstand gir deg mer tid til å oppdage og reagere.'},
          {q:'Hva er nullvisjonen?',a:['Målet om ingen drepte eller hardt skadde i trafikken','Et forbud mot å kjøre om natta','Kravet om null promille for alle','En regel om null prikker i prøvetiden'],r:0,f:'Nullvisjonen er grunnlaget for trafikksikkerhetsarbeidet i Norge.'}
        ]},
        { type:'sort', id:'sikkerhet-s1', nivaa:2, tittel:'Krav fra trafikken eller førerens ytelse?', instr:'Sorter faktorene. Er det noe ved situasjonen (krav), eller noe ved sjåføren (ytelse)?', kat:['Krav fra trafikken','Førerens ytelse'], items:[
          ['Glatt, smal veg med snøkanter',0,'Føret og vegen bestemmer hvor mye situasjonen krever.'],
          ['Sjåføren sov fire timer i natt',1,'Lite søvn senker ytelsen og øker reaksjonstiden.'],
          ['Mørkt og regn i rushtiden',0,'Dårlig sikt og mye trafikk øker kravene.'],
          ['Sjåføren har hatt førerkort i tre måneder',1,'Lite erfaring gjør det vanskeligere å se farer tidlig.'],
          ['Varebil fullastet med tunge esker',0,'Lasten gir lengre bremselengde og endrer hvordan bilen oppfører seg.'],
          ['Sjåføren leser en melding på mobilen',1,'Blikket er borte fra vegen – ytelsen faller til nesten null.'],
          ['Leveringsfrist om 20 minutter, 30 km igjen',0,'Tidspresset er en del av situasjonen og frister til høy fart.'],
          ['Sjåføren er sint etter en krangel',1,'Sterke følelser tar oppmerksomhet og kan gi mer risikovillig kjøring.']
        ], f:'Ulykker skjer der høye krav møter lav ytelse. Begge sidene kan du gjøre noe med.' },
        { type:'tf', id:'sikkerhet-tf', nivaa:2, tittel:'Sant eller usant: menneskelige faktorer', ps:[
          ['En erfaren sjåfør kan trygt lese meldinger på rett veg.',false,'Ved 80 km/t kjører du over 20 meter i sekundet – i blinde.'],
          ['Trøtthet kan virke på kjøringen på samme måte som alkohol.',true,'Både reaksjonstid og vurderingsevne blir dårligere.'],
          ['En nestenulykke er et nyttig varsel, selv om ingen ble skadd.',true,'Den viser at marginen var for liten. Lær av den.'],
          ['Tidspress påvirker ikke hvordan folk kjører.',false,'Tidspress fører ofte til høyere fart, kortere avstand og flere forbikjøringer.'],
          ['Du kan øke sikkerhetsmarginen ved å planlegge turen før du kjører.',true,'Kjent rute, pauser og nok tid senker kravene underveis.'],
          ['Passasjerer har ingen betydning for sikkerheten.',false,'Passasjerer kan både distrahere og hjelpe – f.eks. ved å si fra.']
        ]},
        { type:'case', id:'sikkerhet-case', nivaa:3, tittel:'Case: Siste levering før helga', intro:'Adrian (19) er lærling i et transportfirma og kjører varebil. Det er fredag i januar kl. 15.30. Han har én levering igjen, 35 km unna, på en smal og svingete veg med snøkanter. Kunden stenger kl. 16.00. Han har jobbet siden kl. 06 og har ikke spist lunsj. Kunden ringer og spør hvor han blir av.', steg:[
          {q:'Hva er de største kravene fra trafikken her?',valg:[{t:'Smal, svingete vinterveg, mørket som kommer og en kort frist',ok:true,f:'Både vegen, føret og tiden presser på.'},{t:'At bilen er en varebil',ok:false,f:'Kjøretøyet betyr noe, men det er ikke det største kravet her.'},{t:'At kunden ringer',ok:false,f:'Samtalen er en distraksjon – men selve kravet er fristen.'}]},
          {q:'Hva trekker ned Adrians ytelse?',valg:[{t:'Lang arbeidsdag, ingen mat og stress fra kunden',ok:true,f:'Sult, trøtthet og stress gir dårligere oppmerksomhet og vurderinger.'},{t:'At han er lærling',ok:false,f:'Mindre erfaring spiller inn, men her er formen og stresset viktigst.'},{t:'Ingenting – han er ung og opplagt',ok:false,f:'Han har jobbet i over ni timer uten mat.'}]},
          {q:'Hva er det beste valget?',valg:[{t:'Ringe kunden (stående stille) eller sjefen, avtale ny tid eller å levere mandag, og kjøre etter forholdene',ok:true,f:'Han senker kravet (fristen) i stedet for å kjøre over evne. Det er sjåføren som har ansvaret bak rattet.'},{t:'Kjøre fort for å rekke det, og svare kunden mens han kjører',ok:false,f:'Da øker han kravene og senker ytelsen samtidig – den farligste kombinasjonen.'},{t:'Kjøre fortere på de rette strekningene',ok:false,f:'Fem minutter spart er ikke verdt risikoen på glatt, smal veg.'}]},
          {q:'Hva bør firmaet lære av situasjonen?',valg:[{t:'Planlegge rutene slik at sjåførene har tid til pauser og ikke må velge mellom frist og sikkerhet',ok:true,f:'Trafikksikkerhet er også et HMS-ansvar for arbeidsgiveren.'},{t:'At lærlinger ikke skal kjøre',ok:false,f:'Problemet er planleggingen, ikke at han er lærling.'},{t:'Ingenting – det gikk jo bra',ok:false,f:'En situasjon som nesten gikk galt, er nettopp den man skal lære av.'}]}
        ]},
        { type:'reflect', id:'sikkerhet-r1', nivaa:3, tittel:'Drøft: menneskelige faktorer i et transportoppdrag', q:'Biltrafikken har høy ulykkesrisiko, og i mange ulykker spiller en menneskelig faktor inn. Drøft hvilke menneskelige faktorer som ofte påvirker en trafikkulykke, og hvordan de kan påvirke sikkerheten i et transportoppdrag (f.eks. en varebil med levering). Bruk begrepene «krav fra trafikken» og «førerens ytelse», og foreslå tiltak både for sjåføren og for arbeidsgiveren. (Oppgaven bygger på NDLA-oppgaven «Trafikksikkerhet».)', punkter:['nevner minst fire menneskelige faktorer (f.eks. fart, rus, trøtthet, distraksjon, uerfarenhet, stress)','forklarer forholdet mellom krav fra trafikken og førerens ytelse','knytter faktorene til et konkret transportoppdrag','foreslår tiltak for sjåføren (pause, mobil bort, fart, si fra)','foreslår tiltak for arbeidsgiveren (ruteplanlegging, realistiske frister, opplæring)','drøfter – viser at flere faktorer ofte virker sammen og veier tiltakene mot hverandre'] }
      ]
    },
    /* ================================================================ FK-07 */
    {
      id: 'samspill', lok: 'FK-07', tittel: 'Samspill, mørke og uhell',
      kort: 'Myke trafikanter, rundkjøring, fletting, kjøring i mørket og hva du gjør ved et trafikkuhell.',
      bok: 'Trafikkreglene og vegtrafikkloven § 12 (plikter ved trafikkuhell)',
      mal: ['samhandle trygt med myke trafikanter og andre kjøretøy','bruke riktig lys og tegngiving i ulike situasjoner','forklare pliktene og tiltakene ved et trafikkuhell'],
      punkter: [
        '<b>Myke trafikanter</b> – gående, syklister og mopedister – har lite beskyttelse. Se etter dem i <b>blindsonen</b>, ved gangfelt og når du svinger.',
        'I <b>rundkjøring</b> har du vikeplikt for trafikken i rundkjøringen når det er skiltet. Gi tegn når du skal ut.',
        'Når to felt blir til ett, skal bilene <b>flette</b> – annenhver bil, helt fram til der feltet slutter (glidelåsprinsippet).',
        'Bruk <b>fjernlys</b> når du kan, men blend ned i god tid for møtende og når du kjører rett bak noen. Gående med refleks ser du langt tidligere.',
        'Ved trafikkuhell skal alle som er innblandet <b>stanse</b>, hjelpe skadde og <b>oppgi navn og adresse</b>. Sikre skadestedet: varselblink, refleksvest og varseltrekant.',
        'Ring <b>113</b> ved skade på personer, <b>110</b> ved brann og <b>112</b> for politi. Gi førstehjelp – det er bedre å gjøre noe enn ingenting.'
      ],
      ndla: [['Vegtrafikkloven', LOVDATA_VTRL, 'Lovdata'],['Trafikant i mørket', SVV_MORKE, 'Vegvesen'],['Kap 8 Sikring av skadested og førstehjelp', '/transport-logistikk-lofteoperasjoner/', 'TLLfluenseren']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'samspill-voks', tittel:'Den som gir litt, får mye', tekst:['Trafikken fungerer best når folk samarbeider: slipper inn en bil ved fletting, venter på en syklist og gir tydelige tegn.','Det samme gjelder i en klasse og på en arbeidsplass. Små handlinger – å vente, å slippe noen til, å vise hva du tenker å gjøre – gjør dagen tryggere for alle.'], sporsmal:['Når har noen sluppet deg til, og hvordan føltes det?','Hva er en «tydelig tegngiving» når vi samarbeider i gruppa?'], handling:'Slipp noen til i dag – i køen, i samtalen eller i trafikken.' },
        { type:'flash', id:'samspill-flash', tittel:'Begrepskort: samspill og uhell', kort:[
          ['Myk trafikant','Gående, syklist eller mopedist – trafikanter med lite beskyttelse.'],
          ['Blindsone','Området rundt bilen du ikke ser i speilene. Snu hodet før feltskifte.'],
          ['Fletting','Annenhver bil når to felt blir til ett.'],
          ['Fjernlys','Langt lys. Blend ned for møtende og når du kjører bak noen.'],
          ['Varselblink','Alle blinklys samtidig. Varsler fare eller stans.'],
          ['113','Medisinsk nødtelefon.'],
          ['Plikter ved trafikkuhell','Stanse, hjelpe skadde, sikre stedet og oppgi navn og adresse.']
        ]},
        { type:'quiz', id:'samspill-q1', nivaa:1, tittel:'Hva gjør du?', sp:[
          {q:'Du skal skifte felt til venstre. Hva gjør du rett før du svinger over?',a:['Ser i speilet, gir tegn og snur hodet for å sjekke blindsonen','Bare gir tegn','Bare ser i speilet','Øker farten'],r:0,f:'Speil – tegn – blindsone. Snu hodet!'},
          {q:'Hvilket nødnummer ringer du når noen er skadet?',a:['113','110','112','1881'],r:0,f:'113 er medisinsk nødtelefon.'},
          {q:'Når skal du blende ned fra fjernlys?',a:['I god tid før du møter en bil','Først når den møtende blinker','Aldri på landevegen','Bare i tettbygd strøk'],r:0,f:'Du skal ikke blende andre trafikanter.'},
          {q:'Hva betyr fletting?',a:['Annenhver bil når to felt blir til ett','At du kjører i midten av to felt','At du alltid har vikeplikt','At du kjører forbi i kø'],r:0,f:'Det kalles også glidelåsprinsippet.'}
        ]},
        { type:'order', id:'samspill-o1', nivaa:2, tittel:'Du kommer først til et trafikkuhell', instr:'Sett tiltakene i en fornuftig rekkefølge.', steg:[
          'Stans bilen på et trygt sted og slå på varselblink','Ta på refleksvest','Sett ut varseltrekant','Skaff deg oversikt: Hvor mange er skadd?','Ring 113 og gi tydelig beskjed om sted og skader','Gi livreddende førstehjelp','Hold de skadde varme og snakk med dem til hjelpen kommer'
        ], f:'Egen sikkerhet først. En ny ulykke på samme sted gjør alt verre.' },
        { type:'tf', id:'samspill-tf', nivaa:2, tittel:'Sant eller usant: samspill', ps:[
          ['Ved fletting skal du kjøre inn i det andre feltet så tidlig som mulig.',false,'Bruk begge feltene helt fram, og flett annenhver bil.'],
          ['Den som er innblandet i et trafikkuhell, skal stanse og oppgi navn og adresse.',true,'Det følger av vegtrafikkloven § 12.'],
          ['Du må gi tegn når du skal kjøre ut av en rundkjøring.',true,'Tegngiving hjelper dem som venter på å kjøre inn.'],
          ['En syklist som kommer bak deg til høyre, ser du alltid i speilet.',false,'Syklisten kan være i blindsonen. Snu hodet før du svinger til høyre.'],
          ['Med refleks blir en fotgjenger synlig på mye lengre avstand i mørket.',true,'Derfor er Trafikant i mørket en obligatorisk del av opplæringen.']
        ]},
        { type:'case', id:'samspill-case', nivaa:3, tittel:'Case: Høyresving ved skolen', intro:'Du kjører i 40 km/t i et boligområde kl. 08.15. Du skal svinge til høyre i et kryss rett ved en barneskole. Det er en sykkelsti langs vegen. En lastebil står parkert ved hjørnet og skjuler deler av fortauet.', steg:[
          {q:'Hva gjør du når du nærmer deg krysset?',valg:[{t:'Senker farten i god tid og ser etter barn og syklister',ok:true,f:'Barn er uforutsigbare og kan komme bak den parkerte lastebilen.'},{t:'Holder farten fordi du har grønt',ok:false,f:'Det er ikke lys her – og grunnregelen gjelder uansett.'},{t:'Tuter for å varsle',ok:false,f:'Tuting kan skremme og er ikke en erstatning for lav fart.'}]},
          {q:'En syklist kommer bakfra på sykkelstien. Hvem har vikeplikt når du svinger?',valg:[{t:'Du – du skal ikke svinge foran syklisten',ok:true,f:'Du skal vike for syklister du krysser når du svinger.'},{t:'Syklisten',ok:false,f:'Den som svinger, skal ikke skjære foran trafikk i samme retning.'},{t:'Den som kommer først',ok:false,f:'Det er ikke en regel.'}]},
          {q:'Hva er den viktigste lærdommen?',valg:[{t:'Ved skoler og myke trafikanter er lav fart og ekstra oppmerksomhet det viktigste',ok:true,f:'Det er grunnregelen i praksis.'},{t:'Lastebiler skal ikke parkere',ok:false,f:'Du må uansett kjøre etter forholdene du møter.'},{t:'Sykkelstier er farlige',ok:false,f:'Det er samspillet som avgjør sikkerheten.'}]}
        ]},
        { type:'reflect', id:'samspill-egen', nivaa:3, tittel:'Egenvurdering: førerkort B', q:'Se tilbake på temaene i Førerkort B. Hva er du trygg på, og hva må du øve mer på før førerprøven? Velg også én av klassens verdier og beskriv hvordan du viste den i arbeidet.', punkter:['nevner minst én regel eller ferdighet du mestrer','nevner minst én ting du må øve mer på','forklarer hvordan du skal øve (øvelseskjøring, teoritest, spørre lærer)','knytter noe til risiko og egne valg','beskriver konkret hvordan du viste en av klassens verdier'] }
      ]
    }
  ]
});
