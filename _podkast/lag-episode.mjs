#!/usr/bin/env node
/* =====================================================================
   LAG EN PODKASTEPISODE MED ELEVENLABS (Text to Dialogue)
     node _podkast/lag-episode.mjs _podkast/manus/bl-kap1-episode-1.txt
     node _podkast/lag-episode.mjs <manus> --sjekk     (bare kontroll, ingen API-kall)

   Manusformat (ren tekst, UTF-8):
     # ut: bransjelaere/kap1/lyd/episode-1.mp3     ← hvor MP3-fila skal ligge (påkrevd)
     # modell: eleven_v3                           ← valgfritt (standard: eleven_v4)
     # tittel: …                                   ← valgfritt, bare for oversikt
     JARLE: Hei, og velkommen te TLL-podden!
     LINE: Takk for at eg fikk komme.
   Linjer som starter med # er kommentarer. En linje uten «NAVN:» fortsetter forrige replikk.
   Navnene kobles til stemme-ID i _podkast/stemmer.json.

   Nøkkelen leses fra miljøvariabelen ELEVENLABS_API_KEY (GitHub-hemmelighet). Den skrives aldri ut.
   ===================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const ROT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [manusSti, ...flagg] = process.argv.slice(2);
const bareSjekk = flagg.includes('--sjekk');
const MAKS_TEGN = 1800;          // ElevenLabs anbefaler høyst ca. 2 000 tegn per forespørsel
const feil = m => { console.error('✗ ' + m); process.exit(1); };

if (!manusSti) feil('Bruk: node _podkast/lag-episode.mjs <manusfil> [--sjekk]');
const tekst = fs.readFileSync(path.resolve(ROT, manusSti), 'utf8');
const stemmer = JSON.parse(fs.readFileSync(path.join(ROT, '_podkast', 'stemmer.json'), 'utf8'));

/* ---------- les manus ---------- */
const meta = {}; const replikker = [];
for (const rå of tekst.split(/\r?\n/)) {
  const linje = rå.trim();
  if (!linje) continue;
  const m = linje.match(/^#\s*(\w+)\s*:\s*(.+)$/);
  if (m) { meta[m[1].toLowerCase()] = m[2].trim(); continue; }
  if (linje.startsWith('#')) continue;
  const r = linje.match(/^([A-ZÆØÅ]+)\s*:\s*(.*)$/);
  if (r) replikker.push({ navn: r[1], tekst: r[2] });
  else if (replikker.length) replikker[replikker.length - 1].tekst += ' ' + linje;
}
if (!meta.ut) feil('Manuset mangler linja «# ut: sti/til/episode-N.mp3».');
if (!/\.mp3$/.test(meta.ut)) feil('«# ut:» må slutte på .mp3');
if (!replikker.length) feil('Manuset har ingen replikker (NAVN: tekst).');
for (const r of replikker) {
  if (!stemmer[r.navn] || /SETT-INN/.test(stemmer[r.navn])) feil(`Ingen stemme-ID for «${r.navn}» i _podkast/stemmer.json.`);
}

/* ---------- del opp i biter på høyst MAKS_TEGN tegn ---------- */
const delSetninger = s => s.match(/[^.!?…]+[.!?…»"]*\s*/g) || [s];
const turer = [];
for (const r of replikker) {
  if (r.tekst.length <= MAKS_TEGN) { turer.push(r); continue; }
  let buf = '';
  for (const s of delSetninger(r.tekst)) {
    if ((buf + s).length > MAKS_TEGN && buf) { turer.push({ navn: r.navn, tekst: buf.trim() }); buf = ''; }
    buf += s;
  }
  if (buf.trim()) turer.push({ navn: r.navn, tekst: buf.trim() });
}
const biter = []; let bit = [], len = 0;
for (const t of turer) {
  if (len + t.tekst.length > MAKS_TEGN && bit.length) { biter.push(bit); bit = []; len = 0; }
  bit.push(t); len += t.tekst.length;
}
if (bit.length) biter.push(bit);

const totalt = replikker.reduce((a, r) => a + r.tekst.length, 0);
const ord = replikker.reduce((a, r) => a + r.tekst.split(/\s+/).length, 0);
console.log(`Manus: ${manusSti}\n  ${replikker.length} replikker · ${ord} ord (ca. ${(ord / 140).toFixed(1)} min) · ${totalt} tegn · ${biter.length} forespørsel(er)\n  Ut: ${meta.ut}\n  Modell: ${meta.modell || 'eleven_v4'}`);
if (bareSjekk) { console.log('✓ Manuset ser riktig ut (ingen lyd laget).'); process.exit(0); }

const NOKKEL = process.env.ELEVENLABS_API_KEY;
if (!NOKKEL) feil('Mangler ELEVENLABS_API_KEY.');

/* ---------- kall ElevenLabs ---------- */
async function lagBit(inputs, nr) {
  const url = 'https://api.elevenlabs.io/v1/text-to-dialogue?output_format=mp3_44100_128';
  const body = JSON.stringify({ inputs, model_id: meta.modell || 'eleven_v4' });
  for (let forsok = 1; forsok <= 4; forsok++) {
    const svar = await fetch(url, { method: 'POST', headers: { 'xi-api-key': NOKKEL, 'Content-Type': 'application/json', Accept: 'audio/mpeg' }, body });
    if (svar.ok) return Buffer.from(await svar.arrayBuffer());
    const melding = (await svar.text()).slice(0, 400);
    if ((svar.status === 429 || svar.status >= 500) && forsok < 4) {
      console.log(`  bit ${nr}: ${svar.status}, prøver igjen om ${forsok * 10} s …`);
      await new Promise(r => setTimeout(r, forsok * 10000));
      continue;
    }
    feil(`ElevenLabs svarte ${svar.status} på bit ${nr}: ${melding}`);
  }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'podkast-'));
const deler = [];
for (let i = 0; i < biter.length; i++) {
  const inputs = biter[i].map(t => ({ text: t.tekst, voice_id: stemmer[t.navn] }));
  const lyd = await lagBit(inputs, i + 1);
  const fil = path.join(tmp, `del-${String(i + 1).padStart(2, '0')}.mp3`);
  fs.writeFileSync(fil, lyd); deler.push(fil);
  console.log(`  bit ${i + 1}/${biter.length} ferdig (${(lyd.length / 1024).toFixed(0)} kB)`);
}

/* ---------- sett sammen ---------- */
const ut = path.resolve(ROT, meta.ut);
fs.mkdirSync(path.dirname(ut), { recursive: true });
if (deler.length === 1) fs.copyFileSync(deler[0], ut);
else {
  const liste = path.join(tmp, 'liste.txt');
  fs.writeFileSync(liste, deler.map(d => `file '${d}'`).join('\n'));
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', liste, '-c', 'copy', ut]);
}
const mb = fs.statSync(ut).size / 1024 / 1024;
console.log(`✓ Lagret ${meta.ut} (${mb.toFixed(1)} MB)`);
if (mb > 25) console.log('! Fila er over 25 MB – vurder kortere episoder.');
