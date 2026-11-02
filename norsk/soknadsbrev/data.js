/* =====================================================================
   NORSK – Slik skriver du et søknadsbrev (Vg2 TLL, yrkesrettede sjangre)
   Alle tekster, oppgaver, eksempler og tegninger er egenprodusert for TLLfluenseren.
   Faglig grunnlag: NDLA Norsk (YF), «Slik skriver du et søknadsbrev» – lenket til, ikke kopiert.
   Personer og firma i oppgavene er oppdiktet.
   Bruker den felles motoren i /transport-logistikk-lofteoperasjoner/felles/.
   ===================================================================== */
(function(){
TLL.FAG = TLL.FAG || { id: 'norsk', navn: 'Norsk' };
const NDLA_SOKNAD = 'https://ndla.no/r/norsk-yf/slik-skriver-du-et-soknadsbrev/c2469bbbe8';

/* ---------- Øvingsannonse (oppdiktet firma) ---------- */
const ANNONSE = `<div class="small muted" style="margin-bottom:6px">ØVINGSANNONSE · firmaet er oppdiktet</div>
<h3 style="font-size:22px;margin:0 0 6px">Lagerkompaniet Vest AS søker lærling i logistikkfaget</h3>
<p>Vi er et tredjepartslager i Sandnes med 40 ansatte. Vi lagrer og sender varer for butikker og nettbutikker på hele Vestlandet.</p>
<p><b>Arbeidsoppgaver:</b> varemottak og kontroll av leveranser, plukk og pakking av ordre med håndskanner, kjøring med truck, opprydding og vareopptelling.</p>
<p><b>Vi ser etter deg som</b></p>
<ul>
<li>går Vg2 transport og logistikk og vil ta fagbrev i logistikkfaget</li>
<li>er nøyaktig og møter presist</li>
<li>liker praktisk og fysisk arbeid</li>
<li>samarbeider godt og sier fra når noe er feil</li>
</ul>
<p><b>Det er en fordel om du</b> har truckførerbevis (T1 og T4) og erfaring fra lager eller butikk.</p>
<p><b>Vi tilbyr</b> en trygg læretid med fast veileder, varierte oppgaver og et godt arbeidsmiljø.</p>
<p><b>Søknad med CV</b> sendes til personalleder Kari Berg, Lagerkompaniet Vest AS, Lagerveien 8, 4313 Sandnes, innen 1. desember. Spørsmål? Ring Kari Berg på 400 00 000.</p>`;

/* ---------- Tegning av et søknadsbrev (SVG). Klikkbare områder har data-z. ---------- */
const S = 'font-family="Inter,system-ui,sans-serif"';
const linjer = (x, y, n, w, gap) => Array.from({length:n}, (_,i) => `<rect x="${x}" y="${y + i*gap}" width="${i === n-1 ? Math.round(w*0.6) : w}" height="6" rx="3" fill="#c9cfd5"/>`).join('');
const SVG_BREV = `<svg viewBox="0 0 520 720" ${S} role="img" aria-label="Tegning av et søknadsbrev med ni deler">
  <rect x="2" y="2" width="516" height="716" rx="4" fill="#ffffff" stroke="#1b2128" stroke-width="2"/>
  <g data-z="avsender"><rect x="24" y="22" width="220" height="78" fill="#f4f6f8" stroke="#9aa3ab"/>
    <g font-size="12" fill="#2b3a48"><text x="34" y="42">Sara Lie</text><text x="34" y="58">Eksempelveien 3</text><text x="34" y="74">4306 Sandnes</text><text x="34" y="90">sara.lie@epost.no · 900 00 000</text></g></g>
  <g data-z="dato"><rect x="300" y="64" width="196" height="30" fill="#f4f6f8" stroke="#9aa3ab"/><text x="310" y="84" font-size="12" fill="#2b3a48">Sandnes, 2. november 2026</text></g>
  <g data-z="mottaker"><rect x="24" y="122" width="220" height="64" fill="#f4f6f8" stroke="#9aa3ab"/>
    <g font-size="12" fill="#2b3a48"><text x="34" y="142">Lagerkompaniet Vest AS</text><text x="34" y="158">v/ Kari Berg</text><text x="34" y="174">Lagerveien 8, 4313 Sandnes</text></g></g>
  <g data-z="overskrift"><rect x="24" y="206" width="472" height="32" fill="#fff6d6" stroke="#9aa3ab"/><text x="34" y="227" font-size="14" font-weight="800" fill="#1b2128">Søknad på læreplass som logistikklærling</text></g>
  <g data-z="innledning"><rect x="24" y="252" width="472" height="56" fill="#f4f6f8" stroke="#9aa3ab"/>${linjer(34, 266, 3, 450, 14)}</g>
  <g data-z="hoveddel"><rect x="24" y="322" width="472" height="186" fill="#f4f6f8" stroke="#9aa3ab"/>${linjer(34, 336, 5, 450, 14)}${linjer(34, 418, 5, 450, 14)}</g>
  <g data-z="avslutning"><rect x="24" y="522" width="472" height="44" fill="#f4f6f8" stroke="#9aa3ab"/>${linjer(34, 536, 2, 450, 14)}</g>
  <g data-z="signatur"><rect x="24" y="580" width="220" height="70" fill="#f4f6f8" stroke="#9aa3ab"/>
    <g fill="#2b3a48"><text x="34" y="600" font-size="12">Med vennlig hilsen</text><text x="34" y="624" font-size="18" font-style="italic">Sara Lie</text><text x="34" y="642" font-size="12">Sara Lie</text></g></g>
  <g data-z="vedlegg"><rect x="24" y="664" width="140" height="32" fill="#f4f6f8" stroke="#9aa3ab"/><text x="34" y="685" font-size="12" fill="#2b3a48">1 vedlegg</text></g>
</svg>`;

TLL.registrer({
  id: 'norsk-soknad',
  fag: 'Norsk',
  nr: 1,
  kortnavn: 'Søknadsbrev',
  prove: false,
  ressursomrade: false,
  tittel: 'Slik skriver du et søknadsbrev',
  ingress: 'Lær å skrive en søknad som får arbeidsgiveren til å ville møte deg – til lærlingplass, sommerjobb eller deltidsjobb på lager og i transport.',
  kompetansemal: [
    { kode: 'NOR01-08 · Vg2 yrkesfag', tekst: 'kommunisere klart og forståelig muntlig og skriftlig i yrkesrelevante sjangre' },
    { kode: 'NOR01-08 · Vg2 yrkesfag', tekst: 'vurdere og bearbeide egne tekster ut fra tilbakemeldinger og faglige kriterier' }
  ],
  fotnote: 'Norsk · Søknadsbrev. Tekster, oppgaver, eksempler og tegninger er egenprodusert. Personer og firma i oppgavene er oppdiktet. Fagstoff fra <a href="' + NDLA_SOKNAD + '" target="_blank" rel="noopener">NDLA</a> er lenket til, ikke kopiert. Kompetansemål fra Utdanningsdirektoratet (NLOD). Resultater lagres bare i nettleseren på denne enheten – <a href="#/lagring">les om lagring</a> · <a href="#/rapport">lever fremdrift</a>.',
  ressurser: {
    presentasjon: '',
    ndlaEmne: NDLA_SOKNAD,
    ndlaEmneNavn: '«Slik skriver du et søknadsbrev» på NDLA (Norsk YF)'
  },
  temaer: [
  /* ================================================================ T1 */
  {
    id: 't1', lok: 'S-01', tittel: 'Søknad, CV og annonse',
    kort: 'Hva søknaden skal gjøre, hvordan den henger sammen med CV-en – og hvordan du leser en stillingsannonse.',
    mal: ['forklare hva et søknadsbrev skal gjøre for meg','forklare forskjellen på søknaden og CV-en','finne krav og ønsker i en stillingsannonse'],
    punkter: [
      'Søknaden er ofte det <b>første inntrykket</b> arbeidsgiveren får av deg. Den avgjør om du blir kalt inn til <b>intervju</b>.',
      'Et søknadsbrev er et <b>formelt brev</b>. Det skal ikke være lengre enn <b>én side</b>.',
      '<b>CV-en</b> er et eget dokument som du legger ved. Der står utdanning, arbeidserfaring og kurs i punkter, med årstall.',
      'Søknaden og CV-en skal <b>utfylle hverandre</b>. I søknaden forteller du <i>hvorfor</i> du passer og <i>hvorfor</i> du vil ha jobben – du gjentar ikke hele CV-en.',
      'Les <b>stillingsannonsen</b> nøye før du skriver. Finn ut hva arbeidsgiveren <b>krever</b>, hva som er <b>en fordel</b>, og hva de vil at du skal sende med.',
      'Mange store bedrifter bruker <b>søknadsskjema på nett</b>. Da fyller du ut skjemaet, skriver en søknadstekst og laster opp CV-en.'
    ],
    ekstra: ANNONSE,
    ndla: [
      ['Slik skriver du et søknadsbrev', NDLA_SOKNAD, 'Fagstoff']
    ],
    aktiviteter: [
      { type:'voks', id:'t1-voks', tittel:'Ti sekunder', tekst:['En personalleder kan få femti søknader på én læreplass. Mange bruker bare noen sekunder på å bestemme seg for om en søknad er verdt å lese videre.','Det betyr ikke at du må være perfekt. Det betyr at det lønner seg å vise at du har gjort deg flid: riktig navn på bedriften, ingen slurvefeil og en tekst som handler om akkurat denne jobben.','Å gjøre en god jobb med søknaden er det første arbeidsgiveren ser av deg som arbeidstaker.'], sporsmal:['Hva tror du en arbeidsgiver legger merke til først når hun åpner søknaden din?','Hva kan du gjøre for at søknaden viser at du er nøyaktig – før du har fått jobben?'], handling:'Finn én stillingsannonse eller lærlingplass du kunne tenkt deg å søke på, og lagre lenken.' },
      { type:'flash', id:'t1-flash', tittel:'Begrepskort: søknad og CV', kort:[
        ['Søknadsbrev','Et formelt brev der du forklarer hvorfor du søker jobben og hvorfor du passer til den.'],
        ['CV','Kort for curriculum vitae. En oversikt over utdanning, arbeidserfaring, kurs og ferdigheter, med årstall. Legges ved søknaden.'],
        ['Stillingsannonse','Teksten der arbeidsgiveren beskriver jobben, hvem de ser etter og hvordan du skal søke. Kalles også utlysning.'],
        ['Krav','Det du må ha for å få jobben, for eksempel at du går Vg2 transport og logistikk.'],
        ['En fordel','Noe arbeidsgiveren gjerne vil at du har, men som ikke er et krav, for eksempel truckførerbevis.'],
        ['Søknadsfrist','Siste dag du kan sende søknaden.'],
        ['Vedlegg','Dokumenter du sender sammen med brevet, for eksempel CV-en.'],
        ['Attest','En skriftlig uttalelse fra en tidligere arbeidsgiver om jobben du gjorde.'],
        ['Referanse','En person arbeidsgiveren kan ringe for å høre om deg, for eksempel en tidligere leder.'],
        ['Motivasjon','Grunnen til at du vil ha akkurat denne jobben.'],
        ['Formelt språk','Saklig og høflig språk uten slang, forkortelser og emojier.'],
        ['Intervju','En samtale der arbeidsgiveren blir bedre kjent med deg før de bestemmer seg.']
      ]},
      { type:'quiz', id:'t1-q1', nivaa:1, tittel:'Søknaden og CV-en', sp:[
        { q:'Hva er hovedmålet med et søknadsbrev?', a:['Å bli kalt inn til intervju','Å fortelle hele livshistorien din','Å vise fram alle karakterene dine','Å spørre om lønn'], r:0, f:'Søknaden skal gjøre arbeidsgiveren nysgjerrig nok til å ville møte deg.' },
        { q:'Hvor lang bør en søknad være?', a:['Høyst én side','Minst tre sider','Så lang du vil','Bare tre setninger'], r:0, f:'Én side er nok. Arbeidsgiveren har mange søknader å lese.' },
        { q:'Hvor skriver du en oversikt over skolegang og jobber med årstall?', a:['I CV-en','I innledningen av søknaden','I avslutningen av søknaden','I overskriften'], r:0, f:'Oversikten med årstall hører hjemme i CV-en. I søknaden trekker du fram det som er viktigst for denne jobben.' },
        { q:'Hva bør du gjøre før du begynner å skrive?', a:['Lese stillingsannonsen nøye','Kopiere en søknad fra en venn','Skrive så mye som mulig','Finne lønnen til stillingen'], r:0, f:'Annonsen forteller deg hva du må få fram i søknaden.' },
        { q:'Hvorfor skal søknaden og CV-en «utfylle hverandre»?', a:['Fordi de skal gi ulik informasjon som til sammen viser hvem du er','Fordi de skal være helt like','Fordi CV-en erstatter søknaden','Fordi arbeidsgiveren bare leser én av dem'], r:0, f:'CV-en gir fakta. Søknaden forklarer og begrunner.' }
      ]},
      { type:'tf', id:'t1-tf', nivaa:1, tittel:'Sant eller usant: søknad og CV', ps:[
        ['En søknad er et formelt brev.', true, 'Den skal ha formelt oppsett og et saklig, høflig språk.'],
        ['I søknaden bør du ramse opp alle skolene du har gått på.', false, 'Det står i CV-en. Trekk heller fram det som gjør deg egnet for denne jobben.'],
        ['Du kan sende den samme søknaden til alle bedrifter uten å endre den.', false, 'Søknaden skal tilpasses hver annonse. Arbeidsgiveren merker fort en standardsøknad.'],
        ['«En fordel» i annonsen betyr at du ikke må ha det for å søke.', true, 'Har du det, bør du nevne det. Har du det ikke, kan du likevel søke.'],
        ['Søknaden kan avgjøre om du blir kalt inn til intervju.', true, 'Den er ofte det første arbeidsgiveren ser av deg.'],
        ['På et søknadsskjema på nett trenger du aldri å skrive noe selv.', false, 'Ofte skal du både fylle ut skjemaet, skrive en søknadstekst og laste opp CV-en.']
      ]},
      { type:'sort', id:'t1-s1', nivaa:2, tittel:'Søknaden eller CV-en?', instr:'Hvor hører opplysningen hjemme? Velg den beste plassen.', kat:['Søknaden','CV-en'], items:[
        ['Hvorfor du vil jobbe akkurat hos denne bedriften','Søknaden','Motivasjonen skal stå i søknaden.'],
        ['Ungdomsskole 2020–2023 og Vg1 teknologi- og industrifag 2023–2024','CV-en','En oversikt med årstall hører hjemme i CV-en.'],
        ['Et konkret eksempel på at du er nøyaktig','Søknaden','Eksempler som viser egenskapene dine, gjør søknaden troverdig.'],
        ['Kurs i førstehjelp, mai 2025','CV-en','Kurs med dato er en del av oversikten i CV-en.'],
        ['Hva du lærte i praksisperioden som er nyttig i denne jobben','Søknaden','Du kobler erfaringen til jobben du søker.'],
        ['Navn og telefonnummer til en referanse','CV-en','Referanser står vanligvis nederst i CV-en.'],
        ['At du gjerne kommer på intervju','Søknaden','Det skriver du i avslutningen av søknaden.'],
        ['Deltidsjobb i dagligvarebutikk, 2024–i dag','CV-en','Arbeidserfaring med årstall står i CV-en. I søknaden kan du fortelle hva du lærte der.']
      ].map(([t,k,f]) => [t, k === 'Søknaden' ? 0 : 1, f]) },
      { type:'sort', id:'t1-s2', nivaa:2, vis: ANNONSE, tittel:'Les annonsen: krav, fordel eller praktisk info?', instr:'Les øvingsannonsen over. Hva slags opplysning er hvert punkt?', kat:['Krav','En fordel','Praktisk info'], items:[
        ['Du går Vg2 transport og logistikk', 0, 'Det står under «Vi ser etter deg som». Det må du oppfylle.'],
        ['Truckførerbevis T1 og T4', 1, 'Det står under «Det er en fordel om du». Har du det, skal du nevne det.'],
        ['Søknadsfristen er 1. desember', 2, 'Fristen er praktisk info. Søknaden må komme fram innen fristen.'],
        ['Du er nøyaktig og møter presist', 0, 'Dette er egenskaper arbeidsgiveren ser etter. Vis med et eksempel at du har dem.'],
        ['Erfaring fra lager eller butikk', 1, 'En fordel, ikke et krav.'],
        ['Søknaden sendes til Kari Berg', 2, 'Nå vet du hvem du skal skrive til i mottakerfeltet.'],
        ['Du samarbeider godt og sier fra når noe er feil', 0, 'Et krav om egenskaper. Tenk på et eksempel fra skole, praksis eller jobb.'],
        ['Du kan ringe 400 00 000 hvis du har spørsmål', 2, 'Tips: Ringer du først, kan du vise til samtalen i innledningen.']
      ]},
      { type:'reflect', id:'t1-r1', nivaa:3, vis: ANNONSE, tittel:'Tenk: Hva vil Lagerkompaniet vite om deg?', q:'Les øvingsannonsen. Forklar med egne ord hva bedriften ser etter, og hvilke tre ting du selv ville trukket fram i en søknad til denne jobben. Begrunn valgene dine.', punkter:[
        'Jeg har nevnt minst ett krav fra annonsen.',
        'Jeg har nevnt minst én ting som er «en fordel».',
        'Jeg har valgt tre ting om meg selv som passer til annonsen.',
        'Jeg har begrunnet hvorfor hver av de tre tingene er viktig for akkurat denne jobben.',
        'Jeg har brukt hele setninger og egne ord.'
      ]}
    ]
  },
  /* ================================================================ T2 */
  {
    id: 't2', lok: 'S-02', tittel: 'Oppsett av søknadsbrevet',
    kort: 'De ni delene i et søknadsbrev – hvor de står, og hva som skal stå i hver av dem.',
    mal: ['sette opp et søknadsbrev med riktige deler i riktig rekkefølge','forklare hva som skal stå i innledning, hoveddel og avslutning','skrive riktig dato, overskrift og vedlegg'],
    punkter: [
      '<b>Avsender</b> (deg): navn, adresse, telefon og en ryddig e-postadresse – øverst til venstre.',
      '<b>Dato</b>: på samme linje som postnummer og sted, litt til høyre. Skriv for eksempel «Sandnes, 2. november 2026».',
      '<b>Mottaker</b>: bedriftens navn først, og navnet på personen på linjen under hvis du vet hvem som skal lese den.',
      '<b>Overskrift</b> i fet skrift som sier hva du søker på, for eksempel <b>Søknad på læreplass som logistikklærling</b>.',
      '<b>Innledning</b>: kort. Si hvor og når du så annonsen – eller vis til en telefonsamtale – og at du søker.',
      '<b>Hoveddel</b>: hvorfor du passer og hvorfor du vil ha jobben. Egenskaper og erfaring med eksempler, og utdanningen de spør etter.',
      '<b>Avslutning</b>: kort og vennlig. Skriv at du gjerne kommer på intervju. Avslutt med hilsen og underskrift.',
      '<b>Vedlegg</b>: send CV-en først. Skriv «1 vedlegg» under underskriften. Vitnemål og attester tar du med senere hvis annonsen ikke ber om dem.',
      '<b>Bilde</b> er vanlig, men valgfritt. Det bestemmer du selv.'
    ],
    ndla: [
      ['Slik skriver du et søknadsbrev', NDLA_SOKNAD, 'Fagstoff']
    ],
    aktiviteter: [
      { type:'flash', id:'t2-flash', tittel:'Begrepskort: brevets deler', kort:[
        ['Avsender','Den som skriver brevet – deg. Navn, adresse, telefon og e-post øverst til venstre.'],
        ['Mottaker','Bedriften og personen som skal få brevet.'],
        ['Dato','Sted og dato, for eksempel «Sandnes, 2. november 2026».'],
        ['Overskrift','Én linje i fet skrift som sier hvilken stilling du søker.'],
        ['Innledning','Første avsnitt. Hvor du så annonsen, og at du søker.'],
        ['Hoveddel','Det lengste avsnittet. Hvorfor du passer og hvorfor du vil ha jobben.'],
        ['Avslutning','Kort og vennlig. At du gjerne kommer på intervju.'],
        ['Hilsen og underskrift','«Med vennlig hilsen», underskriften din og navnet ditt skrevet på maskin.'],
        ['«1 vedlegg»','Skrives under underskriften når du sender med CV-en.']
      ]},
      { type:'order', id:'t2-o1', nivaa:1, tittel:'Sett brevet i riktig rekkefølge', instr:'Sett delene i søknadsbrevet i rekkefølge ovenfra og ned.', steg:[
        'Avsender (navn, adresse, telefon, e-post)','Sted og dato','Mottaker (bedrift og person)','Overskrift i fet skrift','Innledning','Hoveddel','Avslutning','Hilsen og underskrift','Vedlegg'
      ], f:'Avsender og dato øverst, så mottaker. Overskriften står rett før selve teksten.' },
      { type:'hotspot', id:'t2-h1', nivaa:1, tittel:'Finn delene i brevet', instr:'Trykk på riktig del av søknadsbrevet.', svg: SVG_BREV, sp:[
        { q:'Hvor står avsenderen?', z:'avsender', f:'Avsenderen er deg. Den står øverst til venstre.' },
        { q:'Hvor står datoen?', z:'dato', f:'Sted og dato står til høyre, på linje med postnummer og sted.' },
        { q:'Hvor står mottakeren?', z:'mottaker', f:'Bedriften først, så personen som skal lese søknaden.' },
        { q:'Hvor står overskriften?', z:'overskrift', f:'Overskriften i fet skrift sier hva du søker på.' },
        { q:'Hvor forteller Sara hvor hun så annonsen?', z:'innledning', f:'Det hører hjemme i innledningen – første avsnitt.' },
        { q:'Hvor forklarer Sara hvorfor hun passer til jobben?', z:'hoveddel', f:'Hoveddelen er det lengste avsnittet.' },
        { q:'Hvor skriver Sara at hun gjerne kommer på intervju?', z:'avslutning', f:'Det står i avslutningen, før hilsenen.' },
        { q:'Hvor viser Sara at hun har lagt ved CV-en?', z:'vedlegg', f:'«1 vedlegg» skrives under underskriften.' }
      ]},
      { type:'match', id:'t2-m1', nivaa:2, tittel:'Koble del og innhold', instr:'Koble delen av brevet med teksten som passer der.', par:[
        ['Overskrift','Søknad på læreplass som logistikklærling'],
        ['Innledning','Jeg viser til annonsen på finn.no 28. oktober og søker herved læreplassen.'],
        ['Hoveddel','I praksis på et byggevarelager lærte jeg å kontrollere leveranser mot pakkseddelen.'],
        ['Avslutning','Jeg stiller gjerne til intervju og ser fram til å høre fra dere.'],
        ['Dato','Sandnes, 2. november 2026'],
        ['Vedlegg','1 vedlegg']
      ]},
      { type:'fill', id:'t2-fill', nivaa:2, tittel:'Fyll inn: oppsett av søknaden', instr:'Velg riktig ord i hvert tomrom.', tekst:'Øverst til venstre står [[avsender]], altså deg. Til høyre står sted og [[dato]]. Under kommer [[mottaker]], med bedriftens navn først. Så kommer en [[overskrift]] i fet skrift. I [[innledningen]] skriver du hvor du så annonsen. Den lengste delen er [[hoveddelen]]. Til slutt skriver du «Med vennlig hilsen», signerer og skriver «1 [[vedlegg]]» når du sender med CV-en. Hele brevet skal være på høyst én [[side]].', ekstra:['attest','referanse','avslutningen','tre'], f:'Nå har du hele oppsettet. Bruk det som mal når du skriver din egen søknad.' },
      { type:'quiz', id:'t2-q1', nivaa:3, tittel:'Detaljer som gir et godt inntrykk', sp:[
        { q:'Hvilken e-postadresse er best å bruke i en søknad?', a:['sara.lie@epost.no','sarapartyqueen06@epost.no','xXsaraXx@epost.no','sara🙂@epost.no'], r:0, f:'Bruk en ryddig adresse med navnet ditt. En tullete adresse kan gi et dårlig førsteinntrykk.' },
        { q:'Du vet at Kari Berg skal lese søknaden. Hva skriver du i mottakerfeltet?', a:['Lagerkompaniet Vest AS, og Kari Berg på linjen under','Bare «Kari»','Bare «Til den det gjelder»','Ingenting – det står i annonsen'], r:0, f:'Bedriften først, så personen. Det viser at du har lest annonsen.' },
        { q:'Hvilken overskrift er best?', a:['Søknad på læreplass som logistikklærling','Hei!','Jobb?','Søknad'], r:0, f:'Overskriften skal si nøyaktig hva du søker på.' },
        { q:'Annonsen sier ingenting om vitnemål. Hva sender du med?', a:['Bare CV-en','Alle vitnemål og attester du har','Ingenting','Bilder fra fritida'], r:0, f:'Send CV-en først. Vitnemål og attester kan du ta med på intervjuet eller sende senere.' },
        { q:'Hvilken hilsen passer best i et søknadsbrev?', a:['Med vennlig hilsen','Klem fra','Mvh','Snakkes!'], r:0, f:'«Med vennlig hilsen» er formelt og høflig. Ikke forkort til «Mvh».' },
        { q:'Ola ringte bedriften før han skrev søknaden. Hvordan kan han bruke det?', a:['Vise til samtalen i innledningen','Skrive om samtalen i vedlegget','Ikke nevne det','Skrive hele samtalen i hoveddelen'], r:0, f:'For eksempel: «Takk for en hyggelig telefonsamtale tirsdag 27. oktober.»' }
      ]}
    ]
  },
  /* ================================================================ T3 */
  {
    id: 't3', lok: 'S-03', tittel: 'Innhold som overbeviser',
    kort: 'Vis – ikke bare påstå. Slik skriver du om egenskaper, erfaring og motivasjon så arbeidsgiveren tror på deg.',
    mal: ['skrive om egne egenskaper med konkrete eksempler','tilpasse innholdet til kravene i annonsen','finne og rette feil i ordvalg, tone og rettskriving'],
    punkter: [
      '<b>Vis, ikke påstå.</b> «Jeg er nøyaktig» blir sterkere med et eksempel: «I praksis telte jeg varer ved vareopptelling, og det var ingen avvik på mine hyller.»',
      'Velg <b>to–tre egenskaper</b> som annonsen spør etter, og gi et <b>eksempel</b> fra skole, praksis, jobb eller fritid til hver.',
      'Fortell hvorfor du vil ha <b>akkurat denne jobben</b>. Vis at du vet noe om bedriften.',
      'Nevn utdanning og kurs som annonsen spør etter – for eksempel truckførerbevis – men uten å gjenta hele CV-en.',
      '<b>Tonen</b> skal være høflig, positiv og saklig. Ingen emojier, slang eller forkortelser som «mvh».',
      'Les korrektur. <b>Skrivefeil</b> og feil navn på bedriften gir et dårlig inntrykk. Les teksten høyt, eller la en annen lese den.'
    ],
    ndla: [
      ['Slik skriver du et søknadsbrev', NDLA_SOKNAD, 'Fagstoff']
    ],
    aktiviteter: [
      { type:'sort', id:'t3-s1', nivaa:1, tittel:'Sterk eller svak setning?', instr:'Viser setningen noe konkret, eller er den bare en påstand?', kat:['Sterk – viser med eksempel','Svak – bare en påstand'], items:[
        ['Jeg er en veldig flink person.', 1, 'Hva er du flink til? Arbeidsgiveren kan ikke vite det.'],
        ['I praksis plukket jeg rundt 60 ordrelinjer i timen med håndskanner og fikk ros for få feil.', 0, 'Konkret og målbart. Det viser både fart og nøyaktighet.'],
        ['Jeg passer til alt.', 1, 'Ingen passer til alt. Vis at du passer til denne jobben.'],
        ['Jeg har hatt deltidsjobb i butikk i ett år og har aldri kommet for sent til en vakt.', 0, 'Et tydelig bevis på at du møter presist.'],
        ['Jeg er god til å samarbeide.', 1, 'Påstanden blir sterk først når du gir et eksempel.'],
        ['Da en kollega sto fast med en feilmerket pall, hjalp jeg ham å finne riktig lokasjon og sa fra til lederen.', 0, 'Viser samarbeid og at du sier fra – akkurat det annonsen ber om.'],
        ['Jeg vil ha jobben fordi jeg trenger penger.', 1, 'Ærlig, men det sier ingenting om hvorfor du vil jobbe hos akkurat dem.'],
        ['Jeg vil gjerne lære lagerstyring hos dere fordi dere sender varer til nettbutikker over hele Vestlandet.', 0, 'Viser at du har lest om bedriften og har en faglig motivasjon.']
      ]},
      { type:'tf', id:'t3-tf', nivaa:1, tittel:'Sant eller usant: tone og språk', ps:[
        ['Det er greit å bruke en smilefjes-emoji for å virke blid.', false, 'Emojier hører ikke hjemme i et formelt brev. Vis at du er positiv med ordene dine.'],
        ['Du bør skrive bedriftens navn riktig.', true, 'Feil navn viser at du ikke har vært nøye – og det merkes med en gang.'],
        ['«Mvh» er en grei avslutning på en søknad.', false, 'Skriv hele «Med vennlig hilsen».'],
        ['Det er lurt å la en annen lese søknaden før du sender den.', true, 'Andre ser lettere feil og uklare setninger enn du selv gjør.'],
        ['Du bør skrive negativt om tidligere arbeidsgivere hvis du sluttet der.', false, 'Hold tonen positiv og saklig. Fortell heller hva du lærte.'],
        ['Det er bedre med tre gode eksempler enn ti påstander.', true, 'Eksempler gjør søknaden troverdig.']
      ]},
      { type:'check', id:'t3-chk1', nivaa:2, vis: ANNONSE, tittel:'Gi Mikkel tilbakemelding på søknaden', instr:'Mikkel har skrevet en søknad til Lagerkompaniet Vest. Les hver del, og kryss av der han bør endre noe før han sender søknaden.', dok:'Mikkels søknad – kladd', meta:'Til: Lagerkompaniet Vest AS v/ Kari Berg · Læreplass som logistikklærling', kryss:'Må endres?', kolonner:['Del','Det Mikkel har skrevet'], rader:[
        { c:['Avsender','Mikkel Hansen, Lundeveien 12, 4306 Sandnes · 900 00 001 · festmikkel99@epost.no'], avvik:true, f:'E-postadressen gir et useriøst inntrykk. Bruk en adresse med navnet ditt.' },
        { c:['Dato','Sandnes, 2. november 2026'], avvik:false, f:'Riktig skrevet.' },
        { c:['Overskrift','Søknad på læreplass som logistikklærling'], avvik:false, f:'Tydelig og riktig.' },
        { c:['Innledning','Hei! 😊 Jeg så at dere trenger folk og tenkte at jeg kunne søke.'], avvik:true, f:'For uformelt, med emoji. Han sier heller ikke hvor og når han så annonsen.' },
        { c:['Hoveddel 1','Jeg gikk på Lunde ungdomsskole 2020–2023, så Vg1 teknologi- og industrifag 2023–2024, og nå går jeg Vg2 transport og logistikk.'], avvik:true, f:'Dette er en CV-oppramsing. Han kan heller nøye seg med at han går Vg2 TLL og vil ta fagbrev.' },
        { c:['Hoveddel 2','I praksisperioden på et byggevarelager tok jeg imot leveranser og kontrollerte dem mot pakkseddelen. Én gang fant jeg en pall med feil vare og meldte avviket til lederen.'], avvik:false, f:'Konkret eksempel som viser nøyaktighet og at han sier fra – akkurat det annonsen ber om.' },
        { c:['Hoveddel 3','Jeg er veldig flink og passer til alt.'], avvik:true, f:'Bare en påstand. Han bør heller vise én egenskap med et eksempel.' },
        { c:['Motivasjon','Jeg vil gjerne bli lærling hos dere fordi dere har mange ulike kunder, og da får jeg lære mye forskjellig.'], avvik:false, f:'God motivasjon som viser at han har lest om bedriften.' },
        { c:['Truckførerbevis','(ikke nevnt – men Mikkel har T1 og T4)'], avvik:true, f:'Annonsen sier at truckførerbevis er en fordel. Da må han nevne det!' },
        { c:['Avslutning','Jeg stiller gjerne til intervju og ser fram til å høre fra dere. Med vennlig hilsen Mikkel Hansen'], avvik:false, f:'Kort, høflig og riktig.' },
        { c:['Vedlegg','(ingenting skrevet under underskriften, men CV-en er lagt ved)'], avvik:true, f:'Skriv «1 vedlegg» under underskriften.' },
        { c:['Lengde','Søknaden er på to og en halv side.'], avvik:true, f:'Søknaden skal være på høyst én side. Kutt CV-oppramsingen og påstandene.' }
      ], etter:'Mikkel har gode ting å bygge på – særlig eksemplet fra praksis. Med en ny e-postadresse, en formell innledning og truckførerbeviset nevnt blir søknaden mye sterkere.' },
      { type:'fill', id:'t3-fill', nivaa:2, tittel:'Fyll inn: fra påstand til eksempel', instr:'Velg ordet som gjør setningene mest konkrete og formelle.', tekst:'Jeg viser til [[annonsen]] på finn.no og søker læreplassen hos dere. I praksis lærte jeg å kontrollere leveranser mot [[pakkseddelen]], og jeg meldte fra om [[avvik]] til lederen. Jeg har [[truckførerbevis]] for T1 og T4. Jeg vil gjerne bli lærling hos dere fordi dere har [[mange ulike kunder]]. Jeg stiller gjerne til [[intervju]].', ekstra:['greia','alt mulig','penger','fest'], f:'Fagord og konkrete detaljer gjør søknaden troverdig.' },
      { type:'case', id:'t3-case', nivaa:3, vis: ANNONSE, tittel:'Case: Sara skriver søknaden', intro:'Sara går Vg2 TLL. Hun vil søke læreplassen hos Lagerkompaniet Vest AS. Hun har deltidsjobb i en dagligvarebutikk, har tatt truckførerbevis T1 og T4 på skolen og var i praksis på et regionlager i Vg1. Hjelp henne å ta gode valg.', steg:[
        { q:'Hva bør Sara gjøre først?', valg:[
          { t:'Lese annonsen nøye og streke under krav og «en fordel»', ok:true, f:'Da vet hun hva hun må få fram i søknaden.' },
          { t:'Kopiere søknaden storebroren brukte i fjor', ok:false, f:'Den er skrevet til en annen jobb og er ikke hennes egen tekst.' },
          { t:'Begynne å skrive med en gang', ok:false, f:'Uten å lese annonsen risikerer hun å glemme det viktigste.' }
        ]},
        { q:'Hvilken innledning er best?', valg:[
          { t:'Jeg viser til annonsen på finn.no 28. oktober og søker læreplassen som logistikklærling.', ok:true, f:'Kort, formelt og tydelig – med hvor og når hun så annonsen.' },
          { t:'Hei, jeg heter Sara og er 17 år og liker å game og trene.', ok:false, f:'For uformelt, og hobbyene sier lite om jobben.' },
          { t:'Jeg søker fordi jeg trenger en læreplass.', ok:false, f:'Hun sier ikke hvor hun så annonsen, og begrunnelsen er tynn.' }
        ]},
        { q:'Annonsen ber om at du er nøyaktig. Hvordan bør Sara vise det?', valg:[
          { t:'Med et eksempel fra butikkjobben, for eksempel at hun har ansvar for datokontroll i kjøledisken', ok:true, f:'Et konkret eksempel er mye sterkere enn en påstand.' },
          { t:'Skrive «Jeg er veldig nøyaktig» tre ganger', ok:false, f:'Gjentakelse gjør ikke en påstand mer troverdig.' },
          { t:'Ikke nevne det – det står jo i annonsen', ok:false, f:'Det er nettopp derfor hun må vise at hun har det.' }
        ]},
        { q:'Hva gjør Sara med truckførerbeviset?', valg:[
          { t:'Nevner det kort i søknaden og har det med i CV-en', ok:true, f:'Det er «en fordel» i annonsen, så det skal fram i søknaden.' },
          { t:'Skriver det bare i CV-en', ok:false, f:'Det er så viktig for denne jobben at det bør stå i søknaden også.' },
          { t:'Lar være å nevne det fordi hun bare har tatt det på skolen', ok:false, f:'Truckførerbevis fra skolen er like gyldig. Nevn det!' }
        ]},
        { q:'Søknaden er ferdig. Hva gjør hun før hun sender den?', valg:[
          { t:'Leser korrektur, sjekker navn og adresse og lar en makker lese den', ok:true, f:'En annen leser ser lettere feil. Sjekk også at søknaden er på én side.' },
          { t:'Sender den med en gang så hun blir først', ok:false, f:'Det er bedre å sende en feilfri søknad litt senere – før fristen.' },
          { t:'Legger ved alle vitnemål, attester og bilder hun har', ok:false, f:'Send CV-en først, med mindre annonsen ber om mer.' }
        ]}
      ]}
    ]
  },
  /* ================================================================ T4 */
  {
    id: 't4', lok: 'S-04', tittel: 'Skriv din egen søknad',
    kort: 'Forarbeid, skriving og tilbakemelding fra en makker – så har du en søknad du kan bruke når du søker læreplass.',
    mal: ['skrive et søknadsbrev med riktig oppsett og formelt språk','vise egenskapene mine med konkrete eksempler','gi og bruke tilbakemelding til å forbedre teksten'],
    punkter: [
      '<b>1. Forarbeid:</b> Les annonsen. Skriv ned kravene og hva som er en fordel. Finn ett eksempel fra ditt eget liv til hver egenskap.',
      '<b>2. Skriv:</b> Bruk oppsettet fra tema S-02. Innledning, hoveddel og avslutning – høyst én side.',
      '<b>3. Tilbakemelding:</b> Bytt søknad med en makker. Bruk sjekklisten og gi «to stjerner og ett ønske»: to ting som er bra, og én ting som kan bli bedre.',
      '<b>4. Bearbeid:</b> Bruk tilbakemeldingen og gjør teksten bedre. Les korrektur til slutt.',
      'Skriv i et skriveprogram (for eksempel Word) og <b>lever i Teams</b> slik læreren har sagt. Du kan også skrive her på siden og kopiere teksten over.'
    ],
    ekstra: ANNONSE,
    ndla: [
      ['Slik skriver du et søknadsbrev', NDLA_SOKNAD, 'Fagstoff']
    ],
    aktiviteter: [
      { type:'reflect', id:'t4-r1', nivaa:1, fase:'ov', vis: ANNONSE, tittel:'Forarbeid: mine egenskaper og eksempler', q:'Velg tre egenskaper som Lagerkompaniet Vest ser etter. Skriv ett konkret eksempel fra skole, praksis, jobb eller fritid som viser at du har hver av dem. Skriv også én setning om hvorfor du vil ha akkurat denne læreplassen.', punkter:[
        'Jeg har valgt tre egenskaper fra annonsen.',
        'Jeg har ett konkret eksempel til hver egenskap (hva, hvor, når).',
        'Eksemplene handler om meg og er sanne.',
        'Jeg har skrevet hvorfor jeg vil ha akkurat denne læreplassen.'
      ]},
      { type:'reflect', id:'t4-r2', nivaa:2, fase:'ov', vis: ANNONSE, tittel:'Skriv innledningen og ett avsnitt i hoveddelen', q:'Skriv overskrift, innledning og ett avsnitt i hoveddelen av en søknad til Lagerkompaniet Vest. Avsnittet skal vise én egenskap med et eksempel.', punkter:[
        'Overskriften sier hva jeg søker på.',
        'Innledningen sier hvor og når jeg så annonsen, og at jeg søker.',
        'Avsnittet viser én egenskap med et konkret eksempel.',
        'Språket er formelt – ingen emojier, slang eller forkortelser.',
        'Jeg har lest gjennom teksten og rettet skrivefeil.'
      ]},
      { type:'reflect', id:'t4-r3', nivaa:3, fase:'ov', vis: ANNONSE, tittel:'Skriv hele søknaden', q:'Skriv en hel søknad til Lagerkompaniet Vest AS – eller til en ekte læreplass du vil søke på. Bruk riktig oppsett og høyst én side. Tips: Skriv i Word for å få riktig oppsett, og lim inn teksten her for å sjekke den.', punkter:[
        'Avsender, dato og mottaker står riktig, og e-postadressen er ryddig.',
        'Overskriften sier hvilken stilling jeg søker.',
        'Innledningen er kort og sier hvor og når jeg så annonsen.',
        'Hoveddelen viser to–tre egenskaper fra annonsen med konkrete eksempler.',
        'Jeg har nevnt utdanningen og det som er «en fordel» (for eksempel truckførerbevis) – uten å ramse opp hele CV-en.',
        'Jeg forklarer hvorfor jeg vil ha akkurat denne jobben.',
        'Avslutningen er kort, og jeg skriver at jeg gjerne kommer på intervju.',
        'Hilsen, underskrift og «1 vedlegg» er med.',
        'Søknaden er på høyst én side, og jeg har lest korrektur.'
      ]},
      { type:'reflect', id:'t4-r4', nivaa:2, tittel:'Makkerrespons: to stjerner og ett ønske', q:'Bytt søknad med en makker. Rolle 1 leser og gir tilbakemelding. Rolle 2 lytter og stiller spørsmål. Bytt roller etterpå. Skriv tilbakemeldingen du ga makkeren din: to ting som er bra (stjerner) og én konkret ting som kan bli bedre (ønske).', punkter:[
        'Stjernene peker på noe bestemt i teksten, ikke bare «bra skrevet».',
        'Ønsket er konkret, slik at makkeren vet hva hun eller han skal endre.',
        'Jeg har sjekket oppsettet: avsender, dato, mottaker, overskrift og vedlegg.',
        'Jeg har sjekket om eksemplene viser egenskapene annonsen spør etter.',
        'Tonen i tilbakemeldingen er vennlig og saklig.'
      ]},
      { type:'reflect', id:'t4-r5', nivaa:3, tittel:'Bearbeid: hva endret du – og hvorfor?', q:'Du har fått tilbakemelding fra makkeren din (eller læreren). Skriv hvilke endringer du gjorde i søknaden, og forklar hvorfor endringene gjør søknaden bedre. Lim gjerne inn en setning før og etter.', punkter:[
        'Jeg har beskrevet minst to endringer jeg gjorde.',
        'Jeg har vist et eksempel på en setning før og etter.',
        'Jeg har forklart hvorfor endringen gjør søknaden bedre for leseren.',
        'Jeg har sjekket at søknaden fortsatt er på høyst én side.'
      ]},
      { type:'voks', id:'t4-voks', tittel:'Tilbakemelding er et verktøy', tekst:['Det kan føles ubehagelig når noen påpeker feil i teksten din. Men på en arbeidsplass får du tilbakemelding hele tiden: fra veilederen, fra kollegaer og fra kunder.','Den som klarer å ta imot tilbakemelding uten å bli sur – og faktisk bruker den – blir fort god i jobben. Det samme gjelder den som gir tilbakemelding på en ordentlig måte: konkret, vennlig og ærlig.','Søknaden din blir bedre av en makker som tør å si fra. Og du blir en bedre kollega av å øve på det.'], sporsmal:['Hvordan reagerer du vanligvis når noen påpeker en feil du har gjort?','Hva gjør en tilbakemelding lett å ta imot?'], handling:'Neste gang du får en tilbakemelding, si «takk, det skal jeg se på» før du forklarer deg.' }
    ]
  }
  ]
});
})();
