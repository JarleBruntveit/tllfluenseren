/*
 * TLLfluenseren – avtalemaler (Fadderavtale og Avtale om YFF-plass)
 * Bygger Word-filer (.docx) i nettleseren med docx-biblioteket.
 * Brukes av /dokumenter/. Samme kode kan kjøres i Node for testing.
 *
 *   TLLAvtaler.fadder(docx, logoBytes, verdier)  -> docx.Document
 *   TLLAvtaler.yff(docx, logoBytes, verdier)     -> docx.Document
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TLLAvtaler = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const TEAL = '1A8FA6';
  const TEAL_LIGHT = 'E6F4F7';
  const GREY = '5F6B70';
  const LINE = 'BFD9E0';
  const FONT = 'Calibri';
  const W = 9638; // A4 med 2 cm marger (DXA)

  const clean = (s) => (s == null ? '' : String(s).trim());

  function kit(D, logo, opt = {}) {
    const pAfter = opt.pAfter ?? 100, listLine = opt.listLine ?? 264;
    const {
      Paragraph, TextRun, Table, TableRow, TableCell, ImageRun, WidthType, ShadingType,
      BorderStyle, AlignmentType, VerticalAlign, Footer, PageNumber, TabStopType, TableLayoutType,
    } = D;

    const t = (text, o = {}) => new TextRun({ text, font: FONT, size: 20, ...o });
    const p = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], spacing: { after: pAfter, line: 276 }, ...o });
    const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
    const noBorders = { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };
    const noCell = { top: none, bottom: none, left: none, right: none };
    const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
    const underLine = { style: BorderStyle.SINGLE, size: 6, color: '9AA5A9' };
    const under = { top: none, left: none, right: none, bottom: underLine };
    const bullet = (children, after = 40) => new Paragraph({ numbering: { reference: 'dots', level: 0 }, spacing: { after, line: listLine }, children });
    const empty = (after = 0) => new Paragraph({ spacing: { after }, children: [] });
    const gap = (w) => new TableCell({ width: { size: w, type: WidthType.DXA }, borders: noCell, children: [new Paragraph('')] });

    function sectionHeading(num, text) {
      return new Paragraph({
        spacing: { before: 200, after: 100 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: TEAL, space: 4 } },
        children: [
          t(num ? num + '  ' : '', { bold: true, color: TEAL, size: 24 }),
          t(text.toUpperCase(), { bold: true, color: TEAL, size: 22, characterSpacing: 20 }),
        ],
      });
    }

    function titleBlock(kicker, title, sub) {
      const L = 7400, R = W - L;
      return new Table({
        width: { size: W, type: WidthType.DXA }, columnWidths: [L, R], layout: TableLayoutType.FIXED,
        borders: { ...noBorders, bottom: { style: BorderStyle.SINGLE, size: 18, color: TEAL } },
        rows: [new TableRow({ children: [
          new TableCell({ width: { size: L, type: WidthType.DXA }, verticalAlign: VerticalAlign.BOTTOM, margins: { bottom: 140, left: 0 }, children: [
            p(t(kicker, { size: 17, color: TEAL, bold: true, allCaps: true, characterSpacing: 30 }), { spacing: { after: 40 } }),
            p(t(title, { size: 52, bold: true, color: '17363D' }), { spacing: { after: 20 } }),
            p(t(sub, { size: 21, color: GREY }), { spacing: { after: 0 } }),
          ] }),
          new TableCell({ width: { size: R, type: WidthType.DXA }, verticalAlign: VerticalAlign.BOTTOM, margins: { bottom: 140, right: 0 }, children: [
            new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { after: 0 }, children: logo ? [
              new ImageRun({ type: 'jpg', data: logo, transformation: { width: 105, height: 90 }, altText: { title: 'Logo', description: 'Haugaland videregående skole', name: 'logo' } }),
            ] : [] }),
          ] }),
        ] })],
      });
    }

    function infoBox(children, fill = 'F3F8F9', margins = { top: 100, bottom: 60, left: 240, right: 200 }) {
      return new Table({
        width: { size: W, type: WidthType.DXA }, columnWidths: [W],
        borders: { top: none, bottom: none, right: none, left: { style: BorderStyle.SINGLE, size: 24, color: TEAL }, insideHorizontal: none, insideVertical: none },
        rows: [new TableRow({ children: [new TableCell({
          width: { size: W, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill, color: 'auto' }, margins, children,
        })] })],
      });
    }

    function labelTable(rows, C1 = 2600, labelSize = 19) {
      const C2 = W - C1;
      return new Table({
        width: { size: W, type: WidthType.DXA }, columnWidths: [C1, C2], layout: TableLayoutType.FIXED,
        borders: { top: thin, bottom: thin, left: none, right: none, insideHorizontal: thin, insideVertical: none },
        rows: rows.map(([label, items]) => new TableRow({ cantSplit: true, children: [
          new TableCell({ width: { size: C1, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: TEAL_LIGHT, color: 'auto' },
            margins: { top: 70, bottom: 70, left: 140, right: 140 },
            children: [p(t(label, { bold: true, color: '134F5C', size: labelSize }), { spacing: { after: 0 } })] }),
          new TableCell({ width: { size: C2, type: WidthType.DXA }, margins: { top: 70, bottom: 40, left: 160, right: 120 },
            children: items.map((i) => bullet(Array.isArray(i) ? i : [t(i, { size: 18 })], 20)) }),
        ] })),
      });
    }

    function field(label, value, width) {
      const v = clean(value);
      return new TableCell({
        width: { size: width, type: WidthType.DXA }, borders: under, margins: { top: 60, bottom: 40, left: 80, right: 80 },
        children: [
          new Paragraph({ spacing: { after: 20 }, children: [t(label, { size: 15, color: GREY, allCaps: true, characterSpacing: 10 })] }),
          new Paragraph({ spacing: { after: 0 }, children: [t(v || ' ', { size: 22, bold: !!v })] }),
        ],
      });
    }

    function fieldGrid(rows) {
      const G = 240, cols = [];
      rows[0].forEach((c, i) => { if (i) cols.push(G); cols.push(c[2]); });
      return new Table({
        width: { size: W, type: WidthType.DXA }, columnWidths: cols, layout: TableLayoutType.FIXED, borders: noBorders,
        rows: rows.map((r) => new TableRow({ children: r.flatMap((c, i) => (i ? [gap(G), field(...c)] : [field(...c)])) })),
      });
    }

    function footer(text) {
      return new Footer({ children: [new Paragraph({
        tabStops: [{ type: TabStopType.RIGHT, position: W }],
        children: [
          t(text, { size: 15, color: GREY }),
          t('\tSide ', { size: 15, color: GREY }),
          new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 15, color: GREY }),
          t(' av ', { size: 15, color: GREY }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 15, color: GREY }),
        ] })] });
    }

    function doc(title, footerText, children) {
      return new D.Document({
        creator: 'Haugaland videregående skole',
        title,
        styles: { default: { document: { run: { font: FONT, size: 20 } } } },
        numbering: { config: [{ reference: 'dots', levels: [{ level: 0, format: 'bullet', text: '•', alignment: AlignmentType.LEFT,
          style: { run: { color: TEAL }, paragraph: { indent: { left: 260, hanging: 200 } } } }] }] },
        sections: [{
          properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 850, bottom: 850, left: 1134, right: 1134, footer: 500 } } },
          footers: { default: footer(footerText) },
          children,
        }],
      });
    }

    return { t, p, none, noBorders, noCell, thin, under, bullet, empty, gap, sectionHeading, titleBlock, infoBox, labelTable, field, fieldGrid, doc };
  }

  /* ------------------------------------------------------------------ */
  /* Fadderavtale – modul 4.2 truck                                       */
  /* ------------------------------------------------------------------ */
  function fadder(D, logo, v = {}) {
    const k = kit(D, logo, { pAfter: 80, listLine: 252 });
    const { t, p, none, noBorders, noCell, thin, under, bullet, empty, sectionHeading, titleBlock, infoBox, labelTable, fieldGrid } = k;
    const { Paragraph, Table, TableRow, TableCell, WidthType, BorderStyle, PageBreak, TableLayoutType, VerticalAlign } = D;
    const half = (W - 240) / 2;
    const third = (W - 480) / 3;

    const krav = [
      ['Forutsetninger for kjøreopplæring i bedrift', [
        'Opplæringen skal skje på grunnlag av utstyrets bruksanvisning og opplæringsplanens modul 4 for aktuelt arbeidsutstyr (truck: modul 4.2).',
        'Opplæringen skal være risikovurdert og beskrevet i bedriftens HMS-system.',
        'Fadderbedriften velger en skikket fadder, som ser til at opplæringen gjennomføres sikkert og i tråd med virksomhetens retningslinjer.',
        'Oppdager fadderen alvorlige farer, skal opplæringen avbrytes inntil sikkerheten igjen er ivaretatt.',
        'Fadderen er ansvarlig for at opplæringsboka blir ført og attestert.',
      ]],
      ['Krav til fadder', [
        'Kompetansebevis for aktuelt arbeidsutstyr.',
        'Minst ett års dokumentert praksis i bruk av utstyret.',
        'Kan vise og forklare riktig og sikker bruk av arbeidsutstyret.',
        'Kjenner de relevante delene av bedriftens HMS-/internkontrollsystem.',
        'Kjenner innholdet i denne avtalen.',
      ]],
      ['Opplæringens varighet', [
        'Timeantall følger opplæringsplanens modul 4 for aktuelt arbeidsutstyr.',
        'Vurderer fadderen, i samråd med sertifisert virksomhet, at kandidaten har nådd alle læremålene før oppgitt timeantall, kan kandidaten ta avsluttende praktisk prøve.',
        'Kjøreopplæringen skal være gjennomført innen ett år fra avtalen er inngått.',
      ]],
      ['Fadderens tilstedeværelse', [
        'Fadderen er ansvarlig for kandidatens kjøring og må være til stede i tilstrekkelig grad til å kunne følge med.',
        'Ved en uønsket hendelse skal fadderen kunne gripe inn direkte, eller veilede via kommunikasjonsutstyr.',
      ]],
      ['Arbeidsutstyr', [
        'Utstyret skal være relevant for læremålene i opplæringsplanen.',
        'Utstyret skal være tilfredsstillende vedlikeholdt og kontrollert av sertifisert sakkyndig virksomhet.',
      ]],
      ['Område for kjøreopplæring', [
        'Opplæringen skal foregå på et egnet område der kandidaten kan kjøre sikkert, realistisk og hensiktsmessig.',
      ]],
      ['Annen aktivitet på området', [
        'Annet personell på øvingsområdet skal gjøres kjent med at kjøreopplæring pågår.',
        'Kjøreopplæringen skal tilpasses annen aktivitet på en sikker måte.',
      ]],
      ['Vanskelighetsgrad', [
        'Fadderen, i samråd med sertifisert virksomhet, sørger for at kandidaten får oppgaver tilpasset sitt ferdighetsnivå – ikke for vanskelige.',
      ]],
      ['Avsluttende praktisk prøve', [
        'Sertifisert opplæringsvirksomhet avholder avsluttende praktisk prøve innen avtalt frist og etter fastsatte retningslinjer for prøveavleggelse.',
      ]],
    ];

    // Type arbeidsutstyr – avkrysning
    const utstyr = Array.isArray(v.utstyr) ? v.utstyr : [];
    const box = (key, label) => t((utstyr.includes(key) ? '☒' : '☐') + ' ' + label, { size: 22, bold: utstyr.includes(key) });
    const modul = clean(v.modul);
    const equipment = new Paragraph({
      spacing: { before: 60, after: 60 },
      children: [
        t('Type arbeidsutstyr:   ', { bold: true }),
        box('truck', 'Truck'), t('      '),
        box('kran', 'Kran'), t('      '),
        box('masse', 'Masseforflytningsmaskin'),
        t('          Opplæringsplan:  ', { bold: true }),
        modul ? t('Modul 4.' + modul, { size: 22, bold: true }) : t('Modul 4.____', { size: 22 }),
      ],
    });

    // Underskrifter
    const S1 = 3400, S2 = 3638, SG = 200, S3 = 2400;
    const sigLine = { top: none, left: none, right: none, bottom: { style: BorderStyle.SINGLE, size: 6, color: '9AA5A9' } };
    const stedDato = [clean(v.sted), clean(v.dato)].filter(Boolean).join(', ');
    const small = (s) => p(t(s, { size: 15, color: '5F6B70', allCaps: true }), { spacing: { after: 0 } });
    function sigRow(role) {
      return new TableRow({
        height: { value: 600, rule: 'atLeast' }, cantSplit: true,
        children: [
          new TableCell({ width: { size: S1, type: WidthType.DXA }, verticalAlign: VerticalAlign.BOTTOM, borders: noCell, margins: { left: 0, right: 120, bottom: 40 },
            children: [p(t(role, { bold: true, size: 19 }), { spacing: { after: 0 } })] }),
          new TableCell({ width: { size: S2, type: WidthType.DXA }, borders: sigLine, margins: { left: 80, right: 80 }, children: [new Paragraph('')] }),
          new TableCell({ width: { size: SG, type: WidthType.DXA }, borders: noCell, children: [new Paragraph('')] }),
          new TableCell({ width: { size: S3, type: WidthType.DXA }, verticalAlign: VerticalAlign.BOTTOM, borders: sigLine, margins: { left: 80, right: 80, bottom: 30 },
            children: [p(t(stedDato || '', { size: 19 }), { spacing: { after: 0 } })] }),
        ],
      });
    }
    const sigTable = new Table({
      width: { size: W, type: WidthType.DXA }, columnWidths: [S1, S2, SG, S3], layout: TableLayoutType.FIXED, borders: noBorders,
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: S1, type: WidthType.DXA }, borders: noCell, children: [small('Rolle')] }),
          new TableCell({ width: { size: S2, type: WidthType.DXA }, borders: noCell, margins: { left: 80 }, children: [small('Underskrift')] }),
          new TableCell({ width: { size: SG, type: WidthType.DXA }, borders: noCell, children: [new Paragraph('')] }),
          new TableCell({ width: { size: S3, type: WidthType.DXA }, borders: noCell, margins: { left: 80 }, children: [small('Sted og dato')] }),
        ] }),
        sigRow('Kandidat'),
        sigRow('Opplæringsvirksomhet (faglig leder)'),
        sigRow('Opplæringsbedrift (ansvarlig person)'),
        sigRow('Opplæringsbedrift (fadder)'),
        sigRow('Opplæringsbedrift (verneombud)'),
      ],
    });

    const partyBlock = (title, rows) => [
      new Paragraph({ spacing: { before: 120, after: 20 }, children: [t(title, { bold: true, color: TEAL, size: 21 })] }),
      fieldGrid(rows),
    ];

    const skole = clean(v.skole) || 'Haugaland videregående skole';
    const skoleAdresse = clean(v.skoleAdresse) || 'Spannavegen 38, Haugesund';

    const children = [
      titleBlock('Bedriftsopplæring med fadder · Modul 4.2 Truck', 'Fadderavtale', 'Avtale om praktisk kjøreopplæring i bedrift'),
      empty(60),
      infoBox([
        p([t('Hva er dette? ', { bold: true, color: TEAL }),
          t('Avtalen gir eleven anledning til å kjøre truck i en bedrift som en del av opplæringen, under oppfølging av en godkjent fadder. Avtalen skal være signert av alle parter før kjøreopplæringen i bedriften starter.')], { spacing: { after: 100 } }),
        p([t('Ansvarsfordeling', { bold: true, color: TEAL })], { spacing: { after: 40 } }),
        bullet([t('Fadderbedriften ', { bold: true }), t('velger en skikket fadder og sikrer at opplæring og kjøring skjer faglig forsvarlig og trygt – for kandidaten, fadderen og alle i arbeidsområdet.')]),
        bullet([t('Sertifisert virksomhet (skolen) ', { bold: true }), t('inngår skriftlig avtale med fadderbedriften, kontrollerer at forutsetningene er på plass, og gjennomfører avsluttende praktisk prøve.')]),
      ]),
      sectionHeading('1', 'Krav til gjennomføring'),
      labelTable(krav, 2900, 20),

      new Paragraph({ children: [new PageBreak()] }),

      titleBlock('Del 2 · Utfylles og signeres', 'Avtale', 'Praktisk opplæring mellom bedrift og sertifisert opplæringsvirksomhet'),
      empty(60),
      p(t('Opplæring i henhold til gjeldende opplæringsplan for modul 4 (kran, truck og masseforflytningsmaskiner).', { color: GREY, size: 19, italics: true })),

      sectionHeading('2', 'Opplæringen'),
      equipment,

      sectionHeading('3', 'Parter'),
      ...partyBlock('Kandidat', [[['Navn', v.kandidat, W * 0.65 - 120], ['Fødselsdato', v.fodt, W * 0.35 - 120]]]),
      ...partyBlock('Opplæringsvirksomhet', [
        [['Navn', skole, half], ['Adresse', skoleAdresse, half]],
        [['Faglig leder', v.faglig, half], ['Sertifikatnr.', v.sertifikat, half]],
      ]),
      ...partyBlock('Opplæringsbedrift', [
        [['Bedriftens navn', v.bedrift, half], ['Org.nr.', v.orgnr, half]],
        [['Adresse', v.adresse, half], ['Ansvarlig person', v.ansvarlig, half]],
        [['Godkjent fadder', v.fadder, half], ['Verneombud', v.verneombud, half]],
      ]),

      sectionHeading('4', 'Periode og forsikring'),
      fieldGrid([[['Fra dato', v.fra, third], ['Til dato', v.til, third], ['Forsikring', 'Dekkes av opplæringsbedrift', third]]]),
      new Paragraph({ spacing: { before: 160, after: 0 }, children: [
        t('Kjøreopplæringen gjennomføres i henhold til ', { size: 18, color: GREY }),
        t('norm for praktisk kjøreopplæring – bedriftsopplæring med fadder, modul 4', { size: 18, color: GREY, italics: true }),
        t(', fastsatt av Arbeidstilsynet. Normen vedlegges avtalen.', { size: 18, color: GREY }),
      ] }),

      sectionHeading('5', 'Underskrifter'),
      sigTable,
    ];

    return k.doc('Fadderavtale – Modul 4.2 Truck', skole + '  ·  Fadderavtale modul 4.2 Truck', children);
  }

  /* ------------------------------------------------------------------ */
  /* Avtale om YFF-plass                                                  */
  /* ------------------------------------------------------------------ */
  function yff(D, logo, v = {}) {
    const k = kit(D, logo);
    const { t, p, none, noBorders, noCell, bullet, empty, gap, sectionHeading, titleBlock, infoBox, labelTable, fieldGrid } = k;
    const { Paragraph, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, PageBreak, TableLayoutType, VerticalAlign } = D;
    const half = (W - 240) / 2;

    const skoleaar = clean(v.skoleaar) || '2026–2027';
    const forsteAar = (skoleaar.match(/\d{4}/) || ['20__'])[0];
    const faglaerer = clean(v.faglaerer) || 'Jarle Bruntveit';
    const faglaererTlf = clean(v.faglaererTlf) || '916 37 356';
    const avdelingsleder = clean(v.avdelingsleder) || 'Espen Helgeland';
    const sted = clean(v.sted) || 'Haugesund';
    const dato = clean(v.dato);
    const representant = clean(v.representant);

    function factStrip(items) {
      const G = 160, cw = (W - G * (items.length - 1)) / items.length;
      const cols = []; items.forEach((_, i) => { if (i) cols.push(G); cols.push(cw); });
      return new Table({
        width: { size: W, type: WidthType.DXA }, columnWidths: cols, layout: TableLayoutType.FIXED, borders: noBorders,
        rows: [new TableRow({ children: items.flatMap(([key, val], i) => {
          const c = new TableCell({ width: { size: cw, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: TEAL_LIGHT, color: 'auto' },
            borders: { top: { style: BorderStyle.SINGLE, size: 12, color: TEAL }, bottom: none, left: none, right: none },
            margins: { top: 90, bottom: 90, left: 140, right: 100 },
            children: [
              p(t(key, { size: 15, color: GREY, allCaps: true, characterSpacing: 10 }), { spacing: { after: 20 } }),
              p(t(val, { size: 21, bold: true, color: '134F5C' }), { spacing: { after: 0 } }),
            ] });
          return i ? [gap(G), c] : [c];
        }) })],
      });
    }

    const page1 = [
      titleBlock('VG2 Transport og logistikk · Skoleåret ' + skoleaar, 'Yrkesfaglig fordypning', 'Informasjon til bedrifter om utplassering av elever (YFF)'),
      empty(80),
      p([t('YFF er et fag i Kunnskapsløftet. På Vg2 har elevene '), t('9 uketimer', { bold: true }),
        t(' i faget – tilsvarende én hel arbeidsdag i uken. Det betyr at elevene våre kan være utplassert i bedrift én dag i uken, og for å få det til er vi avhengige av velvillige og interesserte bedrifter.')]),
      infoBox([
        p([t('Formålet med faget ', { bold: true, color: TEAL })], { spacing: { after: 40 } }),
        p(t('Yrkesfaglig fordypning skal gi elevene mulighet til å få erfaring med innhold, oppgaver og arbeidsmåter som karakteriserer de ulike yrkene innen utdanningsprogrammene, fordype seg i kompetansemål fra læreplanene på Vg3-nivå og ta relevante fellesfag fra Vg3, fellesfag i fremmedspråk og programfag fra studieforberedende utdanningsprogrammer.', { italics: true, size: 19 }), { spacing: { after: 40 } }),
      ]),
      empty(120),
      factStrip([['Utplasseringsdag', 'Hver tirsdag'], ['Omfang', '1 dag per uke'], ['Lønn', 'Ingen lønn'], ['Avslutning', 'Tirsdag før siste skoledag']]),
      sectionHeading('', 'Slik fungerer det'),
      labelTable([
        ['Oppstart', ['Elevene kontakter selv bedrifter for å få plass.', 'Eleven starter så snart som mulig etter at elev og bedrift er enige.']],
        ['Arbeidstid', ['Eleven følger i den grad det er mulig bedriftens arbeidstider.', 'Noen få uker kan utplasseringen være oftere enn én dag.']],
        ['Utstyr', ['Eleven har selv med vernesko og nødvendig arbeidstøy.']],
        ['Forsikring', ['Eleven får ikke lønn. Bedriften må lese vedlagt skriv om forsikring av elever nøye.']],
        ['Dokumentasjon', ['Eleven fører logg over egen læring og får kvittering for oppmøte fra bedriften.']],
        ['Oppfølging', ['En lærer fra Haugaland vgs. er kontaktperson og besøker eleven i bedriften flere ganger i semesteret.']],
        ['Krav til eleven', ['Skolen stiller krav til oppmøte, punktlighet og gode holdninger. Oppfyller ikke eleven kravene, tas eleven tilbake til skolen.']],
      ]),
      new Paragraph({ spacing: { before: 160, after: 100, line: 276 }, children: [
        t('Vi håper på et godt samarbeid med næringen, og at utplasseringen gjør overgangen fra skole til læretid best mulig. Med riktig «match» kan det forhåpentligvis føre til lærekontrakt.')] }),
      new Table({
        width: { size: W, type: WidthType.DXA }, columnWidths: [half, 240, half], layout: TableLayoutType.FIXED, borders: noBorders,
        rows: [new TableRow({ children: [
          new TableCell({ width: { size: half, type: WidthType.DXA }, shading: { type: ShadingType.CLEAR, fill: 'F3F8F9', color: 'auto' },
            borders: { left: { style: BorderStyle.SINGLE, size: 24, color: TEAL }, top: none, bottom: none, right: none },
            margins: { top: 100, bottom: 100, left: 200, right: 120 }, children: [
              p(t('Spørsmål? Kontakt faglærer', { size: 15, color: GREY, allCaps: true, characterSpacing: 10 }), { spacing: { after: 20 } }),
              p(t(faglaerer, { bold: true, size: 22, color: '134F5C' }), { spacing: { after: 0 } }),
              p(t('Transport og logistikk · tlf. ' + faglaererTlf, { size: 19 }), { spacing: { after: 0 } }),
            ] }),
          gap(240),
          new TableCell({ width: { size: half, type: WidthType.DXA }, verticalAlign: VerticalAlign.CENTER, borders: noCell, margins: { left: 120 }, children: [
            p(t('Med vennlig hilsen', { size: 19 }), { spacing: { after: 20 } }),
            p(t(avdelingsleder + ' (sign.)', { bold: true, size: 20 }), { spacing: { after: 0 } }),
            p(t('Avdelingsleder TIF Vg2, Haugaland videregående skole', { size: 18, color: GREY }), { spacing: { after: 0 } }),
          ] }),
        ] })],
      }),
    ];

    const SC = (W - 240) / 2;
    const sigCell = (role, subRuns) => new TableCell({ width: { size: SC, type: WidthType.DXA },
      borders: { top: { style: BorderStyle.SINGLE, size: 6, color: '9AA5A9' }, bottom: none, left: none, right: none },
      margins: { top: 60, left: 0 }, children: [p(t(role, { bold: true, size: 19 }), { spacing: { after: 0 } }), p(subRuns, { spacing: { after: 0 } })] });
    const blank = () => new TableCell({ width: { size: SC, type: WidthType.DXA }, borders: noCell, children: [new Paragraph('')] });

    const page2 = [
      new Paragraph({ children: [new PageBreak()] }),
      titleBlock('Intensjonsavtale · Utfylles og signeres', 'Avtale om YFF-plass', 'Mellom bedrift og Haugaland videregående skole'),
      empty(60),
      p(t('Elever på Vg2 Transport og logistikk skal i løpet av skoleåret gjennomføre yrkesfaglig fordypning med i gjennomsnitt 9 undervisningstimer per uke. I den forbindelse inngås følgende intensjonsavtale.', { size: 19, color: GREY })),
      sectionHeading('1', 'Parter'),
      fieldGrid([
        [['Bedrift (heretter kalt bedriften)', v.bedrift, half], ['Elevens navn', v.elev, half]],
        [['Kontaktperson i bedriften', v.kontakt, half], ['Telefon', v.telefon, half]],
        [['E-post', v.epost, half], ['Skole', 'Haugaland videregående skole', half]],
      ]),
      sectionHeading('2', 'Avtalevilkår'),
      labelTable([
        ['Fag og omfang', [
          'Eleven utplasseres i transport-, logistikk- eller løfteoperasjonsfaget.',
          'Bedriften tar imot én elev til YFF, i gjennomsnitt én full arbeidsdag per uke gjennom hele skoleåret.',
          'Utplasseringsdag er hver tirsdag fra skolestart til skoleslutt, unntatt fridager/ferier i skoleruta.',
        ]],
        ['Opplæring', [
          'Vedlagt læreplan i YFF danner grunnlaget for opplæringen. Det viktigste er likevel at eleven opplever bedriften i den daglige driften og lærer mest mulig om bransjen og faget.',
        ]],
        ['Utstyr og forsikring', [
          'Eleven holder selv vernesko og arbeidstøy.',
          'Se vedlagt skriv om forsikring (saksnr. 2022/20991 av 11.03.2002, dok. nr. 1).',
        ]],
        ['Oppmøte og fravær', [
          'Eleven har møteplikt. Vi ser gjerne at eventuelt fravær noteres.',
          'Møter eleven ikke og har ikke varslet bedriften, skal bedriften varsle faglærer.',
        ]],
        ['Varighet og avslutning', [
          'Avtalen løper gjennom hele skoleåret, eller til en av partene sier den opp.',
          'Fungerer ikke forholdet mellom elev og bedrift, flytter skolen eleven – uten forpliktelser for bedriften.',
          'Avtalen utstedes i to eksemplarer: ett til bedriften og ett til Haugaland vgs.',
        ]],
      ]),
      empty(100),
      infoBox([
        p([t('Viktig om truck og kran  ', { bold: true, color: 'A33A1F' })], { spacing: { after: 30 } }),
        bullet([t('Eleven har ikke lov til å bruke noen form for truck eller kran i YFF-tiden.', { bold: true, size: 19 })], 20),
        bullet([t('Fadderavtale for truck (T1, T2 og/eller T4) kan avtales med skolen.', { size: 19 })], 20),
      ], 'FBEFEA'),
      sectionHeading('3', 'Underskrifter'),
      p([t('Sted og dato:  ', { bold: true }), dato ? t(sted + ', ' + dato, { bold: true }) : t(sted + ', ____ / ____ ' + forsteAar)], { spacing: { before: 80, after: 200 } }),
      new Table({
        width: { size: W, type: WidthType.DXA }, columnWidths: [SC, 240, SC], layout: TableLayoutType.FIXED, borders: noBorders,
        rows: [
          new TableRow({ height: { value: 700, rule: 'atLeast' }, children: [blank(), gap(240), blank()] }),
          new TableRow({ children: [
            sigCell(faglaerer, [t('Faglærer Transport og logistikk, Haugaland vgs.', { size: 17, color: GREY })]),
            gap(240),
            sigCell('Bedriftens representant', representant
              ? [t(representant, { size: 19 })]
              : [t('Navn med blokkbokstaver: ______________________', { size: 17, color: GREY })]),
          ] }),
        ],
      }),
    ];

    return k.doc('Avtale om YFF-plass ' + skoleaar,
      'Haugaland videregående skole  ·  Avtale om YFF-plass  ·  Vg2 Transport og logistikk ' + skoleaar,
      [...page1, ...page2]);
  }

  return { fadder, yff };
});
