/* Lås for gjesterommene på TLLfluenseren.
   Lærerinnholdet i hvert gjestefag er kryptert med AES-GCM (256 bit).
   Innholdsnøkkelen er låst to ganger: én gang med fagets passord og én gang med adminpassordet.
   Dermed kan administrator åpne alle rom og bytte et fags passord uten å kjenne det gamle.
   Passordnøklene lages med PBKDF2-SHA256, 600 000 iterasjoner (samme nivå som truckfasiten).
   Fungerer både i nettleseren og i Node 20+ (globalThis.crypto). */

export const FORMAT = 2;
const ITER = 600000;
const te = new TextEncoder(), td = new TextDecoder();
const c = () => globalThis.crypto;
export const tilB64 = u8 => { let s = ''; for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]); return btoa(s); };
export const fraB64 = s => Uint8Array.from(atob(s), ch => ch.charCodeAt(0));

async function passordNokkel(pw, salt, iterations) {
  const m = await c().subtle.importKey('raw', te.encode(String(pw).normalize('NFC')), 'PBKDF2', false, ['deriveKey']);
  return c().subtle.deriveKey({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, m, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
const innholdNokkel = raw => c().subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);

async function lagSpor(rolle, pw, raw, iterations = ITER) {
  const salt = c().getRandomValues(new Uint8Array(16)), iv = c().getRandomValues(new Uint8Array(12));
  const k = await passordNokkel(pw, salt, iterations);
  const w = new Uint8Array(await c().subtle.encrypt({ name: 'AES-GCM', iv }, k, raw));
  return { rolle, iterations, salt: tilB64(salt), iv: tilB64(iv), nokkel: tilB64(w) };
}
async function krypterInnhold(tekst, raw) {
  const iv = c().getRandomValues(new Uint8Array(12));
  const data = new Uint8Array(await c().subtle.encrypt({ name: 'AES-GCM', iv }, await innholdNokkel(raw), te.encode(tekst)));
  return { iv: tilB64(iv), data: tilB64(data) };
}

/* Lager en ny låst pakke. spor = [{ rolle: 'fag'|'admin', passord }] */
export async function laas(tekst, spor) {
  const raw = c().getRandomValues(new Uint8Array(32));
  const inn = await krypterInnhold(tekst, raw);
  const nokler = [];
  for (const s of spor) nokler.push(await lagSpor(s.rolle, s.passord, raw));
  return { format: FORMAT, ...inn, nokler };
}

/* Prøver passordet mot alle nøkkelsporene. Gir { tekst, rolle, raw } eller kaster feil. */
export async function apne(pakke, pw) {
  for (const s of pakke.nokler || []) {
    try {
      const k = await passordNokkel(pw, fraB64(s.salt), s.iterations || ITER);
      const raw = new Uint8Array(await c().subtle.decrypt({ name: 'AES-GCM', iv: fraB64(s.iv) }, k, fraB64(s.nokkel)));
      return { tekst: await apneMedNokkel(pakke, raw), rolle: s.rolle, raw };
    } catch (e) { /* prøv neste spor */ }
  }
  throw new Error('Feil passord');
}
export async function apneMedNokkel(pakke, raw) {
  const p = await c().subtle.decrypt({ name: 'AES-GCM', iv: fraB64(pakke.iv) }, await innholdNokkel(raw), fraB64(pakke.data));
  return td.decode(p);
}

/* Bytter passordet for én rolle. Krever at pakken er åpnet (raw). Innholdet krypteres ikke på nytt. */
export async function byttPassord(pakke, raw, rolle, nyttPassord) {
  const ny = await lagSpor(rolle, nyttPassord, raw);
  return { ...pakke, nokler: [...pakke.nokler.filter(s => s.rolle !== rolle), ny] };
}
/* Lagrer nytt innhold med samme nøkkel og samme passord. */
export async function nyttInnhold(pakke, raw, tekst) {
  return { ...pakke, ...(await krypterInnhold(tekst, raw)) };
}

/* Filen som ligger i repoet: /gjestefag/<fag>/laererrom/innhold.enc.js */
export const filTekst = (fag, pakke) =>
  `/* Kryptert lærerinnhold for gjesterommet ${fag.toUpperCase()}. Åpnes med fagets passord eller adminpassordet i /gjestefag/${fag}/laererrom/.\n` +
  `   Endres (passord eller innhold) i /laererrom/gjesterom/. Ikke rediger for hånd. */\n` +
  `window.GJESTEROM = window.GJESTEROM || {};\nwindow.GJESTEROM[${JSON.stringify(fag)}] = ${JSON.stringify(pakke)};\n`;

/* Husk åpningen i denne fanen (sessionStorage) så læreren slipper å skrive passord på nytt ved navigering. */
const ss = {
  get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} },
  del(k) { try { sessionStorage.removeItem(k); } catch (e) {} }
};
export const husk = (fag, raw, rolle) => ss.set('gjesterom-' + fag, JSON.stringify({ raw: tilB64(raw), rolle }));
export const glem = fag => ss.del('gjesterom-' + fag);
export function husket(fag) { try { const v = JSON.parse(ss.get('gjesterom-' + fag)); return v ? { raw: fraB64(v.raw), rolle: v.rolle } : null; } catch (e) { return null; } }
