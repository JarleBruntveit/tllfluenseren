// Faginnhold for 3D-hjertet (HO – gjestefag på TLLfluenseren). Egenprodusert tekst.
// Rekkefølgen = blodets vei gjennom hjertet («Gå gjennom delene»).
// id = navnet på delen i hjerte.glb (lages av _verktoy/hjerte3d/lag_hjerte.py).
// ut = hvor delen flyttes når hjertet tas fra hverandre (x, y, z).

export const DELER = [
  { id: 'hulvener', navn: 'Hulvenene', omrade: 'Blod inn til høyre side', ut: [-2.6, 0, 0],
    tekst: 'Øvre og nedre hulvene er de største venene i kroppen. Den øvre samler blod fra hodet, halsen og armene. Den nedre samler blod fra resten av kroppen. Begge munner ut i høyre forkammer.',
    fakta: ['Vener fører blodet TIL hjertet.', 'Blodet i hulvenene har levert fra seg oksygen ute i kroppen. Derfor er det farget blått på modellen.'] },
  { id: 'hoyre_forkammer', navn: 'Høyre forkammer', omrade: 'Høyre side', ut: [-1.8, 0.9, 0.4],
    tekst: 'Høyre forkammer tar imot det oksygenfattige blodet fra hulvenene. Når forkammeret trekker seg sammen, presses blodet ned i høyre hjertekammer gjennom trikuspidalklaffen.',
    fakta: ['Her sitter sinusknuten – hjertets egen taktgiver som starter hvert hjerteslag.', 'Trykk «▶ Bank» og se at forkamrene trekker seg sammen litt før kamrene.'] },
  { id: 'hoyre_kammer', navn: 'Høyre hjertekammer', omrade: 'Høyre side', ut: [-1.3, -1.3, 1.8],
    tekst: 'Høyre hjertekammer pumper det oksygenfattige blodet ut i lungearterien og videre til lungene. Der kvitter blodet seg med karbondioksid og tar opp oksygen.',
    fakta: ['Veggen er tynnere enn i venstre kammer, fordi lungene ligger nær og trykket i lungekretsløpet er lavt.', 'Høyre kammer ligger lengst fram i brystet, rett bak brystbeinet.'] },
  { id: 'lungearterie', navn: 'Lungearterien', omrade: 'Lille kretsløp', ut: [0, 2.1, 2.0],
    tekst: 'Lungestammen går ut fra høyre hjertekammer og deler seg i høyre og venstre lungearterie – én til hver lunge.',
    fakta: ['Den kalles arterie fordi den fører blodet BORT fra hjertet, selv om blodet er oksygenfattig.', 'Pulmonalklaffen hindrer at blodet renner tilbake til høyre kammer.'] },
  { id: 'lungevener', navn: 'Lungevenene', omrade: 'Lille kretsløp', ut: [0, 0, -2.6],
    tekst: 'Fire lungevener, to fra hver lunge, fører oksygenrikt blod fra lungene tilbake til venstre forkammer.',
    fakta: ['De kalles vener fordi de fører blodet TIL hjertet, selv om blodet er oksygenrikt.', 'Turen fra høyre kammer, gjennom lungene og tilbake til venstre forkammer kalles det lille kretsløpet.'] },
  { id: 'venstre_forkammer', navn: 'Venstre forkammer', omrade: 'Venstre side', ut: [0.9, 1.3, -2.0],
    tekst: 'Venstre forkammer tar imot oksygenrikt blod fra lungevenene og sender det videre ned i venstre hjertekammer gjennom mitralklaffen.',
    fakta: ['Venstre forkammer ligger bakerst i hjertet. Snu modellen og se bakfra.', 'Den lille utposningen kalles hjerteøret.'] },
  { id: 'venstre_kammer', navn: 'Venstre hjertekammer', omrade: 'Venstre side', ut: [1.5, -1.7, -0.6],
    tekst: 'Venstre hjertekammer er hjertets kraftigste del. Det pumper oksygenrikt blod ut i aorta og videre til hele kroppen – det store kretsløpet.',
    fakta: ['Muskelveggen er den tykkeste i hjertet, fordi blodet skal helt ut i fingrene og tærne.', 'Det meste av hjertespissen er venstre kammer. Hjertestøtet kan du ofte kjenne på venstre side av brystet.'] },
  { id: 'aorta', navn: 'Aorta', omrade: 'Store kretsløp', ut: [0.5, 3.0, -0.4],
    tekst: 'Aorta er kroppens største arterie. Den går opp fra venstre hjertekammer, bøyer seg som et stokkhåndtak (aortabuen) og går ned bak hjertet. Greinene på toppen fører blod til hodet og armene.',
    fakta: ['Aorta er omtrent like tykk som en tommel.', 'Pulsen du kjenner på håndleddet, er trykkbølgen som starter når venstre kammer pumper blod inn i aorta.'] },
  { id: 'koronararterier', navn: 'Kransarteriene', omrade: 'Hjertets egen blodforsyning', ut: [0, 0, 3.6],
    tekst: 'Hjertemuskelen trenger også oksygen. Kransarteriene (koronararteriene) går ut fra aorta like over aortaklaffen og ligger som en krans på overflaten av hjertet.',
    fakta: ['Det er én høyre og én venstre kransarterie. Den venstre deler seg i to store greiner.', 'Hvis en kransarterie tetter seg, får deler av hjertemuskelen ikke oksygen. Det kalles hjerteinfarkt. Ved mistanke om hjerteinfarkt: ring 113.'] },
  { id: 'klaffer', navn: 'Hjerteklaffene', omrade: 'Inne i hjertet', ut: [0, 0, 0],
    tekst: 'Hjertet har fire klaffer som virker som enveisventiler: trikuspidalklaffen og mitralklaffen mellom forkamre og kamre, og pulmonalklaffen og aortaklaffen der blodet går ut av hjertet.',
    fakta: ['Klaffene ligger inne i hjertet. Skjul kamrene eller slå på «Gjennomsiktig» for å se dem.', '«Dunk-dunk»-lyden du hører med stetoskop, er klaffene som lukker seg.'] },
];

export const TENK = [
  { q: 'Hvorfor er veggen i venstre hjertekammer tykkere enn i høyre?',
    a: 'Venstre kammer pumper blodet ut i hele kroppen (det store kretsløpet) og må lage et høyt trykk. Høyre kammer pumper bare blodet til lungene, som ligger nær hjertet, og trenger mindre kraft.' },
  { q: 'Lungearterien fører oksygenfattig blod, men kalles likevel en arterie. Hvorfor?',
    a: 'Arterier fører blodet bort fra hjertet, vener fører blodet til hjertet. Navnet handler om retningen, ikke om hvor mye oksygen blodet har.' },
  { q: 'Hva skjer med hjertemuskelen hvis en kransarterie tetter seg? Hva gjør du hvis en bruker får sterke brystsmerter?',
    a: 'Den delen av hjertemuskelen som får blod fra den tette arterien, får ikke oksygen og kan dø (hjerteinfarkt). Ring 113, la personen sitte eller ligge i den stillingen som er best, ikke la personen være alene, og følg rådene fra 113.' },
  { q: 'Sett pulsen til 60 og så til 150. Hva skjer med tiden hjertet hviler og fylles (diastolen)? Hvorfor kan det bli et problem ved svært høy puls?',
    a: 'Diastolen blir mye kortere, mens systolen varer omtrent like lenge. Ved svært høy puls rekker ikke kamrene å fylles helt, så hjertet pumper ut mindre blod per slag.' },
];

export const ORD = {
  'arterie': 'blodåre som fører blod bort fra hjertet',
  'vene': 'blodåre som fører blod til hjertet',
  'sinusknuten': 'hjertets egen taktgiver i høyre forkammer',
  'systole': 'fasen der hjertet trekker seg sammen og pumper',
  'diastole': 'fasen der hjertet slapper av og fylles',
  'kretsløpet': 'blodets runde: det lille går gjennom lungene, det store gjennom kroppen',
  'hjerteinfarkt': 'del av hjertemuskelen får ikke oksygen fordi en kransarterie er tett',
};
