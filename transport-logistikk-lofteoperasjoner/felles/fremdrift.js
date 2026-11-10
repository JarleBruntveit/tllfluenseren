/* Fremdrift og elevrapport for TLLfluenseren.
   Alt lagres bare i elevens nettleser (localStorage). Ingenting sendes noe sted.
   Eleven kan laste ned en rapport (fil eller tekstkode) og levere den i Teams.
   Læreren åpner rapportene på lærersiden, som også bare jobber lokalt i nettleseren. */
(function(){
'use strict';
const TLL = window.TLL = window.TLL || {};
TLL.kapitler = TLL.kapitler || {};            // kapitteldata registrert av data.js
TLL.registrer = k => { TLL.kapitler[k.id] = k; };

const PREFIX = 'tll-';
const PROVER = 'tll-prover';
const ls = {
  get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set(k,v){ try { localStorage.setItem(k, v); return true; } catch(e){ return false; } },
  del(k){ try { localStorage.removeItem(k); } catch(e){} },
  keys(){ const out = []; try { for (let i = 0; i < localStorage.length; i++) out.push(localStorage.key(i)); } catch(e){} return out; }
};
TLL.ls = ls;

/* ---------- lagring per kapittel ---------- */
const tom = () => ({ lvl: 0, best: {}, log: {}, saveText: false });
TLL.lesLager = id => {
  let s = tom();
  try { const r = JSON.parse(ls.get(PREFIX + id)); if (r) s = Object.assign(s, r); } catch(e){}
  s.best = s.best || {}; s.log = s.log || {};
  return s;
};
TLL.skrivLager = (id, s) => ls.set(PREFIX + id, JSON.stringify(s));
TLL.registrerResultat = (id, store, actId, pct) => {
  pct = Math.max(0, Math.min(100, Math.round(pct)));
  const now = new Date().toISOString();
  const l = store.log[actId] || { n: 0, forste: now };
  l.n++; l.siste = now; l.sist = pct;
  store.log[actId] = l;
  if (!(store.best[actId] >= pct)) store.best[actId] = pct;
  TLL.skrivLager(id, store);
};
TLL.tekstNokkel = (id, actId) => PREFIX + id + '-txt-' + actId;
TLL.tekstNokler = id => ls.keys().filter(k => k && k.indexOf(PREFIX + id + '-txt-') === 0);

/* ---------- prøver ---------- */
TLL.lesProver = () => { try { return JSON.parse(ls.get(PROVER)) || []; } catch(e){ return []; } };
TLL.lagreProve = r => { const all = TLL.lesProver(); all.push(r); ls.set(PROVER, JSON.stringify(all.slice(-50))); };

/* ---------- rapport ---------- */
function fnv(str){ let h = 0x811c9dc5; for (let i = 0; i < str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); }
const kropp = r => JSON.stringify({ t: r.type, v: r.versjon, f: r.fag, n: r.navn, k: r.klasse, d: r.laget, kap: r.kapitler, p: r.prover });
TLL.sjekksum = r => fnv('tllfluenseren|' + kropp(r));

/* minne: { kapId: { actId: tekst } } for tekster som bare ligger i minnet (delt PC) */
TLL.lagRapport = ({ navn, klasse, medTekst, minne }) => {
  const kapIds = new Set(Object.keys(TLL.kapitler));
  (TLL.KAPITLER || []).forEach(k => kapIds.add(k.id));
  ls.keys().forEach(k => { const m = /^tll-(kap\d+)$/.exec(k || ''); if (m) kapIds.add(m[1]); });
  const kapitler = {};
  kapIds.forEach(id => {
    const s = TLL.lesLager(id);
    const res = {};
    Object.keys(s.best).forEach(a => {
      const l = s.log[a] || {};
      res[a] = { best: s.best[a], sist: l.sist != null ? l.sist : s.best[a], n: l.n || 1, forste: l.forste || null, siste: l.siste || null };
    });
    const tekster = {};
    if (medTekst){
      TLL.tekstNokler(id).forEach(k => { const v = ls.get(k); if (v && v.trim()) tekster[k.split('-txt-')[1]] = v.slice(0, 5000); });
      const m = (minne && minne[id]) || {};
      Object.keys(m).forEach(a => { if (m[a] && m[a].trim()) tekster[a] = m[a].slice(0, 5000); });
    }
    if (Object.keys(res).length || Object.keys(tekster).length) kapitler[id] = { niva: s.lvl || 0, resultater: res, tekster };
  });
  const r = {
    type: 'tllfluenseren-fremdrift', versjon: 1, fag: (TLL.FAG && TLL.FAG.id) || 'tll',
    navn: String(navn || '').trim().slice(0, 60), klasse: String(klasse || '').trim().slice(0, 20),
    laget: new Date().toISOString(), kapitler, prover: TLL.lesProver()
  };
  r.kontroll = TLL.sjekksum(r);
  return r;
};
const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/æ/g,'ae').replace(/ø/g,'o').replace(/å/g,'a').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'elev';
TLL.filnavn = r => `fremdrift-${slug(r.navn)}-${r.laget.slice(0,10)}.pdf`;
TLL.lastNed = async r => {
  const { lagRapportPdf } = await import('/transport-logistikk-lofteoperasjoner/felles/rapport-pdf.js?v=1');
  const blob = await lagRapportPdf(r, TLL);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = TLL.filnavn(r);
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
};
const b64e = s => btoa(unescape(encodeURIComponent(s)));
const b64d = s => decodeURIComponent(escape(atob(s)));
TLL.rapportKode = r => 'TLLRAPPORT:' + b64e(JSON.stringify(r));

/* PDF-er fra TLL har rapportkoden i dokumentets Keywords-felt. */
TLL.lesRapporter = tekst => {
  const ut = [];
  const legg = (obj, kilde) => {
    if (!obj || obj.type !== 'tllfluenseren-fremdrift' || typeof obj.kapitler !== 'object') { ut.push({ feil: 'Ikke en fremdriftsrapport', kilde }); return; }
    ut.push({ data: obj, endret: TLL.sjekksum(obj) !== obj.kontroll, kilde });
  };
  const t = String(tekst || '').trim();
  if (!t) return ut;
  if (t[0] === '{'){ try { legg(JSON.parse(t), 'fil'); } catch(e){ ut.push({ feil: 'Kunne ikke lese filen', kilde: 'fil' }); } return ut; }
  const pdf = t.startsWith('%PDF-');
  const koder = pdf
    ? Array.from(t.matchAll(/\/Keywords\s*\((TLLRAPPORT:[A-Za-z0-9+/=]+)\)/g), match => match[1])
    : t.match(/TLLRAPPORT:[A-Za-z0-9+/=]+/g) || [];
  if (!koder.length) ut.push({ feil: 'Fant ingen rapportkode', kilde: 'tekst' });
  const kilde = pdf ? 'fil' : 'kode';
  koder.forEach(k => { try { legg(JSON.parse(b64d(k.slice(11))), kilde); } catch(e){ ut.push({ feil: 'Ødelagt rapportkode', kilde }); } });
  return ut;
};

/* Laster datafilene til kapitlene i lista (brukes av prøve- og lærersiden). */
TLL.lastKapitler = (rot, ider) => Promise.all((ider || TLL.KAPITLER.map(k => k.id)).map(id => new Promise(res => {
  if (TLL.kapitler[id]) return res();
  const k = TLL.KAPITLER.find(x => x.id === id); if (!k) return res();
  const s = document.createElement('script'); s.src = rot + k.sti + 'data.js';
  s.onload = res; s.onerror = res; document.head.appendChild(s);
})));
})();
