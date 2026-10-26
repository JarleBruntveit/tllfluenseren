# Lærerrom og kompetansemålsregnskap – pilot

Status: Arkitektur og utviklingsplan. Ingen elevdata, innlogging eller vurderinger er publisert.

## Prinsipp
- Åpen undervisningsplattform: anonym læring, ingen skolekonto kreves.
- Separat lærerrom med autentisering, rollebasert tilgang og sikker lagring.
- Pilot: Transport, logistikk og løfteoperasjoner → Kapittel 1.
- Senere: øvrige programfag, YFF og ungdomsbedrift via samme vurderingsmotor.
- Ingen elevdata i offentlig GitHub-repository, JavaScript-bundle, nettleser-localStorage eller offentlig tilgjengelige statiske filer.

## Datastruktur
- schools (id, name)
- school_years (id, school_id, label, status, archived_at)
- teachers (id, school_id, auth_user_id, role)
- classes (id, school_year_id, name)
- students (id, class_id, external_student_ref, display_name)
- curriculum_goals (id, curriculum_version, subject, code, description)
- chapters (id, subject, title)
- topics (id, chapter_id, title)
- topic_goals (topic_id, curriculum_goal_id)
- submissions (id, student_id, topic_id, activity_id, submitted_at, payload_ref)
- evidence (id, student_id, topic_id, teacher_id, type, recorded_at, note)
- assessments (id, student_id, topic_id, teacher_id, assessed_at, status, summary, next_steps)
- assessment_criteria (id, assessment_id, criterion_code, level)
- assessment_goals (assessment_id, curriculum_goal_id)
- archive_exports (id, school_year_id, created_at, checksum, storage_ref)

## Vurderingsprinsipper
- Oppgaveprogresjon er ikke automatisk karaktergrunnlag.
- Kriterier: faglig forståelse, anvendelse, begrunnelse, samhandling/HMS, tilpasset tema.
- Lærer vurderer og kan overstyre, rette og kommentere med revisjonshistorikk.
- Beviskilder: digital oppgave, praktisk observasjon, samtale, prøve.
- Kobling mange-til-mange mellom vurdering og kompetansemål.
- Felles historikk og fremovermelding per elev/fag.

## Skoleår
1. Avslutt skoleår krever bekreftelse, autorisasjon og kontroll av uferdige vurderinger.
2. Lag uforanderlig, lesbart arkiv med eksport etter skolens krav.
3. Opprett nytt skoleår med ny klasse/elevliste; behold maler og læreplanmapping.
4. Ingen destruktiv reset; separat tilgang til tidligere år og godkjent sletterutine.
5. Retensjon og sletting avklares med skoleeier før reelle elevdata tas i bruk.

## Sikkerhet og utrulling
- Bruk godkjent identitetsløsning og backend med serverstyrt tilgangskontroll; ikke delt passord.
- Skoleeier må avklare behandlingsgrunnlag, databehandleravtale, risikovurdering og lagringstid.
- Pilot med syntetiske elevdata først; ikke ekte elevnavn før avklaringer.
- Lærerrom skal ikke være synlig som offentlig navigasjon for eksterne skoler.
- Separate offentlige og private API-ruter; ingen direkte tillit til klientrapporterte quizresultater.

## Leveransefaser
1. Demo med fiktive elever: klasseoversikt, elevkort, tema 1–7, vurderingskort, skoleårsarkiv.
2. Backend, autentisering og datatilgang; sikkerhetstesting.
3. Innlevering via elevkode eller elevinnlogging og kobling til oppgaver.
4. Kompetansemålsregnskap, vurderingshistorikk og rapporter.
5. Utvidelse til flere fag og eventuelt separate skoleområder.
