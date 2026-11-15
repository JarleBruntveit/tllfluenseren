/* TLLfluenseren – felles spillmotor
   Brukes av minispillene (/spill/minispill/) og Min TLL-bedrift (/spill/min-tll-bedrift/).
   - Spiller av scenarier fra scenarier.js (valg, dialog og regneoppgaver) med tilbakemelding etter hvert valg.
   - Fører logg over alle valg og gir poeng per vurderingsområde.
   - Lager en elevrapport med kontrollkode som eleven leverer i Teams, og som lærersiden kan lese.
   - Lagrer bare i elevens nettleser. Sender til Azure KUN hvis SPILL_KONFIG.azureUrl er satt (av som standard),
     og da uten navn – bare klassekode og elevkode.
*/
(function () {
  'use strict';
  const VERSJON = '1.0';
  const NIVA = ['Nybegynner', 'Trygg', 'Ekspert'];

  const lager = {
    get(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ingen lagring */ } }
  };

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const kr = n => (Math.round(n)).toLocaleString('nb-NO') + ' kr';
  const tall = (n, d = 0) => Number(n).toLocaleString('nb-NO', { minimumFractionDigits: d, maximumFractionDigits: d });
  const stokk = a => a.map(v => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
  const tilfeldig = (min, max, steg = 1) => Math.round((min + Math.random() * (max - min)) / steg) * steg;

  function niva(p, m) {
    if (!m) return null;
    const r = p / m;
    return r >= 0.8 ? 3 : r >= 0.5 ? 2 : 1;
  }
  function nivaHtml(p, m) {
    const n = niva(p, m);
    return n ? `<span class="sp-niva n${n}">${NIVA[n - 1]}</span>` : '<span class="sp-small">–</span>';
  }
  // Enkel kontrollsum (djb2). Gjør det synlig om rapportteksten er endret – ikke en sikkerhetsmekanisme.
  function hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return h.toString(36).toUpperCase().padStart(6, '0');
  }
  const b64 = s => btoa(unescape(encodeURIComponent(s)));
  const unb64 = s => decodeURIComponent(escape(atob(s)));

  function nyPoeng(omrader) {
    const p = {};
    Object.keys(omrader).forEach(k => { p[k] = { navn: omrader[k], p: 0, m: 0 }; });
    return p;
  }
  function leggTil(poeng, omr, p, m) {
    if (!poeng[omr]) poeng[omr] = { navn: omr, p: 0, m: 0 };
    poeng[omr].p += p; poeng[omr].m += m;
  }

  /* ---------- Elevskjema (navn/klasse) ---------- */
  function elevSkjema(el, opts) {
    const k = window.SPILL_KONFIG || {};
    const lagret = lager.get('tll_spill_elev') || {};
    const azure = !!k.azureUrl;
    el.innerHTML = `
      <label class="sp-label" for="sp-navn">Navn</label>
      <input class="sp-input" id="sp-navn" autocomplete="name" value="${esc(lagret.navn || '')}">
      <label class="sp-label" for="sp-klasse">Klasse</label>
      <input class="sp-input" id="sp-klasse" placeholder="f.eks. 2TLLB" value="${esc(lagret.klasse || '')}">
      ${azure ? `<label class="sp-label" for="sp-elevkode">Elevkode fra læreren (valgfritt)</label>
      <input class="sp-input" id="sp-elevkode" placeholder="f.eks. B07" value="${esc(lagret.elevkode || '')}">
      <p class="sp-small">Med elevkode sendes resultatet til læreren automatisk – uten navnet ditt.</p>` : ''}
      <p class="sp-notice">Svarene dine lagres bare i denne nettleseren. På en delt PC: lever rapporten i Teams før du lukker siden.</p>
      <div class="sp-row"><button class="sp-btn" id="sp-start">${esc(opts.knapp || 'Start')}</button></div>`;
    el.querySelector('#sp-start').onclick = () => {
      const navn = el.querySelector('#sp-navn').value.trim();
      if (!navn) { el.querySelector('#sp-navn').focus(); return; }
      const elev = { navn, klasse: el.querySelector('#sp-klasse').value.trim(), elevkode: azure ? (el.querySelector('#sp-elevkode').value.trim()) : '' };
      lager.set('tll_spill_elev', elev);
      opts.onStart(elev);
    };
  }

  /* ---------- Scenariospiller ---------- */
  // Spiller en runde av et scenario i elementet el. Returnerer et Promise med resultatet.
  function kjorScenario(el, sc, opts = {}) {
    return new Promise(resolve => {
      const antall = opts.antall || sc.antall || (sc.pool ? sc.pool.length : 1);
      const saker = sc.pool ? stokk(sc.pool).slice(0, antall) : [{ tittel: sc.tittel, funn: '', steg: sc.steg }];
      const res = { poeng: nyPoeng(sc.omrader || {}), logg: [], brukt: 0, budsjett: opts.budsjett != null ? opts.budsjett : sc.budsjett };
      let si = 0, ti = 0;

      function hud(sak) {
        const totSteg = saker.reduce((a, s) => a + s.steg.length, 0);
        const ferdig = saker.slice(0, si).reduce((a, s) => a + s.steg.length, 0) + ti;
        return `<div class="sp-hud"><span>${esc(sc.delNavn || 'Sak')} ${si + 1} av ${saker.length}</span>${res.budsjett != null ? `<span${res.budsjett < 5000 ? ' class="lav"' : ''}>Budsjett igjen: ${kr(res.budsjett)}</span>` : ''}</div>
          <div class="sp-bar" aria-hidden="true"><i style="width:${Math.round(ferdig / totSteg * 100)}%"></i></div>
          <div class="sp-steps">${sak.steg.map((s, i) => `<span class="${i < ti ? 'ferdig' : i === ti ? 'na' : ''}">${i + 1}. ${esc(s.kort || stegNavn(s))}</span>`).join('')}</div>`;
      }

      function vis() {
        if (si >= saker.length) return resolve(res);
        const sak = saker[si], st = sak.steg[ti];
        let h = hud(sak);
        h += `<div class="sp-panel"><div class="sp-who">${esc(sak.etikett || sc.delNavn || 'Sak')}</div><h2>${esc(sak.tittel)}</h2>${sak.funn ? `<p>${sak.funn}</p>` : ''}</div>`;
        if (st.type === 'regn') return visRegn(h, sak, st);
        const alt = (st.fast ? st.alternativer : stokk(st.alternativer)).map(a => ({ ...a, ix: st.alternativer.indexOf(a) }));
        h += `<div class="sp-panel">
          ${st.type === 'dialog' ? `<div class="sp-who">${esc(st.hvem || 'Kunden')}</div><div class="sp-bubble">${st.sier}</div><p class="sp-muted">${esc(st.sporsmal || 'Hva svarer du?')}</p>`
            : `<h2>${esc(st.sporsmal)}</h2>${st.hjelp ? `<p class="sp-muted">${st.hjelp}</p>` : ''}`}
          <div class="sp-opts">${alt.map(a => {
            const forDyr = res.budsjett != null && a.kost > res.budsjett;
            return `<button class="sp-opt" data-ix="${a.ix}"${forDyr ? ' disabled aria-disabled="true"' : ''}>${a.kost != null ? `<span class="sp-kost">${kr(a.kost)}</span>` : ''}${a.t}${forDyr ? ' <em class="sp-small">(over budsjett)</em>' : ''}</button>`;
          }).join('')}</div><div id="sp-fb" aria-live="polite"></div></div>`;
        el.innerHTML = h;
        el.querySelectorAll('.sp-opt').forEach(b => b.onclick = () => velg(b, sak, st));
        fokus();
      }

      function velg(b, sak, st) {
        const a = st.alternativer[+b.dataset.ix];
        const maks = Math.max(...st.alternativer.map(x => x.s));
        if (a.kost) { res.budsjett != null && (res.budsjett -= a.kost); res.brukt += a.kost; }
        leggTil(res.poeng, st.omrade, a.s, maks);
        if (st.omrade2) leggTil(res.poeng, st.omrade2, a.s2 != null ? a.s2 : a.s, maks);
        res.logg.push({ spill: sc.id, sak: sak.tittel, steg: st.kort || stegNavn(st), omrade: st.omrade, valg: strip(a.t) + (a.kost ? ` (${kr(a.kost)})` : ''), p: a.s, m: maks });
        el.querySelectorAll('.sp-opt').forEach(x => { x.disabled = true; if (x !== b) x.classList.add('bes'); });
        b.classList.add('valgt');
        const kl = a.s >= maks ? 'g' : a.s > 0 ? 'm' : 'b';
        const tittel = a.s >= maks ? 'Godt valg.' : a.s > 0 ? 'Delvis riktig.' : 'Ikke et godt valg.';
        visFb(kl, `<strong>${tittel}</strong>${st.type === 'dialog' && st.hvem ? `<span class="sp-who">${esc(st.hvem)}</span> ` : ''}${a.fb}`
          + (a.kost ? `<br><span class="sp-small">Kostnad: ${kr(a.kost)}${res.budsjett != null ? ` · igjen: ${kr(res.budsjett)}` : ''}</span>` : '')
          + (a.s < maks && st.vis_beste !== false ? `<br><span class="sp-small">Beste valg: ${strip(st.alternativer.find(x => x.s === maks).t)}</span>` : ''));
      }

      function visRegn(h, sak, st) {
        const o = st._oppg || (st._oppg = st.lag());
        h += `<div class="sp-panel"><h2>${esc(st.sporsmal || 'Regn ut')}</h2><div>${o.tekst}</div>
          <label class="sp-label" for="sp-svar">Svar${o.enhet ? ' (' + esc(o.enhet) + ')' : ''}</label>
          <input class="sp-input" id="sp-svar" inputmode="decimal" autocomplete="off" style="max-width:260px">
          <div class="sp-row"><button class="sp-btn" id="sp-sjekk">Sjekk svaret</button></div><div id="sp-fb" aria-live="polite"></div></div>`;
        el.innerHTML = h;
        const inp = el.querySelector('#sp-svar');
        const sjekk = () => {
          const v = parseFloat(inp.value.replace(/\s/g, '').replace(',', '.'));
          if (isNaN(v)) { inp.focus(); return; }
          const avvik = Math.abs(v - o.svar);
          const p = avvik <= o.tol ? 3 : avvik <= Math.abs(o.svar) * 0.1 ? 1 : 0;
          leggTil(res.poeng, st.omrade, p, 3);
          res.logg.push({ spill: sc.id, sak: sak.tittel, steg: st.kort || 'Beregning', omrade: st.omrade, valg: `svarte ${tall(v, 2)} (riktig ${tall(o.svar, 2)})`, p, m: 3 });
          inp.disabled = true; el.querySelector('#sp-sjekk').disabled = true;
          visFb(p === 3 ? 'g' : p ? 'm' : 'b', `<strong>${p === 3 ? 'Riktig!' : p ? 'Nesten.' : 'Ikke riktig.'}</strong>${o.forklaring}`);
        };
        el.querySelector('#sp-sjekk').onclick = sjekk;
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') sjekk(); });
        inp.focus();
      }

      function visFb(kl, html) {
        const fb = el.querySelector('#sp-fb');
        fb.innerHTML = `<div class="sp-fb ${kl}">${html}</div><div class="sp-row"><button class="sp-btn" id="sp-videre">Videre</button></div>`;
        const v = fb.querySelector('#sp-videre');
        v.onclick = () => {
          ti++;
          if (ti >= saker[si].steg.length) { ti = 0; si++; }
          opts.onSteg && opts.onSteg(res);
          vis();
          if (!opts.innebygd) window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        };
        v.focus({ preventScroll: true });
      }
      function fokus() { const h = el.querySelector('h2'); if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); } }
      vis();
    });
  }
  const stegNavn = s => s.type === 'dialog' ? 'Samtale' : s.type === 'regn' ? 'Beregning' : 'Valg';
  const strip = s => String(s).replace(/<[^>]*>/g, '');

  /* ---------- Refleksjon ---------- */
  function refleksjon(el, sporsmal, onFerdig) {
    el.innerHTML = `<div class="sp-panel"><div class="sp-chips"><span class="sp-chip fase">Tenk</span></div><h2>Refleksjon</h2>
      <p>${sporsmal}</p><label class="sp-label" for="sp-ref">Skriv 3–5 setninger</label><textarea class="sp-input" id="sp-ref"></textarea>
      <div class="sp-row"><button class="sp-btn" id="sp-ref-ok">Se rapporten</button></div></div>`;
    const t = el.querySelector('#sp-ref'); t.focus();
    el.querySelector('#sp-ref-ok').onclick = () => onFerdig(t.value.trim());
  }

  /* ---------- Rapport ---------- */
  function lagRapport(r) {
    const omr = Object.entries(r.poeng).filter(([, v]) => v.m > 0);
    const tot = omr.reduce((a, [, v]) => a + v.p, 0), maks = omr.reduce((a, [, v]) => a + v.m, 0);
    const data = {
      v: VERSJON, spill: r.spillId, tittel: r.tittel, navn: r.elev.navn, klasse: r.elev.klasse || '', elevkode: r.elev.elevkode || '',
      start: r.start, slutt: new Date().toISOString(),
      omr: omr.map(([k, v]) => ({ k, n: v.navn, p: v.p, m: v.m })), tot, maks,
      ekstra: r.ekstra || [], refleksjon: r.refleksjon || '',
      logg: r.logg.map(l => [l.sak, l.steg, l.omrade, l.p, l.m, l.valg])
    };
    const json = JSON.stringify(data);
    const kode = hash(json);
    let t = `TLLfluenseren – ${r.tittel}\nElev: ${data.navn}   Klasse: ${data.klasse || '-'}\n`;
    t += `Spilt: ${new Date(data.start).toLocaleString('nb-NO')} – ${new Date(data.slutt).toLocaleTimeString('nb-NO')}\n\nRESULTAT PER OMRÅDE\n`;
    omr.forEach(([, v]) => { t += `- ${v.navn}: ${v.p}/${v.m} (${NIVA[niva(v.p, v.m) - 1]})\n`; });
    t += `Totalt: ${tot}/${maks}\n`;
    if (data.ekstra.length) t += '\n' + data.ekstra.join('\n') + '\n';
    t += '\nVALG\n';
    r.logg.forEach(l => { t += `[${l.sak} – ${l.steg}] ${l.p}/${l.m}: ${l.valg}\n`; });
    t += `\nREFLEKSJON\n${data.refleksjon || '(ikke besvart)'}\n\nKontrollkode: ${kode}\nDATA:${b64(json)}`;
    return { tekst: t, data, kode };
  }

  function visRapport(el, rap, opts = {}) {
    const d = rap.data;
    el.innerHTML = `<h1>Rapport</h1>
      <div class="sp-panel"><h2>${esc(d.tittel)}</h2>
        <table class="sp-table"><thead><tr><th>Område</th><th class="num">Poeng</th><th>Nivå</th></tr></thead><tbody>
        ${d.omr.map(o => `<tr><td>${esc(o.n)}</td><td class="num">${o.p}/${o.m}</td><td>${nivaHtml(o.p, o.m)}</td></tr>`).join('')}
        </tbody></table>
        ${d.ekstra.length ? `<p class="sp-small" style="margin-top:12px">${d.ekstra.map(esc).join('<br>')}</p>` : ''}
      </div>
      <div class="sp-panel"><h2>Lever i Teams</h2>
        <p>Trykk <b>Kopier rapport</b> og lim teksten inn i innleveringen i Teams. Ikke endre teksten – da stemmer ikke kontrollkoden.</p>
        <div class="sp-report" id="sp-rap" tabindex="0"></div>
        <div class="sp-row"><button class="sp-btn" id="sp-kopier">Kopier rapport</button>${opts.nyKnapp ? `<button class="sp-btn ghost" id="sp-ny">${esc(opts.nyKnapp)}</button>` : ''}${opts.tilbake ? `<a class="sp-btn ghost" href="${esc(opts.tilbake)}">Til spilloversikten</a>` : ''}</div>
        <p class="sp-small" id="sp-kmsg" aria-live="polite"></p><div id="sp-azure" class="sp-small"></div>
      </div>`;
    el.querySelector('#sp-rap').textContent = rap.tekst;
    el.querySelector('#sp-kopier').onclick = async () => {
      const msg = el.querySelector('#sp-kmsg');
      try { await navigator.clipboard.writeText(rap.tekst); msg.textContent = 'Kopiert! Lim inn i Teams.'; }
      catch (e) {
        const r = document.createRange(); r.selectNodeContents(el.querySelector('#sp-rap'));
        const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        msg.textContent = 'Teksten er markert. Trykk Ctrl+C (Cmd+C på Mac) for å kopiere.';
      }
    };
    if (opts.nyKnapp) el.querySelector('#sp-ny').onclick = opts.onNy;
    sendAzure(d, el.querySelector('#sp-azure'));
    window.scrollTo(0, 0);
  }

  /* ---------- Valgfri sending til Azure (av som standard) ---------- */
  async function sendAzure(d, statusEl) {
    const k = window.SPILL_KONFIG || {};
    if (!k.azureUrl || !d.elevkode || !d.klasse) return;
    // Navn og fritekst sendes aldri. Bare klasse, elevkode, spill og poeng.
    const payload = { v: d.v, spill: d.spill, tittel: d.tittel, klasse: d.klasse.toUpperCase(), elevkode: d.elevkode.toUpperCase(), slutt: d.slutt, omr: d.omr, tot: d.tot, maks: d.maks };
    try {
      const r = await fetch(k.azureUrl.replace(/\/$/, '') + '/api/resultat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (statusEl) statusEl.textContent = r.ok ? 'Resultatet er også sendt til læreren (uten navn).' : 'Kunne ikke sende til læreren nå – lever rapporten i Teams.';
    } catch (e) { if (statusEl) statusEl.textContent = 'Kunne ikke sende til læreren nå – lever rapporten i Teams.'; }
  }

  /* ---------- Les rapport (brukes av lærersiden) ---------- */
  function lesRapporter(tekst) {
    const ut = [];
    const re = /Kontrollkode:\s*([0-9A-Z]+)\s*DATA:([A-Za-z0-9+/=]+)/g;
    let m;
    while ((m = re.exec(tekst))) {
      try {
        const json = unb64(m[2]); const d = JSON.parse(json);
        d._ok = hash(json) === m[1]; ut.push(d);
      } catch (e) { ut.push({ _feil: true }); }
    }
    return ut;
  }

  window.Spill = { VERSJON, NIVA, lager, esc, kr, tall, stokk, tilfeldig, niva, nivaHtml, hash, nyPoeng, leggTil, elevSkjema, kjorScenario, refleksjon, lagRapport, visRapport, lesRapporter };
})();
