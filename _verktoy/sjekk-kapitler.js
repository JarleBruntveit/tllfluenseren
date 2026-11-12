#!/usr/bin/env node
/* =====================================================================
   KONTROLL AV TLL-KAPITLER
   Sjekker at alle kapitler i felles/kapitler.js følger kapittelmalen.

   Kjør fra rotmappen i repoet:
     node _verktoy/sjekk-kapitler.js          (alle kapitler)
     node _verktoy/sjekk-kapitler.js kap6     (bare ett kapittel)

   FEIL  = må rettes før publisering (siden kan krasje eller vise feil).
   ADVARSEL = bør ses på, men stopper ikke publisering.
   Mappa _verktoy/ blir ikke publisert på nettsiden.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const ROT = path.resolve(__dirname, '..');
const FAG = path.join(ROT, 'transport-logistikk-lofteoperasjoner');
const FELLES = path.join(FAG, 'felles');

let feil = 0, adv = 0;
const F = (k, m) => { feil++; console.log(`  ✗ FEIL      ${k}: ${m}`); };
const A = (k, m) => { adv++;  console.log(`  ! ADVARSEL  ${k}: ${m}`); };
const les = p => fs.readFileSync(p, 'utf8');
const finnes = p => fs.existsSync(p);

/* ---------- Hent det motoren faktisk støtter ---------- */
const motor = les(path.join(FELLES, 'motor.js'));
const runLinje = (motor.match(/const RUN = \{([^}]+)\}/) || [])[1] || '';
const TYPER = new Set([...runLinje.matchAll(/(\w+)\s*:/g)].map(m => m[1]));
const genBlokk = motor.slice(motor.indexOf('const GEN = {'));
const GEN = new Set([...genBlokk.slice(0, genBlokk.indexOf('\n};')).matchAll(/^\s{2}(\w+)\s*\(/gm)].map(m => m[1]));
const FASER = new Set(['laer', 'ov', 'tenk', 'voks']);
const UTEN_NIVA = new Set(['flash', 'voks']);   // disse vises på alle nivåer

/* ---------- Kapittellista ---------- */
const sandbox = { window: {} };
sandbox.window.TLL = {};
new Function('window', 'TLL', les(path.join(FELLES, 'kapitler.js')))(sandbox.window, sandbox.window.TLL);
const KAPITLER = (sandbox.window.TLL.KAPITLER || []).map(k => Object.assign({ publisert: true }, k));
const bare = process.argv[2];
/* Et kapittel under arbeid (ikke i kapitler.js ennå) kan sjekkes med navnet sitt */
if (bare && !KAPITLER.some(k => k.id === bare)) {
  const nrUarbeid = parseInt(bare.replace(/\D/g, ''), 10);
  if (fs.existsSync(path.join(FAG, bare))) KAPITLER.push({ id: bare, nr: nrUarbeid, tittel: '(ikke publisert ennå)', sti: bare + '/', publisert: false });
  else { console.log(`Fant ikke kapitlet ${bare}.`); process.exit(1); }
}

const fagside = les(path.join(FAG, 'index.html'));
const sitemap = finnes(path.join(ROT, 'sitemap.xml')) ? les(path.join(ROT, 'sitemap.xml')) : '';
let katalog = null;
try { katalog = JSON.parse(les(path.join(ROT, 'ressursbank', 'katalog.json'))); } catch (e) { /* valgfri */ }

console.log(`Motoren støtter ${TYPER.size} oppgavetyper og ${GEN.size} regnegeneratorer.`);

/* ---------- Kapitler som har mappe, men mangler i lista ---------- */
for (const d of fs.readdirSync(FAG)) {
  if (/^kap\d+$/.test(d) && !KAPITLER.some(k => k.id === d)) {
    A(d, `mappa finnes, men kapitlet står ikke i felles/kapitler.js (vises ikke i prøve/lærerside)`);
  }
}

for (const kap of KAPITLER) {
  if (bare && kap.id !== bare) continue;
  console.log(`\n▶ ${kap.id} – ${kap.tittel}`);
  const mappe = path.join(FAG, kap.sti || kap.id + '/');
  const K = kap.id;
  if (!finnes(mappe)) { F(K, `mappa ${kap.sti} finnes ikke`); continue; }

  /* --- index.html --- */
  const idxSti = path.join(mappe, 'index.html');
  if (!finnes(idxSti)) F(K, 'index.html mangler');
  else {
    const idx = les(idxSti);
    const dk = (idx.match(/data-kapittel="([^"]+)"/) || [])[1];
    if (dk !== K) F(K, `index.html har data-kapittel="${dk}", skal være "${K}"`);
    if (!idx.includes('data-side="kapittel"')) F(K, 'index.html mangler data-side="kapittel"');
    for (const fil of ['../felles/kapitler.js', '../felles/fremdrift.js', 'data.js', '../felles/motor.js', '../felles/motor.css']) {
      if (!idx.includes(fil)) F(K, `index.html lenker ikke til ${fil}`);
    }
    const t = (idx.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
    if (!t.includes(`Kap ${kap.nr}`)) A(K, `tittelen i index.html («${t}») nevner ikke «Kap ${kap.nr}»`);
    const og = (idx.match(/og:url" content="([^"]+)"/) || [])[1] || '';
    if (!og.endsWith(`/${K}/`)) A(K, `og:url peker til ${og || '(mangler)'}`);
  }

  /* --- data.js --- */
  const dataSti = path.join(mappe, 'data.js');
  if (!finnes(dataSti)) { F(K, 'data.js mangler'); continue; }
  const dataTekst = les(dataSti);
  const todo = (dataTekst.match(/TODO/g) || []).length;
  if (todo) (kap.publisert ? F : A)(K, `data.js inneholder fortsatt ${todo} «TODO» fra malen`);
  let d;
  try {
    const T = { registrer: x => { d = x; } };
    new Function('TLL', 'window', les(dataSti))(T, { TLL: T });
  } catch (e) { F(K, `data.js har en JavaScript-feil: ${e.message}`); continue; }
  if (!d) { F(K, 'data.js kaller ikke TLL.registrer({...})'); continue; }

  if (d.id !== K) F(K, `data.js har id '${d.id}', skal være '${K}'`);
  if (d.nr !== kap.nr) F(K, `data.js har nr ${d.nr}, kapitler.js sier ${kap.nr}`);
  if (kap.publisert && d.tittel !== kap.tittel) A(K, `tittelen i data.js og kapitler.js er ulike`);
  for (const felt of ['fag', 'tittel', 'ingress', 'kompetansemal', 'ressurser', 'temaer']) {
    if (d[felt] == null) F(K, `data.js mangler feltet «${felt}»`);
  }
  const km = Array.isArray(d.kompetansemal) ? d.kompetansemal : [d.kompetansemal].filter(Boolean);
  km.forEach((m, i) => { if (!m.kode || !m.tekst) F(K, `kompetansemal[${i}] må ha både kode og tekst`); });
  if (d.ressurser && !d.ressurser.ndlaEmne) A(K, 'ressurser.ndlaEmne mangler (lenke til NDLA-emnet)');
  (d.filmLenker || []).forEach((f, i) => { if (!f.tittel || !f.url) F(K, `filmLenker[${i}] må ha tittel og url`); });

  const temaer = d.temaer || [];
  if (!temaer.length) F(K, 'kapitlet har ingen temaer');
  const aktIder = new Set();
  const lokIder = new Set();

  temaer.forEach((t, ti) => {
    const T = `${K}/${t.id || '(tema ' + (ti + 1) + ')'}`;
    if (t.id !== `t${ti + 1}`) F(T, `tema nr. ${ti + 1} skal ha id 't${ti + 1}' (podkast og lenker bruker rekkefølgen)`);
    for (const felt of ['lok', 'tittel', 'kort', 'mal', 'punkter', 'aktiviteter']) {
      if (t[felt] == null) F(T, `mangler feltet «${felt}»`);
    }
    if (t.lok) {
      if (!/^[A-Z]-\d{2}$/.test(t.lok)) A(T, `lok '${t.lok}' følger ikke mønsteret 'A-01'`);
      if (lokIder.has(t.lok)) F(T, `lok '${t.lok}' er brukt to ganger`);
      lokIder.add(t.lok);
    }
    if (!t.bok) A(T, 'mangler «bok» (henvisning til læreboka)');
    if (!t.ndla || !t.ndla.length) A(T, 'har ingen NDLA-lenker');
    if (Array.isArray(t.mal) && (t.mal.length < 2 || t.mal.length > 5)) A(T, `har ${t.mal.length} læringsmål (anbefalt 2–4)`);

    const akt = t.aktiviteter || [];
    const faser = new Set();
    const nivaer = new Set();
    akt.forEach((a, ai) => {
      const N = `${T}/${a.id || '#' + (ai + 1)}`;
      if (!a.id) F(N, 'aktiviteten mangler id');
      else {
        if (aktIder.has(a.id)) F(N, `id '${a.id}' er brukt to ganger i kapitlet (fremdrift blir feil)`);
        aktIder.add(a.id);
        if (!a.id.startsWith(t.id + '-')) A(N, `id bør starte med '${t.id}-'`);
      }
      if (!TYPER.has(a.type)) { F(N, `ukjent oppgavetype '${a.type}'`); return; }
      if (!a.tittel) F(N, 'mangler tittel');
      if (a.fase && !FASER.has(a.fase)) F(N, `ukjent fase '${a.fase}'`);
      if (!UTEN_NIVA.has(a.type)) {
        if (![1, 2, 3].includes(a.nivaa)) F(N, `nivaa må være 1, 2 eller 3 (er ${a.nivaa})`);
        else nivaer.add(a.nivaa);
      }
      sjekkType(N, a);
      faser.add(a.fase || ({ flash: 'laer', voks: 'voks', check: 'tenk', case: 'tenk', sim: 'tenk', reflect: 'tenk' }[a.type] || 'ov'));
    });

    const erBank = t.oppgavebank === true || /^(oppgavebank|øvelsesbank)/i.test(t.tittel || '');
    if (!erBank) {
      for (const f of ['laer', 'ov', 'tenk', 'voks']) if (!faser.has(f)) A(T, `mangler aktivitet i fasen «${{ laer: 'Lær', ov: 'Øv', tenk: 'Tenk', voks: 'Voks' }[f]}»`);
      for (const n of [1, 2, 3]) if (!nivaer.has(n)) A(T, `mangler aktivitet på nivå ${n} (${['', 'Nybegynner', 'Trygg', 'Ekspert'][n]})`);
    }

    /* lokale lenker i tekstfelt (dokumenter/, ovelsesbank/ osv.) */
    const tekst = JSON.stringify(t);
    for (const m of tekst.matchAll(/href=\\"(?!https?:|\/|#|mailto:)([^"\\#?]+)/g)) {
      const mål = path.join(mappe, m[1]);
      if (!finnes(mål) && !finnes(path.join(mål, 'index.html'))) F(T, `lenken '${m[1]}' peker til en fil som ikke finnes`);
    }
  });

  /* --- podkast --- */
  const lyd = path.join(mappe, 'lyd');
  if (finnes(lyd)) {
    for (const f of fs.readdirSync(lyd)) {
      const m = f.match(/^episode-(\d+)\.(mp3|m4a)$/);
      if (/\.(mp3|m4a|wav)$/.test(f) && !m) A(K, `lydfila lyd/${f} har feil navn (skal være episode-N.mp3)`);
      if (m && +m[1] > temaer.length) A(K, `lyd/${f} finnes, men kapitlet har bare ${temaer.length} temaer`);
      if (m && fs.statSync(path.join(lyd, f)).size > 25 * 1024 * 1024) A(K, `lyd/${f} er over 25 MB`);
    }
  }

  /* --- kobling til resten av nettstedet --- */
  if (!kap.publisert) { console.log('  · Ikke publisert ennå: hopper over sjekk av fagside, sitemap og ressursbank.'); continue; }
  if (!fagside.includes(`href="${K}/"`)) A(K, `fagsiden (transport-logistikk-lofteoperasjoner/index.html) har ikke et klikkbart kort til ${K}/`);
  if (sitemap && !sitemap.includes(`/transport-logistikk-lofteoperasjoner/${K}/`)) A(K, 'kapitlet mangler i sitemap.xml');
  if (katalog && Array.isArray(katalog.topics)) {
    const iKat = katalog.topics.filter(x => x.id && x.id.startsWith(K + '-'));
    if (!iKat.length) A(K, 'kapitlet har ingen temaer i ressursbank/katalog.json');
    else {
      temaer.forEach(t => {
        const k = iKat.find(x => x.id === `${K}-${t.id}`);
        if (!k) A(K, `ressursbanken mangler ${K}-${t.id} («${t.tittel}»)`);
        else if (k.title !== t.tittel) A(K, `ressursbanken kaller ${K}-${t.id} «${k.title}», kapitlet sier «${t.tittel}»`);
      });
    }
  }
}

/* ---------- Kontroll per oppgavetype ---------- */
function sjekkType(N, a) {
  const liste = (felt, min) => {
    if (!Array.isArray(a[felt]) || a[felt].length < (min || 1)) { F(N, `«${felt}» må være en liste med minst ${min || 1} element`); return false; }
    return true;
  };
  switch (a.type) {
    case 'flash': if (liste('kort')) a.kort.forEach((k, i) => { if (!Array.isArray(k) || k.length < 2) F(N, `kort[${i}] må være [begrep, forklaring]`); }); break;
    case 'quiz':
      if (liste('sp')) a.sp.forEach((s, i) => {
        if (!s.q || !Array.isArray(s.a) || s.a.length < 2) F(N, `sp[${i}] må ha q og minst to svar i a`);
        else if (!(Number.isInteger(s.r) && s.r >= 0 && s.r < s.a.length)) F(N, `sp[${i}] har ugyldig riktig svar r=${s.r}`);
        if (!s.f) A(N, `sp[${i}] mangler forklaring f`);
      });
      break;
    case 'tf': if (liste('ps')) a.ps.forEach((p, i) => { if (typeof p[1] !== 'boolean') F(N, `ps[${i}] må være [påstand, true/false, forklaring]`); }); break;
    case 'fill': if (!/\[\[.+?\]\]/.test(a.tekst || '')) F(N, 'teksten har ingen [[tomrom]]'); break;
    case 'match': if (liste('par', 2)) a.par.forEach((p, i) => { if (!Array.isArray(p) || p.length !== 2) F(N, `par[${i}] må være [venstre, høyre]`); }); break;
    case 'order': liste('steg', 2); break;
    case 'sort':
      if (liste('kat', 2) && liste('items', 2)) a.items.forEach((it, i) => {
        if (!Number.isInteger(it[1]) || it[1] < 0 || it[1] >= a.kat.length) F(N, `items[${i}] peker til kategori ${it[1]}, som ikke finnes`);
      });
      break;
    case 'calc':
      if (!GEN.has(a.gen)) F(N, `regnegeneratoren '${a.gen}' finnes ikke i motor.js (finnes: ${[...GEN].join(', ')})`);
      break;
    case 'check':
      if (liste('kolonner') && liste('rader')) a.rader.forEach((r, i) => {
        if (!Array.isArray(r.c) || typeof r.avvik !== 'boolean') F(N, `rader[${i}] må ha c (celler) og avvik (true/false)`);
      });
      break;
    case 'hotspot': {
      const soner = new Set([...(a.svg || '').matchAll(/data-z="([^"]+)"/g)].map(m => m[1]));
      if (!soner.size) F(N, 'tegningen (svg) har ingen klikkbare områder med data-z');
      if (liste('sp')) a.sp.forEach((s, i) => { if (!soner.has(s.z)) F(N, `sp[${i}] peker til området '${s.z}', som ikke finnes i tegningen`); });
      break;
    }
    case 'case':
      if (!a.intro) A(N, 'mangler intro');
      if (liste('steg')) a.steg.forEach((s, i) => {
        if (!s.q || !Array.isArray(s.valg) || s.valg.length < 2) F(N, `steg[${i}] må ha q og minst to valg`);
        else if (!s.valg.some(v => v.ok)) F(N, `steg[${i}] har ingen riktige valg (ok:true)`);
      });
      break;
    case 'reflect': if (!a.q) F(N, 'mangler spørsmålet q'); liste('punkter'); break;
    case 'voks': liste('tekst'); liste('sporsmal'); if (!a.handling) A(N, 'mangler «handling»'); break;
  }
}

console.log(`\n${feil ? '✗' : '✓'} ${feil} feil, ${adv} advarsler.`);
process.exit(feil ? 1 : 0);
