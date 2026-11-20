/* G11 – opplesning av teoriprøve 1 og 2 (samme virkemåte som truckprøven, /truck/prove/).
   Prøveteksten er forlagets og ligger kryptert i prove.enc.js. Den åpnes med passordet læreren gir ut,
   og åpningen huskes bare i denne fanen (sessionStorage). Ingen fasit, ingen vurdering, ingen lagring av svar.
   Språk: norsk (nb), engelsk (en) og ukrainsk (uk). Oversettelsene er hjelp – det er den norske prøven som gjelder. */
import { apne, apneMedNokkel, tilB64, fraB64 } from '/gjestefag/felles/laas.js';

const $ = s => document.querySelector(s);
const letters = 'ABCDEFGHIJ';
const NOKKEL = 'g11-prove-raw';
const ss = {
  get: k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
  set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} }
};

/* ---------- Tekster i grensesnittet ---------- */
const UI = {
  nb: { kicker: 'G11 · Prøveopplesning', h1: 'Få teoriprøven lest opp', langH: 'Språk',
    notice: 'Dette verktøyet leser kun opp spørsmål og svaralternativer. Teksten markeres mens den leses. Det gis ingen fasit, hint, forklaringer eller vurdering av svar. Svar på det ordinære prøvearket.',
    n30: '30 spørsmål', t1: 'Teoriprøve 1', t2: 'Teoriprøve 2', tap: 'Trykk for å starte opplesningen.',
    rate: 'Hastighet', voice: 'Stemme', showOrig: 'Vis norsk tekst også', hide: 'Skjul tekst visuelt', stop: '■ Stopp lyd',
    prev: '← Forrige', change: 'Bytt prøve', next: 'Neste →', finish: 'Fullfør →',
    tips: 'Tips: Du kan også bruke piltastene for forrige/neste. Opplesningen går aldri videre automatisk.',
    done: 'Ferdig', doneH: 'Det var siste spørsmål. Prøven er ferdig opplest.', restart: 'Tilbake til valg av prøve',
    q: 'Spørsmål', of: 'av', alt: 'Svaralternativ', readAll: '🔊 Les hele spørsmålet', readAlt: 'Les svaralternativ', image: 'Se på bildet.',
    noVoice: 'Fant ingen stemme for dette språket på denne PC-en. Teksten vises, men kan ikke leses opp. Prøv Chrome eller Edge.' },
  en: { kicker: 'G11 · Read-aloud test', h1: 'Have the theory test read aloud', langH: 'Language',
    notice: 'This tool only reads the questions and answer options aloud. The text is highlighted while it is read. There is no answer key, no hints and no marking. Answer on the ordinary Norwegian answer sheet – the letters A, B, C and D are the same.',
    n30: '30 questions', t1: 'Theory test 1', t2: 'Theory test 2', tap: 'Tap to start reading.',
    rate: 'Speed', voice: 'Voice', showOrig: 'Show the Norwegian text too', hide: 'Hide text', stop: '■ Stop sound',
    prev: '← Previous', change: 'Change test', next: 'Next →', finish: 'Finish →',
    tips: 'Tip: You can also use the arrow keys. Reading never moves on by itself.',
    done: 'Finished', doneH: 'That was the last question. The test has been read.', restart: 'Back to choosing a test',
    q: 'Question', of: 'of', alt: 'Answer option', readAll: '🔊 Read the whole question', readAlt: 'Read answer option', image: 'Look at the picture.',
    noVoice: 'No voice for this language was found on this computer. The text is shown but cannot be read aloud. Try Chrome or Edge.' },
  uk: { kicker: 'G11 · Читання тесту вголос', h1: 'Прослухати теоретичний тест', langH: 'Мова',
    notice: 'Цей інструмент лише читає вголос запитання та варіанти відповідей. Текст підсвічується під час читання. Немає правильних відповідей, підказок чи оцінювання. Відповідайте на звичайному норвезькому бланку – літери A, B, C і D ті самі.',
    n30: '30 запитань', t1: 'Теоретичний тест 1', t2: 'Теоретичний тест 2', tap: 'Натисніть, щоб почати читання.',
    rate: 'Швидкість', voice: 'Голос', showOrig: 'Показувати також норвезький текст', hide: 'Приховати текст', stop: '■ Зупинити звук',
    prev: '← Назад', change: 'Змінити тест', next: 'Далі →', finish: 'Завершити →',
    tips: 'Порада: можна користуватися клавішами зі стрілками. Читання ніколи не переходить далі само.',
    done: 'Готово', doneH: 'Це було останнє запитання. Тест прочитано.', restart: 'Повернутися до вибору тесту',
    q: 'Запитання', of: 'з', alt: 'Варіант відповіді', readAll: '🔊 Прочитати все запитання', readAlt: 'Прочитати варіант', image: 'Подивіться на малюнок.',
    noVoice: 'На цьому комп\'ютері не знайдено голосу для цієї мови. Текст показано, але його не можна прочитати вголос. Спробуйте Chrome або Edge.' }
};
const LANG_RE = { nb: /^(nb|no|nn)/i, en: /^en/i, uk: /^uk/i };
const LANG_TAG = { nb: 'nb-NO', en: 'en-GB', uk: 'uk-UA' };

let lang = (() => { const l = ss.get('g11-prove-lang'); return UI[l] ? l : 'nb'; })();
let tests = null, currentTest = null, idx = 0;
const tx = k => UI[lang][k];

/* ---------- Låsen ---------- */
async function lasOpp(tekst) {
  tests = JSON.parse(tekst).tests;
  $('#lock').classList.add('hidden');
  $('#picker').classList.remove('hidden');
  oversett();
}
async function provHusket() {
  const raw = ss.get(NOKKEL);
  if (!raw || !window.G11_PROVE) return;
  try { await lasOpp(await apneMedNokkel(window.G11_PROVE, fraB64(raw))); } catch (e) { /* be om passord */ }
}
$('#lockForm').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = $('#unlockBtn'), err = $('#lockErr');
  err.textContent = ''; btn.disabled = true; btn.textContent = 'Åpner …';
  try {
    const r = await apne(window.G11_PROVE, $('#pw').value.trim());
    ss.set(NOKKEL, tilB64(r.raw));
    await lasOpp(r.tekst);
  } catch (x) {
    err.textContent = 'Feil passord. Sjekk at du har skrevet det riktig, eller spør læreren.';
  } finally { btn.disabled = false; btn.textContent = 'Åpne prøven'; }
});

/* ---------- Språk ---------- */
function oversett() {
  document.documentElement.lang = lang === 'nb' ? 'no' : lang;
  document.querySelectorAll('[data-t]').forEach(el => { const t = tx(el.dataset.t); if (t) el.textContent = t; });
  document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  $('#showOrig').closest('label').classList.toggle('hidden', lang === 'nb');
  loadVoices();
  if (currentTest) render();
}
document.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => {
  lang = b.dataset.lang; ss.set('g11-prove-lang', lang); stopSpeech(); oversett();
}));

/* ---------- Stemmer (samme prioritering som truckprøven, men per språk) ---------- */
function scoreVoice(v) {
  const name = (v.name || '').toLowerCase(), l = (v.lang || '');
  let s = 0;
  if (LANG_RE[lang].test(l)) s += 100;
  if (lang === 'en' && /^en-gb/i.test(l)) s += 5;
  if (name.includes('natural')) s += 30;
  if (name.includes('online')) s += 20;
  if (name.includes('microsoft')) s += 10;
  return s;
}
const voicesForLang = () => speechSynthesis.getVoices().filter(v => LANG_RE[lang].test(v.lang || '')).sort((a, b) => scoreVoice(b) - scoreVoice(a));
function loadVoices() {
  const sel = $('#voice'), vs = voicesForLang();
  sel.innerHTML = '';
  vs.forEach((v, i) => {
    const o = document.createElement('option');
    o.value = i; o.textContent = `${v.name} (${v.lang})${/natural|online/i.test(v.name) ? ' · naturtro' : ''}`;
    sel.appendChild(o);
  });
  if (!vs.length) { const o = document.createElement('option'); o.textContent = '—'; sel.appendChild(o); }
}
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
const selectedVoice = () => { const vs = voicesForLang(); return vs[Number($('#voice').value || 0)] || vs[0] || null; };

/* ---------- Opplesning med markering ---------- */
let speechQueue = [], speechTimer = null;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]));
function clearHighlights() { document.querySelectorAll('.speaking,.wordSpeaking').forEach(el => el.classList.remove('speaking', 'wordSpeaking')); }
function stopSpeech() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (speechTimer) { clearTimeout(speechTimer); speechTimer = null; }
  speechQueue = []; clearHighlights();
}
function prepareWords(el) {
  const raw = el.dataset.rawText || el.textContent; el.dataset.rawText = raw;
  el.innerHTML = raw.split(/(\s+)/).map((w, i) => /^\s+$/.test(w) ? w : `<span class="spokenWord" data-word-index="${i}">${esc(w)}</span>`).join('');
}
function highlightWordByChar(el, ci) {
  const raw = el.dataset.rawText || el.textContent; let pos = 0;
  for (const sp of el.querySelectorAll('.spokenWord')) {
    const w = sp.textContent, i = raw.indexOf(w, pos);
    if (i >= 0) { if (ci >= i && ci <= i + w.length) { el.querySelectorAll('.wordSpeaking').forEach(x => x.classList.remove('wordSpeaking')); sp.classList.add('wordSpeaking'); return; } pos = i + w.length; }
  }
}
function speakOne(text, el, onEnd) {
  clearHighlights();
  if (el) { el.classList.add('speaking'); prepareWords(el); }
  const v = selectedVoice();
  if (!('speechSynthesis' in window) || !v) { clearHighlights(); if (!v) visIngenStemme(); return; }
  const u = new SpeechSynthesisUtterance(text);
  u.voice = v; u.lang = v.lang || LANG_TAG[lang]; u.rate = Number($('#rate').value || 0.9);
  u.onboundary = e => { if (e.name === 'word' && el) highlightWordByChar(el, e.charIndex); };
  u.onend = u.onerror = () => { clearHighlights(); if (onEnd) onEnd(); };
  speechSynthesis.speak(u);
}
function visIngenStemme() {
  let n = $('#noVoice');
  if (!n) { n = document.createElement('p'); n.id = 'noVoice'; n.className = 'notice'; $('#questionPanel').prepend(n); }
  n.textContent = tx('noVoice');
}
function speakSequence(parts) {
  stopSpeech(); speechQueue = [...parts];
  const next = () => {
    if (!speechQueue.length) return;
    const p = speechQueue.shift();
    speakOne(p.text, p.el, () => { if (speechQueue.length) speechTimer = setTimeout(next, p.pauseAfter ?? 900); });
  };
  next();
}

/* ---------- Visning ---------- */
const L = o => (o && (o[lang] || o.nb)) || '';
function fullSequence(q) {
  const seq = [{ text: `${tx('q')} ${idx + 1}. ${L(q.q)}${q.image ? ' ' + tx('image') : ''}`, el: $('#questionText'), pauseAfter: 1250 }];
  q.a.forEach((t, i) => {
    const row = $('#options').children[i];
    seq.push({ text: `${tx('alt')} ${letters[i]}`, el: row?.querySelector('.optionLabel'), pauseAfter: 1250 });
    seq.push({ text: L(t), el: row?.querySelector('.optionText'), pauseAfter: 1500 });
  });
  return seq;
}
function render() {
  stopSpeech();
  const n = $('#noVoice'); if (n) n.remove();
  const test = tests[currentTest], q = test.questions[idx];
  const visOrig = lang !== 'nb' && $('#showOrig').checked;
  $('#testTitle').textContent = L(test.title);
  $('#qnum').textContent = `${tx('q')} ${idx + 1}`;
  $('#counter').textContent = `${idx + 1} ${tx('of')} ${test.questions.length}`;
  $('#bar').style.width = `${((idx + 1) / test.questions.length) * 100}%`;
  const qt = $('#questionText'); qt.textContent = L(q.q); qt.dataset.rawText = L(q.q); qt.lang = lang === 'nb' ? 'no' : lang;
  const qo = $('#qOrig'); qo.textContent = q.q.nb; qo.classList.toggle('hidden', !visOrig);
  const img = $('#qimg');
  if (q.image) { img.src = q.image; img.alt = L(q.alt); img.classList.remove('hidden'); } else { img.classList.add('hidden'); img.removeAttribute('src'); }
  $('#speakAll').textContent = tx('readAll');
  const opts = $('#options'); opts.innerHTML = '';
  q.a.forEach((t, i) => {
    const row = document.createElement('div');
    row.className = 'option';
    row.innerHTML = `<div class="letter">${letters[i]}</div><div><div class="optionLabel">${tx('alt')} ${letters[i]}</div><div class="optionText"></div>${visOrig ? '<div class="orig"></div>' : ''}</div><button class="iconBtn" aria-label="${tx('readAlt')} ${letters[i]}">🔊</button>`;
    const ot = row.querySelector('.optionText'); ot.textContent = L(t); ot.dataset.rawText = L(t);
    if (visOrig) row.querySelector('.orig').textContent = t.nb;
    row.querySelector('button').addEventListener('click', () => speakSequence([
      { text: `${tx('alt')} ${letters[i]}`, el: row.querySelector('.optionLabel'), pauseAfter: 1250 },
      { text: L(t), el: ot, pauseAfter: 0 }
    ]));
    opts.appendChild(row);
  });
  $('#prev').disabled = idx === 0;
  $('#next').textContent = idx === test.questions.length - 1 ? tx('finish') : tx('next');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function chooseTest(id) {
  currentTest = id; idx = 0;
  $('#picker').classList.add('hidden'); $('#finished').classList.add('hidden'); $('#player').classList.remove('hidden');
  render();
}

document.querySelectorAll('[data-test]').forEach(b => b.addEventListener('click', () => chooseTest(b.dataset.test)));
$('#speakAll').addEventListener('click', () => speakSequence(fullSequence(tests[currentTest].questions[idx])));
$('#stop').addEventListener('click', stopSpeech);
$('#prev').addEventListener('click', () => { if (idx > 0) { idx--; render(); } });
$('#next').addEventListener('click', () => {
  const n = tests[currentTest].questions.length;
  if (idx < n - 1) { idx++; render(); }
  else { stopSpeech(); $('#player').classList.add('hidden'); $('#finished').classList.remove('hidden'); }
});
$('#backToPicker').addEventListener('click', () => { stopSpeech(); $('#player').classList.add('hidden'); $('#picker').classList.remove('hidden'); currentTest = null; });
$('#restart').addEventListener('click', () => { $('#finished').classList.add('hidden'); $('#picker').classList.remove('hidden'); currentTest = null; });
$('#hideText').addEventListener('change', e => $('#questionPanel').classList.toggle('textHidden', e.target.checked));
$('#showOrig').addEventListener('change', () => { if (currentTest) render(); });
document.addEventListener('keydown', e => {
  if ($('#player').classList.contains('hidden') || /input|select|textarea/i.test(e.target.tagName)) return;
  if (e.key === 'ArrowRight') $('#next').click();
  if (e.key === 'ArrowLeft') $('#prev').click();
  if (e.key === 'Escape') stopSpeech();
});

provHusket();
