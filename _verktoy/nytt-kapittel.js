#!/usr/bin/env node
/* =====================================================================
   OPPRETT NYTT TLL-KAPITTEL FRA MALEN
     node _verktoy/nytt-kapittel.js 6 "Bruk og vedlikehold av arbeidsutstyr" "Arbeidsutstyr"

   Lager transport-logistikk-lofteoperasjoner/kapN/ med index.html (kopiert fra kap1,
   så den alltid har samme oppsett og cache-versjoner), data.js fra malen og lyd/README.md.
   Kapitlet blir IKKE lagt i kapitler.js, på fagsiden eller i sitemap – det gjøres når
   innholdet er ferdig (se CLAUDE.md, «Publiser kapitlet»).
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const [nrArg, tittel, kort] = process.argv.slice(2);
const nr = parseInt(nrArg, 10);
if (!nr || !tittel || !kort) {
  console.log('Bruk: node _verktoy/nytt-kapittel.js <nr> "<full tittel>" "<kort tittel>"');
  process.exit(1);
}
const ROT = path.resolve(__dirname, '..');
const FAG = path.join(ROT, 'transport-logistikk-lofteoperasjoner');
const id = `kap${nr}`;
const mappe = path.join(FAG, id);
if (fs.existsSync(mappe)) { console.log(`✗ ${id}/ finnes allerede – ingenting er endret.`); process.exit(1); }

const htmlEsc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const jsEsc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/* index.html: kopi av kap1 med nye verdier */
let html = fs.readFileSync(path.join(FAG, 'kap1', 'index.html'), 'utf8');
const sideTittel = `Kap ${nr} ${kort} – TLLfluenseren`;
const beskrivelse = `Interaktive oppgaver til kapittel ${nr}: ${tittel} (Vg2 TLL)`;
html = html
  .replace(/<title>[^<]*<\/title>/, `<title>${htmlEsc(sideTittel)}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${htmlEsc(beskrivelse)}`)
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${htmlEsc(sideTittel)}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${htmlEsc(beskrivelse)}`)
  .replace(/(<meta property="og:url" content="[^"]*\/)kap1\//, `$1${id}/`)
  .replace('data-kapittel="kap1"', `data-kapittel="${id}"`)
  .replace(/data\.js\?v=[^"]*/, `data.js?v=${id}-1`);
if (!html.includes(`data-kapittel="${id}"`)) { console.log('✗ Fant ikke data-kapittel i kap1/index.html – malen må oppdateres.'); process.exit(1); }

/* data.js fra malen */
const data = fs.readFileSync(path.join(__dirname, 'kapittelmal', 'data.js'), 'utf8')
  .replace(/\{\{ID\}\}/g, id).replace(/\{\{NR\}\}/g, String(nr)).replace(/\{\{TITTEL\}\}/g, jsEsc(tittel));

fs.mkdirSync(path.join(mappe, 'lyd'), { recursive: true });
fs.writeFileSync(path.join(mappe, 'index.html'), html);
fs.writeFileSync(path.join(mappe, 'data.js'), data);
fs.writeFileSync(path.join(mappe, 'lyd', 'README.md'),
`# Podkast – kapittel ${nr}

Legg lydfilene her. Spilleren på kapittelsiden finner dem automatisk.
Nummeret i filnavnet er temaets plass i kapitlet: \`episode-1.mp3\` hører til tema t1 osv.

- \`.m4a\` fungerer også. Bruk ikke \`.wav\` – gjør om til mp3 først.
- Episoder som mangler, vises ikke på siden.
- Lag lyden bare fra egenproduserte manus, ikke fra læreboka.
`);

console.log(`✓ Opprettet transport-logistikk-lofteoperasjoner/${id}/ (index.html, data.js, lyd/README.md)
Neste steg:
  1. Fyll ut ${id}/data.js – alle TODO må bort.
  2. Kontroller:  node _verktoy/sjekk-kapitler.js ${id}
  3. Publiser kapitlet etter sjekklista i CLAUDE.md.`);
