/* Vurdering av skjæredata i INT-lærerrommet. Koden er åpen; innholdet (HTML) er kryptert i innhold.enc.js.
   Startes når rommet er åpnet (hendelsen «gjesterom:apnet»). */
import { lesRapporter, NIVAER, KATEGORIER, FEILTYPER } from '/gjestefag/int/skjaeredata/rapport.js';

function init() {
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const elever = new Map(); // nøkkel: navn|klasse → siste rapport
let sortKey = 'navn', sortDir = 1;

function nivaNaadd(r) { let n = 0; NIVAER.forEach((l, i) => { if (r.nivaer?.[l.id]?.bestatt) n = i + 1; }); return n; }
const nivaNavn = n => n ? NIVAER[n - 1].navn : 'Ikke bestått';
function legg(resultat) {
  let ok = 0, feil = 0;
  for (const x of resultat) {
    if (x.feil) { feil++; continue; }
    const r = x.data, k = (r.navn || 'Uten navn').toLowerCase() + '|' + (r.klasse || '').toLowerCase();
    const gml = elever.get(k);
    if (!gml || gml.data.laget < r.laget) elever.set(k, x);
    ok++;
  }
  return { ok, feil };
}
async function lesFiler(files) {
  let ok = 0, feil = 0, navn = [];
  for (const f of files) {
    const buf = await f.arrayBuffer();
    const tekst = new TextDecoder('latin1').decode(buf);
    const res = lesRapporter(tekst, f.name);
    const r = legg(res); ok += r.ok; feil += r.feil;
    res.filter(x => x.feil).forEach(x => navn.push(`${esc(f.name)}: ${esc(x.feil)}`));
  }
  $('melding').innerHTML = `${ok} rapport(er) lest inn.` + (feil ? ` <span class="feil">${feil} feil:</span> ${navn.join('; ')}` : '');
  tegn();
}
$('filer').addEventListener('change', e => lesFiler(e.target.files));
const drop = $('drop');
['dragenter', 'dragover'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add('over'); }));
['dragleave', 'drop'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove('over'); }));
drop.addEventListener('drop', e => lesFiler(e.dataTransfer.files));
$('lesKoder').addEventListener('click', () => { const r = legg(lesRapporter($('koder').value)); $('melding').textContent = `${r.ok} rapport(er) lest inn${r.feil ? `, ${r.feil} kunne ikke leses` : ''}.`; tegn(); });
$('tom').addEventListener('click', () => { elever.clear(); $('koder').value = ''; $('filer').value = ''; $('melding').textContent = 'Oversikten er tømt.'; tegn(); });

function rader() {
  return [...elever.values()].map(x => {
    const r = x.data, ni = r.nivaer || {};
    const feil = Object.entries(r.feil || {}).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
    return { x, r, navn: r.navn || 'Uten navn', klasse: r.klasse || '', niva: nivaNaadd(r), nyb: ni.nybegynner?.best ?? -1, trygg: ni.trygg?.best ?? -1, eksp: ni.ekspert?.best ?? -1,
      forutsi: r.forutsi?.riktig ?? 0, hint: r.hint || 0, feil };
  });
}
const celle = v => v?.forsok ? `<span class="chip ${v.bestatt ? 'b' : 'p'}">${v.best} %</span><br><span class="liten">${v.forsok} forsøk</span>` : '<span class="chip x">–</span>';

function tegn() {
  const rr = rader();
  $('oversikt').hidden = !rr.length;
  if (!rr.length) return;
  rr.sort((a, b) => { const A = a[sortKey], B = b[sortKey]; return (typeof A === 'string' ? A.localeCompare(B, 'nb') : A - B) * sortDir; });
  $('tabell').querySelector('tbody').innerHTML = rr.map(e => `<tr>
    <td><b>${esc(e.navn)}</b><br><span class="liten">${new Date(e.r.laget).toLocaleDateString('nb-NO')}</span></td><td>${esc(e.klasse)}</td><td>${nivaNavn(e.niva)}</td>
    <td>${celle(e.r.nivaer?.nybegynner)}</td><td>${celle(e.r.nivaer?.trygg)}</td><td>${celle(e.r.nivaer?.ekspert)}</td>
    <td>${e.forutsi} / ${e.r.forutsi?.antall || 8}</td><td>${e.hint}</td>
    <td>${e.feil.slice(0, 2).map(([k, n]) => `${esc(FEILTYPER[k]?.navn || k)} (${n})`).join('<br>') || '–'}</td>
    <td>${e.x.endret ? '<span class="feil" title="Rapporten er endret etter at den ble laget">⚠ endret</span>' : '<span class="ok">✓</span>'}</td></tr>`).join('');
  // sammendrag
  const fordeling = [0, 0, 0, 0]; rr.forEach(e => fordeling[e.niva]++);
  $('sum').innerHTML = `<div>Elever<b>${rr.length}</b></div>` + NIVAER.map((l, i) => `<div>${l.navn} bestått<b>${rr.filter(e => e.niva >= i + 1).length}</b></div>`).join('');
  // områder
  const omr = {};
  rr.forEach(e => Object.entries(e.r.kategorier || {}).forEach(([k, v]) => { const o = (omr[k] ||= { r: 0, t: 0 }); o.r += v.riktig || 0; o.t += v.totalt || 0; }));
  $('omrader').innerHTML = Object.entries(KATEGORIER).filter(([k]) => omr[k]?.t).map(([k, navn]) => { const p = Math.round(omr[k].r / omr[k].t * 100); return `<div><span>${navn}</span><i style="width:${p}%"></i><b>${p} %</b></div>`; }).join('') || '<p class="liten">Ingen oppgaver besvart ennå.</p>';
  // feil
  const sumFeil = {}; rr.forEach(e => e.feil.forEach(([k, n]) => sumFeil[k] = (sumFeil[k] || 0) + n));
  const fl = Object.entries(sumFeil).sort((a, b) => b[1] - a[1]), maks = fl[0]?.[1] || 1;
  $('feilbars').innerHTML = fl.map(([k, n]) => `<div><span>${esc(FEILTYPER[k]?.navn || k)}</span><i class="org" style="width:${n / maks * 100}%"></i><b>${n}</b></div>`).join('') || '<p class="liten">Ingen registrerte feil.</p>';
  $('tiltak').innerHTML = fl.length ? `<ul>${fl.slice(0, 3).map(([k]) => `<li><b>${esc(FEILTYPER[k]?.navn || k)}:</b> ${esc(FEILTYPER[k]?.tiltak || '')}</li>`).join('')}</ul>` : '';
  // detaljer
  $('detaljer').innerHTML = rr.map(e => {
    const ref = Object.entries(e.r.refleksjon || {}).filter(([, t]) => t && t.trim());
    const kat = Object.entries(e.r.kategorier || {}).map(([k, v]) => `${KATEGORIER[k] || k}: ${v.riktig}/${v.totalt}`).join(' · ');
    return `<details><summary>${esc(e.navn)} ${e.klasse ? '(' + esc(e.klasse) + ')' : ''} – ${nivaNavn(e.niva)}</summary>
      <p class="liten">${esc(kat) || 'Ingen oppgaver besvart.'}</p>
      <p class="liten">Forutsi-utfordringer gjort: ${(e.r.forutsi?.fullfort || []).length} av ${e.r.forutsi?.antall || 8} · Hint: ${e.hint} · Kilde: ${esc(e.x.kilde)}</p>
      ${ref.length ? ref.map(([q, t]) => `<p><b>${esc(q)}</b><br>${esc(t).replace(/\n/g, '<br>')}</p>`).join('') : '<p class="liten">Ingen refleksjon skrevet.</p>'}</details>`;
  }).join('');
}
document.querySelectorAll('th[data-sort]').forEach(th => th.addEventListener('click', () => { const k = th.dataset.sort; sortDir = sortKey === k ? -sortDir : 1; sortKey = k; tegn(); }));

$('csv').addEventListener('click', () => {
  const rr = rader(); if (!rr.length) { $('melding').textContent = 'Ingen rapporter å eksportere.'; return; }
  const q = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  const kat = Object.keys(KATEGORIER);
  const hode = ['Navn', 'Klasse', 'Dato', 'Nivå nådd', 'Nybegynner %', 'Trygg %', 'Ekspert %', 'Forutsi riktig', 'Hint', ...kat.map(k => KATEGORIER[k] + ' riktig/totalt'), ...Object.values(FEILTYPER).map(f => f.navn), 'Endret'];
  const linjer = rr.map(e => [e.navn, e.klasse, e.r.laget.slice(0, 10), nivaNavn(e.niva), ...['nybegynner', 'trygg', 'ekspert'].map(id => e.r.nivaer?.[id]?.forsok ? e.r.nivaer[id].best : ''), e.forutsi, e.hint,
    ...kat.map(k => e.r.kategorier?.[k] ? `${e.r.kategorier[k].riktig}/${e.r.kategorier[k].totalt}` : ''), ...Object.keys(FEILTYPER).map(k => e.r.feil?.[k] || 0), e.x.endret ? 'ja' : 'nei'].map(q).join(';'));
  const blob = new Blob(['﻿' + [hode.map(q).join(';'), ...linjer].join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `skjaeredata-klasseoversikt-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
});
}
if (document.getElementById('tabell')) init();
else document.addEventListener('gjesterom:apnet', () => { if (document.getElementById('tabell')) init(); });
