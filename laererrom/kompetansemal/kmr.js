/* Kompetansemålsregnskap – TLLfluenseren lærerrom.
   Alle elevdata krypteres i nettleseren (AES-GCM, nøkkel fra passordet med PBKDF2) og lagres
   i en fil læreren velger selv (helst skolens OneDrive) og som kopi i denne nettleseren.
   Ingenting sendes til nettstedet eller til GitHub. */
(() => {
  'use strict';

  /* ---------- Kompetansemål (TOL02-01) ---------- */
  const MAAL = {
    BT: [['BT1', 'føre personbil i henhold til gjeldende regelverk'], ['BT2', 'reflektere over og vurdere risiko i ulike situasjoner knyttet til føring av personbil'], ['BT3', 'anhuke og gi signal ved lossing og lasting etter gjeldende opplæringsplan og regelverk'], ['BT4', 'betjene truck i klassene T1, T2 og T4 etter gjeldende opplæringsplan og regelverk'], ['BT5', 'gjøre rede for innholdet i forskrift om landtransport av farlig gods og bruke dette til å planlegge transport av farlig gods i ulike klasser'], ['BT6', 'gjøre rede for rutiner og konsekvenser knyttet til uhell ved håndtering av farlig gods']],
    TLL: [['TLL1', 'gjøre rede for grunnleggende prinsipper for effektiv drift av lager og terminal'], ['TLL2', 'planlegge, gjennomføre og dokumentere logistikk-, transport- og løfteoppdrag etter gjeldende regelverk'], ['TLL3', 'yte service og gi kundebehandling ved ulike typer oppdrag og kartlegge kundens behov og krav til utførelse'], ['TLL4', 'utføre emballering, merking og klargjøring av gods for forsendelse på en forsvarlig måte i henhold til godsets egenart og gjeldende bestemmelser'], ['TLL5', 'sikre last etter gjeldende forskrifter'], ['TLL6', 'bruke ulike metoder og utstyr for å utføre sikre laste-, losse- og løfteoperasjoner'], ['TLL7', 'bruke og vedlikeholde manuelt, teknisk og digitalt arbeidsutstyr'], ['TLL8', 'velge ut og bruke ulike teknisk- og servicerelaterte hjelpemidler ved person- og godstransport og ved logistikk og løfteoperasjoner'], ['TLL9', 'sikre skadested og utføre livreddende førstehjelp'], ['TLL10', 'håndtere og transportere varer med truck etter gjeldende forskrifter']],
    BL: [['BL1', 'beskrive sentrale områder ved etablering, ledelse og økonomisk styring av en virksomhet'], ['BL2', 'gjøre rede for sentrale lover og regler innenfor person- og godstransport, logistikk og løfteoperasjoner og beskrive forsikringsordninger i faget'], ['BL3', 'gjøre rede for begrepene og forklare sammenhengen mellom bærekraftig utvikling, miljøvennlig drift og grønn logistikk'], ['BL4', 'planlegge og utføre arbeid i samsvar med gjeldende regelverk for helse, miljø og sikkerhet, sertifiseringsbestemmelser og næringens krav til kvalitet'], ['BL5', 'forklare sammenhengen mellom kosthold, fysisk helse og livsstilssykdommer og reflektere over betydningen av å ivareta egen helse'], ['BL6', 'forklare hovedtrekkene i norsk samferdselspolitikk'], ['BL7', 'forklare prosedyrer ved transport over landegrenser'], ['BL8', 'beskrive verdikjeder fra produksjon til sluttbruker og gjenvinning'], ['BL9', 'gjøre enkle økonomiske beregninger og vurdere hvilke faktorer som har betydning for prisfastsettelse av oppdrag'], ['BL10', 'reflektere over og følge yrkesetiske normer'], ['BL11', 'drøfte hvilke krav og forventninger som stilles til et likeverdig og inkluderende yrkesfellesskap, og beskrive hvilke plikter og rettigheter arbeidsgiver og arbeidstaker har i arbeidslivet']]
  };
  MAAL.YFF = [];
  const FAG = { BT: 'Bransjeteknikk', TLL: 'Transport, logistikk og løfteoperasjoner', BL: 'Bransjelære', YFF: 'Yrkesfaglig fordypning (YFF)' };
  const TEKST = {}; Object.values(MAAL).flat().forEach(([k, t]) => { TEKST[k] = t; });
  const fagMedMaal = () => Object.keys(MAAL).filter(f => MAAL[f].length);
  function oppdaterYff() { MAAL.YFF = (S.data.yffMaal || []).map(m => [m.kode, m.tekst]); MAAL.YFF.forEach(([k, t]) => { TEKST[k] = t; }); }
  const fagAv = kode => kode.replace(/\d+$/, '');
  const DOKTYPER = ['Praktisk – observasjon', 'Praktisk – video eller bilder', 'Skriftlig innlevering', 'Muntlig – fagsamtale eller presentasjon', 'Prøve', 'Rapport fra TLLfluenseren', 'Tverrfaglig oppdrag', 'Praksis i bedrift (YFF)', 'Ungdomsbedrift – arbeid og dokumentasjon', 'Elevens egenvurdering', 'Annet'];
  const EGENVURD = 'Elevens egenvurdering';
  const SOSIALE_FORSLAG = [['Vi passer på hverandre', 'Sier fra om utrygge situasjoner og stopper arbeidet når noe er farlig.'], ['Vi deler på oppgavene', 'Bytter roller, slik at alle både gjør og dokumenterer. Ingen tar over.'], ['Vi gir og tar imot tilbakemelding', 'Spør «hvordan vet du det?», sjekker hverandres arbeid og tar imot innspill uten å avvise dem.'], ['Vi inkluderer alle', 'Tar med alle i gruppa, lytter og fordeler ordet.']];
  const ITER = 600000, LAAS_ETTER_MIN = 20;

  /* ---------- Hjelpere ---------- */
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const idag = () => new Date().toISOString().slice(0, 10);
  const naa = () => new Date().toISOString();
  const datoTxt = d => d ? d.slice(8, 10) + '.' + d.slice(5, 7) + '.' + d.slice(2, 4) : '';
  const tidTxt = t => { const d = new Date(t); return d.toLocaleDateString('nb-NO') + ' ' + d.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' }); };
  const skolear = d => { const y = +d.slice(0, 4), m = +d.slice(5, 7); return m >= 8 ? `${y}/${y + 1}` : `${y - 1}/${y}`; };
  const termin = d => (+d.slice(5, 7) >= 8 ? 1 : 2);
  const kTxt = v => v.status === 'ikke-levert' ? 'Ikke levert' : v.status === 'fravaer' ? 'Fravær' : v.karakter ? v.karakter + (v.tendens || '') : '–';
  const kKl = k => !k ? 'k0' : k <= 2 ? 'k-lav' : k <= 4 ? 'k-mid' : 'k-hoy';
  const enc = s => new TextEncoder().encode(s);
  const b64 = u => { u = new Uint8Array(u); let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
  const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));

  /* ---------- Lagring i nettleseren (IndexedDB) ---------- */
  const idb = (mode, fn) => new Promise((res, rej) => {
    const r = indexedDB.open('tll-kmr', 1);
    r.onupgradeneeded = () => r.result.createObjectStore('kv');
    r.onerror = () => rej(r.error);
    r.onsuccess = () => { const tx = r.result.transaction('kv', mode); const q = fn(tx.objectStore('kv')); tx.oncomplete = () => res(q && q.result); tx.onerror = () => rej(tx.error); };
  });
  const idbGet = k => idb('readonly', s => s.get(k)).catch(() => null);
  const idbSet = (k, v) => idb('readwrite', s => s.put(v, k)).catch(() => null);
  const idbDel = k => idb('readwrite', s => s.delete(k)).catch(() => null);

  /* ---------- Kryptering ---------- */
  async function lagNokkel(pw, salt) {
    const m = await crypto.subtle.importKey('raw', enc(pw.normalize('NFC')), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, m, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  }
  async function krypter() {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, S.key, enc(JSON.stringify(S.data)));
    return JSON.stringify({ format: 'tll-kmr', versjon: 1, lagret: naa(), salt: b64(S.salt), iv: b64(iv), iterations: ITER, data: b64(ct) });
  }
  async function dekrypter(txt, pw) {
    let f; try { f = JSON.parse(txt); } catch (e) { throw new Error('Filen er ikke et kompetansemålsregnskap.'); }
    if (f.format !== 'tll-kmr') throw new Error('Filen er ikke et kompetansemålsregnskap.');
    const salt = unb64(f.salt), key = await lagNokkel(pw, salt);
    let plain; try { plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(f.iv) }, key, unb64(f.data)); } catch (e) { throw new Error('Feil passord.'); }
    return { key, salt, data: JSON.parse(new TextDecoder().decode(plain)), lagret: f.lagret };
  }

  /* ---------- Tilstand ---------- */
  const S = { key: null, salt: null, data: null, fil: null, filStatus: '', filLagret: null, ulagret: false, fane: 'registrer', elev: null, katalog: [], katalogFeil: '', fag: 'TLL', aar: null, inkKar: true };
  const nyData = () => ({ format: 'tll-kmr-data', versjon: 1, opprettet: naa(), elever: [], vurderinger: [], terminer: [], egneOppgaver: [], logg: [], yffMaal: [], sosialeMaal: SOSIALE_FORSLAG.map(([tekst, ser]) => ({ id: uid(), tekst, ser, forslag: true })), sosial: [], egneSosMaal: [], ub: { bedrifter: [], veiledning: [], milepaler: [] } });
  function logg(hva) { S.data.logg.unshift({ tid: naa(), hva }); if (S.data.logg.length > 2000) S.data.logg.length = 2000; }
  const elevNavn = id => (S.data.elever.find(e => e.id === id) || {}).navn || '(slettet elev)';
  const aktiveVurd = () => S.data.vurderinger.filter(v => !v.slettet);
  const alleAar = () => { const s = new Set(aktiveVurd().map(v => skolear(v.dato))); S.data.terminer.forEach(t => s.add(t.skolear)); s.add(skolear(idag())); return [...s].sort().reverse(); };

  /* ---------- Lagring ---------- */
  let lagreTimer = null;
  function endret(hva) { if (hva) logg(hva); S.ulagret = true; clearTimeout(lagreTimer); lagreTimer = setTimeout(lagre, 500); visStatus(); }
  async function lagre(brukerKlikk) {
    if (!S.key) return;
    const blob = await krypter();
    await idbSet('blob', blob);
    if (!S.fil) S.ulagret = false;
    if (S.fil) {
      try {
        let p = await S.fil.queryPermission({ mode: 'readwrite' });
        if (p !== 'granted' && brukerKlikk) p = await S.fil.requestPermission({ mode: 'readwrite' });
        if (p === 'granted') { const w = await S.fil.createWritable(); await w.write(blob); await w.close(); S.filLagret = naa(); S.ulagret = false; S.filStatus = ''; }
        else S.filStatus = 'trenger-tillatelse';
      } catch (e) { S.filStatus = 'feil'; }
    }
    visStatus();
  }
  function visStatus() {
    const el = $('#lagreStatus'); if (!el || !S.data) return;
    let t, kl = 'ok';
    if (!S.fil) { t = 'Lagret i denne nettleseren. Koble til en fil i OneDrive så du har en sikkerhetskopi og kan bruke flere PC-er.'; kl = 'warn'; }
    else if (S.filStatus === 'trenger-tillatelse') { t = 'Endringene er ikke skrevet til filen. Trykk «Lagre nå» og godta tilgang.'; kl = 'warn'; }
    else if (S.filStatus === 'feil') { t = 'Klarte ikke å skrive til filen. Trykk «Lagre nå» eller last ned en kopi.'; kl = 'bad'; }
    else if (S.ulagret) t = 'Lagrer …';
    else t = `Lagret i ${S.fil.name}${S.filLagret ? ' kl. ' + new Date(S.filLagret).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' }) : ''}`;
    el.className = 'status ' + kl; el.textContent = t;
  }
  const kanVelgeFil = 'showSaveFilePicker' in window;
  async function kobleFil() {
    try {
      S.fil = await showSaveFilePicker({ suggestedName: 'kompetansemaalsregnskap.kmr', types: [{ description: 'Kompetansemålsregnskap', accept: { 'application/json': ['.kmr'] } }] });
      await idbSet('handle', S.fil); S.filStatus = ''; await lagre(true); logg('Koblet til filen ' + S.fil.name);
    } catch (e) { /* avbrutt */ }
  }
  async function lastNedKopi() {
    const blob = await krypter(), a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([blob], { type: 'application/json' }));
    a.download = `kompetansemaalsregnskap-${idag()}.kmr`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  /* ---------- Låsing ---------- */
  let aktivTimer = null;
  function aktivitet() { clearTimeout(aktivTimer); if (S.key) aktivTimer = setTimeout(() => laas('Registeret ble låst etter ' + LAAS_ETTER_MIN + ' minutter uten aktivitet.'), LAAS_ETTER_MIN * 60000); }
  ['click', 'keydown', 'pointermove', 'scroll'].forEach(e => addEventListener(e, aktivitet, { passive: true }));
  async function laas(melding) {
    if (S.key && S.ulagret) { clearTimeout(lagreTimer); await lagre(); }
    S.key = null; S.data = null; S.salt = null; S.elev = null;
    $('#app').hidden = true; $('#app').innerHTML = ''; await visLaas(melding);
  }
  addEventListener('beforeunload', e => { if (S.key && (S.ulagret || S.filStatus)) { e.preventDefault(); e.returnValue = ''; } });

  async function visLaas(melding) {
    const blob = await idbGet('blob'); const handle = await idbGet('handle');
    let lagretTid = ''; try { lagretTid = blob ? JSON.parse(blob).lagret : ''; } catch (e) { }
    const L = $('#lock'); L.hidden = false;
    L.innerHTML = `${melding ? `<p class="status warn">${esc(melding)}</p>` : ''}
      ${blob ? `<form class="card" id="fOpen"><h2>Lås opp registeret</h2><p class="muted">Siste kopi i denne nettleseren ble lagret ${lagretTid ? esc(tidTxt(lagretTid)) : ''}${handle ? ' · koblet til filen ' + esc(handle.name) : ''}.</p>
        <label for="pw">Passord</label><input id="pw" type="password" autocomplete="current-password" required>
        <button class="btn" type="submit">Lås opp</button><p class="err" role="alert"></p></form>` : ''}
      <div class="card"><h2>Åpne en registerfil</h2><p class="muted">Bruk dette på en ny PC, eller hvis filen i OneDrive er nyere enn kopien i nettleseren.</p>
        <button class="btn sec" type="button" id="bFil">Velg fil …</button><input type="file" id="iFil" accept=".kmr,application/json" hidden>
        <form id="fFilPw" hidden><p id="filNavn" class="muted"></p><label for="pw2">Passord</label><input id="pw2" type="password" autocomplete="current-password" required><button class="btn" type="submit">Åpne</button><p class="err" role="alert"></p></form></div>
      <details class="card" ${blob ? '' : 'open'}><summary><b>Lag nytt register</b></summary>
        <form id="fNy"><p class="muted">Passordet kan ikke gjenopprettes. Glemmer du det, er dataene tapt. Skriv det ned et trygt sted.</p>
        <label for="np1">Nytt passord (minst 10 tegn)</label><input id="np1" type="password" autocomplete="new-password" minlength="10" required>
        <label for="np2">Gjenta passordet</label><input id="np2" type="password" autocomplete="new-password" minlength="10" required>
        ${blob ? '<p class="status warn">Et nytt register erstatter kopien i denne nettleseren. Filen i OneDrive blir ikke slettet.</p>' : ''}
        <button class="btn" type="submit">Lag register</button><p class="err" role="alert"></p></form></details>`;
    const opptatt = (f, on) => { const b = f.querySelector('button[type=submit]'); b.disabled = on; b.textContent = on ? 'Åpner …' : b.dataset.t || b.textContent; };
    L.querySelectorAll('button[type=submit]').forEach(b => { b.dataset.t = b.textContent; });
    const fOpen = $('#fOpen');
    if (fOpen) { $('#pw').focus(); fOpen.addEventListener('submit', async e => { e.preventDefault(); opptatt(fOpen, true); try { const r = await dekrypter(blob, $('#pw').value); S.fil = handle || null; await aapne(r); } catch (x) { opptatt(fOpen, false); fOpen.querySelector('.err').textContent = x.message; $('#pw').value = ''; $('#pw').focus(); } }); }
    let filTekst = null, filHandle = null;
    $('#bFil').addEventListener('click', async () => {
      if ('showOpenFilePicker' in window) {
        try { [filHandle] = await showOpenFilePicker({ types: [{ description: 'Kompetansemålsregnskap', accept: { 'application/json': ['.kmr'] } }] }); const f = await filHandle.getFile(); filTekst = await f.text(); $('#filNavn').textContent = 'Valgt fil: ' + f.name; $('#fFilPw').hidden = false; $('#pw2').focus(); } catch (e) { }
      } else $('#iFil').click();
    });
    $('#iFil').addEventListener('change', async e => { const f = e.target.files[0]; if (!f) return; filTekst = await f.text(); filHandle = null; $('#filNavn').textContent = 'Valgt fil: ' + f.name; $('#fFilPw').hidden = false; $('#pw2').focus(); });
    $('#fFilPw').addEventListener('submit', async e => { e.preventDefault(); const f = e.currentTarget; opptatt(f, true); try { const r = await dekrypter(filTekst, $('#pw2').value); S.fil = filHandle; if (filHandle) await idbSet('handle', filHandle); else await idbDel('handle'); await aapne(r); await lagre(); } catch (x) { opptatt(f, false); f.querySelector('.err').textContent = x.message; $('#pw2').value = ''; } });
    $('#fNy').addEventListener('submit', async e => {
      e.preventDefault(); const f = e.currentTarget, err = f.querySelector('.err');
      if ($('#np1').value !== $('#np2').value) { err.textContent = 'Passordene er ikke like.'; return; }
      opptatt(f, true);
      const salt = crypto.getRandomValues(new Uint8Array(16)); const key = await lagNokkel($('#np1').value, salt);
      await idbDel('handle'); S.fil = null;
      await aapne({ key, salt, data: nyData() }); logg('Registeret ble opprettet'); await lagre();
    });
  }
  async function aapne(r) {
    S.key = r.key; S.salt = r.salt; S.data = Object.assign(nyData(), r.data); S.data.ub = Object.assign({ bedrifter: [], veiledning: [], milepaler: [] }, S.data.ub); oppdaterYff(); S.ulagret = false; S.filStatus = ''; S.nyereFil = false; S.aar = skolear(idag());
    $('#lock').hidden = true; $('#lock').innerHTML = ''; $('#app').hidden = false; aktivitet();
    // Er filen nyere enn kopien i nettleseren?
    if (S.fil && r.lagret) {
      try { if (await S.fil.queryPermission({ mode: 'read' }) === 'granted') { const t = await (await S.fil.getFile()).text(); const fl = JSON.parse(t).lagret; if (fl && fl > r.lagret) S.nyereFil = true; } } catch (e) { }
    }
    tegn();
  }

  /* ---------- Oppgavekatalog fra TLLfluenseren ---------- */
  async function kjorSkript(url, tll) { const t = await (await fetch(url, { cache: 'no-cache' })).text(); new Function('window', 'TLL', t)(window, tll); }
  async function lastKatalog() {
    const kat = [], feil = [];
    try {
      await kjorSkript('/truck/praksis/data.js', {});
      const D = window.TRUCK_PRAKSIS;
      D.oppgaver.forEach(t => kat.push({ id: 'truck-' + t.id, gruppe: `Truck · nivå ${t.niva} – ${D.nivaer.find(n => n.n === t.niva).tittel}`, tittel: `${t.id} ${t.tittel}`, maal: t.fag === 'BT' ? ['BT4'] : t.fag === 'TLL' ? ['TLL10'] : ['BT4', 'TLL10'], url: '/truck/praksis/?ovelse=' + t.slug.slice(2) }));
    } catch (e) { feil.push('truckøvelsene'); }
    try {
      const base = '/transport-logistikk-lofteoperasjoner/', reg = [], tll = { registrer: d => reg.push(d) };
      await kjorSkript(base + 'felles/kapitler.js', tll);
      for (const k of tll.KAPITLER || []) {
        try { await kjorSkript(base + k.sti + 'data.js', tll); } catch (e) { feil.push('kapittel ' + k.nr); }
      }
      reg.forEach(d => {
        const km = [].concat(d.kompetansemal || []).map(m => Object.keys(TEKST).find(k => TEKST[k] === (m.tekst || '').trim())).filter(Boolean);
        (d.temaer || []).forEach(t => kat.push({ id: d.id + '-' + t.id, gruppe: `TLL kap ${d.nr} – ${d.tittel}`, tittel: `Kap ${d.nr} ${t.lok} ${t.tittel}`, maal: km.length ? km : [], url: base + d.id + '/' }));
      });
    } catch (e) { feil.push('kapitlene'); }
    S.katalog = kat; S.katalogFeil = feil.length ? 'Fikk ikke hentet ' + feil.join(', ') + '.' : '';
    if (S.data && S.fane === 'registrer') tegn();
  }
  const alleOppgaver = () => S.katalog.concat((S.data.egneOppgaver || []).map(o => ({ ...o, gruppe: 'Egne oppgaver' })));

  /* ---------- Modal ---------- */
  function modal(html, onSubmit) {
    const d = $('#modal'); d.innerHTML = `<form method="dialog" class="mForm">${html}</form>`; d.showModal();
    const f = d.querySelector('form');
    f.addEventListener('submit', e => { if (e.submitter && e.submitter.value === 'avbryt') return; e.preventDefault(); const ok = onSubmit(f); if (ok !== false) d.close(); });
    const first = f.querySelector('input,select,textarea'); if (first) first.focus();
    return f;
  }

  /* ---------- Hovedvisning ---------- */
  const FANER = [['registrer', 'Registrer vurdering'], ['elevkort', 'Elevkort'], ['oversikt', 'Klasseoversikt'], ['ub', 'Ungdomsbedrift'], ['sosial', 'Sosial læring'], ['elever', 'Elever'], ['fil', 'Innstillinger']];
  function tegn() {
    const A = $('#app');
    A.innerHTML = `<div class="bar"><nav class="tabs" aria-label="Deler av registeret">${FANER.map(([k, t]) => `<button type="button" data-fane="${k}" ${S.fane === k ? 'aria-current="page"' : ''}>${t}</button>`).join('')}</nav>
      <div class="barRight"><span id="lagreStatus" class="status" role="status" aria-live="polite"></span><button type="button" class="btn sec small" id="bLagre">Lagre nå</button><button type="button" class="btn sec small" id="bLaas">Lås</button></div></div>
      ${S.nyereFil ? '<p class="status warn">Filen i OneDrive er nyere enn kopien i denne nettleseren (endret på en annen PC). Lås og åpne filen for å få med de nyeste endringene.</p>' : ''}
      <div id="view"></div>`;
    visStatus();
    ({ registrer: tegnRegistrer, elevkort: tegnElevkort, oversikt: tegnOversikt, elever: tegnElever, fil: tegnFil, ub: tegnUb, sosial: tegnSosial })[S.fane]();
  }
  document.addEventListener('click', e => {
    const f = e.target.closest('[data-fane]'); if (f) { S.fane = f.dataset.fane; if (f.dataset.elev) S.elev = f.dataset.elev; tegn(); scrollTo(0, 0); return; }
    if (e.target.closest('#bLaas')) laas();
    if (e.target.closest('#bLagre')) { if (!S.fil && kanVelgeFil) kobleFil(); else if (!S.fil) lastNedKopi(); else lagre(true); }
  });

  const maalVelger = (valgt, navn) => fagMedMaal().map(f => `<fieldset class="maalSet"><legend>${FAG[f]}</legend>${MAAL[f].map(([k, t]) => `<label class="chk" title="${esc(t)}"><input type="checkbox" name="${navn}" value="${k}" ${valgt.includes(k) ? 'checked' : ''}> <b>${k}</b> <span>${esc(t)}</span></label>`).join('')}</fieldset>`).join('');
  const karSel = (navn, verdi) => `<select name="${navn}" aria-label="Karakter"><option value="">–</option>${[1, 2, 3, 4, 5, 6].map(n => `<option ${+verdi === n ? 'selected' : ''}>${n}</option>`).join('')}</select>`;
  const tendSel = (navn, verdi) => `<select name="${navn}" aria-label="Tendens"><option value="" ${!verdi ? 'selected' : ''}></option><option value="+" ${verdi === '+' ? 'selected' : ''}>+</option><option value="−" ${verdi === '−' ? 'selected' : ''}>−</option></select>`;
  const statSel = (navn, verdi) => `<select name="${navn}" aria-label="Status"><option value="vurdert" ${verdi === 'vurdert' ? 'selected' : ''}>Vurdert</option><option value="ikke-levert" ${verdi === 'ikke-levert' ? 'selected' : ''}>Ikke levert</option><option value="fravaer" ${verdi === 'fravaer' ? 'selected' : ''}>Fravær</option></select>`;

  /* ---------- Registrer ---------- */
  let reg = { oppgave: '', tittel: '', maal: [], dato: '', type: DOKTYPER[0], url: '', kun: null, kunTekst: '' };
  function tegnRegistrer() {
    const V = $('#view'), elever = S.data.elever.filter(e => e.aktiv && (!reg.kun || reg.kun.includes(e.id)));
    if (!reg.dato) reg.dato = idag();
    const grupper = {}; alleOppgaver().forEach(o => (grupper[o.gruppe] = grupper[o.gruppe] || []).push(o));
    V.innerHTML = `<h2>Registrer vurdering</h2>
      <p class="muted">Velg oppgaven, så fylles kompetansemålene inn. Fyll bare ut radene for elevene du vurderer – tomme rader hoppes over. Faglig tilbakemelding og fremovermelding gir du eleven i Teams. Karakteren er ditt eget vurderingsgrunnlag.</p>
      ${S.katalogFeil ? `<p class="status warn">${esc(S.katalogFeil)} Du kan fortsatt skrive inn oppgaven selv.</p>` : ''}
      ${reg.kun ? `<p class="status ok">Viser bare ${esc(reg.kunTekst)}. <button type="button" class="linkBtn" id="rAlle">Vis alle elever</button></p>` : ''}
      ${!elever.length ? `<p class="status warn">Du har ingen aktive elever ennå. <button type="button" class="linkBtn" data-fane="elever">Legg til elever →</button></p>` : ''}
      <form id="fReg" novalidate>
        <div class="grid2">
          <div><label for="rOpp">Oppgave</label><select id="rOpp"><option value="">– Skriv inn selv –</option>${Object.entries(grupper).map(([g, l]) => `<optgroup label="${esc(g)}">${l.map(o => `<option value="${esc(o.id)}" ${reg.oppgave === o.id ? 'selected' : ''}>${esc(o.tittel)}</option>`).join('')}</optgroup>`).join('')}</select>
            <label for="rTit">Tittel som vises i elevkortet</label><input id="rTit" value="${esc(reg.tittel)}" maxlength="140" required></div>
          <div class="grid2 tight"><div><label for="rDato">Dato</label><input id="rDato" type="date" value="${reg.dato}" required></div>
            <div><label for="rType">Dokumentasjon</label><select id="rType">${DOKTYPER.map(t => `<option ${reg.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div></div>
        </div>
        <details class="maalBox" ${reg.maal.length ? '' : 'open'}><summary>Kompetansemål: <b id="maalSum">${reg.maal.length ? reg.maal.join(', ') : 'ingen valgt'}</b> <span class="muted">(endre)</span></summary>${maalVelger(reg.maal, 'rMaal')}</details>
        <div class="scale"><b>Karakter:</b> 1 ikke grunnlag · 2 lav · 3–4 middels · 5–6 høy måloppnåelse. Tendens (+/−) er valgfri. Elevens egenvurdering trenger ikke karakter.</div>
        <div class="tblWrap"><table class="regTbl"><thead><tr><th>Elev</th><th>Status</th><th>Karakter</th><th>Faglig tilbakemelding</th><th>Fremovermelding</th><th>Internt notat</th></tr></thead><tbody>
          ${elever.map(e => `<tr data-elev="${e.id}"><th scope="row">${esc(e.navn)}</th><td>${statSel('st', 'vurdert')}</td><td><div class="kar">${karSel('k', '')}${tendSel('t', '')}</div></td><td><textarea name="tb" rows="2" maxlength="2000"></textarea></td><td><textarea name="fm" rows="2" maxlength="2000"></textarea></td><td><textarea name="no" rows="2" maxlength="1000" placeholder="Bare for deg"></textarea></td></tr>`).join('')}
        </tbody></table></div>
        <div class="actions"><button class="btn" type="submit">Lagre vurderingene</button><p class="err" role="alert" id="rErr"></p></div>
      </form><div id="rRes"></div>`;
    if ($('#rAlle')) $('#rAlle').addEventListener('click', () => { reg.kun = null; tegnRegistrer(); });
    $('#rOpp').addEventListener('change', e => {
      const o = alleOppgaver().find(x => x.id === e.target.value); reg.oppgave = e.target.value;
      if (o) { reg.tittel = o.tittel; reg.maal = [...o.maal]; reg.url = o.url || ''; $('#rTit').value = o.tittel; document.querySelectorAll('input[name=rMaal]').forEach(c => { c.checked = reg.maal.includes(c.value); }); $('#maalSum').textContent = reg.maal.join(', ') || 'ingen valgt'; V.querySelector('.maalBox').open = !reg.maal.length; }
      else { reg.url = ''; }
    });
    V.querySelector('.maalBox').addEventListener('change', () => { reg.maal = [...document.querySelectorAll('input[name=rMaal]:checked')].map(c => c.value); $('#maalSum').textContent = reg.maal.join(', ') || 'ingen valgt'; });
    $('#rTit').addEventListener('input', e => { reg.tittel = e.target.value; });
    $('#rDato').addEventListener('change', e => { reg.dato = e.target.value; });
    $('#rType').addEventListener('change', e => { reg.type = e.target.value; });
    $('#fReg').addEventListener('submit', e => {
      e.preventDefault(); const err = $('#rErr'); err.textContent = ''; document.querySelectorAll('.regTbl tr.feil').forEach(r => r.classList.remove('feil'));
      const tittel = $('#rTit').value.trim();
      if (!tittel) { err.textContent = 'Skriv en tittel på oppgaven.'; $('#rTit').focus(); return; }
      if (!reg.maal.length) { err.textContent = 'Velg minst ett kompetansemål.'; V.querySelector('.maalBox').open = true; return; }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(reg.dato) || reg.dato > idag()) { err.textContent = 'Sjekk datoen. Den kan ikke være fram i tid.'; return; }
      const rader = [], mangler = [], dubletter = [];
      document.querySelectorAll('.regTbl tbody tr').forEach(r => {
        const g = n => r.querySelector(`[name=${n}]`).value.trim();
        const st = g('st'), k = g('k'), tb = g('tb'), fm = g('fm'), no = g('no');
        if (st === 'vurdert' && !k && !tb && !fm && !no) return;
        if (st === 'vurdert' && !k && reg.type !== EGENVURD) { mangler.push(r); return; }
        const elev = r.dataset.elev, oppId = reg.oppgave || 'egen:' + tittel.toLowerCase();
        if (aktiveVurd().some(v => v.elev === elev && v.dato === reg.dato && (v.oppgave.id || 'egen:' + v.oppgave.tittel.toLowerCase()) === oppId)) { dubletter.push(elevNavn(elev)); return; }
        rader.push({ id: uid(), elev, dato: reg.dato, maal: [...reg.maal], oppgave: { id: reg.oppgave, tittel, url: reg.url }, type: reg.type, status: st, karakter: st === 'vurdert' && k ? +k : null, tendens: st === 'vurdert' && k ? g('t') : '', tilbakemelding: tb, fremover: fm, notat: no, batch: null, opprettet: naa(), historikk: [] });
      });
      if (mangler.length) { mangler.forEach(r => r.classList.add('feil')); err.textContent = `${mangler.length} ${mangler.length === 1 ? 'rad mangler' : 'rader mangler'} karakter. Velg karakter, eller sett status til «Ikke levert» eller «Fravær».`; mangler[0].querySelector('select[name=k]').focus(); return; }
      if (!rader.length) { err.textContent = dubletter.length ? 'Alle disse er allerede registrert for denne oppgaven og datoen.' : 'Ingen rader er fylt ut.'; return; }
      const batch = uid(); rader.forEach(r => { r.batch = batch; S.data.vurderinger.push(r); });
      endret(`Registrerte ${rader.length} vurderinger: ${tittel} (${reg.dato})`);
      const tit = tittel; reg = { oppgave: '', tittel: '', maal: [], dato: reg.dato, type: reg.type, url: '', kun: null, kunTekst: '' };
      tegnRegistrer();
      $('#rRes').innerHTML = `<p class="status ok">Lagret ${rader.length} ${rader.length === 1 ? 'vurdering' : 'vurderinger'} for «${esc(tit)}».${dubletter.length ? ` Hoppet over ${dubletter.map(esc).join(', ')} – de har allerede en vurdering på denne oppgaven samme dag. Endre den i elevkortet.` : ''}</p>`;
      $('#rRes').scrollIntoView({ block: 'nearest' });
    });
  }

  /* ---------- Elevkort ---------- */
  function vurdFor(elev, fag) { return aktiveVurd().filter(v => v.elev === elev && skolear(v.dato) === S.aar && (!fag || v.maal.some(m => fagAv(m) === fag))).sort((a, b) => a.dato.localeCompare(b.dato) || a.opprettet.localeCompare(b.opprettet)); }
  function sparkline(vs) {
    const p = vs.filter(v => v.karakter); if (p.length < 2) return '';
    const W = 260, H = 64, x = i => 8 + i * ((W - 16) / (p.length - 1)), y = k => H - 8 - (k - 1) * ((H - 16) / 5);
    return `<svg class="spark" viewBox="0 0 ${W} ${H}" role="img" aria-label="Utvikling: ${p.map(v => v.karakter).join(', ')}"><line x1="0" x2="${W}" y1="${y(3.5)}" y2="${y(3.5)}" class="mid"/><polyline points="${p.map((v, i) => x(i) + ',' + y(v.karakter)).join(' ')}"/>${p.map((v, i) => `<circle cx="${x(i)}" cy="${y(v.karakter)}" r="4"><title>${datoTxt(v.dato)} ${esc(v.oppgave.tittel)}: ${kTxt(v)}</title></circle>`).join('')}</svg>`;
  }
  function analyse(elev, fag) {
    const vs = vurdFor(elev, fag), mål = MAAL[fag].map(([k]) => k);
    const perMaal = {}; mål.forEach(m => { perMaal[m] = vs.filter(v => v.maal.includes(m)); });
    const dekket = mål.filter(m => perMaal[m].some(v => v.karakter));
    const typer = new Set(vs.filter(v => v.karakter).map(v => v.type));
    const karakterer = vs.filter(v => v.karakter);
    const merknader = [];
    if (mål.length - dekket.length) merknader.push(`${mål.length - dekket.length} av ${mål.length} mål har ikke vurderingsgrunnlag med karakter ennå: ${mål.filter(m => !dekket.includes(m)).join(', ')}.`);
    if (karakterer.length >= 3 && typer.size === 1) merknader.push(`Alle vurderingene er av samme type (${[...typer][0].toLowerCase()}). Vurder å la eleven vise kompetansen på flere måter.`);
    const enkelt = dekket.filter(m => perMaal[m].filter(v => v.karakter).length === 1);
    if (enkelt.length) merknader.push(`Bare én vurdering på ${enkelt.join(', ')}. Ett enkelt inntrykk er et tynt grunnlag.`);
    const uteblitt = vs.filter(v => v.status !== 'vurdert').length; if (uteblitt) merknader.push(`${uteblitt} ${uteblitt === 1 ? 'oppgave' : 'oppgaver'} ikke levert eller fravær.`);
    return { vs, perMaal, dekket, mål, karakterer, merknader };
  }
  function tegnElevkort() {
    const V = $('#view'), el = S.data.elever;
    if (!el.length) { V.innerHTML = `<h2>Elevkort</h2><p class="status warn">Ingen elever ennå. <button type="button" class="linkBtn" data-fane="elever">Legg til elever →</button></p>`; return; }
    if (!S.elev || !el.find(e => e.id === S.elev)) S.elev = (el.find(e => e.aktiv) || el[0]).id;
    const e = el.find(x => x.id === S.elev);
    V.innerHTML = `<div class="ekHead noprint"><div><label for="ekElev">Elev</label><select id="ekElev">${el.map(x => `<option value="${x.id}" ${x.id === S.elev ? 'selected' : ''}>${esc(x.navn)}${x.aktiv ? '' : ' (deaktivert)'}</option>`).join('')}</select></div>
      <div><label for="ekAar">Skoleår</label><select id="ekAar">${alleAar().map(a => `<option ${a === S.aar ? 'selected' : ''}>${a}</option>`).join('')}</select></div>
      <div class="ekPrint"><label class="chk"><input type="checkbox" id="ekKar" ${S.inkKar ? 'checked' : ''}> Ta med karakterer i utskriften</label><button type="button" class="btn sec small" id="ekSkriv">Skriv ut / lagre PDF</button></div></div>
      <div class="printHead"><h2>${esc(e.navn)} · ${esc(e.klasse || '')} · skoleår ${S.aar}</h2><p>Kompetansemålsregnskap, skrevet ut ${new Date().toLocaleDateString('nb-NO')}</p></div>
      <div class="${S.inkKar ? '' : 'utenKar'}">${fagMedMaal().map(f => fagKort(e, f)).join('')}${MAAL.YFF.length ? '' : '<section class="card"><h3>Yrkesfaglig fordypning (YFF)</h3><p class="muted">Legg inn YFF-målene dere bruker under Innstillinger, så kan du vurdere og sette karakter i YFF.</p></section>'}${ubKort(e)}${sosialKort(e)}
      <section class="card"><h3>Alle vurderinger ${S.aar}</h3>${vurdListe(vurdFor(e.id).slice().reverse())}</section></div>`;
    $('#ekElev').addEventListener('change', x => { S.elev = x.target.value; tegnElevkort(); });
    $('#ekAar').addEventListener('change', x => { S.aar = x.target.value; tegnElevkort(); });
    $('#ekKar').addEventListener('change', x => { S.inkKar = x.target.checked; tegnElevkort(); });
    $('#ekSkriv').addEventListener('click', () => print());
  }
  function fagKort(e, f) {
    const a = analyse(e.id, f), T = tid => S.data.terminer.find(t => t.elev === e.id && t.fag === f && t.skolear === S.aar && t.type === tid);
    const t1 = T('1. termin'), sp = T('Standpunkt');
    const forste = a.karakterer[0], siste = a.karakterer[a.karakterer.length - 1];
    return `<section class="card fagKort"><div class="fkHead"><h3>${FAG[f]}</h3><span class="muted">${a.karakterer.length} ${a.karakterer.length === 1 ? 'vurdering' : 'vurderinger'} med karakter · ${a.dekket.length} av ${a.mål.length} mål har grunnlag</span></div>
      <div class="fkGrid"><div><table class="maalTbl"><thead><tr><th>Mål</th><th>Vurderinger (eldst → nyest)</th></tr></thead><tbody>
        ${a.mål.map(m => `<tr class="${a.perMaal[m].length ? '' : 'tom'}"><th scope="row" title="${esc(TEKST[m])}"><b>${m}</b> <span>${esc(TEKST[m])}</span></th><td>${a.perMaal[m].length ? a.perMaal[m].map(v => `<button type="button" class="chip ${kKl(v.karakter)}" data-vid="${v.id}" title="${datoTxt(v.dato)} · ${esc(v.oppgave.tittel)} · ${esc(v.type)}"><span class="kv">${kTxt(v)}</span> <small>${datoTxt(v.dato)}</small></button>`).join('') : '<span class="muted">Ikke vurdert</span>'}</td></tr>`).join('')}
      </tbody></table></div>
      <div class="side"><h4>Utvikling</h4>${sparkline(a.vs) || '<p class="muted">Utviklingen vises når det finnes minst to vurderinger med karakter.</p>'}
        ${forste ? `<p class="muted">Første: <b>${kTxt(forste)}</b> (${datoTxt(forste.dato)}) · siste: <b>${kTxt(siste)}</b> (${datoTxt(siste.dato)})</p>` : ''}
        ${a.merknader.length ? `<h4>Grunnlaget</h4><ul class="merk">${a.merknader.map(m => `<li>${esc(m)}</li>`).join('')}</ul>` : a.karakterer.length ? '<p class="status ok">Alle mål har vurderingsgrunnlag.</p>' : ''}
        <h4>Helhetlig vurdering</h4>
        ${['1. termin', 'Standpunkt'].map(tp => { const t = tp === '1. termin' ? t1 : sp; return `<div class="termin"><div><b>${tp}</b> ${t ? `<span class="chip ${kKl(t.karakter)} big"><span class="kv">${t.karakter}</span></span> <small class="muted">${datoTxt(t.dato)}</small>` : '<span class="muted">ikke satt</span>'}</div><button type="button" class="btn sec small" data-termin="${tp}" data-fag="${f}">${t ? 'Endre' : 'Sett karakter'}</button>${t && t.begrunnelse ? `<p class="begr">${esc(t.begrunnelse)}</p>` : ''}</div>`; }).join('')}
      </div></div></section>`;
  }
  function vurdListe(vs) {
    if (!vs.length) return '<p class="muted">Ingen vurderinger dette skoleåret.</p>';
    return `<div class="vList">${vs.map(v => `<article class="vItem" id="v-${v.id}"><div class="vTop"><span class="chip ${kKl(v.karakter)}"><span class="kv">${kTxt(v)}</span></span><div><b>${esc(v.oppgave.tittel)}</b><div class="muted">${datoTxt(v.dato)} · ${esc(v.type)} · ${v.maal.join(', ')}${v.historikk.length ? ` · endret ${v.historikk.length} ${v.historikk.length === 1 ? 'gang' : 'ganger'}` : ''}</div></div><button type="button" class="btn sec small noprint" data-vid="${v.id}">Endre</button></div>
      ${v.tilbakemelding ? `<p><b>Faglig tilbakemelding:</b> ${esc(v.tilbakemelding)}</p>` : ''}${v.fremover ? `<p><b>Fremovermelding:</b> ${esc(v.fremover)}</p>` : ''}${v.notat ? `<p class="notat"><b>Internt notat:</b> ${esc(v.notat)}</p>` : ''}
      ${v.historikk.length ? `<details class="hist noprint"><summary>Endringshistorikk</summary><ul>${v.historikk.map(h => `<li>${esc(tidTxt(h.tid))}: ${esc(h.endring)}${h.grunn ? ` – <i>${esc(h.grunn)}</i>` : ''}</li>`).join('')}</ul></details>` : ''}</article>`).join('')}</div>`;
  }
  document.addEventListener('click', e => {
    if (!S.data) return;
    const vb = e.target.closest('[data-vid]'); if (vb) { endreVurdering(vb.dataset.vid); return; }
    const tb = e.target.closest('[data-termin]'); if (tb) settTermin(tb.dataset.termin, tb.dataset.fag);
  });
  function endreVurdering(id) {
    const v = S.data.vurderinger.find(x => x.id === id); if (!v) return;
    const f = modal(`<h2>Endre vurdering</h2><p class="muted">${esc(elevNavn(v.elev))} · ${esc(v.oppgave.tittel)}</p>
      <div class="grid3"><div><label>Status</label>${statSel('st', v.status)}</div><div><label>Karakter</label><div class="kar">${karSel('k', v.karakter)}${tendSel('t', v.tendens)}</div></div><div><label for="mDato">Dato</label><input id="mDato" name="dato" type="date" value="${v.dato}" required></div></div>
      <label>Dokumentasjon</label><select name="type">${DOKTYPER.map(t => `<option ${v.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select>
      <details class="maalBox"><summary>Kompetansemål: <b>${v.maal.join(', ')}</b></summary>${maalVelger(v.maal, 'mMaal')}</details>
      <label>Faglig tilbakemelding</label><textarea name="tb" rows="3" maxlength="2000">${esc(v.tilbakemelding)}</textarea>
      <label>Fremovermelding</label><textarea name="fm" rows="3" maxlength="2000">${esc(v.fremover)}</textarea>
      <label>Internt notat</label><textarea name="no" rows="2" maxlength="1000">${esc(v.notat)}</textarea>
      <label for="mGrunn">Hvorfor endrer du? (lagres i historikken)</label><input id="mGrunn" name="grunn" maxlength="300" placeholder="F.eks. feilregistrert, ny vurdering etter samtale">
      <p class="err" role="alert"></p>
      <div class="actions"><button class="btn" type="submit">Lagre endringen</button><button class="btn sec" value="avbryt" formnovalidate>Avbryt</button><button class="btn danger" type="button" id="mSlett">Slett vurderingen</button></div>`, f => {
      const g = n => f.elements[n].value.trim(), st = g('st'), k = g('k');
      const maal = [...f.querySelectorAll('input[name=mMaal]:checked')].map(c => c.value);
      if (st === 'vurdert' && !k && g('type') !== EGENVURD) { f.querySelector('.err').textContent = 'Velg karakter, eller endre status.'; return false; }
      if (!maal.length) { f.querySelector('.err').textContent = 'Velg minst ett kompetansemål.'; return false; }
      if (g('dato') > idag()) { f.querySelector('.err').textContent = 'Datoen kan ikke være fram i tid.'; return false; }
      const ny = { status: st, karakter: st === 'vurdert' && k ? +k : null, tendens: st === 'vurdert' && k ? g('t') : '', dato: g('dato'), type: g('type'), maal, tilbakemelding: g('tb'), fremover: g('fm'), notat: g('no') };
      const navn = { status: 'status', karakter: 'karakter', tendens: 'tendens', dato: 'dato', type: 'dokumentasjon', maal: 'mål', tilbakemelding: 'tilbakemelding', fremover: 'fremovermelding', notat: 'notat' };
      const endr = Object.keys(ny).filter(x => JSON.stringify(ny[x]) !== JSON.stringify(v[x])).map(x => ['karakter', 'tendens', 'status', 'dato'].includes(x) ? `${navn[x]} ${v[x] || '–'} → ${ny[x] || '–'}` : navn[x] + ' endret');
      if (!endr.length) return;
      v.historikk.push({ tid: naa(), endring: endr.join('; '), grunn: g('grunn'), forrige: Object.fromEntries(Object.keys(ny).map(x => [x, v[x]])) });
      Object.assign(v, ny, { endret: naa() });
      endret(`Endret vurdering: ${elevNavn(v.elev)}, ${v.oppgave.tittel} (${endr.join('; ')})`); tegn();
    });
    f.querySelector('#mSlett').addEventListener('click', () => {
      const grunn = f.elements.grunn.value.trim();
      if (!grunn) { f.querySelector('.err').textContent = 'Skriv hvorfor du sletter vurderingen i feltet over, så blir det sporbart.'; f.elements.grunn.focus(); return; }
      v.slettet = true; v.historikk.push({ tid: naa(), endring: 'slettet', grunn });
      endret(`Slettet vurdering: ${elevNavn(v.elev)}, ${v.oppgave.tittel} (${grunn})`); $('#modal').close(); tegn();
    });
  }
  function settTermin(tp, fag) {
    const e = S.data.elever.find(x => x.id === S.elev), a = analyse(e.id, fag);
    let t = S.data.terminer.find(x => x.elev === e.id && x.fag === fag && x.skolear === S.aar && x.type === tp);
    const veil = tp === 'Standpunkt'
      ? 'Standpunktkarakteren skal uttrykke den samlede kompetansen eleven har ved slutten av opplæringen, vurdert opp mot alle kompetansemålene i faget. Den er ikke et gjennomsnitt. Der eleven har utviklet seg, er det den kompetansen eleven viser nå som teller. Mål som ble vurdert tidlig og ikke er vurdert på nytt, teller fortsatt med.'
      : 'Karakteren ved 1. termin uttrykker kompetansen eleven har vist så langt, opp mot målene dere har arbeidet med, og hvordan eleven kan utvikle seg videre. Den er en del av underveisvurderingen.';
    const maalLinjer = a.mål.map(m => { const k = a.perMaal[m].filter(v => v.karakter); return `<li><b>${m}</b> ${k.length ? k.map(v => kTxt(v)).join(' → ') : '<span class="muted">ikke vurdert</span>'}</li>`; }).join('');
    const f = modal(`<h2>${tp} – ${FAG[fag]}</h2><p class="muted">${esc(e.navn)} · skoleår ${S.aar}</p>
      <p class="veil">${veil}</p>
      <details open><summary><b>Grunnlaget per mål</b></summary><ul class="mList">${maalLinjer}</ul>${a.merknader.length ? `<ul class="merk">${a.merknader.map(m => `<li>${esc(m)}</li>`).join('')}</ul>` : ''}</details>
      <div class="grid3"><div><label>Karakter</label>${karSel('k', t && t.karakter)}</div><div><label for="tDato">Dato</label><input id="tDato" name="dato" type="date" value="${t ? t.dato : idag()}" required></div></div>
      <label for="tBeg">Begrunnelse (kort, faglig – brukes hvis eleven ber om begrunnelse)</label><textarea id="tBeg" name="beg" rows="4" maxlength="3000">${esc(t ? t.begrunnelse : '')}</textarea>
      <p class="err" role="alert"></p>
      <div class="actions"><button class="btn" type="submit">Lagre</button><button class="btn sec" value="avbryt" formnovalidate>Avbryt</button></div>`, f => {
      const k = +f.elements.k.value; if (!k) { f.querySelector('.err').textContent = 'Velg karakter.'; return false; }
      const ny = { karakter: k, dato: f.elements.dato.value, begrunnelse: f.elements.beg.value.trim() };
      if (t) { if (t.karakter === ny.karakter && t.begrunnelse === ny.begrunnelse && t.dato === ny.dato) return; t.historikk.push({ tid: naa(), endring: `karakter ${t.karakter} → ${k}`, forrige: { karakter: t.karakter, begrunnelse: t.begrunnelse, dato: t.dato } }); Object.assign(t, ny); }
      else { t = { id: uid(), elev: e.id, fag, skolear: S.aar, type: tp, ...ny, historikk: [] }; S.data.terminer.push(t); }
      endret(`${tp} ${FAG[fag]}: ${e.navn} fikk ${k}`); tegn();
    });
  }

  /* ---------- Klasseoversikt ---------- */
  function tegnOversikt() {
    const V = $('#view'), el = S.data.elever.filter(e => e.aktiv), mål = MAAL[S.fag].map(([k]) => k);
    const siste = (e, m) => { const l = vurdFor(e.id).filter(v => v.maal.includes(m) && v.karakter); return l[l.length - 1]; };
    const T = (e, tp) => S.data.terminer.find(t => t.elev === e.id && t.fag === S.fag && t.skolear === S.aar && t.type === tp);
    const dekketKlasse = mål.filter(m => el.some(e => siste(e, m)));
    V.innerHTML = `<h2>Klasseoversikt</h2>
      <div class="ekHead"><div><label for="oFag">Fag</label><select id="oFag">${fagMedMaal().map(f => `<option value="${f}" ${f === S.fag ? 'selected' : ''}>${FAG[f]}</option>`).join('')}</select></div>
      <div><label for="oAar">Skoleår</label><select id="oAar">${alleAar().map(a => `<option ${a === S.aar ? 'selected' : ''}>${a}</option>`).join('')}</select></div></div>
      <p class="muted">Cellene viser siste karakter på hvert mål. Hold musa over et målnummer for å se målet. Klassen har vurderingsgrunnlag på ${dekketKlasse.length} av ${mål.length} mål${mål.length - dekketKlasse.length ? ` – ingen elever er vurdert på ${mål.filter(m => !dekketKlasse.includes(m)).join(', ')}` : ''}.</p>
      ${!el.length ? '<p class="status warn">Ingen aktive elever.</p>' : `<div class="tblWrap"><table class="ovTbl"><thead><tr><th>Elev</th>${mål.map(m => `<th title="${esc(TEKST[m])}">${m}</th>`).join('')}<th>Mål med grunnlag</th><th>1. termin</th><th>Standpunkt</th></tr></thead><tbody>
        ${el.map(e => { const d = mål.filter(m => siste(e, m)).length, t1 = T(e, '1. termin'), sp = T(e, 'Standpunkt'); return `<tr><th scope="row"><button type="button" class="linkBtn" data-fane="elevkort" data-elev="${e.id}">${esc(e.navn)}</button></th>${mål.map(m => { const v = siste(e, m); return `<td class="${v ? kKl(v.karakter) : 'k0'}" ${v ? `title="${datoTxt(v.dato)} ${esc(v.oppgave.tittel)}"` : ''}>${v ? kTxt(v) : ''}</td>`; }).join('')}<td>${d} / ${mål.length}</td><td class="${t1 ? kKl(t1.karakter) : ''}">${t1 ? t1.karakter : ''}</td><td class="${sp ? kKl(sp.karakter) : ''}">${sp ? sp.karakter : ''}</td></tr>`; }).join('')}
      </tbody></table></div>`}`;
    $('#oFag').addEventListener('change', x => { S.fag = x.target.value; tegnOversikt(); });
    $('#oAar').addEventListener('change', x => { S.aar = x.target.value; tegnOversikt(); });
  }

  /* ---------- Elever ---------- */
  function tegnElever() {
    const V = $('#view'), el = S.data.elever;
    V.innerHTML = `<h2>Elever</h2>
      <p class="muted">Bruk navn eller elevnummer – det avgjør du og ledelsen. Skriv ikke fødselsnummer, helseopplysninger eller andre sensitive opplysninger noe sted i registeret.</p>
      <form id="fElev" class="card"><h3>Legg til elever</h3><label for="eNavn">Én elev per linje (navn eller elevnummer)</label><textarea id="eNavn" rows="4" required></textarea>
        <label for="eKl">Klasse</label><input id="eKl" value="${esc((el[el.length - 1] || {}).klasse || '2TLLB')}" maxlength="20">
        <button class="btn" type="submit">Legg til</button><p class="err" role="alert"></p></form>
      ${el.length ? `<div class="tblWrap"><table class="ovTbl"><thead><tr><th>Elev</th><th>Klasse</th><th>Vurderinger</th><th>Status</th><th></th></tr></thead><tbody>
        ${el.map(e => `<tr><th scope="row">${esc(e.navn)}</th><td>${esc(e.klasse)}</td><td>${aktiveVurd().filter(v => v.elev === e.id).length}</td><td>${e.aktiv ? 'Aktiv' : 'Deaktivert'}</td><td class="nowrap"><button type="button" class="btn sec small" data-endre-elev="${e.id}">Endre</button> <button type="button" class="btn sec small" data-aktiv="${e.id}">${e.aktiv ? 'Deaktiver' : 'Aktiver'}</button> <button type="button" class="btn danger small" data-slett-elev="${e.id}">Slett</button></td></tr>`).join('')}
      </tbody></table></div><p class="muted">Deaktiver elever som slutter eller bytter klasse – da beholdes historikken. «Slett» fjerner eleven og alle vurderingene permanent.</p>` : ''}`;
    $('#fElev').addEventListener('submit', x => {
      x.preventDefault(); const navn = $('#eNavn').value.split('\n').map(s => s.trim()).filter(Boolean), kl = $('#eKl').value.trim();
      const finnes = navn.filter(n => el.some(e => e.navn.toLowerCase() === n.toLowerCase()));
      if (finnes.length) { x.target.querySelector('.err').textContent = 'Finnes fra før: ' + finnes.join(', '); return; }
      navn.forEach(n => el.push({ id: uid(), navn: n.slice(0, 80), klasse: kl, aktiv: true, opprettet: naa() }));
      endret(`La til ${navn.length} ${navn.length === 1 ? 'elev' : 'elever'}`); tegnElever();
    });
  }
  document.addEventListener('click', e => {
    if (!S.data) return;
    const so = e.target.closest('[data-slett-opp]'); if (so) { S.data.egneOppgaver = S.data.egneOppgaver.filter(o => o.id !== so.dataset.slettOpp); endret('Fjernet en egen oppgave'); tegnFil(); return; }
    const a = e.target.closest('[data-aktiv]'); if (a) { const el = S.data.elever.find(x => x.id === a.dataset.aktiv); el.aktiv = !el.aktiv; endret(`${el.aktiv ? 'Aktiverte' : 'Deaktiverte'} ${el.navn}`); tegnElever(); return; }
    const r = e.target.closest('[data-endre-elev]'); if (r) {
      const el = S.data.elever.find(x => x.id === r.dataset.endreElev);
      modal(`<h2>Endre elev</h2><label for="xn">Navn eller elevnummer</label><input id="xn" name="n" value="${esc(el.navn)}" maxlength="80" required><label for="xk">Klasse</label><input id="xk" name="k" value="${esc(el.klasse)}" maxlength="20"><p class="err"></p><div class="actions"><button class="btn" type="submit">Lagre</button><button class="btn sec" value="avbryt" formnovalidate>Avbryt</button></div>`, f => {
        const n = f.elements.n.value.trim(); if (!n) return false;
        if (S.data.elever.some(x => x !== el && x.navn.toLowerCase() === n.toLowerCase())) { f.querySelector('.err').textContent = 'Finnes fra før.'; return false; }
        const gml = el.navn; el.navn = n; el.klasse = f.elements.k.value.trim(); endret(`Endret elev ${gml} → ${n}`); tegnElever();
      }); return;
    }
    const s = e.target.closest('[data-slett-elev]'); if (s) {
      const el = S.data.elever.find(x => x.id === s.dataset.slettElev);
      modal(`<h2>Slette ${esc(el.navn)} permanent?</h2><p>Eleven, alle vurderingene, terminkarakterene og historikken slettes. Det kan ikke angres. Vil du bare skjule eleven, bruk «Deaktiver».</p><label for="xs">Skriv SLETT for å bekrefte</label><input id="xs" name="s" autocomplete="off" required><p class="err"></p><div class="actions"><button class="btn danger" type="submit">Slett permanent</button><button class="btn sec" value="avbryt" formnovalidate>Avbryt</button></div>`, f => {
        if (f.elements.s.value.trim() !== 'SLETT') { f.querySelector('.err').textContent = 'Skriv SLETT med store bokstaver.'; return false; }
        S.data.vurderinger = S.data.vurderinger.filter(v => v.elev !== el.id); S.data.terminer = S.data.terminer.filter(t => t.elev !== el.id); S.data.sosial = S.data.sosial.filter(x => x.elev !== el.id); S.data.egneSosMaal = S.data.egneSosMaal.filter(x => x.elev !== el.id); S.data.ub.bedrifter.forEach(b => { b.medlemmer = b.medlemmer.filter(m => m.elev !== el.id); }); S.data.elever = S.data.elever.filter(x => x !== el);
        S.data.logg.forEach(l => { l.hva = l.hva.split(el.navn).join('(slettet elev)'); });
        endret('Slettet en elev permanent'); tegnElever();
      });
    }
  });

  /* ---------- Fil og sikkerhet ---------- */
  function tegnFil() {
    const V = $('#view');
    V.innerHTML = `<h2>Innstillinger</h2>
      <section class="card"><h3>Hvor dataene ligger</h3>
        <p>Registeret er kryptert med passordet ditt og ligger <b>bare</b> i filen du velger og som kopi i denne nettleseren. Ingenting sendes til TLLfluenseren eller GitHub. Uten passordet kan ingen lese filen – heller ikke du.</p>
        <p>${S.fil ? `Koblet til filen <b>${esc(S.fil.name)}</b>. Endringer lagres automatisk.` : 'Ikke koblet til noen fil ennå.'}</p>
        <div class="actions">${kanVelgeFil ? `<button type="button" class="btn" id="fKoble">${S.fil ? 'Lagre som ny fil …' : 'Koble til fil i OneDrive …'}</button>` : '<p class="status warn">Denne nettleseren kan ikke lagre direkte til en fil. Bruk Edge eller Chrome, eller last ned en kopi etter hver økt.</p>'}<button type="button" class="btn sec" id="fNed">Last ned kryptert kopi</button></div>
        <p class="muted">Tips: Lagre filen i skolens OneDrive. Da har du sikkerhetskopi og kan åpne registeret på en annen PC med «Åpne en registerfil». Lås registeret når du går fra PC-en; det låses også selv etter ${LAAS_ETTER_MIN} minutter.</p></section>
      <section class="card"><h3>Eksport</h3><p class="muted">CSV-filen er <b>ikke</b> kryptert. Lagre den bare på godkjent sted og slett den når du er ferdig.</p><div class="actions"><button type="button" class="btn sec" id="fCsv">Eksporter vurderinger (CSV)</button></div></section>
      ${yffSeksjon()}
      <section class="card"><h3>Egne oppgaver</h3><p class="muted">Oppgaver som ikke finnes på TLLfluenseren, for eksempel tverrfaglige oppdrag eller prøver. De dukker opp i oppgavelisten.</p>
        ${(S.data.egneOppgaver || []).length ? `<ul class="egne">${S.data.egneOppgaver.map(o => `<li><b>${esc(o.tittel)}</b> <span class="muted">${o.maal.join(', ')}</span> <button type="button" class="linkBtn" data-slett-opp="${o.id}">Fjern</button></li>`).join('')}</ul>` : ''}
        <form id="fOpp"><label for="oTit">Tittel</label><input id="oTit" maxlength="140" required><details class="maalBox" open><summary>Kompetansemål</summary>${maalVelger([], 'oMaal')}</details><button class="btn sec" type="submit">Legg til oppgave</button><p class="err"></p></form></section>
      <section class="card"><h3>Bytt passord</h3><form id="fPw"><label for="p1">Nytt passord (minst 10 tegn)</label><input id="p1" type="password" autocomplete="new-password" minlength="10" required><label for="p2">Gjenta</label><input id="p2" type="password" autocomplete="new-password" minlength="10" required><button class="btn sec" type="submit">Bytt passord</button><p class="err" role="alert"></p></form>
        <p class="muted">Gamle kopier du har lastet ned, åpnes fortsatt med det gamle passordet.</p></section>
      <section class="card"><h3>Endringslogg</h3><ul class="logg">${S.data.logg.slice(0, 300).map(l => `<li><span class="muted">${esc(tidTxt(l.tid))}</span> ${esc(l.hva)}</li>`).join('')}</ul></section>`;
    if ($('#fKoble')) $('#fKoble').addEventListener('click', kobleFil);
    $('#fNed').addEventListener('click', lastNedKopi);
    $('#fCsv').addEventListener('click', eksporterCsv);
    $('#fOpp').addEventListener('submit', x => {
      x.preventDefault(); const t = $('#oTit').value.trim(), m = [...document.querySelectorAll('input[name=oMaal]:checked')].map(c => c.value);
      if (!t || !m.length) { x.target.querySelector('.err').textContent = 'Skriv tittel og velg minst ett mål.'; return; }
      S.data.egneOppgaver.push({ id: 'egen-' + uid(), tittel: t, maal: m }); endret('La til egen oppgave: ' + t); tegnFil();
    });
    $('#fPw').addEventListener('submit', async x => {
      x.preventDefault(); const f = x.target; if ($('#p1').value !== $('#p2').value) { f.querySelector('.err').textContent = 'Passordene er ikke like.'; return; }
      S.salt = crypto.getRandomValues(new Uint8Array(16)); S.key = await lagNokkel($('#p1').value, S.salt); $('#p1').value = $('#p2').value = '';
      logg('Byttet passord'); await lagre(true); f.querySelector('.err').textContent = ''; f.insertAdjacentHTML('beforeend', '<p class="status ok">Passordet er byttet.</p>');
    });
  }
  function eksporterCsv() {
    const q = s => '"' + String(s ?? '').replace(/"/g, '""') + '"';
    const rader = [['Skoleår', 'Dato', 'Elev', 'Klasse', 'Oppgave', 'Kompetansemål', 'Fag', 'Dokumentasjon', 'Status', 'Karakter', 'Faglig tilbakemelding', 'Fremovermelding', 'Internt notat', 'Antall endringer']];
    aktiveVurd().slice().sort((a, b) => a.dato.localeCompare(b.dato)).forEach(v => { const e = S.data.elever.find(x => x.id === v.elev) || {}; rader.push([skolear(v.dato), v.dato, e.navn, e.klasse, v.oppgave.tittel, v.maal.join(' '), [...new Set(v.maal.map(fagAv))].join(' '), v.type, v.status, v.karakter ? v.karakter + (v.tendens || '') : '', v.tilbakemelding, v.fremover, v.notat, v.historikk.length]); });
    S.data.terminer.forEach(t => { const e = S.data.elever.find(x => x.id === t.elev) || {}; rader.push([t.skolear, t.dato, e.navn, e.klasse, t.type, '', t.fag, 'Helhetlig vurdering', '', t.karakter, t.begrunnelse, '', '', t.historikk.length]); });
    S.data.sosial.forEach(x => { const e = S.data.elever.find(y => y.id === x.elev) || {}; rader.push([skolear(x.dato), x.dato, e.navn, e.klasse, x.situasjon, x.maal.map(sosMaalNavn).join(' | '), 'Sosial læring', 'Observasjon', '', x.niva ? SOS_NIVA[x.niva] : '', x.observasjon, x.fremover, '', 0]); });
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + rader.map(r => r.map(q).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    a.download = `vurderinger-${idag()}.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); logg('Eksporterte vurderinger til CSV');
  }

  /* ---------- Ungdomsbedrift ---------- */
  const UB_OMR = [['Team og arbeidsmiljø', 'Arbeidsfordeling, trygghet, konflikt og kultur', ['BL11', 'BL10']], ['IA, NAV og HMS', 'Inkludering, nærvær, tilrettelegging og HMS', ['BL4', 'BL11']], ['Idé og innovasjon', 'Kundebehov, testing og forbedring', ['BL1', 'TLL3']], ['Organisering og ledelse', 'Roller, styre, daglig leder og ansvar', ['BL1']], ['Strategi og forretningsplan', 'Mål, nøkkeltall, risiko og bruk av plan', ['BL1']], ['Marked og merkevare', 'Målgruppe, kanal, effekt og merkevare', ['BL1', 'TLL3']], ['Produkt, produksjon og logistikk', 'Leverandør, flyt, lager, kvalitet, HMS og kostnad', ['BL8', 'TLL1', 'BL4']], ['Salg og kundebehandling', 'Salgsmål, pipeline, kundedialog og reklamasjon', ['TLL3']], ['Økonomi og regnskap', 'Budsjett, kalkyle, likviditet, bilag og avvik', ['BL1', 'BL9']], ['Bærekraft og samfunnsansvar', 'Konkrete tiltak, effekt, etikk og dokumentasjon', ['BL3', 'BL10']], ['Mentor og nettverk', 'Mentorbruk og verdi av eksterne relasjoner', ['BL1']], ['KI og digitale verktøy', 'Kvalitetssikring, personvern og ansvarlig KI', ['TLL7', 'BL10']], ['Konkurranse/pitch', 'Kriterier, dokumentasjon, pitch og jurytrening', ['BL1']], ['Avslutning og rapportering', 'Årsoppgjør, rapport, generalforsamling og læring', ['BL1', 'BL9']]];
  const UB_NIVA = { 1: 'Kom i gang', 2: 'Bygg bedriften', 3: 'Sats' };
  const UB_MILE = [['Oppstart', 'Teamavtale + første nivåvurdering', 'Aug/Sep'], ['Idé', 'Kundeinnsikt og valgt forretningsidé', 'Sep'], ['Etablering', 'Stiftelse, roller, registrering og mentor', 'Sep/Okt'], ['Planlegging', 'Forretningsmodell, marked, HMS og budsjett', 'Okt'], ['Utvikling', 'Prototype/test + produktkalkyle', 'Okt/Nov'], ['Salg', 'Første faktiske kunde', 'Nov'], ['Drift', 'Første månedsrapport og styremøte', 'Nov/Des'], ['IA', 'IA-handlingsplan evaluert', 'Etter IA-kurs'], ['Konkurranse', 'Kriterier valgt og dokumentasjon samlet', 'Jan/Feb'], ['Konkurranse', 'Pitch og jurytrening', 'Før FM'], ['Årsoppgjør', 'Regnskap og årsrapport ferdig', 'Vår'], ['Avvikling', 'Generalforsamling og slettemelding', 'Vår']];
  const MS_STATUS = ['Ikke startet', 'Pågår', 'Venter', 'Ferdig'], PRIO = ['Lav', 'Middels', 'Høy'];
  const nKl = n => !n ? 'k0' : n === 1 ? 'k-lav' : n === 2 ? 'k-mid' : 'k-hoy';
  const ubAktive = () => S.data.ub.bedrifter.filter(b => b.aktiv !== false);
  function ubTall(b) {
    const niv = UB_OMR.map(([o]) => (b.niva[o] || {}).n).filter(Boolean);
    const snitt = niv.length ? (niv.reduce((a, c) => a + c, 0) / niv.length) : null;
    const lav = UB_OMR.filter(([o]) => (b.niva[o] || {}).n).sort((x, y) => b.niva[x[0]].n - b.niva[y[0]].n);
    const ms = S.data.ub.milepaler.filter(m => m.ub === b.id), ferdig = ms.filter(m => m.status === 'Ferdig').length;
    const vl = S.data.ub.veiledning.filter(v => v.ub === b.id && v.status !== 'Lukket');
    const neste = vl.map(v => v.neste).filter(Boolean).sort()[0];
    return { snitt, fokus: lav.length ? lav[0][0] : (niv.length ? '' : 'Ikke vurdert ennå'), ms, ferdig, hoy: vl.filter(v => v.prioritet === 'Høy').length, neste, vurdert: niv.length };
  }
  const medlemNavn = b => b.medlemmer.map(m => esc(elevNavn(m.elev)) + (m.rolle ? ` <span class="muted">(${esc(m.rolle)})</span>` : '')).join(', ');
  function tegnUb() {
    const V = $('#view'), alle = ubAktive();
    if (S.ub && !alle.find(b => b.id === S.ub)) S.ub = null;
    if (!S.ub && alle.length) S.ub = alle[0].id;
    const b = alle.find(x => x.id === S.ub);
    const klasseSnitt = o => { const l = alle.map(x => (x.niva[o] || {}).n).filter(Boolean); return l.length ? (l.reduce((a, c) => a + c, 0) / l.length).toFixed(1).replace('.', ',') : ''; };
    V.innerHTML = `<h2>Ungdomsbedrift</h2>
      <p class="muted">Bedriftens nivå (1 ${UB_NIVA[1]} · 2 ${UB_NIVA[2]} · 3 ${UB_NIVA[3]}) er en status for hele teamet og brukes til veiledning – ikke karakter. Den individuelle vurderingen gjør du med «Vurder medlemmene», som legger vurderingen på kompetansemålene i elevkortet til hver elev.</p>
      <div class="actions"><button type="button" class="btn" id="ubNy">+ Ny ungdomsbedrift</button></div>
      ${alle.length ? `<h3 class="mt">Oversikt</h3><div class="tblWrap"><table class="ovTbl"><thead><tr><th>UB</th><th>Snitt nivå</th><th>Lærerens fokus</th><th>Åpne høy prioritet</th><th>Milepæler</th><th>Neste veiledning</th></tr></thead><tbody>
        ${alle.map(x => { const t = ubTall(x); return `<tr ${x.id === S.ub ? 'class="valgt"' : ''}><th scope="row"><button type="button" class="linkBtn" data-ubvelg="${x.id}">${esc(x.navn)}</button></th><td>${t.snitt ? t.snitt.toFixed(1).replace('.', ',') : '–'}</td><td>${esc(t.fokus)}</td><td>${t.hoy || ''}</td><td>${t.ferdig} / ${t.ms.length}</td><td>${t.neste ? datoTxt(t.neste) : ''}</td></tr>`; }).join('')}
      </tbody></table></div>
      <details class="card"><summary><b>Nivå per område for alle bedriftene</b></summary><div class="tblWrap"><table class="ovTbl heat"><thead><tr><th>Område</th>${alle.map(x => `<th>${esc(x.navn)}</th>`).join('')}<th>Klassen</th></tr></thead><tbody>
        ${UB_OMR.map(([o]) => `<tr><th scope="row">${esc(o)}</th>${alle.map(x => { const n = (x.niva[o] || {}).n; return `<td class="${nKl(n)}">${n || ''}</td>`; }).join('')}<td>${klasseSnitt(o)}</td></tr>`).join('')}
      </tbody></table></div></details>` : '<p class="status warn">Ingen ungdomsbedrifter ennå.</p>'}
      ${b ? ubDetalj(b) : ''}`;
    $('#ubNy').addEventListener('click', () => ubSkjema());
    if (b) {
      $('#ubVl').addEventListener('submit', e => {
        e.preventDefault(); const f = e.target, g = n => f.elements[n].value.trim();
        if (!g('obs') && !g('steg')) { f.querySelector('.err').textContent = 'Skriv en observasjon eller et neste steg.'; return; }
        S.data.ub.veiledning.unshift({ id: uid(), ub: b.id, dato: g('dato') || idag(), omrade: g('omr'), nivaNaa: (b.niva[g('omr')] || {}).n || null, prioritet: g('prio'), observasjon: g('obs'), steg: g('steg'), ansvarlig: g('ansv'), frist: g('frist'), neste: g('neste'), status: 'Åpen', opprettet: naa() });
        endret(`Veiledning ${b.navn}: ${g('omr')}`); tegnUb();
      });
    }
  }
  function ubDetalj(b) {
    const t = ubTall(b), vl = S.data.ub.veiledning.filter(v => v.ub === b.id);
    return `<section class="card ubDet"><div class="fkHead"><h3>${esc(b.navn)}</h3><span><button type="button" class="btn sec small" data-ubendre="${b.id}">Endre bedrift og medlemmer</button></span></div>
      <p><b>Medlemmer:</b> ${b.medlemmer.length ? medlemNavn(b) : '<span class="muted">ingen</span>'}</p>
      <h4>Nivå per område</h4><div class="tblWrap"><table class="ovTbl"><thead><tr><th>Område</th><th>Veiledningsfokus</th><th>Nivå</th><th>Oppdatert</th><th></th></tr></thead><tbody>
        ${UB_OMR.map(([o, fokus], i) => { const n = b.niva[o] || {}; return `<tr><th scope="row">${esc(o)}</th><td class="muted">${esc(fokus)}</td><td class="${nKl(n.n)}"><select data-ubniva="${b.id}" data-omr="${i}" aria-label="Nivå ${esc(o)}"><option value="">–</option>${[1, 2, 3].map(k => `<option value="${k}" ${n.n === k ? 'selected' : ''}>${k} · ${UB_NIVA[k]}</option>`).join('')}</select></td><td>${n.dato ? datoTxt(n.dato) : ''}</td><td><button type="button" class="btn sec small" data-ubvurder="${b.id}" data-omr="${i}">Vurder medlemmene</button></td></tr>`; }).join('')}
      </tbody></table></div>
      <h4>Milepæler (${t.ferdig} av ${t.ms.length} ferdig)</h4><div class="tblWrap"><table class="ovTbl"><thead><tr><th>Fase</th><th>Milepæl</th><th>Periode</th><th>Status</th><th>Frist</th><th>Dokumentasjon / kommentar</th></tr></thead><tbody>
        ${t.ms.map(m => `<tr class="${m.status === 'Ferdig' ? 'ferdig' : ''}"><td>${esc(m.fase)}</td><th scope="row">${esc(m.tittel)}</th><td>${esc(m.periode)}</td><td><select data-ms="${m.id}" data-felt="status" aria-label="Status">${MS_STATUS.map(x => `<option ${m.status === x ? 'selected' : ''}>${x}</option>`).join('')}</select></td><td><input type="date" data-ms="${m.id}" data-felt="frist" value="${m.frist || ''}" aria-label="Frist"></td><td><input data-ms="${m.id}" data-felt="kommentar" value="${esc(m.kommentar || '')}" maxlength="300" aria-label="Kommentar"></td></tr>`).join('')}
      </tbody></table></div>
      <h4>Veiledning</h4>
      <form id="ubVl" class="vlForm"><div class="grid3"><div><label for="vDato">Dato</label><input id="vDato" name="dato" type="date" value="${idag()}"></div><div><label for="vOmr">Område</label><select id="vOmr" name="omr">${UB_OMR.map(([o]) => `<option ${o === t.fokus ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></div><div><label for="vPrio">Prioritet</label><select id="vPrio" name="prio">${PRIO.map(p => `<option ${p === 'Middels' ? 'selected' : ''}>${p}</option>`).join('')}</select></div></div>
        <div class="grid2 tight"><div><label for="vObs">Observasjon / dokumentasjon</label><textarea id="vObs" name="obs" rows="2" maxlength="1500"></textarea></div><div><label for="vSteg">Neste konkrete steg</label><textarea id="vSteg" name="steg" rows="2" maxlength="1000"></textarea></div></div>
        <div class="grid3"><div><label for="vAnsv">Ansvarlig</label><input id="vAnsv" name="ansv" maxlength="80" placeholder="Rolle eller elev"></div><div><label for="vFrist">Frist</label><input id="vFrist" name="frist" type="date"></div><div><label for="vNeste">Neste veiledning</label><input id="vNeste" name="neste" type="date"></div></div>
        <button class="btn" type="submit">Lagre veiledning</button><p class="err" role="alert"></p></form>
      ${vl.length ? `<div class="vList">${vl.map(v => `<article class="vItem ${v.status === 'Lukket' ? 'lukket' : ''}"><div class="vTop"><span class="chip ${v.prioritet === 'Høy' ? 'k-lav' : v.prioritet === 'Middels' ? 'k-mid' : 'k-hoy'}"><span class="kv">${esc(v.prioritet)}</span></span><div><b>${esc(v.omrade)}</b>${v.nivaNaa ? ` · nivå ${v.nivaNaa}` : ''}<div class="muted">${datoTxt(v.dato)}${v.ansvarlig ? ' · ' + esc(v.ansvarlig) : ''}${v.frist ? ' · frist ' + datoTxt(v.frist) : ''}${v.neste ? ' · neste veiledning ' + datoTxt(v.neste) : ''}</div></div><button type="button" class="btn sec small" data-vlstatus="${v.id}">${v.status === 'Lukket' ? 'Åpne igjen' : 'Marker som fulgt opp'}</button></div>${v.observasjon ? `<p><b>Observasjon:</b> ${esc(v.observasjon)}</p>` : ''}${v.steg ? `<p><b>Neste steg:</b> ${esc(v.steg)}</p>` : ''}</article>`).join('')}</div>` : ''}
    </section>`;
  }
  function ubSkjema(b) {
    const ny = !b, el = S.data.elever.filter(e => e.aktiv || (b && b.medlemmer.some(m => m.elev === e.id)));
    const rolle = id => ((b && b.medlemmer.find(m => m.elev === id)) || {}).rolle || '';
    const er = id => b && b.medlemmer.some(m => m.elev === id);
    modal(`<h2>${ny ? 'Ny ungdomsbedrift' : 'Endre ' + esc(b.navn)}</h2>
      <label for="uNavn">Navn på bedriften</label><input id="uNavn" name="navn" value="${esc(b ? b.navn : '')}" maxlength="80" required>
      <h3 class="mt">Medlemmer og roller</h3>${el.length ? `<div class="medl">${el.map(e => `<div class="medlRad"><label class="chk"><input type="checkbox" name="m" value="${e.id}" ${er(e.id) ? 'checked' : ''}> ${esc(e.navn)}</label><input name="r-${e.id}" value="${esc(rolle(e.id))}" placeholder="Rolle, f.eks. daglig leder" maxlength="60" aria-label="Rolle for ${esc(e.navn)}"></div>`).join('')}</div>` : '<p class="muted">Legg til elever først.</p>'}
      ${ny ? '<p class="muted">De tolv standard-milepælene fra lærerdashbordet legges inn automatisk.</p>' : ''}
      <p class="err"></p><div class="actions"><button class="btn" type="submit">${ny ? 'Opprett' : 'Lagre'}</button><button class="btn sec" value="avbryt" formnovalidate>Avbryt</button>${ny ? '' : '<button class="btn danger" type="button" id="uArk">Avslutt bedriften</button>'}</div>`, f => {
      const navn = f.elements.navn.value.trim(); if (!navn) return false;
      if (S.data.ub.bedrifter.some(x => x !== b && x.aktiv !== false && x.navn.toLowerCase() === navn.toLowerCase())) { f.querySelector('.err').textContent = 'Det finnes allerede en bedrift med det navnet.'; return false; }
      const medlemmer = [...f.querySelectorAll('input[name=m]:checked')].map(c => ({ elev: c.value, rolle: f.elements['r-' + c.value].value.trim() }));
      if (ny) { const id = uid(); S.data.ub.bedrifter.push({ id, navn, medlemmer, niva: {}, aktiv: true, opprettet: naa() }); UB_MILE.forEach(([fase, tittel, periode]) => S.data.ub.milepaler.push({ id: uid(), ub: id, fase, tittel, periode, status: 'Ikke startet', frist: '', kommentar: '' })); S.ub = id; endret('Opprettet ungdomsbedriften ' + navn); }
      else { b.navn = navn; b.medlemmer = medlemmer; endret('Endret ungdomsbedriften ' + navn); }
      tegnUb();
    });
    if (!ny) $('#uArk').addEventListener('click', () => { b.aktiv = false; endret('Avsluttet ungdomsbedriften ' + b.navn); $('#modal').close(); tegnUb(); });
  }
  document.addEventListener('click', e => {
    if (!S.data) return;
    const v = e.target.closest('[data-ubvelg]'); if (v) { S.ub = v.dataset.ubvelg; tegnUb(); return; }
    const en = e.target.closest('[data-ubendre]'); if (en) { ubSkjema(S.data.ub.bedrifter.find(b => b.id === en.dataset.ubendre)); return; }
    const vs = e.target.closest('[data-vlstatus]'); if (vs) { const x = S.data.ub.veiledning.find(y => y.id === vs.dataset.vlstatus); x.status = x.status === 'Lukket' ? 'Åpen' : 'Lukket'; endret('Veiledning ' + x.status.toLowerCase()); tegnUb(); return; }
    const vu = e.target.closest('[data-ubvurder]'); if (vu) {
      const b = S.data.ub.bedrifter.find(x => x.id === vu.dataset.ubvurder), [o] = UB_OMR[+vu.dataset.omr];
      reg = { oppgave: '', tittel: `UB ${b.navn}: ${o}`, maal: [...UB_OMR[+vu.dataset.omr][2]], dato: idag(), type: 'Ungdomsbedrift – arbeid og dokumentasjon', url: '', kun: b.medlemmer.map(m => m.elev), kunTekst: `medlemmene i ${b.navn}` };
      S.fane = 'registrer'; tegn(); scrollTo(0, 0);
    }
  });
  document.addEventListener('change', e => {
    if (!S.data) return;
    const n = e.target.closest('[data-ubniva]'); if (n) {
      const b = S.data.ub.bedrifter.find(x => x.id === n.dataset.ubniva), [o] = UB_OMR[+n.dataset.omr], k = +n.value;
      if (k) b.niva[o] = { n: k, dato: idag() }; else delete b.niva[o];
      endret(`UB ${b.navn}: ${o} satt til nivå ${k || '–'}`); tegnUb(); return;
    }
    const m = e.target.closest('[data-ms]'); if (m) {
      const x = S.data.ub.milepaler.find(y => y.id === m.dataset.ms); x[m.dataset.felt] = m.value.trim();
      endret(m.dataset.felt === 'status' ? `Milepæl «${x.tittel}»: ${x.status}` : null); if (m.dataset.felt === 'status') tegnUb();
    }
  });
  function ubKort(e) {
    const bs = S.data.ub.bedrifter.filter(b => b.medlemmer.some(m => m.elev === e.id)); if (!bs.length) return '';
    return `<section class="card"><h3>Ungdomsbedrift</h3>${bs.map(b => { const t = ubTall(b), r = b.medlemmer.find(m => m.elev === e.id).rolle; return `<p><b>${esc(b.navn)}</b>${r ? ' · ' + esc(r) : ''}${b.aktiv === false ? ' · avsluttet' : ''} · milepæler ${t.ferdig}/${t.ms.length}${t.snitt ? ' · bedriftens snittnivå ' + t.snitt.toFixed(1).replace('.', ',') : ''}</p><p class="muted">Bedriftens nivå er en teamstatus. Elevens egen vurdering i UB står under kompetansemålene over.</p>`; }).join('')}</section>`;
  }

  /* ---------- Sosial læring ---------- */
  const SOS_NIVA = { 1: 'Under utvikling', 2: 'På god vei', 3: 'Mestrer godt' };
  const egneAktive = id => S.data.egneSosMaal.filter(m => m.elev === id && m.status === 'aktiv');
  const sosMaalNavn = id => (S.data.sosialeMaal.find(m => m.id === id) || S.data.egneSosMaal.find(m => m.id === id) || {}).tekst || '(fjernet mål)';
  const sisteObs = (elev, mid) => { const l = S.data.sosial.filter(x => x.elev === elev && x.maal.includes(mid) && x.niva).sort((a, b) => a.dato.localeCompare(b.dato)); return l[l.length - 1]; };
  let sosImport = null;
  function tegnSosial() {
    const V = $('#view'), mål = S.data.sosialeMaal, el = S.data.elever.filter(e => e.aktiv);
    if (!S.sosDato) S.sosDato = idag();
    const siste = (e, m) => { const l = S.data.sosial.filter(x => x.elev === e.id && x.maal.includes(m.id) && x.niva && skolear(x.dato) === S.aar).sort((a, b) => a.dato.localeCompare(b.dato)); return l[l.length - 1]; };
    const egneTxt = e => { const a = egneAktive(e.id), n = S.data.egneSosMaal.filter(m => m.elev === e.id && m.status === 'nådd').length, obs = S.data.sosial.filter(x => x.elev === e.id && x.maal.some(id => a.some(m => m.id === id))).map(x => x.dato).sort().pop(); return a.length || n ? `${a.length} ${a.length === 1 ? 'aktivt' : 'aktive'}${n ? ` · ${n} nådd` : ''}${obs ? ` · sist observert ${datoTxt(obs)}` : a.length ? ' · <span class="varsel">ikke observert ennå</span>' : ''}` : '<span class="muted">ingen</span>'; };
    V.innerHTML = `<h2>Sosial læring</h2>
      <p class="veil">Sosial læring vurderes for seg. Det påvirker ikke karakterene i fagene, og det er heller ikke vurderingen i orden og atferd. Beskriv det du faktisk så eleven gjøre, og gi en fremovermelding.</p>
      <section class="card"><h3>Klassens sosiale mål</h3>${mål.length ? `<ul class="sosList">${mål.map(m => `<li><b>${esc(m.tekst)}</b>${m.forslag ? ' <span class="tag">forslag</span>' : ''}${m.ser ? `<br><span class="muted">Dette ser jeg etter: ${esc(m.ser)}</span>` : ''} <button type="button" class="linkBtn" data-sosmaal="${m.id}">Endre</button></li>`).join('')}</ul>` : ''}
        <p class="muted">Målene merket «forslag» er mine forslag. Bytt dem ut med verdiene klassen har blitt enige om.</p><button type="button" class="btn sec small" data-sosmaal="ny">+ Nytt sosialt mål</button></section>
      <details class="card" id="sImp" ${sosImport ? 'open' : ''}><summary><b>Legg inn elevenes egne mål fra SNA</b> <span class="muted">– hele klassen på én gang</span></summary>
        <p class="muted">Lim inn målene fra nettverksanalysen. Lagre bare selve målene – ikke sosiogrammet, hvem som valgte hvem eller andre svar fra undersøkelsen. Hver elev kan også få mål i elevkortet.</p>
        <p class="muted">Begge formatene fungerer:<br><code>Elev 01; Jeg tar initiativ til å jobbe med noen nye; Ser at eleven velger ny makker</code> (én linje per mål, «dette ser jeg etter» er valgfritt)<br>eller elevnavnet på én linje, med målene som punkter under (- mål).</p>
        <div class="grid2 tight"><div><label for="iKilde">Kilde</label><input id="iKilde" value="SNA" maxlength="40"></div><div><label for="iTil">Vurderes sammen med eleven (dato)</label><input id="iTil" type="date"></div></div>
        <label for="iTekst">Målene</label><textarea id="iTekst" rows="7"></textarea>
        <div class="actions"><button type="button" class="btn sec" id="iLes">Les inn og vis</button></div>
        <div id="iRes">${sosImport ? sosImportVis() : ''}</div></details>
      ${el.length ? `<form id="fSos" class="card" novalidate><h3>Registrer observasjon</h3>
        ${mål.length ? `<fieldset class="maalSet"><legend>Klassens mål (gjelder alle radene du fyller ut)</legend>${mål.map(m => `<label class="chk"><input type="checkbox" name="sm" value="${m.id}"> ${esc(m.tekst)}</label>`).join('')}</fieldset>` : ''}
        <p class="muted">Elevens egne mål står i hver rad. Kryss av for målene observasjonen gjelder.</p>
        <div class="grid2 tight"><div><label for="sDato">Dato</label><input id="sDato" type="date" value="${S.sosDato}"></div><div><label for="sSit">Situasjon</label><input id="sSit" maxlength="120" placeholder="F.eks. lastsikring i par, UB-møte"></div></div>
        <div class="tblWrap"><table class="regTbl"><thead><tr><th>Elev</th><th>Elevens egne mål</th><th>Nivå</th><th>Hva du så</th><th>Fremovermelding</th></tr></thead><tbody>
          ${el.map(e => { const a = egneAktive(e.id); return `<tr data-elev="${e.id}"><th scope="row">${esc(e.navn)}</th><td class="egneMaal">${a.length ? a.map(m => `<label class="chk"><input type="checkbox" name="em" value="${m.id}"> <span>${esc(m.tekst)}</span></label>`).join('') : '<span class="muted">Ingen</span>'}</td><td><select name="n" aria-label="Nivå"><option value="">–</option>${[1, 2, 3].map(k => `<option value="${k}">${SOS_NIVA[k]}</option>`).join('')}</select></td><td><textarea name="o" rows="2" maxlength="1000"></textarea></td><td><textarea name="f" rows="2" maxlength="1000"></textarea></td></tr>`; }).join('')}
        </tbody></table></div><button class="btn" type="submit">Lagre</button><p class="err" role="alert"></p><div id="sRes"></div></form>
      <h3 class="mt">Oversikt ${S.aar}</h3><div class="tblWrap"><table class="ovTbl"><thead><tr><th>Elev</th><th>Egne mål</th>${mål.map(m => `<th>${esc(m.tekst)}</th>`).join('')}</tr></thead><tbody>
        ${el.map(e => `<tr><th scope="row"><button type="button" class="linkBtn" data-fane="elevkort" data-elev="${e.id}">${esc(e.navn)}</button></th><td>${egneTxt(e)}</td>${mål.map(m => { const x = siste(e, m); return `<td class="${x ? nKl(x.niva) : 'k0'}">${x ? SOS_NIVA[x.niva] : ''}</td>`; }).join('')}</tr>`).join('')}
      </tbody></table></div>` : '<p class="status warn">Ingen aktive elever.</p>'}`;
    $('#iLes').addEventListener('click', () => { sosImport = lesSosImport($('#iTekst').value, $('#iKilde').value.trim(), $('#iTil').value); $('#iRes').innerHTML = sosImportVis(); });
    const f = $('#fSos'); if (!f) return;
    $('#sDato').addEventListener('change', x => { S.sosDato = x.target.value; });
    f.addEventListener('submit', x => {
      x.preventDefault(); const err = f.querySelector('.err'), mm = [...f.querySelectorAll('input[name=sm]:checked')].map(c => c.value), dato = $('#sDato').value;
      f.querySelectorAll('tr.feil').forEach(r => r.classList.remove('feil'));
      if (!dato || dato > idag()) { err.textContent = 'Sjekk datoen.'; return; }
      const rader = [], uten = [];
      f.querySelectorAll('tbody tr').forEach(r => {
        const g = n => r.querySelector(`[name=${n}]`).value.trim(), em = [...r.querySelectorAll('input[name=em]:checked')].map(c => c.value);
        if (!g('n') && !g('o') && !g('f')) return;
        const maal = mm.concat(em); if (!maal.length) { uten.push(r); return; }
        rader.push({ id: uid(), elev: r.dataset.elev, dato, maal, situasjon: $('#sSit').value.trim(), niva: +g('n') || null, observasjon: g('o'), fremover: g('f'), opprettet: naa() });
      });
      if (uten.length) { uten.forEach(r => r.classList.add('feil')); err.textContent = 'Velg et av klassens mål øverst, eller kryss av for et av elevens egne mål i de markerte radene.'; return; }
      if (!rader.length) { err.textContent = 'Ingen rader er fylt ut.'; return; }
      S.data.sosial.push(...rader); endret(`Sosial læring: ${rader.length} observasjoner (${dato})`); tegnSosial();
      $('#sRes').innerHTML = `<p class="status ok">Lagret ${rader.length} ${rader.length === 1 ? 'observasjon' : 'observasjoner'}.</p>`;
    });
  }
  function lesSosImport(txt, kilde, til) {
    const finn = n => S.data.elever.find(e => e.navn.toLowerCase() === n.trim().toLowerCase());
    const mal = [], ukjent = [], tomme = []; let cur = null;
    txt.split(/\r?\n/).forEach(rå => {
      const l = rå.trim(); if (!l) return;
      const deler = l.split(/\t|;|\|/).map(s => s.trim());
      if (deler.length >= 2 && deler[1]) { const e = finn(deler[0]); if (e) mal.push({ elev: e.id, tekst: deler[1], ser: deler[2] || '' }); else ukjent.push(l); cur = null; return; }
      const punkt = l.match(/^(?:[-–•*]|\d+[.)])\s*(.+)$/);
      if (punkt && cur) { mal.push({ elev: cur.id, tekst: punkt[1].trim(), ser: '' }); return; }
      const e = finn(l.replace(/:$/, '')); if (e) { cur = e; return; }
      const kolon = l.match(/^([^:]+):\s*(.+)$/); if (kolon && finn(kolon[1])) { mal.push({ elev: finn(kolon[1]).id, tekst: kolon[2].trim(), ser: '' }); return; }
      (cur ? tomme : ukjent).push(l);
    });
    return { mal: mal.filter(m => m.tekst), ukjent: ukjent.concat(tomme), kilde: kilde || 'SNA', til };
  }
  function sosImportVis() {
    const I = sosImport; if (!I) return '';
    const per = {}; I.mal.forEach(m => (per[m.elev] = per[m.elev] || []).push(m));
    const mange = Object.entries(per).filter(([id, l]) => l.length + egneAktive(id).length > 3).map(([id]) => elevNavn(id));
    return `${I.mal.length ? `<div class="tblWrap"><table class="ovTbl"><thead><tr><th>Elev</th><th>Mål som legges inn</th></tr></thead><tbody>${Object.entries(per).map(([id, l]) => `<tr><th scope="row">${esc(elevNavn(id))}</th><td><ul class="tett">${l.map(m => `<li>${esc(m.tekst)}${m.ser ? ` <span class="muted">– ser etter: ${esc(m.ser)}</span>` : ''}</li>`).join('')}</ul></td></tr>`).join('')}</tbody></table></div>` : '<p class="status warn">Fant ingen mål. Sjekk at elevnavnene er skrevet likt som under «Elever».</p>'}
      ${I.ukjent.length ? `<p class="status warn">Disse linjene ble ikke forstått eller hører til en elev som ikke finnes i registeret: ${I.ukjent.map(esc).join(' · ')}</p>` : ''}
      ${mange.length ? `<p class="status warn">${mange.map(esc).join(', ')} får mer enn tre aktive mål. To–tre om gangen er nok til at eleven og du klarer å følge dem opp.</p>` : ''}
      ${I.mal.length ? `<div class="actions"><button type="button" class="btn" id="iOk">Legg inn ${I.mal.length} mål</button><button type="button" class="btn sec" id="iAvbryt">Avbryt</button></div>` : ''}`;
  }
  document.addEventListener('click', e => {
    if (!S.data) return;
    if (e.target.id === 'iAvbryt') { sosImport = null; tegnSosial(); return; }
    if (e.target.id === 'iOk' && sosImport) {
      const I = sosImport;
      I.mal.forEach(m => S.data.egneSosMaal.push({ id: uid(), elev: m.elev, tekst: m.tekst.slice(0, 200), ser: m.ser.slice(0, 300), kilde: I.kilde, fra: idag(), til: I.til || '', sammen: false, status: 'aktiv', oppsummering: '', opprettet: naa() }));
      endret(`La inn ${I.mal.length} egne sosiale mål fra ${I.kilde}`); sosImport = null; tegnSosial();
      $('#iRes') && ($('#view h2').insertAdjacentHTML('afterend', `<p class="status ok">La inn ${I.mal.length} mål. Du finner dem i elevkortene og i registreringen.</p>`));
    }
  });
  function egenMaalSkjema(elevId, id) {
    const m = id && S.data.egneSosMaal.find(x => x.id === id), brukt = m && S.data.sosial.some(x => x.maal.includes(m.id));
    const f = modal(`<h2>${m ? 'Endre elevens mål' : 'Nytt mål for ' + esc(elevNavn(elevId))}</h2>
      <label for="emT">Målet, formulert som noe eleven gjør</label><input id="emT" name="t" value="${esc(m ? m.tekst : '')}" maxlength="200" required placeholder="F.eks. Jeg spør en jeg ikke kjenner så godt om å jobbe sammen">
      <label for="emS">Dette ser jeg etter</label><textarea id="emS" name="s" rows="2" maxlength="300">${esc(m ? m.ser : '')}</textarea>
      <div class="grid3"><div><label for="emK">Kilde</label><input id="emK" name="k" value="${esc(m ? m.kilde : 'SNA')}" maxlength="40"></div><div><label for="emF">Fra</label><input id="emF" name="fra" type="date" value="${m ? m.fra : idag()}"></div><div><label for="emTil">Vurderes</label><input id="emTil" name="til" type="date" value="${m ? m.til : ''}"></div></div>
      <label class="chk"><input type="checkbox" name="sammen" ${m && m.sammen ? 'checked' : ''}> Målet er gjennomgått og formulert sammen med eleven</label>
      <div class="grid2 tight"><div><label for="emSt">Status</label><select id="emSt" name="st">${[['aktiv', 'Aktivt'], ['nådd', 'Nådd'], ['avsluttet', 'Avsluttet']].map(([v, t]) => `<option value="${v}" ${(m ? m.status : 'aktiv') === v ? 'selected' : ''}>${t}</option>`).join('')}</select></div></div>
      <label for="emO">Oppsummering når perioden er over (hva ble nådd, hva nå?)</label><textarea id="emO" name="o" rows="3" maxlength="1000">${esc(m ? m.oppsummering : '')}</textarea>
      <p class="err"></p><div class="actions"><button class="btn" type="submit">Lagre</button><button class="btn sec" value="avbryt" formnovalidate>Avbryt</button>${m ? `<button class="btn danger" type="button" id="emSlett">${brukt ? 'Slett målet (observasjonene beholdes)' : 'Slett målet'}</button>` : ''}</div>`, f => {
      const g = n => f.elements[n].value.trim(), t = g('t'); if (!t) return false;
      if (!m && egneAktive(elevId).length >= 3 && g('st') === 'aktiv' && !f.dataset.ok) { f.dataset.ok = 1; f.querySelector('.err').textContent = 'Eleven har allerede tre aktive mål. To–tre om gangen er nok. Trykk Lagre en gang til hvis du likevel vil legge til.'; return false; }
      const ny = { tekst: t, ser: g('s'), kilde: g('k'), fra: g('fra'), til: g('til'), sammen: f.elements.sammen.checked, status: g('st'), oppsummering: g('o') };
      if (m) Object.assign(m, ny, { endret: naa() }); else S.data.egneSosMaal.push({ id: uid(), elev: elevId, ...ny, opprettet: naa() });
      endret(`${m ? 'Endret' : 'Nytt'} eget sosialt mål for ${elevNavn(elevId)}${m ? ' (' + ny.status + ')' : ''}`); tegn();
    });
    if (m) f.querySelector('#emSlett').addEventListener('click', () => { S.data.egneSosMaal = S.data.egneSosMaal.filter(x => x !== m); endret('Slettet et eget sosialt mål for ' + elevNavn(elevId)); $('#modal').close(); tegn(); });
  }
  document.addEventListener('click', e => {
    if (!S.data) return;
    const b = e.target.closest('[data-egenmaal]'); if (b) egenMaalSkjema(b.dataset.elev, b.dataset.egenmaal === 'ny' ? null : b.dataset.egenmaal);
  });
  function sosialKort(e) {
    const l = S.data.sosial.filter(x => x.elev === e.id && skolear(x.dato) === S.aar).sort((a, b) => b.dato.localeCompare(a.dato));
    const egne = S.data.egneSosMaal.filter(m => m.elev === e.id).sort((a, b) => (a.status === 'aktiv' ? 0 : 1) - (b.status === 'aktiv' ? 0 : 1) || b.fra.localeCompare(a.fra));
    const aktive = egne.filter(m => m.status === 'aktiv');
    const merk = [];
    if (aktive.length > 3) merk.push(`${aktive.length} aktive mål. To–tre om gangen er nok.`);
    aktive.filter(m => m.til && m.til < idag()).forEach(m => merk.push(`Perioden for «${m.tekst}» er ute. Vurder målet sammen med eleven og sett status.`));
    aktive.filter(m => !m.sammen).length && merk.push('Ikke alle aktive mål er gjennomgått med eleven ennå.');
    return `<section class="card sosKort"><h3>Sosial læring</h3><p class="muted">Holdes adskilt fra den faglige vurderingen.</p>
      <h4>Elevens egne mål</h4>${egne.length ? `<div class="vList">${egne.map(m => { const s = sisteObs(e.id, m.id), n = S.data.sosial.filter(x => x.elev === e.id && x.maal.includes(m.id)).length; return `<article class="vItem egen ${m.status !== 'aktiv' ? 'lukket' : ''}"><div class="vTop"><span class="chip ${m.status === 'nådd' ? 'k-hoy' : m.status === 'avsluttet' ? 'k0' : s ? nKl(s.niva) : 'k0'}"><span class="kv">${m.status === 'aktiv' ? (s ? SOS_NIVA[s.niva] : 'Ikke observert') : m.status === 'nådd' ? 'Nådd' : 'Avsluttet'}</span></span><div><b>${esc(m.tekst)}</b><div class="muted">${esc(m.kilde || '')}${m.fra ? ' · fra ' + datoTxt(m.fra) : ''}${m.til ? ' · vurderes ' + datoTxt(m.til) : ''} · ${n} ${n === 1 ? 'observasjon' : 'observasjoner'}${m.sammen ? ' · gjennomgått med eleven' : ''}</div></div><button type="button" class="btn sec small noprint" data-egenmaal="${m.id}" data-elev="${e.id}">Endre</button></div>${m.ser ? `<p class="muted">Ser etter: ${esc(m.ser)}</p>` : ''}${m.oppsummering ? `<p><b>Oppsummering:</b> ${esc(m.oppsummering)}</p>` : ''}</article>`; }).join('')}</div>` : '<p class="muted">Ingen egne mål ennå.</p>'}
      ${merk.length ? `<ul class="merk">${merk.map(x => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      <button type="button" class="btn sec small noprint" data-egenmaal="ny" data-elev="${e.id}">+ Nytt eget mål</button>
      <h4>Observasjoner ${S.aar}</h4>${l.length ? `<div class="vList">${l.map(x => `<article class="vItem"><div class="vTop"><span class="chip ${nKl(x.niva)}"><span class="kv">${x.niva ? SOS_NIVA[x.niva] : '–'}</span></span><div><b>${x.maal.map(sosMaalNavn).map(esc).join(' · ')}</b><div class="muted">${datoTxt(x.dato)}${x.situasjon ? ' · ' + esc(x.situasjon) : ''}</div></div><button type="button" class="btn sec small noprint" data-slettsos="${x.id}">Slett</button></div>${x.observasjon ? `<p><b>Observert:</b> ${esc(x.observasjon)}</p>` : ''}${x.fremover ? `<p><b>Fremovermelding:</b> ${esc(x.fremover)}</p>` : ''}</article>`).join('')}</div>` : '<p class="muted">Ingen observasjoner dette skoleåret.</p>'}</section>`;
  }
  document.addEventListener('click', e => {
    if (!S.data) return;
    const ss = e.target.closest('[data-slettsos]'); if (ss) { S.data.sosial = S.data.sosial.filter(x => x.id !== ss.dataset.slettsos); endret('Slettet en observasjon i sosial læring'); tegn(); return; }
    const sm = e.target.closest('[data-sosmaal]'); if (sm) {
      const m = S.data.sosialeMaal.find(x => x.id === sm.dataset.sosmaal), brukt = m && S.data.sosial.some(x => x.maal.includes(m.id));
      const f = modal(`<h2>${m ? 'Endre sosialt mål' : 'Nytt sosialt mål'}</h2><label for="smT">Målet, formulert som noe elevene gjør</label><input id="smT" name="t" value="${esc(m ? m.tekst : '')}" maxlength="120" required placeholder="F.eks. Vi gir tydelige signaler under løft">
        <label for="smS">Dette ser jeg etter (observerbart)</label><textarea id="smS" name="s" rows="2" maxlength="300">${esc(m ? m.ser : '')}</textarea><p class="err"></p>
        <div class="actions"><button class="btn" type="submit">Lagre</button><button class="btn sec" value="avbryt" formnovalidate>Avbryt</button>${m ? `<button class="btn danger" type="button" id="smSlett">${brukt ? 'Fjern (observasjonene beholdes)' : 'Fjern'}</button>` : ''}</div>`, f => {
        const t = f.elements.t.value.trim(); if (!t) return false;
        if (m) { m.tekst = t; m.ser = f.elements.s.value.trim(); m.forslag = false; } else S.data.sosialeMaal.push({ id: uid(), tekst: t, ser: f.elements.s.value.trim(), forslag: false });
        endret('Sosialt mål: ' + t); tegnSosial();
      });
      if (m) f.querySelector('#smSlett').addEventListener('click', () => { S.data.sosialeMaal = S.data.sosialeMaal.filter(x => x !== m); endret('Fjernet sosialt mål: ' + m.tekst); $('#modal').close(); tegnSosial(); });
    }
  });

  /* ---------- YFF-mål (i Innstillinger) ---------- */
  function yffSeksjon() {
    const l = S.data.yffMaal, brukt = k => aktiveVurd().some(v => v.maal.includes(k));
    return `<section class="card"><h3>YFF – kompetansemål</h3>
      <p class="muted">I yrkesfaglig fordypning henter dere kompetansemål fra læreplanene for programfagene og fra Vg3-læreplanen i lærefaget eleven fordyper seg i. Legg inn de målene dere bruker, ordrett fra udir.no, med læreplankoden som kilde. Du kan også hente et mål fra Bransjeteknikk, TLL eller Bransjelære.</p>
      ${l.length ? `<ul class="egne">${l.map(m => `<li><b>${m.kode}</b> ${esc(m.tekst)} <span class="muted">${esc(m.kilde || '')}</span> ${brukt(m.kode) ? '<span class="muted">(i bruk)</span>' : `<button type="button" class="linkBtn" data-slettyff="${m.kode}">Fjern</button>`}</li>`).join('')}</ul>` : ''}
      <form id="fYff"><label for="yHent">Hent fra programfagene (valgfritt)</label><select id="yHent"><option value="">–</option>${['BT', 'TLL', 'BL'].map(f => `<optgroup label="${FAG[f]}">${MAAL[f].map(([k, t]) => `<option value="${k}">${k} ${esc(t)}</option>`).join('')}</optgroup>`).join('')}</select>
        <label for="yTekst">Kompetansemål (ordrett)</label><textarea id="yTekst" rows="2" maxlength="400" required></textarea>
        <label for="yKilde">Kilde (læreplan, f.eks. LOG03-02 Vg3 logistikkfaget)</label><input id="yKilde" maxlength="80">
        <button class="btn sec" type="submit">Legg til YFF-mål</button><p class="err"></p></form></section>`;
  }
  document.addEventListener('change', e => { if (e.target.id === 'yHent' && e.target.value) { $('#yTekst').value = TEKST[e.target.value]; $('#yKilde').value = 'TOL02-01 ' + FAG[fagAv(e.target.value)] + ' (' + e.target.value + ')'; } });
  document.addEventListener('submit', e => {
    if (e.target.id !== 'fYff') return; e.preventDefault();
    const t = $('#yTekst').value.trim(); if (!t) { e.target.querySelector('.err').textContent = 'Skriv målet.'; return; }
    const nr = Math.max(0, ...S.data.yffMaal.map(m => +m.kode.slice(3))) + 1;
    S.data.yffMaal.push({ kode: 'YFF' + nr, tekst: t, kilde: $('#yKilde').value.trim() }); oppdaterYff(); endret('La til YFF-mål YFF' + nr); tegnFil();
  });
  document.addEventListener('click', e => { const y = S.data && e.target.closest('[data-slettyff]'); if (y) { S.data.yffMaal = S.data.yffMaal.filter(m => m.kode !== y.dataset.slettyff); oppdaterYff(); endret('Fjernet YFF-mål ' + y.dataset.slettyff); tegnFil(); } });

  /* ---------- Start ---------- */
  if (!window.crypto || !crypto.subtle || !window.indexedDB) { $('#lock').innerHTML = '<p class="status bad">Nettleseren støtter ikke kryptering her. Bruk en oppdatert Edge eller Chrome, på https://tllfluenseren.no.</p>'; return; }
  visLaas(); lastKatalog();
})();
