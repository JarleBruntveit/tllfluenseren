/* G11 Løfteredskap – egenprodusert læringsinnhold for Bransjeteknikk (Vg2 TOL).
   Faglig grunnlag: Arbeidstilsynets opplæringsplan Modul 2.3 Løfteredskap (G11) og forskrift om utførelse av arbeid.
   Ingen tekst, tabeller eller figurer er kopiert fra forlag eller produsenter. */
const AT_G11 = 'https://www.havtil.no/contentassets/332ceaad219344299828293b3c14171f/modul-2.3---g11---lofteredskap.pdf';
const AT_G11_FJERN = 'https://inte.arbeidstilsynet.no/contentassets/f9c0f171f4af42a0afca34023d43391d/fjernundervisning_modul-2.3-lofteredskap-g11.pdf';
const LOVDATA_FUA = 'https://lovdata.no/forskrift/2011-12-06-1357';
const NDLA_LASTING = 'https://ndla.no/r/transport-logistikk-og-lyfteoperasjoner-tp-tol-vg2---beta/lasting-og-lossing---kva-har-du-lart/1372f4b937';

/* ---------- Egne tegninger (SVG). Klikkbare områder har data-z. ---------- */
const S = 'font-family="Inter,system-ui,sans-serif"';

/* Totrinns løft av en kasse */
const SVG_LOFT = `<svg viewBox="0 0 600 360" ${S} role="img" aria-label="En kasse løftes med to stropper fra en kranekrok">
  <rect x="0" y="0" width="600" height="360" fill="#ffffff"/>
  <rect x="285" y="0" width="30" height="40" fill="#9aa3ab" pointer-events="none"/>
  <g data-z="krok"><path d="M300 40v30a22 22 0 1 0 22 22" fill="none" stroke="#1b2128" stroke-width="9" stroke-linecap="round"/><path d="M322 92l-14 -10" stroke="#e07b00" stroke-width="5"/></g>
  <g data-z="sjakkel"><ellipse cx="300" cy="122" rx="12" ry="16" fill="none" stroke="#1d6fb8" stroke-width="6"/></g>
  <path data-z="stropp" d="M296 134 L178 236" stroke="#2e9e4f" stroke-width="10" stroke-linecap="round"/>
  <path data-z="stropp" d="M304 134 L422 236" stroke="#2e9e4f" stroke-width="10" stroke-linecap="round"/>
  <g data-z="vinkel"><path d="M262 168 A50 50 0 0 0 338 168" fill="none" stroke="transparent" stroke-width="22"/><path d="M262 168 A50 50 0 0 0 338 168" fill="none" stroke="#e07b00" stroke-width="4" stroke-dasharray="6 4"/></g>
  <text x="300" y="196" text-anchor="middle" font-size="13" fill="#8a4b00" pointer-events="none">toppvinkel</text>
  <rect x="160" y="236" width="280" height="80" fill="#d9b98a" stroke="#8b6a38" stroke-width="3"/>
  <rect data-z="kant" x="160" y="230" width="34" height="14" fill="#ffd7d7" stroke="#c0392b" stroke-width="2"/>
  <rect data-z="kant" x="406" y="230" width="34" height="14" fill="#ffd7d7" stroke="#c0392b" stroke-width="2"/>
  <g data-z="tp"><circle cx="300" cy="276" r="11" fill="#fff" stroke="#1b2128" stroke-width="3"/><path d="M300 265v22M289 276h22" stroke="#1b2128" stroke-width="3"/></g>
  <g data-z="styretau"><path d="M440 300 C490 310 500 330 560 340" fill="none" stroke="transparent" stroke-width="22"/><path d="M440 300 C490 310 500 330 560 340" fill="none" stroke="#7a4bb5" stroke-width="5" stroke-linecap="round"/></g>
  <text x="20" y="350" font-size="12" fill="#5c6670">Forenklet tegning. Ikke i målestokk.</text>
</svg>`;

TLL.registrer({
  id: 'g11',
  fag: 'Bransjeteknikk',
  kortnavn: 'G11',
  nr: 'G11',
  tittel: 'G11 Løfteredskap',
  ingress: 'Velg riktig redskap, kontroller det før bruk, anhuk lasten trygt og gi tydelige signaler til kranføreren.',
  prove: false,
  ressursomrade: 'bransjeteknikk',
  kompetansemal: [
    { kode: 'TOL02-01 · KV426', tekst: 'anhuke og gi signal ved lossing og lasting etter gjeldende opplæringsplan og regelverk' }
  ],
  ressurser: {
    presentasjon: '',
    laerebok: 'Faget har ingen lærebok her. Bruk opplæringsplanen for G11 og produsentens løftetabeller.',
    arbeidsbok: '',
    ndlaEmne: AT_G11,
    ndlaEmneTag: 'Arbeidstilsynet',
    ndlaEmneNavn: 'Opplæringsplan Modul 2.3 Løfteredskap (G11)',
    ordliste: LOVDATA_FUA,
    ordlisteTag: 'Lovdata',
    ordlisteNavn: 'Forskrift om utførelse av arbeid'
  },
  fotnote: 'G11 Løfteredskap · Innholdet er læringsstøtte bygget på Arbeidstilsynets opplæringsplan for løfteredskap (G11). Gjeldende regelverk, produsentens bruksanvisning og løftetabeller og arbeidsplassens prosedyrer har forrang. Siden erstatter ikke dokumentert sikkerhetsopplæring, praktisk trening eller eksamen hos godkjent opplæringsvirksomhet. Resultater lagres bare i nettleseren på denne enheten – <a href="#/lagring">les om lagring</a> · <a href="#/rapport">lever fremdrift</a>.',
  temaer: [
    /* ================================================================ G11-01 */
    {
      id: 'roller', lok: 'G11-01', tittel: 'Roller, regelverk og ulykker',
      kort: 'Hvem gjør hva i et løft, hvilke regler som gjelder, og hvorfor ulykker skjer.',
      bok: 'Opplæringsplan Modul 2.3 (G11), leksjon 1 · Forskrift om utførelse av arbeid',
      mal: ['beskrive rollene til kranfører, anhuker og signalgiver','forklare hvorfor løfteredskap krever dokumentert opplæring','gi eksempler på ulykker ved løft og hvordan de kan forebygges'],
      punkter: [
        'I et løft er det tre viktige roller: <b>kranføreren</b> styrer kranen, <b>anhukeren</b> (stropperen) fester lasten, og <b>signalgiveren</b> dirigerer kranføreren.',
        'G11 er opplæring i <b>løfteredskap</b>: utstyret mellom kranekroken og lasten, for eksempel stropper, kjetting, sjakler og løfteåk.',
        'Arbeidsgiveren skal sørge for at den som bruker løfteredskap, har fått <b>dokumentert opplæring</b>. Arbeidstilsynet fører tilsyn.',
        'Vanlige ulykker: lasten faller fordi redskapet er feil valgt eller skadet, lasten tipper fordi den er feil anhuket, eller folk blir <b>klemt</b> mellom last og vegg.',
        '<b>Aldri opphold deg under hengende last</b>, og hold hendene unna når stroppene strammes.',
        'Alle kan gi <b>stoppsignal</b> hvis de ser fare – og kranføreren skal stoppe.'
      ],
      ndla: [['Opplæringsplan G11 (PDF)', AT_G11, 'Arbeidstilsynet'],['Forskrift om utførelse av arbeid', LOVDATA_FUA, 'Lovdata'],['Lasting og lossing', NDLA_LASTING, 'NDLA']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'roller-voks', tittel:'Én stemme, ett ansvar', tekst:['I et løft må alle vite hvem som gir signalene. Hvis tre personer roper til kranføreren samtidig, blir det farlig. Samtidig skal alle si fra hvis de ser fare.','Det er det samme i en arbeidsgruppe: Én leder oppgaven, men alle har ansvar for å si fra.'], sporsmal:['Hvordan blir dere enige om hvem som leder en oppgave i gruppa?','Hva gjør du hvis du ser noe farlig, men en annen har ansvaret?'], handling:'Neste gang dere jobber i gruppe: Avtal hvem som leder, og at alle kan si «stopp».' },
        { type:'flash', id:'roller-flash', tittel:'Begrepskort: roller og regler', kort:[
          ['Kranfører','Styrer kranen og har ansvaret for kranbevegelsene.'],
          ['Anhuker','Fester lasten til kranen med riktig løfteredskap. Kalles også stropper.'],
          ['Signalgiver','Gir signaler til kranføreren. Det skal være én signalgiver om gangen.'],
          ['Løfteredskap','Utstyr mellom kranekroken og lasten: stropper, kjetting, sjakler, åk og lignende.'],
          ['G11','Opplæringsmodulen for løfteredskap.'],
          ['Hengende last','Last som henger i kranen. Ingen skal oppholde seg under den.'],
          ['Klemfare','Fare for å bli klemt mellom lasten og noe annet.']
        ]},
        { type:'match', id:'roller-m1', nivaa:1, tittel:'Hvem gjør hva?', instr:'Koble oppgaven med riktig rolle.', par:[
          ['Velger stropper og fester lasten','Anhuker'],
          ['Styrer kranens bevegelser','Kranfører'],
          ['Dirigerer kranføreren med tegn eller radio','Signalgiver'],
          ['Sørger for at de ansatte har fått opplæring','Arbeidsgiver'],
          ['Fører tilsyn med at regelverket blir fulgt','Arbeidstilsynet']
        ], f:'På små arbeidsplasser kan én person ha flere roller – da må vedkommende ha opplæring for alle.' },
        { type:'tf', id:'roller-tf', nivaa:2, tittel:'Sant eller usant: sikkerhet', ps:[
          ['Det er greit å gå under hengende last hvis det går fort.',false,'Aldri opphold deg under hengende last.'],
          ['Bare signalgiveren kan gi stoppsignal.',false,'Alle kan gi stoppsignal når de ser fare.'],
          ['Hold hendene unna når stroppene strammes.',true,'Fingre og hender kan bli klemt mellom stropp og last.'],
          ['Det bør bare være én signalgiver om gangen.',true,'Flere som gir signaler, skaper forvirring.'],
          ['Løfteredskap er det samme som kranen.',false,'Løfteredskap er utstyret mellom kroken og lasten.']
        ]},
        { type:'case', id:'roller-case', nivaa:3, tittel:'Case: Travelt på lageret', intro:'En lastebil med kran skal losse fire kasser med maskindeler. Sjåføren styrer kranen. Du er anhuker. To kollegaer står og ser på og begynner å vinke til sjåføren for å «hjelpe til».', steg:[
          {q:'Hva er problemet?',valg:[{t:'Kranføreren får signaler fra flere personer',ok:true,f:'Det skal være én signalgiver. Ellers kan kranføreren misforstå.'},{t:'At kollegaene ikke har hjelm',ok:false,f:'Verneutstyr er viktig, men det største problemet her er signalene.'},{t:'At sjåføren styrer kranen',ok:false,f:'Det er vanlig på lastebil med kran.'}]},
          {q:'Hva gjør du?',valg:[{t:'Gir stoppsignal, avtaler hvem som gir signaler og ber de andre holde avstand',ok:true,f:'Avtal før løftet starter – og stopp når noe er uklart.'},{t:'Fortsetter og roper høyere',ok:false,f:'Det gjør situasjonen enda mer forvirrende.'},{t:'Lar kollegaene gi signaler, mens du anhuker',ok:false,f:'Bare én signalgiver, og vedkommende må ha riktig opplæring.'}]},
          {q:'En kasse henger over plassen der en kollega står. Hva gjør du?',valg:[{t:'Gir stopp og ber kollegaen flytte seg før løftet fortsetter',ok:true,f:'Ingen skal oppholde seg under hengende last.'},{t:'Ber kranføreren løfte høyere',ok:false,f:'Høyden endrer ikke faren hvis lasten faller.'},{t:'Ingenting, det tar bare noen sekunder',ok:false,f:'Ulykker skjer på sekunder.'}]}
        ]}
      ]
    },
    /* ================================================================ G11-02 */
    {
      id: 'redskap', lok: 'G11-02', tittel: 'Typer løfteredskap',
      kort: 'Fiberstropper, kjetting, ståltau, sjakler, øyebolter, løfteåk og andre redskaper.',
      bok: 'Opplæringsplan Modul 2.3 (G11), leksjon 2',
      mal: ['kjenne igjen de vanligste typene løfteredskap','forklare fordeler og ulemper ved fiber, kjetting og ståltau','lese fargekoden på fiberstropper'],
      punkter: [
        '<b>Fiberstropper</b> (båndstropp og rundsling) er lette og skåner lasten, men tåler dårlig skarpe kanter, varme og kjemikalier.',
        'Fiberstropper har <b>fargekode</b> etter hvor mye de tåler i rett løft: fiolett 1 t, grønn 2 t, gul 3 t, grå 4 t, rød 5 t, brun 6 t, blå 8 t og oransje 10 t eller mer. <b>Les alltid merkelappen</b>.',
        '<b>Kjettingredskap</b> er slitesterkt og tåler varme bedre enn fiber. Det har <b>merkebrikke</b> med blant annet arbeidslast og kvalitetsklasse.',
        '<b>Ståltaustropper</b> er sterke og tåler slitasje, men er stive og kan få skader som knekk og trådbrudd.',
        '<b>Sjakler</b> kobler sammen redskap (rett sjakkel og bøylesjakkel). <b>Øyebolter</b> skrus inn i lasten. <b>Løfteåk</b> fordeler lasten på flere punkter.',
        'Spesialredskap som <b>plateklyper</b> og <b>pallegafler</b> skal bare brukes til det de er laget for.'
      ],
      ndla: [['Opplæringsplan G11 (PDF)', AT_G11, 'Arbeidstilsynet'],['Lasting og lossing', NDLA_LASTING, 'NDLA']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'redskap-voks', tittel:'Riktig verktøy til riktig jobb', tekst:['Det finnes ikke ett løfteredskap som passer til alt. En god anhuker vet hva hvert redskap kan – og hva det ikke kan.','Folk er også forskjellige. I en gruppe er det en styrke at noen er gode til å planlegge, noen til å gjøre og noen til å kontrollere.'], sporsmal:['Hva er du god til når dere løser oppgaver sammen?','Hvilken styrke ser du hos en klassekamerat som han eller hun kanskje ikke ser selv?'], handling:'Si til én i gruppa hva du synes han eller hun er god til.' },
        { type:'flash', id:'redskap-flash', tittel:'Begrepskort: løfteredskap', kort:[
          ['Båndstropp','Flat fiberstropp. Skåner lasten.'],
          ['Rundsling','Fiberstropp med bærende fibre inni en beskyttende kappe.'],
          ['Kjettingredskap','Kjetting med krok og toppløkke. Har merkebrikke.'],
          ['Ståltaustropp','Stropp av stålwire. Sterk og slitesterk.'],
          ['Sjakkel','Kobling med bolt. Finnes som rett sjakkel og bøylesjakkel.'],
          ['Øyebolt','Bolt med øye som skrus inn i lasten.'],
          ['Løfteåk','Bjelke som fordeler lasten og gir bedre vinkler.'],
          ['Plateklype','Klype for å løfte stålplater.'],
          ['Arbeidslast (WLL)','Den største lasten redskapet er laget for å løfte i en gitt bruksmåte.']
        ]},
        { type:'match', id:'redskap-m1', nivaa:1, tittel:'Fargekoden på fiberstropper', instr:'Koble fargen med arbeidslasten i rett løft.', par:[
          ['Fiolett','1 tonn'],['Grønn','2 tonn'],['Gul','3 tonn'],['Grå','4 tonn'],['Rød','5 tonn'],['Blå','8 tonn']
        ], f:'Fargen er en hjelp – merkelappen er det som gjelder. Uten lesbar merkelapp skal stroppen ikke brukes.' },
        { type:'sort', id:'redskap-s1', nivaa:2, tittel:'Hvilket redskap passer best?', instr:'Velg hvilken type stropp som passer best til lasten.', kat:['Fiberstropp','Kjetting','Ståltau'], items:[
          ['Nylakkert stålbjelke som ikke må få riper',0,'Fiber skåner overflaten.'],
          ['Varmt gods fra en ovn i et støperi',1,'Kjetting tåler varme bedre enn fiber.'],
          ['Glassplater i kasse med myke hjørner',0,'Fiber er skånsom.'],
          ['Tunge betongelementer med grov overflate i daglig bruk',2,'Ståltau tåler slitasje fra grove overflater godt.'],
          ['Skrapjern med skarpe kanter',1,'Kjetting tåler skarpe kanter bedre enn fiber.'],
          ['Polert rustfri tank',0,'Fiber skader ikke overflaten.']
        ], f:'Les alltid produsentens anvisning. Ved skarpe kanter må alle stropper beskyttes.' },
        { type:'quiz', id:'redskap-q2', nivaa:2, tittel:'Kjenn redskapet', sp:[
          {q:'Hva betyr WLL på merkingen?',a:['Arbeidslast – den største lasten redskapet skal brukes til','Vekten av stroppen','Bruddstyrken','Lengden på stroppen'],r:0,f:'WLL står for Working Load Limit (arbeidslast).'},
          {q:'Hvorfor brukes et løfteåk?',a:['For å fordele lasten og få bedre vinkler på stroppene','For å gjøre løftet raskere','For å slippe å kontrollere stroppene','For å løfte uten kran'],r:0,f:'Åket gir loddrette stropper og mindre krefter i hver part.'},
          {q:'Hvilket redskap brukes til å koble en stropp til et løfteøye?',a:['Sjakkel','Plateklype','Pallegaffel','Styretau'],r:0,f:'Sjakkelen kobler sammen redskap og lastens festepunkter.'},
          {q:'Hva er en svakhet ved fiberstropper?',a:['De tåler dårlig skarpe kanter og varme','De er tunge','De ruster','De skader lasten'],r:0,f:'Bruk kantbeskyttelse og hold dem unna varme og kjemikalier.'}
        ]},
        { type:'reflect', id:'redskap-r1', nivaa:3, tittel:'Velg og begrunn', q:'En kunde skal ha løftet en ny, malt stålkonstruksjon på 2,5 tonn med skarpe kanter i den ene enden. Hvilket redskap vil du velge, og hvordan vil du beskytte både redskapet og lasten? Begrunn valget.', punkter:['velger redskap med nok arbeidslast for løftet','vurderer fiber mot kjetting eller ståltau og begrunner','beskytter skarpe kanter med kantbeskyttelse','tar hensyn til at lakken ikke skal skades','nevner at merking og løftetabell må kontrolleres','nevner kontroll av redskapet før bruk'] }
      ]
    },
    /* ================================================================ G11-03 */
    {
      id: 'kontroll', lok: 'G11-03', tittel: 'Merking, kontroll og kassering',
      kort: 'Les merkingen, gjør brukerkontroll før hvert løft og vit når redskapet skal kasseres.',
      bok: 'Opplæringsplan Modul 2.3 (G11), leksjon 2 og 6',
      mal: ['lese merkingen på ulike løfteredskap','gjennomføre en brukerkontroll før bruk','avgjøre når løfteredskap skal kasseres og tas ut av bruk'],
      punkter: [
        'Alt løfteredskap skal være <b>merket</b> med arbeidslast (WLL), produsent og et nummer som gjør det sporbart. Uten lesbar merking skal redskapet ikke brukes.',
        'Brukeren skal gjøre en <b>brukerkontroll før bruk</b>. I tillegg skal løfteredskap ha <b>sakkyndig kontroll</b> med jevne mellomrom – vanligvis minst én gang i året.',
        '<b>Fiberstropper</b> kasseres ved kutt, slitasje, smelte- eller kjemikalieskader, knuter, synlig kjerne i rundsling eller manglende merkelapp.',
        '<b>Kjetting</b> kasseres ved sprekker, bøyde eller forlengede ledd, sterk slitasje, varmeskader, krok som har åpnet seg, eller defekt sikkerhetslås.',
        '<b>Ståltau</b> kasseres ved trådbrudd, knekk, klemskader, «fuglebur» (wiren åpner seg) og kraftig korrosjon.',
        'Kassert redskap skal <b>merkes og tas ut av bruk med en gang</b>, slik at ingen andre bruker det. Oppbevar redskap tørt, hengende og unna sollys og kjemikalier.'
      ],
      ndla: [['Opplæringsplan G11 (PDF)', AT_G11, 'Arbeidstilsynet'],['Forskrift om utførelse av arbeid', LOVDATA_FUA, 'Lovdata']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'kontroll-voks', tittel:'Å kassere er å ta ansvar', tekst:['Det kan føles dumt å kaste en dyr stropp som «nesten er hel». Men en skadet stropp kan ryke uten forvarsel.','Den som kasserer redskapet, beskytter også kollegaen som skulle brukt det i morgen. Det er omsorg i praksis.'], sporsmal:['Hvorfor er det vanskelig å si «dette kan ikke brukes»?','Hvordan reagerer du når noen påpeker en feil du har gjort?'], handling:'Takk den neste som påpeker en feil hos deg, i stedet for å forsvare deg.' },
        { type:'flash', id:'kontroll-flash', tittel:'Begrepskort: kontroll', kort:[
          ['Brukerkontroll','Kontroll brukeren gjør før redskapet tas i bruk.'],
          ['Sakkyndig kontroll','Grundig kontroll av en godkjent kontrollør med jevne mellomrom, vanligvis minst én gang i året.'],
          ['Merkebrikke','Brikke på kjetting med arbeidslast, kvalitetsklasse og sporingsnummer.'],
          ['Merkelapp','Etikett på fiberstropp med arbeidslast, materiale og produsent.'],
          ['Kassering','Redskapet tas ut av bruk for godt.'],
          ['Fuglebur','Skade på ståltau der kordelene åpner seg som et bur.'],
          ['Sikkerhetslås','Smekklås på kroken som hindrer at stroppen hopper av.']
        ]},
        { type:'quiz', id:'kontroll-q1', nivaa:1, tittel:'Merking og kontroll', sp:[
          {q:'Når skal brukeren kontrollere løfteredskapet?',a:['Før hver gang det tas i bruk','En gang i måneden','Bare når det er nytt','Når sjefen sier det'],r:0,f:'Brukerkontroll gjøres før bruk.'},
          {q:'En fiberstropp mangler merkelapp. Hva gjør du?',a:['Tar den ut av bruk','Bruker den til lette løft','Skriver på en ny lapp selv','Gjetter ut fra fargen'],r:0,f:'Uten merking vet du ikke hva den tåler.'},
          {q:'Hva står på merkebrikken til et kjettingredskap?',a:['Blant annet arbeidslast, kvalitetsklasse og sporingsnummer','Bare navnet på eieren','Prisen','Fargekoden'],r:0,f:'Brikken gjør at redskapet kan spores og brukes riktig.'},
          {q:'Hvor ofte skal løfteredskap vanligvis ha sakkyndig kontroll?',a:['Minst én gang i året','Hvert femte år','Aldri, hvis brukeren kontrollerer det','Hver uke'],r:0,f:'I tillegg til brukerkontrollen før hvert løft.'}
        ]},
        { type:'check', id:'kontroll-chk1', nivaa:2, tittel:'Brukerkontroll i redskapsrommet', instr:'Du kontrollerer redskapet før et løft. Kryss av det som skal kasseres.', dok:'Brukerkontroll – løfteredskap', meta:'Kontrollert av: anhuker · Før bruk', kolonner:['Redskap','Det du ser'], kryss:'Kasseres', rader:[
          { c:['Rundsling, grønn','Hel merkelapp. Kappen er litt skitten, men hel.'], avvik:false, f:'Skitt alene er ikke kassasjonsgrunn. Kappen er hel.' },
          { c:['Rundsling, gul','Kutt i kappen – du ser de hvite fibrene inni.'], avvik:true, f:'Synlig kjerne betyr at stroppen skal kasseres.' },
          { c:['Båndstropp, fiolett','Det er knyttet en knute for å gjøre den kortere.'], avvik:true, f:'Knuter svekker stroppen kraftig.' },
          { c:['Kjettingredskap','Krokens åpning er tydelig større enn på den andre kroken.'], avvik:true, f:'En krok som har åpnet seg, har vært overbelastet.' },
          { c:['Kjettingredskap','Sikkerhetslåsen på kroken mangler.'], avvik:true, f:'Uten sikkerhetslås kan stroppen hoppe av.' },
          { c:['Ståltaustropp','Wiren har åpnet seg som et bur på ett sted.'], avvik:true, f:'Fuglebur svekker wiren.' },
          { c:['Sjakkel','Merket med WLL. Bolten er original og går lett inn.'], avvik:false, f:'Riktig.' },
          { c:['Båndstropp, blå','Har ligget i sola på et tak i to år. Fargen er bleket, og stoffet er stivt.'], avvik:true, f:'UV-stråling bryter ned fiber. Bleket og stivt materiale skal kasseres.' }
        ]},
        { type:'tf', id:'kontroll-tf', nivaa:2, tittel:'Sant eller usant: oppbevaring og kassering', ps:[
          ['Fiberstropper bør oppbevares hengende, tørt og unna sollys.',true,'Fukt, sollys og kjemikalier bryter ned fibrene.'],
          ['En skadet stropp kan brukes til lettere løft.',false,'Skadet redskap skal tas ut av bruk.'],
          ['Kassert redskap bør merkes eller ødelegges så ingen bruker det igjen.',true,'Ellers kan en kollega ta det i bruk.'],
          ['Bolten i en sjakkel kan byttes med en vanlig bolt fra jernvarehandelen.',false,'Bruk bare original bolt eller godkjent reservedel.'],
          ['Det er greit å reparere en kuttet fiberstropp med tape.',false,'Fiberstropper skal ikke repareres på denne måten.']
        ]},
        { type:'case', id:'kontroll-case', nivaa:3, tittel:'Case: Den eneste stroppen', intro:'Det er fredag ettermiddag. Kunden venter på en maskin som skal løftes av lastebilen. Den eneste 3-tonns stroppen dere har, har en kuttskade i kanten. Maskinen veier 1,2 tonn.', steg:[
          {q:'Sjåføren sier: «Den tåler 3 tonn, og maskinen veier bare 1,2. Det går fint.» Hva svarer du?',valg:[{t:'Skadet stropp skal ikke brukes, uansett vekt',ok:true,f:'Du vet ikke lenger hva stroppen tåler.'},{t:'Det stemmer, det er god margin',ok:false,f:'Arbeidslasten gjelder bare for uskadet redskap.'},{t:'Vi bruker den, men løfter sakte',ok:false,f:'Lav fart gjør ikke en skadet stropp trygg.'}]},
          {q:'Hva gjør du med stroppen?',valg:[{t:'Merker den som kassert og tar den ut av bruk',ok:true,f:'Da bruker ingen den ved en feil senere.'},{t:'Legger den tilbake i kassa',ok:false,f:'Da kan noen andre bruke den.'},{t:'Kutter bort den skadde delen',ok:false,f:'Stroppen er da ikke lenger godkjent.'}]},
          {q:'Hvordan løser dere oppdraget?',valg:[{t:'Henter annet godkjent redskap eller avtaler ny tid med kunden',ok:true,f:'Sikkerhet går foran tidspress.'},{t:'Bruker et tau fra lastebilen',ok:false,f:'Surringsutstyr og tau er ikke løfteredskap.'},{t:'Løfter maskinen med to kuttede stropper',ok:false,f:'To skadede stropper blir ikke trygge sammen.'}]}
        ]}
      ]
    },
    /* ================================================================ G11-04 */
    {
      id: 'tabell', lok: 'G11-04', tittel: 'Løftetabeller og vinkler',
      kort: 'Bruk løftetabellen til å finne hva redskapet tåler i ulike anhukingsmåter og vinkler.',
      bok: 'Opplæringsplan Modul 2.3 (G11), leksjon 3 og 5',
      mal: ['forklare hvordan toppvinkelen påvirker kreftene i stroppene','bruke en løftetabell til å finne arbeidslast for to- og firepartsstropper','vurdere om et redskap er sterkt nok for et løft'],
      punkter: [
        '<b>Toppvinkelen</b> er vinkelen mellom stroppene oppe ved kroken. Jo større vinkel, desto større blir kraften i hver stropp.',
        'Ved <b>120°</b> toppvinkel er kraften i hver av to stropper like stor som hele lastens vekt. <b>Over 120° skal du ikke løfte.</b>',
        'Mange løftetabeller bruker faktorer for anhukingsmåten: <b>rett løft 1,0</b>, <b>snaring 0,8</b> og <b>kurv (U-løft) 2,0</b> når partene henger loddrett.',
        'For <b>to parter</b>: faktor <b>1,4</b> ved toppvinkel opptil 90°, og <b>1,0</b> ved 90–120°. For <b>tre og fire parter</b>: <b>2,1</b> og <b>1,5</b>.',
        'Arbeidslast i løftet = <b>arbeidslasten til én part × faktoren</b>. Eksempel: grønn stropp (2 t) i to parter med 60° toppvinkel: 2 × 1,4 = 2,8 t.',
        'Er lasten <b>ujevn</b> eller usikker, regner du som om bare to parter bærer. Bruk alltid <b>tabellen fra produsenten</b> av redskapet du har.'
      ],
      figur: { svg: SVG_LOFT, tekst: 'Toppvinkelen måles mellom stroppene ved kroken. Jo flatere stroppene ligger, desto mer blir de belastet.' },
      ndla: [['Opplæringsplan G11 (PDF)', AT_G11, 'Arbeidstilsynet']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'tabell-voks', tittel:'Ikke gjett – sjekk', tekst:['I mange situasjoner er det fristende å si «det holder sikkert». I løfteoperasjoner kan en gjetning koste liv.','Å spørre en kollega, sjekke tabellen en gang til eller si «vent litt, jeg må regne» er tegn på at du er profesjonell – ikke at du er usikker.'], sporsmal:['Når har du gjettet i stedet for å sjekke – og hva skjedde?','Hvordan kan dere i gruppa hjelpe hverandre til å sjekke uten å virke mistroiske?'], handling:'Bruk setningen «La meg sjekke tabellen» minst én gang i neste praktiske økt.' },
        { type:'flash', id:'tabell-flash', tittel:'Begrepskort: løftetabell', kort:[
          ['Løftetabell','Tabell fra produsenten som viser arbeidslast ved ulike anhukingsmåter og vinkler.'],
          ['Toppvinkel','Vinkelen mellom stroppene ved kroken.'],
          ['Rett løft','Én part som henger loddrett. Faktor 1,0.'],
          ['Snaring','Stroppen legges rundt lasten og gjennom sitt eget øye. Faktor 0,8.'],
          ['Kurv (U-løft)','Stroppen går under lasten, begge endene i kroken. Faktor 2,0 når partene er loddrette.'],
          ['Topartsstropp','To parter fra kroken. Faktor 1,4 (opptil 90°) og 1,0 (90–120°).'],
          ['Firepartsstropp','Fire parter fra kroken. Faktor 2,1 (opptil 90°) og 1,5 (90–120°).']
        ]},
        { type:'quiz', id:'tabell-q1', nivaa:1, tittel:'Vinkler og krefter', sp:[
          {q:'Hva skjer med kraften i hver stropp når toppvinkelen blir større?',a:['Den øker','Den minker','Den er lik','Den blir null'],r:0,f:'Flatere stropper drar mer sidelengs og får større kraft.'},
          {q:'Hva er største tillatte toppvinkel?',a:['120°','90°','150°','180°'],r:0,f:'Over 120° skal du ikke løfte.'},
          {q:'Ved 120° toppvinkel, hvor stor er kraften i hver av to stropper?',a:['Like stor som lastens vekt','Halvparten av vekten','Dobbelt så stor som vekten','Null'],r:0,f:'Derfor blir faktoren 1,0 for to parter ved 90–120°.'},
          {q:'Hvilken faktor gjelder for snaring?',a:['0,8','1,0','1,4','2,0'],r:0,f:'Snaring reduserer arbeidslasten med 20 %.'}
        ]},
        { type:'quiz', id:'tabell-q2', nivaa:2, tittel:'Regn ut arbeidslasten', sp:[
          {q:'Gul fiberstropp (3 t) brukes i snaring. Hva er arbeidslasten?',a:['2,4 t','3 t','6 t','1,5 t'],r:0,f:'3 × 0,8 = 2,4 t.'},
          {q:'Grønn stropp (2 t) brukes i kurv med loddrette parter. Hva er arbeidslasten?',a:['4 t','2 t','2,8 t','1,6 t'],r:0,f:'2 × 2,0 = 4 t.'},
          {q:'Topartsstropp der én part tåler 1,5 t. Toppvinkelen er 80°. Hva er arbeidslasten?',a:['2,1 t','1,5 t','3 t','1,2 t'],r:0,f:'80° er under 90°, så faktoren er 1,4. 1,5 × 1,4 = 2,1 t.'},
          {q:'Samme stropp (1,5 t per part), men toppvinkelen er 110°. Hva er arbeidslasten?',a:['1,5 t','2,1 t','3 t','0,75 t'],r:0,f:'Mellom 90° og 120°: faktor 1,0. 1,5 × 1,0 = 1,5 t.'},
          {q:'Firepartsstropp, 2 t per part, toppvinkel 60°. Hva er arbeidslasten?',a:['4,2 t','8 t','3 t','2,8 t'],r:0,f:'2 × 2,1 = 4,2 t – ikke 8 t, fordi partene sjelden bærer likt.'}
        ]},
        { type:'case', id:'tabell-case', nivaa:3, tittel:'Case: Containeren med utstyr', intro:'En liten container skal løftes. Den veier 3,5 tonn med innhold, og lasten inni står ujevnt fordelt. Dere har et firepartsredskap av kjetting der hver part har arbeidslast 2 t. Toppvinkelen blir ca. 70°.', steg:[
          {q:'Hva er arbeidslasten etter tabellen hvis alle fire parter bærer likt?',valg:[{t:'2 × 2,1 = 4,2 t',ok:true,f:'Faktor 2,1 for tre og fire parter opptil 90°.'},{t:'2 × 4 = 8 t',ok:false,f:'Du kan ikke bare gange med antall parter.'},{t:'2 × 1,4 = 2,8 t',ok:false,f:'1,4 gjelder to parter.'}]},
          {q:'Lasten er ujevnt fordelt. Hva bør du regne med?',valg:[{t:'At bare to parter bærer: 2 × 1,4 = 2,8 t',ok:true,f:'Med ujevn last kan to parter få nesten hele vekten.'},{t:'At alle fire bærer likt',ok:false,f:'Det stemmer ikke når tyngdepunktet er forskjøvet.'},{t:'At én part bærer alt',ok:false,f:'Tabellene bruker to parter som det sikre utgangspunktet.'}]},
          {q:'Containeren veier 3,5 t. Hva gjør du?',valg:[{t:'Velger et kraftigere redskap, eller fordeler lasten jevnt og vurderer på nytt',ok:true,f:'2,8 t er for lite for 3,5 t.'},{t:'Løfter likevel, siden 4,2 t er over 3,5 t',ok:false,f:'Med ujevn last er det sikre tallet 2,8 t.'},{t:'Øker toppvinkelen',ok:false,f:'Større toppvinkel gir enda større kraft i partene.'}]}
        ]},
        { type:'reflect', id:'tabell-r1', nivaa:3, tittel:'Forklar for en ny kollega', q:'En ny kollega tror at to stropper på 2 tonn alltid kan løfte 4 tonn. Forklar hvorfor det er feil. Bruk toppvinkel, faktorer og et regneeksempel.', punkter:['forklarer at kraften i stroppene øker med toppvinkelen','nevner at over 120° ikke er tillatt','bruker riktig faktor for to parter (1,4 eller 1,0)','viser et korrekt regneeksempel','nevner ujevn last eller tyngdepunkt','sier at produsentens tabell alltid skal brukes'] }
      ]
    },
    /* ================================================================ G11-05 */
    {
      id: 'anhuking', lok: 'G11-05', tittel: 'Anhuking i praksis',
      kort: 'Planlegg løftet, finn tyngdepunktet, beskytt kantene og gjør prøveløft.',
      bok: 'Opplæringsplan Modul 2.3 (G11), leksjon 2, 3 og 6',
      mal: ['planlegge et løft fra start til slutt','anhuke en last slik at den henger stabilt','bruke kantbeskyttelse, styretau og prøveløft'],
      punkter: [
        'Finn ut hva lasten <b>veier</b> og hvor <b>tyngdepunktet</b> er. Kroken skal være rett over tyngdepunktet – ellers tipper lasten.',
        'Bruk lastens <b>løftepunkter</b> når den har det. Øyebolter skal skrus helt inn, og de tåler mye mindre når de belastes på skrå.',
        'Legg <b>kantbeskyttelse</b> der stroppen går over skarpe kanter. Stroppene skal ikke vris eller ligge i knute.',
        'Samles to stropper i en sjakkel, skal stroppene ligge i <b>bøylen</b> og bolten mot kroken. Sjekk at kroken har <b>sikkerhetslås</b>.',
        'Gjør et <b>prøveløft</b>: løft lasten noen centimeter, stopp og kontroller at den henger stabilt og at redskapet sitter riktig.',
        'Bruk <b>styretau</b> for å styre lasten – aldri hendene på hengende last. Sett lasten ned på <b>klosser</b>, så stroppene kan tas ut uten klemfare.'
      ],
      ndla: [['Opplæringsplan G11 (PDF)', AT_G11, 'Arbeidstilsynet'],['Lasting og lossing', NDLA_LASTING, 'NDLA']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'anhuking-voks', tittel:'Planlegg sammen', tekst:['De fleste ulykker ved løft skjer ikke fordi folk ikke kan nok, men fordi de ikke snakket sammen før de startet.','Et kort møte før løftet – hvem gjør hva, hva kan gå galt, hvor går vi hvis noe skjer – er ofte det viktigste sikkerhetstiltaket.'], sporsmal:['Hvorfor hopper folk over planleggingen når de har dårlig tid?','Hva er ett spørsmål dere alltid bør stille hverandre før dere starter en praktisk oppgave?'], handling:'Start neste praktiske oppgave med et 1-minutts planleggingsmøte.' },
        { type:'flash', id:'anhuking-flash', tittel:'Begrepskort: anhuking', kort:[
          ['Tyngdepunkt','Punktet der lasten er i balanse. Kroken skal være rett over det.'],
          ['Løftepunkt','Fast punkt på lasten som er laget for løft.'],
          ['Kantbeskyttelse','Beskyttelse mellom stropp og skarp kant.'],
          ['Prøveløft','Løft noen centimeter, stopp og kontroller.'],
          ['Styretau','Tau som brukes til å styre lasten på avstand.'],
          ['Klosser','Underlag lasten settes ned på, så stroppene kan tas ut.'],
          ['SJA','Sikker jobbanalyse – en gjennomgang av farer og tiltak før jobben starter.']
        ]},
        { type:'hotspot', id:'anhuking-hs1', nivaa:1, tittel:'Finn fram i løftet', instr:'Tegningen viser en kasse som løftes med to stropper. Trykk på riktig sted.', svg:SVG_LOFT, sp:[
          { q:'Hvor skal sikkerhetslåsen være?', z:'krok', f:'På kroken. Den hindrer at redskapet hopper av.' },
          { q:'Trykk på koblingen der stroppene samles.', z:'sjakkel', f:'Sjakkelen. Stroppene skal ligge i bøylen.' },
          { q:'Trykk på vinkelen du bruker i løftetabellen.', z:'vinkel', f:'Toppvinkelen mellom stroppene.' },
          { q:'Hvor trenger stroppene kantbeskyttelse?', z:'kant', f:'Over de skarpe kantene på kassen.' },
          { q:'Hvor er tyngdepunktet til kassen?', z:'tp', f:'Kroken skal være rett over tyngdepunktet.' },
          { q:'Hva bruker du for å styre lasten uten å ta på den?', z:'styretau', f:'Styretauet. Aldri vikle det rundt hånda.' }
        ]},
        { type:'order', id:'anhuking-o1', nivaa:2, tittel:'Gjennomfør løftet', instr:'Sett stegene i et løft i riktig rekkefølge.', steg:[
          'Finn vekt og tyngdepunkt og planlegg løftet','Avtal roller og signaler med kranføreren','Kontroller løfteredskapet','Anhuk lasten og legg på kantbeskyttelse','Gå unna og gi signal om å stramme','Gjør et prøveløft og kontroller','Løft og flytt lasten med styretau','Sett lasten ned på klosser og avhuk'
        ], f:'Planlegging og kontroll kommer før selve løftet.' },
        { type:'tf', id:'anhuking-tf', nivaa:2, tittel:'Sant eller usant: anhuking', ps:[
          ['Hvis kroken ikke er over tyngdepunktet, vil lasten tippe når den løftes.',true,'Lasten svinger til tyngdepunktet havner under kroken.'],
          ['Det er greit å styre hengende last med hendene hvis den er lett.',false,'Bruk styretau og hold avstand.'],
          ['En øyebolt tåler like mye på skrå som rett opp.',false,'Øyebolter tåler mye mindre ved skrå belastning.'],
          ['Prøveløft gjør at du oppdager feil før lasten er høyt oppe.',true,'Stopp, kontroller og juster om nødvendig.'],
          ['Lasten bør settes ned direkte på stroppene.',false,'Bruk klosser, så du kan ta ut stroppene uten klemfare.']
        ]},
        { type:'case', id:'anhuking-case', nivaa:3, tittel:'Case: Maskinen som tipper', intro:'Du skal løfte en kompressor på 900 kg med to rundslinger. Når kranføreren strammer, begynner kompressoren å tippe mot den ene siden.', steg:[
          {q:'Hva gjør du først?',valg:[{t:'Gir stoppsignal og ber kranføreren senke lasten',ok:true,f:'Stopp før du gjør noe annet.'},{t:'Holder igjen kompressoren med hendene',ok:false,f:'Du kan bli klemt.'},{t:'Ber kranføreren løfte raskere',ok:false,f:'Det gjør tippingen verre.'}]},
          {q:'Hva er den sannsynlige årsaken?',valg:[{t:'Kroken er ikke rett over tyngdepunktet',ok:true,f:'Motoren gjør at tyngdepunktet ligger nærmere én side.'},{t:'Stroppene har feil farge',ok:false,f:'Fargen sier noe om arbeidslast, ikke om balanse.'},{t:'Kranen er for liten',ok:false,f:'Kapasiteten forklarer ikke tippingen.'}]},
          {q:'Hvordan retter du det?',valg:[{t:'Flytter anhukingspunktene eller bruker stropper med ulik lengde slik at kroken kommer over tyngdepunktet, og gjør nytt prøveløft',ok:true,f:'Prøveløftet viser om lasten nå henger stabilt.'},{t:'Løfter likevel og styrer med styretau',ok:false,f:'Styretau er ikke til å holde lasten i balanse.'},{t:'Legger på en ekstra stropp tilfeldig',ok:false,f:'Det må planlegges ut fra tyngdepunktet.'}]}
        ]}
      ]
    },
    /* ================================================================ G11-06 */
    {
      id: 'signaler', lok: 'G11-06', tittel: 'Signaler og kommunikasjon',
      kort: 'Håndsignaler og radiokommunikasjon mellom signalgiver og kranfører.',
      bok: 'Opplæringsplan Modul 2.3 (G11), leksjon 4',
      mal: ['vise og forstå de vanligste håndsignalene','kommunisere tydelig med kranføreren på radio','forklare hvorfor signaler må avtales før løftet'],
      punkter: [
        'Det skal være <b>én signalgiver</b>, og han eller hun skal stå der kranføreren kan se signalene – og der signalgiveren selv ser lasten og er trygg.',
        '<b>Start/klar:</b> begge armene ut til sidene, håndflatene fram. <b>Stopp:</b> høyre arm rett opp, håndflaten fram. <b>Slutt:</b> hendene foldet foran brystet.',
        '<b>Heis:</b> høyre arm opp, håndflaten fram, med langsomme sirkler. <b>Senk:</b> høyre arm ned, håndflaten inn, med langsomme sirkler.',
        '<b>Fare / nødstopp:</b> begge armene rett opp, håndflatene fram. Avstand vises med hendene.',
        'Ved <b>radio</b>: Avtal kanal, si hvem du er, bruk korte og faste ord, og snakk hele tiden når kranføreren ikke ser lasten. Bryter sambandet, skal kranføreren <b>stoppe</b>.',
        '<b>Avtal signalene før løftet.</b> På noen arbeidsplasser finnes egne signaler – sjekk prosedyrene der du jobber.'
      ],
      ndla: [['Opplæringsplan G11 (PDF)', AT_G11, 'Arbeidstilsynet'],['G11 fjernundervisning (PDF)', AT_G11_FJERN, 'Arbeidstilsynet']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'signaler-voks', tittel:'Tydelighet er vennlighet', tekst:['Et utydelig signal kan være farligere enn ingen signal. Kranføreren må gjette – og det er da ulykker skjer.','Å være tydelig er en form for respekt. Det gjelder også når vi gir beskjeder eller tilbakemeldinger til hverandre.'], sporsmal:['Når har en utydelig beskjed skapt problemer for deg?','Hvordan kan du sjekke at den andre har forstått det du mente?'], handling:'Når du gir en beskjed i dag: Be mottakeren gjenta den med egne ord.' },
        { type:'flash', id:'signaler-flash', tittel:'Begrepskort: signaler', kort:[
          ['Start / klar','Begge armene ut til sidene, håndflatene fram.'],
          ['Stopp','Høyre arm rett opp, håndflaten fram.'],
          ['Slutt','Hendene foldet foran brystet.'],
          ['Heis','Høyre arm opp, håndflaten fram, langsomme sirkler.'],
          ['Senk','Høyre arm ned, håndflaten inn, langsomme sirkler.'],
          ['Fare / nødstopp','Begge armene rett opp, håndflatene fram.'],
          ['Blindløft','Løft der kranføreren ikke ser lasten. Krever kontinuerlig radiokontakt.']
        ]},
        { type:'match', id:'signaler-m1', nivaa:1, tittel:'Koble signal og betydning', instr:'Koble beskrivelsen av håndsignalet med det det betyr.', par:[
          ['Begge armene ut til sidene, håndflatene fram','Start / klar'],
          ['Høyre arm rett opp, håndflaten fram','Stopp'],
          ['Høyre arm opp med langsomme sirkler','Heis'],
          ['Høyre arm ned med langsomme sirkler','Senk'],
          ['Begge armene rett opp, håndflatene fram','Fare / nødstopp'],
          ['Hendene foldet foran brystet','Slutt']
        ], f:'Øv på signalene med en makker: Den ene viser, den andre sier hva det betyr.' },
        { type:'quiz', id:'signaler-q2', nivaa:2, tittel:'Radio og plassering', sp:[
          {q:'Kranføreren ser ikke lasten. Hva gjelder for radiokommunikasjonen?',a:['Signalgiveren snakker hele tiden mens lasten er i bevegelse','Det holder med én melding i starten','Kranføreren kjører på følelsen','Man venter til lasten er synlig'],r:0,f:'Ved blindløft skal kranføreren hele tiden få informasjon.'},
          {q:'Hva skal kranføreren gjøre hvis radiokontakten blir borte?',a:['Stoppe','Fortsette sakte','Senke lasten raskt','Tute'],r:0,f:'Uten kontakt skal bevegelsen stoppe.'},
          {q:'Hvor bør signalgiveren stå?',a:['Synlig for kranføreren, med oversikt over lasten og på et trygt sted','Under lasten for å se best','Bak kranen','Hvor som helst'],r:0,f:'Synlighet, oversikt og egen sikkerhet.'},
          {q:'Hvorfor skal signalene avtales før løftet?',a:['Arbeidsplasser kan ha ulike signaler, og alle må forstå dem likt','Det er ikke nødvendig','For å spare tid etterpå','Fordi kranføreren bestemmer alt'],r:0,f:'Like signaler hindrer misforståelser.'}
        ]},
        { type:'case', id:'signaler-case', nivaa:3, tittel:'Case: Løft over taket', intro:'Du er signalgiver. En pall med takstein skal løftes fra lastebilen og opp på et tak. Kranføreren ser ikke taket fra førerplassen. Dere har radio.', steg:[
          {q:'Hva gjør dere før løftet?',valg:[{t:'Tester radioen, avtaler kanal og faste ord, og går gjennom løftet',ok:true,f:'Forberedelse hindrer misforståelser.'},{t:'Starter med en gang og tar det underveis',ok:false,f:'Et blindløft krever planlegging.'},{t:'Bruker bare håndsignaler',ok:false,f:'Kranføreren ser deg ikke når lasten er over taket.'}]},
          {q:'Lasten nærmer seg taket. Hvordan kommuniserer du?',valg:[{t:'Korte, faste beskjeder hele tiden: «Senk sakte … sakte … stopp»',ok:true,f:'Kontinuerlig kommunikasjon ved blindløft.'},{t:'Én lang forklaring',ok:false,f:'Lange meldinger tar for lang tid.'},{t:'Venter med å si noe til lasten står',ok:false,f:'Da vet ikke kranføreren hva som skjer.'}]},
          {q:'En taktekker går inn under lasten. Hva gjør du?',valg:[{t:'Sier «STOPP» tydelig på radio og varsler taktekkeren',ok:true,f:'Ingen under hengende last.'},{t:'Ber kranføreren senke raskere',ok:false,f:'Det øker faren.'},{t:'Ingenting – taktekkeren har ansvaret selv',ok:false,f:'Alle har plikt til å si fra om fare.'}]}
        ]},
        { type:'reflect', id:'signaler-egen', nivaa:3, tittel:'Egenvurdering: G11', q:'Se tilbake på temaene i G11. Hva er du trygg på som anhuker og signalgiver, og hva må du øve mer på i praksis? Velg også én av klassens verdier og beskriv hvordan du viste den i arbeidet.', punkter:['nevner en ferdighet du mestrer (f.eks. kontroll, tabell, signaler)','nevner noe du må øve mer på','beskriver hvordan du skal øve (praktisk økt, makker, lærer)','forklarer hvorfor det er viktig for sikkerheten','beskriver konkret hvordan du viste en av klassens verdier'] }
      ]
    }
  ]
});
