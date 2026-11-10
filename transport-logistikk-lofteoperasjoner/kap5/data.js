/* =====================================================================
   KAPITTELDATA – Kap 5 Sikring av last etter gjeldende forskrifter
   Alle tekster, oppgaver og tegninger er egenprodusert for TLLfluenseren.
   Faglig grunnlag: læreboka i Transport, logistikk og løfteoperasjoner (Vg2), kapittel 5,
   forskrift om bruk av kjøretøy §§ 3-2 og 3-3 og NDLA-emnet «Sikring av last» (lenket til, ikke kopiert).
   Ingenting er kopiert fra boka. Tabellverdier i oppgavene er oppgitt i selve oppgaven («tabellen viser …»),
   slik at elevene øver på framgangsmåten – de faktiske tabellene finner de i læreboka eller i veilederen.
   Oppgavetyper: flash, quiz, tf, fill, match, order, sort, calc, check, hotspot, case, reflect, voks
   ===================================================================== */
(function(){
const NDLA_E = 'https://ndla.no/nb/e/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/sikring-av-last/63c9b82c0d';
const NDLA_R = 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/';

/* NDLA-ressursene i emnet «Sikring av last» (stier relativt til ressurssamlingen) */
const N = {
  viktig:   ['Hva er viktig å tenke på ved sikring av last?', 'hva-er-viktig-a-tenke-pa-ved-sikring-av-last/fa6979744c', 'Film'],
  tre:      ['Hvordan tre en lastestropp', 'hvordan-tre-en-lastestropp/1554d978b7', 'Film'],
  kolli:    ['Stroppe et kolli', 'stroppe-et-kolli/9a7ca857be', 'Film'],
  forsp:    ['Forspenning av lastestropp', 'forspenning-av-lastestropp/60dc116d7d', 'Film'],
  demo:     ['Friksjon og stenging av last – demonstrasjon', 'friksjon-og-stenging-av-last--demonstrasjon/d8f8f086cd', 'Film'],
  togbat:   ['Regler for lastsikring på tog, båt og fly', 'regler-for-lastsikring-pa-tog-bat-og-fly/7d675e6901', 'Fagstoff'],
  bil:      ['Regler for lastsikring på bil (utdatert – se merknad)', 'regler-for-lastsikring-pa-bil/7f6e2cc45e', 'Fagstoff · utdatert'],
  surreband:['Surrebånd', 'surreband/d5899881fd', 'Fagstoff'],
  kjetting: ['Kjetting', 'kjetting/50c46d320f', 'Fagstoff'],
  lastbarer:['Lastbærer', 'lastbarer/8a40f1065e', 'Fagstoff'],
  begreper: ['Begreper i lastsikring', 'begreper-i-lastsikring/373cb41de2', 'Fagstoff'],
  test:     ['Lastsikring – hva har du lært? (ett spørsmål er utdatert – se merknad)', 'lastsikring---hva-har-du-lart/54c69097f4', 'Vurderingsressurs · utdatert'],
  krefter:  ['Krefter', 'krefter/138056486f', 'Fagstoff'],
  friksjon: ['Friksjon', 'friksjon/97a407eb6d', 'Fagstoff'],
  lasting:  ['Lasting og sikring', 'lasting-og-sikring/5b6441f803', 'Fagstoff'],
  brosjyre: ['Lastsikringsbrosjyre (miniguide etter NS-EN 12195)', 'lastsikringsbrosjyre/de48b28cc9', 'Fagstoff']
};

/* ---------- Egne tegninger (SVG). Klikkbare områder har data-z. ---------- */
const S = 'font-family="Inter,system-ui,sans-serif"';

/* Lasteplan sett ovenfra */
const SVG_PLAN = `<svg viewBox="0 0 600 340" ${S} role="img" aria-label="Lasteplanet på en lastebil sett ovenfra, med paller">
  <rect x="0" y="0" width="600" height="340" fill="#ffffff"/>
  <text x="14" y="24" font-size="13" font-weight="700" fill="#1b2128">← KJØRERETNING</text>
  <rect x="12" y="92" width="66" height="150" rx="10" fill="#c9ced3" stroke="#5c6670" stroke-width="2"/>
  <text x="45" y="172" text-anchor="middle" font-size="11" font-weight="700" fill="#1b2128" transform="rotate(-90 45 172)">FØRERHUS</text>
  <rect x="95" y="40" width="480" height="256" fill="#f4f1ea" stroke="#5c6670" stroke-width="2"/>
  <rect data-z="side" x="109" y="40" width="452" height="13" fill="#9aa3ab"/>
  <rect data-z="side" x="109" y="283" width="452" height="13" fill="#9aa3ab"/>
  <rect data-z="front" x="95" y="40" width="15" height="256" fill="#1d6fb8"/>
  <rect data-z="bak" x="560" y="40" width="15" height="256" fill="#e07b00"/>
  <g pointer-events="none" fill="#d9b98a" stroke="#8b6a38" stroke-width="2">
    <rect x="112" y="56" width="74" height="104"/><rect x="190" y="56" width="74" height="104"/><rect x="268" y="56" width="74" height="104"/><rect x="346" y="56" width="74" height="104"/>
    <rect x="112" y="164" width="74" height="86"/><rect x="190" y="164" width="74" height="86"/><rect x="268" y="164" width="74" height="86"/><rect x="346" y="164" width="74" height="86"/>
  </g>
  <rect data-z="gap" x="112" y="252" width="308" height="30" fill="#fff4e5" stroke="#e07b00" stroke-dasharray="5 4" stroke-width="2"/>
  <text x="266" y="272" text-anchor="middle" font-size="12" fill="#8a4b00" pointer-events="none">25 cm luft</text>
  <rect data-z="bom" x="426" y="54" width="11" height="228" fill="#f2b84b" stroke="#8b6a38"/>
  <g fill="#1b2128">
    <circle data-z="feste" cx="150" cy="46" r="7"/><circle data-z="feste" cx="270" cy="46" r="7"/><circle data-z="feste" cx="390" cy="46" r="7"/><circle data-z="feste" cx="510" cy="46" r="7"/>
    <circle data-z="feste" cx="150" cy="290" r="7"/><circle data-z="feste" cx="270" cy="290" r="7"/><circle data-z="feste" cx="390" cy="290" r="7"/><circle data-z="feste" cx="510" cy="290" r="7"/>
  </g>
  <text x="335" y="326" text-anchor="middle" font-size="12" fill="#5c6670">Åtte paller på et lasteplan (sett ovenfra). Tegningen er ikke i målestokk.</text>
</svg>`;

/* Fire surringsteknikker, merket A–D */
const kolliEnde = `<rect x="95" y="62" width="100" height="78" fill="#d9b98a" stroke="#8b6a38" stroke-width="2"/>`;
const planLinje = `<line x1="15" y1="140" x2="275" y2="140" stroke="#1b2128" stroke-width="4"/>`;
const stropp = 'fill="none" stroke="#e07b00" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"';
const feste = (x) => `<circle cx="${x}" cy="140" r="6" fill="#1b2128"/>`;
const panel = (tx, ty, z, bokstav, tekst, innhold) => `<g transform="translate(${tx} ${ty})">
    <rect data-z="${z}" x="4" y="4" width="282" height="160" rx="10" fill="#ffffff" stroke="#9aa3ab" stroke-width="2"/>
    <g pointer-events="none"><text x="18" y="28" font-size="18" font-weight="800" fill="#1b2128">${bokstav}</text><text x="272" y="26" text-anchor="end" font-size="11" fill="#5c6670">${tekst}</text>${innhold}</g></g>`;
const SVG_TEKNIKK = `<svg viewBox="0 0 590 340" ${S} role="img" aria-label="Fire tegninger av ulike surringsteknikker, merket A, B, C og D">
  ${panel(0, 0, 'overfall', 'A', 'sett bakfra', planLinje + kolliEnde + `<path ${stropp} d="M58 140 L95 62 L195 62 L232 140"/>` + feste(58) + feste(232))}
  ${panel(300, 0, 'loop', 'B', 'sett bakfra', planLinje + kolliEnde + `<path ${stropp} d="M52 140 L95 60 L197 60 L199 136 L95 137 L68 140"/>` + feste(52) + feste(68))}
  ${panel(0, 172, 'grime', 'C', 'sett fra siden · kjøreretning ←', planLinje + `<rect x="110" y="52" width="110" height="88" fill="#d9b98a" stroke="#8b6a38" stroke-width="2"/><path ${stropp} d="M111 78 L111 53 L202 140"/>` + feste(202))}
  ${panel(300, 172, 'direkte', 'D', 'sett fra siden', planLinje + `<rect x="100" y="62" width="90" height="78" fill="#d9b98a" stroke="#8b6a38" stroke-width="2"/><circle cx="106" cy="100" r="5" fill="#fff" stroke="#1b2128" stroke-width="2"/><circle cx="184" cy="100" r="5" fill="#fff" stroke="#1b2128" stroke-width="2"/><path ${stropp} d="M106 100 L52 140"/><path ${stropp} d="M184 100 L238 140"/>` + feste(52) + feste(238))}
</svg>`;

/* Surringsvinkler: stroppen går fra festet (nede til venstre) opp til lastens øverste punkt */
const vpanel = (tx, z, deg, L) => { const ax = 24, ay = 160, r = 24, rad = deg*Math.PI/180;
  const ex = +(ax + L*Math.cos(rad)).toFixed(1), ey = +(ay - L*Math.sin(rad)).toFixed(1);
  return `<g transform="translate(${tx} 0)">
    <rect data-z="${z}" x="3" y="4" width="139" height="190" rx="10" fill="#ffffff" stroke="#9aa3ab" stroke-width="2"/>
    <g pointer-events="none">
      <rect x="${ex}" y="${ey}" width="${(136-ex).toFixed(1)}" height="${(ay-ey).toFixed(1)}" fill="#d9b98a" stroke="#8b6a38" stroke-width="2"/>
      <line x1="8" y1="${ay}" x2="137" y2="${ay}" stroke="#1b2128" stroke-width="3"/>
      <path ${stropp} d="M${ax} ${ay} L${ex} ${ey}"/>
      <circle cx="${ax}" cy="${ay}" r="5" fill="#1b2128"/>
      <path d="M${ax+r} ${ay} A ${r} ${r} 0 0 0 ${(ax + r*Math.cos(rad)).toFixed(1)} ${(ay - r*Math.sin(rad)).toFixed(1)}" fill="none" stroke="#1d6fb8" stroke-width="2"/>
      <text x="72" y="184" text-anchor="middle" font-size="16" font-weight="800" fill="#1d6fb8">${deg}°</text>
    </g></g>`; };
const SVG_VINKEL = `<svg viewBox="0 0 580 200" ${S} role="img" aria-label="Fire stropper med surringsvinkel 90, 60, 45 og 20 grader">
  ${vpanel(0, 'v90', 90, 110)}${vpanel(145, 'v60', 60, 115)}${vpanel(290, 'v45', 45, 115)}${vpanel(435, 'v20', 20, 82)}
</svg>`;


/* ---------- Egne øvingstabeller (egenprodusert, IKKE kopiert fra boka/veilederne) ----------
   Overfallssurring: én stropp, STF 400 daN, vinkel 75–90°, friksjon på begge sider av stroppen.
   Formel (etter prinsippet i EN 12195-1): kg = 2 · µ · 4 000 N / (10 · (krav − µ)) / fs, rundet til nærmeste 10 kg.
   Sikkerhetsfaktor fs = 1,25 framover og 1,1 sidevegs. Verdiene stemmer da omtrent med NLF-heftet «Lastsikring ved vegtransport».
   Krav: 0,8 framover og 0,5 sidevegs. Tallene er forenklet – bruk veileder, app eller lærebokas tabeller i praksis. */
const holder = (mu, krav) => mu >= krav ? null : Math.round(2*mu*4000/(10*(krav - mu))/(krav === 0.8 ? 1.25 : 1.1)/10)*10;
const OVERFALL = { rader: [0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5,0.6].map(mu => ({ mu, fram: holder(mu, 0.8), side: holder(mu, 0.5) })) };
const FRIKSJON = [
  ['plastpall mot stålplate', 0.15], ['plastpall mot kryssfiner', 0.2], ['høvlet tre mot riflet aluminium', 0.25],
  ['trepall mot stålplate', 0.3], ['sagd tre (trepall) mot riflet aluminium', 0.4], ['kartong mot trepall', 0.4],
  ['trepall mot kryssfiner', 0.45], ['kartong mot kartong', 0.5], ['trepall på friksjonsmatte av gummi', 0.6]
];
const nb = n => n.toLocaleString('nb-NO');
const mu2 = mu => mu.toLocaleString('nb-NO',{minimumFractionDigits:2});
const TS = 'style="border-collapse:collapse;width:100%;font-size:15px"', TD = 'style="border:1px solid #9aa3ab;padding:5px 8px;text-align:center"', TH = 'style="border:1px solid #9aa3ab;padding:5px 8px;background:rgba(242,184,75,.18)"';
const VIS_OVERFALL = `<h3 style="font-size:18px;margin:0 0 6px">Øvingstabell: Hvor mye holder én overfallssurring igjen?</h3>
  <table ${TS}><thead><tr><th ${TH}>Friksjon µ</th><th ${TH}>Framover (kg)</th><th ${TH}>Sidevegs og bakover (kg)</th></tr></thead><tbody>
  ${OVERFALL.rader.map(r => `<tr><td ${TD}>${mu2(r.mu)}</td><td ${TD}>${r.fram ? nb(r.fram) : 'glir ikke'}</td><td ${TD}>${r.side ? nb(r.side) : 'glir ikke'}</td></tr>`).join('')}
  </tbody></table>
  <p class="small muted" style="margin-top:6px">Forutsetninger: surrebånd strammet til S<sub>TF</sub> 400 daN, surringsvinkel 75–90°. Ved 30–75° holder stroppen halvparten. Øvingstabellen er regnet ut av TLLfluenseren og stemmer omtrent med lastsikringsheftet fra NLF. I praksis bruker du heftet, læreboka eller en lastsikringsapp. Kjenner du ikke friksjonen, bruker du µ = 0,20.</p>`;
const VIS_FRIKSJON = `<h3 style="font-size:18px;margin:0 0 6px">Friksjonstabell (omtrentlige verdier)</h3>
  <table ${TS}><thead><tr><th ${TH}>Kontaktflate</th><th ${TH}>µ</th></tr></thead><tbody>
  ${FRIKSJON.map(([m,mu]) => `<tr><td style="border:1px solid #9aa3ab;padding:5px 8px;text-align:left">${m}</td><td ${TD}>${mu2(mu)}</td></tr>`).join('')}
  </tbody></table><p class="small muted" style="margin-top:6px">Bruk alltid den laveste friksjonen i «stabelen» – der glir godset først.</p><hr style="margin:14px 0;border:0;border-top:1px solid #9aa3ab">`;


/* Merknad om NDLA-ressurser som bygger på reglene fra før 2018 (kontrollert mot Lovdata 6.11.2026). */
const MERKNAD_UTDATERT = `<div class="note warn"><span aria-hidden="true">⚠️</span><span><b>Merknad om to NDLA-ressurser.</b>
  <b>«Regler for lastsikring på bil»</b> er skrevet før reglene ble endret 1. januar 2018. Der står det at Sverige og Danmark «kan komme til» å innføre EU-reglene i 2012–2013. I dag gjelder EU-nivået også i Norge.
  I testen <b>«Lastsikring – hva har du lært?»</b> er alternativet «hele lastens vekt forover og halve til sidene og bakover» den gamle regelen.
  <b>Dette gjelder i dag</b> (forskrift om bruk av kjøretøy § 3-3): tunge kjøretøy (M2, M3, N2, N3, O3, O4) skal tåle <b>0,8 × vekta framover</b> og <b>0,5 × vekta bakover og sidevegs</b>. Lettere kjøretøy som varebil og små tilhengere: <b>1,0 × vekta framover</b>. Fra 1. juni 2026 krever § 3-2a også skriftlig sikringsdokumentasjon ved gods med høy transportrisiko.</span></div>`;

TLL.registrer({
  id: 'kap5',
  fag: 'Transport, logistikk og løfteoperasjoner',
  nr: 5,
  tittel: 'Sikring av last etter gjeldende forskrifter',
  ingress: 'Hvorfor lasten må sitte fast, hvilke krefter den utsettes for, og hvordan du sikrer den med låsing, blokkering og surring – etter regelverket som gjelder i dag.',
  kompetansemal: [
    { kode: 'TOL02-01 · KV427', tekst: 'sikre last etter gjeldende forskrifter' },
    { kode: 'TOL02-01 · KV427', tekst: 'bruke ulike metoder og utstyr for å utføre sikre laste-, losse- og løfteoperasjoner' }
  ],
  visKapittelkilder: true,
  filmLenker: [
    { type: 'Fagfilm · NDLA', tittel: N.viktig[0], url: NDLA_R + N.viktig[1] },
    { type: 'Fagfilm · NDLA', tittel: N.tre[0], url: NDLA_R + N.tre[1] },
    { type: 'Fagfilm · NDLA', tittel: N.kolli[0], url: NDLA_R + N.kolli[1] },
    { type: 'Fagfilm · NDLA', tittel: N.forsp[0], url: NDLA_R + N.forsp[1] },
    { type: 'Fagfilm · NDLA', tittel: N.demo[0], url: NDLA_R + N.demo[1] }
  ],
  ressurser: {
    // KUN egenprodusert materiell her (f.eks. egne lysark). IKKE last opp forlagets presentasjon eller PDF-er.
    presentasjon: '',
    laerebok: 'Læreboka, kapittel 5 (s. 117–158)',
    arbeidsbok: 'Arbeidsboka, kapittel 5 (oppgave 5.1–5.21)',
    ndlaEmne: NDLA_E,
    ndlaEmneNavn: 'Emnet «Sikring av last» på NDLA',
    ordliste: NDLA_R + N.begreper[1],
    ordlisteNavn: 'Begreper i lastsikring (NDLA)'
  },
  temaer: [
  /* ================================================================ T1 */
  {
    id: 't1', lok: 'A-01', tittel: 'Regelverket for sikring av last',
    kort: 'Hvorfor lasten må sikres, forskrift om bruk av kjøretøy §§ 3-2 og 3-3, kravene 0,8 og 0,5, kjøretøygrupper, standarder og veiledere.',
    bok: 'Læreboka 5.1–5.3 (s. 118–123)',
    mal: ['forklare hvorfor både sjåfører og logistikkoperatører må kunne sikre last','gjengi hvor mye lastsikringen minst skal tåle framover, bakover og sidevegs','finne ut hvilket krav som gjelder for ulike kjøretøygrupper','nevne de godkjente sikringsmetodene og hvor reglene og veilederne finnes','forklare når transportforetaket må gi sjåføren skriftlig sikringsdokumentasjon'],
    punkter: [
      'Last som forskyver seg, velter eller faller av, kan skade sjåføren, andre trafikanter, godset og kjøretøyet. Derfor er sikring av last både et <b>trafikksikkerhetstiltak</b> og et krav i loven.',
      'Sikring av last er pensum i føreropplæringen for tunge kjøretøy og i yrkessjåførutdanningen. <b>Logistikkoperatører</b> laster også biler og konteinere – og må derfor kunne reglene.',
      'EU vedtok i 2014 et direktiv om <b>utekontroll</b> (kontroll av kjøretøy langs veg). Det ga et felles minimumsnivå for lastsikring. Norge innførte nivået fra <b>1. januar 2018</b> i <b>forskrift om bruk av kjøretøy, §§ 3-2 og 3-3</b>.',
      '§ 3-2 handler om plassering: sjåføren skal ha godt utsyn, lys og skilt skal ikke dekkes til, vekta skal fordeles jevnt – og minst <b>20 %</b> av totalvekta skal ligge på hjulene som styrer. Godset skal ikke kunne falle eller renne av, slepe i vegen, støve eller sjenere andre.',
      '<b>Nytt fra 1. juni 2026 – § 3-2a:</b> Transportforetaket skal sørge for at sjåføren kan sikre lasten etter reglene (kjøretøy over 3 500 kg). Ved gods med <b>høy transportrisiko</b> skal sjåføren ha med <b>skriftlig dokumentasjon</b> på hvordan lasten skal sikres og med hvilket utstyr – for eksempel ved høyde/bredde over 3, betongelementer, stålcoiler, kabeltromler, stående papirruller og krokløftcontainere. Dokumentasjonen skal være klar før lasting og kunne vises fram ved kontroll.',
      '§ 3-3 setter kravene. For tunge kjøretøy (M2, M3, N2, N3, O3, O4 og raske traktorer) skal sikringen tåle <b>0,8 × godsets vekt framover</b> og <b>0,5 × vekta bakover og sidevegs</b>. For lettere kjøretøy, som varebil (N1) og små tilhengere (O1, O2), er kravet <b>1,0 × vekta framover</b>. Sikringen skal også hindre at lasten <b>heller eller velter</b>.',
      'Godkjente metoder er <b>låsing, blokkering, direktesurring og overfallssurring</b> – eller en kombinasjon. Veilederne beskriver også <b>loopsurring</b> og <b>grimesurring</b>. Det gamle ordet «stenging» heter nå <b>blokkering</b>.',
      'Utstyret skal oppfylle europeiske standarder, for eksempel <b>EN 12195</b> (beregning, stropper, kjetting, ståltau), <b>EN 12640</b> (surringspunkter) og <b>EN 12642</b> (styrken i påbygget). Gode hjelpemidler er IRU-veilederen med «Quick Lashing Guide», den svenske TYA-veilederen og lastsikringsapper.',
      'Ved <b>kombinert transport</b> (for eksempel bil + ferje eller bil + tog) skal lasten sikres etter reglene for alle transportformene på turen.'
    ],
    ndla: [['Lovdata: forskrift om bruk av kjøretøy, kapittel 3', 'https://lovdata.no/dokument/SF/forskrift/1990-01-25-92/KAPITTEL_4', 'Lovtekst'], N.togbat, N.brosjyre, N.lasting, N.bil],
    arbeidsbok: '5.1, 5.2, 5.3, 5.8, 5.9',
    ekstra: MERKNAD_UTDATERT,
    aktiviteter: [
      { type:'voks', id:'t1-voks', tittel:'Reglene er skrevet av erfaring', tekst:['Mange regler i transport finnes fordi noe har gått galt. Kravet om at lasten skal tåle 0,8 ganger vekta framover er ikke et tilfeldig tall – det er målt i forsøk med bråbremsing.','Det er lett å tenke at regler er noe kontrolløren bryr seg om. Men den som får en løs pall gjennom frontveggen, er sjåføren. Den som møter et lass som glir av i en sving, er en annen trafikant.','En god fagarbeider følger reglene også når ingen kontrollerer – fordi hun vet hvorfor de finnes.'], sporsmal:['Hvilke regler på skolen eller i praksis forstår du bedre når du vet hvorfor de finnes?','Hvem har du ansvar for når du laster en bil som andre skal kjøre?'], handling:'Spør en sjåfør eller instruktør i praksis om en gang lasten nesten gikk galt – og hva de lærte av det.' },
      { type:'flash', id:'t1-flash', tittel:'Begrepskort: regelverket', kort:[
        ['Forskrift om bruk av kjøretøy','Forskriften med de norske reglene for plassering og sikring av gods (§§ 3-2 og 3-3).'],
        ['Utekontroll','Kontroll av kjøretøy langs vegen. Et EU-direktiv fra 2014 ga felles krav til lastsikring ved slike kontroller.'],
        ['0,8 × vekta','Hvor mye sikringen minst skal tåle framover på tunge kjøretøy.'],
        ['0,5 × vekta','Hvor mye sikringen minst skal tåle bakover og sidevegs.'],
        ['1,0 × vekta','Kravet framover på lettere kjøretøy, for eksempel varebil og små tilhengere.'],
        ['Låsing','Godset festes direkte til kjøretøyet med låser, for eksempel konteinerlåser.'],
        ['Blokkering','Godset plasseres inntil vegger, lemmer, staker eller mellomlegg slik at det ikke kan flytte seg. Før kalt «stenging».'],
        ['Surring','Godset festes med stropper, kjetting, ståltau eller lignende.'],
        ['N3','Lastebil med tillatt totalvekt over 12 000 kg.'],
        ['N1','Varebil – bil for gods med tillatt totalvekt opptil 3 500 kg.'],
        ['O4','Tilhenger eller semitrailer med tillatt totalvekt over 10 000 kg.'],
        ['EN 12195-1','Standarden som beskriver hvordan surringskrefter skal beregnes.'],
        ['Quick Lashing Guide','Kortversjon av IRU-veilederen med tabeller for hvor mye ulike sikringer holder.'],
        ['Kombinert transport','Transport med flere transportformer, for eksempel bil og ferje. Lasten må sikres for alle.'],
        ['§ 3-2a (fra 2026)','Transportforetaket skal veilede sjåføren og gi skriftlig sikringsdokumentasjon ved gods med høy transportrisiko.'],
        ['Høy transportrisiko','F.eks. gods med høyde/bredde over 3, betongelementer, stål, kabeltromler, stående papirruller og krokløftcontainere.']
      ]},
      { type:'quiz', id:'t1-q1', nivaa:1, tittel:'Hvorfor og hvor mye?', sp:[
        { q:'Hvor mye skal lastsikringen på en tung lastebil minst tåle framover?', a:['0,5 ganger godsets vekt','0,8 ganger godsets vekt','2 ganger godsets vekt','Det finnes ikke noe krav'], r:1, f:'Framover 0,8 – bakover og sidevegs 0,5.' },
        { q:'Hvor mye skal sikringen minst tåle sidevegs?', a:['0,5 ganger godsets vekt','0,8 ganger godsets vekt','1,0 ganger godsets vekt','0,2 ganger godsets vekt'], r:0, f:'Halve vekta sidevegs og bakover.' },
        { q:'Hvilken forskrift har de norske reglene for sikring av last?', a:['Arbeidsmiljøloven','Forskrift om bruk av kjøretøy','Kjøpsloven','Forskrift om førerkort'], r:1, f:'Reglene står i §§ 3-2 og 3-3.' },
        { q:'Hvorfor må en logistikkoperatør kunne lastsikring?', a:['Fordi logistikkoperatører ofte laster biler og konteinere','Fordi de skal kjøre bilen','Fordi det står på fraktbrevet','Det trenger de ikke'], r:0, f:'Den som laster, påvirker hvor godt lasten kan sikres.' },
        { q:'Hvilken av disse er IKKE en sikringsmetode i forskriften?', a:['Låsing','Blokkering','Surring','Presenning'], r:3, f:'Presenning beskytter mot vær og vind, men sikrer ikke lasten.' },
        { q:'Fra når gjaldt EUs minimumsnivå for lastsikring i Norge?', a:['1. januar 2008','1. januar 2018','1. januar 2024','Det gjelder ikke i Norge'], r:1, f:'Det ble innført gjennom forskrift om bruk av kjøretøy fra 1. januar 2018.' }
      ]},
      { type:'tf', id:'t1-tf', nivaa:1, tittel:'Sant eller usant: regelverket', ps:[
        ['Minst 20 % av kjøretøyets aktuelle totalvekt skal hvile på hjulene som styrer.', true, 'Ellers blir bilen vanskelig å styre.'],
        ['Det er lov å dekke til baklysene hvis lasten er godt surret.', false, 'Påbudt lys og kjennemerker skal ikke dekkes til.'],
        ['Reglene om sikring gjelder også for kjetting, tau og presenning på bilen.', true, 'Heller ikke festemidlene skal kunne falle av eller slenge.'],
        ['«Stenging» og «blokkering» betyr det samme.', true, 'Forskriften bruker i dag ordet blokkering. Noen sier også «stempling».'],
        ['På en varebil (N1) er kravet framover 0,8 ganger vekta.', false, 'Lettere kjøretøy som ikke er nevnt i § 3-3 nr. 2, har kravet 1,0 ganger vekta framover.'],
        ['Sikringen skal også hindre at lasten heller eller velter.', true, 'Det holder ikke bare å hindre at lasten glir.'],
        ['Tar du ferje, holder det å sikre lasten for vegtransport.', false, 'Ved kombinert transport må lasten sikres for alle transportformene.'],
        ['Surringer på åpent lasteplan bør ligge innenfor sidelemmene når det er mulig.', true, 'Ellers må løse ender festes så de ikke kan skade andre trafikanter.'],
        ['Fra 1. juni 2026 skal sjåføren ha med skriftlig sikringsdokumentasjon når han frakter betongelementer.', true, '§ 3-2a: Betongelementer regnes som gods med høy transportrisiko.'],
        ['Gods kan stikke 40 cm ut på siden av bilen uten tillatelse hvis det er merket.', false, '§ 3-4: Mer enn 15 cm ut på sidene krever tillatelse fra Statens vegvesen (med unntak for båt).']
      ]},
      { type:'sort', id:'t1-s1', nivaa:2, tittel:'Hvilket krav gjelder?', instr:'Hvor mye skal sikringen minst tåle i retningen som er oppgitt?', kat:['0,5 × vekta','0,8 × vekta','1,0 × vekta'], items:[
        ['Lastebil N3 – framover',1,'Tunge kjøretøy: 0,8 framover.'],
        ['Lastebil N3 – sidevegs',0,'Sidevegs er kravet 0,5.'],
        ['Semitrailer O4 – framover',1,'O4 er nevnt i § 3-3 nr. 2.'],
        ['Semitrailer O4 – bakover',0,'Bakover er kravet 0,5.'],
        ['Varebil N1 – framover',2,'Lettere kjøretøy: 1,0 framover.'],
        ['Varebil N1 – sidevegs',0,'Sidevegs er det 0,5 for alle.'],
        ['Tilhenger O2 (bak personbil) – framover',2,'O2 er ikke nevnt i nr. 2, så kravet er 1,0.'],
        ['Lastebil N2 – framover',1,'N2 er nevnt i nr. 2.']
      ]},
      { type:'calc', id:'t1-c1', nivaa:1, gen:'sikrkrav', tittel:'Hvor mye skal sikringen tåle?', antall:5 },
      { type:'match', id:'t1-m1', nivaa:2, tittel:'Kjøretøygrupper', instr:'Koble kjøretøygruppen med riktig beskrivelse.', par:[
        ['M1','Personbil med høyst 8 sitteplasser i tillegg til føreren'],
        ['M3','Buss med over 8 sitteplasser og tillatt totalvekt over 5 000 kg'],
        ['N1','Varebil med tillatt totalvekt opptil 3 500 kg'],
        ['N2','Lastebil over 3 500 kg, men ikke over 12 000 kg'],
        ['N3','Lastebil over 12 000 kg'],
        ['O4','Tilhenger eller semitrailer over 10 000 kg']
      ]},
      { type:'match', id:'t1-m2', nivaa:3, tittel:'Standarder for lastsikringsutstyr', instr:'Koble standarden med det den handler om.', par:[
        ['EN 12195-1','Beregning av surringskrefter'],
        ['EN 12195-2','Surrebånd (stropper) av kunstfiber'],
        ['EN 12195-3','Surringskjettinger'],
        ['EN 12640','Surringspunkter (fester) på kjøretøyet'],
        ['EN 12642','Styrken i påbygget (vegger og lemmer)'],
        ['EN 12641','Presenninger']
      ]},
      { type:'fill', id:'t1-fill', nivaa:2, tittel:'Fyll inn: kravene i § 3-3', tekst:'På en tung lastebil skal lastsikringen minst tåle [[0,8]] ganger godsets vekt framover og [[0,5]] ganger vekta bakover og [[sidevegs]]. Sikringen skal også hindre at lasten heller eller [[velter]]. Godkjente metoder er låsing, [[blokkering]], direktesurring og overfallssurring. Surringskreftene skal beregnes etter standarden [[EN 12195-1]].', ekstra:['1,5','0,2','presenning','EN 283','glir'], f:'På lettere kjøretøy, som varebil, er kravet framover 1,0 ganger vekta.' },
      { type:'order', id:'t1-o1', nivaa:2, tittel:'Planlegg lastsikringen', instr:'Sett stegene i en fornuftig rekkefølge – fra du får oppdraget til bilen ruller.', steg:[
        'Finn ut hva godset veier, hvor høyt det er og hvor tyngdepunktet ligger','Finn ut hvilken kjøretøygruppe bilen er, og hvilke krav som gjelder','Finn friksjonen mellom godset og underlaget','Velg metode – blokker så mye som mulig','Regn ut hvor mange surringer du trenger i tillegg','Last og sikr godset','Kontroller sikringen før avreise','Etterstram etter en tids kjøring'
      ], f:'Blokkering er ofte den enkleste og sikreste løsningen. Surring kommer i tillegg der blokkering ikke holder.' },
      { type:'quiz', id:'t1-q2', nivaa:3, tittel:'Bruk regelverket', sp:[
        { q:'Du har 20 tonn gods på en semitrailer. Hvor mye må sikringen minst holde igjen framover?', a:['10 tonn','16 tonn','20 tonn','8 tonn'], r:1, f:'20 t × 0,8 = 16 t framover. Bakover og sidevegs: 20 t × 0,5 = 10 t.' },
        { q:'Hvorfor er kravet framover høyere enn bakover?', a:['Fordi lasten er tyngre framme','Fordi bråbremsing gir større krefter enn akselerasjon','Fordi frontveggen er svakere','Det er tilfeldig'], r:1, f:'Forsøk viser at bremsekreftene er størst. Når bilen bremser, skyves lasten framover.' },
        { q:'Hvorfor har svenske veiledere et strengere krav sidevegs for rullende last?', a:['Fordi Sverige har flere svinger','Fordi Sverige frakter mye papir på tunge ruller','Fordi svenske lastebiler er smalere','Fordi EU krever det'], r:1, f:'For rullende last sidevegs bruker den svenske veilederen 0,6 i stedet for 0,5.' },
        { q:'En kollega vil bruke en egen beregningsmetode i stedet for EN 12195-1. Hva sier forskriften?', a:['Det er aldri lov','Det kan godtas hvis det kan dokumenteres at sikringen tåler kravene','Det er alltid lov','Bare politiet kan bestemme det'], r:1, f:'Andre metoder kan godtas når det er dokumentert at sikringen minst tåler kreftene i kravet.' },
        { q:'Du skal kjøre en stående papirrull for et transportfirma. Hva krever § 3-2a (fra 1. juni 2026)?', a:['Ingenting spesielt','At firmaet gir deg skriftlig dokumentasjon på hvordan lasten skal sikres, og at du har den med','At du kjører under 50 km/t','At kunden sikrer lasten'], r:1, f:'Stående papirruller regnes som gods med høy transportrisiko. Dokumentasjonen skal kunne vises ved kontroll.' },
        { q:'Et kolli er 2,4 m høyt og 0,7 m bredt. Hvorfor er det ekstra viktig å ha sikringsdokumentasjon?', a:['Fordi høyde/bredde er over 3 – høy transportrisiko etter § 3-2a','Fordi det er tungt','Fordi det er bredt','Det trengs ikke'], r:0, f:'2,4 ÷ 0,7 ≈ 3,4. Over 3 gir dokumentasjonsplikt.' },
        { q:'Du kjører en container fra Stavanger til Danmark med ferje. Hvilke regler gjelder?', a:['Bare vegreglene','Bare sjøreglene','Reglene for både veg og sjø','Ingen – containeren er lukket'], r:2, f:'Ved kombinert transport sikrer du for alle transportformene.' }
      ]},
      { type:'reflect', id:'t1-r1', nivaa:3, tittel:'Forklar: Hvorfor sikre last?', q:'En ny sommervikar på lageret sier: «Det er jo sjåføren som har ansvaret for lasten. Jeg setter bare pallene inn.» Forklar hvorfor også logistikkoperatøren må kunne lastsikring. Bruk regelverket i svaret.', punkter:[
        'Lasten kan skade folk, gods og kjøretøy hvis den flytter seg',
        'Sikring av last er et trafikksikkerhetstiltak',
        'Reglene står i forskrift om bruk av kjøretøy §§ 3-2 og 3-3',
        'Kravene: 0,8 × vekta framover og 0,5 × vekta bakover og sidevegs (tunge kjøretøy)',
        'Den som laster, bestemmer om lasten kan blokkeres (inntil frontvegg, uten luft)',
        'Riktig plassering gir jevn vektfordeling og nok vekt på styrende hjul',
        'Godt samarbeid mellom lager og sjåfør gjør sikringen enklere og tryggere'
      ]}
    ]
  },
  /* ================================================================ T2 */
  {
    id: 't2', lok: 'A-02', tittel: 'Krefter, friksjon og tyngdepunkt',
    podkast: { tittel: 'Fysikken bak lastsikring på norske veier' },
    kort: 'Treghetskrefter ved bremsing, akselerasjon og sving, tyngdekraft i newton, Newtons lover, friksjonskoeffisient og hvor mye friksjonen holder igjen.',
    bok: 'Læreboka 5.4 (s. 124–130)',
    mal: ['forklare hvilke krefter lasten blir utsatt for når bilen bremser, akselererer og svinger','regne om fra kilogram til newton','forklare hva friksjonskoeffisienten forteller','regne ut hvor mye av kraften friksjonen holder igjen, og hvor mye som må sikres i tillegg'],
    punkter: [
      'Lasten står ikke fast av seg selv. Den vil fortsette i samme fart og retning (<b>treghet</b>). Når bilen <b>bremser</b>, skyves lasten <b>framover</b>. Når bilen <b>akselererer</b>, skyves den <b>bakover</b>. I en <b>sving</b> skyves den <b>utover</b>.',
      'Forsøk viser omtrent 8 N per kg ved full bråbremsing og omtrent 5 N per kg ved kraftig akselerasjon og i sving. Det er bakgrunnen for kravene 0,8 og 0,5.',
      'Tyngdekraften trekker 1 kg ned med omtrent <b>10 N</b> (egentlig 9,81 N). Et kolli på 600 kg presses mot planet med 6 000 N. I lastsikring brukes også <b>dekanewton</b>: 1 daN = 10 N.',
      '<b>Newtons 1. lov:</b> Et kolli i ro blir liggende i ro – eller i jevn fart – til en kraft virker på det. <b>2. lov:</b> Kraft = masse × akselerasjon. Dobbelt så tung last gir dobbelt så stor kraft. Tungt gods står altså <i>ikke</i> bedre enn lett gods. <b>3. lov:</b> Til hver kraft finnes en like stor motkraft.',
      '<b>Friksjonskoeffisienten (µ)</b> forteller hvor godt to flater «griper» i hverandre. Den måles med en <b>krengeprøve</b>: Du vipper underlaget til godset begynner å gli. Jo brattere, desto høyere µ.',
      'Eksempler: plastpall mot stålplate har lav friksjon (rundt 0,15–0,2). Tre mot riflet aluminium ligger mellom 0,25 (høvlet tre) og 0,4 (sagd tre). En <b>friksjonsmatte</b> av gummi gir rundt 0,6. Bruk alltid den <b>laveste</b> friksjonen i «stabelen» – det er der godset glir først.',
      'Friksjonen holder igjen <b>tyngden × µ</b>. Resten må sikres med blokkering eller surring. Eksempel: 1 000 kg og µ = 0,3 → friksjonen holder 3 000 N. Kravet framover er 8 000 N, så 5 000 N må sikres.',
      'På ujevn veg («vaskebrett») kan godset lette fra planet et øyeblikk. Da forsvinner friksjonen. Stramme <b>overfallssurringer</b> presser godset ned og holder friksjonen på plass.',
      '<b>Tyngdepunktet</b> er punktet der vi kan tenke oss at all massen er samlet. Høyt tyngdepunkt gir større fare for velt. Kolli med skjevt tyngdepunkt er ofte merket med et eget symbol.'
    ],
    ndla: [N.krefter, N.friksjon, N.demo, N.begreper],
    arbeidsbok: '5.10, 5.11 (friksjon), 5.16, 5.17, 5.18',
    aktiviteter: [
      { type:'voks', id:'t2-voks', tittel:'Små krefter, store følger', tekst:['En pall på 500 kg står helt rolig på lasteplanet når du kjører jevnt. Men ved en bråbremsing presses den framover med en kraft som tilsvarer 400 kg. Den kraften kan ingen holde igjen med hendene.','Det samme gjelder mye annet: Små ting som ser ufarlige ut når alt går rolig, blir store når noe uventet skjer. En dårlig vane, en snarvei, en løs stropp.','Profesjonelle planlegger for det som kan skje – ikke bare for det som pleier å skje.'], sporsmal:['Hva er «bråbremsingen» i ditt liv – situasjoner der små svakheter plutselig blir store?','Hva kan du gjøre i dag for å være forberedt?'], handling:'Velg én ting du ofte tar en snarvei på, og gjør den grundig hver gang denne uka.' },
      { type:'flash', id:'t2-flash', tittel:'Begrepskort: krefter og friksjon', kort:[
        ['Treghet','Godset vil fortsette i samme fart og retning. Derfor «vil» det videre når bilen bremser.'],
        ['Treghetskraft','Kraften som skyver lasten motsatt vei av kjøretøyets fartsendring.'],
        ['Newton (N)','Enheten for kraft. 1 kg blir trukket ned med omtrent 10 N.'],
        ['Dekanewton (daN)','10 N. Brukes ofte på merkingen av surrebånd.'],
        ['Newtons 1. lov','Et kolli i ro blir i ro – eller i jevn fart – til en kraft virker på det.'],
        ['Newtons 2. lov','Kraft = masse × akselerasjon. Tyngre gods trenger kraftigere sikring.'],
        ['Newtons 3. lov','Til hver kraft finnes en like stor motkraft.'],
        ['Friksjon','Motstanden mot å gli når to flater ligger mot hverandre.'],
        ['Friksjonskoeffisient (µ)','Tall som viser hvor stor friksjonen er mellom to materialer. Høyere tall = bedre grep.'],
        ['Krengeprøve','Test der underlaget vippes til godset glir. Vinkelen viser friksjonen.'],
        ['Friksjonsmatte','Gummimatte som legges under godset for å øke friksjonen (rundt µ = 0,6).'],
        ['Vaskebrett','Ujevn veg der godset kan lette fra planet og miste friksjonen.'],
        ['Tyngdepunkt','Punktet der vi tenker oss at all massen er samlet.'],
        ['Udelbar enhet','Når last og kjøretøy er låst eller sikret så godt at de oppfører seg som én enhet.']
      ]},
      { type:'quiz', id:'t2-q1', nivaa:1, tittel:'Hvilken vei skyves lasten?', sp:[
        { q:'Bilen bråbremser. Hvilken vei skyves lasten?', a:['Framover','Bakover','Oppover','Den står stille'], r:0, f:'Lasten vil fortsette framover når bilen stopper.' },
        { q:'Bilen akselererer kraftig fra lyskrysset. Hvilken vei skyves lasten?', a:['Framover','Bakover','Sidevegs','Nedover'], r:1, f:'Bilen drar fra lasten, så lasten skyves bakover.' },
        { q:'Bilen kjører i en krapp venstresving. Hvilken vei skyves lasten?', a:['Mot venstre (inn i svingen)','Mot høyre (ut av svingen)','Framover','Bakover'], r:1, f:'I sving skyves lasten utover – bort fra sentrum av svingen.' },
        { q:'Omtrent hvor stor kraft trekker tyngdekraften 1 kg ned med?', a:['1 N','10 N','100 N','1 000 N'], r:1, f:'9,81 N – rundet av til 10 N.' },
        { q:'Hva viser friksjonskoeffisienten?', a:['Hvor tungt godset er','Hvor godt to flater griper i hverandre','Hvor fort bilen kan kjøre','Hvor høyt godset er'], r:1, f:'Jo høyere µ, desto bedre grep.' }
      ]},
      { type:'tf', id:'t2-tf', nivaa:1, tittel:'Sant eller usant: krefter og friksjon', ps:[
        ['Tungt gods står så godt at det ikke trenger sikring.', false, 'Newtons 2. lov: Tyngre gods gir større krefter og trenger kraftigere sikring.'],
        ['1 daN er det samme som 10 N.', true, 'Deka betyr ti.'],
        ['Friksjonsmatter øker friksjonen mellom godset og underlaget.', true, 'Gummimatter gir ofte rundt µ = 0,6.'],
        ['Plastpall mot stålgolv gir høy friksjon.', false, 'Den kombinasjonen gir lav friksjon, rundt 0,15–0,2.'],
        ['På ujevn veg kan friksjonen mellom godset og planet forsvinne helt et øyeblikk.', true, 'Godset kan «hoppe» – derfor må overfallssurringer være strammet.'],
        ['Høyt tyngdepunkt gir mindre fare for velt.', false, 'Høyt tyngdepunkt gir større veltefare.'],
        ['De største kreftene på lasten oppstår vanligvis ved bråbremsing.', true, 'Omtrent 8 N per kg framover.']
      ]},
      { type:'match', id:'t2-m1', nivaa:1, tittel:'Situasjon og kraft', instr:'Hva skjer med lasten i hver situasjon?', par:[
        ['Bråbremsing','Lasten skyves framover'],
        ['Kraftig akselerasjon','Lasten skyves bakover'],
        ['Krapp sving','Lasten skyves utover'],
        ['Vaskebrettveg','Lasten kan lette og miste friksjonen'],
        ['Bratt motbakke','Lasten vil gli bakover']
      ]},
      { type:'fill', id:'t2-fill', nivaa:2, tittel:'Fyll inn: friksjon', tekst:'Et kolli på 500 kg blir trukket ned med en kraft på [[5 000]] N. Friksjonskoeffisienten mellom kolliet og planet er 0,4. Da holder friksjonen igjen [[2 000]] N. Kravet framover er 0,8 × 5 000 N = [[4 000]] N. Derfor må du sikre [[2 000]] N i tillegg med blokkering eller [[surring]].', ekstra:['500','3 000','1 000','presenning'], f:'Framgangsmåten: tyngde → det friksjonen holder → kravet → differansen må sikres.' },
      { type:'sort', id:'t2-s1', nivaa:2, tittel:'Høy eller lav friksjon?', instr:'Gir kombinasjonen lav eller god friksjon? Tenk på materialene.', kat:['Lav (0,3 eller lavere)','God (0,4 eller høyere)'], items:[
        ['Plastpall mot rustfri stålplate',0,'Rundt 0,15.'],
        ['Kolli på friksjonsmatte av gummi',1,'Rundt 0,6.'],
        ['Glatt, malt plate mot glatt, malt plate',0,'Rundt 0,2.'],
        ['Grov betong mot sagd treplate',1,'Rundt 0,7.'],
        ['Lasteplan med is og snø',0,'Is gir svært lav friksjon – rengjør planet.'],
        ['Trepall mot stålplate',0,'Rundt 0,3.'],
        ['Kartong mot kartong',1,'Rundt 0,5.']
      ]},
      { type:'calc', id:'t2-c1', nivaa:1, gen:'tyngde', tittel:'Fra kilo til newton', antall:5 },
      { type:'calc', id:'t2-c2', nivaa:2, gen:'friksjon', tittel:'Hvor mye holder friksjonen?', antall:5 },
      { type:'calc', id:'t2-c3', nivaa:3, gen:'restkraft', tittel:'Hvor mye må sikres?', antall:5 },
      { type:'quiz', id:'t2-q2', nivaa:3, tittel:'Tenk som en lastsikrer', sp:[
        { q:'En storsekk står på en trepall på et stålgolv. Storsekk mot trepall har µ = 0,4. Trepall mot stål har µ = 0,3. Hvilken friksjon regner du med?', a:['0,4','0,3','0,7','0,1'], r:1, f:'Bruk den laveste. Pallen glir på stålet før sekken glir på pallen.' },
        { q:'Du har 5 tonn på bilen og akselererer med 5 m/s². Hvor stor kraft virker på godset?', a:['1 000 N','25 000 N','5 000 N','50 000 N'], r:1, f:'F = m × a = 5 000 kg × 5 m/s² = 25 000 N.' },
        { q:'Du dobler lastvekta fra 5 til 10 tonn. Hva skjer med kreftene ved samme bremsing?', a:['De halveres','De blir like','De dobles','De firedobles'], r:2, f:'Kraften er proporsjonal med massen.' },
        { q:'Hvorfor er friksjonsmatter ekstra nyttige på vinteren?', a:['De holder godset varmt','Snø og is på planet gir svært lav friksjon','De er påbudt om vinteren','De gjør stroppene sterkere'], r:1, f:'Matter og rent plan gir mer friksjon – og mindre behov for andre sikringer.' },
        { q:'Du vipper et lasteplan sakte opp. Kolliet begynner å gli ved ca. 15°. Omtrent hvilken friksjonskoeffisient har du?', a:['0,1','0,3','0,6','0,9'], r:1, f:'En helning på rundt 15° svarer til µ ≈ 0,3. Ved rundt 30° er µ ≈ 0,6.' },
        { q:'Vinterføre med våt is gir µ mellom 0,05 og 0,15 mellom dekk og veg. Hva bør du gjøre før en bratt bakke?', a:['Kjøre fortere','Legge på kjetting for å øke friksjonen','Slippe luft ut av dekkene','Ingenting – lasten er sikret'], r:1, f:'Lastsikringen hjelper ikke hvis hele bilen sklir. Kjetting øker grepet.' },
        { q:'Du skal sette et tungt kolli med skjevt tyngdepunkt på en bakløfter. Hvor skal tyngdepunktet være?', a:['Ytterst på plattformen','Midt mellom løftearmene','Så nær bilen som mulig, uansett side','Det spiller ingen rolle'], r:1, f:'Da fordeles vekta jevnt på løftearmene.' },
        { q:'Hvorfor skal overfallssurringer være strammet, selv om friksjonen er høy?', a:['For at de ikke skal blafre','For å presse godset ned og hindre at friksjonen forsvinner på ujevn veg','Fordi kontrolløren vil se det','Det trengs ikke'], r:1, f:'Uten forspenning kan godset «vandre» på vaskebrett.' }
      ]},
      { type:'case', id:'t2-case', nivaa:3, tittel:'Case: Malingspallen', intro:'Du skal frakte en pall med malingsspann på en lastebil (N3). Pallen med maling veier 800 kg. Det er en plastpall, og lasteplanet har stålgolv. Spannene er krympet fast til pallen.', steg:[
        { q:'Hva er det første du bør finne ut?', valg:[
          { t:'Friksjonen mellom plastpallen og stålgolvet', ok:true, f:'Riktig. Spannene er krympet fast, så pallen og malingen er én enhet. Da er det pallen mot golvet som avgjør.' },
          { t:'Hvilken farge malingen har', ok:false, f:'Fargen påvirker ikke sikringen.' },
          { t:'Om spannene har lokk', ok:false, f:'Viktig for emballasjen, men ikke for hvor mye som må sikres.' }
        ]},
        { q:'Friksjonen er lav, rundt µ = 0,2. Hvor mye holder friksjonen igjen?', valg:[
          { t:'800 × 10 × 0,2 = 1 600 N', ok:true, f:'Tyngden er 8 000 N, og friksjonen holder 20 % av det.' },
          { t:'800 × 0,2 = 160 N', ok:false, f:'Husk å gjøre om til newton først: 800 kg ≈ 8 000 N.' },
          { t:'8 000 N', ok:false, f:'Det er hele tyngden. Friksjonen holder bare en del av den.' }
        ]},
        { q:'Kravet framover er 0,8 × 8 000 N = 6 400 N. Hvor mye må sikres i tillegg til friksjonen?', valg:[
          { t:'4 800 N', ok:true, f:'6 400 N − 1 600 N = 4 800 N.' },
          { t:'1 600 N', ok:false, f:'Det er det friksjonen klarer selv.' },
          { t:'0 N – friksjonen holder', ok:false, f:'Friksjonen holder bare 1 600 N av 6 400 N.' }
        ]},
        { q:'Hva er den enkleste måten å bedre situasjonen på?', valg:[
          { t:'Legg friksjonsmatte under pallen og plasser den helt inntil frontveggen', ok:true, f:'Matten øker friksjonen, og frontveggen blokkerer framover. Sikr i tillegg mot sideforskyvning og velt.' },
          { t:'Kjør sakte, så trengs ingen sikring', ok:false, f:'En bråbremsing kan skje uansett fart.' },
          { t:'Legg en presenning over pallen', ok:false, f:'Presenning er ikke lastsikringsutstyr.' }
        ]}
      ]}
    ]
  },
  /* ================================================================ T3 */
  {
    id: 't3', lok: 'B-01', tittel: 'Låsing og blokkering',
    kort: 'Konteinerlåser, blokkering mot frontvegg, baklem og sidekarmer, mellomlegg, sperrebommer, strekk- og krympefilm og blokkering mot velt.',
    bok: 'Læreboka 5.5–5.6 (s. 131–134) og 5.9 (s. 149)',
    mal: ['forklare forskjellen på låsing og blokkering','blokkere last framover, bakover og sidevegs','forklare 15 cm-regelen og når du trenger mellomlegg','forklare hvor høyt du må blokkere for å hindre velt'],
    punkter: [
      '<b>Låsing</b> betyr at godset festes direkte i kjøretøyet med låser. Typisk eksempel: en konteiner som låses til chassiset med <b>konteinerlåser</b> (twistlocks). Da blir bil og last én <b>udelbar enhet</b>.',
      '<b>Blokkering</b> betyr at godset står tett inntil noe som hindrer det i å flytte seg: frontveggen, lemmene, delevegger, staker – eller <b>mellomlegg</b> som bukker, klosser, kiler og tomme paller.',
      '<b>Framover:</b> Sett lasten helt inntil frontveggen. Hvor mye frontveggen tåler, avhenger av påbygget (standarden EN 12642) og av friksjonen – bedre friksjon betyr at frontveggen kan holde igjen mer gods.',
      '<b>Bakover:</b> Blokker mot baklemmen eller mot en tverrgående innretning. Mange distribusjonsbiler har <b>skinner og sperrebommer</b> som kan settes der lasten slutter.',
      '<b>Sidevegs:</b> Det bør ikke være mer enn <b>15 cm</b> luft mellom lasten og sidekarmene. Er det mer, fyller du med mellomlegg.',
      '<b>Mot velt:</b> Blokkeringen må gå høyt nok i forhold til tyngdepunktet. Blokkerer du helt opp til tyngdepunktet, kan ikke kolliet velte den veien.',
      'Pallet gods er ofte stabilisert med <b>strekkfilm</b> (plast som strekkes 20–40 % rundt pallen) eller <b>krympefilm</b> (plast som krymper rundt varene når den varmes opp). Filmen holder kolliene sammen, men pallen må fortsatt blokkeres og sikres mot velt på bilen.',
      'Blokkering er ofte nok for lett stykkgods i lukket konteiner – men tyngre last trenger nesten alltid <b>surring i tillegg</b>.'
    ],
    ndla: [N.viktig, N.demo, N.lastbarer, N.lasting],
    arbeidsbok: '5.5, 5.11 (blokkering, strekk- og krympefilm), 5.12, 5.19',
    aktiviteter: [
      { type:'voks', id:'t3-voks', tittel:'Gjør det riktig første gang', tekst:['Det tar kanskje fem minutter ekstra å flytte pallene helt inntil frontveggen og fylle hullene med mellomlegg. Det tar mye lenger tid å rydde opp etter en last som har veltet.','Kvalitet handler ofte om å gjøre det kjedelige grundig – også på fredag ettermiddag.','Kunden ser ikke hvordan du lastet. Men kunden merker det når varene kommer hele fram.'], sporsmal:['Når er det mest fristende for deg å «gjøre det fort» i stedet for «gjøre det riktig»?','Hvordan føles det når noen andre har gjort en jobb grundig for deg?'], handling:'Velg én oppgave denne uka som du gjør så grundig at du kunne vist den fram til en sensor.' },
      { type:'flash', id:'t3-flash', tittel:'Begrepskort: låsing og blokkering', kort:[
        ['Låsing','Godset festes direkte i kjøretøyet med låser, f.eks. konteinerlåser.'],
        ['Konteinerlås (twistlock)','Lås som fester konteinerens hjørner til chassiset.'],
        ['Blokkering','Lasten står tett inntil vegger, lemmer, staker eller mellomlegg og kan ikke flytte seg.'],
        ['Frontvegg','Veggen foran på lasteplanet. Blokkerer lasten framover.'],
        ['Baklem','Lemmen bak på lasteplanet. Kan blokkere lasten bakover.'],
        ['Sperrebom','Tverrstang som festes i skinner i distribusjonsbiler og blokkerer lasten bakover.'],
        ['Mellomlegg','Tomme paller, klosser, bukker, kiler eller luftputer som fyller tomrom.'],
        ['15 cm-regelen','Mer enn 15 cm luft til sidekarmene? Fyll med mellomlegg.'],
        ['Strekkfilm','Plastfilm som strekkes rundt kolliene på en pall for å holde dem samlet.'],
        ['Krympefilm','Plastfilm som krymper rundt varene når den varmes opp. Gir svært stram pakking.'],
        ['Staker','Stolper på siden av lasteplanet, f.eks. for tømmer og materialpakker.'],
        ['Blokkering mot velt','Blokkeringen må gå minst opp til tyngdepunktet for å hindre velt.']
      ]},
      { type:'hotspot', id:'t3-hs1', nivaa:1, tittel:'Finn fram på lasteplanet', instr:'Tegningen viser lasteplanet på en lastebil sett ovenfra. Trykk på riktig sted.', svg:SVG_PLAN, sp:[
        { q:'Hva blokkerer pallene mot forskyvning framover?', z:'front', f:'Frontveggen. Pallene står helt inntil den, så de kan ikke skli framover ved bråbremsing.' },
        { q:'Hva blokkerer pallene mot forskyvning bakover?', z:'bom', f:'Sperrebommen er satt rett bak den siste pallen. Baklemmen står for langt unna til å blokkere.' },
        { q:'Her er det for mye luft mellom lasten og sidekarmen. Trykk der det må fylles med mellomlegg.', z:'gap', f:'25 cm er mer enn 15 cm. Fyll med mellomlegg, eller sikr med surring.' },
        { q:'Trykk på et surringsfeste.', z:'feste', f:'Surringsfestene sitter i lastbæreren. Husk: Ingen kjede er sterkere enn det svakeste leddet.' },
        { q:'Hvilken del av lastbæreren blokkerer lasten sidevegs – når det ikke er for mye luft?', z:'side', f:'Sidekarmene (lemmene), så sant de er sterke nok.' },
        { q:'Trykk på baklemmen.', z:'bak', f:'Baklemmen kan blokkere bakover når lasten står helt inntil den.' }
      ]},
      { type:'quiz', id:'t3-q1', nivaa:1, tittel:'Låsing eller blokkering?', sp:[
        { q:'En konteiner festes til chassiset med konteinerlåser. Hvilken metode er dette?', a:['Låsing','Blokkering','Surring','Overfallssurring'], r:0, f:'Godset låses direkte til kjøretøyet.' },
        { q:'Du setter pallene tett inntil frontveggen. Hvilken metode er dette?', a:['Låsing','Blokkering','Grimesurring','Direktesurring'], r:1, f:'Frontveggen blokkerer lasten framover.' },
        { q:'Hvor mye luft bør det maksimalt være mellom lasten og sidekarmene?', a:['5 cm','15 cm','50 cm','1 meter'], r:1, f:'Mer enn 15 cm – fyll med mellomlegg.' },
        { q:'Hva kan du bruke som mellomlegg?', a:['Tomme paller, klosser og kiler','Presenning','Løse stropper','Ingenting'], r:0, f:'Også luftputer og bukker kan brukes.' },
        { q:'Hva gjør strekkfilmen rundt en pall?', a:['Holder kolliene på pallen samlet','Sikrer pallen til lasteplanet','Erstatter all surring','Gjør pallen lettere'], r:0, f:'Filmen stabiliserer pallen, men pallen må fortsatt sikres på bilen.' }
      ]},
      { type:'tf', id:'t3-tf', nivaa:1, tittel:'Sant eller usant: blokkering', ps:[
        ['Når en konteiner er låst til chassiset, blir bil og konteiner en udelbar enhet.', true, 'Låsene holder konteineren fast i alle retninger.'],
        ['Det er greit med 40 cm luft til sidekarmen hvis lasten er tung.', false, 'Mer enn 15 cm luft må fylles med mellomlegg – uansett vekt.'],
        ['Bedre friksjon gjør at frontveggen kan blokkere mer gods.', true, 'Friksjonen tar en del av kraften, så frontveggen får mindre å holde igjen.'],
        ['Blokkering framover hindrer også at lasten glir bakover.', false, 'Bakover må du blokkere for seg – f.eks. med sperrebom eller baklem.'],
        ['Blokkerer du opp til tyngdepunktet, kan kolliet ikke velte den veien.', true, 'Høy nok blokkering hindrer både forskyvning og velt.'],
        ['Krympefilm krymper når den varmes opp.', true, 'Pallen sendes gjennom et varmekammer.']
      ]},
      { type:'sort', id:'t3-s1', nivaa:2, tittel:'Låsing, blokkering eller surring?', instr:'Hvilken sikringsmetode beskrives?', kat:['Låsing','Blokkering','Surring'], items:[
        ['Konteineren festes med twistlocks i alle fire hjørner',0,'Låser i kjøretøyet = låsing.'],
        ['Pallene står tett mot frontveggen',1,'Frontveggen blokkerer.'],
        ['En sperrebom settes rett bak de siste pallene',1,'Sperrebommen blokkerer bakover.'],
        ['Et kolli strammes ned mot planet med to stropper',2,'Stropper = surring.'],
        ['Tomme paller fyller luft mellom lasten og sidekarmen',1,'Mellomlegg blokkerer sidevegs.'],
        ['En maskin festes med kjetting fra løfteøyene til festene på planet',2,'Kjetting = surring (direktesurring).'],
        ['Kiler legges foran og bak hjulene på en bil som fraktes',1,'Klosser og kiler blokkerer.'],
        ['Et vekselflak festes med låser til bilen',0,'Låser = låsing.']
      ]},
      { type:'fill', id:'t3-fill', nivaa:2, tittel:'Fyll inn: blokkering', tekst:'For å blokkere lasten framover setter du den helt inntil [[frontveggen]]. Bakover kan du bruke baklemmen eller en [[sperrebom]]. Sidevegs bør det ikke være mer enn [[15]] cm luft til sidekarmene. Er det mer, fyller du med [[mellomlegg]]. For å hindre velt må blokkeringen gå minst opp til [[tyngdepunktet]].', ekstra:['taket','50','presenning','hjulene'], f:'Blokkering er ofte den raskeste og sikreste metoden – men tung last trenger surring i tillegg.' },
      { type:'quiz', id:'t3-q2', nivaa:3, tittel:'Blokkering i praksis', sp:[
        { q:'Du har bare 10 paller på en bil med plass til 16. Hvordan blokkerer du best bakover?', a:['Sett pallene bakerst','Sett pallene inntil frontveggen og en sperrebom rett bak den siste','La det være luft – den er jo tung','Legg pallene på høykant'], r:1, f:'Framover blokkerer frontveggen, bakover sperrebommen.' },
        { q:'En høy pall har tyngdepunktet 1,0 m over planet. Du blokkerer bare de nederste 20 cm. Hva er problemet?', a:['Ingenting','Pallen kan velte over blokkeringen','Pallen blir for tung','Blokkeringen er for høy'], r:1, f:'Blokker opp til tyngdepunktet – eller sikr mot velt med surring.' },
        { q:'Hvorfor kan en frontvegg holde igjen mer gods når friksjonen er høy?', a:['Fordi veggen blir sterkere','Fordi friksjonen tar en del av kraften','Fordi godset blir lettere','Det stemmer ikke'], r:1, f:'Friksjonen og frontveggen deler på jobben.' },
        { q:'Du laster lett stykkgods i en lukket konteiner. Hva er normalt nok?', a:['Blokkering mot veggene i hele bredden og høyden','Ingen sikring','Bare presenning','Bare én stropp'], r:0, f:'Start mot frontveggen og fyll hele bredden og høyden. Tunge kolli lavt og fremme.' },
        { q:'Et kolli er 180 cm høyt og har tyngdepunktet midt i. Hvor høyt må blokkeringen minst gå for å hindre velt?', a:['30 cm','90 cm','150 cm','180 cm'], r:1, f:'Opp til tyngdepunktet: 180 cm ÷ 2 = 90 cm.' },
        { q:'Hvorfor må du blokkere «platelaster» helt opp til den øverste platen?', a:['Ellers kan de øverste platene skli over blokkeringen','Fordi det ser pent ut','Fordi platene er lette','Det trenger du ikke'], r:0, f:'Plater glir lett på hverandre. I tillegg må lasten surres.' }
      ]},
      { type:'case', id:'t3-case', nivaa:3, tittel:'Case: Distribusjonsbilen', intro:'Du laster en distribusjonsbil med skillevegg, skinner og to sperrebommer. Du har 11 paller dagligvarer. Bilen har plass til 18 paller. Pallene er filmet.', steg:[
        { q:'Hvor setter du de første pallene?', valg:[
          { t:'Tett inntil frontveggen, i hele bredden', ok:true, f:'Da er lasten blokkert framover fra starten.' },
          { t:'Bakerst, så de er lette å få ut', ok:false, f:'Da står lasten fritt framover – og kan skli ved bråbremsing.' },
          { t:'Spredt utover hele planet for jevn vekt', ok:false, f:'Luft mellom pallene gjør at de kan flytte seg.' }
        ]},
        { q:'Den siste raden har bare én pall. Det er 1 meter luft ved siden av den. Hva gjør du?', valg:[
          { t:'Fyller med mellomlegg (for eksempel tomme paller) eller sikrer pallen med surring', ok:true, f:'1 meter er mye mer enn 15 cm. Pallen må blokkeres eller surres sidevegs.' },
          { t:'Lar den stå – den er filmet', ok:false, f:'Filmen holder kolliene på pallen sammen, men hindrer ikke pallen i å skli.' },
          { t:'Legger presenning rundt', ok:false, f:'Presenning er ikke sikringsutstyr.' }
        ]},
        { q:'Hvordan blokkerer du lasten bakover?', valg:[
          { t:'Setter en sperrebom i skinnene rett bak de siste pallene', ok:true, f:'Bommen blokkerer bakover der lasten slutter.' },
          { t:'Stoler på baklemmen, selv om den står 3 meter bak', ok:false, f:'Baklemmen blokkerer bare når lasten står inntil den.' },
          { t:'Kjører forsiktig fra lyskryss', ok:false, f:'Kjørestil erstatter ikke sikring.' }
        ]},
        { q:'Underveis tømmer du de fire første pallene hos første kunde. Hva nå?', valg:[
          { t:'Flytter sperrebommen eller sikrer de resterende pallene på nytt før du kjører videre', ok:true, f:'Lasten skal være sikret på hele turen – også etter hver levering.' },
          { t:'Kjører videre – resten står jo fortsatt', ok:false, f:'Nå er det luft foran pallene. De kan skli framover.' },
          { t:'Ringer kunden og spør', ok:false, f:'Det er sjåførens ansvar å sikre lasten.' }
        ]}
      ]},
      { type:'reflect', id:'t3-r1', nivaa:2, tittel:'Lag en oversikt: Når passer blokkering?', q:'Lag en oversikt over situasjoner der du kan bruke blokkering som sikringsmetode. Ta med hva du blokkerer mot, og når du må surre i tillegg.', punkter:[
        'Blokkering framover mot frontveggen',
        'Blokkering bakover mot baklem eller sperrebom',
        'Blokkering sidevegs med mellomlegg når det er mer enn 15 cm luft',
        'Klosser eller kiler for runde kolli og kjøretøy',
        'Blokkering opp til tyngdepunktet for å hindre velt',
        'Surring i tillegg for tung last eller når blokkeringen ikke er høy nok'
      ]}
    ]
  },
  /* ================================================================ T4 */
  {
    id: 't4', lok: 'B-02', tittel: 'Surring og surringsutstyr',
    kort: 'Overfalls-, loop-, grime- og direktesurring, surringsvinkler, etterstramming, merking av surrebånd (LC, STF, SHF), kjetting og surringsfester.',
    bok: 'Læreboka 5.7 (s. 135–148)',
    mal: ['kjenne igjen de fire surringsteknikkene og vite hva hver av dem brukes til','forklare hvordan surringsvinkelen påvirker kraften','lese merkingen på et surrebånd og vite når utstyret skal kasseres','bruke en tabellverdi til å regne ut hvor mange surringer du trenger'],
    punkter: [
      '<b>Overfallssurring</b> (overtoppsurring): Stroppen går over lasten fra side til side og presser den ned mot planet. Den virker ved å <b>øke friksjonen</b>. Den skal ligge over tyngdepunktet, og den må være godt strammet.',
      '<b>Loopsurring</b>: Stroppen går rundt lasten og festes på samme side. Den brukes <b>i par</b> (én på hver side) og hindrer forskyvning og velt <b>sidevegs</b>. Minst ett par per lastseksjon – lange kolli minst to par.',
      '<b>Grimesurring</b>: Stroppen legges rundt toppkanten foran (eller bak) på lasten og går skrått ned til et feste på hver side langs lasten. Den hindrer glidning og velt <b>framover eller bakover</b>. Vinkelen mot planet skal ikke være over <b>45°</b>. Festet på halv høyde holder den bare halvparten.',
      '<b>Direktesurring</b> (også kalt kryssurring): Stroppen eller kjettingen går direkte fra et feste <b>på godset</b> til et feste på bilen. Vinkelen bør være mellom <b>30° og 60°</b>. Krysser surringene, skal krysset ligge over tyngdepunktet.',
      '<b>Surringsvinkelen</b> er vinkelen mellom planet og stroppen. Ved 90° presser hele strammekraften nedover. Jo lavere vinkel, desto mindre presser den ned. Tabellene for overfallssurring gjelder ved 75–90°. Ved 30–75° trenger du dobbelt så mange stropper. Under 30° må du velge en annen metode.',
      '<b>Merking av surrebånd</b> (EN 12195-2): <b>LC</b> (lashing capacity – hva båndet tåler i rett strekk, oppgitt i daN), <b>S<sub>HF</sub></b> (standard håndkraft på strammeren) og <b>S<sub>TF</sub></b> (strammekraften du oppnår i båndet), i tillegg til produsent, år, materiale og «Not for lifting». Båndet skal ikke brukes til løft.',
      '<b>Kasser</b> båndet hvis merkelappen mangler, eller hvis det har kutt, knuter eller andre skader, eller hvis strammeren er rustet og treg. Bruk <b>kantbeskyttere</b> mot skarpe kanter.',
      '<b>Kjetting</b> brukes særlig på stein, stål og betong. Den skal være <b>kortlenket</b>, merket og minst <b>Grade 80</b>. En <b>tolk</b> viser om kjettingen har vært overbelastet.',
      'Surringene er aldri sterkere enn <b>surringsfestet</b> de sitter i. Stropper strekker seg og lasten «setter seg» – derfor skal du alltid <b>etterstramme</b> etter en tids kjøring.'
    ],
    ndla: [N.tre, N.kolli, N.forsp, N.surreband, N.kjetting, N.lastbarer, N.brosjyre],
    arbeidsbok: '5.4, 5.6, 5.7, 5.11 (surringer, lastrad, lastseksjon), 5.14, 5.15, 5.20, 5.21',
    aktiviteter: [
      { type:'voks', id:'t4-voks', tittel:'Si fra om utstyret', tekst:['Du finner en stropp med et lite kutt. Det er travelt, og den ser ut til å holde. Kanskje legger du den tilbake i kassa – og så tar en kollega den i morgen.','Å kassere eller merke dårlig utstyr er en liten handling. Men den beskytter neste person som bruker det, kanskje i en situasjon der stroppen må holde igjen flere tonn.','Å si fra er ikke å sladre. Det er å ta vare på hverandre.'], sporsmal:['Har du sett utstyr – på skolen, i praksis eller hjemme – som burde vært byttet ut?','Hva gjør det lettere eller vanskeligere å si fra?'], handling:'Neste gang du ser utstyr som ikke er i orden: Merk det eller si fra med én gang.' },
      { type:'flash', id:'t4-flash', tittel:'Begrepskort: surring og utstyr', kort:[
        ['Overfallssurring','Stroppen går over lasten og presser den ned. Øker friksjonen.'],
        ['Loopsurring','Stroppen går rundt lasten og festes på samme side. Brukes i par. Sikrer sidevegs.'],
        ['Grimesurring','Stroppen går rundt toppkanten foran (eller bak) og ned til feste på hver side. Sikrer framover eller bakover. Maks 45°.'],
        ['Direktesurring','Fra feste på godset direkte til feste på bilen. Vinkel 30–60°.'],
        ['Surringsvinkel','Vinkelen mellom planet og stroppen.'],
        ['LC (lashing capacity)','Hvor stor kraft båndet er beregnet for i rett strekk. Oppgis i daN.'],
        ['SHF (standard hand force)','Den vanlige håndkraften på strammeren, ca. 50 daN.'],
        ['STF (standard tension force)','Strammekraften du oppnår i båndet med normal håndkraft.'],
        ['Etterstramming','Stramme surringene igjen etter en tids kjøring fordi lasten har satt seg.'],
        ['Kantbeskytter','Beskytter stroppen mot skarpe kanter – og godset mot stroppen.'],
        ['Kortlenket kjetting','Kjetting der løkka innvendig er høyst tre ganger så lang som materialtykkelsen.'],
        ['Grade 80','Minste kvalitetsklasse for surringskjetting. Grade 100 er sterkere.'],
        ['Tolk','Måleverktøy som viser om kjettingløkkene er strukket (overbelastet).'],
        ['Surringsfeste','Festepunktet i lastbæreren. Surringen er aldri sterkere enn festet.']
      ]},
      { type:'hotspot', id:'t4-hs1', nivaa:1, tittel:'Kjenn igjen surringsteknikken', instr:'Tegningene viser fire surringsteknikker. Stroppen er oransje. Trykk på riktig tegning.', svg:SVG_TEKNIKK, sp:[
        { q:'Hvilken tegning viser overfallssurring?', z:'overfall', f:'A: Stroppen går over lasten fra side til side og presser den ned.' },
        { q:'Hvilken tegning viser loopsurring?', z:'loop', f:'B: Stroppen går rundt lasten og begge endene er festet på samme side.' },
        { q:'Hvilken tegning viser grimesurring?', z:'grime', f:'C: Stroppen ligger rundt toppkanten foran og går skrått ned til et feste langs siden. Vinkelen er under 45°.' },
        { q:'Hvilken tegning viser direktesurring?', z:'direkte', f:'D: Stroppene går direkte fra festene på godset til festene på bilen.' },
        { q:'Hvilken teknikk virker ved å øke friksjonen?', z:'overfall', f:'Overfallssurringen presser lasten ned – da øker friksjonen.' },
        { q:'Hvilken teknikk krever et feste på selve godset?', z:'direkte', f:'Direktesurring festes i løfteøyer eller surringspunkter på godset.' }
      ]},
      { type:'quiz', id:'t4-q1', nivaa:1, tittel:'Surringsteknikker og utstyr', sp:[
        { q:'Hvilken surringsteknikk brukes i par og sikrer lasten sidevegs?', a:['Loopsurring','Grimesurring','Overfallssurring','Låsing'], r:0, f:'Ett loopsurringspar per lastseksjon.' },
        { q:'Hvilken vinkel skal en grimesurring maksimalt ha mot planet?', a:['30°','45°','75°','90°'], r:1, f:'Maks 45° – ellers holder den for lite i lengderetningen.' },
        { q:'Hva betyr «LC» på merkelappen til et surrebånd?', a:['Lengden på båndet','Lashing capacity – hva båndet tåler i rett strekk','Lastens vekt','Leverandørens kode'], r:1, f:'LC oppgis i daN.' },
        { q:'Når skal et surrebånd kasseres?', a:['Når det er nytt','Når merkelappen mangler eller båndet har kutt eller knuter','Når det er vått','Når det er oransje'], r:1, f:'Også når strammeren er rustet og treg.' },
        { q:'Hvorfor skal du etterstramme etter en tids kjøring?', a:['Fordi lasten setter seg og stroppene strekker seg','Fordi kontrolløren krever det','For å teste strammeren','Det trengs ikke'], r:0, f:'Slakke stropper kan gi rykk som overbelaster utstyret.' },
        { q:'Hva slags kjetting skal brukes på stein, stål og betong?', a:['Langlenket kjetting','Kortlenket kjetting, merket, minst Grade 80','Hvilken som helst','Tau'], r:1, f:'Langlenket kjetting er forbudt på stein, stål og betong.' }
      ]},
      { type:'tf', id:'t4-tf', nivaa:1, tittel:'Sant eller usant: surring', ps:[
        ['Et surrebånd kan også brukes til løft hvis du er forsiktig.', false, 'Båndet er merket «Not for lifting» – det er ikke laget for løft.'],
        ['Ved 90° surringsvinkel virker hele strammekraften nedover.', true, 'Jo lavere vinkel, desto mindre kraft nedover.'],
        ['Overfallssurringer bør ligge over tyngdepunktet.', true, 'Da står kolliet stabilt.'],
        ['Under 30° vinkel er overfallssurring en god metode.', false, 'Under 30° må du velge en annen metode.'],
        ['En grime festet på halv høyde holder like mye som en festet på toppen.', false, 'Den holder bare halvparten av tabellverdien.'],
        ['Surringen er aldri sterkere enn festet den sitter i.', true, 'Ingen kjede er sterkere enn det svakeste leddet.'],
        ['Polyester er det vanligste materialet i surrebånd.', true, 'Polyamid og polypropylen finnes også.'],
        ['Går tolken ikke inn i kjettingløkka på tvers, er kjettingen i orden.', false, 'Da er løkka strukket – kjettingen har vært overbelastet.']
      ]},
      { type:'order', id:'t4-o1', nivaa:1, tittel:'Slik bruker du et surrebånd', instr:'Sett stegene i riktig rekkefølge.', steg:[
        'Kontroller båndet: merkelapp, kutt, knuter og strammer','Fest kroken i et surringsfeste på lastbæreren','Legg kantbeskyttere på skarpe kanter','Legg båndet over lasten','Tre båndet inn i snella på strammeren','Dra den løse enden stramt','Jekk med strammeren til båndet er godt strammet','Fest den løse enden så den ikke slenger','Etterstram etter en tids kjøring'
      ], f:'Se gjerne NDLA-filmene «Hvordan tre en lastestropp» og «Forspenning av lastestropp».' },
      { type:'match', id:'t4-m1', nivaa:2, tittel:'Merking og utstyr', instr:'Koble begrepet med riktig forklaring.', par:[
        ['LC','Hva båndet tåler i rett strekk (daN)'],
        ['SHF','Normal håndkraft på strammeren'],
        ['STF','Strammekraften du oppnår i båndet'],
        ['Grade 80','Minstekrav til kvalitet på surringskjetting'],
        ['Tolk','Viser om kjettingen er overbelastet'],
        ['Kantbeskytter','Hindrer at stroppen kuttes av skarpe kanter']
      ]},
      { type:'sort', id:'t4-s1', nivaa:2, tittel:'Hvilken teknikk passer?', instr:'Hvilken surringsteknikk passer best til situasjonen?', kat:['Overfallssurring','Loopsurring','Grimesurring','Direktesurring'], items:[
        ['Pallen står inntil frontveggen og må presses ned mot planet for å hindre glidning bakover og sidevegs',0,'Overfallssurring øker friksjonen.'],
        ['En høy, smal kasse må sikres mot å velte sidevegs',1,'Et loopsurringspar sikrer sidevegs mot både glidning og velt.'],
        ['Lasten kan ikke stå inntil frontveggen, og den må hindres i å gli framover',2,'Grimen holder lasten tilbake framover.'],
        ['En gravemaskin har egne surringsøyer',3,'Fest direkte i øynene på maskinen.'],
        ['En stor transformator med løfteører skal på trailer',3,'Direktesurring fra ørene til festene på trailer.'],
        ['Lang last må sikres sidevegs og hindres i å vri seg',1,'Lange kolli: minst to loopsurringspar.']
      ]},
      { type:'hotspot', id:'t4-hs2', nivaa:3, tittel:'Surringsvinkelen', instr:'Tegningene viser stropper med ulik surringsvinkel. Trykk på riktig tegning.', svg:SVG_VINKEL, sp:[
        { q:'Hvilken stropp presser med hele strammekraften nedover?', z:'v90', f:'Ved 90° virker all kraft rett ned.' },
        { q:'Hvilken vinkel er for lav til at du kan bruke overfallssurring?', z:'v20', f:'Under 30° må du velge en annen metode.' },
        { q:'Ved hvilken vinkel virker omtrent like mye av kraften nedover som sidevegs?', z:'v45', f:'Ved 45° virker rundt 70 % nedover og 70 % sidevegs.' },
        { q:'Ved hvilken vinkel virker omtrent 90 % nedover og halvparten sidevegs?', z:'v60', f:'Ved 60° presser stroppen fortsatt godt ned.' }
      ]},
      { type:'calc', id:'t4-c1', nivaa:2, gen:'overfallTabell', tittel:'Slå opp i øvingstabellen', antall:5, tabell:OVERFALL, vis:VIS_OVERFALL },
      { type:'calc', id:'t4-c2', nivaa:3, gen:'overfallTabell', tittel:'Fra materiale til antall surringer', antall:5, tabell:OVERFALL, friksjon:FRIKSJON, medMateriale:true, vis:VIS_FRIKSJON + VIS_OVERFALL },
      { type:'check', id:'t4-chk1', nivaa:2, tittel:'Kontroll av surringsutstyr', instr:'Du går gjennom kassa med surringsutstyr før en tur. Kryss av utstyret som ikke kan brukes.', dok:'Utstyrskontroll – bil 14', meta:'Kontrollert av: lærling · Før avreise', kolonner:['Utstyr','Det du ser'], kryss:'Kan ikke brukes', rader:[
        { c:['Surrebånd 1','Hel merkelapp: LC 2 500 daN, STF 400 daN, «Not for lifting». Ingen skader.'], avvik:false, f:'Merket og uten skader.' },
        { c:['Surrebånd 2','Merkelappen er revet av.'], avvik:true, f:'Uten merking vet du ikke hva båndet tåler. Kasser det.' },
        { c:['Surrebånd 3','Et kutt på 1 cm i kanten av båndet.'], avvik:true, f:'Kutt svekker båndet. Kasser det.' },
        { c:['Surrebånd 4','Det er knyttet en knute for å gjøre båndet kortere.'], avvik:true, f:'Knuter svekker båndet kraftig.' },
        { c:['Surrebånd 5','Skittent etter forrige tur, men helt og merket.'], avvik:false, f:'Vask det gjerne i varmt såpevann, men det kan brukes.' },
        { c:['Strammer på bånd 6','Rustet og går tungt.'], avvik:true, f:'En treg strammer gir dårlig forspenning – bytt ut.' },
        { c:['Kjetting 1','Kortlenket, merket Grade 80, tolken går inn på tvers.'], avvik:false, f:'Tolken går inn – løkkene er ikke strukket.' },
        { c:['Kjetting 2','Langlenket, umerket. Skal brukes på betongelementer.'], avvik:true, f:'Langlenket kjetting er forbudt på stein, stål og betong – og den er umerket.' },
        { c:['Kantbeskyttere','Fire stykker i plast, hele.'], avvik:false, f:'I orden.' }
      ], etter:'Utstyr som ikke kan brukes, skal merkes og tas ut av bruk med én gang – så ingen andre tar det.' },
      { type:'case', id:'t4-case', nivaa:3, tittel:'Case: Velg surringsmetode', vis:VIS_FRIKSJON + VIS_OVERFALL, intro:'Du skal sikre en kasse med maskindeler på en lastebil (N3). Kassa veier 2 500 kg, er 1,8 m høy, 1,2 m lang og 1,0 m bred. Den står på lemmer av sagd tre på et lasteplan av riflet aluminium. Kassa kan ikke stå inntil frontveggen fordi det står annet gods der.', steg:[
        { q:'Hvor mye må sikringen minst holde igjen framover?', valg:[
          { t:'0,8 × 2 500 kg = 2 000 kg', ok:true, f:'Tunge kjøretøy: 0,8 framover.' },
          { t:'0,5 × 2 500 kg = 1 250 kg', ok:false, f:'0,5 gjelder bakover og sidevegs.' },
          { t:'2 500 kg', ok:false, f:'1,0 gjelder lettere kjøretøy som varebil.' }
        ]},
        { q:'Bruk tabellene over: Sagd tre mot riflet aluminium gir µ = 0,40. Hvor mange overfallssurringer trenger du framover?', valg:[
          { t:'4 – fordi 3 × 640 = 1 920 kg er litt for lite, mens 4 × 640 = 2 560 kg holder', ok:true, f:'Rund alltid opp – også når det bare mangler 80 kg.' },
          { t:'3 – det er nesten nok', ok:false, f:'«Nesten nok» holder ikke. 3 × 640 = 1 920 kg < 2 000 kg.' },
          { t:'2 – friksjonen tar resten', ok:false, f:'Tabellverdien har allerede regnet med friksjonen.' }
        ]},
        { q:'Hvilken løsning gir færre stropper framover?', valg:[
          { t:'En grimesurring rundt fronten av kassa', ok:true, f:'Grimen holder lasten tilbake framover og er langt mer effektiv enn overfallssurring i den retningen.' },
          { t:'Flere overfallssurringer på skrå', ok:false, f:'Lavere vinkel gjør overfallssurringen svakere.' },
          { t:'Presenning over kassa', ok:false, f:'Presenning sikrer ikke.' }
        ]},
        { q:'Grimen kan bare festes på halv høyde. Hva betyr det?', valg:[
          { t:'Den holder bare halvparten av tabellverdien', ok:true, f:'Regn med halve verdien – og sjekk om det fortsatt holder.' },
          { t:'Den holder dobbelt så mye', ok:false, f:'Det er motsatt.' },
          { t:'Det spiller ingen rolle', ok:false, f:'Høyden på grimen har mye å si.' }
        ]},
        { q:'Kassa er høy og smal (1,8 m høy, 1,0 m bred). Hva må du også sjekke?', valg:[
          { t:'At den er sikret mot å velte – både sidevegs og framover', ok:true, f:'Sikringen skal hindre både glidning og velt.' },
          { t:'Ingenting mer – den glir ikke', ok:false, f:'Høyt tyngdepunkt gir veltefare.' },
          { t:'At den er merket med farlig gods', ok:false, f:'Bare hvis innholdet er farlig gods.' }
        ]}
      ]},
      { type:'reflect', id:'t4-r1', nivaa:3, tittel:'Forklar: Fire surringsteknikker', q:'Forklar de fire surringsteknikkene for en medelev som har vært borte. Si hvordan stroppen legges, hva teknikken sikrer mot, og én ting man må passe på for hver av dem.', punkter:[
        'Overfallssurring: over lasten, presser ned og øker friksjonen – over tyngdepunktet, godt strammet',
        'Loopsurring: rundt lasten med begge ender på samme side – i par, sikrer sidevegs',
        'Grimesurring: rundt toppkanten foran eller bak – sikrer framover/bakover, maks 45°',
        'Direktesurring: fra feste på godset til feste på bilen – vinkel 30–60°',
        'Surringsvinkelen påvirker hvor mye stroppen holder',
        'Kontroller utstyret og etterstram underveis'
      ]}
    ]
  },
  /* ================================================================ T5 */
  {
    id: 't5', lok: 'C-01', tittel: 'Ulike lasttyper og kombinert transport',
    kort: 'Velt i sving, ruller, rør, tromler, materialpakker, kjøretøy, tømmer, betongelementer, løsmasser og stykkgods – og lastsikring på ferje og tog.',
    bok: 'Læreboka 5.8–5.10 (s. 149–158)',
    mal: ['forklare hvorfor farten i sving har så mye å si for veltefaren','velge riktig sikring for runde kolli, kjøretøy, tømmer, betong og løsmasser','forklare hvorfor presenning og nett ikke er lastsikringsutstyr','forklare hva som gjelder når lasten skal på ferje eller tog'],
    punkter: [
      'I sving øker treghetskraften med farten i andre: <b>dobbel fart gir fire ganger så stor kraft</b> utover, tredobbel fart gir ni ganger så stor. Høyt tyngdepunkt gjør veltefaren ekstra stor.',
      '<b>Ruller</b> (f.eks. papirruller) sikres med <b>klosser</b> og surring. Med én eller to ruller skal klossene være minst <b>1/3 av radien</b> høye. <b>Kabeltromler</b> som kan rulle i kjøreretningen, får klosser foran og bak på minst <b>1/5 av radien</b> – og surres fast.',
      '<b>Kjøretøy</b> på lasteplanet får klosser foran og bak på alle hjul, minst <b>1/3 av hjulradien</b>. Surringene festes i hjul eller aksler – ikke i fjærende deler – og skal til sammen tåle kjøretøyets vekt.',
      '<b>Materialpakker</b> sikres helst med sidestaker, blokkeres mot frontveggen og surres. <b>Tømmer</b> skal ha støtte av minst to sidestaker, ingen stokker over frontveggen, og surres med automatiske strammere festet i rammen.',
      '<b>Betongelementer</b> skal ligge direkte mot blokkeringen. Mellomlegg bør være minst 5 cm høye. Surr med <b>kjetting</b> og blokker – på et underlag uten snø og is.',
      '<b>Løsmasser</b> blokkeres av påbygget. Bakkanten bør ikke ha brattere vinkel enn 45°, og massene skal ikke gå over karmene. Støvende masser fuktes eller dekkes. <b>Presenning, nett og kapell er ikke lastsikringsutstyr</b> – de beskytter mot vær, støv og løse biter.',
      '<b>Stykkgods</b> i konteiner blokkeres ved å starte mot frontveggen i hele bredden og høyden. Tunge kolli plasseres lavt og fremme – innenfor aksellastene.',
      '<b>Kombinert transport:</b> På ferje og skip må lasten også sikres mot krefter <b>oppover og sidevegs</b> fordi skipet ruller og stamper. Havet deles i sjøområder (A, B og C) etter bølgehøyde – Skagerrak og Nordsjøen er strengere enn Kattegat. Skal konteineren videre på tog, sikrer du for toget også.'
    ],
    ndla: [N.togbat, N.viktig, N.kjetting, N.test],
    arbeidsbok: '5.13',
    ekstra: MERKNAD_UTDATERT,
    aktiviteter: [
      { type:'voks', id:'t5-voks', tittel:'Ansvaret følger lasten', tekst:['En last passerer mange hender: Den som pakker, den som laster, sjåføren, ferjemannskapet, den som losser. Det er fristende å tenke at «noen andre» sjekker.','Men når noe går galt, spør alle: Hvem så det – og hvorfor sa ingen noe?','Å ta ansvar betyr å gjøre sin egen del ordentlig og si fra når man ser noe som ikke er i orden – selv om det ikke er «din» last.'], sporsmal:['Har du opplevd at alle trodde noen andre hadde ansvaret?','Hvordan kan du si fra på en måte som blir tatt godt imot?'], handling:'Øv på en setning du kan bruke når du må si fra om noe på jobb – for eksempel: «Jeg ser at … Kan vi sjekke det sammen?»' },
      { type:'flash', id:'t5-flash', tittel:'Begrepskort: lasttyper', kort:[
        ['Velt i sving','Dobbel fart gir fire ganger så stor kraft utover. Høyt tyngdepunkt øker faren.'],
        ['Kloss','Blokk av tre eller annet materiale som hindrer runde kolli og hjul i å rulle.'],
        ['Kabeltrommel','Stor trommel med kabel. Klosser minst 1/5 av radien når den kan rulle i kjøreretningen.'],
        ['Rullende last','Ruller, rør og tromler. Trenger klosser og surring.'],
        ['Sidestaker','Stolper langs siden av planet. Brukes for tømmer, rør og materialpakker.'],
        ['Tømmer','Minst to sidestaker per stokk, ingen stokker over frontveggen, surring festet i rammen.'],
        ['Betongelementer','Blokkeres og surres med kjetting. Mellomlegg minst 5 cm.'],
        ['Løsmasser','Sand, grus, jord. Påbygget blokkerer. Maks 45° i bakkant.'],
        ['Presenning og nett','Beskytter mot vær og støv – er ikke lastsikringsutstyr.'],
        ['Stykkgods','Enkeltkolli av ulik størrelse. Blokkeres mot veggene i konteineren.'],
        ['Kombinert transport','Transport med flere transportformer. Lasten sikres for alle.'],
        ['Sjøområde A, B og C','Inndeling av havet etter bølgehøyde. C har de høyeste bølgene.'],
        ['Rulle og stampe','Et skip ruller sidevegs og stamper (vipper) framover og bakover i bølgene.']
      ]},
      { type:'quiz', id:'t5-q1', nivaa:1, tittel:'Lasttyper', sp:[
        { q:'Er presenning lastsikringsutstyr?', a:['Ja','Nei – den beskytter bare mot vær og vind','Bare om vinteren','Bare på åpne biler'], r:1, f:'Presenning, nett og kapell sikrer ikke lasten.' },
        { q:'Hva bruker du for å hindre at en papirrull ruller?', a:['Klosser og surring','Bare presenning','Ingenting – den er tung','Strekkfilm'], r:0, f:'Klosser hindrer rulling, surring holder rullen nede.' },
        { q:'Hvor fester du surringene når du frakter en bil på et lasteplan?', a:['I hjulene eller akslene','I speilene','I fjærene','I panseret'], r:0, f:'Ikke i deler som fjærer, for da blir surringene slakke.' },
        { q:'Hvilken last surres vanligvis med kjetting?', a:['Betongelementer','Bleier','Tomme paller','Pappesker'], r:0, f:'Stein, stål og betong surres helst med kjetting.' },
        { q:'Hva skjer med kraften utover i en sving hvis du dobler farten?', a:['Den dobles','Den blir fire ganger så stor','Den halveres','Den er lik'], r:1, f:'Kraften øker med farten i andre.' }
      ]},
      { type:'tf', id:'t5-tf', nivaa:1, tittel:'Sant eller usant: lasttyper', ps:[
        ['Ingen tømmerstokker skal stikke over frontveggen.', true, 'Stokker over frontveggen kan gå inn i førerhuset ved bråbremsing.'],
        ['Tunge kolli plasseres helst lavt og fremme.', true, 'Men innenfor aksellastene.'],
        ['Nett er godkjent lastsikringsutstyr for tunge kolli.', false, 'Nett holder på lette ting som bark og flis, men er ikke lastsikringsutstyr.'],
        ['Støvende løsmasser kan fuktes for å hindre støv.', true, 'Eller dekkes med presenning.'],
        ['På ferje i Nordsjøen må lasten også sikres mot krefter oppover.', true, 'Skipet ruller og stamper i bølgene.'],
        ['Det er lov å feste surringene i fjærene på en bil som fraktes.', false, 'Fest i hjul eller aksler.'],
        ['Betongelementer kan fraktes på et lasteplan med is, bare de er surret.', false, 'Underlaget skal være fritt for snø og is.']
      ]},
      { type:'match', id:'t5-m1', nivaa:2, tittel:'Lasttype og sikring', instr:'Koble lasttypen med riktig sikring.', par:[
        ['Papirruller i én høyde','Klosser minst 1/3 av radien + surring'],
        ['Kabeltrommel som kan rulle i kjøreretningen','Klosser minst 1/5 av radien + surring'],
        ['Personbil på lasteplanet','Klosser ved alle hjul + surring i hjul eller aksler'],
        ['Tømmer','Minst to sidestaker per stokk + surring i rammen'],
        ['Betongelementer','Blokkering + kjetting, mellomlegg minst 5 cm'],
        ['Løsmasser','Påbygget blokkerer, maks 45° i bakkant']
      ]},
      { type:'sort', id:'t5-s1', nivaa:2, tittel:'Er dette lastsikringsutstyr?', instr:'Kan dette brukes til å sikre lasten – eller beskytter det bare?', kat:['Sikringsutstyr','Ikke sikringsutstyr'], items:[
        ['Surrebånd med merkelapp',0,'Godkjent etter EN 12195-2.'],
        ['Kortlenket kjetting, Grade 80',0,'Godkjent etter EN 12195-3.'],
        ['Presenning',1,'Beskytter mot vær og vind.'],
        ['Klosser og kiler',0,'Blokkerer runde kolli og hjul.'],
        ['Nett over et lass med flis',1,'Hindrer at lette biter blåser av, men sikrer ikke.'],
        ['Kapell på lastebilen',1,'Kapellet beskytter mot vær – det er ikke beregnet på å holde igjen last.'],
        ['Sperrebom',0,'Blokkerer bakover.'],
        ['Friksjonsmatte',0,'Øker friksjonen og reduserer behovet for andre sikringer.']
      ]},
      { type:'calc', id:'t5-c1', nivaa:2, gen:'kloss', tittel:'Hvor høye klosser?', antall:5 },
      { type:'calc', id:'t5-c2', nivaa:3, gen:'fart', tittel:'Fart og veltefare', antall:4 },
      { type:'check', id:'t5-chk1', nivaa:3, tittel:'Sjekk lasten før avreise', instr:'Du er lærling og går en runde rundt lastebilen (N3) sammen med sjåføren før avreise. Kryss av punktene som må rettes før bilen kan kjøre.', dok:'Lastkontroll – oppdrag 5521', meta:'Blandet last · Stavanger → Haugesund', kolonner:['Last','Det du ser'], kryss:'Må rettes', rader:[
        { c:['Paller med dagligvarer','Står tett inntil frontveggen i hele bredden.'], avvik:false, f:'Blokkert framover.' },
        { c:['Pall nr. 9','Det er 30 cm luft mellom pallen og sidekarmen.'], avvik:true, f:'Mer enn 15 cm – fyll med mellomlegg eller surr.' },
        { c:['Kabeltrommel','Står på planet uten klosser, med én stropp over.'], avvik:true, f:'Trommelen kan rulle. Den trenger klosser foran og bak og må surres fast.' },
        { c:['Papirrull','Klosser på 1/3 av radien foran og bak, og surret.'], avvik:false, f:'Riktig sikret.' },
        { c:['Løse kartonger bakerst','Bare dekket med presenning.'], avvik:true, f:'Presenning er ikke sikringsutstyr. Blokker eller surr kartongene.' },
        { c:['Tunge maskindeler','Plassert øverst på pallene.'], avvik:true, f:'Tunge kolli skal stå lavt – høyt tyngdepunkt gir veltefare.' },
        { c:['Stroppeender','Rullet opp og festet.'], avvik:false, f:'Løse ender kan slå og skade andre.' },
        { c:['Baklys og skilt','Synlige og ikke tildekket.'], avvik:false, f:'I orden etter § 3-2.' }
      ], etter:'Husk å etterstramme surringene etter en tids kjøring – og etter hver levering der lasten endres.' },
      { type:'case', id:'t5-case', nivaa:3, tittel:'Case: Til Danmark med ferje', intro:'Du skal kjøre en semitrailer med maskindeler fra Stavanger til Hirtshals i Danmark. Turen går med ferje over Skagerrak. Lasten er sikret etter vegreglene.', steg:[
        { q:'Hvilke regler må du sikre etter?', valg:[
          { t:'Reglene for både veg og sjø', ok:true, f:'Ved kombinert transport sikrer du for alle transportformene.' },
          { t:'Bare vegreglene – traileren står jo stille på ferja', ok:false, f:'Ferja ruller og stamper. Det gir krefter lasten ikke møter på vegen.' },
          { t:'Bare dansk lov', ok:false, f:'Du må følge reglene for strekningene du kjører og seiler.' }
        ]},
        { q:'Hvorfor må lasten sikres annerledes på sjøen?', valg:[
          { t:'Skipet ruller og stamper, så lasten utsettes også for krefter oppover og større krefter sidevegs', ok:true, f:'Derfor trengs ofte flere surringer, særlig sidevegs og vertikalt.' },
          { t:'Fordi saltvann gjør stroppene svakere', ok:false, f:'Det er bevegelsene i sjøen som er grunnen.' },
          { t:'Det trengs ikke', ok:false, f:'Jo høyere bølger, desto strengere krav.' }
        ]},
        { q:'Hvilket sjøområde er Skagerrak i?', valg:[
          { t:'Område B – samme som Nordsjøen', ok:true, f:'Kattegat er område A. Skagerrak og Nordsjøen har høyere bølger og er område B.' },
          { t:'Område A – samme som Kattegat', ok:false, f:'Kattegat har lavere bølger enn Skagerrak.' },
          { t:'Ingen område – det er en fjord', ok:false, f:'Skagerrak er åpent hav.' }
        ]},
        { q:'Hvor kan du finne hvor mye ekstra sikring som trengs?', valg:[
          { t:'I veiledere for sikring ved kombinert transport, f.eks. en Quick Lashing Guide eller en lastsikringsapp', ok:true, f:'Spør også rederiet – de har egne krav.' },
          { t:'Gjette ut fra erfaring', ok:false, f:'Bruk tabeller og veiledere.' },
          { t:'Spørre en tilfeldig passasjer', ok:false, f:'Rederiet og veilederne er riktig kilde.' }
        ]}
      ]},
      { type:'reflect', id:'t5-r1', nivaa:3, tittel:'Utforsk: Lastsikring på din praksisplass', q:'Tenk på en bedrift du har vært på (praksis, YFF eller deltidsjobb). Beskriv to typer last som blir fraktet der, og forklar hvordan hver av dem bør sikres. Bruk fagbegrepene fra kapitlet.', punkter:[
        'Jeg har beskrevet to konkrete lasttyper',
        'Jeg har valgt sikringsmetode (låsing, blokkering, surring eller kombinasjon) for hver',
        'Jeg har nevnt riktig utstyr (stropper, kjetting, klosser, mellomlegg osv.)',
        'Jeg har tenkt på friksjon og tyngdepunkt',
        'Jeg har nevnt kravene 0,8 og 0,5',
        'Jeg har nevnt kontroll før avreise og etterstramming'
      ]}
    ]
  },
  /* ================================================================ T6 */
  {
    id: 't6', lok: 'C-02', tittel: 'Lastsikringsheftet og dokumenter',
    kort: 'Dokumentene du trenger: hjelpedokument for sikringsplan, NLF-heftet «Lastsikring ved vegtransport» og NLF-standarden for betongelementer – med oppgaver der du slår opp og regner som en sjåfør.',
    bok: 'Læreboka 5.3 og 5.7 (s. 122–148)',
    mal: ['finne fram i lastsikringsheftet og vite hvilke forutsetninger tabellene bygger på','slå opp friksjon og hvor mye én surring holder','regne ut hvor mange surringer som trengs mot glidning og tipping','lage en enkel sikringsplan for et kolli'],
    punkter: [
      '<b>Lastsikringsheftet</b> («Lastsikring ved vegtransport», NLF-standard 2021) er en miniguide etter EN 12195-1. Tabellene viser hvor mange tonn én sikring holder igjen mot å <b>gli</b> og mot å <b>tippe</b>.',
      'Tabellene forutsetter <b>surrefester på 2 000 daN</b>, <b>stropper med LC 1 600 daN</b>, håndkraft S<sub>HF</sub> 50 daN og forspenning <b>S<sub>TF</sub> 400 daN</b>. Har utstyret andre verdier, bruker du en <b>omregningsfaktor</b> (f.eks. aktuell S<sub>TF</sub> ÷ 400).',
      'Kjenner du ikke friksjonen, skal du bruke <b>µ = 0,20</b>. Flatene skal være rene og fri for frost, is og snø.',
      'For tipping regner du ut <b>H/B</b> (høyde delt på bredde) og <b>H/L</b> (høyde delt på lengde) og <b>runder opp</b> til nærmeste tabellverdi. Har kolliet skjevt tyngdepunkt, måler du fra tyngdepunktet.',
      'Regn ut antall surringer for hver retning – framover, bakover og sidevegs, både gli og tippe. <b>Det høyeste antallet gjelder.</b>',
      'Blokkering er det beste alternativet når det er mulig. Heftet har også en tabell for <b>blokkeringskapasitet (BC)</b> – hvor mye frontvegg, bakkarm eller støtter kan holde igjen.',
      'NB: På merkelappen står ofte <b>bruddstyrken</b> (f.eks. 4 000 kg). Den må ikke forveksles med <b>LC</b>, som er det du regner med.',
      'Fra 1. juni 2026 krever <b>§ 3-2a</b> skriftlig sikringsdokumentasjon for gods med høy transportrisiko. Et heftet, en standard eller en sikringsplan som viser metode og utstyr, er eksempler på slik dokumentasjon.',
      '<b>Betongelementer</b> har en egen NLF-standard: bare <b>kjetting</b> (minst 8 mm kortlenket Grade 80), kantbeskyttelse av metall, dokumenterte surrefester – og <b>kassetthenger</b> som førstevalg for veggelementer.'
    ],
    ekstra: MERKNAD_UTDATERT + `<h3 style="font-size:22px;margin-top:14px">Dokumenter</h3>
      <ul class="reslist">
        <li><span class="tag">PDF</span><span><a href="dokumenter/Sikring_av_last_hjelpedokument.pdf" target="_blank" rel="noopener">Sikring av last – hjelpedokument (sikringsplan)</a><br><span class="small muted">Skriv ut og fyll inn for kolliet du skal sikre. Laget av Jarle Bruntveit.</span></span></li>
        <li><span class="tag ndla">NDLA</span><span><a href="${NDLA_R + N.brosjyre[1]}" target="_blank" rel="noopener">Lastsikring ved vegtransport – lastsikringsheftet (NLF)</a><br><span class="small muted">Åpne PDF-en fra NDLA-siden. Klassen har også papireksemplarer – spør læreren.</span></span></li>
        <li><span class="tag">Bok</span><span>Lastsikring av betongelementer under transport (NLF-standard)<br><span class="small muted">Standarden selges av Norges Lastebileier-Forbund og legges ikke ut her. Bruk skolens eksemplar.</span></span></li>
        <li><span class="tag">Lov</span><span>Forskrift om bruk av kjøretøy (Lovdata): <a href="https://lovdata.no/forskrift/1990-01-25-92/%C2%A73-2" target="_blank" rel="noopener">§ 3-2 Plassering og sikring av gods</a> · <a href="https://lovdata.no/forskrift/1990-01-25-92/%C2%A73-2a" target="_blank" rel="noopener">§ 3-2a Dokumentasjonsplikt (fra 2026)</a> · <a href="https://lovdata.no/forskrift/1990-01-25-92/%C2%A73-3" target="_blank" rel="noopener">§ 3-3 Nærmere om sikring av gods</a> · <a href="https://lovdata.no/forskrift/1990-01-25-92/%C2%A73-4" target="_blank" rel="noopener">§ 3-4 Utstikkende gods</a></span></li>
        <li><span class="tag">App</span><span>Lastsikringsapper, for eksempel TYA Lastsikring og ReadyLash (MariTerm), regner ut sikringen for deg.</span></li>
      </ul>`,
    ndla: [N.brosjyre, N.bil, N.begreper],
    arbeidsbok: '5.14, 5.15, 5.21',
    aktiviteter: [
      { type:'voks', id:'t6-voks', tittel:'Slå det opp', tekst:['Erfarne sjåfører har ofte god magefølelse for hvor mange stropper som trengs. Men magefølelsen tar feil oftere enn vi tror – særlig med høye kolli og glatte underlag.','Å slå opp i heftet eller bruke en app er ikke et tegn på at du er usikker. Det er et tegn på at du er profesjonell.','De beste fagarbeiderne er ikke de som aldri sjekker. Det er de som vet når de må sjekke.'], sporsmal:['Når stoler du på magefølelsen – og når burde du heller sjekket?','Hva kan du gjøre for å bli raskere til å finne fram i heftet?'], handling:'Neste gang du er usikker på jobb eller skole: Slå det opp eller spør, i stedet for å gjette.' },
      { type:'flash', id:'t6-flash', tittel:'Begrepskort: lastsikringsheftet', kort:[
        ['LC (lashing capacity)','Sikringskapasiteten til stroppen. Heftet regner med LC 1 600 daN.'],
        ['Bruddstyrke','Kraften der stroppen ryker. Ofte oppgitt i Norge – må ikke forveksles med LC.'],
        ['S<sub>TF</sub> 400 daN'.replace(/<[^>]+>/g,''),'Forspenningen heftet regner med i hver stropp.'],
        ['Surrefeste 2 000 daN','Kapasiteten heftet regner med i hvert surrefeste. Den må ikke overskrides.'],
        ['Omregningsfaktor','Brukes når utstyret har andre verdier enn heftet, f.eks. aktuell S_TF ÷ 400.'],
        ['µ = 0,20','Friksjonen du skal bruke når du ikke vet hva friksjonen er.'],
        ['H/B','Høyde delt på bredde. Brukes for å finne om kolliet kan tippe sidevegs.'],
        ['H/L','Høyde delt på lengde. Brukes for tipping framover og bakover.'],
        ['Lastrad','Kolli som står ved siden av hverandre på tvers av planet.'],
        ['Lasteseksjon','En «skive» av lasten på tvers – kan ha flere rader og lag.'],
        ['Blokkeringskapasitet (BC)','Hvor stor kraft frontvegg, bakkarm eller støtter tåler. Tabellen gjelder BC 1 000 daN.'],
        ['Kantprofil','Planke eller profil langs kanten som fordeler kraften fra stroppene over flere seksjoner.'],
        ['Det høyeste antallet gjelder','Regn ut for alle retninger, både gli og tippe – og bruk det største tallet.']
      ]},
      { type:'quiz', id:'t6-q1', nivaa:1, tittel:'Hva bygger tabellene på?', sp:[
        { q:'Hvilken forspenning (S_TF) regner lastsikringsheftet med i stroppene?', a:['50 daN','400 daN','1 600 daN','4 000 daN'], r:1, f:'50 daN er håndkraften, 1 600 daN er LC.' },
        { q:'Hvor mye regner heftet med at et surrefeste tåler?', a:['500 daN','2 000 daN','5 000 daN','10 000 daN'], r:1, f:'Kapasiteten til surrefestene må ikke overskrides.' },
        { q:'Du vet ikke hva friksjonen mellom godset og planet er. Hvilken verdi bruker du?', a:['0,20','0,40','0,60','0,80'], r:0, f:'Ukjent friksjon: bruk µ = 0,20.' },
        { q:'Merkelappen sier «4 000 kg». Hva er det mest sannsynlig?', a:['LC','Bruddstyrken','S_TF','Vekta på stroppen'], r:1, f:'I Norge står ofte bruddstyrken på lappen. LC er det du regner med.' },
        { q:'Du har regnet ut antall surringer for alle retninger. Hvilket tall bruker du?', a:['Det laveste','Gjennomsnittet','Det høyeste','Bare tallet for framover'], r:2, f:'Det høyeste antallet gjelder.' },
        { q:'Overfallssurringen har en vinkel på 50°. Hva sier heftet?', a:['Bruk tabellen som den er','Doble antall surringer eller halver verdiene','Velg en annen metode','Tredoble antallet'], r:1, f:'75–90°: tabellen gjelder. 30–75°: doble antallet. Under 30°: annen metode.' }
      ]},
      { type:'tf', id:'t6-tf', nivaa:1, tittel:'Sant eller usant: heftet og betongstandarden', ps:[
        ['H/B og H/L skal rundes opp til nærmeste tabellverdi.', true, 'Da regner du på den sikre siden.'],
        ['Blokkering er ifølge heftet det beste alternativet når det er mulig.', true, 'Surring kommer i tillegg der blokkering ikke holder.'],
        ['Betongelementer kan surres med fiberstropper hvis de er nye.', false, 'Betongstandarden sier kjetting – aldri fiberstropper.'],
        ['Pinnekrakken holder veggelementene fast under transport.', false, 'Pinnekrakken er bare til hjelp ved lasting og lossing. Den er ikke sikring.'],
        ['Mangler dokumentasjon på surrefestene, regner du med 2 tonn.', true, 'Det står i betongstandarden.'],
        ['En kjetting uten merkebrikke regnes som 8 mm Grade 80 med LC 4 tonn.', true, 'Det er det sikre valget når merkingen mangler.'],
        ['Ved kjetting over betongkanter bør du bruke kantbeskyttelse av metall.', true, 'Både kjettingen og elementet beskyttes.']
      ]},
      { type:'quiz', id:'t6-q2', nivaa:2, tittel:'Slå opp i lastsikringsheftet', sp:[
        { q:'Bruk friksjonstabellen i heftet: Hva er friksjonen for sagd tre/trepall mot riflet aluminium?', a:['0,15','0,25','0,40','0,60'], r:2, f:'Høvlet tre mot riflet aluminium er bare 0,25 – sjekk hvilket tre det er.' },
        { q:'Bruk friksjonstabellen: Hva er friksjonen for plastpall mot rustfri stålplate?', a:['0,15','0,30','0,45','0,70'], r:0, f:'Plastpaller har lav friksjon. Vurder friksjonsmatte.' },
        { q:'Bruk tabellen for overfallssurring mot å GLI: Hvor mange tonn holder én stropp framover når µ = 0,40?', a:['0,38 t','0,63 t','2,9 t','6,0 t'], r:1, f:'Sidevegs og bakover holder den 2,9 t ved samme friksjon.' },
        { q:'Bruk tabellen for loopsurring mot å GLI: Hvor mange tonn holder ett loopsurringspar sidevegs når µ = 0,30?', a:['1,1 t','3,3 t','7,3 t','11 t'], r:2, f:'Loopsurring er svært effektiv sidevegs.' },
        { q:'Bruk tabellen for grimesurring mot å GLI: Hvor mange tonn holder én grime framover når µ = 0,30?', a:['0,38 t','1,3 t','4,9 t','10 t'], r:2, f:'Sammenlign med overfallssurring: 0,38 t. Grimen er mye mer effektiv framover.' },
        { q:'Bruk tabellen for direktesurring mot å GLI: Hvor mange tonn holder én direktesurring framover når µ = 0,30?', a:['0,51 t','1,3 t','2,6 t','4,9 t'], r:1, f:'Sidevegs og bakover holder den 2,6 t.' }
      ], fase:'ov' },
      { type:'calc', id:'t6-c1', nivaa:2, gen:'overfallTabell', tittel:'Øv med øvingstabellen (samme framgangsmåte som heftet)', antall:5, tabell:OVERFALL, friksjon:FRIKSJON, medMateriale:true, vis:VIS_FRIKSJON + VIS_OVERFALL },
      { type:'case', id:'t6-case1', nivaa:3, tittel:'Case: Pallen med maskindeler', intro:'Du skal sikre en pall med maskindeler på en lastebil (N3) med overfallssurringer. Pallen veier 1 500 kg og er 1,8 m høy, 1,2 m lang og 0,8 m bred. Tyngdepunktet er midt i. Det er en trepall av sagd tre, og lasteplanet er riflet aluminium. Pallen står alene. Ha lastsikringsheftet foran deg.', steg:[
        { q:'Hvilken friksjon bruker du?', valg:[
          { t:'µ = 0,40 (sagd tre mot riflet aluminium)', ok:true, f:'Sjekk alltid om treet er sagd eller høvlet.' },
          { t:'µ = 0,25', ok:false, f:'0,25 gjelder høvlet tre mot riflet aluminium.' },
          { t:'µ = 0,20 – det gjelder alltid', ok:false, f:'0,20 bruker du bare når du ikke vet friksjonen.' }
        ]},
        { q:'Hvor mange tonn må sikres mot å gli framover og sidevegs?', valg:[
          { t:'Framover 1,2 t (0,8 × 1,5) og sidevegs 0,75 t (0,5 × 1,5)', ok:true, f:'Bakover er det også 0,75 t.' },
          { t:'1,5 t i alle retninger', ok:false, f:'Kravet er 0,8 framover og 0,5 sidevegs og bakover på N3.' },
          { t:'0,75 t framover og 1,2 t sidevegs', ok:false, f:'Det er omvendt.' }
        ]},
        { q:'Heftet sier at én overfallssurring holder 0,63 t framover ved µ = 0,40. Hvor mange trenger du mot å gli framover?', valg:[
          { t:'2 – fordi 2 × 0,63 = 1,26 t er mer enn 1,2 t', ok:true, f:'Sidevegs holder én stropp 2,9 t, så der holder det med én.' },
          { t:'1', ok:false, f:'0,63 t er mindre enn 1,2 t.' },
          { t:'4', ok:false, f:'To er nok: 1,26 t > 1,2 t.' }
        ]},
        { q:'Så tipping sidevegs: H/B = 1,8 ÷ 0,8 = 2,25. Hvilken rad i tabellen bruker du?', valg:[
          { t:'2,4 – du runder opp til nærmeste tabellverdi', ok:true, f:'Ved H/B 2,4 og én rad holder én overfallssurring 3,3 t mot tipping. 0,75 t er godt innenfor.' },
          { t:'2,2 – du runder til nærmeste', ok:false, f:'Rund alltid opp – da er du på den sikre siden.' },
          { t:'2,0', ok:false, f:'Det er å runde ned. Rund opp.' }
        ]},
        { q:'Tipping framover: H/L = 1,8 ÷ 1,2 = 1,5 → 1,6 i tabellen. Én surring holder 2,3 t. Hva blir konklusjonen?', valg:[
          { t:'2 overfallssurringer – det høyeste antallet (glidning framover) gjelder', ok:true, f:'Står pallen inntil frontveggen, er den blokkert framover. Da holder det med 1.' },
          { t:'1 overfallssurring – tipping krever bare én', ok:false, f:'Du må ta det høyeste antallet av alle utregningene.' },
          { t:'3 overfallssurringer', ok:false, f:'Ingen av utregningene krever 3.' }
        ]}
      ]},
      { type:'case', id:'t6-case2', nivaa:3, tittel:'Case: Annen stropp – omregningsfaktor', intro:'Du har stropper med LC 2 500 daN. Merkelappen sier S_TF 500 daN. Heftet regner med LC 1 600 daN og S_TF 400 daN.', steg:[
        { q:'Overfallssurring mot å GLI: Hvilken omregningsfaktor gjelder?', valg:[
          { t:'500 ÷ 400 = 1,25', ok:true, f:'Mot glidning er det forspenningen som teller.' },
          { t:'2 500 ÷ 1 600 ≈ 1,56', ok:false, f:'LC brukes for loop-, grime- og direktesurring – ikke for overfallssurring mot å gli.' },
          { t:'1,0 – stroppen er jo sterkere', ok:false, f:'Når utstyret avviker, bruker du omregningsfaktoren.' }
        ]},
        { q:'Overfallssurring mot å TIPPE: Heftet sier du skal bruke den minste av S_TF ÷ 400 og LC ÷ 1 600. Hva blir faktoren?', valg:[
          { t:'1,25 – den minste av 1,25 og 1,56', ok:true, f:'Bruk alltid den minste verdien – da regner du på den sikre siden.' },
          { t:'1,56 – den største', ok:false, f:'Heftet sier den minste.' },
          { t:'2,81 – summen', ok:false, f:'Faktorene skal ikke legges sammen.' }
        ]},
        { q:'Én standard overfallssurring holder 0,63 t framover (µ = 0,40). Omtrent hvor mye holder din stropp?', valg:[
          { t:'Omtrent 0,79 t (0,63 × 1,25)', ok:true, f:'Bedre forspenning gir mer friksjon.' },
          { t:'Omtrent 0,98 t (0,63 × 1,56)', ok:false, f:'Mot glidning er faktoren 1,25.' },
          { t:'0,63 t – det samme', ok:false, f:'Omregningsfaktoren gjør at den holder mer.' }
        ]},
        { q:'Kan du regne med at stroppen holder mer enn surrefestet tåler?', valg:[
          { t:'Nei – kapasiteten til surrefestene må ikke overskrides', ok:true, f:'Ingen kjede er sterkere enn det svakeste leddet.' },
          { t:'Ja, stroppen bestemmer', ok:false, f:'Surrefestet er ofte det svakeste leddet.' },
          { t:'Bare om sommeren', ok:false, f:'Det gjelder alltid.' }
        ]}
      ]},
      { type:'case', id:'t6-case3', nivaa:3, tittel:'Case: Hvor mye holder frontveggen?', intro:'Du skal frakte 12 tonn gods på en lastebil med påbygg i L-klasse (EN 12642 L). Lasten står helt inntil frontveggen. Friksjonen er µ = 0,30. Heftets blokkeringstabell gjelder for 1 000 daN, og frontveggen på et L-kjøretøy har BC 5 000 daN (faktor 5).', steg:[
        { q:'Ved µ = 0,30 viser blokkeringstabellen 2,0 t framover per 1 000 daN. Hvor mye kan frontveggen blokkere?', valg:[
          { t:'2,0 t × 5 = 10 t', ok:true, f:'Omregningsfaktoren er BC ÷ 1 000 = 5.' },
          { t:'2,0 t', ok:false, f:'Husk faktoren for frontveggen.' },
          { t:'12 t – den holder alt', ok:false, f:'Regn det ut før du stoler på det.' }
        ]},
        { q:'Lasten er 12 t. Hva betyr det?', valg:[
          { t:'Frontveggen holder 10 t – du må sikre de resterende 2 t framover på annen måte', ok:true, f:'For eksempel med grimesurring eller flere stropper.' },
          { t:'Det går fint – det er nesten nok', ok:false, f:'«Nesten» er ikke godt nok i lastsikring.' },
          { t:'Du må kjøre uten last', ok:false, f:'Du sikrer resten med surring.' }
        ]},
        { q:'Hva kan du gjøre for at frontveggen skal holde mer?', valg:[
          { t:'Øke friksjonen, for eksempel med friksjonsmatter', ok:true, f:'Høyere friksjon gir høyere tabellverdi.' },
          { t:'Kjøre fortere', ok:false, f:'Det gjør kreftene større.' },
          { t:'Legge presenning over lasten', ok:false, f:'Presenning er ikke sikringsutstyr.' }
        ]}
      ]},
      { type:'quiz', id:'t6-q3', nivaa:2, tittel:'Betongelementer (NLF-standarden)', sp:[
        { q:'Hva skal du bruke for å surre betongelementer?', a:['Fiberstropper','Kjetting','Tau','Strekkfilm'], r:1, f:'Aldri fiberstropper på betongelementer.' },
        { q:'Hva er minstekravet til kjettingen?', a:['6 mm langlenket','8 mm kortlenket Grade 80','Hvilken som helst merket kjetting','10 mm langlenket Grade 50'], r:1, f:'Langlenket kjetting skal ikke brukes til lastsikring.' },
        { q:'Hva er førstevalget for transport av veggelementer?', a:['Vanlig lasteplan','Kassetthenger','Varebil','Container'], r:1, f:'I kassetthengeren holder hydrauliske armer elementene sidevegs og bakover.' },
        { q:'Hva brukes heisklokkene til ved direktesurring?', a:['Som festepunkt for kjettingen på toppen av elementet','Som pynt','Til å måle vekt','De brukes ikke'], r:0, f:'Gjelder elementer der klokkene er godkjent for sikring.' },
        { q:'Hvorfor skal elementene stemples av i bunnen med staker og kiler?', a:['For at de ikke skal skli ut i bunnen','For at de skal se ryddige ut','For å gjøre dem lettere','Det trengs ikke'], r:0, f:'Direktesurringen holder toppen. Bunnen må også låses.' },
        { q:'Hvilket verneutstyr skal du alltid bruke ved lasting og lossing av betongelementer?', a:['Hjelm, vernesko og hansker','Bare refleksvest','Ingenting spesielt','Bare hørselvern'], r:0, f:'Tunge løft med kran krever fullt verneutstyr.' }
      ]},
      { type:'reflect', id:'t6-r1', nivaa:3, tittel:'Lag en sikringsplan', q:'Velg et kolli (fra praksis, fra skolens lager eller et du finner på). Lag en sikringsplan etter hjelpedokumentet: oppgi vekt, mål, friksjon, hvor mange tonn som må sikres framover, sidevegs og bakover – og hvilke metoder og hvor mange surringer du vil bruke. Bruk lastsikringsheftet.', punkter:[
        'Jeg har oppgitt vekt, høyde, lengde og bredde',
        'Jeg har funnet friksjonen i friksjonstabellen (eller brukt 0,20)',
        'Jeg har regnet ut tonn framover (× 0,8), sidevegs og bakover (× 0,5)',
        'Jeg har valgt metode og brukt blokkering der det er mulig',
        'Jeg har regnet ut antall surringer mot å gli og mot å tippe (H/B og H/L)',
        'Jeg har brukt det høyeste antallet',
        'Jeg har sjekket at utstyret er merket og at surrefestene tåler kreftene'
      ]}
    ]
  }
  ,
  {
    id: 't7', lok: 'C-03', tittel: 'Oppgavebank: regn med lastsikringsheftet',
    kort: 'Mange oppgaver der du slår opp i NLF-heftet «Lastsikring ved vegtransport» og regner ut sikringen – fra grunnreglene til hele case med overfalls-, loop-, grime- og direktesurring.',
    bok: 'Læreboka 5.3 og 5.7 (s. 122–148)',
    mal: ['regne ut hvor mange tonn lasten må sikres for framover, sidevegs og bakover','finne friksjonen og riktig tabellverdi i lastsikringsheftet','regne ut antall surringer for hver retning og velge det høyeste','justere for vinkel, omregningsfaktor og last i flere lag','velge og begrunne en sikringsmetode'],
    punkter: [
      'Ha <b>lastsikringsheftet</b> åpent mens du jobber. Tabellene står ikke her – du skal øve på å finne fram i heftet.',
      '<b>Krav:</b> framover 0,8 × vekta, sidevegs og bakover 0,5 × vekta (tunge kjøretøy).',
      '<b>Antall surringer</b> = lastens vekt ÷ det én surring holder ifølge tabellen. <b>Rund alltid opp.</b>',
      'Regn ut for alle retninger – både gli og tippe. <b>Det høyeste antallet gjelder.</b>',
      '<b>Tipping:</b> regn ut H/B og H/L og rund opp til nærmeste <b>høyere</b> tabellverdi.',
      '<b>Blokkering</b> mot frontvegg eller annen last tar de store kreftene framover og sparer mange stropper.'
    ],
    ekstra: `<h3 style="font-size:22px;margin-top:0">Det du trenger</h3>
      <ul class="reslist">
        <li><span class="tag ndla">NDLA</span><span><a href="${NDLA_R + N.brosjyre[1]}" target="_blank" rel="noopener">Lastsikring ved vegtransport – lastsikringsheftet (NLF)</a><br><span class="small muted">Åpne PDF-en fra NDLA-siden, eller bruk papireksemplaret i klassen.</span></span></li>
        <li><span class="tag">PDF</span><span><a href="dokumenter/Sikring_av_last_hjelpedokument.pdf" target="_blank" rel="noopener">Sikring av last – hjelpedokument (sikringsplan)</a><br><span class="small muted">Bruk det som kladd når du regner gjennom casene.</span></span></li>
      </ul>`,
    ndla: [N.brosjyre, N.friksjon, N.krefter],
    aktiviteter: [
      { type:'quiz', id:'t7-q1', nivaa:1, tittel:'Grunnreglene i heftet', sp:[
        { q:'Hvor mye skal lastsikringen tåle sidevegs og bakover på en lastebil (N3)?', a:['0,5 × vekta','0,8 × vekta','1,0 × vekta','0,3 × vekta'], r:0, f:'Framover er det 0,8 × vekta.' },
        { q:'Hvilken metode bør du velge først når det er mulig?', a:['Blokkering – lasten står tett mot frontvegg, karmer eller annen last','Overfallssurring','Loopsurring','Kjøre forsiktig'], r:0, f:'Blokkering er det beste alternativet. Surring kommer i tillegg.' },
        { q:'Hvor mye fritt rom er tillatt til sammen når lasten er blokkert?', a:['Inntil 5 cm','Inntil 15 cm','Inntil 30 cm','Så mye du vil'], r:1, f:'For tungt, stumt gods som stål, stein og betong skal avstanden være så liten som mulig.' },
        { q:'LC for en kjetting er ikke kjent. Hva kan du sette LC til?', a:['100 % av bruddstyrken','50 % av bruddstyrken','25 % av bruddstyrken','Det samme som en stropp'], r:1, f:'Halvparten av bruddstyrken.' },
        { q:'Hvor mange loopsurringspar skal lasten minst sikres med?', a:['1','2','3','4'], r:1, f:'Én loopsurring består av to stropper – og du trenger minst to par.', fast:true },
        { q:'Et kolli er 2,0 m høyt og 1,2 m bredt. H/B = 1,67. Hvilken rad i tippetabellen bruker du?', a:['1,6','1,8','2,0','1,4'], r:1, f:'Rund alltid opp til nærmeste høyere tabellverdi.' },
        { q:'Hvorfor gir et lavt friksjonstall flere surringer?', a:['Godset glir lettere, så surringene må gjøre mer av jobben','Stroppene blir svakere','Lasten blir tyngre','Det gjør det ikke'], r:0, f:'Høy friksjon hjelper. Derfor er friksjonsmatter så effektive.' }
      ]},
      { type:'calc', id:'t7-c1', nivaa:1, gen:'perFireTonn', tittel:'Én surring per 4 tonn', antall:4 },
      { type:'quiz', id:'t7-q2', nivaa:2, tittel:'Slå opp: friksjonstabellen', fase:'ov', sp:[
        { q:'Hva er friksjonen for sagd tre/trepall mot plywood?', a:['0,30','0,40','0,45','0,60'], r:2, f:'En av de høyeste verdiene for trepaller.', fast:true },
        { q:'Hva er friksjonen for høvlet treverk mot plywood?', a:['0,20','0,30','0,45','0,55'], r:1, f:'Høvlet tre er glattere enn sagd tre.', fast:true },
        { q:'Hva er friksjonen for stål mot rustfri stålplate?', a:['0,15','0,20','0,30','0,45'], r:1, f:'Stål mot plywood er hele 0,45.', fast:true },
        { q:'Hva er friksjonen for plastpall mot riflet aluminium?', a:['0,15','0,20','0,25','0,40'], r:0, f:'Plastpaller er glatte. Vurder friksjonsmatte.', fast:true },
        { q:'Hva er friksjonen for grov betongoverflate mot tre?', a:['0,45','0,55','0,60','0,7'], r:3, f:'Slett betong mot tre er 0,55.', fast:true },
        { q:'Hva er friksjonen for et friksjonsmellomlegg av gummi?', a:['0,30','0,45','0,60','0,80'], r:2, f:'Gummimatter kan gjøre at lasten ikke glir sidevegs i det hele tatt.', fast:true }
      ]},
      { type:'quiz', id:'t7-q3', nivaa:2, tittel:'Slå opp: tabellene for gli og tippe', fase:'ov', sp:[
        { q:'Overfallssurring mot å GLI, µ = 0,45: Hvor mange tonn holder én stropp sidevegs?', a:['0,81 t','2,9 t','6,4 t','13 t'], r:2, f:'Framover holder den bare 0,81 t ved samme friksjon.', fast:true },
        { q:'Overfallssurring mot å TIPPE, 1 rad, H/B = 2,4: Hvor mange tonn holder én stropp sidevegs?', a:['0,64 t','3,3 t','4,5 t','tipper ikke'], r:1, f:'Med flere rader holder hver stropp mindre.', fast:true },
        { q:'Overfallssurring mot å GLI, µ = 0,70: Hvor mange tonn holder én stropp framover?', a:['1,9 t','2,7 t','4,4 t','glir ikke'], r:2, f:'Sidevegs og bakover glir ikke lasten ved denne friksjonen.', fast:true },
        { q:'Loopsurring mot å GLI, µ = 0,20: Hvor mange tonn holder ett par sidevegs?', a:['1,8 t','4,1 t','5,4 t','7,6 t'], r:2, f:'Loopsurring er svært effektiv sidevegs.', fast:true },
        { q:'Grimesurring mot å GLI, µ = 0,40: Hvor mange tonn holder én grime framover?', a:['0,63 t','2,5 t','6,0 t','15 t'], r:2, f:'Bakover holder den 15 t.', fast:true },
        { q:'Direktesurring mot å TIPPE, H/L = 1,4: Hvor mange tonn holder én surring framover?', a:['2,6 t','3,8 t','8,2 t','tipper ikke'], r:2, f:'Bakover tipper ikke kolliet ved denne H/L-verdien.', fast:true },
        { q:'Blokkering, µ = 0,45: Hvor mange tonn holder en anordning med BC 1 000 daN framover?', a:['1,9 t','2,9 t','5,1 t','20 t'], r:1, f:'En frontvegg med BC 5 000 daN holder fem ganger så mye: 14,5 t.', fast:true }
      ]},
      { type:'calc', id:'t7-c2', nivaa:2, gen:'antallStropper', tittel:'Hvor mange surringer trenger du?', antall:6, oppslag:[
        ['overfallssurring', 0.45, 'sidevegs', 6.4], ['overfallssurring', 0.45, 'framover', 0.81], ['overfallssurring', 0.30, 'sidevegs', 1.1],
        ['overfallssurring', 0.40, 'framover', 0.63], ['overfallssurring', 0.70, 'framover', 4.4], ['direktesurring', 0.20, 'sidevegs', 1.8],
        ['grimesurring', 0.30, 'framover', 4.9], ['grimesurring', 0.40, 'framover', 6.0], ['direktesurring', 0.30, 'sidevegs', 2.6],
        ['direktesurring', 0.45, 'framover', 1.9], ['direktesurring', 0.35, 'bakover', 3.3]
      ]},
      { type:'quiz', id:'t7-q4', nivaa:2, tittel:'Vinkler og justeringer', fase:'tenk', sp:[
        { q:'Overfallssurringen har 25° vinkel mot planet. Hva gjør du?', a:['Bruker tabellen som vanlig','Dobler antall surringer','Velger en annen metode','Strammer hardere'], r:2, f:'Under 30° presser stroppen nesten ikke lasten ned.' },
        { q:'Hvilken vinkel skal direktesurring ha på langs og på tvers?', a:['30°–60°','75°–90°','Maks 45°','Under 30°'], r:0, f:'Overfallssurring: 75–90°. Grime: maks 45° mot planet.' },
        { q:'Grimen får 20° vinkel sidevegs. Hva skjer med tabellverdien?', a:['Den ganges med 0,85','Den ganges med 0,70','Den halveres','Ingen endring'], r:0, f:'5–30°: × 0,85. 30–45°: × 0,70.' },
        { q:'Grimen sitter halvveis opp på lasten. Hvor mye holder den mot tipping?', a:['Dobbelt så mye','Halvparten av tabellverdien','Det samme','Ingenting'], r:1, f:'Grimen bør sitte øverst for å hindre tipping best.' },
        { q:'Grimen har to parter per side. Hva betyr det?', a:['Den holder dobbelt så mye som tabellen viser','Den holder halvparten','Den kan ikke brukes','Ingen endring'], r:0, f:'To parter per side = dobbel verdi.' },
        { q:'Du trenger fire direktesurringer som virker i samme retning. Hva advarer heftet om?', a:['At surringene ikke alltid tar belastningen samtidig','At det blir for dyrt','At du må bruke kjetting','Ingenting'], r:0, f:'Sikringen kan bli underdimensjonert. Blokkering er ofte bedre.' },
        { q:'Det er is og snø på lasteplanet. Hva betyr det for friksjonstabellen?', a:['Verdiene gjelder ikke – friksjonen blir lavere, så du må rengjøre planet eller regne med lavere µ','Ingenting – tabellen gjelder alltid','Friksjonen blir høyere','Du kan bruke 0,60'], r:0, f:'Tabellverdiene forutsetter rene flater uten frost, is og snø. Vær også obs på oljete flater.' },
        { q:'Stroppene har LC 2 500 daN, men surrefestene tåler 2 000 daN. Hvilken omregningsfaktor gjelder for loopsurring?', a:['2 500 ÷ 1 600 ≈ 1,56','2 000 ÷ 1 600 = 1,25','1,0','2 500 ÷ 400 ≈ 6,3'], r:1, f:'Surrefestets kapasitet må ikke overskrides.' }
      ]},
      { type:'case', id:'t7-case1', nivaa:3, tittel:'Case: Maskinkassen som ikke er blokkert', intro:'En maskinkasse i stål på 6 tonn står alene på et plywoodplan. Den er 2,2 m høy, 1,0 m bred og 2,0 m lang, med tyngdepunktet på midten. Du bruker overfallssurring med 85° vinkel. Kassen står ikke inntil frontveggen. Ha heftet foran deg.', steg:[
        { q:'Hvilken friksjon bruker du?', valg:[
          { t:'µ = 0,45 (stål mot plywood)', ok:true, f:'Stål mot rustfri stålplate ville gitt bare 0,20.' },
          { t:'µ = 0,20', ok:false, f:'0,20 bruker du bare når du ikke vet friksjonen.' },
          { t:'µ = 0,30', ok:false, f:'Sjekk friksjonstabellen under «Stål mot plater».' }
        ]},
        { q:'Én overfallssurring holder 6,4 t sidevegs og 0,81 t framover ved µ = 0,45. Hvor mange trenger du mot å gli?', valg:[
          { t:'1 sidevegs og 8 framover', ok:true, f:'6 ÷ 6,4 = 0,94 → 1. 6 ÷ 0,81 = 7,4 → 8.' },
          { t:'1 sidevegs og 1 framover', ok:false, f:'Overfallssurring er svak framover. Regn ut 6 ÷ 0,81.' },
          { t:'2 sidevegs og 4 framover', ok:false, f:'Del lastens vekt på tabellverdien og rund opp.' }
        ]},
        { q:'Tipping sidevegs: H/B = 2,2 ÷ 1,0 = 2,2. Én stropp holder 4,5 t (1 rad). Hvor mange trenger du?', valg:[
          { t:'2', ok:true, f:'6 ÷ 4,5 = 1,33 → 2. Framover er H/L = 1,1 → rad 1,2: kassen tipper ikke.' },
          { t:'1', ok:false, f:'1,33 må rundes opp.' },
          { t:'Ingen', ok:false, f:'Ved H/B 2,2 og én rad kan kassen tippe.' }
        ]},
        { q:'Hva blir svaret med bare overfallssurring?', valg:[
          { t:'8 surringer – det høyeste antallet gjelder', ok:true, f:'Det er mange stropper. Finnes det en smartere løsning?' },
          { t:'2 surringer', ok:false, f:'Du må ta det høyeste antallet av alle utregningene.' },
          { t:'11 surringer – summen', ok:false, f:'Tallene skal ikke legges sammen.' }
        ]},
        { q:'Du flytter kassen helt inntil frontveggen. Hvor mange overfallssurringer trenger du nå?', valg:[
          { t:'2 – frontveggen tar kreftene framover, og tipping sidevegs bestemmer', ok:true, f:'6 ÷ 4 = 1,5 → 2 stemmer også med én surring per 4 tonn.' },
          { t:'8 – det endrer ingenting', ok:false, f:'Blokkering framover fjerner behovet for de åtte stroppene.' },
          { t:'0 – blokkering er nok', ok:false, f:'Kassen kan fortsatt gli og tippe sidevegs.' }
        ]}
      ]},
      { type:'case', id:'t7-case2', nivaa:3, tittel:'Case: Grimer på trailer', intro:'Du skal frakte 14 tonn trepaller (sagd tre) på en trailer med riflet aluminiumsgolv. Lasten står ikke inntil frontveggen, så du sikrer framover med grimer.', steg:[
        { q:'Hvilken friksjon gjelder?', valg:[
          { t:'µ = 0,40', ok:true, f:'Sagd tre mot riflet aluminium.' },
          { t:'µ = 0,25', ok:false, f:'0,25 er høvlet treverk mot riflet aluminium.' },
          { t:'µ = 0,15', ok:false, f:'Det er plastpall mot riflet aluminium.' }
        ]},
        { q:'Én grime holder 6,0 t framover ved µ = 0,40. Hvor mange grimer trenger du?', valg:[
          { t:'3', ok:true, f:'14 ÷ 6,0 = 2,33 → rund opp til 3.' },
          { t:'2', ok:false, f:'2 × 6,0 = 12 t er mindre enn 14 t.' },
          { t:'14', ok:false, f:'Del lastens vekt på det én grime holder.' }
        ]},
        { q:'Grimen får 20° vinkel sidevegs. Hva holder én grime nå?', valg:[
          { t:'5,1 t (6,0 × 0,85)', ok:true, f:'14 ÷ 5,1 = 2,75 → fortsatt 3 grimer.' },
          { t:'4,2 t (6,0 × 0,70)', ok:false, f:'× 0,70 gjelder 30–45°.' },
          { t:'3,0 t (halvparten)', ok:false, f:'Halvering gjelder overfallssurring med 30–75° vinkel.' }
        ]},
        { q:'Du bruker grimer med to parter per side. Hvor mange trenger du da (rett grime, 6,0 t)?', valg:[
          { t:'2', ok:true, f:'Hver grime holder 12 t. 14 ÷ 12 = 1,17 → 2.' },
          { t:'1', ok:false, f:'12 t er mindre enn 14 t.' },
          { t:'3', ok:false, f:'Med dobbel verdi holder det med 2.' }
        ]}
      ]},
      { type:'case', id:'t7-case3', nivaa:3, tittel:'Case: Sterkere stropper enn surrefestene', intro:'Du skal sikre en seksjon med stålprofiler på 16 tonn sidevegs med loopsurring. Friksjonen er µ = 0,30. Stroppene har LC 2 500 daN og S_TF 600 daN. Surrefestene på bilen tåler 2 000 daN.', steg:[
        { q:'Hvilken omregningsfaktor bruker du for loopsurring?', valg:[
          { t:'1,25 – surrefestet (2 000 ÷ 1 600) begrenser', ok:true, f:'Du kan aldri regne med mer enn det svakeste leddet.' },
          { t:'1,56 – stroppens LC (2 500 ÷ 1 600)', ok:false, f:'Surrefestet tåler bare 2 000 daN.' },
          { t:'1,5 – forspenningen (600 ÷ 400)', ok:false, f:'Forspenningen brukes for overfallssurring mot å gli.' }
        ]},
        { q:'Ett loopsurringspar holder 7,3 t ved µ = 0,30. Hva holder ditt par?', valg:[
          { t:'Omtrent 9,1 t (7,3 × 1,25)', ok:true, f:'Bedre utstyr gir mer, men bare opp til surrefestets grense.' },
          { t:'Omtrent 11,4 t (7,3 × 1,56)', ok:false, f:'Bruk faktoren 1,25.' },
          { t:'7,3 t', ok:false, f:'Utstyret er bedre enn tabellstroppen, så du kan bruke omregningsfaktoren.' }
        ]},
        { q:'Hvor mange loopsurringspar trenger du?', valg:[
          { t:'2 par', ok:true, f:'16 ÷ 9,1 = 1,75 → 2. Det stemmer også med kravet om minst to par.' },
          { t:'1 par', ok:false, f:'9,1 t er mindre enn 16 t – og du trenger uansett minst to par.' },
          { t:'3 par', ok:false, f:'To par holder 18,2 t.' }
        ]},
        { q:'Du vil heller bruke overfallssurring mot å gli. Hvilken omregningsfaktor gjelder da?', valg:[
          { t:'1,5 (600 ÷ 400)', ok:true, f:'Mot glidning er det forspenningen S_TF som teller.' },
          { t:'1,25 (2 000 ÷ 1 600)', ok:false, f:'1,25 gjelder LC-baserte metoder her.' },
          { t:'1,56 (2 500 ÷ 1 600)', ok:false, f:'LC brukes ikke for overfallssurring mot å gli.' }
        ]}
      ]},
      { type:'case', id:'t7-case4', nivaa:3, tittel:'Case: Last i to lag', intro:'En seksjon med paller i to lag og én rad veier 4 tonn. Øvre lag veier 2 tonn. Nedre lag står på plywood (µ = 0,45). Mellom lagene er det trepall mot krympefilm (µ = 0,30). Seksjonen er 2,4 m høy og 1,0 m bred. Du bruker overfallssurring med 85° vinkel, og lasten er ikke blokkert sidevegs.', steg:[
        { q:'Steg 1: Hele seksjonen mot å gli sidevegs. Én stropp holder 6,4 t ved µ = 0,45. Hvor mange?', valg:[
          { t:'1', ok:true, f:'4 ÷ 6,4 = 0,63 → 1.' },
          { t:'2', ok:false, f:'4 ÷ 6,4 er mindre enn 1.' },
          { t:'0', ok:false, f:'Du runder alltid opp – minst 1.' }
        ]},
        { q:'Steg 2: Øvre lag mot å gli. Én stropp holder 1,1 t ved µ = 0,30. Hvor mange?', valg:[
          { t:'2', ok:true, f:'2 ÷ 1,1 = 1,82 → 2. Det er friksjonen mellom lagene som teller for øvre lag.' },
          { t:'1', ok:false, f:'1,1 t er mindre enn 2 t.' },
          { t:'4', ok:false, f:'Her regner du bare øvre lag: 2 tonn.' }
        ]},
        { q:'Steg 3: Hele seksjonen mot å tippe. H/B = 2,4, 1 rad: én stropp holder 3,3 t. Hvor mange?', valg:[
          { t:'2', ok:true, f:'4 ÷ 3,3 = 1,21 → 2. Høy last gir ofte flere surringer mot tipping.' },
          { t:'1', ok:false, f:'3,3 t er mindre enn 4 t.' },
          { t:'Ingen', ok:false, f:'Ved H/B 2,4 kan seksjonen tippe.' }
        ]},
        { q:'Steg 4: Hvor mange overfallssurringer bruker du per seksjon?', valg:[
          { t:'2 – det høyeste av de tre utregningene', ok:true, f:'1, 2 og 2 → 2.' },
          { t:'5 – summen', ok:false, f:'Tallene legges ikke sammen.' },
          { t:'1 – det laveste', ok:false, f:'Det høyeste antallet gjelder.' }
        ]}
      ]},
      { type:'case', id:'t7-case5', nivaa:3, tittel:'Case: Glatte plastpaller', intro:'Du skal frakte 4 tonn varer på plastpaller på et lasteplan av riflet aluminium. Pallene står ikke inntil frontveggen. Du har overfallssurringer og noen friksjonsmatter av gummi i bilen.', steg:[
        { q:'Ved µ = 0,15 holder én overfallssurring 0,31 t sidevegs. Hvor mange trenger du sidevegs?', valg:[
          { t:'13', ok:true, f:'4 ÷ 0,31 = 12,9 → 13. Framover blir det enda verre: 4 ÷ 0,15 = 27.' },
          { t:'2', ok:false, f:'Del lastens vekt på 0,31.' },
          { t:'4', ok:false, f:'Hver stropp holder bare 0,31 t.' }
        ]},
        { q:'Hva er det smarteste tiltaket?', valg:[
          { t:'Legge friksjonsmatter under pallene (µ = 0,60)', ok:true, f:'Med gummimatter glir lasten ikke sidevegs og bakover etter tabellen.' },
          { t:'Bruke 27 stropper', ok:false, f:'Det finnes ikke så mange surrefester – og det tar altfor lang tid.' },
          { t:'Kjøre ekstra forsiktig', ok:false, f:'Lasten må være sikret etter kravene uansett.' }
        ]},
        { q:'Med matter (µ = 0,60) holder én overfallssurring 1,9 t framover. Hvor mange trenger du framover?', valg:[
          { t:'2', ok:false, f:'2 × 1,9 = 3,8 t er mindre enn 4 t.' },
          { t:'3', ok:true, f:'4 ÷ 1,9 = 2,1 → 3. Alternativt: flytt pallene inntil frontveggen. Da holder det med 1 per 4 tonn.' },
          { t:'1', ok:false, f:'1,9 t er mindre enn 4 t.' }
        ]}
            ]},
      { type:'case', id:'t7-case6', nivaa:2, tittel:'Case: Les merkelappen', intro:'Merkelappen på stroppen viser: LC 1 700 daN, S_HF 50 daN, S_TF 400 daN. Under «Lokale regler» står det 4 000 kg for Norge og Sverige. Heftet regner med LC 1 600 daN og S_TF 400 daN.', steg:[
        { q:'Hva er stroppens sikringskapasitet (LC)?', valg:[
          { t:'1 700 daN', ok:true, f:'LC er det du regner med.' },
          { t:'4 000 kg', ok:false, f:'Det er bruddstyrken. Den må ikke forveksles med LC.' },
          { t:'400 daN', ok:false, f:'Det er forspenningen S_TF.' }
        ]},
        { q:'Hvilken omregningsfaktor gjelder for direktesurring?', valg:[
          { t:'Omtrent 1,06 (1 700 ÷ 1 600)', ok:true, f:'Direktesurring, loopsurring og grime regnes om med LC.' },
          { t:'1,0 (400 ÷ 400)', ok:false, f:'Forspenningen brukes for overfallssurring mot å gli.' },
          { t:'2,5 (4 000 ÷ 1 600)', ok:false, f:'4 000 kg er bruddstyrken, ikke LC.' }
        ]},
        { q:'Hvilken omregningsfaktor gjelder for overfallssurring mot å gli?', valg:[
          { t:'1,0 (400 ÷ 400)', ok:true, f:'Stroppen er like god som tabellstroppen mot glidning.' },
          { t:'Omtrent 1,06 (1 700 ÷ 1 600)', ok:false, f:'Mot glidning er det forspenningen S_TF som teller.' },
          { t:'0,125 (50 ÷ 400)', ok:false, f:'50 daN er håndkraften S_HF.' }
        ]}
      ]},
      { type:'case', id:'t7-case7', nivaa:3, tittel:'Case: Velg og begrunn opplegget', intro:'Du skal frakte 8 tonn kartonger på trepaller (sagd tre) på plywood. Lasten fyller hele planet og står inntil frontveggen og sideveggene. Én overfallssurring holder bare 0,81 t framover ved µ = 0,45.', steg:[
        { q:'Hvilket opplegg er best?', valg:[
          { t:'Blokkering mot frontvegg og sider, pluss overfallssurringer mot risting', ok:true, f:'Blokkeringen tar de store kreftene. Surringene holder lasten nede.' },
          { t:'10 overfallssurringer uten å bruke blokkeringen', ok:false, f:'8 ÷ 0,81 = 9,9 → 10 stropper. Det er unødvendig mye arbeid når lasten allerede er blokkert.' },
          { t:'Ingen sikring – lasten er tung nok', ok:false, f:'Tung last glir like lett som lett last. Den trenger bare større kraft for å stoppe.' }
        ]},
        { q:'Lasten verken glir eller tipper etter tabellene. Hvor mange surringer anbefaler heftet mot risting?', valg:[
          { t:'2', ok:true, f:'Én per 4 tonn: 8 ÷ 4 = 2.' },
          { t:'0', ok:false, f:'Det er lov, men risting kan få lasten til å vandre. Heftet anbefaler én per 4 tonn.' },
          { t:'8', ok:false, f:'Anbefalingen er én per 4 tonn, ikke én per tonn.' }
        ]},
        { q:'Hvordan begrunner du valget overfor sjåføren?', valg:[
          { t:'Blokkering er heftets førstevalg, sparer stropper og tid – og surringene sikrer mot risting', ok:true, f:'En god begrunnelse viser til regelverket og forklarer hvorfor metoden passer lasten.' },
          { t:'Sånn har vi alltid gjort det', ok:false, f:'Vane er ingen faglig begrunnelse.' },
          { t:'Det ser stødig ut', ok:false, f:'Magefølelse er ikke nok. Regn det ut eller slå det opp.' }
        ]}
      ]}
    ]
  }
  ]
});
})();
