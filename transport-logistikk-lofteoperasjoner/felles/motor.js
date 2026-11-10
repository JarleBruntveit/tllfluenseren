/* =====================================================================
   MOTOR – felles for alle kapittelsider og prøver i TLL på TLLfluenseren
   Kapittelsiden: <body data-side="kapittel" data-kapittel="kap1"> + kap1/data.js
   Prøvesiden:    <body data-side="prove"> + felles/kapitler.js
   Krever felles/fremdrift.js.
   ===================================================================== */
(function(){
'use strict';
const TLL = window.TLL;
const NDLA = 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/';
const NIVA = {0:'Alle nivåer',1:'Nybegynner',2:'Trygg',3:'Ekspert'};
const NIVA_KORT = {1:'Nybegynner',2:'Trygg',3:'Ekspert'};
const TYPE = {flash:'Begrepskort',quiz:'Quiz',tf:'Sant eller usant',fill:'Fyll inn',match:'Koble sammen',order:'Rekkefølge',sort:'Sorter',calc:'Regneoppgaver',check:'Avvikskontroll',hotspot:'Bildeoppgave',case:'Case',reflect:'Skriveoppgave',sim:'Simulering',voks:'60 sekunder'};
const FASER = [
  {id:'laer', nr:'01', ikon:'↗', navn:'Lær', tekst:'Få tak på det viktigste. Tydelige forklaringer, eksempler og fagstoff.'},
  {id:'ov',   nr:'02', ikon:'✓', navn:'Øv',  tekst:'Tren på det du skal mestre. Repetisjon og interaktive oppgaver.'},
  {id:'tenk', nr:'03', ikon:'?', navn:'Tenk', tekst:'Stopp opp og vurder. Situasjoner fra arbeidslivet som utfordrer faglig skjønn.'},
  {id:'voks', nr:'04', ikon:'+', navn:'Voks', tekst:'Korte perspektiver på ansvar, samarbeid, vaner og det å fungere godt i arbeidslivet.'}
];
const FASE_AV_TYPE = {flash:'laer', quiz:'ov', tf:'ov', fill:'ov', match:'ov', order:'ov', sort:'ov', calc:'ov', hotspot:'ov', check:'tenk', case:'tenk', sim:'tenk', reflect:'tenk', voks:'voks'};
const faseAv = a => a.fase || FASE_AV_TYPE[a.type];
const faseNavn = id => FASER.find(f => f.id === id).navn;
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const strip = s => String(s).replace(/<[^>]+>/g,'');
let rand = Math.random;
const shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){ const j=Math.floor(rand()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
const rnd = (a,b) => a + Math.floor(Math.random()*(b-a+1));
const seeded = seed => { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; };

/* ---------- tema (lys/mørk) ---------- */
try { const t = TLL.ls.get('tll-theme'); if (t) document.documentElement.dataset.theme = t; } catch(e){}
const themeBtn = $('#themeBtn');
if (themeBtn) themeBtn.onclick = () => {
  const cur = document.documentElement.dataset.theme || 'dark';
  const nxt = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nxt; TLL.ls.set('tll-theme', nxt);
};
const skip = document.querySelector('.tll-skip');
if (skip) skip.addEventListener('click', e => { const m = $('#app'); if (m){ e.preventDefault(); m.focus(); m.scrollIntoView({block:'start'}); } });

/* ---------- opplesning ---------- */
const SPK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';
const canSpeak = 'speechSynthesis' in window;
function speak(text){
  if (!canSpeak) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(strip(text));
  u.lang = 'nb-NO'; u.rate = 0.95;
  const v = speechSynthesis.getVoices().find(v => /^(nb|no|nn)/i.test(v.lang));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
const sayBtn = txt => canSpeak ? `<button class="say" data-say="${esc(strip(txt))}" title="Les opp" aria-label="Les opp">${SPK}</button>` : '';
document.addEventListener('click', e => { const b = e.target.closest('[data-say]'); if (b){ e.stopPropagation(); speak(b.dataset.say); } });

/* ---------- skriftlige svar ---------- */
/* ctx = { kapId, store } – settes av kapittelsiden. */
const mem = {};            // { kapId: { actId: tekst } } – tekst som bare ligger i minnet
let ctx = null;
const getText = id => { const m = mem[ctx.kapId] || {}; if (ctx.store.saveText){ const v = TLL.ls.get(TLL.tekstNokkel(ctx.kapId, id)); return v != null ? v : (m[id] || ''); } return m[id] || ''; };
const setText = (id, v) => { (mem[ctx.kapId] = mem[ctx.kapId] || {})[id] = v; if (ctx.store.saveText) TLL.ls.set(TLL.tekstNokkel(ctx.kapId, id), v); };
const delText = id => { if (mem[ctx.kapId]) delete mem[ctx.kapId][id]; TLL.ls.del(TLL.tekstNokkel(ctx.kapId, id)); };
const clearTexts = () => { TLL.tekstNokler(ctx.kapId).forEach(k => TLL.ls.del(k)); mem[ctx.kapId] = {}; };
function textNote(){
  return ctx.store.saveText
    ? `<div class="note warn" id="tnote"><span aria-hidden="true">💾</span><span><b>Lagres automatisk her.</b> Teksten din lagres i nettleseren, og andre som bruker PC-en kan se den. Læreren får teksten når du leverer fremdriftsrapporten med tekstene dine. <button class="linkbtn" id="tdel">Slett teksten</button> · <a href="#/lagring">Endre</a></span></div>`
    : `<div class="note" id="tnote"><span aria-hidden="true">🔒</span><span><b>Lagres ikke på PC-en.</b> Teksten blir borte når du lukker siden. Vil du levere den, lager du en <a href="#/rapport">fremdriftsrapport</a> med tekstene før du lukker siden. <a href="#/lagring">Endre</a></span></div>`;
}
function wireTextNote(id, ta){
  const d = $('#tdel'); if (d) d.onclick = () => { delText(id); ta.value = ''; ta.dispatchEvent(new Event('input')); delText(id); d.textContent = 'Slettet ✓'; };
}
function copyText(ta, btn){
  ta.select();
  try { navigator.clipboard.writeText(ta.value); } catch(e){ try { document.execCommand('copy'); } catch(e2){} }
  btn.textContent = 'Kopiert ✓';
}

function resultBox(pct, again, extra){
  const msg = pct >= 90 ? 'Råsterkt! Du har god kontroll på dette.' : pct >= 70 ? 'Bra jobbet! Se over det du bommet på.' : pct >= 50 ? 'Godt i gang. Les «Kort fortalt» og prøv igjen.' : 'Les fagstoffet en gang til, og prøv på nytt.';
  return `<div class="panel result"><div class="big">${Math.round(pct)} %</div><div class="msg">${msg}</div>${extra||''}
    <div class="row" style="justify-content:center"><button class="btn" id="again">Prøv igjen</button></div></div>`;
}
const nextRow = (last, label) => `<div class="row" style="margin-top:12px"><span class="spacer"></span><button class="btn yellow" id="nx">${last ? (label || 'Se resultat') : 'Neste →'}</button></div>`;

/* =================== AKTIVITETER =================== */
function runFlash(st, a, done){
  let order = a.kort.map((_,i)=>i), i = 0; const seen = new Set();
  const draw = () => {
    const [f,b] = a.kort[order[i]];
    st.innerHTML = `<p class="instr">Trykk på kortet for å snu det. Bruk pilene for å bla. Du er ferdig når du har snudd alle kortene.</p>
      <div class="flash" id="fc"><div class="inner">
        <div class="face front">${esc(f)}<div class="hint">Trykk for å snu</div></div>
        <div class="face back">${esc(b)}</div></div></div>
      <div class="row"><button class="btn ghost" id="prev" aria-label="Forrige">←</button>
        <span class="counter">${i+1} / ${a.kort.length} · snudd ${seen.size}</span>
        <button class="btn ghost" id="next" aria-label="Neste">→</button>
        <span class="spacer"></span>${sayBtn(f + '. ' + b)}
        <button class="btn ghost" id="mix">Bland</button></div>`;
    const fc = $('#fc');
    fc.onclick = () => { fc.classList.toggle('flipped'); const had = seen.size; seen.add(order[i]); if (seen.size === a.kort.length && had < a.kort.length) done(100); };
    $('#prev').onclick = () => { i = (i - 1 + a.kort.length) % a.kort.length; draw(); };
    $('#next').onclick = () => { i = (i + 1) % a.kort.length; draw(); };
    $('#mix').onclick = () => { order = shuffle(order); i = 0; draw(); };
  };
  draw();
}

function runQuiz(st, a, done, t, opts){
  opts = opts || {};
  const qs = opts.questions || shuffle(a.sp);
  let i = 0, score = 0; const wrong = [];
  const draw = () => {
    const q = qs[i];
    const ord = q.fast ? q.a.map((_,k)=>k) : shuffle(q.a.map((_,k)=>k));
    st.innerHTML = `<div class="row"><span class="counter">Spørsmål ${i+1} av ${qs.length}</span><span class="spacer"></span><span class="counter">${score} riktige</span></div>
      <div class="meter"><i style="width:${100*i/qs.length}%"></i></div>
      ${q._tema ? `<div class="small muted">${esc(q._tema)}</div>` : ''}
      <div class="q"><span>${esc(q.q)}</span>${sayBtn(q.q + '. ' + ord.map((k,n)=>'ABCDE'[n] + ': ' + q.a[k]).join('. '))}</div>
      <div class="opts">${ord.map((k,n) => `<button class="opt" data-k="${k}"><span class="k">${'ABCDE'[n]}</span><span>${esc(q.a[k])}</span></button>`).join('')}</div>
      <div id="fb"></div>`;
    st.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const k = +b.dataset.k, ok = k === q.r;
      if (ok) score++; else wrong.push(q);
      st.querySelectorAll('.opt').forEach(x => { x.disabled = true; if (+x.dataset.k === q.r) x.classList.add('ok'); });
      if (!ok) b.classList.add('bad');
      $('#fb').innerHTML = `<div class="fb ${ok?'':'bad'}"><b>${ok ? 'Riktig!' : 'Ikke helt.'}</b> ${esc(q.f||'')}</div>` + nextRow(i+1 >= qs.length);
      $('#nx').focus();
      $('#nx').onclick = () => { i++; i < qs.length ? draw() : finish(); };
    });
  };
  const finish = () => {
    const pct = 100*score/qs.length;
    let extra = '';
    if (opts.perTema){
      const m = {}; qs.forEach(q => { m[q._tema] = m[q._tema] || {r:0,n:0}; m[q._tema].n++; if (!wrong.includes(q)) m[q._tema].r++; });
      extra = `<div style="text-align:left;max-width:480px;margin:0 auto 16px">${Object.entries(m).map(([k,v]) =>
        `<div class="row small" style="padding:4px 0;border-top:1px solid var(--line)"><span>${esc(k)}</span><span class="spacer"></span><b style="color:${v.r===v.n?'var(--ok)':'var(--bad)'}">${v.r}/${v.n}</b></div>`).join('')}</div>`;
      done(pct, { riktige: score, antall: qs.length, perTema: m });
    } else done(pct);
    st.innerHTML = resultBox(pct, true, `<p class="muted">${score} av ${qs.length} riktige</p>${extra}${opts.etter || ''}`);
    $('#again').onclick = () => opts.restart ? opts.restart() : runQuiz(st, a, done, t);
  };
  draw();
}

function runTF(st, a, done){
  const ps = shuffle(a.ps); let i = 0, score = 0;
  const draw = () => {
    const [p, sant, f] = ps[i];
    st.innerHTML = `<div class="row"><span class="counter">Påstand ${i+1} av ${ps.length}</span><span class="spacer"></span><span class="counter">${score} riktige</span></div>
      <div class="meter"><i style="width:${100*i/ps.length}%"></i></div>
      <div class="tf-card"><span>${esc(p)}</span>${sayBtn(p)}</div>
      <div class="tf-btns"><button data-v="1">Sant</button><button data-v="0">Usant</button></div><div id="fb"></div>`;
    st.querySelectorAll('.tf-btns button').forEach(b => b.onclick = () => {
      const svar = b.dataset.v === '1', ok = svar === !!sant; if (ok) score++;
      st.querySelectorAll('.tf-btns button').forEach(x => { x.disabled = true; if ((x.dataset.v === '1') === !!sant) x.classList.add('ok'); });
      if (!ok) b.classList.add('bad');
      $('#fb').innerHTML = `<div class="fb ${ok?'':'bad'}" style="margin-top:12px"><b>${ok ? 'Riktig!' : (sant ? 'Påstanden er sann.' : 'Påstanden er usann.')}</b> ${esc(f||'')}</div>` + nextRow(i+1 >= ps.length);
      $('#nx').focus(); $('#nx').onclick = () => { i++; i < ps.length ? draw() : fin(); };
    });
  };
  const fin = () => { const pct = 100*score/ps.length; done(pct); st.innerHTML = resultBox(pct, true, `<p class="muted">${score} av ${ps.length} riktige</p>`); $('#again').onclick = () => runTF(st,a,done); };
  draw();
}

function runFill(st, a, done){
  const parts = a.tekst.split(/\[\[(.+?)\]\]/);
  const answers = parts.filter((_,i) => i % 2 === 1);
  const bank = shuffle(Array.from(new Set(answers.concat(a.ekstra || []))));
  let html = '', n = 0;
  parts.forEach((p,i) => { if (i % 2 === 0) html += esc(p); else { html += `<select data-i="${n}" aria-label="Tomrom ${n+1}"><option value="">— velg —</option>${bank.map(w => `<option>${esc(w)}</option>`).join('')}</select>`; n++; } });
  st.innerHTML = `<p class="instr">${esc(a.instr || 'Velg riktig ord i hvert tomrom.')}</p>
    <div class="panel fill-text">${html}</div>
    <div class="row" style="margin-top:14px"><span class="counter" id="fc2">0 av ${answers.length} fylt inn</span><span class="spacer"></span>${sayBtn(a.tekst.replace(/\[\[(.+?)\]\]/g,'…'))}<button class="btn yellow" id="chk" disabled>Sjekk</button></div><div id="fr"></div>`;
  const sels = [...st.querySelectorAll('select')];
  sels.forEach(s => s.onchange = () => { const k = sels.filter(x => x.value).length; $('#fc2').textContent = `${k} av ${answers.length} fylt inn`; $('#chk').disabled = k < answers.length; s.classList.remove('ok','bad'); });
  $('#chk').onclick = () => {
    let r = 0; sels.forEach((s,i) => { const ok = s.value === answers[i]; if (ok) r++; s.classList.remove('ok','bad'); s.classList.add(ok?'ok':'bad'); });
    const pct = 100*r/answers.length; done(pct);
    $('#fr').innerHTML = r === answers.length
      ? `<div class="fb" style="margin-top:12px"><b>Alt riktig!</b> ${esc(a.f || '')}</div>` + resultBox(pct)
      : `<div class="fb bad" style="margin-top:12px"><b>${r} av ${answers.length} riktige.</b> De røde er feil. Endre dem og sjekk igjen.</div>`;
    const ag = $('#again'); if (ag) ag.onclick = () => runFill(st,a,done);
  };
}

function runMatch(st, a, done){
  const L = shuffle(a.par.map((p,i)=>({t:p[0],i}))), R = shuffle(a.par.map((p,i)=>({t:p[1],i})));
  let sel = null, errors = 0, matched = 0;
  st.innerHTML = `<p class="instr">${esc(a.instr||'Koble sammen.')}</p>
    <div class="match"><div class="col">${L.map(x=>`<button class="mi left" data-s="L" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div>
    <div class="col">${R.map(x=>`<button class="mi" data-s="R" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div></div>
    <p class="counter" id="mc" style="margin-top:12px">0 av ${a.par.length} koblet · 0 feil</p><div id="mr"></div>`;
  st.querySelectorAll('.mi').forEach(b => b.onclick = () => {
    if (b.classList.contains('done')) return;
    if (!sel || sel.dataset.s === b.dataset.s){ if (sel) sel.classList.remove('sel'); sel = b; b.classList.add('sel'); return; }
    if (sel.dataset.i === b.dataset.i){
      [sel,b].forEach(x => { x.classList.remove('sel'); x.classList.add('done'); x.disabled = true; }); matched++;
    } else {
      errors++; const s = sel; [s,b].forEach(x => { x.classList.remove('wrong'); void x.offsetWidth; x.classList.add('wrong'); });
      s.classList.remove('sel');
    }
    sel = null;
    $('#mc').textContent = `${matched} av ${a.par.length} koblet · ${errors} feil`;
    if (matched === a.par.length){
      const pct = 100*a.par.length/(a.par.length+errors); done(pct);
      $('#mr').innerHTML = resultBox(pct); $('#again').onclick = () => runMatch(st,a,done);
    }
  });
}

function runOrder(st, a, done){
  let cur = shuffle(a.steg.map((s,i)=>i));
  while (a.steg.length > 1 && cur.every((v,i)=>v===i)) cur = shuffle(cur);
  let tries = 0;
  const draw = (checked) => {
    st.innerHTML = `<p class="instr">${esc(a.instr)} Flytt med pilene.</p>
      <ol class="olist">${cur.map((k,p) => `<li class="oi ${checked ? (k===p?'ok':'bad') : ''}">
        <span class="n">${p+1}</span><span class="t">${esc(a.steg[k])}</span>
        <span class="mv"><button data-up="${p}" aria-label="Flytt opp" ${p===0?'disabled':''}>▲</button><button data-dn="${p}" aria-label="Flytt ned" ${p===cur.length-1?'disabled':''}>▼</button></span></li>`).join('')}</ol>
      <div class="row" style="margin-top:14px"><span class="counter">Forsøk: ${tries}</span><span class="spacer"></span><button class="btn yellow" id="chk">Sjekk rekkefølgen</button></div><div id="or"></div>`;
    st.querySelectorAll('[data-up]').forEach(b => b.onclick = () => { const p=+b.dataset.up; [cur[p-1],cur[p]]=[cur[p],cur[p-1]]; draw(); });
    st.querySelectorAll('[data-dn]').forEach(b => b.onclick = () => { const p=+b.dataset.dn; [cur[p+1],cur[p]]=[cur[p],cur[p+1]]; draw(); });
    $('#chk').onclick = () => {
      tries++;
      const right = cur.filter((k,p)=>k===p).length;
      draw(true);
      if (right === cur.length){
        const pct = Math.max(40, 100 - (tries-1)*20); done(pct);
        $('#or').innerHTML = `<div class="fb"><b>Helt riktig!</b> ${tries===1?'På første forsøk.':`Du brukte ${tries} forsøk.`} ${esc(a.f || '')}</div>` + resultBox(pct);
        $('#again').onclick = () => runOrder(st,a,done);
        st.querySelectorAll('.mv button,#chk').forEach(b=>b.disabled=true);
      } else {
        $('#or').innerHTML = `<div class="fb bad"><b>${right} av ${cur.length} står riktig.</b> De grønne står på riktig plass. Flytt de røde og sjekk igjen.</div>`;
      }
    };
  };
  draw();
}

function runSort(st, a, done){
  const items = shuffle(a.items.map((x,i)=>({t:x[0],k:x[1],why:x[2]||'',i})));
  const ans = {};
  st.innerHTML = `<p class="instr">${esc(a.instr)}</p>
    <div class="sitems">${items.map(x => `<div class="si" data-i="${x.i}"><div class="t">${esc(x.t)}</div>
      <div class="cats">${a.kat.map((c,ci)=>`<button data-c="${ci}" aria-pressed="false">${esc(c)}</button>`).join('')}</div><div class="why" hidden></div></div>`).join('')}</div>
    <div class="row" style="margin-top:14px"><span class="counter" id="sc">0 av ${items.length} plassert</span><span class="spacer"></span><button class="btn yellow" id="chk" disabled>Sjekk svarene</button></div><div id="sr"></div>`;
  st.querySelectorAll('.si').forEach(el => {
    el.querySelectorAll('button').forEach(b => b.onclick = () => {
      ans[el.dataset.i] = +b.dataset.c;
      el.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x===b));
      const n = Object.keys(ans).length; $('#sc').textContent = `${n} av ${items.length} plassert`; $('#chk').disabled = n < items.length;
    });
  });
  $('#chk').onclick = () => {
    let r = 0;
    items.forEach(x => {
      const el = st.querySelector(`.si[data-i="${x.i}"]`), ok = ans[x.i] === x.k; if (ok) r++;
      el.classList.remove('ok','bad'); el.classList.add(ok?'ok':'bad');
      const w = el.querySelector('.why'); w.hidden = false; w.innerHTML = ok ? esc(x.why) : `<b>Riktig: ${esc(a.kat[x.k])}.</b> ${esc(x.why)}`;
      el.querySelectorAll('button').forEach(b => b.disabled = true);
    });
    const pct = 100*r/items.length; done(pct);
    $('#chk').hidden = true;
    $('#sr').innerHTML = resultBox(pct, true, `<p class="muted">${r} av ${items.length} riktige</p>`);
    $('#again').onclick = () => runSort(st,a,done);
  };
}

/* Avvikskontroll: et dokument med rader. Eleven krysser av radene som har avvik. */
function runCheck(st, a, done){
  st.innerHTML = `<p class="instr">${esc(a.instr)}</p>
    <div class="doc"><h4>${esc(a.dok)}</h4>${a.meta ? `<div class="meta">${esc(a.meta)}</div>` : ''}
    <table class="ctab"><thead><tr><th>${esc(a.kryss || 'Avvik?')}</th>${a.kolonner.map(k => `<th>${esc(k)}</th>`).join('')}</tr></thead>
    <tbody>${a.rader.map((r,i) => `<tr data-i="${i}"><td class="cb"><input type="checkbox" aria-label="Rad ${i+1}"></td>${r.c.map((c,j) => `<td data-l="${esc(a.kolonner[j] || '')}">${esc(c)}${j === r.c.length-1 ? '<div class="why" hidden></div>' : ''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <div class="row" style="margin-top:14px"><span class="spacer"></span><button class="btn yellow" id="chk">Sjekk</button></div><div id="cr"></div>`;
  $('#chk').onclick = () => {
    let r = 0;
    a.rader.forEach((row,i) => {
      const tr = st.querySelector(`tr[data-i="${i}"]`), on = tr.querySelector('input').checked, ok = on === !!row.avvik;
      if (ok) r++; tr.classList.remove('ok','bad'); tr.classList.add(ok ? 'ok' : 'bad');
      const w = tr.querySelector('.why'); if (row.f){ w.hidden = false; w.textContent = (row.avvik ? 'Avvik: ' : 'I orden: ') + row.f; }
      tr.querySelector('input').disabled = true;
    });
    const pct = 100*r/a.rader.length; done(pct);
    $('#chk').hidden = true;
    $('#cr').innerHTML = `${a.etter ? `<div class="fb" style="margin-top:12px">${esc(a.etter)}</div>` : ''}` + resultBox(pct, true, `<p class="muted">${r} av ${a.rader.length} rader vurdert riktig</p>`);
    $('#again').onclick = () => runCheck(st,a,done);
  };
}

/* Bildeoppgave: trykk på riktig område i en tegning (egne tegninger, SVG). */
function runHotspot(st, a, done){
  const qs = shuffle(a.sp); let i = 0, score = 0, first = true;
  st.innerHTML = `<p class="instr">${esc(a.instr || 'Trykk på riktig sted i tegningen.')}</p>
    <div class="row"><span class="counter" id="hc"></span><span class="spacer"></span><span class="counter" id="hs"></span></div>
    <div class="meter"><i id="hm"></i></div>
    <div class="hs-q"><span id="hq"></span><span id="hsay"></span></div>
    <div class="hs-wrap">${a.svg}</div><div id="fb"></div>`;
  const zones = [...st.querySelectorAll('[data-z]')];
  zones.forEach((z,n) => { z.setAttribute('tabindex','0'); z.setAttribute('role','button'); z.setAttribute('aria-label', 'Område ' + (n+1)); });
  const show = () => {
    const q = qs[i]; first = true;
    zones.forEach(z => z.classList.remove('hit','miss'));
    $('#hc').textContent = `Spørsmål ${i+1} av ${qs.length}`; $('#hs').textContent = `${score} riktige`;
    $('#hm').style.width = (100*i/qs.length) + '%';
    $('#hq').textContent = q.q; $('#hsay').innerHTML = sayBtn(q.q); $('#fb').innerHTML = '';
  };
  const pick = z => {
    const q = qs[i]; if (!q || $('#nx')) return;
    if (z.dataset.z === q.z){
      if (first) score++;
      zones.filter(x => x.dataset.z === q.z).forEach(x => x.classList.add('hit'));
      $('#fb').innerHTML = `<div class="fb" style="margin-top:12px"><b>Riktig!</b> ${esc(q.f||'')}</div>` + nextRow(i+1 >= qs.length);
      $('#nx').focus(); $('#nx').onclick = () => { i++; i < qs.length ? show() : fin(); };
    } else {
      first = false; z.classList.add('miss');
      $('#fb').innerHTML = `<div class="fb bad" style="margin-top:12px"><b>Ikke der.</b> Prøv et annet sted.</div>`;
    }
  };
  zones.forEach(z => { z.addEventListener('click', () => pick(z)); z.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); pick(z); } }); });
  const fin = () => { const pct = 100*score/qs.length; done(pct); $('#fb').innerHTML = resultBox(pct, true, `<p class="muted">Riktig på første forsøk: ${score} av ${qs.length}</p>`); $('#again').onclick = () => runHotspot(st,a,done); };
  show();
}

/* Regneoppgaver: generatorer */
const VARER = ['vaskemiddel','kaffe','hermetikk','toalettpapir','kopipapir','hundefôr','oppvasktabletter','brus'];
const GEN = {
  saldo(){ const s=rnd(8,40), inn=rnd(0,1)?rnd(5,24):0, p=rnd(2,Math.min(30,s+inn)); const v=VARER[rnd(0,VARER.length-1)];
    return { task:`En lokasjon med ${v} har <b>${s}</b> kartonger når dagen starter. I løpet av dagen ryddes <b>${inn}</b> nye kartonger inn, og det plukkes <b>${p}</b> kartonger. Hva er lagersaldoen ved slutten av dagen?`,
      ans:s+inn-p, unit:'kartonger', steps:[`Saldo = start + inn − plukket`,`${s} + ${inn} − ${p} = <b>${s+inn-p}</b> kartonger`] }; },
  bp(){ const f=rnd(1,8), l=rnd(2,10); const v=VARER[rnd(0,VARER.length-1)];
    return { task:`Regionlageret selger i gjennomsnitt <b>${f}</b> kartonger ${v} per dag. Ledetida fra bestilling til leveranse er <b>${l}</b> dager. Hvor mange kartonger skal saldoen vise når systemet foreslår ny bestilling (bestillingspunktet)? Regn uten sikkerhetslager.`,
      ans:f*l, unit:'kartonger', steps:[`Bestillingspunkt = forbruk per dag × ledetid`,`${f} × ${l} = <b>${f*l}</b> kartonger`,`Da kommer de nye varene omtrent når lageret er tomt.`] }; },
  bpsl(){ const f=rnd(2,12), l=rnd(3,12), sl=rnd(1,4)*f; const v=VARER[rnd(0,VARER.length-1)];
    return { task:`Et lager selger <b>${f}</b> kartonger ${v} per dag. Ledetida er <b>${l}</b> dager. Lageret vil ha et sikkerhetslager på <b>${sl}</b> kartonger. Hvor ligger bestillingspunktet?`,
      ans:f*l+sl, unit:'kartonger', steps:[`Forbruk i ledetida = ${f} × ${l} = ${f*l}`,`Bestillingspunkt = forbruk i ledetida + sikkerhetslager`,`${f*l} + ${sl} = <b>${f*l+sl}</b> kartonger`] }; },
  pall(){ const n=rnd(1,3)===1?33:rnd(12,66), pr=[65,75,90,100,110,120][rnd(0,5)];
    return { task:`En leveranse kommer med <b>${n}</b> europaller. Leverandøren belaster <b>${pr} kr</b> per pall i tillegg til varene. Hva er samlet pallverdi?`,
      ans:n*pr, unit:'kr', steps:[`Pallverdi = antall paller × pris per pall`,`${n} × ${pr} = <b>${(n*pr).toLocaleString('nb-NO')}</b> kr`, n===33?'(En fullastet semitrailer har plass til 33 paller i ett plan.)':''] }; },
  pallretur(){ const inn=rnd(20,40), ret=rnd(5,inn-5), pr=[65,80,100][rnd(0,2)], diff=inn-ret;
    return { task:`Du mottok <b>${inn}</b> europaller fra leverandøren, og hver pall ble fakturert med <b>${pr} kr</b>. Du sender <b>${ret}</b> paller i retur. Hvor mye skal leverandøren godskrive (trekke fra) for pallene du returnerer?`,
      ans:ret*pr, unit:'kr', steps:[`Godskriving = antall returnerte paller × pris per pall`,`${ret} × ${pr} = <b>${(ret*pr).toLocaleString('nb-NO')}</b> kr`,`Du betaler da bare for de ${diff} pallene du beholder.`] }; },
  dager(){ const lager=rnd(4,30)*2, f=rnd(2,6), l=rnd(2,8); const d=Math.floor(lager/f), ok = d > l;
    return { task:`Lagersaldoen for en vare er <b>${lager}</b> kartonger, og lageret selger <b>${f}</b> kartonger per dag. Hvor mange <b>hele dager</b> varer lageret før det er tomt? (Ledetida for ny bestilling er ${l} dager.)`,
      ans:d, unit:'dager', steps:[`Dager = saldo ÷ salg per dag`,`${lager} ÷ ${f} = ${(lager/f).toLocaleString('nb-NO',{maximumFractionDigits:1})} → <b>${d}</b> hele dager`, ok ? `Det er mer enn ledetida på ${l} dager, så det er tid til å bestille.` : `Det er ikke mer enn ledetida på ${l} dager – bestill nå!`] }; },

  /* ---- Kap 5 Sikring av last. Alle svar er hele tall (faktorer regnes i tideler for å unngå avrundingsfeil). ---- */
  tyngde(){ const kg = rnd(1,60)*25, g = GODS[rnd(0,GODS.length-1)];
    return { task:`Et kolli med ${g} veier <b>${fmt(kg)} kg</b>. Med hvor stor kraft trekker tyngdekraften kolliet ned mot lasteplanet? Regn med at 1 kg gir 10 N.`,
      ans:kg*10, unit:'N', steps:[`Kraft (N) = masse (kg) × 10`,`${fmt(kg)} × 10 = <b>${fmt(kg*10)}</b> N`] }; },
  sikrkrav(){ const v = KJORETOY[rnd(0,KJORETOY.length-1)], kg = rnd(v.min,v.max)*100, dir = ['framover','bakover','sidevegs'][rnd(0,2)];
    const f = dir === 'framover' ? v.f : 5, ans = kg*f/10;
    return { task:`Du skal frakte <b>${fmt(kg)} kg</b> gods på en ${v.n}. Hvor mange kg må lastsikringen minst kunne holde igjen <b>${dir}</b>?`,
      ans, unit:'kg', steps:[dir === 'framover' ? `Framover: ${v.f === 8 ? 'tunge kjøretøy (M2, M3, N2, N3, O3, O4) – 0,8 × vekta' : 'lettere kjøretøy – 1,0 × vekta'}` : `${dir[0].toUpperCase() + dir.slice(1)}: 0,5 × vekta for alle kjøretøy`,`${fmt(kg)} × ${tidel(f)} = <b>${fmt(ans)}</b> kg`] }; },
  friksjon(){ const kg = rnd(2,30)*100, m = [2,3,4,5,6][rnd(0,4)], N = kg*10;
    return { task:`Et kolli på <b>${fmt(kg)} kg</b> står på lasteplanet. Friksjonskoeffisienten mellom kolliet og underlaget er <b>µ = ${tidel(m)}</b>. Hvor stor kraft (N) holder friksjonen igjen?`,
      ans:kg*m, unit:'N', steps:[`Tyngde = ${fmt(kg)} kg × 10 = ${fmt(N)} N`,`Friksjonskraft = tyngde × µ`,`${fmt(N)} × ${tidel(m)} = <b>${fmt(kg*m)}</b> N`] }; },
  restkraft(){ const kg = rnd(3,30)*100, fram = rnd(0,1) === 1, krav = fram ? 8 : 5, m = fram ? [2,3,4,5,6][rnd(0,4)] : [1,2,3,4][rnd(0,3)], N = kg*10;
    return { task:`Et kolli på <b>${fmt(kg)} kg</b> står på en lastebil (N3). Friksjonen mellom kolliet og planet er <b>µ = ${tidel(m)}</b>. Hvor mange newton må du sikre med blokkering eller surring for å hindre at kolliet glir <b>${fram ? 'framover' : 'sidevegs'}</b>?`,
      ans:kg*(krav-m), unit:'N', steps:[`Tyngde = ${fmt(kg)} × 10 = ${fmt(N)} N`,`Krav ${fram ? 'framover' : 'sidevegs'} = ${fmt(N)} × ${tidel(krav)} = ${fmt(kg*krav)} N`,`Friksjonen holder = ${fmt(N)} × ${tidel(m)} = ${fmt(kg*m)} N`,`Må sikres = ${fmt(kg*krav)} − ${fmt(kg*m)} = <b>${fmt(kg*(krav-m))}</b> N`] }; },
  /* Oppslag i øvingstabellen som kapitlet sender med (a.tabell, a.friksjon). Nivå: a.medMateriale = eleven må finne µ selv. */
  overfallTabell(a){ const T = a.tabell, rader = T.rader.filter(r => r.fram), F = a.friksjon || [];
    let kg, fram, rad, mat, need, cap, ans;
    do {
      if (a.medMateriale){ mat = F[rnd(0,F.length-1)]; rad = T.rader.find(r => r.mu === mat[1]); }
      else { rad = rader[rnd(0,rader.length-1)]; mat = null; }
      fram = rnd(0,1) === 1 || !rad.side; kg = rnd(5,40)*100; need = kg*(fram ? 8 : 5)/10;
      cap = fram ? rad.fram : rad.side; ans = cap ? Math.ceil(need/cap) : 0;
    } while (!cap || ans < 1 || ans > 8);
    const mu = tidel2(rad.mu), retn = fram ? 'framover' : 'sidevegs';
    return { task:`Et kolli på <b>${fmt(kg)} kg</b> skal sikres med overfallssurringer på en lastebil (N3). ${mat ? `Kontaktflaten er <b>${mat[0]}</b>.` : `Friksjonen mellom kolliet og planet er <b>µ = ${mu}</b>.`} Bruk øvingstabellen. Hvor mange overfallssurringer trenger du for å sikre <b>${retn}</b>?`,
      ans, unit:'surringer', steps:[
        ...(mat ? [`Friksjonstabellen: ${mat[0]} → µ = ${mu}`] : []),
        `Øvingstabellen, rad µ = ${mu}, kolonne ${retn}: én surring holder ${fmt(cap)} kg`,
        `Krav ${retn} = ${fmt(kg)} × ${fram ? '0,8' : '0,5'} = ${fmt(need)} kg`,
        `${fmt(need)} ÷ ${fmt(cap)} = ${(need/cap).toLocaleString('nb-NO',{maximumFractionDigits:2})} → rund alltid <b>opp</b>: <b>${ans}</b> surringer`] }; },
  fart(){ const v1 = [10,15,20,25,30][rnd(0,4)], k = rnd(2,3), v2 = v1*k;
    return { task:`Du kjører gjennom en krapp sving i <b>${v1} km/t</b>. Neste gang kjører du gjennom den samme svingen i <b>${v2} km/t</b>. Hvor mange ganger større blir kraften som skyver lasten utover?`,
      ans:k*k, unit:'ganger', steps:[`Kraften utover i en sving øker med farten i andre (farten ganget med seg selv).`,`Farten øker ${v2} ÷ ${v1} = ${k} ganger`,`${k} × ${k} = <b>${k*k}</b> ganger så stor kraft`] }; },
  kloss(){ const t = KLOSS[rnd(0,KLOSS.length-1)], r = rnd(t.min,t.max)*15, ans = r/t.d;
    return { task:`Du skal sikre ${t.n}. Radien er <b>${r} cm</b>. Hvor høye må klossene minst være?`,
      ans, unit:'cm', steps:[`Regel: ${t.regel}`,`${r} ÷ ${t.d} = <b>${ans}</b> cm`,'I tillegg må lasten surres.'] }; }
};
const GODS = ['maskindeler','maling','fliser','sement','papir','motorolje','kopipapir','dekk'];
const KJORETOY = [{n:'lastebil (N3)',f:8,min:20,max:180},{n:'lastebil (N2)',f:8,min:10,max:60},{n:'semitrailer (O4)',f:8,min:40,max:250},{n:'varebil (N1)',f:10,min:2,max:12},{n:'tilhenger på 3 000 kg tillatt totalvekt (O2) bak en personbil',f:10,min:2,max:20}];
const KLOSS = [
  {n:'én papirrull som kan rulle i kjøreretningen', d:3, min:2, max:5, regel:'Med én eller to ruller skal klossene være minst 1/3 av radien.'},
  {n:'en kabeltrommel som kan rulle i kjøreretningen', d:5, min:2, max:8, regel:'Klosser foran og bak på minst 1/5 av trommelens radius.'},
  {n:'hjulene på en traktor som står på lasteplanet', d:3, min:2, max:5, regel:'Klosser foran og bak på alle hjul, minst 1/3 av hjulradien.'}
];
const fmt = n => n.toLocaleString('nb-NO');
const tidel2 = mu => mu.toLocaleString('nb-NO',{minimumFractionDigits:2});
const tidel = n => n === 10 ? '1,0' : (n/10).toLocaleString('nb-NO');
function runCalc(st, a, done){
  const n = a.antall || 5; let i = 0, score = 0, tryN = 0, cur;
  const draw = () => {
    cur = GEN[a.gen](a); tryN = 0;
    st.innerHTML = `<div class="row"><span class="counter">Oppgave ${i+1} av ${n}</span><span class="spacer"></span><span class="counter">${score} riktige</span></div>
      <div class="meter"><i style="width:${100*i/n}%"></i></div>
      <div class="calc panel"><div class="task">${cur.task}</div>
      <div class="row"><input id="in" type="number" inputmode="numeric" aria-label="Svar"><span class="unit">${cur.unit}</span>
      <button class="btn yellow" id="chk">Sjekk</button><span class="spacer"></span>${sayBtn(cur.task)}</div><div id="cf"></div></div>`;
    const inp = $('#in'); inp.focus();
    inp.onkeydown = e => { if (e.key === 'Enter') $('#chk').click(); };
    $('#chk').onclick = () => {
      if (inp.value === '') return;
      const v = Number(inp.value), ok = v === cur.ans; tryN++;
      if (ok || tryN >= 2){
        if (ok && tryN === 1) score++; else if (ok) score += 0.5;
        inp.disabled = true; $('#chk').disabled = true;
        $('#cf').innerHTML = `<div class="fb ${ok?'':'bad'}"><b>${ok ? 'Riktig!' : 'Riktig svar er ' + cur.ans.toLocaleString('nb-NO') + ' ' + cur.unit + '.'}</b>
          <ul class="steps">${cur.steps.filter(Boolean).map(s=>`<li>${s}</li>`).join('')}</ul></div>` + nextRow(i+1 >= n);
        $('#nx').focus(); $('#nx').onclick = () => { i++; i<n ? draw() : fin(); };
      } else {
        $('#cf').innerHTML = `<div class="fb bad"><b>Ikke riktig – prøv én gang til.</b> Tips: ${cur.steps[0]}</div>`;
        inp.select();
      }
    };
  };
  const fin = () => { const pct = 100*score/n; done(pct); st.innerHTML = resultBox(pct,true,`<p class="muted">Nye tall hver gang du prøver.</p>`); $('#again').onclick = () => runCalc(st,a,done); };
  draw();
}

function runCase(st, a, done){
  let i = 0, pts = 0; const N = a.steg.length;
  const draw = () => {
    const s = a.steg[i]; let first = true;
    st.innerHTML = `${i===0 ? `<div class="panel" style="margin-bottom:14px"><b>Situasjon:</b> ${esc(a.intro)}</div>` : ''}
      <div class="row"><span class="counter">Steg ${i+1} av ${N}</span></div>
      <div class="meter"><i style="width:${100*i/N}%"></i></div>
      <div class="q"><span>${esc(s.q)}</span>${sayBtn(s.q)}</div>
      <div class="opts">${shuffle(s.valg.map((v,k)=>({...v,k}))).map((v,n)=>`<button class="opt" data-k="${v.k}"><span class="k">${'ABCD'[n]}</span><span>${esc(v.t)}</span></button>`).join('')}</div><div id="fb"></div>`;
    st.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      const v = s.valg[+b.dataset.k];
      b.disabled = true; b.classList.add(v.ok?'ok':'bad');
      if (v.ok){
        if (first) pts++;
        st.querySelectorAll('.opt').forEach(x=>x.disabled=true);
        $('#fb').innerHTML = `<div class="fb"><b>Godt valg.</b> ${esc(v.f)}</div>` + nextRow(i+1 >= N);
        $('#nx').onclick = () => { i++; i<N ? draw() : fin(); };
      } else {
        $('#fb').innerHTML = `<div class="fb bad"><b>Tenk en gang til.</b> ${esc(v.f)}</div>`;
      }
      first = false;
    });
  };
  const fin = () => { const pct = 100*pts/N; done(pct); st.innerHTML = resultBox(pct,true,`<p class="muted">Riktig på første forsøk i ${pts} av ${N} steg.</p>`); $('#again').onclick = () => runCase(st,a,done); };
  draw();
}

function runReflect(st, a, done){
  st.innerHTML = `<div class="q"><span>${esc(a.q)}</span>${sayBtn(a.q)}</div>
    <p class="instr">Skriv svaret ditt med egne ord. Når du er ferdig, trykker du «Sjekk svaret mitt» og krysser av for punktene du har fått med.</p>
    ${textNote()}
    <textarea id="ta" placeholder="Skriv her …">${esc(getText(a.id))}</textarea>
    <div class="row" style="margin-top:10px"><span class="counter" id="wc"></span><span class="spacer"></span>
    <button class="btn ghost" id="cp">Kopier tekst</button><button class="btn yellow" id="chk">Sjekk svaret mitt</button></div><div id="rf"></div>`;
  const ta = $('#ta'), wc = () => $('#wc').textContent = (ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0) + ' ord';
  wc(); ta.oninput = () => { wc(); setText(a.id, ta.value); };
  wireTextNote(a.id, ta);
  $('#cp').onclick = () => copyText(ta, $('#cp'));
  $('#chk').onclick = () => {
    $('#rf').innerHTML = `<div class="panel" style="margin-top:14px"><b>Dette bør et godt svar inneholde.</b> Kryss av for det du har med:
      <ul class="checks">${a.punkter.map((p,i)=>`<li><label><input type="checkbox" data-i="${i}"><span>${esc(p)}</span></label></li>`).join('')}</ul>
      <div class="row" style="margin-top:12px"><span class="counter" id="rc">0 av ${a.punkter.length}</span><span class="spacer"></span><button class="btn" id="reg">Registrer</button></div><div id="rr"></div></div>`;
    const boxes = st.querySelectorAll('.checks input');
    boxes.forEach(b => b.onchange = () => $('#rc').textContent = `${[...boxes].filter(x=>x.checked).length} av ${a.punkter.length}`);
    $('#reg').onclick = () => {
      const n = [...boxes].filter(x=>x.checked).length, pct = 100*n/a.punkter.length; done(pct);
      $('#rr').innerHTML = `<div class="fb ${pct>=60?'':'bad'}" style="margin-top:12px"><b>${n} av ${a.punkter.length} punkter.</b> ${pct>=80?'Et grundig svar!':'Legg til punktene du mangler i teksten din, så har du et komplett svar.'} Husk å ta med teksten i <a href="#/rapport">fremdriftsrapporten</a> hvis læreren skal se den.</div>`;
    };
  };
}

function runVoks(st, a, done){
  const all = a.tekst.join(' ');
  st.innerHTML = `<div class="row" style="margin-bottom:8px"><span class="ftag">Voks · 60 sekunder</span><span class="spacer"></span>${sayBtn(all)}</div>
    <div class="panel voks-text">${a.tekst.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    <h3 style="font-size:22px;margin-top:18px">Tenk over</h3>
    ${a.sporsmal.map((q,i) => `<div class="voks-q">${i+1}. ${esc(q)}</div>`).join('')}
    <p class="instr" style="margin-top:8px">Du kan skrive ned tankene dine, men du må ikke. Snakk gjerne med en medelev i stedet.</p>
    ${textNote()}
    <textarea id="ta" placeholder="Mine tanker (valgfritt) …" style="min-height:110px">${esc(getText(a.id))}</textarea>
    <div class="row" style="margin-top:10px"><span class="spacer"></span><button class="btn ghost" id="cp">Kopier tekst</button></div>
    <div class="voks-do"><b>Ta med deg:</b> ${esc(a.handling)}</div>
    <div class="row" style="margin-top:16px"><span class="spacer"></span><button class="btn yellow" id="fin">Ferdig – jeg har tenkt over dette</button></div><div id="vr"></div>`;
  const ta = $('#ta');
  ta.oninput = () => setText(a.id, ta.value);
  wireTextNote(a.id, ta);
  $('#cp').onclick = () => copyText(ta, $('#cp'));
  $('#fin').onclick = () => { done(100); $('#vr').innerHTML = '<div class="fb" style="margin-top:12px"><b>Bra!</b> Voks handler om små steg. Prøv «Ta med deg» denne uka.</div>'; };
}

function runSim(st, a, done){
  const DAYS = 20, LEAD = 3, QTY = 12, SALE = [1,2,3];
  let day, stock, pending, lost, hist, log;
  const reset = () => { day=1; stock=10; pending=[]; lost=0; hist=[10]; log=[]; draw(); };
  const draw = () => {
    const onOrder = pending.length > 0;
    st.innerHTML = `<p class="instr">Du styrer lageret for én vare i ${DAYS} dager. Butikkene kjøper 1–3 kartonger per dag (snitt 2). Ledetida er ${LEAD} dager, og du bestiller ${QTY} kartonger om gangen. Målet er å <b>aldri gå tom</b> – men uten å fylle lageret for mye.</p>
      <div class="simgrid">
        <div class="stat"><div class="v">${Math.min(day,DAYS)}</div><div class="l">Dag av ${DAYS}</div></div>
        <div class="stat"><div class="v">${stock}</div><div class="l">Lagersaldo</div></div>
        <div class="stat"><div class="v">${onOrder ? 'Dag ' + pending[0] : '–'}</div><div class="l">Bestilling kommer</div></div>
        <div class="stat"><div class="v" style="color:${lost?'var(--bad)':'inherit'}">${lost}</div><div class="l">Tapt salg (kartonger)</div></div>
      </div>
      <svg class="chart" viewBox="0 0 400 170" preserveAspectRatio="none" aria-label="Lagersaldo per dag">${chart()}</svg>
      <div class="row" style="margin-top:12px">
        <button class="btn ghost" id="ord" ${onOrder||day>DAYS?'disabled':''}>Bestill ${QTY} kartonger</button>
        <span class="spacer"></span><button class="btn yellow" id="nx" ${day>DAYS?'disabled':''}>Neste dag →</button></div>
      <ul class="log">${log.slice().reverse().map(l=>`<li>${l}</li>`).join('')}</ul><div id="sres"></div>`;
    $('#ord').onclick = () => { pending = [day + LEAD]; log.push(`Dag ${day}: Bestilte ${QTY} kartonger (saldo ${stock}).`); draw(); };
    $('#nx').onclick = step;
    if (day > DAYS) finish();
  };
  const chart = () => {
    const max = 30, w = 400, h = 170, dx = w/DAYS;
    const y = v => h - 8 - (Math.min(v,max)/max)*(h-16);
    const pts = hist.map((v,i)=>`${(i*dx).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    return `<line x1="0" x2="${w}" y1="${y(6)}" y2="${y(6)}" stroke="var(--n3)" stroke-dasharray="4 4" stroke-width="1.5"/>
      <text x="${w-4}" y="${y(6)-4}" text-anchor="end" font-size="11" fill="var(--n3)">bestillingspunkt uten buffer = 2 × 3 = 6</text>
      <line x1="0" x2="${w}" y1="${y(0)}" y2="${y(0)}" stroke="var(--bad)" stroke-width="1"/>
      <polyline points="${pts}" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
      ${hist.map((v,i)=>`<circle cx="${i*dx}" cy="${y(v)}" r="3" fill="${v===0?'var(--bad)':'var(--yellow)'}"/>`).join('')}`;
  };
  const step = () => {
    if (pending[0] === day){ stock += QTY; pending = []; log.push(`Dag ${day}: ${QTY} kartonger kom inn.`); }
    const d = SALE[rnd(0,2)], sold = Math.min(d, stock);
    stock -= sold;
    if (sold < d){ lost += d - sold; log.push(`Dag ${day}: Butikkene ville ha ${d}, men bare ${sold} fantes. Tomt!`); }
    else log.push(`Dag ${day}: Solgte ${d}. Saldo ${stock}.`);
    hist.push(stock); day++; draw();
  };
  const finish = () => {
    const avg = hist.reduce((s,v)=>s+v,0)/hist.length;
    let pct = 100 - lost*12 - Math.max(0, avg-12)*3; pct = Math.max(0, Math.min(100, pct));
    done(pct);
    $('#sres').innerHTML = `<div class="panel" style="margin-top:14px"><b>Ferdig!</b> Tapt salg: ${lost} kartonger. Gjennomsnittlig lagersaldo: ${avg.toFixed(1)} kartonger. Poeng: ${Math.round(pct)} %.
      <p class="small" style="margin:8px 0 0">Tips: Med salg på ca. 2 per dag og ledetid 3 dager bør du bestille når saldoen er rundt 2 × 3 = 6. Fordi salget svinger (opptil 3 per dag), trenger du i tillegg et lite <b>sikkerhetslager</b> – bestill når saldoen er 8–9.</p>
      <div class="row" style="margin-top:10px"><span class="spacer"></span><button class="btn" id="again">Spill igjen</button></div></div>`;
    $('#again').onclick = reset;
  };
  reset();
}

const RUN = {flash:runFlash, quiz:runQuiz, tf:runTF, fill:runFill, match:runMatch, order:runOrder, sort:runSort, check:runCheck, hotspot:runHotspot, calc:runCalc, case:runCase, reflect:runReflect, sim:runSim, voks:runVoks};

/* =================== RAPPORTSKJEMA (felles) =================== */
function rapportSkjema(el, tilbake){
  let navn = '', klasse = '';
  try { const p = JSON.parse(TLL.ls.get('tll-elev') || '{}'); navn = p.navn || ''; klasse = p.klasse || ''; } catch(e){}
  const harMinne = Object.values(mem).some(m => Object.values(m || {}).some(v => v && v.trim()));
  el.innerHTML = `<div class="panel rap">
    <h3 style="font-size:22px">Lever fremdriften din til læreren</h3>
    <p>Rapporten viser hvilke aktiviteter du har gjort, resultatene dine og prøvene du har tatt. Den lages her på PC-en og sendes ikke noe sted før du selv leverer den i Teams.</p>
    <label for="rn">Fornavn og første bokstav i etternavnet</label><input type="text" id="rn" value="${esc(navn)}" placeholder="F.eks. Ola N." autocomplete="off">
    <label for="rk">Klasse</label><input type="text" id="rk" value="${esc(klasse)}" placeholder="F.eks. 2TLLB" autocomplete="off">
    <div class="choice" style="margin-top:12px"><label><input type="checkbox" id="rt" checked><span><b>Ta med det jeg har skrevet</b> i skriveoppgaver og Voks${harMinne ? '' : ctx && ctx.store.saveText ? '' : ' (bare tekst som fortsatt er åpen på denne PC-en)'}.</span></label></div>
    <div class="row" style="margin-top:10px"><button class="btn yellow" id="rdl">Last ned rapport (fil)</button><button class="btn ghost" id="rcode">Vis som tekstkode</button></div>
    <div id="rout"></div>
    <h4 style="margin:18px 0 4px">Slik leverer du i Teams</h4>
    <ol class="steps-teams">
      <li>Åpne oppgaven læreren har gitt i Teams (under <b>Oppgaver</b>).</li>
      <li>Trykk <b>Legg til arbeid</b> og <b>Last opp fra denne enheten</b>. Velg filen som starter med «fremdrift-» (ligger i Nedlastinger).</li>
      <li>Trykk <b>Lever inn</b>.</li>
      <li>Får du ikke lastet opp filen? Trykk «Vis som tekstkode», kopier koden og lim den inn i oppgaven eller i en melding til læreren.</li>
    </ol>
    ${tilbake ? `<p style="margin-top:14px"><a href="${tilbake}">← Tilbake</a></p>` : ''}
  </div>`;
  const lag = () => {
    const n = $('#rn').value.trim(), k = $('#rk').value.trim();
    if (!n){ $('#rout').innerHTML = '<div class="fb bad" style="margin-top:10px">Skriv navnet ditt først, så læreren vet hvem rapporten er fra.</div>'; $('#rn').focus(); return null; }
    TLL.ls.set('tll-elev', JSON.stringify({ navn: n, klasse: k }));
    return TLL.lagRapport({ navn: n, klasse: k, medTekst: $('#rt').checked, minne: mem });
  };
  $('#rdl').onclick = () => { const r = lag(); if (!r) return; TLL.lastNed(r);
    $('#rout').innerHTML = `<div class="fb" style="margin-top:10px">Filen <b>${esc(TLL.filnavn(r))}</b> er lastet ned. Lever den i Teams slik det står nedenfor.</div>`; };
  $('#rcode').onclick = () => { const r = lag(); if (!r) return;
    $('#rout').innerHTML = `<p class="small" style="margin-top:10px">Kopier hele koden og lim den inn i Teams:</p><textarea class="codebox" id="rc" readonly>${esc(TLL.rapportKode(r))}</textarea><div class="row"><button class="btn ghost" id="rcp">Kopier koden</button></div>`;
    $('#rcp').onclick = () => copyText($('#rc'), $('#rcp')); };
}

/* =================== KAPITTELSIDE =================== */
function bootKapittel(){
  const K = TLL.kapitler[document.body.dataset.kapittel];
  const app = $('#app');
  if (!K){ app.innerHTML = '<p>Fant ikke kapitteldata.</p>'; return; }
  let store = TLL.lesLager(K.id);
  ctx = { kapId: K.id, store };
  const save = () => TLL.skrivLager(K.id, store);
  const KN = esc(K.kortnavn || ('Kap ' + K.nr));
  const visible = a => !a.nivaa || store.lvl === 0 || a.nivaa === store.lvl;
  const temaNavn = t => `${esc(t.lok)} – ${esc(t.tittel)}`;

  const LEVEL_HELP = {0:'Alle: vis aktiviteter fra alle nivåene. Du kan velge ett nivå for å få færre aktiviteter om gangen.',1:'Nybegynner: bli kjent med begrepene.',2:'Trygg: bruk kunnskapen i praktiske oppgaver.',3:'Ekspert: begrunn valg og løs mer sammensatte oppgaver.'};
  function renderLevels(){
    const help = $('#level-help'); if (help) help.textContent = LEVEL_HELP[store.lvl] + ' Velg oppgaver som passer det du vil øve på. Du kan bytte når du vil.';
    const cols = {0:'var(--yellow)',1:'var(--n1)',2:'var(--n2)',3:'var(--n3)'};
    $('#levels').innerHTML = [1,2,3,0].map(n =>
      `<button data-lvl="${n}" title="${LEVEL_HELP[n]}" aria-pressed="${store.lvl===n}"><span class="dot" style="background:${cols[n]}"></span>${n===0?'Alle':NIVA[n]}</button>`).join('');
    $('#levels').querySelectorAll('button').forEach(b => b.onclick = () => { store.lvl = +b.dataset.lvl; save(); renderLevels(); route(); });
  }
  function header(crumbs, title, sub, showKm){
    $('#hdr').innerHTML = `
      <a class="brandlink" href="../../"><span class="bm">TLL</span>TLLfluenseren</a>
      <div class="crumbs"><a href="../">${esc(K.fag)}</a> <span>›</span> ${crumbs}</div>
      <h1>${title}</h1>
      ${sub ? `<div class="sub">${sub}</div>` : ''}
      ${showKm ? [].concat(K.kompetansemal).map(m => `<div class="km"><b>Kompetansemål</b><span>${esc(m.tekst)} <span style="opacity:.7">(${esc(m.kode)})</span></span></div>`).join('') : ''}`;
  }
  $('#ftr').innerHTML = K.fotnote || `${esc(K.fag)} · Kapittel ${K.nr}. Tekster, oppgaver og tegninger er egenprodusert. Fagstoff fra <a href="${K.ressurser.ndlaEmne}" target="_blank" rel="noopener">NDLA</a> er lenket til, ikke kopiert. Kompetansemål fra Utdanningsdirektoratet (NLOD). Henvisninger til lærebok og arbeidsbok gjelder sidetall og oppgavenummer i elevens egne bøker. Resultater lagres bare i nettleseren på denne enheten – <a href="#/lagring">les om lagring</a> · <a href="#/rapport">lever fremdrift</a>.`;

  const temaProg = t => { const acts = t.aktiviteter.filter(visible); return { done: acts.filter(a => store.best[a.id] != null).length, total: acts.length }; };
  const done = id => pct => { TLL.registrerResultat(K.id, store, id, pct); };

  function pageHome(){
    header(`<span>${esc(K.kortnavn || 'Kapittel ' + K.nr)}</span>`, K.kortnavn ? esc(K.tittel) : `Kap ${K.nr} · ${esc(K.tittel)}`, esc(K.ingress), true);
    const r = K.ressurser;
    const forsteTema = K.temaer[0];
    const alle = K.temaer.reduce((s,t) => { const p = temaProg(t); return { d: s.d + p.done, n: s.n + p.total }; }, { d: 0, n: 0 });
    app.innerHTML = `
      <div class="note ${store.saveText ? 'warn' : ''}" style="margin-top:4px"><span aria-hidden="true">${store.saveText ? '💾' : '🔒'}</span><span>
        <b>Lagring på denne PC-en:</b> Resultatene dine lagres bare i denne nettleseren. Læreren ser dem når du leverer en <a href="#/rapport">fremdriftsrapport</a> i Teams.
        ${store.saveText ? 'Det du skriver i skriveoppgavene lagres også her – andre som bruker PC-en kan se det.' : 'Det du skriver i skriveoppgavene lagres ikke.'}
        <a href="#/lagring">Innstillinger og sletting</a></span></div>
      <section class="panel tll-start" aria-labelledby="start-heading"><h2 id="start-heading">Første gang her?</h2><p>Start med «${esc(forsteTema.tittel)}». Les eller lytt til forklaringen, og prøv oppgavene etterpå. Har læreren gitt deg et annet tema, velger du det nedenfor.</p><a class="tll-action" href="#/${forsteTema.id}">Start med ${temaNavn(forsteTema)} →</a></section>
      <div class="section-h"><h2>Velg tema</h2><span class="muted small">${alle.d} av ${alle.n} aktiviteter gjort på nivået du har valgt</span></div>
      <div class="phase-steps" style="margin:-4px 0 14px">${FASER.map(f => `<span>${f.navn.toUpperCase()}</span>`).join('')}</div>
      <div class="grid">${K.temaer.map(t => { const p = temaProg(t); return `
        <a class="tcard" href="#/${t.id}">
          <div class="lab"><span class="lok">${t.lok}</span><span class="bars"></span></div>
          <div class="body"><h3>${esc(t.tittel)}</h3><p>${esc(t.kort)}</p>
            <div class="progtxt">${p.done} av ${p.total} aktiviteter gjort</div>
            <div class="prog"><i style="width:${p.total?100*p.done/p.total:0}%"></i></div></div>
        </a>`; }).join('')}
        ${K.prove === false ? '' : `<a class="tcard" href="../prove/?kap=${K.id}">
          <div class="lab"><span class="lok" style="background:var(--asphalt);color:var(--yellow)">TEST</span><span class="bars"></span></div>
          <div class="body"><span class="ftag">Øv</span><h3>Kapittelprøve</h3><p>Tilfeldige spørsmål fra hele kapitlet på nivået du velger. Se hvilke tema du må øve mer på.</p></div>
        </a>`}
        <a class="tcard" href="#/rapport">
          <div class="lab"><span class="lok" style="background:var(--n2);color:#111820">LEVER</span><span class="bars"></span></div>
          <div class="body"><h3>Lever fremdrift</h3><p>Last ned en rapport over det du har gjort, og lever den i Teams.</p></div>
        </a>
      </div>
      ${K.visKapittelkilder || K.ressursomrade === false ? '' : `<section data-resource-area="${esc(K.ressursomrade || 'tll')}"></section>`}
      <div id="podlist" hidden><div class="section-h"><h2>Podkast</h2><span class="muted small">Hør teorien – én episode per tema</span></div><div class="panel"><ul class="reslist" id="podul"></ul></div></div>
      ${K.filmLenker?.length ? `<section aria-labelledby="kapittelfilm-heading">
        <div class="section-h"><h2 id="kapittelfilm-heading">Fagfilm og 3D</h2></div>
        <div class="panel"><ul class="reslist">
          ${K.filmLenker.map(film => `<li><span class="tag">${esc(film.type)}</span><a href="${esc(film.url)}">${esc(film.tittel)} →</a></li>`).join('')}
        </ul></div>
      </section>` : ''}
      ${K.visKapittelkilder ? `<section data-resource-chapter="${esc(K.id)}"></section>` : ''}
      <div class="section-h"><h2>Ressurser</h2></div>
      <div class="panel"><ul class="reslist">
        ${r.presentasjon ? `<li><span class="tag">Lysark</span><a href="${esc(r.presentasjon)}" target="_blank" rel="noopener">Lysark til kapittel ${K.nr}</a></li>` : ''}
        ${r.laerebok ? `<li><span class="tag">Bok</span><span>${esc(r.laerebok)}</span></li>` : ''}
        ${r.arbeidsbok ? `<li><span class="tag">Bok</span><span>${esc(r.arbeidsbok)}</span></li>` : ''}
        <li><span class="tag ndla">${esc(r.ndlaEmneTag || 'NDLA')}</span><a href="${r.ndlaEmne}" target="_blank" rel="noopener">${esc(r.ndlaEmneNavn || 'Emnet «Drift på terminal og lager» på NDLA')}</a></li>
        ${r.ordliste ? `<li><span class="tag ndla">${esc(r.ordlisteTag || 'NDLA')}</span><a href="${r.ordliste}" target="_blank" rel="noopener">${esc(r.ordlisteNavn || 'Ordliste for lager og logistikk')}</a></li>` : ''}
      </ul></div>`;
    const items = {};
    K.temaer.forEach((t,i) => findEpisode(i+1, () => {
      const box = $('#podlist'), ul = $('#podul'); if (!box || !ul) return;
      items[i] = `<li><span class="tag">🎧 Ep. ${i+1}</span><a href="#/${t.id}">${esc((t.podkast && t.podkast.tittel) || t.tittel)}</a></li>`;
      ul.innerHTML = Object.keys(items).sort((a,b)=>a-b).map(k => items[k]).join('');
      box.hidden = false;
    }));
  }

  function pageTema(t){
    header(`<a href="#/">${KN}</a> <span>›</span> <span>${esc(t.lok)}</span>`, temaNavn(t), esc(t.kort), false);
    const index = K.temaer.indexOf(t);
    const forrige = K.temaer[index - 1];
    const neste = K.temaer[index + 1];
    const acts = t.aktiviteter.filter(visible);
    const phaseHead = f => `<div class="phase-h"><span class="pn" aria-hidden="true">${f.nr}<small>${f.ikon}</small></span><div><h2>${f.navn}</h2><p>${esc(f.tekst)}</p></div></div>`;
    const cards = f => { const list = acts.filter(a => faseAv(a) === f.id);
      return list.length ? `<div class="acts">${list.map(a => actCard(t,a)).join('')}</div>` : `<p class="muted small">Ingen aktiviteter i ${f.navn} på nivået du har valgt.</p>`; };
    app.innerHTML = `
      ${t.mal ? `<div class="panel mal"><h3 style="font-size:22px">Læringsmål – etter dette temaet kan jeg …</h3><ul>${t.mal.map(m => `<li>${esc(m)}</li>`).join('')}</ul></div>` : ''}
      <section class="phase" id="laer">${phaseHead(FASER[0])}
        <div id="pod" hidden></div>
        <div class="two">
          <div class="panel kort"><h3 style="font-size:22px">Kort fortalt</h3><ul>${t.punkter.map(p => `<li>${p}</li>`).join('')}</ul></div>
          <div class="panel"><h3 style="font-size:22px">Les og se mer</h3>
            <ul class="reslist">
            ${t.bok ? `<li><span class="tag">Lærebok</span><span>${esc(t.bok)}</span></li>` : ''}
            ${t.ndla.map(([tt,u,ty]) => `<li><span class="tag ndla">${esc(ty)}</span><a href="${/^https?:/.test(u) ? u : NDLA+u}" target="_blank" rel="noopener">${esc(tt)}</a></li>`).join('')}
            ${t.arbeidsbok ? `<li><span class="tag">Arbeidsbok</span><span>Oppgave ${esc(t.arbeidsbok)}</span></li>` : ''}</ul></div>
        </div>
        ${t.ekstra ? `<div class="panel" style="margin-top:14px">${t.ekstra}</div>` : ''}
        <section data-resource-topic="${K.id}-${t.id}"></section>
        <div style="margin-top:12px">${cards(FASER[0])}</div>
      </section>
      ${FASER.slice(1).map(f => `<section class="phase" id="${f.id}">${phaseHead(f)}${cards(f)}</section>`).join('')}
      <p class="muted small" style="margin-top:18px">${NIVA[store.lvl]} · ${acts.length} aktiviteter. Begrepskort og Voks gjelder alle nivåer.</p>
      <nav class="row" aria-label="Naviger mellom temaer" style="margin-top:22px">
        ${forrige ? `<a class="btn ghost" href="#/${forrige.id}">← Forrige tema: ${temaNavn(forrige)}</a>` : ''}
        <a class="btn ghost" href="#/">Tilbake til alle tema</a>
        ${neste ? `<a class="btn ghost" href="#/${neste.id}">Neste tema: ${temaNavn(neste)} →</a>` : ''}
      </nav>`;
    const nr = index + 1;
    findEpisode(nr, src => { const el = $('#pod'); if (!el) return; el.hidden = false; el.innerHTML = podPlayer(nr, t, src); wirePlayer(el); });
  }
  function actCard(t,a){
    const n = a.nivaa || 0, b = store.best[a.id], l = store.log[a.id];
    return `<a class="act" data-n="${n}" href="#/${t.id}/${a.id}">
      <span class="ftag">${faseNavn(faseAv(a))}</span>
      <div class="kind"><span>${TYPE[a.type]}</span><span class="lvl n${n}">${n ? NIVA_KORT[n] : 'Alle'}</span></div>
      <h4>${esc(a.tittel)}</h4>
      <div class="small">${b != null ? `<span class="done">✓ Beste: ${b} %</span>${l && l.n > 1 ? ` <span class="muted">· ${l.n} forsøk</span>` : ''}` : '<span class="muted">Ikke gjort</span>'}</div></a>`;
  }
  function pageAct(t,a){
    header(`<a href="#/">${KN}</a> <span>›</span> <a href="#/${t.id}">${esc(t.tittel)}</a>`, esc(a.tittel), `${faseNavn(faseAv(a)).toUpperCase()} · ${TYPE[a.type]}${a.nivaa ? ' · ' + NIVA_KORT[a.nivaa] : ''}`, false);
    const idx = t.aktiviteter.filter(visible), pos = idx.indexOf(a), neste = idx[pos+1];
    app.innerHTML = `${a.vis ? `<div class="stage"><div class="panel vis" style="margin-bottom:14px">${a.vis}</div></div>` : ''}<div class="stage" id="stage"></div><p class="stage row" style="margin-top:22px"><a href="#/${t.id}">← Tilbake til ${esc(t.tittel)}</a><span class="spacer"></span>${neste ? `<a href="#/${t.id}/${neste.id}">Neste: ${esc(neste.tittel)} →</a>` : ''}</p>`;
    RUN[a.type]($('#stage'), a, done(a.id), t);
  }
  function pageRapport(){
    header(`<a href="#/">${KN}</a>`, 'Lever fremdrift', 'Last ned en rapport og lever den i Teams', false);
    app.innerHTML = `<div class="stage" id="stage"></div>`;
    rapportSkjema($('#stage'), '#/');
  }
  function pageLagring(){
    header(`<a href="#/">${KN}</a>`, 'Lagring på denne PC-en', 'Hva som lagres, hvor det lagres, og hvordan du sletter det', false);
    const nTxt = TLL.tekstNokler(K.id).length, nRes = Object.keys(store.best).length;
    app.innerHTML = `<div class="stage">
      <div class="panel">
        <h3 style="font-size:22px">Dette lagres – og bare her</h3>
        <ul>
          <li><b>Resultater</b> (prosent og antall forsøk på aktivitetene) og nivået du har valgt, lagres i nettleseren på denne PC-en.</li>
          <li><b>Det du skriver</b> i skriveoppgaver og Voks lagres bare hvis du velger «Min egen PC» nedenfor.</li>
          <li><b>Ingenting sendes</b> automatisk til læreren, skolen eller andre. Det finnes ingen innlogging.</li>
          <li><b>Læreren</b> ser fremdriften din bare når du selv leverer en <a href="#/rapport">fremdriftsrapport</a> i Teams.</li>
          <li>Bytter du PC eller nettleser, ser du ikke resultatene dine der.</li>
        </ul>
        <p class="small muted">Nå lagret her: ${nRes} resultat${nRes===1?'':'er'} og ${nTxt} skriftlig${nTxt===1?'':'e'} svar.</p>
      </div>
      <div class="panel" style="margin-top:14px">
        <h3 style="font-size:22px">Hvilken PC bruker du?</h3>
        <div class="choice" role="radiogroup" aria-label="Type PC">
          <label><input type="radio" name="pc" value="delt" ${store.saveText?'':'checked'}><span><b>Delt skole-PC</b> – det jeg skriver, lagres ikke. Teksten forsvinner når jeg lukker siden.</span></label>
          <label><input type="radio" name="pc" value="egen" ${store.saveText?'checked':''}><span><b>Min egen PC</b> – lagre det jeg skriver, så jeg kan fortsette senere.</span></label>
        </div>
        <div id="pcmsg"></div>
      </div>
      <div class="panel" style="margin-top:14px">
        <h3 style="font-size:22px">Slett alt fra denne PC-en</h3>
        <p>Sletter alle resultater, nivåvalg, prøveresultater, navnet ditt og alt du har skrevet i dette kapitlet. Gjør dette når du er ferdig på en delt PC – etter at du har levert rapporten.</p>
        <div class="row"><button class="btn ghost" id="del1">Slett alt</button><span id="delc"></span></div>
        <div id="delmsg"></div>
      </div>
    </div><p class="stage" style="margin-top:22px"><a href="#/">← Tilbake til kapitlet</a></p>`;
    app.querySelectorAll('input[name=pc]').forEach(r => r.onchange = () => {
      if (r.value === 'egen'){ store.saveText = true; Object.entries(mem[K.id] || {}).forEach(([id,v]) => setText(id, v)); save();
        $('#pcmsg').innerHTML = '<div class="fb">Det du skriver, lagres nå på denne PC-en. Husk å slette når du er ferdig hvis andre bruker PC-en.</div>'; }
      else { store.saveText = false; save(); TLL.tekstNokler(K.id).forEach(k => TLL.ls.del(k));
        $('#pcmsg').innerHTML = '<div class="fb">Ok. Det du skriver, lagres ikke lenger, og tidligere lagrede tekster er slettet fra PC-en.</div>'; }
    });
    $('#del1').onclick = () => {
      $('#delc').innerHTML = '<button class="btn" id="del2" style="background:var(--bad);border-color:var(--bad)">Ja, slett alt</button>';
      $('#del2').onclick = () => {
        clearTexts(); TLL.ls.del('tll-' + K.id); TLL.ls.del('tll-prover'); TLL.ls.del('tll-elev');
        store = TLL.lesLager(K.id); ctx.store = store; renderLevels();
        $('#delc').innerHTML = ''; $('#delmsg').innerHTML = '<div class="fb" style="margin-top:10px">Alt er slettet fra denne PC-en.</div>';
      };
    };
  }
  function route(){
    if (canSpeak) speechSynthesis.cancel();
    const parts = location.hash.replace(/^#\/?/,'').split('/').filter(Boolean);
    if (parts[0] === 'prove' && K.prove !== false) location.replace('../prove/?kap=' + K.id);
    else if (parts[0] === 'lagring') pageLagring();
    else if (parts[0] === 'rapport') pageRapport();
    else {
      const t = K.temaer.find(x => x.id === parts[0]);
      const a = t && t.aktiviteter.find(x => x.id === parts[1]);
      if (t && a) pageAct(t,a); else if (t) pageTema(t); else pageHome();
    }
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange', route);
  renderLevels(); route();
}

/* =================== PODKAST ===================
   Lydfiler i lyd/ ved siden av kapittelsiden: lyd/episode-1.mp3 … (nummer = temaets plass). .m4a fungerer også. */
const POD_EXT = ['mp3','m4a'];
const podCache = {};
function findEpisode(nr, onFound){
  if (podCache[nr] !== undefined){ if (podCache[nr]) onFound(podCache[nr]); return; }
  let i = 0;
  const tryNext = () => {
    if (i >= POD_EXT.length){ podCache[nr] = null; return; }
    const src = `lyd/episode-${nr}.${POD_EXT[i++]}`;
    const a = new Audio(); a.preload = 'metadata';
    a.onloadedmetadata = () => { a.onerror = null; a.onloadedmetadata = null; podCache[nr] = src; onFound(src); };
    a.onerror = tryNext;
    a.src = src;
  };
  tryNext();
}
function podPlayer(nr, t, src){
  const tittel = (t.podkast && t.podkast.tittel) || t.tittel;
  return `<div class="panel pod" style="margin-bottom:14px">
    <div class="row"><span class="pod-ic" aria-hidden="true">🎧</span><div><div class="ftag">Podkast · Episode ${nr}</div><h3 style="font-size:20px;margin-top:2px">${esc(tittel)}</h3></div></div>
    <audio controls preload="none" src="${esc(src)}" style="width:100%;margin-top:10px"></audio>
    <div class="row small" style="margin-top:6px"><span class="muted">Fart:</span>
      ${[0.75,1,1.25,1.5].map(v => `<button class="spd" data-r="${v}" aria-pressed="${v===1}">${String(v).replace('.',',')}×</button>`).join('')}
      <span class="spacer"></span><span class="muted">Stemmene er KI-generert.</span></div></div>`;
}
function wirePlayer(el){
  const au = el.querySelector('audio');
  el.querySelectorAll('.spd').forEach(b => b.onclick = () => { au.playbackRate = +b.dataset.r; el.querySelectorAll('.spd').forEach(x => x.setAttribute('aria-pressed', x===b)); });
}

/* =================== PRØVESIDE ===================
   URL: prove/?kap=kap1,kap2&niva=2&antall=20&seed=1234&navn=Halvårsprøve
   seed gjør at alle elever får de samme spørsmålene (læreren lager lenken på lærersiden). */
function provePool(kapIder, niva){
  const pool = [];
  kapIder.forEach(id => {
    const K = TLL.kapitler[id]; if (!K) return;
    K.temaer.forEach(t => t.aktiviteter.forEach(a => {
      if (niva && a.nivaa && a.nivaa !== niva) return;
      const tag = { _kap: id, _tema: `Kap ${K.nr} · ${t.tittel}`, _temaId: t.id };
      if (a.type === 'quiz') a.sp.forEach((q,i) => pool.push(Object.assign({ _id: `${a.id}#${i}` }, tag, q)));
      if (a.type === 'tf') a.ps.forEach(([p,s,f],i) => pool.push(Object.assign({ _id: `${a.id}#${i}`, q: 'Sant eller usant? ' + p, a: ['Sant','Usant'], r: s ? 0 : 1, f, fast: true }, tag)));
    }));
  });
  return pool;
}
function bootProve(){
  const app = $('#app'), hdr = $('#hdr');
  const P = new URLSearchParams(location.search);
  const header = (tittel, sub) => { hdr.innerHTML = `<a class="brandlink" href="../../"><span class="bm">TLL</span>TLLfluenseren</a>
    <div class="crumbs"><a href="../">${esc(TLL.FAG.navn)}</a> <span>›</span> <span>Prøve</span></div><h1>${esc(tittel)}</h1>${sub ? `<div class="sub">${esc(sub)}</div>` : ''}`; };
  $('#ftr').innerHTML = `${esc(TLL.FAG.navn)} · Prøvespørsmålene er egenprodusert. Resultatet lagres bare i nettleseren på denne enheten. Lever det til læreren med en fremdriftsrapport.`;
  const kapListe = TLL.KAPITLER;
  const oppsett = () => {
    header('Prøve', 'Velg kapitler, nivå og antall spørsmål');
    const valgt = (P.get('kap') || '').split(',').filter(Boolean);
    app.innerHTML = `<div class="stage">
      <div class="panel"><h3 style="font-size:20px">Kapitler</h3><div class="opt-grid" style="margin-top:8px">${kapListe.map(k => `<label><input type="checkbox" name="kap" value="${k.id}" ${!valgt.length || valgt.includes(k.id) ? 'checked' : ''}><span>Kap ${k.nr} · ${esc(k.tittel)}</span></label>`).join('')}</div></div>
      <div class="panel" style="margin-top:12px"><div class="row"><label>Nivå <select class="sel" id="pn"><option value="0">Alle nivåer</option><option value="1">Nybegynner</option><option value="2">Trygg</option><option value="3">Ekspert</option></select></label>
      <label>Antall spørsmål <select class="sel" id="pa"><option>10</option><option selected>15</option><option>20</option><option>30</option></select></label></div></div>
      <div class="row" style="margin-top:14px"><span class="spacer"></span><button class="btn yellow" id="go">Start prøven</button></div></div>`;
    $('#go').onclick = () => {
      const kap = [...app.querySelectorAll('input[name=kap]:checked')].map(x => x.value);
      if (!kap.length) return;
      start({ kap, niva: +$('#pn').value, antall: +$('#pa').value, seed: 0, navn: '' });
    };
  };
  const start = cfg => {
    TLL.lastKapitler('../', cfg.kap).then(() => {
      rand = cfg.seed ? seeded(cfg.seed) : Math.random;
      const pool = provePool(cfg.kap, cfg.niva);
      const qs = shuffle(pool).slice(0, cfg.antall);
      rand = Math.random;
      const tittel = cfg.navn || (cfg.kap.length === 1 ? `Kapittelprøve kap ${cfg.kap[0].replace('kap','')}` : `Prøve kap ${cfg.kap.map(k => k.replace('kap','')).join(', ')}`);
      header(tittel, `${NIVA[cfg.niva]} · ${qs.length} spørsmål${cfg.seed ? ' · samme spørsmål for hele klassen' : ''}`);
      if (!qs.length){ app.innerHTML = '<div class="stage"><p class="muted">Fant ingen spørsmål for dette valget.</p></div>'; return; }
      app.innerHTML = `<div class="stage" id="stage"></div>`;
      runQuiz($('#stage'), { sp: qs }, (pct, info) => {
        TLL.lagreProve({ dato: new Date().toISOString(), navn: tittel, kap: cfg.kap, niva: cfg.niva, seed: cfg.seed || null, antall: info.antall, riktige: info.riktige, pct: Math.round(pct), perTema: info.perTema });
      }, null, { questions: qs, perTema: true, restart: () => start(cfg),
        etter: `<p style="margin:6px 0 14px">Resultatet er lagret på denne PC-en. <a href="../${cfg.kap[0]}/#/rapport">Lever fremdrift til læreren →</a></p>` });
    });
  };
  if (P.get('kap') && (P.get('seed') || P.get('start'))){
    start({ kap: P.get('kap').split(',').filter(Boolean), niva: +(P.get('niva') || 0), antall: +(P.get('antall') || 15), seed: +(P.get('seed') || 0), navn: P.get('navn') || '' });
  } else oppsett();
}

/* =================== OPPSTART =================== */
TLL.motor = { RUN, esc, shuffle, faseAv, faseNavn, FASER, TYPE, NIVA, NIVA_KORT };
const side = document.body.dataset.side;
if (side === 'kapittel') bootKapittel();
else if (side === 'prove') bootProve();
})();
