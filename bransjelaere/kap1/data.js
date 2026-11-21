/* =====================================================================
   KAPITTELDATA – Bransjelære kap 1 Etablering, ledelse og økonomisk styring
   Alle tekster, oppgaver og tegninger er egenprodusert for TLLfluenseren.
   Faglig grunnlag: læreboka og arbeidsboka i Bransjelære (Vg2 transport og logistikk),
   kontrollert mot lærerens løsningsforslag. Ingenting er kopiert fra bøkene.
   Gjennomgående case: Ryfylke Nærfrakt AS (oppdiktet bedrift).
   UB-spor: valgfrie oppgaver der elever med ungdomsbedrift bruker sin egen bedrift.
   ===================================================================== */
(function(){
const NDLA_E = 'https://ndla.no/nb/e/bransjelare-tp-tol-vg2---ressurssamling/';
const N = {
  emne:     ['Etablering og drift av virksomhet', NDLA_E + 'etablering-og-drift-av-virksomhet/a5b7718286', 'Emne'],
  plikter:  ['Plikter og rettigheter i arbeidslivet', NDLA_E + 'plikter-og-rettigheter-i-arbeidslivet/e7ae78ef91', 'Fagstoff'],
  kvalitet: ['Kvalitetskrav', NDLA_E + 'kvalitetskrav/d59f38ac51', 'Fagstoff'],
  forsikring:['Forsikring', NDLA_E + 'forsikring/483ec3a612', 'Emne'],
  lover:    ['Lover og regler', NDLA_E + 'lover-og-regler/a0cc1fac59', 'Emne'],
  kalkyler: ['Økonomiske kalkyler og prisberegninger', NDLA_E + 'okonomiske-kalkyler-og-prisberegninger/a36ee8e1da', 'Emne'],
  etikk:    ['Yrkesetikk', NDLA_E + 'yrkesetikk/9c95f7712c', 'Emne']
};

/* ---------- UB-spor: felles forklaring som vises over UB-oppgavene ---------- */
const UB = (tekst) => `<div class="panel" style="border-left:5px solid #f2b84b"><b>UB-spor (valgfritt).</b> Er du med i en ungdomsbedrift, bruker du <b>din egen bedrift</b> i denne oppgaven. Er du ikke med i UB, bruker du <b>Ryfylke Nærfrakt AS</b> fra kapitlet – eller en bedrift du selv kunne tenke deg å starte. ${tekst} <a href="/ungdomsbedrift/">Les mer om ungdomsbedrift →</a></div>`;

/* ---------- Forklaringstegninger (tema.figur) – egne SVG-er laget for TLLfluenseren ---------- */
const S = 'font-family="Inter,system-ui,sans-serif"';
const F = { ink:'#1b2128', gra:'#5c6670', bla:'#1d6fb8', blaL:'#e3eefa', gul:'#f2b84b', gulL:'#fdf3dc', gronn:'#1f8a4c', gronnL:'#e3f3e8', rod:'#c0392b' };
const fSvg = (w, h, label, innhold) => `<svg viewBox="0 0 ${w} ${h}" ${S} role="img" aria-label="${label}"><rect width="${w}" height="${h}" fill="#ffffff"/>${innhold}</svg>`;
const boks = (x, y, w, h, fill, stroke, tekst, fs = 14, fw = 700) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 + 5}" text-anchor="middle" font-size="${fs}" font-weight="${fw}" fill="${F.ink}">${tekst}</text>`;

const FIGUR = {
  t1: { tekst: 'Indre rammer bestemmer bedriften selv. De ytre rammene må den forholde seg til. Målet er lønnsom drift innenfor begge.',
    svg: fSvg(600, 330, 'Indre og ytre rammer rundt en bedrift',
      `<rect x="20" y="20" width="560" height="290" rx="18" fill="${F.blaL}" stroke="${F.bla}" stroke-width="3"/>
       <text x="300" y="48" text-anchor="middle" font-size="16" font-weight="800" fill="${F.bla}">YTRE RAMMER – må følges</text>
       <text x="300" y="72" text-anchor="middle" font-size="13" fill="${F.ink}">lover og forskrifter · tariff- og bransjeavtaler · moral og etiske normer</text>
       <rect x="90" y="92" width="420" height="200" rx="16" fill="${F.gulL}" stroke="${F.gul}" stroke-width="3"/>
       <text x="300" y="118" text-anchor="middle" font-size="16" font-weight="800" fill="#8a5a00">INDRE RAMMER – bestemmer vi selv</text>
       ${boks(110, 136, 180, 40, '#fff', F.gul, 'Forretningsidé')}${boks(310, 136, 180, 40, '#fff', F.gul, 'Mål')}
       ${boks(110, 186, 180, 40, '#fff', F.gul, 'Strategi')}${boks(310, 186, 180, 40, '#fff', F.gul, 'Organisering')}
       <text x="300" y="262" text-anchor="middle" font-size="14" font-weight="700" fill="${F.ink}">Mål: lønnsom drift (inntekter større enn kostnader)</text>`) },
  t3: { tekst: 'Startbalansen: Det du eier (eiendeler) skal alltid være like mye verdt som pengene du har skaffet (egenkapital og gjeld).',
    svg: fSvg(600, 300, 'Startbalanse med eiendeler på venstre side og egenkapital og gjeld på høyre side',
      `<text x="150" y="34" text-anchor="middle" font-size="16" font-weight="800" fill="${F.ink}">EIENDELER</text>
       <text x="450" y="34" text-anchor="middle" font-size="16" font-weight="800" fill="${F.ink}">EGENKAPITAL OG GJELD</text>
       ${boks(30, 50, 240, 110, F.blaL, F.bla, 'Anleggsmidler')}
       <text x="150" y="140" text-anchor="middle" font-size="12" fill="${F.gra}">lastebil, truck, inventar</text>
       ${boks(30, 168, 240, 80, F.gronnL, F.gronn, 'Omløpsmidler')}
       <text x="150" y="236" text-anchor="middle" font-size="12" fill="${F.gra}">lager, bank, kundefordringer</text>
       ${boks(330, 50, 240, 80, F.gulL, F.gul, 'Egenkapital')}
       <text x="450" y="118" text-anchor="middle" font-size="12" fill="${F.gra}">egne penger</text>
       ${boks(330, 138, 240, 110, '#fbe7e4', F.rod, 'Gjeld')}
       <text x="450" y="226" text-anchor="middle" font-size="12" fill="${F.gra}">lån, kassekreditt</text>
       <text x="300" y="155" text-anchor="middle" font-size="34" font-weight="800" fill="${F.ink}">=</text>
       <text x="300" y="285" text-anchor="middle" font-size="13" fill="${F.ink}">Sum eiendeler = sum egenkapital og gjeld</text>`) },
  t5: { tekst: 'En enkel organisasjonsplan for en liten transportbedrift. Linjene viser hvem som gir beskjeder til hvem.',
    svg: fSvg(600, 280, 'Organisasjonsplan med styre, daglig leder, regnskapsfører og to sjåfører',
      `${boks(220, 16, 160, 42, F.blaL, F.bla, 'Styret')}
       ${boks(220, 90, 160, 42, F.gulL, F.gul, 'Daglig leder')}
       ${boks(430, 90, 150, 42, '#f4f4f4', F.gra, 'Regnskapsfører', 13, 600)}
       ${boks(90, 190, 160, 42, F.gronnL, F.gronn, 'Sjåfør 1')}${boks(350, 190, 160, 42, F.gronnL, F.gronn, 'Sjåfør 2')}
       <g stroke="${F.ink}" stroke-width="2" fill="none"><path d="M300 58v32"/><path d="M300 132v28H170v30M300 160h130v30"/></g>
       <path d="M380 111h50" stroke="${F.gra}" stroke-width="2" stroke-dasharray="6 5" fill="none"/>
       <text x="505" y="152" text-anchor="middle" font-size="11" fill="${F.gra}">stab (innleid tjeneste)</text>
       <text x="300" y="262" text-anchor="middle" font-size="12" fill="${F.gra}">I en liten bedrift kan samme person være både styreleder og daglig leder.</text>`) },
  t6: { tekst: 'Styringssystemet: Mål → budsjett (plan) → regnskap (det som skjedde) → finn avvik → sett inn tiltak.',
    svg: fSvg(600, 220, 'Kretsløp fra mål via budsjett og regnskap til avvik og tiltak',
      `${boks(20, 80, 100, 50, F.blaL, F.bla, 'Mål')}${boks(140, 80, 100, 50, F.gulL, F.gul, 'Budsjett')}
       ${boks(260, 80, 100, 50, F.gronnL, F.gronn, 'Regnskap')}${boks(380, 80, 90, 50, '#fbe7e4', F.rod, 'Avvik')}${boks(490, 80, 90, 50, '#f4f4f4', F.gra, 'Tiltak')}
       <g stroke="${F.ink}" stroke-width="2" fill="none"><path d="M120 105h20M240 105h20M360 105h20M470 105h20"/><path d="M535 130v50H190v-50"/></g>
       <path d="M184 136l6-8 6 8" fill="${F.ink}"/>
       <text x="360" y="200" text-anchor="middle" font-size="12" fill="${F.gra}">Tiltakene påvirker neste periode</text>
       <text x="300" y="40" text-anchor="middle" font-size="14" font-weight="700" fill="${F.ink}">Budsjett = plan i kroner · Regnskap = det som faktisk skjedde</text>`) }
};

TLL.registrer({
  id: 'bl-kap1',
  fag: 'Bransjelære',
  nr: 1,
  tittel: 'Etablering, ledelse og økonomisk styring',
  kortTittel: 'Etablering og økonomi',
  oppsett: 'fokus',
  ingress: 'Fra idé til egen bedrift: forretningsidé, foretaksform, kapitalbehov, ledelse, plikter og rettigheter, budsjett og kvalitet. Alle kan bruke caset Ryfylke Nærfrakt – elever med ungdomsbedrift kan bruke sin egen bedrift i UB-sporet.',
  kompetansemal: [
    { kode: 'TOL02-01 · Bransjelære', tekst: 'beskrive sentrale områder ved etablering, ledelse og økonomisk styring av en virksomhet' },
    { kode: 'TOL02-01 · Bransjelære', tekst: 'drøfte hvilke krav og forventninger som stilles til et likeverdig og inkluderende yrkesfellesskap, og beskrive hvilke plikter og rettigheter arbeidsgiver og arbeidstaker har i arbeidslivet' },
    { kode: 'TOL02-01 · Bransjelære', tekst: 'planlegge og utføre arbeid i samsvar med gjeldende regelverk for helse, miljø og sikkerhet, sertifiseringsbestemmelser og næringens krav til kvalitet' }
  ],
  ressursomrade: 'bransjelaere',
  /* Faste poster (se transport-logistikk-lofteoperasjoner/felles/README.md):
     lenke = klar, false = ikke tilgjengelig, utelatt = «Kommer». Lysark og avatarvideo er under arbeid. */
  fastePoster: {
    begreper: '/transport-logistikk-lofteoperasjoner/ordbok/?kap=bl:1',
    ovelsesbank: false
  },
  exitTicket: [
    'Nevn tre ting en forretningsplan skal inneholde, og forklar kort hvorfor banken vil se den.',
    'Gi ett eksempel på en plikt arbeidsgiveren har og én plikt arbeidstakeren har.',
    'Hva er det viktigste du har lært i dette kapitlet, og hva er du fortsatt usikker på?'
  ],
  ressurser: {
    laerebok: 'Bransjelære, kapittel 1 (s. 10–45)',
    arbeidsbok: 'Arbeidsboka i bransjelære, kapittel 1 (oppgave 1.1–1.33)',
    ndlaEmne: N.emne[1],
    ndlaEmneNavn: 'Emnet «Etablering og drift av virksomhet» på NDLA'
  },
  temaer: [
  /* ================================================================ T1 */
  {
    id: 't1', lok: 'A-01', tittel: 'Forretningsidé og rammer',
    figur: FIGUR.t1,
    kort: 'Hva en forretningsidé er, hva den skal svare på, og hvilke indre og ytre rammer en bedrift må forholde seg til.',
    bok: 'Læreboka 1.1 (s. 10–13)',
    mal: ['forklare hva en forretningsidé er','beskrive en forretningsidé med de fem punktene','skille mellom indre og ytre rammer for en bedrift'],
    punkter: [
      'En <b>forretningsidé</b> er en idé om hvordan bedriften skal tjene penger. Alle bedrifter starter med en.',
      'En god forretningsidé svarer på fem ting: <b>hvilket behov</b> i markedet du dekker, <b>hvilke tjenester</b> du tilbyr, <b>hvem kundene</b> er, <b>hvilket område</b> du skal jobbe i, og <b>hvordan du skal tjene penger</b>.',
      'For å gjøre ideen til virkelighet bestemmer du et <b>økonomisk hovedmål</b>, en <b>strategi</b> (veien mot målet) og en <b>organisering</b> (hvem gjør hva).',
      '<b>Indre rammer</b> bestemmer bedriften selv: forretningsidé, mål, strategi og organisering.',
      '<b>Ytre rammer</b> må bedriften forholde seg til: lover og forskrifter, bransje- og tariffavtaler, og moralregler og etiske normer i samfunnet.',
      'Noen bedrifter har også en <b>visjon</b> – et svært langsiktig mål å strekke seg etter.',
      '<b>Eksempel:</b> Ryfylke Nærfrakt AS skal kjøre stykkgods for byggevarehandlere i Stavanger-området som i dag kjører selv. Bedriften vil tjene penger på presis levering til en konkurransedyktig pris.'
    ],
    ndla: [N.emne, N.etikk],
    arbeidsbok: '1.11, 1.21, 1.22, 1.23',
    aktiviteter: [
      { type:'voks', id:'t1-voks', tittel:'Fra idé til handling', tekst:['Mange har gode ideer. Få gjør noe med dem. Forskjellen er sjelden talent – det er at noen setter seg ned og skriver ideen ned, sjekker om noen vil betale for den, og tar første steg.','En forretningsidé trenger ikke være ny for verden. Den må bare løse et problem bedre, raskere eller billigere enn det kundene har i dag.','Å teste en idé og forkaste den er ikke å mislykkes. Det er å lære billig.'], sporsmal:['Hvilket problem i hverdagen din skulle du ønske at noen løste?','Hva er det første lille steget du kunne tatt for å teste en idé?'], handling:'Skriv ned én idé du har hatt – uansett hvor liten – og hvem som kunne tenke seg å betale for den.' },
      { type:'flash', id:'t1-flash', tittel:'Begrepskort: idé og rammer', kort:[
        ['Forretningsidé','En idé om hvordan bedriften skal tjene penger.'],
        ['Indre rammer','Det bedriften bestemmer selv: forretningsidé, mål, strategi og organisering.'],
        ['Ytre rammer','Det bedriften må forholde seg til: lover, bransjeavtaler, moral og etiske normer.'],
        ['Strategi','Planen for hvordan bedriften skal nå målet sitt.'],
        ['Organisering','Hvordan oppgaver og ansvar fordeles – hvem som gjør hva.'],
        ['Visjon','Et svært langsiktig mål som bedriften strekker seg etter.'],
        ['Bransjeavtale','Avtale som en bransjeorganisasjon inngår for medlemsbedriftene, for å få bedre vilkår enn hver bedrift kunne fått alene.'],
        ['Lovregel','Regel i lov eller forskrift. Kan håndheves av politi og domstoler.'],
        ['Moralregel','Det samfunnet mener er rett og galt. Bryter bedriften den, tar mange avstand fra bedriften.'],
        ['Etiske retningslinjer','Regler bedriften selv har laget for hvordan de ansatte skal oppføre seg.'],
        ['Lønnsomhet','At inntektene er større enn kostnadene over tid.']
      ]},
      { type:'quiz', id:'t1-q1', nivaa:1, tittel:'Hva er en forretningsidé?', sp:[
        { q:'Hva er en forretningsidé?', a:['En idé om hvordan bedriften skal tjene penger','Navnet på bedriften','En søknad om lån','En liste over de ansatte'], r:0, f:'Forretningsideen beskriver hvordan bedriften skal tjene penger.' },
        { q:'Hvilken av disse er en INDRE ramme?', a:['Arbeidsmiljøloven','Tariffavtalen','Bedriftens mål','Etiske normer i samfunnet'], r:2, f:'Målet bestemmer bedriften selv. De andre må den forholde seg til.' },
        { q:'Hvilken av disse er en YTRE ramme?', a:['Strategien','Forskrift om bruk av kjøretøy','Forretningsideen','Hvem som gjør hva i bedriften'], r:1, f:'Lover og forskrifter er ytre rammer.' },
        { q:'Hva kaller vi planen for hvordan bedriften skal nå målet sitt?', a:['Visjon','Strategi','Tariffavtale','Budsjett'], r:1, f:'Strategien er veien mot målet.' },
        { q:'Hva er en visjon?', a:['Et svært langsiktig mål å strekke seg etter','Et lån med lav rente','En kontrakt med en kunde','Et krav fra myndighetene'], r:0, f:'Visjonen er stor og langsiktig, for eksempel «førstevalget for byggevarer i regionen».' },
        { q:'Hva skjer ofte hvis en bedrift bryter en moralregel?', a:['Bedriften får alltid bot','Mange kunder tar avstand fra bedriften','Ingenting','Bedriften må stenge'], r:1, f:'Moralregler håndheves ikke av domstolene, men kundene reagerer.' }
      ]},
      { type:'sort', id:'t1-s1', nivaa:1, tittel:'Indre eller ytre ramme?', instr:'Sorter hver ramme for Ryfylke Nærfrakt AS.', kat:['Indre ramme (vi bestemmer)','Ytre ramme (vi må følge)'], items:[
        ['Kjøre stykkgods for byggevarehandlere',0,'Forretningsideen bestemmer bedriften selv.'],
        ['Mål om 10 % overskudd',0,'Målet er en indre ramme.'],
        ['Daglig leder fordeler turene',0,'Organisering er en indre ramme.'],
        ['Satse på presis levering framfor lavest pris',0,'Det er strategien – en indre ramme.'],
        ['Arbeidsmiljøloven',1,'Loven må følges.'],
        ['Tariffavtalen for sjåførene',1,'En avtale bedriften er bundet av.'],
        ['Reglene for kjøre- og hviletid',1,'Forskrifter er ytre rammer.'],
        ['Folk forventer at bedriften behandler ansatte ordentlig',1,'Moral og etiske normer i samfunnet.']
      ]},
      { type:'fill', id:'t1-fill', nivaa:2, tittel:'Fyll inn: de fem punktene', tekst:'En forretningsidé bør beskrive hvilket [[behov]] i markedet bedriften skal dekke, hvilke [[tjenester]] den skal tilby, hvem som er [[kundene]], hvilket [[geografiske]] område den skal jobbe i, og hvordan den skal oppnå [[lønnsomhet]].', ekstra:['tariffavtale','visjon','lån','ansatte'], f:'Når ideen er avgrenset slik, er det lettere å styre bedriften økonomisk etterpå.' },
      { type:'quiz', id:'t1-q2', nivaa:2, tittel:'Bruk det på Ryfylke Nærfrakt', sp:[
        { q:'Ryfylke Nærfrakt skriver: «Vi skal kjøre for byggevarehandlere som i dag kjører varene selv.» Hvilket punkt i forretningsideen er dette?', a:['Hvem kundene er','Hvordan de skal tjene penger','Hvilket område de kjører i','Hvilken strategi de har'], r:0, f:'Det beskriver målgruppen – kundene.' },
        { q:'«Vi kjører innenfor 30 km fra Stavanger sentrum.» Hvilket punkt er dette?', a:['Tjenestene','Det geografiske markedet','Behovet i markedet','Lønnsomheten'], r:1, f:'Det avgrenser området bedriften jobber i.' },
        { q:'Ryfylke Nærfrakt vil bli kundenes førstevalg gjennom presis levering til konkurransedyktig pris. Hvilket punkt er dette?', a:['Hvordan bedriften skal oppnå lønnsomhet','Hvem kundene er','Hvilke lover som gjelder','Hvilken foretaksform den har'], r:0, f:'Det forklarer hvordan bedriften skal tjene penger.' },
        { q:'Etter et halvt år viser det seg at få kunder vil betale. Hva bør Amir gjøre ifølge kapitlet?', a:['Fortsette som før','Justere ideen – eller forkaste den og starte på nytt','Senke lønna til sjåførene','Slutte å føre regnskap'], r:1, f:'Ideen skal testes. Gir den ikke lønnsom drift, må den justeres eller forkastes.' },
        { q:'En ny tariffavtale gir sjåførene høyere lønn. Hva slags ramme har endret seg?', a:['En indre ramme','En ytre ramme','Visjonen','Strategien'], r:1, f:'Tariffavtalen er en ytre ramme bedriften må forholde seg til.' },
        { q:'Daglig leder bestemmer at én sjåfør skal ha ansvar for alle leveranser i Sandnes. Hva er dette et eksempel på?', a:['Organisering','En lovregel','En bransjeavtale','En visjon'], r:0, f:'Fordeling av oppgaver og ansvar er organisering.' }
      ]},
      { type:'tf', id:'t1-tf', nivaa:2, tittel:'Sant eller usant: rammer', ps:[
        ['Bedriften kan selv bestemme om den vil følge arbeidsmiljøloven.', false, 'Lover er ytre rammer som må følges.'],
        ['En forretningsidé må være helt ny for at den skal fungere.', false, 'Den må løse et behov bedre, raskere eller billigere enn i dag – ikke være ny for verden.'],
        ['Bransjeavtaler kan gi bedriften bedre vilkår enn den ville fått alene.', true, 'Det er hele poenget med å stå sammen i en bransjeorganisasjon.'],
        ['Etiske retningslinjer lages av bedriften selv.', true, 'De gjelder for de ansatte i den bedriften.'],
        ['Indre rammer er de rammene bedriften bestemmer selv.', true, 'Forretningsidé, mål, strategi og organisering.'],
        ['Det er bare lovregler som påvirker hvordan en bedrift må oppføre seg.', false, 'Moral og etiske normer påvirker også – kundene reagerer.']
      ]},
      { type:'quiz', id:'t1-q3', nivaa:3, tittel:'Vurder forretningsideen', sp:[
        { q:'Hvilken forretningsidé er best avgrenset?', a:['«Vi skal kjøre alle typer gods for alle kunder i hele Rogaland, døgnet rundt.»','«Vi skal tilby nærdistribusjon av stykkgods for byggevarehandlere innenfor 30 km fra Stavanger, med levering til avtalt tid.»','«Vi skal tjene mye penger.»','«Vi skal ha de fineste lastebilene.»'], r:1, f:'Den sier noe om behov, tjeneste, kunder, område og hvordan de skal skille seg ut.' },
        { q:'Hvorfor er det viktig at forretningsideen er avgrenset?', a:['Fordi banken krever et kort navn','Fordi den økonomiske styringen knyttes til rammene ideen setter','Fordi det er billigere å trykke','Det er ikke viktig'], r:1, f:'Avgrensningen gjør det mulig å budsjettere, styre og konsentrere seg om det viktige.' },
        { q:'Amir vurderer å kjøre litt for alle typer kunder for å få flere oppdrag. Hva er den største faren?', a:['At han får for mange venner','At bedriften mister fokus og ikke blir best på noe','At han må betale mer skatt','At han trenger flere førerkort'], r:1, f:'Uten konsentrasjon om ideen blir det vanskelig å skille seg ut og tjene penger.' },
        { q:'En bedrift følger loven, men behandler kunder og ansatte dårlig. Hvorfor kan det likevel gå dårlig?', a:['Fordi moral og etiske normer også er rammer – kunder og ansatte reagerer','Fordi loven alltid endres','Fordi banken nekter lån til alle','Det kan ikke gå dårlig så lenge loven følges'], r:0, f:'Bryter bedriften normer folk er enige om, mister den tillit og kunder.' }
      ]},
      { type:'reflect', id:'t1-r1', nivaa:2, tittel:'UB-spor: Skriv forretningsideen', vis: UB('Skriv forretningsideen med alle fem punktene.'), q:'Skriv forretningsideen til bedriften din (eller Ryfylke Nærfrakt AS) med de fem punktene. Skriv også én indre og én ytre ramme som er viktig for akkurat denne bedriften.', punkter:[
        'Hvilket behov i markedet bedriften dekker',
        'Hvilke tjenester eller produkter den tilbyr',
        'Hvem kundene er',
        'Hvilket område bedriften skal jobbe i',
        'Hvordan bedriften skal tjene penger',
        'Én indre ramme (f.eks. mål eller organisering)',
        'Én ytre ramme (f.eks. en lov, en avtale eller en etisk norm)'
      ]}
    ]
  },
  /* ================================================================ T2 */
  {
    id: 't2', lok: 'A-02', tittel: 'Foretaksform, løyve og forretningsplan',
    kort: 'Registrering, løyve for yrkestransport, valg mellom ENK, ANS, DA og AS, og hva en forretningsplan skal inneholde.',
    bok: 'Læreboka 1.1 og 1.2 (s. 10–14 og 34–35)',
    mal: ['forklare hva som skal til for å registrere en bedrift og drive yrkestransport','sammenligne ansvaret i ENK, ANS, DA og AS','gjøre rede for hva en forretningsplan skal inneholde'],
    punkter: [
      'En bedrift registreres i <b>Brønnøysundregistrene</b> gjennom <b>Altinn</b>, med skjemaet «Samordnet registermelding».',
      'Skal du drive <b>yrkestransport</b> (kjøre mot betaling), med lastebil over 3,5 tonn, må bedriften ha <b>løyve</b> – en <b>fellesskapstillatelse</b>. Bedriften må ha en <b>transportleder</b> (ofte daglig leder) som har bestått en <b>prøve hos Statens vegvesen</b>. En kopi av tillatelsen skal ligge i hvert kjøretøy. Et rent logistikkforetak (lager, terminal) trenger ikke løyve.',
      '<b>Enkeltpersonforetak (ENK):</b> Én eier som er personlig ansvarlig for all gjeld i bedriften.',
      '<b>Ansvarlig selskap (ANS):</b> Flere eiere som hver er ansvarlig for <i>all</i> gjeld. <b>DA</b> (delt ansvar): hver eier er ansvarlig for <i>sin del</i> av gjelden.',
      '<b>Aksjeselskap (AS):</b> Eierne kan bare tape pengene de har skutt inn (aksjekapitalen). Kravet til aksjekapital har de siste årene vært 30 000 kr. Styret har det overordnete ansvaret.',
      'Banken krever en <b>forretningsplan</b> før den gir lån. Den skal inneholde: forretningsideen, foretaksform, kapitalbehov, økonomisk analyse, markedsundersøkelse, konkurrentanalyse, organisasjonsplan, finansieringsplan, resultatbudsjett og likviditetsbudsjett for de første årene.'
    ],
    ndla: [N.emne, N.lover],
    arbeidsbok: '1.12, 1.33',
    aktiviteter: [
      { type:'voks', id:'t2-voks', tittel:'Hvem tar risikoen?', tekst:['Å starte for seg selv betyr frihet – men også ansvar. I et enkeltpersonforetak kan det gå så langt at du må selge bilen eller huset ditt hvis bedriften går konkurs.','Derfor er valget av foretaksform ikke bare papirarbeid. Det handler om hvor mye du er villig til å risikere, og hvem andre som blir rammet hvis det går galt.','De som lykkes, er sjelden de som tar størst sjanser. Det er de som vet hvilken risiko de tar.'], sporsmal:['Hva ville du vært villig til å risikere for å starte din egen bedrift?','Hvem i livet ditt ville blitt berørt hvis det gikk galt?'], handling:'Spør en voksen du kjenner som har egen bedrift, hvorfor de valgte den foretaksformen de har.' },
      { type:'flash', id:'t2-flash', tittel:'Begrepskort: foretaksform og plan', kort:[
        ['Brønnøysundregistrene','Statens register der bedrifter registreres og får organisasjonsnummer.'],
        ['Samordnet registermelding','Skjemaet i Altinn som brukes for å registrere en ny bedrift.'],
        ['Løyve / fellesskapstillatelse','Tillatelse som trengs for å drive yrkestransport. Gjelder i hele EØS-området.'],
        ['ENK','Enkeltpersonforetak: én eier med personlig ansvar for all gjeld.'],
        ['ANS','Ansvarlig selskap: flere eiere, hver ansvarlig for all gjeld.'],
        ['DA','Selskap med delt ansvar: hver eier er ansvarlig for sin del av gjelden.'],
        ['AS','Aksjeselskap: eierne kan bare tape aksjekapitalen de har skutt inn.'],
        ['Aksjekapital','Pengene eierne skyter inn når de stifter et AS.'],
        ['Forretningsplan','Plan som viser hvordan bedriften skal etableres. Banken krever den før lån.'],
        ['Kreditor','En som bedriften skylder penger, for eksempel banken eller en leverandør.']
      ]},
      { type:'quiz', id:'t2-q1', nivaa:1, tittel:'Registrering og foretaksform', sp:[
        { q:'Hvor registreres en ny bedrift i Norge?', a:['Hos politiet','I Brønnøysundregistrene','Hos kommunen','Hos Statens vegvesen'], r:1, f:'Registreringen gjøres via Altinn og havner i Brønnøysundregistrene.' },
        { q:'Hva heter skjemaet du bruker for å registrere bedriften?', a:['Samordnet registermelding','Fraktbrev','Skattemelding','Arbeidsavtale'], r:0, f:'«Samordnet registermelding» finnes i Altinn.' },
        { q:'Hva må en bedrift ha for å drive godstransport mot betaling med lastebil over 3,5 tonn?', a:['Løyve (fellesskapstillatelse)','Bare førerkort','En nettside','Medlemskap i en fagforening'], r:0, f:'Yrkestransport krever løyve.' },
        { q:'Hvem er personlig ansvarlig for all gjeld i et enkeltpersonforetak?', a:['Banken','Eieren','Kundene','Staten'], r:1, f:'I et ENK hefter eieren med alt eieren eier privat.' },
        { q:'Hva kan eierne i et aksjeselskap maksimalt tape?', a:['Alt de eier privat','Aksjekapitalen de har skutt inn','Ingenting','Lønna til de ansatte'], r:1, f:'Ansvaret er begrenset til aksjekapitalen.' },
        { q:'Hvem krever en forretningsplan før de gir lån?', a:['Banken (långiveren)','Kundene','Leverandørene','Statens vegvesen'], r:0, f:'Långiverne vil se at ideen kan gi lønnsom drift.' }
      ]},
      { type:'match', id:'t2-m1', nivaa:1, tittel:'Koble foretaksform og ansvar', instr:'Koble foretaksformen med riktig beskrivelse.', par:[
        ['ENK','Én eier, personlig ansvar for all gjeld'],
        ['ANS','Flere eiere, hver ansvarlig for all gjeld'],
        ['DA','Flere eiere, hver ansvarlig for sin del'],
        ['AS','Eierne kan bare tape aksjekapitalen'],
        ['Løyve','Tillatelse til å drive yrkestransport'],
        ['Altinn','Nettstedet der bedriften registreres']
      ]},
      { type:'order', id:'t2-o1', nivaa:2, tittel:'Fra idé til oppstart', instr:'Sett stegene i en fornuftig rekkefølge for Amir, som vil starte Ryfylke Nærfrakt AS.', steg:[
        'Finne og beskrive forretningsideen','Undersøke markedet og konkurrentene','Velge foretaksform','Regne ut kapitalbehovet og lage budsjetter','Skrive forretningsplanen og avklare lån med banken','Registrere bedriften i Altinn','Ta teoriprøven og søke om fellesskapstillatelse','Starte driften'
      ], f:'Ideen og analysene kommer før planen. Banken vil se planen før den låner ut penger. Løyvet må være på plass før første betalte tur.' },
      { type:'quiz', id:'t2-q2', nivaa:2, tittel:'Velg riktig form', sp:[
        { q:'Lise vil starte et lite lagerfirma alene og har lite gjeld. Hvilken form er enklest?', a:['Enkeltpersonforetak','Ansvarlig selskap','DA','Hun trenger ingen registrering'], r:0, f:'ENK er enkelt å starte når du er alene. Hun må likevel tenke over at hun hefter for gjelden.' },
        { q:'Tre venner vil starte sammen, men hver vil bare være ansvarlig for sin del av gjelden. Hvilken form passer?', a:['ANS','DA','ENK','Ingen'], r:1, f:'I DA har hver eier ansvar for sin andel.' },
        { q:'Amir skal kjøpe lastebil for mange millioner med banklån. Hvorfor velger mange AS i en slik situasjon?', a:['Fordi AS ikke trenger regnskap','Fordi eierens private økonomi er bedre beskyttet hvis det går galt','Fordi AS ikke betaler skatt','Fordi AS ikke trenger løyve'], r:1, f:'I AS er ansvaret begrenset til aksjekapitalen.' },
        { q:'Et rent lagerforetak (ingen kjøring for andre) – trenger det løyve?', a:['Ja, alltid','Nei, løyve gjelder yrkestransport','Bare om vinteren','Bare hvis det har truck'], r:1, f:'Et logistikkforetak uten yrkestransport trenger ikke løyve.' },
        { q:'Hvor skal en attestert kopi av fellesskapstillatelsen ligge?', a:['I hvert kjøretøy bedriften bruker i yrkestransporten','Bare på kontoret, sammen med originalen','Hos banken','Hos kunden'], r:0, f:'Kopien skal ligge i alle kjøretøy som brukes.' },
        { q:'Hvilken del av forretningsplanen viser hvordan bedriften skal skaffe pengene den trenger?', a:['Konkurrentanalysen','Finansieringsplanen','Organisasjonsplanen','Markedsundersøkelsen'], r:1, f:'Finansieringsplanen viser egenkapital og lån.' }
      ]},
      { type:'tf', id:'t2-tf', nivaa:1, tittel:'Sant eller usant: oppstart', ps:[
        ['I et ANS er hver eier ansvarlig for all gjelden i selskapet.', true, 'Kreditorene kan kreve hele beløpet fra én av eierne.'],
        ['Et aksjeselskap har et styre med det overordnete ansvaret.', true, 'Styret skal blant annet sørge for forsvarlig organisering.'],
        ['Forretningsplanen trenger ikke budsjetter.', false, 'Den skal ha resultat- og likviditetsbudsjett for de første årene.'],
        ['Fellesskapstillatelsen gjelder i hele EØS-området.', true, 'Med noen begrensninger for innenlandske oppdrag i andre land.'],
        ['Bedriften må ha en transportleder (ofte daglig leder) som har bestått en prøve hos Statens vegvesen.', true, 'Det er et av kravene for å få løyve.'],
        ['Konkurrentanalyse er en del av forretningsplanen.', true, 'Banken vil vite hvem du skal ta kunder fra.']
      ]},
      { type:'quiz', id:'t2-q3', nivaa:3, tittel:'Begrunn valget', sp:[
        { q:'To søsken driver et ANS. Den ene bruker pengene feil, og selskapet får stor gjeld. Hva betyr det for den andre?', a:['Ingenting – det var ikke hennes feil','Hun kan bli krevd for hele gjelden','Hun kan bare tape 30 000 kr','Staten betaler gjelden'], r:1, f:'I ANS hefter hver eier for all gjeld. Derfor må man stole på medeierne.' },
        { q:'Hvorfor vil banken se både markedsundersøkelse og konkurrentanalyse før den låner ut penger?', a:['For å vite om det finnes kunder som vil betale, og hvem du skal ta salg fra','For å sjekke stavefeil','Fordi loven krever at banken eier en del av bedriften','Det trenger ikke banken'], r:0, f:'Banken vil vurdere om ideen kan gi inntekter nok til å betale tilbake lånet.' },
        { q:'Amir starter ENK med 150 000 kr i sparepenger og 1,5 millioner i banklån. Bedriften går konkurs. Hva er riktig?', a:['Han taper bare sparepengene','Han kan måtte betale resten av lånet fra egen lomme','Banken taper alt','Kundene må betale'], r:1, f:'I ENK hefter eieren personlig for gjelden.' },
        { q:'Hvorfor kan AS likevel ha ulemper for en liten bedrift?', a:['Det kreves aksjekapital og flere formelle krav til styre og regnskap','Det er forbudt å ha ansatte','AS kan ikke få løyve','AS betaler dobbel arbeidsgiveravgift'], r:0, f:'AS gir begrenset ansvar, men mer papirarbeid og formelle krav.' }
      ]},
      { type:'case', id:'t2-case', nivaa:3, tittel:'Case: Amir skal i banken', intro:'Amir har ideen klar og vil låne 1,5 millioner kroner til lastebil og oppstart. Han har et møte med banken neste uke.', steg:[
        { q:'Hva bør Amir ha med seg til møtet?', valg:[
          { t:'En forretningsplan med budsjetter og finansieringsplan', ok:true, f:'Riktig. Uten plan har banken ikke noe å vurdere søknaden ut fra.' },
          { t:'Bare førerkortet sitt', ok:false, f:'Førerkortet viser ikke at bedriften kan bli lønnsom.' },
          { t:'Ingenting – han forklarer muntlig', ok:false, f:'Banken krever skriftlig dokumentasjon.' }
        ]},
        { q:'Banken spør hvor mange andre som kjører for byggevarehandlere i området. Hvilken del av planen svarer på det?', valg:[
          { t:'Konkurrentanalysen', ok:true, f:'Den viser hvem du konkurrerer med og hvordan du skal skille deg ut.' },
          { t:'Organisasjonsplanen', ok:false, f:'Den viser hvem som gjør hva i bedriften.' },
          { t:'Likviditetsbudsjettet', ok:false, f:'Det viser inn- og utbetalinger måned for måned.' }
        ]},
        { q:'Banken spør hvilken foretaksform han har valgt, og hvorfor. Hva er det beste svaret?', valg:[
          { t:'AS, fordi det begrenser min private risiko når bedriften tar opp store lån', ok:true, f:'Godt begrunnet. Banken kan likevel be om personlig kausjon.' },
          { t:'Det har jeg ikke tenkt på', ok:false, f:'Foretaksformen må velges før registrering.' },
          { t:'ENK, fordi da trenger jeg ikke bokføre noe', ok:false, f:'Alle bedrifter har bokføringsplikt og må føre oversikt over inntekter og utgifter.' }
        ]},
        { q:'Banken sier ja. Hva må være på plass før Amir kan kjøre første betalte tur?', valg:[
          { t:'Bedriften må være registrert, og han må ha fellesskapstillatelse med kopi i bilen', ok:true, f:'Riktig. Uten løyve er det ulovlig å kjøre mot betaling.' },
          { t:'Bare en logo på bilen', ok:false, f:'Logo er markedsføring, ikke et krav.' },
          { t:'Ingenting mer', ok:false, f:'Yrkestransport krever løyve.' }
        ]}
      ]},
      { type:'reflect', id:'t2-r1', nivaa:2, tittel:'UB-spor: Velg foretaksform', vis: UB('En ungdomsbedrift registreres gjennom Ungt Entreprenørskap og er en egen ordning for elever – men tenk deg at dere skulle fortsette som en vanlig bedrift etter skolen.'), q:'Hvilken foretaksform ville du valgt for bedriften (din UB eller Ryfylke Nærfrakt) hvis den skulle drives videre etter skolen? Begrunn valget, og forklar hva banken vil se i forretningsplanen.', punkter:[
        'Valgt foretaksform er nevnt (ENK, ANS, DA eller AS)',
        'Begrunnelse knyttet til hvem som er ansvarlig for gjelden',
        'Hvor mange eiere bedriften har',
        'Om bedriften trenger løyve (yrkestransport) eller ikke',
        'Minst tre deler av forretningsplanen',
        'Hvorfor banken vil se planen før den låner ut penger'
      ]}
    ]
  },
  /* ================================================================ T3 */
  {
    id: 't3', lok: 'B-01', tittel: 'Kapitalbehov og finansiering',
    figur: FIGUR.t3,
    kort: 'Startbalanse, anleggs- og omløpsmidler, driftskostnader, lønn og sosiale kostnader, forsikringer og ulike måter å finansiere oppstarten på.',
    bok: 'Læreboka 1.1 (s. 14–32)',
    mal: ['skille mellom anleggsmidler og omløpsmidler','regne ut hva en ansatt koster med sosiale kostnader','forklare de vanligste finansieringskildene og forskjellen på annuitetslån og serielån'],
    punkter: [
      '<b>Startbalansen</b> viser hva bedriften eier (<b>eiendeler</b>) og hvordan det er betalt (<b>egenkapital</b> og <b>gjeld</b>). De to sidene skal alltid være like store.',
      '<b>Anleggsmidler</b> skal eies og brukes over tid: lastebil, truck, laste- og losseutstyr, inventar. <b>Omløpsmidler</b> går rundt i driften: varelager, bankinnskudd, kundefordringer.',
      'Ved oppstart trengs også <b>driftskapital</b>: penger til lønn, husleie, drivstoff, forsikringer og regnskap før kundene har betalt.',
      'En ansatt koster mer enn timelønna. <b>Sosiale kostnader</b> er blant annet <b>feriepenger</b> (10,2 %, eller 12 % med tariffavtale), <b>arbeidsgiveravgift</b> (opptil 14,1 %, avhengig av kommunen), <b>sykelønn i arbeidsgiverperioden</b> (16 dager) og lovpålagt <b>yrkesskadeforsikring</b>.',
      'Lovpålagte forsikringer: <b>yrkesskadeforsikring</b> (når du har ansatte) og <b>trafikkforsikring</b> (alle registrerte kjøretøy). <b>Godsansvarsforsikring</b> er ikke lovpålagt, men nesten alltid nødvendig for å få oppdrag.',
      'Finansiering: <b>egenkapital</b>, <b>banklån</b> (annuitetslån eller serielån), <b>kassekreditt</b>, <b>gjeldsbrevlån</b>, <b>pantelån</b>, <b>leasing</b> og folkefinansiering. Banken krever <b>sikkerhet</b>, for eksempel pant eller en <b>kausjonist</b>.',
      '<b>Annuitetslån:</b> like store terminbeløp. <b>Serielån:</b> like store avdrag, terminbeløpet blir mindre over tid, og samlet rente blir lavere. Sammenlign lån med <b>effektiv rente</b>.',
      'Et stort varelager binder penger. Hyppige, små innkjøp gir lavere gjennomsnittlig lagerverdi og mindre rentekostnad.'
    ],
    ndla: [N.emne, N.forsikring, N.kalkyler],
    arbeidsbok: '1.13, 1.15, 1.28, 1.29, 1.30, 1.31, 1.32',
    aktiviteter: [
      { type:'voks', id:'t3-voks', tittel:'Penger inn kommer etter penger ut', tekst:['De fleste nye bedrifter går ikke konkurs fordi ideen er dårlig. De går tom for penger før kundene har rukket å betale.','Lønna må utbetales i slutten av måneden. Kunden betaler kanskje 30 dager etter at fakturaen er sendt. Det betyr at du må ha penger på konto til å dekke gapet.','Det samme gjelder i privatlivet: Det er lurt å ha en buffer før man kjøper noe stort.'], sporsmal:['Har du opplevd å mangle penger før lønna eller stipendet kom?','Hvordan kunne du planlagt for å unngå det?'], handling:'Sett opp en enkel oversikt over pengene du forventer å få og bruke neste måned.' },
      { type:'flash', id:'t3-flash', tittel:'Begrepskort: kapital og lån', kort:[
        ['Startbalanse','Oversikt over eiendeler og over egenkapital og gjeld når bedriften starter.'],
        ['Anleggsmidler','Eiendeler som skal eies og brukes over tid, f.eks. lastebil og truck.'],
        ['Omløpsmidler','Eiendeler som går rundt i driften: varelager, bankinnskudd, kundefordringer.'],
        ['Egenkapital','Pengene eierne selv skyter inn.'],
        ['Driftskostnader','De løpende kostnadene: lønn, drivstoff, husleie, strøm, forsikring.'],
        ['Sosiale kostnader','Kostnader i tillegg til lønn: feriepenger, arbeidsgiveravgift, sykelønn i arbeidsgiverperioden, yrkesskadeforsikring.'],
        ['Arbeidsgiveravgift','Avgift arbeidsgiveren betaler til staten av lønna. Satsen avhenger av kommunen.'],
        ['Annuitetslån','Lån med like store terminbeløp (avdrag + renter) hele perioden.'],
        ['Serielån','Lån med like store avdrag. Terminbeløpet synker etter hvert.'],
        ['Kassekreditt','Konto med en kredittgrense som bedriften kan trekke på ved behov. Kortsiktig og relativt dyr.'],
        ['Leasing','Langvarig leie av for eksempel kjøretøy. Binder lite kapital.'],
        ['Kausjonist','En person som lover å betale lånet hvis du ikke klarer det selv.'],
        ['Effektiv rente','Den totale kostnaden ved et lån regnet om til rente per år. Brukes for å sammenligne lån.']
      ]},
      { type:'sort', id:'t3-s1', nivaa:1, tittel:'Anleggsmiddel eller omløpsmiddel?', instr:'Sorter eiendelene til Ryfylke Nærfrakt AS.', kat:['Anleggsmiddel','Omløpsmiddel'], items:[
        ['Lastebil',0,'Skal brukes i mange år.'],
        ['Truck til lasting',0,'Varig utstyr.'],
        ['Kontorinventar til 40 000 kr',0,'Varig eie og over beløpsgrensen.'],
        ['Bakløftet på bilen',0,'Varig laste- og losseinnretning.'],
        ['Penger på bankkonto',1,'Går rundt i driften.'],
        ['Penger kundene skylder bedriften',1,'Kundefordringer er omløpsmidler.'],
        ['Lager av paller og strekkfilm',1,'Brukes opp og kjøpes inn igjen.'],
        ['Diesel på egen tank',1,'Innsatsfaktor som brukes opp.']
      ]},
      { type:'quiz', id:'t3-q1', nivaa:1, tittel:'Kapital og kostnader', sp:[
        { q:'Hva er et anleggsmiddel?', a:['Noe bedriften skal eie og bruke over tid','Penger kundene skylder','Varer som skal selges','Lønn til de ansatte'], r:0, f:'For eksempel lastebil, truck og inventar.' },
        { q:'Hva er egenkapital?', a:['Penger eierne selv skyter inn','Lån fra banken','Penger fra kundene','Skatt'], r:0, f:'Egenkapital er eiernes egne penger i bedriften.' },
        { q:'Hvilken forsikring må alle bedrifter med ansatte ha?', a:['Kaskoforsikring','Yrkesskadeforsikring','Brannforsikring','Reiseforsikring'], r:1, f:'Yrkesskadeforsikring er lovpålagt når du har ansatte.' },
        { q:'Hva kjennetegner et serielån?', a:['Like store avdrag – terminbeløpet synker','Like store terminbeløp hele tiden','Ingen renter','Det betales tilbake på én dag'], r:0, f:'Med serielån blir renten mindre etter hvert som lånet betales ned.' },
        { q:'Hvor mange dager betaler arbeidsgiveren sykelønn før NAV overtar?', a:['3 dager','16 dager','30 dager','1 år'], r:1, f:'Arbeidsgiverperioden er 16 dager.' },
        { q:'Hva er leasing?', a:['Langvarig leie av for eksempel en lastebil','Et lån uten renter','En type forsikring','Å selge bedriften'], r:0, f:'Ved leasing betaler du en fast månedlig leie og binder lite kapital.' }
      ]},
      { type:'calc', id:'t3-c1', nivaa:2, gen:'liste', tittel:'Hva koster en ansatt?', antall:5, oppg:[
        { task:'En sjåfør har 180 kr i timen og jobber 1 800 timer i året. Hva er årslønna?', ans:324000, unit:'kr', steps:['180 kr × 1 800 timer = 324 000 kr'] },
        { task:'Årslønna er 324 000 kr. Bedriften har tariffavtale (12 % feriepenger). Hvor mye er feriepengene?', ans:38880, unit:'kr', steps:['324 000 kr × 0,12 = 38 880 kr'] },
        { task:'Lønn og feriepenger er til sammen 362 880 kr. Arbeidsgiveravgiften er 14,1 %. Hvor mye arbeidsgiveravgift betaler bedriften?', ans:51166, unit:'kr', tol:2, steps:['362 880 kr × 0,141 = 51 166 kr (avrundet)'] },
        { task:'En sjåfør koster 324 000 kr i lønn, 38 880 kr i feriepenger, 51 166 kr i arbeidsgiveravgift og 3 000 kr i yrkesskadeforsikring. Hva er total kostnad per år?', ans:417046, unit:'kr', steps:['324 000 + 38 880 + 51 166 + 3 000 = 417 046 kr'] },
        { task:'En sjåfør har 200 kr i timen og er syk i 2 uker à 37,5 timer. Hva koster sykelønna i arbeidsgiverperioden?', ans:15000, unit:'kr', steps:['200 kr × 2 × 37,5 timer = 15 000 kr'] },
        { task:'En sjåfør jobber 50 overtidstimer i året med 40 % tillegg. Timelønna er 200 kr. Hva koster overtiden?', ans:14000, unit:'kr', steps:['200 kr × 1,4 = 280 kr per time','280 kr × 50 timer = 14 000 kr'] }
      ]},
      { type:'quiz', id:'t3-q2', nivaa:2, tittel:'Finansiering i praksis', sp:[
        { q:'Amir har ikke råd til å kjøpe lastebil kontant og vil binde minst mulig kapital. Hva passer best?', a:['Leasing','Kassekreditt','Å betale med kredittkort','Å vente fem år'], r:0, f:'Leasing gir fast månedsleie og binder lite kapital. Leasingselskapet sjekker likevel kredittverdigheten.' },
        { q:'Bedriften har jevnt trukket mye på kassekreditten hele året. Hva er problemet?', a:['Kassekreditt er en relativt dyr låneform når mye er trukket','Kassekreditt er gratis','Banken må betale renter til bedriften','Det er forbudt'], r:0, f:'Kassekreditt er laget for korte svingninger, ikke for fast finansiering.' },
        { q:'Hvilket lån gir lavest samlet rente med samme beløp, rente og nedbetalingstid?', a:['Annuitetslån','Serielån','De er helt like','Kassekreditt'], r:1, f:'Med serielån betaler du ned mer i starten, så renten regnes av en mindre restgjeld.' },
        { q:'Du sammenligner to lån. Hva bør du se på?', a:['Den effektive renten','Bare den nominelle renten','Fargen på brosjyren','Hvor nær banken ligger'], r:0, f:'Effektiv rente tar med gebyrer og gir riktig sammenligning.' },
        { q:'Bedriften har ett års forbruk på lager fra januar. Hva er ulempen?', a:['Mye kapital er bundet i lageret, og bedriften betaler renter av den','Varene blir billigere','Det er lovpålagt','Ingen ulempe'], r:0, f:'Hyppige, mindre innkjøp gir lavere gjennomsnittlig lagerverdi.' },
        { q:'Hvilken forsikring dekker skade lastebilen gjør på andre personer og andres eiendom?', a:['Trafikkforsikring','Godsansvarsforsikring','Yrkesskadeforsikring','Brannforsikring'], r:0, f:'Trafikkforsikringen er lovpålagt for alle registrerte kjøretøy.' }
      ]},
      { type:'tf', id:'t3-tf', nivaa:1, tittel:'Sant eller usant: kapital', ps:[
        ['Eiendeler og egenkapital + gjeld skal alltid være like store i balansen.', true, 'Det er derfor det heter balanse.'],
        ['Et annuitetslån har like store terminbeløp så lenge renten ikke endres.', true, 'Avdraget øker og renten synker, men summen er lik.'],
        ['Feriepenger er en del av de sosiale kostnadene.', true, 'De kommer i tillegg til lønna.'],
        ['En bedrift uten ansatte må tegne yrkesskadeforsikring.', false, 'Plikten gjelder når bedriften har ansatte.'],
        ['Kundefordringer er et anleggsmiddel.', false, 'Det er penger som skal komme inn snart – et omløpsmiddel.'],
        ['En kausjonist må betale hvis låntakeren ikke klarer det selv.', true, 'Derfor bør man tenke seg nøye om før man spør noen.']
      ]},
      { type:'quiz', id:'t3-q3', nivaa:3, tittel:'Vurder økonomien', sp:[
        { q:'Bedriften har dårlig likviditet: kundene betaler sent, og regningene hoper seg opp. Hvilket tiltak er best på kort sikt?', a:['Korte inn betalingsfristen til kundene, f.eks. fra 45 til 30 dager','Kjøpe en lastebil til','Øke varelageret','Slutte å sende fakturaer'], r:0, f:'Raskere innbetalinger bedrer likviditeten. Utvidet kassekreditt er en dyrere løsning.' },
        { q:'Hvorfor bør anleggsmidler finansieres med langsiktig kapital?', a:['Fordi de skal brukes i mange år, og da bør lånet også gå over flere år','Fordi banken ikke gir korte lån','Fordi det er billigere å kjøpe kontant','Det er likegyldig'], r:0, f:'Sunn finansiering: anleggsmidler og en del av omløpsmidlene med langsiktig kapital.' },
        { q:'En sjåfør har 200 kr timen. Daglig leder regner med at han koster 200 kr × 1 794 timer = 358 800 kr i året. Hva har han glemt?', a:['Feriepenger, arbeidsgiveravgift, sykelønn og forsikring','Ingenting','Momsen på lønna','Bompenger'], r:0, f:'Med sosiale kostnader blir den virkelige kostnaden langt høyere.' },
        { q:'Lagerverdien i en grossist øker uten at salget øker. Hva bør styret be daglig leder gjøre?', a:['Rydde ut varer som sjelden selges','Kjøpe inn mer av alle varer for å få kvantumsrabatt','Øke lønna til lagerarbeiderne','Leie et større lager'], r:0, f:'Ukurante varer og varer som sjelden selges, binder kapital og gir rentekostnader.' }
      ]},
      { type:'reflect', id:'t3-r1', nivaa:2, tittel:'UB-spor: Hva trenger vi for å starte?', vis: UB('Lag en enkel oversikt over hva dere trenger.'), q:'Sett opp en enkel oversikt over kapitalbehovet for bedriften din (UB-en eller Ryfylke Nærfrakt). Hva må dere kjøpe eller leie (anleggsmidler)? Hva trenger dere i omløpsmidler? Hvordan skal det finansieres?', punkter:[
        'Minst to anleggsmidler eller ting som leies/leases',
        'Minst ett omløpsmiddel (f.eks. varelager eller penger på konto)',
        'Løpende kostnader de første månedene',
        'Hvor mye egenkapital dere har',
        'Hvordan resten skal finansieres (lån, leasing, aksjekapital e.l.)',
        'Om dere trenger forsikring, og hvilken'
      ]}
    ]
  },
  /* ================================================================ T4 */
  {
    id: 't4', lok: 'B-02', tittel: 'Marked og konkurrenter',
    kort: 'Markedsundersøkelse, markedsmiksen (de fire P-ene), konkurrentanalyse og Porters fem krefter.',
    bok: 'Læreboka 1.1 (s. 23–27)',
    mal: ['forklare hvorfor en markedsundersøkelse er viktig før oppstart','bruke de fire P-ene på en transportbedrift','gjennomføre en enkel konkurrentanalyse'],
    punkter: [
      'En <b>markedsundersøkelse</b> skal vise om det finnes nok kunder som vil betale. Bommer du på markedet, kan et budsjettert overskudd fort bli et underskudd.',
      '<b>Markedsmiksen – de fire P-ene:</b> <b>Produkt</b> (tjenesten og kvaliteten), <b>Pris</b> (inkludert rabatter og betalingsvilkår), <b>Plass</b> (distribusjon – hvordan kunden får tak i tjenesten) og <b>Påvirkning</b> (markedsføring).',
      'Mange legger til en femte P: <b>Personale</b>. Kundene forventer god service, så opplæring av de ansatte er viktig.',
      'En <b>konkurrentanalyse</b> kartlegger hvem konkurrentene er, hvor store de er, hva de koster, hva de er gode på og hvordan kundene oppfatter dem.',
      '<b>Porters fem krefter</b> er en modell for konkurransen i en bransje: fare for nye konkurrenter, rivalisering mellom dagens bedrifter, fare for erstatningsprodukter (substitutter), kundenes forhandlingsmakt og leverandørenes forhandlingsmakt.',
      'Totalmarkedet vokser sjelden mye når en ny bedrift starter. Kundene du får, må du som regel ta fra konkurrentene.'
    ],
    ndla: [N.emne, N.kalkyler],
    arbeidsbok: '1.14',
    aktiviteter: [
      { type:'voks', id:'t4-voks', tittel:'Hvorfor velger kunden deg?', tekst:['Kunden har nesten alltid et annet valg. Det kan være en konkurrent, eller at kunden fortsetter å gjøre jobben selv.','Prisen betyr mye – men mange kunder bytter ikke for noen få kroner. De bytter fordi noen svarer når de ringer, kommer når de har lovet, og løser problemer uten å klage.','Det samme gjelder deg som arbeidstaker: Hva gjør at en arbeidsgiver velger deg?'], sporsmal:['Hva får deg til å handle i én butikk i stedet for en annen?','Hva kan du gjøre for at folk skal velge deg – på jobb eller i praksis?'], handling:'Skriv ned tre ting du tror en kunde i transportbransjen setter mest pris på.' },
      { type:'flash', id:'t4-flash', tittel:'Begrepskort: marked', kort:[
        ['Markedsundersøkelse','Undersøkelse av om det finnes kunder som vil kjøpe, og hva de vil betale.'],
        ['Markedsmiks','Kombinasjonen av virkemidler bedriften bruker: de fire P-ene.'],
        ['Produkt','Tjenesten eller varen, med kvalitet, utforming og merkevare.'],
        ['Pris','Det kunden betaler – også rabatter og betalingsvilkår.'],
        ['Plass','Distribusjon: hvordan og hvor kunden får tjenesten.'],
        ['Påvirkning','Markedsføring: annonser, sosiale medier, salg.'],
        ['Personale','Den femte P-en: ansatte som gir god service.'],
        ['Konkurrentanalyse','Kartlegging av konkurrentene: størrelse, pris, kvalitet og hvordan de oppfattes.'],
        ['Substitutt','Et annet produkt som kan dekke det samme behovet, f.eks. at kunden kjører selv.'],
        ['Porters fem krefter','Modell for å analysere konkurransen i en bransje.']
      ]},
      { type:'match', id:'t4-m1', nivaa:1, tittel:'De fire P-ene for Ryfylke Nærfrakt', instr:'Koble P-en med riktig tiltak.', par:[
        ['Produkt','Levering innen avtalt tidsvindu på 30 minutter'],
        ['Pris','10 % rabatt til faste kunder'],
        ['Plass','Kundene bestiller transport via en enkel app'],
        ['Påvirkning','Annonse på sosiale medier og besøk hos byggevarehandlere'],
        ['Personale','Sjåførene får kurs i kundebehandling']
      ]},
      { type:'quiz', id:'t4-q1', nivaa:1, tittel:'Marked og markedsmiks', sp:[
        { q:'Hva står de fire P-ene for?', a:['Produkt, pris, plass og påvirkning','Penger, plan, personale og profitt','Pall, pakke, post og pris','Produkt, profitt, prosess og plan'], r:0, f:'Product, Price, Place og Promotion.' },
        { q:'Hvilken P handler om markedsføring?', a:['Påvirkning','Plass','Pris','Produkt'], r:0, f:'Påvirkning er annonser, sosiale medier og salg.' },
        { q:'Hva er hensikten med en markedsundersøkelse?', a:['Å finne ut om det finnes kunder som vil betale','Å registrere bedriften','Å regne ut skatten','Å ansette folk'], r:0, f:'Uten kunder blir det ingen inntekter.' },
        { q:'Hva er den femte P-en mange legger til i tjenesteytende bedrifter?', a:['Personale','Profitt','Plattform','Pall'], r:0, f:'God service krever godt opplært personale.' },
        { q:'Hva kartlegger en konkurrentanalyse?', a:['Hvem konkurrentene er, og hvilken pris og kvalitet de har','Hvor mye lønn de ansatte skal ha','Hvilke forsikringer som er lovpålagt','Hvor bedriften skal registreres'], r:0, f:'Du må vite hvem du skal ta kunder fra.' },
        { q:'Hva er et substitutt?', a:['Noe annet som dekker det samme behovet','En vikar','En type lån','En leverandør'], r:0, f:'For transport kan det være at kunden kjører varene selv.' }
      ]},
      { type:'quiz', id:'t4-q2', nivaa:2, tittel:'Bruk modellene', sp:[
        { q:'Ryfylke Nærfrakt gir rabatt og 30 dagers betalingsfrist. Hvilken P er dette?', a:['Pris','Produkt','Plass','Påvirkning'], r:0, f:'Rabatter og betalingsvilkår hører til prisen.' },
        { q:'En byggevarekjede vurderer å kjøpe egne lastebiler i stedet for å leie transport. Hvilken av Porters krefter er dette?', a:['Fare for substitutter','Leverandørenes makt','Rivalisering','Ingen av dem'], r:0, f:'Egentransport kan erstatte tjenesten din.' },
        { q:'En stor kunde krever lavere pris og truer med å bytte transportør. Hvilken kraft er dette?', a:['Kundenes forhandlingsmakt','Fare for nye konkurrenter','Leverandørenes forhandlingsmakt','Substitutter'], r:0, f:'Store kunder kan presse prisen.' },
        { q:'Bare ett firma selger lastebiler av den typen Amir trenger, og prisen stiger. Hvilken kraft er dette?', a:['Leverandørenes forhandlingsmakt','Kundenes makt','Rivalisering','Substitutter'], r:0, f:'Få leverandører gir dem mer makt.' },
        { q:'Hvilken markedsføring er mest realistisk for en ny, liten transportbedrift?', a:['TV-reklame i beste sendetid','Besøk hos aktuelle kunder, lokalavis og sosiale medier','Reklame på verdensmesterskap','Ingen markedsføring'], r:1, f:'Ved oppstart er budsjettet lite – målrettet og lokalt fungerer best.' },
        { q:'Amir budsjetterte med 10 turer per dag, men får bare 7. Hva viser dette?', a:['Hvor viktig en grundig markedsundersøkelse er','At lastebilen er for liten','At han burde hatt flere ansatte','At budsjettet var unødvendig'], r:0, f:'I lærebokas eksempel snur et overskudd til et underskudd når salget svikter med 30 %.' }
      ]},
      { type:'tf', id:'t4-tf', nivaa:2, tittel:'Sant eller usant: marked', ps:[
        ['Når en ny transportbedrift starter, vokser totalmarkedet vanligvis mye.', false, 'Kundene må som regel tas fra konkurrentene.'],
        ['Pris er ofte et avgjørende konkurransemiddel.', true, 'Prisen må stå i forhold til verdien kunden opplever.'],
        ['Plass handler om hvor bedriften har kontoret sitt.', false, 'Plass handler om distribusjon – hvordan kunden får tjenesten.'],
        ['Mange sosiale medier har regler for reklame.', true, 'Derfor må man sjekke reglene før man annonserer.'],
        ['En markedsplan gjelder gjerne for et par år.', true, 'Den samordner markedsføringstiltakene.'],
        ['Porters modell handler om lønn til de ansatte.', false, 'Den handler om konkurransekreftene i en bransje.']
      ]},
      { type:'quiz', id:'t4-q3', nivaa:3, tittel:'Vurder konkurransen', sp:[
        { q:'Tre store transportfirmaer kjører allerede for byggevarehandlerne til lav pris. Hva er den beste strategien for Ryfylke Nærfrakt?', a:['Konkurrere bare på enda lavere pris','Skille seg ut med noe kundene verdsetter, f.eks. presis levering og fleksible tider','Gi opp med en gang','Kopiere den største konkurrenten'], r:1, f:'En liten bedrift vinner sjelden priskrig. Den må finne noe den kan være best på.' },
        { q:'Hvorfor kan det være lurt å legge seg litt under konkurrentenes pris det første året?', a:['For lettere å få innpass i markedet, og så heve prisen senere','Fordi det alltid gir mest overskudd','Fordi loven krever det','Det er aldri lurt'], r:0, f:'Mange gjør det i starten, men budsjettet må tåle det.' },
        { q:'Hvorfor er personalet (den femte P-en) ekstra viktig i transport?', a:['Fordi sjåføren ofte er den eneste kunden møter','Fordi sjåførene bestemmer prisen','Fordi det er lovpålagt','Det er ikke viktig'], r:0, f:'Sjåførens opptreden er bedriftens ansikt utad.' },
        { q:'En konkurrent har mange klager på forsinkelser. Hvordan kan Ryfylke Nærfrakt bruke det?', a:['Gjøre presis levering til hovedbudskapet i markedsføringen – og holde det','Snakke stygt om konkurrenten','Ignorere det','Senke prisen til null'], r:0, f:'Svakheter hos konkurrenten er muligheter – men du må kunne levere selv.' }
      ]},
      { type:'reflect', id:'t4-r1', nivaa:2, tittel:'UB-spor: Markedsmiks og konkurrenter', vis: UB('Fyll ut de fire P-ene og finn minst én konkurrent.'), q:'Beskriv markedsmiksen for bedriften din (UB-en eller Ryfylke Nærfrakt): produkt, pris, plass og påvirkning. Hvem er den viktigste konkurrenten, og hvorfor skal kundene velge dere?', punkter:[
        'Produkt: hva dere selger og hvilken kvalitet',
        'Pris: hva det koster, eventuelt rabatter',
        'Plass: hvordan kunden får tak i produktet',
        'Påvirkning: hvordan dere når kundene',
        'Minst én konkurrent eller ett alternativ kunden har',
        'Hva som gjør dere bedre eller annerledes'
      ]}
    ]
  },
  /* ================================================================ T5 */
  {
    id: 't5', lok: 'C-01', tittel: 'Ledelse, plikter og rettigheter',
    figur: FIGUR.t5,
    kort: 'Ansvaret du tar som bedriftseier, interessentene, organisasjonsplan, planleggingsnivåer, og arbeidsgivers og arbeidstakers plikter og rettigheter.',
    bok: 'Læreboka 1.2 (s. 33–37) og kap. 10.2 (s. 276–282)',
    mal: ['forklare hvilket ansvar du tar når du starter en bedrift med ansatte','lage en enkel organisasjonsplan og skille mellom de tre planleggingsnivåene','gi eksempler på arbeidsgivers og arbeidstakers plikter og rettigheter'],
    punkter: [
      'Som bedriftseier tar du ansvar overfor <b>interessentene</b>: eiere og långivere, kunder, leverandører, ansatte og lærlinger, og samfunnet (skatter og avgifter).',
      'I et <b>AS</b> har <b>styret</b> det overordnete ansvaret: forsvarlig organisering, planer og budsjetter, og kontroll med økonomien. <b>Daglig leder</b> står for den daglige driften.',
      'En <b>organisasjonsplan</b> viser hvem som gjør hva og hvem som gir beskjeder til hvem. Hver stilling bør ha en <b>stillingsinstruks</b>.',
      'Tre planleggingsnivåer: <b>strategisk</b> (langsiktig, styret), <b>taktisk</b> (ressurser og budsjett for ett år) og <b>operativ</b> (den daglige driften). I en liten bedrift gjør daglig leder alt.',
      '<b>Arbeidsgiverens plikter:</b> betale lønn (lønnsplikt), sørge for et trygt og godt arbeidsmiljø (omsorgsplikt), gi arbeid (sysselsettingsplikt) og gi en <b>skriftlig arbeidsavtale</b> (arbeidsmiljøloven). Arbeidsgiveren har <b>styringsrett</b>: retten til å lede, fordele og kontrollere arbeidet.',
      '<b>Arbeidstakerens plikter:</b> gjøre jobben ordentlig (arbeidsplikt), følge rimelige beskjeder (lydighetsplikt), ivareta arbeidsgiverens interesser (lojalitetsplikt) og bidra i HMS-arbeidet (medvirkningsplikt).',
      'Lydighetsplikten har en grense: Arbeidsmiljøloven sier at arbeidstakeren skal <b>avbryte arbeidet</b> hvis det ikke kan fortsette uten fare for liv eller helse, og si fra til arbeidsgiver og verneombud.'
    ],
    ndla: [N.plikter, N.lover, N.etikk],
    arbeidsbok: '1.16, 1.24, 1.26, 1.27 (og 10.24, 10.26, 10.29 i kap. 10)',
    aktiviteter: [
      { type:'voks', id:'t5-voks', tittel:'Lojal – men ikke lydig til alt', tekst:['En god arbeidstaker gjør jobben sin, møter presis og står opp for bedriften. Men lojalitet betyr ikke å si ja til alt.','Hvis lederen ber deg kjøre en truck med dårlige bremser, er det mest lojale du kan gjøre å si nei – og forklare hvorfor. En ulykke koster bedriften mye mer enn en forsinket leveranse.','Å si fra på en ordentlig måte er en ferdighet. Det kan øves på.'], sporsmal:['Har du vært i en situasjon der du burde sagt fra, men ikke gjorde det?','Hva gjør det lettere å si fra til en voksen eller en leder?'], handling:'Skriv ned en setning du kan bruke når du må si nei av sikkerhetshensyn, for eksempel: «Jeg kan ikke kjøre den før bremsene er sjekket. Kan vi se på det sammen?»' },
      { type:'flash', id:'t5-flash', tittel:'Begrepskort: ledelse og arbeidsliv', kort:[
        ['Interessenter','Alle som har interesse i bedriften: eiere, långivere, kunder, leverandører, ansatte og samfunnet.'],
        ['Styret','Har det overordnete ansvaret i et aksjeselskap.'],
        ['Daglig leder','Har ansvaret for den daglige driften.'],
        ['Organisasjonsplan','Oversikt over stillingene i bedriften og hvem som gir beskjeder til hvem.'],
        ['Stillingsinstruks','Beskrivelse av ansvaret og oppgavene til en stilling.'],
        ['Strategisk planlegging','Langsiktig planlegging, gjerne flere år fram. Styrets ansvar.'],
        ['Taktisk planlegging','Ressursplanlegging og budsjett for ett år.'],
        ['Operativ planlegging','Planlegging av den daglige driften og oppdragene.'],
        ['Styringsrett','Arbeidsgiverens rett til å lede, fordele og kontrollere arbeidet.'],
        ['Lojalitetsplikt','Arbeidstakeren skal ivareta arbeidsgiverens interesser, f.eks. ikke jobbe for en konkurrent.'],
        ['Lydighetsplikt','Arbeidstakeren skal følge rimelige beskjeder – men ikke beskjeder som setter liv og helse i fare.'],
        ['Omsorgsplikt','Arbeidsgiveren skal sørge for et trygt og godt arbeidsmiljø.'],
        ['Medvirkningsplikt','Arbeidstakeren skal bidra i HMS-arbeidet, bruke verneutstyr og si fra om farer.']
      ]},
      { type:'sort', id:'t5-s1', nivaa:1, tittel:'Hvem har plikten?', instr:'Er dette arbeidsgiverens eller arbeidstakerens plikt?', kat:['Arbeidsgiver','Arbeidstaker'], items:[
        ['Betale lønn for arbeidet',0,'Lønnsplikt.'],
        ['Sørge for et trygt arbeidsmiljø',0,'Omsorgsplikt.'],
        ['Gi skriftlig arbeidsavtale',0,'Krav i arbeidsmiljøloven.'],
        ['Tegne yrkesskadeforsikring',0,'Lovpålagt for arbeidsgivere.'],
        ['Gi arbeid i oppsigelsestiden',0,'Sysselsettingsplikt.'],
        ['Møte presis og gjøre jobben ordentlig',1,'Arbeidsplikt.'],
        ['Følge rimelige beskjeder fra lederen',1,'Lydighetsplikt.'],
        ['Ikke gi kundelista til en konkurrent',1,'Lojalitetsplikt.'],
        ['Bruke påbudt verneutstyr',1,'Medvirkningsplikt.']
      ]},
      { type:'quiz', id:'t5-q1', nivaa:1, tittel:'Ledelse og plikter', sp:[
        { q:'Hvem har det overordnete ansvaret i et aksjeselskap?', a:['Styret','Kundene','Sjåførene','Banken'], r:0, f:'Styret skal sørge for forsvarlig organisering og kontroll.' },
        { q:'Hva viser en organisasjonsplan?', a:['Hvem som gjør hva, og hvem som gir beskjeder til hvem','Hvor mye bedriften tjener','Hvilke kunder bedriften har','Kjøreruta til sjåførene'], r:0, f:'Den viser stillingene og linjene mellom dem.' },
        { q:'Hva er styringsrett?', a:['Arbeidsgiverens rett til å lede, fordele og kontrollere arbeidet','Sjåførens rett til å velge rute','Styrets rett til å kjøre bil','Kundens rett til rabatt'], r:0, f:'Styringsretten gjelder innenfor lover og avtaler.' },
        { q:'Hvilken plikt bryter en ansatt som tar oppdrag for en konkurrent uten å avtale det?', a:['Lojalitetsplikten','Lønnsplikten','Omsorgsplikten','Sysselsettingsplikten'], r:0, f:'Lojalitetsplikten gjelder også fritiden når det går ut over arbeidsgiveren.' },
        { q:'Hva skal arbeidsgiveren alltid gi en ny ansatt?', a:['En skriftlig arbeidsavtale','En firmabil','Gratis lunsj','En bonus'], r:0, f:'Arbeidsmiljøloven krever skriftlig arbeidsavtale.' },
        { q:'Hvilket planleggingsnivå handler om dagens kjøreruter?', a:['Operativ planlegging','Strategisk planlegging','Taktisk planlegging','Visjon'], r:0, f:'Det operative nivået er den daglige driften.' }
      ]},
      { type:'quiz', id:'t5-q2', nivaa:2, tittel:'Plikter i praksis', sp:[
        { q:'Truckens bremser virker dårlig. Lederen sier: «Kjør likevel.» Hva gjør du?', a:['Kjører forsiktig – lydighetsplikten gjelder så lenge sjefen har bestemt','Lar være å kjøre og sier fra til leder og verneombud','Går hjem uten å si noe til noen','Ber en kollega med mer erfaring kjøre i stedet'], r:1, f:'Du skal avbryte arbeidet hvis det ikke kan gjøres uten fare for liv eller helse.' },
        { q:'Sara har jobbet i tre uker uten å ha fått arbeidsavtale. Hvem har ansvaret for at hun får en?', a:['Arbeidsgiveren','Sara','Fagforeningen','NAV'], r:0, f:'Det er arbeidsgiverens plikt. Avtalen skal være skriftlig senest sju dager etter at arbeidsforholdet startet.' },
        { q:'Daglig leder sier at Ali skal kjøre Sandnes-ruta i stedet for Stavanger i dag. Er det lov?', a:['Ja, det er en del av styringsretten innenfor arbeidsavtalen','Nei, Ali bestemmer ruta selv','Bare hvis kunden sier ja','Bare med tillatelse fra NAV'], r:0, f:'Arbeidsgiveren kan fordele arbeidet innenfor rammene av avtalen.' },
        { q:'En sjåfør forteller kundelisten til en venn som driver et konkurrerende firma. Hva er riktig?', a:['Det er brudd på lojalitetsplikten','Det er helt greit','Det er arbeidsgiverens feil','Det er bare galt hvis kunden klager'], r:0, f:'Arbeidstakeren skal holde forretningshemmeligheter for seg selv.' },
        { q:'Styret bestemmer at bedriften skal satse på kjøletransport om tre år. Hvilket planleggingsnivå er dette?', a:['Strategisk','Operativt','Taktisk','Ingen'], r:0, f:'Langsiktige valg om hva bedriften skal drive med, er strategisk planlegging.' },
        { q:'Hvem er en interessent i Ryfylke Nærfrakt AS?', a:['Banken som har lånt ut penger','Alle i verden','Bare eieren','Ingen'], r:0, f:'Långivere, kunder, ansatte, leverandører og samfunnet er interessenter.' }
      ]},
      { type:'tf', id:'t5-tf', nivaa:2, tittel:'Sant eller usant: arbeidslivet', ps:[
        ['Lydighetsplikten betyr at du alltid må gjøre det sjefen sier.', false, 'Den gjelder ikke beskjeder som setter liv og helse i fare eller er ulovlige.'],
        ['I en liten bedrift kan samme person være styreleder og daglig leder.', true, 'Da er det viktig å holde rollene fra hverandre.'],
        ['Arbeidstakeren har plikt til å bruke påbudt verneutstyr.', true, 'Det er en del av medvirkningsplikten.'],
        ['Taktisk planlegging gjelder gjerne ett budsjettår.', true, 'Det handler om ressurser og budsjett.'],
        ['Bedriften betaler skatt og avgifter som går til kommunen og staten.', true, 'Samfunnet er en interessent.'],
        ['Arbeidsgiveren kan selv velge om de ansatte skal ha arbeidsavtale.', false, 'Skriftlig arbeidsavtale er lovpålagt.']
      ]},
      { type:'quiz', id:'t5-q3', nivaa:3, tittel:'Vurder situasjonen', sp:[
        { q:'Regnskapsføreren vil at sjåførene skal levere timelister fredag. Hvordan bør beskjeden gå i en liten bedrift med daglig leder øverst?', a:['Via daglig leder, som gir beskjed til sjåførene','Regnskapsføreren bestemmer over sjåførene','Kunden gir beskjed','Det er ikke mulig å gi slike beskjeder'], r:0, f:'Regnskapsføreren er stab. Beskjeder til sjåførene går gjennom linjen.' },
        { q:'En ansatt kjører taxi i helgene. Når kan det være brudd på lojalitetsplikten?', a:['Når det går ut over hovedjobben eller konkurrerer med arbeidsgiveren','Aldri','Alltid','Bare hvis taxien er gul'], r:0, f:'Ekstrajobb er ikke forbudt i seg selv, men den må ikke skade arbeidsgiveren.' },
        { q:'Hvorfor er det viktig å skille mellom rollen som styreleder og daglig leder, selv om det er samme person?', a:['Fordi styret skal kontrollere den daglige ledelsen og har et annet ansvar','Fordi de må ha forskjellig lønn','Fordi loven krever to kontorer','Det er ikke viktig'], r:0, f:'Styret fører tilsyn med den daglige driften. Alle transaksjoner bør dokumenteres.' },
        { q:'En ansatt ser at en kollega blir trakassert. Hva sier medvirkningsplikten?', a:['Hun skal sørge for at arbeidsgiver eller verneombud får vite om det','Det angår ikke henne','Hun skal ordne opp selv uten å si noe','Hun skal slutte i jobben'], r:0, f:'Arbeidstakere skal si fra om trakassering og diskriminering.' }
      ]},
      { type:'case', id:'t5-case', nivaa:3, tittel:'Case: Første ansatte i Ryfylke Nærfrakt', intro:'Amir har fått så mange oppdrag at han ansetter Kim som sjåfør. Han har aldri vært arbeidsgiver før.', steg:[
        { q:'Hva må Amir sørge for når Kim begynner?', valg:[
          { t:'Lage en skriftlig arbeidsavtale og tegne yrkesskadeforsikring', ok:true, f:'Riktig. Skriftlig arbeidsavtale er lovpålagt og skal være på plass senest sju dager etter oppstart. Yrkesskadeforsikringen må gjelde fra første arbeidsdag.' },
          { t:'Ingenting – det holder med et håndtrykk', ok:false, f:'Arbeidsavtalen skal være skriftlig.' },
          { t:'Be Kim tegne forsikring selv', ok:false, f:'Yrkesskadeforsikringen er arbeidsgiverens plikt.' }
        ]},
        { q:'Kim spør hva han egentlig skal gjøre i jobben. Hva bør Amir lage?', valg:[
          { t:'En stillingsinstruks som beskriver ansvar og oppgaver', ok:true, f:'Den gjør det tydelig hva Kim har ansvar for.' },
          { t:'Et budsjett', ok:false, f:'Budsjettet handler om penger, ikke om Kims oppgaver.' },
          { t:'En markedsplan', ok:false, f:'Markedsplanen handler om kundene.' }
        ]},
        { q:'Kim sier fra at stroppene i bilen er slitte. Amir er stresset og sier «bruk dem i dag». Hva er riktig av Kim?', valg:[
          { t:'Nekte å bruke dem, forklare hvorfor og melde avvik', ok:true, f:'Riktig. Slitt sikringsutstyr kan gi fare for liv og helse.' },
          { t:'Bruke dem – sjefen har bestemt', ok:false, f:'Lydighetsplikten gjelder ikke når sikkerheten står på spill.' },
          { t:'Kjøpe nye stropper med egne penger', ok:false, f:'Det er arbeidsgiverens ansvar å skaffe forsvarlig utstyr.' }
        ]},
        { q:'Kim kjører for en konkurrent i helgene uten å si fra. Hva er riktig?', valg:[
          { t:'Det kan være brudd på lojalitetsplikten, og Amir bør ta en samtale med Kim', ok:true, f:'Arbeid i konkurranse med arbeidsgiveren er i utgangspunktet ikke tillatt.' },
          { t:'Amir kan si opp Kim med en gang uten samtale', ok:false, f:'Det kreves saklig grunn og riktig framgangsmåte.' },
          { t:'Det har ingenting med Amir å gjøre', ok:false, f:'Det kan skade Amirs bedrift.' }
        ]}
      ]},
      { type:'reflect', id:'t5-r1', nivaa:2, tittel:'UB-spor: Hvem gjør hva hos oss?', vis: UB('Lag organisasjonsplan og en samarbeidsavtale.'), q:'Lag en organisasjonsplan for bedriften din (UB-en eller Ryfylke Nærfrakt) med roller og ansvar. Skriv også en kort samarbeidsavtale med tre plikter og tre rettigheter som gjelder for alle i teamet.', punkter:[
        'Daglig leder eller tilsvarende rolle er med',
        'Minst to andre roller med ansvar (f.eks. økonomi, marked, produksjon/logistikk)',
        'Hvem som gir beskjeder til hvem',
        'Tre plikter (f.eks. møte presis, gjøre sin del, si fra om problemer)',
        'Tre rettigheter (f.eks. bli hørt, få hjelp, få informasjon)',
        'Hva som skjer hvis noen ikke følger avtalen'
      ]}
    ]
  },
  /* ================================================================ T6 */
  {
    id: 't6', lok: 'C-02', tittel: 'Budsjett, regnskap og økonomisk styring',
    figur: FIGUR.t6,
    kort: 'Styringssystemet med mål, budsjett og regnskap, avvik og handlingsplaner, resultat- og likviditetsbudsjett, balanse og krav til faktura.',
    bok: 'Læreboka 1.3 (s. 37–45)',
    mal: ['forklare forskjellen på budsjett og regnskap','regne ut avvik mellom budsjett og regnskap','sette opp et enkelt resultatbudsjett og forklare hva et likviditetsbudsjett viser','nevne hva en faktura skal inneholde'],
    punkter: [
      'Målet for alle transport- og logistikkbedrifter er <b>lønnsom drift</b>. For å styre mot målet bruker bedriften tre verktøy: <b>mål</b>, <b>budsjett</b> og <b>regnskap</b>.',
      'Et <b>budsjett</b> er en plan i kroner for en framtidig periode. <b>Regnskapet</b> viser det som faktisk skjedde. Forskjellen kalles <b>avvik</b> – i kroner og i prosent.',
      'Ved store avvik setter bedriften inn <b>tiltak</b>. En <b>handlingsplan</b> viser hva som skal gjøres, hvem som har ansvaret og fristen.',
      '<b>Resultatbudsjettet</b> viser inntekter og kostnader og om bedriften går med overskudd. Ved oppstart lages det for de tre første årene. Man starter ofte med <b>salgsbudsjettet</b>: antall × pris.',
      '<b>Likviditetsbudsjettet</b> viser når pengene kommer inn og går ut, måned for måned. Bedriften må alltid ha penger til å betale regningene når de forfaller.',
      '<b>Balansen</b> viser eiendeler og egenkapital + gjeld på et bestemt tidspunkt. Overskudd bygger opp egenkapitalen, underskudd tærer på den.',
      'Alle bedrifter må <b>bokføre</b> etter bokføringsloven, og AS må i tillegg lage <b>årsregnskap</b> etter regnskapsloven. En <b>faktura</b> skal blant annet ha organisasjonsnummer, fakturanummer i løpende rekkefølge, dato, selger og kjøper, hva som er levert og når, pris og forfallsdato, og eventuell merverdiavgift. For AS skal også ordet «Foretaksregisteret» stå på fakturaen.'
    ],
    ndla: [N.emne, N.kalkyler],
    arbeidsbok: '1.17, 1.18, 1.19, 1.20, 1.25',
    aktiviteter: [
      { type:'voks', id:'t6-voks', tittel:'Planen er ikke fasiten', tekst:['Et budsjett slår nesten aldri helt til. Det betyr ikke at det var bortkastet.','Poenget med en plan er å oppdage tidlig når noe går en annen vei enn du trodde – slik at du kan gjøre noe med det mens det fortsatt er lett.','Den som ikke har en plan, merker ofte problemene først når det er for sent.'], sporsmal:['Hvor ofte sjekker du om pengene dine går dit du hadde tenkt?','Når har en plan hjulpet deg – selv om den ikke ble fulgt helt?'], handling:'Følg med på hva du bruker penger på i én uke. Sammenlign med hva du trodde du ville bruke.' },
      { type:'flash', id:'t6-flash', tittel:'Begrepskort: budsjett og regnskap', kort:[
        ['Budsjett','En plan i kroner for en framtidig periode.'],
        ['Regnskap','Oversikt over det som faktisk har skjedd.'],
        ['Avvik','Forskjellen mellom budsjett og regnskap.'],
        ['Resultatbudsjett','Plan for inntekter og kostnader, og om bedriften går med overskudd.'],
        ['Likviditetsbudsjett','Plan for når pengene kommer inn og går ut, måned for måned.'],
        ['Likviditet','Penger bedriften har tilgjengelig til å betale regninger.'],
        ['Salgsbudsjett','Delbudsjett som viser antall × pris for det bedriften regner med å selge.'],
        ['Handlingsplan','Oversikt over tiltak, hvem som har ansvaret og frist.'],
        ['Balanse','Oversikt over eiendeler og egenkapital + gjeld på et bestemt tidspunkt.'],
        ['Variable kostnader','Kostnader som øker med antall oppdrag, f.eks. drivstoff og dekkslitasje.'],
        ['Faste kostnader','Kostnader som er like store uansett antall oppdrag, f.eks. forsikring og husleie.'],
        ['Faktura','Salgsdokumentet bedriften sender kunden. Har lovbestemte opplysninger.']
      ]},
      { type:'quiz', id:'t6-q1', nivaa:1, tittel:'Budsjett og regnskap', sp:[
        { q:'Hva er et budsjett?', a:['En plan i kroner for en framtidig periode','En oversikt over det som har skjedd','En faktura','Et lån'], r:0, f:'Regnskapet viser det som faktisk skjedde.' },
        { q:'Hva viser et likviditetsbudsjett?', a:['Når pengene kommer inn og går ut','Hvem som er ansatt','Hvilke kunder bedriften har','Hvor lastebilene står'], r:0, f:'Det skal sikre at bedriften alltid kan betale regningene.' },
        { q:'Hva kaller vi forskjellen mellom budsjett og regnskap?', a:['Avvik','Avdrag','Avgift','Avskrivning'], r:0, f:'Avvik regnes i kroner og i prosent.' },
        { q:'Hvilket delbudsjett er det vanlig å starte med?', a:['Salgsbudsjettet','Lønnsbudsjettet','Lagerbudsjettet','Reisebudsjettet'], r:0, f:'Inntektene bestemmer hvilke kostnader bedriften kan tåle.' },
        { q:'Hva er en variabel kostnad for en transportbedrift?', a:['Drivstoff','Forsikring av bilen','Husleie for kontoret','Revisjon'], r:0, f:'Drivstoff øker med antall kilometer og oppdrag.' },
        { q:'Hvilket ord skal stå på fakturaen fra et aksjeselskap?', a:['Foretaksregisteret','Kvittering','Budsjett','Løyve'], r:0, f:'Det er et krav for aksjeselskaper.' }
      ]},
      { type:'calc', id:'t6-c1', nivaa:2, gen:'liste', tittel:'Regn ut resultat og avvik', antall:5, oppg:[
        { task:'Ryfylke Nærfrakt budsjetterer med 10 turer à 500 kr per dag i 250 dager. Hva blir salgsinntekten?', ans:1250000, unit:'kr', steps:['10 × 500 kr = 5 000 kr per dag','5 000 kr × 250 dager = 1 250 000 kr'] },
        { task:'Inntektene er 1 250 000 kr. Kostnadene er 1 140 000 kr. Hva er resultatet?', ans:110000, unit:'kr', steps:['1 250 000 − 1 140 000 = 110 000 kr (overskudd)'] },
        { task:'Budsjettert resultat var 80 000 kr. Regnskapet viser 50 000 kr. Hvor stort er avviket i kroner? (Svar med minus hvis resultatet ble dårligere.)', ans:-30000, unit:'kr', steps:['50 000 − 80 000 = −30 000 kr'] },
        { task:'Budsjettert resultat var 80 000 kr, men ble 50 000 kr. Hvor mange prosent er avviket? (Svar med minus.)', ans:-37.5, unit:'%', tol:0.1, steps:['−30 000 ÷ 80 000 = −0,375','−0,375 × 100 = −37,5 %'] },
        { task:'I januar kommer det inn 120 000 kr og går ut 116 920 kr. Bedriften hadde 20 000 kr på konto 1. januar. Hvor mye har den 31. januar?', ans:23080, unit:'kr', steps:['120 000 − 116 920 = 3 080 kr i overskudd','20 000 + 3 080 = 23 080 kr'] },
        { task:'Budsjetterte kostnader var 920 000 kr. Regnskapet viser 930 000 kr. Hvor mange prosent høyere ble kostnadene? (Svar med én desimal.)', ans:1.1, unit:'%', tol:0.05, steps:['930 000 − 920 000 = 10 000 kr','10 000 ÷ 920 000 × 100 ≈ 1,1 %'] }
      ]},
      { type:'quiz', id:'t6-q2', nivaa:2, tittel:'Styring i praksis', sp:[
        { q:'Bedriften har overskudd i resultatbudsjettet, men har ikke penger til lønna i mars. Hvorfor kan det skje?', a:['Kundene betaler senere enn regningene forfaller – dårlig likviditet','Resultatbudsjettet er alltid feil','Lønna er for lav','Det kan ikke skje'], r:0, f:'Overskudd over året betyr ikke at pengene er på konto til rett tid.' },
        { q:'Salget i et kvartal ble 2 % lavere enn budsjettert. Hva bør daglig leder gjøre?', a:['Finne årsaken og vurdere tiltak, f.eks. mer salg eller lavere kostnader','Kaste budsjettet','Ingenting – det går over','Si opp alle'], r:0, f:'Små avvik følges med på. Store avvik krever tiltak.' },
        { q:'Hva viser en handlingsplan?', a:['Tiltak, hvem som har ansvaret og frist','Bare lønna til de ansatte','Kjørerutene','Hvor mye skatt bedriften betaler'], r:0, f:'Den gjør det tydelig hvem som skal gjøre hva og når.' },
        { q:'Bedriften selger tjenester med 30 dagers kreditt. Når kommer pengene for desember-salget inn?', a:['I januar','I desember','Neste desember','Aldri'], r:0, f:'Kredittsalg gir innbetaling måneden etter.' },
        { q:'Hva skjer med egenkapitalen hvis bedriften går med underskudd et år?', a:['Den blir mindre','Den blir større','Den er uendret','Den blir gjeld i banken automatisk'], r:0, f:'Underskudd tærer på egenkapitalen.' },
        { q:'Hvilken opplysning MÅ være med på en faktura?', a:['Fakturanummer i løpende rekkefølge','Bilde av lastebilen','Sjåførens telefonnummer','Bedriftens logo'], r:0, f:'Fakturanummer, dato, selger, kjøper, hva som er levert og pris er blant kravene.' }
      ]},
      { type:'check', id:'t6-chk1', nivaa:2, tittel:'Kontroller fakturaen', instr:'Ryfylke Nærfrakt AS har laget en faktura. Kryss av radene der noe mangler eller er feil.', dok:'Faktura nr. 1043', meta:'Fra: Ryfylke Nærfrakt AS · Til: Byggmester Hansen AS', kolonner:['Felt','Det som står','Kommentar'], rader:[
        { c:['Organisasjonsnummer','Mangler','Feltet er tomt'], avvik:true, f:'Organisasjonsnummer skal alltid stå på fakturaen.' },
        { c:['Fakturanummer','1043 (forrige var 1042)','Løpende nummer'], avvik:false, f:'Fakturanumrene skal komme i ubrutt rekkefølge.' },
        { c:['Dato','12.03','Dato er med'], avvik:false, f:'I orden.' },
        { c:['Kjøper','Byggmester Hansen AS, org.nr. oppgitt','Kjøper er med'], avvik:false, f:'I orden.' },
        { c:['Hva er levert','«Diverse»','Ingen beskrivelse'], avvik:true, f:'Fakturaen skal vise hva som er levert og hvor mye.' },
        { c:['Leveringstid og -sted','11.03, byggeplass Sola','Med'], avvik:false, f:'I orden.' },
        { c:['Pris og forfall','4 500 kr, uten forfallsdato','Forfall mangler'], avvik:true, f:'Forfallsdato skal stå på fakturaen.' },
        { c:['«Foretaksregisteret»','Står ikke på fakturaen','Selger er AS'], avvik:true, f:'For aksjeselskaper skal ordet «Foretaksregisteret» stå med.' }
      ], etter:'Reglene for hva en faktura skal inneholde, står i bokføringsforskriften. Regnskapsprogrammer har vanligvis feltene ferdig.' },
      { type:'tf', id:'t6-tf', nivaa:1, tittel:'Sant eller usant: økonomistyring', ps:[
        ['Regnskapet viser det som faktisk har skjedd.', true, 'Budsjettet er planen.'],
        ['Ved oppstart lager man resultatbudsjett for de tre første årene.', true, 'Banken vil se at bedriften kan bli lønnsom.'],
        ['Det er frivillig for en bedrift å bokføre inntekter og utgifter.', false, 'Alle bedrifter har bokføringsplikt. AS må i tillegg lage årsregnskap.'],
        ['Likviditetsbudsjettet og resultatbudsjettet viser akkurat det samme.', false, 'Likviditet handler om når pengene kommer og går. Resultat handler om overskudd.'],
        ['Overskudd bygger opp egenkapitalen.', true, 'Underskudd tærer på den.'],
        ['Forsikring av bilen er en variabel kostnad.', false, 'Den er lik uansett hvor mange oppdrag bilen kjører – en fast kostnad.']
      ]},
      { type:'quiz', id:'t6-q3', nivaa:3, tittel:'Analyser økonomien', sp:[
        { q:'Budsjett: inntekter 10 000, kostnader 9 200. Regnskap: inntekter 9 800, kostnader 9 300 (i 1000 kr). Hva er avviket på resultatet?', a:['−300 000 kr (−37,5 %)','−200 000 kr (−2 %)','+100 000 kr','0 kr'], r:0, f:'Budsjettert resultat 800, faktisk 500. Avvik −300 = −37,5 %. Små avvik i inntekt og kostnad gir stort utslag på resultatet.' },
        { q:'Hvorfor gir små avvik i inntekter og kostnader ofte store prosentvise avvik på resultatet?', a:['Fordi resultatet er en liten differanse mellom to store tall','Fordi prosent alltid blir stor','Fordi regnskapet er feil','Det gjør det ikke'], r:0, f:'Når overskuddet er lite i forhold til omsetningen, slår små endringer kraftig ut.' },
        { q:'Ryfylke Nærfrakt har god lønnsomhet, men likviditeten er presset. Hvilket tiltak bedrer likviditeten raskest?', a:['Sende fakturaer straks etter levering og korte inn betalingsfristen','Kjøpe ny lastebil kontant','Øke lageret','Vente med å sende fakturaer'], r:0, f:'Jo raskere pengene kommer inn, desto bedre likviditet.' },
        { q:'Hvorfor må lønnskostnadene i budsjettet få et påslag hvert år?', a:['Fordi lønna og de lønnsavhengige kostnadene vanligvis øker med lønnsoppgjøret','Fordi skatten forsvinner','Fordi antallet ansatte alltid dobles','Det trengs ikke'], r:0, f:'Man legger inn forventet lønnsvekst på alle lønnsavhengige poster.' }
      ]},
      { type:'reflect', id:'t6-r1', nivaa:2, tittel:'UB-spor: Resultatbudsjett', vis: UB('Bruk tall dere tror på. Det viktigste er at oppsettet er riktig.'), q:'Sett opp et enkelt resultatbudsjett for bedriften din (UB-en eller Ryfylke Nærfrakt): salgsinntekter (antall × pris), kostnader og resultat. Hvor mye må dere selge for ikke å gå med underskudd? Hva gjør dere hvis salget blir lavere enn budsjettert?', punkter:[
        'Salgsinntekt regnet ut som antall × pris',
        'Minst tre kostnadsposter',
        'Resultat = inntekter − kostnader',
        'Hvor mye som må selges for å gå i null',
        'Minst ett tiltak hvis salget svikter',
        'Hvordan dere skal følge med på avvik underveis'
      ]}
    ]
  },
  /* ================================================================ T7 */
  {
    id: 't7', lok: 'D-01', tittel: 'Kvalitet og kundekrav',
    kort: 'Hva kvalitet betyr i bransjen, kundekrav og lovkrav, målbare kvalitetskrav, avvik og ledelsessystemet for kvalitet.',
    bok: 'Bransjelære kap. 4 (s. 114–116)',
    mal: ['forklare hva kvalitet betyr etter ISO-definisjonen','skille mellom kundekrav og lovkrav','lage målbare kvalitetskrav for et transportoppdrag','beskrive hva som skjer når det oppstår avvik'],
    punkter: [
      'I bransjen betyr <b>kvalitet</b> ikke «dyrt og flott». Etter standarden <b>ISO 9000:2015</b> handler det om i hvilken grad egenskapene ved et produkt eller en tjeneste <b>oppfyller kravene</b> – både <b>lovkrav</b>, <b>kundebehov</b> og <b>kundeforventninger</b>.',
      'En kvalitetstjeneste skal være <b>sikker</b>, oppfylle <b>lovkravene</b> og helst <b>overgå</b> det kunden forventer.',
      'I godstransport forventer kunden at godset kommer <b>til avtalt tid</b>, i <b>riktig mengde</b>, med <b>riktige papirer</b> og <b>uten skader</b>. I persontransport kan kravene gjelde sjåførens opptreden, rutetider, renhold og informasjon til passasjerene.',
      'Gode kvalitetskrav er <b>målbare</b>: «Minst 95 % av leveransene kommer innen avtalt tidsvindu» kan måles. «God levering» kan ikke måles.',
      'Et <b>ledelsessystem for kvalitet</b> følger åtte trinn: kvalitetspolitikk og mål → ansvar → kartlegge kunde- og lovkrav → risiko- og mulighetsvurdering → skriftlige rutiner → opplæring → internkontroll → rette avvik og forbedre kontinuerlig.',
      'Når noe går galt, er det et <b>avvik</b>. Det skal dokumenteres, årsaken skal finnes, og bedriften skal hindre at det skjer igjen.',
      'Gode rutiner for <b>beredskap</b> og oppfølging gjør at bedriften vet hva den skal gjøre når uhell eller forsinkelser skjer.'
    ],
    ndla: [N.kvalitet, N.etikk],
    arbeidsbok: 'Kap. 4: 4.11, 4.22, 4.24, 4.26',
    aktiviteter: [
      { type:'voks', id:'t7-voks', tittel:'Kvalitet er det kunden merker', tekst:['Kunden ser ikke hvordan du planla ruta, sikret lasten eller sjekket papirene. Kunden merker bare om varene kom hele fram, til riktig tid.','Derfor handler kvalitet om de små tingene som ingen ser – gjort ordentlig hver gang.','Når noe likevel går galt, er det hvordan du håndterer det kunden husker. Et raskt «beklager, dette ordner vi» bygger mer tillit enn en perfekt rekord.'], sporsmal:['Når har du opplevd god service – og hva gjorde den god?','Hva gjør du når du har gjort en feil som rammer andre?'], handling:'Velg én oppgave denne uka og sett deg et målbart krav for den, for eksempel «ferdig innen fredag kl. 12, uten feil».' },
      { type:'flash', id:'t7-flash', tittel:'Begrepskort: kvalitet', kort:[
        ['Kvalitet (ISO 9000:2015)','I hvilken grad egenskapene ved et produkt eller en tjeneste oppfyller krav – lovkrav, kundebehov og kundeforventninger.'],
        ['Kundekrav','Krav kunden stiller, f.eks. levering til avtalt tid.'],
        ['Lovkrav','Krav i lover og forskrifter, f.eks. lastsikring og kjøre- og hviletid.'],
        ['Målbart krav','Et krav som kan kontrolleres med tall eller ja/nei.'],
        ['Avvik','Når noe ikke blir som planlagt eller ikke oppfyller kravet.'],
        ['Avviksrapport','Skriftlig melding om et avvik, slik at årsaken kan finnes.'],
        ['Kvalitetspolitikk','Bedriftens overordnete mål og prioriteringer for kvalitet.'],
        ['Internkontroll','Bedriftens egen kontroll av at kravene blir fulgt.'],
        ['Kontinuerlig forbedring','Å lære av avvik og hele tiden gjøre ting litt bedre.'],
        ['Prosedyre','Skriftlig beskrivelse av hvordan en arbeidsoppgave skal gjøres.']
      ]},
      { type:'quiz', id:'t7-q1', nivaa:1, tittel:'Hva er kvalitet?', sp:[
        { q:'Hva betyr kvalitet etter ISO-definisjonen?', a:['I hvilken grad produktet oppfyller kravene','At produktet er dyrt','At produktet er nytt','At produktet ser fint ut'], r:0, f:'Kravene er lovkrav, kundebehov og kundeforventninger.' },
        { q:'Hvilket av disse er et LOVKRAV i godstransport?', a:['Lasten skal være sikret etter forskriften','Sjåføren skal smile','Bilen skal være blå','Levering før lunsj'], r:0, f:'Lastsikring er regulert i forskrift.' },
        { q:'Hvilket av disse er et KUNDEKRAV?', a:['Levering mellom kl. 07 og 09','Kjøre- og hviletidsreglene','Krav om løyve','Fartsgrensen'], r:0, f:'Tidsvinduet avtales med kunden.' },
        { q:'Hva er et avvik?', a:['Når noe ikke oppfyller kravet eller ikke går som planlagt','En type lastebil','Et budsjett','En rabatt'], r:0, f:'Avvik skal dokumenteres og følges opp.' },
        { q:'Hvilket kvalitetskrav kan måles?', a:['«Minst 95 % levert innen avtalt tid»','«God service»','«Fornøyde kunder»','«Rask levering»'], r:0, f:'Et målbart krav har tall eller kan sjekkes med ja/nei.' },
        { q:'Hva forventer en mottaker av gods?', a:['Avtalt tid, riktig mengde, riktige papirer og ingen skader','Bare at sjåføren er hyggelig','At varene er billige','At bilen er ny'], r:0, f:'Dette er de grunnleggende kundekravene i godstransport.' }
      ]},
      { type:'order', id:'t7-o1', nivaa:2, tittel:'Ledelsessystemet for kvalitet', instr:'Sett de åtte trinnene i riktig rekkefølge.', steg:[
        'Lage kvalitetspolitikk og kvalitetsmål','Fordele ansvaret','Kartlegge kundekrav og lovkrav','Vurdere risiko og muligheter','Lage skriftlige rutiner','Gi opplæring','Kontrollere at kravene følges (internkontroll)','Rette avvik og forbedre kontinuerlig'
      ], f:'Trinnene er de samme som i et HMS-system, men med kundekrav og mulighetsvurdering i tillegg.' },
      { type:'quiz', id:'t7-q2', nivaa:2, tittel:'Kvalitet i praksis', sp:[
        { q:'En pall er skadet ved levering. Hva bør sjåføren gjøre først?', a:['Ta bilde, skrive skaden på fraktbrevet og få kunden til å signere','Sette av pallen, si fra muntlig og skrive skaden i rapporten etter turen','Ta med pallen tilbake til terminalen uten å levere den','Levere pallen og la kunden melde fra selv'], r:0, f:'Dokumentasjon er viktig for å finne årsaken og for erstatningen.' },
        { q:'Ryfylke Nærfrakt kommer for sent til samme kunde tre ganger på en måned. Hva tyder det på?', a:['Et systematisk avvik – bedriften må finne årsaken','Uflaks','At kunden er vanskelig','Ingenting'], r:0, f:'Når et avvik gjentar seg, må bedriften finne årsaken og endre noe.' },
        { q:'Et busselskap krever at sjåføren er ved holdeplassen to minutter før avgang. Hva slags krav er det?', a:['Et kvalitetskrav fra bedriften','Et lovkrav i vegtrafikkloven','En moralregel','Et budsjett'], r:0, f:'Bedriften spesifiserer kvaliteten på tjenesten sin.' },
        { q:'Kunden vil ha levering mellom kl. 07 og 09. Sjåføren ser at han blir 30 minutter forsinket. Hva er best kvalitet?', a:['Ringe kunden før kl. 09 og gi beskjed om ny tid','Kjøre fortere enn lov','Komme fram uten å si noe','Snu og levere i morgen'], r:0, f:'God informasjon er en del av kvaliteten. Kunden kan planlegge.' },
        { q:'Hvorfor skal bedriften ha skriftlige rutiner?', a:['Slik at alle gjør oppgavene på samme, riktige måte','Fordi det er pent','Fordi kundene vil lese dem','Det trengs ikke'], r:0, f:'Skriftlige rutiner sikrer lik kvalitet uansett hvem som gjør jobben.' },
        { q:'Hva er forskjellen på et kundekrav og et lovkrav?', a:['Kundekrav avtales med kunden. Lovkrav gjelder uansett','Det er ingen forskjell','Lovkrav kan kunden velge bort','Kundekrav gjelder bare busser'], r:0, f:'Lovkrav må alltid følges, også om kunden vil noe annet.' }
      ]},
      { type:'tf', id:'t7-tf', nivaa:2, tittel:'Sant eller usant: kvalitet', ps:[
        ['Høy kvalitet betyr alltid høy pris.', false, 'Kvalitet handler om å oppfylle kravene.'],
        ['Hvis kunden ber om det, kan du droppe lastsikringen for å spare tid.', false, 'Lovkrav gjelder uansett hva kunden ønsker.'],
        ['Et avvik som gjentar seg, kan være et systematisk avvik.', true, 'Da må årsaken finnes og rettes.'],
        ['God kvalitet kan også bety å overgå kundens forventninger.', true, 'Det gir fornøyde kunder som kommer tilbake.'],
        ['«Fornøyde kunder» er et målbart kvalitetskrav.', false, 'Det må gjøres om til noe som kan måles, f.eks. en score i en kundeundersøkelse.'],
        ['Opplæring av de ansatte er et trinn i ledelsessystemet for kvalitet.', true, 'Rutiner hjelper lite hvis ingen kjenner dem.']
      ]},
      { type:'quiz', id:'t7-q3', nivaa:3, tittel:'Vurder kvaliteten', sp:[
        { q:'Kunden klager på at sjåførene er uhøflige. Hvilket tiltak er best?', a:['Opplæring i kundebehandling, tydelige krav til opptreden og oppfølging','Gi kunden rabatt på neste faktura og be sjåførene skjerpe seg','Bytte ut sjåføren kunden klaget på, uten å endre noe annet','Svare kunden at sjåførene har mye å gjøre'], r:0, f:'Personale er en del av kvaliteten. Krav, opplæring og kontroll hører sammen.' },
        { q:'Ryfylke Nærfrakt vil gjøre «rask levering» om til et målbart krav. Hva er best?', a:['«Minst 95 % av sendingene leveres innen 24 timer etter bestilling»','«Vi er raske»','«Kundene skal være fornøyde»','«Vi kjører så fort vi kan»'], r:0, f:'Kravet har tall, tidsramme og kan måles.' },
        { q:'Hvorfor skal en kvalitetsvurdering også se på muligheter, ikke bare risiko?', a:['For å finne måter å oppfylle eller overgå kundens krav bedre','Fordi risiko er uviktig','Fordi loven forbyr risikovurdering','Det skal den ikke'], r:0, f:'Mulighetsvurderingen kan gi bedre tjenester og flere kunder.' },
        { q:'Etter en skade på gods finner bedriften at årsaken var at sjåførene ikke hadde nok mellomlegg i bilen. Hva er riktig tiltak?', a:['Endre rutinen slik at mellomlegg alltid er med, og følge opp at det skjer','Gi sjåføren skylda og gjøre ingenting mer','Slutte å kjøre for den kunden','Vente og se'], r:0, f:'Kontinuerlig forbedring: finn årsaken, endre rutinen, kontroller.' }
      ]},
      { type:'case', id:'t7-case', nivaa:3, tittel:'Case: Klage fra byggevarehandelen', intro:'Byggmester Hansen AS ringer Ryfylke Nærfrakt. To av fem leveranser forrige uke kom for sent, og én pall gips var knust.', steg:[
        { q:'Hva gjør daglig leder først?', valg:[
          { t:'Lytter, beklager og lover å finne ut hva som skjedde', ok:true, f:'Riktig. God klagebehandling er en del av kvaliteten.' },
          { t:'Sier at det sikkert var kundens feil', ok:false, f:'Det skaper konflikt, og dere kan miste kunden.' },
          { t:'Gir 50 % rabatt med en gang uten å undersøke', ok:false, f:'Først må dere finne ut hva som skjedde.' }
        ]},
        { q:'Hva gjør bedriften med den knuste pallen?', valg:[
          { t:'Sjekker fraktbrev og bilder, skriver avviksrapport og finner årsaken', ok:true, f:'Dokumentasjon viser hvor skaden skjedde.' },
          { t:'Ingenting – det er bare én pall', ok:false, f:'Små avvik som ikke følges opp, blir ofte store.' },
          { t:'Sier opp sjåføren', ok:false, f:'Først må årsaken finnes. Ofte er det rutinen som svikter.' }
        ]},
        { q:'Det viser seg at forsinkelsene skjedde fordi ruta hadde for mange stopp. Hvilket tiltak er best?', valg:[
          { t:'Planlegge rutene på nytt og avtale realistiske tidsvinduer med kunden', ok:true, f:'Riktig. Tiltaket retter årsaken.' },
          { t:'Be sjåføren kjøre fortere', ok:false, f:'Det bryter lovkrav og øker risikoen.' },
          { t:'Slutte å avtale tider', ok:false, f:'Kunden trenger tidspunkt for å planlegge.' }
        ]},
        { q:'Hvordan sjekker bedriften at tiltaket virker?', valg:[
          { t:'Måler andelen leveranser til avtalt tid de neste ukene og følger opp med kunden', ok:true, f:'Et målbart krav gjør det mulig å se forbedringen.' },
          { t:'Håper at det går bedre', ok:false, f:'Uten måling vet dere ikke om det virker.' },
          { t:'Spør sjåføren om han føler det går bedre', ok:false, f:'Følelser er ikke målinger.' }
        ]}
      ]},
      { type:'reflect', id:'t7-r1', nivaa:2, tittel:'UB-spor: Våre kvalitetskrav', vis: UB('Lag kvalitetskrav som kan måles.'), q:'Lag 3–5 målbare kvalitetskrav for produktet eller tjenesten til bedriften din (UB-en eller Ryfylke Nærfrakt). Hvilke krav kommer fra kunden, og hvilke er lovkrav? Hva gjør dere hvis et krav ikke blir oppfylt?', punkter:[
        'Minst tre kvalitetskrav',
        'Kravene har tall, tid eller kan sjekkes med ja/nei',
        'Minst ett kundekrav',
        'Minst ett lovkrav eller et sikkerhetskrav',
        'Hvem som har ansvaret for å følge opp kravene',
        'Hva dere gjør når det oppstår et avvik'
      ]}
    ]
  }
  ]
});
})();
