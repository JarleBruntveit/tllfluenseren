/* Hjertet og pulsen – gjestefag HO. Alt lagres bare i elevens nettleser. */

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
  { s: 'Pulsen er 120. Hvor lenge varer ett hjerteslag?', v: ['0,5 sekunder', '1,2 sekunder', '2 sekunder'], r: 0, f: '60 sekunder / 120 slag = 0,5 sekunder per slag.' },
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

/* ---------- Tenk: dine tall ---------- */
function visTall() {
  const linje = (navn, b) => b ? `${navn}: <b>${b} slag i minuttet</b> → ett slag varer <b>${(60 / b).toFixed(2).replace('.', ',')} sekunder</b>` : `${navn}: <i>ikke målt ennå</i>`;
  $('mineTall').innerHTML = linje('Hvilepuls', S.maling.hvile) + '<br>' + linje('Puls etter aktivitet', S.maling.aktivitet);
}
visTall();
document.querySelectorAll('[data-antall]').forEach(i => i.addEventListener('input', visTall));

/* ---------- Tenk og exit ticket ---------- */
const TENK = [
  ['t1', 'Hvorfor slår hjertet raskere når du er i aktivitet? Bruk ordene oksygen og blod i svaret.'],
  ['t2', 'Regn ut hvor lenge ett hjerteslag varer med hvilepulsen din og med pulsen etter aktivitet. Hvilken del av hjerteslaget blir kortere?'],
  ['t3', 'Se hjertet slå i 3D. Nevn to ting et ekte hjerte gjør som modellen ikke viser.'],
  ['t4', 'En bruker på sykehjem har puls 118 mens hun sitter i stolen. Hennes vanlige hvilepuls er rundt 70. Hva gjør du som helsearbeider?']
];
const EXIT = [
  ['e1', 'Hva er puls, og hvordan måler du den riktig?'],
  ['e2', 'Hva er forskjellen på systole og diastole?'],
  ['e3', 'Hvorfor slår hjertet fortere når du er i aktivitet?']
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
  const svar = (liste, lager) => liste.map(([id, s], i) => `${i + 1}. ${s}\n   ${(lager[id] || '(ikke besvart)').trim().replace(/\n/g, '\n   ')}`).join('\n\n');
  const tekst = `KVITTERING – Hjertet og pulsen (HO Vg1)
Navn: ${navn}
Dato: ${new Date().toLocaleDateString('nb-NO')}

LÆR
  Blodets vei: ${S.vei ? 'fullført' : 'ikke fullført'}

ØV
  Hvilepuls: ${S.maling.hvile ? S.maling.hvile + ' slag/min' : 'ikke registrert'}
  Puls etter aktivitet: ${S.maling.aktivitet ? S.maling.aktivitet + ' slag/min' : 'ikke registrert'}
  Test deg selv: ${qr} av ${QUIZ.length} riktige (${qn} besvart)

TENK – SPØRSMÅL
${svar(TENK, S.tenk)}

EXIT TICKET
${svar(EXIT, S.exit)}
`;
  $('kvittTekst').textContent = tekst; $('kvitt').hidden = false; $('kopiert').textContent = '';
  $('kvitt').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
});
$('kopierBtn').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('kvittTekst').textContent); $('kopiert').textContent = 'Kopiert!'; }
  catch (e) { $('kopiert').textContent = 'Merk teksten og kopier med Ctrl + C.'; }
});
$('skrivUt').addEventListener('click', () => window.print());
