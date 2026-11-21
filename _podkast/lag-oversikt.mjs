#!/usr/bin/env node
/* =====================================================================
   LAG OVERSIKT OVER TLL-PODDEN
     node _podkast/lag-oversikt.mjs

   Finner alle publiserte episoder (kapN/lyd/episode-N.mp3|m4a) i fagmappene, henter titler
   fra kapitlenes data.js og skriver:
     tllpodden/episoder.json  – lista som samlesiden leser
     tllpodden/feed.xml       – podkast-feed (RSS) for Spotify, Apple Podcasts o.l.
   Datoen en episode først dukket opp, beholdes fra forrige episoder.json.
   Krever ffprobe (ffmpeg) for å lese lengden på lydfilene.
   ===================================================================== */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const ROT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const NETT = 'https://tllfluenseren.no';
const UT = path.join(ROT, 'tllpodden');
const FAG = [
  { mappe: 'bransjelaere', navn: 'Bransjelære', kort: 'BL' },
  { mappe: 'transport-logistikk-lofteoperasjoner', navn: 'Transport, logistikk og løfteoperasjoner', kort: 'TLL' }
];

const forrige = (() => { try { return JSON.parse(fs.readFileSync(path.join(UT, 'episoder.json'), 'utf8')); } catch { return { episoder: [] }; } })();
const datoAv = Object.fromEntries((forrige.episoder || []).map(e => [e.id, e.dato]));

const lesKapittel = fil => {
  const ctx = { window: {} };
  ctx.window.TLL = { kapitler: {}, registrer(K) { this.kapitler[K.id] = K; } };
  ctx.TLL = ctx.window.TLL;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(fil, 'utf8'), ctx);
  return Object.values(ctx.TLL.kapitler)[0];
};
const varighet = fil => { try { return Math.round(+execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', fil]).toString().trim()); } catch { return 0; } };
const idag = new Date().toISOString().slice(0, 10);

const episoder = [];
for (const fag of FAG) {
  const fagDir = path.join(ROT, fag.mappe);
  if (!fs.existsSync(fagDir)) continue;
  for (const kap of fs.readdirSync(fagDir).filter(d => /^kap\d+$/.test(d)).sort((a, b) => +a.slice(3) - +b.slice(3))) {
    const lyd = path.join(fagDir, kap, 'lyd'), data = path.join(fagDir, kap, 'data.js');
    if (!fs.existsSync(lyd) || !fs.existsSync(data)) continue;
    const K = lesKapittel(data);
    for (const f of fs.readdirSync(lyd)) {
      const m = f.match(/^episode-(\d+)\.(mp3|m4a)$/); if (!m) continue;
      const nr = +m[1], t = K.temaer[nr - 1]; if (!t) continue;
      const fil = path.join(lyd, f), rel = `/${fag.mappe}/${kap}/lyd/${f}`;
      const id = `${fag.kort.toLowerCase()}-${kap}-ep${nr}`;
      episoder.push({
        id, fag: fag.navn, fagKort: fag.kort, kapittel: K.nr, kapittelTittel: K.tittel,
        episode: nr, lok: t.lok, tittel: (t.podkast && t.podkast.tittel) || t.tittel, beskrivelse: t.kort || '',
        lyd: rel, type: m[2] === 'mp3' ? 'audio/mpeg' : 'audio/mp4', bytes: fs.statSync(fil).size,
        sekunder: varighet(fil), tema: `/${fag.mappe}/${kap}/#/${t.id}`, dato: datoAv[id] || idag
      });
    }
  }
}
episoder.sort((a, b) => FAG.findIndex(f => f.kort === a.fagKort) - FAG.findIndex(f => f.kort === b.fagKort) || a.kapittel - b.kapittel || a.episode - b.episode);
fs.mkdirSync(UT, { recursive: true });
fs.writeFileSync(path.join(UT, 'episoder.json'), JSON.stringify({ oppdatert: idag, episoder }, null, 2) + '\n');

/* ---------- RSS ---------- */
const x = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rfc = d => new Date(d + 'T08:00:00Z').toUTCString();
const hms = s => [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60].map(n => String(n).padStart(2, '0')).join(':');
const nyest = [...episoder].sort((a, b) => b.dato.localeCompare(a.dato) || b.kapittel - a.kapittel || b.episode - a.episode);
const BESKRIVELSE = 'Korte podkastepisoder til hvert tema i Vg2 transport, logistikk og løfteoperasjoner og bransjelære – laget for elever, av læreren Jarle Bruntveit. Stemmene er KI-generert.';
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
  <title>TLL-podden</title>
  <link>${NETT}/tllpodden/</link>
  <atom:link href="${NETT}/tllpodden/feed.xml" rel="self" type="application/rss+xml"/>
  <language>no</language>
  <copyright>© TLLfluenseren.no · Jarle Bruntveit</copyright>
  <description>${x(BESKRIVELSE)}</description>
  <itunes:summary>${x(BESKRIVELSE)}</itunes:summary>
  <itunes:author>Jarle Bruntveit · TLLfluenseren</itunes:author>
  <itunes:owner><itunes:name>Jarle Bruntveit</itunes:name><itunes:email>jarle@tllfluenseren.no</itunes:email></itunes:owner>
  <itunes:image href="${NETT}/tllpodden/omslag.png"/>
  <image><url>${NETT}/tllpodden/omslag.png</url><title>TLL-podden</title><link>${NETT}/tllpodden/</link></image>
  <itunes:category text="Education"><itunes:category text="Courses"/></itunes:category>
  <itunes:explicit>false</itunes:explicit>
  <itunes:type>episodic</itunes:type>
${nyest.map(e => `  <item>
    <title>${x(`${e.fag === 'Bransjelære' ? 'Bransjelære' : 'TLL'} kap. ${e.kapittel} · ${e.tittel}`)}</title>
    <description>${x(`${e.beskrivelse} Oppgaver til temaet: ${NETT}${e.tema}`)}</description>
    <link>${NETT}${e.tema}</link>
    <guid isPermaLink="false">${x(e.id)}</guid>
    <pubDate>${rfc(e.dato)}</pubDate>
    <enclosure url="${NETT}${x(e.lyd)}" length="${e.bytes}" type="${e.type}"/>
    <itunes:duration>${hms(e.sekunder)}</itunes:duration>
    <itunes:episode>${e.episode}</itunes:episode>
    <itunes:explicit>false</itunes:explicit>
  </item>`).join('\n')}
</channel>
</rss>
`;
fs.writeFileSync(path.join(UT, 'feed.xml'), feed);
console.log(`✓ ${episoder.length} episoder i tllpodden/episoder.json og tllpodden/feed.xml`);
episoder.forEach(e => console.log(`  ${e.fagKort} kap ${e.kapittel} ep ${e.episode} · ${e.tittel} (${hms(e.sekunder)})`));
