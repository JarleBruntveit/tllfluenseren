/* G11 Løfteredskap – egenprodusert læringsinnhold for Bransjeteknikk (Vg2 TOL).
   Faglig grunnlag: Arbeidstilsynets opplæringsplan Modul 2.3 Løfteredskap (G11), forskrift om utførelse av arbeid,
   NDLA (Bransjeteknikk – Kraner og løfteutstyr) og læreboka «Sikker bruk av løfteredskap» (LSI, 10. utg. 2018).
   Ingen tekst, oppgaver, tabeller eller figurer er kopiert fra forlag eller produsenter. Tallene i løftetabellen er
   standardverdier (faktorene i EN 1492 og arbeidslastene i EN 818-4 for Grade 80) satt opp på vår egen måte.
   Ulykkene i G11-07 er gjenfortalt med egne ord og uten navn på personer eller firma. */
(() => {
const AT_G11 = 'https://www.havtil.no/contentassets/332ceaad219344299828293b3c14171f/modul-2.3---g11---lofteredskap.pdf';
const AT_G11_FJERN = 'https://inte.arbeidstilsynet.no/contentassets/f9c0f171f4af42a0afca34023d43391d/fjernundervisning_modul-2.3-lofteredskap-g11.pdf';
const LOVDATA_FUA = 'https://lovdata.no/forskrift/2011-12-06-1357';
const NR = 'https://ndla.no/r/bransjeteknikk-tp-tol-vg2---ressurssamling/';
const N = {
  emne:     ['Kraner og løfteutstyr', 'https://ndla.no/e/bransjeteknikk-tp-tol-vg2---ressurssamling/kraner-og-lofteutstyr/fd4a9e50e4', 'NDLA'],
  bruk:     ['Riktig bruk og vedlikehold av løfteutstyr (film)', NR + 'riktig-bruk-og-vedlikehold-av-lofteutstyr/b72ff5b821', 'NDLA'],
  klasser:  ['Hvilke klasser finnes for kraner og løfteutstyr?', NR + 'hvilke-klasser-finnes-for-kraner-og-lofteutstyr/0210a7aa88', 'NDLA'],
  kranforer:['Vil du bli kranfører?', NR + 'vil-du-bli-kranforer/c94a8a42aa', 'NDLA'],
  qUtstyr:  ['Hva har du lært om løfteutstyr?', NR + 'hva-har-du-lart-om-lofteutstyr/7cbe9ec62b', 'NDLA'],
  qOrd:     ['Hva har du lært om ord og uttrykk for løfteutstyr?', NR + 'hva-har-du-lart-om-ord-og-uttrykk-for-lofteutstyr/639d8966fe', 'NDLA'],
  qPersonell:['Hva har du lært om arbeidsområder og krav til personell?', NR + 'hva-har-du-lart-om-arbeidsomrader-og-krav-til-personell/9044ab0b8e', 'NDLA'],
  merking:  ['Merking og kontroll av løfteutstyr', NR + 'merking-og-kontroll-av-lofteutstyr/0d8d4f1697', 'NDLA'],
  g11:      ['Løfteredskaper (klasse G11)', NR + 'lofteredskaper-klasse-g11/00e43b2ded', 'NDLA'],
  operator: ['Kran- og løfteoperatør (film)', NR + 'kran--og-lofteoperator/ca871d60d7', 'NDLA'],
  plan:     ['Opplæringsplan G11 (PDF)', AT_G11, 'Arbeidstilsynet'],
  fua:      ['Forskrift om utførelse av arbeid', LOVDATA_FUA, 'Lovdata']
};
const BOK = 'Læreboka «Sikker bruk av løfteredskap» (LSI)';

/* ---------- Egen løftetabell (forenklet). Brukes i G11-04, øvelsesbanken og øveprøven. ---------- */
const FIBER = [['Fiolett',1],['Grønn',2],['Gul',3],['Grå',4],['Rød',5],['Brun',6],['Blå',8],['Oransje',10]];
const FAKT = [1, 0.8, 2, 1.4, 1, 2.1, 1.5];
const KJ80 = [ // d, 1 part rett, 2 parter 0–45°, 2 parter 45–60°, 3–4 parter 0–45°, 3–4 parter 45–60° (EN 818-4, Grade 80)
  [7,1.5,2.12,1.5,3.15,2.24],[8,2,2.8,2,4.25,3],[10,3.15,4.25,3.15,6.7,4.75],[13,5.3,7.5,5.3,11.2,8],
  [16,8,11.2,8,17,11.8],[18,10,14,10,21.2,15],[20,12.5,17,12.5,26.5,19],[22,15,21.2,15,31.5,22.4]];
const k = x => String(Math.round(x * 100) / 100).replace('.', ',');
const TABELL = `<style>.lt{width:100%;border-collapse:collapse;font-size:14px;margin:8px 0 14px}.lt th,.lt td{border:1px solid var(--line,#33424f);padding:6px 7px;text-align:center}.lt th{background:rgba(242,184,75,.14)}.lt td:first-child{text-align:left;font-weight:700}.ltw{overflow-x:auto}</style>
  <h3 style="font-size:22px;margin-top:0">Løftetabell (forenklet) – arbeidslast i tonn</h3>
  <p class="small muted">Arbeidsvinkel = vinkelen mellom loddlinja og én part. Toppvinkelen mellom to parter er dobbelt så stor. Over 60° arbeidsvinkel skal du ikke løfte. På jobb bruker du alltid tabellen fra produsenten av redskapet du har – verdiene kan være litt avrundet.</p>
  <div class="ltw"><table class="lt"><caption class="small" style="text-align:left;font-weight:700">Fiberstropper (polyester) – merket WLL × faktor</caption>
  <tr><th>Farge</th><th>Rett<br>×1</th><th>Snaret<br>×0,8</th><th>U-løft loddrett<br>×2</th><th>2 parter<br>0–45° ×1,4</th><th>2 parter<br>45–60° ×1</th><th>3–4 parter<br>0–45° ×2,1</th><th>3–4 parter<br>45–60° ×1,5</th></tr>
  ${FIBER.map(([f,w]) => `<tr><td>${f}</td>${FAKT.map(x => `<td>${k(w*x)}</td>`).join('')}</tr>`).join('')}</table></div>
  <div class="ltw"><table class="lt"><caption class="small" style="text-align:left;font-weight:700">Kjettingredskap Grade 80 – arbeidslast i tonn (snaret: × 0,8)</caption>
  <tr><th>Diameter</th><th>1 part rett</th><th>2 parter<br>0–45°</th><th>2 parter<br>45–60°</th><th>3–4 parter<br>0–45°</th><th>3–4 parter<br>45–60°</th></tr>
  ${KJ80.map(r => `<tr><td>${r[0]} mm</td>${r.slice(1).map(v => `<td>${k(v)}</td>`).join('')}</tr>`).join('')}</table></div>
  <ul class="small" style="margin:0;padding-left:18px;line-height:1.6">
    <li><b>Usymmetrisk last med 2 parter:</b> bruk verdien for <b>1 part</b>. <b>Usymmetrisk med 3–4 parter:</b> bruk verdien for <b>2 parter</b>.</li>
    <li><b>Ulike arbeidsvinkler:</b> bruk den <b>største</b> vinkelen.</li>
    <li><b>Snaret flerparts:</b> ta tabellverdien og gang med <b>0,8</b>.</li>
    <li><b>Tommelfingerregel:</b> Er avstanden mellom anhukingspunktene lik partlengden, er arbeidsvinkelen ca. 30°. Er den ca. 1,4 × partlengden, er den ca. 45°.</li></ul>`;

/* ---------- Egne tegninger (SVG). Klikkbare områder har data-z. ---------- */
const S = 'font-family="Inter,system-ui,sans-serif"';
const SVG_LOFT = `<svg viewBox="0 0 600 360" ${S} role="img" aria-label="En kasse løftes med to stropper fra en kranekrok">
  <rect x="0" y="0" width="600" height="360" fill="#ffffff"/>
  <rect x="285" y="0" width="30" height="40" fill="#9aa3ab" pointer-events="none"/>
  <g data-z="krok"><path d="M300 40v30a22 22 0 1 0 22 22" fill="none" stroke="#1b2128" stroke-width="9" stroke-linecap="round"/><path d="M322 92l-14 -10" stroke="#e07b00" stroke-width="5"/></g>
  <g data-z="sjakkel"><ellipse cx="300" cy="122" rx="12" ry="16" fill="none" stroke="#1d6fb8" stroke-width="6"/></g>
  <path data-z="stropp" d="M296 134 L178 236" stroke="#2e9e4f" stroke-width="10" stroke-linecap="round"/>
  <path data-z="stropp" d="M304 134 L422 236" stroke="#2e9e4f" stroke-width="10" stroke-linecap="round"/>
  <path d="M300 140 V230" stroke="#5c6670" stroke-width="2" stroke-dasharray="5 5" pointer-events="none"/>
  <g data-z="vinkel"><path d="M300 190 A50 50 0 0 0 338 172" fill="none" stroke="transparent" stroke-width="24"/><path d="M300 190 A50 50 0 0 0 338 172" fill="none" stroke="#e07b00" stroke-width="4"/></g>
  <text x="346" y="196" font-size="13" fill="#8a4b00" pointer-events="none">arbeidsvinkel</text>
  <rect x="160" y="236" width="280" height="80" fill="#d9b98a" stroke="#8b6a38" stroke-width="3"/>
  <rect data-z="kant" x="160" y="230" width="34" height="14" fill="#ffd7d7" stroke="#c0392b" stroke-width="2"/>
  <rect data-z="kant" x="406" y="230" width="34" height="14" fill="#ffd7d7" stroke="#c0392b" stroke-width="2"/>
  <g data-z="tp"><circle cx="300" cy="276" r="11" fill="#fff" stroke="#1b2128" stroke-width="3"/><path d="M300 265v22M289 276h22" stroke="#1b2128" stroke-width="3"/></g>
  <g data-z="styretau"><path d="M440 300 C490 310 500 330 560 340" fill="none" stroke="transparent" stroke-width="22"/><path d="M440 300 C490 310 500 330 560 340" fill="none" stroke="#7a4bb5" stroke-width="5" stroke-linecap="round"/></g>
  <text x="20" y="350" font-size="12" fill="#5c6670">Forenklet tegning. Ikke i målestokk.</text>
</svg>`;

/* Figur i G11-04: arbeidsvinkel og toppvinkel */
const SVG_VINKEL = `<svg viewBox="0 0 600 300" ${S} role="img" aria-label="Arbeidsvinkelen måles mellom loddlinja og én part. Toppvinkelen er vinkelen mellom partene.">
  <rect width="600" height="300" fill="#fff"/>
  <circle cx="300" cy="40" r="10" fill="#1b2128"/>
  <path d="M300 40 L170 220 M300 40 L430 220" stroke="#2e9e4f" stroke-width="8" stroke-linecap="round"/>
  <path d="M300 40 V230" stroke="#5c6670" stroke-width="2" stroke-dasharray="6 6"/>
  <path d="M300 110 A70 70 0 0 0 341 97" fill="none" stroke="#e07b00" stroke-width="4"/>
  <text x="350" y="112" font-size="15" fill="#8a4b00" font-weight="700">arbeidsvinkel (β)</text>
  <path d="M265 88 A60 60 0 0 0 335 88" fill="none" stroke="#1d6fb8" stroke-width="3" stroke-dasharray="4 4"/>
  <text x="120" y="86" font-size="15" fill="#1d6fb8" font-weight="700">toppvinkel = 2 × β</text>
  <rect x="140" y="220" width="320" height="50" fill="#d9b98a" stroke="#8b6a38" stroke-width="3"/>
  <text x="300" y="292" text-anchor="middle" font-size="12" fill="#5c6670">β opptil 45° (toppvinkel 90°): faktor 1,4 · β 45–60° (toppvinkel 90–120°): faktor 1,0</text>
</svg>`;

TLL.registrer({
  id: 'g11',
  fag: 'Bransjeteknikk',
  kortnavn: 'G11',
  nr: 'G11',
  tittel: 'G11 Løfteredskap',
  kortTittel: 'Løfteredskap',
  oppsett: 'fokus',
  ingress: 'Velg riktig redskap, kontroller det før bruk, anhuk lasten trygt og gi tydelige signaler til kranføreren.',
  prove: false,
  ressursomrade: 'bransjeteknikk',
  kompetansemal: [
    { kode: 'TOL02-01 · KV426', tekst: 'anhuke og gi signal ved lossing og lasting etter gjeldende opplæringsplan og regelverk' }
  ],
  ressurser: {
    presentasjon: '',
    laerebok: BOK + '. Bruk også opplæringsplanen for G11 og produsentens løftetabeller.',
    arbeidsbok: '',
    ndlaEmne: N.emne[1],
    ndlaEmneTag: 'NDLA',
    ndlaEmneNavn: 'Kraner og løfteutstyr – Bransjeteknikk på NDLA',
    ordliste: AT_G11,
    ordlisteTag: 'Arbeidstilsynet',
    ordlisteNavn: 'Opplæringsplan Modul 2.3 Løfteredskap (G11)'
  },
  fotnote: 'G11 Løfteredskap · Innholdet er læringsstøtte bygget på Arbeidstilsynets opplæringsplan for løfteredskap (G11). Gjeldende regelverk, produsentens bruksanvisning og løftetabeller og arbeidsplassens prosedyrer har forrang. Siden erstatter ikke dokumentert sikkerhetsopplæring, praktisk trening eller eksamen hos godkjent opplæringsvirksomhet. <a href="prove/">Teoriprøven lest opp (passord fra læreren)</a> · Resultater lagres bare i nettleseren på denne enheten – <a href="#/lagring">les om lagring</a> · <a href="#/rapport">lever fremdrift</a>.',
  temaer: [
    /* ================================================================ G11-01 */
    {
      id: 'roller', lok: 'G11-01', tittel: 'Roller, regelverk og opplæring',
      kort: 'Hvem gjør hva i et løft, hvilken opplæring som kreves, og hvorfor ulykker skjer.',
      bok: BOK + ', kap. 1–4 · Opplæringsplan G11, leksjon 1',
      mal: ['beskrive rollene til kranfører, anhuker og signalgiver','forklare forskjellen på dokumentert og sertifisert sikkerhetsopplæring','gi eksempler på ulykker ved løft og hvordan de kan forebygges'],
      punkter: [
        'I et løft er det tre viktige roller: <b>kranføreren</b> styrer kranen, <b>anhukeren</b> (stropperen) fester lasten, og <b>signalgiveren</b> dirigerer kranføreren.',
        '<b>Løfteredskap</b> er utstyret mellom kranen og lasten, for eksempel stropper, kjetting, sjakler og løfteåk. Kraner og løfteutstyr deles i klasser fra <b>G1</b> til <b>G20</b> – <b>G11</b> er løfteredskap.',
        'Kranførere må ha <b>sertifisert</b> sikkerhetsopplæring. Anhukere og signalgivere skal ha <b>dokumentert</b> sikkerhetsopplæring. I tillegg kommer <b>utstyrsspesifikk opplæring</b> på det utstyret du faktisk bruker.',
        'Personer under 18 år skal ikke settes til arbeid som kan være farlig. I videregående skole kan du likevel få opplæring under kyndig veiledning.',
        'Mange ulykker med kran og løft skyldes <b>feil stropping og manglende kontroll</b> av redskapet før bruk – ikke selve kranen.',
        '<b>Aldri opphold deg under hengende last</b>. Du har plikt til å avbryte et løft som kan føre til fare for liv og helse, og alle kan gi <b>stoppsignal</b>.'
      ],
      ndla: [N.klasser, N.qPersonell, N.kranforer, N.plan, N.fua],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'roller-voks', tittel:'Én stemme, ett ansvar', tekst:['I et løft må alle vite hvem som gir signalene. Hvis tre personer roper til kranføreren samtidig, blir det farlig. Samtidig skal alle si fra hvis de ser fare.','Det er det samme i en arbeidsgruppe: Én leder oppgaven, men alle har ansvar for å si fra.'], sporsmal:['Hvordan blir dere enige om hvem som leder en oppgave i gruppa?','Hva gjør du hvis du ser noe farlig, men en annen har ansvaret?'], handling:'Neste gang dere jobber i gruppe: Avtal hvem som leder, og at alle kan si «stopp».' },
        { type:'flash', id:'roller-flash', tittel:'Begrepskort: roller og regler', kort:[
          ['Kranfører','Styrer kranen og har ansvaret for kranbevegelsene.'],
          ['Anhuker','Fester lasten til kranen med riktig løfteredskap. Kalles også stropper.'],
          ['Signalgiver','Gir signaler til kranføreren med håndsignaler eller radio. Det skal være én signalgiver om gangen.'],
          ['Løfteredskap','Utstyr mellom kranen og lasten: stropper, kjetting, sjakler, åk og lignende.'],
          ['G11','Klassen for løfteredskap. Kraner og løfteutstyr deles i klasser fra G1 til G20.'],
          ['Dokumentert sikkerhetsopplæring','Opplæring arbeidsgiver må kunne vise at er gitt. Kreves for anhuker og signalgiver.'],
          ['Sertifisert sikkerhetsopplæring','Opplæring fra en sertifisert opplæringsvirksomhet, med kompetansebevis. Kreves for blant annet kranfører.'],
          ['Utstyrsspesifikk opplæring','Opplæring på det konkrete utstyret du skal bruke, etter bruksanvisningen.'],
          ['Hengende last','Last som henger i kranen. Ingen skal oppholde seg under den.']
        ]},
        { type:'match', id:'roller-m1', nivaa:1, tittel:'Hvem gjør hva?', instr:'Koble oppgaven med riktig rolle.', par:[
          ['Velger stropper og fester lasten','Anhuker'],
          ['Styrer kranens bevegelser','Kranfører'],
          ['Dirigerer kranføreren med tegn eller radio','Signalgiver'],
          ['Sørger for at de ansatte har fått opplæring','Arbeidsgiver'],
          ['Fører tilsyn med at regelverket blir fulgt','Arbeidstilsynet']
        ], f:'På små arbeidsplasser kan én person ha flere roller – da må vedkommende ha opplæring for alle.' },
        { type:'tf', id:'roller-tf', nivaa:2, tittel:'Sant eller usant: regler og sikkerhet', ps:[
          ['Det er greit å gå under hengende last hvis det går fort.',false,'Aldri opphold deg under hengende last.'],
          ['Bare signalgiveren kan gi stoppsignal.',false,'Alle kan gi stoppsignal når de ser fare.'],
          ['Anhukere og signalgivere skal ha dokumentert sikkerhetsopplæring.',true,'Opplæringen skal kunne dokumenteres av arbeidsgiveren.'],
          ['Kursbevis på G11 betyr at du ikke trenger opplæring på nytt utstyr.',false,'Du trenger også utstyrsspesifikk opplæring på det utstyret du skal bruke.'],
          ['Du har plikt til å avbryte et løft som kan føre til fare for liv og helse.',true,'Det følger av arbeidsmiljøloven – sikkerhet går foran fremdrift.'],
          ['Løfteredskap er det samme som kranen.',false,'Løfteredskap er utstyret mellom kranen og lasten.']
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
      bok: BOK + ', kap. 7–9 og 12–14 · Opplæringsplan G11, leksjon 2',
      mal: ['kjenne igjen de vanligste typene løfteredskap','forklare fordeler og ulemper ved fiber, kjetting og ståltau','lese fargekoden og merkelappen på fiberstropper'],
      punkter: [
        '<b>Fiberstropper</b> (båndstropp og rundsling) er lette og skåner lasten, men tåler dårlig skarpe kanter, varme og kjemikalier. Polyester tåler <b>-40 °C til +100 °C</b>.',
        'Fargen på stroppen viser arbeidslasten i rett løft: fiolett 1 t, grønn 2 t, gul 3 t, grå 4 t, rød 5 t, brun 6 t, blå 8 t og oransje 10 t eller mer. <b>Fargen på merkelappen</b> viser materialet: <b>blå = polyester</b>, grønn = polyamid, brun = polypropylen. Det er alltid merkelappen som gjelder.',
        '<b>Kjettingredskap</b> til løft er Grade 80 eller Grade 100. Kjetting tåler slitasje og varme (Grade 80 opptil +200 °C uten reduksjon) og har <b>merkebrikke</b> med blant annet arbeidslast og antall parter.',
        '<b>Ståltaustropper</b> er sterke og tåler slitasje, men er stive. <b>FC</b> betyr fiberkjerne (opptil +100 °C), <b>IWRC</b> betyr stålkjerne (opptil +150 °C) – velg IWRC i varme miljøer.',
        '<b>Sjakler</b> kobler sammen redskap. <b>Øyebolter</b> skrus inn i lasten. <b>Løfteåk</b> fordeler vekten og gir bedre balanse. <b>Plateklyper</b>, <b>pallegafler</b> og andre spesialredskaper brukes bare til det produsenten har laget dem for.',
        '<b>WLL</b> (største tillatte arbeidslast) er det redskapet er merket med. <b>MBL</b> er minste bruddlast. Redskap som bare er merket med MBL, for eksempel fortøyningssjakler, skal ikke brukes til løft.'
      ],
      ndla: [N.g11, N.qUtstyr, N.qOrd, N.bruk],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'redskap-voks', tittel:'Riktig verktøy til riktig jobb', tekst:['Det finnes ikke ett løfteredskap som passer til alt. En god anhuker vet hva hvert redskap kan – og hva det ikke kan.','Folk er også forskjellige. I en gruppe er det en styrke at noen er gode til å planlegge, noen til å gjøre og noen til å kontrollere.'], sporsmal:['Hva er du god til når dere løser oppgaver sammen?','Hvilken styrke ser du hos en klassekamerat som han eller hun kanskje ikke ser selv?'], handling:'Si til én i gruppa hva du synes han eller hun er god til.' },
        { type:'flash', id:'redskap-flash', tittel:'Begrepskort: løfteredskap', kort:[
          ['Båndstropp','Flat fiberstropp. Skåner lasten.'],
          ['Rundsling','Fiberstropp med bærende fibre inni en beskyttende kappe.'],
          ['Kjettingredskap','Kjetting med toppløkke og kroker, Grade 80 eller 100. Har merkebrikke.'],
          ['Ståltaustropp','Stropp av stålwire. FC = fiberkjerne, IWRC = stålkjerne.'],
          ['Sjakkel','Kobling med bolt. Finnes som rett sjakkel og buesjakkel.'],
          ['Øyebolt','Bolt med øye som skrus inn i lasten. M20 betyr 20 mm gjenger.'],
          ['Løfteåk','Bjelke som fordeler vekten og gir bedre balanse.'],
          ['WLL','Working Load Limit – største tillatte arbeidslast.'],
          ['MBL','Minimum bruddlast. Ikke det samme som arbeidslast.'],
          ['CE-merke','Viser at produsenten erklærer at redskapet oppfyller kravene i maskinforskriften.']
        ]},
        { type:'match', id:'redskap-m1', nivaa:1, tittel:'Fargekoden på fiberstropper', instr:'Koble fargen på stroppen med arbeidslasten i rett løft.', par:[
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
          {q:'Hva betyr WLL på merkingen?',a:['Største tillatte arbeidslast','Vekten av stroppen','Minste bruddlast','Lengden på stroppen'],r:0,f:'WLL står for Working Load Limit.'},
          {q:'Hvilken farge har merkelappen på en stropp av polyester?',a:['Blå','Brun','Grønn','Rød'],r:0,f:'Blå merkelapp = polyester. Grønn = polyamid, brun = polypropylen.'},
          {q:'Du skal løfte et varmt rør på ca. 130 °C med ståltau. Hva velger du?',a:['IWRC (stålkjerne)','FC (fiberkjerne)','Polyester rundsling','Hvilken som helst'],r:0,f:'FC tåler opptil ca. 100 °C, IWRC opptil ca. 150 °C.'},
          {q:'Hvorfor brukes et løfteåk?',a:['For å fordele vekten og gi bedre balanse','For å kunne løfte mer enn redskapet tåler','For å gjøre løftet raskere','For å slippe å kontrollere stroppene'],r:0,f:'Åket gir loddrette parter og mindre krefter i hver part.'},
          {q:'En sjakkel er bare merket med MBL. Kan den brukes til løft?',a:['Nei','Ja, hvis du kjenner sikkerhetsfaktoren','Ja, hvis sjefen sier det er greit','Ja, til lette løft'],r:0,f:'Sjakler til løft skal være merket med WLL. MBL-merkede sjakler er for eksempel for fortøyning.'}
        ]},
        { type:'reflect', id:'redskap-r1', nivaa:3, tittel:'Velg og begrunn', q:'En kunde skal ha løftet en ny, malt stålkonstruksjon på 2,5 tonn med skarpe kanter i den ene enden. Hvilket redskap vil du velge, og hvordan vil du beskytte både redskapet og lasten? Begrunn valget.', punkter:['velger redskap med nok arbeidslast for løftet','vurderer fiber mot kjetting eller ståltau og begrunner','beskytter skarpe kanter med kantbeskyttelse','tar hensyn til at lakken ikke skal skades','nevner at merking og løftetabell må kontrolleres','nevner kontroll av redskapet før bruk'] }
      ]
    },
    /* ================================================================ G11-03 */
    {
      id: 'kontroll', lok: 'G11-03', tittel: 'Merking, kontroll og kassering',
      kort: 'Les merkingen, gjør førbrukskontroll før hvert løft og vit når redskapet skal kasseres.',
      bok: BOK + ', kap. 7–9 og 12 (kontroll og kassering) · Opplæringsplan G11, leksjon 2 og 6',
      mal: ['lese merkingen på ulike løfteredskap','gjennomføre en førbrukskontroll','avgjøre når løfteredskap skal kasseres og tas ut av bruk'],
      punkter: [
        'Alt løfteredskap skal være <b>merket</b> med blant annet WLL, produsent og et nummer som gjør det sporbart, og være <b>CE-merket</b>. Uten lesbar merking skal redskapet ikke brukes.',
        'Før hvert løft gjør du en <b>førbrukskontroll</b> av redskapet du skal bruke. I tillegg skal løfteredskap ha <b>sakkyndig kontroll minst hver 12. måned</b>. Kjetting kan ha fargemerke for året den ble godkjent.',
        '<b>Fiberstropper</b> kasseres ved kutt, slitasje, smelte- eller kjemikalieskader, knuter, <b>synlige bærende fibre</b> i rundsling eller manglende merkelapp.',
        '<b>Kjetting</b> kasseres ved sprekker, deformerte eller forlengede ledd, <b>godsslitasje over 10 %</b>, varmeskader eller krok som har åpnet seg eller mangler sikkerhetslås.',
        '<b>Ståltau</b> kasseres ved trådbrudd, <b>knekk</b> (varig deformasjon), klemskader, «fuglebur» og kraftig korrosjon.',
        'Skadet redskap tas ut av bruk med en gang – gjerne merket med <b>hvit farge</b>. Oppbevar redskap tørt, hengende og unna sollys og kjemikalier.'
      ],
      ndla: [N.merking, N.g11, N.fua],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'kontroll-voks', tittel:'Å kassere er å ta ansvar', tekst:['Det kan føles dumt å kaste en dyr stropp som «nesten er hel». Men en skadet stropp kan ryke uten forvarsel.','Den som kasserer redskapet, beskytter også kollegaen som skulle brukt det i morgen. Det er omsorg i praksis.'], sporsmal:['Hvorfor er det vanskelig å si «dette kan ikke brukes»?','Hvordan reagerer du når noen påpeker en feil du har gjort?'], handling:'Takk den neste som påpeker en feil hos deg, i stedet for å forsvare deg.' },
        { type:'flash', id:'kontroll-flash', tittel:'Begrepskort: kontroll', kort:[
          ['Førbrukskontroll','Kontroll av det redskapet du skal bruke til et bestemt løft, rett før bruk.'],
          ['Sakkyndig kontroll','Grundig kontroll av en sakkyndig virksomhet minst hver 12. måned.'],
          ['Merkebrikke','Brikke på kjetting med blant annet WLL, antall parter og sporingsnummer.'],
          ['Merkelapp','Etikett på fiberstropp med WLL, materiale og produsent.'],
          ['Kassering','Redskapet tas ut av bruk for godt.'],
          ['Hvit farge','Tegn på at redskapet er tatt ut av bruk fordi det skal kasseres eller repareres.'],
          ['Knekk','Varig deformasjon i ståltau. Stroppen skal kasseres.'],
          ['Fuglebur','Skade på ståltau der kordelene åpner seg som et bur.'],
          ['Sikkerhetslås','Smekklås på kroken som hindrer at stroppen hopper av.']
        ]},
        { type:'quiz', id:'kontroll-q1', nivaa:1, tittel:'Merking og kontroll', sp:[
          {q:'Når skal du kontrollere løfteredskapet?',a:['Før hvert løft (førbrukskontroll)','En gang i måneden','Bare når det er nytt','Når sjefen sier det'],r:0,f:'Førbrukskontrollen gjør du på det redskapet du skal bruke.'},
          {q:'En fiberstropp mangler merkelapp. Hva gjør du?',a:['Tar den ut av bruk','Bruker den til halv last','Skriver en ny lapp selv','Gjetter ut fra fargen'],r:0,f:'Uten merking vet du ikke hva den tåler. Den skal kasseres.'},
          {q:'Hvor ofte skal løfteredskap ha sakkyndig kontroll?',a:['Minst hver 12. måned','Hvert femte år','Aldri, hvis brukeren kontrollerer det','Hver uke'],r:0,f:'I tillegg til førbrukskontrollen.'},
          {q:'Hva betyr det at et kjettingredskap er malt med hvit farge?',a:['Det er tatt ut av bruk og skal kasseres eller repareres','Det er nytt','Det er for personløft','Det tåler over 10 tonn'],r:0,f:'Hvit farge brukes for å vise at redskapet ikke skal brukes.'}
        ]},
        { type:'check', id:'kontroll-chk1', nivaa:2, tittel:'Førbrukskontroll i redskapsrommet', instr:'Du kontrollerer redskapet før et løft. Kryss av det som skal kasseres.', dok:'Førbrukskontroll – løfteredskap', meta:'Kontrollert av: anhuker · Før bruk', kolonner:['Redskap','Det du ser'], kryss:'Kasseres', rader:[
          { c:['Rundsling, grønn','Hel merkelapp. Kappen er litt skitten, men hel.'], avvik:false, f:'Skitt alene er ikke kassasjonsgrunn. Kappen er hel.' },
          { c:['Rundsling, gul','Kutt i kappen – du ser de hvite fibrene inni.'], avvik:true, f:'Synlige bærende fibre betyr at stroppen skal kasseres.' },
          { c:['Båndstropp, fiolett','Det er knyttet en knute for å gjøre den kortere.'], avvik:true, f:'Knuter svekker stroppen kraftig.' },
          { c:['Kjettingredskap','Krokens åpning er tydelig større enn på den andre kroken.'], avvik:true, f:'En krok som har åpnet seg, har vært overbelastet.' },
          { c:['Kjettingredskap','Sikkerhetslåsen på kroken mangler.'], avvik:true, f:'Uten sikkerhetslås kan stroppen hoppe av.' },
          { c:['Ståltaustropp','Stroppen har en knekk som ikke retter seg ut.'], avvik:true, f:'Knekk er varig deformasjon. Stroppen skal kasseres – den skal ikke rettes ut.' },
          { c:['Sjakkel','Merket med WLL, CE og produsent. Bolten er original og går lett inn.'], avvik:false, f:'Riktig.' },
          { c:['Båndstropp, blå','Har ligget i sola på et tak i to år. Fargen er bleket, og stoffet er stivt.'], avvik:true, f:'UV-stråling bryter ned fiber. Bleket og stivt materiale skal kasseres.' }
        ]},
        { type:'tf', id:'kontroll-tf', nivaa:2, tittel:'Sant eller usant: oppbevaring og kassering', ps:[
          ['Fiberstropper bør oppbevares hengende, tørt og unna sollys.',true,'Fukt, sollys og kjemikalier bryter ned fibrene.'],
          ['En skadet stropp kan brukes til lettere løft.',false,'Skadet redskap skal tas ut av bruk.'],
          ['Kjetting med mer enn 10 % godsslitasje skal kasseres.',true,'Slitasjen måles på kjettingdiameteren.'],
          ['En knekk på en ståltaustropp kan rettes ut med en presse.',false,'Knekk gir varig deformasjon. Stroppen skal kasseres.'],
          ['Bolten i en sjakkel kan byttes med en vanlig bolt fra jernvarehandelen.',false,'Bruk bare original bolt eller godkjent reservedel.']
        ]},
        { type:'case', id:'kontroll-case', nivaa:3, tittel:'Case: Den eneste stroppen', intro:'Det er fredag ettermiddag. Kunden venter på en maskin som skal løftes av lastebilen. Den eneste 3-tonns stroppen dere har, har en kuttskade i kanten. Maskinen veier 1,2 tonn.', steg:[
          {q:'Sjåføren sier: «Den tåler 3 tonn, og maskinen veier bare 1,2. Det går fint.» Hva svarer du?',valg:[{t:'Skadet stropp skal ikke brukes, uansett vekt',ok:true,f:'Du vet ikke lenger hva stroppen tåler.'},{t:'Det stemmer, det er god margin',ok:false,f:'Arbeidslasten gjelder bare for uskadet redskap.'},{t:'Vi bruker den, men løfter sakte',ok:false,f:'Lav fart gjør ikke en skadet stropp trygg.'}]},
          {q:'Hva gjør du med stroppen?',valg:[{t:'Merker den som kassert og tar den ut av bruk',ok:true,f:'Da bruker ingen den ved en feil senere.'},{t:'Legger den tilbake i kassa',ok:false,f:'Da kan noen andre bruke den.'},{t:'Kutter bort den skadde delen',ok:false,f:'Stroppen er da ikke lenger godkjent.'}]},
          {q:'Hvordan løser dere oppdraget?',valg:[{t:'Henter annet godkjent redskap eller avtaler ny tid med kunden',ok:true,f:'Sikkerhet går foran tidspress.'},{t:'Bruker et surringsbånd fra lastebilen',ok:false,f:'Surringsutstyr er ikke løfteredskap.'},{t:'Løfter maskinen med to kuttede stropper',ok:false,f:'To skadede stropper blir ikke trygge sammen.'}]}
        ]}
      ]
    },
    /* ================================================================ G11-04 */
    {
      id: 'tabell', lok: 'G11-04', tittel: 'Løftetabeller og arbeidsvinkel',
      kort: 'Bruk løftetabellen til å finne hva redskapet tåler i ulike anhukingsmåter og vinkler.',
      bok: BOK + ', kap. 6 (anhuking, tyngdepunkt, arbeidsvinkler og løftetabeller) · Opplæringsplan G11, leksjon 3 og 5',
      mal: ['forklare arbeidsvinkel og toppvinkel og hvordan vinkelen påvirker kreftene','bruke en løftetabell til å finne arbeidslast for ulike anhukingsmåter','vurdere om et redskap er sterkt nok, også når lasten er usymmetrisk'],
      punkter: [
        '<b>Arbeidsvinkelen</b> (β) er vinkelen mellom loddlinja og én part. <b>Toppvinkelen</b> er vinkelen mellom partene – den er dobbelt så stor. Jo større vinkel, desto større kraft i hver part.',
        '<b>Største tillatte arbeidsvinkel er 60°</b> (toppvinkel 120°). Ved 60° er kraften i hver av to parter like stor som hele lasten. WLL på merkebrikken til et flerparts redskap gjelder for arbeidsvinkel 0–45°.',
        'Faktorer i løftetabellen: <b>rett 1,0</b> · <b>snaret 0,8</b> · <b>U-løft loddrett 2,0</b> · <b>2 parter</b> 1,4 (0–45°) og 1,0 (45–60°) · <b>3–4 parter</b> 2,1 (0–45°) og 1,5 (45–60°).',
        'Eksempel: To grønne stropper (2 t) i 2 parter med 30° arbeidsvinkel: 2 × 1,4 = <b>2,8 t</b>. Snares de i tillegg: 2,8 × 0,8 = <b>2,24 t</b>.',
        '<b>Usymmetrisk last</b>: Med 2 parter regner du som om <b>én part</b> bærer alt. Med 3–4 parter regner du som om <b>to parter</b> bærer. Ved ulike vinkler bruker du den <b>største</b>.',
        'Bruk alltid <b>produsentens tabell</b> for redskapet du har – kjettingtabeller er avrundet og følger ikke alltid faktoren nøyaktig.'
      ],
      figur: { svg: SVG_VINKEL, tekst: 'Arbeidsvinkelen måles fra loddlinja til én part. Toppvinkelen mellom partene er dobbelt så stor.' },
      ekstra: TABELL,
      ndla: [N.g11, N.qUtstyr, N.plan],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'tabell-voks', tittel:'Ikke gjett – sjekk', tekst:['I mange situasjoner er det fristende å si «det holder sikkert». I løfteoperasjoner kan en gjetning koste liv.','Å spørre en kollega, sjekke tabellen en gang til eller si «vent litt, jeg må regne» er tegn på at du er profesjonell – ikke at du er usikker.'], sporsmal:['Når har du gjettet i stedet for å sjekke – og hva skjedde?','Hvordan kan dere i gruppa hjelpe hverandre til å sjekke uten å virke mistroiske?'], handling:'Bruk setningen «La meg sjekke tabellen» minst én gang i neste praktiske økt.' },
        { type:'flash', id:'tabell-flash', tittel:'Begrepskort: løftetabell', kort:[
          ['Løftetabell','Tabell fra produsenten som viser arbeidslast ved ulike anhukingsmåter og vinkler.'],
          ['Arbeidsvinkel (β)','Vinkelen mellom loddlinja og én part. Største tillatte er 60°.'],
          ['Toppvinkel','Vinkelen mellom partene ved kroken. Dobbelt så stor som arbeidsvinkelen.'],
          ['Rett løft','Én part som henger loddrett. Faktor 1,0.'],
          ['Snaring','Stroppen legges rundt lasten og gjennom sitt eget øye. Faktor 0,8.'],
          ['U-løft','Stroppen går under lasten, begge endene i kroken. Faktor 2,0 når partene er loddrette.'],
          ['Topartsredskap','Faktor 1,4 (0–45°) og 1,0 (45–60°).'],
          ['Tre- og firepartsredskap','Faktor 2,1 (0–45°) og 1,5 (45–60°).'],
          ['Usymmetrisk last','Tyngdepunktet ligger ikke midt mellom partene. Regn med færre bærende parter.']
        ]},
        { type:'quiz', id:'tabell-q1', nivaa:1, tittel:'Vinkler og krefter', sp:[
          {q:'Hva kalles vinkelen mellom loddlinja og én part?',a:['Arbeidsvinkel','Toppvinkel','Løftevinkel','Helningsvinkel'],r:0,f:'Arbeidsvinkelen (β) brukes i løftetabellene.'},
          {q:'Hva er største tillatte arbeidsvinkel?',a:['60°','45°','90°','120°'],r:0,f:'60° arbeidsvinkel tilsvarer 120° toppvinkel.'},
          {q:'Arbeidsvinkelen er 40°. Hvor stor er toppvinkelen?',a:['80°','40°','20°','140°'],r:0,f:'Toppvinkelen er dobbelt så stor som arbeidsvinkelen.'},
          {q:'Hvilken faktor gjelder for snaring?',a:['0,8','1,0','1,4','2,0'],r:0,f:'Snaring reduserer arbeidslasten med 20 %.'},
          {q:'Ved 60° arbeidsvinkel med to parter – hvor stor er kraften i hver part?',a:['Like stor som hele lasten','Halvparten av lasten','Dobbelt så stor som lasten','Null'],r:0,f:'Derfor er faktoren 1,0 for to parter ved 45–60°.'}
        ]},
        { type:'quiz', id:'tabell-q2', nivaa:2, tittel:'Regn ut arbeidslasten', sp:[
          {q:'Gul fiberstropp (3 t) brukes i snaring. Hva er arbeidslasten?',a:['2,4 t','3 t','6 t','1,5 t'],r:0,f:'3 × 0,8 = 2,4 t.'},
          {q:'Grønn stropp (2 t) i U-løft med loddrette parter. Hva er arbeidslasten?',a:['4 t','2 t','2,8 t','1,6 t'],r:0,f:'2 × 2,0 = 4 t.'},
          {q:'To røde stropper (5 t) i 2 parter, arbeidsvinkel 40°. Hva er arbeidslasten?',a:['7 t','10 t','5 t','8 t'],r:0,f:'40° er under 45°: 5 × 1,4 = 7 t.'},
          {q:'Samme stropper, men arbeidsvinkelen er 55°. Hva er arbeidslasten?',a:['5 t','7 t','10 t','2,5 t'],r:0,f:'Mellom 45° og 60°: faktor 1,0. 5 × 1,0 = 5 t.'},
          {q:'Kjettingredskap Grade 80, 13 mm, 2 parter, 30° arbeidsvinkel. Hva sier tabellen?',a:['7,5 t','5,3 t','10,6 t','11,2 t'],r:0,f:'Les av i kolonnen 2 parter 0–45°: 7,5 t.'},
          {q:'Firepartsredskap med fiolette stropper (1 t), 30° arbeidsvinkel, symmetrisk last. Hva er arbeidslasten?',a:['2,1 t','4 t','1,4 t','1,5 t'],r:0,f:'1 × 2,1 = 2,1 t – ikke 4 t, fordi partene sjelden bærer helt likt.'}
        ]},
        { type:'case', id:'tabell-case', nivaa:3, tittel:'Case: Containeren med utstyr', intro:'En liten container skal løftes. Den veier 3,5 tonn med innhold, og lasten inni står ujevnt fordelt. Dere har et firepartsredskap av kjetting, Grade 80, 8 mm. Arbeidsvinkelen blir ca. 35°.', steg:[
          {q:'Hva sier tabellen hvis lasten er symmetrisk?',valg:[{t:'4,25 t (3–4 parter 0–45°)',ok:true,f:'Les av i kolonnen for 3–4 parter, 0–45°.'},{t:'8 t (4 × 2 t)',ok:false,f:'Du kan ikke bare gange med antall parter.'},{t:'2,8 t (2 parter)',ok:false,f:'Det er verdien for 2 parter.'}]},
          {q:'Lasten er usymmetrisk. Hva regner du med?',valg:[{t:'At bare to parter bærer: 2,8 t',ok:true,f:'Usymmetrisk med 3–4 parter: bruk verdien for 2 parter.'},{t:'At alle fire bærer likt',ok:false,f:'Det stemmer ikke når tyngdepunktet er forskjøvet.'},{t:'At ingen part bærer mer enn 1 tonn',ok:false,f:'Med skjev last kan to parter få nesten hele vekten.'}]},
          {q:'Containeren veier 3,5 t. Hva gjør du?',valg:[{t:'Velger et kraftigere redskap (f.eks. 10 mm), eller fordeler lasten jevnt og vurderer på nytt',ok:true,f:'2,8 t er for lite for 3,5 t. 10 mm gir 4,25 t for 2 parter 0–45°.'},{t:'Løfter likevel, siden 4,25 t er over 3,5 t',ok:false,f:'Med usymmetrisk last er det sikre tallet 2,8 t.'},{t:'Øker arbeidsvinkelen',ok:false,f:'Større vinkel gir enda større kraft i partene.'}]}
        ]},
        { type:'reflect', id:'tabell-r1', nivaa:3, tittel:'Forklar for en ny kollega', q:'En ny kollega tror at to stropper på 2 tonn alltid kan løfte 4 tonn. Forklar hvorfor det er feil. Bruk arbeidsvinkel, faktorer og et regneeksempel – og si hva som skjer hvis lasten er usymmetrisk.', punkter:['forklarer at kraften i partene øker med arbeidsvinkelen','nevner at over 60° arbeidsvinkel ikke er tillatt','bruker riktig faktor for to parter (1,4 eller 1,0)','viser et korrekt regneeksempel','forklarer at usymmetrisk last med 2 parter regnes som én part','sier at produsentens tabell alltid skal brukes'] }
      ]
    },
    /* ================================================================ G11-05 */
    {
      id: 'anhuking', lok: 'G11-05', tittel: 'Anhuking i praksis',
      kort: 'Planlegg løftet, finn tyngdepunktet, bruk sjakler og løftepunkter riktig og gjør prøveløft.',
      bok: BOK + ', kap. 6, 12–15 og 22 (sjekklister) · Opplæringsplan G11, leksjon 2, 3 og 6',
      mal: ['planlegge et løft fra start til slutt','anhuke en last slik at den henger stabilt','bruke sjakler, øyebolter, løftepunkter, kantbeskyttelse og styretau riktig'],
      punkter: [
        'Finn ut hva lasten <b>veier</b> og hvor <b>tyngdepunktet</b> er. Kroken skal være rett over tyngdepunktet – ellers tipper lasten.',
        'Bruk lastens <b>løftepunkter</b> og følg <b>løfteanvisningen</b>: Har en maskin fire løfteører, bruker du alle fire. Det er produsenten som har beregnet hva de tåler.',
        '<b>Øyebolter</b> skal skrus helt inn. De tåler mye mindre på skrå enn rett opp – sjekk tabellen for øyebolten. <b>Buesjakkel med bolt, mutter og splint</b>: Mutteren skal ikke trekkes til, bolten skal kunne rotere, og splinten skal være en <b>saksesplint</b>.',
        'Legg <b>kantbeskyttelse</b> der stroppen går over skarpe kanter. Bruker du bare to av partene i et firepartsredskap, skal de løse partene <b>hektes opp i toppringen</b>.',
        'Gjør et <b>prøveløft</b>: Løft lasten noen centimeter, stopp og kontroller at den henger stabilt og at redskapet sitter riktig.',
        'Bruk <b>styretau</b> uten knuter, holdt løst i hånda – aldri hendene på hengende last. Sett lasten ned på <b>klosser</b>, så stroppene kan tas ut uten klemfare.'
      ],
      ndla: [N.bruk, N.g11, N.operator],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'anhuking-voks', tittel:'Planlegg sammen', tekst:['De fleste ulykker ved løft skjer ikke fordi folk ikke kan nok, men fordi de ikke snakket sammen før de startet.','Et kort møte før løftet – hvem gjør hva, hva kan gå galt, hvor går vi hvis noe skjer – er ofte det viktigste sikkerhetstiltaket.'], sporsmal:['Hvorfor hopper folk over planleggingen når de har dårlig tid?','Hva er ett spørsmål dere alltid bør stille hverandre før dere starter en praktisk oppgave?'], handling:'Start neste praktiske oppgave med et 1-minutts planleggingsmøte.' },
        { type:'flash', id:'anhuking-flash', tittel:'Begrepskort: anhuking', kort:[
          ['Tyngdepunkt','Punktet der lasten er i balanse. Kroken skal være rett over det.'],
          ['Løftepunkt','Fast punkt på lasten som er laget for løft, for eksempel et påsveiset løfteøre.'],
          ['Løfteanvisning','Produsentens beskrivelse av hvordan lasten skal løftes.'],
          ['Saksesplint','Splint som sikrer mutteren på en sjakkel med roterende bolt.'],
          ['Kantbeskyttelse','Beskyttelse mellom stropp og skarp kant.'],
          ['Prøveløft','Løft noen centimeter, stopp og kontroller.'],
          ['Styretau','Tau uten knuter som brukes til å styre lasten på avstand.'],
          ['SJA','Sikker jobbanalyse – en gjennomgang av farer og tiltak før jobben starter.']
        ]},
        { type:'hotspot', id:'anhuking-hs1', nivaa:1, tittel:'Finn fram i løftet', instr:'Tegningen viser en kasse som løftes med to stropper. Trykk på riktig sted.', svg:SVG_LOFT, sp:[
          { q:'Hvor skal sikkerhetslåsen være?', z:'krok', f:'På kroken. Den hindrer at redskapet hopper av.' },
          { q:'Trykk på koblingen der stroppene samles.', z:'sjakkel', f:'Sjakkelen. Stroppene skal ligge i bøylen.' },
          { q:'Trykk på arbeidsvinkelen.', z:'vinkel', f:'Arbeidsvinkelen måles mellom loddlinja og én part.' },
          { q:'Hvor trenger stroppene kantbeskyttelse?', z:'kant', f:'Over de skarpe kantene på kassen.' },
          { q:'Hvor er tyngdepunktet til kassen?', z:'tp', f:'Kroken skal være rett over tyngdepunktet.' },
          { q:'Hva bruker du for å styre lasten uten å ta på den?', z:'styretau', f:'Styretauet. Hold det løst og aldri viklet rundt hånda.' }
        ]},
        { type:'order', id:'anhuking-o1', nivaa:2, tittel:'Gjennomfør løftet', instr:'Sett stegene i et løft i riktig rekkefølge.', steg:[
          'Finn vekt og tyngdepunkt og planlegg løftet','Avtal roller og signaler med kranføreren','Gjør førbrukskontroll av løfteredskapet','Anhuk lasten og legg på kantbeskyttelse','Gå unna og gi signal om å stramme','Gjør et prøveløft og kontroller','Løft og flytt lasten med styretau','Sett lasten ned på klosser og avhuk'
        ], f:'Planlegging og kontroll kommer før selve løftet.' },
        { type:'tf', id:'anhuking-tf', nivaa:2, tittel:'Sant eller usant: anhuking', ps:[
          ['Hvis kroken ikke er over tyngdepunktet, vil lasten tippe når den løftes.',true,'Lasten svinger til tyngdepunktet havner under kroken.'],
          ['Har en maskin fire løfteører, kan du bruke to av dem hvis stroppene er sterke nok.',false,'Følg løfteanvisningen og bruk alle fire.'],
          ['Mutteren på en buesjakkel med roterende bolt skal trekkes godt til med verktøy.',false,'Mutteren skal ikke trekkes til. Bolten skal kunne rotere, og mutteren sikres med saksesplint.'],
          ['En øyebolt tåler like mye på skrå som rett opp.',false,'Øyebolter tåler mye mindre ved skrå belastning.'],
          ['Løse parter i et firepartsredskap kan henge fritt.',false,'Hekt dem opp i toppringen så de ikke hekter seg fast eller treffer noen.'],
          ['Prøveløft gjør at du oppdager feil før lasten er høyt oppe.',true,'Stopp, kontroller og juster om nødvendig.']
        ]},
        { type:'case', id:'anhuking-case', nivaa:3, tittel:'Case: Maskinen som tipper', intro:'Du skal løfte en kompressor på 900 kg med to rundslinger. Når kranføreren strammer, begynner kompressoren å tippe mot den ene siden.', steg:[
          {q:'Hva gjør du først?',valg:[{t:'Gir stoppsignal og ber kranføreren senke lasten',ok:true,f:'Stopp før du gjør noe annet.'},{t:'Holder igjen kompressoren med hendene',ok:false,f:'Du kan bli klemt.'},{t:'Ber kranføreren løfte raskere',ok:false,f:'Det gjør tippingen verre.'}]},
          {q:'Hva er den sannsynlige årsaken?',valg:[{t:'Kroken er ikke rett over tyngdepunktet',ok:true,f:'Motoren gjør at tyngdepunktet ligger nærmere én side.'},{t:'Stroppene har feil farge',ok:false,f:'Fargen sier noe om arbeidslast, ikke om balanse.'},{t:'Kranen er for liten',ok:false,f:'Kapasiteten forklarer ikke tippingen.'}]},
          {q:'Hvordan retter du det?',valg:[{t:'Bruker løftepunktene og løfteanvisningen, flytter anhukingen eller korter inn så kroken kommer over tyngdepunktet, og gjør nytt prøveløft',ok:true,f:'Prøveløftet viser om lasten nå henger stabilt. Husk: Korter du inn en rundsling, reduseres arbeidslasten.'},{t:'Løfter likevel og styrer med styretau',ok:false,f:'Styretau er ikke til å holde lasten i balanse.'},{t:'Legger på en ekstra stropp tilfeldig',ok:false,f:'Det må planlegges ut fra tyngdepunktet.'}]}
        ]}
      ]
    },
    /* ================================================================ G11-06 */
    {
      id: 'signaler', lok: 'G11-06', tittel: 'Signaler og kommunikasjon',
      kort: 'Håndsignaler og radiokommunikasjon mellom signalgiver og kranfører.',
      bok: BOK + ', kap. 21 · Opplæringsplan G11, leksjon 4',
      mal: ['vise og forstå de vanligste håndsignalene','kommunisere tydelig med kranføreren på radio, også med bekreftende kommunikasjon','forklare hva kranføreren skal gjøre når signalene er uklare'],
      punkter: [
        'Det skal være <b>én signalgiver</b>, og han eller hun skal stå der kranføreren kan se signalene, med full oversikt over lasten og på et trygt sted.',
        '<b>Start/klar:</b> begge armene ut til sidene, håndflatene fram. <b>Stopp:</b> høyre arm rett opp, håndflaten fram. <b>Slutt:</b> hendene foldet foran brystet.',
        '<b>Heis:</b> høyre arm opp, håndflaten fram, med langsomme sirkler. <b>Senk:</b> høyre arm ned, håndflaten inn, med langsomme sirkler. <b>Fare / nødstopp:</b> begge armene rett opp, håndflatene fram.',
        'Ved <b>radio</b>: Test sambandet først, snakk kort og tydelig og bytt kanal bare etter avtale. Ved <b>bekreftende kommunikasjon</b> gjentar kranføreren kommandoen fra signalgiveren.',
        'Ser ikke kranføreren lasten (<b>blindløft</b>), skal det være <b>kontinuerlig</b> kommunikasjon. Blir det stille på radioen, skal kranføreren <b>stoppe</b>.',
        'Forstår ikke kranføreren signalet, skal kranen <b>stanses umiddelbart</b>. <b>Nødstopp</b> skal følges uansett hvem som gir det.'
      ],
      ndla: [N.plan, ['G11 fjernundervisning (PDF)', AT_G11_FJERN, 'Arbeidstilsynet'], N.operator],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'signaler-voks', tittel:'Tydelighet er vennlighet', tekst:['Et utydelig signal kan være farligere enn ingen signal. Kranføreren må gjette – og det er da ulykker skjer.','Å være tydelig er en form for respekt. Det gjelder også når vi gir beskjeder eller tilbakemeldinger til hverandre.'], sporsmal:['Når har en utydelig beskjed skapt problemer for deg?','Hvordan kan du sjekke at den andre har forstått det du mente?'], handling:'Når du gir en beskjed i dag: Be mottakeren gjenta den med egne ord – det er bekreftende kommunikasjon.' },
        { type:'flash', id:'signaler-flash', tittel:'Begrepskort: signaler', kort:[
          ['Start / klar','Begge armene ut til sidene, håndflatene fram.'],
          ['Stopp','Høyre arm rett opp, håndflaten fram.'],
          ['Slutt','Hendene foldet foran brystet.'],
          ['Heis','Høyre arm opp, håndflaten fram, langsomme sirkler.'],
          ['Senk','Høyre arm ned, håndflaten inn, langsomme sirkler.'],
          ['Fare / nødstopp','Begge armene rett opp, håndflatene fram.'],
          ['Bekreftende kommunikasjon','Kranføreren gjentar kommandoen fra signalgiveren før bevegelsen.'],
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
          {q:'Dere har avtalt bekreftende kommunikasjon. Hva betyr det?',a:['Kranføreren gjentar kommandoen fra signalgiveren','Signalgiveren gjentar det kranføreren sier','Begge sier kommandoen to ganger','Det brukes bare når løftet er ferdig'],r:0,f:'Da vet signalgiveren at kranføreren har forstått riktig.'},
          {q:'Kranføreren ser ikke lasten. Hva gjelder for radiokommunikasjonen?',a:['Signalgiveren snakker hele tiden mens lasten er i bevegelse','Det holder med én melding i starten','Kranføreren kjører på følelsen','Man venter til lasten er synlig'],r:0,f:'Ved blindløft skal kranføreren hele tiden få informasjon.'},
          {q:'Hva skal kranføreren gjøre hvis han ikke forstår et signal?',a:['Stanse umiddelbart','Kjøre sakte videre','Fullføre løftet først','Kjøre til nærmeste plass for lasten'],r:0,f:'Uklare signaler betyr stopp.'},
          {q:'En person som ikke er signalgiver, gir tegnet for nødstopp. Hva gjør kranføreren?',a:['Stopper umiddelbart','Ignorerer det','Vurderer selv om det er nødvendig','Stopper bare hvis det er arbeidslederen'],r:0,f:'Nødstopp skal følges uansett hvem som gir det.'},
          {q:'Hvor bør signalgiveren stå?',a:['Synlig for kranføreren, med oversikt over lasten og på et trygt sted','Under lasten for å se best','Bak kranen','Hvor som helst'],r:0,f:'Synlighet, oversikt og egen sikkerhet.'}
        ]},
        { type:'case', id:'signaler-case', nivaa:3, tittel:'Case: Løft over taket', intro:'Du er signalgiver. En pall med takstein skal løftes fra lastebilen og opp på et tak. Kranføreren ser ikke taket fra førerplassen. Dere har radio.', steg:[
          {q:'Hva gjør dere før løftet?',valg:[{t:'Tester radioen, avtaler kanal, faste ord og bekreftende kommunikasjon, og går gjennom løftet',ok:true,f:'Forberedelse hindrer misforståelser.'},{t:'Starter med en gang og tar det underveis',ok:false,f:'Et blindløft krever planlegging.'},{t:'Bruker bare håndsignaler',ok:false,f:'Kranføreren ser deg ikke når lasten er over taket.'}]},
          {q:'Lasten nærmer seg taket. Hvordan kommuniserer du?',valg:[{t:'Korte, faste beskjeder hele tiden: «Senk sakte … sakte … stopp»',ok:true,f:'Kontinuerlig kommunikasjon ved blindløft.'},{t:'Én lang forklaring',ok:false,f:'Lange meldinger tar for lang tid.'},{t:'Venter med å si noe til lasten står',ok:false,f:'Da vet ikke kranføreren hva som skjer.'}]},
          {q:'En taktekker går inn under lasten. Hva gjør du?',valg:[{t:'Sier «STOPP» tydelig på radio og varsler taktekkeren',ok:true,f:'Ingen under hengende last.'},{t:'Ber kranføreren senke raskere',ok:false,f:'Det øker faren.'},{t:'Ingenting – taktekkeren har ansvaret selv',ok:false,f:'Alle har plikt til å si fra om fare.'}]}
        ]},
        { type:'reflect', id:'signaler-r1', nivaa:3, tittel:'Lag en kommunikasjonsplan', q:'Dere skal løfte en container inn i en bakgård der kranføreren ikke ser landingsplassen. Lag en kort plan for kommunikasjonen: hvem som gjør hva, hvilke ord dere bruker, og hva som skjer hvis radioen faller ut.', punkter:['bestemmer én signalgiver','tester radio og avtaler kanal før løftet','bruker korte, faste kommandoer','avtaler bekreftende kommunikasjon','sier at kranføreren stopper hvis sambandet faller ut','sørger for at ingen er under lasten'] }
      ]
    },
    /* ================================================================ G11-07 */
    {
      id: 'ulykker', lok: 'G11-07', tittel: 'Lær av ulykker',
      kort: 'Ekte hendelser fra byggeplasser – hva gikk galt, hvilke barrierer virket, og hva kunne vært gjort?',
      bok: BOK + ', kap. 3 (HMS, ulykker og ansvar) og kap. 22 (sikkerhetsregler)',
      mal: ['skille mellom direkte og bakenforliggende årsaker til en ulykke','forklare hvilke barrierer som hindret at det gikk verre','foreslå tiltak som hindrer at det skjer igjen'],
      punkter: [
        'Hendelsene her er <b>ekte</b>, men gjenfortalt kort og uten navn. De fleste gikk bra – fordi noen fulgte reglene.',
        'En <b>direkte årsak</b> er det som utløste hendelsen, for eksempel feil anhuking. En <b>bakenforliggende årsak</b> ligger bak, for eksempel dårlig planlegging, manglende opplæring eller at ingen gjorde en SJA.',
        'En <b>barriere</b> er noe som hindrer at en feil blir til en ulykke – for eksempel at ingen sto under lasten.',
        'Rapporter <b>nestenulykker</b> og uønskede hendelser (RUH). Da kan andre lære før noen blir skadet.',
        '«Vi har gjort det sånn før» er en farlig setning. Når forholdene endrer seg – vær, last, folk eller utstyr – må risikoen vurderes på nytt.'
      ],
      ndla: [N.bruk, N.g11, N.plan],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'ulykker-voks', tittel:'Å si fra er å bry seg', tekst:['I én av hendelsene oppdaget fagarbeidere at stroppene på en leveranse var kuttet og skjøtet. De stoppet løftet. Ingen ble skadet.','Det krever mot å stoppe en jobb som andre vil ha gjort fort. Men det er akkurat det som skiller en nestenulykke fra en ulykke.'], sporsmal:['Hva gjør det lettere for deg å si fra?','Hvordan kan du reagere når en annen stopper arbeidet ditt fordi noe er utrygt?'], handling:'Takk den neste som sier fra om noe utrygt – også om det var din feil.' },
        { type:'flash', id:'ulykker-flash', tittel:'Begrepskort: ulykker og læring', kort:[
          ['Direkte årsak','Det som utløste hendelsen, for eksempel at stroppen var feil lagt.'],
          ['Bakenforliggende årsak','Det som lå bak, for eksempel manglende planlegging, opplæring eller rutiner.'],
          ['Barriere','Noe som hindrer at en feil blir til en ulykke, for eksempel at ingen står under lasten.'],
          ['Nestenulykke','En hendelse som kunne ført til skade, men ikke gjorde det.'],
          ['RUH','Rapport om uønsket hendelse. Brukes for å lære og hindre gjentakelse.'],
          ['SJA','Sikker jobbanalyse. Gjøres før risikofylte jobber og når forholdene endrer seg.'],
          ['Fareblind','Når vi har gjort noe så mange ganger at vi slutter å se faren.']
        ]},
        { type:'quiz', id:'ulykker-q1', nivaa:1, tittel:'Hva skjedde?', sp:[
          {q:'En gipspakke på ca. 900 kg skled av en plategaffel fra 5 meters høyde. Det var minusgrader og litt snø. Hvorfor ble ingen skadet?',a:['Anhukeren sto ikke under lasten, og kranføreren svingte lasten bort fra ham','Gipspakken var lett','Pakken var stroppet','Det var tilfeldig at ingen var der'],r:0,f:'Regelen «ikke gå under hengende last» virket som en barriere.'},
          {q:'En kum med flere seksjoner ble løftet i den nederste delen. Mens den hang, tippet den, og de øverste delene falt ned. Hva var den direkte årsaken?',a:['Tyngdepunktet var over anhukingspunktet, og stroppene var for lange','Kranen var for liten','Det blåste for mye','Kranføreren var syk'],r:0,f:'Når tyngdepunktet ligger over anhukingspunktet, kan lasten tippe.'},
          {q:'Støttehjulet på en kompressor falt av under et løft fordi en splint var knekt. Hvilket tiltak ble anbefalt?',a:['Sikre nesehjulet med wire eller kjetting og sjakler før løft','Løfte saktere','Bruke en større kran','Fjerne hjulet for godt'],r:0,f:'Løse deler på lasten må sikres før løftet.'},
          {q:'Skallvegger kom på bil med stropper fra leverandøren. Stroppene var kuttet, skjøtet og for svake. Hva er riktig?',a:['Stoppe løftet og bruke de innstøpte løftepunktene med godkjent redskap','Bruke stroppene, siden de fulgte med','Doble stroppene','Løfte forsiktig'],r:0,f:'Redskap som følger med lasten, skal ikke brukes hvis det ikke er godkjent og uskadet.'}
        ]},
        { type:'sort', id:'ulykker-s1', nivaa:2, tittel:'Direkte eller bakenforliggende årsak?', instr:'Sorter årsakene fra hendelsene.', kat:['Direkte årsak','Bakenforliggende årsak'], items:[
          ['Gipspakken skled på den glatte plategaffelen',0,'Dette utløste hendelsen.'],
          ['Ingen vurderte at kulde og snø gjorde løftet mer risikofylt',1,'Manglende risikovurdering lå bak.'],
          ['Liften skled ut av den ene stroppen i U-løftet',0,'Dette utløste hendelsen.'],
          ['Radioen ble ikke brukt, så anhukeren fikk ikke varslet kranføreren',1,'Manglende kommunikasjon lå bak.'],
          ['Hovedstroppen fikk for dårlig klem fordi sikringsstroppen tok vekten',0,'Feil stropping utløste hendelsen.'],
          ['SJA-en handlet mest om vind og lite om stroppingen',1,'Planleggingen dekket ikke den viktigste faren.'],
          ['Løfteutstyr ble ikke årskontrollert og ble oppbevart feil',1,'Manglende rutiner lå bak.'],
          ['En krok manglet sikkerhetslås',0,'Defekt utstyr var den direkte årsaken.']
        ], f:'Bakenforliggende årsaker er ofte organisatoriske: planlegging, opplæring, rutiner og kommunikasjon.' },
        { type:'case', id:'ulykker-case1', nivaa:2, tittel:'Case: Liften som skled ut', intro:'En personløfter (lift) skulle flyttes fra taket ned til bakken med kran. Den ble stroppet som et U-løft med to fiberstropper, selv om bruksanvisningen viste egne løftepunkter. Kranføreren så ikke anhukingen. Alle hadde fått radio, men den ble ikke brukt. Folk jobbet i stillaset rett ved siden av.', steg:[
          {q:'Anhukeren ser at liften står utrygt i stroppene etter at løftet har startet. Hva skulle skjedd?',valg:[{t:'Han skulle gitt STOPP på radio med en gang',ok:true,f:'Med åpen radiokommunikasjon kunne liften blitt satt ned igjen.'},{t:'Han skulle løpt etter kranføreren',ok:false,f:'Det tar for lang tid.'},{t:'Ingenting – kranføreren har ansvaret',ok:false,f:'Alle skal si fra om fare.'}]},
          {q:'Hva var feil med anhukingen?',valg:[{t:'Bruksanvisningen ble ikke fulgt – liften skulle vært løftet i løftepunktene',ok:true,f:'Følg alltid produsentens løfteanvisning.'},{t:'Stroppene hadde feil farge',ok:false,f:'Fargen var ikke problemet.'},{t:'Det skulle vært brukt kjetting',ok:false,f:'Problemet var metoden, ikke materialet.'}]},
          {q:'Hva burde gjøres med folkene i stillaset?',valg:[{t:'De skulle vært bedt om å forlate området under løftet',ok:true,f:'Sperr av og hold folk unna løftesonen.'},{t:'Ingenting, de var ikke under lasten',ok:false,f:'Lasten kan svinge og falle utenfor der du tror.'},{t:'De skulle hjulpet til med å styre liften',ok:false,f:'Hold avstand og bruk styretau.'}]}
        ]},
        { type:'case', id:'ulykker-case2', nivaa:3, tittel:'Case: Wirestaget som falt', intro:'Et 1,5 tonn tungt wirestag skulle heises 33 meter opp med mobilkran. Det var brukt en hovedstropp i snaring og en sikringsstropp. Metoden var brukt 16 ganger før. Denne gangen ble lengdene feil, og sikringsstroppen tok vekten. Staget gled ut og falt ned der en bakkemann nettopp hadde stått.', steg:[
          {q:'Hva var den direkte årsaken?',valg:[{t:'Feil lengde på stroppene, så hovedstroppen fikk for dårlig klem',ok:true,f:'Snaringen holdt bare når hovedstroppen tok vekten.'},{t:'Kranen var for liten',ok:false,f:'Kapasiteten var ikke problemet.'},{t:'Det blåste',ok:false,f:'Vinden var ikke årsaken til at staget gled.'}]},
          {q:'En time før ble det gjort en SJA. Hva var svakheten?',valg:[{t:'Den handlet mest om vind og kollisjonsfare, ikke om stroppingen',ok:true,f:'«Vi gjør som før» erstattet en ny gjennomgang av prosedyren.'},{t:'Det var for mange med',ok:false,f:'Det var innholdet som var svakt.'},{t:'Den ble gjort for tidlig',ok:false,f:'Tidspunktet var greit.'}]},
          {q:'Hvorfor ble ikke bakkemannen skadet?',valg:[{t:'Han merket at staget gikk nedover og løp unna',ok:true,f:'Han sto inne i wirekveilen – altså i fallsonen. Han hadde flaks.'},{t:'Han hadde hjelm',ok:false,f:'Hjelm hjelper ikke mot 1,5 tonn.'},{t:'Kranføreren stoppet staget',ok:false,f:'Staget falt helt ned.'}]},
          {q:'Hvilket tiltak er viktigst?',valg:[{t:'Gå tilbake til en sikrere løftemetode, ny SJA og ingen i fallsonen',ok:true,f:'Både metode, planlegging og plassering av folk må endres.'},{t:'Bruke samme metode, men være mer forsiktig',ok:false,f:'Metoden var sårbar for menneskelige feil.'},{t:'Bare rapportere hendelsen',ok:false,f:'Rapportering er viktig, men tiltak må også gjennomføres.'}]}
        ]},
        { type:'reflect', id:'ulykker-r1', nivaa:3, tittel:'Lag en SJA for gipsløftet', q:'Gipspakken skled av plategaffelen i kulde og snø. Lag en kort sikker jobbanalyse (SJA) for neste gang dere skal løfte gips med kran om vinteren. Ta med farer, tiltak og hvem som gjør hva.', punkter:['nevner at vær og kulde gir mindre friksjon','foreslår å stroppe pakkene eller bruke riktig gaffel for gips','sperrer av området under løftet','sier at ingen skal stå under lasten','avtaler signaler/radio mellom anhuker og kranfører','nevner at tidligere hendelser bør sjekkes for læring'] }
      ]
    },
    /* ================================================================ ØB-01 */
    {
      id: 'ovelsesbank', lok: 'ØB-01', ovelsesbank: true, tittel: 'Øvelsesbank: løfteredskap og løftetabeller',
      kort: '74 repetisjonsoppgaver – fra ord og regler til ekspertregning med løftetabellen. Jobb med dem gjennom hele skoleåret.',
      bok: BOK + ' – sidetallet står på hver oppgave',
      mal: ['huske ord, regler og kassasjonskrav for løfteredskap','lese av løftetabellen og regne ut arbeidslast','velge riktig redskap og begrunne valget'],
      punkter: [
        'Ha <b>læreboka</b> og <b>løftetabellen</b> (under) for hånden. Hver oppgave viser hvor i boka svaret står.',
        'Banken har <b>fire deler</b>: ord og regler, redskapene, løftetabellen og ekspert. Start i Del 1, men hopp gjerne dit du trenger å øve.',
        'Skriv tall med komma eller punktum, for eksempel 2,8 – bare tallet, uten benevning.',
        'Står du fast, trykk <b>Hint</b>. Etter to feil kan du se riktig svar.'
      ],
      ekstra: TABELL,
      ndla: [N.qUtstyr, N.qOrd, N.qPersonell],
      aktiviteter: [
        { type:'bank', id:'ob-del1', nivaa:1, kilde:'Boka', rundOpp:false, tittel:'Del 1 – Ord, roller og regler', intro:'Grunnleggende ord, roller og regler. Her øver du på å huske og forstå.', oppg:[
          {k:'mc',q:'Hva er det viktigste målet med sikkerhetsopplæring for anhukere?',o:['Å unngå ulykker og skader','Å få et kursbevis','Å spare penger','Å tilfredsstille myndighetene'],r:0,s:'21–26',tema:'Roller',f:'Opplæringen skal gjøre arbeidet tryggere.',h:'Tenk på hvorfor reglene finnes.'},
          {k:'mc',q:'Hvilken opplæring skal en anhuker og signalgiver ha?',o:['Dokumentert sikkerhetsopplæring','Ingen, bare informasjon','Sertifisert kranførerkurs','Muntlig beskjed fra en erfaren kollega'],r:0,s:'21–26',tema:'Roller',f:'Anhuker og signalgiver skal ha dokumentert sikkerhetsopplæring.',h:'Kranføreren har sertifisert. Hva med anhukeren?'},
          {k:'mc',q:'Hvilken klasse er løfteredskap?',o:['G11','G4','G8','T4'],r:0,s:'10–20',tema:'Roller',f:'G11 er løfteredskap. G4 er bro- og traverskran, G8 lastebilkran.',h:'Se navnet på modulen.'},
          {k:'mc',q:'Hva menes med utstyrsspesifikk opplæring?',o:['Opplæring på det konkrete utstyret du skal bruke, etter bruksanvisningen','Opplæring på alle typer kraner','Opplæring bare for ledere','Et nettkurs'],r:0,s:'21–26',tema:'Roller',f:'Du må kjenne det utstyret du faktisk bruker.',h:'«Utstyr» + «spesifikk».'},
          {k:'mc',q:'Hvem kan stilles ansvarlig etter en arbeidsulykke?',o:['Både arbeidsgiver og arbeidstaker','Bare arbeidsgiveren','Bare den som ble skadet','Ingen'],r:0,s:'29–37',tema:'HMS',f:'Både arbeidsgiver og arbeidstaker har plikter etter arbeidsmiljøloven.',h:'Begge har plikter.'},
          {k:'mc',q:'Hva står RUH for?',o:['Rapport om uønsket hendelse','Regler for utstyr og hjelpemidler','Risiko under heising','Rutine for utlån av hengere'],r:0,s:'29–37',tema:'HMS',f:'Nestenulykker og uønskede hendelser rapporteres så andre kan lære.',h:'Den første bokstaven er «Rapport».'},
          {k:'mc',q:'Hva er en vanlig bakenforliggende årsak til ulykker?',o:['Dårlig planlegging','Feil farge på stroppen','At kranen er ny','At det er mandag'],r:0,s:'29–37',tema:'HMS',f:'Planlegging, opplæring og rutiner er typiske bakenforliggende årsaker.',h:'Hva skjer før selve jobben?'},
          {k:'mc',q:'Har du plikt til å avbryte et løft som kan føre til fare for liv og helse?',o:['Ja','Nei','Bare hvis lederen sier det','Bare hvis du er kranfører'],r:0,s:'40–60',tema:'Lover',f:'Arbeidsmiljøloven gir deg plikt til å avbryte arbeid ved fare.',h:'Sikkerhet går foran.'},
          {k:'mc',q:'Hva betyr det at et løfteredskap er CE-merket?',o:['Produsenten erklærer at det oppfyller sikkerhetskravene','Arbeidstilsynet har kontrollert det','Det er laget i Europa','Det er nytt'],r:0,s:'110–115',tema:'Lover',f:'CE-merket viser at produsenten har vurdert redskapet etter maskinforskriften.',h:'Hvem setter på CE-merket?'},
          {k:'mc',q:'Skal bruksanvisningen for et løfteredskap også beskrive begrensninger for bruken?',o:['Ja, både riktig bruk og hva redskapet ikke skal brukes til','Nei, bare riktig bruk','Bare for redskap over 10 tonn','Nei, det står i løftetabellen'],r:0,s:'110–115',tema:'Lover',f:'Bruksanvisningen skal også advare mot feil bruk.',h:'Begge deler.'},
          {k:'mc',q:'Hva betyr WLL?',o:['Største tillatte arbeidslast','Minste bruddlast','Anbefalt last','Vekten av redskapet'],r:0,s:'143–154',tema:'Ord',f:'Working Load Limit.',h:'Working Load …'},
          {k:'mc',q:'Hva betyr MBL?',o:['Minimum bruddlast','Maksimal brukslast','Merket belastningslengde','Målt belastning'],r:0,s:'143–154',tema:'Ord',f:'MBL er minimum bruddlast – ikke det redskapet skal brukes til.',h:'B-en står for brudd.'},
          {k:'mc',q:'Hva er «løfteutstyr»?',o:['Et samlebegrep for løfteinnretninger, løfteredskap og komponenter','Bare kraner','Bare stropper','Bare kroker'],r:0,s:'143–154',tema:'Ord',f:'Løfteutstyr omfatter både løfteinnretninger og løfteredskap.',h:'Det er det videste begrepet.'},
          {k:'mc',q:'Hva kalles vinkelen mellom loddlinja og én part?',o:['Arbeidsvinkel','Toppvinkel','Alfavinkel','Kantvinkel'],r:0,s:'143–145',tema:'Ord',f:'Arbeidsvinkelen kalles også betavinkel (β).',h:'Den brukes i løftetabellene.'},
          {k:'mc',q:'For hvilken arbeidsvinkel gjelder WLL på merkebrikken til et flerparts redskap?',o:['0–45°','0–30°','0–60°','0–15°'],r:0,s:'143–154',tema:'Ord',f:'Over 45° må du bruke tabellverdien for 45–60°.',h:'Se kolonnene i tabellen.'},
          {k:'mc',q:'Hva er en førbrukskontroll?',o:['Kontroll av redskapet du skal bruke til et bestemt løft','Kontroll av alle redskaper før et prosjekt starter','Årlig sakkyndig kontroll','Kontroll av kranen'],r:0,s:'361',tema:'Sikkerhet',f:'Den gjør du rett før du bruker redskapet.',h:'«Før bruk».'},
          {k:'mc',q:'Hva er riktig bruk av styretau?',o:['Uten knuter og holdt løst i hånda','Viklet rundt hånda for godt grep','Alltid to tau','Det skal ikke brukes'],r:0,s:'361–370',tema:'Sikkerhet',f:'Vikler du tauet rundt hånda, kan du bli dratt med.',h:'Tenk på hva som skjer om lasten svinger.'},
          {k:'mc',q:'Hva bør anhukeren forsikre seg om før løftet?',o:['At vekt, tyngdepunkt og kanter er vurdert','At kranføreren har spist','At lasten er malt','At det er sol'],r:0,s:'361–370',tema:'Sikkerhet',f:'Vekt, tyngdepunkt og skarpe kanter er grunnleggende.',h:'Se sjekklista for anhuking.'}
        ]},
        { type:'bank', id:'ob-del2', nivaa:2, kilde:'Boka', rundOpp:false, tittel:'Del 2 – Redskapene', intro:'Fiber, kjetting, ståltau, sjakler, øyebolter og andre redskaper: merking, bruk og kassering.', oppg:[
          {k:'mc',q:'Hvilken farge har merkelappen på en stropp av polyester?',o:['Blå','Brun','Grønn','Hvit'],r:0,s:'175–204',tema:'Fiber',f:'Blå = polyester, grønn = polyamid, brun = polypropylen.',h:'Merkelappen – ikke stroppen.'},
          {k:'mc',q:'Hvilket temperaturområde gjelder for polyesterstropper?',o:['-40 °C til +100 °C','-40 °C til +120 °C','0 °C til +80 °C','Alle temperaturer'],r:0,s:'175–204',tema:'Fiber',f:'Polypropylen tåler bare opptil ca. +80 °C.',h:'Rundt kokepunktet for vann.'},
          {k:'mc',q:'Hva skjer med arbeidslasten når du korter inn en rundsling?',o:['Den må reduseres med 20 %','Den er uendret','Den dobles','Den reduseres med 5 %'],r:0,s:'184–190',tema:'Fiber',f:'Innkorting gir knekk og ekstra belastning.',h:'Samme tall som for snaring.'},
          {k:'mc',q:'Når skal en rundsling kasseres?',o:['Når bærende fibre er synlige','Når den er skitten','Når den har vært i kulde','Når den er to år gammel'],r:0,s:'180–183',tema:'Fiber',f:'Kappen beskytter de bærende fibrene. Ser du dem, er stroppen skadet.',h:'Kappen og innmaten.'},
          {k:'mc',q:'En blå båndstropp ser fin ut, men merkelappen mangler. Hva gjør du?',o:['Kasserer den','Bruker den til 8 t','Bruker den til halv last','Skriver en ny lapp'],r:0,s:'175–204',tema:'Fiber',f:'Uten merkelapp vet du ikke hva den tåler.',h:'Hva er det som gjelder – fargen eller lappen?'},
          {k:'mc',q:'Hvorfor er fiberstropper et dårlig valg til korte armeringsjern?',o:['Korte jern kan gli ut, og stroppen skades lett av kantene','De tåler ikke vekten','Merkelappen faller av','De er for lange'],r:0,s:'191–199',tema:'Fiber',f:'Bruk redskap som hindrer at jern glir ut, og beskytt mot skarpe kanter.',h:'Tenk på friksjon og kanter.'},
          {k:'mc',q:'Hvilken kjettingkvalitet brukes til løfteredskap?',o:['Grade 80 og 100','Grade 30 og 40','Grade 50','Hvilken som helst'],r:0,s:'207–212',tema:'Kjetting',f:'Til løft brukes kortleddet kjetting av minst Grade 80.',h:'Høy kvalitet.'},
          {k:'mc',q:'Hvor høy temperatur tåler Grade 80-kjetting uten at arbeidslasten må reduseres?',o:['+200 °C','+100 °C','+150 °C','+300 °C'],r:0,s:'207–212',tema:'Kjetting',f:'Over +200 °C må arbeidslasten reduseres.',h:'Mye mer enn fiber.'},
          {k:'mc',q:'Hvor mye godsslitasje kan godtas på kjetting?',o:['Inntil 10 %','Inntil 2 %','Inntil 20 %','Ingen'],r:0,s:'230–236',tema:'Kjetting',f:'Mer enn 10 % slitasje – kasser.',h:'Et rundt tall.'},
          {k:'mc',q:'Du bruker bare to av fire parter i et kjettingredskap. Hva gjør du med de to andre?',o:['Hekter dem opp i toppringen','Lar dem henge fritt','Hekter dem i lasten for å doble WLL','Kutter dem av'],r:0,s:'226–229',tema:'Kjetting',f:'Løse kroker kan hekte seg fast eller treffe noen.',h:'Sikre dem.'},
          {k:'mc',q:'Hvilke bokstaver betyr at et ståltau har stålkjerne?',o:['IWRC','FC','WRIC','SK'],r:0,s:'239–250',tema:'Ståltau',f:'IWRC = Independent Wire Rope Core. FC = fiberkjerne.',h:'Fire bokstaver.'},
          {k:'mc',q:'Hvilket ståltau tåler høyest temperatur?',o:['IWRC (stålkjerne)','FC (fiberkjerne)','Begge tåler like mye','Ingen av dem tåler varme'],r:0,s:'239–250',tema:'Ståltau',f:'FC tåler ca. +100 °C, IWRC ca. +150 °C.',h:'Hva tåler varme best – fiber eller stål?'},
          {k:'mc',q:'En ståltaustropp har fått en knekk. Hva gjør du?',o:['Kasserer den','Retter den ut med presse','Reduserer WLL med 10 %','Bruker den videre'],r:0,s:'248–250',tema:'Ståltau',f:'Knekk er varig deformasjon.',h:'Kan du stole på en bøyd wire?'},
          {k:'mc',q:'Hvilken merking skal det være på sjakler til løft?',o:['WLL, ID-merke fra produsent og CE','Bare CE','Bare WLL','MBL'],r:0,s:'277–286',tema:'Sjakler',f:'Sjakler til løft skal være merket med WLL, være sporbare og CE-merket.',h:'Tre ting.'},
          {k:'mc',q:'Hva er riktig for en buesjakkel med roterende bolt, mutter og splint?',o:['Mutteren trekkes ikke til, bolten skal rotere, og det brukes splint','Mutteren trekkes godt til, da trengs ikke splint','Splint trengs ikke ved enkle løft','Bolten skal sveises fast'],r:0,s:'281–283',tema:'Sjakler',f:'Bolten skal kunne rotere når stroppen beveger seg.',h:'Navnet sier «roterende».'},
          {k:'mc',q:'Hvilken splint skal brukes i en sjakkel med mutter på land?',o:['Saksesplint (splittpinne)','Hurtigsplint','Ståltråd','Ingen'],r:0,s:'281–283',tema:'Sjakler',f:'Saksesplinten kan ikke riste løs.',h:'Den bøyes ut.'},
          {k:'mc',q:'En øyebolt er merket M20. Hva betyr det?',o:['Den passer i hull med 20 mm gjenger','Den tåler 20 tonn','Den tåler 20 kg','Den er 20 cm lang'],r:0,s:'287–297',tema:'Øyebolter',f:'M20 er gjengedimensjonen.',h:'M = metrisk gjenge.'},
          {k:'mc',q:'Hva er viktig når du skrur inn en øyebolt?',o:['Den skal skrus helt inn til anlegg','Den kan stå litt ute','Den skal skrus inn med maskin','Gjengene skal smøres med lim'],r:0,s:'287–297',tema:'Øyebolter',f:'En øyebolt som ikke står til anlegg, kan bøyes eller knekke.',h:'Helt inn.'},
          {k:'mc',q:'En maskin har fire påsveisede løfteører. Når kan du bruke bare to?',o:['Aldri – følg løfteanvisningen og bruk alle fire','Når de står diagonalt','Når stroppene er sterke nok','Når maskinen er lett'],r:0,s:'339–343',tema:'Løftepunkter',f:'Produsenten har beregnet løftet med alle løftepunktene.',h:'Hvem har beregnet løftepunktene?'},
          {k:'mc',q:'Hvem har ansvaret for å beregne løftepunktene på en maskin og levere løfteanvisning?',o:['Produsenten av maskinen','Kranføreren','Anhukeren','Kunden'],r:0,s:'339–343',tema:'Løftepunkter',f:'Følg alltid produsentens løfteanvisning.',h:'Den som har laget maskinen.'},
          {k:'mc',q:'Kan en pallegaffel for europaller brukes til gipsplater?',o:['Nei, det skal brukes en gaffel laget for gips','Ja, hvis vekten er under halvparten','Ja, hvis det ikke er så høyt','Ja, alltid'],r:0,s:'300–303',tema:'Andre redskaper',f:'Gipspakker kan gli av en vanlig pallegaffel – se også G11-07.',h:'Husk ulykken med gipspakken.'},
          {k:'mc',q:'Hva er riktig ved løft av en europall med pallegaffel?',o:['Gaffelen skyves helt inn, og lasten er sikret','Det kan være 5 cm klaring','Pallen trenger ikke kontroll','Lasten trenger ikke sikring'],r:0,s:'300–303',tema:'Andre redskaper',f:'Skyv helt inn og sikre lasten så ingenting faller av.',h:'Helt inn.'},
          {k:'mc',q:'Hvor mange plater kan du løfte samtidig med en vanlig plateklype?',o:['1','2','3','4'],r:0,s:'325–328',tema:'Andre redskaper',f:'Plateklypa er laget for én plate om gangen.',h:'Én klype – …'},
          {k:'mc',q:'Et løfteåk er merket WLL 5 tonn. Hva gjelder?',o:['Det kan belastes med 5 t slik løfteanvisningen for åket beskriver','Alltid 5 t uansett vinkel','5 t bare under 45°','5 t bare under 60°'],r:0,s:'317–320',tema:'Andre redskaper',f:'Følg løfteanvisningen for åket.',h:'Hva sier produsenten?'}
        ]},
        { type:'bank', id:'ob-del3', nivaa:2, kilde:'Boka', rundOpp:false, tittel:'Del 3 – Løftetabellen', intro:'Bruk løftetabellen over (eller tabellen fra produsenten). Svar med tall i tonn, mm eller grader.', oppg:[
          {k:'num',q:'Grønn fiberstropp i rett løft. Hva er arbeidslasten?',ans:2,u:'tonn',s:'163–164',tema:'Fiber',f:'Grønn = 2 tonn i rett løft.',h:'Fargekoden.'},
          {k:'num',q:'Gul fiberstropp, snaret. Hva er arbeidslasten?',ans:2.4,u:'tonn',s:'163–164',tema:'Fiber',f:'3 × 0,8 = 2,4 t.',h:'Snaring: × 0,8.'},
          {k:'num',q:'Rød båndstropp i U-løft med loddrette parter. Hva er arbeidslasten?',ans:10,u:'tonn',s:'163–164',tema:'Fiber',f:'5 × 2 = 10 t.',h:'U-løft loddrett: × 2.'},
          {k:'num',q:'To grå fiberstropper, 2 parter, arbeidsvinkel 30°, symmetrisk. Hva er arbeidslasten?',ans:5.6,u:'tonn',s:'163–164',tema:'Fiber',f:'4 × 1,4 = 5,6 t.',h:'0–45°: × 1,4.'},
          {k:'num',q:'Samme stropper, men arbeidsvinkel 50°. Hva er arbeidslasten?',ans:4,u:'tonn',s:'163–164',tema:'Fiber',f:'45–60°: 4 × 1,0 = 4 t.',h:'Over 45° endres faktoren.'},
          {k:'num',q:'To røde stropper, 2 parter, 40°, og begge er snaret. Hva er arbeidslasten?',ans:5.6,u:'tonn',s:'163–164',tema:'Fiber',f:'5 × 1,4 × 0,8 = 5,6 t.',h:'Først vinkel, så × 0,8.'},
          {k:'num',q:'Fire fiolette stropper, 4 parter, 40°, symmetrisk last. Hva er arbeidslasten?',ans:2.1,u:'tonn',s:'163–164',tema:'Fiber',f:'1 × 2,1 = 2,1 t.',h:'3–4 parter, 0–45°.'},
          {k:'num',q:'Fire blå stropper, 4 parter, 55°, symmetrisk. Hva er arbeidslasten?',ans:12,u:'tonn',s:'163–164',tema:'Fiber',f:'8 × 1,5 = 12 t.',h:'3–4 parter, 45–60°.'},
          {k:'num',q:'Kjetting Grade 80, 10 mm, 1 part rett. Hva er arbeidslasten?',ans:3.15,u:'tonn',tol:0.01,s:'165',tema:'Kjetting',f:'Les av i tabellen: 3,15 t.',h:'Kolonnen 1 part rett.'},
          {k:'num',q:'Kjetting Grade 80, 13 mm, 2 parter, 40°. Hva sier tabellen?',ans:7.5,u:'tonn',s:'165',tema:'Kjetting',f:'2 parter 0–45°: 7,5 t.',h:'Under 45°.'},
          {k:'num',q:'Kjetting Grade 80, 13 mm, 2 parter, 50°. Hva sier tabellen?',ans:5.3,u:'tonn',tol:0.01,s:'165',tema:'Kjetting',f:'2 parter 45–60°: 5,3 t.',h:'Over 45°.'},
          {k:'num',q:'Kjetting Grade 80, 8 mm, 4 parter, 30°, symmetrisk. Hva sier tabellen?',ans:4.25,u:'tonn',tol:0.01,s:'165',tema:'Kjetting',f:'3–4 parter 0–45°: 4,25 t.',h:'3–4 parter.'},
          {k:'num',q:'Kjetting Grade 80, 10 mm, 2 parter, 35°, snaret. Hva er arbeidslasten?',ans:3.4,u:'tonn',tol:0.01,s:'165',tema:'Kjetting',f:'4,25 × 0,8 = 3,4 t.',h:'Tabellverdi × 0,8.'},
          {k:'num',q:'Kjetting Grade 80, 16 mm, 2 parter. Lasten er usymmetrisk, med arbeidsvinkler 15° og 40°. Hva er arbeidslasten?',ans:8,u:'tonn',s:'168',tema:'Usymmetrisk',f:'Usymmetrisk med 2 parter: bruk 1 part = 8 t.',h:'Hvor mange parter regner du med?'},
          {k:'num',q:'Kjetting Grade 80, 10 mm, 4 parter, 40°, usymmetrisk last. Hva er arbeidslasten?',ans:4.25,u:'tonn',tol:0.01,s:'168',tema:'Usymmetrisk',f:'Usymmetrisk med 3–4 parter: bruk 2 parter 0–45° = 4,25 t.',h:'Regn med to parter.'},
          {k:'num',q:'Lasten veier 3,5 t og løftes symmetrisk med 2 fiberstropper ved 30°. Hvilken WLL (i tonn) må hver stropp minst ha? Velg en farge som finnes.',ans:3,u:'tonn',s:'169–170',tema:'Velg redskap',f:'3,5 ÷ 1,4 = 2,5 → nærmeste farge over er gul, 3 t.',h:'Del lasten på faktoren og velg neste farge opp.'},
          {k:'num',q:'7 t skal løftes symmetrisk med 2-parts kjetting Grade 80 ved 50°. Hvilken diameter (mm) må kjettingen minst ha?',ans:16,u:'mm',s:'169–170',tema:'Velg redskap',f:'2 parter 45–60°: 13 mm = 5,3 t (for lite), 16 mm = 8 t.',h:'Se kolonnen 2 parter 45–60°.'},
          {k:'num',q:'Toppvinkelen mellom to parter er 70°. Hvor stor er arbeidsvinkelen?',ans:35,u:'grader',s:'143–145',tema:'Vinkler',f:'70 ÷ 2 = 35°.',h:'Del på to.'},
          {k:'num',q:'Avstanden mellom anhukingspunktene er 3 m, og hver part er 3 m lang. Omtrent hvor stor er arbeidsvinkelen?',ans:30,u:'grader',tol:1,s:'157–158',tema:'Vinkler',f:'Like lange sider gir en likesidet trekant: arbeidsvinkel ca. 30°.',h:'Tommelfingerregelen under tabellen.'},
          {k:'num',q:'En last på 6 t henger i 2 parter med 60° arbeidsvinkel. Hvor mange tonn trekker det i hver part?',ans:6,u:'tonn',s:'162',tema:'Vinkler',f:'Ved 60° er kraften i hver part like stor som lasten.',h:'Faktoren for 45–60° er 1,0 – hvorfor?'}
        ]},
        { type:'bank', id:'ob-del4', nivaa:3, kilde:'Boka', rundOpp:false, tittel:'Del 4 – Ekspert', intro:'Sammensatte løft, valg av redskap og begrunnelser. Vis hvordan du tenker.', oppg:[
          {k:'num',q:'En last på 8 t skal løftes symmetrisk med 2 fiberstropper ved 40°. Hvilken WLL (tonn) må hver stropp minst ha? Velg en farge som finnes.',ans:6,u:'tonn',s:'169–170',tema:'Velg redskap',f:'8 ÷ 1,4 = 5,7 → brun, 6 t.',h:'Del på faktoren.'},
          {k:'num',q:'Samme last (8 t, 2 parter, 40°) med kjetting Grade 80. Hvilken diameter (mm)?',ans:16,u:'mm',s:'169–170',tema:'Velg redskap',f:'13 mm = 7,5 t (for lite), 16 mm = 11,2 t.',h:'2 parter 0–45°.'},
          {k:'num',q:'En last på 4 t skal snares med 2-parts kjetting Grade 80. Lasten henger usymmetrisk med arbeidsvinkler 10° og 40°. Hvilken diameter (mm) må kjettingen minst ha?',ans:13,u:'mm',s:'168–170',tema:'Usymmetrisk',f:'Usymmetrisk 2 parter = 1 part. Snaret: × 0,8. 10 mm: 3,15 × 0,8 = 2,52 (for lite). 13 mm: 5,3 × 0,8 = 4,24 t.',h:'1 part × 0,8 ≥ 4 t.'},
          {k:'num',q:'Fire fiberstropper med WLL 2, 3, 4 og 5 t brukes sammen, 4 parter, 40°, symmetrisk. Hva er arbeidslasten? Regn med den svakeste stroppen.',ans:4.2,u:'tonn',s:'163–169',tema:'Sammensatt',f:'Den svakeste bestemmer: 2 × 2,1 = 4,2 t.',h:'Kjeden er ikke sterkere enn det svakeste leddet.'},
          {k:'num',q:'En betongbjelke er 0,5 m bred, 0,6 m høy og 4 m lang. Armert betong veier 2,4 t per m³. Hvor mye veier bjelken?',ans:2.88,u:'tonn',tol:0.01,s:'156',tema:'Lastens vekt',f:'0,5 × 0,6 × 4 = 1,2 m³. 1,2 × 2,4 = 2,88 t.',h:'Volum × egenvekt.'},
          {k:'mc',q:'Bjelken (2,88 t) skal løftes symmetrisk med to grønne stropper ved 30°. Holder det?',o:['Nei – 2 × 1,4 = 2,8 t er litt for lite. Velg gule stropper.','Ja – 2 + 2 = 4 t','Ja – det er nesten nok','Ja, hvis man løfter sakte'],r:0,s:'163–169',tema:'Lastens vekt',f:'Kapasiteten (2,8 t) er mindre enn vekten (2,88 t). Gule gir 3 × 1,4 = 4,2 t.',h:'Regn ut kapasiteten og sammenlign.'},
          {k:'mc',q:'Et 2-parts kjettingredskap brukes med begge partene hektet i samme løftepunkt. Hva er riktig?',o:['Kapasiteten blir ikke større enn for én part','Kapasiteten dobles','Kapasiteten er 1,4 × én part','Du bruker kolonnen for 2 parter'],r:0,s:'226–229',tema:'Sammensatt',f:'Partene deler ikke lasten jevnt når de går til samme punkt.',h:'Tenk på hvordan lasten fordeles.'},
          {k:'mc',q:'Et kjettingredskap er satt sammen av komponenter i Grade 80 og Grade 100. Hvordan skal det merkes?',o:['Grade 80','Grade 100','Begge','Det skal ikke merkes'],r:0,s:'211–213',tema:'Sammensatt',f:'Det svakeste leddet bestemmer.',h:'Det svakeste leddet.'},
          {k:'open',q:'Du skal løfte en maskin på 3 t med fire løfteører. Løfteanvisningen viser 4 parter. Dere har bare et 2-parts kjettingredskap. Hva gjør du? Begrunn.',s:'339–343',tema:'Løftepunkter',f:'Følg løfteanvisningen: bruk alle fire løftepunktene med et firepartsredskap (eller et åk slik anvisningen viser). Skaff riktig redskap før løftet. Ikke improviser med to løfteører.'},
          {k:'open',q:'Forklar hvorfor U-løft med båndstropper kan være mer usikkert enn snaring, selv om kapasiteten er dobbelt så stor.',s:'191–199',tema:'Fiber',f:'I U-løft ligger lasten løst i stroppene og kan gli ut hvis den kommer i ubalanse eller vippes. Snaring klemmer rundt lasten. Høy kapasitet betyr ikke at lasten sitter fast. Se også ulykken med liften i G11-07.'},
          {k:'open',q:'Lag en kort sjekkliste (5 punkter) for førbrukskontroll av et kjettingredskap.',s:'230–236',tema:'Kontroll',f:'For eksempel: 1) Merkebrikken finnes og er lesbar. 2) Ingen sprekker, hakk eller deformerte/forlengede ledd. 3) Godsslitasje under 10 %. 4) Kroker uten åpning og med fungerende sikkerhetslås. 5) Ingen varmeskader. Er noe feil: ta det ut av bruk og merk med hvit farge.'},
          {k:'open',q:'Det er -2 °C og snø. Dere skal løfte gipspakker med pallegaffel. Hvilke tiltak gjør du? Bruk det du har lært i G11-07.',s:'300–303',tema:'Ulykker',f:'Vurder risikoen på nytt fordi forholdene er endret. Bruk gaffel laget for gips eller stropp pakkene. Øk friksjonen (antisklibelegg). Sperr av under løftet. Ingen under lasten. Avtal kommunikasjon. Sjekk om det har skjedd lignende hendelser før.'}
        ]}
      ]
    }
  ],
  /* ---------- Øveprøve (egne spørsmål). Teoriprøven fra kurset leses opp på prove/ (kryptert). ---------- */
  avsluttendeProve: {
    tittel: 'Øveprøve G11',
    kort: '20 spørsmål som ligner på teoriprøven. Ha løftetabellen klar.',
    bestaatt: 80,
    tekst: `<h3 style="margin-top:0">Øveprøve G11 – løfteredskap</h3>
      <p>20 spørsmål om roller, redskap, kontroll, løftetabell og signaler. Du kan bruke kalkulator og løftetabellen. Etter hvert svar får du en kort forklaring.</p>
      <p class="small muted">Dette er en øveprøve laget av TLLfluenseren. Teoriprøven du tar på skolen, kan du få lest opp på <a href="prove/">G11 – få teoriprøven lest opp</a> (passord fra læreren).</p>
      <details style="margin-top:10px"><summary><b>Vis løftetabellen</b></summary><div style="margin-top:10px">${TABELL}</div></details>`,
    sp: [
      {tema:'Roller',q:'Hvem gir signaler til kranføreren under et løft?',a:['Signalgiveren','Alle som er i nærheten','Anhukeren og arbeidslederen sammen','Ingen – kranføreren ser selv'],r:0,f:'Det skal være én signalgiver.'},
      {tema:'Roller',q:'Hva er løfteredskap?',a:['Utstyr mellom kranen og lasten, for eksempel stropper og sjakler','Alle typer kraner','Trucker og taljer','Bare kroker'],r:0,f:'Løfteredskap er klasse G11.'},
      {tema:'Roller',q:'Hvilken opplæring skal en anhuker ha?',a:['Dokumentert sikkerhetsopplæring','Ingen','Førerkort klasse C','Bare informasjon fra kranføreren'],r:0,f:'Anhuker og signalgiver skal ha dokumentert sikkerhetsopplæring.'},
      {tema:'HMS',q:'Hva er en vanlig årsak til ulykker ved løft?',a:['Feil anhuking og manglende kontroll av redskapet','At kranen er ny','At det er sol','At lasten er malt'],r:0,f:'Feil stropping er en hovedårsak.'},
      {tema:'Redskap',q:'Hva betyr WLL?',a:['Største tillatte arbeidslast','Minste bruddlast','Anbefalt last','Vekten av redskapet'],r:0,f:'Working Load Limit.'},
      {tema:'Redskap',q:'Hvilken farge har merkelappen på polyesterstropper?',a:['Blå','Brun','Grønn','Gul'],r:0,f:'Blå = polyester.'},
      {tema:'Redskap',q:'Hvilken arbeidslast har en grå fiberstropp i rett løft?',a:['4 t','2 t','3 t','5 t'],r:0,f:'Grå = 4 t.'},
      {tema:'Redskap',q:'Hvilket ståltau velger du i et varmt miljø?',a:['IWRC (stålkjerne)','FC (fiberkjerne)','Det spiller ingen rolle','Polyester'],r:0,f:'IWRC tåler høyere temperatur.'},
      {tema:'Kontroll',q:'En blå båndstropp ser fin ut, men mangler merkelapp. Hva gjør du?',a:['Kasserer den','Løfter 8 t','Løfter halv last','Løfter 6 t'],r:0,f:'Uten merkelapp skal stroppen ikke brukes.'},
      {tema:'Kontroll',q:'Hvor ofte skal løfteredskap ha sakkyndig kontroll?',a:['Minst hver 12. måned','Hvert femte år','Hver dag','Aldri'],r:0,f:'I tillegg til førbrukskontroll.'},
      {tema:'Kontroll',q:'Hvor mye godsslitasje kan godtas på kjetting?',a:['10 %','2 %','25 %','Ingen'],r:0,f:'Mer enn 10 %: kasser.'},
      {tema:'Løftetabell',q:'Hva er største tillatte arbeidsvinkel?',a:['60°','45°','90°','120°'],r:0,f:'60° arbeidsvinkel = 120° toppvinkel.'},
      {tema:'Løftetabell',q:'To røde stropper (5 t), 2 parter, 30°, symmetrisk. Hva er arbeidslasten?',a:['7 t','10 t','5 t','8 t'],r:0,f:'5 × 1,4 = 7 t.'},
      {tema:'Løftetabell',q:'Gul stropp (3 t), snaret. Hva er arbeidslasten?',a:['2,4 t','3 t','6 t','1,5 t'],r:0,f:'3 × 0,8 = 2,4 t.'},
      {tema:'Løftetabell',q:'Kjetting Grade 80, 10 mm, 2 parter, 50°. Hva sier tabellen?',a:['3,15 t','4,25 t','6,3 t','2,52 t'],r:0,f:'2 parter 45–60°: 3,15 t.'},
      {tema:'Løftetabell',q:'Kjetting Grade 80, 16 mm, 2 parter, usymmetrisk last ved 20° og 40°. Hva regner du med?',a:['8 t','11,2 t','16 t','6,4 t'],r:0,f:'Usymmetrisk med 2 parter: bruk 1 part = 8 t.'},
      {tema:'Løftetabell',q:'Hvilken arbeidsvinkel har du når toppvinkelen er 90°?',a:['45°','90°','30°','60°'],r:0,f:'Arbeidsvinkelen er halvparten av toppvinkelen.'},
      {tema:'Anhuking',q:'Hva er fordelen med et løfteåk?',a:['Det fordeler vekten og gir bedre balanse','Du kan løfte mer enn redskapet tåler','Det går raskere','Ingen'],r:0,f:'Åket gir loddrette parter.'},
      {tema:'Anhuking',q:'Hvor mange plater kan du løfte samtidig med en plateklype?',a:['1','2','3','4'],r:0,f:'Én plate om gangen.'},
      {tema:'Signaler',q:'Kranføreren forstår ikke signalet. Hva gjør han?',a:['Stanser umiddelbart','Kjører sakte videre','Fullfører løftet','Kjører til nærmeste avlastningsplass'],r:0,f:'Uklart signal = stopp.'}
    ]
  }
});
})();
