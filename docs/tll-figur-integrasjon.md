# TLL-figuren – integrasjonsplan

Status: Klargjort for implementering. Ingen endringer er publisert.

## Originalmateriale
Bruk den godkjente animerte TLL-figuren fra samtalen 5. november 2026: svart TLL-jakke, lager/truck, uten ring på hånden. Originalbildet er ikke lagt inn i GitHub ennå. Ikke erstatt det med generiske bilder.

## Nettsted
- /assistent/: Lite profilbilde ved TLL-assistentens åpning. Animer én gang ved første visning i en nettleserøkt, deretter statisk poster.
- /om/: Figuren ved personlig introduksjon, med play/pause.
- Lær–Øv–Tenk–Voks: Tommel opp kun etter at oppgaven faktisk er fullført, ikke ved feil svar.
- Ikke legg en animasjon i navigasjonen eller på alle sider.

## Tilgjengelighet og ytelse
- Respekter prefers-reduced-motion; bruk stillbilde uten autoplay.
- Tilby pause/stopp for bevegelse som varer mer enn fem sekunder.
- Optimaliser til WebP/MP4 for web, behold GIF som delingsformat; poster i WebP.
- Lazy-load utenfor første skjermbilde, angi bredde/høyde, alt-tekst og unngå layout shift.
- Ikke vis en manglende/broken asset: deploy først når asset er lastet opp.

## Sosiale medier
- Kort 1–2 sekunders outro, 1080×1920 for Reels/Shorts/TikTok, uten lyd som standard.
- Ikke autopubliser før endelig videofil og kontoer er verifisert.

## Akseptansekriterier
1. Godkjent figur uten ring i alle rammer.
2. Samme identitet, profil og TLL-merke i web og video.
3. Ikke kontinuerlig distraherende animasjon under læring.
4. Test på mobil og desktop, inkludert redusert bevegelse.
5. Verifiser at alle ressursfiler faktisk finnes før merge.
