# Samlet Lærerrom – kompetansemål, oppgaver og innleveringer

Status: Migreringsplan. **Ikke** en ferdig, sikker elevdatabase. Denne planen viderefører arkitekturen fra PR #4, som lukkes for å unngå en utdatert utviklingsgren.

## Mål og kilder
- Én inngang: `https://tllfluenseren.no/laererrom/`, med blågrønn lærerprofil.
- Eksisterende Kompetansemålsregnskap: `https://kompetansemaalsregnskap.jarle-bruntveit.chatgpt.site/`. Bevar eksisterende elevregister, vurderingshistorikk, programfag (27 mål), YFF, UB og sosial læring. **Ingen direkte databasekobling er etablert ennå.**
- Eksisterende separat Lærerrom: `https://tll-laererrom.jarle-bruntveit.chatgpt.site/`. Kartlegg og migrer dokumentmaler, elevfremdrift og andre funksjoner før avvikling.
- Oppgaver publiseres på TLLfluenseren. Innleveringer, observasjoner og vurderinger samles i den beskyttede lærerløsningen.

## Samlet arbeidsflyt
1. Lærer velger fag → kapittel/emne → oppgave eller innlevering → kompetansemål og vurderingskriterier.
2. Oppgaven tildeles klasse, gruppe eller enkeltelev, og kan leveres gjennom en godkjent innleveringskanal (for eksempel Teams).
3. Lærer kobler innlevering, prøve, praktisk observasjon eller samtale til oppgaven og eleven.
4. Lærer vurderer per kompetansemål og skriver fremovermelding. Samme registrering oppdaterer elevkort, klasseoversikt og kompetansemålsregnskap; ingen dobbelregistrering.
5. Elev- og klasserapporter viser vurderte, påbegynte og **ikke påbegynte** mål og oppgaver. Lærer kan korrigere med historikk.
6. Skoleår avsluttes med kontrollert arkivering, og nytt år opprettes uten å slette historikk.

## Datamodell
- schools, school_years, teachers, classes, students
- curriculum_goals (fag, læreplanversjon, måltekst), chapters, topics
- assignments (oppgave-id, kilde-URL, fag, emne, vurderingskriterier)
- assignment_goals (oppgave-id, mål-id; mange-til-mange)
- assignment_targets (oppgave-id, klasse/gruppe/elev, frist)
- submissions (oppgave-id, elev-id, tidspunkt, lagringsreferanse, status)
- evidence (elev-id, oppgave-id, kilde: innlevering/observasjon/samtale/prøve)
- assessments (elev-id, oppgave-id, lærer-id, dato, nivå/karakter, fremovermelding)
- assessment_goals (vurdering-id, kompetansemål-id, nivå)
- audit_log (endringer, aktør, tidspunkt), archive_exports (skoleår, referanse, kontrollsum)

## Vurderingsprinsipper
- Progresjon eller quizresultat gir aldri automatisk standpunktkarakter.
- Samme motor støtter individuell og klassevis registrering, først pilot Kapittel 1 Varemottak.
- Programfag 1–6 etter lærers vurdering; YFF underveis lav/middels/høy, halvår/standpunkt etter gjeldende praksis; UB formativt koblet til relevante mål; sosial læring holdes adskilt fra fagkarakter.
- Fremovermelding og historikk per elev, fag, emne og skoleår.

## Sikkerhet og migrering
- GitHub Pages er statisk. En passordboks i JavaScript er **ikke** sikker autentisering eller tilgangskontroll for elevopplysninger.
- Krever backend, sikker autentisering, autorisasjon per skole/klasse og serverstyrte regler for data og filer.
- Før reelle elevdata flyttes: avklar skoleeiers godkjenning, behandlingsgrunnlag, databehandleravtale, risikovurdering, lagringstid og eventuell Teams/M365-integrasjon.
- Ikke legg elevnavn, innleveringer, karakterer, tokens eller passord i offentlig GitHub, klientkode eller localStorage.
- Kartlegg eksport/import og datatilgang fra begge eksisterende chatgpt.site-appene; ikke slett dem før verifisert migrering og backup.
- Test først med syntetiske elevdata, deretter sikkerhets- og funksjonstest.

## Gjennomføringsrekkefølge
1. Bevar denne spesifikasjonen i main; rydd gamle PR-er.
2. Synliggjør kompetansemålsregnskapet fra Lærerrommet som midlertidig ekstern ressurs, tydelig merket.
3. Skaff kode-/datatilgang eller eksport fra eksisterende kompetansemålsapp og separat Lærerrom; velg godkjent identitet/backend.
4. Bygg felles elev-/klasse- og oppgavemodell, med klassevis vurdering av Varemottak som pilot.
5. Koble oppgaver og innleveringer til kompetansemål, rapporter og skoleårsarkiv.
6. Test migrering og tilganger. Bytt lenker til intern løsning og avvikle eksterne sider **først når** funksjonene er verifisert.
