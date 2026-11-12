/* Skjæredata – elevrapport (felles for elevsiden og lærersiden).
   Rapporten lages og leses bare i nettleseren. Ingenting sendes noe sted.
   PDF-en har rapportkoden i dokumentets Keywords-felt, slik som de andre TLL-rapportene. */

export const TYPE = 'tllfluenseren-skjaeredata';
export const PREFIKS = 'SKJAERERAPPORT:';
export const NIVAER = [
  { id: 'nybegynner', navn: 'Nybegynner' },
  { id: 'trygg', navn: 'Trygg' },
  { id: 'ekspert', navn: 'Ekspert' }
];
export const KATEGORIER = { begrep: 'Begreper og enheter', fres: 'Fresing', dre: 'Dreiing', bor: 'Boring', plan: 'Planlegging og feilsøking' };
export const FEILTYPER = {
  tusen: { navn: 'Glemte ×1000 / ÷1000 (mm og m)', tiltak: 'Repeter enhetene: D står i mm, Vc i meter per minutt. Derfor ganger vi med 1000 når vi regner ut n.' },
  radius: { navn: 'Brukte radius i stedet for diameter', tiltak: 'Vis forskjellen på r og D på et ekte verktøy. Mål diameteren med skyvelære.' },
  pi: { navn: 'Glemte π', tiltak: 'Omkretsen er π · D. La eleven rulle et rundt emne en runde langs en linjal.' },
  tenner: { navn: 'Glemte antall tenner (z)', tiltak: 'Tell skjærene på en fres sammen med eleven. vf = fz · z · n.' },
  minutt: { navn: 'Blandet minutter og sekunder', tiltak: 'Øv på å gjøre om tid: 1 min = 60 s.' },
  regnefeil: { navn: 'Annen regnefeil eller avrunding', tiltak: 'La eleven skrive formelen og innsatte tall før kalkulatoren brukes.' },
  begrep: { navn: 'Forvekslet begreper', tiltak: 'Bruk simulatoren: la eleven forklare hver pil (Vc, n, f, D) med egne ord.' }
};

function fnv(str) { let h = 0x811c9dc5; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); }
const kropp = r => JSON.stringify({ t: r.type, v: r.versjon, n: r.navn, k: r.klasse, d: r.laget, ni: r.nivaer, ka: r.kategorier, fo: r.forutsi, h: r.hint, f: r.feil, re: r.refleksjon });
export const sjekksum = r => fnv('tllfluenseren-skjaeredata|' + kropp(r));

const b64e = s => btoa(unescape(encodeURIComponent(s)));
const b64d = s => decodeURIComponent(escape(atob(s)));
export const rapportKode = r => PREFIKS + b64e(JSON.stringify(r));

/* Leser én eller flere rapporter fra PDF-tekst, JSON eller innlimte koder. */
export function lesRapporter(tekst, kildeNavn = '') {
  const ut = [];
  const legg = (obj, kilde) => {
    if (!obj || obj.type !== TYPE) { ut.push({ feil: 'Ikke en skjæredata-rapport', kilde: kildeNavn || kilde }); return; }
    ut.push({ data: obj, endret: sjekksum(obj) !== obj.kontroll, kilde: kildeNavn || kilde });
  };
  const t = String(tekst || '').trim();
  if (!t) return ut;
  if (t[0] === '{') { try { legg(JSON.parse(t), 'fil'); } catch (e) { ut.push({ feil: 'Kunne ikke lese filen', kilde: kildeNavn }); } return ut; }
  const pdf = t.startsWith('%PDF-');
  const re = new RegExp(PREFIKS + '[A-Za-z0-9+/=]+', 'g');
  const koder = pdf
    ? Array.from(t.matchAll(/\/Keywords\s*\((SKJAERERAPPORT:[A-Za-z0-9+/=]+)\)/g), m => m[1])
    : (t.match(re) || []);
  if (!koder.length) ut.push({ feil: pdf ? 'PDF-en har ingen skjæredata-kode' : 'Fant ingen rapportkode', kilde: kildeNavn || (pdf ? 'fil' : 'tekst') });
  koder.forEach(k => { try { legg(JSON.parse(b64d(k.slice(PREFIKS.length))), pdf ? 'fil' : 'kode'); } catch (e) { ut.push({ feil: 'Ødelagt rapportkode', kilde: kildeNavn }); } });
  return ut;
}

/* ---------- PDF ---------- */
const vendor = '/assets/vendor/jspdf/';
let stotte;
function hentStotte() {
  stotte ??= Promise.all([
    import(vendor + 'jspdf.umd.min.js'),
    fetch(vendor + 'OpenSans-Regular.ttf').then(async r => {
      if (!r.ok) throw new Error('Skrifttypen kunne ikke lastes.');
      const b = new Uint8Array(await r.arrayBuffer());
      return Array.from(b, x => String.fromCharCode(x)).join('');
    })
  ]).then(([, font]) => ({ jsPDF: window.jspdf.jsPDF, font })).catch(e => { stotte = undefined; throw e; });
  return stotte;
}
const datoFmt = new Intl.DateTimeFormat('nb-NO', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Oslo' });
const pst = (a, b) => b ? Math.round(100 * a / b) + ' %' : '–';

export async function lagPdf(r) {
  const { jsPDF, font } = await hentStotte();
  const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true, putOnlyUsedFonts: true });
  doc.addFileToVFS('OpenSans-Regular.ttf', font);
  doc.addFont('OpenSans-Regular.ttf', 'OpenSans', 'normal');
  doc.setFont('OpenSans');
  doc.setDocumentProperties({ title: 'Skjæredata – elevrapport', creator: 'TLLfluenseren.no', keywords: rapportKode(r) });
  const m = 48, W = doc.internal.pageSize.getWidth(), H = doc.internal.pageSize.getHeight(), bredde = W - 2 * m;
  let y;
  const ny = () => { doc.setFillColor('#F3B84C'); doc.rect(m, 39, 28, 4, 'F'); doc.setFontSize(9); doc.setTextColor('#405160'); doc.text('TLLFLUENSEREN.NO · GJESTEFAG INT', m + 37, 44); y = 72; };
  const skriv = (tekst, { size = 11, gap = 4, color = '#18232F' } = {}) => {
    doc.setFontSize(size); doc.setTextColor(color);
    const lh = size * 1.38;
    for (const linje of doc.splitTextToSize(String(tekst).normalize('NFC'), bredde)) {
      if (y + lh > H - 60) { doc.addPage(); ny(); doc.setFontSize(size); doc.setTextColor(color); }
      doc.text(linje, m, y + size); y += lh;
    }
    y += gap;
  };
  ny();
  skriv('Skjæredata – elevrapport', { size: 26, gap: 8 });
  skriv('Elev: ' + (r.navn || '–'));
  skriv('Klasse: ' + (r.klasse || 'Ikke oppgitt'));
  skriv('Laget: ' + datoFmt.format(new Date(r.laget)), { gap: 14 });
  skriv('Nivåer', { size: 15, gap: 4 });
  for (const n of NIVAER) {
    const v = r.nivaer?.[n.id];
    skriv(`${n.navn}: ${v && v.forsok ? `beste ${v.best} %, siste ${v.siste} %, ${v.forsok} forsøk${v.bestatt ? ' – BESTÅTT' : ''}` : 'ikke prøvd'}`, { gap: 2 });
  }
  y += 8;
  skriv('Resultat per område (riktige svar / oppgaver)', { size: 15, gap: 4 });
  for (const [k, navn] of Object.entries(KATEGORIER)) {
    const v = r.kategorier?.[k]; if (!v || !v.totalt) continue;
    skriv(`${navn}: ${v.riktig} av ${v.totalt} (${pst(v.riktig, v.totalt)})`, { gap: 2 });
  }
  y += 8;
  skriv(`Forutsi-utfordringer: ${r.forutsi?.riktig || 0} riktige av ${r.forutsi?.fullfort?.length || 0} gjennomførte (totalt ${r.forutsi?.antall || 8}).`);
  skriv(`Hint brukt: ${r.hint || 0}`, { gap: 10 });
  const feil = Object.entries(r.feil || {}).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
  skriv('Typiske feil', { size: 15, gap: 4 });
  if (!feil.length) skriv('Ingen registrerte regnefeil.');
  feil.forEach(([k, n]) => skriv(`${FEILTYPER[k]?.navn || k}: ${n}`, { gap: 2 }));
  y += 10;
  const ref = r.refleksjon || {};
  if (Object.values(ref).some(t => t && t.trim())) {
    skriv('Refleksjon (Voks)', { size: 15, gap: 4 });
    for (const [sp, svar] of Object.entries(ref)) {
      if (!svar || !svar.trim()) continue;
      skriv(sp, { size: 10, color: '#405160', gap: 2 });
      skriv(svar, { gap: 8 });
    }
  }
  y += 6;
  skriv('Kontrollkode: ' + r.kontroll + ' · Rapporten kan leses inn på lærersiden for skjæredata.', { size: 8, color: '#6b7a88' });
  return doc.output('blob');
}
