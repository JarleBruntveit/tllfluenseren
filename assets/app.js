
(() => {
  const tests = window.TLL_TESTS;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let currentTest = null;
  let idx = 0;

  const $ = (s) => document.querySelector(s);
  const picker = $("#picker"), player = $("#player"), finished = $("#finished");
  const qText = $("#questionText"), qnum = $("#qnum"), options = $("#options");
  const qimg = $("#qimg"), counter = $("#counter"), bar = $("#bar"), testTitle = $("#testTitle");
  const rate = $("#rate"), voiceSelect = $("#voice"), panel = $("#questionPanel");

  function norwegianVoices() {
    const voices = speechSynthesis.getVoices();
    const no = voices.filter(v => /^no|nb|nn/i.test(v.lang));
    return no.length ? no : voices;
  }
  function loadVoices() {
    const voices = norwegianVoices();
    voiceSelect.innerHTML = "";
    voices.forEach((v,i) => {
      const o = document.createElement("option");
      o.value = i; o.textContent = `${v.name} (${v.lang})`;
      voiceSelect.appendChild(o);
    });
  }
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;

  let speechQueue = [];
  let speechTimer = null;
  let activeHighlight = null;

  function clearHighlights() {
    document.querySelectorAll(".speaking,.wordSpeaking").forEach(el => {
      el.classList.remove("speaking","wordSpeaking");
    });
    activeHighlight = null;
  }

  function stopSpeech() {
    speechSynthesis.cancel();
    if (speechTimer) {
      clearTimeout(speechTimer);
      speechTimer = null;
    }
    speechQueue = [];
    clearHighlights();
  }

  function scoreVoice(v) {
    const name = (v.name || "").toLowerCase();
    const lang = (v.lang || "").toLowerCase();
    let score = 0;
    if (/^(nb|no|nn)/.test(lang)) score += 100;
    if (name.includes("natural")) score += 30;
    if (name.includes("online")) score += 20;
    if (name.includes("microsoft")) score += 10;
    return score;
  }

  function allVoicesSorted() {
    return speechSynthesis.getVoices().slice().sort((a,b) => scoreVoice(b) - scoreVoice(a));
  }

  function loadVoices() {
    const voices = allVoicesSorted();
    voiceSelect.innerHTML = "";
    voices.forEach((v,i) => {
      const o = document.createElement("option");
      o.value = i;
      const natural = /natural|online/i.test(v.name) ? " · naturtro" : "";
      o.textContent = `${v.name} (${v.lang})${natural}`;
      voiceSelect.appendChild(o);
    });
  }
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;

  function selectedVoice() {
    const voices = allVoicesSorted();
    return voices[Number(voiceSelect.value || 0)] || voices[0];
  }

  function prepareWords(el) {
    if (!el) return;
    const raw = el.dataset.rawText || el.textContent;
    el.dataset.rawText = raw;
    const words = raw.split(/(\s+)/);
    el.innerHTML = words.map((w,i) => {
      if (/^\s+$/.test(w)) return w;
      return `<span class="spokenWord" data-word-index="${i}">${escapeHtml(w)}</span>`;
    }).join("");
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  }

  function highlightWordByChar(el, charIndex) {
    if (!el) return;
    const raw = el.dataset.rawText || el.textContent;
    const spans = [...el.querySelectorAll(".spokenWord")];
    let pos = 0;
    for (const sp of spans) {
      const w = sp.textContent;
      const idx = raw.indexOf(w, pos);
      if (idx >= 0) {
        if (charIndex >= idx && charIndex <= idx + w.length) {
          spans.forEach(x => x.classList.remove("wordSpeaking"));
          sp.classList.add("wordSpeaking");
          return;
        }
        pos = idx + w.length;
      }
    }
  }

  function speakOne(text, el, onEnd) {
    clearHighlights();
    if (el) {
      activeHighlight = el;
      el.classList.add("speaking");
      prepareWords(el);
    }

    const u = new SpeechSynthesisUtterance(text);
    const v = selectedVoice();
    if (v) u.voice = v;
    u.lang = v?.lang || "nb-NO";
    u.rate = Number(rate.value || 0.9);
    u.pitch = 1;
    u.volume = 1;

    u.onboundary = (e) => {
      if (e.name === "word" && el) highlightWordByChar(el, e.charIndex);
    };

    u.onend = () => {
      clearHighlights();
      if (onEnd) onEnd();
    };
    u.onerror = () => {
      clearHighlights();
      if (onEnd) onEnd();
    };

    speechSynthesis.speak(u);
  }

  function speakSequence(parts) {
    stopSpeech();
    speechQueue = [...parts];

    const nextPart = () => {
      if (!speechQueue.length) return;
      const part = speechQueue.shift();
      speakOne(part.text, part.el, () => {
        if (speechQueue.length) {
          speechTimer = setTimeout(nextPart, part.pauseAfter ?? 900);
        }
      });
    };
    nextPart();
  }

  function speak(text, el=null) {
    speakSequence([{text, el, pauseAfter:0}]);
  }

  function fullSequence(q) {
    const seq = [
      { text: `Spørsmål ${idx+1}. ${q.q}`, el: qText, pauseAfter: 1250 }
    ];

    q.a.forEach((t,i) => {
      const row = options.children[i];
      const labelEl = row?.querySelector(".optionLabel");
      const textEl = row?.querySelector(".optionText");

      seq.push({
        text: `Svaralternativ ${letters[i]}`,
        el: labelEl,
        pauseAfter: 1250
      });
      seq.push({
        text: t,
        el: textEl,
        pauseAfter: 1500
      });
    });
    return seq;
  }

  function render() {
    stopSpeech();
    const test = tests[currentTest];
    const q = test.questions[idx];
    testTitle.textContent = test.title;
    qnum.textContent = `Spørsmål ${idx+1}`;
    counter.textContent = `${idx+1} av ${test.questions.length}`;
    bar.style.width = `${((idx+1)/test.questions.length)*100}%`;
    qText.textContent = q.q; qText.dataset.rawText = q.q;

    if(q.image){
      qimg.src = q.image;
      qimg.alt = q.alt || "";
      qimg.classList.remove("hidden");
    } else {
      qimg.classList.add("hidden");
      qimg.removeAttribute("src");
    }

    options.innerHTML = "";
    q.a.forEach((t,i) => {
      const row = document.createElement("div");
      row.className = "option";
      row.innerHTML = `<div class="letter">${letters[i]}</div><div><div class="optionLabel">Svaralternativ ${letters[i]}</div><div class="optionText"></div></div><button class="iconBtn" aria-label="Les svaralternativ ${letters[i]}">🔊</button>`;
      row.querySelector(".optionText").textContent = t; row.querySelector(".optionText").dataset.rawText = t;
      row.querySelector("button").addEventListener("click", () => {
        const labelEl = row.querySelector(".optionLabel");
        const textEl = row.querySelector(".optionText");
        speakSequence([
          {text:`Svaralternativ ${letters[i]}`, el:labelEl, pauseAfter:1250},
          {text:t, el:textEl, pauseAfter:0}
        ]);
      });
      options.appendChild(row);
    });

    $("#prev").disabled = idx === 0;
    $("#next").textContent = idx === test.questions.length - 1 ? "Fullfør →" : "Neste →";
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function chooseTest(id){
    currentTest = id; idx = 0;
    picker.classList.add("hidden"); finished.classList.add("hidden"); player.classList.remove("hidden");
    render();
  }

  document.querySelectorAll("[data-test]").forEach(b => b.addEventListener("click", () => chooseTest(b.dataset.test)));
  $("#speakAll").addEventListener("click", () => speakSequence(fullSequence(tests[currentTest].questions[idx])));
  $("#stop").addEventListener("click", () => stopSpeech());
  $("#prev").addEventListener("click", () => { if(idx>0){idx--; render();}});
  $("#next").addEventListener("click", () => {
    const n = tests[currentTest].questions.length;
    if(idx < n-1){ idx++; render(); }
    else { stopSpeech(); player.classList.add("hidden"); finished.classList.remove("hidden"); }
  });
  $("#backToPicker").addEventListener("click", () => {
    stopSpeech(); player.classList.add("hidden"); picker.classList.remove("hidden"); currentTest=null;
  });
  $("#restart").addEventListener("click", () => {
    finished.classList.add("hidden"); picker.classList.remove("hidden"); currentTest=null;
  });
  $("#hideText").addEventListener("change", e => panel.classList.toggle("textHidden", e.target.checked));

  document.addEventListener("keydown", (e) => {
    if(player.classList.contains("hidden")) return;
    if(e.key === "ArrowRight") $("#next").click();
    if(e.key === "ArrowLeft") $("#prev").click();
    if(e.key === "Escape") stopSpeech();
  });
})();
