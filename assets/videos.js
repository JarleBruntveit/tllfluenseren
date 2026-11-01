/* Shared video catalogue for the front page, the library and relevant lessons. */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeURL = value => {
    try {const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && ['static.metricool.com','www.youtube.com','www.youtube-nocookie.com','www.tiktok.com','www.instagram.com'].includes(u.hostname);} catch {return false;}
  };
  function validate(data) {
    if (data?.version !== 1 || !Array.isArray(data.videos) || !Array.isArray(data.channels)) throw Error('Ugyldig videokatalog.');
    const ids = new Set();
    for (const v of data.videos) {
      if (!/^[a-z0-9-]+$/.test(v.id) || ids.has(v.id) || typeof v.title !== 'string' || !Array.isArray(v.lessons) || !['velkommen','daglig-kontroll','livsvisdom'].includes(v.topic) || (v.sourceUrl && !safeURL(v.sourceUrl)) || (v.youtubeUrl && !safeURL(v.youtubeUrl)) || (v.availableAt && !Number.isFinite(Date.parse(v.availableAt)))) throw Error('Ugyldig film.');
      ids.add(v.id);
    }
    if (data.channels.some(c => !safeURL(c.url))) throw Error('Ugyldig kanallenke.');
    return data;
  }
  const available = (video, now = Date.now()) => Boolean(video.sourceUrl && video.availableAt && now >= Date.parse(video.availableAt));
  const select = (data, {lesson, topic} = {}) => data.videos.filter(v => (!lesson || v.lessons.includes(lesson)) && (!topic || v.topic === topic)).sort((a,b) => a.order-b.order);
  window.TLLVideo = {validate, available, select, safeURL};
  if (typeof document === 'undefined') return;
  const catalogue = fetch('/assets/videos.json', {cache:'no-cache'}).then(r => {if(!r.ok) throw Error('Videooversikten kunne ikke lastes.');return r.json();}).then(validate);
  catalogue.catch(() => {});
  const dateText = value => new Intl.DateTimeFormat('nb-NO', {timeZone:'Europe/Oslo',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(value));
  const statusText = video => available(video) ? 'Kan spilles av nå' : video.availableAt ? 'Publiseres ' + dateText(video.availableAt) : 'Kommer';
  function card(v) {
    const live = available(v);
    return `<article class="tv-card" id="${esc(v.id)}" ${!live && v.availableAt ? `data-pending-until="${esc(v.availableAt)}"` : ''}>${live ? `<div class="tv-player-wrap"><button class="tv-play" type="button" data-play-video="${esc(v.id)}"><span class="tv-play-symbol" aria-hidden="true">▶</span><span>Spill av på siden</span></button></div>` : ''}<div class="tv-card-body"><div class="tv-meta"><span>${v.order > 0 && v.order < 6 ? 'Del ' + v.order + ' av 5' : v.topic === 'livsvisdom' ? 'Livsvisdom' : 'Velkommen'}</span><span>${esc(v.duration)}</span></div><h3>${esc(v.title)}</h3><p>${esc(v.description)}</p>${live && v.youtubeUrl ? `<a href="${esc(v.youtubeUrl)}" target="_blank" rel="noopener noreferrer">Se på YouTube ↗</a>` : ''}${v.lessons.length ? `<a class="tv-topic-link" href="/truck/opplaering/#/leksjon/${encodeURIComponent(v.lessons[0])}">Gå til fagtemaet →</a>` : ''}<p class="tv-pending">${esc(statusText(v))}</p></div></article>`;
  }
  function bindPlayers(root, data) {
    root.querySelectorAll('[data-play-video]').forEach(button => button.addEventListener('click', () => {
      const v = data.videos.find(v => v.id === button.dataset.playVideo);
      if (!v || !available(v)) return;
      const area = button.parentElement, player = document.createElement('video');
      player.className = 'tv-player'; player.controls = true; player.playsInline = true; player.preload = 'none'; player.setAttribute('aria-label', v.title);
      const source = document.createElement('source'); source.src = v.sourceUrl; source.type = 'video/mp4'; player.appendChild(source);
      player.addEventListener('error', () => {
        if (area.querySelector('.tv-player-error')) return;
        const p = document.createElement('p'); p.className = 'tv-player-error'; p.innerHTML = `Filmen kunne ikke spilles av her. <a href="${esc(v.sourceUrl)}" target="_blank" rel="noopener noreferrer">Åpne filmen i en ny fane ↗</a>`; area.appendChild(p);
      });
      area.replaceChildren(player); player.focus(); player.play().catch(() => {});
    }));
  }
  async function mount(node) {
    if (node.dataset.videoMounted) return;
    node.dataset.videoMounted = 'true';
    try {
      const data = await catalogue; if (!node.isConnected) return;
      const rows = select(data, {lesson:node.dataset.tllVideoLesson,topic:node.dataset.tllVideoTopic});
      if (!rows.length) {node.hidden = true;return;}
      if (node.dataset.tllVideoLesson || node.dataset.tllVideoCompact !== undefined) {
        node.classList.add('tv-context');
        node.innerHTML = `<h2>Video til dette temaet</h2><ul>${rows.map(v => `<li><a href="/video/#${esc(v.id)}">${esc(v.title)} · ${esc(v.duration)}</a><small>${esc(statusText(v))}</small></li>`).join('')}</ul><a href="/video/#daglig-kontroll">Se hele videoserien →</a>`;
      } else {
        node.innerHTML = `<div class="tv-grid">${rows.map(card).join('')}</div>`; bindPlayers(node,data);
        const id = location.hash.slice(1); if (id && rows.some(v => v.id === id)) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({block:'start'}));
      }
    } catch {
      node.innerHTML = '<p class="tv-status">Videooversikten kunne ikke lastes. <a href="/video/">Åpne videosiden</a> eller prøv å laste siden på nytt.</p>';
    }
  }
  function scan() {document.querySelectorAll('[data-tll-video-topic],[data-tll-video-lesson]').forEach(mount);}
  new MutationObserver(scan).observe(document.body,{childList:true,subtree:true}); scan();
  setInterval(async () => {
    const data = await catalogue.catch(() => null); if (!data) return;
    document.querySelectorAll('[data-pending-until]').forEach(node => {
      if (Date.now() < Date.parse(node.dataset.pendingUntil)) return;
      const video = data.videos.find(v => v.id === node.id); if (!video) return;
      const template = document.createElement('template'); template.innerHTML = card(video);
      const next = template.content.firstElementChild; node.replaceWith(next); bindPlayers(next,data);
    });
  },60000);
})();
