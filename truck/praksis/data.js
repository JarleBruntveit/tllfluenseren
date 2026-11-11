/* Truckrubrikken – praktiske truckøvelser for T1, T2 og T4.
   Elevtekst. Fasit og lærernotater ligger kryptert i /laererrom/truck-praksis/.
   Brukes av /truck/praksis/ (elev) og /laererrom/truck-praksis/ (lærer). */
window.TRUCK_PRAKSIS = (function () {
  const NDLA = 'https://ndla.no/r/bransjeteknikk-tp-tol-vg2---ressurssamling/';
  const ndla = {
    viktig: { t: 'Viktig å vite når du kjører truck', u: NDLA + 'viktig-a-vite-nar-du-kjorer-truck/e17bb41e75' },
    medLast: { t: 'Riktig truckkjøring med last', u: NDLA + 'riktig-truckkjoring-med-last/d6063a5715' },
    feil: { t: 'Feil kjøring med truck', u: NDLA + 'feil-kjoring-med-truck/6ca78a49cd' },
    klasser: { t: 'Truck – klassifisering og sertifisering', u: NDLA + 'truck---klassifisering-og-sertifisering/e1eb28bbc1' },
    kontroll1: { t: 'Truck – kontroll og vedlikehold I', u: NDLA + 'truck---kontroll-og-vedlikehold-i/2f15b285da' },
    kontroll2: { t: 'Truck – kontroll og vedlikehold II', u: NDLA + 'truck---kontroll-og-vedlikehold-ii/0b5ab4cfee' },
    typer: { t: 'Truck (T1–T8)', u: NDLA + 'truck-t1-t8/0463085321' },
    tillegg: { t: 'Tilleggsutrustning truck', u: NDLA + 'tilleggsutrustning-truck/4353ca970e' },
    quiz: { t: 'Teknisk bruk og vedlikehold – hva har du lært?', u: NDLA + 'teknisk-bruk-og-vedlikehold---hva-har-du-lart/b2a6f92f4e' }
  };

  const nivaer = [
    { n: 0, tittel: 'Klar til å kjøre', mestring: 'Nybegynner',
      intro: 'Ingen kjører før de kan kontrollere trucken. Her blir du kjent med trucken mens den står stille.',
      kjerne: 'Daglig kontroll gjøres av føreren og skrives i kontrollboka sammen med timetelleren.', ndla: ['kontroll1', 'kontroll2'] },
    { n: 1, tittel: 'Kjenn trucken uten last', mestring: 'Nybegynner',
      intro: 'Her lærer du at trucken svinger med bakenden. Uten last er feil billige, så kjør mange runder.',
      kjerne: 'Svingpunktet ligger i senter av drivhjulet på den siden du svinger mot. Styrehjulene er bak, så bakenden svinger ut til motsatt side. Legg hjulet med svingpunktet tett inntil hindringen, og snu deg for å se bakenden. Planlegg neste hinder mens du er i det forrige.', ndla: ['viktig'] },
    { n: 2, tittel: 'Gafler, tårn og enkel last', mestring: 'Trygg',
      intro: 'Her lærer du å treffe pallen og få den med deg uten å skade den.',
      kjerne: 'Kjør rolig inn med gafler som står rett og i vater, helt inn i pallen. Løft til transporthøyde, ca. 20–30 cm, og tilt masten svakt bakover. Stå rett foran plassen før du løfter. Senk til transporthøyde straks gaflene er ute.', ndla: ['medLast'] },
    { n: 3, tittel: 'Last, stabilitet og krefter', mestring: 'Trygg',
      intro: 'Her skal du kjenne hvorfor reglene finnes. Vi bruker tomme esker og vann i stedet for tung last.',
      kjerne: 'Stabiliteten påvirkes av helning, løftehøyde, svingradius og fart. For tung last får trucken til å «steile». Uten friløftmast hever innermasten seg med en gang du løfter, og trucken blir høyere enn du tror.', ndla: ['feil'] },
    { n: 4, tittel: 'Høyde, reol og presisjon', mestring: 'Ekspert',
      intro: 'Her kjører du som på et ekte lager: last i høyden, liten klaring og ekte lastbærere. Krever grønn kjøretillatelse.',
      kjerne: 'Stå rett foran plassen før du løfter. Ikke kjør med hevet last. Tilt aldri fremover med last i høyden.', ndla: ['medLast', 'tillegg'] },
    { n: 5, tittel: 'Logistikkoppdrag', mestring: 'Ekspert',
      intro: 'Nå er trucken et verktøy i et oppdrag. Du planlegger, håndterer gods riktig og dokumenterer som på en ekte arbeidsplass.',
      kjerne: 'Riktig vare, riktig sted, riktig dokumentasjon – og trygt hele veien.', ndla: [] }
  ];

  const o = (id, f) => Object.assign({ id, slug: 'o-' + id.replace('.', '-'), niva: Number(id[0]) }, f);

  const oppgaver = [
    o('0.1', { tittel: 'Daglig kontroll med kontrollbok', truck: ['T1', 'T2', 'T4'], tid: '20 min (5 min når det sitter)', fase: 'Lær/Øv', fag: 'BT',
      oppdrag: '<p>Gjennomfør daglig kontroll på trucken du skal bruke i dag. Bruk kontrollkortet. Makkeren leser punktene høyt, du viser og forteller. Skriv resultatet og timetelleren inn i kontrollboka.</p><p><b>Stillestående:</b> dekk og hjul · gafler (sprekker, sprik, låsing på gaffelvogna) · kjeder (like stramme) · lekkasjer under trucken · olje- og væskenivå (T4) · batteri og ladeplugg (T1/T2) · instrumentpanel og varsellamper · horn og lys · sikkerhetsbelte.</p><p><b>Funksjonstest i sakte fart:</b> parkeringsbrems · driftsbrems · styring fullt utslag begge veier · løft, senk og tilt til ytterstilling.</p>',
      lykkes: 'Alle punktene er sjekket i riktig rekkefølge, du forklarer <i>hvorfor</i> hvert punkt er viktig, og kontrollboka er ført.',
      dok: 'Utfylt kontrollbok og bilde av kontrollkortet med signatur.', ndla: 'kontroll1' }),
    o('0.2', { tittel: 'Finn feilen!', truck: ['T1', 'T2', 'T4'], tid: '15 min', fase: 'Tenk', fag: 'BT',
      oppdrag: '<p>Læreren har «plantet» tre feil på trucken. Finn dem med daglig kontroll. Skriv for hver feil: hva som er galt, hvorfor det er farlig, og hva du gjør (rette selv, melde fra eller sette trucken ut av drift).</p>',
      lykkes: 'Du finner minst 2 av 3 feil og velger riktig tiltak for hver.' }),
    o('0.3', { tittel: 'Lading av T1 og T2', gml: '206', truck: ['T1', 'T2'], tid: '45 min', fase: 'Lær/Tenk', fag: 'BT',
      oppdrag: '<p>Vis og forklar hvordan T1 og T2 settes på lading, og hva du gjør når ladingen er ferdig. Bruk bilder, video eller lydfiler. Svar også på:</p><ol><li>Hvor mange volt har batteriene på våre T1 og T2? (Les på batteriet.)</li><li>Hvilken gass dannes under lading, og hvilke egenskaper har den?</li><li>Hvilken syrevekt har et fulladet, et halvladet og et utladet batteri?</li><li>Hva er farene ved lading?</li><li>Hva skjer hvis batteriet blir tomt under kjøring?</li><li>Hvilket vann fylles på batteriet, og hvorfor ikke vann fra springen?</li></ol>',
      lykkes: 'Prosessen er riktig og tydelig vist, og farene ved lading er riktig beskrevet.',
      hms: 'Forkle, visir og hansker. Ingen åpen flamme. Ikke kortslutt polene.', ndla: 'kontroll2' }),
    o('0.4', { tittel: 'Motorrommet på T4', gml: '300', truck: ['T4'], tid: '45 min', fase: 'Lær', fag: 'BT',
      oppdrag: '<p>Beskriv hovedkomponentene i motorrommet på en av T4-truckene, og forklar hva hver av dem gjør. Ta med minst: motor · peilepinne for motorolje · kjølevæske · hydraulikktank og peilepinne · startbatteri · luftfilter · drivstoffsystem (propanflaske eller diesel).</p>',
      lykkes: 'Alle komponentene er riktig navngitt og funksjonen riktig forklart. Du vet at motorolje og hydraulikkolje er ulike oljer.',
      hms: 'Motoren er av og kald, og nøkkelen er tatt ut.', dok: 'Bilder med piler og tekst, eller video.', ndla: 'kontroll1' }),
    o('0.5', { tittel: 'Sikkerhetsvideo om truck', gml: 'videooppgave', truck: ['T2', 'T4'], tid: '2–3 økter', fase: 'Voks', fag: 'BT+TLL',
      oppdrag: '<p>I grupper på 2–4 lager dere en video på 5 minutter i tre deler:</p><ol><li>Risiko ved øvingskjøring på skolens område (ca. 1,5 min)</li><li>Truckens funksjoner: løft, tilt, kjøring, bremsing og styring (ca. 2 min)</li><li>Daglig kontroll før bruk (ca. 1,5 min)</li></ol><p>Alle skal være både foran og bak kamera. Bruk verneutstyr i hele opptaket. Lever med et kort refleksjonsnotat (ca. 10 linjer).</p>',
      lykkes: 'Videoen er faglig korrekt, viser trygg atferd og forklarer daglig kontroll.' }),

    o('1.1', { tittel: 'Start, kjør og parker', truck: ['T1', 'T2', 'T4'], tid: '20 min', fase: 'Øv', fag: 'BT',
      oppdrag: '<p>Kjør 15 meter rett frem og stopp mykt ved en kjegle. Rygg tilbake samme vei. Parker trucken korrekt på merket plass.</p>',
      lykkes: 'Myk start og stopp · du snur deg og ser bakover før og under rygging · parkert med gaflene nede, parkeringsbrems på, nøkkel ut eller strøm av · stopp innenfor 30 cm fra kjeglen.',
      dok: 'Observatørens sjekkliste.' }),
    o('1.2', { tittel: 'Åttetall', gml: '201', truck: ['T2'], tid: '30 min', fase: 'Øv', fag: 'BT',
      oppdrag: '<p>Sett opp 2 kjegler med 185 cm avstand midt på gulvet. Kjør i åttetall og hold støttebeina så nær kjeglene som mulig. Øv noen runder, og la makkeren filme én vurderingsrunde fremover og én bakover.</p><p><b>Refleksjon:</b> Hva var vanskeligst (ta med alle elementene)? Hva er ditt beste tips til makkeren?</p>',
      lykkes: 'Jevn fart uten stopp · ingen berøring av kjegler · tydelig skuldersjekk ved rygging.',
      dok: 'Film i Teams og to setninger refleksjon.', ndla: 'viktig' }),
    o('1.3', { tittel: 'Slalåm uten last', gml: '202 (del 1)', truck: ['T4'], tid: '30 min', fase: 'Øv', fag: 'BT',
      oppdrag: '<p>Sett ut 4 kjegler på rekke. Kjør slalåm fremover og bakover uten last til du er trygg i løypa. Vurderingsrunden filmes.</p><p><b>Teori før start:</b> Hvordan gjennomfører du en funksjonstest, og hva tester du? Hva er reglene for personløft med truck? Finn 3 forskrifter som handler om truck, og forklar med egne ord hva de regulerer.</p>',
      lykkes: 'Svingpunktet legges ved kjeglen · bakenden har klaring · gaflene er i transporthøyde hele veien.', ndla: 'viktig' }),
    o('1.4', { tittel: 'Garasjen – svingpunkt og bakende', truck: ['T2', 'T4'], tid: '30 min', fase: 'Øv/Tenk', fag: 'BT',
      oppdrag: '<p>Lag en «garasje» med kjegler: 4 meter dyp og truckens bredde pluss 60 cm, 90 grader på kjøreretningen. Kjør forbi, rygg inn, stopp når gaffelspissene er på linje med åpningen, og kjør ut i motsatt retning. Når det går bra: smalne garasjen til trucken pluss 30 cm.</p><p><b>Tenk:</b> Tegn sporet til drivhjulet og til bakenden. Hvor må du starte svingen for at bakenden skal treffe åpningen?</p>',
      lykkes: 'Maks 2 korrigeringer · ingen kjegler berørt · du kan forklare svingpunktet med tegningen.', ndla: 'viktig' }),
    o('1.5', { tittel: 'Palletruck-løypa', truck: ['T1'], tid: '30 min', fase: 'Øv', fag: 'BT+TLL',
      oppdrag: '<p>Kjør en løype med to 90-gradersvinger, en døråpning (eller to kjegler med trucken pluss 40 cm mellom) og en stopp ved en rampe- eller lastekant. Kjør først uten palle, så med en tom palle. Kjør med gaflene etter deg i trange partier, så du ser hvor du kjører.</p>',
      lykkes: 'Du står eller går på riktig side av styret og aldri foran gaflene · rolig fart i svinger · riktig bruk av dødmannsfunksjonen · ingen støt.',
      hms: 'Hold føttene unna plattformkanten og hjulene.' }),

    o('2.1', { tittel: 'Tom palle fra skapet til flaket og tilbake', gml: '200', truck: ['T4'], tid: '45 min', fase: 'Øv/Tenk', fag: 'BT+TLL',
      oppdrag: '<p>Flytt en tom palle fra skapet til flaket og tilbake igjen. Fortell nøyaktig hva du gjør, hvorfor, og i hvilken rekkefølge: Hvilken høyde har gaflene? Hvordan bruker du tårnet? Er det forskjell på gaffelspredningen når du løfter fra kortsiden og fra langsiden?</p>',
      lykkes: 'Riktig rekkefølge (stilling – tilt rett – inn – løft – tilt bak – rygg ut med blikket bakover) · gaflene spredt så bredt pallen tillater · riktige fagord.',
      dok: 'Film med forklaringen din som lyd, i Teams. Kan gjøres i makkerpar.', ndla: 'medLast' }),
    o('2.2', { tittel: 'Instruksjon: tårn og gafler på T4', gml: '209', truck: ['T4'], tid: '60 min', fase: 'Tenk/Voks', fag: 'TLL',
      oppdrag: '<p>Lag en instruksjon til makkeren om riktig bruk av tårn og gafler på T4. Den skal minst vise:</p><ol><li>Stillingen til tårn og gafler ved parkering</li><li>Tårn og gafler under kjøring, med og uten last</li><li>Tårn og gafler når pallen står skjevt – både når den heller mot deg og fra deg</li></ol>',
      lykkes: 'En makker kan følge instruksjonen uten hjelp. Test den på en makker før innlevering.',
      dok: 'Word-dokument med tekst og bilder, eller video.', ndla: 'medLast' }),
    o('2.3', { tittel: 'Sett ut paller med maks 5 cm avstand', gml: '203', truck: ['T4', 'T2'], tid: '45 min', fase: 'Øv', fag: 'BT+TLL',
      oppdrag: '<p>En stabel på 5 paller står i nordre del av plassen. Merk opp en passasje: truckens bredde pluss 300 mm, ca. 4 meter lang. Sett pallene ut én og én på bakken med maks 5 cm mellomrom. Pallene skal løftes, ikke skyves. Ta pallene både fra kortsiden og fra langsiden.</p><p><b>Refleksjon:</b> Hva var vanskeligst? Hvilke tips vil du gi makkeren?</p>',
      lykkes: 'Alle avstander er 5 cm eller mindre · ingen palle er dyttet langs bakken · ingen berøring av passasjen.',
      dok: 'Bilder eller film der en tommestokk viser avstanden.' }),
    o('2.4', { tittel: 'Skjeve paller – kortside og langside', truck: ['T2', 'T4'], tid: '30 min', fase: 'Øv', fag: 'BT',
      oppdrag: '<p>Læreren setter ut 4 tomme paller: to står skjevt (ca. 15 grader), én skal tas fra langsiden, og én står på et lite underlag slik at den heller. Hent alle fire og sett dem rett på en merket linje.</p>',
      lykkes: 'Trucken rettes opp <i>før</i> gaflene går inn – ikke inne i pallen · riktig gaffelspredning for kortside og langside · ingen klosser skadet.' }),

    o('3.1', { tittel: 'Slalåm med last', gml: '202 (del 2)', truck: ['T4'], tid: '30 min', fase: 'Øv/Tenk', fag: 'BT+TLL',
      oppdrag: '<p>Kjør slalåmløypa fra 1.3 fremover og bakover med et betonglodd på pall som er over 60 cm høyt totalt. Lasten i transporthøyde, masten tiltet bakover.</p><p><b>Refleksjon:</b> Hva var forskjellen med og uten last? Hvis du skulle gitt ett godt råd om øvelsen, hva ville det vært?</p>',
      lykkes: 'Lavere fart enn uten last · rygger der lasten tar sikten · ingen kritiske feil · refleksjonen nevner tyngdepunkt og svingradius.',
      dok: 'Word, TikTok, film e.l. Alle spørsmålene fra 1.3 og 3.1 skal være besvart.', ndla: 'feil' }),
    o('3.2', { tittel: 'May the FORCE be with you', gml: '205', truck: ['T4'], tid: '2 økter', fase: 'Tenk/Voks', fag: 'BT+TLL',
      oppdrag: '<p><b>Før start:</b> Hva er friløftet på våre T4-trucker? Hva er maks last, og hvor mye kan du løfte med masten i høyeste posisjon? Legg ved lastdiagrammet med forklaring.</p><p>Last tomme esker løst på en palle, høyere enn masten. Sett opp en kort løype som viser de tre kreftene som virker på truck og last. Lag én film per kraft der det kommer tydelig frem hva som kan gå galt. Lag også en film der du kjører rolig over plassen én gang med lav og én gang med høy last, og beskriv forskjellen.</p>',
      lykkes: 'Alle tre kreftene er vist og forklart, farene er tydelige, og du forklarer hva føreren gjør for å unngå skade.',
      hms: 'Risikovurdering lages på forhånd og godkjennes av læreren. Området sperres av. Bare tomme esker. Gangfart. «Høy» kjøring med maks 50 cm løftehøyde.', ndla: 'feil' }),
    o('3.3', { tittel: 'Lastdiagram og friløft i praksis', truck: ['T2', 'T4'], tid: '45 min', fase: 'Lær/Tenk', fag: 'BT',
      oppdrag: '<ol><li>Finn typeskiltet og lastdiagrammet. Skriv ned nominell kapasitet, lastsenteravstand og maks løftehøyde.</li><li>Mål friløftet: løft gaflene sakte uten last mens makkeren måler hvor høyt de kommer før innermasten begynner å stige.</li><li>Mål truckens totale høyde med masten nede og med gaflene på 2 meter. Sammenlign med porter og dører på kjøreruten.</li><li>Læreren gir tre laster med vekt og mål. Bruk lastdiagrammet: Kan lasten løftes, og til hvilken høyde?</li></ol>',
      lykkes: 'Riktige avlesninger · du forklarer at lengre lastsenter og høyere løft gir lavere kapasitet · alle tre vurderingene er riktige.', ndla: 'feil' }),
    o('3.4', { tittel: 'Vannglasset', truck: ['T2', 'T4'], tid: '30 min', fase: 'Øv', fag: 'BT+TLL',
      oppdrag: '<p>Sett et plastglass med vann til en strek midt på en palle. Kjør en løype med to svinger, én full stopp og én rygging, og sett pallen av på merket plass. Mål vannet som er igjen.</p>',
      lykkes: 'Under 1 cm vann er sølt · ingen feilpoeng.' }),
    o('3.5', { tittel: 'Balansering 1', gml: '207', truck: ['T4'], tid: '30 min', fase: 'Øv', fag: 'BT',
      oppdrag: '<p>3 europaller ligger stablet. Bygg sluttresultatet som på bildet fra læreren. Du sitter i trucken hele tiden. Makkeren tar tiden fra start til ferdig. Skriv ned hva du kan gjøre bedre, prøv igjen, og skriv hva som gikk bedre.</p>',
      lykkes: 'Ingen kritiske feil · andre forsøk er raskere <i>og</i> har like få eller færre feilpoeng.',
      dok: 'Word-dokument med bilder og begge tidene. Juks gir diskvalifikasjon.' }),

    o('4.1', { tittel: 'Innlagring i reol med skyvemast', truck: ['T2'], tid: '45 min', fase: 'Øv', fag: 'BT+TLL',
      oppdrag: '<p>Lagre inn 3 paller på lokasjonene du får (f.eks. A-01-1, A-02-2, A-03-3), og hent dem ut i omvendt rekkefølge. Kjør frem til reolen, løft til riktig høyde, skyv masten frem, senk pallen på bjelkene, trekk masten tilbake og senk.</p>',
      lykkes: 'Trucken står rett foran plassen <i>før</i> løftet · ingen kjøring med hevet last · pallen har lik avstand til bjelker og stolper og stikker ikke ut bak · riktig lokasjon hver gang.',
      hms: 'Ingen personer i reolgangen. Sjekk bjelkens bæreevne på skiltet. Lett last de første rundene.', ndla: 'medLast' }),
    o('4.2', { tittel: 'Høystabling med T4', truck: ['T4'], tid: '45 min', fase: 'Øv/Tenk', fag: 'BT+TLL',
      oppdrag: '<p>Sett 3 paller med lett last (tomme esker) i reol eller på stabel i tre høyder. Før du starter: les av lastdiagrammet hvor mye trucken tåler på øverste nivå (se 3.3).</p>',
      lykkes: 'Masten tiltes rett før pallen skyves inn, aldri fremover med last i høyden · løftet er helt i ro før trucken kryper inn · du ser opp på lasten under løftet · senker til transporthøyde før du svinger bort.', ndla: 'medLast' }),
    o('4.3', { tittel: 'Balansering 2', gml: '208', truck: ['T4'], tid: '45 min', fase: 'Øv', fag: 'BT',
      oppdrag: '<p>5 europaller ligger stablet. Bygg sluttresultatet som på bildet fra læreren. Du sitter i trucken hele tiden. Tiden stopper når trucken er parkert korrekt med gaflene nede. Skriv ned hva som kan forbedre tiden, prøv igjen og beskriv hva som gikk bedre. Makkeren tar tiden.</p><p><b>Konkurranse:</b> tid + 10 sekunder per feilpoeng. Juks gir diskvalifikasjon.</p>',
      lykkes: 'Ingen kritiske feil · konstruksjonen står støtt · tid og feilpoeng er ført for begge forsøk.',
      hms: 'Ingen klatring på palleoppbyggingen.' }),
    o('4.4', { tittel: 'Lastbærere og langgods', truck: ['T4'], tid: '45 min', fase: 'Øv/Tenk', fag: 'TLL',
      oppdrag: '<p>Flytt tre ulike lastbærere fra A til B: en europall, en gitterboks (eller engangspall) og langgods (f.eks. planker eller rør over 3 meter). Forklar for hver last hvordan du sprer gaflene, hvor tyngdepunktet ligger og hva risikoen er.</p><p><b>Tenk:</b> Hvilket tilleggsutstyr ville gjort hver av jobbene tryggere? Se NDLA-ressursen.</p>',
      lykkes: 'Langgodset kjøres sentrert og lavt, med ekstra klaring i svinger · du velger fornuftig tilleggsutstyr.',
      hms: 'Langgods har stort svingutslag i begge ender. Observatøren går foran med god avstand.', ndla: 'tillegg' }),

    o('5.1', { tittel: 'Varemottak og innlagring', truck: ['T1', 'T2', 'T4'], tid: '90 min', fase: 'Øv/Tenk', fag: 'TLL',
      oppdrag: '<p>En «leveranse» med 4 paller og en følgeseddel kommer inn. Det kan være en feil i leveransen.</p><ol><li>Ta imot: kontroller antall, merking og skader mot følgeseddelen, og noter avvik.</li><li>Flytt pallene fra mottak til buffer med T1.</li><li>Lagre dem inn på tildelte lokasjoner med T2 eller T4.</li><li>Før lokasjon og avvik på mottaksskjemaet.</li></ol>',
      lykkes: 'Avviket er funnet og riktig behandlet · alle paller på riktig lokasjon · ingen kritiske feil · skjemaet er komplett.' }),
    o('5.2', { tittel: 'Ordreplukk og klargjøring for utlevering', truck: ['T1', 'T2'], tid: '90 min', fase: 'Øv', fag: 'TLL',
      oppdrag: '<p>Du får en plukkliste med 3 ordrelinjer fra ulike lokasjoner. Hent varene, bygg en stabil blandpall (tungt nederst, jevn høyde), sikre med strekkfilm, merk med ordrenummer og mottaker, og sett den i utleveringssonen.</p>',
      lykkes: 'Riktige varer og antall · pallen tåler en forsiktig «ristetest» · merkingen er lesbar fra to sider · effektiv rute.' }),
    o('5.3', { tittel: 'Lasting av kjøretøy eller flak', truck: ['T4', 'T1'], tid: '90 min', fase: 'Øv/Tenk', fag: 'TLL',
      oppdrag: '<p>Lag en lasteplan som viser vektfordeling og rekkefølge (sist inn, først ut). Last 4–6 paller på flaket eller i kjøretøyet etter planen, og last av igjen i motsatt rekkefølge.</p>',
      lykkes: 'Kjøretøyet er sikret mot å flytte seg (brems, kiler, dokklås) før lasting · lasten står etter planen, tett og jevnt fordelt · du forklarer hvordan lasten skal sikres før transport (kap. 5).',
      hms: 'Sjekk at rampe, kjørebro og kjøretøy tåler truck pluss last. Ingen personer i lasterommet mens trucken kjører inn.' }),
    o('5.4', { tittel: 'Bananpallen til Eik-bygget', gml: '204', truck: ['T4'], tid: '2 økter', fase: 'Tenk', fag: 'BT+TLL',
      oppdrag: '<p><b>Før start:</b> Hva er grensen for skadelig støy? Hvilke kontroller av truck er lovpålagt, hva inngår i dem og hvem utfører dem? Hva inngår i begrepet «ytre miljø»?</p><p>En palle med løse bananesker skal fra lageret til Eik-bygget. Eskene fyller hele pallen og er 2 meter høye. Totalvekt 1250 kg. Lag en risikovurdering på NLFs hjemmeside der oppdraget er delt i mindre deler. Hvilke regler gjelder? Hva må du passe på? Hvordan ville du utført oppdraget? Legg ved et bilde av trucken med lasten slik den skulle sett ut ved avgang. Lasten skal <b>ikke</b> kjøres til Eik-bygget.</p>',
      lykkes: 'Farene er identifisert, regelverket er riktig og trucken med last er riktig klargjort før «avgang».', ndla: 'kontroll2' }),
    o('5.5', { tittel: 'Instruktøren', truck: ['T1', 'T2', 'T4'], tid: '45 min', fase: 'Voks', fag: 'BT+TLL',
      oppdrag: '<p>Lær bort én øvelse fra nivå 1 eller 2 til en elev som er ny på trucken (under lærerens tilsyn). Bruk instruksjonsmodellen: forbered, demonstrer, la eleven prøve, følg opp.</p>',
      lykkes: 'Du forklarer HMS-reglene før start, demonstrerer riktig, gir konkret tilbakemelding og stopper øvelsen ved feil. Den nye eleven klarer øvelsen etterpå.' }),
    o('5.6', { tittel: 'Mesterprøven', truck: ['T1', 'T2', 'T4'], tid: '30–40 min per elev', fase: 'Voks', fag: 'BT+TLL',
      oppdrag: '<p>Et sammensatt oppdrag du gjør alene mens læreren observerer:</p><ol><li>Daglig kontroll av T4 med ført kontrollbok</li><li>Hent en palle i mottak med T1 og kjør den til buffer gjennom palletruck-løypa</li><li>Lagre pallen inn på en gitt lokasjon i høyde med T2 eller T4</li><li>Hent en annen palle fra lokasjon og last den på flaket</li><li>Parker alle truckene korrekt og forklar muntlig ett valg du tok underveis</li></ol>',
      lykkes: 'Ingen kritiske feil · høyst 3 feilpoeng totalt · riktig lokasjon og dokumentasjon.' })
  ];

  const km = {
    BT: { kode: 'KM4561', fag: 'Bransjeteknikk', tekst: 'betjene truck i klassene T1, T2 og T4 etter gjeldende opplæringsplan og regelverk', blikk: 'Fører' },
    TLL: { kode: 'KM4550', fag: 'Transport, logistikk og løfteoperasjoner', tekst: 'håndtere og transportere varer med truck etter gjeldende forskrifter', blikk: 'Oppdrag' }
  };

  const kritiske = ['rygger uten å se bakover', 'kjører med last høyt hevet', 'person i faresonen uten at føreren stopper', 'forlater trucken med hevede gafler eller uten parkeringsbrems', 'kjører på hindring med last', 'bruker ikke sikkerhetsbelte på truck som har det'];
  const feilpoeng = ['gaffelspisser i bakken', 'kjegle berørt (uten last)', 'palle skjev eller dyttet', 'masten ikke tiltet bakover under transport', 'rykkvis kjøring eller unødvendige korrigeringer', 'glemt horn eller tegn ved uoversiktlige steder'];

  return { ndla, nivaer, oppgaver, km, kritiske, feilpoeng };
})();
