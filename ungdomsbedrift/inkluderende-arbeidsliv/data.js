/* Inkluderende arbeidsliv (IA) i ungdomsbedrift – egenprodusert læringsinnhold (Vg2 TOL, Bransjelære / UB).
   Faglig grunnlag: NDLA Bransjelære (TP-TOL vg2), emnet «Plikter og rettigheter i arbeidslivet»,
   læreboka i Bransjelære kap. 10, arbeidsmiljøloven og NAVs IA-opplegg for ungdomsbedrifter.
   Ingen tekst, oppgaver eller figurer er kopiert fra lærebok, arbeidsbok, NDLA eller NAV. NDLA er lenket til. */
const NR = 'https://ndla.no/r/bransjelare-tp-tol-vg2---ressurssamling/';
const NDLA_EMNE = 'https://ndla.no/e/bransjelare-tp-tol-vg2---ressurssamling/plikter-og-rettigheter-i-arbeidslivet/e7ae78ef91';
const N = {
  likeverd:  ['Likeverd og inkludering i arbeidslivet', NR + 'likeverd-og-inkludering-i-arbeidslivet/bb1788fd77', 'NDLA'],
  jobben:    ['Jobben – et sted å være', NR + 'jobben---et-sted-a-vare/b74a5d4e17', 'NDLA'],
  aml:       ['Arbeidsmiljøloven', NR + 'arbeidsmiljoloven/1e62455559', 'NDLA'],
  rettplikt: ['Rettigheter og plikter i arbeidslivet', NR + 'rettigheter-og-plikter-i-arbeidslivet/ea3e9251ba', 'NDLA'],
  bidra:     ['Bidra til et godt arbeidsmiljø', NR + 'bidra-til-et-godt-arbeidsmiljo/ebfd0c20f8', 'NDLA'],
  trepart:   ['Trepartssamarbeidet', NR + 'trepartssamarbeidet/622638a8b7', 'NDLA'],
  varsling:  ['Varsling', NR + 'varsling/2cfe98c78f', 'NDLA'],
  menneske:  ['Overordnet del 1.1 Menneskeverdet', 'https://www.udir.no/lk20/overordnet-del/opplaringens-verdigrunnlag/1.1-menneskeverdet/', 'Udir'],
  ia:        ['Inkluderende arbeidsliv', 'https://www.arbeidstilsynet.no/arbeidsmiljo/inkluderende-arbeidsliv/', 'Arbeidstilsynet'],
  roller:    ['Roller i HMS-arbeidet', 'https://www.arbeidstilsynet.no/hms/roller-i-hms-arbeidet/', 'Arbeidstilsynet'],
  iasamarb:  ['IA-samarbeid', 'https://www.idebanken.org/ia/ia-samarbeid', 'Idébanken'],
  lov:       ['Arbeidsmiljøloven (lovteksten)', 'https://lovdata.no/lov/2005-06-17-62', 'Lovdata']
};
const BOK = 'Læreboka i Bransjelære, kap. 10';

/* ---------- Egne tegninger (SVG) ---------- */
const S = 'font-family="Inter,system-ui,sans-serif"';
const FIG_PARTER = `<svg viewBox="0 0 600 300" ${S} role="img" aria-label="Partssamarbeid på arbeidsplassen: leder, verneombud og tillitsvalgt samarbeider om arbeidsmiljø, sykefravær og inkludering">
  <rect width="600" height="300" fill="#f5f7fa"/>
  <line x1="300" y1="70" x2="140" y2="225" stroke="#9aa7b4" stroke-width="4"/><line x1="300" y1="70" x2="460" y2="225" stroke="#9aa7b4" stroke-width="4"/><line x1="140" y1="225" x2="460" y2="225" stroke="#9aa7b4" stroke-width="4"/>
  <circle cx="300" cy="62" r="44" fill="#f2b84b"/><text x="300" y="58" text-anchor="middle" font-size="15" font-weight="800" fill="#1b2128">Leder</text><text x="300" y="76" text-anchor="middle" font-size="11" fill="#1b2128">arbeidsgiver</text>
  <circle cx="140" cy="230" r="44" fill="#7cc4a4"/><text x="140" y="226" text-anchor="middle" font-size="14" font-weight="800" fill="#1b2128">Verneombud</text><text x="140" y="244" text-anchor="middle" font-size="11" fill="#1b2128">arbeidsmiljø/HMS</text>
  <circle cx="460" cy="230" r="44" fill="#8fb4e8"/><text x="460" y="226" text-anchor="middle" font-size="14" font-weight="800" fill="#1b2128">Tillitsvalgt</text><text x="460" y="244" text-anchor="middle" font-size="11" fill="#1b2128">lønn og vilkår</text>
  <text x="300" y="168" text-anchor="middle" font-size="14" font-weight="700" fill="#1b2128">IA på arbeidsplassen</text>
  <text x="300" y="188" text-anchor="middle" font-size="12" fill="#3d4853">arbeidsmiljø · sykefravær · inkludering</text>
</svg>`;
const FIG_FRAVAER = `<svg viewBox="0 0 640 220" ${S} role="img" aria-label="Tidslinje for sykefraværsrutine i ungdomsbedriften: dag 1 melder den ansatte fra, dag 3 tar leder kontakt, deretter avtalt oppfølging, og god mottakelse når den ansatte kommer tilbake">
  <rect width="640" height="220" fill="#f5f7fa"/>
  <line x1="50" y1="90" x2="600" y2="90" stroke="#3d4853" stroke-width="4"/>
  <g font-size="13" fill="#1b2128">
    <circle cx="80" cy="90" r="14" fill="#f2b84b"/><text x="80" y="58" text-anchor="middle" font-weight="800">Dag 1</text><text x="80" y="128" text-anchor="middle">Den ansatte</text><text x="80" y="145" text-anchor="middle">melder fra</text><text x="80" y="162" text-anchor="middle">til leder</text>
    <circle cx="240" cy="90" r="14" fill="#f2b84b"/><text x="240" y="58" text-anchor="middle" font-weight="800">Dag 3</text><text x="240" y="128" text-anchor="middle">Leder tar</text><text x="240" y="145" text-anchor="middle">kontakt: «Hvordan</text><text x="240" y="162" text-anchor="middle">går det med deg?»</text>
    <circle cx="410" cy="90" r="14" fill="#7cc4a4"/><text x="410" y="58" text-anchor="middle" font-weight="800">Videre</text><text x="410" y="128" text-anchor="middle">Fast avtalt</text><text x="410" y="145" text-anchor="middle">kontakt, f.eks.</text><text x="410" y="162" text-anchor="middle">én gang i uka</text>
    <circle cx="570" cy="90" r="14" fill="#8fb4e8"/><text x="570" y="58" text-anchor="middle" font-weight="800">Tilbake</text><text x="570" y="128" text-anchor="middle">Ta godt imot</text><text x="570" y="145" text-anchor="middle">og fortell hva</text><text x="570" y="162" text-anchor="middle">som har skjedd</text>
  </g>
  <text x="320" y="205" text-anchor="middle" font-size="11" fill="#5c6670">Eksempel på en enkel rutine i en ungdomsbedrift. Dere bestemmer selv dagene og hvem som har ansvaret.</text>
</svg>`;

TLL.registrer({
  id: 'ia-ub',
  fag: 'Ungdomsbedrift',
  kortnavn: 'Inkluderende arbeidsliv',
  kortTittel: 'Inkluderende arbeidsliv',
  oppsett: 'fokus',
  nr: 'IA',
  tittel: 'Inkluderende arbeidsliv (IA) i ungdomsbedriften',
  ingress: 'Hva gjør en arbeidsplass god å være på – for alle? Lær om likeverd, IA, rettigheter og plikter, og lag IA-handlingsplanen for ungdomsbedriften deres.',
  prove: false,
  ressursomrade: 'ub',
  kompetansemal: [
    { kode: 'TOL02-01 · Bransjelære', tekst: 'drøfte hvilke krav og forventninger som stilles til et likeverdig og inkluderende yrkesfellesskap, og beskrive hvilke plikter og rettigheter arbeidsgiver og arbeidstaker har i arbeidslivet' },
    { kode: 'TOL02-01 · Bransjelære', tekst: 'planlegge og utføre arbeid i samsvar med gjeldende regelverk for helse, miljø og sikkerhet, sertifiseringsbestemmelser og næringens krav til kvalitet' }
  ],
  /* Faste poster (se transport-logistikk-lofteoperasjoner/felles/README.md): lenke = klar, false = ikke tilgjengelig, utelatt = «Kommer» */
  fastePoster: {
    begreper: '/transport-logistikk-lofteoperasjoner/ordbok/?kap=bl:10',
    ovelsesbank: false,
    prove: '#/avsluttende-prove'
  },
  exitTicket: [
    'Forklar med egne ord hva inkluderende arbeidsliv (IA) handler om. Nevn de tre områdene.',
    'En i ungdomsbedriften deres har vært borte i tre dager uten å si fra. Hva sier rutinen deres at dere skal gjøre nå?',
    'Hva er det viktigste du har lært om IA, og hva er du fortsatt usikker på?'
  ],
  ressurser: {
    presentasjon: '',
    laerebok: BOK + ' «Et likeverdig og inkluderende yrkesfellesskap» (s. 271–293)',
    arbeidsbok: 'Arbeidsboka i Bransjelære, kap. 10 (oppgave 10.1–10.10)',
    ndlaEmne: NDLA_EMNE,
    ndlaEmneNavn: 'Plikter og rettigheter i arbeidslivet (NDLA)',
    ordliste: '/transport-logistikk-lofteoperasjoner/ordbok/?kap=bl:10',
    ordlisteTag: 'Ordbok',
    ordlisteNavn: 'Ordboka – Bransjelære kap. 10'
  },
  fotnote: 'Ungdomsbedrift · Inkluderende arbeidsliv. Tekster, oppgaver og tegninger er egenprodusert. Fagstoff fra <a href="' + NDLA_EMNE + '" target="_blank" rel="noopener">NDLA</a> er lenket til, ikke kopiert. Kompetansemål fra Utdanningsdirektoratet (NLOD). Arbeidsmiljøloven og andre regler har forrang – kontroller alltid på lovdata.no. Resultater lagres bare i nettleseren på denne enheten – <a href="#/lagring">les om lagring</a> · <a href="#/rapport">lever fremdrift</a>.',
  temaer: [
    /* ================================================================ IA-01 */
    {
      id: 'likeverd', lok: 'IA-01', tittel: 'Likeverd og inkludering',
      kort: 'Alle er like mye verdt. Hva betyr det på en arbeidsplass – og hva er diskriminering?',
      bok: BOK + '.1 (s. 272–276)',
      mal: ['forklare hva likeverd betyr på en arbeidsplass','skille mellom direkte og indirekte diskriminering','kjenne igjen hersketeknikker og vite hva jeg kan gjøre når jeg ser dem'],
      punkter: [
        '<b>Likeverd</b> betyr at alle mennesker er like mye verdt – uansett kjønn, alder, bakgrunn, religion, funksjonsevne eller legning. Det betyr ikke at alle er like, men at alle skal møtes med samme respekt.',
        '<b>Inkludering</b> betyr at alle får være med og bidra i fellesskapet. Det motsatte er <b>ekskludering</b> – å holde noen utenfor.',
        '<b>Diskriminering</b> er å behandle noen dårligere på grunn av hvem de er. <b>Direkte</b> diskriminering er når noen bevisst stilles dårligere. <b>Indirekte</b> diskriminering er når en regel som ser lik ut for alle, likevel rammer noen urettferdig.',
        '<b>Arbeidsmiljøloven</b> og <b>likestillings- og diskrimineringsloven</b> forbyr diskriminering, for eksempel på grunn av alder, politisk syn, etnisitet, religion, funksjonsnedsettelse, kjønn, graviditet og seksuell orientering.',
        '<b>Hersketeknikker</b> er måter å gjøre andre små på: usynliggjøring, latterliggjøring, å holde tilbake informasjon, dobbeltstraff («uansett hva du gjør, er det feil») og å påføre skyld og skam.',
        'I et godt yrkesfellesskap sier du fra når noen blir holdt utenfor – og du melder fra til leder eller verneombud hvis du ser trakassering eller diskriminering.'
      ],
      ndla: [N.likeverd, N.menneske],
      arbeidsbok: 'Arbeidsboka kap. 10, oppgave 10.1–10.3',
      aktiviteter: [
        { type:'voks', id:'likeverd-voks', tittel:'Det koster lite å inkludere', tekst:['De fleste har kjent på å stå litt utenfor – i et nytt klasserom, på en ny jobb eller i en gruppe der alle andre kjenner hverandre.','Ofte er det små ting som gjør forskjellen: at noen sier navnet ditt, spør hva du mener, eller holder av en plass til deg i lunsjen.'], sporsmal:['Når følte du deg sist inkludert? Hva gjorde de andre?','Hvem i klassen eller ungdomsbedriften kunne trengt en invitasjon fra deg?'], handling:'Gjør én liten ting i dag som får en annen til å føle seg sett.' },
        { type:'flash', id:'likeverd-flash', tittel:'Begrepskort: likeverd og inkludering', kort:[
          ['Likeverd','Alle mennesker er like mye verdt, uansett egenskaper de er født med eller har fått senere.'],
          ['Inkludering','At alle får delta og bidra i fellesskapet.'],
          ['Ekskludering','At noen blir holdt utenfor fellesskapet.'],
          ['Direkte diskriminering','Når noen bevisst blir behandlet dårligere enn andre på grunn av hvem de er.'],
          ['Indirekte diskriminering','Når en regel eller praksis som ser nøytral ut, likevel stiller noen dårligere.'],
          ['Hersketeknikk','En måte å gjøre andre usikre eller mindre verdt på, for eksempel latterliggjøring.'],
          ['Usynliggjøring','Når noen blir oversett, glemt eller avbrutt som om de ikke var der.'],
          ['Trakassering','Handlinger eller ord som krenker, skremmer eller ydmyker noen.']
        ]},
        { type:'quiz', id:'likeverd-q1', nivaa:1, tittel:'Hva betyr det?', sp:[
          {q:'Hva betyr likeverd?',a:['At alle mennesker er like mye verdt','At alle skal være like','At alle skal tjene det samme','At alle må gjøre de samme oppgavene'],r:0,f:'Vi er forskjellige, men like mye verdt.'},
          {q:'Hva er det motsatte av å inkludere?',a:['Å ekskludere','Å integrere','Å delegere','Å motivere'],r:0,f:'Å ekskludere er å holde noen utenfor.'},
          {q:'Hvilken lov sier blant annet at det ikke er lov å diskriminere på grunn av etnisitet?',a:['Likestillings- og diskrimineringsloven','Vegtrafikkloven','Ferieloven','Regnskapsloven'],r:0,f:'Arbeidsmiljøloven har også regler mot diskriminering i arbeidslivet.'},
          {q:'Hva er latterliggjøring?',a:['En hersketeknikk der noen blir gjort narr av','En måte å gi ros på','En type tilbakemelding fra leder','En HMS-regel'],r:0,f:'Latterliggjøring gjør den som rammes, liten og usikker.'}
        ]},
        { type:'match', id:'likeverd-m1', nivaa:2, tittel:'Kjenn igjen hersketeknikken', instr:'Koble situasjonen med riktig hersketeknikk.', par:[
          ['Amir blir aldri spurt om hva han mener på møtene','Usynliggjøring'],
          ['Noen hermer etter Sara når hun presenterer','Latterliggjøring'],
          ['Alle unntatt Jonas får vite at møtet er flyttet','Tilbakeholding av informasjon'],
          ['Lina får kjeft både når hun spør og når hun ikke spør','Dobbeltstraff'],
          ['Elias får høre at det er hans skyld at salget gikk dårlig, foran alle','Påføring av skyld og skam']
        ], f:'Når du kjenner igjen hersketeknikkene, er det lettere å si fra – både når det skjer med deg og med andre.' },
        { type:'sort', id:'likeverd-s1', nivaa:2, tittel:'Direkte eller indirekte?', instr:'Sorter eksemplene: Er det direkte eller indirekte diskriminering?', kat:['Direkte diskriminering','Indirekte diskriminering'], items:[
          ['En søker får ikke jobben fordi hun er gravid',0,'Hun blir bevisst behandlet dårligere på grunn av graviditet.'],
          ['Alle ansatte må kunne løfte 40 kg, også i en jobb der ingen løfter tungt',1,'Kravet ser likt ut, men utelukker mange uten at jobben krever det.'],
          ['En bedrift vil ikke ansette noen over 50 år',0,'Alder brukes direkte som grunn.'],
          ['Alle møter legges til kl. 07.00, selv om det ikke trengs, og de med små barn kan ikke komme',1,'Regelen gjelder alle, men rammer noen urettferdig.'],
          ['En søker blir valgt bort fordi navnet «høres utenlandsk ut»',0,'Etnisitet brukes direkte som grunn.'],
          ['Det kreves perfekt norsk muntlig i en jobb på lageret der det ikke trengs',1,'Kravet er nøytralt formulert, men stiller noen dårligere uten god grunn.']
        ], f:'Indirekte diskriminering er vanskeligere å se, fordi regelen ser rettferdig ut på papiret.' },
        { type:'case', id:'likeverd-case', nivaa:3, tittel:'Case: Utenfor i ungdomsbedriften', intro:'I ungdomsbedriften «Sjekk Levert UB» har fire av fem ansatte en egen chat der de avtaler ting. Mina er ikke med i chatten. Hun møter ofte opp til avtaler som allerede er flyttet, og de andre ler av at hun «alltid er på feil sted».', steg:[
          {q:'Hva skjer her?',valg:[{t:'Mina blir holdt utenfor gjennom tilbakeholding av informasjon og latterliggjøring',ok:true,f:'To hersketeknikker på en gang – selv om det kanskje ikke var meningen i starten.'},{t:'Mina er dårlig til å følge med',ok:false,f:'Hun får ikke informasjonen de andre får. Da kan hun ikke følge med.'},{t:'Det er bare tull mellom venner',ok:false,f:'Det kan være vondt for den som rammes, selv om de andre tror det er tull.'}]},
          {q:'Du er daglig leder i UB-en. Hva gjør du først?',valg:[{t:'Lager én felles kanal for alt som gjelder bedriften, og tar en prat med Mina',ok:true,f:'Lik informasjon til alle er et konkret og enkelt tiltak.'},{t:'Venter og ser om det går over',ok:false,f:'Ekskludering pleier sjelden å gå over av seg selv.'},{t:'Sier til Mina at hun må spørre mer',ok:false,f:'Da legger du ansvaret på den som blir holdt utenfor.'}]},
          {q:'Hva kan dere skrive inn i teamkontrakten for å hindre at det skjer igjen?',valg:[{t:'«All informasjon om bedriften deles i den felles kanalen. Vi ler med hverandre, ikke av hverandre.»',ok:true,f:'Konkrete regler som alle kan følge og etterprøve.'},{t:'«Vi skal være snille.»',ok:false,f:'Godt ment, men for vagt til å vite når regelen brytes.'},{t:'«Den som ikke følger med, får skylda selv.»',ok:false,f:'Det er påføring av skyld – en hersketeknikk.'}]}
        ]},
        { type:'reflect', id:'likeverd-r1', nivaa:3, tittel:'Plass til alle i ditt yrke?', q:'Tenk deg at en kollega i transport- og logistikkbransjen får en varig skade og ikke lenger kan løfte tungt eller kjøre lastebil. Drøft om det finnes plass til henne eller ham i bedriften, og hva arbeidsgiver, kollegaer og hun eller han selv kan gjøre.', punkter:['viser til at alle er like mye verdt (likeverd)','nevner konkrete arbeidsoppgaver som kan passe (f.eks. planlegging, lager, kundeservice)','beskriver hva arbeidsgiver kan tilrettelegge','beskriver hva kollegaer kan bidra med','ser saken fra flere sider (drøfter fordeler og utfordringer)'] }
      ]
    },
    /* ================================================================ IA-02 */
    {
      id: 'ia', lok: 'IA-02', tittel: 'Hva er IA – inkluderende arbeidsliv?',
      figur: { svg: FIG_PARTER, tekst: 'Partssamarbeid: leder, verneombud og tillitsvalgt jobber sammen om arbeidsmiljø, sykefravær og inkludering.' },
      kort: 'IA-avtalen, de tre områdene og hvem som samarbeider om et godt arbeidsliv.',
      bok: BOK + '.6–10.8 (s. 286–288) · NDLA: Trepartssamarbeidet',
      mal: ['forklare hva inkluderende arbeidsliv (IA) handler om','nevne de tre områdene i IA-arbeidet','forklare rollene til leder, verneombud og tillitsvalgt'],
      punkter: [
        '<b>Inkluderende arbeidsliv (IA)</b> handler om at flest mulig skal kunne jobbe, og at folk skal ha det bra på jobb. Arbeid er en av de største verdiene Norge har – mer verdt enn oljen.',
        '<b>IA-avtalen</b> er en avtale mellom arbeidsgiverne, arbeidstakerne og staten (regjeringen). Det kalles <b>trepartssamarbeid</b>. Den gjeldende avtalen varer fra 2025 til 2028.',
        'IA-arbeidet på en arbeidsplass handler om tre ting: et godt <b>arbeidsmiljø</b>, å forebygge og følge opp <b>sykefravær</b>, og <b>partssamarbeid</b> mellom ledelsen og de ansatte.',
        '<b>Leder</b> (arbeidsgiver) har hovedansvaret for arbeidsmiljøet og for å følge opp sykemeldte.',
        '<b>Verneombudet</b> er de ansattes representant i saker om arbeidsmiljø og HMS. Virksomheter med minst 10 ansatte skal ha verneombud.',
        '<b>Den tillitsvalgte</b> velges av medlemmene i fagforeningen og representerer dem i saker om lønn og arbeidsvilkår.',
        'NAV har egne <b>IA-rådgivere</b> som hjelper arbeidsplasser – og ungdomsbedrifter – med IA-arbeidet.'
      ],
      ndla: [N.trepart, N.aml, N.ia, N.iasamarb, N.roller],
      arbeidsbok: 'Arbeidsboka kap. 10, oppgave 10.4–10.5',
      aktiviteter: [
        { type:'voks', id:'ia-voks', tittel:'Du er en del av noe større', tekst:['Når du har en jobb, er du med og bærer fellesskapet: Du betaler skatt, du gjør noe andre trenger, og du er en del av et lag.','Derfor er det så viktig at flest mulig kan være i jobb – og at ingen faller ut fordi arbeidsplassen ikke så dem i tide.'], sporsmal:['Hva betyr det for deg å ha en jobb eller en oppgave du mestrer?','Hva kan få en person til å slutte å komme på jobb?'], handling:'Spør en voksen du kjenner: Hva gjør arbeidsplassen din for at folk skal trives?' },
        { type:'flash', id:'ia-flash', tittel:'Begrepskort: IA og partssamarbeid', kort:[
          ['IA','Inkluderende arbeidsliv. Arbeid for at flest mulig skal kunne jobbe og ha det bra på jobb.'],
          ['IA-avtalen','Avtale mellom partene i arbeidslivet og staten om et mer inkluderende arbeidsliv. Gjeldende avtale: 2025–2028.'],
          ['Trepartssamarbeid','Samarbeidet mellom arbeidsgiverorganisasjonene, arbeidstakerorganisasjonene og staten.'],
          ['Partssamarbeid','Samarbeid mellom ledelsen og de ansattes representanter på arbeidsplassen.'],
          ['Verneombud','De ansattes representant i saker om arbeidsmiljø, helse og sikkerhet.'],
          ['Tillitsvalgt','Valgt av fagforeningsmedlemmene til å representere dem i saker om lønn og arbeidsvilkår.'],
          ['Sykefravær','Når en ansatt er borte fra jobb fordi hun eller han er syk.'],
          ['IA-rådgiver','Rådgiver fra NAV som hjelper virksomheter med IA-arbeidet.']
        ]},
        { type:'quiz', id:'ia-q1', nivaa:1, tittel:'IA – det grunnleggende', sp:[
          {q:'Hva står IA for?',a:['Inkluderende arbeidsliv','Internasjonal arbeidsavtale','Intern avviksrapport','Individuell arbeidskontrakt'],r:0,f:'IA = inkluderende arbeidsliv.'},
          {q:'Hvilke tre områder handler IA-arbeidet om?',a:['Arbeidsmiljø, sykefravær og partssamarbeid','Lønn, ferie og pensjon','Salg, markedsføring og økonomi','Truck, kran og lastebil'],r:0,f:'Arbeidsmiljø, sykefravær og partssamarbeid.'},
          {q:'Hvem er partene i trepartssamarbeidet?',a:['Arbeidsgiverne, arbeidstakerne og staten','Elever, lærere og foreldre','Kunder, leverandører og bank','NAV, politiet og kommunen'],r:0,f:'Organisasjonene på begge sider og staten.'},
          {q:'Hvem representerer de ansatte i saker om arbeidsmiljø?',a:['Verneombudet','Daglig leder','Regnskapsføreren','Kunden'],r:0,f:'Verneombudet passer på arbeidsmiljøet på vegne av de ansatte.'}
        ]},
        { type:'match', id:'ia-m1', nivaa:2, tittel:'Hvem gjør hva?', instr:'Koble oppgaven med riktig rolle.', par:[
          ['Har hovedansvaret for arbeidsmiljøet og følger opp sykemeldte','Leder (arbeidsgiver)'],
          ['Sier fra om farer og passer på HMS på vegne av de ansatte','Verneombud'],
          ['Forhandler om lønn og vilkår for fagforeningsmedlemmene','Tillitsvalgt'],
          ['Hjelper virksomheter med IA-arbeidet og sykefravær','IA-rådgiver i NAV'],
          ['Fører tilsyn med at arbeidsmiljøloven blir fulgt','Arbeidstilsynet']
        ], f:'I en ungdomsbedrift kan dere selv velge hvem som har rollen som verneombud og hvem som er tillitsvalgt.' },
        { type:'tf', id:'ia-tf', nivaa:2, tittel:'Sant eller usant: IA', ps:[
          ['IA-avtalen er en avtale som bare regjeringen har bestemt.',false,'Den er inngått mellom partene i arbeidslivet og staten – et trepartssamarbeid.'],
          ['Et godt arbeidsmiljø kan bidra til lavere sykefravær.',true,'En trygg arbeidsplass med godt samarbeid gir færre skader og mindre fravær.'],
          ['Det er bare leder som har ansvar for arbeidsmiljøet. De ansatte har ingen plikter.',false,'Arbeidsgiver har hovedansvaret, men arbeidstakerne har medvirkningsplikt.'],
          ['Verneombudet kan stanse farlig arbeid hvis det er umiddelbar fare for liv eller helse.',true,'Verneombudet har rett til å stanse arbeidet til arbeidsgiver har vurdert saken.'],
          ['IA handler også om å få flere med i arbeidslivet, ikke bare om å holde på dem som allerede jobber.',true,'Inkludering gjelder både å komme inn og å bli værende.']
        ]},
        { type:'case', id:'ia-case', nivaa:3, tittel:'Case: Rollene i UB-en', intro:'Ungdomsbedriften «Pakkeposten UB» har seks ansatte. Daglig leder Noah bestemmer alt selv. Ingen har rollen som verneombud. To ansatte har klaget på at de alltid får de kjedeligste og tyngste oppgavene.', steg:[
          {q:'Hva mangler mest i bedriften?',valg:[{t:'Partssamarbeid – de ansatte har ingen representant som kan ta opp saker',ok:true,f:'Uten verneombud eller tillitsvalgt er det vanskelig for de ansatte å bli hørt.'},{t:'Mer reklame',ok:false,f:'Salg er viktig, men problemet her handler om samarbeidet internt.'},{t:'En strengere leder',ok:false,f:'Noah bestemmer allerede alt. Det er en del av problemet.'}]},
          {q:'Hvilket tiltak vil hjelpe mest?',valg:[{t:'Velge et verneombud og ha IA som fast punkt på personalmøtene',ok:true,f:'Da får de ansatte en stemme, og IA blir tatt opp jevnlig.'},{t:'At de som klager, slutter',ok:false,f:'Det er det motsatte av inkludering.'},{t:'At Noah fordeler oppgavene i hemmelighet',ok:false,f:'Åpenhet om fordelingen gir mer tillit.'}]},
          {q:'Hvordan kan dere fordele oppgavene mer rettferdig?',valg:[{t:'Lage en oversikt over oppgavene og rullere de tunge og kjedelige',ok:true,f:'Rullering og åpenhet gjør fordelingen rettferdig og synlig.'},{t:'La den som roper høyest, velge først',ok:false,f:'Det gir ikke en rettferdig fordeling.'},{t:'Gi alle de samme oppgavene hele året',ok:false,f:'Det tar ikke hensyn til styrker og ønsker.'}]}
        ]},
        { type:'reflect', id:'ia-r1', nivaa:3, tittel:'Hvorfor samarbeide?', q:'Drøft hvorfor det er lurt at ledelsen og de ansatte samarbeider om arbeidsmiljø og sykefravær, i stedet for at lederen bestemmer alt alene. Bruk eksempler fra ungdomsbedriften deres eller fra en arbeidsplass du kjenner.', punkter:['forklarer hva partssamarbeid er','nevner rollene verneombud og/eller tillitsvalgt','gir minst ett konkret eksempel','tar med både fordeler og mulige utfordringer','kobler samarbeidet til lavere sykefravær eller bedre trivsel'] }
      ]
    },
    /* ================================================================ IA-03 */
    {
      id: 'plikter', lok: 'IA-03', tittel: 'Rettigheter og plikter',
      kort: 'Tilretteleggingsplikt, medvirkningsplikt, styringsrett og omsorgsplikt – og retten til å varsle.',
      bok: BOK + '.2–10.5 (s. 276–286)',
      mal: ['beskrive plikter og rettigheter for arbeidsgiver og arbeidstaker','forklare hva tilretteleggingsplikt og medvirkningsplikt betyr','forklare når og hvordan en arbeidstaker kan varsle'],
      punkter: [
        'En <b>arbeidsavtale</b> gir plikter og rettigheter for begge parter. Du har krav på en skriftlig arbeidsavtale.',
        'Arbeidsgiver har <b>styringsrett</b>: retten til å lede, fordele og kontrollere arbeidet – innenfor lover og avtaler.',
        'Arbeidsgiver har <b>omsorgsplikt</b>: plikt til å ta vare på de ansatte, sørge for et trygt arbeidsmiljø og betale lønn (lønnsplikt).',
        'Arbeidsgiver har <b>tilretteleggingsplikt</b>: Hvis en ansatt får redusert arbeidsevne, skal arbeidsgiver tilrettelegge <b>så langt det er mulig</b> slik at hun eller han kan fortsette i jobben.',
        'Arbeidstaker har <b>arbeidsplikt</b>, <b>lojalitetsplikt</b> og <b>medvirkningsplikt</b>: Du skal gjøre jobben, opptre lojalt og bidra til et godt og trygt arbeidsmiljø – også når du er sykemeldt (for eksempel delta i dialogmøter).',
        'Du har <b>rett til å varsle</b> om kritikkverdige forhold, som fare for liv og helse, trakassering eller lovbrudd. Den som varsler på en forsvarlig måte, skal ikke straffes for det.'
      ],
      ndla: [N.rettplikt, N.aml, N.varsling, N.lov],
      arbeidsbok: 'Arbeidsboka kap. 10, oppgave 10.6–10.10',
      aktiviteter: [
        { type:'voks', id:'plikter-voks', tittel:'Rettigheter og plikter henger sammen', tekst:['Det er lett å huske det du har krav på: lønn, ferie og pauser. Det er like viktig å huske hva andre har krav på fra deg.','En god kollega er den som både står på for rettighetene sine og tar pliktene sine på alvor.'], sporsmal:['Hvilken plikt synes du er lettest å glemme i en travel arbeidsdag?','Hvorfor tror du arbeidsmiljøloven gir arbeidstakerne plikter, ikke bare rettigheter?'], handling:'Skriv ned én plikt du har i ungdomsbedriften, og sjekk at du har fulgt den denne uka.' },
        { type:'flash', id:'plikter-flash', tittel:'Begrepskort: rettigheter og plikter', kort:[
          ['Styringsrett','Arbeidsgivers rett til å lede, fordele og kontrollere arbeidet innenfor lover og avtaler.'],
          ['Omsorgsplikt','Arbeidsgivers plikt til å ta vare på de ansatte og sørge for et trygt arbeidsmiljø.'],
          ['Tilretteleggingsplikt','Arbeidsgivers plikt til å tilpasse arbeidet så langt det er mulig når en ansatt får redusert arbeidsevne.'],
          ['Medvirkningsplikt','Arbeidstakers plikt til å bidra til et godt og trygt arbeidsmiljø og til å delta i oppfølgingen ved sykefravær.'],
          ['Arbeidsplikt','Arbeidstakers plikt til å møte opp og gjøre arbeidet som er avtalt.'],
          ['Lojalitetsplikt','Arbeidstakers plikt til å ivareta arbeidsgivers interesser på en rimelig måte.'],
          ['Varsling','Å si fra om kritikkverdige forhold til noen som kan gjøre noe med det.'],
          ['Arbeidsavtale','Skriftlig avtale mellom arbeidsgiver og arbeidstaker om lønn, arbeidstid og oppgaver.']
        ]},
        { type:'sort', id:'plikter-s1', nivaa:1, tittel:'Hvem har plikten?', instr:'Sorter: Er dette arbeidsgivers eller arbeidstakers plikt?', kat:['Arbeidsgiver','Arbeidstaker'], items:[
          ['Betale lønn',0,'Lønnsplikt.'],
          ['Bruke påbudt verneutstyr',1,'En del av medvirkningsplikten.'],
          ['Tilrettelegge arbeidet for en ansatt med redusert arbeidsevne',0,'Tilretteleggingsplikt.'],
          ['Møte opp til avtalt tid',1,'Arbeidsplikt.'],
          ['Sørge for opplæring i HMS',0,'Arbeidsgiver skal gi opplæring.'],
          ['Delta i dialogmøte når du er sykemeldt',1,'Medvirkningsplikt ved sykefravær.'],
          ['Gi en skriftlig arbeidsavtale',0,'Arbeidsgiver skal lage avtalen.'],
          ['Si fra om trakassering du ser',1,'Arbeidstaker skal melde fra til arbeidsgiver eller verneombud.']
        ], f:'Begge parter har plikter. Et godt arbeidsmiljø krever at begge tar sin del.' },
        { type:'quiz', id:'plikter-q1', nivaa:2, tittel:'Hvor langt må arbeidsgiver strekke seg?', sp:[
          {q:'Hvor langt må arbeidsgiver gå for å tilrettelegge for en ansatt med redusert arbeidsevne?',a:['Så langt det er mulig','Bare hvis det er gratis','Ingenting – den ansatte må klare seg selv','Bare i én uke'],r:0,f:'Kravet er strengt, men det finnes en grense for hva som er mulig.'},
          {q:'Hva er et eksempel på tilrettelegging?',a:['Lettere oppgaver i en periode eller tilpasset arbeidstid','Å si opp den ansatte','Å gi den ansatte mindre lønn som straff','Å flytte den ansatte uten å spørre'],r:0,f:'Tilrettelegging kan være oppgaver, arbeidstid, utstyr eller arbeidssted.'},
          {q:'Hva betyr styringsrett?',a:['Arbeidsgiver kan lede og fordele arbeidet innenfor lover og avtaler','Arbeidsgiver kan bestemme alt, også i fritiden','De ansatte styrer bedriften','Arbeidstakeren bestemmer egne oppgaver'],r:0,f:'Styringsretten har grenser i lov, avtaler og arbeidsavtalen.'},
          {q:'Hva er et kritikkverdig forhold som du har rett til å varsle om?',a:['Fare for liv og helse','At kaffen er dårlig','At du er uenig i fargen på logoen','At en kollega har ferie'],r:0,f:'Kritikkverdige forhold er brudd på lover, regler eller etiske normer.'}
        ]},
        { type:'fill', id:'plikter-fill', nivaa:2, tittel:'Fyll inn: plikter og rettigheter', tekst:'Arbeidsgiver har [[styringsrett]] og kan lede og fordele arbeidet. Samtidig har arbeidsgiver [[omsorgsplikt]] for de ansatte. Får en ansatt redusert arbeidsevne, skal arbeidsgiver tilrettelegge så langt det er [[mulig]]. Arbeidstakeren har [[medvirkningsplikt]] og skal bidra til et godt arbeidsmiljø. Oppdager du kritikkverdige forhold, har du rett til å [[varsle]].' },
        { type:'case', id:'plikter-case', nivaa:3, tittel:'Case: Ryggen til Jonas', intro:'Jonas jobber på et lager og har vondt i ryggen etter en skade på fritiden. Legen sier at han kan jobbe, men ikke løfte tungt de neste to månedene. Lageret har både tunge plukkoppgaver og lettere oppgaver i varemottaket og på kontoret.', steg:[
          {q:'Hva skal arbeidsgiver gjøre?',valg:[{t:'Snakke med Jonas og se på hvilke oppgaver han kan gjøre i perioden',ok:true,f:'Tilretteleggingsplikten gjelder også når skaden skjedde på fritiden.'},{t:'Si at han må holde seg hjemme til han er helt frisk',ok:false,f:'Arbeidsgiver skal prøve å tilrettelegge så langt det er mulig.'},{t:'Gi ham de samme oppgavene som før',ok:false,f:'Det kan gjøre skaden verre og bryter med omsorgsplikten.'}]},
          {q:'Hva er Jonas sin plikt?',valg:[{t:'Fortelle hva han kan og ikke kan gjøre, og være med og finne løsninger',ok:true,f:'Medvirkningsplikten gjelder også arbeidstakeren.'},{t:'Ingenting – det er arbeidsgivers ansvar',ok:false,f:'Begge parter har plikter.'},{t:'Holde skaden hemmelig',ok:false,f:'Da kan ikke arbeidsgiver tilrettelegge.'}]},
          {q:'En kollega klager på at «Jonas slipper unna». Hva er et godt svar fra lederen?',valg:[{t:'«Vi tilrettelegger for alle som trenger det. Neste gang kan det være deg.»',ok:true,f:'Tilrettelegging er en rettighet alle har – det er en del av et inkluderende arbeidsmiljø.'},{t:'«Du har rett, han får gå tilbake til tunge løft.»',ok:false,f:'Det bryter med tilretteleggingsplikten.'},{t:'«Det har ikke du noe med.»',ok:false,f:'Det er lurt å forklare prinsippet, uten å dele helseopplysninger om Jonas.'}]}
        ]},
        { type:'reflect', id:'plikter-r1', nivaa:3, tittel:'Varsling i ungdomsbedriften', q:'I ungdomsbedriften deres oppdager du at en av de ansatte tar varer fra lageret uten å betale. Drøft hva du gjør, hvem du sier fra til, og hvorfor det er viktig at en bedrift har en varslingsrutine.', punkter:['forklarer at dette er et kritikkverdig forhold','beskriver hvem du kan si fra til (f.eks. daglig leder, lærer, styreleder)','tar hensyn til både bedriften og personen det gjelder','forklarer hvorfor en skriftlig varslingsrutine er nyttig','nevner at den som varsler, ikke skal straffes'] }
      ]
    },
    /* ================================================================ IA-04 */
    {
      id: 'arbeidsmiljo', lok: 'IA-04', tittel: 'Arbeidsmiljø og psykologisk trygghet',
      kort: 'Fysisk, organisatorisk og psykososialt arbeidsmiljø – og hva som gjør at folk tør å være seg selv.',
      bok: BOK + '.1 og 10.8 (s. 274 og 288) · Bransjelære kap. 4 om HMS',
      mal: ['forklare forskjellen på fysisk, organisatorisk og psykososialt arbeidsmiljø','forklare hva psykologisk trygghet er','foreslå tiltak som gir tilhørighet, anerkjennelse og mestring'],
      punkter: [
        'Arbeidsmiljøet har tre sider: <b>fysisk</b> (lys, støy, løft, verneutstyr), <b>organisatorisk</b> (hvordan arbeidet er fordelt og planlagt) og <b>psykososialt</b> (hvordan vi har det med hverandre).',
        'Arbeidsmiljøloven sier at alle skal ha en <b>helsefremmende og meningsfull</b> arbeidssituasjon. Arbeidet skal ivareta integritet og verdighet, gi kontakt med andre, og ingen skal utsettes for trakassering.',
        'Alle mennesker trenger <b>tilhørighet</b> (å høre til), <b>anerkjennelse</b> (å bli sett og verdsatt) og <b>autonomi</b> (å bestemme litt selv) for å trives på jobb.',
        '<b>Psykologisk trygghet</b> betyr at du kan si det du tenker, spørre om hjelp og innrømme feil uten å være redd for negative reaksjoner.',
        'Det er forskjell på å være <b>venner</b> og å være <b>kollegaer</b>. I en ungdomsbedrift må dere kunne gi hverandre beskjeder og tilbakemeldinger – også når dere er venner.',
        'Et godt team lager <b>spilleregler</b>: Hvordan vil vi ha det? Hvordan snakker vi sammen? Hva gjør vi ved konflikt, lav motivasjon eller når noen ikke gjør oppgavene sine?'
      ],
      ndla: [N.jobben, N.bidra],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'arbeidsmiljo-voks', tittel:'Lov å ta feil', tekst:['På en trygg arbeidsplass er det ingen skam å si «jeg vet ikke» eller «jeg gjorde en feil». Det er nettopp der folk lærer mest.','Det motsatte er en arbeidsplass der alle later som de har kontroll – og der feil blir skjult til de blir store.'], sporsmal:['Hva skal til for at du tør å spørre om hjelp i en gruppe?','Hvordan reagerer du når en annen gjør en feil?'], handling:'Neste gang noen i gruppa gjør en feil, si noe som gjør det lettere for dem å lære av den.' },
        { type:'flash', id:'arbeidsmiljo-flash', tittel:'Begrepskort: arbeidsmiljø', kort:[
          ['Fysisk arbeidsmiljø','Det du kan se og måle: lys, støy, temperatur, løft, maskiner og verneutstyr.'],
          ['Organisatorisk arbeidsmiljø','Hvordan arbeidet er planlagt og fordelt: arbeidstid, ansvar, roller og tempo.'],
          ['Psykososialt arbeidsmiljø','Hvordan vi har det med hverandre: samarbeid, trivsel, konflikter og respekt.'],
          ['Psykologisk trygghet','At du kan si hva du mener, spørre om hjelp og innrømme feil uten å være redd.'],
          ['Tilhørighet','Følelsen av å høre til og være en del av fellesskapet.'],
          ['Anerkjennelse','Å bli sett og verdsatt for den du er og det du gjør.'],
          ['Autonomi','Å ha litt kontroll over egen arbeidsdag og egne valg.'],
          ['Teamkontrakt','Skriftlige spilleregler for hvordan teamet skal samarbeide.']
        ]},
        { type:'sort', id:'arbeidsmiljo-s1', nivaa:1, tittel:'Hvilken side av arbeidsmiljøet?', instr:'Sorter eksemplene i riktig del av arbeidsmiljøet.', kat:['Fysisk','Organisatorisk','Psykososialt'], items:[
          ['Det er for mørkt ved pakkebordet',0,'Lys er en del av det fysiske arbeidsmiljøet.'],
          ['Ingen vet hvem som har ansvaret for kassa',1,'Uklare roller er organisatorisk.'],
          ['Noen blir ledd av på møtene',2,'Hvordan vi behandler hverandre er psykososialt.'],
          ['Esker blir stablet så høyt at de kan falle',0,'Fysisk fare.'],
          ['Alle salgsoppdrag kommer dagen før fristen',1,'Planlegging og tempo er organisatorisk.'],
          ['Det er god stemning og folk hjelper hverandre',2,'Trivsel og samarbeid er psykososialt.']
        ], f:'De tre sidene påvirker hverandre. Dårlig planlegging kan for eksempel gi stress og konflikter.' },
        { type:'tf', id:'arbeidsmiljo-tf', nivaa:2, tittel:'Sant eller usant: psykologisk trygghet', ps:[
          ['Psykologisk trygghet betyr at alle alltid er enige.',false,'Tvert imot: På en trygg arbeidsplass tør folk å være uenige.'],
          ['Å akseptere at folk gjør feil, er en del av psykologisk trygghet.',true,'Feil som blir sagt høyt, kan rettes og læres av.'],
          ['Det er lurt å la være å spørre om hjelp, så du ikke virker dum.',false,'Å tørre å spørre er et tegn på trygghet – og gir bedre arbeid.'],
          ['Venner som jobber sammen, må kunne gi hverandre tilbakemeldinger på jobben.',true,'Rollen som kollega krever at dere kan si fra, også til venner.'],
          ['Anerkjennelse handler bare om lønn.',false,'Ros, oppmerksomhet og å bli tatt med på råd er også anerkjennelse.']
        ]},
        { type:'order', id:'arbeidsmiljo-o1', nivaa:2, tittel:'Lag spilleregler for teamet', instr:'Sett stegene for å lage en teamkontrakt i en fornuftig rekkefølge.', steg:[
          'Alle skriver ned hva som gir og hva som tapper energi i gruppearbeid','Dere deler og samler forslagene','Dere blir enige om hvordan dere vil ha det og hvordan dere snakker sammen','Dere avtaler hva dere gjør ved konflikt og når noen ikke gjør oppgavene sine','Alle skriver under på teamkontrakten','Dere evaluerer kontrakten på et personalmøte etter noen uker'
        ], f:'Spilleregler fungerer best når alle har vært med og laget dem – og når de blir fulgt opp.' },
        { type:'case', id:'arbeidsmiljo-case', nivaa:3, tittel:'Case: Venner og kollegaer', intro:'Emil og Sander er bestevenner og driver ungdomsbedriften sammen med tre andre. Sander leverer ofte for sent, og de andre må ta over oppgavene hans. Emil er markedssjef og vet at han burde si noe, men er redd for å ødelegge vennskapet.', steg:[
          {q:'Hva er kjernen i problemet?',valg:[{t:'Rollene som venn og kollega blandes, og ingen sier fra',ok:true,f:'Når ingen sier fra, blir problemet større for hele teamet.'},{t:'Sander er lat',ok:false,f:'Det vet vi ikke. Det kan være mange grunner til at han leverer sent.'},{t:'De andre jobber for mye',ok:false,f:'Det er en følge av problemet, ikke kjernen.'}]},
          {q:'Hvordan bør Emil ta det opp?',valg:[{t:'Snakke med Sander alene, beskrive hva som skjer og spørre hvordan han har det',ok:true,f:'Beskriv det du ser, ikke personen. Spør før du konkluderer.'},{t:'Ta det opp i felles chat så alle ser det',ok:false,f:'Det kan oppleves som å bli hengt ut.'},{t:'Ikke si noe og gjøre oppgavene selv',ok:false,f:'Da blir det urettferdig for Emil og de andre.'}]},
          {q:'Hva kan teamet gjøre for at det blir lettere neste gang?',valg:[{t:'Skrive inn i teamkontrakten hva dere gjør når noen ikke gjør oppgavene sine',ok:true,f:'Når regelen er avtalt på forhånd, blir det mindre personlig å ta den opp.'},{t:'Bare jobbe med folk som ikke er venner',ok:false,f:'Vennskap kan være en styrke – dere trenger bare tydelige spilleregler.'},{t:'Gi Sander færre oppgaver uten å si noe',ok:false,f:'Det løser ikke problemet og kan skape mer misnøye.'}]}
        ]},
        { type:'reflect', id:'arbeidsmiljo-r1', nivaa:3, tittel:'Hva gir og hva tapper energi?', q:'Tenk på gruppearbeid du har vært med på. Beskriv hva som ga deg energi og hva som tappet deg for energi. Foreslå tre konkrete spilleregler for ungdomsbedriften deres, og forklar hvordan hver regel gir tilhørighet, anerkjennelse eller autonomi.', punkter:['beskriver minst én ting som gir og én som tapper energi','foreslår tre konkrete spilleregler','kobler reglene til tilhørighet, anerkjennelse eller autonomi','tar med hvordan dere håndterer konflikt eller lav motivasjon','skriver tydelig og konkret, ikke bare «vi skal være snille»'] }
      ]
    },
    /* ================================================================ IA-05 */
    {
      id: 'sykefravaer', lok: 'IA-05', tittel: 'Sykefravær og oppfølging',
      figur: { svg: FIG_FRAVAER, tekst: 'En enkel sykefraværsrutine gjør at alle vet hva de skal gjøre – og at alle blir behandlet likt.' },
      kort: 'Hvorfor en fast rutine er lurt, hvem som tar kontakt, og hvordan dere tar imot den som kommer tilbake.',
      bok: BOK + '.4 og 10.8 (s. 283–284 og 288)',
      mal: ['forklare hvorfor en bedrift trenger en sykefraværsrutine','beskrive hvem som tar kontakt og når','lage en sykefraværsrutine for ungdomsbedriften vår'],
      punkter: [
        'Arbeidsgiver skal arbeide systematisk med å <b>forebygge og følge opp sykefravær</b>. Det er en del av HMS-arbeidet.',
        'En fast <b>rutine</b> svarer på: <b>Når</b> tar vi kontakt? <b>Hvem</b> tar kontakt? <b>Hvordan</b> tar vi kontakt? Rutiner gir forutsigbarhet og gjør at alle blir behandlet likt.',
        'Et eksempel: <b>Dag 1</b> melder den ansatte fra til lederen sin. <b>Dag 3</b> tar lederen kontakt og spør hvordan det går, forteller hva som skjer i bedriften og spør om noe kan gjøre det lettere å komme tilbake.',
        'Lederen spør <b>ikke</b> om diagnosen. Helseopplysninger er private. Spørsmålet er hva den ansatte <b>kan</b> gjøre – for eksempel deler av dagen eller hjemmefra.',
        'Ved lengre sykmelding i arbeidslivet skal arbeidsgiver lage en <b>oppfølgingsplan</b> sammen med den ansatte innen fire uker, og innkalle til <b>dialogmøte</b> innen sju uker.',
        '<b>Ta godt imot</b> den som kommer tilbake. En god start etter fravær gjør det lettere å bli værende.'
      ],
      ndla: [N.rettplikt, N.ia, N.lov],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'sykefravaer-voks', tittel:'Savnet er et godt ord', tekst:['Når du har vært borte en stund, kan det være vanskelig å komme tilbake. Har de klart seg uten meg? Vil noen spørre hvor jeg har vært?','En kort melding – «Vi savner deg, håper du har det bra» – kan gjøre det mye lettere å møte opp igjen.'], sporsmal:['Hvordan vil du bli møtt når du kommer tilbake etter å ha vært syk?','Hva er forskjellen på å bry seg og å grave?'], handling:'Tenk på én i klassen eller UB-en som har vært borte. Si «Godt å se deg!» neste gang du ser vedkommende.' },
        { type:'flash', id:'sykefravaer-flash', tittel:'Begrepskort: sykefravær', kort:[
          ['Sykefraværsrutine','Skriftlig avtale om hva som skjer når noen er syke: hvem som tar kontakt, når og hvordan.'],
          ['Egenmelding','Når den ansatte selv melder at hun eller han er syk, uten legeerklæring. Arbeidsplassen har regler for hvor lenge.'],
          ['Sykmelding','Når en lege bekrefter at en person ikke kan jobbe, helt eller delvis.'],
          ['Gradert sykmelding','Du er delvis sykmeldt og jobber noe av tiden.'],
          ['Oppfølgingsplan','Plan som leder og den sykmeldte lager sammen om hvordan den ansatte kan komme tilbake.'],
          ['Dialogmøte','Møte mellom den sykmeldte, leder og eventuelt lege eller NAV om veien tilbake til jobb.'],
          ['Nærvær','Det motsatte av fravær: at folk er på jobb og trives der.']
        ]},
        { type:'order', id:'sykefravaer-o1', nivaa:1, tittel:'Følg rutinen', instr:'Sett stegene i sykefraværsrutinen i riktig rekkefølge.', steg:[
          'Den ansatte melder fra til lederen sin første dag','Lederen registrerer fraværet','Lederen tar kontakt på dag 3 og spør hvordan det går','Dere avtaler hvordan og hvor ofte dere skal ha kontakt videre','Lederen spør om noe kan gjøre det lettere å komme tilbake','Den ansatte kommer tilbake og blir tatt godt imot'
        ], f:'Dagene kan dere bestemme selv – det viktigste er at alle kjenner rutinen.' },
        { type:'quiz', id:'sykefravaer-q1', nivaa:1, tittel:'Hvorfor rutine?', sp:[
          {q:'Hvorfor er det lurt å ha en fast sykefraværsrutine?',a:['Alle vet hva de skal gjøre, og alle blir behandlet likt','Så lederen kan straffe dem som er syke','Så ingen trenger å si fra','Den er bare for store bedrifter'],r:0,f:'Rutiner gir forutsigbarhet og likebehandling.'},
          {q:'Hvem skal den ansatte melde fra til første dagen?',a:['Lederen sin','Kunden','Alle i klassen','Ingen'],r:0,f:'Den nærmeste lederen skal vite det først.'},
          {q:'Hva bør lederen IKKE spørre om?',a:['Hvilken sykdom den ansatte har','Hvordan det går','Om noe kan gjøre det lettere å komme tilbake','Om den ansatte kan jobbe deler av dagen'],r:0,f:'Diagnosen er privat. Det viktige er hva den ansatte kan gjøre.'},
          {q:'Hva gjør dere når den ansatte kommer tilbake?',a:['Tar godt imot og forteller hva som har skjedd','Later som ingenting','Spør hvorfor hun eller han var så lenge borte','Gir de kjedeligste oppgavene'],r:0,f:'En god mottakelse gjør det lettere å bli værende.'}
        ]},
        { type:'check', id:'sykefravaer-chk', nivaa:2, tittel:'Kontroller rutinen', instr:'En ungdomsbedrift har skrevet sykefraværsrutinen sin. Kryss av punktene som bør endres.', dok:'Sykefraværsrutine – UB', meta:'Utkast · Til godkjenning på personalmøtet', kolonner:['Punkt','Det som står'], kryss:'Bør endres', rader:[
          { c:['Melding','Den som er syk, sender melding til daglig leder før kl. 08.00 første dag.'], avvik:false, f:'Tydelig: hvem, hvordan og når.' },
          { c:['Kontakt','Daglig leder ringer på dag 3 og spør hvilken sykdom personen har.'], avvik:true, f:'Lederen skal ikke spørre om diagnosen. Spør heller hvordan det går og hva som kan hjelpe.' },
          { c:['Ansvar','«Noen» tar kontakt hvis det blir lenge.'], avvik:true, f:'Det må stå hvem. «Noen» betyr ofte ingen.' },
          { c:['Registrering','Personalansvarlig fører fraværet i et eget skjema som bare hun og daglig leder ser.'], avvik:false, f:'Fravær skal registreres, og opplysningene skal ikke deles med flere enn nødvendig.' },
          { c:['Videre kontakt','Vi avtaler fast kontakt én gang i uka hvis fraværet varer lenger.'], avvik:false, f:'Fast, avtalt oppfølging er bra.' },
          { c:['Informasjon','Daglig leder forteller alle i felles chat hva den syke feiler.'], avvik:true, f:'Helseopplysninger er private og skal ikke deles uten samtykke.' },
          { c:['Tilbake','Den som kommer tilbake, får en kort oppdatering om hva som har skjedd.'], avvik:false, f:'God mottakelse.' }
        ]},
        { type:'case', id:'sykefravaer-case', nivaa:3, tittel:'Case: Ida har vært borte', intro:'Ida har ikke vært på skolen eller i ungdomsbedriften på en uke. Hun sendte melding første dag, men ingen har tatt kontakt siden. Bedriften har en messe neste uke, og Ida hadde ansvaret for standen.', steg:[
          {q:'Hva har gått galt?',valg:[{t:'Ingen fulgte opp etter første melding',ok:true,f:'Rutinen sier at lederen skal ta kontakt på dag 3.'},{t:'Ida burde ha sendt flere meldinger',ok:false,f:'Hun gjorde det hun skulle. Nå er det lederens tur.'},{t:'Ingenting – hun er jo syk',ok:false,f:'Kontakt viser at hun er savnet og gjør det lettere å komme tilbake.'}]},
          {q:'Hva sier daglig leder når hun ringer?',valg:[{t:'«Hvordan går det med deg? Vi savner deg. Er det noe vi kan gjøre for at det skal bli lettere å komme tilbake?»',ok:true,f:'Omsorg, informasjon og fokus på muligheter.'},{t:'«Hva feiler det deg egentlig?»',ok:false,f:'Diagnosen er privat.'},{t:'«Du må komme, ellers går messa dårlig.»',ok:false,f:'Press kan gjøre det vanskeligere å komme tilbake.'}]},
          {q:'Hva gjør dere med ansvaret for messestanden?',valg:[{t:'Spør Ida om hun kan bidra med noe hun klarer, og fordeler resten midlertidig',ok:true,f:'Tilrettelegging: Ida kan kanskje lage plakaten hjemmefra, mens andre står på standen.'},{t:'Tar fra henne ansvaret for godt uten å spørre',ok:false,f:'Da kan hun føle seg skjøvet ut.'},{t:'Venter og håper hun blir frisk',ok:false,f:'Dere må planlegge for at messa blir gjennomført.'}]}
        ]},
        { type:'reflect', id:'sykefravaer-r1', nivaa:3, tittel:'Skriv sykefraværsrutinen', q:'Skriv sykefraværsrutinen for ungdomsbedriften deres. Svar på: Når tar vi kontakt? Hvem tar kontakt? Hvordan tar vi kontakt? Hvem registrerer fraværet, og hvordan tar vi imot den som kommer tilbake?', punkter:['sier hvem den syke melder fra til, og når','sier hvem i UB-en som tar kontakt, og på hvilken dag','beskriver hvordan kontakten skjer og hva som blir spurt om','tar hensyn til at helseopplysninger er private','beskriver registrering av fravær','beskriver hvordan dere tar imot den som kommer tilbake'] }
      ]
    },
    /* ================================================================ IA-06 */
    {
      id: 'handlingsplan', lok: 'IA-06', tittel: 'IA-handlingsplan for ungdomsbedriften',
      kort: 'Sett mål og tiltak for IA, fordel roller og gjør klar for tilbakemelding og sertifisering.',
      bok: BOK + ' (hele kapitlet) · NAVs IA-opplegg for ungdomsbedrifter',
      mal: ['lage mål og konkrete tiltak for IA i ungdomsbedriften','sette sammen en IA-handlingsplan med roller, sykefraværsrutine og trivselstiltak','evaluere hvordan IA-arbeidet har fungert'],
      punkter: [
        'En <b>IA-handlingsplan</b> viser hvordan ungdomsbedriften jobber med inkludering, arbeidsmiljø og sykefravær. Den er kort og konkret – maks fem sider.',
        'Planen inneholder: skole og lærer · navnet på UB-en og de ansatte · <b>mål og tiltak</b> · <b>roller</b> (hvem gjør hva) · <b>sykefraværsrutine</b> (hvem har ansvaret) · <b>trivselstiltak</b>.',
        'Et <b>mål</b> sier hva dere vil oppnå («Alle skal føle seg inkludert»). Et <b>tiltak</b> sier hva dere gjør for å nå målet («Vi rullerer oppgavene og har IA som fast punkt på personalmøtet»).',
        'Gode tiltak kan være å tilpasse oppgaver, spille på hverandres styrker, teambuilding, faste personalmøter og en <b>teamkontrakt</b>.',
        'Ved <b>sertifisering</b> blir dere spurt om hvordan det faktisk har gått: Har sykefraværsrutinen vært nyttig? Hvilke trivselstiltak har fungert? Er oppgavene fordelt rettferdig? Kan noe i produksjonen skade noen?',
        'Planen er et levende dokument. Evaluer den underveis og skriv ned hva dere endrer – det er dokumentasjon dere kan bruke i UB-konkurranser.'
      ],
      ndla: [N.bidra, N.likeverd, N.ia],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'handlingsplan-voks', tittel:'Fra ord til handling', tekst:['Det er lett å skrive «vi skal ha et godt arbeidsmiljø». Det er vanskeligere å vise det.','En god handlingsplan er ikke en fin tekst – det er noen få ting dere faktisk gjør hver uke.'], sporsmal:['Hvilket av tiltakene deres tror du er lettest å glemme?','Hvordan kan dere vite om et tiltak virker?'], handling:'Velg ett tiltak fra planen og gjennomfør det før neste personalmøte.' },
        { type:'flash', id:'handlingsplan-flash', tittel:'Begrepskort: handlingsplan', kort:[
          ['IA-handlingsplan','Plan for hvordan bedriften jobber med inkludering, arbeidsmiljø og sykefravær.'],
          ['Mål','Det dere vil oppnå. Bør være tydelig og mulig å vurdere.'],
          ['Tiltak','Det dere konkret gjør for å nå målet.'],
          ['Trivselstiltak','Noe dere gjør for at alle skal ha det bra, for eksempel felles lunsj eller ros på møtene.'],
          ['Personalmøte','Fast møte for alle ansatte der dere går gjennom drift, oppgaver og arbeidsmiljø.'],
          ['Sertifisering','Når en ekstern part (her NAV) går gjennom IA-arbeidet og bekrefter at det holder mål.'],
          ['Evaluering','Å vurdere hva som har fungert og hva som bør endres.']
        ]},
        { type:'sort', id:'handlingsplan-s1', nivaa:1, tittel:'Mål eller tiltak?', instr:'Sorter: Er dette et mål eller et tiltak?', kat:['Mål','Tiltak'], items:[
          ['Alle skal føle seg inkludert i bedriften',0,'Det dere vil oppnå.'],
          ['Vi har IA som fast punkt på hvert personalmøte',1,'Noe dere konkret gjør.'],
          ['Ingen skal skade seg i produksjonen',0,'Et mål for det fysiske arbeidsmiljøet.'],
          ['Vi rullerer de tunge oppgavene hver uke',1,'Konkret handling.'],
          ['Vi skal ha lavt fravær og høy trivsel',0,'Et mål.'],
          ['Vi spiser lunsj sammen hver fredag',1,'Et trivselstiltak.']
        ], f:'Hvert mål bør ha minst ett tiltak – ellers blir det bare et ønske.' },
        { type:'match', id:'handlingsplan-m1', nivaa:2, tittel:'Koble mål og tiltak', instr:'Finn tiltaket som passer best til hvert mål.', par:[
          ['Alle skal få bruke styrkene sine','Vi kartlegger hva hver enkelt er god til, og fordeler roller etter det'],
          ['Ingen skal bli holdt utenfor','All informasjon deles i én felles kanal'],
          ['Den som er syk, skal føle seg savnet','Daglig leder tar kontakt på dag 3'],
          ['Vi skal løse konflikter tidlig','Teamkontrakten sier at vi tar opp uenighet direkte og saklig'],
          ['Arbeidet skal være trygt','Vi går gjennom farer i produksjonen før vi starter']
        ], f:'Et godt tiltak er konkret nok til at alle ser om det blir gjort.' },
        { type:'check', id:'handlingsplan-chk', nivaa:2, tittel:'Er handlingsplanen komplett?', instr:'Les utkastet til IA-handlingsplan. Kryss av punktene som mangler eller må forbedres.', dok:'IA-handlingsplan – utkast', meta:'Ungdomsbedrift · Til lærer før innsending', kolonner:['Del','Det som står'], kryss:'Må forbedres', rader:[
          { c:['Forside','Skolens navn, lærer, navnet på UB-en og alle ansatte.'], avvik:false, f:'Alt som skal stå på forsiden, er med.' },
          { c:['Mål','«Vi skal ha det bra.»'], avvik:true, f:'For vagt. Hva betyr «bra»? Gjør målet mer konkret.' },
          { c:['Tiltak','Faste personalmøter hver mandag med IA som eget punkt. Teamkontrakt signert av alle.'], avvik:false, f:'Konkrete tiltak.' },
          { c:['Roller','Daglig leder, økonomiansvarlig og markedssjef er nevnt. Ingen har ansvar for HMS/verneombud.'], avvik:true, f:'Noen bør ha ansvar for arbeidsmiljø og HMS.' },
          { c:['Sykefravær','Mangler.'], avvik:true, f:'Sykefraværsrutinen er en fast del av planen. Hvem har ansvaret?' },
          { c:['Trivsel','Felles lunsj fredag og ros til den som har gjort en ekstra innsats på personalmøtet.'], avvik:false, f:'Konkrete trivselstiltak.' },
          { c:['Lengde','Planen er 11 sider.'], avvik:true, f:'Maks fem sider. Kort og konkret er bedre.' }
        ]},
        { type:'case', id:'handlingsplan-case', nivaa:3, tittel:'Case: Sertifiseringsmøtet', intro:'Tre måneder etter at handlingsplanen ble levert, kommer IA-rådgiveren fra NAV for å sertifisere UB-en. Planen sa at dere skulle ha IA som fast punkt på personalmøtene, men det har bare skjedd to ganger.', steg:[
          {q:'IA-rådgiveren spør: «Har IA vært et fast punkt på personalmøtene?» Hva svarer dere?',valg:[{t:'Ærlig: Det har skjedd to ganger. Så forklarer dere hvorfor og hva dere endrer',ok:true,f:'Ærlighet og læring teller mer enn en perfekt fasade.'},{t:'«Ja, hver gang»',ok:false,f:'Det er ikke sant – og det kan avsløres av referatene.'},{t:'«Det var ikke så viktig»',ok:false,f:'Da viser dere at planen ikke ble tatt på alvor.'}]},
          {q:'Hvilket bevis er sterkest for at et trivselstiltak har fungert?',valg:[{t:'Korte referater og en enkel trivselsundersøkelse før og etter',ok:true,f:'Dokumentasjon gjør det mulig å vise effekten.'},{t:'At daglig leder synes det har gått bra',ok:false,f:'Én persons mening er svak dokumentasjon.'},{t:'At dere har brukt mye penger',ok:false,f:'Kostnad sier ingenting om effekt.'}]},
          {q:'Hva gjør dere med planen etter møtet?',valg:[{t:'Oppdaterer planen med det dere har lært, og setter dato for neste evaluering',ok:true,f:'Planen er et levende dokument.'},{t:'Legger den i en skuff – sertifiseringen er ferdig',ok:false,f:'IA-arbeidet varer hele året, ikke bare til sertifiseringen.'},{t:'Lager en helt ny plan fra bunnen',ok:false,f:'Bygg videre på det som fungerte.'}]}
        ]},
        { type:'reflect', id:'handlingsplan-r1', nivaa:3, tittel:'Skriv utkast til IA-handlingsplanen', q:'Skriv et utkast til IA-handlingsplanen for ungdomsbedriften deres. Ta med minst to mål med tiltak, hvem som har hvilken rolle, sykefraværsrutinen (kort), og to trivselstiltak. Avslutt med hvordan dere skal evaluere planen.', punkter:['har minst to tydelige mål','har konkrete tiltak til hvert mål','beskriver rollene og hvem som har ansvar for HMS/IA','tar med en kort sykefraværsrutine med ansvarlig person','har minst to trivselstiltak','beskriver hvordan og når planen skal evalueres'] }
      ]
    }
  ],
  avsluttendeProve: {
    tittel: 'Prøve: Inkluderende arbeidsliv',
    kort: '16 spørsmål om likeverd, IA, rettigheter og plikter, arbeidsmiljø og sykefravær.',
    bestaatt: 75,
    tekst: `<h3 style="margin-top:0">Prøve – inkluderende arbeidsliv</h3>
      <p>16 spørsmål fra alle temaene. Etter hvert svar får du en kort forklaring. Resultatet lagres på denne PC-en, og du kan levere det i fremdriftsrapporten.</p>`,
    sp: [
      {tema:'Likeverd',q:'Hva betyr likeverd?',a:['At alle mennesker er like mye verdt','At alle er like','At alle skal ha samme jobb','At alle skal være enige'],r:0,f:'Vi er forskjellige, men like mye verdt.'},
      {tema:'Likeverd',q:'Et krav som ser likt ut for alle, men urettferdig stiller noen dårligere, kalles …',a:['indirekte diskriminering','direkte diskriminering','styringsrett','tilrettelegging'],r:0,f:'Indirekte diskriminering.'},
      {tema:'Likeverd',q:'Alle får vite at møtet er flyttet, unntatt én. Hvilken hersketeknikk er det?',a:['Tilbakeholding av informasjon','Latterliggjøring','Dobbeltstraff','Anerkjennelse'],r:0,f:'Å holde informasjon unna noen er en hersketeknikk.'},
      {tema:'IA',q:'Hvilke tre områder handler IA-arbeidet om?',a:['Arbeidsmiljø, sykefravær og partssamarbeid','Lønn, ferie og pensjon','Salg, marked og økonomi','Lager, terminal og transport'],r:0,f:'Arbeidsmiljø, sykefravær og partssamarbeid.'},
      {tema:'IA',q:'Hvem har inngått IA-avtalen?',a:['Partene i arbeidslivet og staten','Bare NAV','Bare fagforeningene','EU'],r:0,f:'Det er et trepartssamarbeid.'},
      {tema:'IA',q:'Hvem representerer de ansatte i saker om arbeidsmiljø og HMS?',a:['Verneombudet','Kunden','Regnskapsføreren','Daglig leder'],r:0,f:'Verneombudet.'},
      {tema:'IA',q:'Hvem representerer fagforeningsmedlemmene i saker om lønn og vilkår?',a:['Den tillitsvalgte','Verneombudet','Arbeidstilsynet','IA-rådgiveren'],r:0,f:'Den tillitsvalgte.'},
      {tema:'Plikter',q:'Hvor langt må arbeidsgiver strekke seg for å tilrettelegge?',a:['Så langt det er mulig','Bare hvis det er gratis','Ingenting','Bare for faste ansatte over 30 år'],r:0,f:'Tilretteleggingsplikten gjelder så langt det er mulig.'},
      {tema:'Plikter',q:'Hva er medvirkningsplikt?',a:['Arbeidstakers plikt til å bidra til et godt og trygt arbeidsmiljø','Arbeidsgivers plikt til å betale lønn','Retten til ferie','Plikten til å si opp'],r:0,f:'Medvirkningsplikten gjelder arbeidstakeren.'},
      {tema:'Plikter',q:'Arbeidsgivers rett til å lede og fordele arbeidet kalles …',a:['styringsrett','omsorgsplikt','lojalitetsplikt','varslingsrett'],r:0,f:'Styringsrett – innenfor lover og avtaler.'},
      {tema:'Plikter',q:'Hva har du rett til å varsle om?',a:['Kritikkverdige forhold, som fare for liv og helse','At du ikke liker en kollega','At kaffen er tom','Alt du er uenig i'],r:0,f:'Kritikkverdige forhold er brudd på lover, regler eller etiske normer.'},
      {tema:'Arbeidsmiljø',q:'Noen blir ledd av på møtene. Hvilken del av arbeidsmiljøet gjelder det?',a:['Psykososialt','Fysisk','Organisatorisk','Ingen'],r:0,f:'Hvordan vi behandler hverandre er psykososialt.'},
      {tema:'Arbeidsmiljø',q:'Hva er psykologisk trygghet?',a:['At du kan si hva du mener og innrømme feil uten å være redd','At alle alltid er enige','At ingen gjør feil','At leder bestemmer alt'],r:0,f:'Trygghet gir mer læring og bedre samarbeid.'},
      {tema:'Sykefravær',q:'Hvorfor bør en bedrift ha en fast sykefraværsrutine?',a:['Det gir forutsigbarhet og likebehandling','For å kontrollere de ansatte','Fordi NAV krever en side per ansatt','Den trengs ikke'],r:0,f:'Alle vet hva som skal skje, og alle blir behandlet likt.'},
      {tema:'Sykefravær',q:'Hva bør lederen ikke spørre om når hun ringer en sykmeldt?',a:['Diagnosen','Hvordan det går','Om noe kan gjøre det lettere å komme tilbake','Om personen kan jobbe litt hjemmefra'],r:0,f:'Helseopplysninger er private.'},
      {tema:'Handlingsplan',q:'Hva er forskjellen på et mål og et tiltak?',a:['Målet er det dere vil oppnå, tiltaket er det dere gjør for å komme dit','Det er det samme','Tiltaket er det dere vil oppnå','Målet er alltid et tall'],r:0,f:'Mål = hva. Tiltak = hvordan.'}
    ]
  }
});
