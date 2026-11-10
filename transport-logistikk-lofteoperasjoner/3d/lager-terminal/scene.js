/* =====================================================================
   3D: Lager og terminal – hvordan fungerer de, og hva er forskjellen?
   Egenprodusert for TLLfluenseren. Bygget med three.js (MIT).
   All modellering er enkle geometriske former laget i koden.
   Tidene i animasjonen er forenklet: 1 sekund = 4 minutter.
   ===================================================================== */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/CSS2DRenderer.js';

const SIM_MIN_PER_SEC = 4;           // simulerte minutter per sekund
const DRIVE_SPEED = 4.2;             // m/s for trucker
const TURN_SPEED = 3.2;              // rad/s
const FORK_SPEED = 1.3;              // m/s
const CARRY_Z = 1.35;                // avstand fra truck til pallsenter
const TRAVEL_FORK = 0.18;            // gaffelhøyde under kjøring

/* ---------- Grunnoppsett ---------- */
const host = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
host.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.className = 'labelLayer';
host.appendChild(labelRenderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b1117);
scene.fog = new THREE.Fog(0x0b1117, 90, 190);

const camera = new THREE.PerspectiveCamera(45, 1, 0.5, 500);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.47;
controls.minDistance = 8;
controls.maxDistance = 140;

scene.add(new THREE.HemisphereLight(0xdfe9f3, 0x2a3138, 1.15));
const sun = new THREE.DirectionalLight(0xffffff, 1.6);
sun.position.set(30, 60, 40);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -70, right: 70, top: 45, bottom: -45, near: 1, far: 160 });
scene.add(sun);

const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 300), new THREE.MeshStandardMaterial({ color: 0x2b3238, roughness: 1 }));
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.02;
ground.receiveShadow = true;
scene.add(ground);

/* ---------- Materialer og hjelpere ---------- */
const mat = (color, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, ...extra });
const M = {
  floor: mat(0x8d949a), wall: mat(0xc9d1d8, { transparent: true, opacity: 0.35 }),
  wood: mat(0xb88a52), upright: mat(0x2f64b5), beam: mat(0xe8742c),
  forkBody: mat(0xf2b84b), forkReach: mat(0x3fa36b), mast: mat(0x2b2f33), fork: mat(0x55595e),
  cab: mat(0xe7ecef), tyre: mat(0x1a1c1e), trailer: mat(0xf1f3f5, { transparent: true, opacity: 0.38 }), line: mat(0xf2d24b),
};
function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
function floorPatch(parent, w, d, color, x, z, opacity = 0.55) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), new THREE.MeshStandardMaterial({ color, transparent: true, opacity, roughness: 1 }));
  m.rotation.x = -Math.PI / 2; m.position.set(x, 0.015, z); m.receiveShadow = true;
  parent.add(m); return m;
}
function makeLabel(parent, text, x, y, z, cls = '') {
  const el = document.createElement('div');
  el.className = 'lbl3d ' + cls;
  el.textContent = text;
  const obj = new CSS2DObject(el);
  obj.position.set(x, y, z);
  parent.add(obj);
  return obj;
}

/* ---------- Pall ---------- */
const CARGO_COLORS = [0xc89b63, 0xb7864e, 0xd4ad78, 0xa77a45];
function makePallet(color) {
  const g = new THREE.Group();
  g.add(box(1.2, 0.15, 0.8, M.wood, 0, 0.075, 0));
  const c = color ?? CARGO_COLORS[Math.floor(Math.random() * CARGO_COLORS.length)];
  g.add(box(1.1, 0.95, 0.75, mat(c), 0, 0.15 + 0.475, 0));
  return g;
}

/* ---------- Truck (motvekt eller skyvemast) ---------- */
function makeForklift(bodyMat) {
  const g = new THREE.Group();
  g.add(box(1.1, 0.9, 1.7, bodyMat, 0, 0.6, -0.25));      // chassis
  g.add(box(1.0, 0.5, 0.5, M.mast, 0, 0.5, -1.0));       // motvekt
  const guard = new THREE.Group();
  [[-0.5, -0.55], [0.5, -0.55], [-0.5, 0.45], [0.5, 0.45]].forEach(([x, z]) => guard.add(box(0.07, 1.2, 0.07, M.mast, x, 1.6, z)));
  guard.add(box(1.1, 0.06, 1.1, M.mast, 0, 2.2, -0.05));
  g.add(guard);
  g.add(box(0.08, 2.6, 0.12, M.mast, -0.4, 1.3, 0.62));   // mast
  g.add(box(0.08, 2.6, 0.12, M.mast, 0.4, 1.3, 0.62));
  const forks = new THREE.Group();
  forks.add(box(1.0, 0.5, 0.06, M.fork, 0, 0.3, 0.7));
  forks.add(box(0.12, 0.05, 1.1, M.fork, -0.3, 0.03, 1.25));
  forks.add(box(0.12, 0.05, 1.1, M.fork, 0.3, 0.03, 1.25));
  g.add(forks);
  [[-0.55, 0.3], [0.55, 0.3], [-0.55, -0.85], [0.55, -0.85]].forEach(([x, z]) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.2, 16), M.tyre);
    w.rotation.z = Math.PI / 2; w.position.set(x, 0.25, z); g.add(w);
  });
  return { group: g, forks };
}

/* ---------- Lastebil ---------- */
function makeTruck(color, label) {
  const g = new THREE.Group();
  const cm = mat(color);
  g.add(box(2.5, 2.8, 12, M.trailer, 0, 2.4, 0));          // henger (åpen bakende vender mot -z lokalt)
  g.add(box(2.6, 0.35, 12.2, cm, 0, 1.0, 0));               // ramme i farge
  g.add(box(2.5, 2.6, 2.3, cm, 0, 2.1, 7.6));               // førerhus
  g.add(box(2.3, 0.9, 0.05, mat(0x223344), 0, 2.8, 8.76));  // frontrute
  [-4.5, -3.2, 3.5, 7.4].forEach(z => [-1.2, 1.2].forEach(x => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.35, 16), M.tyre);
    w.rotation.z = Math.PI / 2; w.position.set(x, 0.5, z); g.add(w);
  }));
  if (label) makeLabel(g, label, 0, 4.4, 2, 'truckTag').element.style.setProperty('--c', '#' + new THREE.Color(color).getHexString());
  return g;
}

/* ---------- Agent: truck med kø av handlinger ---------- */
class Agent {
  constructor(building, kind, name, home) {
    this.b = building;
    const fl = makeForklift(kind === 'reach' ? M.forkReach : M.forkBody);
    this.group = fl.group; this.forks = fl.forks;
    this.pos = home.clone(); this.home = home.clone();
    this.heading = 0; this.forkY = TRAVEL_FORK; this.carry = null; this.q = []; this.idle = 0;
    this.group.position.copy(this.pos);
    building.root.add(this.group);
    this.tag = makeLabel(this.group, name, 0, 3.1, 0, 'agentTag');
    this.setForks();
  }
  setForks() { this.forks.position.y = this.forkY; }
  update(dt) {
    let budget = dt;
    let guard = 0;
    while (budget > 0 && guard++ < 20) {
      if (!this.q.length) {
        const job = this.b.assign(this);
        if (job) { this.q = job; continue; }
        // ingen jobb: kjør hjem
        if (this.pos.distanceTo(this.home) > 0.3) { this.q = [...this.b.route(this.pos, this.home), { t: 'fork', y: TRAVEL_FORK }]; continue; }
        return;
      }
      const a = this.q[0];
      if (a.t === 'move' || a.t === 'back') {
        const d = new THREE.Vector3().subVectors(a.to, this.pos); d.y = 0;
        const dist = d.length();
        if (dist < 1e-3) { this.q.shift(); continue; }
        if (a.t === 'move') {
          const want = Math.atan2(d.x, d.z);
          if (!this.turn(want, budget)) return;
        }
        const step = DRIVE_SPEED * (a.t === 'back' ? 0.5 : 1) * budget;
        if (step >= dist) { budget -= dist / (DRIVE_SPEED * (a.t === 'back' ? 0.5 : 1)); this.pos.copy(a.to); this.q.shift(); }
        else { this.pos.addScaledVector(d.normalize(), step); budget = 0; }
      } else if (a.t === 'face') {
        if (!this.turn(a.h, budget)) return;
        this.q.shift();
      } else if (a.t === 'fork') {
        const dy = a.y - this.forkY;
        const step = FORK_SPEED * budget;
        if (Math.abs(dy) <= step) { budget -= Math.abs(dy) / FORK_SPEED; this.forkY = a.y; this.q.shift(); }
        else { this.forkY += Math.sign(dy) * step; budget = 0; }
        this.setForks();
      } else if (a.t === 'wait') {
        a.left = (a.left ?? a.s) - budget;
        if (a.left > 0) { budget = 0; } else { budget = -a.left; this.q.shift(); }
      } else if (a.t === 'call') {
        this.q.shift();
        const r = a.fn(this);
        if (r === false) { this.q = []; }
      }
    }
    this.group.position.copy(this.pos);
    this.group.rotation.y = this.heading;
  }
  turn(want, budget) {
    let diff = ((want - this.heading + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    const step = TURN_SPEED * budget;
    if (Math.abs(diff) <= step) { this.heading = want; return true; }
    this.heading += Math.sign(diff) * step;
    this.group.rotation.y = this.heading;
    this.group.position.copy(this.pos);
    return false;
  }
  pick(pallet) {
    this.carry = pallet;
    this.group.attach(pallet.mesh);
    pallet.mesh.position.set(0, this.forkY - 0.0, CARRY_Z);
    pallet.mesh.rotation.set(0, 0, 0);
  }
  drop() {
    const p = this.carry; this.carry = null;
    this.b.root.attach(p.mesh);
    return p;
  }
}

/* Handlingssekvens: kjør fram, løft, kjør inn, ta/sett, rygg ut, senk.
   spot = { pos: Vector3 (pallens bunn-senter), face: Vector3 (retning truck ser mot pallen) } */
function standoffOf(spot) {
  const f = spot.face.clone().normalize();
  const s = spot.pos.clone().addScaledVector(f, -(CARRY_Z + 1.1)); s.y = 0; return s;
}
function approach(b, from, spot, onArrive) {
  const f = spot.face.clone().normalize();
  const inPos = spot.pos.clone().addScaledVector(f, -CARRY_Z); inPos.y = 0;
  const standoff = spot.pos.clone().addScaledVector(f, -(CARRY_Z + 1.1)); standoff.y = 0;
  return [
    ...b.route(from, standoff),
    { t: 'face', h: Math.atan2(f.x, f.z) },
    { t: 'fork', y: spot.pos.y + 0.02 },
    { t: 'move', to: inPos },
    { t: 'call', fn: onArrive },
    { t: 'wait', s: 0.25 },
    { t: 'back', to: standoff },
    { t: 'fork', y: TRAVEL_FORK },
  ];
}

/* ---------- Felles for bygg ---------- */
class Building {
  constructor(name) {
    this.name = name;
    this.root = new THREE.Group();
    scene.add(this.root);
    this.agents = []; this.labels = {}; this.dwell = []; this.throughput = 0; this.trucks = [];
  }
  record(p) {
    this.dwell.push(simMin - p.arrived);
    if (this.dwell.length > 20) this.dwell.shift();
    this.throughput++;
  }
  avgDwell() { return this.dwell.length ? this.dwell.reduce((a, b) => a + b, 0) / this.dwell.length : null; }
  walls(w, d, h, doorsFront, doorsBack, doorW = 3.4) {
    floorPatch(this.root, w, d, 0x9aa1a7, 0, 0, 1);
    const wallSeg = (x1, x2, z) => { if (x2 - x1 > 0.05) this.root.add(box(x2 - x1, h, 0.25, M.wall, (x1 + x2) / 2, h / 2, z)); };
    const longWall = (z, doors) => {
      let x = -w / 2;
      [...doors].sort((a, b) => a - b).forEach(dx => { wallSeg(x, dx - doorW / 2, z); x = dx + doorW / 2; });
      wallSeg(x, w / 2, z);
      doors.forEach(dx => this.root.add(box(doorW + 0.4, 0.3, 0.3, M.beam, dx, h - 0.15, z)));
    };
    longWall(d / 2, doorsFront); longWall(-d / 2, doorsBack);
    this.root.add(box(0.25, h, d, M.wall, -w / 2, h / 2, 0));
    this.root.add(box(0.25, h, d, M.wall, w / 2, h / 2, 0));
  }
  /* Lastebil som rygger inn til port. side = +1 (port i front, z = +d/2) eller -1 */
  dockTruck(x, zDoor, side, color, label, pallets) {
    const g = makeTruck(color, label);
    g.rotation.y = side > 0 ? 0 : Math.PI;
    const dockZ = zDoor + side * 6.3;
    const t = { g, x, zDoor, side, dockZ, pallets: pallets || [], state: 'arriving', tt: 0, cap: 0 };
    g.position.set(x, 0, dockZ + side * 45);
    this.root.add(g);
    t.pallets.forEach((p, i) => { this.root.add(p.mesh); });
    this.layoutTruck(t);
    this.trucks.push(t);
    return t;
  }
  layoutTruck(t) {
    t.pallets.forEach((p, i) => {
      p.mesh.position.set(t.g.position.x, 1.05, t.g.position.z - t.side * (5.2 - i * 1.35));
      p.mesh.rotation.set(0, 0, 0);
    });
  }
  updateTrucks(dt) {
    for (const t of this.trucks) {
      if (t.state === 'arriving') {
        const target = t.dockZ; const z = t.g.position.z;
        const step = 14 * dt; const d = target - z;
        if (Math.abs(d) <= step) { t.g.position.z = target; t.state = 'docked'; }
        else t.g.position.z += Math.sign(d) * step;
        this.layoutTruck(t);
      } else if (t.state === 'leaving') {
        t.g.position.z += t.side * 14 * dt;
        this.layoutTruck(t);
        if (Math.abs(t.g.position.z - t.dockZ) > 50) { t.state = 'gone'; this.root.remove(t.g); t.pallets.forEach(p => this.root.remove(p.mesh)); }
      }
    }
    this.trucks = this.trucks.filter(t => t.state !== 'gone');
  }
  /* Punktet der pall nr. «nærmest porten» står klar for truck: rett utenfor porten */
  doorSpot(t) {
    return { pos: new THREE.Vector3(t.x, 1.05, t.zDoor + t.side * 0.9), face: new THREE.Vector3(0, 0, t.side) };
  }
}

/* =====================================================================
   LAGER – gods skal OPPBEVARES. U-flyt: inn og ut på samme side.
   ===================================================================== */
class Lager extends Building {
  constructor() {
    super('lager');
    const W = 40, D = 26; this.W = W; this.D = D;
    this.inDoors = [-15.5, -10.5]; this.outDoors = [10.5, 15.5];
    this.walls(W, D, 7, [...this.inDoors, ...this.outDoors], []);
    // soner
    floorPatch(this.root, 9, 5, 0x4f8fd6, -13, 7.3);
    floorPatch(this.root, 9, 5, 0x8cd6ae, 13, 7.3);
    floorPatch(this.root, 28, 2.2, 0xf2d24b, 0, 3.0, 0.25);
    // reoler: 4 rader, 16 plasser, 3 nivåer
    this.rows = [
      { z: -10.6, aisle: -8.5 }, { z: -6.4, aisle: -8.5 },
      { z: -5.0, aisle: -2.9 }, { z: -0.8, aisle: -2.9 },
    ];
    this.levels = [0, 1.65, 3.3];
    this.cols = []; for (let i = 0; i < 16; i++) this.cols.push(-10.875 + i * 1.45);
    this.slots = [];
    this.rows.forEach((r, ri) => {
      const g = new THREE.Group();
      for (let b = 0; b <= 8; b++) {
        const x = -11.6 + b * 2.9;
        g.add(box(0.1, 5.0, 0.1, M.upright, x, 2.5, r.z - 0.45));
        g.add(box(0.1, 5.0, 0.1, M.upright, x, 2.5, r.z + 0.45));
      }
      [1.55, 3.2, 4.85].forEach(y => {
        g.add(box(23.2, 0.12, 0.08, M.beam, 0, y, r.z - 0.45));
        g.add(box(23.2, 0.12, 0.08, M.beam, 0, y, r.z + 0.45));
      });
      this.root.add(g);
      this.cols.forEach(x => this.levels.forEach(y => {
        const face = new THREE.Vector3(0, 0, Math.sign(r.z - r.aisle));
        const level = y === 0 ? 0 : y + 0.06;
        this.slots.push({ pos: new THREE.Vector3(x, level, r.z), face, row: ri, aisle: r.aisle, p: null, reserved: false });
      }));
    });
    // fyll reolene ca. 60 % med gammelt gods
    this.slots.forEach(s => {
      if (Math.random() < 0.6) {
        const p = { mesh: makePallet(), arrived: -(2 + Math.random() * 58) * 24 * 60 };
        p.mesh.position.copy(s.pos); this.root.add(p.mesh); s.p = p;
      }
    });
    // mottak og pakkesone
    this.recv = []; this.pack = [];
    // to rader: fremre rad kjøres inn fra gangen (ser mot +z), bakre rad fra porten (ser mot -z)
    const zoneSpots = cx => [-2.5, 0, 2.5].flatMap(dx => [[cx + dx, 6.0, 1], [cx + dx, 8.6, -1]]);
    zoneSpots(-13).forEach(([x, z, f]) => this.recv.push({ pos: new THREE.Vector3(x, 0, z), face: new THREE.Vector3(0, 0, f), p: null, reserved: false, ready: 0 }));
    zoneSpots(13).forEach(([x, z, f]) => this.pack.push({ pos: new THREE.Vector3(x, 0, z), face: new THREE.Vector3(0, 0, f), p: null, reserved: false, ready: 0 }));

    this.labels.mottak = makeLabel(this.root, '1 Varemottak og kontroll', -13, 3.2, 7.3, 'zone');
    this.labels.innlagring = makeLabel(this.root, '2 Innrydding på lokasjon', -13.6, 6.2, -4.5, 'zone');
    this.labels.lagring = makeLabel(this.root, '3 Lagring: plukklager nede, volumlager i høyden', 0, 6.6, -6, 'zone');
    this.labels.plukk = makeLabel(this.root, '4 Ordre og plukk', 13.6, 6.2, -4.5, 'zone');
    this.labels.pakk = makeLabel(this.root, '5 Sammenstilling og oppstilling for transport', 13, 3.2, 7.3, 'zone');
    this.labels.utlevering = makeLabel(this.root, '6 Utlevering', 13, 3.0, 17, 'zone');
    this.title = makeLabel(this.root, 'LAGER', 0, 9.5, -13, 'bigTitle');

    const h = (x, z) => new THREE.Vector3(x, 0, z);
    this.agents.push(new Agent(this, 'cb', 'Mottak', h(-13, 4.8)));
    this.agents.push(new Agent(this, 'reach', 'Innrydding', h(-6, 3.2)));
    this.agents.push(new Agent(this, 'reach', 'Plukk', h(6, 3.2)));
    this.agents.push(new Agent(this, 'cb', 'Utlasting', h(13, 4.8)));
    this.agents[0].role = 'unload'; this.agents[1].role = 'store'; this.agents[2].role = 'pick'; this.agents[3].role = 'load';
    this.inTimer = 1; this.outTimer = 3;
  }
  inRack(p) { return p.z < 1.2 && Math.abs(p.x) < 12.6; }
  route(from, to) {
    const pts = []; const CROSS = 3.0;
    const side = x => (x < 0 ? -13.3 : 13.3);
    let cur = from.clone();
    if (this.inRack(cur) && !(this.inRack(to) && Math.abs(to.z - cur.z) < 1.0)) {
      const sx = side(cur.x);
      pts.push(new THREE.Vector3(sx, 0, cur.z), new THREE.Vector3(sx, 0, CROSS));
      cur = pts[pts.length - 1];
    }
    if (this.inRack(to) && !(this.inRack(from) && Math.abs(to.z - from.z) < 1.0)) {
      const sx = side(to.x);
      if (Math.abs(cur.z - CROSS) > 0.3) pts.push(new THREE.Vector3(cur.x, 0, CROSS));
      pts.push(new THREE.Vector3(sx, 0, CROSS), new THREE.Vector3(sx, 0, to.z));
    }
    pts.push(to.clone());
    return pts.map(p => ({ t: 'move', to: p }));
  }
  update(dt) {
    // nye innkommende biler
    this.inTimer -= dt;
    const inTrucks = this.trucks.filter(t => t.dir === 'in');
    if (this.inTimer <= 0 && inTrucks.length < 1) {
      const door = this.inDoors[Math.floor(Math.random() * 2)];
      const pallets = []; for (let i = 0; i < 4; i++) pallets.push({ mesh: makePallet(), arrived: null });
      const t = this.dockTruck(door, this.D / 2, 1, 0x2f64b5, 'Leverandør', pallets); t.dir = 'in';
      this.inTimer = 14;
    }
    this.outTimer -= dt;
    const outTrucks = this.trucks.filter(t => t.dir === 'out');
    if (this.outTimer <= 0 && outTrucks.length < 1) {
      const door = this.outDoors[Math.floor(Math.random() * 2)];
      const t = this.dockTruck(door, this.D / 2, 1, 0x3c9a63, 'Til kunde', []); t.dir = 'out'; t.cap = 4;
      this.outTimer = 6;
    }
    // innbil går når tom, utbil går når full
    this.trucks.forEach(t => {
      if (t.state !== 'docked') return;
      if (t.dir === 'in' && t.pallets.length === 0 && !t.busy) t.state = 'leaving';
      if (t.dir === 'out' && t.pallets.length >= t.cap && !t.busy) { t.state = 'leaving'; }
    });
    this.updateTrucks(dt);
    this.agents.forEach(a => a.update(dt));
  }
  assign(a) {
    if (a.role === 'unload') {
      const t = this.trucks.find(t => t.dir === 'in' && t.state === 'docked' && t.pallets.length && !t.busy);
      const spot = this.recv.find(s => !s.p && !s.reserved);
      if (!t || !spot) return null;
      t.busy = true; spot.reserved = true;
      return [
        ...approach(this, a.pos, this.doorSpot(t), ag => { const p = t.pallets.shift(); p.arrived = simMin; ag.pick(p); this.layoutTruck(t); t.busy = false; }),
        ...approach(this, standoffOf(this.doorSpot(t)), spot, ag => {
          const p = ag.drop(); p.mesh.position.copy(spot.pos); spot.p = p; spot.reserved = false; spot.ready = simMin + 40; // mottakskontroll
          p.mesh.rotation.y = 0;
        }),
      ];
    }
    if (a.role === 'store') {
      const src = this.recv.find(s => s.p && !s.reserved && simMin >= s.ready);
      const free = this.slots.filter(s => !s.p && !s.reserved);
      if (!src || !free.length) return null;
      const dst = free[Math.floor(Math.random() * free.length)];
      src.reserved = true; dst.reserved = true;
      return [
        ...approach(this, a.pos, src, ag => { ag.pick(src.p); src.p = null; src.reserved = false; }),
        ...approach(this, standoffOf(src), dst, ag => {
          const p = ag.drop(); p.mesh.position.copy(dst.pos); p.mesh.rotation.set(0, 0, 0); dst.p = p; dst.reserved = false;
        }),
      ];
    }
    if (a.role === 'pick') {
      const free = this.pack.find(s => !s.p && !s.reserved);
      const stocked = this.slots.filter(s => s.p && !s.reserved);
      if (!free || stocked.length < 40) return null;
      // FIFO: plukk eldste pall blant et utvalg
      const sample = stocked.sort(() => Math.random() - 0.5).slice(0, 12).sort((x, y) => x.p.arrived - y.p.arrived);
      const src = sample[0];
      src.reserved = true; free.reserved = true;
      return [
        ...approach(this, a.pos, src, ag => { ag.pick(src.p); src.p = null; src.reserved = false; }),
        ...approach(this, standoffOf(src), free, ag => {
          const p = ag.drop(); p.mesh.position.copy(free.pos); p.mesh.rotation.set(0, 0, 0); free.p = p; free.reserved = false; free.ready = simMin + 30;
        }),
      ];
    }
    if (a.role === 'load') {
      const t = this.trucks.find(t => t.dir === 'out' && t.state === 'docked' && t.pallets.length < t.cap && !t.busy);
      const src = this.pack.find(s => s.p && !s.reserved && simMin >= s.ready);
      if (!t || !src) return null;
      src.reserved = true; t.busy = true;
      return [
        ...approach(this, a.pos, src, ag => { ag.pick(src.p); src.p = null; src.reserved = false; }),
        ...approach(this, standoffOf(src), this.doorSpot(t), ag => {
          const p = ag.drop(); this.record(p); t.pallets.unshift(p); this.layoutTruck(t); t.busy = false;
        }),
      ];
    }
    return null;
  }
  countInside() { return this.slots.filter(s => s.p).length + this.recv.filter(s => s.p).length + this.pack.filter(s => s.p).length + this.agents.filter(a => a.carry).length; }
}

/* =====================================================================
   TERMINAL – gods skal VIDERE. Gjennomgående flyt: inn på én side,
   sortert etter destinasjon, ut på motsatt side. Ingen reoler.
   ===================================================================== */
const DEST = [
  { name: 'Lokal: sone Stavanger', truck: 'Distribusjon Stavanger', color: 0xe8742c },
  { name: 'Lokal: sone Sandnes', truck: 'Distribusjon Sandnes', color: 0xf2c94c },
  { name: 'Regional rute: Egersund', truck: 'Rute Egersund', color: 0x8cd6ae },
  { name: 'Andre regioner: sentralterminal', truck: 'Skapbil til sentralterminal', color: 0xc77dd8 },
];
class Terminal extends Building {
  constructor() {
    super('terminal');
    const W = 46, D = 18; this.W = W; this.D = D;
    this.inDoors = [-12, 0, 12];
    this.outDoors = [-16.5, -5.5, 5.5, 16.5];
    this.walls(W, D, 6, this.outDoors, this.inDoors, 3.6);
    floorPatch(this.root, W - 2, 3.2, 0x4f8fd6, 0, -6.6, 0.25);
    this.zones = DEST.map((d, i) => {
      const x = this.outDoors[i];
      floorPatch(this.root, 8.2, 6.4, d.color, x, 3.4, 0.5);
      const spots = [];
      [-2.6, 0, 2.6].forEach(dx => [[2.0, 1], [4.8, -1]].forEach(([z, f]) => spots.push({ pos: new THREE.Vector3(x + dx, 0, z), face: new THREE.Vector3(0, 0, f), p: null, reserved: false, dest: i })));
      makeLabel(this.root, d.name, x, 0.3, 6.9, 'destTag').element.style.setProperty('--c', '#' + new THREE.Color(d.color).getHexString());
      return { dest: i, x, spots };
    });
    this.labels.ankomst = makeLabel(this.root, '1 Ankomst', 0, 3.0, -16, 'zone');
    this.labels.lossing = makeLabel(this.root, '2 Lossing + skanning', 0, 3.0, -6.6, 'zone');
    this.labels.sortering = makeLabel(this.root, '3 Sortering: lokal · regional · andre regioner', 0, 4.8, -1.5, 'zone');
    this.labels.buffer = makeLabel(this.root, '4 Kort oppstilling i sone', -11, 3.6, 3.4, 'zone');
    this.labels.lasting = makeLabel(this.root, '5 Lasting (LIFO)', 11, 3.6, 7.5, 'zone');
    this.labels.avgang = makeLabel(this.root, '6 Avgang i terminalnettet', 0, 3.0, 17, 'zone');
    this.title = makeLabel(this.root, 'TERMINAL', 0, 9.5, -9.5, 'bigTitle');

    const h = (x, z) => new THREE.Vector3(x, 0, z);
    [[-12, -3.5], [0, -3.5], [12, -3.5]].forEach(([x, z], i) => { const ag = new Agent(this, 'cb', 'Lossing', h(x, z)); ag.role = 'unload'; this.agents.push(ag); });
    [[-16, 0], [0, 0], [16, 0]].forEach(([x, z]) => { const ag = new Agent(this, 'cb', 'Lasting', h(x, z)); ag.role = 'load'; this.agents.push(ag); });
    this.inTimer = 0.5; this.outTimers = DEST.map((_, i) => 1 + i * 0.6);
    this.outTrucksByDest = DEST.map(() => null);
  }
  route(from, to) {
    // åpent gulv: kjør via en midtgang (z = -1.0) for ryddig trafikk
    const MID = -1.0;
    const pts = [];
    if (Math.abs(from.z - to.z) > 2.5) {
      pts.push(new THREE.Vector3(from.x, 0, MID), new THREE.Vector3(to.x, 0, MID));
    }
    pts.push(to.clone());
    return pts.map(p => ({ t: 'move', to: p }));
  }
  update(dt) {
    this.inTimer -= dt;
    const busyDoors = this.trucks.filter(t => t.dir === 'in').map(t => t.x);
    const freeDoor = this.inDoors.find(d => !busyDoors.includes(d));
    if (this.inTimer <= 0 && freeDoor !== undefined) {
      const pallets = [];
      for (let i = 0; i < 6; i++) { const di = Math.floor(Math.random() * DEST.length); pallets.push({ mesh: makePallet(DEST[di].color), dest: di, arrived: null }); }
      const t = this.dockTruck(freeDoor, -this.D / 2, -1, 0x55606b, 'Innlevering', pallets); t.dir = 'in';
      this.inTimer = 9;
    }
    DEST.forEach((d, i) => {
      const cur = this.outTrucksByDest[i];
      if (cur && cur.state === 'gone') this.outTrucksByDest[i] = null;
      if (!this.outTrucksByDest[i]) {
        this.outTimers[i] -= dt;
        if (this.outTimers[i] <= 0) {
          const t = this.dockTruck(this.outDoors[i], this.D / 2, 1, d.color, d.truck, []);
          t.dir = 'out'; t.dest = i; t.cap = 4; t.dockedAt = null;
          this.outTrucksByDest[i] = t; this.outTimers[i] = 3;
        }
      }
    });
    this.trucks.forEach(t => {
      if (t.state !== 'docked') return;
      if (t.dir === 'in' && t.pallets.length === 0 && !t.busy) t.state = 'leaving';
      if (t.dir === 'out') {
        if (t.dockedAt === null) t.dockedAt = simMin;
        const late = simMin - t.dockedAt > 3 * 60 && t.pallets.length >= 1; // ruteplan: går selv om den ikke er full
        if ((t.pallets.length >= t.cap || late) && !t.busy) { t.state = 'leaving'; }
      }
    });
    this.updateTrucks(dt);
    this.agents.forEach(a => a.update(dt));
  }
  assign(a) {
    if (a.role === 'unload') {
      // nærmeste innbil med paller
      const cands = this.trucks.filter(t => t.dir === 'in' && t.state === 'docked' && t.pallets.length && !t.busy)
        .sort((x, y) => Math.abs(x.x - a.home.x) - Math.abs(y.x - a.home.x));
      for (const t of cands) {
        const p0 = t.pallets[0];
        const spot = this.zones[p0.dest].spots.find(s => !s.p && !s.reserved);
        if (!spot) continue;
        t.busy = true; spot.reserved = true;
        const ds = this.doorSpot(t);
        return [
          ...approach(this, a.pos, ds, ag => { const p = t.pallets.shift(); p.arrived = simMin; ag.pick(p); this.layoutTruck(t); t.busy = false; }),
          { t: 'wait', s: 0.3 }, // skanning
          ...approach(this, standoffOf(ds), spot, ag => {
            const p = ag.drop(); p.mesh.position.copy(spot.pos); p.mesh.rotation.set(0, 0, 0); spot.p = p; spot.reserved = false;
          }),
        ];
      }
      return null;
    }
    if (a.role === 'load') {
      // velg sonen med flest paller som har bil ved port og plass
      const opts = this.zones.map(z => {
        const t = this.outTrucksByDest[z.dest];
        const n = z.spots.filter(s => s.p && !s.reserved).length;
        return { z, t, n };
      }).filter(o => o.t && o.t.state === 'docked' && !o.t.busy && o.t.pallets.length < o.t.cap && o.n > 0)
        .sort((x, y) => (y.n - x.n) + 0.01 * (Math.abs(x.z.x - a.home.x) - Math.abs(y.z.x - a.home.x)));
      if (!opts.length) return null;
      const { z, t } = opts[0];
      const src = z.spots.find(s => s.p && !s.reserved);
      src.reserved = true; t.busy = true;
      return [
        ...approach(this, a.pos, src, ag => { ag.pick(src.p); src.p = null; src.reserved = false; }),
        ...approach(this, standoffOf(src), this.doorSpot(t), ag => {
          const p = ag.drop(); this.record(p); t.pallets.unshift(p); this.layoutTruck(t); t.busy = false;
        }),
      ];
    }
    return null;
  }
  countInside() { return this.zones.reduce((n, z) => n + z.spots.filter(s => s.p).length, 0) + this.agents.filter(a => a.carry).length; }
}

/* ---------- Bygg verden ---------- */
const lager = new Lager();
const terminal = new Terminal();
const OFFSET = 25;

/* ---------- Kamera og visninger ---------- */
const VIEWS = {
  begge:    { pos: [0, 62, 70], target: [0, 0, 0] },
  lager:    { pos: [0, 30, 38], target: [0, 0, -1] },
  terminal: { pos: [0, 28, 36], target: [0, 0, 0] },
};
let mode = 'begge';
let camAnim = null;
function flyTo(pos, target, dur = 1.2) {
  camAnim = { from: camera.position.clone(), to: new THREE.Vector3(...pos), tFrom: controls.target.clone(), tTo: new THREE.Vector3(...target), t: 0, dur };
}
function setMode(m, instant = false) {
  mode = m;
  lager.root.visible = m !== 'terminal';
  terminal.root.visible = m !== 'lager';
  lager.root.position.x = m === 'begge' ? -OFFSET : 0;
  terminal.root.position.x = m === 'begge' ? OFFSET : 0;
  const base = VIEWS[m];
  // smale skjermer (mobil på høykant): trekk kameraet lenger bak
  const k = Math.max(1, (m === 'begge' ? 1.55 : 1.25) / camera.aspect);
  const v = { pos: base.pos.map((c, i) => base.target[i] + (c - base.target[i]) * k), target: base.target };
  if (instant) { camera.position.set(...v.pos); controls.target.set(...v.target); controls.update(); }
  else flyTo(v.pos, v.target);
  document.querySelectorAll('button[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
  document.body.dataset.mode = m;
  renderSteps();
}

/* ---------- Steg-for-steg ---------- */
const NDLA = 'https://ndla.no/nb/r/transport-logistikk-og-lofteoperasjonar-tp-tol-vg2---ressurssamling/';
const STEPS = {
  lager: [
    { key: 'mottak', title: 'Varemottak og kontroll', at: [-13, 0, 8], bok: 'Læreboka 1.3, s. 20–22',
      ndla: [['Kontroll av kjøpsavtale', 'kontroll-av-kjopsavtale/f0d37941ee'], ['Kontroll av transportavtale', 'kontroll-av-transportavtale/43f859d552']],
      text: 'Bilen rygger inn til porten, og varene losses i varemottaket. Her kontrollerer du tre ting: <b>kjøpsavtalen</b> (kryss av varene kolli for kolli mot pakkseddel eller faktura), <b>transportavtalen</b> (synlige skader og vekta på skadd eller tapt gods skrives i fraktbrevets merknadsrubrikk og signeres – helst også av sjåføren) og <b>pallene</b>. Ødelagt emballasje betyr ekstra grundig kontroll.' },
    { key: 'innlagring', title: 'Vareplassering og innrydding', at: [-11, 0, -4], bok: 'Læreboka 1.3, s. 22–24',
      ndla: [['Plassering av varer', 'plassering-av-varer/0d2fb4ec5d'], ['Innrydding av varer på lokasjon', 'innrydding-av-varer-pa-lokasjon/dba26dc4b2']],
      text: 'Lagerstyringssystemet finner en ledig <b>lageradresse (lokasjon)</b> i riktig lagersone (frys, kjøl, sval eller tørr). Hver lokasjon har sin egen strekkode. Du skanner lokasjonen og pallen, så lagersaldoen alltid stemmer.' },
    { key: 'lagring', title: 'Lagring', at: [0, 0, -5], bok: 'Læreboka 1.3, s. 12–13, 19 og 23–25',
      ndla: [['Hva er lagerstyring?', 'hva-er-lagerstyring/e0fce0eef4'], ['Bestillingspunkt og sikkerhetslager', 'bestillingspunkt-og-sikkerhetslager/9dd06bee36']],
      text: 'Et lager er et areal for <b>oppbevaring av varer over kortere eller lengre tid</b>. <b>Plukklageret</b> ligger i golvplan, <b>volumlageret</b> i høyden (også kalt høydelager, støtlager eller overstock). Når en plukkplass blir tom, løftes en full pall ned fra volumlageret. Når saldoen når <b>bestillingspunktet</b>, foreslår systemet en ny innkjøpsordre.' },
    { key: 'plukk', title: 'Ordre og plukk', at: [11, 0, -4], bok: 'Læreboka 1.3, s. 24–26',
      ndla: [['Mottak av kundeordrer og klargjøring for plukk', 'mottak-av-kundeordrer-bekreftelse-og-klargjoring-for-plukk/92fe8ade29']],
      text: 'Kundeordren splittes i plukklister per lagersone, sortert slik at du plukker langs korteste rute. Varer uten holdbarhetsdato plukkes etter <b>FIFO</b> (først inn, først ut) – slik som i animasjonen. Holdbarhetsvarer plukkes etter <b>holdbarhetsdato</b>. A-varer som plukkes ofte, står nærmest oppstillingsområdet.' },
    { key: 'pakk', title: 'Sammenstilling, emballering og merking', at: [13, 0, 8], bok: 'Læreboka 1.3, s. 18 og 26–27',
      ndla: [['Plukk, sammenstilling, emballering og oppstilling for transport', 'plukk-sammenstilling-emballering-og-oppstilling-for-transport/a5e684dcfc']],
      text: 'Delordrene samles på en kundepall med tunge varer nederst og lette som topplast. Pallen emballeres med strekkfilm, merkes med kundens navn og adresse og settes på <b>oppstillingsområdet for transport</b>.' },
    { key: 'utlevering', title: 'Utlevering', at: [13, 0, 14], bok: 'Læreboka 1.3, s. 18',
      ndla: [['Innkjøp og distribusjon av varer', 'innkjop-og-distribusjon-av-varer/2638662d26']],
      text: 'Når alle ordrene på samme kjørerute er ferdigplukket, lastes de etter <b>LIFO</b> (sist inn, først ut). Sjåføren sikrer lasten, og kunden kvitterer ved levering. Nå er varene <b>gods</b> under transport.' },
  ],
  terminal: [
    { key: 'ankomst', title: 'Ankomst', at: [0, 0, -14], bok: 'Læreboka 1.4, s. 27 og 30–31',
      ndla: [['Hva er en terminal?', 'hva-er-en-terminal/04f1384e9b'], ['Terminaler', 'terminaler/6a8f025da7']],
      text: 'En <b>godsterminal</b> er et anlegg for sortering av gods på veg fra avsendere til mottakere. På en samlastterminal er godset mange mindre kolli fra mange avsendere til mange mottakere. Ved mottak har terminalen <b>undersøkelsesplikt</b>: godset og opplysningene i fraktbrevet skal sjekkes.' },
    { key: 'lossing', title: 'Lossing og skanning', at: [0, 0, -6], bok: 'Læreboka 1.4, s. 32',
      ndla: [['Hva skjer på en pakketerminal?', 'hva-skjer-pa-en-pakketerminal/d57c6a6094']],
      text: 'Godset losses, og <b>alt blir skannet</b>, slik at sporingsinformasjonen blir oppdatert. Det skjer på nytt på hver terminal godset er innom. Strekkoden og mottakerens postnummer må derfor ikke bli skadd.' },
    { key: 'sortering', title: 'Sortering', at: [0, 0, 0], bok: 'Læreboka 1.4, s. 32–34 (figur 1.18–1.19)',
      ndla: [['Logistikkløsninger (film fra Postens terminal)', 'logistikklosninger/a12f0becba']],
      text: 'Godset sorteres i tre grupper (fargene): <b>lokalgods</b> på distribusjonssoner i nærområdet, gods på <b>regionale distribusjonsruter</b> og gods til <b>andre regioner</b>, som går til sentralterminalen. Godset får ingen lokasjon og går rett videre.' },
    { key: 'buffer', title: 'Kort oppstilling i sone', at: [-11, 0, 3], bok: 'Læreboka 1.1 og 1.4',
      ndla: [['Terminaler', 'terminaler/6a8f025da7']],
      text: 'Terminalen skal sortere godset og sende det videre <b>så snart som mulig</b>. Godset står bare til bilen på riktig rute er klar – derfor finnes det ingen reoler her.' },
    { key: 'lasting', title: 'Lasting', at: [11, 0, 6], bok: 'Læreboka 1.3, s. 18 og 1.4, s. 32',
      ndla: [['Logistikk på vei', 'logistikk-pa-vei/7cc06dd6cc']],
      text: 'Distribusjonsbilene lastes etter <b>LIFO</b>, slik som på lageret: det som skal leveres sist, lastes inn først. Gods til andre regioner lastes i konteinere eller skapbiler til sentralterminalen.' },
    { key: 'avgang', title: 'Avgang og terminalnett', at: [0, 0, 15], bok: 'Læreboka 1.4, s. 28–29',
      ndla: [['Hva er en terminal?', 'hva-er-en-terminal/04f1384e9b']],
      text: 'De fleste kolli er innom tre terminaler: <b>avsenderterminal</b>, <b>sentralterminal</b> (i Osloområdet) og <b>mottakerterminal</b>. Lokalgods er innom bare én. På sentralterminalen sorterer automatiske anlegg pakkene etter mottakerens postnummer.' },
  ],
};
let stepState = { lager: -1, terminal: -1 };
function renderSteps() {
  ['lager', 'terminal'].forEach(b => {
    const host2 = document.querySelector(`[data-steps="${b}"]`);
    if (!host2) return;
    host2.innerHTML = '';
    STEPS[b].forEach((s, i) => {
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'stepBtn';
      btn.textContent = `${i + 1}. ${s.title}`;
      btn.setAttribute('aria-pressed', String(stepState[b] === i));
      btn.addEventListener('click', () => showStep(b, i));
      host2.appendChild(btn);
    });
  });
}
function showStep(b, i) {
  stepState = { lager: -1, terminal: -1 };
  stepState[b] = i;
  const s = STEPS[b][i];
  if (mode === 'begge') { /* bli i sammenligning, men zoom inn */ }
  const bld = b === 'lager' ? lager : terminal;
  const ox = bld.root.position.x;
  const t = [s.at[0] + ox, 0, s.at[2]];
  const kk = Math.max(1, 1.2 / camera.aspect);
  flyTo([t[0] + 5 * kk, 22 * kk, t[2] + 20 * kk], t);
  [lager, terminal].forEach(B => Object.entries(B.labels).forEach(([k, l]) => l.element.classList.toggle('active', B === bld && k === s.key)));
  const out = document.getElementById('stepText');
  const links = s.ndla.map(([t, u]) => `<a href="${NDLA + u}" target="_blank" rel="noopener">${t}</a>`).join(' · ');
  out.innerHTML = `<div class="kicker">${b === 'lager' ? 'Lager' : 'Terminal'} · steg ${i + 1} av ${STEPS[b].length}</div><h3>${s.title}</h3><p>${s.text}</p><p class="src">📖 ${s.bok} · NDLA: ${links}</p>`;
  const nav = document.createElement('div'); nav.className = 'stepNav';
  if (i > 0) nav.appendChild(mkBtn('← Forrige', () => showStep(b, i - 1)));
  if (i < STEPS[b].length - 1) nav.appendChild(mkBtn('Neste →', () => showStep(b, i + 1)));
  else nav.appendChild(mkBtn('Vis hele bygget', () => setMode(mode)));
  out.appendChild(nav);
  renderSteps();
}
function mkBtn(t, fn) { const b = document.createElement('button'); b.type = 'button'; b.className = 'btn small'; b.textContent = t; b.addEventListener('click', fn); return b; }

/* ---------- Kontroller ---------- */
let simMin = 6 * 60;  // start kl 06:00 dag 1
let speed = 1;
let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const playBtn = document.getElementById('playBtn');
function syncPlay() { playBtn.textContent = paused ? '▶ Start' : '❚❚ Pause'; }
playBtn.addEventListener('click', () => { paused = !paused; syncPlay(); });
document.getElementById('speed').addEventListener('input', e => { speed = Number(e.target.value); document.getElementById('speedOut').textContent = speed + '×'; });
document.querySelectorAll('button[data-mode]').forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode)));
document.getElementById('labelsBtn').addEventListener('click', e => {
  const on = host.classList.toggle('hideLabels');
  e.currentTarget.setAttribute('aria-pressed', String(!on));
});
syncPlay();

/* ---------- Statistikk ---------- */
function fmtDur(min) {
  if (min === null) return '–';
  if (min >= 48 * 60) return Math.round(min / 1440) + ' døgn';
  if (min >= 120) return (min / 60).toFixed(0) + ' timer';
  return Math.round(min) + ' min';
}
function fmtClock(min) {
  const d = Math.floor(min / 1440) + 1; const m = Math.floor(min % 1440);
  return `Dag ${d} · kl. ${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}
const statEls = {
  clock: document.getElementById('clock'),
  lIn: document.getElementById('lagerInne'), lOut: document.getElementById('lagerUt'), lDw: document.getElementById('lagerTid'),
  tIn: document.getElementById('termInne'), tOut: document.getElementById('termUt'), tDw: document.getElementById('termTid'),
};
let statT = 0;
function updateStats() {
  statEls.clock.textContent = fmtClock(simMin);
  statEls.lIn.textContent = lager.countInside();
  statEls.lOut.textContent = lager.throughput;
  statEls.lDw.textContent = fmtDur(lager.avgDwell());
  statEls.tIn.textContent = terminal.countInside();
  statEls.tOut.textContent = terminal.throughput;
  statEls.tDw.textContent = fmtDur(terminal.avgDwell());
}

/* ---------- Løkke ---------- */
function resize() {
  const w = host.clientWidth, h = host.clientHeight;
  renderer.setSize(w, h); labelRenderer.setSize(w, h);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(host);
resize();
setMode('begge', true);

const clock = new THREE.Clock();
function simulate(seconds) {
  // del opp store steg for stabil simulering
  let rest = seconds;
  while (rest > 0) {
    const dt = Math.min(rest, 1 / 30);
    simMin += dt * SIM_MIN_PER_SEC;
    if (lager.root.visible) lager.update(dt);
    if (terminal.root.visible) terminal.update(dt);
    rest -= dt;
  }
}
renderer.setAnimationLoop(() => {
  const realDt = Math.min(clock.getDelta(), 0.1);
  if (!paused) simulate(realDt * speed);
  if (camAnim) {
    camAnim.t += realDt / camAnim.dur;
    const k = camAnim.t >= 1 ? 1 : 1 - Math.pow(1 - camAnim.t, 3);
    camera.position.lerpVectors(camAnim.from, camAnim.to, k);
    controls.target.lerpVectors(camAnim.tFrom, camAnim.tTo, k);
    if (camAnim.t >= 1) camAnim = null;
  }
  controls.update();
  statT += realDt;
  if (statT > 0.25) { statT = 0; updateStats(); }
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
});

// for testing
window.__tll3d = { lager, terminal, simulate, camera, controls, showStep, get camAnim() { return camAnim; }, get simMin() { return simMin; } };
