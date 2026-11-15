/* TLLfluenseren – scenariobank for minispillene.
   Alt innhold er egenprodusert. Læreboka er brukt som faglig grunnlag, ikke kopiert.

   Slik legger du til en ny sak i et spill: kopier en sak i `pool` og endre teksten.
   Hver sak har `steg`. Steg-typer:
     { type:'valg',   kort, sporsmal, omrade, alternativer:[{ t, s:0–3, fb, kost? }] }
     { type:'dialog', kort, hvem, sier, omrade, alternativer:[...] }
     { type:'regn',   kort, sporsmal, omrade, lag: () => ({ tekst, svar, tol, enhet, forklaring }) }
   s = poeng (3 = beste valg). kost trekkes fra budsjettet (hvis spillet har budsjett).
   omrade må være en nøkkel i scenarioets `omrader`.
*/
(function () {
  const KM = {
    hms: { kode: 'TOL02-01 · bransjelære', tekst: 'planlegge og utføre arbeid i samsvar med gjeldende regelverk for helse, miljø og sikkerhet, sertifiseringsbestemmelser og næringens krav til kvalitet' },
    etablering: { kode: 'TOL02-01 · bransjelære', tekst: 'beskrive sentrale områder ved etablering, ledelse og økonomisk styring av en virksomhet' },
    okonomi: { kode: 'TOL02-01 · bransjelære', tekst: 'gjøre enkle økonomiske beregninger og vurdere hvilke faktorer som har betydning for prisfastsettelse av oppdrag' },
    service: { kode: 'TOL02-01 · KV427', tekst: 'yte service og gi kundebehandling ved ulike typer oppdrag og kartlegge kundens behov og krav til utførelse' },
    last: { kode: 'TOL02-01 · KV427', tekst: 'sikre last etter gjeldende forskrifter' },
    truck: { kode: 'TOL02-01 · KV427', tekst: 'håndtere og transportere varer med truck etter gjeldende forskrifter' },
    utstyr: { kode: 'TOL02-01 · KV427', tekst: 'bruke og vedlikeholde manuelt, teknisk og digitalt arbeidsutstyr' }
  };
  const kr = n => Math.round(n).toLocaleString('nb-NO') + ' kr';
  const t2 = n => n.toLocaleString('nb-NO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const r = (a, b, s = 1) => Math.round((a + Math.random() * (b - a)) / s) * s;

  const S = {};

  /* =============== 1. HMS-revisjonen =============== */
  S['hms-revisjon'] = {
    id: 'hms-revisjon', tittel: 'HMS-revisjonen', fag: 'Bransjelære', fase: 'Tenk', niva: 'Trygg', minutter: 15,
    kort: 'Revisor har funnet avvik i bedriften din. Vurder risiko, velg tiltak innenfor budsjettet og svar revisor.',
    rolle: 'Du er daglig leder i et lite lager- og transportfirma. Bedriften har hatt HMS-revisjon, og revisor har funnet avvik som du må håndtere.',
    kompetansemal: [KM.hms],
    laeringsmal: ['Etter spillet kan jeg vurdere risiko ut fra sannsynlighet og konsekvens.', 'Etter spillet kan jeg velge strakstiltak og forebyggende tiltak.', 'Etter spillet kan jeg forklare tiltakene mine sakelig til en revisor.'],
    bok: 'Bransjelære kap. 4 (ledelsessystemet for HMS – de åtte trinnene)',
    omrader: { risiko: 'Risikovurdering', tiltak: 'Valg av tiltak', kommunikasjon: 'Kommunikasjon' },
    delNavn: 'Avvik', antall: 3, budsjett: 40000,
    refleksjon: 'Hvilket av avvikene ville du rettet først, og hvorfor? Hvilket av de åtte trinnene i HMS-arbeidet hadde bedriften sviktet på?',
    pool: [
      {
        tittel: 'Truckfører uten dokumentert opplæring',
        funn: 'En sommervikar kjørte motvektstruck i høylageret. Bedriften kunne ikke vise dokumentasjon på at han hadde fått sikkerhetsopplæring.',
        steg: [
          risiko('hoy', 'Ukyndig kjøring i høylager kan gi klemskader, velt og fallende last. Konsekvensen er alvorlig, og sannsynligheten er reell.'),
          { type: 'valg', kort: 'Tiltak', sporsmal: 'Velg strakstiltak', omrade: 'tiltak', alternativer: [
            { t: 'Vikaren slutter å kjøre truck nå. Han får dokumentert sikkerhetsopplæring og instruksjon på denne trucken før han kjører igjen.', s: 3, kost: 12000, fb: 'Riktig rekkefølge: fjern faren først, så dokumentert opplæring.' },
            { t: 'Han fortsetter, men en erfaren kollega følger med de første ukene.', s: 1, kost: 0, fb: 'Å følge med er bra, men erstatter ikke dokumentert opplæring. Faren er der fortsatt.' },
            { t: 'Hele lageret sendes på nytt truckkurs neste måned.', s: 1, kost: 38000, fb: 'Dyrt og treffer feil. Problemet er én person nå – og han kjører fortsatt i mellomtiden.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Revisor', sier: '«Hvordan sikrer dere at dette ikke skjer med neste vikar?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Vi lager en rutine: ingen får bruke truck før opplæringsbeviset er registrert i opplæringsoversikten vår.', s: 3, fb: 'Konkret, systematisk og mulig å kontrollere – det revisor ser etter.' },
            { t: 'Det var vikarbyråets ansvar å sende kvalifiserte folk.', s: 0, fb: 'Ansvarsfraskrivelse. Bedriften der arbeidet skjer, må sørge for at arbeidet er forsvarlig.' },
            { t: 'Vi skal bli flinkere til å huske det.', s: 1, fb: 'Godt ment, men å «huske» er ikke et system. Revisor vil se en rutine.' }] }
        ]
      },
      {
        tittel: 'Skadet pallreol i bruk',
        funn: 'En reolstolpe i gang C er bøyd etter en påkjørsel. Reolen er full, og skaden er ikke meldt som avvik.',
        steg: [
          risiko('hoy', 'En skadet stolpe kan svekke hele reolen. Faller en full reol sammen, kan noen bli drept.'),
          { type: 'valg', kort: 'Tiltak', sporsmal: 'Velg strakstiltak', omrade: 'tiltak', alternativer: [
            { t: 'Sperr av seksjonen, last ned reolen, få skaden vurdert av en kyndig person og bytt stolpen før reolen brukes igjen.', s: 3, kost: 9000, fb: 'Avsperring og nedlasting fjerner faren. En kyndig vurdering avgjør reparasjonen.' },
            { t: 'Sett et rødt merke på stolpen så folk er forsiktige.', s: 0, kost: 0, fb: 'Merking fjerner ikke faren for kollaps. Reolen er fortsatt full.' },
            { t: 'Monter påkjørselsvern på alle stolper i lageret, og la gang C stå som den er inntil videre.', s: 1, kost: 30000, fb: 'Påkjørselsvern forebygger nye skader, men den akutte faren i gang C er der fortsatt.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Revisor', sier: '«Hvorfor ble ikke påkjørselen meldt?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Vi tror føreren var redd for å få skylda. Vi vil gjøre det enklere og tryggere å melde avvik og ta det opp på neste personalmøte.', s: 3, fb: 'Du ser årsaken (kulturen) og foreslår tiltak for hele bedriften.' },
            { t: 'Vi skal finne ut hvem det var, og gi en advarsel.', s: 0, fb: 'Straff gjør at enda færre melder fra. Målet er å lære, ikke å finne en syndebukk.' },
            { t: 'Vi visste ikke om det.', s: 1, fb: 'Ærlig, men det er nettopp avviket: bedriften mangler et system som fanger opp slike skader.' }] }
        ]
      },
      {
        tittel: 'Blokkert rømningsvei',
        funn: 'Nødutgangen ved varemottaket var sperret av tomme paller og en rull strekkfilm.',
        steg: [
          risiko('hoy', 'Ved brann kan en sperret rømningsvei koste liv. Det er billig å rette, men konsekvensen er alvorlig.'),
          { type: 'valg', kort: 'Tiltak', sporsmal: 'Velg strakstiltak', omrade: 'tiltak', alternativer: [
            { t: 'Rydd utgangen nå, merk en «holdes fri»-sone i gulvet og ta rømningsveiene med i den faste vernerunden.', s: 3, kost: 2500, fb: 'Strakstiltak, forebygging og kontroll – billig og effektivt.' },
            { t: 'Rydd utgangen nå.', s: 2, kost: 0, fb: 'Riktig strakstiltak, men uten en rutine skjer det igjen neste travle dag.' },
            { t: 'Kjøp nytt brannalarmanlegg.', s: 0, kost: 35000, fb: 'Alarmen hjelper lite hvis folk ikke kommer seg ut. Tiltaket treffer ikke avviket.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Revisor', sier: '«Hva gjør dere når det kommer en stor leveranse og dere mangler plass?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Vi planlegger mottaket bedre, for eksempel med faste tidsvinduer for transportørene og en egen sone for tomme paller.', s: 3, fb: 'Du kobler HMS til planleggingen av vareflyten. Sterkt svar.' },
            { t: 'Da må vi bruke den plassen vi har.', s: 0, fb: 'Det er akkurat slik rømningsveier blir sperret.' },
            { t: 'Vi ber folk om å passe på.', s: 1, fb: 'Bedre enn ingenting, men det er ikke en plan.' }] }
        ]
      },
      {
        tittel: 'Løfteredskap uten kontroll',
        funn: 'Flere rundsling og sjakler mangler merking av arbeidslast (WLL). Det finnes ingen oversikt over når redskapet sist ble kontrollert.',
        steg: [
          risiko('hoy', 'Ukjent arbeidslast og ukontrollert redskap kan ryke under løft. Hengende last er livsfarlig.'),
          { type: 'valg', kort: 'Tiltak', sporsmal: 'Velg strakstiltak', omrade: 'tiltak', alternativer: [
            { t: 'Ta umerket redskap ut av bruk, kast det eller send det til kontroll, og lag et register med kontrolldatoer.', s: 3, kost: 7000, fb: 'Riktig. Umerket redskap skal ikke brukes, og registeret sikrer kontroll framover.' },
            { t: 'Skriv WLL med tusj på slingsene ut fra hva de ser ut til å tåle.', s: 0, kost: 0, fb: 'Farlig gjetting. Merkingen skal komme fra produsenten, ikke fra øyemål.' },
            { t: 'Bruk redskapet bare til lette løft inntil videre.', s: 0, kost: 0, fb: 'Når arbeidslasten er ukjent, vet ingen hva «lett» betyr. Faren er ikke fjernet.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Revisor', sier: '«Hvem har ansvaret for løfteredskapet hos dere?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Vi utpeker én ansvarlig for registeret, og alle som løfter, sjekker redskapet før hvert løft.', s: 3, fb: 'Tydelig ansvar og kontroll før bruk. Bra.' },
            { t: 'Alle har ansvar.', s: 1, fb: 'Når alle har ansvaret, tar ofte ingen det. Gi ansvaret til en bestemt person.' },
            { t: 'Leverandøren.', s: 0, fb: 'Leverandøren selger redskapet, men bruken og kontrollen er bedriftens ansvar.' }] }
        ]
      },
      {
        tittel: 'Mangelfull lastsikring',
        funn: 'En semitrailer ble sjekket ved avgang. Pallene sto løst bakerst, uten stropper og uten friksjonsmatter.',
        steg: [
          risiko('hoy', 'Usikret last kan forskyve seg ved en nødbrems, få kjøretøyet til å velte eller treffe andre trafikanter.'),
          { type: 'valg', kort: 'Tiltak', sporsmal: 'Velg strakstiltak', omrade: 'tiltak', alternativer: [
            { t: 'Stopp avgangen, sikre lasten riktig og innfør en sjekk av lastsikringen før fraktbrevet signeres.', s: 3, kost: 3000, fb: 'Trygt nå, og et kontrollpunkt for framtida.' },
            { t: 'Sjåføren kjører forsiktig og sjekker lasten underveis.', s: 0, kost: 0, fb: 'Forsiktig kjøring hjelper ikke når lasten flytter seg i en nødbrems.' },
            { t: 'Kjøp nye stropper til alle bilene – avgangen går som planlagt.', s: 1, kost: 15000, fb: 'Bra for framtida, men denne lasten er fortsatt usikret.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Revisor', sier: '«Kunden presser på for raske avganger. Hvordan veier dere tid mot sikkerhet?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Lasten er ikke ferdig lastet før den er sikret. Vi setter av tid til det i planen og forklarer kunden hvorfor.', s: 3, fb: 'Profesjonelt: sikkerhet er en del av kvaliteten på tjenesten.' },
            { t: 'Kunden er viktigst, så av og til må vi ta noen snarveier.', s: 0, fb: 'En ulykke koster mye mer enn en forsinkelse – og ansvaret er ditt.' },
            { t: 'Vi skal prøve å bli raskere til å stroppe.', s: 1, fb: 'Effektivitet er bra, men svaret handler ikke om hva som skal prioriteres.' }] }
        ]
      },
      {
        tittel: 'Ingen melder avvik',
        funn: 'Bedriften har et avviksskjema, men ingen har meldt et eneste avvik på åtte måneder.',
        steg: [
          risiko('middels', 'Det er ingen fare akkurat nå, men uten avviksmeldinger mister bedriften oversikten og kan ikke lære av feil.'),
          { type: 'valg', kort: 'Tiltak', sporsmal: 'Velg tiltak', omrade: 'tiltak', alternativer: [
            { t: 'Gi alle kort opplæring i å melde avvik, gjør skjemaet lett å bruke på mobilen og gå gjennom meldte avvik på hvert personalmøte.', s: 3, kost: 4000, fb: 'Opplæring, lav terskel og synlig oppfølging gjør at folk melder.' },
            { t: 'Heng opp en plakat om at avvik skal meldes.', s: 1, kost: 300, fb: 'En plakat alene endrer sjelden hva folk gjør.' },
            { t: 'Innfør bot for dem som ikke melder avvik.', s: 0, kost: 0, fb: 'Frykt gir skjulte avvik, ikke flere meldinger.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Revisor', sier: '«Null avvik på åtte måneder – betyr det at alt er trygt?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Nei, det betyr sannsynligvis at avvik ikke blir meldt. Det er et faresignal i seg selv.', s: 3, fb: 'Godt sett. Null meldinger betyr sjelden null hendelser.' },
            { t: 'Ja, vi er en trygg arbeidsplass.', s: 0, fb: 'Revisor fant flere avvik i dag – så nei.' },
            { t: 'Vi har ikke tid til papirarbeid.', s: 1, fb: 'Ærlig, men da må systemet bli enklere – ikke droppes.' }] }
        ]
      },
      {
        tittel: 'Ladestasjon og kjemikalier',
        funn: 'I rommet der truckene lades, står batterivæske og vaskemidler uten sikkerhetsdatablad. Øyeskyllestasjonen er tom.',
        steg: [
          risiko('middels', 'Etsende væske kan skade øynene. Når øyeskyllen mangler, blir konsekvensen av et uhell større.'),
          { type: 'valg', kort: 'Tiltak', sporsmal: 'Velg strakstiltak', omrade: 'tiltak', alternativer: [
            { t: 'Fyll øyeskyllestasjonen nå, legg sikkerhetsdatabladene i stoffkartoteket og merk hyllene.', s: 3, kost: 1500, fb: 'Strakstiltak og dokumentasjon. Rimelig og riktig.' },
            { t: 'Flytt alle kjemikalier til en container ute.', s: 1, kost: 20000, fb: 'Kan være aktuelt senere, men løser verken øyeskyll eller dokumentasjon nå.' },
            { t: 'Si til de ansatte at de må bruke vernebriller.', s: 1, kost: 0, fb: 'Verneutstyr er riktig, men øyeskyll og datablad mangler fortsatt.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Revisor', sier: '«Vet de ansatte hva de skal gjøre hvis de får batterisyre i øyet?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Det er vi ikke sikre på. Vi tar en kort førstehjelpsgjennomgang ved ladestasjonen og henger opp en instruks.', s: 3, fb: 'Ærlig og handlingsrettet.' },
            { t: 'Ja, det er sunn fornuft.', s: 0, fb: 'Ved et uhell handler folk på instinkt. Trening og instruks må være på plass.' },
            { t: 'Det er verneombudets ansvar.', s: 1, fb: 'Verneombudet er viktig, men det er arbeidsgiveren som har ansvaret for opplæringen.' }] }
        ]
      },
      {
        tittel: 'Verneombudet mangler opplæring',
        funn: 'Verneombudet har hatt rollen i over et år, men har ikke fått den opplæringen som vervet krever.',
        steg: [
          risiko('middels', 'Ingen fare akkurat nå, men et verneombud uten opplæring kan overse farer og gjør HMS-arbeidet svakere over tid.'),
          { type: 'valg', kort: 'Tiltak', sporsmal: 'Velg tiltak', omrade: 'tiltak', alternativer: [
            { t: 'Meld verneombudet på opplæring snarest, og sett av tid i arbeidsplanen til vernearbeidet.', s: 3, kost: 6000, fb: 'Riktig: opplæring og tid til å gjøre jobben.' },
            { t: 'Verneombudet kan lese seg opp på fritida.', s: 0, kost: 0, fb: 'Opplæringen er arbeidsgiverens ansvar og skal skje i arbeidstida.' },
            { t: 'Velg et nytt verneombud som har mer erfaring.', s: 1, kost: 0, fb: 'Erfaring hjelper, men det løser ikke avviket. Det er de ansatte som velger verneombud, og det nye verneombudet trenger også opplæring.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Verneombudet', sier: '«Jeg føler at ingen hører på meg når jeg sier fra.»', sporsmal: 'Hva svarer du som daglig leder?', omrade: 'kommunikasjon', alternativer: [
            { t: 'Det må vi gjøre noe med. La oss avtale faste møter, og så svarer jeg skriftlig på det du melder.', s: 3, fb: 'Du tar verneombudet på alvor og lager en fast rutine.' },
            { t: 'Du må lære deg å ikke klage så mye.', s: 0, fb: 'Verneombudet har en viktig rolle etter loven. Å avfeie det svekker hele HMS-arbeidet.' },
            { t: 'Send meg en e-post, så ser jeg på det.', s: 1, fb: 'Greit, men uten en fast rutine blir det lett glemt.' }] }
        ]
      }
    ]
  };
  function risiko(riktig, forklaring) {
    const v = [['lav', 'Lav – lite sannsynlig og liten konsekvens'], ['middels', 'Middels – kan skje, og konsekvensen er moderat'], ['hoy', 'Høy – kan gi alvorlig skade eller dødsfall']];
    return { type: 'valg', kort: 'Risiko', fast: true, sporsmal: 'Hvor høy er risikoen?', hjelp: 'Tenk på sannsynlighet × konsekvens.', omrade: 'risiko',
      alternativer: v.map(([k, t]) => ({ t, s: k === riktig ? 3 : (k === 'middels' || riktig === 'middels') ? 1 : 0, fb: forklaring })) };
  }

  /* =============== 2. Kunden klager =============== */
  S['kundeklage'] = {
    id: 'kundeklage', tittel: 'Kunden klager', fag: 'Transport, logistikk og løfteoperasjoner', fase: 'Øv', niva: 'Trygg', minutter: 12,
    kort: 'Kunder er misfornøyde. Ta imot klagen, finn ut hva de trenger, og finn en løsning som bedriften har råd til.',
    rolle: 'Du jobber i kundeservice hos et transport- og lagerfirma. Telefonen ringer – og kunden er ikke fornøyd.',
    kompetansemal: [KM.service],
    laeringsmal: ['Etter spillet kan jeg ta imot en klage rolig og profesjonelt.', 'Etter spillet kan jeg stille spørsmål som kartlegger hva kunden trenger.', 'Etter spillet kan jeg foreslå en løsning og dokumentere avviket.'],
    bok: 'TLL kap. 3 (service og kundebehandling)',
    omrader: { mottak: 'Møte med kunden', kartlegging: 'Kartlegge behov', losning: 'Løsning og oppfølging' },
    delNavn: 'Kunde', antall: 3, budsjett: 15000,
    refleksjon: 'Tenk på en av kundene i spillet. Hva var kundens egentlige behov – og hvordan kan bedriften hindre at det samme skjer igjen?',
    pool: [
      {
        tittel: 'Knuste fliser ved levering', etikett: 'Byggevarehandel',
        funn: 'En byggevarehandel ringer. To av seks paller med fliser kom fram med knust innhold. Kunden er sint og har en håndverker som venter.',
        steg: [
          { type: 'dialog', kort: 'Første svar', hvem: 'Kunden', sier: '«Dette er tredje gang i år! Hva driver dere med?»', omrade: 'mottak', alternativer: [
            { t: 'Det forstår jeg at er frustrerende. Jeg skal hjelpe deg nå – kan du fortelle meg hva som er skadet?', s: 3, fb: 'Du anerkjenner følelsen og går rett over til å hjelpe.' },
            { t: 'Det er nok emballasjen deres som er dårlig.', s: 0, fb: 'Å skylde på kunden før du vet noe, gjør situasjonen verre.' },
            { t: 'Du må sende en skriftlig klage på e-post.', s: 1, fb: 'Kanskje det trengs senere, men kunden trenger hjelp nå.' }] },
          { type: 'valg', kort: 'Kartlegging', sporsmal: 'Hva er viktigst å finne ut først?', omrade: 'kartlegging', alternativer: [
            { t: 'Om skaden ble skrevet på fraktbrevet ved mottak, og hvor raskt kunden trenger nye fliser.', s: 3, fb: 'Anmerkningen på fraktbrevet avgjør reklamasjonen, og tidsbehovet avgjør løsningen.' },
            { t: 'Hvilken sjåfør som leverte.', s: 1, fb: 'Kan være nyttig internt senere, men det hjelper ikke kunden nå.' },
            { t: 'Hvor mye flisene kostet.', s: 1, fb: 'Verdien er relevant, men først må du vite om skaden er dokumentert og hva kunden trenger.' }] },
          { type: 'valg', kort: 'Løsning', sporsmal: 'Hvilken løsning velger du?', omrade: 'losning', alternativer: [
            { t: 'Ta bilder og registrer avvik, start reklamasjonen og tilby ekspresslevering av nye paller i morgen.', s: 3, kost: 4000, fb: 'Dokumentert, rettferdig og løser kundens problem.' },
            { t: 'Gi kunden 50 % rabatt på alle framtidige leveranser.', s: 0, kost: 12000, fb: 'Dyrt og løser ikke at håndverkeren venter. Ingenting er dokumentert.' },
            { t: 'Be kunden ta det opp med forsikringsselskapet sitt.', s: 1, kost: 0, fb: 'Kunden blir stående alene med problemet, og dere mister trolig kunden.' }] }
        ]
      },
      {
        tittel: 'Forsinket leveranse', etikett: 'Dagligvarebutikk',
        funn: 'En dagligvarebutikk skulle ha varer kl. 07.00. Klokka er 09.30, og bilen er ikke kommet. Butikken har tomme hyller.',
        steg: [
          { type: 'dialog', kort: 'Første svar', hvem: 'Butikksjefen', sier: '«Hvor er varene våre? Kundene står og venter!»', omrade: 'mottak', alternativer: [
            { t: 'Beklager, jeg sjekker med en gang hvor bilen er, og ringer deg tilbake innen ti minutter med en tid.', s: 3, fb: 'Konkret løfte med tidsfrist – og du holder kunden informert.' },
            { t: 'Det er mye trafikk i dag.', s: 0, fb: 'En unnskyldning uten løsning eller informasjon.' },
            { t: 'Bilen kommer nok snart.', s: 1, fb: 'Vagt. Kunden kan ikke planlegge ut fra «snart».' }] },
          { type: 'valg', kort: 'Kartlegging', sporsmal: 'Hva spør du butikken om?', omrade: 'kartlegging', alternativer: [
            { t: 'Hvilke varer haster mest, og om noe kan leveres i en egen tur først.', s: 3, fb: 'Du finner kundens viktigste behov og åpner for en smart løsning.' },
            { t: 'Om de kan vente til i morgen.', s: 0, fb: 'Dagligvarer med kort holdbarhet kan ikke vente – du har ikke spurt om behovet.' },
            { t: 'Om de har lest leveringsvilkårene.', s: 0, fb: 'Kan bli aktuelt senere, men nå trenger kunden varer.' }] },
          { type: 'valg', kort: 'Løsning', sporsmal: 'Hvilken løsning velger du?', omrade: 'losning', alternativer: [
            { t: 'Send de viktigste varene med en ledig varebil nå, gi ny tid for resten og registrer forsinkelsen som avvik.', s: 3, kost: 3000, fb: 'Løser det som haster, og avviket gir grunnlag for å forbedre ruteplanen.' },
            { t: 'Be sjåføren kjøre fortere.', s: 0, kost: 0, fb: 'Farlig og ulovlig. Trafikksikkerhet går foran.' },
            { t: 'Gi butikken gratis levering neste måned.', s: 1, kost: 9000, fb: 'Plaster på såret, men hyllene er fortsatt tomme i dag.' }] }
        ]
      },
      {
        tittel: 'Feil antall kolli', etikett: 'Nettbutikk',
        funn: 'En nettbutikk har fått 38 kolli, men følgeseddelen sier 40. De mangler to esker med bestilte varer.',
        steg: [
          { type: 'dialog', kort: 'Første svar', hvem: 'Kunden', sier: '«Vi mangler to esker. Kundene våre venter på pakkene sine.»', omrade: 'mottak', alternativer: [
            { t: 'Takk for at du sier fra med en gang. Har du sendingsnummeret? Da sporer jeg de to eskene nå.', s: 3, fb: 'Du takker, ber om det du trenger og handler med en gang.' },
            { t: 'Har dere telt riktig?', s: 1, fb: 'Kan stemme, men spørsmålet høres anklagende ut. Spor heller sendingen først.' },
            { t: 'Vi leverer alltid det vi får.', s: 0, fb: 'Avvisende, og du har ikke undersøkt noe.' }] },
          { type: 'valg', kort: 'Kartlegging', sporsmal: 'Hva sjekker du først?', omrade: 'kartlegging', alternativer: [
            { t: 'Sporingen på kollinivå: hvor ble de to eskene sist skannet?', s: 3, fb: 'Strekkode-skanningen viser hvor i kjeden eskene ble borte.' },
            { t: 'Hva som var i eskene.', s: 1, fb: 'Viktig for kunden, men sporingen sier deg hvor de er.' },
            { t: 'Om kunden har fått mangler før.', s: 0, fb: 'Løser ikke saken nå.' }] },
          { type: 'valg', kort: 'Løsning', sporsmal: 'Eskene står igjen på terminalen. Hva gjør du?', omrade: 'losning', alternativer: [
            { t: 'Send dem med første rute i dag, gi kunden beskjed om tidspunktet og meld avvik så terminalen kan finne årsaken.', s: 3, kost: 1500, fb: 'Kunden får varene, og avviket hjelper dere å unngå samme feil.' },
            { t: 'Send dem med neste ordinære levering om en uke.', s: 0, kost: 0, fb: 'Kunden har ventende sluttkunder – en uke er for lenge.' },
            { t: 'Send dem i taxi med en gang.', s: 1, kost: 5000, fb: 'Raskt, men dyrt. Sjekk først om en ordinær rute går i dag.' }] }
        ]
      },
      {
        tittel: 'Kunden vil ha det for raskt', etikett: 'Produksjonsbedrift',
        funn: 'En fabrikk vil ha en last levert i Trondheim i morgen tidlig. Sjåføren har allerede kjørt mye i dag. Kunden truer med å bytte transportør.',
        steg: [
          { type: 'dialog', kort: 'Første svar', hvem: 'Innkjøperen', sier: '«Andre klarer det. Hvorfor kan ikke dere?»', omrade: 'mottak', alternativer: [
            { t: 'Jeg vil gjerne løse det for dere. Sjåføren har ikke lov til å kjøre så langt i natt, men la meg se hva vi kan få til.', s: 3, fb: 'Ærlig om regelverket og løsningsorientert.' },
            { t: 'Da får dere bruke de andre.', s: 0, fb: 'Du mister kunden uten å prøve.' },
            { t: 'Ok, sjåføren får kjøre gjennom natta.', s: 0, fb: 'Brudd på kjøre- og hviletidsreglene setter liv i fare og gir store bøter.' }] },
          { type: 'valg', kort: 'Kartlegging', sporsmal: 'Hva spør du kunden om?', omrade: 'kartlegging', alternativer: [
            { t: 'Hva som må være framme i morgen tidlig, og om resten kan komme senere på dagen.', s: 3, fb: 'Ofte er det bare deler av lasten som haster.' },
            { t: 'Om de kan betale ekstra.', s: 1, fb: 'Pris er relevant, men først må du forstå behovet.' },
            { t: 'Hvorfor de bestilte så sent.', s: 0, fb: 'Kan føles som en anklage. Det hjelper ikke kunden.' }] },
          { type: 'valg', kort: 'Løsning', sporsmal: 'Hvilken løsning velger du?', omrade: 'losning', alternativer: [
            { t: 'Sett inn en uthvilt sjåfør eller to sjåfører på bilen, og gi kunden en pris for ekspress.', s: 3, kost: 6000, fb: 'Lovlig, trygt og kunden får et ærlig tilbud.' },
            { t: 'Si nei og avslutt samtalen.', s: 0, kost: 0, fb: 'Nei kan være riktig, men da bør du tilby et alternativ.' },
            { t: 'Lov levering og håp at sjåføren rekker det.', s: 0, kost: 0, fb: 'Et løfte du ikke kan holde lovlig, skader både sikkerheten og tilliten.' }] }
        ]
      }
    ]
  };

  /* =============== 3. Lastsikringskontrollen =============== */
  S['lastsikring'] = {
    id: 'lastsikring', tittel: 'Lastsikringskontrollen', fag: 'Transport, logistikk og løfteoperasjoner', fase: 'Øv', niva: 'Trygg', minutter: 12,
    kort: 'Du er lastesjef på terminalen. Se over lasten før bilene kjører, finn feilene og velg riktig sikring.',
    rolle: 'Du er lastesjef på en godsterminal. Før hver bil kjører, kontrollerer du lastsikringen.',
    kompetansemal: [KM.last],
    laeringsmal: ['Etter spillet kan jeg se hva som er feil med en lastsikring.', 'Etter spillet kan jeg velge mellom blokkering, surring og friksjon.', 'Etter spillet kan jeg begrunne hvorfor lasten må sikres før avgang.'],
    bok: 'TLL kap. 5 og heftet «Lastsikring ved veitransport»',
    omrader: { feil: 'Finne feil', metode: 'Velge sikring', kommunikasjon: 'Kommunikasjon' },
    delNavn: 'Bil', antall: 3,
    refleksjon: 'Forklar forskjellen på å sikre last ved blokkering og ved surring. Når passer de forskjellige metodene?',
    pool: [
      {
        tittel: 'Pallegods med luke foran', etikett: 'Semitrailer',
        funn: 'Trailer med 30 helpaller. Pallene står tett i bredden, men det er en luke på ca. 1,5 meter mellom første pallerad og frontveggen.',
        steg: [
          { type: 'valg', kort: 'Feil', sporsmal: 'Hva er problemet?', omrade: 'feil', alternativer: [
            { t: 'Lasten kan skli framover i luka ved en kraftig nedbremsing.', s: 3, fb: 'Riktig. Krafta framover ved bremsing er størst, og luka gir lasten fart før den treffer veggen.' },
            { t: 'Pallene står for tett i bredden.', s: 0, fb: 'Tett i bredden er bra – det er blokkering sideveis.' },
            { t: 'Det er ikke noe problem når pallene er tunge.', s: 0, fb: 'Tunge paller har mer bevegelsesenergi. Vekt hjelper ikke mot forskyvning.' }] },
          { type: 'valg', kort: 'Sikring', sporsmal: 'Hvordan sikrer du best?', omrade: 'metode', alternativer: [
            { t: 'Flytt lasten helt fram mot frontveggen, eller fyll luka med tomme paller eller luftputer, og sikre bakerste rad.', s: 3, fb: 'Blokkering mot frontveggen er enkelt og effektivt.' },
            { t: 'Legg én stropp over den bakerste raden.', s: 1, fb: 'Hjelper bakover, men løser ikke luka foran.' },
            { t: 'Kjør forsiktig de første kilometerne.', s: 0, fb: 'Lasten skal være sikret for en nødbrems hele turen.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Sjåføren', sier: '«Jeg har kjørt sånn i ti år uten problemer. Kan vi ikke bare dra?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Jeg skjønner at du har dårlig tid, men det tar fem minutter å flytte pallene. Da er vi begge trygge hvis noe skjer.', s: 3, fb: 'Respektfullt, kort begrunnet og løsningsorientert.' },
            { t: 'Ok, du kjenner bilen best.', s: 0, fb: 'Erfaring er ikke det samme som riktig sikring. Du har ansvar for at lasten er sikret.' },
            { t: 'Du gjør som jeg sier.', s: 1, fb: 'Riktig beslutning, men måten du sier det på, kan skape konflikt.' }] }
        ]
      },
      {
        tittel: 'Stålrør på lasteplanet', etikett: 'Lastebil med plan',
        funn: 'Lastebil med lange stålrør i bunter. Buntene ligger rett på stålplanet uten friksjonsmatter. To stropper er spent over.',
        steg: [
          { type: 'valg', kort: 'Feil', sporsmal: 'Hva er det største problemet?', omrade: 'feil', alternativer: [
            { t: 'Stål mot stål gir lav friksjon, så buntene kan gli selv om de er stroppet.', s: 3, fb: 'Riktig. Lav friksjon betyr at surringen må gjøre nesten hele jobben.' },
            { t: 'Stroppene har feil farge.', s: 0, fb: 'Fargen betyr ingenting. Det er merkingen (LC/STF) som teller.' },
            { t: 'Rørene er for lange.', s: 1, fb: 'Lang last har egne regler, men her er friksjonen det største problemet.' }] },
          { type: 'valg', kort: 'Sikring', sporsmal: 'Hva gjør du?', omrade: 'metode', alternativer: [
            { t: 'Legg friksjonsmatter under buntene, bruk flere stropper og blokker framover mot en stopper eller frontveggen.', s: 3, fb: 'Mer friksjon, mer surring og blokkering virker sammen.' },
            { t: 'Stram de to stroppene hardere.', s: 1, fb: 'Hjelper litt, men med så lav friksjon er to stropper sjelden nok.' },
            { t: 'Legg presenning over så rørene ikke synes.', s: 0, fb: 'Presenning sikrer ingenting.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Kunden', sier: '«Matter? Det har vi aldri brukt. Det blir bare dyrere.»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Matter koster lite og gjør at vi trenger færre stropper. Et uhell med stålrør kan koste liv.', s: 3, fb: 'Du kobler sikkerhet og økonomi. Overbevisende.' },
            { t: 'Det er påbudt, sånn er det bare.', s: 1, fb: 'Kan stemme, men en begrunnelse fungerer bedre.' },
            { t: 'Ok, vi dropper det denne gangen.', s: 0, fb: 'Du gir etter for press i en farlig situasjon.' }] }
        ]
      },
      {
        tittel: 'Blandet last til byggeplass', etikett: 'Varebil',
        funn: 'Varebil med sementsekker, en verktøykasse og fire løse gipsplater. Alt står på gulvet uten sikring.',
        steg: [
          { type: 'valg', kort: 'Feil', sporsmal: 'Hva er farligst her?', omrade: 'feil', alternativer: [
            { t: 'Tunge og harde gjenstander kan bli kastet framover inn i førerhuset ved en bråstopp.', s: 3, fb: 'I en varebil sitter føreren rett foran lasten. Usikret last kan bli et prosjektil.' },
            { t: 'Gipsplatene kan få riper.', s: 1, fb: 'Godsskade er dyrt, men personskade er det farligste.' },
            { t: 'Varebilen kan bli overlastet.', s: 1, fb: 'Viktig å sjekke, men det er ikke det farligste her.' }] },
          { type: 'valg', kort: 'Sikring', sporsmal: 'Hvordan sikrer du?', omrade: 'metode', alternativer: [
            { t: 'Tunge sekker lavt og mot skilleveggen, verktøykassa festet i forankringspunkt og platene stroppet stående.', s: 3, fb: 'Tungt lavt og fremst, og alt festet i forankringspunkter.' },
            { t: 'Legg gipsplatene oppå sekkene.', s: 0, fb: 'Stablingen er ustabil og fortsatt usikret.' },
            { t: 'Kjør rolig, det er bare en kort tur.', s: 0, fb: 'De fleste uhell skjer på korte turer. Lasten skal alltid sikres.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Kollega', sier: '«Det er bare tre kilometer. Gidder vi?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'En bråstopp skjer like fort på tre kilometer. Ta i et tak, så er vi ferdige på to minutter.', s: 3, fb: 'Kort, saklig og du inviterer til samarbeid.' },
            { t: 'Gjør som du vil.', s: 0, fb: 'Du ser en fare og lar den passere.' },
            { t: 'Jeg melder deg til sjefen.', s: 1, fb: 'Avvik kan meldes, men prøv å løse det i samarbeid først.' }] }
        ]
      },
      {
        tittel: 'Høy last med tyngdepunkt oppe', etikett: 'Semitrailer',
        funn: 'En maskin på 6 tonn står midt i traileren. Den er høy og smal og har tyngdepunktet langt oppe. Den er surret med to stropper rett over toppen.',
        steg: [
          { type: 'valg', kort: 'Feil', sporsmal: 'Hva er risikoen?', omrade: 'feil', alternativer: [
            { t: 'Maskinen kan velte i svinger fordi den er høy og smal, og nedsurring over toppen hindrer ikke det godt nok.', s: 3, fb: 'Riktig. Høy og smal last har veltefare og trenger en annen sikringsmetode.' },
            { t: 'Maskinen er for tung for traileren.', s: 1, fb: 'Sjekk alltid vekta, men 6 tonn er vanligvis ikke noe problem for en semitrailer.' },
            { t: 'Ingen risiko, den står jo midt i.', s: 0, fb: 'Plasseringen midt i er bra for akseltrykket, men det hindrer ikke velt.' }] },
          { type: 'valg', kort: 'Sikring', sporsmal: 'Hva er best?', omrade: 'metode', alternativer: [
            { t: 'Direktesurring fra maskinens løftepunkter til forankringspunkter på planet, i alle retninger.', s: 3, fb: 'Direktesurring er godt egnet for tunge, høye gjenstander med løftepunkter.' },
            { t: 'Legg på to stropper til over toppen.', s: 1, fb: 'Mer nedsurring hjelper litt, men hindrer ikke velt like godt.' },
            { t: 'Legg sandsekker rundt foten.', s: 0, fb: 'Sandsekker hindrer ikke en maskin på 6 tonn fra å velte.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Sjåføren', sier: '«Hvordan vet vi at stroppene er sterke nok?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Vi leser LC-verdien på etiketten og sjekker beregningen i lastsikringsveilederen sammen.', s: 3, fb: 'Godt: merkingen og veilederen gir svaret – ikke magefølelsen.' },
            { t: 'De ser solide ut.', s: 0, fb: 'Utseendet sier ingenting om hva stroppen tåler.' },
            { t: 'Det er leverandørens ansvar.', s: 0, fb: 'Den som laster og den som kjører, har ansvar for at lasten er sikret.' }] }
        ]
      }
    ]
  };

  /* =============== 4. Prisen på oppdraget (regnespill) =============== */
  function kalkyleSak(nr) {
    // Alle tall lages tilfeldig, så hver elev får sine egne oppgaver.
    const fast = r(400000, 600000, 10000), km = r(80000, 120000, 5000);
    const fastKm = Math.round(fast / km * 100) / 100;
    const varKm = r(700, 1100) / 100;
    const selvKm = Math.round((fastKm + varKm) * 100) / 100;
    const tur = r(150, 450, 10);
    const pris = r(Math.ceil(selvKm * tur * 1.05 / 100), Math.ceil(selvKm * tur * 1.5 / 100)) * 100;
    const bud = Math.round(varKm * tur * r(80, 115) / 100 / 10) * 10;
    const db = pris - Math.round(varKm * tur);
    return {
      tittel: `Oppdrag: ${tur} km tur–retur`, etikett: 'Kalkyle',
      funn: `Bilen din har <b>${kr(fast)}</b> i faste kostnader per år og kjører <b>${km.toLocaleString('nb-NO')} km</b> i året. De variable kostnadene (drivstoff, dekk, olje, service) er <b>${t2(varKm)} kr/km</b>.`,
      steg: [
        { type: 'regn', kort: 'Faste per km', sporsmal: 'Regn ut faste kostnader per kilometer', omrade: 'kalkyle',
          lag: () => ({ tekst: '<p>Faste kostnader per km = faste kostnader per år ÷ antall km per år.</p>', svar: fastKm, tol: 0.06, enhet: 'kr/km',
            forklaring: ` ${kr(fast)} ÷ ${km.toLocaleString('nb-NO')} km = <b>${t2(fastKm)} kr/km</b>.` }) },
        { type: 'regn', kort: 'Selvkost', sporsmal: `Regn ut selvkost for hele turen (${tur} km)`, omrade: 'kalkyle',
          lag: () => ({ tekst: `<p>Selvkost per km = faste + variable kostnader per km. Gang med antall km.</p><p class="sp-small">Bruk ${t2(fastKm)} kr/km for de faste kostnadene.</p>`, svar: Math.round(selvKm * tur), tol: Math.max(20, selvKm * tur * 0.01), enhet: 'kr',
            forklaring: ` (${t2(fastKm)} + ${t2(varKm)}) × ${tur} km = <b>${kr(selvKm * tur)}</b>.` }) },
        { type: 'regn', kort: 'Dekningsbidrag', sporsmal: `Kunden betaler ${kr(pris)}. Hva blir dekningsbidraget?`, omrade: 'kalkyle',
          lag: () => ({ tekst: '<p>Dekningsbidrag = pris – variable kostnader for oppdraget.</p>', svar: db, tol: Math.max(20, Math.abs(db) * 0.01), enhet: 'kr',
            forklaring: ` ${kr(pris)} – (${t2(varKm)} × ${tur}) = <b>${kr(db)}</b>. Dette beløpet skal dekke de faste kostnadene og gi fortjeneste.` }) },
        { type: 'dialog', kort: 'Pruting', hvem: 'Kunden', sier: `«En annen transportør tar ${kr(bud)} for samme tur. Kan du matche det?»`, omrade: 'vurdering',
          alternativer: bud < varKm * tur ? [
            { t: `Nei. ${kr(bud)} dekker ikke engang drivstoff og slitasje på turen. Da taper vi penger på hver kilometer.`, s: 3, fb: 'Riktig. Prisen er under de variable kostnadene – dekningsbidraget blir negativt.' },
            { t: 'Ja, vi må ha oppdraget.', s: 0, fb: `Med ${kr(bud)} blir dekningsbidraget negativt. Jo mer dere kjører, jo mer taper dere.` },
            { t: 'Vi kan gå ned til halvveis mellom prisene.', s: 1, fb: 'Kan være et forhandlingsgrep, men sjekk først at prisen dekker de variable kostnadene.' }] : [
            { t: `${kr(bud)} gir et lite dekningsbidrag, men dekker ikke alle de faste kostnadene. Vi kan ta det hvis bilen ellers står stille, men ikke som fast pris.`, s: 3, fb: 'Riktig vurdering: positivt dekningsbidrag, men under selvkost. Greit av og til, ikke som fast pris.' },
            { t: 'Ja, alle oppdrag er bedre enn ingen.', s: 1, fb: 'Kortsiktig kan det stemme, men under selvkost over tid går bedriften i minus.' },
            { t: 'Nei, aldri under listeprisen.', s: 1, fb: 'Trygt, men når bilen står ledig, kan et positivt dekningsbidrag være bedre enn ingenting.' }] }
      ]
    };
  }
  S['prisoppdrag'] = {
    id: 'prisoppdrag', tittel: 'Prisen på oppdraget', fag: 'Bransjelære', fase: 'Øv', niva: 'Trygg', minutter: 15,
    kort: 'Regn ut hva en tur egentlig koster, finn dekningsbidraget og bestem om du skal godta prisen kunden byr.',
    rolle: 'Du driver et lite transportfirma med én lastebil. Kundene ringer og vil ha pris på turer.',
    kompetansemal: [KM.okonomi],
    laeringsmal: ['Etter spillet kan jeg regne ut faste kostnader per kilometer.', 'Etter spillet kan jeg regne ut selvkost og dekningsbidrag for et oppdrag.', 'Etter spillet kan jeg vurdere om en pris er lønnsom.'],
    bok: 'Bransjelære kap. 9 (selvkostkalkyle og bidragskalkyle)',
    omrader: { kalkyle: 'Beregninger', vurdering: 'Prisvurdering' },
    delNavn: 'Oppdrag', antall: 2,
    get pool() { return [kalkyleSak(1), kalkyleSak(2)]; },
    refleksjon: 'Hvorfor kan det noen ganger lønne seg å ta et oppdrag under selvkost – og hvorfor går det ikke i lengden?'
  };

  /* =============== 5. Nesten-ulykke på lageret =============== */
  S['nestenulykke'] = {
    id: 'nestenulykke', tittel: 'Nesten-ulykke på lageret', fag: 'Bransjeteknikk', fase: 'Tenk', niva: 'Nybegynner', minutter: 10,
    kort: 'Noe holdt på å gå galt. Handle riktig der og da, meld fra og snakk med kollegaen din.',
    rolle: 'Du jobber som logistikkoperatør på et lager med truck. I løpet av dagen skjer det ting som kunne gått galt.',
    kompetansemal: [KM.truck, KM.utstyr],
    laeringsmal: ['Etter spillet kan jeg handle trygt når noe nesten går galt.', 'Etter spillet kan jeg forklare hvorfor nesten-ulykker skal meldes.', 'Etter spillet kan jeg si fra til en kollega på en god måte.'],
    bok: 'TLL kap. 7 og 9 (arbeidsutstyr og truck)',
    omrader: { handling: 'Handling her og nå', melding: 'Melde fra', kommunikasjon: 'Kommunikasjon' },
    delNavn: 'Hendelse', antall: 3,
    refleksjon: 'Hvorfor er det viktig å melde nesten-ulykker selv om ingen ble skadet? Hva kan bedriften lære av dem?',
    pool: [
      {
        tittel: 'Fotgjenger i truckgangen', funn: 'Du rygger med truck ut av en reolgang. En kollega med headset går rett bak trucken uten å se seg for. Du stopper i siste liten.',
        steg: [
          { type: 'valg', kort: 'Nå', sporsmal: 'Hva gjør du først?', omrade: 'handling', alternativer: [
            { t: 'Stopper helt, senker gaflene og sjekker at kollegaen er uskadd.', s: 3, fb: 'Sikker stans først, så mennesket.' },
            { t: 'Tuter og kjører videre.', s: 0, fb: 'Faren er ikke over, og du vet ikke om kollegaen er ok.' },
            { t: 'Roper på kollegaen fra trucken.', s: 1, fb: 'Kommunikasjon er bra, men stopp trucken helt først.' }] },
          { type: 'valg', kort: 'Melding', sporsmal: 'Skal hendelsen meldes?', omrade: 'melding', alternativer: [
            { t: 'Ja, som nesten-ulykke i avvikssystemet, med forslag om å skille gående og truck bedre i området.', s: 3, fb: 'Nesten-ulykker viser hvor neste ulykke kan skje. Forslaget ditt gjør meldingen nyttig.' },
            { t: 'Nei, ingen ble skadet.', s: 0, fb: 'Neste gang er det kanskje ikke flaks. Nesten-ulykker skal meldes.' },
            { t: 'Jeg sier det muntlig til sjefen.', s: 1, fb: 'Bedre enn ingenting, men uten skriftlig melding blir det ikke fulgt opp.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Kollega', sier: '«Oi! Jeg hørte deg ikke – hadde musikk på.»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Det gikk bra, heldigvis. Men i truckområdet må vi kunne høre hverandre. Kan du ta av headsettet her?', s: 3, fb: 'Rolig, tydelig og du sier hva du ønsker.' },
            { t: 'Er du dum, eller?', s: 0, fb: 'Kjeft gjør folk defensive, og da lærer de mindre.' },
            { t: 'Pass deg neste gang.', s: 1, fb: 'Greit nok, men ikke konkret om hva som må endres.' }] }
        ]
      },
      {
        tittel: 'Hevet last under kjøring', funn: 'En ny kollega kjører truck med pallen hevet nesten to meter mens han svinger mellom reolene.',
        steg: [
          { type: 'valg', kort: 'Nå', sporsmal: 'Hvorfor er dette farlig?', omrade: 'handling', alternativer: [
            { t: 'Med lasten høyt flyttes tyngdepunktet opp, og trucken kan velte i svingen.', s: 3, fb: 'Riktig. Kjør med lasten lavt og masten tiltet bakover.' },
            { t: 'Han ser for dårlig fremover.', s: 1, fb: 'Kan stemme, men den største faren er velt.' },
            { t: 'Det sliter på hydraulikken.', s: 0, fb: 'Kanskje litt, men det viktigste er veltefaren.' }] },
          { type: 'valg', kort: 'Melding', sporsmal: 'Hva gjør du videre?', omrade: 'melding', alternativer: [
            { t: 'Sier fra til ham nå, og tar det opp med lederen så nyansatte får bedre instruksjon i kjøreteknikk.', s: 3, fb: 'Du løser situasjonen og forbedrer opplæringen.' },
            { t: 'Ingenting, han lærer det sikkert.', s: 0, fb: 'Faren varer til noen sier fra.' },
            { t: 'Tar bilde og legger det ut i gruppechatten.', s: 0, fb: 'Uthenging skaper dårlig miljø og fikser ingenting.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Ny kollega', sier: '«Jeg prøvde bare å spare tid.»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Skjønner det. Men du sparer mest tid på å kjøre med lasten lavt – det går raskere og tryggere. Skal jeg vise deg?', s: 3, fb: 'Du viser forståelse og tilbyr hjelp.' },
            { t: 'Tid er ikke viktig.', s: 1, fb: 'Tid er viktig på et lager. Vis heller at trygg kjøring også er effektiv.' },
            { t: 'Gjør det en gang til, så melder jeg deg.', s: 0, fb: 'Trusler skaper ikke sikkerhetskultur.' }] }
        ]
      },
      {
        tittel: 'Lekkasje ved daglig kontroll', funn: 'Under den daglige kontrollen før skiftet ser du en oljepøl under trucken og at gaffelkjedet ser tørt og slitt ut.',
        steg: [
          { type: 'valg', kort: 'Nå', sporsmal: 'Hva gjør du?', omrade: 'handling', alternativer: [
            { t: 'Tar trucken ut av bruk, merker den tydelig og bruker en annen truck.', s: 3, fb: 'Feil funnet ved kontroll betyr: ikke bruk før den er reparert.' },
            { t: 'Kjører forsiktig resten av dagen.', s: 0, fb: 'En hydraulikk- eller kjedefeil kan gi fallende last. Ikke bruk trucken.' },
            { t: 'Tørker opp oljen og bruker trucken.', s: 0, fb: 'Du fjerner sporet, men ikke feilen.' }] },
          { type: 'valg', kort: 'Melding', sporsmal: 'Hvordan følger du opp?', omrade: 'melding', alternativer: [
            { t: 'Melder feilen til den som har ansvar for vedlikehold, og skriver det i sjekklisten.', s: 3, fb: 'Dokumentert og sendt til riktig person.' },
            { t: 'Lar en lapp ligge på setet.', s: 1, fb: 'Lapper blir borte. Bruk de faste rutinene.' },
            { t: 'Ingen trenger å vite det, den er jo tatt ut av bruk.', s: 0, fb: 'Uten melding blir den ikke reparert – og noen kan ta den i bruk igjen.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Skiftleder', sier: '«Vi har mye som skal ut i dag. Kan du ikke bare bruke den?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Jeg forstår at det haster, men den kan miste lasten. Jeg tar den andre trucken, og så prioriterer vi de viktigste ordrene.', s: 3, fb: 'Du står for sikkerheten og foreslår en løsning.' },
            { t: 'Ok, du er sjefen.', s: 0, fb: 'Du har rett og plikt til å si fra om farlig utstyr.' },
            { t: 'Nei!', s: 1, fb: 'Riktig beslutning, men gi en begrunnelse og et alternativ.' }] }
        ]
      },
      {
        tittel: 'Kollega vil låne trucken', funn: 'En kollega fra kontoret vil låne trucken din for å flytte en pall. Hun har ikke truckopplæring.',
        steg: [
          { type: 'valg', kort: 'Nå', sporsmal: 'Hva gjør du?', omrade: 'handling', alternativer: [
            { t: 'Sier nei og tilbyr å flytte pallen for henne.', s: 3, fb: 'Trygt og hjelpsomt.' },
            { t: 'Lar henne prøve mens du ser på.', s: 0, fb: 'Uten dokumentert opplæring skal hun ikke kjøre truck.' },
            { t: 'Sier at hun får spørre sjefen.', s: 1, fb: 'Svaret blir det samme. Hjelp henne heller.' }] },
          { type: 'valg', kort: 'Melding', sporsmal: 'Bør noe følges opp?', omrade: 'melding', alternativer: [
            { t: 'Ja – foreslå at trucknøklene oppbevares slik at bare de med opplæring får tilgang.', s: 3, fb: 'Et tiltak som fjerner risikoen for alle.' },
            { t: 'Nei, det gikk jo bra.', s: 1, fb: 'Denne gangen. Er det lett å ta en truck uten opplæring, bør det fikses.' },
            { t: 'Ja – heng opp lapp om at kontorfolk ikke skal på lageret.', s: 0, fb: 'Uvennlig og treffer feil problem.' }] },
          { type: 'dialog', kort: 'Samtale', hvem: 'Kollega', sier: '«Det kan da ikke være så vanskelig?»', omrade: 'kommunikasjon', alternativer: [
            { t: 'Det ser lett ut, men en truck kan velte eller klemme noen. Derfor kreves det opplæring. Jeg tar den for deg.', s: 3, fb: 'Forklarer hvorfor, uten å nedvurdere henne.' },
            { t: 'Det er ulovlig, punktum.', s: 1, fb: 'Riktig, men en begrunnelse skaper forståelse.' },
            { t: 'Neida, sett deg opp.', s: 0, fb: 'Farlig – og du kan bli medansvarlig.' }] }
        ]
      }
    ]
  };

  window.SCENARIER = S;
  window.SPILL_KM = KM;
})();
