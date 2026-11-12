/* =====================================================================
   TLL-ASSISTENTEN – søkebasert fagkamerat (uten KI)
   Svarer bare med innhold som finnes på TLLfluenseren:
     · ordboka (transport-logistikk-lofteoperasjoner/ordbok/ord.js + ord-bransjelaere.js)
     · begrepskort og temaer i kapitlene (kapN/data.js, lista i felles/kapitler.js)
     · sideoversikten (assistent/sider.js)
     · filmer i ressursbanken (ressursbank/katalog.json)
   Ingenting sendes noe sted. Spørsmålene lagres ikke.
   ===================================================================== */
(function(){
'use strict';
const A = window.TLLASSIST = window.TLLASSIST || {};
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const strip = s => String(s || '').replace(/<[^>]+>/g, '');
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9æøåäöüé]+/g, ' ').trim();
const flat = s => norm(s).replace(/\s+/g, '');
const FAG = '/transport-logistikk-lofteoperasjoner/';

/* Ord som ikke sier noe om fagstoffet */
const STOPP = new Set(('hva hvem hvor hvordan hvorfor hvilke hvilken hvilket når er var blir ble bli kan skal må vil ' +
  'en et ei den det de dei denne dette disse og eller i på til fra av for med om som at ikke jeg du vi dere meg deg ' +
  'seg sin sitt sine min mitt mine din ditt dine man noe noen mye mange mer litt bare også så da nå her der ' +
  'betyr betyr mener menes forklar forklare forklaring fortell beskriv gjøre gjør gjort finner finne finnes ' +
  'lære lærer les lese ord ordet begrep begrepet begrepene egentlig eksempel eksempler handler mellom forskjell ' +
  'forskjellen forskjeller skille skiller sammenlign sammenligne vs versus best bra viktig viktigst sånn slik ' +
  'trenger brukes bruker bruke kalles heter hjelp hjelpe meg hei takk please').split(' '));

/* Fagområdene i nedtrekkslista → ordbokas tema-bokstaver og kapitler */
const OMR = {
  alle:      { navn: 'alle fagområder', tema: [], kap: [] },
  truck:     { navn: 'truck og løfteoperasjoner', tema: ['U'], kap: [] },
  lager:     { navn: 'lager og terminal', tema: ['L', 'E', 'D'], kap: ['kap1'] },
  transport: { navn: 'transport og lastsikring', tema: ['T', 'S', 'P', 'I', 'N'], kap: ['kap5'] },
  hms:       { navn: 'HMS og sikkerhet', tema: ['F', 'A', 'H', 'M', 'O'], kap: [] }
};

/* ---------- Bøying: «terminalen», «lagrene» → stamme ---------- */
function stamme(w){
  for (const end of ['ene', 'ane', 'ens', 'ets', 'en', 'et', 'er', 'ne', 'a', 'e', 's']){
    if (w.length - end.length >= 4 && w.endsWith(end)) return w.slice(0, -end.length);
  }
  return w;
}
function tokens(q){
  return norm(q).split(' ').filter(w => w.length > 1 && !STOPP.has(w)).map(w => ({ w, s: stamme(w) }));
}
/* Treff i en tekst (normalisert) – gir 1 for hele ord, 0.6 for del av sammensatt ord */
function treff(tekst, t){
  if (!tekst) return 0;
  const ordene = tekst.split(' ');
  if (ordene.includes(t.w) || ordene.includes(t.s)) return 1;
  if (t.s.length >= 5 && ordene.some(o => o.startsWith(t.s))) return 0.8;
  if (t.s.length >= 5 && tekst.includes(t.s)) return 0.6;
  return 0;
}

/* ---------- Datagrunnlag ---------- */
const D = { ord: [], kort: [], temaer: [], sider: [], filmer: [] };

function kapittelUrl(kap, t){ return FAG + kap.id + '/#/' + t.id; }

function byggData(){
  /* Ordboka */
  const T = window.TLLORD;
  if (T && T.bygg){
    D.ord = T.bygg().map(o => ({
      type: 'ord', navn: o.ord, forklaring: o.forklaring, tema: o.tema, refs: o.refs || [], sok: o.sok || [],
      nNavn: norm(o.ord), fNavn: flat(o.ord), nSok: (o.sok || []).map(norm), nTekst: norm(o.forklaring),
      url: FAG + 'ordbok/?q=' + encodeURIComponent(o.ord)
    }));
    A.TEMA = T.TEMA; A.BOKER = T.BOKER;
  }
  /* Kapitlene */
  (A.KAP || []).forEach(kap => {
    (kap.temaer || []).forEach(t => {
      const url = kapittelUrl(kap, t);
      const ndla = (t.ndla || []).map(n => ({ tittel: n[0], url: /^https?:/.test(n[1]) ? n[1] : 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/' + n[1] }));
      const tema = {
        type: 'tema', kap, t, navn: t.tittel, url, ndla,
        etikett: `Kap ${kap.nr} · ${t.lok || ''}`.trim(),
        kortTekst: strip(t.kort), punkter: (t.punkter || []).map(strip), mal: t.mal || [], bok: t.bok || '',
        nNavn: norm(t.tittel), nKort: norm(strip(t.kort)), nMal: norm((t.mal || []).join(' ')),
        nPunkter: (t.punkter || []).map(p => norm(strip(p)))
      };
      D.temaer.push(tema);
      (t.aktiviteter || []).filter(a => a.type === 'flash' && Array.isArray(a.kort)).forEach(a => {
        a.kort.forEach(k => {
          if (!k || !k[0] || !k[1]) return;
          D.kort.push({ type: 'kort', navn: strip(k[0]), forklaring: strip(k[1]), tema: null, kapId: kap.id, temaRef: tema,
            refs: [], sok: [], nNavn: norm(strip(k[0])), fNavn: flat(strip(k[0])), nSok: [], nTekst: norm(strip(k[1])), url });
        });
      });
    });
  });
  /* Sider */
  D.sider = (A.SIDER || []).map(s => ({ type: 'side', navn: s.tittel, url: s.url, om: s.om, omr: s.omr,
    nNavn: norm(s.tittel), nSok: (s.sok || '').split(',').map(norm).filter(Boolean), nOm: norm(s.om) }));
  /* Filmer i ressursbanken */
  const kat = A.KATALOG;
  if (kat && Array.isArray(kat.resources)){
    D.filmer = kat.resources.filter(r => r.visible !== false && r.url).map(r => ({ type: 'film', navn: r.title, url: r.url,
      kilde: r.provider, om: r.description, sporsmal: r.questions || [], temaer: r.topics || [],
      nNavn: norm(r.title), nOm: norm(r.description) }));
  }
}

/* ---------- Rangering ---------- */
function poengBegrep(o, tk, hele){
  if (!tk.length) return 0;
  if (hele && (o.fNavn === hele || o.fNavn === stamme(hele))) return 300;
  let p = 0, traff = 0;
  for (const t of tk){
    let x = 0;
    if (o.nNavn === t.w || o.nNavn === t.s) x = 120;
    else if (o.fNavn === t.w || o.fNavn === t.s) x = 110;
    else if (o.fNavn.length >= 4 && t.w.startsWith(o.fNavn) && t.w.length - o.fNavn.length <= 3) x = 100; /* godsterminalen → godsterminal */
    else if (o.nSok.some(s => s === t.w || s === t.s)) x = 80;
    else if (o.nNavn.split(' ').some(w => w === t.w || w === t.s)) x = 55;
    else if (t.s.length >= 4 && o.fNavn.startsWith(t.s)) x = 45;
    else if (t.s.length >= 5 && o.fNavn.includes(t.s)) x = 30;
    else if (o.nSok.some(s => t.s.length >= 5 && s.includes(t.s))) x = 25;
    else if (t.s.length >= 5 && treff(o.nTekst, t)) x = 6;
    if (x) traff++;
    p += x;
  }
  if (!traff) return 0;
  return p * (traff / tk.length) - o.navn.length * 0.05; /* korte oppslagsord foran lange ved likt */
}
function poengTema(t, tk){
  let p = 0, traff = 0;
  for (const k of tk){
    const x = treff(t.nNavn, k) * 30 + treff(t.nKort, k) * 12 + treff(t.nMal, k) * 8 +
      Math.min(3, t.nPunkter.reduce((s, n) => s + treff(n, k), 0)) * 5;
    if (x) traff++;
    p += x;
  }
  return traff ? p * (traff / tk.length) : 0;
}
function poengSide(s, tk, hvor){
  let p = 0, traff = 0;
  for (const k of tk){
    const x = treff(s.nNavn, k) * 30 + (s.nSok.some(n => n === k.w || n === k.s) ? 40 : s.nSok.some(n => treff(n, k)) ? 18 : 0) + treff(s.nOm, k) * 6;
    if (x) traff++;
    p += x;
  }
  return traff ? p * (traff / tk.length) * (hvor ? 1.8 : 1) : 0;
}
function poengFilm(f, tk){
  let p = 0, traff = 0;
  for (const k of tk){ const x = treff(f.nNavn, k) * 20 + treff(f.nOm, k) * 5; if (x) traff++; p += x; }
  return traff ? p * (traff / tk.length) : 0;
}
function iOmr(x, omr){
  const o = OMR[omr]; if (!o || omr === 'alle') return false;
  if (x.type === 'ord') return o.tema.includes(x.tema);
  if (x.type === 'kort') return o.kap.includes(x.kapId);
  if (x.type === 'tema') return o.kap.includes(x.kap.id);
  if (x.type === 'side') return x.omr === omr;
  return false;
}
function ranger(liste, fn, omr){
  return liste.map(x => [x, fn(x) * (iOmr(x, omr) ? 1.3 : 1)]).filter(a => a[1] > 0).sort((a, b) => b[1] - a[1]);
}

function sok(q, omr){
  const tk = tokens(q);
  const hele = tk.map(t => t.w).join('');
  const hvor = /\b(hvor|finne|finner|side|siden|link|lenke)\b/i.test(q);
  const begreper = ranger(D.ord.concat(D.kort), o => poengBegrep(o, tk, hele), omr);
  return {
    tk, hvor,
    begreper,
    temaer: ranger(D.temaer, t => poengTema(t, tk), omr),
    sider: ranger(D.sider, s => poengSide(s, tk, hvor), omr),
    filmer: ranger(D.filmer, f => poengFilm(f, tk), omr)
  };
}

/* Finn temaet et begrep hører til (for lenke til oppgaver) */
function temaFor(b, res){
  if (b.temaRef) return b.temaRef;
  const navn = flat(b.navn);
  const direkte = D.kort.find(k => k.fNavn === navn);
  if (direkte) return direkte.temaRef;
  const tk = tokens(b.navn);
  const best = ranger(D.temaer, t => poengTema(t, tk), 'alle')[0];
  if (best && best[1] >= 30) return best[0];
  return res && res.temaer[0] && res.temaer[0][1] >= 25 ? res.temaer[0][0] : null;
}

/* Like ord når ingenting passer («Mente du …») */
function avstand(a, b){
  if (Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++){
    let forrige = d[0]; d[0] = i;
    for (let j = 1; j <= b.length; j++){
      const tmp = d[j];
      d[j] = Math.min(d[j] + 1, d[j - 1] + 1, forrige + (a[i - 1] === b[j - 1] ? 0 : 1));
      forrige = tmp;
    }
  }
  return d[b.length];
}
function menteDu(tk){
  const ut = [];
  for (const t of tk){
    if (t.w.length < 4) continue;
    const grense = t.w.length >= 8 ? 2 : 1;
    D.ord.forEach(o => {
      const deler = o.nNavn.split(' ');
      if (deler.some(d => avstand(t.w, d) <= grense || avstand(t.s, d) <= grense) && !ut.includes(o.navn)) ut.push(o.navn);
    });
  }
  return ut.slice(0, 5);
}

/* ---------- Byggeklosser for svaret ---------- */
const forste = s => { const m = String(s).match(/^.*?[.!?](\s|$)/); return m ? m[0].trim() : s; };
function sidetall(b){
  if (!b.refs || !b.refs.length || !A.BOKER) return '';
  return b.refs.map(r => { const bok = A.BOKER[r.bok]; return bok ? `${bok.navn}${r.kap.length ? ' kap. ' + r.kap.join(', ') : ''}, s. ${r.sider}` : ''; })
    .filter(Boolean).join(' · ');
}
function lenke(url, tekst, ekstern){
  const ut = ekstern || /^https?:/.test(url);
  return `<a href="${esc(url)}"${ut ? ' target="_blank" rel="noopener"' : ''}>${esc(tekst)}${ut ? ' ↗' : ' →'}</a>`;
}
function lenkeliste(lenker){
  if (!lenker.length) return '';
  return `<ul class="as-lenker">${lenker.map(l => `<li>${lenke(l.url, l.tekst)}${l.om ? `<span>${esc(l.om)}</span>` : ''}</li>`).join('')}</ul>`;
}
function sporKnapper(navn){
  if (!navn.length) return '';
  return `<div class="as-relatert"><span>Spør om:</span>${navn.map(n => `<button type="button" class="as-chip" data-sporsmal="Hva er ${esc(n)}?">${esc(n)}</button>`).join('')}</div>`;
}
function begrepKort(b, nivaa){
  const tekst = nivaa === 'enkel' ? forste(b.forklaring) : b.forklaring;
  const tema = b.tema && A.TEMA && A.TEMA[b.tema] ? A.TEMA[b.tema].navn : (b.temaRef ? b.temaRef.navn : '');
  return `<div class="as-begrep"><div class="as-eyebrow">Fagord${tema ? ' · ' + esc(tema) : ''}</div><h3>${esc(b.navn)}</h3><p>${esc(tekst)}</p></div>`;
}
/* Henter de punktene i «Kort fortalt» som handler mest om spørsmålet */
function bestePunkter(tema, tk, n){
  return tema.punkter.map((p, i) => [p, tk.reduce((s, k) => s + treff(tema.nPunkter[i], k), 0)])
    .filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]).slice(0, n).map(x => x[0]);
}
/* Andre fagord som passer – uten duplikater */
function relaterte(res, hoved, n){
  const brukt = new Set(hoved.map(h => h.fNavn));
  const ut = [];
  for (const [b, p] of res.begreper){
    if (p < 40 || brukt.has(b.fNavn) || ut.length >= n) continue;
    brukt.add(b.fNavn); ut.push(b.navn);
  }
  return ut;
}

/* ---------- Svar ---------- */
function svar(q, omr, nivaa){
  const res = sok(q, omr);
  const tk = res.tk;
  if (!tk.length) return { html: '<p>Skriv et fagord eller et spørsmål, for eksempel «Hva er en godsterminal?»</p>' };

  /* «Forskjell på A og B» */
  const forskjell = /forskjell|skille|sammenlign|\bvs\b|versus/i.test(q);
  if (forskjell){
    const deler = q.replace(/.*?(forskjell(en|er)?|skille[rn]?|sammenlign(e)?)\s*(på|mellom)?/i, '').split(/\s+(?:og|vs\.?|versus|eller)\s+/i);
    if (deler.length >= 2){
      const to = deler.slice(0, 2).map(d => { const t = tokens(d); const h = t.map(x => x.w).join(''); return ranger(D.ord.concat(D.kort), o => poengBegrep(o, t, h), omr)[0]; });
      if (to[0] && to[1] && to[0][1] >= 45 && to[1][1] >= 45 && to[0][0].fNavn !== to[1][0].fNavn){
        const [a, b] = to.map(x => x[0]);
        const lenker = [];
        [a, b].forEach(x => { const t = temaFor(x, res); if (t && !lenker.some(l => l.url === t.url)) lenker.push({ url: t.url, tekst: `${t.etikett}: ${t.navn}`, om: 'Les og øv på temaet' }); });
        if (res.sider[0] && res.sider[0][1] >= 40) lenker.push({ url: res.sider[0][0].url, tekst: res.sider[0][0].navn, om: res.sider[0][0].om });
        return { html:
          `<p>Her er de to begrepene ved siden av hverandre:</p><div class="as-to">${begrepKort(a, nivaa)}${begrepKort(b, nivaa)}</div>` +
          `<p class="as-oppg"><b>Prøv selv:</b> Skriv én setning som starter med «Forskjellen er at …». Gi et eksempel fra et lager, en terminal eller en lastebil.</p>` +
          lenkeliste(lenker.slice(0, nivaa === 'enkel' ? 1 : 3)), funn: true };
      }
    }
  }

  const topp = res.begreper[0];
  const begrep = topp && topp[1] >= 45 ? topp[0] : null;
  const temaTopp = res.temaer[0] && res.temaer[0][1] >= 18 ? res.temaer[0][0] : null;
  const maks = { enkel: 2, vanlig: 3, avansert: 5 }[nivaa];
  let html = '';
  const lenker = [];
  const leggTil = l => { if (l && !lenker.some(x => x.url === l.url)) lenker.push(l); };

  /* «Hvor finner jeg …?» – sidene først */
  if (res.hvor && res.sider[0] && res.sider[0][1] >= 40){
    html += `<p>Det finner du her:</p>`;
    res.sider.slice(0, maks).filter(x => x[1] >= 25).forEach(([s]) => leggTil({ url: s.url, tekst: s.navn, om: s.om }));
    return { html: html + lenkeliste(lenker), funn: true };
  }

  if (begrep){
    html += begrepKort(begrep, nivaa);
    const tema = temaFor(begrep, res) || temaTopp;
    if (nivaa === 'enkel'){
      html += `<p class="as-oppg"><b>Prøv selv:</b> Forklar ordet til en makker med egne ord. Gi et eksempel fra et lager, en terminal eller en lastebil.</p>`;
      const side = begrep.tema === 'U' ? D.sider.find(x => x.url === '/truck/') : null;
      if (tema) leggTil({ url: tema.url, tekst: `Øv på temaet: ${tema.navn}`, om: tema.etikett });
      else if (side) leggTil({ url: side.url, tekst: side.navn, om: side.om });
      else leggTil({ url: begrep.url, tekst: 'Se ordet i ordboka' });
    } else {
      if (tema){
        leggTil({ url: tema.url, tekst: `${tema.etikett}: ${tema.navn}`, om: tema.kortTekst });
        if (nivaa === 'avansert'){
          const p = bestePunkter(tema, tk, 3);
          if (p.length) html += `<div class="as-blokk"><b>Fra temaet «${esc(tema.navn)}»</b><ul>${p.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
        }
        if (tema.ndla[0]) leggTil({ url: tema.ndla[0].url, tekst: 'NDLA: ' + tema.ndla[0].tittel });
      }
      leggTil({ url: begrep.url, tekst: 'Se ordet i ordboka', om: 'Med sidetall i læreboka' });
      const side = res.sider[0] && res.sider[0][1] >= 25 ? res.sider[0][0] : (begrep.tema === 'U' ? D.sider.find(x => x.url === '/truck/') : null);
      if (side) leggTil({ url: side.url, tekst: side.navn, om: side.om });
      if (nivaa === 'avansert'){
        const st = sidetall(begrep);
        if (st) html += `<p class="as-liten">📖 I læreboka: ${esc(st)}</p>`;
        const film = res.filmer[0] && res.filmer[0][1] >= 15 ? res.filmer[0][0] : null;
        if (film){
          leggTil({ url: film.url, tekst: 'Film: ' + film.navn, om: film.kilde });
          if (film.sporsmal[0]) html += `<p class="as-oppg"><b>Tenk videre:</b> ${esc(film.sporsmal[0])}</p>`;
        } else {
          html += `<p class="as-oppg"><b>Tenk videre:</b> Hva kan gå galt i praksis hvis dette ikke blir gjort riktig? Hvem får følgene – deg, kollegaene, kunden eller andre i trafikken?</p>`;
        }
      } else {
        html += `<p class="as-oppg"><b>Prøv selv:</b> Forklar begrepet med egne ord og gi et eksempel fra praksis.</p>`;
      }
    }
    html += lenkeliste(lenker.slice(0, maks));
    if (nivaa !== 'enkel') html += sporKnapper(relaterte(res, [begrep], nivaa === 'avansert' ? 4 : 3));
    return { html, funn: true };
  }

  /* Ingen fagord – men temaer, sider eller filmer */
  const andre = [];
  res.temaer.slice(0, 3).filter(x => x[1] >= 18).forEach(([t, p]) => andre.push({ p, url: t.url, tekst: `${t.etikett}: ${t.navn}`, om: t.kortTekst }));
  res.sider.slice(0, 3).filter(x => x[1] >= 25).forEach(([s, p]) => andre.push({ p, url: s.url, tekst: s.navn, om: s.om }));
  res.filmer.slice(0, 2).filter(x => x[1] >= 15).forEach(([f, p]) => andre.push({ p: p * 0.8, url: f.url, tekst: 'Film: ' + f.navn, om: f.kilde }));
  andre.sort((a, b) => b.p - a.p);
  if (andre.length){
    html += `<p>Jeg fant ikke ett bestemt fagord, men dette på TLLfluenseren handler om det du spør om:</p>`;
    if (temaTopp && nivaa !== 'enkel'){
      const p = bestePunkter(temaTopp, tk, nivaa === 'avansert' ? 3 : 2);
      if (p.length) html += `<div class="as-blokk"><b>Kort fortalt fra «${esc(temaTopp.navn)}»</b><ul>${p.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`;
    }
    andre.forEach(leggTil);
    html += lenkeliste(lenker.slice(0, maks));
    html += sporKnapper(relaterte(res, [], 3));
    return { html, funn: true };
  }

  /* Ingenting */
  const forslag = menteDu(tk);
  html += `<p>Jeg fant ikke noe om «${esc(q)}» på TLLfluenseren ennå.</p>`;
  if (forslag.length) html += sporKnapper(forslag).replace('Spør om:', 'Mente du:');
  html += `<p class="as-liten">Tips: Skriv ett fagord, for eksempel «friksjon», «plukkliste» eller «fraktbrev». Du kan også bla i ${lenke(FAG + 'ordbok/?q=' + encodeURIComponent(tk.map(t => t.w).join(' ')), 'ordboka')}.</p>`;
  return { html, funn: false };
}

/* ---------- Grensesnitt ---------- */
let sisteTekst = '', sisteSporsmal = '';
function boble(html, mine){
  const d = document.createElement('div');
  d.className = 'as-boble' + (mine ? ' mine' : '');
  d.innerHTML = html;
  $('#messages').append(d);
  d.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  return d;
}
function spor(q){
  q = String(q || '').trim().slice(0, 300);
  if (!q) return;
  sisteSporsmal = q;
  boble(esc(q), true);
  const nivaa = $('#level').value, omr = $('#topic').value;
  const s = svar(q, omr, nivaa);
  const b = boble(s.html, false);
  const kopi = b.cloneNode(true);
  kopi.querySelectorAll('.as-relatert, .as-lenker').forEach(e => e.remove());
  sisteTekst = kopi.textContent.replace(/\s+/g, ' ').trim();
  $('#kiVidere').hidden = false;
}

function kiPrompt(){
  const nivaa = { enkel: 'enkelt, med korte setninger og vanlige ord', vanlig: 'på vanlig Vg2-nivå', avansert: 'grundig, med regelverk, risiko og praktiske følger' }[$('#level').value];
  return `Jeg går Vg2 transport, logistikk og løfteoperasjoner (TLL). Forklar ${nivaa}: ${sisteSporsmal}\n` +
    `Bruk et praktisk eksempel fra lager, terminal eller transport. Avslutt med ett kontrollspørsmål jeg kan svare på.`;
}

function init(){
  byggData();
  const form = $('#chat'), inp = $('#question');
  form.addEventListener('submit', e => { e.preventDefault(); spor(inp.value); inp.value = ''; inp.focus(); });
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-sporsmal]');
    if (c){ spor(c.getAttribute('data-sporsmal')); }
  });
  $('#read').addEventListener('click', () => {
    if (!sisteTekst || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(sisteTekst); u.lang = 'nb-NO'; speechSynthesis.speak(u);
  });
  $('#kiKopier').addEventListener('click', async () => {
    const tekst = kiPrompt(), st = $('#kiStatus');
    try { await navigator.clipboard.writeText(tekst); st.textContent = 'Kopiert! Lim inn i KI-verktøyet skolen din har godkjent.'; }
    catch (e) { $('#kiTekst').hidden = false; $('#kiTekst').value = tekst; $('#kiTekst').select(); st.textContent = 'Merk teksten og kopier den selv (Ctrl + C).'; }
  });
  $('#antall').textContent = `${D.ord.length + D.kort.length} fagord og begreper · ${D.temaer.length} temaer · ${D.sider.length} sider`;
  const q = new URLSearchParams(location.search).get('q');
  if (q) spor(q);
}

/* Last kapitlene (fra felles/kapitler.js) og ressursbanken, så start */
function lastSkript(src){ return new Promise(ok => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ok; document.head.append(s); }); }
A.start = async function(){
  A.KAP = [];
  window.TLL = window.TLL || {};
  window.TLL.registrer = d => A.KAP.push(d);
  const kap = (window.TLL.KAPITLER || []);
  await Promise.all(kap.map(k => lastSkript(FAG + k.sti + 'data.js')));
  A.KAP.sort((a, b) => a.nr - b.nr);
  try { A.KATALOG = await (await fetch('/ressursbank/katalog.json')).json(); } catch (e) { A.KATALOG = null; }
  init();
};
A._test = { svar, sok, byggData, D };
})();
