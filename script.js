/**
 * AMDAUL HOQUE — AAA GAME UI RESUME & 3D CAREER QUEST JAVASCRIPT
 * Real-time Three.js particle vortex, audio synthesizer, and HUD navigation
 */

// ==========================================
// 1. PROCEDURAL SOUND SYNTHESIZER (WEB AUDIO API)
// ==========================================
class CyberSound {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
  }

  playBeep(freq = 880, duration = 0.08, type = 'sine') {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playWarp() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }
}

const cyberSound = new CyberSound();

// ==========================================
// 2. THREE.JS 3D PARTICLE & PEDESTAL BACKGROUND
// ==========================================
let scene, camera, renderer, particleField, ringsGroup;

function initThreeBackground() {
  const container = document.getElementById('three-canvas-wrap');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 600;
  const height = container.clientHeight || 600;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 1.5, 8.5);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Pedestal Glowing Rings in 3D Space
  ringsGroup = new THREE.Group();
  for (let i = 1; i <= 4; i++) {
    const ringGeo = new THREE.RingGeometry(i * 0.9, i * 0.9 + 0.04, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0x00f2fe : 0x0088ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5 - i * 0.08
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -1.6 + i * 0.02;
    ringsGroup.add(ringMesh);
  }
  scene.add(ringsGroup);

  // Ambient Particles
  const particleCount = 200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

    colors[i * 3] = 0.0;
    colors[i * 3 + 1] = 0.95;
    colors[i * 3 + 2] = 1.0;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.06,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });

  particleField = new THREE.Points(geometry, material);
  scene.add(particleField);

  // Resize Handler
  window.addEventListener('resize', () => {
    if (!container || !camera || !renderer) return;
    const newW = container.clientWidth;
    const newH = container.clientHeight;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  });

  animateThree();
}

function animateThree() {
  requestAnimationFrame(animateThree);

  const time = performance.now() * 0.001;

  if (ringsGroup) {
    ringsGroup.rotation.y = time * 0.25;
  }

  if (particleField) {
    particleField.rotation.y = time * 0.05;
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}

// ==========================================
// 3. NAVIGATION & SCROLL INTERACTION
// ==========================================
function scrollToDashboard() {
  cyberSound.init();
  cyberSound.playWarp();
  const target = document.getElementById('dashboard-grid');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToPanel(panelId) {
  cyberSound.init();
  cyberSound.playBeep(920, 0.1);
  const target = document.getElementById(panelId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Hover Sound FX on Interactive Elements
document.addEventListener('DOMContentLoaded', () => {
  initThreeBackground();

  // Attach sound on buttons and tiles
  const interactiveElems = document.querySelectorAll(
    '.hero-enter-btn, .hologram-node, .skill-tile, .mission-item, .view-proj-btn, .c-act-btn, .sidebar-icon-btn, .lang-box'
  );

  interactiveElems.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cyberSound.init();
      cyberSound.playBeep(640, 0.04, 'triangle');
    });

    el.addEventListener('click', () => {
      cyberSound.init();
      cyberSound.playBeep(1200, 0.08, 'sine');
    });
  });

  // ScrollSpy for Left Sidebar Icons
  window.addEventListener('scroll', () => {
    const panels = ['hero-stage', 'panel-experience', 'panel-skills', 'panel-automation', 'panel-contact'];
    const scrollPos = window.scrollY + 300;

    panels.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.sidebar-icon-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-target') === id);
          });
        }
      }
    });
  });
});
