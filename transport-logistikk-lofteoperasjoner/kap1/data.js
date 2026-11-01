/* =====================================================================
   KAPITTELDATA – Kap 1 Grunnleggende prinsipper ved lager- og terminalarbeid
   Alle tekster, oppgaver og tegninger er egenprodusert for TLLfluenseren.
   Faglig grunnlag: læreboka og arbeidsboka i Transport, logistikk og løfteoperasjoner (Vg2),
   kontrollert mot lærerens løsningsforslag. Ingenting er kopiert fra bøkene.
   Oppgavetyper: flash, quiz, tf, fill, match, order, sort, calc, check, hotspot, case, reflect, sim, voks
   ===================================================================== */
(function(){
const NDLA_E = 'https://ndla.no/nb/e/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/drift-pa-terminal-og-lager/3e3d0bf6c9';
const NDLA_R = 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/';

/* ---------- Egne tegninger (SVG). Klikkbare områder har data-z. ---------- */
const S = 'font-family="Inter,system-ui,sans-serif"';
const SVG_LAGER = `<svg viewBox="0 0 600 370" ${S} role="img" aria-label="Plantegning av et lager">
  <rect x="10" y="10" width="580" height="320" rx="6" fill="#ffffff" stroke="#1b2128" stroke-width="3"/>
  <rect data-z="frys" x="25" y="25" width="78" height="160" fill="#dbe9f7" stroke="#5c6670"/><text x="64" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="#1b2128">FRYS</text><text x="64" y="100" text-anchor="middle" font-size="26">❄</text>
  <rect data-z="kjol" x="108" y="25" width="78" height="160" fill="#e3f1f4" stroke="#5c6670"/><text x="147" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="#1b2128">KJØL</text>
  <rect data-z="sval" x="191" y="25" width="78" height="160" fill="#eef3e6" stroke="#5c6670"/><text x="230" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="#1b2128">SVAL</text>
  <text x="378" y="22" text-anchor="middle" font-size="13" font-weight="700" fill="#1b2128">TØRRVARER</text>
  <rect data-z="c" x="285" y="28" width="186" height="64" fill="#f4f1ea" stroke="#5c6670"/>
  <rect data-z="b" x="285" y="92" width="186" height="64" fill="#f4f1ea" stroke="#5c6670"/>
  <rect data-z="a" x="285" y="156" width="186" height="64" fill="#f4f1ea" stroke="#5c6670"/>
  <g fill="#c9c2b3" pointer-events="none"><rect x="300" y="32" width="14" height="184"/><rect x="340" y="32" width="14" height="184"/><rect x="380" y="32" width="14" height="184"/><rect x="420" y="32" width="14" height="184"/><rect x="455" y="32" width="10" height="184"/></g>
  <rect data-z="pall" x="482" y="25" width="95" height="110" fill="#f6efe1" stroke="#5c6670"/>
  <g pointer-events="none" fill="#b08a4f"><rect x="500" y="88" width="58" height="7"/><rect x="500" y="98" width="58" height="7"/><rect x="500" y="108" width="58" height="7"/><rect x="500" y="118" width="58" height="7"/></g>
  <rect data-z="lade" x="482" y="142" width="95" height="78" fill="#f7f3d9" stroke="#5c6670"/><text x="530" y="192" text-anchor="middle" font-size="30" pointer-events="none">⚡</text>
  <rect data-z="mottak" x="25" y="235" width="244" height="85" fill="#efe9ff" stroke="#5c6670"/>
  <rect data-z="oppstilling" x="285" y="235" width="292" height="85" fill="#fff0e0" stroke="#5c6670"/>
  <g pointer-events="none" fill="none" stroke="#5c6670" stroke-width="2"><rect x="40" y="248" width="30" height="22"/><rect x="80" y="248" width="30" height="22"/><rect x="330" y="248" width="30" height="22"/><rect x="370" y="248" width="30" height="22"/><rect x="410" y="248" width="30" height="22"/></g>
  <g pointer-events="none" fill="#1b2128"><rect x="55" y="330" width="40" height="12"/><rect x="125" y="330" width="40" height="12"/><rect x="195" y="330" width="40" height="12"/><rect x="335" y="330" width="40" height="12"/><rect x="405" y="330" width="40" height="12"/><rect x="475" y="330" width="40" height="12"/></g>
  <text x="147" y="362" text-anchor="middle" font-size="13" font-weight="700" fill="#1b2128">PORTER – INN ↑</text>
  <text x="425" y="362" text-anchor="middle" font-size="13" font-weight="700" fill="#1b2128">PORTER – UT ↓</text>
</svg>`;
const SVG_REOL = `<svg viewBox="0 0 360 330" ${S} role="img" aria-label="Pallreol med fem nivåer">
  <rect x="0" y="0" width="360" height="330" fill="#ffffff"/>
  <g stroke="#e07b00" stroke-width="8"><line x1="40" y1="20" x2="40" y2="300"/><line x1="320" y1="20" x2="320" y2="300"/></g>
  <g stroke="#1d6fb8" stroke-width="6"><line x1="40" y1="74" x2="320" y2="74"/><line x1="40" y1="128" x2="320" y2="128"/><line x1="40" y1="182" x2="320" y2="182"/><line x1="40" y1="236" x2="320" y2="236"/></g>
  <rect data-z="volum" x="46" y="22" width="268" height="50" fill="#e9e2d2"/>
  <rect data-z="volum" x="46" y="76" width="268" height="50" fill="#e9e2d2"/>
  <rect data-z="volum" x="46" y="130" width="268" height="50" fill="#e9e2d2"/>
  <rect data-z="plukk" x="46" y="184" width="268" height="50" fill="#dceccc"/>
  <rect data-z="plukk" x="46" y="238" width="268" height="60" fill="#dceccc"/>
  <g pointer-events="none" fill="#c69c5d" stroke="#8b6a38"><rect x="60" y="32" width="110" height="38"/><rect x="190" y="32" width="110" height="38"/><rect x="60" y="86" width="110" height="38"/><rect x="190" y="86" width="110" height="38"/><rect x="60" y="140" width="110" height="38"/><rect x="190" y="140" width="110" height="38"/></g>
  <g pointer-events="none" fill="#d9b98a" stroke="#8b6a38"><rect x="62" y="206" width="30" height="24"/><rect x="96" y="210" width="30" height="20"/><rect x="200" y="204" width="34" height="26"/><rect x="62" y="266" width="34" height="28"/><rect x="104" y="270" width="30" height="24"/><rect x="214" y="262" width="40" height="32"/></g>
  <line x1="10" y1="302" x2="350" y2="302" stroke="#1b2128" stroke-width="3"/><text x="180" y="322" text-anchor="middle" font-size="12" fill="#5c6670">golv</text>
</svg>`;
const SVG_FRAKTBREV = `<svg viewBox="0 0 600 430" ${S} role="img" aria-label="Forenklet fraktbrev">
  <rect x="2" y="2" width="596" height="426" fill="#ffffff" stroke="#1b2128" stroke-width="2"/>
  <text x="18" y="28" font-size="18" font-weight="800" fill="#1b2128">FRAKTBREV</text><text x="580" y="28" text-anchor="end" font-size="12" fill="#5c6670">Forenklet øvingsskjema · Nr. 70 4415 1182</text>
  <g font-size="11" fill="#5c6670" font-weight="700">
  <rect data-z="avsender" x="12" y="40" width="284" height="74" fill="#f7f7f2" stroke="#9aa3ab"/><text x="20" y="56">1 AVSENDER</text>
  <rect data-z="mottaker" x="304" y="40" width="284" height="74" fill="#f7f7f2" stroke="#9aa3ab"/><text x="312" y="56">2 MOTTAKER</text>
  <rect data-z="fraktforer" x="12" y="120" width="284" height="56" fill="#f7f7f2" stroke="#9aa3ab"/><text x="20" y="136">3 FRAKTFØRER / TRANSPORTØR</text>
  <rect data-z="betaling" x="304" y="120" width="284" height="56" fill="#f7f7f2" stroke="#9aa3ab"/><text x="312" y="136">4 FRAKT BETALES AV</text>
  <rect data-z="kolli" x="12" y="182" width="400" height="92" fill="#f7f7f2" stroke="#9aa3ab"/><text x="20" y="198">5 ANTALL KOLLI · MERKING · INNHOLD</text>
  <rect data-z="vekt" x="418" y="182" width="170" height="92" fill="#f7f7f2" stroke="#9aa3ab"/><text x="426" y="198">6 BRUTTOVEKT (KG)</text>
  <rect data-z="farlig" x="12" y="280" width="284" height="46" fill="#fff4e5" stroke="#9aa3ab"/><text x="20" y="296">7 FARLIG GODS (UN-NR, KLASSE)</text>
  <rect data-z="merknad" x="304" y="280" width="284" height="74" fill="#f7f7f2" stroke="#9aa3ab"/><text x="312" y="296">8 MERKNADER</text>
  <rect data-z="sign" x="12" y="360" width="576" height="60" fill="#f7f7f2" stroke="#9aa3ab"/><text x="20" y="376">9 UNDERSKRIFTER: AVSENDER · FRAKTFØRER · MOTTAKER (DATO OG KLOKKESLETT)</text>
  </g>
  <g pointer-events="none" font-size="12" fill="#2b3a48"><text x="20" y="78">Nordgrossisten AS</text><text x="20" y="94">Industriveien 4, 4033 Stavanger</text><text x="312" y="78">Lagerhuset Sola</text><text x="312" y="94">Flyplassvegen 20, 4050 Sola</text>
  <text x="20" y="220">3 kolli · pall · «Skjøre varer»</text><text x="426" y="230">412</text><text x="20" y="160">Vestfrakt AS</text><text x="312" y="160">Avsender</text></g>
</svg>`;
const SVG_SORT = `<svg viewBox="0 0 600 370" ${S} role="img" aria-label="Skisse av et automatisk sorteringsanlegg">
  <rect x="0" y="0" width="600" height="370" fill="#ffffff"/>
  <line x1="10" y1="330" x2="590" y2="330" stroke="#1b2128" stroke-width="3"/><text x="580" y="350" text-anchor="end" font-size="12" fill="#5c6670">golvplan</text>
  <line x1="10" y1="110" x2="590" y2="110" stroke="#9aa3ab" stroke-width="1.5" stroke-dasharray="6 5"/><text x="580" y="104" text-anchor="end" font-size="12" fill="#5c6670">etasje over golvet (mesanin)</text>
  <ellipse data-z="ring" cx="330" cy="70" rx="190" ry="34" fill="#e3eefa" stroke="#1d6fb8" stroke-width="10"/>
  <polygon data-z="opp" points="70,300 90,312 205,92 185,80" fill="#cfe0f2" stroke="#1d6fb8" stroke-width="2"/>
  <rect data-z="inn" x="25" y="292" width="85" height="34" fill="#efe9ff" stroke="#5c6670" stroke-width="2"/>
  <g data-z="skann"><rect x="40" y="244" width="40" height="30" rx="4" fill="#1b2128"/><path d="M48 266 L72 266" stroke="#f2b84b" stroke-width="3"/></g>
  <polygon data-z="ned" points="388,104 412,104 432,300 404,300" fill="#e9e2d2" stroke="#8b6a38" stroke-width="2"/>
  <rect data-z="golv" x="404" y="300" width="110" height="26" fill="#cfe0f2" stroke="#1d6fb8" stroke-width="2"/>
  <rect data-z="kont" x="520" y="250" width="66" height="76" fill="#f6efe1" stroke="#8b6a38" stroke-width="3"/>
  <g pointer-events="none" fill="#c69c5d" stroke="#8b6a38"><rect x="48" y="282" width="20" height="12"/><rect x="250" y="38" width="16" height="10"/><rect x="420" y="86" width="16" height="10"/></g>
</svg>`;

TLL.registrer({
  id: 'kap1',
  fag: 'Transport, logistikk og løfteoperasjoner',
  nr: 1,
  tittel: 'Grunnleggende prinsipper ved lager- og terminalarbeid',
  ingress: 'Hvordan varer og gods flyter fra fabrikk til kunde – og hva du gjør på lageret og terminalen for at det skal gå effektivt og riktig.',
  kompetansemal: { kode: 'TOL02-01 · KV427', tekst: 'gjøre rede for grunnleggende prinsipper for effektiv drift av lager og terminal' },
  ressurser: {
    // KUN egenprodusert materiell her (f.eks. egne lysark). IKKE last opp forlagets presentasjon eller PDF-er.
    presentasjon: '',
    laerebok: 'Læreboka, kapittel 1 (s. 9 og utover)',
    arbeidsbok: 'Arbeidsboka, kapittel 1 (oppgave 1.1–1.33)',
    ndlaEmne: NDLA_E,
    ordliste: NDLA_R + 'ordliste-for-lager-og-logistikk/0924071fc5'
  },
  temaer: [
  /* ================================================================ T1 */
  {
    id: 't1', lok: 'A-01', tittel: 'Lager og terminaler i samfunnet',
    kort: 'Varekretsløpet, handelsnæringen, forskjellen på vare og gods – og hvorfor vi trenger lagre og terminaler.',
    bok: 'Læreboka 1.1 (s. 10–11)',
    mal: ['forklare hvorfor et industrisamfunn trenger varelagre, godsterminaler og transport','beskrive varekretsløpet fra råvare til gjenvinning','forklare forskjellen på en vare og gods, og hvem som er partene i en fraktavtale','skille mellom dagligvarehandel, faghandel og servicehandel'],
    punkter: [
      'Før produserte hver husholdning det meste selv og måtte ha lager for vinteren (<b>husholdningssamfunn</b>). I dag produseres varene i spesialiserte fabrikker over hele verden (<b>industrisamfunn</b>).',
      'Da trengs <b>varelagre, godsterminaler, transportmidler</b> og folk som kjører transportmidler og løfteinnretninger.',
      '<b>Varekretsløpet:</b> råvarer hentes fra primærnæringene (jordbruk, skogbruk, utvinning, fiske og fangst), blir til varer i industrien, formidles og selges – og går til slutt til gjenvinning.',
      'Et <b>lager</b> oppbevarer varer en periode mellom selger og kjøper og gjør dem tilgjengelige for kundene. En <b>godsterminal</b> tar imot gods, sorterer det og sender det videre så raskt som mulig.',
      '<b>Vare</b> er kjøpslovens ord: noe som skal skifte eier fra selger til kjøper. <b>Gods</b> er vegfraktlovens ord for varer under transport.',
      'Partene i en <b>fraktavtale</b> er <b>avsender, fraktfører og mottaker</b>. Vanligvis er det selgeren som inngår fraktavtalen med transportøren.',
      'Handelen deles i <b>dagligvarehandel</b> (varer vi trenger ofte), <b>faghandel</b> (varer vi kjøper sjeldnere) og <b>servicehandel</b> (kiosker, hurtigmat – varer vi kjøper fordi det er lettvint).'
    ],
    ndla: [
      ['Hva er en terminal?', 'hva-er-en-terminal/04f1384e9b', 'Fagstoff'],
      ['Terminaler', 'terminaler/6a8f025da7', 'Fagstoff'],
      ['Innkjøp og distribusjon av varer', 'innkjop-og-distribusjon-av-varer/2638662d26', 'Fagstoff']
    ],
    arbeidsbok: '1.1, 1.2, 1.11, 1.12, 1.17, 1.24',
    aktiviteter: [
      { type:'voks', id:'t1-voks', tittel:'Du er et ledd i kjeden', tekst:['En vare går gjennom mange hender før den havner i butikkhylla. Fabrikken, sentrallageret, regionlageret, sjåføren, butikken – alle er avhengige av at leddet før dem har gjort jobben sin.','Når én person kommer for sent, plukker feil eller glemmer å si fra, merkes det et annet sted i kjeden. Kanskje er det en tom hylle. Kanskje er det en kunde som venter forgjeves.','Å ta ansvar på jobb handler mye om dette: å gjøre din del ordentlig, også når ingen ser deg.'], sporsmal:['Hvem er avhengig av at du gjør jobben din i dag – på skolen, i praksis eller på jobb?','Tenk på en gang noen andre ikke gjorde sin del. Hvordan påvirket det deg?'], handling:'Legg merke til én gang i løpet av uka der du gjør din del litt bedre enn nødvendig.' },
      { type:'flash', id:'t1-flash', tittel:'Begrepskort: samfunn, vare og gods', kort:[
        ['Husholdningssamfunn','Samfunn der hver husholdning produserte det meste den trengte selv – og lagret mat for vinteren.'],
        ['Industrisamfunn','Samfunn der varene lages i spesialiserte fabrikker, og vi kjøper det vi trenger.'],
        ['Primærnæringer','Næringer som henter ut råvarer: jordbruk, skogbruk, utvinning, fiske og fangst.'],
        ['Varekretsløp','Hele veien fra råvare via produksjon, formidling og salg til avfall og gjenvinning.'],
        ['Varelager','Oppbevarer varer en periode mellom selger og kjøper og gjør dem tilgjengelige for kundene.'],
        ['Godsterminal','Anlegg der gods tas imot, sorteres og sendes videre så raskt som mulig.'],
        ['Vare','Kjøpslovens ord for noe som skal gå over fra selger til kjøper (eiendomsretten flyttes).'],
        ['Gods','Vegfraktlovens ord for varer som er under transport mellom avsender og mottaker.'],
        ['Fraktavtale','Avtale om transport. Partene er avsender, fraktfører og mottaker.'],
        ['Kjøpsloven','Gjelder handel mellom næringsdrivende – den du oftest møter som sjåfør og logistikkoperatør.'],
        ['Forbrukerkjøpsloven','Gjelder når privatpersoner kjøper varer fra en næringsdrivende.'],
        ['Dagligvarehandel','Butikker som selger varer vi trenger ofte, f.eks. mat og sanitærartikler.'],
        ['Faghandel','Kjeder som selger varer vi kjøper sjeldnere, f.eks. maling, klær, møbler og byggevarer.'],
        ['Servicehandel','Kiosker, hurtigmat og bensinstasjoner – varer vi kjøper fordi det er lettvint.']
      ]},
      { type:'quiz', id:'t1-q1', nivaa:1, tittel:'Lager, terminal og samfunn', sp:[
        { q:'Hva er den viktigste oppgaven til et dagligvarelager?', a:['Å gjøre varene tilgjengelige for kundene når de bestiller','Å produsere matvarer','Å sortere passasjerer','Å selge bensin'], r:0, f:'Lageret skal ikke bare oppbevare varer – poenget er at varene er klare når kunden trenger dem.' },
        { q:'Hva skjer med gods på en godsterminal?', a:['Det lagres i flere måneder','Det tas imot, sorteres og sendes videre så raskt som mulig','Det produseres','Det selges til forbrukere'], r:1, f:'Godset skal stå kortest mulig på terminalen.' },
        { q:'Hvorfor trengte folk i husholdningssamfunnet store lagre?', a:['For å selge varer til utlandet','Fordi de måtte ha nok mat til vinteren til ny avling kom','Fordi de hadde mange lastebiler','For å drive netthandel'], r:1, f:'Maten ble produsert om sommeren og måtte vare gjennom vinteren.' },
        { q:'Hvilken av disse er en primærnæring?', a:['Fiske og fangst','Dagligvarehandel','Transport','Bank'], r:0, f:'Primærnæringene henter ut råvarer: jordbruk, skogbruk, utvinning, fiske og fangst.' },
        { q:'Hva kjennetegner faghandelen?', a:['Den selger varer vi trenger hver dag','Den selger varer vi kjøper sjeldnere, som maling og møbler','Den selger bare mat','Den er bare på nett'], r:1, f:'Dagligvare = ofte, faghandel = sjeldnere, servicehandel = lettvint.' }
      ]},
      { type:'tf', id:'t1-tf', nivaa:1, tittel:'Sant eller usant: samfunn og handel', ps:[
        ['I et industrisamfunn produserer hver familie det meste den trenger selv.', false, 'Det var husholdningssamfunnet. I industrisamfunnet kjøper vi fra spesialiserte produsenter.'],
        ['Gods er vegfraktlovens ord for varer under transport.', true, 'Vare er kjøpslovens ord, gods er vegfraktlovens.'],
        ['En kiosk er et eksempel på servicehandel.', true, 'Kiosker, hurtigmat og pizzeriaer er servicehandel.'],
        ['Det er alltid kjøperen som inngår fraktavtalen med transportøren.', false, 'Vanligvis er det selgeren (avsenderen) som inngår fraktavtalen.'],
        ['Varekretsløpet slutter når kunden har kjøpt varen.', false, 'Når varen er brukt opp eller utslitt, går den til avfallsinnsamling og gjenvinning.'],
        ['Kjøpsloven gjelder handel mellom næringsdrivende.', true, 'Forbrukerkjøpsloven gjelder når privatpersoner kjøper.'],
        ['En godsterminal skal oppbevare gods så lenge som mulig.', false, 'Målet er motsatt: sortere og sende videre så fort som mulig.']
      ]},
      { type:'order', id:'t1-o1', nivaa:1, tittel:'Varekretsløpet', instr:'Sett leddene i varekretsløpet i riktig rekkefølge.', steg:[
        'Råvarer hentes ut i primærnæringene','Råvarene transporteres til industrien','Industrien produserer ferdigvarer','Ferdigvarene transporteres til lager og grossist','Varene distribueres til butikkene','Kunden kjøper og bruker varen','Avfallet samles inn og sorteres','Materialene går til gjenvinning'
      ], f:'Gjenvunnet materiale kan bli råvare igjen – derfor kalles det et kretsløp.' },
      { type:'fill', id:'t1-fill', nivaa:2, tittel:'Fyll inn: vare, gods og fraktavtale', tekst:'Når eiendomsretten til et produkt skal gå fra selger til kjøper, kaller kjøpsloven produktet en [[vare]]. Når varen er under transport, kaller vegfraktloven den [[gods]]. Partene i en fraktavtale er [[avsender]], fraktfører og [[mottaker]]. Det er vanligvis [[selgeren]] som inngår fraktavtalen med transportøren. Når privatpersoner handler, gjelder [[forbrukerkjøpsloven]].', ekstra:['kjøperen','sjåføren','kolli','kjøpsloven'], f:'Når godset er framme, trer mottakeren inn i fraktavtalen.' },
      { type:'sort', id:'t1-s1', nivaa:2, tittel:'Dagligvare, faghandel eller servicehandel?', instr:'Hvilken del av handelsnæringen hører butikken eller varen til?', kat:['Dagligvare','Faghandel','Servicehandel'], items:[
        ['Matbutikk som selger melk, brød og toalettpapir',0,'Varer vi trenger ofte.'],
        ['Kjede som selger maling og tapet',1,'Varer vi kjøper sjeldnere.'],
        ['Møbelbutikk',1,'Møbler kjøper vi sjelden.'],
        ['Klesbutikk',1,'Klær regnes som faghandel.'],
        ['Kiosk på jernbanestasjonen',2,'Lettvint kjøp der folk ferdes.'],
        ['Hurtigmatrestaurant',2,'Bekvemmelighet – servicehandel.'],
        ['Byggevarehus',1,'Byggevarer er faghandel.'],
        ['Butikk som selger sjampo, tannkrem og vaskemiddel',0,'Sanitærartikler er dagligvarer.']
      ]},
      { type:'sort', id:'t1-s2', nivaa:2, tittel:'Lager eller terminal?', instr:'Hvilken type anlegg passer beskrivelsen best?', kat:['Varelager','Godsterminal','Passasjerterminal'], items:[
        ['Varene står på en fast lokasjon til de blir bestilt',0,'Mellomlagring på lokasjon er typisk for varelager.'],
        ['Har plukklager og volumlager',0,'Plukklager og volumlager finner du på varelagre.'],
        ['Pakker sorteres på et sorteringsbånd og sendes ut samme natt',1,'Rask sortering og videresending = godsterminal.'],
        ['Hele konteinere løftes fra båt til bil',1,'Havneterminaler håndterer hele konteinere.'],
        ['Bagasje sorteres og lastes på fly',2,'Bagasjehåndtering hører til passasjerterminaler.'],
        ['Reisende bytter fra tog til buss',2,'Omstigning = passasjerterminal.'],
        ['Kjøper inn store volum fra fabrikker i utlandet',0,'Det er sentrallageret (et varelager) som kjøper inn.']
      ]},
      { type:'quiz', id:'t1-q2', nivaa:3, tittel:'Tenk som en logistikkplanlegger', sp:[
        { q:'En nettbutikk selger klær fra en fabrikk i Asia til kunder i hele Norge. Hvilke anlegg trengs mellom fabrikk og kunde?', a:['Bare en butikk','Lager og terminaler i flere ledd, med transport mellom dem','Bare en passasjerterminal','Ingen – fabrikken sender direkte i postkassen'], r:1, f:'Varene mellomlagres og sorteres flere ganger før de når kunden.' },
        { q:'Hvorfor kalles det et vare«kretsløp» og ikke en vare«kjede»?', a:['Fordi varene kjøres i ring','Fordi brukte produkter går til gjenvinning og kan bli råvarer igjen','Fordi lastebilene kjører samme rute','Fordi alle varer selges to ganger'], r:1, f:'Gjenvinning kobler slutten tilbake til starten.' },
        { q:'Hvem trer inn i fraktavtalen når godset er framme?', a:['Selgeren','Mottakeren','Banken','Produsenten'], r:1, f:'Når godset er levert, trer avsenderen ut og mottakeren inn i fraktavtalen.' },
        { q:'En logistikkoperatør i Norge skal frakte varer til Sverige. Hvilket regelverk gjelder?', a:['Bare norsk lov','Norsk lov og i tillegg internasjonalt regelverk','Bare svensk lov','Ingen regler'], r:1, f:'Yrkessjåfører må forholde seg til internasjonale regler når de er utenlands.' }
      ]},
      { type:'reflect', id:'t1-r1', nivaa:3, tittel:'Forklar: Fra fabrikk til butikkhylle', q:'Velg en vare du har kjøpt nylig (for eksempel et par sko). Forklar veien den har gått fra råvare til butikk – og hva som skjer når du er ferdig med den. Bruk begrepene vare, gods, lager, terminal og fraktavtale.', punkter:[
        'Råvaren kommer fra en primærnæring',
        'Industrien lager ferdigvaren',
        'Varen mellomlagres på ett eller flere lagre',
        'Under transport er varen gods, og det er inngått en fraktavtale',
        'Godset sorteres på terminaler på veien',
        'Varen selges i butikken (dagligvare, faghandel eller servicehandel)',
        'Til slutt går produktet til gjenvinning'
      ]}
    ]
  },
  /* ================================================================ T2 */
  {
    id: 't2', lok: 'A-02', tittel: 'Lagertyper og lagerstyring',
    kort: 'Sentrallager, regionlager og butikklager, ERP- og WMS-systemer, hovedprosessene på et lager og bestillingspunkt.',
    bok: 'Læreboka 1.3 (s. 12–20)',
    mal: ['forklare forskjellen på sentrallager, regionlager og butikklager','forklare hva ERP, OLFI og WMS er','nevne de fire hovedprosessene et lager må styre','regne ut lagersaldo og bestillingspunkt, og forklare sikkerhetslager'],
    punkter: [
      'Et <b>lager</b> er et areal for oppbevaring av varer over kortere eller lengre tid.',
      '<b>Butikklager:</b> der vi selv plukker varer i butikken, eller der betjeningen plukker en netthandel. <b>Grossistlager</b> (regionlager): forsyner butikkene. <b>Sentrallager:</b> kjøper inn fra fabrikker i inn- og utland og forsyner regionlagrene.',
      'Sentrale innkjøp gir <b>volumrabatter</b> sammenlignet med at hver butikk kjøper små kvanta.',
      'I dag er lagerstyring en del av <b>ERP-systemer</b> (ressursforvaltningssystemer): en database med moduler for blant annet regnskap, personal, transport, dokumentstyring og en <b>OLFI-modul</b> (ordre, lager, fakturering, innkjøp). <b>WMS</b> er spesialiserte lagersystemer.',
      'De fire <b>hovedprosessene</b>: innkjøp og etterfylling av volumlager, etterfylling av plukklager fra volumlager, mottak av kundeordrer og ordreplukk.',
      '<b>Ledetid</b> = tida fra bestilling til leveranse. Sentrallagre har ofte lange ledetider (varer med båt fra Asia kan bruke to måneder), regionlagre korte.',
      'Hver vare har en <b>lokasjon</b>. Skanning ved uttak og påfyll holder <b>lagersaldoen</b> oppdatert. Ved <b>bestillingspunktet</b> lager systemet et innkjøpsforslag. Et <b>sikkerhetslager</b> er en buffer mot forsinkelser, økt salg og feil i lagersaldoen.'
    ],
    ndla: [
      ['Hva er lagerstyring?', 'hva-er-lagerstyring/e0fce0eef4', 'Fagstoff'],
      ['Elektroniske lagerstyringssystemer', 'elektroniske-lagerstyringssystemer/ede16cebac', 'Fagstoff'],
      ['Klargjøring av lager for innkjøp', 'klargjoring-av-lager-for-innkjop/3178234cd7', 'Fagstoff'],
      ['Bestillingspunkt og sikkerhetslager', 'bestillingspunkt-og-sikkerhetslager/9dd06bee36', 'Fagstoff']
    ],
    arbeidsbok: '1.7, 1.8, 1.13, 1.14, 1.15, 1.16, 1.25, 1.29',
    aktiviteter: [
      { type:'voks', id:'t2-voks', tittel:'Systemet vet bare det du forteller det', tekst:['Lagerstyringssystemet er ikke smartere enn det vi taster og skanner inn. Hopper du over én skanning fordi det er travelt, viser saldoen feil.','En feil saldo kan bety at det bestilles for sent – og at butikkene går tomme. Eller at det bestilles for mye, og lageret fylles opp med varer ingen trenger.','Gode vaner er ofte små: skann hver gang, også når du har dårlig tid.'], sporsmal:['Hvilke snarveier frister når det er travelt på jobb eller på skolen?','Hva kan konsekvensen bli hvis alle tar den samme snarveien?'], handling:'Velg én liten rutine du skal gjøre riktig hver gang denne uka – uansett tempo.' },
      { type:'flash', id:'t2-flash', tittel:'Begrepskort: lagertyper og lagerstyring', kort:[
        ['Lager','Et areal for oppbevaring av varer over kortere eller lengre tid.'],
        ['Butikklager (detaljistlager)','Lageret i butikken. Kunden plukker selv, eller betjeningen plukker en nettbestilling.'],
        ['Grossistlager / regionlager','Forsyner butikkene i en region og bestiller fra sentrallageret.'],
        ['Sentrallager','Kjøper inn store volum fra fabrikker i inn- og utland og forsyner regionlagrene.'],
        ['Volumrabatt','Lavere pris per enhet fordi man kjøper store mengder.'],
        ['ERP-system','Ressursforvaltningssystem: en database med mange programmoduler.'],
        ['OLFI-modul','Modulen i ERP som håndterer ordre, lager, fakturering og innkjøp.'],
        ['WMS','Warehouse Management System – spesialisert datasystem for lager og vareformidling.'],
        ['Lokasjon','Lageradressen til en vare.'],
        ['Lagersaldo','Hvor mange enheter som står på en lokasjon akkurat nå (restbeholdning).'],
        ['Ledetid','Tida fra en vare bestilles til den er levert. Kalles også leveringstid.'],
        ['Bestillingspunkt','Saldoen der systemet foreslår å bestille nye varer.'],
        ['Sikkerhetslager','Buffer mot forsinket levering, økt etterspørsel og feilregistrert saldo.'],
        ['Avrop','Innkjøperen godtar bestillingsforslaget fra systemet uten endringer.']
      ]},
      { type:'match', id:'t2-m1', nivaa:1, tittel:'Koble lagertype og oppgave', instr:'Koble lagertypen med det den gjør.', par:[
        ['Sentrallager','Kjøper inn fra fabrikker i inn- og utland'],
        ['Regionlager','Forsyner butikkene i sin region'],
        ['Butikklager','Kunden plukker varene selv'],
        ['Volumlager','Hele paller lagret høyt i reolen'],
        ['Plukklager','Varer i golvhøyde klare til plukk']
      ]},
      { type:'quiz', id:'t2-q1', nivaa:1, tittel:'Grunnbegreper i lagerstyring', sp:[
        { q:'Hva er en lokasjon?', a:['Et kontor på lageret','Lageradressen til en vare','En lastebilrute','En type pall'], r:1, f:'Hver vare har sin egen lageradresse.' },
        { q:'Hva skjer med lagersaldoen når en vare plukkes og skannes?', a:['Den går opp','Den går ned','Den blir null','Ingenting'], r:1, f:'Hvert uttak trekkes fra, hvert påfyll legges til.' },
        { q:'Hva er ledetid?', a:['Tida det tar å plukke en ordre','Tida fra bestilling til leveranse','Arbeidstida til lederen','Tida en vare er holdbar'], r:1, f:'Noen kaller det også leveringstid.' },
        { q:'Hvor bestiller et regionlager varene sine fra?', a:['Fra sentrallageret','Direkte fra kundene','Fra butikkene','Fra en passasjerterminal'], r:0, f:'Regionlagrene bestiller fra sentrallageret med korte ledetider.' },
        { q:'Hva betyr WMS?', a:['Warehouse Management System','World Mail Service','Weight Measure Standard','Work Monitoring Software'], r:0, f:'Et spesialisert system for lagerstyring.' }
      ]},
      { type:'tf', id:'t2-tf', nivaa:1, tittel:'Sant eller usant: lagerstyring', ps:[
        ['Et ERP-system består av en database med flere programmoduler.', true, 'For eksempel regnskap, personal, transport, dokumentstyring og OLFI.'],
        ['OLFI står for ordre, lager, fakturering og innkjøp.', true, 'Det var de fire modulene i de første lagerstyringssystemene.'],
        ['Regionlagrene kjøper vanligvis inn direkte fra fabrikker i Asia.', false, 'Det er sentrallageret som kjøper fra industrien. Regionlagrene kjøper fra sentrallageret.'],
        ['Varer som kommer med båt fra Asia kan ha en ledetid på rundt to måneder.', true, 'Derfor må sentrallageret bestille i god tid.'],
        ['Et sikkerhetslager hjelper bare hvis leverandøren er forsinket.', false, 'Det hjelper også ved økt etterspørsel og hvis saldoen er registrert feil.'],
        ['Datasystemet bestemmer alene hva som skal kjøpes inn.', false, 'Innkjøperen godtar, endrer eller forkaster forslaget.'],
        ['Er plukkplassen tom og det ikke er flere varer på volumlageret, må det lages en innkjøpsordre.', true, 'Finnes det varer på volumlageret, lages i stedet en etterfyllingsordre.'],
        ['Finner du feil ved mottakskontrollen, skrives det en avviksrapport før varene ryddes inn.', true, 'Avviksrapporten må behandles før varene er klare.']
      ]},
      { type:'calc', id:'t2-c1', nivaa:1, gen:'saldo', tittel:'Regn ut lagersaldoen', antall:5 },
      { type:'order', id:'t2-o1', nivaa:2, tittel:'Hovedprosessene på et lager', instr:'Sett hovedprosessene i den rekkefølgen varene går gjennom lageret.', steg:[
        'Innkjøp av varer og etterfylling av volumlageret','Etterfylling av plukklageret fra volumlageret','Mottak av kundeordrer','Ordreplukk'
      ], f:'Hver hovedprosess kan deles i mange delprosesser – noen manuelle, noen styrt av datasystemet.' },
      { type:'fill', id:'t2-fill', nivaa:2, tittel:'Fyll inn: slik vet systemet når det skal bestille', tekst:'Hver vare har sin egen [[lokasjon]]. Når en vare plukkes, skannes den, og [[lagersaldoen]] går ned. Når saldoen når [[bestillingspunktet]], lager systemet et forslag til innkjøp. Tida fra bestilling til varene kommer, kalles [[ledetid]]. For å ikke gå tom ved forsinkelser har lageret et [[sikkerhetslager]]. Godtar innkjøperen forslaget uten endringer, kalles det et [[avrop]].', ekstra:['volumrabatt','plukkliste','ordrebekreftelse'] },
      { type:'calc', id:'t2-c2', nivaa:2, gen:'bp', tittel:'Finn bestillingspunktet', antall:5 },
      { type:'order', id:'t2-o2', nivaa:2, tittel:'Klargjøring av regionlageret for plukk', instr:'Sett stegene fra innkjøp til varene står klare på lokasjon i riktig rekkefølge.', steg:[
        'Kjøp inn nye varer fra sentrallageret og lokale leverandører','Ta imot varene','Kontroller de mottatte varene','Er noe galt: skriv avviksrapport og følg den opp','Rydd inn varene på riktig lokasjon'
      ], f:'Først når varene er kontrollert og ryddet inn, er de klare til plukk.' },
      { type:'quiz', id:'t2-q2', nivaa:2, tittel:'Innkjøp og bestilling', sp:[
        { q:'Et lager selger i snitt 1 kartong per dag, og ledetida er 5 dager. Hvor bør bestillingspunktet ligge (uten sikkerhetslager)?', a:['1 kartong','5 kartonger','10 kartonger','0 kartonger'], r:1, f:'1 × 5 = 5 kartonger.' },
        { q:'Toalettpapir selger jevnt hele året. Hva gjør innkjøperen med bestillingsforslaget?', a:['Gjør avrop – godtar forslaget','Halverer det alltid','Ignorerer det','Ringer kundene'], r:0, f:'For jevne varer godtar innkjøperen som regel forslaget.' },
        { q:'Utendørs husmaling selger mest om våren. Hva må innkjøperen gjøre?', a:['Gjøre avrop som vanlig','Justere forslaget for sesongsvingninger','Slutte å selge maling','Bestille like mye hele året'], r:1, f:'Systemet vet ikke om sesongen – det må innkjøperen tenke på.' },
        { q:'Hvorfor kjøper kjedene inn sentralt?', a:['For å få volumrabatter og færre små transporter','For at butikkene skal slippe å selge','Fordi loven krever det','For å få lengre ledetid'], r:0, f:'Store innkjøp gir lavere pris per enhet.' },
        { q:'En butikk selger i snitt 3 av en vare per dag, og ledetida er 3 dager. Lageret vil ha et sikkerhetslager på én dags salg. Hvor ligger bestillingspunktet?', a:['6','9','12','15'], r:2, f:'Uten sikkerhetslager: 3 × 3 = 9. Med én dags salg (3) ekstra: 9 + 3 = 12.' },
        { q:'Hvilken modul i et ERP-system håndterer ordre, lager, fakturering og innkjøp?', a:['Personalmodulen','Regnskapsmodulen','OLFI-modulen','Dokumentstyringsmodulen'], r:2, f:'OLFI = Ordre, Lager, Fakturering, Innkjøp.' }
      ]},
      { type:'calc', id:'t2-c3', nivaa:3, gen:'bpsl', tittel:'Bestillingspunkt med sikkerhetslager', antall:5 },
      { type:'calc', id:'t2-c4', nivaa:3, gen:'dager', tittel:'Hvor lenge varer lageret?', antall:4 },
      { type:'sim', id:'t2-sim', nivaa:3, tittel:'Simulering: Ikke gå tom!' },
      { type:'reflect', id:'t2-r1', nivaa:3, tittel:'Forklar: Når skal grossisten bestille?', q:'Du har sommerjobb i innkjøpsavdelingen på et regionlager. En ny kollega spør: «Hvordan vet vi egentlig når vi må bestille mer av en vare?» Forklar det for kollegaen – og bruk fagbegrepene.', punkter:[
        'Hver vare har en lokasjon, og saldoen registreres per lokasjon',
        'Skanning ved hvert uttak og påfyll holder lagersaldoen oppdatert',
        'Hver vare har et bestillingspunkt basert på salg og ledetid',
        'Systemet lager innkjøpsforslag når saldoen når bestillingspunktet',
        'Innkjøperen godtar (avrop), endrer (f.eks. sesong) eller forkaster forslaget',
        'Et sikkerhetslager gir buffer mot forsinkelser, økt salg og feil saldo'
      ]}
    ]
  },
  /* ================================================================ T3 */
  {
    id: 't3', lok: 'B-01', tittel: 'Varemottak og kontroll',
    kort: 'De tre kontrollene i varemottaket: kjøpsavtalen, fraktavtalen og pallene – og hva du gjør ved skader.',
    bok: 'Læreboka 1.3 – kontroll av varer og lastbærere (s. 20–22)',
    mal: ['gjennomføre de tre kontrollene i et varemottak','krysse varer mot pakkseddel og faktura','skrive riktig merknad i fraktbrevet ved skade, manko og tidsgaranti','forklare hvorfor pallene har verdi, og hva som skjer ved retur og leie av paller'],
    punkter: [
      'I varemottaket gjør du <b>tre kontroller</b>: av <b>kjøpsavtalen</b> (fikk vi det vi bestilte?), av <b>fraktavtalen</b> (er godset skadet under transport?) og av <b>lastbærerne</b> (er pallene hele?).',
      '<b>Kjøpsavtalen:</b> kryss varene kolli for kolli mot pakkseddelen (eller ordren). Når fakturaen kommer, sjekker du at den bare inneholder det du har mottatt. Med EDI eller skanning kan det gjøres i én kontroll.',
      '<b>Fraktavtalen:</b> transportøren må erstatte skade som skjer under transport. Erstatningen regnes ut fra <b>vekta</b> på det skadde godset – skriv den i <b>merknadsrubrikken</b> i fraktbrevet, og få sjåføren til å signere. Ved <b>tidsgaranti</b> noterer du ankomsttida.',
      '<b>Skjulte skader</b> som oppdages når emballasjen åpnes, meldes straks til transportøren med en <b>besiktigelsesrapport</b>. Fristene er korte. <b>Brutt emballasje</b> kan bety at noe er tatt ut – da må kontrollen være ekstra grundig.',
      '<b>Europaller</b> har verdi. Leverandøren fakturerer ofte pallene i tillegg til varene (f.eks. 33 paller × 65 kr = 2 145 kr). Returnerte paller skal <b>godskrives</b>. Sender du paller videre til egne kunder, må du fakturere dem videre.',
      'Noen bedrifter <b>leier paller</b> (f.eks. fra CHEP). Da sorterer du bare ut skadde paller, og utleieren tar seg av resten.',
      'Har leverandøren sendt <b>mer enn du bestilte</b>, kan du forhandle om ekstra rabatt – eller leverandøren tar det overskytende i retur og betaler frakten.',
      'For nasjonale sendinger kan det avtales at det ikke lages fraktbrev. Da noterer du for eksempel ankomsttida på pakkseddelen. Mange kvitterer i dag på en <b>PDA</b> i stedet for på papir.'
    ],
    ndla: [
      ['Kontroll av kjøpsavtale', 'kontroll-av-kjopsavtale/f0d37941ee', 'Fagstoff'],
      ['Kontroll av transportavtale', 'kontroll-av-transportavtale/43f859d552', 'Fagstoff']
    ],
    arbeidsbok: '1.17, 1.21',
    aktiviteter: [
      { type:'voks', id:'t3-voks', tittel:'Å si fra – høflig, men tydelig', tekst:['Sjåføren har dårlig tid og vil at du skal kvittere med en gang. Det er lett å bare signere for å slippe bråk.','Men å stå for det du ser, er en del av jobben. Du kan være vennlig og samtidig tydelig: «Jeg forstår at du har det travelt. Jeg skriver bare skaden i fraktbrevet, så er du i gang om et minutt.»','De fleste respekterer en som gjør jobben skikkelig – særlig når det sies på en hyggelig måte.'], sporsmal:['Når synes du det er vanskelig å si fra?','Skriv én setning du kan bruke når noen presser deg til å gjøre noe raskere enn du bør.'], handling:'Øv på setningen din høyt én gang. Det er lettere å si den når det gjelder.' },
      { type:'flash', id:'t3-flash', tittel:'Begrepskort: varemottak', kort:[
        ['Pakkseddel','Liste som følger varene og viser alle artiklene i ordren.'],
        ['Faktura','Regningen fra selgeren. Skal bare inneholde det du har mottatt.'],
        ['Kjøpsavtale','Avtale mellom selger og kjøper om at eiendomsretten til en vare skal gå over til kjøperen.'],
        ['Fraktavtale','Avtale om transport mellom avsender, fraktfører og mottaker.'],
        ['Lastbærer','Det godset står på eller i under transport, f.eks. en europall.'],
        ['Merknadsrubrikk','Feltet i fraktbrevet der du skriver skader, manko, vekt og ankomsttid.'],
        ['Manko','Noe mangler i leveransen.'],
        ['Tidsgaranti','Avtale om at godset skal leveres innen et bestemt tidspunkt.'],
        ['Besiktigelsesrapport','Rapport om skjult skade som sendes straks til transportøren.'],
        ['EDI','Elektronisk utveksling av data mellom bedrifter – varer kan krysses direkte mot faktura.'],
        ['Godskrive','Trekke fra på regningen, f.eks. for paller du returnerer.'],
        ['Palleleie','Avtale der et selskap (f.eks. CHEP) eier og administrerer pallene for deg.']
      ]},
      { type:'quiz', id:'t3-q1', nivaa:1, tittel:'Hva sjekker du i varemottaket?', sp:[
        { q:'Hvilke tre kontroller gjør du i et varemottak?', a:['Farge, pris og merke','Kjøpsavtalen, fraktavtalen og pallene','Bare antall paller','Sjåførens førerkort, bilen og været'], r:1, f:'Kjøpsavtale, fraktavtale og lastbærere.' },
        { q:'Hvem er partene i en kjøpsavtale?', a:['Selger og kjøper','Avsender og fraktfører','Sjåfør og lagerarbeider','Bank og kunde'], r:0, f:'Kjøpsavtalen gjelder mellom selger og kjøper.' },
        { q:'Hva bruker du som grunnlag når du krysser av varene?', a:['Rutekartet','Pakkseddelen eller ordren','Timelisten','Truckførerbeviset'], r:1, f:'Pakkseddelen viser alle artiklene i ordren.' },
        { q:'Hvor skriver du at et kolli er skadet?', a:['På pallen med tusj','I merknadsrubrikken i fraktbrevet','I en SMS til sjefen','Ingen steder'], r:1, f:'Merknaden skal i fraktbrevet – signert av sjåføren.' },
        { q:'Hvorfor sjekker du europallene?', a:['Fordi de har verdi, og en skadet pall kan du måtte betale for','Fordi de skal males','Fordi de skal veies','Det trenger du ikke'], r:0, f:'Europaller faktureres ofte i tillegg til varene.' }
      ]},
      { type:'check', id:'t3-chk1', nivaa:1, tittel:'Kontroller leveransen mot pakkseddelen', instr:'Du tar imot en leveranse. Sammenlign pakkseddelen med det du har telt og sett. Kryss av radene der det er avvik.', dok:'Pakkseddel – ordre 40213', meta:'Fra: Nordgrossisten AS · Til: Lagerhuset Sola', kolonner:['Vare','På pakkseddel','Mottatt','Det du ser'], rader:[
        { c:['Kaffe 500 g, kartong à 12','10 kartonger','10 kartonger','Alt i orden'], avvik:false, f:'Antall stemmer og kartongene er hele.' },
        { c:['Oppvasktabletter, kartong à 6','8 kartonger','6 kartonger','Hele kartonger'], avvik:true, f:'Det mangler 2 kartonger (manko).' },
        { c:['Tørkerull, pakke à 8','20 pakker','20 pakker','To pakker er våte'], avvik:true, f:'Våte pakker er skadet – noter i fraktbrevet.' },
        { c:['Hermetiske tomater, brett à 24','5 brett','5 brett','Alt i orden'], avvik:false, f:'Stemmer.' },
        { c:['Sjampo 250 ml, kartong à 12','4 kartonger','4 kartonger med balsam','Feil vare'], avvik:true, f:'Feil vare er et brudd på kjøpsavtalen.' },
        { c:['Europall','3 paller','3 paller','Én pall har knekt bord'], avvik:true, f:'Skadet pall – kontroll av lastbærer.' },
        { c:['Lettmelk 1 l, rullekonteiner','2 konteinere','2 konteinere','Plasten rundt er hel'], avvik:false, f:'I orden.' },
        { c:['Kopipapir A4, eske à 5 pakker','10 esker','12 esker','Hele esker'], avvik:true, f:'Du har fått mer enn bestilt. Forhandle om rabatt eller returner det overskytende.' }
      ], etter:'Avvik på antall og feil vare gjelder kjøpsavtalen. Skader under transport noteres i fraktbrevet med vekt. Skadde paller gjelder lastbæreren.' },
      { type:'order', id:'t3-o1', nivaa:1, tittel:'Kontroll mot pakkseddel og faktura', instr:'Sett stegene i kontrollen av kjøpsavtalen i riktig rekkefølge.', steg:[
        'Varene ankommer sammen med pakkseddelen','Kryss av kolli for kolli mot pakkseddelen','Noter avvik (manko eller feil vare)','Fakturaen kommer fra leverandøren','Sjekk at fakturaen bare inneholder det du har mottatt'
      ]},
      { type:'sort', id:'t3-s1', nivaa:2, tittel:'Kjøpsavtale, fraktavtale eller lastbærer?', instr:'Hvilken kontroll gjør du når du gjør dette?', kat:['Kjøpsavtalen','Fraktavtalen','Lastbæreren'], items:[
        ['Sjekker at riktig antall av hver artikkel er levert',0,'Antall og artikler handler om kjøpet.'],
        ['Oppdager at det er levert feil vare',0,'Feil vare = brudd på kjøpsavtalen.'],
        ['Sjekker at fakturaen bare inneholder det som er mottatt',0,'Faktura hører til kjøpsavtalen.'],
        ['Ser at et kolli er knust',1,'Transportskade er transportørens ansvar.'],
        ['Noterer ankomsttidspunkt ved tidsgaranti',1,'Tidsgarantien er en del av fraktavtalen.'],
        ['Noterer vekta på skadd gods',1,'Erstatningen beregnes etter vekt.'],
        ['Ser at en europall har knekt bord',2,'Skadde paller kan du måtte betale for.'],
        ['Sorterer ut skadde leiepaller fra CHEP',2,'Ved palleleie sorterer du bare ut skadde paller.']
      ]},
      { type:'tf', id:'t3-tf', nivaa:2, tittel:'Sant eller usant: skader, paller og frister', ps:[
        ['Transportørens erstatning for skadd gods regnes ut fra varens verdi.', false, 'Den regnes ut fra vekta. Derfor skriver du vekta i fraktbrevet.'],
        ['Brutt emballasje kan være tegn på at noe er tatt ut av kolliet.', true, 'Da skal mottakskontrollen være ekstra grundig.'],
        ['En skjult skade kan du melde når det passer, for eksempel om en måned.', false, 'Skjulte skader skal meldes straks med en besiktigelsesrapport.'],
        ['Returnerer du paller, skal leverandøren godskrive deg for dem.', true, 'Du skal ikke betale for paller du har sendt tilbake.'],
        ['Sender du europaller videre til dine egne kunder, bør du fakturere dem videre.', true, 'Ellers må du selv stå for kostnaden.'],
        ['Med EDI kan varene krysses direkte mot fakturaen.', true, 'Da slipper man én av to kontroller.'],
        ['Har leverandøren sendt mer enn du bestilte, må du alltid betale for alt.', false, 'Du kan forhandle om ekstra rabatt, eller leverandøren tar det overskytende i retur.'],
        ['For nasjonale sendinger kan avsender og fraktfører avtale at det ikke skal lages fraktbrev.', true, 'Da noterer du for eksempel ankomsttid på pakkseddelen.']
      ]},
      { type:'calc', id:'t3-c1', nivaa:2, gen:'pall', tittel:'Hva er pallene verdt?', antall:4 },
      { type:'calc', id:'t3-c2', nivaa:3, gen:'pallretur', tittel:'Godskriving av returpaller', antall:4 },
      { type:'case', id:'t3-case', nivaa:3, tittel:'Case: Sjåføren har dårlig tid', intro:'Du jobber i varemottaket. En lastebil leverer 12 paller. Én pall er tydelig klemt, og to esker er våte.', steg:[
        { q:'Sjåføren sier: «Bare kvitter, jeg har dårlig tid. Det går sikkert bra.» Hva gjør du?', valg:[
          { t:'Kvitterer uten merknad – det er jo bare én pall', ok:false, f:'Uten merknad har du ingen bevis for at skaden skjedde under transport.' },
          { t:'Skriver skaden og vekta på det skadde godset i merknadsrubrikken, og ber sjåføren signere', ok:true, f:'Riktig. Erstatningen beregnes etter vekt, og signaturen bekrefter skaden.' },
          { t:'Nekter å ta imot hele leveransen', ok:false, f:'De andre 11 pallene er i orden. Ta imot og anmerk skaden.' }
        ]},
        { q:'Plastfilmen rundt én av pallene er kuttet opp og teipet igjen. Hva gjør du?', valg:[
          { t:'Ingenting – teipen holder', ok:false, f:'Brutt emballasje kan bety at noe er tatt ut.' },
          { t:'Teller ekstra nøye på denne pallen og noterer eventuell manko i fraktbrevet', ok:true, f:'Riktig. Brutt emballasje krever en ekstra grundig kontroll.' },
          { t:'Sender pallen i retur uten å åpne den', ok:false, f:'Kontroller først hva som mangler, så kan det dokumenteres.' }
        ]},
        { q:'Neste dag åpner dere en eske som så hel ut. Innholdet er knust. Hva gjør du?', valg:[
          { t:'Skriver straks en besiktigelsesrapport og sender den til transportøren', ok:true, f:'Riktig. Rapporten går videre til transportørens forsikringsselskap.' },
          { t:'Kaster varene og sier ingenting', ok:false, f:'Da mister dere både varene og retten til erstatning.' },
          { t:'Venter til fakturaen kommer og trekker det fra der', ok:false, f:'Fristene er korte. Skjulte skader skal meldes straks.' }
        ]}
      ]},
      { type:'reflect', id:'t3-r1', nivaa:3, tittel:'Lag en sjekkliste for varemottaket', q:'Du skal lære opp en ny lærling i varemottaket. Skriv en sjekkliste med korte forklaringer: Hva skal lærlingen gjøre når en lastebil kommer med varer?', punkter:[
        'Kontroll av kjøpsavtalen: kryss kolli for kolli mot pakkseddel/ordre',
        'Senere: sjekk at fakturaen bare inneholder det som er mottatt',
        'Kontroll av fraktavtalen: se etter skader på kolli og emballasje',
        'Skriv skade/manko med vekt i merknadsrubrikken, og få sjåføren til å signere',
        'Noter ankomsttid ved tidsgaranti',
        'Kontroller pallene (lastbærerne) – skadde paller kan koste penger',
        'Skjulte skader: besiktigelsesrapport til transportøren straks'
      ]}
    ]
  },
  /* ================================================================ T4 */
  {
    id: 't4', lok: 'B-02', tittel: 'Vareplassering og innrydding',
    kort: 'Lagersoner, F-, D- og T-pak, plukklager og volumlager, A- og C-varer, slow-movers, FIFO, LIFO og crossdocking.',
    bok: 'Læreboka 1.3 – tildeling av lageradresser og plukkprinsipper (s. 22–24)',
    mal: ['forklare reglene datasystemet bruker for å gi en vare en lokasjon','forklare F-, D- og T-pak og forskjellen på plukklager og volumlager','forklare hvor A-varer og C-varer skal stå, og hvorfor slow-movers ofte lagres sentralt','velge riktig prinsipp: holdbarhetsdato, FIFO eller LIFO/crossdocking'],
    punkter: [
      'Et dataprogram finner riktig lokasjon etter faste regler: <b>lagersone</b> (frys, kjøl, sval, tørr) → er lageret tomt for varen? (da rett til plukksone) → <b>lagernivå</b> (F-, D- eller T-pak) → ledig adresse → tildel lokasjon.',
      '<b>F-pak</b> = forbrukerforpakning, <b>D-pak</b> = detaljistforpakning, <b>T-pak</b> = transportforpakning.',
      'Dagligvarelagre har et <b>plukklager</b> med D-pak i golvplan (oftest de to laveste reolnivåene) og et <b>volumlager</b> med T-pak i høyden (også kalt mengdelager, støt-, høydelager eller overstock).',
      '<b>A-varer</b> plukkes oftest og står nærmest oppstillingsområdet. <b>C-varer</b> (slow-movers) står lengst unna. Da blir det mange korte turer og få lange.',
      'For å unngå <b>ukurans</b> (at varer går ut på dato eller blir umoderne) lagres slow-movers ofte bare på sentrallageret. Da blir ledetida for disse varene lengre, men kostnadene og kapitalbindingen i lager blir lavere.',
      'Varer med <b>holdbarhetsdato</b> ryddes inn og plukkes etter dato. Varer uten dato: <b>FIFO</b> (first in – first out). Svært høyfrekvente varer (f.eks. toalettpapir) <b>crossdockes</b> uten lokasjon etter <b>LIFO</b> (last in – first out).',
      'Store lagre automatiseres stadig mer, for eksempel med det norskutviklede systemet <b>AutoStore</b>.'
    ],
    ndla: [
      ['Plassering av varer', 'plassering-av-varer/0d2fb4ec5d', 'Fagstoff'],
      ['Innrydding av varer på lokasjon', 'innrydding-av-varer-pa-lokasjon/dba26dc4b2', 'Fagstoff'],
      ['Ulike begreper som betyr det samme', 'ulike-begreper-som-betyr-det-samme/9a4df73cf1', 'Fagstoff']
    ],
    arbeidsbok: '1.10, 1.16, 1.27, 1.30',
    aktiviteter: [
      { type:'voks', id:'t4-voks', tittel:'Orden er en vane – og en tjeneste', tekst:['Når du rydder en vare inn på riktig lokasjon, med riktig dato fremst, gjør du ikke bare din egen jobb lettere. Du hjelper den som skal plukke etter deg.','Rot sprer seg. En pall på feil plass fører til leting, feilplukk og irritasjon – ofte for noen andre enn den som satte den der.','En god regel på lageret og i livet: Forlat plassen slik du selv vil finne den.'], sporsmal:['Hvor i hverdagen merker du at andre har ryddet – eller ikke ryddet – etter seg?','Hva er én ting du kan gjøre for at neste person får det lettere?'], handling:'Rydd én plass ekstra i dag – på verkstedet, i klasserommet eller hjemme.' },
      { type:'flash', id:'t4-flash', tittel:'Begrepskort: plassering og innrydding', kort:[
        ['F-pak','Forbrukerforpakning – den enkeltvaren kunden kjøper.'],
        ['D-pak','Detaljistforpakning – pakningen butikken bestiller.'],
        ['T-pak','Transportforpakning – f.eks. en hel pall.'],
        ['Plukklager','Lagernivå i golvplan med D-pak, der det plukkes.'],
        ['Volumlager','Lagernivå i høyden med T-pak. Også kalt mengdelager, støtlager, høydelager eller overstock.'],
        ['Lagersone','Del av lageret med egne krav: frys, kjøl, sval eller tørr.'],
        ['A-varer','Varer som plukkes oftest – nærmest oppstillingsområdet.'],
        ['C-varer / slow-movers','Varer med lav omløpshastighet – lengst unna.'],
        ['Ukurans','At varer ikke kan selges fordi de går ut på dato eller blir umoderne.'],
        ['FIFO','First in – first out: det som kom først, går ut først.'],
        ['LIFO','Last in – first out: det som kom sist, går ut først.'],
        ['Crossdocking','Varen går rett videre uten å få lokasjon på lageret.'],
        ['AutoStore','Norskutviklet automatisk lagersystem der roboter henter varer i kasser.']
      ]},
      { type:'hotspot', id:'t4-hs1', nivaa:1, tittel:'Finn fram på lageret', instr:'Plantegningen viser et dagligvarelager. Trykk på riktig område.', svg:SVG_LAGER, sp:[
        { q:'Hvor tar du imot og kontrollerer varene som kommer inn?', z:'mottak', f:'Varemottaket ligger ved portene der varene kommer inn.' },
        { q:'Hvor venter ferdigplukkede ordrer på lastebilen?', z:'oppstilling', f:'Oppstillingsområdet ligger ved utgående porter.' },
        { q:'Hvor bør A-varene (de som plukkes oftest) stå?', z:'a', f:'Nærmest oppstillingsområdet – da blir de mange turene korte.' },
        { q:'Hvor bør C-varene (slow-movers) stå?', z:'c', f:'Lengst unna – de plukkes sjelden.' },
        { q:'Hvor rydder du inn iskrem?', z:'frys', f:'Iskrem skal i frysesonen.' },
        { q:'Hvor rydder du inn yoghurt?', z:'kjol', f:'Meieriprodukter skal i kjølesonen.' },
        { q:'Hvor lader truckene?', z:'lade', f:'Ladestasjonen er merket med lyn.' },
        { q:'Hvor oppbevares tomme paller og emballasje?', z:'pall', f:'Pall- og emballasjelageret.' }
      ]},
      { type:'hotspot', id:'t4-hs2', nivaa:1, tittel:'Plukklager og volumlager i reolen', instr:'Tegningen viser en pallreol. Trykk på riktig del av reolen.', svg:SVG_REOL, sp:[
        { q:'Hvor ligger plukklageret?', z:'plukk', f:'Plukklageret er de to laveste nivåene, i golvplan.' },
        { q:'Hvor står hele paller med T-pak i reserve?', z:'volum', f:'Volumlageret ligger i høyden.' },
        { q:'Hvor henter plukkeren D-pak til kundeordren?', z:'plukk', f:'D-pak plukkes fra plukklageret.' },
        { q:'Hvor er «overstock» eller «støtlageret»?', z:'volum', f:'Støtlager og overstock er andre ord for volumlager.' }
      ]},
      { type:'match', id:'t4-m1', nivaa:1, tittel:'F-, D- og T-pak', instr:'Koble forkortelsen med riktig betydning og eksempel.', par:[
        ['F-pak','Forbrukerforpakning – én boks yoghurt'],
        ['D-pak','Detaljistforpakning – en kartong med 12 bokser'],
        ['T-pak','Transportforpakning – en hel pall med kartonger']
      ]},
      { type:'order', id:'t4-o1', nivaa:2, tittel:'Slik tildeler systemet en lokasjon', instr:'Sett reglene for tildeling av lageradresse i riktig rekkefølge.', steg:[
        'Finn riktig lagersone for varen (frys, kjøl, sval eller tørr)',
        'Er lageret tomt for varen? Da går den rett til plukksonen',
        'Avgjør hvilket lagernivå varen hører til (F-, D- eller T-pak)',
        'Let etter en ledig lageradresse i sonen på dette nivået',
        'Gi varen den ledige lokasjonen'
      ]},
      { type:'sort', id:'t4-s1', nivaa:2, tittel:'Hvilket plukkprinsipp?', instr:'Velg prinsippet som skal brukes ved innrydding og plukk.', kat:['Holdbarhetsdato','FIFO','LIFO / crossdock'], items:[
        ['Lettmelk',0,'Melk har kort holdbarhet – plukkes etter dato.'],
        ['Kjøttdeig',0,'Ferskvare med holdbarhetsdato.'],
        ['Yoghurt',0,'Har holdbarhetsdato.'],
        ['Skruer i esker',1,'Ingen holdbarhetsdato – FIFO.'],
        ['Arbeidshansker',1,'Ingen holdbarhetsdato – FIFO.'],
        ['Kopipapir',1,'Ingen holdbarhetsdato – FIFO.'],
        ['Toalettpapir som kommer fra fabrikken flere ganger om dagen',2,'Svært høyfrekvent – crossdockes etter LIFO.'],
        ['Paller som lastes rett over i biler til regionlagrene samme dag',2,'Ingen lokasjon, rett videre = crossdocking.']
      ]},
      { type:'sort', id:'t4-s2', nivaa:2, tittel:'Plasser varene etter plukkfrekvens', instr:'Hvor bør varen stå i forhold til oppstillingsområdet for transport?', kat:['Nærmest (A)','I midten (B)','Lengst unna (C)'], items:[
        ['Lettmelk – plukkes ca. 400 ganger per dag',0,'Svært ofte → A-vare.'],
        ['Brød – plukkes ca. 300 ganger per dag',0,'Svært ofte → A-vare.'],
        ['Kaffe – plukkes ca. 60 ganger per dag',1,'Middels ofte → B.'],
        ['Oppvaskmiddel – plukkes ca. 40 ganger per dag',1,'Middels ofte → B.'],
        ['Spesialkrydder – plukkes 2 ganger per uke',2,'Sjelden → C-vare.'],
        ['Fondueolje – plukkes 1 gang per uke',2,'Slow-mover → C-vare.']
      ]},
      { type:'tf', id:'t4-tf', nivaa:2, tittel:'Sant eller usant: plassering og innrydding', ps:[
        ['Plukklageret ligger vanligvis i de to laveste reolnivåene.', true, 'Volumlageret ligger i høyden.'],
        ['Slow-movers lagres helst på alle regionlagrene for å få kort ledetid.', false, 'De lagres ofte bare sentralt for å redusere risikoen for ukurans – da blir ledetida lengre.'],
        ['Varer med holdbarhetsdato skal ryddes inn etter FIFO.', false, 'De skal ryddes inn og plukkes etter holdbarhetsdato.'],
        ['Crossdockede varer får ingen lokasjon på lageret.', true, 'De går rett fra innkommende til utgående bil.'],
        ['«Støt» er et ord vi har fått fra svensk.', true, 'Svensk «stöd» betyr støtte – støtlager er volumlager.'],
        ['A-varene bør stå lengst unna utlastingen for å gi plass til andre.', false, 'A-varene står nærmest – da blir de mange turene korte.']
      ]},
      { type:'quiz', id:'t4-q1', nivaa:3, tittel:'Velg riktig prinsipp – og begrunn', sp:[
        { q:'Hvorfor gir det mindre interntransport å plassere A-varer nær oppstillingsområdet?', a:['De varene du plukker oftest, får kortest tur – mange korte turer og få lange','Fordi A-varer er tyngst','Fordi C-varer ikke skal selges','Det gir ikke mindre interntransport'], r:0, f:'Turene ganges med antall plukk.' },
        { q:'Hvorfor lagres slow-movers ofte bare på sentrallageret?', a:['For å redusere risikoen for at de går ut på dato eller blir umoderne','Fordi de er tunge','Fordi de selges mest','Fordi regionlagrene er for store'], r:0, f:'Når ett lager dekker hele landet, går varen oftere ut derfra.' },
        { q:'Hvorfor får toalettpapir som crossdockes ingen lokasjon?', a:['Det tar for stor plass','Det skal ut igjen nesten med en gang – det er bare innom for å samlastes','Det er for billig','Det er ulovlig å lagre'], r:1, f:'Å rydde det inn ville vært unødvendig arbeid.' },
        { q:'En ny vare skal tildeles lokasjon, men lageret er helt tomt for den. Hva sier reglene?', a:['Den skal i volumlageret først','Den skal rett til plukksonen','Den skal returneres','Den skal stå i varemottaket'], r:1, f:'Er lageret tomt for varen, trengs den i plukksonen med en gang.' }
      ]},
      { type:'reflect', id:'t4-r1', nivaa:3, tittel:'Forklar: Ny pall med yoghurt', q:'Det kommer inn en ny pall med yoghurt, men det står fortsatt yoghurt med tidligere dato på lokasjonen. Forklar hvordan du rydder inn den nye pallen – og hvorfor du gjør det slik.', punkter:[
        'Yoghurt skal i kjølesonen',
        'Holdbarhetsdatoen sjekkes og registreres ved mottak og innrydding',
        'Varene med kortest holdbarhet skal plukkes først',
        'Ny pall settes ikke foran eldre varer',
        'Varer som snart går ut på dato, sendes ikke videre til kunder'
      ]}
    ]
  },
  /* ================================================================ T5 */
  {
    id: 't5', lok: 'C-01', tittel: 'Ordre, plukk og klargjøring',
    kort: 'Fra kundeordre til ferdig pall: ordrebekreftelse, plukklister, talestyrt plukk, sammenstilling, emballering og innlasting.',
    bok: 'Læreboka 1.3 – delprosesser, ordre og plukk (s. 16–18 og 25–27)',
    mal: ['beskrive veien fra kundeordre til ferdig pall','forklare hva talestyrt plukk er, og hvordan det foregår','bygge en stabil kundepall og forklare hvorfor den pakkes i strekkfilm','forklare etterfylling og i hvilken rekkefølge pallene lastes inn'],
    punkter: [
      'Kundeordren får en <b>ordrebekreftelse</b>. Da er kjøpsavtalen bindende for begge parter.',
      'På et regionlager splittes butikkordren i <b>fire delordrer</b>: frys, kjøl, tørrvarer og frukt og grønt. Plukklistene sorteres i stigende varenummer, så plukket følger <b>korteste vei</b>. Plukkerne i alle sonene starter samtidig.',
      'Plukkinformasjonen kommer på papir, på skjerm på plukktrucken eller i hodesettet (<b>talestyrt plukk</b> / voicepick). Med «klar» får du neste artikkel, med «gjenta» hører du siste beskjed igjen. Begge hender er fri.',
      'Delordrene <b>sammenstilles</b> på kundepall: <b>tunge varer nederst</b>, lette som topplast. Pallen pakkes i <b>strekkfilm</b> for stabilitet og mot svinn, merkes med kundens navn og adresse og settes på <b>oppstillingsområdet</b>.',
      'Plukkes det rett i <b>rullekonteinere</b>, styrer systemet rekkefølgen så tunge varer kommer nederst. Mange surrer likevel strekkfilm rundt mot svinn.',
      'Frys- og kjølevarer skal ha <b>ubrutt temperaturkjede</b> og står i sin sone til bilen lastes. Mange biler har skillevegger for to–tre temperatursoner.',
      'Pallene stilles opp i <b>innlastingsrekkefølge</b>. Distribusjonssjåføren laster etter <b>LIFO</b> (det som skal leveres sist, inn først), sikrer lasten og kjører ut. Ved levering <b>kvitterer kunden</b> for mottaket.',
      'Tomme plukkplasser <b>etterfylles</b> fra volumlageret (overstock). Er det tomt også der, må det lages en innkjøpsordre.'
    ],
    ndla: [
      ['Mottak av kundeordrer, bekreftelse og klargjøring for plukk', 'mottak-av-kundeordrer-bekreftelse-og-klargjoring-for-plukk/92fe8ade29', 'Fagstoff'],
      ['Plukk, sammenstilling, emballering og oppstilling for transport', 'plukk-sammenstilling-emballering-og-oppstilling-for-transport/a5e684dcfc', 'Fagstoff'],
      ['Etterfyllingsordrer og etterfylling av plukklager', 'etterfyllingsordrer-og-etterfylling-av-plukklager/2dde0bf25a', 'Fagstoff'],
      ['Lagerstyring – hva har du lært?', 'lagerstyring---hva-har-du-lart/e271beaffa', 'Interaktiv'],
      ['Lagerstyring (besøk et lager)', 'lagerstyring/e7f05060c4', 'Oppgave']
    ],
    arbeidsbok: '1.4, 1.8, 1.26',
    aktiviteter: [
      { type:'voks', id:'t5-voks', tittel:'Raskt er bra. Riktig er bedre.', tekst:['På et plukklager går det fort. Mange måles på hvor mange linjer de plukker i timen. Likevel koster én feil ofte mer enn ti sekunder ekstra.','En feil vare på pallen betyr en misfornøyd butikk, en ny transport og noen som må rette opp. Det er bedre å spørre en gang for mye enn å gjette.','Gode kolleger hjelper hverandre også mellom sonene. Det er samme kundeordre, selv om dere plukker hver deres del.'], sporsmal:['Når har du valgt tempo foran kvalitet – og hvordan gikk det?','Hvordan kan du spørre om hjelp uten at det føles flaut?'], handling:'Neste gang du er usikker på en oppgave: spør før du gjør, ikke etter.' },
      { type:'flash', id:'t5-flash', tittel:'Begrepskort: ordre og plukk', kort:[
        ['Ordrebekreftelse','Bekreftelse til kunden på at ordren er mottatt. Fra da er kjøpsavtalen bindende.'],
        ['Delordre','Den delen av en kundeordre som plukkes i én plukksone.'],
        ['Plukkliste','Liste over varene i én sone, sortert for korteste vei.'],
        ['Talestyrt plukk','Plukkbeskjeder i hodesettet («voicepick»). Begge hender er fri.'],
        ['«Klar» og «gjenta»','Kommandoer ved talestyrt plukk: neste artikkel / hør siste beskjed igjen.'],
        ['Sammenstilling','Delordrene fra ulike soner samles til én ferdig kundeordre.'],
        ['Strekkfilm','Plast rundt pallen – stabiliserer lasten og forebygger svinn.'],
        ['Svinn','Varer som forsvinner, f.eks. ved tyveri eller skade.'],
        ['Rullekonteiner','Konteiner på hjul som varene kan plukkes rett i.'],
        ['Oppstillingsområde','Der ferdige paller står klare for transport.'],
        ['Innlastingsrekkefølge','Det som skal leveres sist, lastes inn først.'],
        ['Etterfylling','Varer flyttes fra volumlager til en tom plukkplass.'],
        ['Temperaturkjede','Frys- og kjølevarer skal holde riktig temperatur hele veien – ubrutt.']
      ]},
      { type:'quiz', id:'t5-q1', nivaa:1, tittel:'Plukk og pakking', sp:[
        { q:'Hva er den store fordelen med talestyrt plukk?', a:['Det er gratis','Plukkeren har begge hendene fri','Man slipper å gå','Varene blir lettere'], r:1, f:'Beskjedene kommer i hodesettet.' },
        { q:'Hvorfor pakkes pallen inn i strekkfilm?', a:['For at den skal se fin ut','For å stabilisere pallen og forebygge svinn','For å holde varene varme','For å skjule innholdet for sjåføren'], r:1, f:'Strekkfilm holder lasten sammen og gjør det vanskeligere å stjele.' },
        { q:'Hvor skal de tunge varene stå på kundepallen?', a:['Øverst','Nederst','I midten','Det spiller ingen rolle'], r:1, f:'Tunge varer nederst, lette som topplast.' },
        { q:'Hva står på merkelappen på en ferdig kundepall?', a:['Kundens navn og mottakeradresse','Plukkerens navn','Prisen på varene','Ingenting'], r:0, f:'Merkingen sørger for at pallen kommer til riktig kunde.' },
        { q:'Ved talestyrt plukk sier operatøren «klar». Hva skjer da?', a:['Plukket avsluttes','Systemet gir informasjon om neste artikkel','Ordren slettes','Trucken stopper'], r:1, f:'Med «gjenta» hører man siste beskjed på nytt.' }
      ]},
      { type:'order', id:'t5-o1', nivaa:2, tittel:'Fra ordre til ferdig pall', instr:'Sett stegene i ordreprosessen i riktig rekkefølge.', steg:[
        'Butikken sender en ordre','Kunden får ordrebekreftelse','Ordren splittes i delordrer per plukksone','Varene plukkes i plukksonene','Delordrene sammenstilles på en kundepall','Pallen pakkes i strekkfilm','Pallen merkes med kundens navn og adresse','Pallen settes på oppstillingsområdet','Sjåføren laster etter LIFO og sikrer lasten','Kunden kvitterer for mottaket'
      ]},
      { type:'sort', id:'t5-s0', nivaa:1, tittel:'Hvilken plukksone?', instr:'Butikkordren splittes i fire delordrer. Hvilken plukksone skal varen plukkes i?', kat:['Frys','Kjøl','Tørrvarer','Frukt og grønt'], items:[
        ['Iskrem',0,'Frysevare.'],['Fiskepinner',0,'Frysevare.'],['Lettmelk',1,'Kjølevare.'],['Ost',1,'Kjølevare.'],['Kaffe',2,'Tørrvare.'],['Ris',2,'Tørrvare.'],['Epler',3,'Frukt og grønt.'],['Salat',3,'Frukt og grønt.']
      ]},
      { type:'sort', id:'t5-s1', nivaa:1, tittel:'Bygg en stabil kundepall', instr:'Hvor på pallen hører varen hjemme?', kat:['Nederst','Øverst (topplast)'], items:[
        ['Brett med brusflasker (1,5 l)',0,'Tungt – nederst.'],
        ['Kartonger med hermetikk',0,'Tungt og tåler trykk – nederst.'],
        ['Vaskemiddel i 5-liters kanner',0,'Tungt – nederst.'],
        ['Chipsposer',1,'Lett og knuses lett – topplast.'],
        ['Eggekartonger',1,'Skjørt – øverst.'],
        ['Toalettpapir',1,'Lett og tar stor plass – topplast.']
      ]},
      { type:'fill', id:'t5-fill', nivaa:2, tittel:'Fyll inn: talestyrt plukk', tekst:'Ved talestyrt plukk får plukkeren beskjedene i et [[hodesett]]. Når en artikkel er plukket, sier plukkeren [[klar]], og systemet gir beskjed om neste artikkel. Har plukkeren ikke hørt beskjeden, sier hun [[gjenta]]. Fordelen er at plukkeren har [[begge hender]] fri. Når alle sonene er ferdige, går delordrene til [[sammenstilling]] på kundepallen.', ekstra:['skjerm','stopp','oppstilling'] },
      { type:'tf', id:'t5-tf', nivaa:2, tittel:'Sant eller usant: ordre og plukk', ps:[
        ['Kjøpsavtalen er bindende først når kunden har fått ordrebekreftelse.', true, 'Fra da er både selger og kjøper bundet.'],
        ['Plukklistene sorteres slik at plukkeren går korteste vei.', true, 'Rekkefølgen følger lokasjonene i lageret.'],
        ['Frysevarer skal sammenstilles på pallen tidlig og stå og vente på oppstillingsområdet.', false, 'De står i frysesonen til bilen lastes – temperaturkjeden må være ubrutt.'],
        ['Den ordren som skal leveres først, skal lastes inn først i bilen.', false, 'Den som leveres sist, lastes inn først (LIFO). Den første leveransen skal stå ytterst.'],
        ['Plukkes det i rullekonteinere, trengs det aldri strekkfilm.', false, 'Det er ikke nødvendig for stabiliteten, men mange surrer strekkfilm rundt mot svinn.'],
        ['Når en plukkplass er tom, flyttes en pall fra volumlageret dit.', true, 'Det kalles etterfylling.'],
        ['Ved levering skal kunden kvittere for mottaket.', true, 'Ofte på en PDA.'],
        ['Delordrene til frys, kjøl, tørr og frukt og grønt plukkes etter hverandre, én sone om gangen.', false, 'Plukkerne i alle sonene starter samtidig, så ordren blir ferdig på samme tid.']
      ]},
      { type:'check', id:'t5-chk1', nivaa:2, tittel:'Kontroller pallen før oppstilling', instr:'Du er skiftleder og sjekker en ferdig kundepall før den settes på oppstillingsområdet. Kryss av punktene som ikke er i orden.', dok:'Sjekkliste – kundepall til Coop Sandnes', meta:'Ordre 77812 · Levering kl. 05.30', kolonner:['Kontrollpunkt','Det du ser'], kryss:'Ikke i orden', rader:[
        { c:['Tunge varer','Brus og hermetikk står nederst'], avvik:false, f:'Riktig plassert.' },
        { c:['Skjøre varer','Eggekartongene ligger under kartonger med hermetikk'], avvik:true, f:'Egg skal ligge øverst.' },
        { c:['Emballering','Pallen er pakket i strekkfilm hele veien rundt'], avvik:false, f:'Stabil og sikret mot svinn.' },
        { c:['Merking','Merkelappen har kundenavn, men ingen adresse'], avvik:true, f:'Pallen skal merkes med kundens navn og mottakeradresse.' },
        { c:['Frysevarer','Frysevarene er satt på pallen og har stått i varm sone i 40 minutter'], avvik:true, f:'Temperaturkjeden er brutt. Frysevarer skal vente i frysesonen.' },
        { c:['Delordrer','Delordrene fra tørr og frukt og grønt er med'], avvik:false, f:'Ordren er komplett.' }
      ]},
      { type:'order', id:'t5-o2', nivaa:3, tittel:'Etterfylling med skanner', instr:'Sett skannestegene ved etterfylling av en plukkplass i riktig rekkefølge.', steg:[
        'Skann strekkoden på volumlokasjonen der pallen står','Skann strekkoden på pallen som skal flyttes','Flytt pallen ned til plukkplassen','Skann strekkoden på den nye plukkplassen','Lagersaldoene oppdateres elektronisk'
      ]},
      { type:'case', id:'t5-case', nivaa:3, tittel:'Case: Lasting av distribusjonsbilen', intro:'Bilen skal kjøre til fire butikker i denne rekkefølgen: Sola, Sandnes, Bryne og Egersund. Den har skillevegg mellom frys og tørr.', steg:[
        { q:'Hvilken butikks paller skal lastes inn først?', valg:[
          { t:'Sola – den skal leveres først', ok:false, f:'Da blir Solas paller stående innerst i bilen.' },
          { t:'Egersund – den skal leveres sist', ok:true, f:'Riktig. Det som leveres sist, lastes inn først.' },
          { t:'Det spiller ingen rolle', ok:false, f:'Feil rekkefølge gir mye flytting av paller ute hos kundene.' }
        ]},
        { q:'Frysevarene til Bryne er klare. Når skal de hentes fra frysesonen?', valg:[
          { t:'Med en gang, så de er klare på oppstillingsområdet', ok:false, f:'Da brytes temperaturkjeden.' },
          { t:'Når de skal lastes inn i frysedelen av bilen', ok:true, f:'Riktig. De står i frysesonen til lasting.' },
          { t:'Etter at bilen har kjørt', ok:false, f:'Da kommer de ikke med.' }
        ]},
        { q:'Under lasting ser du at en pall til Sandnes heller. Hva gjør du?', valg:[
          { t:'Laster den likevel – sjåføren kjører forsiktig', ok:false, f:'En ustabil pall kan velte og skade varer og folk.' },
          { t:'Bygger om pallen med tunge varer nederst og pakker den på nytt i strekkfilm', ok:true, f:'Riktig. Stabil pall først, så lasting.' },
          { t:'Tar av halve pallen og lar resten stå igjen', ok:false, f:'Da mangler butikken varer.' }
        ]}
      ]},
      { type:'reflect', id:'t5-r1', nivaa:3, tittel:'Følg en ordre gjennom lageret', q:'En butikksjef trykker «send» på en bestilling. Beskriv hva som skjer med ordren på lageret – helt til pallen står klar ved porten.', punkter:[
        'Ordren kommer inn og kunden får ordrebekreftelse',
        'Ordren splittes i delordrer per plukksone og sorteres i plukkrekkefølge',
        'Plukk med papirliste, skjerm eller talestyrt plukk',
        'Delordrene sammenstilles på kundepall – tunge varer nederst',
        'Pallen pakkes i strekkfilm og merkes med navn og adresse',
        'Pallen settes på oppstillingsområdet i innlastingsrekkefølge',
        'Frys og kjøl venter i sin sone til lasting'
      ]}
    ]
  },
  /* ================================================================ T6 */
  {
    id: 't6', lok: 'C-02', tittel: 'Godsterminaler, oppdrag og fraktbrev',
    kort: 'Typer godsterminaler, ulike transportoppdrag, fraktbrev og CMR, fraktførerens undersøkelsesplikt, forbehold og farlig gods.',
    bok: 'Læreboka 1.4 (s. 27–31)',
    mal: ['nevne ulike typer godsterminaler og hva slags gods de håndterer','dele inn transportoppdrag etter kunde, oppdrag og godstype','forklare hva fraktføreren skal gjøre når gods leveres inn, og når fraktavtalen blir bindende','vite når jeg må ta forbehold eller be om opplysninger om farlig gods'],
    punkter: [
      'En <b>godsterminal</b> sorterer gods på vei fra avsender til mottaker. Typer: <b>samlast-, havne-, flyfrakt- og jernbaneterminaler</b>.',
      'Samlastterminaler: mange små kolli fra mange avsendere (typisk netthandel) til mange mottakere. Havne- og jernbaneterminaler: hele konteinere. Fly: post, ekspresspakker, netthandel og fersk sjømat (fra GPC-terminalen på Gardermoen).',
      'Utstyr: trucker, lastelemmer, kraner, porter med værtetting, sorteringsanlegg, skannere og sporing. Noe utstyr krever <b>sertifikat</b>, annet krever intern opplæring.',
      'Arbeidsgiveren lærer deg reglene for spesielle produkter. Du må for eksempel kjenne transporttemperaturen for ulike typer <b>termogods</b>, så du kan stille inn termoaggregatet, og kravene til transport av <b>farlig gods</b>.',
      'Oppdrag deles inn etter <b>kunde</b> (privat eller næringsliv), <b>nasjonalt eller internasjonalt</b>, og <b>godstype</b> (f.eks. vanlig gods, farlig gods, samlastgods, partigods, termogods, import, eksport).',
      '<b>Vegfraktloven</b> regulerer forholdet mellom avsender, fraktfører og mottaker – med egne regler for innenlands og internasjonal frakt. Nasjonalt brukes <b>innenlands fraktbrev</b>, internasjonalt <b>CMR-fraktbrev</b> (CMR-konvensjonen, et FN-regelverk Norge har sluttet seg til).',
      'Fraktføreren skal <b>kontrollere opplysningene</b> i fraktbrevet, <b>undersøke godset</b> (undersøkelsesplikt, vegfraktloven § 12) og om nødvendig <b>ta forbehold</b>, og <b>beregne frakt</b>. Fraktavtalen er bindende når fraktføreren har signert fraktbrevet.',
      'Er godset dårlig emballert, skriver du et <b>forbehold</b> i merknadsrubrikken. Da fraskriver avsenderen seg retten til erstatning for skader som skyldes emballasjen. Avsender av <b>farlig gods</b> må gi nødvendige opplysninger (§ 15) – ellers bør du vurdere å nekte.'
    ],
    ndla: [
      ['Terminaler', 'terminaler/6a8f025da7', 'Fagstoff'],
      ['Hva er en terminal?', 'hva-er-en-terminal/04f1384e9b', 'Fagstoff'],
      ['Logistikk på vei', 'logistikk-pa-vei/7cc06dd6cc', 'Fagstoff'],
      ['Logistikk i lufta', 'logistikk-i-lufta/f6ca222397', 'Fagstoff']
    ],
    arbeidsbok: '1.5, 1.22, 1.31, 1.32, 1.33',
    aktiviteter: [
      { type:'voks', id:'t6-voks', tittel:'Hver pakke er noens ting', tekst:['På en terminal går tusenvis av kolli gjennom hendene dine. Det er lett å glemme at hver eneste av dem er viktig for noen.','Kanskje er det en bursdagsgave. Kanskje er det medisiner, eller en reservedel som får en bedrift i gang igjen.','Å behandle godset som om det var ditt eget, er en holdning – ikke bare en regel.'], sporsmal:['Har du opplevd at noe du ventet på, kom skadet eller for sent? Hvordan føltes det?','Hva betyr det for deg å gjøre en jobb du kan være stolt av?'], handling:'Tenk på én person som venter på noe du er med på å levere – i jobb eller praksis.' },
      { type:'flash', id:'t6-flash', tittel:'Begrepskort: terminal og fraktbrev', kort:[
        ['Godsterminal','Anlegg for sortering av gods på vei fra avsendere til mottakere.'],
        ['Samlastterminal','Terminal for mange små kolli fra mange avsendere til mange mottakere.'],
        ['Havneterminal','Terminal der hele konteinere lastes mellom skip og bil eller bane.'],
        ['Flyfraktterminal','Terminal for post, ekspresspakker, netthandel og fersk sjømat som skal med fly.'],
        ['Samlastgods','Mindre sendinger fra flere avsendere som fraktes sammen.'],
        ['Partigods','Større sendinger som fyller en stor del av bilen.'],
        ['Termogods','Gods som må holdes på riktig temperatur under transport.'],
        ['Vegfraktloven','Lov om vegfraktavtaler – regulerer avsender, fraktfører og mottaker.'],
        ['Innenlands fraktbrev','Fraktbrevet ved transport innenfor Norge.'],
        ['CMR-fraktbrev','Fraktbrevet ved internasjonal vegtransport, etter CMR-konvensjonen.'],
        ['Undersøkelsesplikt','Fraktføreren skal undersøke godset og fraktbrevet når godset tas imot (§ 12).'],
        ['Forbehold','Skriftlig merknad fra fraktføreren, f.eks. om dårlig emballasje.'],
        ['Kjernetemperatur','Temperaturen inne i varen, f.eks. midt i en laks.']
      ]},
      { type:'quiz', id:'t6-q1', nivaa:1, tittel:'Terminaler og gods', sp:[
        { q:'Hva slags gods er typisk på en samlastterminal?', a:['Hele konteinere fra skip','Mange små kolli fra mange avsendere til mange mottakere','Bare passasjerer','Bare olje'], r:1, f:'Netthandel gir mange små kolli.' },
        { q:'Hva slags gods håndteres typisk på havne- og jernbaneterminaler?', a:['Hele konteinere','Brev','Bagasje','Ekspresspakker'], r:0, f:'Der flyttes hele konteinere mellom transportmidler.' },
        { q:'Hvilket fraktbrev brukes ved internasjonal transport på vei?', a:['Innenlands fraktbrev','CMR-fraktbrev','Pakkseddel','Kvittering'], r:1, f:'CMR brukes internasjonalt.' },
        { q:'Hvem er partene i en fraktavtale?', a:['Selger og kjøper','Avsender, fraktfører og mottaker','Sjåfør og truckfører','Bank og forsikring'], r:1, f:'Avsender og fraktfører inngår avtalen, og mottakeren trer inn når godset er framme.' },
        { q:'Hvilken av disse krever sertifikat for å bruke?', a:['Truck','Skanner','Porten','Strekkfilm'], r:0, f:'Truck krever kompetansebevis. Annet utstyr krever intern opplæring.' }
      ]},
      { type:'sort', id:'t6-s1', nivaa:1, tittel:'Hvilken terminal?', instr:'Hvilken terminaltype passer godset best?', kat:['Samlastterminal','Havne-/jernbaneterminal','Flyfraktterminal'], items:[
        ['50 små pakker fra en nettbutikk til kunder over hele landet',0,'Mange små kolli fra én til mange.'],
        ['En 40 fots konteiner fra et skip i Kina',1,'Hele konteinere.'],
        ['Fersk laks som skal til Asia samme dag',2,'Fersk sjømat sendes med fly, bl.a. fra Gardermoen.'],
        ['Ekspresspakke som må fram i morgen tidlig',2,'Ekspress går ofte med fly.'],
        ['Tre paller fra ulike avsendere til en byggevarebutikk',0,'Samlastgods.'],
        ['Konteinere som skal fra tog til lastebil',1,'Jernbaneterminal.']
      ]},
      { type:'sort', id:'t6-s2', nivaa:2, tittel:'Hva slags oppdrag er det?', instr:'Du tar imot oppdrag på terminalen. Hvilken type er oppdraget?', kat:['Privat – nasjonalt','Privat – internasjonalt','Næringsliv – nasjonalt','Næringsliv – internasjonalt'], items:[
        ['En privatperson sender en sofa fra Stavanger til Tromsø',0,'Privatkunde, innenlands.'],
        ['En privatperson sender en pakke med gaver til familien i Polen',1,'Privatkunde, eksport.'],
        ['En grossist sender termogods til butikker i Rogaland',2,'Næringsliv, nasjonalt – termogods.'],
        ['En fabrikk sender partigods på 18 paller til Oslo',2,'Næringsliv, nasjonalt – partigods.'],
        ['En bedrift importerer maskindeler fra Tyskland',3,'Næringsliv, importvarer.'],
        ['En privatperson sender en kanne bensin til hytta på Sirdal',0,'Privat, nasjonalt – farlig gods.'],
        ['En fiskeeksportør sender laks til Frankrike',3,'Næringsliv, eksportvarer.']
      ]},
      { type:'hotspot', id:'t6-hs1', nivaa:2, tittel:'Finn feltet i fraktbrevet', instr:'Tegningen viser et forenklet fraktbrev. Trykk på feltet som passer.', svg:SVG_FRAKTBREV, sp:[
        { q:'Et kolli er skadet ved levering. Hvor skriver du det?', z:'merknad', f:'Skader og manko skrives i merknadsrubrikken.' },
        { q:'Du vil ta forbehold om dårlig emballering. Hvor skriver du det?', z:'merknad', f:'Forbeholdet skrives også i merknadsrubrikken.' },
        { q:'Erstatningen for skadd gods regnes ut fra … Trykk på feltet du trenger.', z:'vekt', f:'Vekta avgjør erstatningen.' },
        { q:'Hvor ser du hvem som skal betale frakten?', z:'betaling', f:'Feltet «Frakt betales av».' },
        { q:'Hvor finner du UN-nummer og klasse for farlig gods?', z:'farlig', f:'Farlig gods skal beskrives i eget felt.' },
        { q:'Fraktavtalen blir bindende når fraktføreren har … Trykk der det skjer.', z:'sign', f:'Når fraktføreren signerer fraktbrevet.' },
        { q:'Hvor ser du hvem som har levert godset til transport?', z:'avsender', f:'Avsenderen.' },
        { q:'Hvor kontrollerer du at antall kolli og merkingen stemmer?', z:'kolli', f:'Antall kolli, merking og innhold.' }
      ]},
      { type:'tf', id:'t6-tf', nivaa:2, tittel:'Sant eller usant: fraktbrev og ansvar', ps:[
        ['Fraktavtalen er bindende når fraktføreren signerer fraktbrevet.', true, 'Derfor skal opplysningene være kontrollert før du signerer.'],
        ['Ved internasjonale sendinger signerer avsender og fraktfører CMR-fraktbrevet i tre originaleksemplarer.', true, 'Ett til avsender, ett følger godset og ett til fraktføreren.'],
        ['Undersøkelsesplikten gjelder bare for internasjonale sendinger.', false, 'Den gjelder når fraktføreren overtar gods for transport.'],
        ['Hvis fraktføreren ikke tar forbehold, kan han bli erstatningsansvarlig hvis dårlig emballert gods blir skadet.', true, 'Forbeholdet fritar fraktføreren for skader som skyldes emballasjen.'],
        ['Avsender av farlig gods trenger ikke gi noen opplysninger om godset.', false, 'Avsenderen har plikt til å gi nødvendige opplysninger (vegfraktloven § 15).'],
        ['Fersk laks skal ha en kjernetemperatur på rundt 0 °C ved innlasting.', true, 'Er den høyere, smelter isen i kassene underveis.']
      ]},
      { type:'order', id:'t6-o1', nivaa:2, tittel:'Når gods leveres inn til transport', instr:'Sett fraktførerens oppgaver i en fornuftig rekkefølge.', steg:[
        'Kunden leverer godset og fyller ut fraktbrevet','Kontroller at opplysningene i fraktbrevet er tilstrekkelige','Undersøk godset: antall kolli, merking og emballasje','Ta forbehold i merknadsrubrikken hvis noe er galt','Beregn frakten','Signer fraktbrevet – nå er fraktavtalen bindende'
      ]},
      { type:'check', id:'t6-chk1', nivaa:3, tittel:'Undersøkelsesplikt: kontroller før du signerer', instr:'En kunde leverer en sending som skal til Tyskland. Sammenlign CMR-fraktbrevet med det du ser. Kryss av punktene som krever handling (rette, spørre eller ta forbehold) før du signerer.', dok:'CMR-fraktbrev – kontroll ved mottak', meta:'Avsender: Bryne Mek AS · Mottaker: Weber GmbH, Hamburg', kolonner:['Kontrollpunkt','I fraktbrevet','Det du ser'], kryss:'Må følges opp', rader:[
        { c:['Antall kolli','4 kolli','4 kolli'], avvik:false, f:'Stemmer.' },
        { c:['Merking','Mottakers navn og adresse','Ett kolli mangler adresselapp'], avvik:true, f:'Alle kolli må være merket før de tas imot.' },
        { c:['Sendingsnummer','70 9921 4410','Samme nummer på lappene'], avvik:false, f:'Stemmer.' },
        { c:['Emballasje','Ingen merknad','Ett kolli er en tynn pappeske med glassdeler uten fyll'], avvik:true, f:'Ta forbehold om dårlig emballering i merknadsrubrikken.' },
        { c:['Vekt','820 kg','Vekta viser 1 240 kg'], avvik:true, f:'Feil vekt må rettes – vekt påvirker både frakt og erstatning.' },
        { c:['Farlig gods','Ingen','Ingen faresedler, avsender bekrefter at det ikke er farlig gods'], avvik:false, f:'I orden.' }
      ], etter:'Fraktbrevet er bevis for fraktavtalen. Derfor skal opplysningene være riktige før fraktføreren signerer.' },
      { type:'case', id:'t6-case', nivaa:3, tittel:'Case: Ved skranken på terminalen', intro:'Du tar imot gods fra kunder på en samlastterminal. Som fraktfører har du undersøkelsesplikt.', steg:[
        { q:'En kunde leverer fire kanner med fareseddel, men kan ikke si hva som er i dem og har ingen papirer. Hva gjør du?', valg:[
          { t:'Tar imot – fareseddelen holder', ok:false, f:'Avsenderen har plikt til å gi nødvendige opplysninger om farlig gods.' },
          { t:'Ber om de nødvendige opplysningene, og vurderer å nekte å ta imot godset hvis kunden ikke kan gi dem', ok:true, f:'Riktig. Loven sier ikke hva du skal gjøre, men du bør vurdere å nekte.' },
          { t:'Tar imot, men setter kannene bakerst i bilen', ok:false, f:'Plasseringen løser ikke problemet: du vet ikke hva godset er.' }
        ]},
        { q:'Neste kunde leverer en tynn pappeske med glassvarer, uten fyll inni. Kunden vil sende den likevel. Hva gjør du?', valg:[
          { t:'Tar imot uten kommentar', ok:false, f:'Blir eska knust, kan fraktføreren bli erstatningsansvarlig.' },
          { t:'Tar skriftlig forbehold i merknadsrubrikken om dårlig emballering, og ber kunden kvittere', ok:true, f:'Riktig. Da fraskriver avsenderen seg retten til erstatning for slike skader.' },
          { t:'Pakker om eska selv uten å si fra', ok:false, f:'Du endrer kundens sending uten avtale. Ta heller forbehold.' }
        ]},
        { q:'Du skal laste fersk, iset laks hos et oppdrettsanlegg. Termometeret viser 4 °C i kjernen. Hva gjør du?', valg:[
          { t:'Laster likevel – det er kaldt i bilen', ok:false, f:'Isen vil smelte underveis, og laksen må ises på nytt.' },
          { t:'Gir beskjed til oppdragsgiveren og venter med å laste til laksen har riktig kjernetemperatur', ok:true, f:'Riktig. Fersk laks skal ha rundt 0 °C i kjernen ved innlasting.' },
          { t:'Skrur termoaggregatet til minus 20 °C', ok:false, f:'Laksen skal være fersk, ikke frossen.' }
        ]}
      ]},
      { type:'reflect', id:'t6-r1', nivaa:3, tittel:'Forklar: Kolli til utlandet', q:'Du tar imot et kolli som skal til utlandet. Forklar hva du må gjøre som fraktfører før du signerer CMR-fraktbrevet.', punkter:[
        'Kontrollere at opplysningene i fraktbrevet er riktig utfylt',
        'Sjekke at antall kolli stemmer',
        'Sjekke at merkingen er korrekt (avsender, fraktfører, mottaker)',
        'Sjekke sendingsnummeret',
        'Se på emballasjen og ta begrunnet forbehold hvis den er dårlig',
        'Signere – både avsender og fraktfører signerer CMR-fraktbrevet'
      ]},
      { type:'reflect', id:'t6-r2', nivaa:3, tittel:'Par-oppgave: Når tar vi forbehold?', q:'Jobb i par. Dere er fraktførere. Lag en liste over situasjoner der dere ville skrevet et forbehold i fraktbrevet før dere tok imot godset – og forklar kort hvorfor. Diskuter også: Når er risikoen så liten at et forbehold ikke trengs?', punkter:[
        'Dårlig eller mangelfull emballering',
        'Synlige skader på godset allerede ved mottak',
        'Antall kolli eller merking stemmer ikke med fraktbrevet',
        'Vi kan ikke kontrollere innhold eller vekt',
        'Vi har vurdert hvor stor risikoen er for skade underveis',
        'Vi har diskutert når et forbehold ikke er nødvendig'
      ]}
    ]
  },
  /* ================================================================ T7 */
  {
    id: 't7', lok: 'D-01', tittel: 'Sortering og postpakker',
    kort: 'Terminalnettet, sortering etter postnummer, det automatiske sorteringsanlegget, distribusjon og forskjellen på postpakker og samlastgods.',
    bok: 'Læreboka 1.4 – terminalnett, sortering og postpakker (s. 28–29 og 32–36)',
    mal: ['forklare hvordan et kolli går via avsender-, sentral- og mottakerterminal','forklare hva gods sorteres etter, og hvordan et automatisk sorteringsanlegg virker','sortere gods som skal videre lokalt og til andre regioner','forklare forskjellen på postsendinger og samlastgods'],
    punkter: [
      'De fleste kolli er innom <b>tre terminaler</b>: avsenderterminal, sentralterminal og mottakerterminal. <b>Lokalgods</b> er bare innom én.',
      'En samlastspeditør har <b>fraktføreransvar</b> overfor avsenderen hele veien fra avsendersted til mottakersted, og bruker ofte <b>undertransportører</b>.',
      'Et <b>terminalnett</b> består av en sentralterminal og mange store og små terminaler rundt i landet. <b>Sentralterminalen</b> ligger der det er mest gods, i Osloområdet. Ligger terminalene for tett, blir det for lite gods til å fylle en konteiner hver dag – da samles gods over flere dager, og leveringsservicen blir dårligere.',
      'Gods til andre regioner går i konteinere med bil eller som <b>kombitransport</b> (intermodal transport): bil og tog, bil og båt, eller bil, båt og tog. Godset <b>skannes på hver terminal</b>, så sporingen oppdateres.',
      'Etter mottak, undersøkelse og fraktberegning skannes kolliet. Godset sorteres i <b>lokalgods</b> og <b>gods til andre regioner</b>. Sorteringskriteriet er <b>mottakerens postnummer</b> – i praksis strekkoden. Derfor må strekkoden ikke skades.',
      'Lokalgods sorteres på <b>nærdistribusjonssoner</b> rundt terminalen (levering alle hverdager) og <b>regionale distribusjonsruter</b> lenger unna (levering én eller flere dager i uka, avhengig av godsmengden).',
      'Store sentralterminaler sorterer så mye at det ikke går manuelt – Postens godssenter sorterer 100 000–200 000 pakker om dagen med automatisk sorteringsanlegg.',
      '<b>Automatisk sorteringsanlegg:</b> innmating med strekkoden opp → skanning → transportbånd opp til sorteringsbåndet i mesaninetasjen → kolliet på egen lamell → skråstilles ved riktig avkast → rutsjebane ned → transportbånd inn i konteiner, der kolliene stues manuelt.',
      '<b>Postsendinger</b> følger postloven, <b>samlastgods</b> følger vegfraktloven. Posten hadde tidligere enerett på lette brev, men den ble fjernet i postloven fra 2015. Nå konkurrerer Posten og samlastspeditørene.',
      'En <b>postsending</b> er brevpost inntil 2 kg, aviser og blader i abonnement inntil 2 kg, og lettgods inntil 20 kg med mottakers navn og adresse. <b>Uregistrert</b>: ingen kvittering. <b>Registrert</b>: kvittering ved innlevering og utlevering mot kvittering. <b>Rekommandert</b>: kvittering ved innlevering og utlevering mot legitimasjon og signatur.',
      'Alle som tilbyr posttjenester, må registrere seg hos <b>Nasjonal kommunikasjonsmyndighet (Nkom)</b>. Utenom Posten driver de fleste med lokal avisdistribusjon.'
    ],
    ndla: [
      ['Logistikkløsninger (film fra Postens terminal)', 'logistikklosninger/a12f0becba', 'Film'],
      ['Hva skjer på en pakketerminal?', 'hva-skjer-pa-en-pakketerminal/d57c6a6094', 'Oppgave'],
      ['Terminaler', 'terminaler/6a8f025da7', 'Fagstoff']
    ],
    arbeidsbok: '1.6, 1.9, 1.18, 1.20, 1.23, 1.28',
    aktiviteter: [
      { type:'voks', id:'t7-voks', tittel:'Strekkoden er kolliets stemme', tekst:['Et kolli kan ikke si hvor det skal. Det er strekkoden som forteller sorteringsanlegget, skanneren og sjåføren hvor det hører hjemme.','Blir strekkoden revet, skitten eller tapet over, stopper hele flyten. Kolliet havner i en kasse for «ukjent» – og noen må bruke tid på å finne ut av det.','Små ting du gjør med omtanke – som å legge kolliet med strekkoden opp – sparer kolleger for mye arbeid.'], sporsmal:['Hvilke små ting gjør andre som gjør jobben din lettere?','Hva er en liten vane du kan ha som gjør det lettere for neste person?'], handling:'Legg merke til én liten ting du kan gjøre bedre for de som jobber etter deg.' },
      { type:'flash', id:'t7-flash', tittel:'Begrepskort: sortering og post', kort:[
        ['Kolli','Én enhet gods – en pakke, en eske eller en pall.'],
        ['Avsenderterminal','Første terminal – der godset leveres inn.'],
        ['Sentralterminal','Sorterer gods fra hele landet videre til riktig mottakerterminal.'],
        ['Mottakerterminal','Siste terminal – godset distribueres derfra til mottakeren.'],
        ['Lokalgods','Gods innenfor samme region – bare innom én terminal.'],
        ['Sorteringskriterium','Mottakerens postnummer – i praksis strekkoden.'],
        ['Distribusjonssone','Område i nærheten av terminalen som får varer alle hverdager.'],
        ['Distribusjonsrute','Rute til tynt befolkede områder med levering én til tre dager i uka.'],
        ['Mesanin','En etasje over golvplan, der sorteringsbåndet går.'],
        ['Avkast / nedkast','Stedet der lamellen skråstilles og kolliet sklir ned.'],
        ['Postloven','Loven som gjelder for postsendinger.'],
        ['Postsending','Brevpost og aviser inntil 2 kg, og lettgods inntil 20 kg med mottakers navn og adresse.'],
        ['Rekommandert sending','Kvittering ved innlevering, utleveres mot legitimasjon og signatur.']
      ]},
      { type:'quiz', id:'t7-q1', nivaa:1, tittel:'Terminalnettet', sp:[
        { q:'Hvor mange terminaler er de fleste kolli innom fra avsender til mottaker?', a:['Én','To','Tre','Fem'], r:2, f:'Avsender-, sentral- og mottakerterminal.' },
        { q:'Hvor mange terminaler er lokalgods innom?', a:['Ingen','Én','Tre','Fire'], r:1, f:'Lokalgods blir i egen region.' },
        { q:'Hva sorteres godset etter?', a:['Vekt','Farge','Mottakerens postnummer (strekkoden)','Avsenderens navn'], r:2, f:'Derfor må strekkoden ikke skades.' },
        { q:'Hvilken lov gjelder for samlastgods?', a:['Postloven','Vegfraktloven','Arbeidsmiljøloven','Vegtrafikkloven'], r:1, f:'Postsendinger følger postloven.' },
        { q:'Hva skal du gjøre med kolliet rett etter at det er mottatt, undersøkt og fraktberegnet?', a:['Skanne sendingsnummeret','Åpne det','Veie sjåføren','Sende det tilbake'], r:0, f:'Så sorteres det.' }
      ]},
      { type:'order', id:'t7-o1', nivaa:1, tittel:'Kolliets reise mellom regioner', instr:'Et kolli skal fra Stavanger til Trondheim. Sett stegene i riktig rekkefølge.', steg:[
        'Avsenderen leverer kolliet til transportøren','Kolliet mottas og skannes på avsenderterminalen','Kolliet lastes i konteiner eller skapbil til sentralterminalen','Sorteringsanlegget på sentralterminalen sender det til riktig avgangsport','Kolliet ankommer mottakerterminalen','Distribusjonsbilen leverer kolliet til mottakeren'
      ]},
      { type:'sort', id:'t7-s1', nivaa:2, tittel:'Sorter på terminalen i Stavanger', instr:'Du jobber på en samlastterminal i Stavanger. Skal kolliet videre lokalt eller til en annen region?', kat:['Videre lokalt','Til andre regioner'], items:[
        ['Kolli til Sandnes',0,'Innenfor regionen – distribusjonssone.'],
        ['Kolli til Sola',0,'Innenfor regionen – distribusjonssone.'],
        ['Kolli til Egersund',0,'Innenfor regionen – distribusjonsrute.'],
        ['Kolli til Randaberg',0,'Innenfor regionen.'],
        ['Kolli til Bergen',1,'Annen region – samles i konteiner.'],
        ['Kolli til Oslo',1,'Annen region – via sentralterminalen.'],
        ['Kolli til Trondheim',1,'Annen region.'],
        ['Kolli til Kristiansand',1,'Annen region.']
      ]},
      { type:'hotspot', id:'t7-hs1', nivaa:2, tittel:'Det automatiske sorteringsanlegget', instr:'Tegningen viser et automatisk sorteringsanlegg. Trykk på riktig del.', svg:SVG_SORT, sp:[
        { q:'Hvor legges kolliet med strekkoden opp?', z:'inn', f:'Innmatingspunktet ligger i golvplan.' },
        { q:'Hvor leses postnummeret på kolliet?', z:'skann', f:'Skanneren leser strekkoden.' },
        { q:'Hvilken del frakter kolliet opp til etasjen over golvet?', z:'opp', f:'Transportbåndet fra golvplan til mesaninetasjen.' },
        { q:'Hvor går kolliet rundt på en lamell til det når riktig avkast?', z:'ring', f:'Det roterende sorteringsbåndet.' },
        { q:'Hvor sklir kolliet ned når lamellen skråstilles?', z:'ned', f:'Rutsjebanen fra sorteringsbåndet til golvet.' },
        { q:'Hvor stues kolliene manuelt før transport til mottakerterminalen?', z:'kont', f:'I konteineren.' }
      ]},
      { type:'match', id:'t7-m1', nivaa:2, tittel:'Begreper i postloven', instr:'Koble begrepet med riktig forklaring.', par:[
        ['Postnett','Hele organisasjonen, folkene og utstyret som trengs for å formidle post'],
        ['Uregistrert postsending','Ingen kvittering ved innlevering eller utlevering'],
        ['Registrert postsending','Kvittering ved innlevering, utleveres mot kvittering'],
        ['Rekommandert postsending','Kvittering ved innlevering, utleveres mot legitimasjon og signatur'],
        ['Tilbyder','Alle som tilbyr posttjenester'],
        ['Bruker','Person eller bedrift som sender eller mottar post']
      ]},
      { type:'fill', id:'t7-fill', nivaa:2, tittel:'Fyll inn: postsendinger', tekst:'En postsending kan være brevpost inntil [[2 kg]], aviser og blader i abonnement inntil 2 kg, og lettgods inntil [[20 kg]] som er påført mottakers navn og adresse. Postsendinger følger [[postloven]], mens samlastgods følger [[vegfraktloven]]. En [[rekommandert]] sending gir kvittering ved innlevering og utleveres mot gyldig legitimasjon og signatur.', ekstra:['5 kg','50 kg','kjøpsloven','ekspress'] },
      { type:'tf', id:'t7-tf', nivaa:2, tittel:'Sant eller usant: sortering og post', ps:[
        ['Distribusjonsruter til tynt befolkede områder får alltid varer hver dag.', false, 'De får ofte varer én, to eller tre dager i uka.'],
        ['Sentralterminalene ligger gjerne der etterspørselen etter samlast er størst.', true, 'Ofte i hovedstadsområdet.'],
        ['Alle kolli til samme postnummersone sklir ned den samme rutsjebanen.', true, 'Slik havner de ved samme avgangsport.'],
        ['Posten har fortsatt enerett på å sende lette brev i Norge.', false, 'Eneretten ble fjernet i postloven fra 2015.'],
        ['En skadet strekkode kan stoppe sorteringen av et kolli.', true, 'Sorteringen bygger på strekkoden.'],
        ['Samlastspeditører tilbyr i dag tjenester som Posten tidligere hadde enerett på.', true, 'Posten og samlastspeditørene konkurrerer.'],
        ['Godset skannes på nytt på hver terminal, slik at sporingsinformasjonen oppdateres.', true, 'Både sentral- og mottakerterminalen skanner alt innkommende gods.'],
        ['Jo tettere terminalene ligger, desto bedre blir alltid leveringsservicen.', false, 'Ligger de for tett, blir det for lite gods til å fylle en konteiner hver dag, og gods må samles over flere dager.'],
        ['Kombitransport betyr at godset bruker flere transportformer, for eksempel bil og tog.', true, 'Det kalles også intermodal transport.']
      ]},
      { type:'quiz', id:'t7-q2', nivaa:3, tittel:'Sortering og distribusjon', sp:[
        { q:'Hvorfor er det så viktig at strekkoden ikke blir skadet?', a:['Fordi den viser prisen','Fordi sorteringen styres av postnummeret i strekkoden','Fordi den beskytter emballasjen','Fordi tollen krever det'], r:1, f:'Uten lesbar strekkode vet ikke anlegget hvor kolliet skal.' },
        { q:'Hvorfor får distribusjonsruter til spredtbygde strøk sjeldnere levering enn soner i nærområdet?', a:['Fordi det er lite gods, og ruten er lang','Fordi loven sier det','Fordi bilene er mindre','Fordi det er farlig'], r:0, f:'Hyppigheten avhenger av godsmengde og servicenivået speditøren velger.' },
        { q:'Hva skjer med gods fra hele landet som skal til samme region?', a:['Det lastes i konteinere og sendes til mottakerregionen','Det lagres på sentralterminalen i en uke','Det sendes tilbake','Det deles opp og sendes med post'], r:0, f:'Sentralterminalen samler alt gods til samme mottakerterminal.' },
        { q:'Hvem bruker samlastterminaler i regioner med lite gods når de ikke har egen terminal?', a:['De kjøper terminaltjenester fra andre','De sender alt med fly','De legger ned regionen','De leverer bare brev'], r:0, f:'Samlastspeditører kan kjøpe terminaltjenester der det er lite gods.' }
      ]},
      { type:'reflect', id:'t7-r1', nivaa:3, tittel:'Forklar: Hvorfor går pakken via flere terminaler?', q:'En kunde i Egersund lurer på hvorfor pakken hennes til Tromsø går innom flere terminaler. Forklar hvordan et landsdekkende terminalnett er bygd opp, og hvilken vei pakken tar.', punkter:[
        'Landet er delt i regioner med en terminal i hver',
        'Pakken går via avsender-, sentral- og mottakerterminal',
        'Lokalgods er bare innom én terminal',
        'Gods til andre regioner samles i konteinere og sendes med bil, båt eller bane',
        'Sentralterminalen sorterer etter postnummer med automatisk sorteringsanlegg',
        'Fra mottakerterminalen leveres pakken på en distribusjonssone eller -rute'
      ]}
    ]
  },
  /* ================================================================ T8 */
  {
    id: 't8', lok: 'D-02', tittel: 'Passasjerterminaler',
    kort: 'Omstigning mellom transportmidler, kombinertterminaler, arbeidsoppgaver på passasjerterminaler og universell utforming.',
    bok: 'Læreboka 1.2 og 1.5 (s. 11–12 og 36–37)',
    mal: ['forklare hvorfor vi har passasjerterminaler, og hva en kombinertterminal er','beskrive arbeidsoppgaver for logistikkoperatører på passasjerterminaler','forklare hva universell utforming er, og gi eksempler fra en terminal'],
    punkter: [
      'Da folk flyttet til byene i industrisamfunnet, økte avstanden mellom bosted og arbeid – og behovet for <b>kollektivtransport</b>.',
      'For å komme fram må vi ofte kombinere båt, tog, buss og fly. En <b>passasjerterminal</b> er et anlegg der passasjerer går på, går av eller bytter transportmiddel.',
      'Vi har båt-, buss-, tog- og flyterminaler, og <b>kombinertterminaler</b> som er lagt til rette for overgang mellom ulike transportformer.',
      'Terminaltyper: <b>sentrumsterminal for busser</b> (enkel, passasjerene betjener seg selv), <b>regionbuss- og hurtigbåtterminal</b> (venterom, bagasjeoppbevaring, toalett), <b>flyterminal</b> (mange funksjoner, noen lovpålagte), <b>jernbaneterminal</b> (fra små selvbetjente stasjoner til Oslo S) og <b>terminal for internasjonal transport</b> (pass- og tollkontroll, taxfree).',
      'Logistikkoperatører på store terminaler jobber med <b>bagasjehåndtering</b> (sortering, lasting og lossing) og med å <b>betjene passasjerer</b>. Ved korte reiser betjener passasjerene seg stort sett selv.',
      'Passasjerterminaler skal ha <b>universell utforming</b>: produkter og omgivelser skal kunne brukes av alle mennesker så langt som mulig, uten behov for egne tilpasninger. Mye arbeid gjenstår – noen trenger hjelp i trapper og rulletrapper der det mangler heis.',
      'Andre ord for det samme: <b>design for alle, universell design, inkluderende design, tilgjengelighet for alle</b>.'
    ],
    ndla: [
      ['Hva er en terminal?', 'hva-er-en-terminal/04f1384e9b', 'Fagstoff'],
      ['Terminaler', 'terminaler/6a8f025da7', 'Fagstoff']
    ],
    arbeidsbok: '1.3, 1.19',
    aktiviteter: [
      { type:'voks', id:'t8-voks', tittel:'Service er også logistikk', tekst:['På en passasjerterminal er det mennesker som skal videre, ikke paller. Noen er stresset, noen er usikre, noen trenger hjelp, men spør ikke.','Et enkelt «Trenger du hjelp?» kan gjøre hele reisen enklere for noen. Å se folk rundt seg er en egenskap arbeidsgivere legger merke til.','Universell utforming handler om bygg og skilt. Godt vertskap handler om deg.'], sporsmal:['Når har noen hjulpet deg uten at du ba om det? Hva gjorde de?','Hvem rundt deg kunne trengt et «Trenger du hjelp?» denne uka?'], handling:'Tilby hjelp til én person denne uka, uten at de ber om det.' },
      { type:'flash', id:'t8-flash', tittel:'Begrepskort: passasjerterminal', kort:[
        ['Passasjerterminal','Anlegg der passasjerer går på, går av eller bytter transportmiddel.'],
        ['Omstigning','Å bytte fra ett transportmiddel til et annet underveis.'],
        ['Kombinertterminal','Terminal lagt til rette for overgang mellom ulike transportformer.'],
        ['Kollektivtransport','Transport som mange reiser med samtidig, f.eks. buss, tog og båt.'],
        ['Bagasjehåndtering','Sortering, lasting og lossing av bagasje, f.eks. på flyplass.'],
        ['Universell utforming','Utforming slik at alle kan bruke produkter og omgivelser, uten behov for egne tilpasninger.'],
        ['Design for alle','Et annet ord for universell utforming.']
      ]},
      { type:'quiz', id:'t8-q1', nivaa:1, tittel:'Passasjerterminaler', sp:[
        { q:'Hva er den viktigste oppgaven til en passasjerterminal?', a:['At reisende kan gå på, gå av eller bytte transportmiddel','Å selge mat og kaffe','Å lagre gods','Å reparere busser'], r:0, f:'Reisende bytter transportmiddel på vei mot reisemålet.' },
        { q:'Hva er en kombinertterminal?', a:['En terminal bare for fly','En terminal lagt til rette for overgang mellom ulike transportformer','Et lager for bagasje','En bussgarasje'], r:1, f:'For eksempel buss, tog og båt på samme sted.' },
        { q:'Hvilken arbeidsoppgave har logistikkoperatører på en flyplassterminal?', a:['Fly flyet','Bagasjehåndtering – sortering, lasting og lossing','Selge flybilletter på nett','Bygge rullebaner'], r:1, f:'Bagasjehåndtering er logistikkarbeid.' },
        { q:'Hva er universell utforming?', a:['At alle terminaler ser like ut','At omgivelsene kan brukes av alle uten behov for spesielle tilpasninger','En egen inngang for rullestolbrukere bak bygget','Gratis reise'], r:1, f:'Løsningen skal fungere for alle – ikke være en spesialløsning ved siden av.' },
        { q:'Hvilket ord betyr IKKE det samme som universell utforming?', a:['Design for alle','Inkluderende design','Tilgjengelighet for alle','Spesialtilpasning'], r:3, f:'Poenget er nettopp at man ikke skal trenge spesialtilpasning.' }
      ]},
      { type:'match', id:'t8-m1', nivaa:2, tittel:'Terminaltyper', instr:'Koble terminaltypen med det som kjennetegner den.', par:[
        ['Sentrumsterminal for busser','Enkel gateterminal der passasjerene betjener seg selv'],
        ['Regionbussterminal','Venterom, bagasjeoppbevaring og toalett'],
        ['Flyterminal','Mange funksjoner, noen av dem lovpålagte'],
        ['Jernbaneterminal','Fra små selvbetjente stasjoner til Oslo S'],
        ['Terminal for internasjonal transport','Pass- og tollkontroll, ofte taxfree']
      ]},
      { type:'tf', id:'t8-tf', nivaa:1, tittel:'Sant eller usant: passasjerterminaler', ps:[
        ['I husholdningssamfunnet var det stort behov for å reise langt til jobben.', false, 'Folk bodde der produksjonen skjedde. Behovet kom med industrisamfunnet.'],
        ['På korte reiser betjener passasjerene seg stort sett selv.', true, 'F.eks. når de bytter buss mellom to holdeplasser.'],
        ['En rampe som må bestilles dagen før, er universell utforming.', false, 'Det er en spesialtilpasning.'],
        ['Ledelinjer i gulvet er et eksempel på universell utforming.', true, 'De hjelper blinde og svaksynte å finne veien.'],
        ['Alle passasjerterminaler i Norge er i dag ferdig universelt utformet.', false, 'Mye arbeid gjenstår. Noen trenger hjelp i trapper der det mangler heis.'],
        ['På terminaler for internasjonal transport spør mange om tollkvoter – det bør du kunne svare på.', true, 'Der er det også pass- og tollkontroll.']
      ]},
      { type:'sort', id:'t8-s1', nivaa:2, tittel:'Universelt utformet – eller ikke?', instr:'Er dette et eksempel på universell utforming?', kat:['Universell utforming','Ikke universell utforming'], items:[
        ['Trinnfri adkomst fra gata og helt ut på perrongen',0,'Alle kan bruke samme vei.'],
        ['Ledelinjer i gulvet for blinde og svaksynte',0,'Hjelper flere å orientere seg.'],
        ['Avgangsinformasjon både på skjerm og med lyd',0,'Fungerer for både hørsels- og synshemmede.'],
        ['Billettautomat med god kontrast og knapper i passe høyde',0,'Kan brukes stående og sittende.'],
        ['Eneste vei til bussterminalen er en trapp',1,'Utelukker rullestolbrukere, barnevogner og folk med tung bagasje.'],
        ['Rampe som må bestilles og legges ut av personalet dagen før',1,'Det er en spesialtilpasning.'],
        ['Informasjon bare på små skilt med liten skrift',1,'Vanskelig for mange å lese.']
      ]},
      { type:'reflect', id:'t8-r1', nivaa:2, tittel:'Utforsk: Universell utforming rundt deg', q:'Tenk på en terminal du kjenner (busstasjon, kai, flyplass – eller skolen). Skriv tre eksempler på universell utforming du har sett, og ett sted der det mangler.', punkter:[
        'Jeg har beskrevet tre konkrete eksempler',
        'Jeg har forklart hvem eksemplene hjelper',
        'Jeg har beskrevet ett sted der universell utforming mangler',
        'Jeg har foreslått en forbedring'
      ]}
    ]
  }
  ]
});
})();
