"""
Fra Python-kode til bankende 3D-hjerte
======================================
Dette programmet bygger en forenklet 3D-modell av hjertet og lagrer den som
en GLB-fil (et vanlig 3D-format). Nettsiden leser filen og lar deg snu,
ta fra hverandre og se hjertet slå.

Modellen er laget for undervisning. Den er ikke anatomisk nøyaktig.

Slik kjører du programmet selv:
    pip install numpy trimesh
    python lag_hjerte.py

Koordinater (omtrent centimeter):
    x  = sideveis. Negativ x er pasientens HØYRE side (til venstre på skjermen).
    y  = opp/ned.
    z  = forover/bakover. Positiv z peker ut av brystet, mot deg.
GLB-filen kan også åpnes i Blender, Unity, Unreal Engine eller MetaSteps.
"""
import json
import numpy as np
import trimesh

# ------------------------------------------------------------------
# Farger (rød, grønn, blå, gjennomsiktighet) – verdier fra 0 til 255
# ------------------------------------------------------------------
MUSKEL = [200, 65, 79, 255]       # hjertemuskel i kamrene
FORKAMMER = [214, 96, 106, 255]   # forkamrene er litt lysere
RODT_BLOD = [224, 58, 58, 255]    # oksygenrikt blod (arterier fra venstre side)
BLATT_BLOD = [59, 111, 216, 255]  # oksygenfattig blod
LUNGEVENE = [232, 96, 112, 255]
KORONAR = [255, 138, 60, 255]
KLAFF = [242, 193, 78, 255]


# ------------------------------------------------------------------
# Hjelpefunksjoner
# ------------------------------------------------------------------
def roter_y_mot(retning):
    """Lager en rotasjonsmatrise som snur y-aksen slik at den peker i 'retning'."""
    y = np.array([0.0, 1.0, 0.0])
    r = np.asarray(retning, float)
    r = r / np.linalg.norm(r)
    akse = np.cross(y, r)
    if np.linalg.norm(akse) < 1e-9:
        return np.eye(4)
    vinkel = np.arccos(np.clip(np.dot(y, r), -1, 1))
    return trimesh.transformations.rotation_matrix(vinkel, akse)


class Kammer:
    """En ellipsoide («avlang ball») som kan smalne av nedover mot en spiss.
    Brukes til både hjertekamre og forkamre."""

    def __init__(self, sentrum, radier, retning=(0, 1, 0), spiss=0.0):
        self.sentrum = np.asarray(sentrum, float)
        self.radier = np.asarray(radier, float)
        self.rot = roter_y_mot(retning)
        self.spiss = spiss  # 0 = vanlig ellipsoide, 0.5 = tydelig spiss nederst

    def avsmalning(self, y):
        # y går fra -1 (nederst) til 1 (øverst)
        t = np.clip((y + 1) / 2, 0, 1)
        return 1 - self.spiss * (1 - t) ** 2

    def lag_mesh(self, farge):
        kule = trimesh.creation.icosphere(subdivisions=4, radius=1.0)
        v = kule.vertices.copy()
        v[:, 0] *= self.avsmalning(v[:, 1])
        v[:, 2] *= self.avsmalning(v[:, 1])
        v *= self.radier
        kule.vertices = v
        kule.apply_transform(self.rot)
        kule.apply_translation(self.sentrum)
        kule.visual.vertex_colors = farge
        return kule

    def inneholder(self, punkt):
        """Sant hvis punktet ligger inne i kammeret."""
        lokal = np.linalg.inv(self.rot)[:3, :3] @ (np.asarray(punkt) - self.sentrum)
        lokal = lokal / self.radier
        a = self.avsmalning(lokal[1])
        return (lokal[0] / a) ** 2 + lokal[1] ** 2 + (lokal[2] / a) ** 2 <= 1


def kurve(punkter, antall=80):
    """Lager en jevn kurve gjennom punktene (Catmull-Rom-spline)."""
    p = np.asarray(punkter, float)
    p = np.vstack([2 * p[0] - p[1], p, 2 * p[-1] - p[-2]])
    ut = []
    biter = len(p) - 3
    for i in range(biter):
        p0, p1, p2, p3 = p[i], p[i + 1], p[i + 2], p[i + 3]
        for t in np.linspace(0, 1, max(2, antall // biter), endpoint=(i == biter - 1)):
            t2, t3 = t * t, t * t * t
            ut.append(0.5 * ((2 * p1) + (-p0 + p2) * t
                             + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2
                             + (-p0 + 3 * p1 - 3 * p2 + p3) * t3))
    return np.array(ut)


def ror(punkter, radius, farge, slutt_radius=None, sider=24):
    """Lager et rør (en blodåre) langs en kurve gjennom punktene."""
    senter = kurve(punkter)
    n = len(senter)
    radier = np.linspace(radius, slutt_radius or radius, n)
    tangent = np.gradient(senter, axis=0)
    tangent /= np.linalg.norm(tangent, axis=1)[:, None]
    # Finn en vektor som står vinkelrett på røret, og «før» den langs kurven
    normal = np.cross(tangent[0], [0, 0, 1])
    if np.linalg.norm(normal) < 1e-6:
        normal = np.cross(tangent[0], [1, 0, 0])
    normal /= np.linalg.norm(normal)
    hjorner, flater = [], []
    for i in range(n):
        normal = normal - np.dot(normal, tangent[i]) * tangent[i]
        normal /= np.linalg.norm(normal)
        binormal = np.cross(tangent[i], normal)
        for k in range(sider):
            v = 2 * np.pi * k / sider
            hjorner.append(senter[i] + radier[i] * (np.cos(v) * normal + np.sin(v) * binormal))
    for i in range(n - 1):
        for k in range(sider):
            a, b = i * sider + k, i * sider + (k + 1) % sider
            c, d = a + sider, b + sider
            flater += [[a, c, b], [b, c, d]]
    # Lokk i begge ender (egne hjørner, slik at kanten på røret blir skarp)
    for ende, snu in ((0, True), (n - 1, False)):
        start = len(hjorner)
        hjorner += [hjorner[ende * sider + k] for k in range(sider)]
        midt = len(hjorner)
        hjorner.append(senter[ende])
        for k in range(sider):
            a, b = start + k, start + (k + 1) % sider
            flater.append([midt, b, a] if snu else [midt, a, b])
    m = trimesh.Trimesh(np.array(hjorner), np.array(flater), process=False)
    # Sjekk at flatene peker UT fra røret (ellers ser vi innsiden av blodåra)
    ut = m.triangles_center[: (n - 1) * sider * 2] - np.repeat(senter[:-1], sider * 2, axis=0)
    if np.mean(np.sum(m.face_normals[: (n - 1) * sider * 2] * ut, axis=1)) < 0:
        m.invert()
    m.visual.vertex_colors = farge
    return m


def klaff(sentrum, retning, radius, farge):
    """En hjerteklaff vist som en tynn skive."""
    skive = trimesh.creation.cylinder(radius=radius, height=0.14, sections=32)
    skive.apply_transform(roter_y_mot(retning) @ trimesh.transformations.rotation_matrix(np.pi / 2, [1, 0, 0]))
    skive.apply_translation(sentrum)
    skive.visual.vertex_colors = farge
    return skive


# ------------------------------------------------------------------
# 1. Hjertets fire rom
# ------------------------------------------------------------------
venstre_kammer = Kammer(sentrum=(1.0, -1.6, -0.4), radier=(1.9, 3.3, 1.9),
                        retning=(-0.35, 1, -0.3), spiss=0.55)
hoyre_kammer = Kammer(sentrum=(-0.9, -1.0, 0.9), radier=(2.0, 2.7, 1.3),
                      retning=(-0.5, 1, -0.15), spiss=0.5)
hoyre_forkammer = Kammer(sentrum=(-2.7, 1.2, 0.0), radier=(1.5, 1.7, 1.4))
venstre_forkammer = Kammer(sentrum=(0.6, 1.9, -1.9), radier=(1.7, 1.1, 1.3))
venstre_hjerteore = Kammer(sentrum=(2.0, 1.5, -0.3), radier=(0.8, 0.5, 0.6), retning=(1, 0.3, 0.5))

# ------------------------------------------------------------------
# 2. Blodårene (punktene kurven skal gå gjennom)
# ------------------------------------------------------------------
AORTA = [(0.1, 0.8, -0.2), (-0.3, 3.0, 0.3), (-0.1, 4.6, 0.1), (0.9, 5.5, -0.8),
         (2.0, 5.0, -1.9), (2.4, 3.4, -2.6), (2.5, 0.0, -3.0), (2.4, -4.5, -3.0)]
AORTA_GRENER = [[(0.15, 4.8, -0.1), (-0.3, 6.4, 0.0), (-0.6, 7.6, 0.1)],
                [(0.8, 5.2, -0.75), (0.8, 6.6, -0.7), (0.9, 7.6, -0.7)],
                [(1.4, 5.0, -1.3), (1.9, 6.4, -1.4), (2.3, 7.4, -1.5)]]
LUNGESTAMME = [(-0.2, 0.6, 1.3), (0.2, 2.4, 1.5), (0.7, 3.6, 0.8), (0.8, 3.9, 0.0)]
VENSTRE_LUNGEARTERIE = [(0.8, 3.9, 0.0), (2.0, 4.0, -0.8), (3.6, 3.6, -1.2)]
HOYRE_LUNGEARTERIE = [(0.8, 3.9, 0.0), (-0.3, 3.9, -1.2), (-2.0, 3.6, -1.6), (-3.6, 3.4, -1.6)]
OVRE_HULVENE = [(-2.8, 6.8, 0.0), (-2.8, 4.0, 0.1), (-2.7, 2.4, 0.1)]
NEDRE_HULVENE = [(-2.4, -5.0, -0.9), (-2.5, -2.0, -0.6), (-2.6, -0.1, -0.3)]
LUNGEVENER = [[(-3.2, 2.5, -2.4), (-0.8, 2.2, -2.2)], [(-3.2, 1.2, -2.4), (-0.8, 1.4, -2.2)],
              [(4.0, 2.6, -2.3), (1.9, 2.2, -2.0)], [(4.0, 1.3, -2.3), (1.9, 1.5, -2.0)]]


def pa_overflaten(gjett, rom, mot=(0.5, -1.0, -0.2)):
    """Flytter et punkt innover til det treffer overflaten av hjertet.
    Slik ligger kransårene oppå hjertet i stedet for å sveve i lufta."""
    p = np.asarray(gjett, float)
    retning = np.asarray(mot) - p
    retning /= np.linalg.norm(retning)
    for _ in range(400):
        if any(r.inneholder(p) for r in rom):
            return p - retning * 0.12
        p = p + retning * 0.03
    return p


ALLE_ROM = [venstre_kammer, hoyre_kammer, hoyre_forkammer, venstre_forkammer]
KORONAR_GJETT = {
    'hoyre': [(-0.4, 1.0, 1.4), (-0.6, 0.9, 2.0), (-1.8, 0.3, 2.6), (-3.0, -0.6, 2.2), (-3.6, -1.8, 0.8), (-3.2, -2.6, -0.8)],
    'fremre': [(0.4, 1.0, 1.6), (0.6, 1.0, 2.4), (0.6, -0.5, 3.0), (1.4, -2.4, 3.0), (2.4, -4.2, 2.4), (3.0, -5.6, 1.6)],
    'omboyd': [(0.6, 1.0, 1.4), (1.2, 1.0, 1.6), (2.6, 0.6, 0.8), (3.4, -0.2, -0.6), (3.2, -0.8, -2.0)],
}

# ------------------------------------------------------------------
# 3. Sett sammen delene. Navnet på hver del blir navnet i 3D-filen.
# ------------------------------------------------------------------
deler = {
    'venstre_kammer': venstre_kammer.lag_mesh(MUSKEL),
    'hoyre_kammer': hoyre_kammer.lag_mesh(MUSKEL),
    'venstre_forkammer': trimesh.util.concatenate([venstre_forkammer.lag_mesh(FORKAMMER),
                                                   venstre_hjerteore.lag_mesh(FORKAMMER)]),
    'hoyre_forkammer': hoyre_forkammer.lag_mesh(FORKAMMER),
    'aorta': trimesh.util.concatenate([ror(AORTA, 0.78, RODT_BLOD, slutt_radius=0.62)]
                                      + [ror(g, 0.32, RODT_BLOD, slutt_radius=0.26) for g in AORTA_GRENER]),
    'lungearterie': trimesh.util.concatenate([ror(LUNGESTAMME, 0.66, BLATT_BLOD, slutt_radius=0.6),
                                              ror(VENSTRE_LUNGEARTERIE, 0.5, BLATT_BLOD, slutt_radius=0.4),
                                              ror(HOYRE_LUNGEARTERIE, 0.5, BLATT_BLOD, slutt_radius=0.4)]),
    'hulvener': trimesh.util.concatenate([ror(OVRE_HULVENE, 0.62, BLATT_BLOD),
                                          ror(NEDRE_HULVENE, 0.68, BLATT_BLOD)]),
    'lungevener': trimesh.util.concatenate([ror(v, 0.34, LUNGEVENE, slutt_radius=0.4) for v in LUNGEVENER]),
    'koronararterier': trimesh.util.concatenate(
        [ror([pa_overflaten(p, ALLE_ROM) for p in g], 0.13, KORONAR, slutt_radius=0.07) for g in KORONAR_GJETT.values()]),
    'klaffer': trimesh.util.concatenate([
        klaff((-1.9, 0.15, 0.5), (1.8, -1.2, 0.9), 0.75, KLAFF),     # trikuspidalklaffen
        klaff((0.7, 0.5, -1.3), (0.4, -3.5, 1.5), 0.7, KLAFF),       # mitralklaffen
        klaff((-0.15, 1.0, 1.35), (0.4, 1.8, 0.2), 0.55, KLAFF),     # pulmonalklaffen
        klaff((0.05, 1.2, -0.15), (-0.4, 2.2, 0.5), 0.6, KLAFF),     # aortaklaffen
    ]),
}

scene = trimesh.Scene()
for navn, mesh in deler.items():
    scene.add_geometry(mesh, node_name=navn, geom_name=navn)
scene.export('hjerte.glb')

# ------------------------------------------------------------------
# 4. Blodets vei – brukes til å animere blodstrømmen på nettsiden
# ------------------------------------------------------------------
blodbane = {
    'bla': [OVRE_HULVENE[0], OVRE_HULVENE[1], (-2.7, 1.3, 0.0), (-1.9, 0.15, 0.5), (-1.3, -1.6, 1.0),
            (-0.7, -0.6, 1.2), (-0.2, 0.6, 1.3)] + LUNGESTAMME[1:] + HOYRE_LUNGEARTERIE[1:],
    'rod': [LUNGEVENER[0][0], (-0.8, 2.2, -2.2), (0.6, 1.9, -1.9), (0.7, 0.5, -1.3), (1.4, -2.2, -0.2),
            (0.9, -0.6, -0.3), (0.1, 0.8, -0.2)] + AORTA[1:],
}
with open('blodbane.json', 'w', encoding='utf-8') as f:
    json.dump({k: [list(map(float, p)) for p in v] for k, v in blodbane.items()}, f)

print('Ferdig! Lagret hjerte.glb med', len(deler), 'deler og blodbane.json')
