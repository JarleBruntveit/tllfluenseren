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
  const FAG = { BT: 'Bransjeteknikk', TLL: 'Transport, logistikk og løfteoperasjoner', BL: 'Bransjelære' };
  const TEKST = {}; Object.values(MAAL).flat().forEach(([k, t]) => { TEKST[k] = t; });
  const fagAv = kode => kode.replace(/\d+$/, '');
  const DOKTYPER = ['Praktisk – observasjon', 'Praktisk – video eller bilder', 'Skriftlig innlevering', 'Muntlig – fagsamtale eller presentasjon', 'Prøve', 'Rapport fra TLLfluenseren', 'Tverrfaglig oppdrag', 'Elevens egenvurdering', 'Annet'];
  const EGENVURD = 'Elevens egenvurdering';
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
  const nyData = () => ({ format: 'tll-kmr-data', versjon: 1, opprettet: naa(), elever: [], vurderinger: [], terminer: [], egneOppgaver: [], logg: [] });
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
    S.key = r.key; S.salt = r.salt; S.data = Object.assign(nyData(), r.data); S.ulagret = false; S.filStatus = ''; S.nyereFil = false; S.aar = skolear(idag());
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
  const FANER = [['registrer', 'Registrer vurdering'], ['elevkort', 'Elevkort'], ['oversikt', 'Klasseoversikt'], ['elever', 'Elever'], ['fil', 'Fil og sikkerhet']];
  function tegn() {
    const A = $('#app');
    A.innerHTML = `<div class="bar"><nav class="tabs" aria-label="Deler av registeret">${FANER.map(([k, t]) => `<button type="button" data-fane="${k}" ${S.fane === k ? 'aria-current="page"' : ''}>${t}</button>`).join('')}</nav>
      <div class="barRight"><span id="lagreStatus" class="status" role="status" aria-live="polite"></span><button type="button" class="btn sec small" id="bLagre">Lagre nå</button><button type="button" class="btn sec small" id="bLaas">Lås</button></div></div>
      ${S.nyereFil ? '<p class="status warn">Filen i OneDrive er nyere enn kopien i denne nettleseren (endret på en annen PC). Lås og åpne filen for å få med de nyeste endringene.</p>' : ''}
      <div id="view"></div>`;
    visStatus();
    ({ registrer: tegnRegistrer, elevkort: tegnElevkort, oversikt: tegnOversikt, elever: tegnElever, fil: tegnFil })[S.fane]();
  }
  document.addEventListener('click', e => {
    const f = e.target.closest('[data-fane]'); if (f) { S.fane = f.dataset.fane; if (f.dataset.elev) S.elev = f.dataset.elev; tegn(); scrollTo(0, 0); return; }
    if (e.target.closest('#bLaas')) laas();
    if (e.target.closest('#bLagre')) { if (!S.fil && kanVelgeFil) kobleFil(); else if (!S.fil) lastNedKopi(); else lagre(true); }
  });

  const maalVelger = (valgt, navn) => Object.keys(MAAL).map(f => `<fieldset class="maalSet"><legend>${FAG[f]}</legend>${MAAL[f].map(([k, t]) => `<label class="chk" title="${esc(t)}"><input type="checkbox" name="${navn}" value="${k}" ${valgt.includes(k) ? 'checked' : ''}> <b>${k}</b> <span>${esc(t)}</span></label>`).join('')}</fieldset>`).join('');
  const karSel = (navn, verdi) => `<select name="${navn}" aria-label="Karakter"><option value="">–</option>${[1, 2, 3, 4, 5, 6].map(n => `<option ${+verdi === n ? 'selected' : ''}>${n}</option>`).join('')}</select>`;
  const tendSel = (navn, verdi) => `<select name="${navn}" aria-label="Tendens"><option value="" ${!verdi ? 'selected' : ''}></option><option value="+" ${verdi === '+' ? 'selected' : ''}>+</option><option value="−" ${verdi === '−' ? 'selected' : ''}>−</option></select>`;
  const statSel = (navn, verdi) => `<select name="${navn}" aria-label="Status"><option value="vurdert" ${verdi === 'vurdert' ? 'selected' : ''}>Vurdert</option><option value="ikke-levert" ${verdi === 'ikke-levert' ? 'selected' : ''}>Ikke levert</option><option value="fravaer" ${verdi === 'fravaer' ? 'selected' : ''}>Fravær</option></select>`;

  /* ---------- Registrer ---------- */
  let reg = { oppgave: '', tittel: '', maal: [], dato: '', type: DOKTYPER[0], url: '' };
  function tegnRegistrer() {
    const V = $('#view'), elever = S.data.elever.filter(e => e.aktiv);
    if (!reg.dato) reg.dato = idag();
    const grupper = {}; alleOppgaver().forEach(o => (grupper[o.gruppe] = grupper[o.gruppe] || []).push(o));
    V.innerHTML = `<h2>Registrer vurdering</h2>
      <p class="muted">Velg oppgaven, så fylles kompetansemålene inn. Fyll bare ut radene for elevene du vurderer – tomme rader hoppes over. Faglig tilbakemelding og fremovermelding gir du eleven i Teams. Karakteren er ditt eget vurderingsgrunnlag.</p>
      ${S.katalogFeil ? `<p class="status warn">${esc(S.katalogFeil)} Du kan fortsatt skrive inn oppgaven selv.</p>` : ''}
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
      const tit = tittel; reg = { oppgave: '', tittel: '', maal: [], dato: reg.dato, type: reg.type, url: '' };
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
      <div class="${S.inkKar ? '' : 'utenKar'}">${Object.keys(MAAL).map(f => fagKort(e, f)).join('')}
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
      <div class="ekHead"><div><label for="oFag">Fag</label><select id="oFag">${Object.keys(FAG).map(f => `<option value="${f}" ${f === S.fag ? 'selected' : ''}>${FAG[f]}</option>`).join('')}</select></div>
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
        S.data.vurderinger = S.data.vurderinger.filter(v => v.elev !== el.id); S.data.terminer = S.data.terminer.filter(t => t.elev !== el.id); S.data.elever = S.data.elever.filter(x => x !== el);
        S.data.logg.forEach(l => { l.hva = l.hva.split(el.navn).join('(slettet elev)'); });
        endret('Slettet en elev permanent'); tegnElever();
      });
    }
  });

  /* ---------- Fil og sikkerhet ---------- */
  function tegnFil() {
    const V = $('#view');
    V.innerHTML = `<h2>Fil og sikkerhet</h2>
      <section class="card"><h3>Hvor dataene ligger</h3>
        <p>Registeret er kryptert med passordet ditt og ligger <b>bare</b> i filen du velger og som kopi i denne nettleseren. Ingenting sendes til TLLfluenseren eller GitHub. Uten passordet kan ingen lese filen – heller ikke du.</p>
        <p>${S.fil ? `Koblet til filen <b>${esc(S.fil.name)}</b>. Endringer lagres automatisk.` : 'Ikke koblet til noen fil ennå.'}</p>
        <div class="actions">${kanVelgeFil ? `<button type="button" class="btn" id="fKoble">${S.fil ? 'Lagre som ny fil …' : 'Koble til fil i OneDrive …'}</button>` : '<p class="status warn">Denne nettleseren kan ikke lagre direkte til en fil. Bruk Edge eller Chrome, eller last ned en kopi etter hver økt.</p>'}<button type="button" class="btn sec" id="fNed">Last ned kryptert kopi</button></div>
        <p class="muted">Tips: Lagre filen i skolens OneDrive. Da har du sikkerhetskopi og kan åpne registeret på en annen PC med «Åpne en registerfil». Lås registeret når du går fra PC-en; det låses også selv etter ${LAAS_ETTER_MIN} minutter.</p></section>
      <section class="card"><h3>Eksport</h3><p class="muted">CSV-filen er <b>ikke</b> kryptert. Lagre den bare på godkjent sted og slett den når du er ferdig.</p><div class="actions"><button type="button" class="btn sec" id="fCsv">Eksporter vurderinger (CSV)</button></div></section>
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
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + rader.map(r => r.map(q).join(';')).join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    a.download = `vurderinger-${idag()}.csv`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); logg('Eksporterte vurderinger til CSV');
  }

  /* ---------- Start ---------- */
  if (!window.crypto || !crypto.subtle || !window.indexedDB) { $('#lock').innerHTML = '<p class="status bad">Nettleseren støtter ikke kryptering her. Bruk en oppdatert Edge eller Chrome, på https://tllfluenseren.no.</p>'; return; }
  visLaas(); lastKatalog();
})();
