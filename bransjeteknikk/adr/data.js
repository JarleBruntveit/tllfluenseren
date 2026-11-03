/* ADR og farlig gods – egenprodusert læringsinnhold basert på ADR/RID 2025 og DSBs læreplan. */
const DSB_ADR = 'https://www.dsb.no/farlige-stoffer/transport-av-farlig-gods/adrrid/';
const DSB_PLAN = 'https://www.dsb.no/farlige-stoffer/transport-av-farlig-gods/adrrid/lareplan-adr-kompetansebevis/';

TLL.registrer({
  id: 'adr',
  fag: 'Bransjeteknikk',
  kortnavn: 'ADR',
  nr: 'ADR',
  tittel: 'Transport av farlig gods',
  ingress: 'Bruk ADR-boka som et arbeidsverktøy. Finn regelen, forklar hva den betyr, og ta et trygt valg i transportoppdraget.',
  prove: false,
  ressursomrade: 'bransjeteknikk',
  kompetansemal: [
    { kode: 'TOL02-01 · KV426', tekst: 'gjøre rede for innholdet i forskrift om landtransport av farlig gods og bruke dette til å planlegge transport av farlig gods i ulike klasser' },
    { kode: 'TOL02-01 · KV426', tekst: 'gjøre rede for rutiner og konsekvenser knyttet til uhell ved håndtering av farlig gods' }
  ],
  ressurser: {
    presentasjon: '',
    laerebok: 'ADR/RID 2025 – bruk henvisningen i oppgaven, sidenummer kan variere',
    arbeidsbok: '',
    ndlaEmne: DSB_ADR,
    ndlaEmneTag: 'DSB',
    ndlaEmneNavn: 'ADR/RID 2025 og skriftlige instruksjoner hos DSB',
    ordliste: DSB_PLAN,
    ordlisteTag: 'DSB',
    ordlisteNavn: 'Læreplan ADR-kompetansebevis hos DSB'
  },
  fotnote: 'ADR og farlig gods · Innholdet er læringsstøtte basert på ADR/RID 2025 og DSBs læreplan. Gjeldende regelverk og kursarrangørens godkjente undervisningsplan har forrang. Denne nettsiden erstatter ikke obligatorisk teori, praktiske øvelser eller ADR-eksamen. Resultater lagres bare i nettleseren på denne enheten – <a href="#/lagring">les om lagring</a> · <a href="#/rapport">lever fremdrift</a>.',
  temaer: [
    {
      id: 'bok', lok: 'ADR-01', tittel: 'Finn fram i ADR-boka',
      kort: 'Fra UN-nummer til riktig rad, kolonne og bestemmelse – uten å gjette.',
      bok: 'ADR/RID 2025: 1.1.1, 3.2, 3.2.1 og tabell A og B',
      mal: ['finne et stoff ved hjelp av UN-nummer eller varenavn','velge riktig oppføring når ett UN-nummer har flere rader','følge en kode fra tabell A til bestemmelsen som forklarer kravet','skille mellom ADR-bestemmelser for veg og RID-bestemmelser for jernbane'],
      punkter: [
        '<b>UN-nummeret</b> er nøkkelen til oppslaget. Bruk tabell B hvis du bare kjenner varenavnet.',
        '<b>Tabell A i 3.2</b> viser blant annet klasse, klassifiseringskode, emballasjegruppe, fareseddel, begrensede mengder, transportkategori og tunnelkode.',
        '<b>3.2.1</b> forklarer hva hver kolonne betyr. Les kolonneforklaringen før du tolker en kode.',
        'Ett UN-nummer kan ha <b>flere oppføringer</b>. Kontroller produktbeskrivelse, flammepunkt, emballasjegruppe og eventuelle særbestemmelser.',
        'Følg alltid henvisningen videre. Et sidenummer er bare hjelp; <b>bestemmelsesnummeret</b> er den sikreste henvisningen.',
        'Sjekk om teksten gjelder <b>ADR, RID eller begge</b>. Oppgavene her gjelder vegtransport.'
      ],
      ndla: [['ADR/RID 2025', DSB_ADR, 'DSB'],['Læreplan ADR kompetansebevis', DSB_PLAN, 'DSB']],
      arbeidsbok: '',
      aktiviteter: [
        { type:'voks', id:'bok-voks', tittel:'Trygg nok til å kontrollere', tekst:['I farlig gods-arbeid er det ikke profesjonelt å late som du husker alt. Det profesjonelle er å vite hva du må kontrollere, finne riktig bestemmelse og si fra når noe er uklart.','Et raskt svar kan føles effektivt. Et kontrollert svar er det som gjør at mennesker, gods og omgivelser blir ivaretatt.'], sporsmal:['Når er det vanskeligst å si «jeg må kontrollere dette først»?','Hvordan kan du hjelpe en makker uten å ta boka fra ham eller henne?'], handling:'Bruk setningen «La oss kontrollere bestemmelsen før vi bestemmer oss» én gang i neste økt.' },
        { type:'flash', id:'bok-flash', tittel:'Begrepskort: finn fram', kort:[
          ['ADR','Regelverket for internasjonal transport av farlig gods på veg.'],['RID','Regelverket for transport av farlig gods på jernbane.'],
          ['UN-nummer','Firesifret nummer som identifiserer et farlig stoff eller en farlig gjenstand.'],['Tabell A','Hovedtabellen i 3.2, ordnet etter UN-nummer.'],
          ['Tabell B','Alfabetisk oversikt som kan hjelpe når du kjenner varenavnet, men ikke UN-nummeret.'],['Kolonne 7a','Maksimal mengde per inneremballasje eller gjenstand ved begrensede mengder.'],
          ['Kolonne 15','Transportkategori og tunnelrestriksjonskode.'],['Bestemmelsesnummer','Den presise adressen til regelen, for eksempel 1.1.3.6.4.']
        ]},
        { type:'quiz', id:'bok-q1', nivaa:1, tittel:'Finn riktig inngang', sp:[
          {q:'Du kjenner UN-nummeret. Hvor starter du?',a:['I tabell A i 3.2','I skriftlige instruksjoner','I kapittel 8.6','I tabell B'],r:0,f:'Tabell A er ordnet etter UN-nummer.'},
          {q:'Du kjenner bare varenavnet. Hva kan hjelpe deg å finne UN-nummeret?',a:['Tabell B','Kolonne 15','Kapittel 5.3','Tunneloversikten'],r:0,f:'Tabell B er alfabetisk og leder deg til relevant UN-nummer.'},
          {q:'Hvor finner du forklaringen på kolonnene i tabell A?',a:['3.2.1','1.1.3.6','5.4.3','8.1.5'],r:0,f:'Les 3.2.1 før du tolker kodene.'},
          {q:'Hva er den beste henvisningen i et faglig svar?',a:['Bestemmelsesnummeret','Bare sidenummeret','Fargen på bokmerket','Navnet på læreren'],r:0,f:'Sidenummer kan variere mellom utgaver og visninger.'}
        ]},
        { type:'tf', id:'bok-tf', nivaa:2, tittel:'Sant eller usant: bokbruk', ps:[
          ['Ett UN-nummer kan ha flere oppføringer i tabell A.',true,'Du må velge den oppføringen som passer produktets egenskaper og vilkår.'],
          ['Når du har funnet en kode i tabell A, er oppslaget alltid ferdig.',false,'Koden må ofte følges videre til bestemmelsen som forklarer kravet.'],
          ['RID-bestemmelser gjelder automatisk for all vegtransport.',false,'RID gjelder jernbane. Kontroller hva som gjelder ADR.'],
          ['Kolonne 7a og kolonne 15 gir samme type informasjon.',false,'7a gjelder begrensede mengder per inneremballasje; 15 gjelder transportkategori og tunnelkode.']
        ]},
        { type:'reflect', id:'bok-r1', nivaa:3, tittel:'Forklar oppslagsmetoden', q:'En kollega gir deg UN 1203 og spør om transporten kan gjennomføres. Forklar steg for steg hvordan du bruker ADR-boka før du svarer. Du skal ikke bare ramse opp kapitler.', punkter:['starter i tabell A og kontrollerer riktig oppføring','leser kolonneforklaringene i 3.2.1','finner opplysninger som er relevante for akkurat oppdraget','følger kodene videre til bestemmelsene','kontrollerer forutsetninger, unntak og om teksten gjelder ADR','avslutter med en begrunnet beslutning eller hva som må avklares'] }
      ]
    },
    {
      id: 'fare', lok: 'ADR-02', tittel: 'Klasser, farer og merking',
      kort: 'Gjenkjenn faren, forstå tilleggsfarer og skille transportmerking fra annen merking.',
      bok: 'ADR/RID 2025: 2.2, 3.2, 5.2 og skriftlige instruksjoner i 5.4.3.4',
      mal: ['kjenne igjen hovedfarene i de ni ADR-klassene','forklare at farlig gods kan ha tilleggsfarer','skille mellom fareseddel, CLP-merke og LQ-merke','bruke UN-nummer og varenavn til å kontrollere riktig merking'],
      punkter: [
        '<b>Klasse 1</b> eksplosiver · <b>2</b> gasser · <b>3</b> brannfarlige væsker · <b>4</b> brannfarlige faste stoffer og beslektede farer.',
        '<b>Klasse 5</b> oksiderende stoffer og organiske peroksider · <b>6</b> giftige og infeksjonsfremmende stoffer.',
        '<b>Klasse 7</b> radioaktivt materiale · <b>8</b> etsende stoffer · <b>9</b> forskjellige farlige stoffer og gjenstander.',
        'Et stoff kan ha <b>tilleggsfare</b>. Alle relevante faresedler i tabell A må derfor kontrolleres.',
        'En <b>fareseddel</b> viser transportfare. Et <b>CLP-farepiktogram</b> er produktmerking og erstatter ikke ADR-merkingen.',
        '<b>LQ-merket</b> viser at godset er pakket som begrensede mengder etter kapittel 3.4. Det er ikke en fareseddel.'
      ],
      ndla: [['ADR/RID 2025 og skriftlige instruksjoner',DSB_ADR,'DSB']], arbeidsbok:'',
      aktiviteter: [
        { type:'flash', id:'fare-flash', tittel:'Begrepskort: fare og merking', kort:[
          ['Klasse 3','Brannfarlige væsker, blant annet bensin og diesel som oppfyller kriteriene.'],['Fareseddel','Diamantformet merke som viser transportfaren.'],
          ['Tilleggsfare','En ekstra farlig egenskap som krever ytterligere fareseddel.'],['CLP-merke','Produktmerking etter kjemikalieregelverket; erstatter ikke fareseddel.'],
          ['LQ-merke','Merke for kolli med farlig gods pakket i begrensede mengder.'],['UN 1203','Bensin. Klasse 3, emballasjegruppe II og fareseddel 3 i den aktuelle oppføringen.'],
          ['UN 1202','Dieselolje/gassolje/fyringsolje lett. Kontroller hvilken av flere oppføringer som passer produktet.']
        ]},
        { type:'quiz', id:'fare-q1', nivaa:1, tittel:'Kjenn igjen hovedfaren', sp:[
          {q:'Hvilken klasse tilhører brannfarlige væsker?',a:['Klasse 3','Klasse 2','Klasse 7','Klasse 9'],r:0,f:'Bensin og dieseloppføringer i disse oppgavene ligger i klasse 3.'},
          {q:'Hvilken klasse gjelder etsende stoffer?',a:['Klasse 8','Klasse 1','Klasse 4','Klasse 6'],r:0,f:'Klasse 8 er etsende stoffer.'},
          {q:'Hva viser en fareseddel?',a:['Transportfaren','Prisen på varen','Hvem som eier godset','Kjøretøyets totalvekt'],r:0,f:'Fareseddelen varsler om farlige egenskaper under transport.'},
          {q:'Hva må du gjøre hvis tabell A viser flere faresedler?',a:['Kontrollere både hovedfare og tilleggsfare','Velge den du liker best','Bare bruke CLP-merket','Fjerne alle merkene'],r:0,f:'Tilleggsfarer kan gi flere faresedler.'}
        ]},
        { type:'tf', id:'fare-tf', nivaa:2, tittel:'Sant eller usant: merkene', ps:[
          ['Et CLP-farepiktogram erstatter fareseddelen ved transport.',false,'Produktmerking og transportmerking har ulike regelverk.'],
          ['LQ-merket er det samme som fareseddel nummer 3.',false,'LQ-merket viser emballering etter kapittel 3.4.'],
          ['Et farlig stoff kan ha mer enn én farlig egenskap.',true,'Tabell A kan vise både hovedfare og tilleggsfare.'],
          ['Du kan alltid velge første rad når et UN-nummer har flere oppføringer.',false,'Riktig rad avhenger av produktets egenskaper og vilkår.']
        ]},
        { type:'reflect', id:'fare-r1', nivaa:3, tittel:'Forklar merkingen til en ny kollega', q:'En ny kollega tror at CLP-merket på emballasjen er nok ved transport. Forklar forskjellen på CLP-piktogram, fareseddel og LQ-merke, og hvordan du kontrollerer hva kolliet skal ha.', punkter:['CLP gjelder produktets kjemikaliefare','fareseddel viser transportfaren etter ADR','LQ-merket gjelder begrensede mengder etter kapittel 3.4','merkene kan ikke brukes som erstatning for hverandre','UN-nummer og riktig rad i tabell A må kontrolleres','oppdragets emballering og øvrige vilkår må være kjent'] }
      ]
    },
    {
      id: 'mengde', lok: 'ADR-03', tittel: 'Mengdelempelsen i 1.1.3.6',
      kort: 'Beregn riktig verdi og forstå hvilke krav som fortsatt gjelder.',
      bok: 'ADR/RID 2025: 1.1.3.6.2–1.1.3.6.5 og tabell A kolonne 15',
      mal: ['finne transportkategorien i tabell A','beregne verdi for blandet last etter 1.1.3.6.4','avgjøre om mengdevilkåret er oppfylt','forklare at en verdi på 1000 eller lavere ikke opphever alle ADR-krav'],
      punkter: [
        'Finn <b>transportkategorien</b> i kolonne 15. Kategori 0 kan ikke bruke denne mengdelempelsen; kategori 4 har ubegrenset mengde i tabellen, men øvrige vilkår må fortsatt leses.',
        'Ved blandet last beregnes kategori 1 normalt med faktor <b>50</b>, kategori 2 med <b>3</b> og kategori 3 med <b>1</b>. Enkelte stoffer i kategori 1 bruker faktor 20 – les merknaden.',
        'Summen skal <b>ikke overstige 1000</b>. Nøyaktig 1000 kan være innenfor mengdevilkåret.',
        'Bensin UN 1203 er kategori 2 i oppgaven. Diesel UN 1202 er kategori 3. Dermed blir formelen bensin × 3 + diesel × 1.',
        'Mengdelempelsen gjelder <b>kolli</b>. Den er ikke en snarvei som gjør lekk emballasje, manglende opplæring eller dårlig lastsikring lovlig.',
        'Krav som fortsatt gjelder, omfatter blant annet korrekt klassifisering, emballering og kollimerking, transportdokument, lastsikring, nødvendig opplæring og egnet slokkeapparat etter 8.1.4.2–5.'
      ],
      ndla: [['DSB om lempelser og fravik','https://www.dsb.no/farlige-stoffer/transport-av-farlig-gods/adrrid/lempelser-og-fravik-adrrid/','DSB']], arbeidsbok:'',
      aktiviteter: [
        { type:'quiz', id:'mengde-q1', nivaa:1, tittel:'Faktor og grense', sp:[
          {q:'Hvilken faktor brukes normalt for transportkategori 2 i 1.1.3.6.4?',a:['3','1','20','50'],r:0,f:'Kategori 2 multipliseres med 3.'},
          {q:'Hvilken faktor brukes for transportkategori 3?',a:['1','3','10','50'],r:0,f:'Kategori 3 tas med med faktisk mengde etter riktig måleenhet.'},
          {q:'Hva er riktig om beregnet verdi 1000?',a:['Den overstiger ikke grensen','Den er alltid for høy','Den betyr at alle ADR-krav faller bort','Den gjelder bare tanktransport'],r:0,f:'Bestemmelsen sier at verdien ikke skal overstige 1000.'},
          {q:'Hvor finner du transportkategorien for et stoff?',a:['Tabell A kolonne 15','Tabell A kolonne 7a','Skriftlige instruksjoner side 1','Kapittel 5.3'],r:0,f:'Kolonne 15 viser transportkategori og tunnelkode.'}
        ]},
        { type:'quiz', id:'mengde-q2', nivaa:2, tittel:'Regn med bensin og diesel', sp:[
          {q:'100 L bensin kategori 2 og 300 L diesel kategori 3. Hva blir verdien?',a:['600','400','1000','1300'],r:0,f:'100 × 3 + 300 × 1 = 600.'},
          {q:'250 L bensin kategori 2 og 300 L diesel kategori 3. Hva blir verdien?',a:['1050','550','750','1000'],r:0,f:'250 × 3 + 300 = 1050. Mengdevilkåret er ikke oppfylt.'},
          {q:'240 L bensin kategori 2 og 250 L diesel kategori 3. Hva blir verdien?',a:['970','490','720','1060'],r:0,f:'240 × 3 + 250 = 970.'},
          {q:'Lasten med verdi 970 får 30 L ekstra bensin. Ny verdi?',a:['1060','1000','1030','1090'],r:0,f:'270 × 3 + 250 = 1060.'}
        ]},
        { type:'case', id:'mengde-case', nivaa:2, tittel:'Kunden endrer bestillingen', intro:'Du skal levere 100 L UN 1203 bensin og 300 L UN 1202 diesel i kolli. Klassifisering, emballasje og merking er oppgitt som korrekt. Ingen andre unntak benyttes.', steg:[
          {q:'Hva gjør du først?',valg:[{t:'Finner transportkategoriene i tabell A',ok:true,f:'Du trenger riktig kategori før beregningen.'},{t:'Gjetter at alt under 1000 liter er unntatt',ok:false,f:'Grensen gjelder beregnet verdi, ikke bare antall liter.'},{t:'Fjerner faresedlene',ok:false,f:'Kollimerking faller ikke bort på denne måten.'}]},
          {q:'Beregnet verdi er 600. Hva betyr det?',valg:[{t:'Mengdevilkåret i 1.1.3.6 kan være oppfylt, men øvrige vilkår må kontrolleres',ok:true,f:'En beregning alene godkjenner ikke transporten.'},{t:'Transporten er automatisk lovlig',ok:false,f:'Emballasje, dokumentasjon, utstyr, opplæring og andre krav må fortsatt kontrolleres.'},{t:'Føreren trenger ingen opplæring',ok:false,f:'Rolletilpasset opplæring og 8.2.3 gjelder fortsatt.'}]},
          {q:'Kunden legger til 150 L bensin. Hva gjør du?',valg:[{t:'Regner på nytt og stanser den opprinnelige planen når verdien blir 1050',ok:true,f:'Lasten må replanlegges og ordinære ADR-krav kontrolleres.'},{t:'Fordeler godset på bil og tilhenger og kaller dem to transportenheter',ok:false,f:'Bil med tilkoblet tilhenger er én transportenhet.'},{t:'Kjører fordi kunden har dårlig tid',ok:false,f:'Tidspress endrer ikke mengdevilkåret.'}]}
        ]},
        { type:'voks', id:'mengde-voks', tittel:'Et tall er ikke hele svaret', tekst:['Det er lett å bli fornøyd når regnestykket gir 970. Men tallet sier bare noe om én del av oppdraget. Et godt faglig svar sier også hvilke forutsetninger som gjelder, og hva som fortsatt må kontrolleres.','I arbeidslivet er det ofte slik: Du kan ha regnet riktig og likevel ta feil beslutning dersom du overser vilkårene rundt tallet.'], sporsmal:['Har du noen gang stoppet etter et riktig regnestykke uten å vurdere hva svaret betyr?','Hvilke tre kontroller vil du alltid nevne etter 1000-poengberegningen?'], handling:'Avslutt neste beregning med setningen «Dette betyr …, forutsatt at …».' }
      ]
    },
    {
      id: 'lq', lok: 'ADR-04', tittel: 'Begrensede mengder',
      kort: 'Skille LQ fra mengdelempelsen og kontrollere inneremballasje, kolli og merking.',
      bok: 'ADR/RID 2025: kapittel 3.4 og tabell A kolonne 7a',
      mal: ['finne LQ-grensen i kolonne 7a','kontrollere mengde per inneremballasje og samlet bruttomasse','gjenkjenne LQ-merket','forklare forskjellen mellom kapittel 3.4 og 1.1.3.6'],
      punkter: [
        '<b>Kolonne 7a</b> viser maksimal mengde per inneremballasje eller gjenstand. Verdien 0 betyr at LQ ikke kan brukes for den oppføringen.',
        'Farlig gods i LQ skal normalt ligge i <b>inneremballasjer i egnet ytteremballasje</b>. Se 3.4.2 og bestemmelsene som 3.4.1 viser til.',
        'For vanlig ytteremballasje er kolliets samlede bruttomasse normalt maksimalt <b>30 kg</b>. For brett med krympe- eller strekkfilm er grensen normalt 20 kg.',
        'UN 1203 bensin har <b>1 L</b> i kolonne 7a i den aktuelle oppføringen. En femliterskanne blir ikke LQ bare fordi ytterkassen er lett.',
        'LQ-kolliet skal merkes etter <b>3.4.7</b>. Avsender skal også gi transportøren opplysning om samlet brutto masse før forsendelse, se 3.4.12.',
        'LQ og 1.1.3.6 er <b>to forskjellige ordninger</b>. LQ vurderes blant annet per inneremballasje og kolli; 1.1.3.6 vurderes per transportenhet og transportkategori.'
      ],
      ndla: [['ADR/RID 2025 – kapittel 3.4',DSB_ADR,'DSB']], arbeidsbok:'',
      aktiviteter: [
        { type:'quiz', id:'lq-q1', nivaa:1, tittel:'Hva kontrollerer du?', sp:[
          {q:'Hva viser kolonne 7a?',a:['Maksimal mengde per inneremballasje eller gjenstand ved LQ','Transportkategori','Tunnelkode','Minste slokkekapasitet'],r:0,f:'LQ-grensen gjelder den enkelte inneremballasjen eller gjenstanden.'},
          {q:'Hva betyr 0 i kolonne 7a?',a:['LQ kan ikke brukes for oppføringen','Ubegrenset mengde','Ingen fareseddel','Gratis transport'],r:0,f:'0 betyr at transport etter kapittel 3.4 ikke er tillatt for oppføringen.'},
          {q:'Hva er normal grense for en egnet lukket ytteremballasje etter 3.4.2?',a:['30 kg brutto','20 kg netto','1000 kg','333 L'],r:0,f:'Vanlig kolli etter 3.4.2 har grense 30 kg brutto.'},
          {q:'Er LQ-merket en fareseddel?',a:['Nei','Ja, nummer 3','Ja, nummer 9','Bare på tank'],r:0,f:'LQ-merket viser bruk av begrensede mengder, ikke en bestemt fareklasse.'}
        ]},
        { type:'case', id:'lq-case', nivaa:2, tittel:'Velg riktig emballering', intro:'Et lager vil sende UN 1203 bensin. Kolonne 7a viser 1 L. Vurder bare de oppgitte LQ-vilkårene; en virkelig forsendelse krever full kontroll.', steg:[
          {q:'Alternativ A: 10 beholdere à 1 L i egnet lukket kasse, 14 kg brutto. Første vurdering?',valg:[{t:'Kan være aktuelt når øvrige krav er oppfylt',ok:true,f:'Inneremballasjen er innenfor 1 L og kassen er under 30 kg brutto.'},{t:'Kan aldri brukes som LQ',ok:false,f:'De oppgitte mengdene ligger innenfor disse grensene.'},{t:'Er automatisk godkjent uten flere kontroller',ok:false,f:'Emballasje, merking, lastsikring og øvrige krav må fortsatt kontrolleres.'}]},
          {q:'Alternativ B: 2 beholdere à 5 L i kasse, 14 kg brutto. Hva er problemet?',valg:[{t:'Hver inneremballasje overskrider 1 L',ok:true,f:'Lav totalmengde i kassen opphever ikke grensen per inneremballasje.'},{t:'Kassen er for tung',ok:false,f:'14 kg er under 30 kg; inneremballasjen er problemet.'},{t:'Det er for få beholdere',ok:false,f:'Antallet i seg selv er ikke problemet.'}]},
          {q:'Alternativ C: 10 beholdere à 1 L i kasse, 32 kg brutto. Hva er problemet?',valg:[{t:'Kassen overskrider 30 kg brutto',ok:true,f:'Kolliets bruttomasse er for høy for denne emballeringsformen.'},{t:'Inneremballasjene er for store',ok:false,f:'1 L er innenfor kolonne 7a.'},{t:'LQ krever alltid tank',ok:false,f:'LQ gjelder kolli med små inneremballasjer.'}]}
        ]},
        { type:'tf', id:'lq-tf', nivaa:2, tittel:'LQ eller 1000-poeng?', ps:[
          ['Du kan avgjøre LQ ved bare å telle totalt antall liter på bilen.',false,'Du må kontrollere kolonne 7a, emballeringen og kolliets bruttomasse.'],
          ['1.1.3.6 og kapittel 3.4 er samme unntaksordning.',false,'De har ulike vilkår og skal vurderes hver for seg.'],
          ['Transportøren skal få opplysning om samlet brutto masse av LQ-godset før transport.',true,'Se 3.4.12.'],
          ['En 5-liters inneremballasje med bensin blir LQ dersom kassen veier under 30 kg.',false,'UN 1203 har 1 L i kolonne 7a i oppføringen brukt her.']
        ]},
        { type:'reflect', id:'lq-r1', nivaa:3, tittel:'Forklar forskjellen', q:'Forklar en medelev forskjellen mellom begrensede mengder etter kapittel 3.4 og mengdelempelsen etter 1.1.3.6. Bruk bensin som eksempel.', punkter:['LQ-grensen finnes i kolonne 7a','LQ vurderer blant annet mengde per inneremballasje og kolliets bruttomasse','1.1.3.6 bruker transportkategori og beregnet verdi per transportenhet','ordningene har forskjellige merke- og dokumentasjonsvilkår','bensin har 1 L i kolonne 7a i den brukte oppføringen','bensin er kategori 2 og multipliseres med 3 i 1.1.3.6.4'] }
      ]
    },
    {
      id: 'kontroll', lok: 'ADR-05', tittel: 'Dokumenter, utstyr og kolli',
      kort: 'Finn avvik før avgang og gi en presis melding om hva som må rettes.',
      bok: 'ADR/RID 2025: 1.4.3.1, 4.1.1.1, 5.4.1, 8.1.2, 8.1.4 og 8.1.5',
      mal: ['kontrollere sentrale godsopplysninger i transportdokumentet','finne krav til slokkeapparater ut fra tillatt totalvekt','kontrollere generelt og personlig verneutstyr','avvise skadet eller utett emballasje og begrunne valget'],
      punkter: [
        'Transportdokumentet skal blant annet ha <b>UN-nummer, varenavn, fareseddelnummer, emballasjegruppe</b> når den er tildelt, antall og beskrivelse av kolli, samlet mengde, avsender og mottaker.',
        'Når transporten skal gjennom en tunnel med restriksjoner, skal relevant <b>tunnelrestriksjonskode</b> føres etter godsopplysningene, se 5.4.1.1.1 k).',
        'For ordinær ADR-transport angir <b>8.1.4.1</b> slokkekapasitet etter transportenhetens største tillatte totalvekt: inntil 3,5 t minst 4 kg, over 3,5–7,5 t minst 8 kg, og over 7,5 t minst 12 kg pulver eller tilsvarende.',
        '<b>8.1.5</b> krever blant annet stoppekloss per kjøretøy, to frittstående varselsignaler og personlig utstyr til hvert medlem av mannskapet. Enkelte faresedler utløser tilleggsutstyr.',
        'Ved væske med fareseddel 3 kreves spade, tetning for sluk og oppsamlingsbeholder etter 8.1.5.3.',
        'Lasteren skal ikke overlevere skadet eller <b>utett emballasje</b> før skaden er utbedret, se 1.4.3.1.1 b). Lastsikring gjør ikke en lekkende kanne forsvarlig.'
      ],
      ndla: [['ADR/RID 2025',DSB_ADR,'DSB']], arbeidsbok:'',
      aktiviteter: [
        { type:'check', id:'kontroll-doc', nivaa:1, tittel:'Finn avvik i godsopplysningene', instr:'Kryss av radene som har avvik. Oppdraget gjelder UN 1203 bensin i kolli, 400 L, ordinær ADR-transport gjennom tunnel med restriksjoner.', dok:'Forenklet transportdokument', meta:'Dette er en øving. Avsender og mottaker er oppgitt korrekt i dokumentet.', kolonner:['Opplysning','Ført i dokumentet'], rader:[
          {c:['UN-nummer og varenavn','UN 1203 BENSIN'],avvik:false,f:'UN-nummer og varenavn er riktig.'},
          {c:['Fareseddel','3'],avvik:false,f:'Fareseddel 3 er riktig.'},
          {c:['Emballasjegruppe','III'],avvik:true,f:'UN 1203 bensin har emballasjegruppe II i oppføringen.'},
          {c:['Kolli','20'],avvik:true,f:'Kollitypen mangler; antall alene er ikke nok.'},
          {c:['Samlet mengde','400'],avvik:true,f:'Mengdeenheten mangler; det skal stå 400 L.'},
          {c:['Tunnelkode','Ikke ført'],avvik:true,f:'(D/E) skal med når transporten innebærer tunnel med restriksjoner.'}
        ], etter:'Et rettet øvingsutkast er: UN 1203 BENSIN, 3, II, (D/E). 20 kanner. Samlet mengde 400 L.' },
        { type:'quiz', id:'kontroll-utstyr', nivaa:2, tittel:'Kontroller slokkeapparater og utstyr', sp:[
          {q:'En transportenhet over 7,5 tonn har 2 kg + 6 kg pulver. Hva er problemet?',a:['Samlet kapasitet er bare 8 kg, kravet er minst 12 kg','Det er for mange apparater','2 kg-apparatet er alltid for stort','Det mangler fluktmaske for klasse 3'],r:0,f:'8.1.4.1 krever minst to apparater og samlet kapasitet minst 12 kg for denne vektklassen.'},
          {q:'To personer er i mannskapet, men det finnes bare én beskyttelsesbrille. Riktig vurdering?',a:['Én brille mangler','Én brille er nok per kjøretøy','Briller kreves bare i tank','Briller kan erstattes av varselvest'],r:0,f:'Hvert medlem av mannskapet skal ha øyebeskyttelse.'},
          {q:'Hva kreves i tillegg for væske med fareseddel 3?',a:['Spade, tetning for sluk og oppsamlingsbeholder','Bare fluktmaske','Kjetting og jekk','Ingen ting'],r:0,f:'Se 8.1.5.3.'},
          {q:'Hvor mange stoppeklosser kreves minst for én lastebil uten tilhenger?',a:['Én av egnet størrelse','To per aksel','Ingen','Fire'],r:0,f:'Minst én stoppekloss per kjøretøy.'}
        ]},
        { type:'case', id:'kontroll-case', nivaa:2, tittel:'Kan vi kjøre nå?', intro:'Du oppdager én lekkende kanne UN 1203. Kannen står fast og kan ikke velte. Transportlederen sier at lasten må gå nå.', steg:[
          {q:'Hva svarer du?',valg:[{t:'Avgang må vente; lekk emballasje kan ikke overleveres før skaden er utbedret',ok:true,f:'Se 1.4.3.1.1 b) og 4.1.1.1.'},{t:'Kjør fordi kannen er sikret',ok:false,f:'Lastsikring hindrer ikke lekkasje og opphever ikke emballasjekravet.'},{t:'Tørk av utsiden og kjør uten ny kontroll',ok:false,f:'Å skjule tegn på lekkasje løser ikke skaden.'}]},
          {q:'Hva gjør du videre?',valg:[{t:'Sikrer området, varsler ansvarlig og følger virksomhetens rutine for forsvarlig håndtering',ok:true,f:'Ikke håndter farlig gods uten riktig kompetanse, utstyr og prosedyre.'},{t:'Heller innholdet over i en tilfeldig kanne',ok:false,f:'Emballasje og ompakking krever kontrollert, godkjent løsning og riktig kompetanse.'},{t:'Ber kunden overta ansvaret',ok:false,f:'Hver aktør må oppfylle sine egne plikter.'}]},
          {q:'Hva bør avviksmeldingen inneholde?',valg:[{t:'Hva som er feil, hvilken regel som er relevant og hva som må rettes før ny kontroll',ok:true,f:'En presis melding gjør det mulig å korrigere og dokumentere.'},{t:'Bare ordet «feil»',ok:false,f:'Mottakeren trenger konkret informasjon.'},{t:'Navnet på den som pakket, uten fakta om avviket',ok:false,f:'Fokuser på observerbare forhold og nødvendige tiltak.'}]}
        ]},
        { type:'reflect', id:'kontroll-r1', nivaa:3, tittel:'Skriv avviksmeldingen', q:'Skriv en kort melding til transportlederen. Dokumentet har feil emballasjegruppe, mangler kollitype, liter og tunnelkode. Slokkekapasiteten er 8 kg i stedet for 12 kg, én beskyttelsesbrille, tetning for sluk og oppsamlingsbeholder mangler, og én kanne lekker.', punkter:['slår fast at avgang må vente','beskriver dokumentmanglene konkret','beskriver manglende slokkekapasitet','beskriver manglende personlig og øvrig utstyr','beskriver lekkasjen og at den må håndteres før transport','ber om ny kontroll før transporten frigis'] }
      ]
    },
    {
      id: 'tunnel', lok: 'ADR-06', tittel: 'Tunnel og rutevalg',
      kort: 'Tolk tunnelkoden riktig for kolli, tank og bulk – også under tidspress.',
      bok: 'ADR/RID 2025: tabell A kolonne 15 og 8.6.3–8.6.4',
      mal: ['finne tunnelrestriksjonskoden i tabell A','tolke en delt kode ut fra transportmåten','velge en rute og forklare valget','vite hvilke opplysninger som må kontrolleres i en virkelig ruteplan'],
      punkter: [
        'Tunnelrestriksjonskoden finnes i <b>kolonne 15</b>. Koden skal ses i sammenheng med 8.6 og transportmåten.',
        'UN 1203 bensin har koden <b>(D/E)</b> i oppføringen brukt her.',
        'Ved <b>tank eller bulk</b> betyr D/E at passasje er forbudt i tunneler av kategori D og E.',
        'Ved <b>annen transport, blant annet kolli</b>, betyr D/E at passasje er forbudt i kategori E. Kollitransport kan etter akkurat denne bestemmelsen passere kategori D.',
        'Koden er ikke hele ruteplanen. Kontroller aktuell skilting, tunnelkategori, hele lasten, lokale og tidsavhengige restriksjoner og driftsforhold.',
        'Et kort tunnelstrekk eller en stram leveringstid gir <b>ikke unntak</b> fra restriksjonen.'
      ],
      ndla: [['ADR/RID 2025 – tunnelrestriksjoner',DSB_ADR,'DSB']], arbeidsbok:'',
      aktiviteter: [
        { type:'quiz', id:'tunnel-q1', nivaa:1, tittel:'Les koden D/E', sp:[
          {q:'Hvor finner du tunnelrestriksjonskoden for et stoff?',a:['Tabell A kolonne 15','Kolonne 7a','5.4.3.4','8.1.5'],r:0,f:'Kolonne 15 viser transportkategori og tunnelkode.'},
          {q:'Hva betyr D/E for UN 1203 i kolli?',a:['Forbud i tunnelkategori E','Forbud i både D og E','Tillatt i alle tunneler','Bare forbud i B'],r:0,f:'Andre transportmåter enn tank/bulk bruker delen etter skråstreken.'},
          {q:'Hva betyr D/E ved transport i tank?',a:['Forbud i D og E','Bare forbud i E','Ingen restriksjon','Bare forbud i A'],r:0,f:'Tank/bulk bruker delen før skråstreken.'},
          {q:'Hva må alltid kontrolleres i virkelig ruteplanlegging?',a:['Aktuell skilting, tunnelkategori, hele lasten og lokale forhold','Bare kjørelengden','Bare været','Bare GPS-forslaget'],r:0,f:'GPS alene dokumenterer ikke at ruten er tillatt.'}
        ]},
        { type:'case', id:'tunnel-case', nivaa:2, tittel:'Velg rute for bensin i kolli', intro:'Du kjører 400 L UN 1203 bensin i kolli som ordinær ADR-transport. Rute 1 går gjennom en fiktiv tunnel kategori D. Rute 2 går gjennom kategori E. Rute 3 går utenom og tar 25 minutter ekstra.', steg:[
          {q:'Hvilken kode finner du i tabell A?',valg:[{t:'D/E',ok:true,f:'UN 1203 har (D/E) i oppføringen.'},{t:'B/C',ok:false,f:'Kontroller kolonne 15 for UN 1203.'},{t:'Ingen kode',ok:false,f:'Oppføringen har tunnelrestriksjonskode.'}]},
          {q:'Hvilke ruter er mulige etter de oppgitte tunnelbestemmelsene?',valg:[{t:'Rute 1 eller rute 3',ok:true,f:'Kolli med D/E kan passere kategori D, men ikke E. Øvrige forhold må også kontrolleres.'},{t:'Bare rute 2',ok:false,f:'Kategori E er forbudt for denne kollitransporten.'},{t:'Alle tre',ok:false,f:'Kort tunnel gir ikke unntak.'}]},
          {q:'Transportlederen sier «Ta rute 2, tunnelen er kort». Hva svarer du?',valg:[{t:'Jeg kan ikke bruke kategori E med denne kollilasten; vi må bekrefte rute 1 eller 3',ok:true,f:'Svaret er saklig, presist og løsningsorientert.'},{t:'Greit, siden du bestemmer',ok:false,f:'Føreren må ikke gjennomføre en åpenbart ulovlig plan.'},{t:'Jeg kjører fort gjennom',ok:false,f:'Fart eller tid i tunnelen endrer ikke restriksjonen.'}]}
        ]},
        { type:'tf', id:'tunnel-tf', nivaa:2, tittel:'Sant eller usant: rutevalg', ps:[
          ['D/E betyr alltid forbud i både D og E uansett transportmåte.',false,'Koden skiller mellom tank/bulk og annen transport.'],
          ['Kollitransport av UN 1203 med kode D/E kan etter denne bestemmelsen passere kategori D.',true,'Kategori E er forbudt for kolli i dette eksemplet.'],
          ['GPS-ruten er tilstrekkelig dokumentasjon på at tunnelen er tillatt.',false,'Kontroller skilting, kategori, last og lokale forhold.'],
          ['Tidspress kan gjøre det forsvarlig å ignorere tunnelkoden.',false,'Restriksjonen gjelder uavhengig av leveringsfristen.']
        ]},
        { type:'reflect', id:'tunnel-r1', nivaa:3, tittel:'Svar transportlederen', q:'Skriv det du vil si til en transportleder som ber deg bruke en tunnel av kategori E med UN 1203 bensin i kolli. Vær tydelig, respektfull og løsningsorientert.', punkter:['viser til kode D/E','forklarer at kollitransporten ikke kan passere kategori E','skiller kolli fra tank eller bulk','avviser tidspress som begrunnelse','foreslår rute D eller rute uten tunnel','ber om bekreftelse på en kontrollert ruteplan'] }
      ]
    },
    {
      id: 'uhell', lok: 'ADR-07', tittel: 'Uhell og skriftlige instruksjoner',
      kort: 'Prioriter mennesker, varsle presist og unngå tiltak som gjør situasjonen farligere.',
      bok: 'ADR/RID 2025: 5.4.3.4, 8.1.5 og landtransportforskriften § 6',
      mal: ['bruke de skriftlige instruksjonene i et uhellsscenario','plassere meg på trygg avstand og vindsiden','varsle nødetatene med presise opplysninger','skille mellom en mindre brann i motorrommet og brann i lasterommet'],
      punkter: [
        'Stans, sett på bremsene, stopp motoren og unngå tennkilder når dette er <b>trygt og praktisk mulig</b>.',
        'Varsle relevante nødetater. Oppgi sted, hendelse, UN-nummer eller gods, kjent mengde, lekkasje eller brann, skadde og sikker tilkomst.',
        'Ta på varselvest og sett ut varselsignaler bare når dette kan gjøres uten å gå inn i fareområdet.',
        'Ikke gå i søl eller pust inn gass, røyk, støv eller damp. Hold deg på <b>vindsiden</b> – der vinden kommer fra.',
        'Ha transportdokumentene tilgjengelige for utrykningspersonell uten å utsette deg selv for fare.',
        'Mannskapet skal <b>ikke forsøke å slokke brann i lasterommet</b>. En mindre brann i dekk, bremser eller motorrom kan bare bekjempes når det er hensiktsmessig og trygt.'
      ],
      ndla: [['Skriftlige instruksjoner og ADR/RID 2025',DSB_ADR,'DSB']], arbeidsbok:'',
      aktiviteter: [
        { type:'quiz', id:'uhell-q1', nivaa:1, tittel:'Første valg ved lekkasje', sp:[
          {q:'Hvor bør du oppholde deg i forhold til vinden?',a:['På vindsiden, der vinden kommer fra','I retningen dampen blåser','Inne i lasterommet','Rett ved lekkasjen'],r:0,f:'Da reduserer du risikoen for å puste inn damp eller røyk.'},
          {q:'Hva gjør du med transportdokumentene?',a:['Gjør dem tilgjengelige for utrykningspersonell uten å utsette deg for fare','Kaster dem','Går inn i fareområdet for å hente dem uansett','Sender dem hjem'],r:0,f:'Dokumentene hjelper nødetatene, men egen sikkerhet går først.'},
          {q:'Skal mannskapet slokke brann i lasterommet?',a:['Nei','Ja, alltid','Bare uten verneutstyr','Bare hvis leveringen haster'],r:0,f:'Skriftlige instruksjoner sier at mannskapet ikke skal forsøke dette.'},
          {q:'Når kan du bruke kjøretøyets apparat på en mindre motorromsbrann?',a:['Når det er hensiktsmessig og trygt','Alltid','Aldri','Bare etter lossing'],r:0,f:'Risikoen må vurderes før tiltak.'}
        ]},
        { type:'case', id:'uhell-case', nivaa:2, tittel:'Lekkasjen utvikler seg', intro:'En lastebil med UN 1203 bensin i kolli har kollidert på et åpent område. Det lekker og lukter bensin. Vindretningen er kjent. Du står på trygg avstand. Ingen synlig brann ennå.', steg:[
          {q:'Hva prioriterer du først?',valg:[{t:'Egen og andres sikkerhet, avstand, vindsiden og varsling',ok:true,f:'Ikke gå inn i søl eller damp for å redde materiell.'},{t:'Å levere lasten i tide',ok:false,f:'Mennesker og omgivelser kommer først.'},{t:'Å hente mobilen fra førerhuset selv om det ligger i dampen',ok:false,f:'Ikke gå inn i fareområdet.'}]},
          {q:'Hva sier du til 110 i øvingen?',valg:[{t:'Presist sted, hendelse, UN 1203 bensin, lekkasje, mulig eksponering, kjent vindretning og trygg tilkomst',ok:true,f:'Gi fakta og svar på spørsmål uten å gjette.'},{t:'Bare «det er farlig»',ok:false,f:'Nødetatene trenger konkrete opplysninger.'},{t:'At alt er under kontroll',ok:false,f:'Ikke bagatelliser en lekkasje av bensin.'}]},
          {q:'Det begynner å brenne i lasterommet. Hva gjør du?',valg:[{t:'Trekker unna, oppdaterer nødetatene og advarer andre',ok:true,f:'Mannskapet skal ikke slokke brann i lasterommet.'},{t:'Åpner lasterommet og går inn med et apparat',ok:false,f:'Dette kan utsette deg for ekstrem fare og er i strid med instruksjonene.'},{t:'Kjører videre',ok:false,f:'Flytting kan forverre hendelsen og utsette flere.'}]}
        ]},
        { type:'reflect', id:'uhell-r1', nivaa:3, tittel:'Lag en 110-melding', q:'Skriv en simulert melding til 110 for hendelsen. Ikke ring et virkelig nødnummer. Meldingen skal gi nødetatene det de trenger, uten at du gjetter.', punkter:['presist sted og tilkomst','at det gjelder lastebil og kollisjon','UN 1203 bensin i kolli','lekkasje og eventuell brann','kjente skader eller personer i fare','vindretning og hvor du står','kjent mengde når den er tilgjengelig','kontaktinformasjon og at du følger instrukser'] },
        { type:'voks', id:'uhell-voks', tittel:'Hjelpsom betyr ikke hensynsløs', tekst:['I en ulykke kan det føles modig å løpe nærmere. Ved farlig gods kan det gjøre at én skadet person blir til flere. Den beste hjelpen kan være å stoppe, skape avstand, varsle presist og hindre andre i å gå inn i fareområdet.','Ansvar handler også om å kjenne grensen for hva du selv skal gjøre, og når fagpersonell må overta.'], sporsmal:['Hva kan få deg til å ta større risiko enn du burde?','Hvordan kan du være handlekraftig samtidig som du holder avstand?'], handling:'Øv på å si høyt: «Stopp. Hold avstand. Jeg varsler og gir deg informasjon.»' }
      ]
    },
    {
      id: 'oppdrag', lok: 'ADR-08', tittel: 'Samlet transportoppdrag',
      kort: 'Bruk boka selvstendig: beregn, kontroller, velg rute og håndter et nytt vilkår.',
      bok: 'ADR/RID 2025: bruk oppslagene fra ADR-01 til ADR-07',
      mal: ['planlegge et avgrenset farlig gods-oppdrag med ADR-boka','dokumentere beregning, henvisning og beslutning','oppdage når ny informasjon endrer konklusjonen','vurdere egen faglig og sosial læring'],
      punkter: [
        'Et godt svar følger mønsteret <b>funn → henvisning → betydning → beslutning</b>.',
        'Skriv mellomregningen. Da kan en kollega kontrollere både tall og forutsetninger.',
        'Når kunden endrer mengden, må du <b>beregne og vurdere på nytt</b>. Den gamle beslutningen gjelder ikke automatisk.',
        'Et avvik i emballasje, dokument, utstyr eller rute kan bety at transporten må vente selv om mengdeberegningen er riktig.',
        'Arbeid først i makkerpar: én finner, én kontrollerer. Bytt rolle. Gjør deretter sluttkontrollen alene.',
        'Bruk klassens verdier: trygghet, respekt, inkludering, samarbeid og ansvarlighet.'
      ],
      ndla: [['ADR/RID 2025',DSB_ADR,'DSB'],['Læreplan ADR kompetansebevis',DSB_PLAN,'DSB']], arbeidsbok:'',
      aktiviteter: [
        { type:'quiz', id:'oppdrag-q1', nivaa:1, tittel:'Hent fram det viktigste', sp:[
          {q:'Hvor starter du når du får UN 1203?',a:['Tabell A i 3.2','Kapittel 8.6 uten å slå opp stoffet','Google Maps','Skriftlige instruksjoner side 4'],r:0,f:'Start med riktig oppføring i tabell A.'},
          {q:'Hva betyr en beregnet verdi på 970 i oppdraget med kategori 2 og 3?',a:['Mengdevilkåret kan være oppfylt, men øvrige vilkår må kontrolleres','Transporten er automatisk godkjent','Alle merker kan fjernes','Føreren trenger ingen opplæring'],r:0,f:'970 er bare én del av vurderingen.'},
          {q:'Hva gjør du med en lekkende kanne?',a:['Stanser klargjøringen og varsler ansvarlig','Sikrer den litt bedre og kjører','Skjuler lekkasjen','Ber kunden godkjenne den'],r:0,f:'Utett emballasje skal ikke overleveres før skaden er utbedret.'},
          {q:'Hva gjør du ved brann i lasterommet?',a:['Trekker unna og varsler/oppdaterer nødetatene','Går inn med apparat','Åpner alle kolli','Kjører til nærmeste kunde'],r:0,f:'Mannskapet skal ikke forsøke å slokke brann i lasterommet.'}
        ]},
        { type:'case', id:'oppdrag-case', nivaa:2, tittel:'Fra bestilling til beslutning', intro:'Du skal levere 240 L UN 1203 bensin og 250 L UN 1202 diesel i korrekt klassifiserte, godkjente og merkede kolli. Ingen annen last eller andre unntak er aktuelle. LQ brukes ikke.', steg:[
          {q:'Hva blir verdien etter 1.1.3.6.4?',valg:[{t:'970',ok:true,f:'240 × 3 + 250 × 1 = 970.'},{t:'490',ok:false,f:'Bensin i kategori 2 skal multipliseres med 3.'},{t:'1240',ok:false,f:'Kontroller faktorene.'}]},
          {q:'Kunden legger til 30 L bensin. Hva blir ny verdi og konsekvens?',valg:[{t:'1060; mengdelempelsen kan ikke brukes slik lasten nå er beskrevet',ok:true,f:'270 × 3 + 250 = 1060.'},{t:'1000; alt er fortsatt uendret',ok:false,f:'30 L bensin gir 90 nye poeng.'},{t:'1030; bare dokumentet må endres',ok:false,f:'Beregningen er feil, og konsekvensen er større enn et dokumenttillegg.'}]},
          {q:'En kanne lekker. Hva har høyest prioritet?',valg:[{t:'Stanse klargjøringen og få avviket håndtert før ny kontroll',ok:true,f:'Mengdeberegningen gjør ikke utett emballasje lovlig.'},{t:'Holde leveringstiden',ok:false,f:'Sikkerhet og regelverk kommer først.'},{t:'Flytte kannen bakerst i bilen',ok:false,f:'Plassering utbedrer ikke skaden.'}]},
          {q:'Ordinær kollitransport av UN 1203 skal gjennom kategori E. Hva gjør du?',valg:[{t:'Velger en annen kontrollert rute',ok:true,f:'D/E forbyr denne kollitransporten i kategori E.'},{t:'Kjører fordi lasten er i kolli',ok:false,f:'Kolli er bare tillatt gjennom kategori D, ikke E, i dette eksemplet.'},{t:'Fjerner tunnelkoden fra dokumentet',ok:false,f:'Å fjerne opplysningen endrer ikke restriksjonen.'}]}
        ]},
        { type:'reflect', id:'oppdrag-r1', nivaa:3, tittel:'Skriv den samlede beslutningen', q:'Skriv en beslutning for oppdraget etter at kunden har lagt til 30 L bensin, én kanne lekker og den opprinnelige ruten går gjennom tunnelkategori E. Oppgi relevante beregninger og ADR-henvisninger og si hva som må skje før avgang.', punkter:['viser beregningen 270 × 3 + 250 = 1060','forklarer at 1.1.3.6 ikke kan brukes slik lasten er beskrevet','viser til 1.4.3.1.1 b) eller 4.1.1.1 om lekk emballasje','viser til D/E og 8.6.4 om kategori E','stanser avgang og beskriver nødvendige rettelser','krever ny samlet kontroll før transporten frigis'] },
        { type:'voks', id:'oppdrag-voks', tittel:'Å være den som sier fra', tekst:['Noen ganger er det enkleste å være stille og håpe at noen andre tar ansvaret. I transportbransjen kan en rolig og tydelig beskjed være det som hindrer et uhell.','Du trenger ikke være høylytt for å være tydelig. Beskriv hva du har observert, vis til kravet og foreslå neste trygge handling. Det er faglighet i praksis.'], sporsmal:['Hvilken av klassens verdier trenger du mest når du må stanse et oppdrag?','Hvordan kan du si fra uten å angripe personen som gjorde feilen?'], handling:'Bruk denne strukturen neste gang: «Jeg ser … Kravet sier … Derfor må vi …»' },
        { type:'reflect', id:'oppdrag-egen', tittel:'Egenvurdering etter økten', q:'Velg én faglig ferdighet og én av klassens verdier. Beskriv konkret hva du mestret, og hva du vil gjøre bedre neste gang.', punkter:['nevner en konkret ADR-henvisning eller oppslagsferdighet','forklarer hva ferdigheten brukes til','velger trygghet, respekt, inkludering, samarbeid eller ansvarlighet','gir et konkret eksempel fra eget arbeid','formulerer ett tydelig neste øvingsmål'] }
      ]
    }
  ]
});
