const vendor = '/assets/vendor/jspdf/';
const dateFormat = new Intl.DateTimeFormat('nb-NO', { dateStyle: 'medium', timeZone: 'Europe/Oslo' });
const dato = value => value ? dateFormat.format(new Date(value)) : '–';
const nivaa = ['Alle nivåer', 'Nybegynner', 'Trygg', 'Ekspert'];
let pdfStotte;

function hentPdfStotte() {
  pdfStotte ??= Promise.all([
    import(vendor + 'jspdf.umd.min.js'),
    fetch(vendor + 'OpenSans-Regular.ttf').then(async response => {
      if (!response.ok) throw new Error('Skrifttypen kunne ikke lastes.');
      const bytes = new Uint8Array(await response.arrayBuffer());
      return Array.from(bytes, byte => String.fromCharCode(byte)).join('');
    })
  ]).then(([, font]) => ({ jsPDF: window.jspdf.jsPDF, font })).catch(error => {
    pdfStotte = undefined;
    throw error;
  });
  return pdfStotte;
}

export async function lagRapportPdf(rapport, TLL) {
  const kapittelIder = (TLL.KAPITLER || []).filter(k => rapport.kapitler[k.id]).map(k => k.id);
  const [{ jsPDF, font }] = await Promise.all([
    hentPdfStotte(),
    TLL.lastKapitler('/transport-logistikk-lofteoperasjoner/', kapittelIder)
  ]);
  const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true, putOnlyUsedFonts: true });
  doc.addFileToVFS('OpenSans-Regular.ttf', font);
  doc.addFont('OpenSans-Regular.ttf', 'OpenSans', 'normal');
  doc.setFont('OpenSans');
  doc.setDocumentProperties({
    title: 'Fremdriftsrapport',
    creator: 'TLLfluenseren.no',
    keywords: TLL.rapportKode(rapport)
  });

  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const width = pageWidth - 2 * margin;
  let y;
  function startSide() {
    doc.setFillColor('#F3B84C');
    doc.rect(margin, 39, 28, 4, 'F');
    doc.setFontSize(9);
    doc.setTextColor('#405160');
    doc.text('TLLFLUENSEREN.NO', margin + 37, 44);
    y = 72;
  }
  function skriv(tekst, { size = 11, gap = 4, hold = 0, color = '#18232F' } = {}) {
    doc.setFontSize(size);
    doc.setTextColor(color);
    const lineHeight = size * 1.38;
    const linjer = doc.splitTextToSize(String(tekst).normalize('NFC'), width);
    if (y + hold + lineHeight * Math.min(linjer.length, 2) > pageHeight - 64) {
      doc.addPage();
      startSide();
      doc.setFontSize(size);
      doc.setTextColor(color);
    }
    for (const linje of linjer) {
      if (y + lineHeight > pageHeight - 64) {
        doc.addPage();
        startSide();
        doc.setFontSize(size);
        doc.setTextColor(color);
      }
      doc.text(linje, margin, y + size);
      y += lineHeight;
    }
    y += gap;
  }

  startSide();
  skriv('Fremdriftsrapport', { size: 27, gap: 9 });
  skriv('Elev: ' + rapport.navn);
  skriv('Klasse: ' + (rapport.klasse || 'Ikke oppgitt'));
  skriv('Laget: ' + dato(rapport.laget), { gap: 15 });

  const kapitler = Object.entries(rapport.kapitler);
  if (!kapitler.length && !rapport.prover.length) skriv('Ingen aktiviteter eller prøver er registrert ennå.');
  for (const [id, data] of kapitler) {
    const kapittel = TLL.kapitler[id];
    const navn = kapittel ? 'Kapittel ' + kapittel.nr + ' · ' + kapittel.tittel : id;
    const temaer = kapittel?.temaer || [];
    const aktiviteter = new Map(temaer.flatMap(tema =>
      tema.aktiviteter.map(a => [a.id, tema.lok + ' · ' + a.tittel])
    ));
    const resultater = Object.entries(data.resultater);
    const rester = temaer.map(tema => ({
      tema,
      aktiviteter: tema.aktiviteter.filter(a => !Object.hasOwn(data.resultater, a.id))
    })).filter(gruppe => gruppe.aktiviteter.length);
    const antallSomGjenstar = rester.reduce((sum, gruppe) => sum + gruppe.aktiviteter.length, 0);
    skriv(navn, { size: 16, hold: 28 });
    const antall = resultater.length;
    skriv(`${nivaa[data.niva] || nivaa[0]} · ${antall} ${antall === 1 ? 'aktivitet' : 'aktiviteter'} registrert`, { color: '#405160', gap: 9 });
    for (const [aktivitet, resultat] of resultater) {
      skriv(aktiviteter.get(aktivitet) || aktivitet, { hold: 17, gap: 1 });
      skriv(`Beste ${resultat.best} % · Sist ${resultat.sist} % · ${resultat.n} forsøk · ${dato(resultat.siste)}`, { size: 10, color: '#405160', gap: 7 });
    }
    const tekster = Object.entries(data.tekster);
    if (tekster.length) skriv('Innleverte svar', { size: 14, hold: 30 });
    for (const [aktivitet, svar] of tekster) {
      skriv(aktiviteter.get(aktivitet) || aktivitet, { hold: 17, gap: 1 });
      skriv(svar, { gap: 10 });
    }
    if (kapittel) {
      const paabegynt = new Set([...(data.paabegynt || []), ...Object.keys(data.tekster)]);
      if (antallSomGjenstar) {
        skriv(`Gjenstår · ${antallSomGjenstar} ${antallSomGjenstar === 1 ? 'aktivitet' : 'aktiviteter'}`, { size: 14, hold: 44 });
        skriv('Alle nivåer. Status bygger på registrerte resultater og svar i denne nettleseren.', { size: 10, color: '#405160', gap: 9 });
        for (const gruppe of rester) {
          skriv(gruppe.tema.lok + ' · ' + gruppe.tema.tittel, { size: 12, hold: 30 });
          for (const aktivitet of gruppe.aktiviteter) {
            const status = paabegynt.has(aktivitet.id) ? 'Påbegynt' : 'Ikke påbegynt';
            skriv(`${aktivitet.tittel} · ${nivaa[aktivitet.nivaa || 0]} · ${status}`, { size: 10, gap: 2 });
          }
          y += 6;
        }
      } else {
        skriv('Ingen aktiviteter gjenstår i dette kapittelet.', { size: 11 });
      }
    }
    y += 9;
  }
  if (rapport.prover.length) skriv('Prøver', { size: 16, hold: 28 });
  for (const prove of rapport.prover) {
    skriv(prove.navn || 'Kapittelprøve', { hold: 17, gap: 1 });
    skriv(`${dato(prove.dato)} · ${nivaa[prove.niva || 0]} · ${prove.riktige} av ${prove.antall} riktige (${prove.pct} %)`, { size: 10, color: '#405160', gap: 7 });
  }
  const antallSider = doc.getNumberOfPages();
  for (let side = 1; side <= antallSider; side++) {
    doc.setPage(side);
    doc.setFontSize(9);
    doc.setTextColor('#405160');
    doc.setDrawColor('#D6DFE5');
    doc.line(margin, pageHeight - 48, pageWidth - margin, pageHeight - 48);
    doc.text('Fremdriftsrapport', margin, pageHeight - 33);
    doc.text(`Side ${side} av ${antallSider}`, pageWidth - margin, pageHeight - 33, { align: 'right' });
  }
  return doc.output('blob');
}
