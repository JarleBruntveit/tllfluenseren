/* Lærerside: leser elevrapporter lokalt og viser klasseoversikt. Ingenting lagres eller sendes. */
(function(){
'use strict';
const TLL = window.TLL, M = TLL.motor, esc = M.esc;
const $ = s => document.querySelector(s);
const elever = new Map();          // nøkkel: navn|klasse → { data, endret, n }
let valgtKap = TLL.KAPITLER[0] && TLL.KAPITLER[0].id;

TLL.lastKapitler('../').then(() => {
  $('#kapsel').innerHTML = TLL.KAPITLER.map(k => `<option value="${k.id}">Kap ${k.nr} · ${esc(k.tittel)}</option>`).join('');
  $('#kapsel').onchange = () => { valgtKap = $('#kapsel').value; tegn(); };
  $('#pkap').innerHTML = TLL.KAPITLER.map(k => `<label><input type="checkbox" value="${k.id}" checked><span>Kap ${k.nr} · ${esc(k.tittel)}</span></label>`).join('');
});

/* ---------- innlesing ---------- */
function leggTil(liste){
  let ok = 0, feil = 0, endret = 0;
  liste.forEach(r => {
    if (r.feil){ feil++; return; }
    const d = r.data, key = (d.navn || '?').toLowerCase() + '|' + (d.klasse || '').toLowerCase();
    const old = elever.get(key);
    if (!old || old.data.laget < d.laget) elever.set(key, { data: d, endret: r.endret, n: (old ? old.n : 0) + 1 });
    else old.n++;
    ok++; if (r.endret) endret++;
  });
  $('#readmsg').innerHTML = `<div class="fb ${feil ? 'bad' : ''}" style="margin-top:12px">${ok} rapport${ok===1?'':'er'} lest inn${feil ? `, ${feil} kunne ikke leses` : ''}.${endret ? ` <span class="warn-badge">${endret} rapport${endret===1?'':'er'} ser ut til å være endret etter at de ble laget.</span>` : ''} Har en elev levert flere ganger, vises den nyeste.</div>`;
  tegn();
}
function lesFiler(files){
  Promise.all([...files].map(f => f.text().then(t => TLL.lesRapporter(t)).catch(() => [{ feil: 'fil' }])))
    .then(res => leggTil(res.flat()));
}
const drop = $('#drop');
['dragenter','dragover'].forEach(e => drop.addEventListener(e, ev => { ev.preventDefault(); drop.classList.add('on'); }));
['dragleave','drop'].forEach(e => drop.addEventListener(e, ev => { ev.preventDefault(); drop.classList.remove('on'); }));
drop.addEventListener('drop', ev => lesFiler(ev.dataTransfer.files));
$('#files').onchange = e => { lesFiler(e.target.files); e.target.value = ''; };
$('#readcodes').onclick = () => { leggTil(TLL.lesRapporter($('#codes').value)); $('#codes').value = ''; };
$('#clear').onclick = () => { elever.clear(); $('#detail').innerHTML = ''; $('#readmsg').innerHTML = ''; tegn(); };

/* ---------- beregning ---------- */
const kl = p => p == null ? 'c0' : p >= 80 ? 'c3' : p >= 50 ? 'c2' : 'c1';
function temaStat(kapData, t){
  const res = (kapData && kapData.resultater) || {};
  const acts = t.aktiviteter.filter(a => a.type !== 'voks' && a.type !== 'flash');
  const gjort = acts.filter(a => res[a.id]);
  const snitt = gjort.length ? Math.round(gjort.reduce((s,a) => s + res[a.id].best, 0) / gjort.length) : null;
  const ekstra = t.aktiviteter.filter(a => (a.type === 'voks' || a.type === 'flash') && res[a.id]).length;
  return { gjort: gjort.length, total: acts.length, snitt, ekstra };
}
function proverFor(d, kapId){ return (d.prover || []).filter(p => (p.kap || []).includes(kapId)); }
function sortert(){ return [...elever.values()].sort((a,b) => (a.data.klasse + a.data.navn).localeCompare(b.data.klasse + b.data.navn, 'nb')); }

/* ---------- tegning ---------- */
function tegn(){
  $('#overview').hidden = elever.size === 0;
  const K = TLL.kapitler[valgtKap]; if (!K || !elever.size) return;
  const rows = sortert().map((e,i) => {
    const d = e.data, kd = d.kapitler[valgtKap];
    const st = K.temaer.map(t => temaStat(kd, t));
    const tot = st.reduce((s,x) => ({ g: s.g + x.gjort, n: s.n + x.total }), { g: 0, n: 0 });
    const alle = st.filter(x => x.snitt != null);
    const snitt = alle.length ? Math.round(alle.reduce((s,x) => s + x.snitt * x.gjort, 0) / alle.reduce((s,x) => s + x.gjort, 0)) : null;
    const pr = proverFor(d, valgtKap), best = pr.length ? Math.max(...pr.map(p => p.pct)) : null;
    const tekster = kd ? Object.keys(kd.tekster || {}).length : 0;
    return `<tr class="click" data-i="${i}">
      <td><b>${esc(d.navn)}</b>${e.endret ? ' <span class="warn-badge" title="Rapporten er endret etter at den ble laget">⚠</span>' : ''}</td><td>${esc(d.klasse)}</td><td>${d.laget.slice(0,10)}</td>
      ${st.map(x => `<td><span class="cell ${kl(x.snitt)}" title="${x.gjort} av ${x.total} gjort">${x.gjort}/${x.total}${x.snitt != null ? ' · ' + x.snitt + '%' : ''}</span></td>`).join('')}
      <td><span class="cell ${kl(snitt)}">${tot.g}/${tot.n}${snitt != null ? ' · ' + snitt + '%' : ''}</span></td>
      <td>${best != null ? `<span class="cell ${kl(best)}">${best}%</span> <span class="muted small">(${pr.length})</span>` : '–'}</td>
      <td>${tekster || '–'}</td></tr>`;
  });
  $('#tab').innerHTML = `<thead><tr><th>Elev</th><th>Klasse</th><th>Levert</th>${K.temaer.map(t => `<th title="${esc(t.tittel)}">${t.lok}</th>`).join('')}<th>Totalt</th><th>Prøver</th><th>Tekster</th></tr></thead><tbody>${rows.join('')}</tbody>`;
  const list = sortert();
  $('#tab').querySelectorAll('tr.click').forEach(tr => tr.onclick = () => detalj(list[+tr.dataset.i]));
  $('#tab').insertAdjacentHTML('beforeend', `<tfoot><tr><td colspan="${K.temaer.length + 6}" class="small muted">${K.temaer.map(t => `${t.lok} = ${esc(t.tittel)}`).join(' · ')}</td></tr></tfoot>`);
}
function detalj(e){
  const K = TLL.kapitler[valgtKap], d = e.data, kd = d.kapitler[valgtKap] || { resultater: {}, tekster: {} };
  const res = kd.resultater || {}, tek = kd.tekster || {};
  const dato = s => s ? new Date(s).toLocaleDateString('nb-NO', { day: '2-digit', month: '2-digit' }) : '';
  const pr = proverFor(d, valgtKap);
  $('#detail').innerHTML = `<div class="panel" style="margin-top:16px">
    <div class="row"><h3 style="font-size:24px">${esc(d.navn)} <span class="muted" style="font-size:16px">${esc(d.klasse)} · levert ${d.laget.slice(0,10)}${e.n > 1 ? ` · ${e.n} rapporter lest inn` : ''}</span></h3><span class="spacer"></span><button class="btn ghost" id="lukk">Lukk</button></div>
    ${e.endret ? '<div class="fb bad" style="margin:8px 0">Kontrollsummen stemmer ikke. Rapporten kan være redigert etter at den ble laget.</div>' : ''}
    ${pr.length ? `<h4 style="margin:12px 0 4px">Prøver</h4><ul class="small">${pr.map(p => `<li>${dato(p.dato)} · ${esc(p.navn || 'Prøve')} · ${M.NIVA[p.niva || 0]} · <b>${p.riktige}/${p.antall} (${p.pct} %)</b></li>`).join('')}</ul>` : ''}
    ${K.temaer.map(t => {
      const s = temaStat(kd, t);
      return `<h4 style="margin:16px 0 6px">${t.lok} · ${esc(t.tittel)} <span class="cell ${kl(s.snitt)}" style="font-size:12px">${s.gjort}/${s.total}${s.snitt != null ? ' · ' + s.snitt + '%' : ''}</span></h4>
      <div class="ltab-wrap"><table class="ltab"><thead><tr><th>Fase</th><th>Aktivitet</th><th>Nivå</th><th>Beste</th><th>Siste</th><th>Forsøk</th><th>Sist gjort</th></tr></thead><tbody>
      ${t.aktiviteter.map(a => { const r = res[a.id];
        return `<tr><td>${M.faseNavn(M.faseAv(a))}</td><td>${esc(a.tittel)} <span class="muted small">(${M.TYPE[a.type]})</span></td><td>${a.nivaa ? M.NIVA_KORT[a.nivaa] : 'Alle'}</td>
        <td>${r ? `<span class="cell ${kl(r.best)}">${r.best}%</span>` : '<span class="muted">–</span>'}</td><td>${r ? r.sist + '%' : ''}</td><td>${r ? r.n : ''}</td><td>${r ? dato(r.siste) : ''}</td></tr>`; }).join('')}
      </tbody></table></div>
      ${t.aktiviteter.filter(a => tek[a.id]).map(a => `<div class="small" style="margin-top:8px"><b>${esc(a.tittel)}</b>${a.q ? ` – <span class="muted">${esc(a.q)}</span>` : ''}</div><div class="textview">${esc(tek[a.id])}</div>`).join('')}`;
    }).join('')}
  </div>`;
  $('#lukk').onclick = () => { $('#detail').innerHTML = ''; };
  $('#detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ---------- regneark (CSV for Excel) ---------- */
$('#csv').onclick = () => {
  const K = TLL.kapitler[valgtKap]; if (!K) return;
  const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const head = ['Elev','Klasse','Levert'].concat(K.temaer.map(t => `${t.lok} ${t.tittel} – gjort`), K.temaer.map(t => `${t.lok} – snitt %`), ['Beste prøve %','Antall prøver','Rapport endret']);
  const lines = [head.map(q).join(';')];
  sortert().forEach(e => {
    const d = e.data, kd = d.kapitler[valgtKap], st = K.temaer.map(t => temaStat(kd, t)), pr = proverFor(d, valgtKap);
    lines.push([d.navn, d.klasse, d.laget.slice(0,10)].concat(st.map(x => `${x.gjort}/${x.total}`), st.map(x => x.snitt == null ? '' : x.snitt),
      [pr.length ? Math.max(...pr.map(p => p.pct)) : '', pr.length, e.endret ? 'JA' : '']).map(q).join(';'));
  });
  const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `elevfremdrift-${valgtKap}-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
};

/* ---------- prøvelenke ---------- */
$('#plag').onclick = () => {
  const kap = [...document.querySelectorAll('#pkap input:checked')].map(x => x.value);
  if (!kap.length){ $('#plink').innerHTML = '<div class="fb bad" style="margin-top:10px">Velg minst ett kapittel.</div>'; return; }
  const seed = 1 + Math.floor(Math.random() * 999999);
  const u = new URL('../prove/', location.href);
  u.searchParams.set('kap', kap.join(',')); u.searchParams.set('niva', $('#pniva').value); u.searchParams.set('antall', $('#pant').value); u.searchParams.set('seed', seed);
  const navn = $('#pnavn').value.trim(); if (navn) u.searchParams.set('navn', navn);
  $('#plink').innerHTML = `<p class="small" style="margin-top:12px">Del denne lenken med klassen i Teams. Alle får de samme spørsmålene.</p>
    <textarea class="codebox" id="pl" readonly style="min-height:60px">${esc(u.href)}</textarea>
    <div class="row"><button class="btn ghost" id="pcp">Kopier lenken</button><a class="btn ghost" href="${esc(u.href)}" target="_blank" rel="noopener">Prøv selv</a></div>`;
  $('#pcp').onclick = () => { const t = $('#pl'); t.select(); try { navigator.clipboard.writeText(t.value); } catch(e){ document.execCommand('copy'); } $('#pcp').textContent = 'Kopiert ✓'; };
};
})();
