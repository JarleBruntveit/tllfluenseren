/* Min TLL-bedrift – det store bedriftsspillet på TLLfluenseren.
   Eleven etablerer en bedrift innen lager/terminal, transport eller løfteoperasjoner og driver den i seks måneder.
   Hver måned: velg oppdrag innenfor kapasiteten -> se resultatet -> en hendelse (liten valg-hendelse eller et minispill).
   All vurdering samles i samme rapportformat som minispillene. Alt lagres i elevens nettleser. */
(function () {
  'use strict';
  const { esc, kr, tall, stokk, tilfeldig, leggTil, nivaHtml } = Spill;
  const el = document.getElementById('tll-main');
  const NOKKEL = 'tll_bedrift_v1';
  const MANEDER = 6;
  const LONN = 54000;          // lønn + sosiale kostnader per ansatt per måned
  const ANDRE_FASTE = 6000;    // forsikring, regnskap, telefon m.m. per måned
  const EGENKAPITAL = 400000;  // eiernes innskudd ved start
  const RENTE_MND = 0.006;     // ca. 7,2 % i året
  const KASSEKREDITT = 150000; // hvor langt kassa kan gå i minus før bedriften må avvikles

  const OMRADER = {
    etablering: 'Etablering og organisering', kalkyle: 'Beregninger', pris: 'Prisvurdering av oppdrag',
    planlegging: 'Kapasitet og planlegging', hms: 'HMS', service: 'Kundebehandling', ledelse: 'Ledelse og ansvar', kommunikasjon: 'Kommunikasjon'
  };
  // Minispillenes områder legges inn i bedriftsspillets områder
  const KART = { risiko: 'hms', tiltak: 'hms', handling: 'hms', melding: 'hms', feil: 'hms', metode: 'hms', mottak: 'service', kartlegging: 'service', losning: 'service', kommunikasjon: 'kommunikasjon' };

  const BRANSJER = {
    lager: {
      navn: 'Lager og terminal', ikon: '📦', enhet: 'timer', ent: 'time', kap: 150, varKost: 90, husleie: 38000,
      utstyr: { navn: 'truck', leie: 9000, kjop: 260000, drift: 1500 }, pris: [620, 1020],
      beskr: 'Lagerhotell, plukk og pakk og krysslasting for andre bedrifter. Du selger arbeidstimer på lageret.',
      kunder: ['Nettbutikker som trenger plukk og pakk', 'Byggevarehandler som trenger lagerplass', 'Dagligvarekjeder som trenger krysslasting'],
      oppdrag: [['Nettbutikk Sporty', 'Plukk og pakk av ordrer'], ['ByggMax Vest', 'Varemottak og innlagring'], ['Fjordmat', 'Krysslasting av kjølevarer'], ['Hagesenteret', 'Sesonglagring av utemøbler'], ['Elektro Nord', 'Kontroll og ompakking av retur'], ['Møbelhuset', 'Lagring og utlevering'], ['Sykkelsjappa', 'Montering av pall-display']],
      minispill: ['hms-revisjon', 'nestenulykke', 'kundeklage']
    },
    transport: {
      navn: 'Transport og distribusjon', ikon: '🚚', enhet: 'km', ent: 'km', kap: 5000, varKost: 8.5, husleie: 12000,
      utstyr: { navn: 'lastebil', leie: 24000, kjop: 900000, drift: 3500 }, pris: [19, 39],
      beskr: 'Gods- og distribusjonskjøring for bedrifter i regionen. Du selger kjørte kilometer.',
      kunder: ['Butikker som trenger faste varelevinger', 'Byggeplasser som trenger materialer levert', 'Industribedrifter som sender gods mellom byer'],
      oppdrag: [['Fjordmat', 'Daglig distribusjon til butikker'], ['Vestbygg', 'Materialer til byggeplass'], ['Rogaland Stål', 'Stålrør til Bergen'], ['Hagesenteret', 'Levering av jord og stein'], ['Møbelhuset', 'Hjemlevering av møbler'], ['Fiskeeksport AS', 'Fisk til terminal'], ['Elektro Nord', 'Pallegods til Oslo']],
      minispill: ['lastsikring', 'kundeklage', 'hms-revisjon']
    },
    loft: {
      navn: 'Løfteoperasjoner', ikon: '🏗️', enhet: 'timer', ent: 'time', kap: 140, varKost: 260, husleie: 10000,
      utstyr: { navn: 'lastebil med kran', leie: 38000, kjop: 1400000, drift: 5000 }, pris: [850, 1500],
      beskr: 'Kranbil-tjenester: løft av byggematerialer, maskiner og containere. Du selger kranbiltimer.',
      kunder: ['Byggefirma som trenger løft på byggeplass', 'Industri som flytter maskiner', 'Privatpersoner som skal ha levert og løftet tunge ting'],
      oppdrag: [['Vestbygg', 'Løft av takstoler'], ['Rogaland Stål', 'Flytting av maskin'], ['Hagesenteret', 'Levering av steinheller'], ['Båthavna', 'Løft av båter på land'], ['Containerservice', 'Flytting av containere'], ['Boligbyggerne', 'Løft av ferdigbad'], ['Kommunen', 'Montering av lekeapparater']],
      minispill: ['lastsikring', 'hms-revisjon', 'nestenulykke']
    }
  };

  /* Små hendelser. eff kan ha: kasse, omdomme, hms, kunde, prisFaktor (gang), varFaktor (gang), utsatt (kasse neste mnd) */
  const HENDELSER = [
    { id: 'energi', tittel: 'Kostnadene stiger', tekst: 'Prisene på drivstoff og strøm har steget. De variable kostnadene dine går opp med 8 % fra neste måned.', omrade: 'ledelse', eff0: { varFaktor: 1.08 }, alternativer: [
      { t: 'Regn ut hva økningen betyr per oppdrag, og legg den inn i prisene i nye tilbud. Forklar kundene hvorfor.', s: 3, fb: 'Godt: du bruker kalkylen og er åpen med kundene.', eff: { prisFaktor: 1.06, kunde: -2 } },
      { t: 'Ta kostnaden selv – kundene skal ikke merke noe.', s: 1, fb: 'Kundene blir glade, men dekningsbidraget krymper på alle oppdrag.', eff: {} },
      { t: 'Spar inn ved å utsette service og vedlikehold.', s: 0, fb: 'Å spare på vedlikehold øker risikoen for skader og uhell. Det blir dyrere til slutt.', eff: { hms: -15 } }] },
    { id: 'betaling', tittel: 'Kunden betaler for sent', tekst: 'Den største kunden din skylder 60 000 kr. Fakturaen forfalt for tre uker siden, og du har regninger som skal betales.', omrade: 'ledelse', alternativer: [
      { t: 'Send purring og ring kunden. Avtal en betalingsplan, og følg likviditetsbudsjettet nøye.', s: 3, fb: 'Riktig: kontakt kunden, avtal plan og ha oversikt over likviditeten. Pengene kommer neste måned.', eff: { kasse: -60000, utsatt: 60000 } },
      { t: 'Send saken til inkasso med en gang.', s: 1, fb: 'Kan bli nødvendig, men uten å snakke med kunden først skader du forholdet.', eff: { kasse: -60000, utsatt: 55000, kunde: -10 } },
      { t: 'Vent og se – de betaler vel til slutt.', s: 0, fb: 'Uten oppfølging kan pengene gå tapt, og du risikerer å ikke kunne betale dine egne regninger.', eff: { kasse: -60000, utsatt: 20000 } }] },
    { id: 'syk', tittel: 'En ansatt er syk', tekst: 'En av de mest erfarne ansatte er sykmeldt i to uker. Det er mye å gjøre.', omrade: 'ledelse', alternativer: [
      { t: 'Lei inn en vikar som har riktig opplæring, og gi henne en kort innføring i rutinene.', s: 3, fb: 'Dyrere, men trygt og kundene får det de har bestilt.', eff: { kasse: -25000 } },
      { t: 'De andre jobber to timer overtid hver dag i to uker.', s: 1, fb: 'Kortsiktig mulig, men slitne folk gjør flere feil.', eff: { kasse: -14000, hms: -10 } },
      { t: 'Utsett noen leveranser uten å si fra til kundene.', s: 0, fb: 'Kundene oppdager det, og tilliten blir svekket.', eff: { kunde: -15, omdomme: -5 } }] },
    { id: 'storkunde', tittel: 'Ny storkunde – men lav pris', tekst: 'En stor kjede tilbyr deg en fast avtale for et helt år. Prisen er 10 % under selvkosten din.', omrade: 'ledelse', alternativer: [
      { t: 'Vis kunden kalkylen din og forhandl fram en pris som minst dekker selvkosten. Tilby kortere avtale først.', s: 3, fb: 'Bra: du bruker tallene dine i forhandlingen og tar ikke på deg tap for et helt år.', eff: { kunde: 5, omdomme: 3 } },
      { t: 'Takk ja – volumet er viktigst.', s: 0, fb: 'Under selvkost i et helt år betyr tap hver måned.', eff: { prisFaktor: 0.94 } },
      { t: 'Takk høflig nei.', s: 2, fb: 'Trygt, men du kunne ha prøvd å forhandle først.', eff: {} }] },
    { id: 'konkurrent', tittel: 'Konkurrenten senker prisene', tekst: 'En ny konkurrent tilbyr 20 % lavere priser enn deg. Flere kunder spør om du kan matche.', omrade: 'ledelse', alternativer: [
      { t: 'Konkurrer på kvalitet: leveringspresisjon, god service og at alt er dokumentert. Gi rabatt bare der kalkylen tåler det.', s: 3, fb: 'Godt: du konkurrerer på det du er god på, og har kontroll på økonomien.', eff: { kunde: 5 } },
      { t: 'Senk alle prisene med 20 %.', s: 0, fb: 'Da kan mange oppdrag havne under selvkost.', eff: { prisFaktor: 0.88 } },
      { t: 'Gjør ingenting.', s: 1, fb: 'Noen kunder blir, men du mister noen.', eff: { kunde: -6 } }] },
    { id: 'miljo', tittel: 'Kunden stiller miljøkrav', tekst: 'En viktig kunde vil bare bruke leverandører som kan vise hvordan de reduserer utslipp og avfall.', omrade: 'ledelse', alternativer: [
      { t: 'Lag en enkel miljøplan: bedre ruteplanlegging, høyere fyllingsgrad, mindre tomkjøring og kildesortering. Vis den til kunden.', s: 3, fb: 'Grønn logistikk handler ofte om bedre planlegging – det sparer også penger.', eff: { kasse: -5000, omdomme: 8, kunde: 5 } },
      { t: 'Lov at alt skal bli elektrisk neste uke.', s: 0, fb: 'Et løfte du ikke kan holde. Kunden blir skuffet.', eff: { kunde: -10 } },
      { t: 'Si at miljø ikke er noe for en liten bedrift.', s: 1, fb: 'Du kan miste kunden. Små grep gir ofte stor effekt.', eff: { kunde: -5 } }] },
    { id: 'soker', tittel: 'Ny jobbsøker', tekst: 'Du trenger en ny medarbeider. En søker har fagbrev og god erfaring, men snakker norsk med tydelig aksent og bruker høreapparat.', omrade: 'ledelse', alternativer: [
      { t: 'Vurder søkeren på kompetanse og erfaring som alle andre, og finn ut om noe må tilrettelegges.', s: 3, fb: 'Riktig: likeverdig behandling og tilrettelegging gir et inkluderende yrkesfellesskap.', eff: { omdomme: 5 } },
      { t: 'Velg en annen – det blir enklere.', s: 0, fb: 'Å velge bort noen på grunn av språk eller funksjonsevne kan være diskriminering, og du mister en kvalifisert medarbeider.', eff: { omdomme: -5 } },
      { t: 'Be om en praksisdag før du bestemmer deg.', s: 2, fb: 'Kan være lurt – så lenge alle søkere behandles likt.', eff: {} }] },
    { id: 'utstyr', tittel: 'Skade oppdaget ved daglig kontroll', tekst: 'Ved den daglige kontrollen oppdager en ansatt en skade på utstyret. Reparasjonen koster 15 000 kr.', omrade: 'hms', alternativer: [
      { t: 'Ta utstyret ut av bruk og reparer det før det brukes igjen.', s: 3, fb: 'Riktig. Feil som blir funnet ved kontroll, skal rettes før bruk.', eff: { kasse: -15000, hms: 5 } },
      { t: 'Bruk det forsiktig ut måneden, så reparerer vi da.', s: 0, fb: 'Defekt utstyr kan gi alvorlige ulykker.', eff: { hms: -20 } },
      { t: 'Lån utstyr av en nabobedrift i mellomtiden.', s: 2, fb: 'Kan fungere – sjekk at det lånte utstyret er kontrollert og at de ansatte har opplæring på det.', eff: { kasse: -6000 } }] },
    { id: 'svinn', tittel: 'Varetellingen stemmer ikke', bransjer: ['lager'], tekst: 'Varetellingen viser at det mangler varer for 20 000 kr hos en kunde. Ingen vet hvor de er blitt av.', omrade: 'service', alternativer: [
      { t: 'Gi kunden beskjed, let etter årsaken (mottak, plukk eller registrering) og stram inn rutinene for skanning ved mottak.', s: 3, fb: 'Åpenhet og forbedring av rutinene. Det bygger tillit.', eff: { kasse: -6000, kunde: 3 } },
      { t: 'Erstatt varene uten å si noe.', s: 1, fb: 'Dyrt, og årsaken blir ikke funnet.', eff: { kasse: -20000 } },
      { t: 'Si at kunden sikkert har talt feil.', s: 0, fb: 'Å skylde på kunden uten å undersøke ødelegger tilliten.', eff: { kunde: -15 } }] },
    { id: 'hviletid', tittel: 'Sjåføren vil rekke ferja', bransjer: ['transport'], tekst: 'En sjåfør ringer. Han må kjøre en time ekstra for å rekke ferja, men da bryter han reglene for kjøre- og hviletid.', omrade: 'hms', alternativer: [
      { t: 'Nei. Han tar pausen han skal ha og neste ferje. Du gir kunden beskjed om ny tid.', s: 3, fb: 'Reglene finnes fordi trøtte sjåfører forårsaker ulykker.', eff: { kasse: -4000, kunde: -2 } },
      { t: 'Ok, bare denne ene gangen.', s: 0, fb: 'Brudd på kjøre- og hviletid kan gi store gebyrer og setter liv i fare.', eff: { hms: -15, kasse: -10000 } },
      { t: 'Be ham avgjøre det selv.', s: 1, fb: 'Som leder har du ansvar for planleggingen. Planlegg turen slik at reglene kan følges.', eff: { hms: -5 } }] },
    { id: 'vind', tittel: 'Sterk vind på byggeplassen', bransjer: ['loft'], tekst: 'Vindmåleren viser kraftig vind. Kranføreren og verneombudet vil vente med løftet. Kunden har mannskap som venter.', omrade: 'hms', alternativer: [
      { t: 'Stans løftet og avtal nytt tidspunkt med kunden. Vis kunden målingen og grensen i bruksanvisningen.', s: 3, fb: 'Riktig. Verneombudet kan stanse arbeid ved fare, og bruksanvisningen har grenser for vind.', eff: { kasse: -8000, kunde: -3 } },
      { t: 'Løft likevel – kunden betaler for tiden.', s: 0, fb: 'Vind kan få lasten til å svinge og kranen til å velte. Ingen betaling er verdt det.', eff: { hms: -25, omdomme: -10 } },
      { t: 'Løft bare de letteste elementene.', s: 1, fb: 'Lette, store flater fanger mye vind. Det kan være like farlig.', eff: { hms: -10 } }] },
    { id: 'loftplan', tittel: 'Løft uten planlegging', bransjer: ['loft', 'lager'], tekst: 'En kunde vil ha et tungt løft gjort nå med en gang. Ingen har sjekket underlaget, vekta eller hvor folk skal stå.', omrade: 'hms', alternativer: [
      { t: 'Ta en kort sikker jobb-analyse først: vekt, underlag, utstyr, signaler og sperring av området.', s: 3, fb: 'Planlegging før løft er det viktigste tiltaket mot løfteulykker.', eff: { kasse: -3000 } },
      { t: 'Løft, dere har gjort det før.', s: 0, fb: 'Hvert løft er forskjellig. Uten planlegging overser du lett farer.', eff: { hms: -20 } },
      { t: 'Si nei til oppdraget.', s: 1, fb: 'Trygt, men du kunne ha planlagt og løst oppdraget.', eff: { kunde: -5 } }] }
  ];
  const STOR_INTRO = {
    'hms-revisjon': 'En ekstern revisor kommer for å gå gjennom HMS-systemet. Tiltakene du velger, blir betalt fra kassa.',
    'kundeklage': 'Det har vært en travel uke, og flere kunder ringer med klager. Løsningene du velger, blir betalt fra kassa.',
    'lastsikring': 'Statens vegvesen har varslet flere kontroller av lastsikring i området. Du går gjennom bilene før de kjører.',
    'nestenulykke': 'Det har vært noen nesten-ulykker i bedriften. Du er med på å finne ut hva som skjedde.'
  };

  let G = null;
  const lagre = () => Spill.lager.set(NOKKEL, G);
  const B = () => BRANSJER[G.bransje];
  const runde = n => Math.round(n);

  /* ---------- Beregninger ---------- */
  function fasteKost() {
    const b = B();
    const utst = G.utstyr === 'kjop' ? b.utstyr.drift : b.utstyr.leie;
    return G.ansatte * LONN + b.husleie + G.ansatte * utst + ANDRE_FASTE + runde(G.lan * RENTE_MND);
  }
  const kapasitet = () => G.ansatte * B().kap;
  const varPerEnhet = () => Math.round(B().varKost * (G.varFaktor || 1) * 100) / 100;
  const selvkost = () => Math.round((fasteKost() / kapasitet() + varPerEnhet()) * 100) / 100;
  const fmtPris = v => G.bransje === 'transport' ? tall(v, 2) + ' kr' : kr(v);

  function lagOrdre() {
    const b = B();
    const totalMal = kapasitet() * tilfeldig(125, 155) / 100;
    const antall = 4 + (G.kunde > 70 ? 1 : 0);
    const navn = stokk(b.oppdrag).slice(0, antall);
    const vekter = navn.map(() => 0.5 + Math.random());
    const sum = vekter.reduce((a, v) => a + v, 0);
    const steg = G.bransje === 'transport' ? 50 : 5;
    const faktor = (0.9 + G.omdomme / 500) * (G.prisFaktor || 1);
    return navn.map(([kunde, beskr], i) => {
      const mengde = Math.max(steg, Math.round(totalMal * vekter[i] / sum / steg) * steg);
      const raa = b.pris[0] + Math.random() * (b.pris[1] - b.pris[0]);
      const pris = G.bransje === 'transport' ? Math.round(raa * faktor * 2) / 2 : Math.round(raa * faktor / 10) * 10;
      return { id: 'o' + i, kunde, beskr, mengde, pris };
    });
  }

  /* ---------- Felles visning ---------- */
  function kpi() {
    const m = (v) => `<div class="sp-meter ${v < 35 ? 'bad' : v < 55 ? 'warn' : ''}"><i style="width:${Math.max(0, Math.min(100, v))}%"></i></div>`;
    return `<div class="sp-kpi">
      <div><small>Kasse</small><b${G.kasse < 0 ? ' style="color:#ffb3a8"' : ''}>${kr(G.kasse)}</b></div>
      <div><small>Omdømme</small><b>${runde(G.omdomme)}</b>${m(G.omdomme)}</div>
      <div><small>HMS-nivå</small><b>${runde(G.hms)}</b>${m(G.hms)}</div>
      <div><small>Kundetilfredshet</small><b>${runde(G.kunde)}</b>${m(G.kunde)}</div></div>`;
  }
  function topp(tittel, under) {
    return `<div class="sp-chips"><span class="sp-chip fase">${B() ? esc(B().ikon + ' ' + G.firma) : ''}</span>${G.mnd ? `<span class="sp-chip">Måned ${Math.min(G.mnd, MANEDER)} av ${MANEDER}</span>` : ''}</div>
      <h1 style="font-size:clamp(28px,5vw,42px)">${esc(tittel)}</h1>${under ? `<p class="sp-lead">${under}</p>` : ''}`;
  }
  function klamp() { ['omdomme', 'hms', 'kunde'].forEach(k => { G[k] = Math.max(0, Math.min(100, G[k])); }); }
  function effekt(e) {
    if (!e) return [];
    const ut = [];
    if (e.kasse) { G.kasse += e.kasse; ut.push(`Kasse ${e.kasse > 0 ? '+' : ''}${kr(e.kasse)}`); }
    ['omdomme', 'hms', 'kunde'].forEach(k => { if (e[k]) { G[k] += e[k]; ut.push(`${{ omdomme: 'Omdømme', hms: 'HMS-nivå', kunde: 'Kundetilfredshet' }[k]} ${e[k] > 0 ? '+' : ''}${e[k]}`); } });
    if (e.prisFaktor) { G.prisFaktor = (G.prisFaktor || 1) * e.prisFaktor; ut.push(`Prisene i nye tilbud ${e.prisFaktor > 1 ? 'øker' : 'synker'} ${Math.round(Math.abs(1 - e.prisFaktor) * 100)} %`); }
    if (e.varFaktor) { G.varFaktor = (G.varFaktor || 1) * e.varFaktor; ut.push(`Variable kostnader +${Math.round((e.varFaktor - 1) * 100)} %`); }
    if (e.utsatt) { G.utsatt = (G.utsatt || 0) + e.utsatt; ut.push(`${kr(e.utsatt)} kommer inn neste måned`); }
    klamp();
    return ut;
  }
  function logg(sak, steg, omrade, valg, p, m) {
    leggTil(G.poeng, omrade, p, m);
    G.logg.push({ sak, steg, omrade, valg, p, m });
  }

  /* Ett enkelt valgsteg med tilbakemelding (brukes i oppstart og små hendelser) */
  function valgSteg({ overskrift, tekst, sporsmal, omrade, alternativer, sak, steg, etter }) {
    el.innerHTML = `${overskrift}<div class="sp-panel">${tekst ? `<p>${tekst}</p>` : ''}<h2>${esc(sporsmal)}</h2>
      <div class="sp-opts">${stokk(alternativer.map((a, i) => ({ ...a, i }))).map(a => `<button class="sp-opt" data-i="${a.i}">${a.t}</button>`).join('')}</div><div id="sp-fb" aria-live="polite"></div></div>`;
    el.querySelectorAll('.sp-opt').forEach(b => b.onclick = () => {
      const a = alternativer[+b.dataset.i], maks = Math.max(...alternativer.map(x => x.s));
      logg(sak, steg, omrade, a.t.replace(/<[^>]*>/g, ''), a.s, maks);
      el.querySelectorAll('.sp-opt').forEach(x => { x.disabled = true; if (x !== b) x.classList.add('bes'); });
      b.classList.add('valgt');
      const eff = effekt(a.eff);
      const kl = a.s >= maks ? 'g' : a.s > 0 ? 'm' : 'b';
      el.querySelector('#sp-fb').innerHTML = `<div class="sp-fb ${kl}"><strong>${a.s >= maks ? 'Godt valg.' : a.s > 0 ? 'Delvis riktig.' : 'Ikke et godt valg.'}</strong>${a.fb}${eff.length ? `<br><span class="sp-small">${eff.map(esc).join(' · ')}</span>` : ''}</div>
        <div class="sp-row"><button class="sp-btn" id="sp-videre">Videre</button></div>`;
      lagre();
      const v = el.querySelector('#sp-videre'); v.focus({ preventScroll: true });
      v.onclick = () => { window.scrollTo(0, 0); etter(a); };
    });
  }

  /* ---------- Start ---------- */
  function start() {
    const lagret = Spill.lager.get(NOKKEL);
    el.innerHTML = `<p><a href="/spill/">← Spill</a></p><div class="kicker">Bedriftsspill · Ungdomsbedrift</div><h1>Min TLL-bedrift</h1>
      <p class="sp-lead">Start din egen bedrift innen lager, transport eller løfteoperasjoner. Ta valg om økonomi, kunder og sikkerhet i seks måneder – og se hva som skjer.</p>
      <div class="sp-panel"><div class="sp-chips"><span class="sp-chip fase">Voks</span><span class="sp-chip">Trygg–Ekspert</span><span class="sp-chip">45–60 min</span><span class="sp-chip">Kan tas over flere økter</span></div>
        <h2>Læringsmål</h2><ul>
        <li>Etter spillet kan jeg forklare hva som må på plass når en bedrift etableres.</li>
        <li>Etter spillet kan jeg regne ut selvkost og bruke den til å vurdere om et oppdrag er lønnsomt.</li>
        <li>Etter spillet kan jeg ta gode valg om HMS, kundebehandling og ledelse – og forklare hvorfor.</li></ul>
        <p class="sp-small"><b>Kompetansemål (læreplanen):</b> ${[SPILL_KM.etablering, SPILL_KM.okonomi, SPILL_KM.hms, SPILL_KM.service].map(k => `«${esc(k.tekst)}» (${esc(k.kode)})`).join('; ')}</p>
        <p class="sp-small"><b>Les mer:</b> Bransjelære kap. 1 (etablering), kap. 4 (HMS) og kap. 9 (kalkyler); TLL kap. 3 (service).</p></div>
      ${lagret && !lagret.ferdig ? `<div class="sp-panel"><h2>Du har et spill på gang</h2><p>${esc(lagret.firma || 'Bedriften din')} – måned ${Math.min(lagret.mnd || 0, MANEDER)} av ${MANEDER}.</p>
        <div class="sp-row"><button class="sp-btn" id="sp-fortsett">Fortsett</button><button class="sp-btn ghost" id="sp-nytt">Start på nytt</button></div></div>` : ''}
      <div class="sp-panel" id="sp-nyttpanel"${lagret && !lagret.ferdig ? ' hidden' : ''}><h2>Hvem spiller?</h2><div id="sp-elev"></div></div>`;
    Spill.elevSkjema(el.querySelector('#sp-elev'), { knapp: 'Start bedriften', onStart: elev => {
      G = { v: 1, elev, start: new Date().toISOString(), mnd: 0, poeng: Spill.nyPoeng(OMRADER), logg: [], historikk: [], brukteH: [], brukteStore: [], omdomme: 50, hms: 60, kunde: 60, prisFaktor: 1, varFaktor: 1 };
      lagre(); velgBransje();
    } });
    if (lagret && !lagret.ferdig) {
      el.querySelector('#sp-fortsett').onclick = () => { G = lagret; fortsett(); };
      el.querySelector('#sp-nytt').onclick = () => { el.querySelector('#sp-nyttpanel').hidden = false; el.querySelector('#sp-nytt').closest('.sp-panel').hidden = true; };
    }
  }
  function fortsett() {
    if (!G.bransje) return velgBransje();
    if (!G.firma) return forretningside();
    if (!G.oppstartFerdig) return investering();
    if (G.skjerm === 'hendelse') return hendelse();
    maaned();
  }

  /* ---------- Etablering ---------- */
  function velgBransje() {
    el.innerHTML = `<div class="kicker">Etablering · steg 1 av 4</div><h1 style="font-size:clamp(28px,5vw,42px)">Hva slags bedrift?</h1>
      <p class="sp-lead">Velg fagområdet bedriften skal jobbe innen.</p>
      <div class="sp-opts">${Object.entries(BRANSJER).map(([k, b]) => `<button class="sp-opt" data-k="${k}"><b>${b.ikon} ${esc(b.navn)}</b><br><span class="sp-muted">${esc(b.beskr)}</span></button>`).join('')}</div>`;
    el.querySelectorAll('.sp-opt').forEach(b => b.onclick = () => { G.bransje = b.dataset.k; lagre(); forretningside(); });
    el.querySelector('h1').focus?.();
  }

  function forretningside() {
    const b = B();
    el.innerHTML = `<div class="kicker">Etablering · steg 2 av 4</div><h1 style="font-size:clamp(28px,5vw,42px)">Forretningsidé</h1>
      <div class="sp-panel"><label class="sp-label" for="sp-firma">Navn på bedriften</label><input class="sp-input" id="sp-firma" maxlength="40" placeholder="f.eks. Fjordlogistikk">
      <label class="sp-label">Hvilke kunder skal dere ha?</label><div class="sp-opts" id="sp-kg">${b.kunder.map((k, i) => `<button class="sp-opt" data-i="${i}">${esc(k)}</button>`).join('')}</div>
      <div class="sp-row"><button class="sp-btn" id="sp-ok" disabled>Videre</button></div></div>`;
    let valgt = null;
    const sjekk = () => { el.querySelector('#sp-ok').disabled = !(valgt !== null && el.querySelector('#sp-firma').value.trim()); };
    el.querySelector('#sp-firma').oninput = sjekk;
    el.querySelectorAll('#sp-kg .sp-opt').forEach(x => x.onclick = () => { valgt = +x.dataset.i; el.querySelectorAll('#sp-kg .sp-opt').forEach(y => y.classList.toggle('valgt', y === x)); sjekk(); });
    el.querySelector('#sp-ok').onclick = () => {
      G.firma = el.querySelector('#sp-firma').value.trim(); G.kundegruppe = b.kunder[valgt]; lagre();
      valgSteg({ overskrift: topp('Forretningsidé', `${esc(G.firma)} skal tilby ${esc(b.navn.toLowerCase())} til: ${esc(G.kundegruppe.toLowerCase())}.`),
        sporsmal: 'Banken vil se forretningsideen. Hva må den beskrive?', omrade: 'etablering', sak: 'Etablering', steg: 'Forretningsidé',
        alternativer: [
          { t: 'Hvilket behov i markedet vi dekker, hvilke tjenester vi tilbyr, hvem kundene er, hvor vi skal operere og hvordan vi skal tjene penger.', s: 3, fb: 'Riktig. Forretningsideen setter rammene for bedriften.' },
          { t: 'Navnet, logoen og fargene på bilene.', s: 0, fb: 'Profil er fint, men banken vil vite hvordan dere skal tjene penger.' },
          { t: 'En liste over utstyret vi skal kjøpe.', s: 1, fb: 'Utstyret hører hjemme i kapitalbehovet. Forretningsideen handler om marked, kunder og lønnsomhet.' }],
        etter: organisering });
    };
  }

  function organisering() {
    valgSteg({ overskrift: topp('Organisering', 'Dere er tre som starter bedriften sammen og skal registrere den i Brønnøysundregistrene.'),
      sporsmal: 'Hvilken selskapsform passer best?', omrade: 'etablering', sak: 'Etablering', steg: 'Selskapsform',
      alternativer: [
        { t: 'Aksjeselskap (AS) – eierne skyter inn aksjekapital, og hefter bare med det de har skutt inn.', s: 3, fb: 'Godt valg for flere eiere med investeringer: begrenset ansvar og tydelig eierskap.' },
        { t: 'Enkeltpersonforetak (ENK) – én av dere står som eier.', s: 1, fb: 'Et ENK har bare én eier, og eieren hefter med hele sin private formue. Passer dårlig når dere er tre.' },
        { t: 'Vi trenger ikke registrere noe før vi tjener penger.', s: 0, fb: 'En bedrift som skal selge tjenester, må registreres. Det gjelder også ungdomsbedrifter.' }],
      etter: () => valgSteg({ overskrift: topp('Organisering'), sporsmal: 'Hvem har det øverste ansvaret for HMS i bedriften?', omrade: 'etablering', sak: 'Etablering', steg: 'Ansvar for HMS',
        alternativer: [
          { t: 'Daglig leder.', s: 3, fb: 'Riktig. Daglig leder har det øverste ansvaret, selv om oppgaver kan fordeles.' },
          { t: 'Verneombudet.', s: 0, fb: 'Verneombudet passer på de ansattes interesser, men har ikke ansvaret for HMS.' },
          { t: 'Hver ansatt for seg selv.', s: 1, fb: 'Alle må følge reglene, men ansvaret for systemet ligger hos ledelsen.' }],
        etter: investering }) });
  }

  function investering() {
    const b = B();
    G.ansatte = G.ansatte || 1; G.utstyr = G.utstyr || 'leie'; G.lan = G.lan || 0;
    const tegn = () => {
      const kjop = G.utstyr === 'kjop' ? b.utstyr.kjop * G.ansatte : 0;
      const kasse = EGENKAPITAL + G.lan - kjop;
      const ok = kasse >= 100000;
      el.innerHTML = `<div class="kicker">Etablering · steg 3 av 4</div><h1 style="font-size:clamp(28px,5vw,42px)">Kapital og utstyr</h1>
        <p class="sp-lead">Eierne skyter inn ${kr(EGENKAPITAL)}. Bestem hvor mange som skal jobbe, om dere skal leie eller kjøpe ${esc(b.utstyr.navn)}, og om dere trenger lån.</p>
        <div class="sp-panel">
          <label class="sp-label" for="sp-ans">Antall ansatte (hver ansatt har én ${esc(b.utstyr.navn)})</label>
          <select id="sp-ans" class="sp-input" style="max-width:200px">${[1, 2, 3].map(n => `<option${n === G.ansatte ? ' selected' : ''}>${n}</option>`).join('')}</select>
          <label class="sp-label" for="sp-utst">Utstyr</label>
          <select id="sp-utst" class="sp-input"><option value="leie"${G.utstyr === 'leie' ? ' selected' : ''}>Lease: ${kr(b.utstyr.leie)} per måned per ${esc(b.utstyr.navn)}</option>
            <option value="kjop"${G.utstyr === 'kjop' ? ' selected' : ''}>Kjøpe: ${kr(b.utstyr.kjop)} per ${esc(b.utstyr.navn)} + ${kr(b.utstyr.drift)} i vedlikehold per måned</option></select>
          <label class="sp-label" for="sp-lan">Banklån (rente ca. 7 % i året)</label>
          <select id="sp-lan" class="sp-input" style="max-width:260px">${[0, 300000, 800000, 1500000].map(n => `<option value="${n}"${n === G.lan ? ' selected' : ''}>${n ? kr(n) : 'Ikke lån'}</option>`).join('')}</select>
          <table class="sp-table" style="margin-top:16px"><tbody>
            <tr><td>Kasse ved start</td><td class="num"><b${ok ? '' : ' style="color:#ffb3a8"'}>${kr(kasse)}</b></td></tr>
            <tr><td>Faste kostnader per måned</td><td class="num">${kr(fasteKost())}</td></tr>
            <tr><td>Kapasitet per måned</td><td class="num">${tall(kapasitet())} ${esc(b.enhet)}</td></tr>
            <tr><td>Variable kostnader</td><td class="num">${fmtPris(varPerEnhet())} per ${esc(b.ent)}</td></tr></tbody></table>
          ${ok ? '' : '<p class="sp-fb b">Dere har for lite penger igjen i kassa. Bedriften trenger minst 100 000 kr i driftskapital. Ta lån, lease utstyret eller ha færre ansatte.</p>'}
          <div class="sp-row"><button class="sp-btn" id="sp-ok"${ok ? '' : ' disabled'}>Bestem</button></div></div>`;
      el.querySelector('#sp-ans').onchange = e => { G.ansatte = +e.target.value; tegn(); };
      el.querySelector('#sp-utst').onchange = e => { G.utstyr = e.target.value; tegn(); };
      el.querySelector('#sp-lan').onchange = e => { G.lan = +e.target.value; tegn(); };
      el.querySelector('#sp-ok').onclick = () => {
        G.kasse = kasse; G.utstyrsverdi = kjop; G.egenkapitalStart = EGENKAPITAL; lagre();
        valgSteg({ overskrift: topp('Finansiering'), sporsmal: `Hvordan bør et kjøp av ${b.utstyr.navn} helst finansieres?`, omrade: 'etablering', sak: 'Etablering', steg: 'Finansieringsplan',
          alternativer: [
            { t: 'Med egenkapital og langsiktig lån – utstyret skal brukes i mange år.', s: 3, fb: 'Riktig. Anleggsmidler bør finansieres med langsiktig kapital.' },
            { t: 'Med kassekreditt.', s: 1, fb: 'Kassekreditt er kortsiktig og dyr. Den passer for svingninger i driften, ikke for store kjøp.' },
            { t: 'Ved å vente med å betale leverandøren.', s: 0, fb: 'Leverandørgjeld må betales raskt og er ikke en måte å finansiere utstyr på.' }],
          etter: selvkostOppgave });
      };
    };
    tegn();
  }

  function selvkostOppgave() {
    const b = B(), f = fasteKost(), k = kapasitet(), v = varPerEnhet(), s = selvkost();
    el.innerHTML = `<div class="kicker">Etablering · steg 4 av 4</div><h1 style="font-size:clamp(28px,5vw,42px)">Hva koster én ${esc(b.ent)}?</h1>
      <div class="sp-panel"><p>Før dere gir priser til kundene, må dere vite selvkosten. Bruk tallene for bedriften deres:</p>
      <table class="sp-table"><tbody><tr><td>Faste kostnader per måned</td><td class="num">${kr(f)}</td></tr><tr><td>Kapasitet per måned</td><td class="num">${tall(k)} ${esc(b.enhet)}</td></tr><tr><td>Variable kostnader per ${esc(b.ent)}</td><td class="num">${fmtPris(v)}</td></tr></tbody></table>
      <p class="sp-small">Selvkost per ${esc(b.ent)} = faste kostnader ÷ kapasitet + variable kostnader per ${esc(b.ent)}</p>
      <label class="sp-label" for="sp-svar">Selvkost per ${esc(b.ent)} (kr)</label><input class="sp-input" id="sp-svar" inputmode="decimal" style="max-width:240px" autocomplete="off">
      <div class="sp-row"><button class="sp-btn" id="sp-sjekk">Sjekk</button></div><div id="sp-fb" aria-live="polite"></div></div>`;
    const inp = el.querySelector('#sp-svar'); inp.focus();
    const sjekk = () => {
      const x = parseFloat(inp.value.replace(/\s/g, '').replace(',', '.'));
      if (isNaN(x)) return inp.focus();
      const tol = G.bransje === 'transport' ? 0.3 : 5;
      const p = Math.abs(x - s) <= tol ? 3 : Math.abs(x - s) <= s * 0.1 ? 1 : 0;
      logg('Etablering', 'Selvkost per ' + b.ent, 'kalkyle', `svarte ${tall(x, 2)} (riktig ${tall(s, 2)})`, p, 3);
      inp.disabled = true; el.querySelector('#sp-sjekk').disabled = true;
      G.oppstartFerdig = true; G.mnd = 1; G.skjerm = 'ordre'; G.ordre = lagOrdre(); lagre();
      el.querySelector('#sp-fb').innerHTML = `<div class="sp-fb ${p === 3 ? 'g' : p ? 'm' : 'b'}"><strong>${p === 3 ? 'Riktig!' : p ? 'Nesten.' : 'Ikke riktig.'}</strong>
        ${kr(f)} ÷ ${tall(k)} + ${fmtPris(v)} = <b>${fmtPris(s)} per ${esc(b.ent)}</b>. Tar dere en lavere pris enn dette, dekker dere ikke alle kostnadene når all kapasiteten er i bruk.
        <br><span class="sp-small">Selvkosten vises øverst hver måned fra nå av.</span></div><div class="sp-row"><button class="sp-btn" id="sp-videre">Åpne bedriften</button></div>`;
      el.querySelector('#sp-videre').onclick = () => { window.scrollTo(0, 0); maaned(); };
      el.querySelector('#sp-videre').focus();
    };
    el.querySelector('#sp-sjekk').onclick = sjekk;
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') sjekk(); });
  }

  /* ---------- Måned: velg oppdrag ---------- */
  function maaned() {
    if (G.mnd > MANEDER) return avslutning();
    if (G.skjerm === 'hendelse') return hendelse();
    const b = B(), kap = kapasitet(), s = selvkost(), v = varPerEnhet();
    if (!G.ordre) { G.ordre = lagOrdre(); lagre(); }
    const valgt = new Set();
    const brukt = () => G.ordre.filter(o => valgt.has(o.id)).reduce((a, o) => a + o.mengde, 0);
    el.innerHTML = `${topp('Ordrebok', `Disse kundene ber om tilbud denne måneden. Velg hvilke oppdrag dere tar – dere har ikke kapasitet til alle.`)}
      ${kpi()}
      <div class="sp-hud"><span>Selvkost: ${fmtPris(s)} per ${esc(b.ent)}</span><span>Variable kostnader: ${fmtPris(v)} per ${esc(b.ent)}</span><span>Faste kostnader: ${kr(fasteKost())}/mnd</span></div>
      <div class="sp-panel"><div class="sp-row" style="margin:0;justify-content:space-between"><b>Kapasitet brukt</b><span id="sp-kap"></span></div><div class="sp-bar"><i id="sp-kapbar" style="width:0"></i></div>
      <div id="sp-ordre">${G.ordre.map(o => `<label class="sp-ordre" data-id="${o.id}"><input type="checkbox" value="${o.id}"><span><b>${esc(o.kunde)}</b> – ${esc(o.beskr)}<br>
        <span class="tall">${tall(o.mengde)} ${esc(b.enhet)} × ${fmtPris(o.pris)} = <b>${kr(o.mengde * o.pris)}</b></span></span></label>`).join('')}</div>
      <div class="sp-row"><button class="sp-btn" id="sp-kjor">Kjør måneden</button><span class="sp-small">Tips: sammenlign prisen per ${esc(b.ent)} med selvkosten og de variable kostnadene.</span></div></div>`;
    const oppdater = () => {
      const u = brukt();
      el.querySelector('#sp-kap').textContent = `${tall(u)} av ${tall(kap)} ${b.enhet} (${Math.round(u / kap * 100)} %)`;
      el.querySelector('#sp-kapbar').style.width = Math.min(100, u / kap * 100) + '%';
      el.querySelectorAll('.sp-ordre').forEach(l => {
        const o = G.ordre.find(x => x.id === l.dataset.id), cb = l.querySelector('input');
        const av = !valgt.has(o.id) && u + o.mengde > kap;
        cb.disabled = av; l.classList.toggle('av', av);
      });
    };
    el.querySelectorAll('.sp-ordre input').forEach(cb => cb.onchange = () => { cb.checked ? valgt.add(cb.value) : valgt.delete(cb.value); oppdater(); });
    oppdater();
    el.querySelector('#sp-kjor').onclick = () => kjorMaaned(valgt);
  }

  function kjorMaaned(valgt) {
    const b = B(), s = selvkost(), v = varPerEnhet(), f = fasteKost(), kap = kapasitet();
    const tatt = G.ordre.filter(o => valgt.has(o.id));
    const inntekt = tatt.reduce((a, o) => a + o.mengde * o.pris, 0);
    const mengde = tatt.reduce((a, o) => a + o.mengde, 0);
    const varK = runde(mengde * v);
    const utsatt = G.utsatt || 0; G.utsatt = 0;
    const resultat = runde(inntekt - varK - f);
    G.kasse += resultat + utsatt;
    const utn = mengde / kap;
    // Vurdering: pris på hvert oppdrag og utnyttelse av kapasiteten
    const vurd = tatt.map(o => {
      const p = o.pris >= s ? 3 : o.pris > v ? 2 : 0;
      logg(`Måned ${G.mnd}`, 'Oppdrag: ' + o.kunde, 'pris', `godtok ${fmtPris(o.pris)} per ${b.ent} (selvkost ${fmtPris(s)}, variable ${fmtPris(v)})`, p, 3);
      return { o, p };
    });
    // Avslåtte oppdrag med pris over selvkost når det var ledig kapasitet, telles også
    G.ordre.filter(o => !valgt.has(o.id) && o.pris >= s && mengde + o.mengde <= kap).forEach(o => {
      logg(`Måned ${G.mnd}`, 'Oppdrag: ' + o.kunde, 'pris', `takket nei til lønnsomt oppdrag (${fmtPris(o.pris)}) selv om det var ledig kapasitet`, 0, 3);
    });
    const pPlan = utn >= 0.75 ? 3 : utn >= 0.5 ? 2 : utn >= 0.25 ? 1 : 0;
    logg(`Måned ${G.mnd}`, 'Kapasitet', 'planlegging', `utnyttet ${Math.round(utn * 100)} % av kapasiteten`, pPlan, 3);
    // Kundetilfredshet påvirkes litt av HMS og tilfeldigheter
    G.kunde += (G.hms < 40 ? -4 : 1) + tilfeldig(-2, 2); G.omdomme += resultat > 0 ? 2 : -1; klamp();
    G.historikk.push({ mnd: G.mnd, inntekt, varK, f, resultat, utsatt, kasse: G.kasse, utn: Math.round(utn * 100) });
    G.skjerm = 'hendelse'; G.ordre = null; lagre();

    const db = inntekt - varK;
    el.innerHTML = `${topp(`Resultat for måned ${G.mnd}`)}
      <div class="sp-panel"><table class="sp-table"><tbody>
        <tr><td>Inntekter (${tall(mengde)} ${esc(b.enhet)})</td><td class="num">${kr(inntekt)}</td></tr>
        <tr><td>– Variable kostnader</td><td class="num">${kr(-varK)}</td></tr>
        <tr><td><b>= Dekningsbidrag</b></td><td class="num"><b>${kr(db)}</b></td></tr>
        <tr><td>– Faste kostnader</td><td class="num">${kr(-f)}</td></tr>
        <tr><td><b>= Resultat</b></td><td class="num"><b style="color:${resultat >= 0 ? 'var(--ok)' : '#ffb3a8'}">${kr(resultat)}</b></td></tr>
        ${utsatt ? `<tr><td>+ Innbetaling fra forrige måned</td><td class="num">${kr(utsatt)}</td></tr>` : ''}
        <tr><td>Kasse nå</td><td class="num">${kr(G.kasse)}</td></tr></tbody></table>
      <p class="sp-small">Kapasitetsutnyttelse: ${Math.round(utn * 100)} %. ${utn < 0.5 ? 'Mye ledig kapasitet betyr at de faste kostnadene fordeles på få timer/km.' : ''}</p></div>
      ${vurd.length ? `<div class="sp-panel"><h2>Prisene du godtok</h2>${vurd.map(({ o, p }) => `<div class="sp-fb ${p === 3 ? 'g' : p ? 'm' : 'b'}"><b>${esc(o.kunde)}</b>: ${fmtPris(o.pris)} per ${esc(b.ent)}. ${p === 3 ? 'Over selvkost – lønnsomt.' : p ? 'Under selvkost, men over de variable kostnadene. Gir et positivt dekningsbidrag når kapasiteten ellers står ledig.' : 'Under de variable kostnadene. Dere taper penger på hver ' + esc(b.ent) + '.'}</div>`).join('')}</div>` : ''}
      <div class="sp-row"><button class="sp-btn" id="sp-videre">Videre</button></div>`;
    el.querySelector('#sp-videre').onclick = () => { window.scrollTo(0, 0); G.kasse < -KASSEKREDITT ? konkurs() : hendelse(); };
    el.querySelector('#sp-videre').focus();
  }

  /* ---------- Hendelser ---------- */
  function hendelse() {
    G.skjerm = 'hendelse'; lagre();
    const stor = G.mnd % 2 === 0;
    if (stor) return storHendelse();
    const mulige = HENDELSER.filter(h => (!h.bransjer || h.bransjer.includes(G.bransje)) && !G.brukteH.includes(h.id));
    // Lavt HMS-nivå gjør HMS-hendelser mer sannsynlige
    const vektet = mulige.flatMap(h => (h.omrade === 'hms' && G.hms < 50) ? [h, h, h] : [h]);
    const h = vektet[Math.floor(Math.random() * vektet.length)];
    G.brukteH.push(h.id); lagre();
    const eff0 = effekt(h.eff0);
    valgSteg({ overskrift: `${topp('Hendelse: ' + h.tittel)}${kpi()}`, tekst: h.tekst + (eff0.length ? `<br><span class="sp-small">${eff0.map(esc).join(' · ')}</span>` : ''),
      sporsmal: 'Hva gjør du?', omrade: h.omrade, alternativer: h.alternativer, sak: `Måned ${G.mnd}`, steg: 'Hendelse: ' + h.tittel, etter: nesteMaaned });
  }

  async function storHendelse() {
    const id = B().minispill.find(x => !G.brukteStore.includes(x)) || 'hms-revisjon';
    const sc = SCENARIER[id];
    el.innerHTML = `${topp('Stor hendelse: ' + sc.tittel)}${kpi()}<div class="sp-panel"><p>${esc(STOR_INTRO[id] || sc.rolle)}</p>
      <p class="sp-small">Dette er minispillet «${esc(sc.tittel)}» med to saker. Valgene dine påvirker kassa, HMS-nivået, kundetilfredsheten og omdømmet.</p>
      <div class="sp-row"><button class="sp-btn" id="sp-go">Start</button></div></div>`;
    el.querySelector('#sp-go').focus();
    await new Promise(r => { el.querySelector('#sp-go').onclick = r; });
    const budsjett = sc.budsjett ? Math.max(0, Math.min(sc.budsjett, G.kasse + KASSEKREDITT)) : undefined;
    const res = await Spill.kjorScenario(el, sc, { antall: 2, budsjett });
    // Flett resultatet inn i bedriftsspillet
    let p = 0, m = 0;
    res.logg.forEach(l => { const omr = KART[l.omrade] || 'hms'; logg(`Måned ${G.mnd} · ${sc.tittel}`, `${l.sak}: ${l.steg}`, omr, l.valg, l.p, l.m); p += l.p; m += l.m; });
    const r = m ? p / m : 0;
    const e = { kasse: -res.brukt };
    const d = Math.round((r - 0.6) * 40);
    if (id === 'kundeklage') { e.kunde = d; e.omdomme = Math.round(d / 2); } else { e.hms = d; e.omdomme = Math.round(d / 2); }
    let ekstra = '';
    if (r < 0.5) {
      const bot = { 'hms-revisjon': 20000, lastsikring: 12000, nestenulykke: 15000, kundeklage: 10000 }[id] || 10000;
      e.kasse -= bot;
      ekstra = { 'hms-revisjon': 'Revisor ga pålegg om å rette avvikene innen en frist. Det koster ekstra å rydde opp i etterkant.', lastsikring: 'En av bilene ble stanset i kontroll. Forsinkelsen og gebyret koster bedriften penger.', nestenulykke: 'Kort tid etter skjedde det en ulykke med personskade. Fravær og ekstra tiltak koster bedriften.', kundeklage: 'En misfornøyd kunde krevde erstatning og fortalte det videre til andre.' }[id];
      ekstra += ` (${kr(-bot)})`;
    }
    G.brukteStore.push(id);
    const eff = effekt(e); lagre();
    el.innerHTML = `${topp('Slik gikk det')}<div class="sp-panel"><h2>${esc(sc.tittel)}: ${p} av ${m} poeng</h2>
      <p>${r >= 0.8 ? 'Svært godt håndtert! Det styrker bedriften.' : r >= 0.5 ? 'Greit håndtert, men noe kunne vært gjort bedre.' : 'Dette gikk ikke så bra.'}</p>
      ${ekstra ? `<p class="sp-fb b">${esc(ekstra)}</p>` : ''}<p class="sp-small">${eff.map(esc).join(' · ')}</p></div>${kpi()}
      <div class="sp-row"><button class="sp-btn" id="sp-videre">Videre</button></div>`;
    el.querySelector('#sp-videre').onclick = () => { window.scrollTo(0, 0); nesteMaaned(); };
    el.querySelector('#sp-videre').focus();
  }

  function nesteMaaned() {
    if (G.kasse < -KASSEKREDITT) return konkurs();
    G.mnd++; G.skjerm = 'ordre'; G.ordre = G.mnd <= MANEDER ? lagOrdre() : null; lagre();
    maaned();
  }

  /* ---------- Avslutning ---------- */
  function konkurs() {
    G.konkurs = true; G.mnd = Math.min(G.mnd, MANEDER) + 1; lagre();
    el.innerHTML = `${topp('Bedriften må avvikles')}<div class="sp-panel"><p>Kassa er tom, og banken vil ikke øke kassekreditten. ${esc(G.firma)} må avvikles før tiden.</p>
      <p>Det skjer med mange nye bedrifter – ofte fordi prisene ikke dekker kostnadene, eller fordi pengene kommer inn for sent. Se på rapporten hva som gikk galt.</p>
      <div class="sp-row"><button class="sp-btn" id="sp-videre">Til årsoppgjøret</button></div></div>`;
    el.querySelector('#sp-videre').onclick = avslutning;
  }

  function avslutning() {
    const verdi = G.utstyrsverdi ? Math.round(G.utstyrsverdi * 0.88) : 0;
    const ekSlutt = G.kasse + verdi - G.lan;
    const resultat = ekSlutt - G.egenkapitalStart;
    G.oppgjor = { verdi, ekSlutt, resultat };
    lagre();
    el.innerHTML = `${topp('Årsoppgjør og avvikling', `Som i ungdomsbedriften avsluttes bedriften med et oppgjør: Hva har dere skapt, og hva sitter eierne igjen med?`)}
      <div class="sp-panel"><h2>Måned for måned</h2><table class="sp-table"><thead><tr><th>Mnd</th><th class="num">Inntekter</th><th class="num">Resultat</th><th class="num">Kapasitet</th><th class="num">Kasse</th></tr></thead><tbody>
        ${G.historikk.map(h => `<tr><td>${h.mnd}</td><td class="num">${kr(h.inntekt)}</td><td class="num">${kr(h.resultat)}</td><td class="num">${h.utn} %</td><td class="num">${kr(h.kasse)}</td></tr>`).join('')}</tbody></table></div>
      <div class="sp-panel"><h2>Balanse ved slutt</h2><table class="sp-table"><tbody>
        <tr><td>Kasse</td><td class="num">${kr(G.kasse)}</td></tr>
        ${verdi ? `<tr><td>+ Utstyr (verdi etter bruk)</td><td class="num">${kr(verdi)}</td></tr>` : ''}
        ${G.lan ? `<tr><td>– Banklån</td><td class="num">${kr(-G.lan)}</td></tr>` : ''}
        <tr><td><b>= Egenkapital ved slutt</b></td><td class="num"><b>${kr(ekSlutt)}</b></td></tr>
        <tr><td>Egenkapital ved start</td><td class="num">${kr(G.egenkapitalStart)}</td></tr>
        <tr><td><b>Overskudd/underskudd for perioden</b></td><td class="num"><b style="color:${resultat >= 0 ? 'var(--ok)' : '#ffb3a8'}">${kr(resultat)}</b></td></tr></tbody></table>
        <p class="sp-small">Omdømme ${runde(G.omdomme)} · HMS-nivå ${runde(G.hms)} · Kundetilfredshet ${runde(G.kunde)}</p></div>`;
    const wrap = document.createElement('div'); el.appendChild(wrap);
    Spill.refleksjon(wrap, `Se på tallene og valgene dine. <b>Hva var det viktigste du gjorde som påvirket resultatet – positivt eller negativt?</b> Hva ville du gjort annerledes hvis du startet ${esc(G.firma)} på nytt?`, ref => {
      G.refleksjon = ref; G.ferdig = true; lagre(); rapport();
    });
  }

  function rapport() {
    const o = G.oppgjor;
    const ekstra = [
      `Bedrift: ${G.firma} (${B().navn}), ${G.ansatte} ansatt(e), utstyr ${G.utstyr === 'kjop' ? 'kjøpt' : 'leaset'}, lån ${kr(G.lan)}`,
      `Resultat for perioden: ${kr(o.resultat)} · egenkapital ved slutt ${kr(o.ekSlutt)}${G.konkurs ? ' · avviklet før tiden' : ''}`,
      `Omdømme ${runde(G.omdomme)} · HMS-nivå ${runde(G.hms)} · Kundetilfredshet ${runde(G.kunde)}`
    ];
    const rap = Spill.lagRapport({ spillId: 'min-tll-bedrift', tittel: 'Min TLL-bedrift', elev: G.elev, poeng: G.poeng, logg: G.logg, refleksjon: G.refleksjon, start: G.start, ekstra });
    Spill.visRapport(el, rap, { nyKnapp: 'Start en ny bedrift', onNy: () => { Spill.lager.del(NOKKEL); start(); }, tilbake: '/spill/' });
  }

  start();
})();
