#!/usr/bin/env node
/* Verktøy for den krypterte G11-prøven (bransjeteknikk/g11/prove/prove.enc.js).
   Prøveteksten er forlagets og skal ALDRI ligge i klartekst i repoet.

   Åpne til en lokal fil (utenfor repoet):
     node _verktoy/g11-prove.mjs apne <passord> /tmp/g11prove.json
   Låse på nytt etter endring (samme eller nytt passord):
     node _verktoy/g11-prove.mjs laas <passord> /tmp/g11prove.json
   Formatet: { tests: { "1": { title:{nb,en,uk}, questions:[ { q:{nb,en,uk}, a:[{nb,en,uk}], image?, alt? } ] } } } */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { laas, apne } from '../gjestefag/felles/laas.js';
const ROT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAL = path.join(ROT, 'bransjeteknikk/g11/prove/prove.enc.js');
const [cmd, pw, fil] = process.argv.slice(2);
if (!cmd || !pw || !fil) { console.log('Bruk: apne|laas <passord> <fil.json>'); process.exit(1); }
if (path.resolve(fil).startsWith(ROT)) { console.log('Legg klartekstfila utenfor repoet.'); process.exit(1); }
if (cmd === 'apne') {
  const src = fs.readFileSync(MAL, 'utf8');
  const pakke = JSON.parse(src.slice(src.indexOf('{', src.indexOf('window.G11_PROVE')), src.lastIndexOf('}') + 1));
  const r = await apne(pakke, pw);
  fs.writeFileSync(fil, r.tekst); console.log('Skrev', fil);
} else if (cmd === 'laas') {
  const tekst = fs.readFileSync(fil, 'utf8'); JSON.parse(tekst);
  const pakke = await laas(tekst, [{ rolle: 'prove', passord: pw }]);
  fs.writeFileSync(MAL, `/* G11 – teoriprøve 1 og 2 til opplesning. Innholdet er forlagets prøvetekst og ligger derfor kryptert.\n   Åpnes med passordet læreren gir ut. Endres med node _verktoy/g11-prove.mjs. Ikke rediger for hånd. */\nwindow.G11_PROVE = ${JSON.stringify(pakke)};\n`);
  console.log('Låste', MAL);
} else console.log('Ukjent kommando');
