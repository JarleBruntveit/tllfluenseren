/* =====================================================================
   ORDBOK OG STIKKORD – Transport, logistikk og løfteoperasjoner (Vg2)
   Alle forklaringer er egenprodusert for TLLfluenseren og skrevet med egne ord.
   Oppslagsordene og sidetallene viser til ordboka og stikkordregisteret i elevens
   egen lærebok (TLL Vg2). Ingen forklaringstekst er kopiert fra boka.

   Format per linje:  Ord | Forklaring | Tema | Sider i læreboka | Kilde | Søkeord
     Tema:   se TEMA under
     Sider:  «24» eller «122, 135–148» (tomt = ingen sidehenvisning)
     Kilde:  O = ordboka bakerst i boka, S = stikkordregisteret, OS = begge
             (B legges til automatisk når ordet også står i stikkordregisteret i Bransjelære)
     Søkeord: andre ord og skrivemåter, skilt med komma
   Legg til nye ord ved å skrive en ny linje. Rekkefølgen spiller ingen rolle.
   ===================================================================== */
window.TLLORD = window.TLLORD || {};

TLLORD.TEMA = {
  L: { navn: 'Lager og terminal', ndla: ['Drift på terminal og lager', 'https://ndla.no/nb/e/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/drift-pa-terminal-og-lager/3e3d0bf6c9'] },
  T: { navn: 'Transportoppdrag og regelverk', ndla: ['Godshåndtering (Planlegging av oppdrag)', 'https://ndla.no/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/godshandtering/1154893d7c'] },
  P: { navn: 'Persontransport og service' },
  E: { navn: 'Emballering og merking', ndla: ['Emballering og klargjøring', 'https://ndla.no/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/emballering-og-klargjoring/05e70b9d62'] },
  S: { navn: 'Lastsikring og krefter', ndla: ['Sikring av last', 'https://ndla.no/nb/e/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/sikring-av-last/63c9b82c0d'] },
  U: { navn: 'Lasting, utstyr og truck', ndla: ['Tekniske hjelpemidler (Lasting og lossing)', 'https://ndla.no/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/tekniske-hjelpemidler/14bfa0c7a3'] },
  F: { navn: 'Førstehjelp og HMS', ndla: ['Førstehjelp og skadestedsledelse', 'https://ndla.no/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/forstehjelp-ved-hodeskader/c472da26b3'] },
  I: { navn: 'Internasjonal handel og toll', ndla: ['Internasjonale transporter', 'https://ndla.no/e/bransjelare-tp-tol-vg2---ressurssamling/internasjonale-transporter/9fc6c63b95'] },
  K: { navn: 'Økonomi, forsikring og avtaler', ndla: ['Økonomiske kalkyler og prisberegninger', 'https://ndla.no/e/bransjelare-tp-tol-vg2---ressurssamling/okonomiske-kalkyler-og-prisberegninger/a36ee8e1da'] },
  B: { navn: 'Etablering og drift av bedrift', ndla: ['Etablering og drift av virksomhet', 'https://ndla.no/e/bransjelare-tp-tol-vg2---ressurssamling/etablering-og-drift-av-virksomhet/a5b7718286'] },
  A: { navn: 'Arbeidsliv, lover og etikk', ndla: ['Plikter og rettigheter i arbeidslivet', 'https://ndla.no/e/bransjelare-tp-tol-vg2---ressurssamling/plikter-og-rettigheter-i-arbeidslivet/e7ae78ef91'] },
  H: { navn: 'Helse og livsstil', ndla: ['Kosthold og helse', 'https://ndla.no/e/bransjelare-tp-tol-vg2---ressurssamling/kosthold-og-helse/2a9ef4cddb'] },
  N: { navn: 'Samferdsel og infrastruktur' },
  D: { navn: 'Digitale systemer og sporing' },
  M: { navn: 'Miljø og avfall' },
  O: { navn: 'Organisasjoner og standarder' }
};

/* Kapitlene i lærebøkene (sideintervaller brukes til å finne kapittel ut fra sidetall). */
TLLORD.KAPITLER = [
  { nr: 1, fra: 1,   til: 38,  tittel: 'Grunnleggende prinsipper ved lager- og terminalarbeid', sti: '../kap1/' },
  { nr: 2, fra: 39,  til: 71,  tittel: 'Planlegging av oppdrag' },
  { nr: 3, fra: 72,  til: 96,  tittel: 'Service og kundebehandling' },
  { nr: 4, fra: 97,  til: 116, tittel: 'Emballering, merking og klargjøring av gods' },
  { nr: 5, fra: 117, til: 158, tittel: 'Sikring av last etter gjeldende forskrifter', sti: '../kap5/' },
  { nr: 6, fra: 159, til: 172, tittel: 'Metoder for sikre laste-, losse- og løfteoperasjoner' },
  { nr: 7, fra: 173, til: 200, tittel: 'Bruk og vedlikehold av arbeidsutstyr' },
  { nr: 8, fra: 201, til: 214, tittel: 'Sikring av skadested og førstehjelp' },
  { nr: 9, fra: 215, til: 230, tittel: 'Håndtering og transport av varer med truck' }
];

TLLORD.KAPITLER_BL = [
  { nr: 1,  fra: 1,   til: 46,  tittel: 'Etablering, ledelse og økonomisk styring' },
  { nr: 2,  fra: 47,  til: 76,  tittel: 'Lover, regler, forsikringsordninger og yrkesetiske normer' },
  { nr: 3,  fra: 77,  til: 96,  tittel: 'Bærekraftig utvikling, miljøvennlig drift og grønn logistikk' },
  { nr: 4,  fra: 97,  til: 122, tittel: 'Helse-, miljø-, sikkerhets- og kvalitetsarbeid' },
  { nr: 5,  fra: 123, til: 134, tittel: 'Kosthold, fysisk helse og livsstilsykdommer' },
  { nr: 6,  fra: 135, til: 180, tittel: 'Transport- og logistikkbransjens grunnelementer' },
  { nr: 7,  fra: 181, til: 216, tittel: 'Prosedyrer ved internasjonale transportoppdrag' },
  { nr: 8,  fra: 217, til: 256, tittel: 'Verdikjede fra produksjon til sluttbruker – og gjenvinning' },
  { nr: 9,  fra: 257, til: 270, tittel: 'Økonomiske kalkyler og prisberegninger' },
  { nr: 10, fra: 271, til: 293, tittel: 'Et likeverdig og inkluderende yrkesfellesskap' }
];

TLLORD.BOKER = {
  tll: { navn: 'TLL', lang: 'Transport, logistikk og løfteoperasjoner', ikon: '📖', kapitler: TLLORD.KAPITLER },
  bl:  { navn: 'Bransjelære', lang: 'Bransjelære', ikon: '📗', kapitler: TLLORD.KAPITLER_BL,
         ndlaFag: 'https://ndla.no/f/bransjelare-tp-tol-vg2---ressurssamling/5c1eeb1e84d6' }
};

TLLORD.NDLA_SOK = 'https://ndla.no/search?query=';
TLLORD.NDLA_FAG = 'https://ndla.no/nb/f/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/636ca61808a8';
TLLORD.NDLA_ORDLISTE = 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/ordliste-for-lager-og-logistikk/0924071fc5';

TLLORD.RAA = `
ABC-analyse|Metode for å dele varer, kunder eller leverandører i tre grupper etter hvor mye de selges eller plukkes. A-gruppen er viktigst, C-gruppen minst viktig.|L||O|prioritering, A-varer, C-varer
ABCDE-tilnærmingen|Fast rekkefølge for å undersøke en skadd person: A luftveier, B pust, C sirkulasjon, D bevissthet og E skader og nedkjøling.|F|206–209|S|førstehjelp, undersøkelse
ADR|Europeisk avtale med regler for transport av farlig gods på veg. Sjåføren trenger eget ADR-kompetansebevis, og bilen skal merkes med oransje skilt.|T|40|OS|farlig gods, ADR-regelverket
Adressert postsending|Postsending som har navnet og adressen til mottakeren på seg.|D||O|post
Aksellast|Hvor mye vekt som hviler på én aksel på kjøretøyet. Hver veg har en grense for hvor stor aksellast den tåler.|T||O|akseltrykk, bruksklasse
Akselerasjonskraft|Kraften som skyver lasten bakover når kjøretøyet setter fart.|S|124–125|S|treghetskraft, gasse
Aksesspunkt|Tjeneste som fungerer som et elektronisk postkontor når bedrifter sender og tar imot fakturaer elektronisk.|D||O|e-faktura, EHF
Aktivitetserklæring|Skjema som dokumenterer perioder sjåføren ikke har kjørt, når dette ikke er registrert på sjåførkortet.|T|55–56|S|fravær, kjøre- og hviletid
AMK-sentral|Akuttmedisinsk kommunikasjonssentral. Det er dit du kommer når du ringer 113.|F|204|S|113, ambulanse
Anleggsmiddel|Noe en bedrift eier og bruker i mer enn ett år, for eksempel en lastebil, en truck eller en lagerhall.|K||O|eiendel, investering
Arbeidsmiljøloven|Loven om arbeidsmiljø, arbeidstid og stillingsvern. Forkortes AML.|F|216|OS|AML, arbeidstid
Arbeidsplassforskriften|Forskrift om hvordan arbeidsplasser skal være innredet, for eksempel lys, gangveier, merking og skilt.|F|222–223|S|
Arbeidstidsforskriften|Forskrift om arbeidstid for sjåfører og andre som jobber i vegtransport.|T|60–61|S|arbeidstid
Artikkelnummer|Unikt nummer for en vare som brukes i handel over hele verden. Kalles også GTIN (tidligere EAN). Står som strekkode på varen.|D||O|GTIN, EAN, varenummer
ATP|Internasjonal avtale om transport av matvarer som lett blir dårlige, og om krav til kjøle- og fryseutstyret.|T||O|kjøletransport, termotransport
Automatkjetting|Snøkjetting som slås ut under drivhjulene med en bryter i førerhuset.|U|189–190|S|kjetting, vinterkjøring
AutoStore|Automatisk lagersystem der roboter henter varer i kasser som står stablet i et rutenett.|L|27|S|automatisering, robotlager
A-vilkår|Forsikring med full dekning: den gjelder alle farer, bortsett fra force majeure.|K||O|forsikring
Avbrutt døgnhvil|Regel som gir lov til å avbryte døgnhvilen når sjåføren følger bilen på ferje eller tog.|T|51|S|ferjeregelen
Avrop|Bestilling av en del av en større mengde som er avtalt på forhånd, når kunden trenger det.|L|19|S|bestilling
Avsender|Den som sender godset og inngår fraktavtalen med fraktføreren.|T|11, 113|S|
AETR-avtalen|Avtale om kjøre- og hviletid ved internasjonal transport til land utenfor EU/EØS.|T|48, 59|S|kjøre- og hviletid
B2B|Business to Business: handel mellom bedrifter.|K||O|
B2C|Business to Consumer: salg fra bedrift til privatpersoner, for eksempel netthandel.|K||O|netthandel
B2G|Business to Government: handel mellom bedrifter og det offentlige.|K||O|
Bakløfter|Løfteplattform bak på lastebilen som brukes til lasting og lossing. Kalles også lastelem.|U|198–199|S|lastelem, baklift
Banetransport|Transport på jernbane.|T|40|S|jernbane, tog
Barn som reiser alene|Barn uten voksne trenger ekstra omsorg: sjåføren følger med på at de går av riktig sted.|P|90|S|
Befordringsvedtekter|Reglene som gjelder for passasjerer på en kollektivreise. Trafikkselskapet skal kunne vise dem fram. Kalles også transportvilkår.|P||O|transportvilkår
Berusede passasjerer|Passasjerer som er påvirket av rus. Sjåføren skal ivareta sikkerheten for alle om bord.|P|91|S|rus
Bestillingspunkt|Lagernivået der du må bestille mer av en vare, slik at lageret ikke går tomt før den nye leveransen kommer.|L||O|sikkerhetslager, etterfylling
Bevilling|Offentlig tillatelse til å gjøre noe som ellers ikke er lov. Andre ord for det samme er konsesjon, lisens og løyve.|K||O|tillatelse, løyve, konsesjon
Bidragskalkyle|Prisberegning der prisen dekker alle variable kostnader, men bare en del av de faste. Brukes for eksempel for å fylle en bil som ellers ville kjørt tom.|K||O|kalkyle, dekningsbidrag
Biologisk avfall|Avfall fra sykehus og operasjoner som må behandles for seg.|M||O|
Blinde og svaksynte|Passasjerer som ser dårlig. God service er å si fra om holdeplasser og hjelpe uten å ta over.|P|87–88|S|synshemming
Blokkering av last|Lasten sikres ved at den står tett inntil faste vegger, stolper, bommer eller annen last, slik at den ikke kan flytte seg.|S|121–123, 129, 131–134, 149–156, 183|S|lastsikring, blokkere
Blødningssjokk|Livstruende tilstand når kroppen har mistet mye blod. Stans blødningen, legg personen ned, hold varmen og ring 113.|F|209, 213–214|S|sjokk, blødning
BLÅS|Huskeregel i førstehjelp: Bevissthet, Luftveier, Åndedrett og Sirkulasjon.|F|209|S|BLÅS-tilnærmingen, huskeregel
Bonus|Rabatt på forsikringen når du ikke har hatt skader. Det motsatte er malus.|K||O|forsikring
Bremsekraft|Kraften som skyver lasten framover når kjøretøyet bremser. Derfor er kravet til lastsikring størst framover.|S|124–125|S|bråbrems, treghetskraft
Bremselengde|Strekningen kjøretøyet trenger for å stoppe etter at du har begynt å bremse. Blir mye lengre på glatt føre og ved høy fart.|U|184|S|veggrep, stopplengde
Bruksforskriften|Forskrift om bruk av kjøretøy, med regler om blant annet vekt, mål og sikring av last.|S|62, 118–121|S|forskrift om bruk av kjøretøy
Bruksklasse (Bk)|Viser hvor tunge kjøretøy en veg tåler, for eksempel Bk10. Står i veglistene.|T|46|S|veglister, aksellast
Bulk|Gods som fraktes løst uten emballasje, for eksempel korn, sand og grus. Våtbulk er væsker, tørrbulk er faste masser.|L||O|bulkgods, løsmasser, tank
Butikklager|Lageret i butikken, der varene står klare til å fylles på hyllene.|L|13|S|
Bølgepapp|Papp med et bølget lag inni. Den er sterk, lett og demper støt. Brukes i de fleste pappesker.|E|105|S|kartong, papp
CAD|Cash Against Documents: kjøperen får transportdokumentene i banken når hun betaler.|I||O|betaling
Celleproduksjon|Produksjon der et lite lag (en arbeidscelle) har ansvaret for å lage én eller noen få deler. Brukes i JIT-produksjon.|K||O|JIT
CE-merke|Merke som viser at produktet oppfyller kravene til sikkerhet, helse og miljø i EU/EØS.|E|111, 227|OS|CE-merking
CEMT|Fransk forkortelse for Den europeiske transportministerkonferansen (engelsk: ECMT). Heter i dag ITF.|O||O|ECMT, ITF
CEMT-tillatelse|Tillatelse til å kjøre internasjonal godstransport i land som er med i CEMT-samarbeidet, også utenfor EØS.|I||O|tillatelse
CEN|Den europeiske standardiseringsorganisasjonen. Lager europeiske standarder (EN), for eksempel for lastsikringsutstyr.|O|226|OS|standard, EN
CENELEC|Den europeiske standardiseringsorganisasjonen for elektriske og elektroniske produkter.|O||O|standard
CFR|Cost and Freight. Incoterm for sjøtransport: selgeren betaler frakten til havnen i mottakerlandet, men risikoen går over til kjøperen når varen er om bord.|I||O|Incoterms
CIF|Cost, Insurance and Freight. Incoterm for sjøtransport: som CFR, men selgeren tegner også forsikring på varen.|I||O|Incoterms
CIM|Internasjonale regler for avtaler om godstransport med jernbane. Er en del av COTIF.|I||O|jernbane, COTIF
CIP|Carriage and Insurance Paid to. Incoterm: selgeren betaler frakt og forsikring fram til avtalt sted.|I||O|Incoterms
CMR|Internasjonal avtale (konvensjon) om godstransport på veg mellom land. Bestemmer blant annet ansvar og hva som skal stå i fraktbrevet.|I|31|OS|CMR-konvensjonen
CMR-fraktbrev|Standard fraktbrev for internasjonal vegtransport, laget etter CMR-konvensjonen.|I||O|fraktbrev
COD|Cash on Delivery: kjøperen betaler varen når den blir levert. Kalles også etterkrav.|K||O|etterkrav
COP|Conformity of Production: dokument fra produsenten som viser at kjøretøyet oppfyller en bestemt miljøstandard, for eksempel Euro VI.|T||O|Euro VI, miljøklasse
COTIF|Internasjonal avtale om jernbanetransport. CIM-reglene er en del av den.|I||O|jernbane
CPT|Carriage Paid To. Incoterm: selgeren betaler frakten fram til avtalt sted, men kjøperen bærer risikoen og må forsikre selv.|I||O|Incoterms
Crossdocking|Gods som kommer inn på terminalen, lastes rett over til utgående biler uten å lagres. Sparer tid og lagerplass.|L|24|OS|kryssdokking, omlasting
CUSDEC|Standardmelding for å sende tolldeklarasjoner elektronisk.|I||O|toll, EDI, EDIFACT
C-vilkår|Forsikring med begrenset dekning: den dekker bare skade når transportmidlet havarerer.|K||O|forsikring
DAP|Delivered at Place. Incoterm: selgeren sørger for transport fram til avtalt sted. Kjøperen tar seg av fortollingen.|I||O|Incoterms
DAT|Delivered at Terminal. Incoterm fra 2010-versjonen. I Incoterms 2020 er den erstattet av DPU (Delivered at Place Unloaded).|I||O|DPU, Incoterms
DDP|Delivered Duty Paid. Incoterm der selgeren tar alt ansvar: transport, risiko og fortolling helt fram til kjøperen.|I||O|Incoterms
Deklarant|Den som leverer tolldeklarasjonen til Tolletaten.|I||O|toll
Dekningsbidrag|Det som er igjen av prisen når de variable kostnadene er trukket fra. Skal dekke de faste kostnadene og gi fortjeneste.|K||O|kalkyle
Delkasko|Bilforsikring som dekker mer enn ansvarsforsikringen, typisk brann, tyveri og glasskader, men ikke skader du selv lager på bilen.|K||O|forsikring, kasko
Detaljistlager|Lager hos detaljisten, altså butikken som selger til forbrukerne.|L|13|S|
Diabeteskoma|Livstruende tilstand hos en person med diabetes når blodsukkeret blir svært høyt. Ring 113.|F|85|S|diabetes
Direktesurring|Hver surring går fra lasten direkte til et surringsfeste på kjøretøyet.|S|122, 135, 146–148|S|surring, kryssurring
D-pak|Detaljistenhet: forpakningen butikken får varene i, for eksempel en kartong med tolv bokser.|E|23, 99–100, 102, 107, 167|OS|detaljistforpakning
Døgnhvil|Den sammenhengende hvilen sjåføren skal ha i løpet av hvert døgn.|T|50–51|S|kjøre- og hviletid, hvile
Døve og hørselssvekkede|Passasjerer som hører dårlig. Skriftlig informasjon, tydelig munnbilde og teleslynge hjelper.|P|88|S|hørselshemming
EANCOM|Dagligvarebransjens standard for elektroniske handelsmeldinger, bygd på EDIFACT.|D||O|EDI
ECMT|Engelsk forkortelse for Den europeiske transportministerkonferansen (fransk: CEMT). Heter i dag ITF.|O||O|CEMT, ITF
EDI|Electronic Data Interchange: bedrifter sender ordrer, fakturaer og fraktbrev direkte mellom datasystemene sine i et fast format.|D||O|EDU, elektronisk datautveksling
EDIFACT|FNs standard for elektroniske handelsmeldinger, for eksempel faktura, fraktbrev og tolldeklarasjon.|D||O|EDI
EDU|Elektronisk datautveksling – det norske navnet på EDI.|D||O|EDI
Eldre passasjerer|Eldre kan trenge god tid, hjelp ved på- og avstigning og rolig kjøring.|P|89–90|S|
Elektrostatisk utladning|Liten gnist av statisk elektrisitet som kan ødelegge elektronikk.|E|106|S|ESD, statisk elektrisitet
Emballasjeavfall|Emballasje som blir avfall når varen er pakket ut. Skal sorteres slik at materialet kan gjenvinnes.|M|115|OS|kildesortering, gjenvinning
Emballering|Å pakke varer slik at de er beskyttet og lette å håndtere under lagring og transport.|E|98–99|S|emballasje, pakking
Endimensjonal strekkode|Vanlig strekkode med streker i én retning. Den har plass til lite informasjon, for eksempel bare artikkelnummeret.|D||O|strekkode
Enhetsblankett|EUs felles skjema for tolldeklarasjon. Kalles også SAD.|I||O|SAD, toll
Enhetslast|Gods som er samlet på en pall eller i en konteiner, slik at det kan håndteres som én enhet.|L|182|OS|lastbærer, pall
Epilepsianfall|Anfall med kramper eller fravær. Beskytt hodet, ikke hold personen fast, og legg vedkommende i stabilt sideleie etterpå.|F|85|S|kramper
ERP-system|Dataprogram som styrer hele bedriften i én database: innkjøp, lager, ordre, økonomi og fakturering.|D|14|OS|forretningssystem, OLFI
ESD-emballasje|Emballasje som beskytter elektronikk mot statisk elektrisitet. ESD betyr elektrostatisk utladning.|E|106|O|antistatisk, elektrostatisk utladning
ETSI|Den europeiske standardiseringsorganisasjonen for telekommunikasjon.|O||O|standard
Etylen|Gass som frukt og grønnsaker skiller ut, og som får andre varer til å modne fortere. Viktig å vite ved samlasting av mat.|T|69–70|S|matvaretransport, modning
EUR-pall|Europall: standardpall på 80 × 120 cm som brukes i hele Europa.|L|22, 101–102, 108, 163, 166|OS|europall, pall
EXW|Ex Works. Incoterm der kjøperen henter varen hos selgeren og tar alt ansvar og all risiko fra fabrikken.|I||O|Incoterms
Fartsskriver|Apparat i kjøretøyet som registrerer fart, kjøretid og hviletid. Sjåføren setter inn sjåførkortet sitt.|T|43, 54, 57–59|S|tachograf, sjåførkort
FAS|Free Alongside Ship. Incoterm for sjøtransport: kjøperen tar over ansvaret når varen står på kaia ved siden av skipet.|I||O|Incoterms
FCA|Free Carrier. Incoterm: kjøperen tar over ansvaret når varen er levert til transportøren på avtalt sted.|I||O|Incoterms
Fellesfraktbrev|Fraktbrev for transport innenlands i Norge som oppfyller kravene i vegfraktloven. Kalles også innenlandsfraktbrev.|T||O|fraktbrev
Fellesskapstillatelse|Tillatelse som skal være med i bilen ved yrkestransport i EU/EØS. Viser at løyvet er i orden.|I||O|løyve
Ferjeregelen|Unntak som gir lov til å avbryte døgnhvilen når sjåføren følger bilen på ferje eller tog.|T|51|S|avbrutt døgnhvil
FIATA|Internasjonal organisasjon for speditører.|O||O|speditør
FIFO|First In – First Out: de eldste varene plukkes først. Brukes for varer som kan bli for gamle.|L|24|OS|FIFO-prinsippet, først inn først ut
Fjerdepartslogistikk|En aktør som samordner flere logistikkleverandører (transport, lager osv.), slik at hele logistikken fungerer for kunden. Kalles 4PL.|L||O|4PL
Flerbemanning|To sjåfører på samme bil som bytter på å kjøre. Da gjelder egne regler for hvile.|T|51–52, 57|S|to sjåfører
Flytskjema|Tegning som viser rekkefølgen på aktivitetene i en prosess, for eksempel fra ordre til levering.|L|79|OS|vareflyt, prosess
Flåtestyring|System der en sentral følger alle kjøretøyene med GPS og kan gi dem nye oppdrag, for eksempel taxi og budbiler.|D||O|GPS
FOB|Free On Board. Incoterm for sjøtransport: kjøperen tar over risikoen når varen er lastet om bord på skipet.|I||O|Incoterms
Forband|Stablemønster der kolliene i hvert lag overlapper laget under, som murstein. Gjør pallen stabil.|E|103–104|OS|stabling, stablemønster
Forbehold|Merknad på fraktbrevet om godset, for eksempel at det var dårlig pakket eller skadet da det ble tatt imot.|T||O|anmerkning, fraktbrev
Forbrukerkjøp|Kjøp der en privatperson kjøper av en bedrift. Da gjelder forbrukerkjøpsloven.|K|11|OS|forbrukerkjøpsloven
Force majeure|Hendelser ingen kan rå over, for eksempel naturkatastrofer eller krig. Da har ingen erstatningsansvar.|K||O|naturkatastrofe
Forholdsordre|Ny beskjed fra oppdragsgiveren om hva du skal gjøre når noe uventet skjer under transporten.|T||O|nektet gods
Forpassing|Tollbehandling der ufortollede varer kan sendes videre innenfor Norge under tollkontroll.|I||O|toll, transittering
Forsikringspremie|Det du betaler for en forsikring, vanligvis per år.|K||O|forsikring
Forsikringstaker|Den som har inngått en forsikringsavtale med et forsikringsselskap.|K||O|forsikring
Forskrift om utførelse av arbeid|Forskrift med krav til bruk av arbeidsutstyr som truck og kran, blant annet om opplæring.|U|221–222|S|arbeidsutstyr
Forsyningskjede|Alle bedriftene som samarbeider for å få en vare fra råvare fram til kunden. På engelsk supply chain.|L||O|verdikjede, supply chain
F-pak|Forbrukerenhet: den minste enheten kunden kjøper, for eksempel én boks.|E|23, 99–100, 107|OS|forbrukerforpakning
Fraktavtale|Avtale mellom avsender og fraktfører om å frakte gods. Ved vegtransport gjelder vegfraktloven.|T|11, 21, 30|OS|
Fraktbrev|Dokument som følger sendingen, med opplysninger om avsender, mottaker, godset og avtalen.|T|31|S|CMR-fraktbrev, fellesfraktbrev
Fraktfører|Transportøren som har ansvaret for å frakte godset.|T|11, 21, 31, 94|OS|transportør
Friksjon|Motstanden mot gliding mellom to flater. Friksjonen hjelper til å holde lasten på plass, men er aldri nok alene.|S|125–129, 184|S|
Friksjonskoeffisient|Tall (μ) som viser hvor godt to flater holder mot hverandre. Jo høyere tall, jo mindre glir lasten.|S|125–128, 184–185, 188|S|my, μ
Fyllingsgrad|Hvor stor del av plassen i en konteiner eller bil som er brukt, i prosent.|L||O|utnyttelse
Førerhund|Hund som hjelper en blind person. Førerhunden har lov til å være med på kollektivtransport.|P|87|S|
Førstehjelp|Den hjelpen du gir en skadd eller syk person før helsepersonell kommer.|F|202, 206|S|
Galileo|EUs satellittnavigasjonssystem, en europeisk motpart til det amerikanske GPS.|D||O|satellitt
Glidefriksjon|Friksjonen når flatene allerede glir mot hverandre. Den er lavere enn statisk friksjon.|S|184|S|friksjon
Gods|Varer som blir transportert.|T|11|OS|
Godsansvarsforsikring|Forsikring fraktføreren tegner for å dekke ansvaret sitt hvis godset blir skadet eller borte.|K||O|forsikring
Godsterminal|Terminal der gods blir levert inn, sortert og sendt videre til mottakerne.|L|10, 27, 29–30|OS|terminal
Godstransport|Transport av varer.|T|43–44, 67–70, 79–80, 91–96|S|
GPS|Amerikansk satellittsystem som viser nøyaktig posisjon. Brukes til navigasjon og til å følge kjøretøy.|D||O|
Grensepassering|Når du kjører over grensen med varer som skal fortolles, må du passere på et tollsted mens det er åpent.|I||O|toll
Grimesurring|Surringsmetode der stroppen legges rundt lasten som en grime, for å hindre at den glir framover eller bakover.|S|122, 129, 135, 143–146|S|surring
Grossistlager|Lager hos en grossist som kjøper store mengder og selger videre til butikker.|L|13, 17|S|grossist
Grønn logistikk|Logistikk som tar hensyn til miljøet, for eksempel innsamling og gjenvinning av emballasje og kasserte varer.|M||O|miljø, returlogistikk
GS1|Global organisasjon som lager standarder for varenummer, strekkoder og EDI.|O||O|GTIN, strekkode
GSM|Standard for mobilnett. Brukes også til å sende data fra kjøretøy.|D||O|mobilnett
GTIN|Global Trade Item Number: GS1 sitt unike varenummer. Det samme som artikkelnummer (tidligere EAN).|D||O|artikkelnummer, EAN
Handelskjøp|Kjøp mellom to bedrifter. Da gjelder kjøpsloven.|K||O|kjøpsloven
Havari|Skade på et kjøretøy som gjør at det ikke kan kjøre videre.|K||O|motorstopp
Helningsvinkel|Vinkelen et lasteplan kan vippes før lasten begynner å gli. Brukes i krengeprøven for å finne friksjonen.|S|125–126|S|krengeprøve
Helpendelrute|Kollektivrute som går gjennom sentrum mellom to boligområder på hver sin side av byen.|P||O|kollektivtransport
Hentekjøp|Kjøp der kjøperen selv henter varen hos selgeren.|K||O|
Hertz (Hz)|Måleenhet for frekvens: antall svingninger per sekund. Brukes om radiosignaler.|D||O|frekvens, Hz
Hittegods|Ting noen har glemt, for eksempel på bussen eller terminalen. Skal tas vare på etter hittegodsloven.|P|70–71|OS|gjenglemt
Hjerneslag|Blodpropp eller blødning i hjernen. Tegn: skjev munn, svakhet i én side, utydelig tale. Ring 113 med en gang.|F|85|S|slag
Hjerteinfarkt|Blodpropp i hjertet. Typisk tegn er trykkende smerte i brystet. Ring 113.|F|85|S|
Hjerte-lunge-redning (HLR)|30 brystkompresjoner og 2 innblåsninger, gjentatt til hjelpen kommer eller hjertestarteren er klar.|F|206–212|S|HLR, gjenoppliving
Hjertestarter|Apparat som kan gi strømstøt til et hjerte som har stoppet. Den sier selv hva du skal gjøre.|F|212–213|S|AED, defibrillator
HMS|Helse, miljø og sikkerhet: arbeid for å hindre skader og sykdom på jobben og skade på miljøet.|F||O|internkontroll, IK-HMS
Holdbarhetsdato|Dato som sier hvor lenge varen holder seg. Avgjør rekkefølgen varene plukkes i.|L|24|S|FIFO, best før
Husholdningsavfall|Avfall fra private hjem.|M||O|
Høydeforskjell|Når lasteplanet og rampen er i ulik høyde, trenger du utstyr som lastebrygge, lastelem eller skråplan.|U|160|S|rampe
Høydelager|Lager med høye reoler der varene lagres i mange nivåer.|L|15, 25|S|reol
IATA|Bransjeorganisasjonen for flyselskapene. Lager blant annet regler for farlig gods i fly.|O||O|fly
ICAO|FNs organisasjon for regler i sivil luftfart.|O||O|fly
IFCO-kasse|Sammenleggbar plastkasse for frukt og grønt som brukes om igjen mange ganger.|E|107|S|ombruksemballasje
IK-HMS|Internkontroll for helse, miljø og sikkerhet: bedriftens system for å jobbe systematisk med HMS.|F|40|S|internkontroll, HMS
Ikke-verbal kommunikasjon|Kommunikasjon uten ord: kroppsspråk, blikk og tonefall.|P||O|kroppsspråk
IMDG-koden|Regler for transport av farlig gods på sjøen.|T||O|farlig gods, sjøtransport
IMO|FNs sjøfartsorganisasjon, som lager regler for skipsfart.|O||O|sjø
Incoterms|Internasjonale leveringsbetingelser. De avtaler hvem som betaler transport og forsikring, og hvor risikoen går over fra selger til kjøper. Gjeldende versjon er Incoterms 2020.|I||O|leveringsbetingelser, Incoterms 2020
Influensområde|Området rundt en kollektivlinje der folk bor nær nok en holdeplass til å bruke den.|P||O|
Ingrediensliste|Liste over hva en matvare inneholder. Er en del av varedeklarasjonen.|E|108–109|S|varedeklarasjon
Innførselsveileder|Tolletatens veiledning for import av varer til Norge.|I||O|import, toll
Innskuddsbasert pensjon|Pensjonsordning der arbeidsgiveren betaler inn et fast beløp. Hvor mye du får, avhenger av hvor mye som er spart og avkastningen.|K||O|pensjon, innskuddspensjon
Insulinsjokk|For lavt blodsukker hos en person med diabetes (føling). Gi sukker hvis personen er våken.|F|85|S|føling, lavt blodsukker
Intermodal transport|Transport der godset bytter mellom flere transportformer, for eksempel bil, tog og skip. Kalles også kombitransport.|T||O|kombitransport
IRU|Verdensorganisasjonen for vegtransportbedrifter.|O|122|OS|
ISO|Den internasjonale standardiseringsorganisasjonen. Lager blant annet standarder for kvalitet og for konteinere.|O|174|S|standard
Isoporemballasje|Lett emballasje som demper støt og isolerer mot varme og kulde.|E|105|S|EPS, isopor
ITF|International Transport Forum: forum der transportministre fra mange land samarbeider. Het tidligere ECMT/CEMT.|O||O|
Jekktralle|Håndtralle som løfter og flytter paller. Kalles også palletralle eller håndtruck.|U|162, 168, 197–198|S|palletralle, håndtruck
JIT|Just in time: varene kommer akkurat når de trengs, slik at lageret blir så lite som mulig. Utviklet av Toyota.|L||O|just in time
Kabotasje|Når en lastebil fra ett land kjører oppdrag innenlands i et annet land. Det er strenge grenser for hvor mye som er lov.|I||O|innenlandskjøring
Kalkyle|Beregning av kostnader og pris på forhånd.|K||O|kostnadsoverslag
Kantbeskytter|Beskyttelse som legges på kanten av lasten under surringen, slik at verken last eller stropp blir skadet.|S|170, 182–183|S|kantbeskyttelse, hjørnebeskytter
Kasko|Bilforsikring som dekker skade på ditt eget kjøretøy, også når du selv er skyld i skaden.|K||O|forsikring
Kjernetjeneste|Hovedtjenesten kunden betaler for, for eksempel selve transporten.|P|74–76|OS|tilleggstjeneste, service
Kjetting|Brukes både som surringskjetting til tung last og som snøkjetting på hjulene på glatt føre.|S|179–181, 188–189|S|surringskjetting, snøkjetting
Kjøp|Avtale der en vare byttes mot betaling. Kan være handelskjøp eller forbrukerkjøp.|K||O|
Kjøpsavtale|Avtale mellom selger og kjøper om vare, pris og levering.|K|20–21, 25|S|
Kjøpsloven|Lov om kjøp mellom bedrifter (handelskjøp).|K|11|S|kjøpslov
Kjøre- og hviletid|Regler for hvor lenge en sjåfør kan kjøre, og hvor mye pause og hvile hun eller han må ha.|T|43, 48–56|S|kjøretid, hviletid, pause
Kjøreseddel|Tillatelse som førere av drosje, buss og annen persontransport mot betaling må ha i tillegg til førerkortet. Stiller krav til vandel og helse.|P||O|
Kjøretid|Tiden sjåføren kjører. Høyst 4,5 timer før pause og normalt høyst 9 timer per døgn (to ganger i uka 10 timer).|T|49|S|kjøre- og hviletid
Kjøretøyforskriften|Forskrift med tekniske krav til kjøretøy, blant annet hvor sterke vegger og surringsfester skal være.|S|121|S|
Kollektivtransport|Transport som er åpen for alle, og som går i faste ruter etter rutetabell.|P||O|buss, rutetransport
Kombitransport|Det samme som intermodal transport: lastbæreren bytter mellom ulike transportformer.|T||O|intermodal
Kompetansebevis (truck)|Dokumentasjon på at du har bestått opplæring for en bestemt truckklasse.|U|219|S|truckførerbevis, truckklasse
Konsesjon|Offentlig tillatelse til å drive en virksomhet. Det samme som bevilling eller løyve.|K||O|tillatelse
Konsulat|Kontor i et annet land som hører under ambassaden.|I||O|
Konteiner|Standardisert lastbærer som kan flyttes mellom skip, tog og bil uten at godset lastes om. Sjøkonteinere er av stål og kan stables.|L|100–101, 182|OS|container, lastbærer, TEU
Konteinerlås|Lås (twistlock) som fester konteineren til kjøretøyet.|S|131, 182|S|twistlock, låsing
Krengeprøve|Test der lasteplanet vippes til lasten begynner å gli, for å finne ut hvor stor friksjonen er.|S|126|S|helningsvinkel
Krokløfter|Påbygg med krok som drar konteinere opp på lastebilen og setter dem av igjen.|U|199–200|S|lastveksler
Kroppsspråk|Hvordan du kommuniserer med kroppen: blikk, holdning, tonefall og ansiktsuttrykk.|P||O|ikke-verbal kommunikasjon
Krympefilm|Plastfilm som varmes opp slik at den krymper rundt godset og holder det sammen.|S|132, 230|S|plast
Kryssurring|Direktesurring der stroppene krysser hverandre.|S|146|S|direktesurring
Kunstfiberbånd|Surringsbånd av polyester. Lett og sterkt, men tåler dårlig skarpe kanter.|S|177–179|S|surringsbånd, polyester
Kvalitet|I hvilken grad en vare eller tjeneste oppfyller kravene – både lovkrav og det kunden trenger og forventer.|P||O|ISO 9000
Lager|Sted der varer oppbevares til de skal brukes eller sendes videre.|L|10, 12, 15|S|varelager
Lagerstyringssystem|Dataprogram som holder oversikt over varer, lokasjoner og plukk på lageret. Kalles WMS.|D|14|S|WMS
Landsdekkende postsending|Post og små pakker som sendes over hele landet.|D||O|post
Lastbærer|Det godset står på eller ligger i under transport, for eksempel pall, rullecontainer eller konteiner.|L|22, 107–108, 163, 171|S|pall, konteiner
Lastelem|Løfteplattform på lastebilen. Se bakløfter.|U|161–162, 164, 198–199, 224|S|bakløfter
Lasting og lossing|Å laste gods på og av et kjøretøy på en trygg og effektiv måte.|U|160–165, 171|S|
Lastseksjon|Del av lasten som sikres som én enhet.|S|140|S|
Lastsikring|Å sikre lasten slik at den ikke kan gli, velte eller falle av. Hovedmetodene er låsing, blokkering og surring.|S|118–158|S|sikring av last
Lathund|Svensk ord for en kort veileder eller huskeliste. Brukes om veiledere i lastsikring.|S||O|veileder
Leasing|Å leie kjøretøy eller utstyr over lang tid i stedet for å kjøpe.|K||O|leie
Ledetid|Tiden fra en vare blir bestilt til den er levert.|L|15, 19|OS|leveringstid
Lettgods|Pakker inntil 20 kg.|D||O|pakke
Lettkjetting|Lett snøkjetting.|U|189|S|snøkjetting
Leveringsbetingelser|Avtale mellom selger og kjøper om hvem som betaler for og tar risikoen ved transporten. Internasjonalt brukes Incoterms.|I||O|Incoterms
Leveringsservice|Hvor godt bedriften leverer: riktig vare, til rett tid, i rett mengde og uten skade.|P|93|S|service
LIFO|Last In – First Out: det som kom inn sist, tas ut først. Brukes der alderen på varen ikke betyr noe.|L|18, 24|OS|LIFO-prinsippet
Likevektspunkt|Punktet der en gjenstand er i balanse. Viktig når du løfter og balanserer last.|U|167|S|tyngdepunkt, balanse
Logistikk|Planlegging og styring av vareflyt, informasjon og penger – fra råvare til kunden.|L||O|vareflyt
Lokasjon|Den faste adressen til en plass på lageret, for eksempel gang, reol, høyde og plass.|L|18, 25|OS|lageradresse, hylleplass
LOOP|Stiftelse som jobber mot forsøpling og for kildesortering, og som står bak sorteringsmerkene på emballasje.|M||O|returordning, sorteringsmerke
Loopsurring|Surring der stroppen går rundt lasten i en løkke, for å hindre at den glir eller velter sidelengs.|S|122, 135, 140–143|S|surring
Luftpute|Pute som blåses opp og fyller tomrom mellom kolliene, slik at lasten ikke kan flytte seg.|S|183|S|stuvepute
Lufttransport|Transport med fly.|T|41|S|fly
Låsing av last|Lasten låses fast, for eksempel med konteinerlåser.|S|122–123, 131|S|twistlock
Løyve|Offentlig tillatelse til å drive yrkestransport av gods eller personer mot betaling.|T||O|tillatelse, yrkestransportloven
Malus|Tillegg i forsikringspremien etter skader. Det motsatte av bonus.|K||O|forsikring
Matvaretransport|Transport av mat, der temperatur, hygiene og holdbarhet er viktig.|T|67–70|S|kjøletransport
Mellomlegg|Materiale mellom lag eller kolli, for eksempel for å fylle tomrom eller gi bedre friksjon.|S|131, 182|S|antisklimatte, friksjonsmatte
Mengdelager|Lager for store mengder av hver vare.|L|15|S|volumlager
Mikrobiologisk smitteavfall|Avfall som kan spre smitte, for eksempel fra blod eller syke dyr.|M||O|smitteavfall
Motbakke|Bakke oppover. Lasten presses bakover, og bilen trenger mer kraft.|U|186|S|oppoverbakke
Mottaker|Den som skal ha godset, slik det står i fraktavtalen.|T|11, 113|OS|
Motvektstruck|Truck med motvekt bak som balanserer lasten på gaflene foran.|U|163, 216|S|truck, gaffeltruck
Målegods|Gods som er stort og lett (lav tetthet). Frakten beregnes etter volum. Kalles også volumgods.|T||O|volumgods
Nav-eike-system|Rutesystem der alle ruter går til og fra ett sentrum (navet), der man bytter rute.|P||O|knutepunkt
Nektet gods|Gods mottakeren ikke vil ta imot. Fraktføreren må da få ny beskjed (forholdsordre) fra avsenderen.|T||O|forholdsordre
Newton (N)|Måleenhet for kraft. Tyngden av 1 kg er omtrent 10 N.|S|176|S|daN, kraft
Newtons lover|Lovene om krefter og bevegelse. Forklarer for eksempel hvorfor lasten fortsetter framover når bilen bremser.|S|130|S|treghet
NHO Logistikk og Transport|Arbeidsgiverforening i NHO for logistikk- og transportbedrifter. Forkortes NHO LT.|O||O|NHO LT
NHO Transport|Arbeidsgiverforening i NHO for private kollektivselskaper, som buss og ferje.|O||O|
NLF|Norges Lastebileier-Forbund: forening for bedrifter som eier lastebiler.|O||O|
NS (norsk standard)|Norske standarder, ofte felles europeiske (NS-EN), for eksempel for surringsutstyr.|O|174–175|S|standard, NS-EN
NSAB|Nordisk Speditørforbunds alminnelige bestemmelser: regler for ansvaret til speditører.|K||O|speditør
NTF|Norsk Transportarbeiderforbund: fagforbund for arbeidstakere i transport og logistikk.|O||O|fagforening
NTP|Nasjonal transportplan: Stortingets plan for veg, bane, sjø og luftfart. Lages på nytt hvert fjerde år og gjelder for tolv år.|T||O|samferdsel
Nullvisjonen|Målet om at ingen skal bli drept eller hardt skadd i trafikken.|F||O|trafikksikkerhet
Nyttelast|Hvor mye last kjøretøyet har lov til å ta: tillatt totalvekt minus egenvekt.|T|62–63|S|lastevne
Næringsavfall|Avfall fra bedrifter og offentlige virksomheter.|M||O|
Nødstans|Bryter som stopper en maskin straks i en nødsituasjon.|F|203|S|nødstopp
OCR-skanner|Skanner som gjør trykt tekst om til tekst datamaskinen kan lese.|D||O|
OLFI|Ordre – Lager – Fakturering – Innkjøp: dataprogram for ordrer og lager. Inngår i dag i ERP-systemer.|D|14|OS|OLFI-modul, ERP
Ombruksemballasje|Emballasje som brukes flere ganger, for eksempel IFCO-kasser, paller og pantflasker.|E|107|OS|returemballasje
Opprinnelsesmerking|Merking som viser hvilket land en vare kommer fra. Viktig for tollen.|E|109–110|OS|opprinnelsesland
Ordrebekreftelse|Melding fra selgeren om at bestillingen er mottatt, med pris og leveringstid.|L|25|S|
Ordreplukk|Å hente varene i en ordre fra lageret.|L|15–16, 26, 96|S|plukk, plukking
Ordrestyrt produksjon|Produksjonen starter først når kunden har bestilt. Kunden må vente i ledetiden.|L||O|JIT
Overfallssurring|Stroppen legges over lasten og strammes, slik at lasten presses mot planet og friksjonen øker.|S|122, 129, 135, 137–140|S|surring
Overstock|Volumlager i høyden over plukklageret. Kalles også støtlager.|L|25|OS|støtlager, volumlager
Pakkereise|Reise der transport og overnatting selges sammen til én pris.|P|65–66|S|reisegaranti
Pakkseddel|Liste over alle varene i en ordre eller sending.|L|20|OS|
Pall|Lastbærer av tre eller plast som gods stables på, for eksempel europall.|L|22, 165–166|S|europall, EUR-pall
Palletruck|Truck som flytter paller i gulvhøyde.|U|216|S|jekktralle
Partigods|Store sendinger, ofte fra én avsender, som fyller hele eller store deler av bilen.|T|43|S|
Passasjerer med utviklingshemming|God service er å snakke enkelt og tydelig, gi god tid og være tålmodig.|P|89–90|S|
Passasjerterminal|Sted der passasjerer går på, av eller bytter transportmiddel, for eksempel en bussterminal eller flyplass.|P|12, 36–37|OS|terminal
Pause|Avbrudd i kjøringen. Etter 4,5 timer kjøring må sjåføren ha minst 45 minutter pause (kan deles i 15 + 30 minutter).|T|49–50|S|kjøre- og hviletid
PDA|Håndholdt datamaskin, for eksempel håndterminalen du skanner med på lageret.|D||O|håndterminal, skanner
Persontransport|Transport av passasjerer, for eksempel med buss eller drosje.|P|42–43, 80–91|S|
Pet-flaske|Plastflaske som kan pantes og gjenvinnes.|E|107|S|pant
Piggkjetting|Snøkjetting med pigger som gir ekstra godt grep på is.|U|189|S|snøkjetting
Plasskjøp|Kjøp der selgeren kjører varen ut til kjøperen på samme sted.|K||O|
PLU-kode|Kode på løsvekt-varer, for eksempel frukt, som brukes til å finne kiloprisen.|E||O|
Plukklager|Den delen av lageret der varene plukkes til ordrer, i lett tilgjengelig høyde.|L|15–16, 23|S|plukk
Polyester|Kunstfiber som surringsbånd lages av.|S|177|S|kunstfiberbånd
Postoperatør|Bedrift som formidler post over hele landet.|D||O|post
Premiefond|Konto der forsikringsselskapet samler premiene fra kundene.|K||O|
Produktavfall|Varer som er kassert.|M||O|
Produktetikett|Etikett på varen med artikkelnummeret som strekkode og annen informasjon i klartekst.|E||O|etikett
Påbudsskilt|Blått, rundt skilt som viser hva du må gjøre, for eksempel å bruke hjelm eller vernesko.|F|222|S|skilt
QR-kode|Todimensjonal strekkode med plass til mye informasjon. Kan leses med mobilkamera.|D||O|todimensjonal strekkode
Radiell rute|Kollektivrute mellom et boligområde og sentrum.|P||O|
Reefer-konteiner|Kjøle- eller frysekonteiner for skip og tog.|L||O|reefer, frysekonteiner
Regionlager|Lager som forsyner butikkene i en region.|L|13, 16|S|
Registrert postsending|Post der du får kvittering ved innlevering, og mottakeren må kvittere når den hentes.|D||O|rekommandert
Reiseforsikring|Forsikring som dekker blant annet tap av bagasje og sykdom på reise.|K||O|forsikring
Reisegaranti|Lovpålagt garanti for reisearrangører, slik at kundene får pengene tilbake hvis turen ikke blir noe av.|P|65|OS|Reisegarantifondet, RGF
Remburs|Betalingsmåte i internasjonal handel der bankene kontrollerer dokumentene før selgeren får betalt.|I||O|betaling
Returlogistikk|Vareflyt tilbake fra kunden, for eksempel returvarer, emballasje og varer til gjenvinning.|L||O|retur, grønn logistikk
RFID|Brikke med antenne som sender informasjon trådløst. Brukes til å spore varer uten å skanne strekkoden.|D|113|OS|RFID-brikke
RGF|Reisegarantifondet: sikrer at reisende får pengene tilbake hvis en pakkereise ikke blir gjennomført.|P|65|OS|Reisegarantifondet
RID|Regler for transport av farlig gods på jernbane.|T|40|S|RID-regelverket, farlig gods
Ringrute|Kollektivrute som går i ring og knytter sammen boligområder, arbeidsplasser og sentrum.|P||O|
Riksveg|Hovedveg som staten har ansvaret for.|T|185|S|vegnett
Ro-ro|Roll-on roll-off: ferje eller skip der kjøretøyene kjører om bord og i land selv.|T||O|roro, ferje
Rullecontainer|Bur på hjul som brukes til å frakte varer til butikker.|L|26, 108|S|rullekonteiner, rullebur
Rullende gods|Gods som kan rulle, for eksempel kabeltromler, rør og papirruller. Må sikres ekstra godt.|S|122, 150–154|S|
Rullestolbrukere|Passasjerer i rullestol. Rullestolen skal sikres, og passasjeren skal ha belte.|P|86–87, 192–194|S|
Rullestolrampe|Rampe som gjør at rullestoler kan komme inn i bussen.|P|192, 196|S|rampe
Rundballe|Rund ball av gras eller halm. Ruller lett og må sikres.|S|128|S|
Rutetransport|Persontransport i faste ruter etter rutetabell.|P|64–65|S|kollektivtransport
SAD|Single Administrative Document: EUs felles skjema for tolldeklarasjon.|I||O|enhetsblankett
Samferdsel|Transport og kommunikasjon mellom steder.|T||O|
Samlast|Gods fra mange avsendere til mange mottakere som lastes sammen i samme bil eller konteiner.|T|43, 100|OS|samlastgods, stykkgods
Samlastspeditør|Speditør som samler gods fra mange avsendere og frakter det til mange mottakere.|T||O|speditør
Samlastterminal|Terminal der samlastgods blir sortert og lastet om.|L|27|S|terminal
Samsvarserklæring|Dokument som viser hvilke standarder og krav et produkt oppfyller.|E||O|CE-merke
Sandspreder|Utstyr som strør sand på vegen for bedre veggrep.|U|190–191|S|strøing
SDR|Special Drawing Rights: regneenhet som brukes til å beregne erstatning når gods blir skadet eller borte under transport.|K||O|erstatning
Sekketralle|Tralle for å flytte esker og sekker.|U|160, 162, 168, 197|S|tralle
Selvkostkalkyle|Prisberegning der prisen dekker alle kostnader – faste og variable – pluss fortjeneste.|K||O|kalkyle
Semitrailer|Tilhenger som trekkes av en trekkvogn. Har plass til 33 europaller. I ordboka kalt semikonteiner.|T||O|semikonteiner, trekkvogn
Sendekjøp|Kjøp der varen må sendes fra selgeren til kjøperen.|K||O|
Sendingsnummer|Unikt nummer for en sending, som brukes til sporing.|D|98, 114|S|sporing, SSCC
Sentrallager|Lager som kjøper inn fra produsentene og forsyner regionlagrene.|L|13, 15, 27|S|
Sentralterminal|Hovedterminalen i et terminalnett.|L|29|S|terminalnett
Sentripetalkraft|Kraften som trengs for å holde lasten i svingen. Er ikke lasten sikret, vil den skli utover i svingen.|S|124–125|S|sving, sentrifugalkraft
Setebelte|Belte som alle passasjerer skal bruke der det finnes.|P|65, 191–192|S|bilbelte
Sidevind|Vind fra siden som kan få høye kjøretøy til å skli eller velte.|U|187|S|vind
Sikkerhetsfaktor|Hvor mye sterkere utstyret er enn det det er godkjent for å bruke.|S|181|S|bruddstyrke
Sikkerhetslager|Ekstra varer på lageret som buffer hvis leveransen er forsinket eller salget større enn ventet.|L|20|S|bestillingspunkt, buffer
Sikring av bagasje|Bagasjen i bussen må sikres slik at den ikke kan skade noen ved bråbrems.|P|194–195|S|
Sikring av betongelementer|Tunge betongelementer står ofte i stativ og må sikres mot å gli og velte.|S|155|S|
Sikring av buntede materialpakker|Pakker med for eksempel trelast eller plater, som kan gli fra hverandre hvis de ikke sikres riktig.|S|153|S|trelast
Sikring av kabeltromler|Kabeltromler ruller og må kiles og surres.|S|152–153|S|rullende gods
Sikring av kjøretøy|Biler og maskiner som fraktes på lasteplanet, må sikres med bremser, kiler og surring.|S|154|S|
Sikring av løsmasser|Sand, grus og lignende må dekkes til så ingenting blåser eller faller av.|S|155–156|S|bulk, presenning
Sikring av papirruller|Store papirruller er tunge og kan rulle eller velte. De må blokkeres og surres.|S|150–151|S|rullende gods
Sikring av passasjerer|Setebelter for passasjerer og sikring av rullestoler.|P|191–194|S|setebelte
Sikring av rør|Rør kan rulle og gli i lengderetningen og må sikres i begge retninger.|S|151–152|S|rullende gods
Sikring av stykkgods|Kolli i ulik størrelse som må stues tett og sikres mot å flytte seg.|S|156|S|stykkgods
Sikring av tømmer|Tømmer fraktes med stakebiler, der stakene og surringene holder lasten.|S|154|S|tømmerbil
Sikring mot velt|Høy og smal last må sikres så den ikke velter.|S|134, 139, 142–143, 145–146, 148–149|S|velt
Sjåførkort|Personlig kort som yrkessjåfører setter i fartsskriveren for å registrere kjøre- og hviletid.|T|55, 57, 59|OS|fartsskriver
Sjøtransport|Transport med skip. Har egne regler for lastsikring.|T|41, 157–158|S|skip
Skadested|Stedet der en ulykke har skjedd. Sikre, varsle og gi førstehjelp.|F|202–205|S|ulykke
Skråplan|Skrå flate, for eksempel en rampe. Lasten kan gli når den står på skrå.|U|160–161, 164–166|S|rampe
Skyvemasttruck|Truck der masten kan skyves fram og tilbake. Brukes i smale reolganger.|U|216|S|truck, reachtruck
Slow-movers|Varer som plukkes sjelden. De plasseres gjerne lenger unna utleveringen.|L||O|C-varer, ABC-analyse
Smittefarlig avfall|Avfall fra helsevesenet som kan gi sykdom.|M||O|smitteavfall
Sollysbeskyttelse|Emballasje som beskytter varer mot sollys og UV-stråling.|E|105–106|S|UV
Spekter|Arbeidsgiverforening for bedrifter med offentlig eierskap.|O||O|
Spesialavfall|Avfall som må behandles for seg fordi det er stort eller kan skade mennesker, dyr eller miljø. Kalles i dag farlig avfall.|M||O|farlig avfall
Spesialtransport|Transport av gods som er større eller tyngre enn det som vanligvis er lov. Krever egen tillatelse (dispensasjon).|T|45, 47–48|S|dispensasjon
Sperrebom|Bom som spennes mellom veggene for å blokkere lasten.|S|183|S|lastebom
Sporing|Å følge en sending underveis ved å skanne strekkoder eller lese RFID.|D|98–99, 108, 113–114|S|track and trace
SSCC-nummer|Serienummer for en transportenhet, for eksempel en pall. Standard fra GS1.|D|113|S|SSCC
Stablebelastning|Hvor mye vekt emballasjen tåler at det stables oppå.|E|103–104, 169–170|S|stabling
Statisk friksjon|Friksjonen når flatene står stille mot hverandre. Den er høyere enn glidefriksjonen.|S|184, 188|S|friksjon
Stempling av last|Lasten sikres med stag eller stempler mot tak eller vegger.|S|121|S|
Stenging av last|Lasten holdes på plass av lukkede vegger, porter eller lemmer.|S|121|S|
Storsekk|Stor sekk (big bag) for bulkvarer som fôr og gjødsel.|S|128|S|big bag
Strammekraft|Kraften du strammer stroppen med. Står som STF på etiketten.|S|136|S|STF, forspenning
Strekkfilm|Plastfilm som strekkes rundt pallen for å holde godset samlet.|S|27, 132, 168–169, 230|S|plast
Strekkode|Kode av streker som en skanner kan lese, for eksempel artikkelnummeret.|D|112–113|S|strekkoder
Stuingssertifikat|Dokument som viser at farlig gods er plassert og sikret riktig om bord på en ferje eller et skip.|T||O|farlig gods, IMDG
Stykkgods|Gods som er pakket og kan håndteres enhet for enhet, for eksempel kolli og paller.|T||O|kolli
Støtindikator|Liten indikator på godset som skifter farge hvis det har vært utsatt for et kraftig støt.|E|104–105|OS|
Støtlager|Volumlager, ofte i høyden over plukklageret, der varene står i hele paller.|L|15, 25|OS|støttelager, overstock
Støttebeinstruck|Truck med støtteben foran som tar vekten, i stedet for motvekt.|U|160, 162, 166|S|truck
Surring|Lasten festes med bånd, kjetting eller wire. Metodene er overfalls-, loop-, grime- og direktesurring.|S|122–123, 135–148|S|surring av last
Surringsbånd|Bånd av polyester med strammer som brukes til å surre last.|S|135–136, 143, 177–178, 182|S|lastestropp, stropp
Surringsfeste|Festepunkt på kjøretøyet der surringene festes.|S|176, 192|S|
Surringskjetting|Kjetting for surring av tung last.|S|179|S|kjetting
Surringsvinkel|Vinkelen mellom surringen og lasteplanet. Påvirker hvor godt surringen holder.|S|136–137, 183|S|vinkel
Sykelønnsforsikring|Forsikring selvstendig næringsdrivende kan tegne for å få bedre betalt når de er syke.|K||O|forsikring
Synlighetsbekledning|Klær med refleks og sterke farger, slik at du blir sett.|F|227–228|S|refleksvest
Takbom|Bom som festes øverst i lasterommet for å blokkere lasten.|S|183|S|
Takstøre|Pris per kilometer i et takstregulativ, for eksempel for drosje.|P||O|
Talestyrt plukk|Plukking der plukkeren får beskjed i hodetelefonene og bekrefter med stemmen. Begge hendene er frie.|L||O|voicepick
Tariffavtale|Avtale om lønn og arbeidsvilkår mellom en fagforening og en arbeidsgiver eller arbeidsgiverforening.|K||O|
Teleslynge|System som sender lyd direkte til høreapparater.|P|88|S|
Temperaturkontroll|Kontroll med at temperaturen i kjøretøyet er riktig for passasjerene eller godset.|U|195|S|temperatur
TEN-T|EUs plan for et sammenhengende transportnett i Europa: veger, jernbane, havner, flyplasser og vannveier.|T||O|TEN
Terminalnett|Nett av terminaler: én sentralterminal og mindre terminaler rundt i landet.|L|28–29|OS|
Termokonteiner|Isolert konteiner for transport av mat som må holdes kald.|L||O|ATP
Termotransport|Transport med kjøling eller varme.|T|68, 191|S|kjøletransport
TET/NCTS|Elektronisk system for transittering, der tollmyndighetene i ulike land utveksler meldinger om varene.|I||O|transittering
TEU|Twenty-foot Equivalent Unit: måleenhet for konteinere. En 20-fots konteiner er 1 TEU, en 40-fots er 2 TEU.|L||O|konteiner
Tidsgaranti|Garanti om at sendingen kommer fram innen avtalt tid.|T|21, 92|S|
Tilleggstjeneste|Ekstra tjeneste i tillegg til kjernetjenesten, for eksempel å bære varen inn eller gi god informasjon. Kunden vurderer hele leveransen.|P|74–76|OS|kjernetjeneste, service
TIR|Tollavtale som gjør at plomberte kjøretøy og konteinere kan krysse grenser uten tollkontroll underveis.|I||O|toll
Todimensjonal strekkode|Strekkode i to retninger, som QR-kode, som kan inneholde mye informasjon.|D||O|QR-kode
Tollager|Godkjent lager der varer kan lagres uten at toll er betalt.|I||O|toll
Tollområde|Området der norske tollregler gjelder: fastlandet og sjøen 12 nautiske mil ut. Svalbard og Jan Mayen er ikke med.|I||O|toll
Tonnkilometer|Mål for transportarbeid: antall tonn ganget med antall kilometer.|T||O|transportarbeid
Totalvekt|Samlet vekt av kjøretøyet og lasten.|T||O|tillatt totalvekt
T-pak|Transportenhet: enheten som brukes i transport, vanligvis en pall.|E|23, 99–100, 107|OS|transportforpakning
Transaksjon|En handel eller overføring, for eksempel at en vare byttes mot penger.|K||O|
Transittering|Når ufortollede varer fraktes gjennom ett eller flere land under tollkontroll.|I||O|toll
Transportavtale|Avtale om transport mellom kunden og transportøren.|T|20–21, 80|S|fraktavtale
Transportetikett|Etikett på sendingen med sendingsnummer som strekkode og adresser i klartekst.|E||O|sendingsnummer, SSCC
Transportforsikring|Forsikring vareeieren tegner på godset, fordi fraktførerens ansvar ofte ikke dekker hele verdien.|K||O|forsikring
Transportkorridor|Hovedtransportåre mellom landsdeler, brukt i planleggingen av NTP.|T||O|NTP
Transportmerking|Merking på godset som viser hvordan det skal håndteres og lastes.|E|171–172|S|transportsymboler
Transportoppdrag|Et oppdrag om å frakte gods eller personer fra ett sted til et annet.|T|41–45|S|oppdrag
Transportsymboler|Standard bildesymboler for håndtering, for eksempel paraply (holdes tørt), glass (skjørt) og piler (denne siden opp).|E|114–115|S|merking
Transportvilkår|Reglene transportøren har laget om ansvaret overfor kunder og passasjerer.|P||O|befordringsvedtekter
Tredjelandskjøring|Transport mellom to land der ingen av dem er landet kjøretøyet er registrert i.|I||O|kabotasje
Tredjepartslogistikk|En annen bedrift utfører lager- eller transporttjenester for deg. Kalles 3PL.|L||O|3PL
Treghetskrefter|Kreftene som oppstår fordi lasten vil fortsette i samme fart og retning når bilen bremser, svinger eller setter fart.|S|124–125, 129–130, 149|S|treghet
Truck|Kjøretøy for å løfte og flytte gods. Krever opplæring og kompetansebevis.|U|196, 216–230|S|gaffeltruck
Tverrforbindelse|Kollektivrute direkte mellom to områder uten å gå om sentrum.|P||O|
TVINN|Tolletatens system for elektronisk fortolling. Systemet er under utskifting – sjekk toll.no for gjeldende løsning.|I||O|toll
TYA|Svensk organisasjon for transportbransjen som har laget veiledere i lastsikring.|O|122|S|
Tyngdekraft|Kraften som trekker alt mot jorda. Tyngden av 1 kg er omtrent 10 N.|S|125, 164–165|S|tyngde
Tyngdepunkt|Punktet der vekten av en gjenstand er samlet. Høyt tyngdepunkt gjør at den velter lettere.|S|137, 146, 162, 166|S|
Ukehvil|Den lange hvilen sjåføren skal ha hver uke, normalt 45 timer sammenhengende.|T|53|S|kjøre- og hviletid
Underkjølt regn|Regn som fryser til is når det treffer bakken. Gjør vegen svært glatt.|U|187|S|glatt
Undersøkelsesplikt|Fraktførerens plikt til å kontrollere godset når det tas imot for transport.|T||O|vegfraktloven
Universell utforming|At kjøretøy, terminaler og omgivelser er laget slik at alle kan bruke dem, også rullestolbrukere og svaksynte.|P|37, 192|OS|tilgjengelighet
Utforbakke|Bakke nedover. Lasten presses framover.|U|186|S|nedoverbakke
Utførselsveileder|Tolletatens veiledning for eksport fra Norge.|I||O|eksport
UV-stråling|Ultrafiolett stråling fra sola som kan skade varer og emballasje.|E|106|S|sollys
Vannplaning|Når dekkene mister kontakten med vegen fordi det er vann mellom dekk og veg.|U|186|S|
Vare|En ting noen eier og kan selge.|K|11|OS|
Varebeholdning|Hvor mye av hver vare som finnes på lageret.|L|19|S|lagerbeholdning
Varedeklarasjon|Opplysninger om innholdet i en vare, for eksempel ingredienser og næringsinnhold.|E|108–109|S|
Vareflyt|Hvordan varene beveger seg gjennom forsyningskjeden.|L|79|S|logistikk
Varekretsløp|Hele løpet til en vare: fra råvare via produksjon, lager og butikk til forbruker – og tilbake til gjenvinning.|L|10–11|S|
Varelinje|Én bestemt vare i sortimentet. Det samme som varenummer eller artikkelnummer.|L|18|OS|
Varenummer|Nummer som identifiserer en bestemt vare. Det samme som artikkelnummer eller GTIN.|D||O|artikkelnummer
Varesertifikat|Dokument som viser hvor varen er produsert (opprinnelsen). Brukes ved fortolling.|E|110|S|opprinnelsesbevis
Varseltrekant|Rød trekant som settes ut for å varsle andre trafikanter om et stopp eller en ulykke.|F|203|S|
Vegfraktloven|Lov om fraktavtaler for godstransport på veg.|T|11, 30–31|S|
Veggrep|Hvor godt dekkene griper vegen.|U|184–185|S|friksjon
Veggskinne|Skinne i veggen i lasterommet der sperrebommer festes.|S|183|S|
Veglister|Oversikt fra Statens vegvesen over hvilken bruksklasse, vekt og lengde som er lov på hver veg.|T|46–47|S|bruksklasse
Vegnett|Alle vegene: riksveger, fylkesveger og kommunale veger.|T|185–186|S|
Vegtrafikkloven|Loven om trafikk på veg, blant annet om hva du har plikt til å gjøre ved en ulykke.|T|45, 191, 202–203|S|
Vegtransport|Transport på veg med bil.|T|40|S|
Vekselbeholder|Lastbærer (veksellad) som kan løftes mellom bil og jernbanevogn.|L||O|veksellad
Verbal kommunikasjon|Kommunikasjon med ord, muntlig eller skriftlig.|P||O|
Volumgods|Det samme som målegods: stort volum i forhold til vekten.|T||O|målegods
Volumlager|Lager der varene står i hele paller og større mengder.|L|15–17, 23|S|mengdelager, støtlager
Våtorganisk avfall|Matavfall og annet som lett brytes ned.|M||O|matavfall
WMS|Warehouse Management System: lagerstyringssystem.|D|14|S|lagerstyringssystem
Yrkessjåførkompetanse|Obligatorisk kompetanse for yrkessjåfører. Vises som kode 95 i førerkortet.|T||O|kode 95, YSK, yrkessjåførbevis
Yrkesskade|Skade eller sykdom du får på jobben i arbeidstiden.|F||O|
Yrkesskadeforsikring|Forsikring alle arbeidsgivere må tegne for de ansatte.|K||O|forsikring
Yrkestransportloven|Lov om løyve for yrkestransport av gods og personer.|T|63–64|S|løyve
Ytelsesbasert pensjon|Pensjonsordning der du er lovet en bestemt andel av lønnen som pensjon.|K||O|pensjon
YTF|Yrkestrafikkforbundet: fagforbund for arbeidstakere i transport.|O||O|fagforening
ÅDT|Årsdøgntrafikk: gjennomsnittlig antall kjøretøy per døgn på en veg gjennom året.|T||O|trafikk
`;

/* ---------- Gjør om rådata til objekter ----------
   Kalles av siden etter at ord.js og ord-bransjelaere.js er lastet.
   Hvert ord får en liste med henvisninger: [{ bok:'tll'|'bl', sider, kap:[...] }]. */
TLLORD.bygg = function(){
  if (TLLORD.ORD) return TLLORD.ORD;
  const kapAv = (bok, side) => (TLLORD.BOKER[bok].kapitler.find(k => side >= k.fra && side <= k.til) || {}).nr;
  const les = raa => raa.trim().split('\n').filter(l => l.trim()).map(l => {
    const [ord, forklaring, tema, sider, kilde, sok] = l.split('|').map(x => (x || '').trim());
    return { ord, forklaring, tema, sider, kilde, sok: sok ? sok.split(',').map(x => x.trim()).filter(Boolean) : [] };
  });
  const ref = (bok, sider) => ({ bok, sider, kap: Array.from(new Set((sider.match(/\d+/g) || []).map(Number).map(n => kapAv(bok, n)).filter(Boolean))).sort((a,b)=>a-b) });
  const ORD = les(TLLORD.RAA).map(o => Object.assign(o, { refs: o.sider ? [ref('tll', o.sider)] : [] }));
  const finn = {}; ORD.forEach(o => finn[o.ord.toLowerCase()] = o);
  TLLORD.MANGLER = [];
  les(TLLORD.RAA_BL || '').forEach(o => {
    if (o.forklaring === '='){
      const t = finn[o.ord.toLowerCase()];
      if (!t){ TLLORD.MANGLER.push(o.ord); return; }
      if (o.sider) t.refs.push(ref('bl', o.sider));
      if (!t.kilde.includes('B')) t.kilde += 'B';
      o.sok.forEach(x => { if (!t.sok.includes(x)) t.sok.push(x); });
    } else {
      o.kilde = 'B'; o.refs = o.sider ? [ref('bl', o.sider)] : [];
      if (finn[o.ord.toLowerCase()]) TLLORD.MANGLER.push('dobbel: ' + o.ord);
      finn[o.ord.toLowerCase()] = o; ORD.push(o);
    }
  });
  ORD.forEach(o => { o.boker = Array.from(new Set(o.refs.map(r => r.bok).concat(/[OS]/.test(o.kilde) ? ['tll'] : []))); });
  return (TLLORD.ORD = ORD);
};
