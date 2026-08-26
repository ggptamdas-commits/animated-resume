/* ==========================================================================
   THE VIRTUAL RESTAURANT 2D RPG GAME ENGINE & RESUME CONTROLLER
   Candidate: Amdadul Hoque (মোঃ এমদাদুল হক)
   ========================================================================== */

/* 1. SYNTHESIZED WEB AUDIO ENGINE */
class GameAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) this.ctx = new AudioContext();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.08) {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playStep() {
        this.playTone(180 + Math.random() * 30, 'triangle', 0.04, 0.03);
    }

    playBleep() {
        this.playTone(520 + Math.random() * 80, 'sine', 0.03, 0.04);
    }

    playInteract() {
        this.playTone(659.25, 'triangle', 0.08, 0.1);
        setTimeout(() => this.playTone(880, 'triangle', 0.1, 0.1), 60);
    }

    playBell() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [1760, 3520, 5280].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.12 / (idx + 1), now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 1.2);
        });
    }

    playUnlock() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, High C
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);
            gain.gain.setValueAtTime(0.1, now + idx * 0.07);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.25);
        });
    }

    playShaker() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const bufferSize = this.ctx.sampleRate * 0.08;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2400;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        const label = document.getElementById('sound-label');
        const icon = document.getElementById('sound-icon');
        if (label) label.innerText = this.isMuted ? 'OFF' : 'ON';
        if (icon) icon.className = this.isMuted ? 'fa-solid fa-volume-xmark text-muted' : 'fa-solid fa-volume-high text-gold';
        if (!this.isMuted) this.playTone(440, 'sine', 0.06);
    }
}

const gameAudio = new GameAudioEngine();

/* 2. GAME STATE & QUEST TRACKER */
const gameState = {
    xp: 50,
    level: 1,
    visitedStations: new Set(['host']),
    stations: [
        { id: 'host', name: 'Reception & Host Stand', desc: 'Meet Amdadul Hoque and discover his career ethos & bilingual leadership.', icon: '🛎️' },
        { id: 'dining', name: 'Khamer VIP Dining Floor', desc: 'Interact with guests to review 2024–Present supervisor KPIs (+25% turnaround, 15+ staff).', icon: '🍽️' },
        { id: 'kitchen', name: 'Executive Kitchen & Prep', desc: 'Inspect batch gravy meal-prep standards, HACCP hygiene & -18% waste reduction.', icon: '🍳' },
        { id: 'warehouse', name: 'Supply Dock & Warehouse', desc: 'Audit Miah Store experience (1,200+ SKUs, FIFO barcode control, -30% loss).', icon: '📦' },
        { id: 'terminal', name: 'Smart Ops AI Terminal', desc: 'Inspect Falak Creation n8n webhook pipelines, WhatsApp bots & AWS EC2 cloud.', icon: '🤖' },
        { id: 'cashier', name: 'Checkout POS & Takeaway', desc: 'Generate official Takeaway Resume statement & instant WhatsApp hire dispatch.', icon: '🧾' }
    ],
    selectedMixSkills: []
};

function addXP(amount, reason = '') {
    gameState.xp = Math.min(gameState.xp + amount, 500);
    updateHUD();
    checkLevelProgression();
    if (reason) showToast(`+${amount} XP: ${reason}`);
}

function updateHUD() {
    const xpText = document.getElementById('hud-xp-text');
    const xpFill = document.getElementById('hud-xp-fill');
    const rankLabel = document.getElementById('hud-rank-label');
    const levelPill = document.getElementById('hud-level-pill');
    const questCount = document.getElementById('quest-progress-count');

    if (xpText) xpText.innerText = gameState.xp;
    if (xpFill) xpFill.style.width = `${(gameState.xp / 500) * 100}%`;

    const titles = ['Apprentice Lead', 'Floor Supervisor', 'Operations Manager', 'Executive Supervisor', 'Operations Maestro'];
    const lvl = Math.min(Math.floor(gameState.xp / 100) + 1, 5);
    gameState.level = lvl;

    if (levelPill) levelPill.innerText = `LVL ${lvl}`;
    if (rankLabel) rankLabel.innerText = `Rank: ${titles[lvl - 1]}`;
    if (questCount) questCount.innerText = `${gameState.visitedStations.size}/${gameState.stations.length}`;
}

function checkLevelProgression() {
    if (gameState.xp >= 500 && !gameState.maxLevelTriggered) {
        gameState.maxLevelTriggered = true;
        gameAudio.playUnlock();
        launchConfetti();
        showToast('🌟 MAX LEVEL REACHED: Operations Maestro!');
    }
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'game-toast';
    toast.innerHTML = `<i class="fa-solid fa-star text-gold"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

/* 3. 2D CANVAS RESTAURANT RPG WORLD */
class RestaurantWorld {
    constructor() {
        this.canvas = document.getElementById('restaurant-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.width = 960;
        this.height = 600;

        // Player Avatar
        this.player = {
            x: 160,
            y: 300,
            targetX: 160,
            targetY: 300,
            speed: 3.5,
            width: 28,
            height: 36,
            dir: 'down',
            isMoving: false,
            animFrame: 0,
            animTimer: 0,
            stepSoundTimer: 0
        };

        // Interactive Stations
        this.stations = [
            {
                id: 'host',
                name: 'Reception Host Stand',
                x: 150,
                y: 200,
                width: 60,
                height: 50,
                color: '#D97706',
                icon: '🛎️',
                prompt: 'Talk to Hostess Layla'
            },
            {
                id: 'dining',
                name: 'VIP Dining Table #1',
                x: 420,
                y: 190,
                width: 90,
                height: 70,
                color: '#B45309',
                icon: '🍽️',
                prompt: 'Talk to VIP Guests (Khamer KPIs)'
            },
            {
                id: 'kitchen',
                name: 'Executive Kitchen & Stoves',
                x: 750,
                y: 160,
                width: 130,
                height: 70,
                color: '#059669',
                icon: '🍳',
                prompt: 'Inspect Cooking & Meal-Prep'
            },
            {
                id: 'warehouse',
                name: 'Supply Warehouse & Dock',
                x: 750,
                y: 430,
                width: 130,
                height: 80,
                color: '#0284C7',
                icon: '📦',
                prompt: 'Audit Inventory (Miah Store)'
            },
            {
                id: 'terminal',
                name: 'Smart Ops AI Terminal',
                x: 420,
                y: 440,
                width: 90,
                height: 60,
                color: '#7C3AED',
                icon: '🤖',
                prompt: 'Access Falak n8n AI Workflows'
            },
            {
                id: 'bar',
                name: 'Skill Mixology Bar',
                x: 150,
                y: 440,
                width: 70,
                height: 60,
                color: '#F59E0B',
                icon: '🍸',
                prompt: 'Open Skill Shaker Lounge'
            },
            {
                id: 'cashier',
                name: 'Checkout & Takeaway POS',
                x: 150,
                y: 330,
                width: 50,
                height: 40,
                color: '#10B981',
                icon: '🧾',
                prompt: 'Print Official Resume Statement'
            },
            {
                id: 'arcade_bell',
                name: 'Rush Hour Service Bell',
                x: 420,
                y: 310,
                width: 40,
                height: 40,
                color: '#EF4444',
                icon: '⚡',
                prompt: 'Ring Bell to Play Shift Rush Game!'
            }
        ];

        // Animated particles (steam, sparks)
        this.particles = [];
        this.keys = {};
        this.currentNearStation = null;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.bindInput();
        this.loop();
    }

    resize() {
        const container = document.getElementById('game-viewport');
        const aspect = this.width / this.height;
        let w = container.clientWidth;
        let h = container.clientHeight;

        if (w / h > aspect) {
            w = h * aspect;
        } else {
            h = w / aspect;
        }

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.width = `${w}px`;
        this.canvas.style.height = `${h}px`;
    }

    bindInput() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (e.key === 'e' || e.key === 'E' || e.key === ' ') {
                if (this.currentNearStation && !isDialogueOpen()) {
                    triggerStationInteraction(this.currentNearStation.id);
                }
            }
            if (e.key === 'Escape') {
                closeDialogue();
                closeRushGame();
                closeMixologyModal();
                closeQuestModal();
                closeRecruiterModal();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Mouse click or touch to walk
        this.canvas.addEventListener('pointerdown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = this.width / rect.width;
            const scaleY = this.height / rect.height;
            const clickX = (e.clientX - rect.left) * scaleX;
            const clickY = (e.clientY - rect.top) * scaleY;

            this.player.targetX = clickX;
            this.player.targetY = clickY;

            // Check if clicked directly on a station
            this.stations.forEach(st => {
                if (
                    clickX >= st.x - 20 && clickX <= st.x + st.width + 20 &&
                    clickY >= st.y - 20 && clickY <= st.y + st.height + 20
                ) {
                    if (this.getDist(this.player.x, this.player.y, st.x + st.width/2, st.y + st.height/2) < 90) {
                        triggerStationInteraction(st.id);
                    }
                }
            });
        });

        // Mobile D-Pad Handlers
        ['up', 'down', 'left', 'right'].forEach(dir => {
            const btn = document.getElementById(`btn-${dir}`);
            if (btn) {
                const setDir = (active) => {
                    if (dir === 'up') this.keys['arrowup'] = active;
                    if (dir === 'down') this.keys['arrowdown'] = active;
                    if (dir === 'left') this.keys['arrowleft'] = active;
                    if (dir === 'right') this.keys['arrowright'] = active;
                };
                btn.addEventListener('touchstart', (e) => { e.preventDefault(); setDir(true); });
                btn.addEventListener('touchend', (e) => { e.preventDefault(); setDir(false); });
                btn.addEventListener('mousedown', () => setDir(true));
                btn.addEventListener('mouseup', () => setDir(false));
                btn.addEventListener('mouseleave', () => setDir(false));
            }
        });
    }

    update() {
        let dx = 0;
        let dy = 0;

        if (this.keys['w'] || this.keys['arrowup']) dy -= 1;
        if (this.keys['s'] || this.keys['arrowdown']) dy += 1;
        if (this.keys['a'] || this.keys['arrowleft']) dx -= 1;
        if (this.keys['d'] || this.keys['arrowright']) dx += 1;

        if (dx !== 0 || dy !== 0) {
            // Keyboard movement takes precedence over tap target
            this.player.targetX = this.player.x;
            this.player.targetY = this.player.y;

            const len = Math.hypot(dx, dy);
            this.player.x += (dx / len) * this.player.speed;
            this.player.y += (dy / len) * this.player.speed;
            this.player.isMoving = true;

            if (Math.abs(dx) > Math.abs(dy)) {
                this.player.dir = dx > 0 ? 'right' : 'left';
            } else {
                this.player.dir = dy > 0 ? 'down' : 'up';
            }
        } else {
            // Move toward tap target
            const dist = Math.hypot(this.player.targetX - this.player.x, this.player.targetY - this.player.y);
            if (dist > 5) {
                const angle = Math.atan2(this.player.targetY - this.player.y, this.player.targetX - this.player.x);
                this.player.x += Math.cos(angle) * this.player.speed;
                this.player.y += Math.sin(angle) * this.player.speed;
                this.player.isMoving = true;

                if (Math.abs(Math.cos(angle)) > Math.abs(Math.sin(angle))) {
                    this.player.dir = Math.cos(angle) > 0 ? 'right' : 'left';
                } else {
                    this.player.dir = Math.sin(angle) > 0 ? 'down' : 'up';
                }
            } else {
                this.player.isMoving = false;
            }
        }

        // Clamp boundaries
        this.player.x = Math.max(60, Math.min(this.width - 60, this.player.x));
        this.player.y = Math.max(90, Math.min(this.height - 70, this.player.y));

        // Walking animation & footstep audio
        if (this.player.isMoving) {
            this.player.animTimer++;
            if (this.player.animTimer > 8) {
                this.player.animFrame = (this.player.animFrame + 1) % 4;
                this.player.animTimer = 0;
            }
            this.player.stepSoundTimer++;
            if (this.player.stepSoundTimer > 18) {
                gameAudio.playStep();
                this.player.stepSoundTimer = 0;
            }
        } else {
            this.player.animFrame = 0;
        }

        // Proximity detection to stations
        let nearest = null;
        let minDist = 75;

        this.stations.forEach(st => {
            const centerX = st.x + st.width / 2;
            const centerY = st.y + st.height / 2;
            const d = this.getDist(this.player.x, this.player.y, centerX, centerY);
            if (d < minDist) {
                nearest = st;
                minDist = d;
            }
        });

        this.currentNearStation = nearest;
        const promptEl = document.getElementById('proximity-indicator');
        const promptText = document.getElementById('proximity-text');

        if (nearest && !isDialogueOpen()) {
            promptEl.classList.remove('hidden');
            promptText.innerText = `${nearest.prompt}`;
            
            // Position prompt above station in canvas coords to CSS pixels
            const rect = this.canvas.getBoundingClientRect();
            const scaleX = rect.width / this.width;
            const scaleY = rect.height / this.height;
            promptEl.style.left = `${nearest.x * scaleX + (nearest.width * scaleX) / 2}px`;
            promptEl.style.top = `${(nearest.y - 15) * scaleY}px`;
        } else {
            promptEl.classList.add('hidden');
        }

        // Emit Kitchen Steam Particles
        if (Math.random() < 0.25) {
            this.particles.push({
                x: 770 + Math.random() * 80,
                y: 160 + Math.random() * 20,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -(Math.random() * 0.8 + 0.4),
                radius: Math.random() * 4 + 2,
                alpha: 0.6,
                color: 'rgba(255, 255, 255,'
            });
        }

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.015;
            if (p.alpha <= 0) this.particles.splice(i, 1);
        }
    }

    getDist(x1, y1, x2, y2) {
        return Math.hypot(x2 - x1, y2 - y1);
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // 1. Draw Floor Zones
        // Main Parquet Dining Floor
        ctx.fillStyle = '#1A130F';
        ctx.fillRect(0, 0, this.width, this.height);

        // Floor Grid Plank lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let x = 0; x < this.width; x += 40) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, this.height); ctx.stroke();
        }
        for (let y = 0; y < this.height; y += 40) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(this.width, y); ctx.stroke();
        }

        // Executive Kitchen Zone (Checkered Floor)
        ctx.fillStyle = '#102018';
        ctx.fillRect(660, 60, 260, 230);
        ctx.strokeStyle = '#059669';
        ctx.lineWidth = 2;
        ctx.strokeRect(660, 60, 260, 230);

        // Supply Warehouse Zone (Industrial Metal Floor)
        ctx.fillStyle = '#0F1A24';
        ctx.fillRect(660, 330, 260, 220);
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 2;
        ctx.strokeRect(660, 330, 260, 220);

        // VIP Carpet in Dining Area
        ctx.fillStyle = '#3B1812';
        ctx.fillRect(320, 130, 280, 180);
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 2;
        ctx.strokeRect(320, 130, 280, 180);

        // Smart Ops Lab Zone
        ctx.fillStyle = '#181226';
        ctx.fillRect(320, 370, 280, 180);
        ctx.strokeStyle = '#7C3AED';
        ctx.lineWidth = 2;
        ctx.strokeRect(320, 370, 280, 180);

        // 2. Draw Station Entities
        this.stations.forEach(st => {
            // Shadow
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.beginPath();
            ctx.ellipse(st.x + st.width / 2, st.y + st.height, st.width / 2 + 4, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Structure box
            ctx.fillStyle = st.color;
            ctx.fillRect(st.x, st.y, st.width, st.height);
            ctx.strokeStyle = '#FBBF24';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(st.x, st.y, st.width, st.height);

            // Icon & Label
            ctx.font = '22px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(st.icon, st.x + st.width / 2, st.y + st.height / 2 + 6);

            ctx.font = 'bold 11px Outfit, sans-serif';
            ctx.fillStyle = '#FFFDF7';
            ctx.fillText(st.name, st.x + st.width / 2, st.y - 8);
        });

        // 3. Draw Steam Particles
        this.particles.forEach(p => {
            ctx.fillStyle = `${p.color} ${p.alpha})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        // 4. Draw Player Character (Amdadul Hoque Avatar)
        const p = this.player;

        // Shadow under player
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.beginPath();
        ctx.ellipse(p.x, p.y + 14, 14, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Player Body (Chef Uniform with gold trim)
        ctx.fillStyle = '#FFFDF7';
        ctx.fillRect(p.x - 10, p.y - 12, 20, 20); // Apron
        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(p.x - 10, p.y - 12, 20, 20);

        // Legs / Walking Frame
        ctx.fillStyle = '#1E293B';
        const legOffset = p.isMoving ? Math.sin(p.animFrame * Math.PI / 2) * 4 : 0;
        ctx.fillRect(p.x - 7, p.y + 8, 5, 8 + legOffset);
        ctx.fillRect(p.x + 2, p.y + 8, 5, 8 - legOffset);

        // Head
        ctx.fillStyle = '#F5D0A9';
        ctx.beginPath();
        ctx.arc(p.x, p.y - 18, 9, 0, Math.PI * 2);
        ctx.fill();

        // Chef Toque / Hat
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(p.x - 8, p.y - 32, 16, 9);
        ctx.beginPath();
        ctx.arc(p.x, p.y - 32, 8, 0, Math.PI * 2);
        ctx.fill();

        // Direction Indicator Badge
        ctx.fillStyle = '#F59E0B';
        ctx.font = 'bold 9px Space Grotesk, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('AMDAUL', p.x, p.y - 38);
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}

/* 4. RPG DIALOGUE SYSTEM & RESUME KNOWLEDGE BASE */
const dialogues = {
    host: {
        speaker: 'Hostess Layla',
        badge: 'RECEPTION',
        avatar: 'profile.jpg',
        location: 'Host Stand • Khamer Lounge',
        text: "Marhaban! Welcome to Khamer Lounge. I am Layla. You are exploring the interactive operations hub of Amdadul Hoque (মোঃ এমদাদুল হক) — our acclaimed Restaurant Operations Supervisor & Warehouse Specialist in Sabya, Saudi Arabia!",
        options: [
            { text: "What is Amdadul's background?", next: 'host_bio' },
            { text: "What languages does he speak?", next: 'host_languages' },
            { text: "How can I contact or hire him?", action: () => openRecruiterModal() }
        ]
    },
    host_bio: {
        speaker: 'Amdadul Hoque',
        badge: 'SUPERVISOR',
        avatar: 'profile.jpg',
        location: 'Executive Overview',
        text: "I combine 4+ years of cross-functional restaurant and warehouse supervision with modern AI automations. I ensure high-volume dining floors run smoothly, reduce food and inventory waste, and lead multinational teams with bilingual Arabic-English fluency.",
        options: [
            { text: "Tell me about your Saudi experience.", next: 'dining' },
            { text: "Show me the Takeaway Resume Statement.", action: () => openRecruiterModal() }
        ]
    },
    host_languages: {
        speaker: 'Amdadul Hoque',
        badge: 'SUPERVISOR',
        avatar: 'profile.jpg',
        location: 'Bilingual Mastery',
        text: "I am fully fluent in spoken Arabic for Saudi guest concierge & local vendor negotiations, professional English for management reporting, and native Bengali.",
        options: [
            { text: "Take me to the Dining Floor.", action: () => visitStationCoordinates(420, 240) }
        ]
    },
    dining: {
        speaker: 'Sheikh Tariq (VIP Guest)',
        badge: 'DINING GUEST',
        avatar: 'profile.jpg',
        location: 'VIP Table #1 • Khamer Restaurant',
        text: "As-salamu alaykum! Amdadul transformed this restaurant since early 2024. He manages over 15+ waitstaff and kitchen workers, sped up our table turnaround by 25%, and maintains a 4.8-star rating!",
        options: [
            { text: "Ask about 25% speed increase", next: 'dining_speed' },
            { text: "Ask about 15+ staff supervision", next: 'dining_staff' },
            { text: "Inspect the Kitchen Prep next", action: () => visitStationCoordinates(750, 220) }
        ]
    },
    dining_speed: {
        speaker: 'Amdadul Hoque',
        badge: 'SUPERVISOR',
        avatar: 'profile.jpg',
        location: 'Khamer Restaurant (2024–Present)',
        text: "We achieved a 25% faster service turnaround by instituting standardized batch gravy preparation and synchronizing customer orders via automated WhatsApp bots directly to the kitchen display.",
        options: [
            { text: "Inspect the Kitchen Stoves", action: () => visitStationCoordinates(750, 220) }
        ]
    },
    dining_staff: {
        speaker: 'Amdadul Hoque',
        badge: 'SUPERVISOR',
        avatar: 'profile.jpg',
        location: 'Floor Leadership',
        text: "I roster, train, and oversee 15+ front-of-house waiters, baristas, and back-of-house cooks. Zero shift dropouts and strict HACCP compliance ensure flawless municipal inspection passes.",
        options: [
            { text: "Visit the Supply Warehouse Dock", action: () => visitStationCoordinates(750, 480) }
        ]
    },
    kitchen: {
        speaker: 'Chef Karim',
        badge: 'HEAD CHEF',
        avatar: 'profile.jpg',
        location: 'Executive Kitchen Station',
        text: "Chef Amdadul revolutionized our batch prep! He standardized all-purpose base gravies, introduced strict digital cold-chain temperature logs, and cut food waste by 18%.",
        options: [
            { text: "Review HACCP food safety standards", next: 'kitchen_haccp' },
            { text: "Play the Rush Hour Cooking Game!", action: () => openRushHourGame() }
        ]
    },
    kitchen_haccp: {
        speaker: 'Amdadul Hoque',
        badge: 'SUPERVISOR',
        avatar: 'profile.jpg',
        location: 'Food Safety Protocols',
        text: "We adhere strictly to HACCP principles: daily temperature logging, sanitized work surfaces, FIFO ingredient rotations, and allergen separation across all prep lines.",
        options: [
            { text: "Go to Supply Warehouse", action: () => visitStationCoordinates(750, 480) }
        ]
    },
    warehouse: {
        speaker: 'Bashir (Inventory Lead)',
        badge: 'WAREHOUSE LEAD',
        avatar: 'profile.jpg',
        location: 'Miah Store Supply Dock',
        text: "During his tenure at Miah Store (2022–2024), Amdadul audited over 1,200+ active SKUs daily using barcode scanners. He reduced stock discrepancies by 30% through strict FIFO rotation!",
        options: [
            { text: "Ask about vendor price negotiations", next: 'warehouse_vendor' },
            { text: "Visit the Smart Ops AI Terminal", action: () => visitStationCoordinates(420, 480) }
        ]
    },
    warehouse_vendor: {
        speaker: 'Amdadul Hoque',
        badge: 'SUPERVISOR',
        avatar: 'profile.jpg',
        location: 'Supply Logistics',
        text: "I managed daily supplier delivery dockets, price negotiations, and purchase order reconciliation against POS accounts, ensuring zero invoice leakage.",
        options: [
            { text: "Check the AI Terminal", action: () => visitStationCoordinates(420, 480) }
        ]
    },
    terminal: {
        speaker: 'Falak Automation AI',
        badge: 'DIGITAL AGENT',
        avatar: 'profile.jpg',
        location: 'Smart Ops Terminal (Falak Creation)',
        text: "BEEP BOOP! Automated pipelines active. Amdadul has engineered multi-step n8n webhook workflows, integrated WhatsApp Cloud API for ordering, configured AWS EC2 Linux servers, and connected Groq/Bedrock LLMs!",
        options: [
            { text: "How does n8n help restaurants?", next: 'terminal_n8n' },
            { text: "Open Mixology Skills Lounge", action: () => openMixologyModal() }
        ]
    },
    terminal_n8n: {
        speaker: 'Amdadul Hoque',
        badge: 'AUTOMATION ARCHITECT',
        avatar: 'profile.jpg',
        location: 'Workflow Engineering',
        text: "By linking WhatsApp webhooks with live Google Sheets menu databases, customer pickup orders are validated instantly without tying up staff phone lines.",
        options: [
            { text: "Open Mixology Lounge", action: () => openMixologyModal() }
        ]
    }
};

let currentTypewriterTimer = null;

function triggerStationInteraction(stationId) {
    gameAudio.playInteract();

    // Mark visited station for Quest
    if (!gameState.visitedStations.has(stationId)) {
        gameState.visitedStations.add(stationId);
        addXP(50, `Explored ${stationId.toUpperCase()}`);
    }

    if (stationId === 'cashier') {
        openRecruiterModal();
        return;
    }
    if (stationId === 'bar') {
        openMixologyModal();
        return;
    }
    if (stationId === 'arcade_bell') {
        openRushHourGame();
        return;
    }

    const dialogueData = dialogues[stationId];
    if (dialogueData) {
        showDialogue(dialogueData);
    }
}

function showDialogue(data) {
    const diagEl = document.getElementById('rpg-dialogue');
    const nameEl = document.getElementById('speaker-name');
    const badgeEl = document.getElementById('speaker-badge');
    const locEl = document.getElementById('dialogue-location');
    const textEl = document.getElementById('dialogue-typewriter-text');
    const optionsEl = document.getElementById('dialogue-options');

    diagEl.classList.remove('hidden');
    nameEl.innerText = data.speaker;
    badgeEl.innerText = data.badge;
    locEl.innerText = data.location;

    // Typewriter effect
    clearInterval(currentTypewriterTimer);
    textEl.innerText = '';
    let idx = 0;
    const fullText = data.text;

    currentTypewriterTimer = setInterval(() => {
        textEl.innerText += fullText[idx];
        if (idx % 2 === 0) gameAudio.playBleep();
        idx++;
        if (idx >= fullText.length) {
            clearInterval(currentTypewriterTimer);
        }
    }, 20);

    // Options buttons
    optionsEl.innerHTML = '';
    if (data.options) {
        data.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'dialogue-opt-btn';
            btn.innerHTML = `<i class="fa-solid fa-caret-right text-gold"></i> <span>${opt.text}</span>`;
            btn.onclick = () => {
                gameAudio.playInteract();
                if (opt.next && dialogues[opt.next]) {
                    showDialogue(dialogues[opt.next]);
                } else if (opt.action) {
                    closeDialogue();
                    opt.action();
                }
            };
            optionsEl.appendChild(btn);
        });
    }
}

function closeDialogue() {
    clearInterval(currentTypewriterTimer);
    const diagEl = document.getElementById('rpg-dialogue');
    if (diagEl) diagEl.classList.add('hidden');
}

function isDialogueOpen() {
    const diagEl = document.getElementById('rpg-dialogue');
    return diagEl && !diagEl.classList.contains('hidden');
}

function visitStationCoordinates(x, y) {
    if (window.worldInstance) {
        window.worldInstance.player.targetX = x;
        window.worldInstance.player.targetY = y;
    }
}

function triggerCurrentInteraction() {
    if (window.worldInstance && window.worldInstance.currentNearStation) {
        triggerStationInteraction(window.worldInstance.currentNearStation.id);
    } else {
        openRecruiterModal();
    }
}

/* 5. RUSH HOUR ORDER DISPATCH MINI-GAME */
const rushGame = {
    active: false,
    score: 0,
    streak: 0,
    timeLeft: 30,
    timerId: null,
    ticketIdx: 0,
    tickets: [
        {
            prompt: "200kg raw meat batch arrived at dock during dinner rush. Immediate action required!",
            options: [
                { text: "Barcode Scan & Cold-Chain FIFO Inspection", correct: true },
                { text: "Call Social Media Marketing Agency", correct: false },
                { text: "Leave boxes outside in hallway", correct: false }
            ]
        },
        {
            prompt: "Evening dinner rush! 15 kitchen and service staff need optimized section allocation!",
            options: [
                { text: "Execute Floor Rostering & Line Rebalancing", correct: true },
                { text: "Lock dining room doors", correct: false },
                { text: "Cancel all table reservations", correct: false }
            ]
        },
        {
            prompt: "VIP Saudi guests arrived at Table #1 requesting special traditional dishes in Arabic!",
            options: [
                { text: "Deliver Fluent Arabic Hospitality & Concierge", correct: true },
                { text: "Hand them a printed flyer", correct: false },
                { text: "Ignore the table request", correct: false }
            ]
        },
        {
            prompt: "Customer WhatsApp queries are backing up during peak takeout hours!",
            options: [
                { text: "Trigger n8n Automated WhatsApp Bot", correct: true },
                { text: "Disconnect the restaurant Wi-Fi", correct: false },
                { text: "Delete customer chat history", correct: false }
            ]
        },
        {
            prompt: "Municipal health inspection scheduled for tomorrow morning!",
            options: [
                { text: "Execute HACCP Food Safety Checklist", correct: true },
                { text: "Hide inventory behind counter", correct: false },
                { text: "Order fast food instead", correct: false }
            ]
        }
    ]
};

function openRushHourGame() {
    gameAudio.playBell();
    document.getElementById('rush-game-modal').classList.remove('hidden');
    document.getElementById('rush-start-screen').classList.add('active');
    document.getElementById('rush-play-screen').classList.remove('active');
    document.getElementById('rush-end-screen').classList.remove('active');
}

function closeRushGame() {
    clearInterval(rushGame.timerId);
    rushGame.active = false;
    document.getElementById('rush-game-modal').classList.add('hidden');
}

function startRushMiniGame() {
    gameAudio.playTone(600, 'square', 0.1);
    rushGame.active = true;
    rushGame.score = 0;
    rushGame.streak = 0;
    rushGame.timeLeft = 30;
    rushGame.ticketIdx = 0;

    document.getElementById('rush-start-screen').classList.remove('active');
    document.getElementById('rush-end-screen').classList.remove('active');
    document.getElementById('rush-play-screen').classList.add('active');

    document.getElementById('rush-score').innerText = '0';
    document.getElementById('rush-timer').innerText = '30s';

    loadRushTicket();

    clearInterval(rushGame.timerId);
    rushGame.timerId = setInterval(() => {
        rushGame.timeLeft--;
        document.getElementById('rush-timer').innerText = `${rushGame.timeLeft}s`;
        if (rushGame.timeLeft <= 0) {
            endRushMiniGame();
        }
    }, 1000);
}

function loadRushTicket() {
    const ticket = rushGame.tickets[rushGame.ticketIdx % rushGame.tickets.length];
    document.getElementById('rush-ticket-id').innerText = `ORDER #${101 + rushGame.ticketIdx} • TABLE ${1 + (rushGame.ticketIdx % 6)}`;
    document.getElementById('rush-ticket-text').innerText = `"${ticket.prompt}"`;

    const container = document.getElementById('rush-options-container');
    container.innerHTML = '';

    ticket.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'rush-opt-btn';
        btn.innerHTML = `<i class="fa-solid fa-chevron-right text-gold"></i> <span>${opt.text}</span>`;
        btn.onclick = () => handleRushAnswer(opt.correct);
        container.appendChild(btn);
    });

    document.getElementById('rush-combo').innerText = `Combo Streak: ${rushGame.streak}x 🔥`;
}

function handleRushAnswer(isCorrect) {
    if (!rushGame.active) return;
    if (isCorrect) {
        gameAudio.playUnlock();
        rushGame.streak++;
        const points = 100 + rushGame.streak * 25;
        rushGame.score += points;
    } else {
        gameAudio.playTone(200, 'sawtooth', 0.15);
        rushGame.streak = 0;
        rushGame.score = Math.max(0, rushGame.score - 50);
    }
    document.getElementById('rush-score').innerText = rushGame.score;
    rushGame.ticketIdx++;
    loadRushTicket();
}

function endRushMiniGame() {
    clearInterval(rushGame.timerId);
    rushGame.active = false;

    document.getElementById('rush-play-screen').classList.remove('active');
    document.getElementById('rush-end-screen').classList.add('active');
    document.getElementById('rush-final-score').innerText = rushGame.score;

    if (rushGame.score >= 300) {
        addXP(150, 'Mastered Rush Hour Challenge');
        launchConfetti();
    }
}

/* 6. SKILL MIXOLOGY BAR */
function openMixologyModal() {
    gameAudio.playInteract();
    document.getElementById('mixology-modal').classList.remove('hidden');
}

function closeMixologyModal() {
    document.getElementById('mixology-modal').classList.add('hidden');
}

function toggleMixIngredient(btn, skillName) {
    gameAudio.playTone(480, 'sine', 0.05);
    btn.classList.toggle('selected');

    if (btn.classList.contains('selected')) {
        if (!gameState.selectedMixSkills.includes(skillName)) {
            gameState.selectedMixSkills.push(skillName);
        }
    } else {
        gameState.selectedMixSkills = gameState.selectedMixSkills.filter(s => s !== skillName);
    }

    const shakeBtn = document.getElementById('bar-shake-btn');
    if (shakeBtn) {
        shakeBtn.disabled = gameState.selectedMixSkills.length < 2;
    }
}

function shakeSynergyCocktail() {
    if (gameState.selectedMixSkills.length < 2) return;
    gameAudio.playShaker();

    const shakerIcon = document.getElementById('bar-shaker-icon');
    shakerIcon.classList.add('shaking');

    setTimeout(() => {
        shakerIcon.classList.remove('shaking');
        gameAudio.playUnlock();
        launchConfetti();

        const titleEl = document.getElementById('cocktail-name');
        const descEl = document.getElementById('cocktail-desc');
        const graphicEl = document.getElementById('cocktail-graphic');

        const blends = [
            { name: "The Sabya Executive Elixir", emoji: "🍹", desc: `Synergy of ${gameState.selectedMixSkills.join(' + ')}. Combining rigorous inventory auditing with warm Arabic hospitality drives zero stock loss and unmatched guest loyalty.` },
            { name: "The AI Operations Mojito", emoji: "🍸", desc: `Synergy of ${gameState.selectedMixSkills.join(' + ')}. Blending n8n automated ordering bots with floor team supervision cuts service wait times by 25%.` },
            { name: "The Enterprise Hospitality Shield", emoji: "🍷", desc: `Synergy of ${gameState.selectedMixSkills.join(' + ')}. Fusing HACCP food safety standards with POS ledger accuracy creates a rock-solid restaurant ecosystem.` }
        ];

        const pick = blends[Math.floor(Math.random() * blends.length)];
        titleEl.innerText = `"${pick.name}"`;
        descEl.innerText = pick.desc;
        graphicEl.innerText = pick.emoji;

        addXP(50, 'Crafted Skill Synergy Cocktail');
    }, 700);
}

/* 7. QUEST & RECRUITER MODALS */
function openQuestModal() {
    gameAudio.playInteract();
    const modal = document.getElementById('quest-modal');
    const container = document.getElementById('quest-items-list');
    if (!container) return;

    container.innerHTML = '';
    gameState.stations.forEach(st => {
        const isDone = gameState.visitedStations.has(st.id);
        const card = document.createElement('div');
        card.className = `quest-item-card ${isDone ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="quest-title-text">
                <h5>${st.icon} ${st.name} ${isDone ? '✅' : '🔒'}</h5>
                <p>${st.desc}</p>
            </div>
            <span class="quest-status-badge ${isDone ? 'text-emerald' : 'text-gold'}">${isDone ? '+50 XP CLAIMED' : 'PENDING'}</span>
        `;
        container.appendChild(card);
    });

    modal.classList.remove('hidden');
}

function closeQuestModal() {
    document.getElementById('quest-modal').classList.add('hidden');
}

function openRecruiterModal() {
    gameAudio.playUnlock();
    document.getElementById('recruiter-modal').classList.remove('hidden');
    addXP(50, 'Inspected Takeaway Resume');
}

function closeRecruiterModal() {
    document.getElementById('recruiter-modal').classList.add('hidden');
}

/* 8. CONFETTI CELEBRATION ENGINE */
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#F59E0B', '#10B981', '#FBBF24', '#EF4444', '#06B6D4'];

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.7) * 12,
            size: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.02 + 0.015
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = 0;
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.015;
            if (p.alpha > 0) {
                active++;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            }
        });

        if (active > 0) requestAnimationFrame(render);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    render();
}

/* 9. INITIALIZE RPG WORLD ON DOM READY */
document.addEventListener('DOMContentLoaded', () => {
    window.worldInstance = new RestaurantWorld();
    updateHUD();
});
