/* Fra Python-kode til bankende hjerte – gjestefag HO.
   Python kjører i nettleseren med Skulpt (/assets/vendor/skulpt/). Alt lagres bare i elevens nettleser. */

const $ = id => document.getElementById(id);
const NOKKEL = 'ho-hjerte-v1';
const lagre = () => { try { localStorage.setItem(NOKKEL, JSON.stringify(S)); } catch (e) {} };
const S = (() => { try { return JSON.parse(localStorage.getItem(NOKKEL)) || {}; } catch (e) { return {}; } })();
S.maling ||= {}; S.oppdrag ||= {}; S.tenk ||= {}; S.exit ||= {}; S.quiz ||= {};
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Lær: blodets vei ---------- */
const VEI = [
  'Hulvenene', 'Høyre forkammer', 'Høyre hjertekammer', 'Lungearterien', 'Lungene',
  'Lungevenene', 'Venstre forkammer', 'Venstre hjertekammer', 'Aorta', 'Ut i kroppen'
];
let veiPos = 0;
function tegnVei() {
  veiPos = 0;
  $('veiSvar').innerHTML = ''; $('veiTilbake').textContent = ''; $('veiTilbake').className = 'tilbake';
  const stokket = VEI.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  $('veiValg').innerHTML = stokket.map(v => `<button class="btn" type="button">${esc(v)}</button>`).join('');
}
$('veiValg').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  const t = $('veiTilbake');
  if (b.textContent === VEI[veiPos]) {
    b.classList.add('brukt'); b.setAttribute('aria-disabled', 'true');
    $('veiSvar').insertAdjacentHTML('beforeend', `<li>${esc(VEI[veiPos])}</li>`);
    veiPos++;
    if (veiPos === VEI.length) { t.textContent = 'Riktig hele veien! Blodet har gått én runde gjennom hjertet og lungene.'; t.className = 'tilbake ok'; S.vei = true; lagre(); }
    else { t.textContent = 'Riktig. Hva kommer etter?'; t.className = 'tilbake ok'; }
  } else {
    t.textContent = `Ikke «${b.textContent}» ennå. Se på tegningen: Hvor går blodet etter «${veiPos ? VEI[veiPos - 1] : 'kroppen'}»?`;
    t.className = 'tilbake feil';
  }
});
$('veiNullstill').addEventListener('click', tegnVei);
tegnVei();

/* ---------- Øv: pulsmåling ---------- */
const bpmFra = n => (Number.isFinite(n) && n > 0 ? n * 2 : null);
document.querySelectorAll('[data-maling]').forEach(boks => {
  const type = boks.dataset.maling, inp = boks.querySelector('[data-antall]'), ut = boks.querySelector('[data-bpm]');
  const tid = boks.querySelector('.tid'), knapp = boks.querySelector('[data-start]');
  const vis = () => { const b = S.maling[type]; ut.textContent = b ? `${b} slag i minuttet` : '–'; };
  if (S.maling[type]) inp.value = S.maling[type] / 2;
  vis();
  inp.addEventListener('input', () => { const b = bpmFra(parseInt(inp.value, 10)); if (b) S.maling[type] = b; else delete S.maling[type]; lagre(); vis(); });
  let tm = null;
  knapp.addEventListener('click', () => {
    if (tm) { clearInterval(tm); tm = null; tid.textContent = '30'; knapp.textContent = 'Start 30 sekunder'; return; }
    let igjen = 30; const slutt = Date.now() + 30000;
    tid.textContent = igjen; knapp.textContent = 'Avbryt';
    tm = setInterval(() => {
      igjen = Math.max(0, Math.ceil((slutt - Date.now()) / 1000)); tid.textContent = igjen;
      if (igjen === 0) { clearInterval(tm); tm = null; knapp.textContent = 'Start 30 sekunder'; tid.textContent = 'Stopp!'; inp.focus(); }
    }, 200);
  });
});

/* ---------- Øv: test deg selv ---------- */
const QUIZ = [
  { s: 'Hvilken side av hjertet pumper blodet ut i kroppen?', v: ['Venstre side', 'Høyre side', 'Begge sider pumper like mye ut i kroppen'], r: 0, f: 'Venstre hjertekammer pumper oksygenrikt blod ut i kroppen gjennom aorta. Høyre side pumper blodet til lungene.' },
  { s: 'Hva kalles fasen der hjertet trekker seg sammen og pumper?', v: ['Diastole', 'Systole', 'Sinus'], r: 1, f: 'Systole = hjertet trekker seg sammen. Diastole = hjertet slapper av og fylles.' },
  { s: 'Hvorfor skal du ikke bruke tommelen når du måler puls?', v: ['Tommelen er for svak', 'Tommelen har sin egen puls som kan forstyrre tellingen', 'Det gjør vondt for den som blir målt'], r: 1, f: 'Du kan kjenne din egen puls i tommelen og tro at det er pasientens.' },
  { s: 'Du teller 38 slag på 30 sekunder. Hva er pulsen?', v: ['38', '68', '76', '114'], r: 2, f: '38 × 2 = 76 slag i minuttet.' },
  { s: 'Hva gjør hjerteklaffene?', v: ['Lager de elektriske signalene', 'Hindrer at blodet renner feil vei', 'Tar opp oksygen'], r: 1, f: 'Klaffene er enveisventiler. Sinusknuten lager de elektriske signalene, og lungene tar opp oksygen.' },
  { s: 'Hvor pumper høyre hjertekammer blodet?', v: ['Til lungene', 'Ut i kroppen', 'Til venstre forkammer'], r: 0, f: 'Høyre hjertekammer pumper oksygenfattig blod til lungene, der det tar opp oksygen.' },
  { s: 'I programmet står det puls = 60. Hvor lenge varer ett hjerteslag (pause = 60 / puls)?', v: ['0,6 sekunder', '1 sekund', '60 sekunder'], r: 1, f: '60 / 60 = 1 sekund per slag.' },
  { s: 'Pulsen går opp når du tar knebøy. Hva er hovedgrunnen?', v: ['Musklene trenger mer oksygen, og hjertet må frakte mer blod', 'Hjertet blir varmt', 'Lungene slutter å virke'], r: 0, f: 'Musklene i arbeid trenger mer oksygen og næring, og avfallsstoffer må fraktes bort.' }
];
function tegnQuiz() {
  $('quiz').innerHTML = QUIZ.map((q, i) => `<div class="spm" data-i="${i}"><p>${i + 1}. ${esc(q.s)}</p><div class="valg">${q.v.map((v, j) => `<button class="btn" type="button" data-j="${j}">${esc(v)}</button>`).join('')}</div><p class="tilbake" aria-live="polite"></p></div>`).join('');
  Object.entries(S.quiz).forEach(([i, j]) => marker(+i, j));
  oppsummerQuiz();
}
function marker(i, j) {
  const q = QUIZ[i], el = $('quiz').querySelector(`[data-i="${i}"]`); if (!q || !el) return;
  el.querySelectorAll('button').forEach(b => { b.disabled = true; const bj = +b.dataset.j; if (bj === q.r) b.classList.add('riktig'); else if (bj === j) b.classList.add('galt'); });
  const t = el.querySelector('.tilbake');
  t.textContent = (j === q.r ? 'Riktig! ' : 'Ikke helt. ') + q.f; t.className = 'tilbake ' + (j === q.r ? 'ok' : 'feil');
}
function oppsummerQuiz() {
  const n = Object.keys(S.quiz).length, r = Object.entries(S.quiz).filter(([i, j]) => QUIZ[i]?.r === j).length;
  $('quizSum').innerHTML = n ? `Resultat: <span style="color:var(--hjerte)">${r} av ${QUIZ.length}</span> riktige${n < QUIZ.length ? ` (${QUIZ.length - n} igjen)` : ''}. ${n === QUIZ.length ? '<button class="btn" type="button" id="quizPaNytt" style="margin-left:8px">Ta testen på nytt</button>' : ''}` : '';
  $('quizPaNytt')?.addEventListener('click', () => { S.quiz = {}; lagre(); tegnQuiz(); });
}
$('quiz').addEventListener('click', e => {
  const b = e.target.closest('button[data-j]'); if (!b) return;
  const i = +b.closest('.spm').dataset.i, j = +b.dataset.j;
  if (S.quiz[i] !== undefined) return;
  S.quiz[i] = j; lagre(); marker(i, j); oppsummerQuiz();
});
tegnQuiz();

/* ---------- Tenk: Python-verkstedet ---------- */
const STARTKODE = `import turtle
import math
import time

puls = 72              # slag per minutt – bytt til din puls
pause = 60 / puls      # sekunder per hjerteslag

print("Puls:", puls, "slag i minuttet")
print("Ett hjerteslag varer", round(pause, 2), "sekunder")

skjerm = turtle.Screen()
skjerm.tracer(0)
penn = turtle.Turtle()
penn.hideturtle()
penn.color("red")

def tegn_hjerte(storrelse):
    penn.clear()
    penn.penup()
    penn.begin_fill()
    for grader in range(0, 361, 5):
        t = math.radians(grader)
        x = 16 * math.sin(t) ** 3
        y = 13*math.cos(t) - 5*math.cos(2*t) - 2*math.cos(3*t) - math.cos(4*t)
        penn.goto(x * storrelse, y * storrelse)
        penn.pendown()
    penn.end_fill()
    skjerm.update()

for slag in range(30):
    tegn_hjerte(10)          # systole: trekker seg sammen
    time.sleep(pause * 0.35)
    tegn_hjerte(12)          # diastole: slapper av, fylles
    time.sleep(pause * 0.65)

print("Ferdig! Hjertet slo", slag + 1, "ganger.")
`;
const kode = $('kode');
kode.value = S.kode || STARTKODE;
function oppdaterLinjer() {
  const n = kode.value.split('\n').length;
  $('linjenr').textContent = Array.from({ length: n }, (_, i) => i + 1).join('\n');
  kode.style.height = 'auto'; kode.style.height = kode.scrollHeight + 'px';
}
let lagreTm;
kode.addEventListener('input', () => { oppdaterLinjer(); clearTimeout(lagreTm); lagreTm = setTimeout(() => { S.kode = kode.value; lagre(); $('lagret').textContent = 'Lagret'; setTimeout(() => $('lagret').textContent = 'Lagres automatisk i nettleseren', 1500); }, 400); });
kode.addEventListener('keydown', e => {
  if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); const s = kode.selectionStart; kode.setRangeText('    ', s, kode.selectionEnd, 'end'); kode.dispatchEvent(new Event('input')); }
  else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); kjor(); }
  else if (e.key === 'Escape') { kode.blur(); } // gir tastaturbrukere en vei ut av kodefeltet
});
oppdaterLinjer();

function settPuls(type) {
  const b = S.maling[type];
  if (!b) { status(`Mål ${type === 'hvile' ? 'hvilepulsen' : 'pulsen etter aktivitet'} først (under «Mål pulsen»).`); document.querySelector(`[data-maling="${type}"] [data-antall]`).focus(); return; }
  const ny = kode.value.replace(/^(\s*puls\s*=\s*)\d+(\.\d+)?/m, `$1${b}`);
  if (ny === kode.value && !/^\s*puls\s*=/m.test(kode.value)) { status('Fant ingen linje som starter med «puls =». Skriv tallet inn selv.'); return; }
  kode.value = ny; kode.dispatchEvent(new Event('input'));
  status(`Satte puls = ${b}. Trykk «▶ Kjør».`);
}
$('brukHvile').addEventListener('click', () => settPuls('hvile'));
$('brukAktivitet').addEventListener('click', () => settPuls('aktivitet'));
$('nullstill').addEventListener('click', () => { if (kode.value !== STARTKODE && !confirmNullstill()) return; kode.value = STARTKODE; kode.dispatchEvent(new Event('input')); status('Startkoden er tilbake.'); });
let nullstillKlikk = 0;
function confirmNullstill() { // dobbeltklikk-bekreftelse uten nettleserdialog
  if (Date.now() - nullstillKlikk < 4000) return true;
  nullstillKlikk = Date.now(); status('Trykk «↺ Tilbake til startkoden» én gang til for å slette endringene dine.'); return false;
}

const status = t => { $('status').textContent = t; };
const ut = $('utskrift');
const skriv = (t, feil) => { const s = document.createElement('span'); if (feil) s.className = 'feilm'; s.textContent = t; ut.appendChild(s); ut.scrollTop = ut.scrollHeight; };

let skulpt = null;
function lastSkulpt() {
  if (skulpt) return skulpt;
  const last = src => new Promise((ok, feil) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => feil(new Error(src)); document.head.appendChild(s); });
  skulpt = last('/assets/vendor/skulpt/skulpt.min.js').then(() => last('/assets/vendor/skulpt/skulpt-stdlib.js'));
  skulpt.catch(() => { skulpt = null; });
  return skulpt;
}

/* Oversetter vanlige Python-feil til hjelp på norsk */
function forklarFeil(e) {
  const navn = e?.tp$name || e?.constructor?.name || 'Feil';
  let linje = null;
  try { if (e.traceback?.length) linje = e.traceback[0].lineno; } catch (x) {}
  const melding = (() => { try { return e.toString(); } catch (x) { return String(e); } })();
  const hjelp = {
    SyntaxError: 'Python forstår ikke skrivemåten. Sjekk kolon (:) på slutten av if/for/def, parenteser og anførselstegn.',
    IndentationError: 'Innrykket stemmer ikke. Linjene inne i en løkke, if eller def skal ha 4 mellomrom foran.',
    NameError: 'Python kjenner ikke et navn. Har du skrevet variabelen likt overalt (store/små bokstaver, æøå)?',
    TypeError: 'Du blander typer, for eksempel tekst og tall. Husk komma mellom tekst og tall i print().',
    ZeroDivisionError: 'Du deler på null. Pulsen kan ikke være 0 – da står hjertet stille!',
    ValueError: 'Et tall eller en verdi passer ikke. Sjekk tallene du har skrevet.'
  }[navn];
  return `${melding}${linje ? `\n→ Se linje ${linje}.` : ''}${hjelp ? `\n💡 ${hjelp}` : ''}`;
}

let kjorer = false, stoppBedt = false;
async function kjor() {
  if (kjorer) return;
  kjorer = true; stoppBedt = false;
  $('kjor').disabled = true; $('stopp').disabled = false;
  ut.textContent = ''; status('Laster Python …');
  try { await lastSkulpt(); } catch (e) {
    status(''); skriv('Fikk ikke lastet Python. Sjekk nettforbindelsen og last siden på nytt.', true);
    kjorer = false; $('kjor').disabled = false; $('stopp').disabled = true; return;
  }
  const Sk = window.Sk;
  const lerret = $('lerret'); lerret.innerHTML = '<div id="turtleMaal"></div>';
  Sk.configure({
    output: t => skriv(t),
    read: x => { if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) throw new Error(`Fant ikke modulen ${x}`); return Sk.builtinFiles.files[x]; },
    __future__: Sk.python3,
    yieldLimit: 30,
    execLimit: null,
    killableWhile: true, killableFor: true
  });
  (Sk.TurtleGraphics ||= {}).target = 'turtleMaal';
  Sk.TurtleGraphics.width = 400; Sk.TurtleGraphics.height = 400;
  status('Hjertet slår …');
  try {
    await Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, kode.value, true), {
      '*': () => { if (stoppBedt) throw new Error('STOPP'); }
    });
    status('Programmet er ferdig. Endre koden og kjør igjen.');
  } catch (e) {
    if (e?.message === 'STOPP' || stoppBedt) status('Stoppet.');
    else { status('Programmet stoppet med en feil.'); skriv('\n' + forklarFeil(e) + '\n', true); }
  } finally {
    kjorer = false; $('kjor').disabled = false; $('stopp').disabled = true;
    S.kjort = (S.kjort || 0) + 1; lagre();
  }
}
$('kjor').addEventListener('click', kjor);
$('stopp').addEventListener('click', () => { stoppBedt = true; status('Stopper …'); });

/* Oppdrag – avkrysning */
document.querySelectorAll('[data-oppdrag]').forEach(c => {
  c.checked = !!S.oppdrag[c.dataset.oppdrag];
  c.addEventListener('change', () => { S.oppdrag[c.dataset.oppdrag] = c.checked; lagre(); });
});

/* ---------- Tenk og exit ticket ---------- */
const TENK = [
  ['t1', 'Hvorfor slår hjertet raskere når du er i aktivitet? Bruk ordene oksygen og blod i svaret.'],
  ['t2', 'Hva skjer med tallet pause i programmet når pulsen øker? Forklar med regnestykket.'],
  ['t3', 'Programmet er en modell. Nevn to ting et ekte hjerte gjør som modellen på skjermen ikke viser.'],
  ['t4', 'En bruker på sykehjem har puls 118 mens hun sitter i stolen. Hennes vanlige hvilepuls er rundt 70. Hva gjør du som helsearbeider?']
];
const EXIT = [
  ['e1', 'Hva er puls, og hvordan måler du den riktig?'],
  ['e2', 'Hva er forskjellen på systole og diastole?'],
  ['e3', 'Hvilken linje i koden bestemmer hvor fort hjertet slår, og hva betyr pause = 60 / puls?']
];
function tekstfelt(el, liste, lager) {
  el.innerHTML = liste.map(([id, s], i) => `<div class="q"><label for="${id}"><b>${i + 1}. ${esc(s)}</b></label><textarea id="${id}" data-id="${id}"></textarea></div>`).join('');
  el.querySelectorAll('textarea').forEach(t => { t.value = lager[t.dataset.id] || ''; t.addEventListener('input', () => { lager[t.dataset.id] = t.value; lagre(); }); });
}
tekstfelt($('tenk'), TENK, S.tenk);
tekstfelt($('exit'), EXIT, S.exit);

/* ---------- Kvittering ---------- */
$('elevNavn').value = S.navn || '';
$('elevNavn').addEventListener('input', e => { S.navn = e.target.value; lagre(); });
$('kvittBtn').addEventListener('click', () => {
  const navn = $('elevNavn').value.trim();
  if (!navn) { $('elevNavn').focus(); $('kopiert').textContent = ''; return; }
  const qn = Object.keys(S.quiz).length, qr = Object.entries(S.quiz).filter(([i, j]) => QUIZ[i]?.r === j).length;
  const oppdrag = [...document.querySelectorAll('[data-oppdrag]')].map((c, i) => `  ${c.checked ? '[x]' : '[ ]'} Oppdrag ${i + 1} (${c.closest('li').querySelector('.niva').textContent})`).join('\n');
  const svar = (liste, lager) => liste.map(([id, s], i) => `${i + 1}. ${s}\n   ${(lager[id] || '(ikke besvart)').trim().replace(/\n/g, '\n   ')}`).join('\n\n');
  const tekst = `KVITTERING – Fra Python-kode til bankende hjerte (HO Vg1)
Navn: ${navn}
Dato: ${new Date().toLocaleDateString('nb-NO')}

LÆR
  Blodets vei: ${S.vei ? 'fullført' : 'ikke fullført'}

ØV
  Hvilepuls: ${S.maling.hvile ? S.maling.hvile + ' slag/min' : 'ikke registrert'}
  Puls etter aktivitet: ${S.maling.aktivitet ? S.maling.aktivitet + ' slag/min' : 'ikke registrert'}
  Test deg selv: ${qr} av ${QUIZ.length} riktige (${qn} besvart)

TENK – PYTHON
  Programmet kjørt ${S.kjort || 0} ganger
${oppdrag}

TENK – SPØRSMÅL
${svar(TENK, S.tenk)}

EXIT TICKET
${svar(EXIT, S.exit)}

MIN KODE
${kode.value.trim()}
`;
  $('kvittTekst').textContent = tekst; $('kvitt').hidden = false; $('kopiert').textContent = '';
  $('kvitt').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
});
$('kopierBtn').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('kvittTekst').textContent); $('kopiert').textContent = 'Kopiert!'; }
  catch (e) { $('kopiert').textContent = 'Merk teksten og kopier med Ctrl + C.'; }
});
$('skrivUt').addEventListener('click', () => window.print());
