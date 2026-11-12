/* Felles låseskjerm for gjestelærerrommene.
   Siden må ha <body data-fag="int">, et element #laas og et element #innhold,
   og laste /gjestefag/<fag>/laererrom/innhold.enc.js før denne modulen.
   Når rommet åpnes, settes innholdet inn i #innhold og hendelsen «gjesterom:apnet» sendes. */
import { apne, apneMedNokkel, husk, husket, glem } from './laas.js';
import { fag as finnFag } from './fag.js';

const fagId = document.body.dataset.fag;
const F = finnFag(fagId);
const pakke = window.GJESTEROM?.[fagId];
const $ = id => document.getElementById(id);
if (F) document.body.style.setProperty('--gjest', F.farge);

function visInnhold(html, rolle) {
  $('laas').hidden = true;
  const inn = $('innhold');
  inn.innerHTML = html;
  inn.hidden = false;
  const bar = document.createElement('div');
  bar.className = 'innlogget noprint';
  bar.innerHTML = `<span>Åpnet som ${rolle === 'admin' ? '<b>administrator</b>' : `<b>${F ? F.kort : ''}-lærer</b>`}.</span><button class="gbtn sek" type="button" id="lukkRom">Lukk rommet</button>`;
  inn.prepend(bar);
  $('lukkRom').addEventListener('click', () => { glem(fagId); location.reload(); });
  document.dispatchEvent(new CustomEvent('gjesterom:apnet', { detail: { fag: fagId, rolle } }));
}

async function start() {
  if (!pakke) { $('laas').innerHTML = '<h2>Rommet er ikke satt opp</h2><p>Fant ikke det krypterte innholdet for dette faget. Kontakt administrator.</p>'; return; }
  if (!globalThis.crypto?.subtle) { $('laasFeil').textContent = 'Nettleseren kan ikke åpne rommet. Bruk en oppdatert nettleser og HTTPS.'; return; }
  const h = husket(fagId);
  if (h) { try { return visInnhold(await apneMedNokkel(pakke, h.raw), h.rolle); } catch (e) { glem(fagId); } }
  $('laasSkjema').addEventListener('submit', async e => {
    e.preventDefault();
    const pw = $('pw'), b = $('laasBtn');
    b.disabled = true; b.textContent = 'Åpner …'; $('laasFeil').textContent = '';
    try {
      const r = await apne(pakke, pw.value);
      if ($('huskFane').checked) husk(fagId, r.raw, r.rolle);
      visInnhold(r.tekst, r.rolle);
    } catch (x) {
      pw.value = ''; b.disabled = false; b.textContent = 'Åpne lærerrommet';
      $('laasFeil').textContent = 'Feil passord. Prøv igjen, eller spør administrator.'; pw.focus();
    }
  });
}
start();
