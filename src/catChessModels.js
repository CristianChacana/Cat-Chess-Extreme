import * as THREE from 'three';

// =============================================================================
// Cat Cheese Extreme - Procedural 3D Cat Pieces, Cat Room, Arenero & Board
// =============================================================================

// Procedural Canvas Textures for realistic finishes
function createWoodParquetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#b8824f';
  ctx.fillRect(0, 0, 512, 512);

  // Parquet plank stripes
  const plankH = 32;
  for (let y = 0; y < 512; y += plankH) {
    const isAlt = (y / plankH) % 2 === 0;
    ctx.fillStyle = isAlt ? '#c8925f' : '#ab7643';
    ctx.fillRect(0, y, 512, plankH - 2);

    // Fine grain noise lines
    ctx.strokeStyle = 'rgba(70, 40, 15, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const lineY = y + Math.random() * plankH;
      ctx.beginPath();
      ctx.moveTo(0, lineY);
      ctx.lineTo(512, lineY);
      ctx.stroke();
    }
  }

  // Plank vertical joint lines
  ctx.strokeStyle = '#6f441e';
  ctx.lineWidth = 2;
  for (let y = 0; y < 512; y += plankH) {
    const offset = ((y / plankH) % 3) * 120;
    for (let x = offset; x < 512; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + plankH);
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 5);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCatWallpaperTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fef6ee';
  ctx.fillRect(0, 0, 256, 256);

  // Subtle cute paw prints pattern
  function drawPaw(cx, cy, s, color) {
    ctx.fillStyle = color;
    // Main pad
    ctx.beginPath();
    ctx.ellipse(cx, cy + 4 * s, 8 * s, 6 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    // 4 toe beans
    const toes = [
      { x: -6 * s, y: -4 * s },
      { x: -2 * s, y: -8 * s },
      { x: 3 * s, y: -8 * s },
      { x: 7 * s, y: -4 * s }
    ];
    for (const t of toes) {
      ctx.beginPath();
      ctx.arc(cx + t.x, cy + t.y, 2.5 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const pawColor = 'rgba(235, 185, 155, 0.22)';
  drawPaw(64, 64, 1.2, pawColor);
  drawPaw(192, 64, 1.2, pawColor);
  drawPaw(128, 160, 1.2, pawColor);
  drawPaw(64, 224, 0.9, pawColor);
  drawPaw(192, 224, 0.9, pawColor);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createLitterSandTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#d6cbba';
  ctx.fillRect(0, 0, 256, 256);

  // Granulated cat litter specks
  for (let i = 0; i < 3500; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = Math.random() * 1.6 + 0.4;
    const shade = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.4)' : 'rgba(120, 105, 90, 0.35)';
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createSwissCheeseTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffc83b';
  ctx.fillRect(0, 0, 256, 256);

  // Cheese holes (darker orange inside with soft shadow)
  const holes = [
    { x: 45, y: 55, r: 16 },
    { x: 130, y: 70, r: 24 },
    { x: 210, y: 40, r: 14 },
    { x: 75, y: 155, r: 20 },
    { x: 170, y: 165, r: 28 },
    { x: 220, y: 220, r: 15 },
    { x: 40, y: 215, r: 18 }
  ];

  for (const h of holes) {
    const grad = ctx.createRadialGradient(h.x - 3, h.y - 3, 2, h.x, h.y, h.r);
    grad.addColorStop(0, '#d98b16');
    grad.addColorStop(0.8, '#e89c20');
    grad.addColorStop(1, '#ffb826');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
    ctx.fill();

    // Soft rim
    ctx.strokeStyle = '#c57a0e';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Global Materials
const materials = {
  woodFloor: new THREE.MeshStandardMaterial({
    map: createWoodParquetTexture(),
    roughness: 0.35,
    metalness: 0.05
  }),
  wall: new THREE.MeshStandardMaterial({
    map: createCatWallpaperTexture(),
    roughness: 0.85,
    metalness: 0.0
  }),
  wallTrim: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.4,
    metalness: 0.05
  }),
  litterBoxTray: new THREE.MeshStandardMaterial({
    color: 0x48cae4, // Pleasant modern aqua/blue
    roughness: 0.3,
    metalness: 0.1
  }),
  litterBoxRim: new THREE.MeshStandardMaterial({
    color: 0x90e0ef,
    roughness: 0.25,
    metalness: 0.05
  }),
  litterSand: new THREE.MeshStandardMaterial({
    map: createLitterSandTexture(),
    roughness: 0.95,
    metalness: 0.0
  }),
  litterScoop: new THREE.MeshStandardMaterial({
    color: 0xffb703, // Bright yellow-orange scoop
    roughness: 0.35,
    metalness: 0.05
  }),
  cheese: new THREE.MeshStandardMaterial({
    map: createSwissCheeseTexture(),
    roughness: 0.45,
    metalness: 0.05
  }),
  catTreeWood: new THREE.MeshStandardMaterial({
    color: 0xd4a373,
    roughness: 0.6,
    metalness: 0.0
  }),
  catTreeSisal: new THREE.MeshStandardMaterial({
    color: 0xfaedcd,
    roughness: 0.9,
    metalness: 0.0
  }),
  catBedCushion: new THREE.MeshStandardMaterial({
    color: 0xf4a261,
    roughness: 0.8,
    metalness: 0.0
  }),
  yarnPink: new THREE.MeshStandardMaterial({
    color: 0xff70a6,
    roughness: 0.9,
    metalness: 0.0
  }),
  yarnCyan: new THREE.MeshStandardMaterial({
    color: 0x70d6ff,
    roughness: 0.9,
    metalness: 0.0
  }),
  ceramicBowl: new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.1
  }),
  milkLiquid: new THREE.MeshStandardMaterial({
    color: 0xfffff0,
    roughness: 0.1,
    metalness: 0.1
  }),
  foodTuna: new THREE.MeshStandardMaterial({
    color: 0xbc6c25,
    roughness: 0.8,
    metalness: 0.0
  }),

  // Cat Piece Fur & Details
  whiteCat: new THREE.MeshStandardMaterial({
    color: 0xfcfbfa,
    roughness: 0.52,
    metalness: 0.04
  }),
  blackCat: new THREE.MeshStandardMaterial({
    color: 0x181a20,
    roughness: 0.48,
    metalness: 0.12
  }),
  // Queens' mandatory pink cape (capa rosada)
  pinkCape: new THREE.MeshStandardMaterial({
    color: 0xff66a3,
    roughness: 0.38,
    metalness: 0.08,
    side: THREE.DoubleSide
  }),
  pinkInnerEar: new THREE.MeshStandardMaterial({
    color: 0xffa8ba,
    roughness: 0.65,
    metalness: 0.0
  }),
  goldTrim: new THREE.MeshStandardMaterial({
    color: 0xffbe0b,
    roughness: 0.22,
    metalness: 0.85
  }),
  catEyeBlue: new THREE.MeshStandardMaterial({
    color: 0x00b4d8,
    roughness: 0.1,
    metalness: 0.2,
    emissive: 0x0077b6,
    emissiveIntensity: 0.35
  }),
  catEyeGreen: new THREE.MeshStandardMaterial({
    color: 0x2ec4b6,
    roughness: 0.1,
    metalness: 0.2,
    emissive: 0x1b9aaa,
    emissiveIntensity: 0.35
  }),
  catNose: new THREE.MeshStandardMaterial({
    color: 0xff99aa,
    roughness: 0.5,
    metalness: 0.0
  }),
  stoneTower: new THREE.MeshStandardMaterial({
    color: 0xa8a29e,
    roughness: 0.75,
    metalness: 0.08
  }),
  knightArmor: new THREE.MeshStandardMaterial({
    color: 0x71717a,
    roughness: 0.3,
    metalness: 0.75
  }),
  knightPlume: new THREE.MeshStandardMaterial({
    color: 0xef4444,
    roughness: 0.6,
    metalness: 0.1
  })
};

// =============================================================================
// 1. Procedural Cat Pieces
// =============================================================================

export function createCatPieceModel(type, color) {
  const isWhite = color === 'w';
  const furMat = isWhite ? materials.whiteCat : materials.blackCat;
  const eyeMat = isWhite ? materials.catEyeBlue : materials.catEyeGreen;

  const root = new THREE.Group();
  root.name = `Cat_${type}_${color}`;

  // Container for animated parts
  const animParts = {
    root,
    tail: null,
    head: null,
    leftPaw: null,
    rightPaw: null,
    ears: [],
    cape: null
  };
  root.userData.animParts = animParts;

  // Helper: Create standard cute cat head
  function createCatHead(headScale = 1) {
    const headGroup = new THREE.Group();

    // Cranium / Head
    const headGeo = new THREE.SphereGeometry(0.12 * headScale, 18, 16);
    headGeo.scale(1.15, 1.0, 1.05);
    const headMesh = new THREE.Mesh(headGeo, furMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Muzzle / Cheeks
    const cheekGeo = new THREE.SphereGeometry(0.045 * headScale, 12, 12);
    cheekGeo.scale(1.2, 0.9, 1.0);
    const leftCheek = new THREE.Mesh(cheekGeo, furMat);
    leftCheek.position.set(0.042 * headScale, -0.03 * headScale, 0.09 * headScale);
    headGroup.add(leftCheek);
    const rightCheek = new THREE.Mesh(cheekGeo, furMat);
    rightCheek.position.set(-0.042 * headScale, -0.03 * headScale, 0.09 * headScale);
    headGroup.add(rightCheek);

    // Cute pink nose
    const noseGeo = new THREE.ConeGeometry(0.016 * headScale, 0.018 * headScale, 3);
    noseGeo.rotateX(Math.PI);
    const noseMesh = new THREE.Mesh(noseGeo, materials.catNose);
    noseMesh.position.set(0, -0.02 * headScale, 0.122 * headScale);
    headGroup.add(noseMesh);

    // Shiny Cat Eyes
    const eyeGeo = new THREE.SphereGeometry(0.024 * headScale, 12, 12);
    eyeGeo.scale(1.0, 1.25, 0.55);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(0.048 * headScale, 0.018 * headScale, 0.096 * headScale);
    leftEye.rotation.y = 0.2;
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(-0.048 * headScale, 0.018 * headScale, 0.096 * headScale);
    rightEye.rotation.y = -0.2;
    headGroup.add(rightEye);

    // Pointy Cat Ears
    const earGeo = new THREE.ConeGeometry(0.042 * headScale, 0.075 * headScale, 4);
    const innerEarGeo = new THREE.ConeGeometry(0.028 * headScale, 0.055 * headScale, 3);

    const leftEar = new THREE.Mesh(earGeo, furMat);
    leftEar.position.set(0.07 * headScale, 0.11 * headScale, 0.01 * headScale);
    leftEar.rotation.z = -0.25;
    leftEar.rotation.x = -0.15;
    headGroup.add(leftEar);
    const leftInnerEar = new THREE.Mesh(innerEarGeo, materials.pinkInnerEar);
    leftInnerEar.position.set(0.068 * headScale, 0.108 * headScale, 0.024 * headScale);
    leftInnerEar.rotation.z = -0.25;
    leftInnerEar.rotation.x = -0.15;
    headGroup.add(leftInnerEar);

    const rightEar = new THREE.Mesh(earGeo, furMat);
    rightEar.position.set(-0.07 * headScale, 0.11 * headScale, 0.01 * headScale);
    rightEar.rotation.z = 0.25;
    rightEar.rotation.x = -0.15;
    headGroup.add(rightEar);
    const rightInnerEar = new THREE.Mesh(innerEarGeo, materials.pinkInnerEar);
    rightInnerEar.position.set(-0.068 * headScale, 0.108 * headScale, 0.024 * headScale);
    rightInnerEar.rotation.z = 0.25;
    rightInnerEar.rotation.x = -0.15;
    headGroup.add(rightInnerEar);

    animParts.ears.push(leftEar, rightEar);
    return headGroup;
  }

  // Helper: Create cat tail
  function createCatTail(length = 0.28, thickness = 0.022) {
    const tailGroup = new THREE.Group();
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, length * 0.35, -length * 0.25),
      new THREE.Vector3(0, length * 0.75, -length * 0.35),
      new THREE.Vector3(0, length, -length * 0.15)
    ]);
    const tailGeo = new THREE.TubeGeometry(curve, 16, thickness, 8, false);
    const tailMesh = new THREE.Mesh(tailGeo, furMat);
    tailMesh.castShadow = true;
    tailGroup.add(tailMesh);
    animParts.tail = tailGroup;
    return tailGroup;
  }

  // ==========================================
  // TYPE: PAWN (Adorable kitten)
  // ==========================================
  if (type === 'pawn') {
    // Round kitten body
    const bodyGeo = new THREE.SphereGeometry(0.12, 16, 16);
    bodyGeo.scale(0.9, 1.2, 0.95);
    const body = new THREE.Mesh(bodyGeo, furMat);
    body.position.set(0, 0.14, 0);
    body.castShadow = true;
    root.add(body);

    // Head
    const head = createCatHead(0.92);
    head.position.set(0, 0.28, 0.03);
    root.add(head);
    animParts.head = head;

    // Front Paws
    const pawGeo = new THREE.CapsuleGeometry(0.025, 0.06, 8, 8);
    const leftPaw = new THREE.Mesh(pawGeo, furMat);
    leftPaw.position.set(0.055, 0.06, 0.065);
    root.add(leftPaw);
    const rightPaw = new THREE.Mesh(pawGeo, furMat);
    rightPaw.position.set(-0.055, 0.06, 0.065);
    root.add(rightPaw);
    animParts.leftPaw = leftPaw;
    animParts.rightPaw = rightPaw;

    // Tail
    const tail = createCatTail(0.22, 0.02);
    tail.position.set(0, 0.08, -0.09);
    root.add(tail);

    // Collar with golden cheese bell
    const collarGeo = new THREE.TorusGeometry(0.08, 0.012, 8, 20);
    collarGeo.rotateX(Math.PI / 2);
    const collar = new THREE.Mesh(collarGeo, materials.goldTrim);
    collar.position.set(0, 0.22, 0.02);
    root.add(collar);
  }

  // ==========================================
  // TYPE: ROOK (Cat perched on top of a tower!)
  // "la torre que tenga un gato arriba de una torre pequeña"
  // ==========================================
  else if (type === 'rook') {
    const towerGroup = new THREE.Group();

    // Tower base plinth
    const baseGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.06, 16);
    const baseMesh = new THREE.Mesh(baseGeo, materials.stoneTower);
    baseMesh.position.y = 0.03;
    baseMesh.castShadow = true;
    towerGroup.add(baseMesh);

    // Round stone tower shaft with sisal rope scratching section
    const shaftGeo = new THREE.CylinderGeometry(0.11, 0.13, 0.26, 16);
    const shaftMesh = new THREE.Mesh(shaftGeo, materials.stoneTower);
    shaftMesh.position.y = 0.18;
    shaftMesh.castShadow = true;
    towerGroup.add(shaftMesh);

    // Sisal scratch rope collar around the tower
    const sisalGeo = new THREE.CylinderGeometry(0.118, 0.125, 0.12, 16);
    const sisalMesh = new THREE.Mesh(sisalGeo, materials.catTreeSisal);
    sisalMesh.position.y = 0.17;
    towerGroup.add(sisalMesh);

    // Tower top battlement / crenellations platform
    const topPlatGeo = new THREE.CylinderGeometry(0.135, 0.11, 0.05, 16);
    const topPlatMesh = new THREE.Mesh(topPlatGeo, materials.stoneTower);
    topPlatMesh.position.y = 0.33;
    towerGroup.add(topPlatMesh);

    // 4 Castle battlements (merlons)
    const merlonGeo = new THREE.BoxGeometry(0.04, 0.06, 0.04);
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const m = new THREE.Mesh(merlonGeo, materials.stoneTower);
      m.position.set(Math.cos(angle) * 0.115, 0.37, Math.sin(angle) * 0.115);
      towerGroup.add(m);
    }
    root.add(towerGroup);

    // Cat perched inside & on top of the battlements!
    const catGroup = new THREE.Group();
    catGroup.position.set(0, 0.36, 0);

    // Cat loaf body
    const catBodyGeo = new THREE.SphereGeometry(0.09, 14, 14);
    catBodyGeo.scale(1.0, 0.85, 1.15);
    const catBody = new THREE.Mesh(catBodyGeo, furMat);
    catBody.position.set(0, 0.06, -0.01);
    catBody.castShadow = true;
    catGroup.add(catBody);

    // Cat Head looking proudly forward
    const catHead = createCatHead(0.85);
    catHead.position.set(0, 0.15, 0.05);
    catGroup.add(catHead);
    animParts.head = catHead;

    // Cat front paws resting over the tower rim
    const pawGeo = new THREE.CapsuleGeometry(0.02, 0.045, 6, 6);
    const leftPaw = new THREE.Mesh(pawGeo, furMat);
    leftPaw.position.set(0.05, 0.04, 0.10);
    leftPaw.rotation.x = Math.PI / 4;
    catGroup.add(leftPaw);
    const rightPaw = new THREE.Mesh(pawGeo, furMat);
    rightPaw.position.set(-0.05, 0.04, 0.10);
    rightPaw.rotation.x = Math.PI / 4;
    catGroup.add(rightPaw);
    animParts.leftPaw = leftPaw;
    animParts.rightPaw = rightPaw;

    // Tail draping playfully down the side of the tower
    const tail = createCatTail(0.24, 0.018);
    tail.position.set(0.09, 0.06, -0.04);
    tail.rotation.z = -0.5;
    catGroup.add(tail);

    root.add(catGroup);
  }

  // ==========================================
  // TYPE: KNIGHT (Small kitten knight riding big cat horse!)
  // "el caballo que sea un gato caballero pequeño sobre otro gato grande, que simule al caballo"
  // ==========================================
  else if (type === 'knight') {
    // 1. BIG CAT (The Steed / Horse)
    const steedGroup = new THREE.Group();

    // Big cat torso on all fours
    const steedBodyGeo = new THREE.CapsuleGeometry(0.10, 0.18, 12, 12);
    steedBodyGeo.rotateX(Math.PI / 2);
    const steedBody = new THREE.Mesh(steedBodyGeo, furMat);
    steedBody.position.set(0, 0.18, 0);
    steedBody.castShadow = true;
    steedGroup.add(steedBody);

    // 4 sturdy legs
    const legGeo = new THREE.CylinderGeometry(0.03, 0.035, 0.14, 8);
    const legPositions = [
      [0.07, 0.07, 0.08],
      [-0.07, 0.07, 0.08],
      [0.07, 0.07, -0.08],
      [-0.07, 0.07, -0.08]
    ];
    for (const [lx, ly, lz] of legPositions) {
      const leg = new THREE.Mesh(legGeo, furMat);
      leg.position.set(lx, ly, lz);
      steedGroup.add(leg);
    }

    // Big cat head (proud horse-like arch neck)
    const steedNeckGeo = new THREE.CylinderGeometry(0.065, 0.08, 0.12, 8);
    steedNeckGeo.rotateX(0.4);
    const steedNeck = new THREE.Mesh(steedNeckGeo, furMat);
    steedNeck.position.set(0, 0.26, 0.10);
    steedGroup.add(steedNeck);

    const steedHead = createCatHead(0.9);
    steedHead.position.set(0, 0.32, 0.14);
    steedHead.rotation.x = -0.15;
    steedGroup.add(steedHead);

    // Saddle cloth for the knight
    const saddleGeo = new THREE.BoxGeometry(0.17, 0.04, 0.14);
    const saddleMesh = new THREE.Mesh(saddleGeo, materials.goldTrim);
    saddleMesh.position.set(0, 0.26, -0.01);
    steedGroup.add(saddleMesh);

    // Steed tail
    const steedTail = createCatTail(0.24, 0.022);
    steedTail.position.set(0, 0.20, -0.15);
    steedTail.rotation.x = -0.4;
    steedGroup.add(steedTail);

    root.add(steedGroup);

    // 2. SMALL KITTEN KNIGHT (Rider)
    const knightGroup = new THREE.Group();
    knightGroup.position.set(0, 0.29, -0.01);

    // Kitten knight torso
    const knightTorsoGeo = new THREE.CapsuleGeometry(0.05, 0.07, 8, 8);
    const knightTorso = new THREE.Mesh(knightTorsoGeo, materials.knightArmor);
    knightTorso.position.y = 0.08;
    knightGroup.add(knightTorso);

    // Little kitten knight head
    const knightHead = createCatHead(0.65);
    knightHead.position.set(0, 0.17, 0.01);
    knightGroup.add(knightHead);
    animParts.head = knightHead;

    // Cute Little Knight Helmet with Visor & Red Plume
    const helmetGeo = new THREE.SphereGeometry(0.082, 10, 10);
    helmetGeo.scale(1.0, 1.1, 1.05);
    const helmet = new THREE.Mesh(helmetGeo, materials.knightArmor);
    helmet.position.set(0, 0.18, 0.01);
    knightGroup.add(helmet);

    // Red knight feather plume on top!
    const plumeGeo = new THREE.ConeGeometry(0.02, 0.08, 6);
    plumeGeo.rotateZ(0.2);
    const plume = new THREE.Mesh(plumeGeo, materials.knightPlume);
    plume.position.set(0, 0.26, -0.01);
    knightGroup.add(plume);

    // Little front paws holding reins / miniature shield
    const knightPawGeo = new THREE.CapsuleGeometry(0.016, 0.04, 6, 6);
    const leftKnightPaw = new THREE.Mesh(knightPawGeo, furMat);
    leftKnightPaw.position.set(0.045, 0.08, 0.05);
    leftKnightPaw.rotation.x = Math.PI / 3;
    knightGroup.add(leftKnightPaw);
    const rightKnightPaw = new THREE.Mesh(knightPawGeo, furMat);
    rightKnightPaw.position.set(-0.045, 0.08, 0.05);
    rightKnightPaw.rotation.x = Math.PI / 3;
    knightGroup.add(rightKnightPaw);
    animParts.leftPaw = leftKnightPaw;
    animParts.rightPaw = rightKnightPaw;

    root.add(knightGroup);
  }

  // ==========================================
  // TYPE: BISHOP (Wise mystic cleric cat)
  // ==========================================
  else if (type === 'bishop') {
    // Tall seated cat body
    const bodyGeo = new THREE.ConeGeometry(0.12, 0.32, 16);
    const body = new THREE.Mesh(bodyGeo, furMat);
    body.position.y = 0.16;
    body.castShadow = true;
    root.add(body);

    // Head
    const head = createCatHead(0.95);
    head.position.set(0, 0.34, 0.02);
    root.add(head);
    animParts.head = head;

    // Bishop Mitre Hat with gold trim & fish medallion
    const mitreGroup = new THREE.Group();
    const mitreGeo = new THREE.ConeGeometry(0.07, 0.16, 4);
    mitreGeo.scale(1.0, 1.0, 0.65);
    const mitreMesh = new THREE.Mesh(mitreGeo, materials.goldTrim);
    mitreMesh.position.set(0, 0.44, 0.01);
    mitreGroup.add(mitreMesh);

    // Little fish/cross ornament on the mitre
    const orbGeo = new THREE.SphereGeometry(0.018, 8, 8);
    const orb = new THREE.Mesh(orbGeo, materials.cheese);
    orb.position.set(0, 0.52, 0.01);
    mitreGroup.add(orb);
    root.add(mitreGroup);

    // Front paws in wise pose
    const pawGeo = new THREE.CapsuleGeometry(0.024, 0.08, 8, 8);
    const leftPaw = new THREE.Mesh(pawGeo, furMat);
    leftPaw.position.set(0.05, 0.14, 0.08);
    root.add(leftPaw);
    const rightPaw = new THREE.Mesh(pawGeo, furMat);
    rightPaw.position.set(-0.05, 0.14, 0.08);
    root.add(rightPaw);
    animParts.leftPaw = leftPaw;
    animParts.rightPaw = rightPaw;

    // Tail
    const tail = createCatTail(0.30, 0.022);
    tail.position.set(0, 0.08, -0.09);
    root.add(tail);
  }

  // ==========================================
  // TYPE: QUEEN (Regal Cat Queen with PINK CAPE on BOTH White and Black!)
  // "que ambas reinas tengan capa rosada"
  // ==========================================
  else if (type === 'queen') {
    // Slender, elegant queen body
    const bodyGeo = new THREE.ConeGeometry(0.13, 0.38, 18);
    const body = new THREE.Mesh(bodyGeo, furMat);
    body.position.y = 0.19;
    body.castShadow = true;
    root.add(body);

    // Queen Cat Head
    const head = createCatHead(1.0);
    head.position.set(0, 0.39, 0.03);
    root.add(head);
    animParts.head = head;

    // Sparkling Royal Crown / Tiara
    const tiaraGroup = new THREE.Group();
    const tiaraBaseGeo = new THREE.CylinderGeometry(0.065, 0.06, 0.03, 12, 1, true);
    const tiaraBase = new THREE.Mesh(tiaraBaseGeo, materials.goldTrim);
    tiaraBase.position.set(0, 0.49, 0.02);
    tiaraGroup.add(tiaraBase);

    // 5 Tiara spikes with pink jewels
    for (let i = 0; i < 5; i++) {
      const angle = ((i - 2) * Math.PI) / 6;
      const spikeGeo = new THREE.ConeGeometry(0.014, 0.05, 4);
      const spike = new THREE.Mesh(spikeGeo, materials.goldTrim);
      spike.position.set(Math.sin(angle) * 0.062, 0.52, Math.cos(angle) * 0.062);
      tiaraGroup.add(spike);

      const gemGeo = new THREE.SphereGeometry(0.009, 6, 6);
      const gem = new THREE.Mesh(gemGeo, materials.pinkCape);
      gem.position.set(Math.sin(angle) * 0.062, 0.545, Math.cos(angle) * 0.062);
      tiaraGroup.add(gem);
    }
    root.add(tiaraGroup);

    // ==========================================
    // MANDATORY PINK CAPE (CAPA ROSADA)
    // ==========================================
    const capeGroup = new THREE.Group();

    // Sculpted curved cape that wraps around the neck and cascades majestically behind
    const capeShape = new THREE.Shape();
    capeShape.moveTo(-0.08, 0.32);
    capeShape.lineTo(0.08, 0.32);
    capeShape.bezierCurveTo(0.14, 0.16, 0.18, 0.04, 0.15, 0.0);
    capeShape.bezierCurveTo(0.06, -0.02, -0.06, -0.02, -0.15, 0.0);
    capeShape.bezierCurveTo(-0.18, 0.04, -0.14, 0.16, -0.08, 0.32);

    const extrudeSettings = {
      depth: 0.015,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.008,
      bevelThickness: 0.008
    };
    const capeGeo = new THREE.ExtrudeGeometry(capeShape, extrudeSettings);
    capeGeo.rotateY(Math.PI);
    const capeMesh = new THREE.Mesh(capeGeo, materials.pinkCape);
    capeMesh.position.set(0, 0.04, -0.07);
    capeMesh.rotation.x = -0.15;
    capeMesh.castShadow = true;
    capeGroup.add(capeMesh);

    // Fluffy cape clasp / collar
    const collarGeo = new THREE.TorusGeometry(0.085, 0.018, 8, 16);
    collarGeo.rotateX(Math.PI / 2);
    const collarMesh = new THREE.Mesh(collarGeo, materials.goldTrim);
    collarMesh.position.set(0, 0.33, 0.02);
    capeGroup.add(collarMesh);

    // Heart / gem brooch on the pink cape
    const broochGeo = new THREE.SphereGeometry(0.018, 8, 8);
    const brooch = new THREE.Mesh(broochGeo, materials.pinkCape);
    brooch.position.set(0, 0.33, 0.105);
    capeGroup.add(brooch);

    root.add(capeGroup);
    animParts.cape = capeGroup;

    // Front paws
    const pawGeo = new THREE.CapsuleGeometry(0.026, 0.09, 8, 8);
    const leftPaw = new THREE.Mesh(pawGeo, furMat);
    leftPaw.position.set(0.055, 0.14, 0.09);
    root.add(leftPaw);
    const rightPaw = new THREE.Mesh(pawGeo, furMat);
    rightPaw.position.set(-0.055, 0.14, 0.09);
    root.add(rightPaw);
    animParts.leftPaw = leftPaw;
    animParts.rightPaw = rightPaw;

    // Elegant long tail curled to the side
    const tail = createCatTail(0.34, 0.024);
    tail.position.set(0.08, 0.06, -0.08);
    tail.rotation.z = -0.3;
    root.add(tail);
  }

  // ==========================================
  // TYPE: KING (Regal King Cat)
  // ==========================================
  else if (type === 'king') {
    // Regal sturdy king cat body
    const bodyGeo = new THREE.SphereGeometry(0.16, 18, 18);
    bodyGeo.scale(0.95, 1.25, 1.0);
    const body = new THREE.Mesh(bodyGeo, furMat);
    body.position.y = 0.20;
    body.castShadow = true;
    root.add(body);

    // King Head
    const head = createCatHead(1.08);
    head.position.set(0, 0.40, 0.03);
    root.add(head);
    animParts.head = head;

    // Grand Majestic Royal Crown
    const crownGroup = new THREE.Group();
    const crownBaseGeo = new THREE.CylinderGeometry(0.075, 0.068, 0.04, 16);
    const crownBase = new THREE.Mesh(crownBaseGeo, materials.goldTrim);
    crownBase.position.set(0, 0.52, 0.02);
    crownGroup.add(crownBase);

    // Crown arched velvet cap
    const velvetGeo = new THREE.SphereGeometry(0.065, 12, 12);
    const velvet = new THREE.Mesh(velvetGeo, materials.cheese);
    velvet.position.set(0, 0.54, 0.02);
    crownGroup.add(velvet);

    // Crown Cross / Fleur-de-lis
    const crossVert = new THREE.BoxGeometry(0.014, 0.05, 0.014);
    const crossHoriz = new THREE.BoxGeometry(0.038, 0.014, 0.014);
    const c1 = new THREE.Mesh(crossVert, materials.goldTrim);
    c1.position.set(0, 0.61, 0.02);
    crownGroup.add(c1);
    const c2 = new THREE.Mesh(crossHoriz, materials.goldTrim);
    c2.position.set(0, 0.615, 0.02);
    crownGroup.add(c2);
    root.add(crownGroup);

    // Royal fluffy ermine ruff collar
    const collarGeo = new THREE.TorusGeometry(0.10, 0.024, 8, 18);
    collarGeo.rotateX(Math.PI / 2);
    const collar = new THREE.Mesh(collarGeo, materials.goldTrim);
    collar.position.set(0, 0.32, 0.02);
    root.add(collar);

    // Big golden fish/cheese medallion hanging from collar
    const medGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.008, 12);
    medGeo.rotateX(Math.PI / 2);
    const med = new THREE.Mesh(medGeo, materials.cheese);
    med.position.set(0, 0.26, 0.125);
    root.add(med);

    // Front Paws
    const pawGeo = new THREE.CapsuleGeometry(0.03, 0.10, 8, 8);
    const leftPaw = new THREE.Mesh(pawGeo, furMat);
    leftPaw.position.set(0.065, 0.12, 0.10);
    root.add(leftPaw);
    const rightPaw = new THREE.Mesh(pawGeo, furMat);
    rightPaw.position.set(-0.065, 0.12, 0.10);
    root.add(rightPaw);
    animParts.leftPaw = leftPaw;
    animParts.rightPaw = rightPaw;

    // Regal curled tail
    const tail = createCatTail(0.36, 0.026);
    tail.position.set(0, 0.08, -0.11);
    tail.rotation.x = -0.3;
    root.add(tail);
  }

  // Base Pedestal ring (discreet, ensures piece sits grounded at surface)
  const pedestalGeo = new THREE.CylinderGeometry(0.12, 0.13, 0.022, 20);
  const pedestalMesh = new THREE.Mesh(pedestalGeo, isWhite ? materials.wallTrim : materials.blackCat);
  pedestalMesh.position.y = 0.011;
  pedestalMesh.receiveShadow = true;
  root.add(pedestalMesh);

  return root;
}

// =============================================================================
// 2. Custom Cat-Shaped Chess Board ("Tablero Forma de Gato")
// =============================================================================

export function buildCatShapedBoard(boardGroup, boardSquareMeshes, boardToWorld, BOARD_SQ_SIZE, BOARD_SURFACE_Y) {
  boardGroup.clear();
  boardSquareMeshes.length = 0;

  // 1. Cat Head Silhouette Wooden Base Slab
  const baseShape = new THREE.Shape();
  const half = 4.0 * BOARD_SQ_SIZE + 0.12; // Board half-span

  // Starting at bottom center (South)
  baseShape.moveTo(0, -half - 0.06);
  // Bottom right rounded cheek
  baseShape.quadraticCurveTo(half + 0.08, -half - 0.06, half + 0.08, 0);
  // Right cheek bulge
  baseShape.quadraticCurveTo(half + 0.14, half * 0.5, half + 0.02, half);
  // Right Cat Ear (Pointy North-East!)
  baseShape.lineTo(half + 0.04, half + 0.28);
  baseShape.lineTo(half * 0.35, half + 0.06);
  // Top forehead curve between ears
  baseShape.quadraticCurveTo(0, half + 0.10, -half * 0.35, half + 0.06);
  // Left Cat Ear (Pointy North-West!)
  baseShape.lineTo(-half - 0.04, half + 0.28);
  baseShape.lineTo(-half - 0.02, half);
  // Left cheek bulge
  baseShape.quadraticCurveTo(-half - 0.14, half * 0.5, -half - 0.08, 0);
  // Bottom left rounded cheek
  baseShape.quadraticCurveTo(-half - 0.08, -half - 0.06, 0, -half - 0.06);

  const extrudeSettings = {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025
  };
  const boardBaseGeo = new THREE.ExtrudeGeometry(baseShape, extrudeSettings);
  boardBaseGeo.rotateX(Math.PI / 2);
  const boardBaseMesh = new THREE.Mesh(boardBaseGeo, materials.catTreeWood);
  boardBaseMesh.position.y = BOARD_SURFACE_Y - 0.08;
  boardBaseMesh.receiveShadow = true;
  boardBaseMesh.castShadow = true;
  boardGroup.add(boardBaseMesh);

  // Pink inner ear insets for the board's cat ears!
  for (const s of [-1, 1]) {
    const earShape = new THREE.Shape();
    earShape.moveTo(0, 0);
    earShape.lineTo(0.12, 0);
    earShape.lineTo(0.06, 0.16);
    earShape.closePath();
    const earGeo = new THREE.ExtrudeGeometry(earShape, { depth: 0.01, bevelEnabled: false });
    earGeo.rotateX(Math.PI / 2);
    const earMesh = new THREE.Mesh(earGeo, materials.pinkInnerEar);
    earMesh.position.set(s * (half * 0.72) - 0.06, BOARD_SURFACE_Y - 0.02, half + 0.08);
    boardGroup.add(earMesh);
  }

  // 2. The 8x8 Checkerboard Squares
  const tileH = 0.032;
  const sqGeo = new THREE.BoxGeometry(BOARD_SQ_SIZE * 0.98, tileH, BOARD_SQ_SIZE * 0.98);
  const lightSqMat = new THREE.MeshStandardMaterial({
    color: 0xfffcf2,
    roughness: 0.25,
    metalness: 0.04
  });
  const darkSqMat = new THREE.MeshStandardMaterial({
    color: 0x252422,
    roughness: 0.28,
    metalness: 0.14
  });

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const isLight = (r + c) % 2 === 0;
      const sqMesh = new THREE.Mesh(sqGeo, isLight ? lightSqMat : darkSqMat);
      const pos = boardToWorld(r, c);
      sqMesh.position.set(pos.x, BOARD_SURFACE_Y - tileH * 0.5, pos.z);
      sqMesh.receiveShadow = true;
      sqMesh.userData = { r, c, isSquare: true };
      boardGroup.add(sqMesh);
      boardSquareMeshes.push(sqMesh);
    }
  }

  // 3. Four Corner Cat Paw Print Medallions & Swiss Cheese Wedges
  const cornerDist = 4.0 * BOARD_SQ_SIZE + 0.04;
  const cornerCoords = [
    [cornerDist, cornerDist],
    [-cornerDist, cornerDist],
    [cornerDist, -cornerDist],
    [-cornerDist, -cornerDist]
  ];

  for (const [cx, cz] of cornerCoords) {
    // Corner Golden Medallion
    const medGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.038, 16);
    const med = new THREE.Mesh(medGeo, materials.goldTrim);
    med.position.set(cx, BOARD_SURFACE_Y - 0.015, cz);
    boardGroup.add(med);

    // Paw Print Beans on Medallion
    const padGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.006, 12);
    const pad = new THREE.Mesh(padGeo, materials.pinkInnerEar);
    pad.position.set(cx, BOARD_SURFACE_Y + 0.006, cz);
    boardGroup.add(pad);

    for (let i = 0; i < 4; i++) {
      const a = (i - 1.5) * 0.6;
      const toeGeo = new THREE.CylinderGeometry(0.009, 0.009, 0.006, 8);
      const toe = new THREE.Mesh(toeGeo, materials.pinkInnerEar);
      toe.position.set(cx + Math.sin(a) * 0.042, BOARD_SURFACE_Y + 0.006, cz + Math.cos(a) * 0.042);
      boardGroup.add(toe);
    }

    // Mini 3D Cheese Wedge snack at corners!
    const cheeseShape = new THREE.Shape();
    cheeseShape.moveTo(0, 0);
    cheeseShape.arc(0, 0, 0.05, 0, Math.PI / 3, false);
    cheeseShape.closePath();
    const cheeseGeo = new THREE.ExtrudeGeometry(cheeseShape, { depth: 0.03, bevelEnabled: false });
    cheeseGeo.rotateX(Math.PI / 2);
    const cheese = new THREE.Mesh(cheeseGeo, materials.cheese);
    cheese.position.set(cx * 0.9, BOARD_SURFACE_Y + 0.01, cz * 0.9);
    boardGroup.add(cheese);
  }
}

// =============================================================================
// 3. Cat Room Environment with El Arenero (Cat Litter Box) & Toys
// "Que el fondo sea una pieza ambientada a gato y que tenga un arenero"
// =============================================================================

export function buildCatRoom(scene) {
  const roomGroup = new THREE.Group();
  roomGroup.name = 'Cat_Room_Environment';

  // Room Dimensions
  const ROOM_W = 16.0;
  const ROOM_D = 18.0;
  const ROOM_H = 8.5;

  // 1. Hardwood Parquet Floor
  const floorGeo = new THREE.PlaneGeometry(ROOM_W, ROOM_D);
  floorGeo.rotateX(-Math.PI / 2);
  const floorMesh = new THREE.Mesh(floorGeo, materials.woodFloor);
  floorMesh.position.y = 0.0;
  floorMesh.receiveShadow = true;
  roomGroup.add(floorMesh);

  // 2. Soft Pastel Walls
  const backWallGeo = new THREE.PlaneGeometry(ROOM_W, ROOM_H);
  const backWall = new THREE.Mesh(backWallGeo, materials.wall);
  backWall.position.set(0, ROOM_H / 2, -ROOM_D / 2);
  backWall.receiveShadow = true;
  roomGroup.add(backWall);

  const leftWallGeo = new THREE.PlaneGeometry(ROOM_D, ROOM_H);
  leftWallGeo.rotateY(Math.PI / 2);
  const leftWall = new THREE.Mesh(leftWallGeo, materials.wall);
  leftWall.position.set(-ROOM_W / 2, ROOM_H / 2, 0);
  leftWall.receiveShadow = true;
  roomGroup.add(leftWall);

  const rightWallGeo = new THREE.PlaneGeometry(ROOM_D, ROOM_H);
  rightWallGeo.rotateY(-Math.PI / 2);
  const rightWall = new THREE.Mesh(rightWallGeo, materials.wall);
  rightWall.position.set(ROOM_W / 2, ROOM_H / 2, 0);
  rightWall.receiveShadow = true;
  roomGroup.add(rightWall);

  // White baseboard trim molding
  const trimGeoX = new THREE.BoxGeometry(ROOM_W, 0.22, 0.06);
  const backTrim = new THREE.Mesh(trimGeoX, materials.wallTrim);
  backTrim.position.set(0, 0.11, -ROOM_D / 2 + 0.03);
  roomGroup.add(backTrim);

  const trimGeoZ = new THREE.BoxGeometry(0.06, 0.22, ROOM_D);
  const leftTrim = new THREE.Mesh(trimGeoZ, materials.wallTrim);
  leftTrim.position.set(-ROOM_W / 2 + 0.03, 0.11, 0);
  roomGroup.add(leftTrim);
  const rightTrim = new THREE.Mesh(trimGeoZ, materials.wallTrim);
  rightTrim.position.set(ROOM_W / 2 - 0.03, 0.11, 0);
  roomGroup.add(rightTrim);

  // 3. Sunny Window with warm sunbeams
  const windowGroup = new THREE.Group();
  windowGroup.position.set(-ROOM_W / 2 + 0.05, 4.2, -1.5);
  windowGroup.rotation.y = Math.PI / 2;

  // Window frame
  const winFrameGeo = new THREE.BoxGeometry(3.6, 2.6, 0.1);
  const winFrame = new THREE.Mesh(winFrameGeo, materials.wallTrim);
  windowGroup.add(winFrame);

  // Window glass with warm outdoor sky
  const glassGeo = new THREE.PlaneGeometry(3.3, 2.3);
  const glassMat = new THREE.MeshBasicMaterial({ color: 0xcbeefd });
  const glass = new THREE.Mesh(glassGeo, glassMat);
  glass.position.z = 0.02;
  windowGroup.add(glass);
  roomGroup.add(windowGroup);

  // =========================================================================
  // 4. EL ARENERO (CAT LITTER BOX) WITH SAND & LITTER SCOOP ("PALITA")
  // =========================================================================
  const litterBoxGroup = new THREE.Group();
  litterBoxGroup.position.set(-3.2, 0, 1.8);
  litterBoxGroup.rotation.y = 0.35;

  // Outer Tray Basin
  const trayW = 1.35;
  const trayD = 1.85;
  const trayH = 0.42;

  const trayGeo = new THREE.BoxGeometry(trayW, trayH, trayD);
  const trayMesh = new THREE.Mesh(trayGeo, materials.litterBoxTray);
  trayMesh.position.y = trayH / 2;
  trayMesh.castShadow = true;
  trayMesh.receiveShadow = true;
  litterBoxGroup.add(trayMesh);

  // Inner Tray Cutout Rim (Upper rim shield)
  const rimGeo = new THREE.BoxGeometry(trayW + 0.06, 0.14, trayD + 0.06);
  const rimMesh = new THREE.Mesh(rimGeo, materials.litterBoxRim);
  rimMesh.position.y = trayH + 0.04;
  rimMesh.castShadow = true;
  litterBoxGroup.add(rimMesh);

  // Granulated Litter Sand inside the box
  const sandGeo = new THREE.BoxGeometry(trayW - 0.14, 0.04, trayD - 0.14);
  const sandMesh = new THREE.Mesh(sandGeo, materials.litterSand);
  sandMesh.position.y = trayH - 0.06;
  sandMesh.receiveShadow = true;
  litterBoxGroup.add(sandMesh);

  // Paw prints in the litter sand!
  for (let p = 0; p < 4; p++) {
    const pawDepGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.01, 8);
    const pawDep = new THREE.Mesh(pawDepGeo, materials.wallTrim);
    pawDep.position.set(-0.2 + (p % 2) * 0.35, trayH - 0.05, -0.4 + p * 0.28);
    litterBoxGroup.add(pawDep);
  }

  // Litter Scoop / Shovel ("Palita de arenero") resting on the rim
  const scoopGroup = new THREE.Group();
  scoopGroup.position.set(trayW / 2 + 0.08, 0.26, 0.2);
  scoopGroup.rotation.z = -0.4;

  const scoopHandleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.38, 8);
  const scoopHandle = new THREE.Mesh(scoopHandleGeo, materials.litterScoop);
  scoopHandle.position.y = 0.19;
  scoopGroup.add(scoopHandle);

  const scoopBladeGeo = new THREE.BoxGeometry(0.18, 0.24, 0.04);
  const scoopBlade = new THREE.Mesh(scoopBladeGeo, materials.litterScoop);
  scoopBlade.position.y = -0.08;
  scoopBlade.castShadow = true;
  scoopGroup.add(scoopBlade);
  litterBoxGroup.add(scoopGroup);

  roomGroup.add(litterBoxGroup);

  // =========================================================================
  // 5. CAT TREE / SCRATCHING POST TOWER (RASCADOR MULTINIVEL)
  // =========================================================================
  const catTreeGroup = new THREE.Group();
  catTreeGroup.position.set(3.4, 0, -1.8);
  catTreeGroup.rotation.y = -0.45;

  // Sturdy base plinth
  const treeBaseGeo = new THREE.BoxGeometry(1.5, 0.08, 1.5);
  const treeBase = new THREE.Mesh(treeBaseGeo, materials.catTreeWood);
  treeBase.position.y = 0.04;
  treeBase.castShadow = true;
  treeBase.receiveShadow = true;
  catTreeGroup.add(treeBase);

  // Main sisal rope scratching trunk
  const trunkGeo = new THREE.CylinderGeometry(0.14, 0.15, 1.8, 16);
  const trunk = new THREE.Mesh(trunkGeo, materials.catTreeSisal);
  trunk.position.set(0, 0.94, 0);
  trunk.castShadow = true;
  catTreeGroup.add(trunk);

  // Lower cat condo box with cat-head entrance
  const condoGeo = new THREE.BoxGeometry(0.9, 0.7, 0.9);
  const condo = new THREE.Mesh(condoGeo, materials.catTreeWood);
  condo.position.set(0, 1.25, 0);
  condo.castShadow = true;
  catTreeGroup.add(condo);

  const entranceGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.1, 16);
  entranceGeo.rotateX(Math.PI / 2);
  const entrance = new THREE.Mesh(entranceGeo, materials.blackCat);
  entrance.position.set(0, 1.25, 0.46);
  catTreeGroup.add(entrance);

  // Upper pillar
  const upperTrunkGeo = new THREE.CylinderGeometry(0.11, 0.12, 1.2, 16);
  const upperTrunk = new THREE.Mesh(upperTrunkGeo, materials.catTreeSisal);
  upperTrunk.position.set(0, 2.2, 0);
  upperTrunk.castShadow = true;
  catTreeGroup.add(upperTrunk);

  // Top plush perch bed platform
  const perchGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.12, 20);
  const perch = new THREE.Mesh(perchGeo, materials.catBedCushion);
  perch.position.set(0, 2.85, 0);
  perch.castShadow = true;
  catTreeGroup.add(perch);

  // Dangling plush mouse toy on elastic cord
  const cordGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.65, 6);
  const cord = new THREE.Mesh(cordGeo, materials.wallTrim);
  cord.position.set(0.35, 2.5, 0);
  catTreeGroup.add(cord);

  const mouseBodyGeo = new THREE.SphereGeometry(0.06, 8, 8);
  mouseBodyGeo.scale(1.0, 0.8, 1.4);
  const mouseBody = new THREE.Mesh(mouseBodyGeo, materials.yarnPink);
  mouseBody.position.set(0.35, 2.15, 0);
  mouseBody.castShadow = true;
  catTreeGroup.add(mouseBody);

  roomGroup.add(catTreeGroup);

  // =========================================================================
  // 6. CAT TOYS, CHEESE WEDGES & ACCESSORIES
  // =========================================================================
  // Colorful Yarn Balls with unwound wool ribbons
  const yarn1 = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), materials.yarnPink);
  yarn1.position.set(-2.2, 0.18, -1.2);
  yarn1.castShadow = true;
  roomGroup.add(yarn1);

  const yarn2 = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 12), materials.yarnCyan);
  yarn2.position.set(-1.8, 0.14, -1.5);
  yarn2.castShadow = true;
  roomGroup.add(yarn2);

  // Giant Swiss Cheese Wedge on floor ("Cat Cheese Extreme")
  const giantCheeseShape = new THREE.Shape();
  giantCheeseShape.moveTo(0, 0);
  giantCheeseShape.arc(0, 0, 0.42, 0, Math.PI / 3, false);
  giantCheeseShape.closePath();
  const giantCheeseGeo = new THREE.ExtrudeGeometry(giantCheeseShape, { depth: 0.24, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02 });
  giantCheeseGeo.rotateX(Math.PI / 2);
  const giantCheese = new THREE.Mesh(giantCheeseGeo, materials.cheese);
  giantCheese.position.set(2.4, 0.02, 2.0);
  giantCheese.rotation.y = 1.1;
  giantCheese.castShadow = true;
  roomGroup.add(giantCheese);

  // Dual Ceramic Bowls: Fresh Milk & Tuna Food
  const bowlGroup = new THREE.Group();
  bowlGroup.position.set(2.5, 0, 0.4);

  const bowlGeo = new THREE.CylinderGeometry(0.24, 0.16, 0.12, 16);
  const milkBowl = new THREE.Mesh(bowlGeo, materials.ceramicBowl);
  milkBowl.position.set(-0.28, 0.06, 0);
  milkBowl.castShadow = true;
  bowlGroup.add(milkBowl);

  const milkFill = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.02, 16), materials.milkLiquid);
  milkFill.position.set(-0.28, 0.10, 0);
  bowlGroup.add(milkFill);

  const foodBowl = new THREE.Mesh(bowlGeo, materials.ceramicBowl);
  foodBowl.position.set(0.28, 0.06, 0);
  foodBowl.castShadow = true;
  bowlGroup.add(foodBowl);

  const foodFill = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.02, 16), materials.foodTuna);
  foodFill.position.set(0.28, 0.10, 0);
  bowlGroup.add(foodFill);
  roomGroup.add(bowlGroup);

  // Cozy Donut Cat Bed in corner
  const catBedGeo = new THREE.TorusGeometry(0.65, 0.22, 12, 24);
  catBedGeo.rotateX(Math.PI / 2);
  const catBed = new THREE.Mesh(catBedGeo, materials.catBedCushion);
  catBed.position.set(-3.5, 0.18, -3.2);
  catBed.castShadow = true;
  roomGroup.add(catBed);

  const innerCushionGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.14, 16);
  const innerCushion = new THREE.Mesh(innerCushionGeo, materials.catTreeSisal);
  innerCushion.position.set(-3.5, 0.07, -3.2);
  roomGroup.add(innerCushion);

  // Wall-mounted cat climbing steps & bridges
  for (let s = 0; s < 3; s++) {
    const stepGeo = new THREE.BoxGeometry(0.7, 0.06, 0.35);
    const step = new THREE.Mesh(stepGeo, materials.catTreeWood);
    step.position.set(-1.8 + s * 1.5, 1.8 + s * 0.7, -ROOM_D / 2 + 0.18);
    step.castShadow = true;
    roomGroup.add(step);
  }

  scene.add(roomGroup);
  return roomGroup;
}

// =============================================================================
// 4. Scratch Attack Animation VFX ("rasguñe" el gato)
// =============================================================================

export function spawnCatScratchVFX(scene, targetPos, attackerPos) {
  const vfxGroup = new THREE.Group();
  vfxGroup.position.copy(targetPos);
  vfxGroup.position.y += 0.22;

  // Heading from attacker to target
  const dir = new THREE.Vector3().subVectors(targetPos, attackerPos).normalize();
  const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize();

  // 3 Curved Glowing Claw Marks / Slash Trails
  const slashMat = new THREE.MeshBasicMaterial({
    color: 0xff3b30,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95
  });

  const slashMeshes = [];
  for (let c = -1; c <= 1; c++) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(c * 0.05 - 0.12, 0.14, 0),
      new THREE.Vector3(c * 0.05, 0.0, 0.04),
      new THREE.Vector3(c * 0.05 + 0.14, -0.16, 0)
    ]);
    const slashGeo = new THREE.TubeGeometry(curve, 12, 0.012, 6, false);
    const slashMesh = new THREE.Mesh(slashGeo, slashMat);
    slashMesh.rotation.y = Math.atan2(dir.x, dir.z);
    vfxGroup.add(slashMesh);
    slashMeshes.push(slashMesh);
  }

  // Fur puffs & scratch spark particles
  const sparkGeo = new THREE.DodecahedronGeometry(0.018, 0);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffd166 });
  const sparks = [];
  for (let i = 0; i < 18; i++) {
    const sp = new THREE.Mesh(sparkGeo, sparkMat);
    sp.position.set(
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2
    );
    sp.userData.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 1.8,
      Math.random() * 2.2 + 0.8,
      (Math.random() - 0.5) * 1.8
    );
    vfxGroup.add(sp);
    sparks.push(sp);
  }

  scene.add(vfxGroup);

  // Play procedural Web Audio cat hiss & scratch swipe!
  playCatAudio('scratch');

  // Animate and auto-remove
  let elapsed = 0;
  const vfxInterval = setInterval(() => {
    elapsed += 0.03;
    const progress = elapsed / 0.55;

    // Fade and scale claw slashes
    slashMat.opacity = Math.max(0, 1.0 - progress * 1.8);
    for (const m of slashMeshes) {
      m.scale.multiplyScalar(1.03);
    }

    // Disperse sparks
    for (const sp of sparks) {
      sp.position.addScaledVector(sp.userData.velocity, 0.03);
      sp.userData.velocity.y -= 0.08; // Gravity
      sp.scale.multiplyScalar(0.92);
    }

    if (progress >= 1.0) {
      clearInterval(vfxInterval);
      scene.remove(vfxGroup);
      slashGeoDispose(vfxGroup);
    }
  }, 30);
}

function slashGeoDispose(obj) {
  obj.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
  });
}

// =============================================================================
// 5. Procedural Web Audio Sound Effects (Meow, Hiss, Scratch Swipe)
// =============================================================================

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playCatAudio(type = 'meow') {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  if (type === 'scratch') {
    // 1. Sharp white-noise claw slash whoosh
    const bufferSize = ctx.sampleRate * 0.28;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Highpass filter for razor-sharp claw scratch sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(3800, now + 0.15);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.28);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);

    // 2. Comical cat screech / startled yowl
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.exponentialRampToValueAtTime(1250, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.32);

    oscGain.gain.setValueAtTime(0.25, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  } else if (type === 'meow') {
    // Cute cat meow
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';

    // Meow frequency inflection (starts low, rises, smoothly resolves)
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.linearRampToValueAtTime(620, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.4);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.42);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.44);
  }
}
