# Gjestefag

Andre programfag (INT, KJT, HO …) har egne sider på TLLfluenseren.

```
gjestefag/
  index.html              Inngang med alle gjestefag (åpen)
  felles/                 fag.js (liste over fag), laas.js (kryptering), gjesterom.js (låseskjerm), gjesterom.css
  <fag>/index.html        Fagets elevressurser (åpen)
  <fag>/<ressurs>/        Elevsider, f.eks. int/skjaeredata/, kjt/motorer/, ho/bankende-hjerte/ (åpne)
  <fag>/laererrom/        Gjestelærerens rom (låst med passord)
    index.html            Skall med låseskjerm
    innhold.enc.js        Kryptert innhold (HTML) – lages i /laererrom/gjesterom/
    *.js                  Eventuelle verktøy som startes når rommet åpnes (hendelsen «gjesterom:apnet»)
```

## Tilgang

- Elevsidene er åpne.
- Hvert lærerrom er kryptert (AES-GCM 256, PBKDF2-SHA256 600 000 iterasjoner) med to nøkler:
  **fagets passord** for gjestelærerne og **adminpassordet** for eieren av nettstedet.
- Passord byttes, innhold redigeres og nye fag opprettes i `/laererrom/gjesterom/`. Siden lager en ny
  `innhold.enc.js` som lastes opp til riktig mappe. Klartekst og passord skal aldri inn i repoet.
- Repoet er offentlig. Alt som ikke ligger i `innhold.enc.js`, kan leses av alle (også koden i `*.js`).
  Legg derfor fasit, løsningsforslag og lærernotater i det krypterte innholdet.
- Lærerrommene lagrer ingen elevdata. Vurderingsverktøyene leser elevenes PDF-er lokalt i nettleseren.

## Gamle adresser

`/int/` og `/int/interaktiv-3d/` sender videre til de nye adressene under `/gjestefag/int/`.

## Python i nettleseren

`ho/bankende-hjerte/` kjører Python med Skulpt (`/assets/vendor/skulpt/`, MIT). Skulpt lastes først når eleven trykker «Kjør».

## 3D-hjertet (HO)

`ho/hjerte-3d/hjerte.glb` og `blodbane.json` lages av `ho/hjerte-3d/lag_hjerte.py` (`pip install numpy trimesh`, kjør i mappen). Kjør skriptet på nytt etter endringer i geometrien. Fagteksten ligger i `deler.js` (id = navnet på delen i GLB-filen). Siden bruker `GLTFLoader` fra `/assets/vendor/three/addons/`.
