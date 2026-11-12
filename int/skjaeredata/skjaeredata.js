/* Gjestefag INT – Skjæredata. Simulator, forutsi-utfordringer, nivåtester og elevrapport.
   Alt innhold er egenprodusert. Skjæredataene er veiledende startverdier for undervisning. */
import { NIVAER, KATEGORIER, FEILTYPER, TYPE, sjekksum, rapportKode, lagPdf } from './rapport.js';

const $ = id => document.getElementById(id);
const nf = (x, d = 0) => (Number.isFinite(x) ? x : 0).toLocaleString('nb-NO', { maximumFractionDigits: d, minimumFractionDigits: 0 });
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const rnd = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const PI = Math.PI;

/* ---------------- Faglige data ---------------- */
const MAT = {
  alu:     { navn: 'Aluminium', vc: { fres: { HM: [250, 600], HSS: [80, 150] }, dre: { HM: [300, 800], HSS: [100, 200] }, bor: { HM: [100, 250], HSS: [60, 100] } }, fz: [0.03, 0.10], fdre: [0.1, 0.4], fbor: [0.015, 0.03] },
  stal:    { navn: 'Konstruksjonsstål (S235)', vc: { fres: { HM: [120, 220], HSS: [20, 35] }, dre: { HM: [150, 250], HSS: [25, 40] }, bor: { HM: [70, 120], HSS: [20, 30] } }, fz: [0.03, 0.08], fdre: [0.1, 0.35], fbor: [0.01, 0.02] },
  rust:    { navn: 'Rustfritt stål', vc: { fres: { HM: [70, 120], HSS: [10, 20] }, dre: { HM: [90, 160], HSS: [15, 25] }, bor: { HM: [40, 70], HSS: [8, 15] } }, fz: [0.02, 0.06], fdre: [0.08, 0.3], fbor: [0.008, 0.015] },
  messing: { navn: 'Messing', vc: { fres: { HM: [150, 300], HSS: [50, 90] }, dre: { HM: [200, 350], HSS: [60, 100] }, bor: { HM: [80, 150], HSS: [40, 70] } }, fz: [0.03, 0.10], fdre: [0.1, 0.35], fbor: [0.015, 0.025] },
  plast:   { navn: 'Plast (POM, PC)', vc: { fres: { HM: [200, 400], HSS: [100, 200] }, dre: { HM: [200, 500], HSS: [100, 250] }, bor: { HM: [80, 150], HSS: [40, 80] } }, fz: [0.05, 0.15], fdre: [0.1, 0.3], fbor: [0.02, 0.04] }
};
const MASKINER = [
  { id: 'mm6', navn: 'HAAS Mini Mill (eldre) – maks 6000 o/min', max: 6000 },
  { id: 'mm8', navn: 'HAAS Mini Mill (ny) – maks 8000 o/min', max: 8000 },
  { id: 'dre', navn: 'Dreiebenk – maks 3000 o/min', max: 3000 },
  { id: 'sbor', navn: 'Søyleboremaskin – maks 2500 o/min', max: 2500 },
  { id: 'fri', navn: 'Ingen grense (bare teori)', max: Infinity }
];
const PROSESS = {
  fres: { navn: 'Fresing', dLbl: 'Fresediameter D', dMin: 1, dMax: 50, dStep: 0.5, fLbl: 'Mating per tann fz', fUnit: 'mm/tann', fMin: 0.005, fMax: 0.3, fStep: 0.005, def: { mat: 'alu', tool: 'HM', mach: 'mm6', D: 10, n: 6000, z: 3, f: 0.05 } },
  dre:  { navn: 'Dreiing', dLbl: 'Arbeidsstykkets diameter D', dMin: 5, dMax: 200, dStep: 1, fLbl: 'Mating per omdreining f', fUnit: 'mm/omdr', fMin: 0.02, fMax: 0.8, fStep: 0.01, def: { mat: 'stal', tool: 'HM', mach: 'dre', D: 50, n: 1100, z: 1, f: 0.2 } },
  bor:  { navn: 'Boring', dLbl: 'Borets diameter D', dMin: 1, dMax: 40, dStep: 0.5, fLbl: 'Mating per omdreining f', fUnit: 'mm/omdr', fMin: 0.01, fMax: 0.8, fStep: 0.01, def: { mat: 'stal', tool: 'HSS', mach: 'mm6', D: 8.5, n: 900, z: 2, f: 0.12 } }
};
const vcRange = s => MAT[s.mat].vc[s.proc][s.tool];
function fRange(s) {
  const m = MAT[s.mat];
  if (s.proc === 'fres') { const k = clamp(s.D / 10, 0.3, 1.5); return [m.fz[0] * k, m.fz[1] * k]; }
  if (s.proc === 'dre') return m.fdre;
  const k = s.tool === 'HM' ? 1.1 : 1; return [m.fbor[0] * s.D * k, m.fbor[1] * s.D * k];
}
const maskin = s => MASKINER.find(m => m.id === s.mach) || MASKINER[4];
function beregn(s) {
  const max = maskin(s).max;
  const nEff = Math.min(s.n, max);
  const vc = PI * s.D * nEff / 1000;
  const vf = s.proc === 'fres' ? s.f * s.z * nEff : s.f * nEff;
  return { nEff, vc, vf, begrenset: s.n > max, max };
}

/* ---------------- Lagring ---------------- */
const NOKKEL = 'int-skjaeredata-v1', TXT = 'int-skjaeredata-txt';
const ls = {
  get(k, d) { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
const tomt = () => ({ nivaer: {}, kat: {}, forutsi: {}, hint: 0, feil: {} });
let lager = Object.assign(tomt(), ls.get(NOKKEL, {}));
const lagre = () => ls.set(NOKKEL, lager);

/* ---------------- Simulator-tilstand og kontroller ---------------- */
let S = Object.assign({ proc: 'fres' }, PROSESS.fres.def);
const el = {
  mat: $('mat'), tool: $('tool'), mach: $('mach'), dR: $('dR'), dN: $('dN'), nR: $('nR'), nN: $('nN'),
  zR: $('zR'), zN: $('zN'), fR: $('fR'), fN: $('fN')
};
for (const [k, m] of Object.entries(MAT)) el.mat.add(new Option(m.navn, k));
for (const m of MASKINER) el.mach.add(new Option(m.navn, m.id));

function settProsess(p, behold = false) {
  S.proc = p;
  const P = PROSESS[p];
  if (!behold) Object.assign(S, P.def);
  document.querySelectorAll('[data-proc]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.proc === p)));
  $('dLbl').textContent = P.dLbl; $('fLbl').textContent = P.fLbl; $('fUnit').textContent = P.fUnit;
  Object.assign(el.dR, { min: P.dMin, max: P.dMax, step: P.dStep });
  Object.assign(el.fR, { min: P.fMin, max: P.fMax, step: P.fStep });
  $('zBox').classList.toggle('hidden', p !== 'fres');
  oppdaterKontroller(); oppdater();
}
function oppdaterKontroller() {
  el.mat.value = S.mat; el.tool.value = S.tool; el.mach.value = S.mach;
  el.dR.value = S.D; el.dN.value = +S.D.toFixed(1);
  el.nR.value = Math.min(S.n, 12000); el.nN.value = Math.round(S.n);
  el.zR.value = S.z; el.zN.value = S.z;
  el.fR.value = S.f; el.fN.value = +S.f.toFixed(3);
}
const kobling = [['dR', 'dN', 'D', parseFloat], ['nR', 'nN', 'n', parseFloat], ['zR', 'zN', 'z', v => Math.round(parseFloat(v))], ['fR', 'fN', 'f', parseFloat]];
for (const [r, n, key, p] of kobling) {
  el[r].addEventListener('input', () => { S[key] = p(el[r].value); el[n].value = key === 'f' ? +S[key].toFixed(3) : S[key]; oppdater(); });
  el[n].addEventListener('change', () => { const v = p(el[n].value); if (Number.isFinite(v) && v > 0) { S[key] = v; el[r].value = Math.min(v, +el[r].max); } oppdaterKontroller(); oppdater(); });
}
['mat', 'tool', 'mach'].forEach(k => el[k].addEventListener('change', () => { S[k] = el[k].value; oppdater(); }));
document.querySelectorAll('[data-proc]').forEach(b => b.addEventListener('click', () => { avbrytUtfordring(); settProsess(b.dataset.proc); }));
$('bestBtn').addEventListener('click', () => {
  const [lo, hi] = vcRange(S), [flo, fhi] = fRange(S);
  S.n = Math.round((lo + hi) / 2 * 1000 / (PI * S.D) / 10) * 10;
  S.f = +((flo + fhi) / 2).toFixed(3);
  oppdaterKontroller(); oppdater();
});

function gauge(id, verdi, lo, hi, tekst) {
  const g = $(id), top = Math.max(hi * 1.8, verdi * 1.1, 1e-9);
  g.querySelector('.ok').style.left = (lo / top * 100) + '%';
  g.querySelector('.ok').style.width = ((hi - lo) / top * 100) + '%';
  g.querySelector('.mk').style.left = clamp(verdi / top * 100, 0, 100) + '%';
  g.querySelector('.lbl span:last-child').textContent = tekst;
}
function oppdater() {
  const r = beregn(S), [lo, hi] = vcRange(S), [flo, fhi] = fRange(S), P = PROSESS[S.proc];
  $('oVc').textContent = nf(r.vc, r.vc < 10 ? 1 : 0);
  $('oN').textContent = nf(r.nEff);
  $('oVf').textContent = nf(r.vf, r.vf < 10 ? 1 : 0);
  const v = x => `<span class="v">${x}</span>`;
  const D = nf(S.D, 1), n = nf(r.nEff), f = nf(S.f, 3);
  let h = `Vc = π · D · n / 1000 = π · ${v(D)} · ${v(n)} / 1000 = <b>${nf(r.vc, 1)} m/min</b><br>`;
  h += `n = Vc · 1000 / (π · D) &nbsp;→&nbsp; for Vc = ${nf((lo + hi) / 2)} (midt i tabellen): n = ${nf((lo + hi) / 2 * 1000 / (PI * S.D))} o/min<br>`;
  h += S.proc === 'fres'
    ? `vf = fz · z · n = ${v(f)} · ${v(S.z)} · ${v(n)} = <b>${nf(r.vf, 1)} mm/min</b>`
    : `vf = f · n = ${v(f)} · ${v(n)} = <b>${nf(r.vf, 1)} mm/min</b>`;
  if (S.proc === 'bor') h += `<br><span class="muted">Vc gjelder ytterkanten av boret. I senter er D = 0, og da er Vc = 0.</span>`;
  if (S.proc === 'dre') h += `<br><span class="muted">Ved dreiing er D arbeidsstykkets diameter der skjæret er.</span>`;
  $('formel').innerHTML = h;
  gauge('gVc', r.vc, lo, hi, `${nf(lo)}–${nf(hi)} m/min`);
  $('gFL').textContent = S.proc === 'fres' ? 'fz i forhold til tabellen' : 'f i forhold til tabellen';
  gauge('gF', S.f, flo, fhi, `${nf(flo, 3)}–${nf(fhi, 3)} ${P.fUnit}`);
  const st = [];
  if (r.begrenset) st.push(['bad', `<b>Maskinen klarer ikke ${nf(S.n)} o/min.</b> Turtallet stopper på ${nf(r.max)}, og Vc blir bare ${nf(r.vc)} m/min. Vurder et større verktøy eller en raskere maskin.`]);
  if (r.vc > hi * 1.15) st.push(['bad', '<b>For høy Vc.</b> Eggen blir varm og slites fort, i verste fall brenner den. Senk turtallet.']);
  else if (r.vc > hi) st.push(['warn', 'Vc er litt over tabellen. Hold øye med spon og slitasje.']);
  else if (r.vc < lo * 0.6) st.push(['bad', '<b>Altfor lav Vc.</b> Dårlig overflate, materiale kan klebe seg til eggen (løseegg), og jobben tar lang tid.']);
  else if (r.vc < lo) st.push(['warn', 'Vc er under tabellen. Det fungerer, men gir dårligere overflate og lavere produktivitet.']);
  else st.push(['ok', 'Vc er innenfor tabellen for dette materialet og verktøyet.']);
  if (S.f > fhi * 1.2) st.push(['bad', S.proc === 'fres' ? '<b>For stor mating per tann.</b> Tennene kan brekke, og fresen overbelastes.' : '<b>For stor mating.</b> Store krefter, grov overflate og fare for brudd.']);
  else if (S.f < flo * 0.6) st.push(['warn', 'Veldig liten mating: verktøyet gnir i stedet for å skjære. Det gir varme og rask slitasje.']);
  $('status').innerHTML = st.map(([c, t]) => `<div class="status ${c}">${t}</div>`).join('');
  anim.oppdater(r);
}

/* ---------------- Animasjon (canvas) ---------------- */
const anim = (() => {
  const cv = $('cv'), ctx = cv.getContext('2d');
  let W = 600, H = 400, dpr = 1, theta = 0, mate = 0, last = performance.now(), r = beregn(S), chips = [], synlig = true;
  const ro = new ResizeObserver(() => { const b = cv.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 2); W = b.width; H = b.height; cv.width = W * dpr; cv.height = H * dpr; });
  ro.observe(cv);
  new IntersectionObserver(e => { synlig = e[0].isIntersecting; }).observe(cv);
  const rotVis = n => 2 * PI * (0.12 + 1.25 * Math.log10(1 + n / 50) / Math.log10(1 + 30000 / 50));
  const mateVis = vf => clamp(6 + 38 * Math.log10(1 + vf / 20), 3, 150);
  const C = { vc: '#f2b84b', n: '#71c5dc', f: '#8cd6ae', d: '#e6edf3', mat: '#5b6875', matLys: '#7d8b98', cut: '#0e161e', steel: '#c9d2da', chip: '#ff9a52' };

  function pil(x1, y1, x2, y2, farge, tekst, tx = 0, ty = 0, bredde = 2.5) {
    ctx.strokeStyle = farge; ctx.fillStyle = farge; ctx.lineWidth = bredde;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const a = Math.atan2(y2 - y1, x2 - x1);
    ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - 11 * Math.cos(a - 0.4), y2 - 11 * Math.sin(a - 0.4)); ctx.lineTo(x2 - 11 * Math.cos(a + 0.4), y2 - 11 * Math.sin(a + 0.4)); ctx.closePath(); ctx.fill();
    if (tekst) etikett(tekst, x2 + tx, y2 + ty, farge);
  }
  function bue(cx, cy, rad, a1, a2, farge, tekst, tx, ty, ry = rad) {
    ctx.strokeStyle = farge; ctx.fillStyle = farge; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(cx, cy, rad, ry, 0, a1, a2); ctx.stroke();
    const x = cx + rad * Math.cos(a2), y = cy + ry * Math.sin(a2), a = Math.atan2(ry * Math.cos(a2), -rad * Math.sin(a2));
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 11 * Math.cos(a - 0.45), y - 11 * Math.sin(a - 0.45)); ctx.lineTo(x - 11 * Math.cos(a + 0.45), y - 11 * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill();
    if (tekst) etikett(tekst, cx + tx, cy + ty, farge);
  }
  function etikett(t, x, y, farge, align = 'left') {
    ctx.font = '700 13px Inter, system-ui, sans-serif'; ctx.textAlign = align; ctx.textBaseline = 'middle';
    const w = ctx.measureText(t).width, x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
    ctx.fillStyle = 'rgba(11,17,23,.82)'; ctx.fillRect(x0 - 5, y - 10, w + 10, 20);
    ctx.fillStyle = farge; ctx.fillText(t, x, y);
  }
  function maal(x1, y1, x2, y2, tekst) {
    ctx.strokeStyle = C.d; ctx.fillStyle = C.d; ctx.lineWidth = 1.2; ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const a = Math.atan2(y2 - y1, x2 - x1);
    for (const [x, y, s] of [[x1, y1, 1], [x2, y2, -1]]) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + s * 8 * Math.cos(a - 0.35), y + s * 8 * Math.sin(a - 0.35)); ctx.lineTo(x + s * 8 * Math.cos(a + 0.35), y + s * 8 * Math.sin(a + 0.35)); ctx.closePath(); ctx.fill(); }
    if (tekst) etikett(tekst, (x1 + x2) / 2 + (x1 === x2 ? -10 : 8), (y1 + y2) / 2, C.d, x1 === x2 ? 'right' : 'left');
  }
  const vcLen = vc => clamp(18 + 26 * Math.log10(1 + vc), 24, 110);

  function tegnFres(dt) {
    const rad = clamp(16 + S.D * 3.4, 16, H * 0.3), cx = W * 0.44, cy = H * 0.5;
    const sp = clamp(S.f * 300, 3, 70), band = rad + 46;
    // arbeidsstykke (sett ovenfra) – flytter seg mot venstre
    const bx = cx - (mate % (W * 0.4 + 60));
    ctx.fillStyle = C.mat; ctx.fillRect(Math.min(bx, cx), cy - band, W, band * 2);
    const g = ctx.createLinearGradient(0, cy - band, 0, cy + band); g.addColorStop(0, 'rgba(255,255,255,.08)'); g.addColorStop(1, 'rgba(0,0,0,.15)');
    ctx.fillStyle = g; ctx.fillRect(Math.min(bx, cx), cy - band, W, band * 2);
    // frest spor
    ctx.fillStyle = C.cut; ctx.fillRect(bx, cy - rad, cx - bx, rad * 2);
    ctx.strokeStyle = 'rgba(200,215,225,.35)'; ctx.lineWidth = 1;
    for (let x = cx - sp; x > bx; x -= sp) { ctx.beginPath(); ctx.arc(x, cy, rad, -0.55 * PI, -0.45 * PI); ctx.stroke(); ctx.beginPath(); ctx.arc(x, cy, rad, 0.45 * PI, 0.55 * PI); ctx.stroke(); }
    ctx.fillStyle = C.matLys; ctx.font = '600 12px Inter, system-ui'; ctx.textAlign = 'left'; ctx.fillText('Arbeidsstykke sett ovenfra', W - 190, cy + band - 12);
    // verktøy
    const gg = ctx.createRadialGradient(cx - rad * 0.3, cy - rad * 0.3, 2, cx, cy, rad);
    gg.addColorStop(0, '#eef3f7'); gg.addColorStop(1, '#7f8b96');
    ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 2 * PI); ctx.fill();
    ctx.strokeStyle = '#3a4652'; ctx.lineWidth = 1.5;
    for (let i = 0; i < S.z; i++) {
      const a = theta + i * 2 * PI / S.z;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.quadraticCurveTo(cx + rad * 0.6 * Math.cos(a - 0.6), cy + rad * 0.6 * Math.sin(a - 0.6), cx + rad * Math.cos(a), cy + rad * Math.sin(a)); ctx.stroke();
      const ex = cx + rad * Math.cos(a), ey = cy + rad * Math.sin(a);
      ctx.fillStyle = '#ffd88a'; ctx.beginPath(); ctx.arc(ex, ey, clamp(rad * 0.09, 2.5, 6), 0, 2 * PI); ctx.fill();
      // spon i kuttsonen (forkant, høyre side)
      if (Math.cos(a) > 0.2 && Math.random() < dt * 30) chips.push({ x: ex, y: ey, vx: 60 + Math.random() * 80, vy: (Math.random() - 0.5) * 160, l: 0.7, s: clamp(S.f * 60, 1.5, 6) });
    }
    ctx.fillStyle = '#2b3540'; ctx.beginPath(); ctx.arc(cx, cy, Math.max(3, rad * 0.12), 0, 2 * PI); ctx.fill();
    // piler
    bue(cx, cy, rad + 18, -PI * 0.95, -PI * 0.35, C.n, `n = ${nf(r.nEff)} o/min`, -rad - 10, -rad - 34);
    const tl = vcLen(r.vc);
    pil(cx, cy - rad - 2, cx + tl, cy - rad - 2, C.vc, `Vc = ${nf(r.vc)} m/min`, 8, -2);
    const yf = Math.min(cy + band + 22, H - 22), xf = Math.min(cx + rad + 6, W - 260);
    pil(xf, yf, xf + clamp(mateVis(r.vf), 30, 90), yf, C.f, `vf = ${nf(r.vf)} mm/min · fz = ${nf(S.f, 3)}`, 8, 0);
    ctx.strokeStyle = 'rgba(230,237,243,.5)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(cx - rad - 24, cy - rad); ctx.lineTo(cx, cy - rad); ctx.moveTo(cx - rad - 24, cy + rad); ctx.lineTo(cx, cy + rad); ctx.stroke(); ctx.setLineDash([]);
    maal(cx - rad - 16, cy - rad, cx - rad - 16, cy + rad, `D = ${nf(S.D, 1)}`);
  }

  function tegnDre(dt) {
    const ay = H * 0.47, R = clamp(10 + S.D * 0.55, 14, Math.min(120, H * 0.33)), x0 = 104, x1 = W - 70;
    const kutt = clamp(R * 0.12, 3, 10);
    const start = x1 - 8, slutt = x0 + 50, lengde = start - slutt;
    const xt = start - (mate % lengde);
    // chuck
    ctx.fillStyle = '#39434d'; ctx.fillRect(30, ay - R - 34, 74, 2 * R + 68);
    ctx.fillStyle = '#4c5864';
    for (const s of [-1, 1]) ctx.fillRect(86, ay + s * (R + 4) - (s > 0 ? 0 : 16), 22, 16);
    ctx.fillStyle = '#9aa6b2'; ctx.font = '600 12px Inter'; ctx.textAlign = 'center'; ctx.fillText('Chuck', 67, ay + R + 52);
    // arbeidsstykke: urørt (venstre for verktøy) og dreid (høyre)
    const cyl = (xa, xb, rr) => { const g = ctx.createLinearGradient(0, ay - rr, 0, ay + rr); g.addColorStop(0, '#7f8c98'); g.addColorStop(0.35, '#d7dee5'); g.addColorStop(1, '#4d5964'); ctx.fillStyle = g; ctx.fillRect(xa, ay - rr, xb - xa, 2 * rr); };
    cyl(x0, xt, R); cyl(xt, x1, R - kutt);
    // rotasjonsstriper
    ctx.strokeStyle = 'rgba(30,40,50,.35)'; ctx.lineWidth = 1.2;
    for (let k = 0; k < 10; k++) {
      const phi = theta + k * 2 * PI / 10; if (Math.sin(phi) < 0) continue;
      const yy = Math.cos(phi);
      ctx.beginPath(); ctx.moveTo(x0, ay + R * yy); ctx.lineTo(xt, ay + R * yy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(xt, ay + (R - kutt) * yy); ctx.lineTo(x1, ay + (R - kutt) * yy); ctx.stroke();
    }
    // matespor (helix) på dreid del
    const sp = clamp(S.f * 70, 3, 55);
    ctx.strokeStyle = 'rgba(25,32,40,.55)'; ctx.lineWidth = 1;
    for (let x = xt + sp; x < x1; x += sp) { ctx.beginPath(); ctx.moveTo(x, ay - R + kutt); ctx.lineTo(x + sp * 0.5, ay + R - kutt); ctx.stroke(); }
    // endeflate
    ctx.fillStyle = '#aab5bf'; ctx.beginPath(); ctx.ellipse(x1, ay, 7, R - kutt, 0, 0, 2 * PI); ctx.fill();
    // verktøy (skjærplate) foran, holder fra under
    ctx.fillStyle = '#2d3742'; ctx.beginPath(); ctx.moveTo(xt + 6, ay + 10); ctx.lineTo(xt + 46, H + 10); ctx.lineTo(xt + 86, H + 10); ctx.lineTo(xt + 30, ay + 6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ffd88a'; ctx.beginPath(); ctx.moveTo(xt - 2, ay + 2); ctx.lineTo(xt + 20, ay - 4); ctx.lineTo(xt + 22, ay + 16); ctx.closePath(); ctx.fill();
    if (Math.random() < dt * 25) chips.push({ x: xt + 6, y: ay + 4, vx: 30 + Math.random() * 60, vy: 40 + Math.random() * 90, l: 0.8, s: clamp(S.f * 14, 1.5, 6) });
    // piler
    pil(xt - 8, ay - vcLen(r.vc) * 0.9 - 4, xt - 8, ay - 4, C.vc, `Vc = ${nf(r.vc)} m/min`, -12, -vcLen(r.vc) * 0.9 - 12);
    ctx.save(); ctx.textAlign = 'right'; ctx.restore();
    bue(x1 + 2, ay, 26, -PI * 0.45, PI * 0.45, C.n, `n = ${nf(r.nEff)} o/min`, -150, -R - 26, R - kutt + 14);
    pil(xt + 40, ay + R + 26, xt - 30, ay + R + 26, C.f, `f = ${nf(S.f, 2)} mm/omdr · vf = ${nf(r.vf)} mm/min`, -10, 22);
    const xd = Math.max(x0 + 26, xt - 46);
    maal(xd, ay - R, xd, ay + R, `D = ${nf(S.D, 0)}`);
  }

  function tegnBor(dt) {
    const rp = clamp(5 + S.D * 2.4, 6, Math.min(90, W * 0.18)), ax = W * 0.5, top = H * 0.52, bunn = H - 18;
    const spiss = rp * 0.6, maxDybde = (bunn - top) * 0.75, sti = maxDybde + 60;
    const p = (mate % sti) - 50; // < 0: over arbeidsstykket
    const tipY = top + p;
    // arbeidsstykke
    const g = ctx.createLinearGradient(0, top, 0, bunn); g.addColorStop(0, '#7d8a96'); g.addColorStop(1, '#4b5763');
    ctx.fillStyle = g; ctx.fillRect(W * 0.16, top, W * 0.68, bunn - top);
    ctx.fillStyle = '#9aa6b2'; ctx.font = '600 12px Inter'; ctx.textAlign = 'left'; ctx.fillText('Arbeidsstykke (snitt)', W * 0.16 + 8, top + 18);
    if (p > -spiss) {
      ctx.fillStyle = C.cut; const d = Math.max(0, tipY - spiss - top);
      ctx.fillRect(ax - rp, top, 2 * rp, d);
      ctx.beginPath(); ctx.moveTo(ax - rp, top + d); ctx.lineTo(ax + rp, top + d); ctx.lineTo(ax, top + d + spiss); ctx.closePath(); ctx.fill();
    }
    // bor
    const y0 = 20;
    const kropp = new Path2D(); kropp.moveTo(ax - rp, y0); kropp.lineTo(ax + rp, y0); kropp.lineTo(ax + rp, tipY - spiss); kropp.lineTo(ax, tipY); kropp.lineTo(ax - rp, tipY - spiss); kropp.closePath();
    const gb = ctx.createLinearGradient(ax - rp, 0, ax + rp, 0); gb.addColorStop(0, '#6f7b86'); gb.addColorStop(0.45, '#e3e9ee'); gb.addColorStop(1, '#5b6772');
    ctx.fillStyle = gb; ctx.fill(kropp);
    ctx.save(); ctx.clip(kropp); ctx.strokeStyle = 'rgba(30,38,46,.65)'; ctx.lineWidth = Math.max(2, rp * 0.28);
    const stig = rp * 2.6, off = (theta / (2 * PI)) * stig;
    for (let yy = y0 - stig + (off % stig); yy < tipY + stig; yy += stig / 2) { ctx.beginPath(); ctx.moveTo(ax - rp - 2, yy); ctx.lineTo(ax + rp + 2, yy + stig * 0.35); ctx.stroke(); }
    ctx.restore();
    if (p > 0 && Math.random() < dt * 22) chips.push({ x: ax + (Math.random() < 0.5 ? -rp : rp), y: top - 2, vx: (Math.random() - 0.5) * 120, vy: -60 - Math.random() * 60, l: 0.9, s: clamp(S.f * 10, 1.5, 6) });
    // piler
    bue(ax, y0 + 34, rp + 12, PI * 0.15, PI * 0.85, C.n, `n = ${nf(r.nEff)} o/min`, rp + 22, -10, 9);
    const yv = y0 + 120;
    pil(ax + rp + 2, yv, ax + rp + 2 + vcLen(r.vc), yv, C.vc, `Vc ytterst = ${nf(r.vc)} m/min`, 8, 0);
    if (p > 0) etikett('Vc = 0 i senter', ax, Math.min(tipY + 18, bunn - 40), '#c9d2da', 'center');
    pil(ax - rp - 26, y0 + 150, ax - rp - 26, y0 + 210, C.f, '', 0, 0);
    etikett(`f = ${nf(S.f, 2)} mm/omdr`, ax - rp - 36, y0 + 166, C.f, 'right');
    etikett(`vf = ${nf(r.vf)} mm/min`, ax - rp - 36, y0 + 192, C.f, 'right');
    ctx.strokeStyle = 'rgba(230,237,243,.5)'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(ax - rp, y0 + 62); ctx.lineTo(ax - rp, y0 + 82); ctx.moveTo(ax + rp, y0 + 62); ctx.lineTo(ax + rp, y0 + 82); ctx.stroke(); ctx.setLineDash([]);
    maal(ax - rp, y0 + 72, ax + rp, y0 + 72, '');
    etikett(`D = ${nf(S.D, 1)}`, ax + rp + 10, y0 + 72, C.d);
  }

  function ramme(t) {
    requestAnimationFrame(ramme);
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    if (!synlig || !W) return;
    theta += rotVis(r.nEff) * dt;
    mate += mateVis(r.vf) * dt;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0b1117'; ctx.fillRect(0, 0, W, H);
    if (S.proc === 'fres') tegnFres(dt); else if (S.proc === 'dre') tegnDre(dt); else tegnBor(dt);
    chips = chips.filter(c => (c.l -= dt) > 0).slice(-160);
    ctx.fillStyle = C.chip;
    for (const c of chips) { c.x += c.vx * dt; c.y += c.vy * dt; c.vy += 260 * dt; ctx.globalAlpha = clamp(c.l, 0, 1); ctx.fillRect(c.x, c.y, c.s, c.s * 0.6); }
    ctx.globalAlpha = 1;
    ctx.font = '600 12px Inter'; ctx.fillStyle = '#7f8c98'; ctx.textAlign = 'right';
    ctx.fillText('Bevegelsene er tegnet saktere enn virkeligheten', W - 12, 18);
  }
  requestAnimationFrame(ramme);
  return { oppdater(nyR) { r = nyR; } };
})();

/* ---------------- Vc-tabell (Lær) ---------------- */
(() => {
  let h = '<thead><tr><th>Materiale</th><th>Fresing HSS</th><th>Fresing HM</th><th>Dreiing HSS</th><th>Dreiing HM</th><th>Boring HSS</th><th>Boring HM</th></tr></thead><tbody>';
  for (const m of Object.values(MAT)) {
    const c = (p, t) => `${m.vc[p][t][0]}–${m.vc[p][t][1]}`;
    h += `<tr><td><b>${m.navn}</b></td><td>${c('fres', 'HSS')}</td><td>${c('fres', 'HM')}</td><td>${c('dre', 'HSS')}</td><td>${c('dre', 'HM')}</td><td>${c('bor', 'HSS')}</td><td>${c('bor', 'HM')}</td></tr>`;
  }
  $('vcTab').innerHTML = h + '</tbody>';
})();

/* ---------------- Faser ---------------- */
function visFase(f) {
  document.querySelectorAll('.fase').forEach(b => b.setAttribute('aria-selected', String(b.dataset.fase === f)));
  document.querySelectorAll('[data-vis]').forEach(s => s.classList.toggle('hidden', s.dataset.vis !== f));
  $('simSec').classList.toggle('hidden', f === 'ov' || f === 'voks');
  if (f !== 'tenk') avbrytUtfordring();
  if (f === 'ov') tegnNivaer();
  if (f === 'voks') tegnRefleksjon();
}
document.querySelectorAll('.fase').forEach(b => b.addEventListener('click', () => visFase(b.dataset.fase)));

/* ---------------- Tenk: forutsi-utfordringer ---------------- */
const UTF = [
  { id: 'dobbel-d', proc: 'fres', oppsett: { mat: 'alu', tool: 'HM', mach: 'fri', D: 10, n: 4000, z: 3, f: 0.05 }, endring: { D: 20 },
    q: 'Du bytter fra en Ø10- til en Ø20-fres, men lar turtallet stå på 4000. Hva skjer med skjærehastigheten Vc?',
    opts: ['Den dobles', 'Den halveres', 'Den blir den samme', 'Den blir fire ganger så stor'], rett: 0,
    forklar: 'Vc = π · D · n / 1000. D står over brøkstreken, så dobbel diameter gir dobbel Vc. Eggen på en stor fres må gå en lengre runde på samme tid.' },
  { id: 'dobbel-n', proc: 'fres', oppsett: { mat: 'stal', tool: 'HM', mach: 'mm8', D: 10, n: 3000, z: 4, f: 0.04 }, endring: { n: 6000 },
    q: 'Du dobler turtallet fra 3000 til 6000 og lar fz og z stå. Hva skjer med matehastigheten vf?',
    opts: ['Den blir den samme', 'Den dobles', 'Den halveres', 'Den blir fire ganger så stor'], rett: 1,
    forklar: 'vf = fz · z · n. Hver tann skal fortsatt ta like mye (fz), men tennene kommer dobbelt så ofte. Da må fresen mates dobbelt så fort.' },
  { id: 'tenner', proc: 'fres', oppsett: { mat: 'alu', tool: 'HM', mach: 'mm6', D: 12, n: 5000, z: 2, f: 0.05 }, endring: { z: 4 },
    q: 'Du bytter fra 2-skjærs til 4-skjærs fres, med samme fz og samme turtall. Hva skjer med vf?',
    opts: ['Den dobles', 'Den halveres', 'Den blir den samme', 'Den øker litt'], rett: 0,
    forklar: 'To ekstra tenner betyr dobbelt så mange kutt per omdreining. Med samme fz må vf dobles. I aluminium er 2–3 skjær vanlig, fordi sponen trenger plass.' },
  { id: 'g96', proc: 'dre', oppsett: { mat: 'stal', tool: 'HM', mach: 'dre', D: 80, n: 700, f: 0.2 }, endring: { D: 40, n: 1400 },
    q: 'Du plandreier fra Ø80 inn mot Ø40 og vil holde Vc konstant (G96). Hva må turtallet gjøre?',
    opts: ['Stå stille', 'Halveres', 'Dobles', 'Bli fire ganger så stort'], rett: 2,
    forklar: 'Når D halveres, må n dobles for å holde samme Vc. Helt inne ved senter ville turtallet bli uendelig stort. Derfor setter vi en grense med G50.' },
  { id: 'lite-bor', proc: 'bor', oppsett: { mat: 'stal', tool: 'HSS', mach: 'fri', D: 20, n: 400, f: 0.2 }, endring: { D: 5, n: 1600 },
    q: 'Et Ø20-bor går på 400 o/min i stål. Hvilket turtall trenger et Ø5-bor for samme Vc?',
    opts: ['100 o/min', '400 o/min', '1600 o/min', '8000 o/min'], rett: 2,
    forklar: 'Ø5 er fire ganger mindre enn Ø20. Da må turtallet være fire ganger større: 4 · 400 = 1600 o/min.' },
  { id: 'hm-hss', proc: 'fres', oppsett: { mat: 'stal', tool: 'HSS', mach: 'mm8', D: 10, n: 850, z: 4, f: 0.03 }, endring: { tool: 'HM', n: 5400 },
    q: 'Du bytter fra en HSS-fres til en hardmetallfres i stål. Hva skjer med det anbefalte turtallet?',
    opts: ['Det blir omtrent det samme', 'Det blir mye høyere, fordi HM tåler omtrent fem ganger høyere Vc', 'Det blir lavere, fordi HM er sprøtt', 'Det halveres'], rett: 1,
    forklar: 'Hardmetall tåler mye mer varme enn hurtigstål. Tabellen gir derfor mye høyere Vc, og dermed høyere turtall for samme diameter.' },
  { id: 'senter', proc: 'bor', oppsett: { mat: 'alu', tool: 'HSS', mach: 'mm6', D: 12, n: 2000, f: 0.25 }, endring: {},
    q: 'Hva er skjærehastigheten helt i senteret av boret?',
    opts: ['Samme som ytterst', 'Halvparten av ytterst', 'Null', 'Dobbelt så stor'], rett: 2,
    forklar: 'I senter er D = 0, og da blir Vc = 0. Materialet blir presset og skrapt bort i stedet for skåret. Derfor trenger boret stor matekraft, og et senterbor hjelper.' },
  { id: 'maks', proc: 'fres', oppsett: { mat: 'alu', tool: 'HM', mach: 'mm6', D: 3, n: 3000, z: 2, f: 0.02 }, endring: { n: 31800 },
    q: 'Du freser aluminium med en Ø3 hardmetallfres. Tabellen sier Vc ≈ 300 m/min, og det gir ca. 31 800 o/min. Hva skjer på Mini Mill med maks 6000 o/min?',
    opts: ['Maskinen går fortere enn 6000 likevel', 'Turtallet stopper på 6000, og Vc blir bare ca. 57 m/min', 'Vc blir 300 uansett', 'Fresen brekker med en gang'], rett: 1,
    forklar: 'Maskinen kan ikke gå fortere enn maks turtall. Vc = π · 3 · 6000 / 1000 ≈ 57 m/min. Det går greit med hardmetall i aluminium, men jobben tar lengre tid. Se den røde meldingen i simulatoren.' }
];
let aktiv = null, tween = null;
function tegnUtfordringer() {
  const f = lager.forutsi || {};
  const ferdig = Object.keys(f).length, rett = Object.values(f).filter(Boolean).length;
  $('chalSum').textContent = `Du har gjort ${ferdig} av ${UTF.length}, ${rett} riktige på første forsøk.`;
  $('chalList').innerHTML = UTF.map((u, i) => `<button type="button" data-u="${i}" class="${u.id in f ? 'done' : ''}"><small>${PROSESS[u.proc].navn} · utfordring ${i + 1}</small>${(u.q.match(/^[^.?]*[.?]/) || [u.q])[0]}</button>`).join('');
  $('chalList').querySelectorAll('button').forEach(b => b.addEventListener('click', () => startUtfordring(+b.dataset.u)));
}
function avbrytUtfordring() { aktiv = null; tween = null; if ($('chalBox')) $('chalBox').innerHTML = ''; }
function startUtfordring(i) {
  const u = UTF[i]; aktiv = u; tween = null;
  settProsess(u.proc, true); Object.assign(S, PROSESS[u.proc].def, u.oppsett); oppdaterKontroller(); oppdater();
  $('simSec').scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('chalBox').innerHTML = `<div class="ask"><b>Gjett først:</b> ${u.q}<div class="opts">${u.opts.map((o, k) => `<button type="button" class="opt" data-k="${k}">${o}</button>`).join('')}</div><div id="chalFb"></div></div>`;
  $('chalBox').querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => svarUtfordring(u, +b.dataset.k)));
}
function svarUtfordring(u, k) {
  if (aktiv !== u) return;
  const ok = k === u.rett;
  $('chalBox').querySelectorAll('.opt').forEach(b => { b.disabled = true; const kk = +b.dataset.k; if (kk === u.rett) b.classList.add('right'); else if (kk === k) b.classList.add('wrong'); });
  if (!(u.id in (lager.forutsi ||= {}))) { lager.forutsi[u.id] = ok; lagre(); }
  // Animer endringen i simulatoren
  const fra = {}, til = {};
  for (const [key, v] of Object.entries(u.endring)) { if (typeof v === 'number') { fra[key] = S[key]; til[key] = v; } else S[key] = v; }
  tween = { fra, til, t0: performance.now() };
  const steg = t => {
    if (!tween) return;
    const p = clamp((t - tween.t0) / 1600, 0, 1), e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    for (const key in tween.til) S[key] = tween.fra[key] + (tween.til[key] - tween.fra[key]) * e;
    if (S.z) S.z = Math.round(S.z);
    oppdaterKontroller(); oppdater();
    if (p < 1) requestAnimationFrame(steg);
  };
  requestAnimationFrame(steg);
  $('chalFb').innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Riktig!' : 'Ikke helt.'}</b> Se hva som skjer i simulatoren og i tallene. ${u.forklar}</div><div class="inline" style="margin-top:10px"><button class="btn sm primary" type="button" id="nesteU">Neste utfordring</button></div>`;
  $('nesteU').addEventListener('click', () => { const i = UTF.indexOf(u); startUtfordring((i + 1) % UTF.length); });
  tegnUtfordringer();
}

/* ---------------- Øv: oppgavegeneratorer ---------------- */
const mc = (kat, q, opts, rett, forklar, fase = 'ov') => ({ type: 'mc', kat, q, opts, rett, forklar, fase });
const num = (kat, q, svar, enhet, hints, forklar, ekstra = {}) => Object.assign({ type: 'num', kat, q, svar, enhet, hints, forklar, tol: 0.02, fase: 'ov' }, ekstra);
const nForm = (vc, d) => vc * 1000 / (PI * d);
const OPPG = {
  nybegynner: [
    () => mc('begrep', 'Hva betyr <b>n</b> i skjæredata?', ['Turtall – omdreininger per minutt', 'Antall tenner på fresen', 'Matehastighet', 'Skjærehastighet'], 0, 'n er turtallet: hvor mange ganger verktøyet (eller arbeidsstykket) går rundt per minutt. I G-koden står det etter S.'),
    () => mc('begrep', 'Hvilken enhet har skjærehastigheten <b>Vc</b>?', ['m/min – meter per minutt', 'mm/min – millimeter per minutt', 'o/min – omdreininger per minutt', 'mm/tann'], 0, 'Vc er hvor mange meter skjæreeggen beveger seg gjennom materialet per minutt.'),
    () => mc('dre', 'Ved <b>dreiing</b> er det … som roterer.', ['arbeidsstykket', 'verktøyet', 'både verktøy og arbeidsstykke', 'ingen av dem'], 0, 'I dreiebenken spinner arbeidsstykket i chucken, og skjærplaten står stille og mates langs.'),
    () => mc('fres', 'Hva er <b>fz</b>?', ['Mating per tann', 'Mating per minutt', 'Fresens diameter', 'Turtallet'], 0, 'fz er hvor mye hver tann skjærer for hver gang den går gjennom materialet, i mm per tann.'),
    () => { const Vc = rnd([100, 120, 150, 200, 250, 300]), D = rnd([6, 8, 10, 12, 16, 20]), n = nForm(Vc, D);
      return num('fres', `Du skal frese med en Ø${D}-fres og Vc = ${Vc} m/min. Regn ut turtallet n.<br><span class="muted">Formel: n = Vc · 1000 / (π · D)</span>`, n, 'o/min',
        [`Sett inn tallene: n = ${Vc} · 1000 / (π · ${D})`, `Over brøkstreken: ${nf(Vc * 1000)}. Under: π · ${D} = ${nf(PI * D, 2)}. Del det ene på det andre.`],
        `n = ${Vc} · 1000 / (π · ${D}) = ${nf(n)} o/min.`); },
    () => { const D = rnd([5, 6, 8, 10, 12]), n = rnd([800, 1000, 1200, 1500, 2000]), vc = PI * D * n / 1000;
      return num('bor', `Et Ø${D}-bor går på ${nf(n)} o/min. Regn ut skjærehastigheten Vc.<br><span class="muted">Formel: Vc = π · D · n / 1000</span>`, vc, 'm/min',
        [`Sett inn: Vc = π · ${D} · ${n} / 1000`, `π · ${D} · ${n} = ${nf(PI * D * n, 1)}. Del på 1000.`], `Vc = π · ${D} · ${n} / 1000 = ${nf(vc, 1)} m/min.`); },
    () => mc('dre', 'Ved dreiing: hvilken diameter bruker du i formelen for turtall?', ['Arbeidsstykkets diameter der du skjærer', 'Skjærplatens diameter', 'Chuckens diameter', 'Radiusen til arbeidsstykket'], 0, 'Det er overflaten på arbeidsstykket som beveger seg forbi skjæret. Derfor er det arbeidsstykkets diameter som teller.'),
    () => Object.assign(mc('bor', 'Et lite bor og et stort bor skal bore i samme stål med samme Vc. Hvilket må gå med høyest turtall?', ['Det lille boret', 'Det store boret', 'Begge likt', 'Det kommer an på matingen'], 0, 'Ytterkanten på et lite bor har en kort runde. For å komme like langt per minutt må det gå rundt flere ganger.'), { fase: 'tenk' }),
    () => mc('begrep', 'Hvorfor ganger vi med 1000 når vi regner ut n?', ['Fordi D er i millimeter og Vc i meter per minutt', 'Fordi π er omtrent 3,14', 'For å få svaret i sekunder', 'Det er en sikkerhetsfaktor'], 0, '1 m = 1000 mm. Formelen gjør om meter til millimeter så enhetene passer sammen.'),
    () => { const n = rnd([400, 600, 800, 1000, 1200]), f = rnd([0.1, 0.15, 0.2, 0.25, 0.3]), vf = n * f;
      return num('dre', `Dreiebenken går på ${n} o/min, og matingen er f = ${nf(f, 2)} mm/omdr. Regn ut matehastigheten vf.<br><span class="muted">Formel: vf = f · n</span>`, vf, 'mm/min',
        [`vf = ${nf(f, 2)} · ${n}`], `vf = ${nf(f, 2)} · ${n} = ${nf(vf)} mm/min. Verktøyet flytter seg ${nf(vf)} mm hvert minutt.`); },
    () => mc('begrep', 'I et CNC-program står det <b>S2500 M03</b>. Hva betyr S2500?', ['Turtall 2500 o/min', 'Mating 2500 mm/min', 'Skjærehastighet 2500 m/min', 'Verktøy nummer 2500'], 0, 'S er turtallet (spindle speed). M03 starter spindelen med klokka. F er matingen.')
  ],
  trygg: [
    () => { const m = rnd(['alu', 'stal', 'messing']), t = 'HM', D = rnd([6, 8, 10, 12, 16]), [lo, hi] = MAT[m].vc.fres[t], Vc = (lo + hi) / 2, n = nForm(Vc, D);
      return num('fres', `Du skal frese <b>${MAT[m].navn.toLowerCase()}</b> med en Ø${D} hardmetallfres. Bruk Vc midt i tabellen (${nf(Vc)} m/min). Regn ut n.`, n, 'o/min',
        [`n = Vc · 1000 / (π · D)`, `n = ${nf(Vc)} · 1000 / (π · ${D})`], `n = ${nf(Vc)} · 1000 / (π · ${D}) = ${nf(n)} o/min.`); },
    () => { const m = rnd(['alu', 'stal', 'rust', 'messing']), D = rnd([6, 8, 10, 12]), [lo, hi] = MAT[m].vc.fres.HM, nlo = nForm(lo, D), nhi = nForm(hi, D);
      return num('fres', `Velg selv en Vc fra tabellen for <b>${MAT[m].navn.toLowerCase()}</b>, fresing med hardmetall (${lo}–${hi} m/min). Regn ut turtallet for en Ø${D}-fres. Alle svar innenfor tabellen godtas.`, (nlo + nhi) / 2, 'o/min',
        [`Velg en Vc mellom ${lo} og ${hi}. Bruk n = Vc · 1000 / (π · D).`], `Med Vc fra ${lo} til ${hi} m/min blir n mellom ${nf(nlo)} og ${nf(nhi)} o/min.`, { godta: v => v >= nlo * 0.98 && v <= nhi * 1.02 }); },
    () => { const D = rnd([8, 10, 12, 16]), z = rnd([2, 3, 4]), fz = rnd([0.03, 0.04, 0.05, 0.06]), n = rnd([2000, 3000, 4000, 5000, 6000]), vf = fz * z * n;
      return num('fres', `En Ø${D}-fres har z = ${z} tenner. fz = ${nf(fz, 2)} mm/tann og n = ${nf(n)} o/min. Regn ut matehastigheten vf.`, vf, 'mm/min',
        [`vf = fz · z · n`, `vf = ${nf(fz, 2)} · ${z} · ${n}`], `vf = ${nf(fz, 2)} · ${z} · ${n} = ${nf(vf)} mm/min.`, { z }); },
    () => { const D = rnd([5, 6.8, 8.5, 10.2, 12]), Vc = rnd([20, 25, 30]), n = nForm(Vc, D);
      return num('bor', `Du borer Ø${nf(D, 1)} i stål med HSS-bor og Vc = ${Vc} m/min. Regn ut n.`, n, 'o/min',
        [`n = Vc · 1000 / (π · D)`, `n = ${Vc} · 1000 / (π · ${nf(D, 1)})`], `n = ${Vc} · 1000 / (π · ${nf(D, 1)}) = ${nf(n)} o/min.`); },
    () => { const D = rnd([30, 40, 50, 60, 80]), Vc = rnd([150, 180, 200, 220]), n = nForm(Vc, D);
      return num('dre', `Du dreier en stålaksel som er Ø${D}. Vc = ${Vc} m/min med hardmetall. Regn ut n.`, n, 'o/min',
        [`Ved dreiing er D arbeidsstykkets diameter.`, `n = ${Vc} · 1000 / (π · ${D})`], `n = ${Vc} · 1000 / (π · ${D}) = ${nf(n)} o/min.`); },
    () => { const D = rnd([6, 8, 10, 12, 16]), n = rnd([2000, 3500, 4500, 6000]), vc = PI * D * n / 1000;
      return num('fres', `Programmet sier S${n}. Fresen er Ø${D}. Hvilken skjærehastighet Vc får du?`, vc, 'm/min',
        [`Vc = π · D · n / 1000`], `Vc = π · ${D} · ${n} / 1000 = ${nf(vc, 1)} m/min.`); },
    () => { const D = rnd([3, 4, 5]), vc = PI * D * 6000 / 1000;
      return num('fres', `Mini Mill går maks 6000 o/min. Du freser aluminium med en Ø${D} hardmetallfres. Tabellen anbefaler Vc = 300 m/min. Hvilken Vc får du når turtallet stopper på 6000?`, vc, 'm/min',
        [`Regn først n for 300 m/min. Er den over 6000? Da gjelder n = 6000.`, `Vc = π · ${D} · 6000 / 1000`], `Ønsket n blir ${nf(nForm(300, D))} o/min, men maskinen stopper på 6000. Vc = π · ${D} · 6000 / 1000 = ${nf(vc, 1)} m/min.`); },
    () => Object.assign(mc('fres', 'Ali sier: «En Ø20-fres må ha høyere turtall enn en Ø6-fres, fordi den er større.» Sara sier: «Nei, den lille må gå fortest.» Hvem har rett?', ['Sara', 'Ali', 'Begge', 'Ingen av dem'], 0, 'Sara har rett. Med samme Vc må den lille fresen gå fortere rundt, fordi omkretsen er kortere: n = Vc · 1000 / (π · D).'), { fase: 'tenk' }),
    () => mc('fres', 'Hva skjer hvis mating per tann (fz) er altfor høy?', ['Tennene kan brekke, og fresen kan overbelastes', 'Verktøyet gnir og blir blankt', 'Overflaten blir finere', 'Ingenting'], 0, 'Stor fz gir tykk spon og store krefter på hver tann.'),
    () => Object.assign(mc('fres', 'Ola regner turtall for en Ø10-fres med Vc = 200 m/min: <br><code>n = 200 · 1000 / (π · 5) = 12 732 o/min</code><br>Hva er feil?', ['Han brukte radius (5) i stedet for diameter (10)', 'Han glemte å gange med 1000', 'Han skulle gange med π i stedet for å dele', 'Ingenting er feil'], 0, 'Formelen bruker diameter. Riktig svar er n = 200 · 1000 / (π · 10) ≈ 6366 o/min, halvparten av Olas svar.'), { fase: 'tenk' }),
    () => { const D = rnd([6, 8, 10, 12]), n = rnd([600, 800, 1000, 1500]), f = rnd([0.1, 0.12, 0.15, 0.2]), vf = f * n;
      return num('bor', `Et Ø${D}-bor går på ${n} o/min med f = ${nf(f, 2)} mm/omdr. Regn ut vf.`, vf, 'mm/min', [`vf = f · n`], `vf = ${nf(f, 2)} · ${n} = ${nf(vf)} mm/min.`); },
    () => mc('fres', 'For <b>liten</b> mating per tann gir ofte …', ['gnissing, varme og rask slitasje', 'brudd i tennene', 'bedre sponbrudd', 'kortere bearbeidingstid'], 0, 'Er sponen tynnere enn eggradiusen, gnir eggen i stedet for å skjære. Det gir varme og slitasje.')
  ],
  ekspert: [
    () => { const L = rnd([80, 100, 120, 150]), p = rnd([2, 3, 4]), vf = rnd([600, 720, 900, 1200]), t = L * p / vf * 60;
      return num('plan', `Du freser en sliss som er ${L} mm lang i ${p} passeringer. vf = ${vf} mm/min. Hvor mange <b>sekunder</b> tar selve fresingen (uten hurtiggang)?`, t, 's',
        [`Total veilengde: ${L} · ${p} = ${L * p} mm.`, `Tid i minutter = vei / vf. Gang med 60 for sekunder.`], `t = ${L * p} / ${vf} min = ${nf(L * p / vf, 3)} min = ${nf(t, 1)} s.`); },
    () => { const [M, P] = rnd([[5, 0.8], [6, 1], [8, 1.25], [10, 1.5]]), n = rnd([400, 500, 600, 800]), F = n * P;
      return num('plan', `Du gjenger M${M} (stigning P = ${nf(P, 2)} mm) med stiv gjenging på ${n} o/min. Hvilken F-verdi (mm/min) må stå i programmet?`, F, 'mm/min',
        [`For hver omdreining skal tappen flytte seg én stigning.`, `F = n · P`], `F = ${n} · ${nf(P, 2)} = ${nf(F)} mm/min. Ellers river du gjengene eller knekker tappen.`); },
    () => { const ap = rnd([2, 3, 4, 5]), ae = rnd([4, 6, 8, 10]), vf = rnd([400, 600, 800, 1000]), Q = ap * ae * vf / 1000;
      return num('fres', `Fresing: skjæredybde ap = ${ap} mm, skjærebredde ae = ${ae} mm og vf = ${vf} mm/min. Hvor mye spon fjernes per minutt?<br><span class="muted">Q = ap · ae · vf / 1000 (cm³/min)</span>`, Q, 'cm³/min',
        [`ap · ae · vf gir mm³/min. Del på 1000 for cm³/min.`], `Q = ${ap} · ${ae} · ${vf} / 1000 = ${nf(Q, 1)} cm³/min.`); },
    () => { const Vc = rnd([180, 200, 220, 250]), D = rnd([10, 15, 20, 25]), max = rnd([2500, 3000, 3500]), n = nForm(Vc, D), svar = Math.min(n, max);
      return num('dre', `Du plandreier med konstant Vc = ${Vc} m/min (G96). Turtallet er begrenset med G50 S${max}. Hvilket turtall går maskinen med når skjæret er på Ø${D}?`, svar, 'o/min',
        [`Regn n = Vc · 1000 / (π · D).`, `Er svaret over ${max}? Da stopper maskinen på ${max}.`], `n = ${Vc} · 1000 / (π · ${D}) = ${nf(n)} o/min. ${n > max ? `Det er over grensen, så maskinen går på ${max} o/min.` : 'Det er under grensen.'}`); },
    () => mc('plan', 'Når du freser aluminium, kleber det seg blankt materiale på eggen, og overflaten blir revet opp. Hva er det beste tiltaket?', ['Øk Vc, bruk kjølevæske og et skarpt verktøy for aluminium', 'Senk turtallet kraftig', 'Øk utstikket på fresen', 'Bytt til et sløvere verktøy'], 0, 'Dette er løseegg. Det kommer ofte av for lav Vc, sløve egger eller lite kjøling. Polerte egger for aluminium hjelper også.'),
    () => mc('plan', 'Fresen hviner og lager et bølgemønster i overflaten (vibrasjoner, «chatter»). Hva prøver du først?', ['Kortere utstikk og en liten endring i turtallet', 'Lengre utstikk', 'Slå av kjølevæsken', 'Øk fz kraftig'], 0, 'Stivhet først: kort utstikk og god oppspenning. En endring i turtallet på 10–20 % flytter deg ofte ut av vibrasjonsområdet.'),
    () => num('plan', 'Pos. 22 (nivåglass topp): Du freser slissen med en Ø6 3-skjærs hardmetallfres i aluminium på Mini Mill (maks 6000 o/min). Ønsket Vc er 250 m/min, og fz = 0,04 mm/tann. Hvilken F-verdi (vf) setter du?', 720, 'mm/min',
      [`Ønsket n = 250 · 1000 / (π · 6) ≈ 13 263 o/min. Klarer maskinen det?`, `n = 6000. vf = fz · z · n`], 'Ønsket n er 13 263 o/min, men maskinen stopper på 6000. vf = 0,04 · 3 · 6000 = 720 mm/min.', { z: 3 }),
    () => { const L = rnd([40, 60, 80, 100]), n = rnd([800, 1000, 1200, 1500]), f = rnd([0.15, 0.2, 0.25]), t = L / (f * n) * 60;
      return num('dre', `Du langdreier ${L} mm. n = ${n} o/min og f = ${nf(f, 2)} mm/omdr. Hvor mange sekunder tar ett kutt?`, t, 's',
        [`vf = f · n = ${nf(f * n)} mm/min`, `t = L / vf, gang med 60 for sekunder`], `vf = ${nf(f * n)} mm/min. t = ${L} / ${nf(f * n)} min = ${nf(t, 1)} s.`); },
    () => mc('dre', 'Hvorfor bruker vi G50 sammen med G96 når vi plandreier inn mot senter?', ['For å begrense turtallet når diameteren nærmer seg null', 'For å slå på kjølevæske', 'For å velge verktøy', 'For å stoppe matingen'], 0, 'Med konstant Vc vil turtallet øke mot uendelig når D går mot 0. G50 setter en trygg øvre grense.'),
    () => { const D = rnd([8, 10, 12]), z = rnd([2, 3, 4]), n = rnd([3000, 4000, 5000, 6000]), fz = rnd([0.03, 0.04, 0.05, 0.06]), F = fz * z * n;
      return num('fres', `Et program for en Ø${D}-fres med ${z} tenner har disse linjene:<br><code>S${n} M03</code><br><code>G01 Z-2. F${nf(F, 0).replace(/\s/g, '')}.</code><br>Hvilken mating per tann (fz) gir programmet?`, fz, 'mm/tann',
        [`F er vf. vf = fz · z · n, altså fz = vf / (z · n).`], `fz = ${nf(F)} / (${z} · ${n}) = ${nf(fz, 3)} mm/tann.`, { z, tol: 0.03 }); },
    () => num('plan', 'Ny Mini Mill (maks 8000 o/min). Ø10 3-skjærs HM-fres i aluminium, fz = 0,06 mm/tann. Tabellen tillater Vc opptil 600 m/min. Hva er den høyeste vf du kan bruke?', 1440, 'mm/min',
      [`Ønsket n = 600 · 1000 / (π · 10) ≈ 19 099 o/min. Maskinen stopper på 8000.`, `vf = fz · z · n`], 'n = 8000 (maskinens maks). vf = 0,06 · 3 · 8000 = 1440 mm/min.', { z: 3 })
  ]
};

/* Diagnose av typiske regnefeil ut fra forholdet mellom svar og fasit */
function diagnose(svar, fasit, z) {
  const r = svar / fasit, nær = (a, b) => Math.abs(a / b - 1) < 0.04;
  const kand = [[1000, 'tusen'], [1 / 1000, 'tusen'], [2, 'radius'], [0.5, 'radius'], [PI, 'pi'], [1 / PI, 'pi'], [60, 'minutt'], [1 / 60, 'minutt']];
  if (z && z > 1) kand.push([z, 'tenner'], [1 / z, 'tenner']);
  for (const [k, f] of kand) if (nær(r, k)) return f;
  return 'regnefeil';
}

let test = null;
function tegnNivaer() {
  const n = lager.nivaer;
  $('levels').innerHTML = NIVAER.map((l, i) => {
    const v = n[l.id] || {}, open = i === 0 || n[NIVAER[i - 1].id]?.bestatt;
    const besk = ['Begreper, enheter og enkle formler med hjelp.', 'Alle tre prosessene, tabeller, mating og maskinens grenser.', 'Tid, gjenging, sponvolum, G96/G50, feilsøking og CNC-program.'][i];
    return `<div class="lvl ${open ? '' : 'locked'}"><h3>${l.navn} ${v.bestatt ? '<span class="badge on">Bestått</span>' : ''}</h3><p class="muted">${besk}</p>
      <div class="bar"><i style="width:${v.best || 0}%"></i></div><p class="muted" style="margin:0 0 10px">Beste: ${v.best ?? '–'} % · Forsøk: ${v.forsok || 0}</p>
      <button class="btn sm ${open ? 'primary' : ''}" type="button" data-l="${l.id}" ${open ? '' : 'disabled'}>${open ? (v.forsok ? 'Ta testen igjen' : 'Start testen') : 'Låst – bestå forrige nivå'}</button></div>`;
  }).join('');
  $('levels').querySelectorAll('button[data-l]').forEach(b => b.addEventListener('click', () => startTest(b.dataset.l)));
}
function startTest(niva) {
  const opg = shuffle(OPPG[niva]).slice(0, 8).map(g => g());
  test = { niva, opg, i: 0, poeng: 0, svar: [] };
  visOppgave();
  $('testBox').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function visOppgave() {
  const t = test, o = t.opg[t.i], navn = NIVAER.find(n => n.id === t.niva).navn;
  o.forsok = 0; o.hintNr = 0; o.ferdig = false;
  let h = `<div class="task"><div class="meta"><span>${navn} · oppgave ${t.i + 1} av ${t.opg.length} · ${KATEGORIER[o.kat]}${o.fase === 'tenk' ? ' · Tenk' : ''}</span><span>${Math.round(t.poeng * 10) / 10} poeng</span></div>
    <div class="prog"><i style="width:${t.i / t.opg.length * 100}%"></i></div><div class="q">${o.q}</div>`;
  if (o.type === 'mc') {
    const rek = shuffle(o.opts.map((tekst, k) => ({ tekst, k })));
    h += `<div class="opts" style="display:grid;gap:8px">${rek.map(x => `<button class="opt" type="button" data-k="${x.k}">${x.tekst}</button>`).join('')}</div>`;
  } else {
    h += `<div class="inline"><input class="ans" id="ans" inputmode="decimal" autocomplete="off" aria-label="Svar"> <span class="muted">${o.enhet}</span>
      <button class="btn sm primary" type="button" id="sjekk">Sjekk</button><button class="btn sm" type="button" id="hintBtn">Hint (0/${o.hints.length})</button></div><div id="hintTxt"></div>`;
  }
  h += `<div id="ofb"></div></div>`;
  $('testBox').innerHTML = h;
  if (o.type === 'mc') $('testBox').querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => svarMc(o, +b.dataset.k)));
  else {
    $('sjekk').addEventListener('click', () => svarNum(o));
    $('ans').addEventListener('keydown', e => { if (e.key === 'Enter') svarNum(o); });
    $('hintBtn').addEventListener('click', () => visHint(o));
    $('ans').focus();
  }
}
function tellKat(kat, ok) { const k = (lager.kat[kat] ||= { riktig: 0, totalt: 0 }); k.totalt++; if (ok) k.riktig++; }
function svarMc(o, k) {
  if (o.ferdig) return; o.ferdig = true;
  const ok = k === o.rett;
  $('testBox').querySelectorAll('.opt').forEach(b => { b.disabled = true; const kk = +b.dataset.k; if (kk === o.rett) b.classList.add('right'); else if (kk === k) b.classList.add('wrong'); });
  if (ok) test.poeng += 1; else { lager.feil.begrep = (lager.feil.begrep || 0) + 1; }
  tellKat(o.kat, ok); test.svar.push(ok ? 1 : 0); lagre();
  ferdigOppgave(ok, o.forklar);
}
const tall = s => parseFloat(String(s).replace(/\s/g, '').replace(',', '.'));
function svarNum(o) {
  if (o.ferdig) return;
  const v = tall($('ans').value);
  if (!Number.isFinite(v)) { $('ofb').innerHTML = '<div class="fb hint">Skriv et tall. Du kan bruke komma.</div>'; return; }
  o.forsok++;
  const ok = o.godta ? o.godta(v) : Math.abs(v - o.svar) <= Math.abs(o.svar) * o.tol + 0.5 * (o.svar >= 100 ? 1 : 0.01);
  if (ok) {
    const p = o.forsok === 1 ? (o.hintNr ? 0.7 : 1) : 0.5;
    test.poeng += p; o.ferdig = true; tellKat(o.kat, true); test.svar.push(p); lagre();
    ferdigOppgave(true, o.forklar);
    return;
  }
  const f = diagnose(v, o.svar, o.z);
  lager.feil[f] = (lager.feil[f] || 0) + 1; lagre();
  const tips = { tusen: 'Svaret ditt er omtrent 1000 ganger for stort eller for lite. Har du husket ·1000 (mm og m)?', radius: 'Svaret ditt er omtrent dobbelt eller halvparten. Har du brukt radius i stedet for diameter?', pi: 'Svaret ditt er omtrent π ganger feil. Har du glemt π?', tenner: 'Svaret ditt er feil med en faktor lik antall tenner. Husk z i vf = fz · z · n.', minutt: 'Svaret ditt er 60 ganger feil. Blander du minutter og sekunder?', regnefeil: 'Ikke riktig. Sjekk formelen og tallene du satte inn.' }[f];
  if (o.forsok < 2) { $('ofb').innerHTML = `<div class="fb bad"><b>Ikke helt.</b> ${tips} Prøv én gang til.</div>`; $('ans').select(); return; }
  o.ferdig = true; tellKat(o.kat, false); test.svar.push(0); lagre();
  ferdigOppgave(false, `${tips}<br><b>Løsning:</b> ${o.forklar}`);
}
function visHint(o) {
  if (o.ferdig || o.hintNr >= o.hints.length) return;
  o.hintNr++; lager.hint = (lager.hint || 0) + 1; lagre();
  $('hintTxt').innerHTML = o.hints.slice(0, o.hintNr).map((h, i) => `<div class="fb hint"><b>Hint ${i + 1}:</b> ${h}</div>`).join('');
  $('hintBtn').textContent = `Hint (${o.hintNr}/${o.hints.length})`;
  if (o.hintNr >= o.hints.length) $('hintBtn').disabled = true;
}
function ferdigOppgave(ok, forklar) {
  const siste = test.i === test.opg.length - 1;
  $('ofb').innerHTML = `<div class="fb ${ok ? 'ok' : 'bad'}"><b>${ok ? 'Riktig!' : 'Feil.'}</b> ${forklar}</div><div class="inline" style="margin-top:10px"><button class="btn sm primary" type="button" id="neste">${siste ? 'Se resultatet' : 'Neste oppgave'}</button></div>`;
  $('neste').addEventListener('click', () => { if (siste) avsluttTest(); else { test.i++; visOppgave(); } });
  $('neste').focus();
}
function avsluttTest() {
  const pct = Math.round(test.poeng / test.opg.length * 100), v = (lager.nivaer[test.niva] ||= { forsok: 0 });
  v.forsok++; v.siste = pct; v.best = Math.max(v.best || 0, pct); v.dato = new Date().toISOString();
  const bestatt = pct >= 80; if (bestatt) v.bestatt = true; lagre();
  const i = NIVAER.findIndex(n => n.id === test.niva), neste = NIVAER[i + 1];
  $('testBox').innerHTML = `<div class="task"><div class="q"><b>${pct} %</b> på ${NIVAER[i].navn}. ${bestatt ? (neste ? `Bra! Du har låst opp <b>${neste.navn}</b>.` : 'Sterkt! Du har bestått ekspertnivået.') : 'Du trenger 80 % for å bestå. Bruk hintene og simulatoren, og prøv igjen.'}</div>
    <p class="muted">${test.svar.map((s, k) => `${k + 1}: ${s === 1 ? '✔' : s > 0 ? '½' : '✘'}`).join(' · ')}</p>
    <div class="inline"><button class="btn sm primary" type="button" id="igjen">Ta testen igjen</button>${bestatt && neste ? `<button class="btn sm" type="button" id="videre">Start ${neste.navn}</button>` : ''}<button class="btn sm" type="button" id="tilVoks">Gå til Voks og rapport</button></div></div>`;
  $('igjen').addEventListener('click', () => startTest(test.niva));
  if ($('videre')) $('videre').addEventListener('click', () => startTest(neste.id));
  $('tilVoks').addEventListener('click', () => visFase('voks'));
  tegnNivaer();
}

/* ---------------- Voks: refleksjon og rapport ---------------- */
const REFL = [
  'Forklar med egne ord hvorfor et lite bor må gå med høyere turtall enn et stort bor i samme materiale.',
  'Du skal frese slissen i nivåglass-toppen (Ø6-fres, aluminium) på Mini Mill med maks 6000 o/min. Hvilke valg gjør du for turtall og mating, og hvorfor?',
  'Hva ser, hører og kjenner du på maskinen og sponen hvis skjæredataene er feil? Gi minst to eksempler.'
];
let minne = {};
$('saveText').checked = !!ls.get(TXT + '-on', false);
$('saveText').addEventListener('change', e => { ls.set(TXT + '-on', e.target.checked); if (e.target.checked) ls.set(TXT, minne); else ls.del(TXT); });
if ($('saveText').checked) minne = ls.get(TXT, {});
function tegnRefleksjon() {
  $('reflBox').innerHTML = REFL.map((q, i) => `<label style="display:block;margin:12px 0 4px;font-weight:700" for="r${i}">${i + 1}. ${q}</label><textarea class="refl" id="r${i}" maxlength="2000"></textarea>`).join('');
  REFL.forEach((q, i) => { const t = $('r' + i); t.value = minne[q] || ''; t.addEventListener('input', () => { minne[q] = t.value; if ($('saveText').checked) ls.set(TXT, minne); }); });
}
function lagRapport() {
  const r = {
    type: TYPE, versjon: 1, navn: $('navn').value.trim().slice(0, 60), klasse: $('klasse').value.trim().slice(0, 20), laget: new Date().toISOString(),
    nivaer: Object.fromEntries(NIVAER.map(n => { const v = lager.nivaer[n.id] || {}; return [n.id, { best: v.best || 0, siste: v.siste || 0, forsok: v.forsok || 0, bestatt: !!v.bestatt }]; })),
    kategorier: lager.kat,
    forutsi: { fullfort: Object.keys(lager.forutsi || {}), riktig: Object.values(lager.forutsi || {}).filter(Boolean).length, antall: UTF.length },
    hint: lager.hint || 0, feil: lager.feil || {},
    refleksjon: Object.fromEntries(REFL.map(q => [q, (minne[q] || '').slice(0, 2000)]))
  };
  r.kontroll = sjekksum(r);
  return r;
}
$('pdfBtn').addEventListener('click', async () => {
  if (!$('navn').value.trim()) { $('pdfMsg').textContent = 'Skriv navnet ditt først.'; $('navn').focus(); return; }
  $('pdfMsg').textContent = 'Lager PDF …';
  try {
    const r = lagRapport(), blob = await lagPdf(r);
    const slug = r.navn.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'elev';
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `skjaeredata-${slug}-${r.laget.slice(0, 10)}.pdf`;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    $('pdfMsg').textContent = 'PDF-en er lastet ned. Lever den i Teams.';
  } catch (e) { $('pdfMsg').textContent = 'PDF-en kunne ikke lages. Bruk «Vis rapportkode» og lim koden inn i Teams i stedet.'; }
});
$('kodeBtn').addEventListener('click', () => { const t = $('kodeOut'); t.value = rapportKode(lagRapport()); t.classList.remove('hidden'); t.select(); $('pdfMsg').textContent = 'Kopier hele koden og lim den inn i innleveringen i Teams.'; });
$('slettBtn').addEventListener('click', () => {
  if (!$('slettBtn').dataset.bekreft) { $('slettBtn').dataset.bekreft = '1'; $('slettBtn').textContent = 'Trykk igjen for å slette alt'; return; }
  ls.del(NOKKEL); ls.del(TXT); ls.del(TXT + '-on'); lager = tomt(); minne = {}; $('saveText').checked = false;
  $('slettBtn').textContent = 'Data slettet'; delete $('slettBtn').dataset.bekreft;
  tegnRefleksjon(); tegnNivaer(); tegnUtfordringer();
});

/* ---------------- Start ---------------- */
settProsess('fres');
tegnUtfordringer();
window.__skjaeredata = { S, beregn, OPPG, diagnose, lagRapport, get test() { return test; } };
