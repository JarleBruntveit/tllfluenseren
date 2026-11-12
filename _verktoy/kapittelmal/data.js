/* =====================================================================
   KAPITTELDATA – Kap {{NR}} {{TITTEL}}
   Alle tekster, oppgaver og tegninger er egenprodusert for TLLfluenseren.
   Faglig grunnlag: læreboka og arbeidsboka i Transport, logistikk og løfteoperasjoner (Vg2),
   kontrollert mot lærerens løsningsforslag. Ingenting er kopiert fra bøkene.
   Oppgavetyper: flash, quiz, tf, fill, match, order, sort, calc, check, hotspot, case, reflect, sim, voks
   Se CLAUDE.md i rotmappen for regler, og kap1/kap5 for fullstendige eksempler.
   Alle «TODO» må erstattes før kapitlet publiseres (kontrollskriptet stopper dem).
   ===================================================================== */
(function(){
const NDLA_E = 'TODO: lenke til NDLA-emnet for kapitlet';

TLL.registrer({
  id: '{{ID}}',
  fag: 'Transport, logistikk og løfteoperasjoner',
  nr: {{NR}},
  tittel: '{{TITTEL}}',
  ingress: 'TODO: Én–to setninger om hva kapitlet handler om, skrevet til eleven.',
  // Ett mål: { kode, tekst }. Flere mål: [{ kode, tekst }, { kode, tekst }]. Ordrett fra læreplanen (Udir).
  kompetansemal: { kode: 'TOL02-01 · KV427', tekst: 'TODO: ordrett kompetansemål fra læreplanen' },
  visKapittelkilder: true,
  filmLenker: [
    // { type: 'Fagfilm · NDLA', tittel: 'TODO', url: 'https://ndla.no/...' }
  ],
  ressurser: {
    presentasjon: '',
    laerebok: 'Læreboka, kapittel {{NR}} (s. TODO)',
    arbeidsbok: 'Arbeidsboka, kapittel {{NR}} (oppgave {{NR}}.1–TODO)',
    ndlaEmne: NDLA_E
  },
  temaer: [
    {
      id: 't1',                 // t1, t2, t3 … i rekkefølge (podkast lyd/episode-1 hører til t1)
      lok: 'A-01',              // «lagerplass»: A-01, A-02, B-01, B-02, C-01 …
      tittel: 'TODO: Tittel på tema 1',
      // podkast: { tittel: 'Egen tittel på episoden' },   // valgfritt
      kort: 'TODO: Én setning om hva temaet handler om.',
      bok: 'Læreboka {{NR}}.1 (s. TODO)',
      mal: [                    // 2–4 læringsmål, elevvennlig: «Etter temaet kan jeg …»
        'TODO: forklare …',
        'TODO: bruke …'
      ],
      punkter: [                // «Kort fortalt» – egne ord, <b>fagbegrep</b> i fet skrift
        'TODO: Første hovedpoeng med <b>fagbegrep</b>.'
      ],
      ndla: [                   // [lenketekst, sti etter /r/…ressurssamling/ eller hel URL, type]
        ['TODO: Lenketekst', 'TODO-sti/abc123', 'Fagstoff']
      ],
      arbeidsbok: 'TODO: {{NR}}.1, {{NR}}.2',
      // ekstra: '<div class="note">Valgfritt HTML-panel under «Kort fortalt»</div>',
      aktiviteter: [
        /* ---- VOKS (60 sekunder) – ingen nivå ---- */
        { type:'voks', id:'t1-voks', tittel:'TODO', tekst:['TODO: kort fortelling, avsnitt 1'], sporsmal:['TODO: refleksjonsspørsmål'], handling:'TODO: én konkret ting eleven kan gjøre denne uka.' },

        /* ---- LÆR ---- */
        { type:'flash', id:'t1-flash', tittel:'Begrepskort: TODO', kort:[
          ['TODO begrep', 'TODO forklaring']
        ]},

        /* ---- ØV – nivaa: 1 Nybegynner, 2 Trygg, 3 Ekspert ---- */
        { type:'quiz', id:'t1-q1', nivaa:1, tittel:'TODO', sp:[
          { q:'TODO spørsmål?', a:['TODO riktig', 'TODO feil', 'TODO feil'], r:0, f:'TODO forklaring' }
        ]},
        { type:'tf', id:'t1-tf', nivaa:1, tittel:'Sant eller usant: TODO', ps:[
          ['TODO påstand', true, 'TODO forklaring']
        ]},
        { type:'match', id:'t1-m1', nivaa:2, tittel:'TODO', instr:'Koble …', par:[
          ['TODO venstre', 'TODO høyre'],
          ['TODO venstre', 'TODO høyre']
        ]},
        { type:'sort', id:'t1-s1', nivaa:2, tittel:'TODO', instr:'Sorter …', kat:['TODO kategori 0', 'TODO kategori 1'], items:[
          ['TODO element', 0, 'TODO forklaring'],
          ['TODO element', 1, 'TODO forklaring']
        ]},
        { type:'order', id:'t1-o1', nivaa:2, tittel:'TODO', instr:'Sett i riktig rekkefølge.', steg:[
          'TODO steg 1', 'TODO steg 2', 'TODO steg 3'
        ], f:'TODO forklaring'},
        { type:'fill', id:'t1-fill', nivaa:2, tittel:'Fyll inn: TODO', tekst:'TODO tekst med [[svarord]] i doble klammer.', ekstra:['TODO feilord'], f:'TODO forklaring' },
        // { type:'calc', id:'t1-c1', nivaa:2, gen:'NAVN', tittel:'…', antall:5 },  // generatoren må finnes i felles/motor.js (GEN)
        // { type:'hotspot', … svg med data-z="sone" … }                            // se kap1/kap5

        /* ---- TENK ---- */
        { type:'case', id:'t1-case', nivaa:3, tittel:'Case: TODO', intro:'TODO: situasjon fra arbeidslivet.', steg:[
          { q:'TODO Hva gjør du?', valg:[
            { t:'TODO riktig valg', ok:true,  f:'TODO hvorfor' },
            { t:'TODO feil valg',   ok:false, f:'TODO hvorfor ikke' }
          ]}
        ]},
        { type:'reflect', id:'t1-r1', nivaa:3, tittel:'Forklar: TODO', q:'TODO skriveoppgave', punkter:[
          'TODO sjekkpunkt 1', 'TODO sjekkpunkt 2'
        ]}
      ]
    }
    /* Neste tema: kopier blokken over, bruk id 't2', lok 'A-02', og aktivitets-id-er som starter med 't2-'.
       Oppgavebank-tema (valgfritt, som kap 5): legg til  oppgavebank: true  – da kreves ikke alle faser/nivåer. */
  ]
});
})();
