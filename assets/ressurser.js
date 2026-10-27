/* One shared catalogue; public pages never read the teacher's local draft. */
(() => {
  'use strict';
  const types = ['Film', 'Artikkel', 'Nettside', 'Podkast', 'Annet'];
  const draftKey = 'tll-resource-draft-v1';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function safeURL(value) {
    try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) && !u.username && !u.password; } catch { return false; }
  }
  function validate(data) {
    if (!data || data.version !== 1 || !Array.isArray(data.areas) || !Array.isArray(data.topics) || !Array.isArray(data.resources)) throw Error('Ugyldig ressursfil. Bruk en eksport fra ressursbanken.');
    const ids = new Set();
    const text = (v, max = 3000) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;
    if (data.areas.length > 100 || data.topics.length > 1000 || data.resources.length > 3000) throw Error('Ressursfilen er for stor.');
    for (const a of data.areas) { if (!text(a.id, 100) || !text(a.title, 200) || ids.has(a.id)) throw Error('Ugyldige fagområder.'); ids.add(a.id); }
    const topicIds = new Set();
    for (const t of data.topics) {
      if (!text(t.id, 100) || !text(t.title, 200) || !ids.has(t.area) || topicIds.has(t.id) || typeof t.url !== 'string' || !/^\/(?!\/)/.test(t.url) || /[\\\s]/.test(t.url)) throw Error('Ugyldig tema eller temalenke.');
      topicIds.add(t.id);
    }
    const resourceIds = new Set(), urls = new Set();
    for (const r of data.resources) {
      if (!text(r.id, 100) || resourceIds.has(r.id) || !text(r.title, 200) || !text(r.provider, 200) || !types.includes(r.type) || !safeURL(r.url) || !text(r.description) || typeof r.visible !== 'boolean' || !Array.isArray(r.topics) || !r.topics.length || r.topics.some(t => !topicIds.has(t)) || new Set(r.topics).size !== r.topics.length || typeof r.watchFor !== 'string' || r.watchFor.length > 3000 || !Array.isArray(r.questions) || r.questions.length > 30 || r.questions.some(q => !text(q, 1000))) throw Error('En ressurs mangler gyldig tittel, lenke, tema eller andre felt.');
      const url = new URL(r.url).href;
      if (urls.has(url)) throw Error('Samme lenke er registrert flere ganger. Koble heller én ressurs til flere temaer.');
      resourceIds.add(r.id); urls.add(url);
    }
    return data;
  }
  function filter(data, {q = '', area = '', topic = '', type = ''} = {}) {
    const query = q.trim().toLocaleLowerCase('nb');
    return data.resources.filter(r => r.visible && (!type || r.type === type) && (!topic || r.topics.includes(topic)) && (!area || r.topics.some(id => data.topics.find(t => t.id === id)?.area === area)) && (!query || [r.title, r.provider, r.description, ...r.topics.map(id => data.topics.find(t => t.id === id)?.title)].join(' ').toLocaleLowerCase('nb').includes(query)));
  }
  const dataPromise = fetch('/ressursbank/katalog.json', {cache:'no-cache'}).then(r => { if (!r.ok) throw Error('Ressursbanken kunne ikke lastes.'); return r.json(); }).then(validate);
  // Embed-only pages also handle loading failures through mount().
  dataPromise.catch(() => {});
  function card(r, data) {
    const topics = r.topics.map(id => data.topics.find(t => t.id === id));
    return `<article class="rb-card"><div class="rb-meta"><span class="rb-type">${esc(r.type)}</span><span>${esc(r.provider)}</span><span>Fordypning</span></div><h3>${esc(r.title)}</h3><p>${esc(r.description)}</p><div class="rb-chips">${topics.map(t => `<a class="rb-chip" href="${esc(t.url)}">${esc(t.title)}</a>`).join('')}</div>${r.watchFor || r.questions.length ? `<details><summary>Se etter og reflekter</summary>${r.watchFor ? `<p><strong>Se etter dette:</strong> ${esc(r.watchFor)}</p>` : ''}${r.questions.length ? `<ul>${r.questions.map(q => `<li>${esc(q)}</li>`).join('')}</ul>` : ''}</details>` : ''}<p><a class="rb-open" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">Åpne ${r.type === 'Film' ? 'filmen' : 'ressursen'} ↗</a></p><small>Åpnes hos ${esc(r.provider)} i en ny fane.</small></article>`;
  }
  const options = (items, selected) => items.map(x => `<option value="${esc(x.id)}" ${x.id === selected ? 'selected' : ''}>${esc(x.title)}</option>`).join('');
  async function mount(node) {
    if (node.dataset.resourceMounted) return;
    node.dataset.resourceMounted = 'true'; node.classList.add('rb', 'rb-section');
    node.innerHTML = '<p role="status">Laster flere kilder …</p>';
    try {
      const data = await dataPromise;
      if (!node.isConnected) return;
      const topic = node.dataset.resourceTopic || '', area = node.dataset.resourceArea || '';
      const resources = filter(data, {topic, area});
      node.innerHTML = `<h2>Se og lær – flere kilder</h2><p>Fordypning og alternative forklaringer til temaet.</p>${resources.length ? `<div class="rb-grid">${resources.map(r => card(r, data)).join('')}</div>` : '<p class="rb-empty">Ingen tilleggskilder er lagt til her ennå.</p>'}<a href="/ressursbank/?${new URLSearchParams(topic ? {topic} : area ? {area} : {})}">Utforsk ressursbanken →</a>`;
    } catch { node.innerHTML = '<p>Tilleggskildene kunne ikke lastes. <a href="/ressursbank/">Prøv ressursbanken</a>.</p>'; }
  }
  const intro = `<section class="rb-intro"><div class="kicker">Se og lær – flere kilder</div><h1>Flere veier til forståelse.</h1><p>Filmer, artikler og andre forklaringer, samlet etter tema. Bruk dem til fordypning og repetisjon sammen med lærestoffet.</p></section>`;
  function publicPage(root, data) {
    const params = new URLSearchParams(location.search);
    const state = {q:params.get('q') || '', area:params.get('area') || '', topic:params.get('topic') || '', type:params.get('type') || ''};
    if (!data.areas.some(a => a.id === state.area)) state.area = '';
    if (!data.topics.some(t => t.id === state.topic)) state.topic = '';
    if (!types.includes(state.type)) state.type = '';
    root.classList.add('rb');
    root.innerHTML = intro + `<div class="rb-filters" role="search" aria-label="Finn ressurser"><label class="rb-field">Søk<input id="rb-q" type="search" value="${esc(state.q)}" placeholder="Søk etter tema, tittel eller avsender"></label><label class="rb-field">Fagområde<select id="rb-area"><option value="">Alle fagområder</option>${options(data.areas, state.area)}</select></label><label class="rb-field">Tema<select id="rb-topic"></select></label><label class="rb-field">Type<select id="rb-type"><option value="">Alle typer</option>${types.map(x => `<option ${x === state.type ? 'selected' : ''}>${x}</option>`).join('')}</select></label></div><div class="rb-actions"><button id="rb-clear">Nullstill filtre</button></div><p id="rb-count" role="status" aria-live="polite"></p><div id="rb-results"></div>`;
    const updateTopics = () => { root.querySelector('#rb-topic').innerHTML = '<option value="">Alle temaer</option>' + options(data.topics.filter(t => !state.area || t.area === state.area), state.topic); };
    const update = () => {
      const rows = filter(data, state);
      root.querySelector('#rb-count').textContent = `${rows.length} ${rows.length === 1 ? 'ressurs' : 'ressurser'} funnet`;
      root.querySelector('#rb-results').innerHTML = rows.length ? `<div class="rb-grid">${rows.map(r => card(r, data)).join('')}</div>` : '<p class="rb-empty">Ingen treff. Prøv et annet søkeord eller fjern et filter.</p>';
      const query = new URLSearchParams(Object.entries(state).filter(([,v]) => v));
      history.replaceState(null, '', location.pathname + (query.size ? '?' + query : '') + location.hash);
    };
    for (const key of ['q','area','topic','type']) root.querySelector('#rb-' + key).addEventListener(key === 'q' ? 'input' : 'change', e => { state[key] = e.target.value; if (key === 'area') {state.topic = ''; updateTopics();} update(); });
    root.querySelector('#rb-clear').onclick = () => { for (const k of Object.keys(state)) {state[k] = ''; root.querySelector('#rb-' + k).value = '';} updateTopics(); update(); };
    updateTopics(); update();
  }
  function teacherPage(root, published) {
    let data = structuredClone(published), editing = '', dirty = false, storageOK = true, initialMessage = '';
    try { const saved = localStorage.getItem(draftKey); if (saved) { data = validate(JSON.parse(saved)); initialMessage = 'Et lokalt utkast er hentet fra denne nettleseren.'; } } catch { storageOK = false; initialMessage = 'Lokalt utkast kunne ikke leses. Du kan fortsatt redigere og laste ned endringene.'; }
    root.classList.add('rb');
    root.innerHTML = `<section class="rb-intro"><div class="kicker">Lærerrom · Ressurser</div><h1>Samle det som forklarer godt.</h1><p>Registrer lenken én gang og velg alle temaene den passer til.</p><a href="#/">← Til den publiserte ressursbanken</a></section><div class="rb-note"><strong>Du arbeider med et lokalt utkast.</strong> Lagrede endringer vises bare i denne nettleseren. For å gjøre dem tilgjengelige for elevene: last ned ressursfilen og legg den ved en melding til meg med beskjed om å publisere den. Ikke legg personopplysninger i ressursbanken.</div><p id="rb-message" class="rb-status" role="status" aria-live="polite"></p><div class="rb-actions"><button id="rb-add">Legg til ressurs</button><button id="rb-export">Last ned ressursfil for publisering</button><label class="rb-field">Åpne ressursfil<input id="rb-import" type="file" accept="application/json,.json"></label><button id="rb-reset">Hent publisert versjon</button></div><section id="rb-form-area" class="rb-editor" hidden></section><h2>Ressurser i utkastet</h2><div id="rb-draft-list"></div>`;
    const msg = text => {root.querySelector('#rb-message').textContent = text;};
    msg(initialMessage);
    const save = () => { try { if (!storageOK) throw Error(); localStorage.setItem(draftKey, JSON.stringify(data)); msg('Utkast lagret i denne nettleseren. Last ned ressursfilen når du vil publisere.'); } catch { msg('Endringene er bare i denne fanen. Last ned ressursfilen før du lukker siden.'); } };
    const list = () => {
      root.querySelector('#rb-draft-list').innerHTML = data.resources.length ? `<div class="rb-grid">${data.resources.map(r => `<article class="rb-card"><div class="rb-meta">${esc(r.type)} · ${r.visible ? 'Vises ved publisering' : 'Skjult fra elevvisningen'}</div><h3>${esc(r.title)}</h3><p>${r.topics.map(id => esc(data.topics.find(t => t.id === id).title)).join(' · ')}</p><div class="rb-actions"><button data-edit="${esc(r.id)}">Rediger</button><button data-toggle="${esc(r.id)}">${r.visible ? 'Skjul' : 'Vis'}</button><button data-delete="${esc(r.id)}">Slett</button></div></article>`).join('')}</div>` : '<p>Ingen ressurser i utkastet. Legg til den første.</p>';
      root.querySelectorAll('[data-edit]').forEach(b => b.onclick = () => open(b.dataset.edit));
      root.querySelectorAll('[data-toggle]').forEach(b => b.onclick = () => {const r = data.resources.find(x => x.id === b.dataset.toggle); r.visible = !r.visible; save(); list();});
      root.querySelectorAll('[data-delete]').forEach(b => b.onclick = () => {const r = data.resources.find(x => x.id === b.dataset.delete); if (confirm(`Slette «${r.title}» fra utkastet?`)) {data.resources = data.resources.filter(x => x !== r); save(); list(); if(editing === r.id) close();}});
    };
    const formArea = root.querySelector('#rb-form-area');
    const abandon = () => !dirty || confirm('Forkaste endringene som ikke er lagret i skjemaet?');
    const close = () => { formArea.hidden = true; formArea.innerHTML = ''; editing = ''; dirty = false; };
    function open(id = '') {
      if (!abandon()) return;
      editing = id; dirty = false;
      const r = data.resources.find(x => x.id === id) || {title:'', provider:'', type:'Film', url:'', description:'', topics:[], watchFor:'', questions:[], visible:true};
      const field = (key, title, value, max, kind = 'text') => `<label class="rb-field">${title}<input name="${key}" type="${kind}" maxlength="${max}" required value="${esc(value)}"></label>`;
      formArea.hidden = false;
      formArea.innerHTML = `<h2>${id ? 'Rediger ressurs' : 'Legg til ressurs'}</h2><form id="rb-form"><div class="rb-form-grid">${field('title','Tittel',r.title,200)}${field('provider','Avsender',r.provider,200)}${field('url','Lenke',r.url,3000,'url')}<label class="rb-field">Type<select name="type">${types.map(t => `<option ${r.type === t ? 'selected' : ''}>${t}</option>`).join('')}</select></label><label class="rb-field rb-wide">Hvorfor er ressursen nyttig?<textarea name="description" maxlength="3000" required>${esc(r.description)}</textarea></label><fieldset class="rb-wide"><legend>Temaer · velg ett eller flere</legend><div class="rb-checks">${data.topics.map(t => `<label><input type="checkbox" name="topics" value="${esc(t.id)}" ${r.topics.includes(t.id) ? 'checked' : ''}><span>${esc(t.title)}<br><small>${esc(data.areas.find(a => a.id === t.area).title)}</small></span></label>`).join('')}</div></fieldset><label class="rb-field rb-wide">Se etter dette · valgfritt<textarea name="watchFor" maxlength="3000">${esc(r.watchFor)}</textarea></label><label class="rb-field rb-wide">Refleksjonsspørsmål · ett per linje, valgfritt<textarea name="questions" maxlength="30000">${esc(r.questions.join('\n'))}</textarea></label><label class="rb-wide"><input name="visible" type="checkbox" ${r.visible ? 'checked' : ''}> Vis i elevvisningen etter publisering</label></div><p id="rb-form-error" role="alert"></p><div class="rb-actions"><button type="submit">Lagre i lokalt utkast</button><button id="rb-cancel" type="button">Avbryt</button></div></form>`;
      formArea.querySelector('form').oninput = () => {dirty = true;};
      formArea.querySelector('#rb-cancel').onclick = () => { if (abandon()) close(); };
      formArea.querySelector('form').onsubmit = event => {
        event.preventDefault();
        const f = new FormData(event.target), next = {id:id || 'ressurs-' + (crypto.randomUUID?.() || Date.now().toString(36) + Math.random().toString(36).slice(2)), title:f.get('title').trim(), provider:f.get('provider').trim(), url:f.get('url').trim(), type:f.get('type'), description:f.get('description').trim(), topics:f.getAll('topics'), watchFor:f.get('watchFor').trim(), questions:f.get('questions').split('\n').map(s => s.trim()).filter(Boolean), visible:f.has('visible')};
        const proposed = {...data, resources:id ? data.resources.map(x => x.id === id ? next : x) : [...data.resources, next]};
        try {validate(proposed); data = proposed; save(); close(); list();} catch (e) {formArea.querySelector('#rb-form-error').textContent = e.message;}
      };
      formArea.querySelector('input').focus(); formArea.scrollIntoView({block:'start',behavior:'smooth'});
    }
    root.querySelector('#rb-add').onclick = () => open();
    root.querySelector('#rb-export').onclick = () => {
      if (dirty) {msg('Lagre skjemaet i utkastet før du laster ned ressursfilen.'); return;}
      const url = URL.createObjectURL(new Blob([JSON.stringify(validate(data),null,2) + '\n'], {type:'application/json'})), a = document.createElement('a');
      a.href = url; a.download = 'TLL-ressursbank.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000); msg('Ressursfilen er klar til nedlasting. Legg den ved en melding og be meg publisere endringene.');
    };
    root.querySelector('#rb-import').onchange = async event => {
      const input = event.target, file = input.files[0];
      if (!file) return;
      if (!abandon() || !confirm('Erstatte hele det lokale utkastet med ressursfilen?')) {input.value = ''; return;}
      try {if (file.size > 3000000) throw Error('Filen er for stor.'); const parsed = validate(JSON.parse(await file.text())); data = parsed; close(); save(); list();} catch(e) {msg('Filen ble ikke åpnet: ' + e.message);} input.value = '';
    };
    root.querySelector('#rb-reset').onclick = () => {if (abandon() && confirm('Erstatte det lokale utkastet med siste publiserte versjon?')) {data = structuredClone(published); close(); save(); list();}};
    const beforeUnload = event => {if (dirty) {event.preventDefault(); event.returnValue = '';}};
    window.addEventListener('beforeunload', beforeUnload);
    list();
    return () => { if (!abandon()) return false; window.removeEventListener('beforeunload', beforeUnload); return true; };
  }
  window.TLLResources = {validate, filter, safeURL, card, mount};
  function scan() { document.querySelectorAll('[data-resource-topic],[data-resource-area]').forEach(mount); }
  const observer = new MutationObserver(scan); observer.observe(document.body, {childList:true, subtree:true}); scan();
  const root = document.getElementById('resource-bank');
  if (root) {
    let leave = null, current = '';
    const route = async () => {
      if (leave && !leave()) {history.replaceState(null,'',location.pathname + location.search + current); return;}
      leave = null; current = location.hash;
      try {const data = await dataPromise; if (location.hash === '#/laerer') leave = teacherPage(root,data); else publicPage(root,data);} catch {root.innerHTML = '<h1>Ressursbanken kunne ikke lastes</h1><p>Prøv å laste siden på nytt.</p>';}
    };
    window.addEventListener('hashchange',route); route();
  }
})();
