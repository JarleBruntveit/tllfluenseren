/* Azure Functions (Node 20, programmeringsmodell v4) for TLLfluenseren-spillene.
   POST /api/resultat    – eleven sender poeng (uten navn: bare klassekode + elevkode).
   GET  /api/resultater  – læreren henter resultater for én klasse (krever header x-laerer-kode).
   Tidsstyrt rydding     – sletter resultater eldre enn 365 dager.
   Miljøvariabler: TABLES_CONNECTION, LAERER_KODE, TILLATTE_KLASSER (kommaseparert, f.eks. "2TLLA,2TLLB"). */
const { app } = require('@azure/functions');
const { TableClient, odata } = require('@azure/data-tables');
const crypto = require('crypto');

const TABELL = 'Spillresultater';
const SPILL = ['min-tll-bedrift', 'hms-revisjon', 'kundeklage', 'lastsikring', 'prisoppdrag', 'nestenulykke'];
const MAKS_BYTES = 4000;
const MAKS_PER_ELEV_PER_DOGN = 30;

let klient;
async function tabell() {
  if (!klient) {
    klient = TableClient.fromConnectionString(process.env.TABLES_CONNECTION, TABELL);
    try { await klient.createTable(); } catch (e) { /* finnes allerede */ }
  }
  return klient;
}
const tillatteKlasser = () => (process.env.TILLATTE_KLASSER || '').split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
const svar = (status, body) => ({ status, jsonBody: body });

function likKode(a, b) {
  const x = Buffer.from(String(a || '')), y = Buffer.from(String(b || ''));
  return x.length === y.length && x.length > 0 && crypto.timingSafeEqual(x, y);
}

function valider(d) {
  if (!d || typeof d !== 'object') return 'Mangler data';
  if (!SPILL.includes(d.spill)) return 'Ukjent spill';
  if (!/^[A-Z0-9]{2,12}$/.test(d.klasse || '')) return 'Ugyldig klassekode';
  if (!tillatteKlasser().includes(d.klasse)) return 'Klassen er ikke registrert';
  if (!/^[A-Z0-9-]{1,10}$/.test(d.elevkode || '')) return 'Ugyldig elevkode';
  if (!Array.isArray(d.omr) || d.omr.length > 12) return 'Ugyldige områder';
  for (const o of d.omr) {
    if (typeof o.k !== 'string' || typeof o.n !== 'string' || o.n.length > 60) return 'Ugyldig område';
    if (!Number.isInteger(o.p) || !Number.isInteger(o.m) || o.p < 0 || o.m < 0 || o.p > o.m || o.m > 300) return 'Ugyldige poeng';
  }
  return null;
}

app.http('resultat', {
  methods: ['POST'], authLevel: 'anonymous', route: 'resultat',
  handler: async (req) => {
    const tekst = await req.text();
    if (tekst.length > MAKS_BYTES) return svar(413, { feil: 'For stor' });
    let d; try { d = JSON.parse(tekst); } catch (e) { return svar(400, { feil: 'Ikke JSON' }); }
    const feil = valider(d);
    if (feil) return svar(400, { feil });
    const t = await tabell();
    // Enkel sperre mot misbruk: maks antall innsendinger per elevkode per døgn
    const siden = new Date(Date.now() - 864e5).toISOString();
    let antall = 0;
    for await (const _ of t.listEntities({ queryOptions: { filter: odata`PartitionKey eq ${d.klasse} and elevkode eq ${d.elevkode} and mottatt ge ${siden}`, select: ['rowKey'] } })) { if (++antall >= MAKS_PER_ELEV_PER_DOGN) return svar(429, { feil: 'For mange innsendinger' }); }
    // Bare disse feltene lagres. Navn og fritekst sendes aldri fra spillet.
    await t.createEntity({
      partitionKey: d.klasse, rowKey: `${d.elevkode}_${d.spill}_${Date.now()}`,
      elevkode: d.elevkode, spill: d.spill, tittel: String(d.tittel || d.spill).slice(0, 60),
      slutt: String(d.slutt || '').slice(0, 30), mottatt: new Date().toISOString(),
      omr: JSON.stringify(d.omr.map(o => ({ k: o.k, n: o.n, p: o.p, m: o.m }))),
      tot: d.omr.reduce((a, o) => a + o.p, 0), maks: d.omr.reduce((a, o) => a + o.m, 0)
    });
    return svar(201, { ok: true });
  }
});

app.http('resultater', {
  methods: ['GET'], authLevel: 'anonymous', route: 'resultater',
  handler: async (req) => {
    if (!likKode(req.headers.get('x-laerer-kode'), process.env.LAERER_KODE)) return svar(401, { feil: 'Ingen tilgang' });
    const klasse = String(req.query.get('klasse') || '').toUpperCase();
    if (!tillatteKlasser().includes(klasse)) return svar(400, { feil: 'Ukjent klasse' });
    const t = await tabell(), ut = [];
    for await (const e of t.listEntities({ queryOptions: { filter: odata`PartitionKey eq ${klasse}` } })) {
      ut.push({ spill: e.spill, tittel: e.tittel, klasse, elevkode: e.elevkode, slutt: e.slutt || e.mottatt, omr: JSON.parse(e.omr), tot: e.tot, maks: e.maks });
    }
    return svar(200, ut);
  }
});

app.timer('rydd', {
  schedule: '0 0 3 * * 0', // søndager kl. 03 (UTC)
  handler: async (_t, ctx) => {
    const t = await tabell(), grense = new Date(Date.now() - 365 * 864e5).toISOString();
    let n = 0;
    for await (const e of t.listEntities({ queryOptions: { filter: odata`mottatt lt ${grense}`, select: ['partitionKey', 'rowKey'] } })) {
      await t.deleteEntity(e.partitionKey, e.rowKey); n++;
    }
    ctx.log(`Slettet ${n} gamle resultater`);
  }
});
