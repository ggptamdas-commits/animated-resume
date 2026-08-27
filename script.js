/**
 * AMDAUL HOQUE — AAA 3D GAME UI & CAREER QUEST JAVASCRIPT ENGINE
 * Powered by Three.js & Web Audio API
 */

// ==========================================
// 1. WEB AUDIO API SOUND SYNTHESIZER
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playHover() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(580, this.ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playWarp() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {}
  }

  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.22);
      });
    } catch (e) {}
  }
}

const sfx = new SoundFX();

// ==========================================
// 2. THREE.JS 3D SCENE & AVATAR HUB
// ==========================================
let scene, camera, renderer, characterGroup, portalsGroup;
let portalMeshes = [];
let mouseX = 0, mouseY = 0;
let targetCameraPos = { x: 0, y: 1.5, z: 7.5 };
let targetLookAt = { x: 0, y: 1.2, z: 0 };
let currentLookAt = { x: 0, y: 1.2, z: 0 };
let raycaster, mouseVec;
let hoveredPortal = null;

function init3DWorld() {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030712, 0.045);

  // Camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, 14);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);

  // Raycaster & Mouse
  raycaster = new THREE.Raycaster();
  mouseVec = new THREE.Vector2();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x0e244d, 2.5);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0x00f2fe, 3.5);
  mainLight.position.set(5, 10, 7);
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0x0088ff, 3.0);
  rimLight.position.set(-6, 8, -5);
  scene.add(rimLight);

  const bottomGlow = new THREE.PointLight(0x00f2fe, 4, 15);
  bottomGlow.position.set(0, 0.2, 0);
  scene.add(bottomGlow);

  const goldAccent = new THREE.PointLight(0xffb800, 2, 10);
  goldAccent.position.set(0, 2.5, -2);
  scene.add(goldAccent);

  // Build Environment
  createCyberPlatform();
  create3DAvatar();
  create3DPortals();
  createParticleVortex();

  // Event Listeners
  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);
  container.addEventListener('click', onCanvasClick);

  animate();
}

// CYBER PLATFORM & FLOOR GRID
function createCyberPlatform() {
  const platformGroup = new THREE.Group();

  // Outer Neon Rings
  for (let i = 1; i <= 4; i++) {
    const ringGeo = new THREE.RingGeometry(i * 1.1, i * 1.1 + 0.05, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x00f2fe : 0x0088ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.65 - i * 0.1
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.02 * i;
    platformGroup.add(ringMesh);
  }

  // Rotating Core Pedestal Disc
  const discGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.25, 48);
  const discMat = new THREE.MeshStandardMaterial({
    color: 0x0a1936,
    metalness: 0.85,
    roughness: 0.2,
    emissive: 0x002b55,
    emissiveIntensity: 0.4
  });
  const discMesh = new THREE.Mesh(discGeo, discMat);
  discMesh.position.y = -0.12;
  platformGroup.add(discMesh);

  // Floor Grid
  const gridHelper = new THREE.GridHelper(60, 40, 0x00f2fe, 0x071b3b);
  gridHelper.position.y = -0.26;
  platformGroup.add(gridHelper);

  scene.add(platformGroup);
}

// 3D AVATAR (STYLIZED CYBERNETIC CHARACTER MODEL)
function create3DAvatar() {
  characterGroup = new THREE.Group();

  // Materials
  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xc68b59,
    roughness: 0.6,
    metalness: 0.1
  });

  const hairMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.8
  });

  const suitMat = new THREE.MeshStandardMaterial({
    color: 0x0b1329,
    roughness: 0.4,
    metalness: 0.3
  });

  const shirtMat = new THREE.MeshStandardMaterial({
    color: 0x020617,
    roughness: 0.5
  });

  const neonAccentMat = new THREE.MeshBasicMaterial({
    color: 0x00f2fe
  });

  const shoesMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.3
  });

  // Body Parts
  // Torso / Smart Casual Shirt
  const torsoGeo = new THREE.CylinderGeometry(0.38, 0.32, 0.95, 24);
  const torso = new THREE.Mesh(torsoGeo, suitMat);
  torso.position.y = 1.45;
  characterGroup.add(torso);

  // Inner Shirt / V-Neck Line
  const vLineGeo = new THREE.PlaneGeometry(0.12, 0.4);
  const vLine = new THREE.Mesh(vLineGeo, neonAccentMat);
  vLine.position.set(0, 1.65, 0.38);
  characterGroup.add(vLine);

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.22, 16);
  const neck = new THREE.Mesh(neckGeo, skinMat);
  neck.position.y = 1.95;
  characterGroup.add(neck);

  // Head
  const headGeo = new THREE.SphereGeometry(0.24, 24, 24);
  headGeo.scale(1, 1.15, 0.95);
  const head = new THREE.Mesh(headGeo, skinMat);
  head.position.y = 2.18;
  characterGroup.add(head);

  // Hair
  const hairGeo = new THREE.SphereGeometry(0.26, 20, 20);
  hairGeo.scale(1.02, 0.8, 1.05);
  const hair = new THREE.Mesh(hairGeo, hairMat);
  hair.position.set(0, 2.32, -0.02);
  characterGroup.add(hair);

  // Stylized Eyewear / Holographic HUD Visor Earpiece
  const visorGeo = new THREE.TorusGeometry(0.16, 0.015, 12, 24, Math.PI);
  const visor = new THREE.Mesh(visorGeo, neonAccentMat);
  visor.position.set(0, 2.18, 0.18);
  visor.rotation.x = Math.PI / 2;
  characterGroup.add(visor);

  // Legs / Trousers
  const legLGeo = new THREE.CylinderGeometry(0.14, 0.11, 0.95, 16);
  const legL = new THREE.Mesh(legLGeo, suitMat);
  legL.position.set(-0.18, 0.55, 0);
  characterGroup.add(legL);

  const legR = new THREE.Mesh(legLGeo, suitMat);
  legR.position.set(0.18, 0.55, 0);
  characterGroup.add(legR);

  // Shoes
  const shoeGeo = new THREE.BoxGeometry(0.16, 0.12, 0.32);
  const shoeL = new THREE.Mesh(shoeGeo, shoesMat);
  shoeL.position.set(-0.18, 0.06, 0.06);
  characterGroup.add(shoeL);

  const shoeR = new THREE.Mesh(shoeGeo, shoesMat);
  shoeR.position.set(0.18, 0.06, 0.06);
  characterGroup.add(shoeR);

  // Arms
  const armLGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.85, 16);
  const armL = new THREE.Mesh(armLGeo, suitMat);
  armL.position.set(-0.48, 1.35, 0);
  armL.rotation.z = 0.08;
  characterGroup.add(armL);

  const armR = new THREE.Mesh(armLGeo, suitMat);
  armR.position.set(0.48, 1.35, 0);
  armR.rotation.z = -0.08;
  characterGroup.add(armR);

  // Holographic Aura Rings around Avatar
  const auraGeo = new THREE.TorusGeometry(0.7, 0.015, 16, 48);
  const auraMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.7 });
  const auraMesh = new THREE.Mesh(auraGeo, auraMat);
  auraMesh.rotation.x = Math.PI / 2;
  auraMesh.position.y = 1.3;
  characterGroup.add(auraMesh);

  scene.add(characterGroup);
}

// 6 FLOATING 3D HOLOGRAM PORTALS
function create3DPortals() {
  portalsGroup = new THREE.Group();

  const portalConfigs = [
    { id: 1, name: '01 EXPERIENCE HQ', target: 'zone-experience', x: -2.8, y: 2.3, z: 0.8, color: 0x00f2fe, icon: 'shield' },
    { id: 2, name: '02 SKILL LAB', target: 'zone-skills', x: -3.5, y: 1.2, z: -1.2, color: 0x0088ff, icon: 'brain' },
    { id: 3, name: '03 AUTOMATION GARAGE', target: 'zone-automation', x: 2.8, y: 2.4, z: 0.8, color: 0x00f2fe, icon: 'robot' },
    { id: 4, name: '04 LANGUAGE STATION', target: 'zone-languages', x: 3.6, y: 1.2, z: -1.2, color: 0x38ef7d, icon: 'globe' },
    { id: 5, name: '05 EDUCATION ARCHIVE', target: 'zone-education', x: -1.8, y: 0.4, z: 2.2, color: 0xffb800, icon: 'archive' },
    { id: 6, name: '06 CONTACT TERMINAL', target: 'zone-contact', x: 1.8, y: 0.4, z: 2.2, color: 0x00f2fe, icon: 'comms' }
  ];

  portalConfigs.forEach(cfg => {
    const pGroup = new THREE.Group();
    pGroup.position.set(cfg.x, cfg.y, cfg.z);
    pGroup.userData = cfg;

    // Glowing Hologram Disc
    const geo = new THREE.CylinderGeometry(0.45, 0.45, 0.08, 32);
    const mat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      emissive: cfg.color,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.85,
      metalness: 0.5,
      roughness: 0.2
    });
    const disc = new THREE.Mesh(geo, mat);
    pGroup.add(disc);

    // Orbiting Rings
    const ringGeo = new THREE.TorusGeometry(0.58, 0.02, 12, 36);
    const ringMat = new THREE.MeshBasicMaterial({ color: cfg.color, transparent: true, opacity: 0.8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    pGroup.add(ring);

    // Floating Polyhedron in center
    const innerGeo = new THREE.OctahedronGeometry(0.22, 0);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    inner.position.y = 0.25;
    pGroup.add(inner);

    portalsGroup.add(pGroup);
    portalMeshes.push(pGroup);
  });

  scene.add(portalsGroup);
}

// PARTICLE VORTEX
let particleSystem;
function createParticleVortex() {
  const particleCount = 450;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = 2 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const y = -1 + Math.random() * 8;

    positions[i * 3] = radius * Math.cos(theta);
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = radius * Math.sin(theta);

    // Cyan to blue to gold particles
    const cChoice = Math.random();
    if (cChoice > 0.7) {
      colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.72; colors[i * 3 + 2] = 0.0; // Gold
    } else if (cChoice > 0.3) {
      colors[i * 3] = 0.0; colors[i * 3 + 1] = 0.95; colors[i * 3 + 2] = 1.0; // Cyan
    } else {
      colors[i * 3] = 0.0; colors[i * 3 + 1] = 0.53; colors[i * 3 + 2] = 1.0; // Blue
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);
}

// 3D ANIMATION LOOP
let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const time = clock.getElapsedTime();

  // Character Breathing & Subtle Idle Animation
  if (characterGroup) {
    characterGroup.position.y = Math.sin(time * 2) * 0.03;
    // Follow mouse slightly
    characterGroup.rotation.y = THREE.MathUtils.lerp(characterGroup.rotation.y, mouseX * 0.35, 0.05);
  }

  // Floating & Rotating 3D Portals
  if (portalsGroup) {
    portalMeshes.forEach((p, idx) => {
      p.position.y += Math.sin(time * 2.5 + idx) * 0.002;
      p.rotation.y += 0.015;
      if (p.children[1]) p.children[1].rotation.z += 0.02;
      if (p.children[2]) p.children[2].rotation.x += 0.02;
    });
  }

  // Particle Rotation
  if (particleSystem) {
    particleSystem.rotation.y = time * 0.04;
  }

  // Raycasting for 3D Portal Hover
  if (raycaster && mouseVec && portalsGroup) {
    raycaster.setFromCamera(mouseVec, camera);
    const intersects = raycaster.intersectObjects(portalsGroup.children, true);

    if (intersects.length > 0) {
      let topParent = intersects[0].object;
      while (topParent.parent && topParent.parent !== portalsGroup) {
        topParent = topParent.parent;
      }
      if (hoveredPortal !== topParent) {
        hoveredPortal = topParent;
        document.body.style.cursor = 'pointer';
        sfx.playHover();
      }
    } else {
      if (hoveredPortal) {
        hoveredPortal = null;
        document.body.style.cursor = 'default';
      }
    }
  }

  // Smooth Camera Lerp
  camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCameraPos.x + mouseX * 0.4, 0.04);
  camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCameraPos.y - mouseY * 0.3, 0.04);
  camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCameraPos.z, 0.04);

  currentLookAt.x = THREE.MathUtils.lerp(currentLookAt.x, targetLookAt.x, 0.05);
  currentLookAt.y = THREE.MathUtils.lerp(currentLookAt.y, targetLookAt.y, 0.05);
  currentLookAt.z = THREE.MathUtils.lerp(currentLookAt.z, targetLookAt.z, 0.05);

  camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);

  renderer.render(scene, camera);
}

function onWindowResize() {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(e) {
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = (e.clientY / window.innerHeight) * 2 - 1;

  mouseVec.x = mouseX;
  mouseVec.y = -mouseY;
}

function onCanvasClick(e) {
  if (hoveredPortal && hoveredPortal.userData && hoveredPortal.userData.target) {
    sfx.playClick();
    sfx.playWarp();
    navigateToZone(hoveredPortal.userData.target);
  }
}

// ==========================================
// 3. BOOT SEQUENCE & INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  init3DWorld();
  runBootSequence();
  initUIEvents();
});

function runBootSequence() {
  const bootLog = document.getElementById('boot-log');
  const progressBar = document.getElementById('boot-progress-bar');
  const statusText = document.getElementById('boot-status-text');
  const startBtn = document.getElementById('start-btn');

  const logs = [
    "> INITIALIZING CAREER OS v3.4.0...",
    "> SCANNING BIOMETRIC SIGNATURE: AMDAUL HOQUE...",
    "> LOADING 3D VOLUMETRIC CAREER WORLD...",
    "> DEPLOYING MISSIONS & RESTAURANT WORKFLOWS...",
    "> SYNCING POLYGLOT COMMUNICATIONS (5 LANGUAGES)...",
    "> STATUS: 100% OPTIMAL. ALL SYSTEMS READY."
  ];

  let progress = 0;
  let logIdx = 0;

  const interval = setInterval(() => {
    progress += 4;
    if (progress > 100) progress = 100;

    if (progressBar) progressBar.style.width = progress + '%';
    if (statusText) statusText.textContent = `INITIALIZING CAREER SYSTEM... [${progress}%]`;

    if (progress % 20 === 0 && logIdx < logs.length) {
      if (bootLog) bootLog.textContent = logs[logIdx];
      logIdx++;
    }

    if (progress >= 100) {
      clearInterval(interval);
      if (statusText) statusText.textContent = "PLAYER FOUND: AMDAUL HOQUE [ONLINE]";
      if (startBtn) {
        startBtn.classList.remove('hidden');
        sfx.playLevelUp();
      }
    }
  }, 40);

  // Press Enter to start
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      enterWorld();
    }
  });

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      enterWorld();
    });
  }
}

function enterWorld() {
  const bootScreen = document.getElementById('boot-screen');
  if (bootScreen && !bootScreen.classList.contains('fade-out')) {
    sfx.init();
    sfx.playWarp();
    bootScreen.classList.add('fade-out');
    targetCameraPos = { x: 0, y: 1.4, z: 6.2 };
    showToast("WELCOME TO CAREER QUEST", "Amdaul Hoque's Interactive 3D World");
  }
}

// ==========================================
// 4. UI & INTERACTION LOGIC
// ==========================================
function initUIEvents() {
  // Nav Pills
  document.querySelectorAll('.nav-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playClick();
      const target = btn.getAttribute('data-target');
      if (target === 'hero-stage') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        targetCameraPos = { x: 0, y: 1.4, z: 6.2 };
        targetLookAt = { x: 0, y: 1.2, z: 0 };
      } else {
        navigateToZone(target);
      }
    });
  });

  // Enter Career Button
  const enterBtn = document.getElementById('enter-career-btn');
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      sfx.playClick();
      navigateToZone('zone-experience');
    });
  }

  // Audio Toggle
  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      sfx.init();
      sfx.enabled = !sfx.enabled;
      audioBtn.innerHTML = sfx.enabled ? '<i class="fa-solid fa-volume-high"></i>' : '<i class="fa-solid fa-volume-xmark"></i>';
      sfx.playClick();
      showToast(sfx.enabled ? "AUDIO ENABLED" : "AUDIO MUTED", "Sound effects updated");
    });
  }

  // RPG Stats Toggle
  const statsBtn = document.getElementById('stats-toggle');
  const quickStatsBtn = document.getElementById('quick-stats-btn');
  if (statsBtn) statsBtn.addEventListener('click', openStatsModal);
  if (quickStatsBtn) quickStatsBtn.addEventListener('click', openStatsModal);

  // Camera Reset
  const camResetBtn = document.getElementById('camera-reset');
  if (camResetBtn) {
    camResetBtn.addEventListener('click', () => {
      sfx.playClick();
      targetCameraPos = { x: 0, y: 1.4, z: 6.2 };
      targetLookAt = { x: 0, y: 1.2, z: 0 };
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Portal badges click handler
  document.querySelectorAll('.portal-badge').forEach(badge => {
    badge.addEventListener('click', () => {
      const zoneId = badge.getAttribute('data-zone');
      sfx.playClick();
      sfx.playWarp();
      navigateToZone(zoneId);
    });
  });

  // Keyboard Shortcuts (1-6 for Zones, ESC for modal)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeStatsModal();
      closeGenericModal();
    }
    const keyMap = {
      '1': 'zone-experience',
      '2': 'zone-skills',
      '3': 'zone-automation',
      '4': 'zone-languages',
      '5': 'zone-education',
      '6': 'zone-contact'
    };
    if (keyMap[e.key]) {
      navigateToZone(keyMap[e.key]);
    }
  });

  // ScrollSpy for Nav Pills
  window.addEventListener('scroll', updateNavOnScroll);
}

function navigateToZone(zoneId) {
  const el = document.getElementById(zoneId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });

    // Move 3D Camera angle subtly depending on zone
    const cameraMap = {
      'zone-experience': { x: -1.5, y: 1.8, z: 5.5, lookY: 1.4 },
      'zone-skills': { x: -2.0, y: 1.2, z: 5.8, lookY: 1.0 },
      'zone-automation': { x: 1.5, y: 1.8, z: 5.5, lookY: 1.4 },
      'zone-languages': { x: 2.0, y: 1.2, z: 5.8, lookY: 1.0 },
      'zone-education': { x: -0.8, y: 0.8, z: 5.2, lookY: 0.6 },
      'zone-contact': { x: 0.8, y: 0.8, z: 5.2, lookY: 0.6 }
    };

    if (cameraMap[zoneId]) {
      targetCameraPos.x = cameraMap[zoneId].x;
      targetCameraPos.y = cameraMap[zoneId].y;
      targetCameraPos.z = cameraMap[zoneId].z;
      targetLookAt.y = cameraMap[zoneId].lookY;
    }
  }
}

function updateNavOnScroll() {
  const sections = document.querySelectorAll('.zone-section');
  const scrollPos = window.scrollY + 200;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll('.nav-pill').forEach(pill => {
        pill.classList.toggle('active', pill.getAttribute('data-target') === id);
      });
    }
  });

  if (window.scrollY < 300) {
    document.querySelectorAll('.nav-pill').forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-target') === 'hero-stage');
    });
  }
}

// ==========================================
// 5. MODAL SYSTEM & DETAIL POPUPS
// ==========================================
const missionData = {
  1: {
    title: "MISSION 01 // RESTAURANT OPERATIONS",
    xp: "+250 XP",
    body: `
      <p><strong>Core Objective:</strong> Manage daily restaurant operations, supervise front-of-house hospitality, enforce stringent health and hygiene standards, and guarantee peak-hour customer satisfaction.</p>
      <div style="margin: 15px 0; padding: 12px; background: rgba(0,242,254,0.1); border-left: 3px solid #00f2fe; border-radius: 4px;">
        <i class="fa-solid fa-check"></i> <strong>Achievements:</strong> Boosted table turnaround efficiency by 22% during Ramadan and weekend peak hours.
      </div>
      <p><strong>Location:</strong> Khamer Restaurant, Jizan, Saudi Arabia</p>
    `
  },
  2: {
    title: "MISSION 02 // TEAM LEADERSHIP & VERSATILITY",
    xp: "+400 XP",
    body: `
      <p><strong>Core Objective:</strong> Lead, motivate, and mentor a multicultural workforce. Act as operational backbone by stepping into Cashier, Warehouse Manager, or Head Server responsibilities whenever needed.</p>
      <div style="margin: 15px 0; padding: 12px; background: rgba(0,242,254,0.1); border-left: 3px solid #00f2fe; border-radius: 4px;">
        <i class="fa-solid fa-check"></i> <strong>Key Impact:</strong> Maintained zero staff turnover in core shifts through supportive leadership and clear multilingual training.
      </div>
    `
  },
  3: {
    title: "MISSION 03 // WAREHOUSE SYSTEM DEPLOYMENT",
    xp: "+500 XP",
    body: `
      <p><strong>Core Objective:</strong> Conceived, coded, and deployed a specialized warehouse management web application (<strong>khamer.vercel.app</strong>) to modernize stock tracking, purchase orders, and supplier communication.</p>
      <div style="margin: 15px 0; padding: 12px; background: rgba(255,184,0,0.15); border-left: 3px solid #ffb800; border-radius: 4px;">
        <i class="fa-solid fa-trophy"></i> <strong>Special Milestone:</strong> Cut inventory discrepancy to under 1.5% and eliminated food expiration waste.
      </div>
    `
  },
  4: {
    title: "MISSION 04 // OPERATIONAL AUTOMATION",
    xp: "+450 XP",
    body: `
      <p><strong>Core Objective:</strong> Engineered automated workflows integrating n8n, Groq LLM API, WhatsApp API, and cloud databases for real-time kitchen alerts, automated order notifications, and digital menu syncing.</p>
      <div style="margin: 15px 0; padding: 12px; background: rgba(0,242,254,0.1); border-left: 3px solid #00f2fe; border-radius: 4px;">
        <i class="fa-solid fa-bolt"></i> <strong>Automation Stack:</strong> n8n, Groq API, Evolution API, Meta Graph API, Webhooks.
      </div>
    `
  },
  5: {
    title: "MISSION 05 // TECHNICAL & ELECTRICAL TROUBLESHOOTING",
    xp: "+350 XP",
    body: `
      <p><strong>Core Objective:</strong> Direct on-site electrical diagnostics, digital refrigerator thermostat installations, water pressure switch mechanics, induction cooker maintenance, and local network wiring.</p>
      <div style="margin: 15px 0; padding: 12px; background: rgba(0,242,254,0.1); border-left: 3px solid #00f2fe; border-radius: 4px;">
        <i class="fa-solid fa-wrench"></i> <strong>Reliability:</strong> 100% on-site hardware uptime with rapid response to urgent kitchen equipment issues.
      </div>
    `
  }
};

function triggerMissionModal(id) {
  sfx.playClick();
  const data = missionData[id];
  if (!data) return;

  const modal = document.getElementById('generic-modal');
  const title = document.getElementById('generic-modal-title');
  const body = document.getElementById('generic-modal-body');

  if (modal && title && body) {
    title.innerHTML = `<i class="fa-solid fa-shield-halved"></i> ${data.title}`;
    body.innerHTML = `
      <div style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
        <span class="hud-chip">MISSION DETAILS</span>
        <span style="font-family: var(--font-display); color: var(--gold-bright); font-weight: 800;">${data.xp}</span>
      </div>
      ${data.body}
      <button onclick="closeGenericModal()" class="cyber-btn primary-glow" style="margin-top: 20px; width: 100%;">
        <i class="fa-solid fa-check"></i> ACKNOWLEDGE & CLOSE
      </button>
    `;
    modal.classList.remove('hidden');
    showToast("MISSION BRIEFING ACCESSED", data.xp);
  }
}

function openSkillModal(titleText, ratingText, details) {
  sfx.playClick();
  const modal = document.getElementById('generic-modal');
  const title = document.getElementById('generic-modal-title');
  const body = document.getElementById('generic-modal-body');

  if (modal && title && body) {
    title.innerHTML = `<i class="fa-solid fa-microchip"></i> ${titleText}`;
    body.innerHTML = `
      <div style="margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
        <span class="hud-chip">ABILITY METRICS</span>
        <span style="font-family: var(--font-display); color: var(--cyan-bright); font-weight: 800;">${ratingText}</span>
      </div>
      <p style="font-size: 1rem; line-height: 1.6; color: #cbd5e1; margin-bottom: 18px;">${details}</p>
      <div style="padding: 12px; background: rgba(0,242,254,0.08); border-radius: 8px; border: 1px solid rgba(0,242,254,0.2);">
        <i class="fa-solid fa-unlock-keyhole" style="color: #00f2fe;"></i> <strong>Status:</strong> Active in production environment.
      </div>
      <button onclick="closeGenericModal()" class="cyber-btn primary-glow" style="margin-top: 20px; width: 100%;">
        <i class="fa-solid fa-check"></i> CLOSE ABILITY VIEW
      </button>
    `;
    modal.classList.remove('hidden');
  }
}

function openCollabModal() {
  sfx.playClick();
  const modal = document.getElementById('generic-modal');
  const title = document.getElementById('generic-modal-title');
  const body = document.getElementById('generic-modal-body');

  if (modal && title && body) {
    title.innerHTML = `<i class="fa-solid fa-handshake"></i> LET'S WORK TOGETHER`;
    body.innerHTML = `
      <p style="font-size: 1rem; line-height: 1.6; color: #cbd5e1; margin-bottom: 18px;">
        Interested in hiring Amdaul Hoque for <strong>Restaurant Management</strong>, <strong>AI Workflow Automation</strong>, or <strong>Custom Web Applications</strong>?
      </p>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
        <a href="mailto:ahameddruboo@gmail.com?subject=Job%20Offer%20or%20Collaboration" class="terminal-btn primary-glow">
          <i class="fa-solid fa-envelope"></i> Send Email to ahameddruboo@gmail.com
        </a>
        <a href="tel:+966544575530" class="terminal-btn secondary-glass">
          <i class="fa-solid fa-phone"></i> Call / WhatsApp +966 544 575 530
        </a>
      </div>
      <button onclick="closeGenericModal()" class="cyber-btn secondary-glass" style="width: 100%;">
        RETURN TO TERMINAL
      </button>
    `;
    modal.classList.remove('hidden');
  }
}

function openStatsModal() {
  sfx.playClick();
  const modal = document.getElementById('stats-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeStatsModal() {
  const modal = document.getElementById('stats-modal');
  if (modal) modal.classList.add('hidden');
}

function closeGenericModal() {
  const modal = document.getElementById('generic-modal');
  if (modal) modal.classList.add('hidden');
}

function showToast(title, sub) {
  const toast = document.getElementById('game-toast');
  const tTitle = document.getElementById('toast-title');
  const tSub = document.getElementById('toast-sub');

  if (toast && tTitle && tSub) {
    tTitle.textContent = title;
    tSub.textContent = sub;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }
}