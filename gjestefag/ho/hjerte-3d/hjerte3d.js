/* Hjertet i 3D – gjestefag HO på TLLfluenseren.
   Modellen (hjerte.glb) og blodbanen (blodbane.json) er laget av lag_hjerte.py.
   Elevdata lagres bare i elevens nettleser. */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';
import { GLTFLoader } from 'three/addons/GLTFLoader.js';
import { DELER, TENK, ORD } from './deler.js';

const $ = id => document.getElementById(id);
const host = $('scene');
const NOKKEL = 'ho-hjerte3d-v1';
const S = (() => { try { return JSON.parse(localStorage.getItem(NOKKEL)) || {}; } catch (e) { return {}; } })();
S.visited ||= []; S.res ||= {}; S.tenk ||= {}; S.flagg ||= {};
const lagre = () => { try { localStorage.setItem(NOKKEL, JSON.stringify(S)); } catch (e) {} };
const maling = (() => { try { return (JSON.parse(localStorage.getItem('ho-hjerte-v1')) || {}).maling || {}; } catch (e) { return {}; } })();
const reduserBevegelse = matchMedia('(prefers-reduced-motion: reduce)').matches;
const KAMRE = ['hoyre_forkammer', 'venstre_forkammer', 'hoyre_kammer', 'venstre_kammer'];
const FORKAMRE = ['hoyre_forkammer', 'venstre_forkammer'];
const del = id => DELER.find(d => d.id === id);
const state = { sel: null, t: 0, target: 0, banker: false, glass: false, stroem: false, quiz: null, skjult: new Set(), puls: 72 };

// ---------- Opplesning ----------
let stemme = null;
function velgStemme() { if (!('speechSynthesis' in window)) return; const v = speechSynthesis.getVoices(); stemme = v.find(x => /^(nb|no|nn)/i.test(x.lang) && /natural|online/i.test(x.name)) || v.find(x => /^(nb|no|nn)/i.test(x.lang)) || null; }
if ('speechSynthesis' in window) { velgStemme(); speechSynthesis.onvoiceschanged = velgStemme; }
function les(tekst) { if (!('speechSynthesis' in window)) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(tekst); u.lang = 'nb-NO'; u.rate = 0.9; if (stemme) u.voice = stemme; speechSynthesis.speak(u); }
const auto = () => $('taleAuto').checked;

// ---------- Tenk ----------
$('tenk').innerHTML = TENK.map((t, i) => `<details class="q"><summary>${i + 1}. ${t.q}</summary><button class="btn small" type="button" data-les="${i}">🔊 Les spørsmålet</button><label class="sr" for="svar${i}">Ditt svar</label><textarea id="svar${i}" placeholder="Skriv svaret ditt her før du ser løsningsforslaget …"></textarea><div class="msg" hidden>Skriv minst én hel setning først.</div><p><b>Løsningsforslag:</b> ${t.a}</p></details>`).join('');
document.querySelectorAll('#tenk .q').forEach((d, i) => {
  const p = d.querySelector('p'), ta = d.querySelector('textarea'), msg = d.querySelector('.msg');
  ta.value = S.tenk[i] || '';
  ta.addEventListener('input', () => { S.tenk[i] = ta.value; lagre(); msg.hidden = true; renderOppdrag(); });
  d.querySelector('[data-les]').onclick = () => les(TENK[i].q);
  const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'btn'; btn.style.marginTop = '10px'; btn.textContent = 'Vis løsningsforslag';
  p.hidden = true; p.before(btn);
  btn.onclick = () => { if (ta.value.trim().length < 15) { msg.hidden = false; ta.focus(); return; } p.hidden = false; btn.remove(); };
});

// ---------- Scene ----------
let renderer;
try { renderer = new THREE.WebGLRenderer({ antialias: true }); }
catch (e) { $('lasting').textContent = 'Nettleseren din klarer ikke å vise 3D (WebGL). Prøv en annen nettleser eller PC. Du kan fortsatt bruke listen over deler og test 2.'; }
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1117);
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
camera.position.set(0, 1.5, 22);
let controls;
if (renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  host.prepend(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 1, -0.5);
}
scene.add(new THREE.HemisphereLight(0xfff0f0, 0x22303c, 1.5));
const sol = new THREE.DirectionalLight(0xffffff, 2.4); sol.position.set(6, 10, 12); scene.add(sol);
const motlys = new THREE.DirectionalLight(0x9fc7ff, 0.9); motlys.position.set(-8, 3, -10); scene.add(motlys);

const root = new THREE.Group(); scene.add(root);
const P = {}; // del-id -> { gruppe, pivot, mesh, mat }
const ACC = new THREE.Color(0xffd36e);

function byggDeler(gltf) {
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse(o => {
    if (!o.isMesh) return;
    const id = DELER.find(d => o.name === d.id || o.parent?.name === d.id || o.name.startsWith(d.id))?.id;
    if (!id || P[id]) return;
    const geo = o.geometry.clone().applyMatrix4(o.matrixWorld);
    if (!geo.attributes.normal) geo.computeVertexNormals();
    // Fargen kommer fra Python-koden (vertex color i GLB-filen)
    const farge = new THREE.Color();
    const c = geo.attributes.color;
    if (c) farge.setRGB(c.getX(0), c.getY(0), c.getZ(0), THREE.SRGBColorSpace); else farge.set(0xcc4455);
    geo.deleteAttribute('color');
    geo.computeBoundingBox();
    const midt = geo.boundingBox.getCenter(new THREE.Vector3());
    geo.translate(-midt.x, -midt.y, -midt.z);
    const mat = new THREE.MeshStandardMaterial({ color: farge, roughness: 0.55, metalness: 0.05 });
    const mesh = new THREE.Mesh(geo, mat); mesh.userData.part = id;
    const pivot = new THREE.Group(); pivot.position.copy(midt); pivot.add(mesh);
    const gruppe = new THREE.Group(); gruppe.add(pivot);
    gruppe.userData.offset = new THREE.Vector3(...del(id).ut);
    root.add(gruppe);
    P[id] = { gruppe, pivot, mesh, mat, farge };
  });
}

// ---------- Blodstrøm ----------
const partikler = [];
let baner = null;
function byggBlodstrom(json) {
  baner = {
    bla: new THREE.CatmullRomCurve3(json.bla.map(p => new THREE.Vector3(...p))),
    rod: new THREE.CatmullRomCurve3(json.rod.map(p => new THREE.Vector3(...p))),
  };
  const geo = new THREE.SphereGeometry(0.17, 12, 8);
  [['bla', 0x6fa0ff], ['rod', 0xff4a4a]].forEach(([bane, farge]) => {
    const mat = new THREE.MeshBasicMaterial({ color: farge });
    for (let i = 0; i < 26; i++) { const m = new THREE.Mesh(geo, mat); m.userData = { bane, u: i / 26 }; m.visible = false; scene.add(m); partikler.push(m); }
  });
}

// ---------- Materialer: utheving, gjennomsiktighet, skjuling ----------
function oppdaterMaterialer(flashId, flashFarge) {
  Object.entries(P).forEach(([id, d]) => {
    const on = id === state.sel || id === flashId;
    const dim = state.sel && !on && !state.quiz;
    let op = 1;
    if ((state.glass || state.stroem) && KAMRE.includes(id)) op = 0.26;
    if (dim) op = Math.min(op, 0.2);
    d.mat.emissive.copy(on ? (flashId === id && flashFarge ? flashFarge : ACC) : new THREE.Color(0)).multiplyScalar(on ? 0.4 : 0);
    d.mat.opacity = op; d.mat.transparent = op < 1; d.mat.depthWrite = op >= 1; d.mat.needsUpdate = true;
    d.gruppe.visible = !state.skjult.has(id);
  });
}

// ---------- Delelisten ----------
function renderList() {
  const skjulNavn = state.quiz && state.quiz.type === 'finn';
  $('plist').innerHTML = DELER.map((d, i) => {
    const v = S.visited.includes(d.id), sk = state.skjult.has(d.id), f = P[d.id] ? '#' + P[d.id].farge.getHexString() : '#888';
    return `<li class="${sk ? 'skjult' : ''}"><button class="del" type="button" data-part="${d.id}" ${state.sel === d.id ? 'aria-current="true"' : ''} ${skjulNavn ? 'disabled' : ''}><span class="ck" aria-hidden="true">${v ? '✓' : ''}</span><span class="prikk" style="background:${f}" aria-hidden="true"></span>${skjulNavn ? '<span aria-label="Skjult navn">• • •</span>' : d.navn}${v ? '<span class="sr"> (utforsket)</span>' : ''}</button><button class="oye" type="button" data-oye="${d.id}" aria-pressed="${!sk}" aria-label="${sk ? 'Vis' : 'Skjul'} ${d.navn}" title="${sk ? 'Vis' : 'Skjul'} delen">👁</button></li>`;
  }).join('');
  const n = S.visited.filter(id => del(id)).length;
  $('progText').textContent = `${n} av ${DELER.length} deler utforsket`;
  $('progBar').style.width = (n / DELER.length * 100) + '%';
  $('doneBox').style.display = n === DELER.length ? 'block' : 'none';
  renderOppdrag();
}
$('plist').addEventListener('click', e => {
  const oye = e.target.closest('[data-oye]');
  if (oye) { if (state.quiz) return; const id = oye.dataset.oye; state.skjult.has(id) ? state.skjult.delete(id) : state.skjult.add(id); if (state.sel === id && state.skjult.has(id)) state.sel = null; sjekkKlaffer(); oppdaterMaterialer(); renderList(); return; }
  const b = e.target.closest('button[data-part]'); if (!b || state.quiz) return; velg(b.dataset.part, true);
});
$('visAlle').onclick = () => { state.skjult.clear(); oppdaterMaterialer(); renderList(); };
$('skjulKamre').onclick = () => { if (state.quiz) return; KAMRE.forEach(k => state.skjult.add(k)); if (KAMRE.includes(state.sel)) state.sel = null; sjekkKlaffer(); oppdaterMaterialer(); renderList(); };

// ---------- Oppdrag ----------
function oppdragListe() {
  const n = S.visited.filter(id => del(id)).length, besvart = TENK.filter((_, i) => (S.tenk[i] || '').trim().length >= 15).length;
  return [
    [`Følg blodet gjennom alle delene (${n}/${DELER.length})`, n >= DELER.length],
    [`Test 1 «Finn delen» – minst 6 av 8 (beste: ${S.res.finn ?? '–'})`, (S.res.finn ?? 0) >= 6],
    [`Test 2 «Hva heter delen?» – minst 6 av 8 (beste: ${S.res.navn ?? '–'})`, (S.res.navn ?? 0) >= 6],
    ['Finn klaffene inne i hjertet (skjul kamrene eller velg «Gjennomsiktig», og trykk på klaffene)', !!S.flagg.klaffer],
    ['Se hjertet slå i din egen puls («Min hvilepuls» eller «Min aktivitetspuls» + «▶ Bank»)', !!S.flagg.egenPuls],
    ['Vis blodstrømmen og følg en blå og en rød prikk hele veien', !!S.flagg.stroem],
    [`Tenk: svar på alle spørsmålene (${besvart}/${TENK.length})`, besvart === TENK.length],
  ];
}
function renderOppdrag() {
  const l = oppdragListe(), n = l.filter(x => x[1]).length;
  $('oppdrag').innerHTML = l.map(([t, ok]) => `<li style="padding:4px 10px;color:${ok ? 'var(--ok)' : 'var(--muted)'}">${ok ? '✓' : '☐'} ${t}${ok ? '<span class="sr"> – fullført</span>' : ''}</li>`).join('');
  $('oppdragSum').textContent = `${n} av ${l.length} fullført`;
}
function sjekkKlaffer() {
  if (state.sel === 'klaffer' && (state.glass || KAMRE.every(k => state.skjult.has(k)))) { if (!S.flagg.klaffer) { S.flagg.klaffer = true; lagre(); renderOppdrag(); } }
}

// ---------- Infopanel ----------
function ordFor(tekst) { return Object.entries(ORD).filter(([o]) => new RegExp('(^|[^\\p{L}])' + o + '($|[^\\p{L}])', 'iu').test(tekst)); }
function visInfo(id) {
  let tekst;
  if (!id) {
    $('infoOmr').textContent = 'Velg en del'; $('infoNavn').textContent = 'Hjertet';
    $('infoTekst').innerHTML = 'Hjertet er en muskel som pumper blod rundt i kroppen. Høyre side sender blodet til lungene, venstre side sender det ut i hele kroppen. <i>Rødt = oksygenrikt blod, blått = oksygenfattig blod.</i>';
    $('infoFakta').innerHTML = '<li>Trykk på en del i modellen, velg fra listen eller trykk «Gå gjennom delene».</li><li>Trykk «▶ Bank» for å se hjertet slå.</li>';
    tekst = $('infoTekst').textContent;
  } else {
    const d = del(id);
    $('infoOmr').textContent = d.omrade; $('infoNavn').textContent = d.navn; $('infoTekst').textContent = d.tekst;
    $('infoFakta').innerHTML = d.fakta.map(f => `<li>${f}</li>`).join(''); tekst = [d.navn, d.tekst, ...d.fakta].join(' ');
  }
  const ord = ordFor(tekst);
  $('infoOrd').hidden = !ord.length;
  $('infoOrd').innerHTML = '<b>Ord å kunne</b><br>' + ord.map(([o, f]) => `<b>${o}</b> – ${f}`).join('<br>');
  $('lesBtn').onclick = () => les(tekst);
  if (id && auto()) les(tekst);
}
function velg(id, fokus) {
  state.sel = id;
  if (id && !S.visited.includes(id)) { S.visited.push(id); lagre(); }
  if (id) state.skjult.delete(id);
  visInfo(id); oppdaterMaterialer(); renderList(); sjekkKlaffer();
  if (id && fokus) fokuserDel(id);
}

// ---------- Sprengning ----------
const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
function brukSprengning() {
  const e = ease(state.t);
  Object.values(P).forEach(d => d.gruppe.position.copy(d.gruppe.userData.offset).multiplyScalar(e));
  $('explode').value = state.t;
  $('explodeBtn').textContent = state.target > 0.5 ? 'Sett sammen' : 'Ta fra hverandre';
}
$('explodeBtn').onclick = () => { state.target = state.target > 0.5 ? 0 : 1; if (reduserBevegelse) { state.t = state.target; brukSprengning(); } setTimeout(() => tilpass(), 50); };
$('explode').oninput = e => { state.t = state.target = +e.target.value; brukSprengning(); };

// ---------- Kamera ----------
let camAnim = null;
function boksAv(obj) { const b = new THREE.Box3(); obj.updateMatrixWorld(true); obj.traverse(o => { if (o.isMesh && o.visible !== false) { o.geometry.computeBoundingBox(); b.union(o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld)); } }); return b; }
function flyTil(mal, avstand, retning, umiddelbart) {
  if (!controls) return;
  const dir = retning ? retning.clone().normalize() : camera.position.clone().sub(controls.target).normalize();
  const pos = mal.clone().addScaledVector(dir, avstand);
  if (umiddelbart || reduserBevegelse) { controls.target.copy(mal); camera.position.copy(pos); return; }
  camAnim = { t: 0, fraT: controls.target.clone(), tilT: mal, fraP: camera.position.clone(), tilP: pos };
}
function tilpass(umiddelbart, retning) {
  if (!controls || !Object.keys(P).length) return;
  const lagret = state.t; state.t = state.target; brukSprengning();
  const b = boksAv(root); state.t = lagret; brukSprengning();
  const s = b.getSize(new THREE.Vector3()), c = b.getCenter(new THREE.Vector3());
  const r = Math.max(s.x, s.y, s.z) * 0.5;
  const vh = camera.fov * Math.PI / 360, hh = Math.atan(Math.tan(vh) * camera.aspect);
  flyTil(c, r / Math.sin(Math.min(vh, hh)) * 1.12, retning, umiddelbart);
}
function fokuserDel(id) {
  if (!controls) return;
  const b = boksAv(P[id].gruppe), s = b.getSize(new THREE.Vector3());
  flyTil(b.getCenter(new THREE.Vector3()), Math.max(9, Math.max(s.x, s.y, s.z) * 2.2));
}
const VISNING = { forfra: [0, 0.15, 1], bakfra: [0, 0.15, -1], venstre: [1, 0.1, 0.05], ovenfra: [0, 1, 0.08] };
document.querySelectorAll('[data-vis]').forEach(b => b.onclick = () => tilpass(false, new THREE.Vector3(...VISNING[b.dataset.vis])));
$('fitBtn').onclick = () => tilpass();

// ---------- Banking, puls og lyd ----------
function settPuls(p, egen) {
  state.puls = Math.max(40, Math.min(180, Math.round(p)));
  $('puls').value = state.puls; $('pulsUt').textContent = state.puls + ' /min';
  state.egenPuls = !!egen;
  if (egen && state.banker) { S.flagg.egenPuls = true; lagre(); renderOppdrag(); }
}
$('puls').oninput = e => settPuls(+e.target.value, false);
[['minHvile', 'hvile'], ['minAktiv', 'aktivitet']].forEach(([knapp, type]) => {
  const b = $(knapp);
  if (maling[type]) { b.textContent += ` (${maling[type]})`; b.onclick = () => settPuls(maling[type], true); }
  else { b.title = 'Mål pulsen din på siden «Fra Python-kode til bankende hjerte» først'; b.onclick = () => { $('pulsUt').textContent = 'Mål først!'; setTimeout(() => $('pulsUt').textContent = state.puls + ' /min', 2200); }; }
});
$('bankBtn').onclick = () => {
  state.banker = !state.banker;
  $('bankBtn').setAttribute('aria-pressed', state.banker);
  $('bankBtn').textContent = state.banker ? '❚❚ Stopp' : '▶ Bank';
  if (state.banker && state.egenPuls) { S.flagg.egenPuls = true; lagre(); renderOppdrag(); }
  if (state.banker) lyd.start();
  $('hud').style.display = state.banker ? 'block' : 'none';
};
const lyd = {
  ctx: null,
  start() { if ($('lyd').checked && !this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } },
  dunk(frekvens, lengde) {
    if (!$('lyd').checked) return; this.start(); const c = this.ctx; if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(frekvens, c.currentTime); o.frequency.exponentialRampToValueAtTime(frekvens * 0.6, c.currentTime + lengde);
    g.gain.setValueAtTime(0.0001, c.currentTime); g.gain.exponentialRampToValueAtTime(0.9, c.currentTime + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + lengde);
    o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime + lengde + 0.02);
  }
};
$('lyd').onchange = () => lyd.start();

// Én hjertesyklus: forkamrene (0,1 s) → kort pause → systole (ca. 0,3 s) → diastole (resten).
const FORKAMMER_TID = 0.1, OVERLEDNING = 0.14;
function syklus() {
  const T = 60 / state.puls, systole = Math.min(0.3, T * 0.42);
  return { T, systole, sysStart: OVERLEDNING, sysSlutt: OVERLEDNING + systole };
}
let tid = 0, forrigeFase = '';
function slag(dt) {
  const sy = syklus();
  if (state.banker) tid = (tid + dt) % sy.T;
  const t = tid;
  const pust = (start, varighet) => (t >= start && t < start + varighet) ? Math.sin(Math.PI * (t - start) / varighet) : 0;
  const forkamre = pust(0, FORKAMMER_TID), kamre = pust(sy.sysStart, sy.systole);
  const skalaF = state.banker ? 1 - 0.1 * forkamre : 1, skalaK = state.banker ? 1 - 0.11 * kamre : 1;
  Object.entries(P).forEach(([id, d]) => {
    if (FORKAMRE.includes(id)) d.pivot.scale.setScalar(skalaF);
    else if (KAMRE.includes(id)) d.pivot.scale.set(skalaK, 1 - (1 - skalaK) * 0.6, skalaK);
  });
  if (!state.banker) return;
  const fase = t < FORKAMMER_TID ? 'forkamre' : t < sy.sysStart ? 'pause' : t < sy.sysSlutt ? 'systole' : 'diastole';
  if (fase !== forrigeFase) { if (fase === 'systole') lyd.dunk(55, 0.14); if (fase === 'diastole' && forrigeFase === 'systole') lyd.dunk(75, 0.1); forrigeFase = fase; }
  const tekst = { forkamre: 'Forkamrene trekker seg sammen', pause: 'Signalet går ned til kamrene', systole: 'Systole – kamrene pumper', diastole: 'Diastole – hjertet slapper av og fylles' }[fase];
  const pr = x => (x / sy.T * 100).toFixed(1) + '%';
  $('hud').innerHTML = `<b>${state.puls} slag i minuttet</b>${tekst}<div class="fasebar"><i style="width:${pr(FORKAMMER_TID)};background:#d9606a"></i><i style="width:${pr(OVERLEDNING - FORKAMMER_TID)};background:#2b3a48"></i><i style="width:${pr(sy.systole)};background:#ff7f9e"></i><i style="flex:1;background:#7fb6ff"></i><span class="markor" style="left:${pr(t)}"></span></div><small>Ett slag: ${sy.T.toFixed(2)} s · systole ${sy.systole.toFixed(2)} s · diastole ${(sy.T - sy.sysSlutt).toFixed(2)} s</small>`;
}
function flytBlod(dt) {
  const vis = state.stroem && baner;
  if (!vis) { partikler.forEach(p => p.visible = false); return; }
  const sy = syklus();
  const iSystole = state.banker && tid >= sy.sysStart && tid < sy.sysSlutt;
  const fart = (state.banker ? (iSystole ? 2.4 : 0.55) : 0.8) / (5 * sy.T);
  partikler.forEach(p => {
    p.userData.u = (p.userData.u + dt * fart) % 1;
    const pos = baner[p.userData.bane].getPointAt(p.userData.u);
    p.position.copy(pos);
    p.visible = true;
  });
}
$('glass').onchange = e => { state.glass = e.target.checked; sjekkKlaffer(); oppdaterMaterialer(); };
$('stroem').onchange = e => { state.stroem = e.target.checked; if (state.stroem) { state.target = 0; if (reduserBevegelse) { state.t = 0; brukSprengning(); } S.flagg.stroem = true; lagre(); renderOppdrag(); } oppdaterMaterialer(); };

// ---------- Gå gjennom delene ----------
function steg(retning) {
  if (state.quiz) return;
  const ids = DELER.map(d => d.id); let i = ids.indexOf(state.sel);
  i = i < 0 ? (retning > 0 ? 0 : ids.length - 1) : (i + retning + ids.length) % ids.length;
  velg(ids[i], true);
}
$('tourBtn').onclick = () => { state.sel = null; steg(1); };
$('nextBtn').onclick = () => steg(1);
$('prevBtn').onclick = () => steg(-1);

// ---------- Testene ----------
const ANT = 8;
function stokk(a) { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const quizBtns = [$('quizBtn'), $('quiz2Btn')];
const quizTekst = { finn: 'Test 1: Finn delen', navn: 'Test 2: Hva heter delen?' };
function laas(on) { ['tourBtn', 'nextBtn', 'prevBtn', 'visAlle', 'skjulKamre'].forEach(i => $(i).disabled = on); }
function startQuiz(type) {
  if (type === 'finn' && !renderer) return;
  state.quiz = { type, ids: stokk(DELER.map(d => d.id)).slice(0, ANT), i: 0, score: 0, feil: [], runde: 1, lock: false };
  state.sel = null; state.skjult.clear(); laas(true);
  quizBtns.forEach(b => b.textContent = b.dataset.type === type ? 'Avslutt testen' : quizTekst[b.dataset.type]);
  visInfo(null); oppdaterMaterialer(); renderList(); spor();
  $('quizBar').scrollIntoView({ block: 'nearest', behavior: reduserBevegelse ? 'auto' : 'smooth' });
}
function stoppQuiz() {
  if (state.quiz) { state.quiz = null; settGlassForQuiz(false); renderList(); oppdaterMaterialer(); }
  $('quizBar').hidden = true; laas(false);
  quizBtns.forEach(b => b.textContent = quizTekst[b.dataset.type]);
}
let glassForQuiz = false;
function settGlassForQuiz(on) { // klaffene ligger inne i hjertet – gjør kamrene gjennomsiktige mens vi leter etter dem
  if (on === glassForQuiz) return; glassForQuiz = on; state.glass = on || $('glass').checked; oppdaterMaterialer();
}
function spor() {
  const q = state.quiz, bar = $('quizBar'), id = q.ids[q.i], d = del(id); bar.className = 'quizPanel'; bar.hidden = false; q.lock = false;
  const status = `<small>${q.runde > 1 ? 'Øvingsrunde: delene du bommet på · ' : ''}Spørsmål ${q.i + 1} av ${q.ids.length}${q.runde === 1 ? ` · ${q.score} riktige` : ''}</small>`;
  if (q.type === 'finn') {
    settGlassForQuiz(id === 'klaffer'); oppdaterMaterialer();
    bar.innerHTML = `Klikk på: ${d.navn} <button class="btn small" type="button" id="qLes">🔊</button>${id === 'klaffer' ? '<small>Kamrene er gjort gjennomsiktige så du ser inn.</small>' : ''}${status}`;
    if (auto()) les('Klikk på ' + d.navn);
  } else {
    oppdaterMaterialer(id); fokuserDel(id);
    const valg = stokk([id, ...stokk(DELER.map(x => x.id).filter(x => x !== id)).slice(0, 2)]);
    bar.innerHTML = `Hva heter delen som lyser? <button class="btn small" type="button" id="qLes">🔊</button>${status}<div class="opts">${valg.map(v => `<button class="btn" type="button" data-svar="${v}">${del(v).navn}</button>`).join('')}</div>`;
    bar.querySelectorAll('[data-svar]').forEach(b => b.onclick = () => svar(b.dataset.svar));
    bar.querySelector('[data-svar]').focus({ preventScroll: true });
    if (auto()) les('Hva heter delen som lyser? Er det ' + valg.map(v => del(v).navn).join(', eller ') + '?');
  }
  $('qLes').onclick = () => les(q.type === 'finn' ? 'Klikk på ' + d.navn : 'Hva heter delen som lyser?');
}
function svar(pid, treff) {
  const q = state.quiz; if (!q || q.lock) return;
  const riktig = q.ids[q.i];
  const ok = pid === riktig || (riktig === 'klaffer' && treff && treff.includes('klaffer'));
  q.lock = true;
  const bar = $('quizBar'), gronn = new THREE.Color(0x8cd6ae);
  if (ok) {
    if (q.runde === 1) q.score++;
    bar.className = 'quizPanel ok'; bar.innerHTML = `Riktig! Det er ${del(riktig).navn}.`;
    oppdaterMaterialer(riktig, gronn);
    setTimeout(() => { if (state.quiz === q) neste(); }, 1100);
  } else {
    if (!q.feil.includes(riktig)) q.feil.push(riktig);
    bar.className = 'quizPanel feil';
    const d = del(riktig), forste = d.tekst.split('. ')[0] + '.';
    bar.innerHTML = `${q.type === 'finn' && pid ? `Du trykket på ${del(pid).navn}. ` : 'Ikke riktig. '}Riktig svar er <u>${d.navn}</u> – den lyser grønt nå.<small>${forste}</small><div class="opts"><button class="btn" type="button" id="qNeste">Neste →</button></div>`;
    oppdaterMaterialer(riktig, gronn); fokuserDel(riktig);
    $('qNeste').onclick = () => neste(); $('qNeste').focus({ preventScroll: true });
    if (auto()) les('Riktig svar er ' + d.navn + '. ' + forste);
  }
}
function neste() {
  const q = state.quiz; q.i++;
  if (q.i < q.ids.length) return spor();
  const bar = $('quizBar'); settGlassForQuiz(false); oppdaterMaterialer();
  if (q.runde === 1) { S.res[q.type] = Math.max(S.res[q.type] ?? 0, q.score); S.res[q.type + 'Feil'] = q.feil.map(id => del(id).navn); lagre(); renderOppdrag(); }
  if (q.feil.length) {
    const n = q.feil.length;
    bar.className = 'quizPanel'; bar.innerHTML = `${q.runde === 1 ? `Du fikk ${q.score} av ${q.ids.length} riktige.` : 'Bra jobbet!'} Nå øver vi på ${n === 1 ? 'delen' : 'de ' + n + ' delene'} du bommet på.<div class="opts"><button class="btn" type="button" id="qOv">Øv på ${n === 1 ? 'den' : 'dem'} →</button></div>`;
    $('qOv').onclick = () => { q.ids = stokk(q.feil); q.feil = []; q.i = 0; q.runde++; spor(); }; $('qOv').focus({ preventScroll: true });
  } else {
    bar.className = 'quizPanel ok';
    bar.innerHTML = q.runde === 1 ? `Full pott! ${q.score} av ${q.ids.length} riktige.<small>Prøv den andre testen også.</small>` : `Nå kan du alle delene du bommet på! Resultatet fra første runde (${S.res[q.type]} av ${ANT}) er lagret.<small>Ta testen på nytt for å forbedre resultatet.</small>`;
    state.quiz = null; laas(false); renderList(); quizBtns.forEach(b => b.textContent = quizTekst[b.dataset.type]);
  }
}
quizBtns.forEach(b => b.onclick = () => { if (state.quiz && state.quiz.type === b.dataset.type) stoppQuiz(); else { if (state.quiz) stoppQuiz(); startQuiz(b.dataset.type); } });
if (!renderer) $('quizBtn').disabled = true;

// ---------- Kvittering ----------
$('elevNavn').value = S.navn || '';
$('elevNavn').oninput = e => { S.navn = e.target.value; lagre(); };
$('kvittBtn').onclick = () => {
  const navn = $('elevNavn').value.trim() || '(navn ikke fylt inn)';
  const t = new Date().toLocaleString('nb-NO', { dateStyle: 'short', timeStyle: 'short' });
  const linjer = ['KVITTERING – Hjertet i 3D (gjestefag HO, Vg1)', `Elev: ${navn}`, `Tidspunkt: ${t}`, '', 'OPPDRAG'];
  oppdragListe().forEach(([tx, ok]) => linjer.push(`${ok ? '[x]' : '[ ]'} ${tx}`));
  ['finn', 'navn'].forEach(ty => { if (S.res[ty + 'Feil']?.length) linjer.push(`  ${ty === 'finn' ? 'Test 1' : 'Test 2'} – bommet på: ${S.res[ty + 'Feil'].join(', ')}`); });
  linjer.push('', 'TENK – MINE SVAR');
  TENK.forEach((q, i) => linjer.push(`${i + 1}. ${q.q}`, `Svar: ${(S.tenk[i] || '').trim() || '(ikke besvart)'}`, ''));
  $('kvittTekst').textContent = linjer.join('\n'); $('kvitt').hidden = false; $('kopiert').textContent = '';
};
$('kopierBtn').onclick = async () => { try { await navigator.clipboard.writeText($('kvittTekst').textContent); $('kopiert').textContent = 'Kopiert!'; } catch (e) { $('kopiert').textContent = 'Kunne ikke kopiere – merk teksten og kopier selv.'; } };
$('skrivUt').onclick = () => window.print();

// ---------- Peking ----------
const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(); let ned = null, sisteTreff = [];
function pek(ev) {
  const r = renderer.domElement.getBoundingClientRect();
  ptr.set((ev.clientX - r.left) / r.width * 2 - 1, -(ev.clientY - r.top) / r.height * 2 + 1);
  ray.setFromCamera(ptr, camera);
  const treff = ray.intersectObjects(Object.values(P).filter(d => d.gruppe.visible).map(d => d.mesh), false);
  sisteTreff = [...new Set(treff.map(h => h.object.userData.part))];
  const fast = (treff[0] && treff[0].object.material.opacity < 0.5) ? treff.find(h => h.object.material.opacity >= 0.5) : null;
  return (fast || treff[0])?.object.userData.part || null;
}
if (renderer) {
  const cv = renderer.domElement, tip = $('tip');
  cv.addEventListener('pointerdown', e => ned = { x: e.clientX, y: e.clientY });
  cv.addEventListener('pointerup', e => {
    if (!ned) return; const flyttet = Math.hypot(e.clientX - ned.x, e.clientY - ned.y); ned = null; if (flyttet > 6) return;
    const pid = pek(e);
    if (state.quiz) { if (state.quiz.type === 'finn' && pid) svar(pid, sisteTreff); return; }
    velg(pid, false);
  });
  cv.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || ned) { tip.style.display = 'none'; return; }
    const pid = pek(e); host.classList.toggle('hoverPart', !!pid);
    if (pid && (!state.quiz || state.quiz.type !== 'finn')) { const r = host.getBoundingClientRect(); tip.textContent = del(pid).navn; tip.style.display = 'block'; tip.style.left = (e.clientX - r.left + 14) + 'px'; tip.style.top = (e.clientY - r.top + 10) + 'px'; } else tip.style.display = 'none';
  });
  cv.addEventListener('pointerleave', () => tip.style.display = 'none');
}

// ---------- Løkke ----------
function storrelse() { if (!renderer) return; const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); }
addEventListener('resize', storrelse);
const klokke = new THREE.Clock();
function loop() {
  const dt = Math.min(klokke.getDelta(), 0.05);
  if (Math.abs(state.t - state.target) > 0.001) { state.t += Math.sign(state.target - state.t) * Math.min(Math.abs(state.target - state.t), dt * 0.9); brukSprengning(); }
  if (camAnim) { camAnim.t = Math.min(1, camAnim.t + dt * 1.6); const k = ease(camAnim.t); controls.target.lerpVectors(camAnim.fraT, camAnim.tilT, k); camera.position.lerpVectors(camAnim.fraP, camAnim.tilP, k); if (camAnim.t >= 1) camAnim = null; }
  slag(dt); flytBlod(dt);
  if (controls) controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

settPuls(maling.hvile || 72, false);
visInfo(null); renderList();
if (renderer) {
  storrelse();
  Promise.all([
    new GLTFLoader().loadAsync('./hjerte.glb'),
    fetch('./blodbane.json').then(r => r.json()),
  ]).then(([gltf, bane]) => {
    byggDeler(gltf); byggBlodstrom(bane);
    $('lasting').remove();
    oppdaterMaterialer(); renderList(); brukSprengning(); tilpass(true, new THREE.Vector3(...VISNING.forfra));
    window.__hjerteKlar = true;
    loop();
  }).catch(e => { $('lasting').textContent = 'Klarte ikke å laste 3D-hjertet. Last siden på nytt.'; console.error(e); });
}
