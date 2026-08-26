/* ==========================================================================
   THE VIRTUAL RESTAURANT RESUME GAME - INTERACTIVE JAVASCRIPT ENGINE
   Candidate: Amdadul Hoque (মোঃ এমদাদুল হক)
   ========================================================================== */

class GameAudioEngine {
    constructor() {
        this.ctx = null;
        this.isMuted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playClick() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.04); // A5
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
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
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - C
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
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2200;
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
        const statusEl = document.getElementById('sound-status');
        const iconEl = document.getElementById('sound-icon');
        if (statusEl) statusEl.innerText = this.isMuted ? 'OFF' : 'ON';
        if (iconEl) iconEl.className = this.isMuted ? 'fa-solid fa-volume-xmark text-muted' : 'fa-solid fa-volume-high text-amber-400';
        if (!this.isMuted) this.playClick();
    }
}

const gameAudio = new GameAudioEngine();

/* GAME STATE MANAGEMENT */
const gameState = {
    xp: 50,
    level: 1,
    unlockedCourses: [1],
    badges: [
        { id: 'welcome', title: 'Welcome Critic', desc: 'Arrived at Khamer Operations Hub', icon: 'fa-solid fa-door-open', unlocked: true },
        { id: 'connoisseur', title: '5-Course Connoisseur', desc: 'Explored all 5 Tasting Courses', icon: 'fa-solid fa-utensils', unlocked: false },
        { id: 'rush_master', title: 'Shift Rush Champion', desc: 'Scored 300+ in Shift Simulator', icon: 'fa-solid fa-bolt', unlocked: false },
        { id: 'mixologist', title: 'Synergy Mixologist', desc: 'Crafted custom skill cocktail', icon: 'fa-solid fa-martini-glass-citrus', unlocked: false },
        { id: 'recruiter', title: 'VIP Recruiter', desc: 'Inspected Takeaway Receipt CV', icon: 'fa-solid fa-file-invoice', unlocked: false },
        { id: 'maestro', title: 'Operations Maestro', desc: 'Reached Max Level 5 (500 XP)', icon: 'fa-solid fa-crown', unlocked: false }
    ],
    selectedIngredients: []
};

function addXP(amount) {
    gameState.xp = Math.min(gameState.xp + amount, 500);
    updateHUD();
    checkLevelProgression();
}

function updateHUD() {
    const xpCounter = document.getElementById('xp-counter');
    const progressBar = document.getElementById('xp-progress-bar');
    const levelBadge = document.getElementById('level-badge');
    const playerTitle = document.getElementById('player-title');
    const badgeCount = document.getElementById('unlocked-badge-count');

    if (xpCounter) xpCounter.innerText = gameState.xp;
    if (progressBar) progressBar.style.width = `${(gameState.xp / 500) * 100}%`;

    const titles = [
        'Apprentice Critic',
        'Floor Lead Inspector',
        'Operations Manager',
        'Executive Supervisor',
        'Operations Maestro'
    ];
    const lvl = Math.min(Math.floor(gameState.xp / 100) + 1, 5);
    gameState.level = lvl;

    if (levelBadge) levelBadge.innerText = `Lv.${lvl}`;
    if (playerTitle) playerTitle.innerText = titles[lvl - 1];

    const unlocked = gameState.badges.filter(b => b.unlocked).length;
    if (badgeCount) badgeCount.innerText = unlocked;
}

function unlockBadge(badgeId) {
    const badge = gameState.badges.find(b => b.id === badgeId);
    if (badge && !badge.unlocked) {
        badge.unlocked = true;
        gameAudio.playUnlock();
        launchConfetti();
        updateHUD();
    }
}

function checkLevelProgression() {
    if (gameState.xp >= 500) {
        unlockBadge('maestro');
    }
}

/* TYPEWRITER ENGINE */
function initTypewriter() {
    const textEl = document.getElementById('typing-text');
    if (!textEl) return;
    const words = [
        'Restaurant Operations Supervisor (Khamer)',
        'Warehouse Inventory Specialist (FIFO Audit)',
        'n8n & AI Automation Architect',
        'Bilingual Hospitality Lead (Arabic & English)'
    ];
    let wordIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const currentWord = words[wordIdx];
        if (isDeleting) {
            textEl.innerText = currentWord.substring(0, charIdx - 1);
            charIdx--;
        } else {
            textEl.innerText = currentWord.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 30 : 65;
        if (!isDeleting && charIdx === currentWord.length) {
            speed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 400;
        }
        setTimeout(type, speed);
    }
    type();
}

/* 5-COURSE TOGGLE & XP */
function toggleCourse(courseNum) {
    gameAudio.playClick();
    const card = document.getElementById(`course-card-${courseNum}`);
    if (!card) return;
    
    const drawer = card.querySelector('.course-content-drawer');
    const isOpening = drawer.classList.contains('hidden');

    if (isOpening) {
        drawer.classList.remove('hidden');
        card.classList.add('unlocked');
        gameAudio.playUnlock();
        
        if (!gameState.unlockedCourses.includes(courseNum)) {
            gameState.unlockedCourses.push(courseNum);
            addXP(100);
            launchConfetti();
        }
    } else {
        drawer.classList.add('hidden');
        card.classList.remove('unlocked');
    }

    if (gameState.unlockedCourses.length >= 5) {
        unlockBadge('connoisseur');
    }
}

/* SHIFT COMMANDER MINI-GAME (30s ARCADE) */
const shiftGame = {
    active: false,
    score: 0,
    streak: 0,
    timeLeft: 30,
    timerId: null,
    ticketIdx: 0,
    tickets: [
        {
            prompt: "200kg raw meat batch arrived at receiving dock. Immediate action required!",
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

function startShiftGame() {
    gameAudio.playClick();
    shiftGame.active = true;
    shiftGame.score = 0;
    shiftGame.streak = 0;
    shiftGame.timeLeft = 30;
    shiftGame.ticketIdx = 0;

    document.getElementById('game-screen-start').classList.add('hidden');
    document.getElementById('game-screen-end').classList.add('hidden');
    document.getElementById('game-screen-play').classList.remove('hidden');

    document.getElementById('game-score').innerText = '0';
    document.getElementById('game-timer').innerText = '30s';

    loadNextTicket();

    clearInterval(shiftGame.timerId);
    shiftGame.timerId = setInterval(() => {
        shiftGame.timeLeft--;
        document.getElementById('game-timer').innerText = `${shiftGame.timeLeft}s`;
        if (shiftGame.timeLeft <= 0) {
            endShiftGame();
        }
    }, 1000);
}

function loadNextTicket() {
    const ticket = shiftGame.tickets[shiftGame.ticketIdx % shiftGame.tickets.length];
    document.getElementById('ticket-id').innerText = `TICKET #${101 + shiftGame.ticketIdx}`;
    document.getElementById('ticket-prompt').innerText = `"${ticket.prompt}"`;

    const container = document.getElementById('game-options-container');
    container.innerHTML = '';

    ticket.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'game-option-btn';
        btn.innerHTML = `<i class="fa-solid fa-chevron-right text-amber-400 text-xs"></i> <span>${opt.text}</span>`;
        btn.onclick = () => handleAnswer(opt.correct);
        container.appendChild(btn);
    });

    document.getElementById('streak-indicator').innerText = `Combo: ${shiftGame.streak}x 🔥`;
}

function handleAnswer(isCorrect) {
    if (!shiftGame.active) return;
    if (isCorrect) {
        gameAudio.playUnlock();
        shiftGame.streak++;
        const points = 100 + shiftGame.streak * 25;
        shiftGame.score += points;
    } else {
        gameAudio.playClick();
        shiftGame.streak = 0;
        shiftGame.score = Math.max(0, shiftGame.score - 50);
    }
    document.getElementById('game-score').innerText = shiftGame.score;
    shiftGame.ticketIdx++;
    loadNextTicket();
}

function endShiftGame() {
    clearInterval(shiftGame.timerId);
    shiftGame.active = false;

    document.getElementById('game-screen-play').classList.add('hidden');
    document.getElementById('game-screen-end').classList.remove('hidden');
    document.getElementById('final-score-value').innerText = shiftGame.score;

    if (shiftGame.score >= 300) {
        unlockBadge('rush_master');
        addXP(150);
        launchConfetti();
    }
}

/* SKILL MIXOLOGY & SYNERGY MATRIX */
function toggleMixIngredient(btn, skillName) {
    gameAudio.playClick();
    btn.classList.toggle('selected');

    if (btn.classList.contains('selected')) {
        if (!gameState.selectedIngredients.includes(skillName)) {
            gameState.selectedIngredients.push(skillName);
        }
    } else {
        gameState.selectedIngredients = gameState.selectedIngredients.filter(s => s !== skillName);
    }

    const shakeBtn = document.getElementById('shake-action-btn');
    if (shakeBtn) {
        shakeBtn.disabled = gameState.selectedIngredients.length < 2;
    }
}

function triggerSynergyBrew() {
    if (gameState.selectedIngredients.length < 2) return;
    gameAudio.playShaker();

    const shakerIcon = document.getElementById('shaker-icon-wrap');
    shakerIcon.classList.add('shaking-active');

    setTimeout(() => {
        shakerIcon.classList.remove('shaking-active');
        gameAudio.playUnlock();
        launchConfetti();

        const titleEl = document.getElementById('synergy-title');
        const descEl = document.getElementById('synergy-desc');

        const blends = [
            { name: "The High-Yield Operations Engine", desc: "Combining rigorous FIFO inventory audit with Arabic hospitality ensures zero stock shrinkage while maintaining VIP guest satisfaction." },
            { name: "The Automated Floor Maestro", desc: "Blending n8n automated ordering bots with proactive 15+ staff floor management accelerates diner turnaround by 25%." },
            { name: "The Enterprise Hospitality Shield", desc: "Fusing HACCP food safety compliance with POS reconciliation creates a bulletproof dining and supply infrastructure." }
        ];

        const blend = blends[Math.floor(Math.random() * blends.length)];
        if (titleEl) titleEl.innerText = `"${blend.name}"`;
        if (descEl) descEl.innerText = `Synergy Created with: ${gameState.selectedIngredients.join(' + ')}. ${blend.desc}`;

        unlockBadge('mixologist');
        addXP(50);
    }, 750);
}

/* RECEPTION BELL & STATION NAV */
function ringReceptionBell() {
    gameAudio.playBell();
    launchConfetti();
    addXP(10);
}

function visitStation(targetId) {
    gameAudio.playClick();
    const el = document.getElementById(targetId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ACHIEVEMENTS MODAL */
function openAchievementsModal() {
    gameAudio.playClick();
    const modal = document.getElementById('achievements-modal');
    const container = document.getElementById('badges-grid-container');
    if (!container) return;

    container.innerHTML = '';
    gameState.badges.forEach(b => {
        const div = document.createElement('div');
        div.className = `p-3.5 rounded-xl border flex items-center gap-3 ${b.unlocked ? 'bg-amber-500/10 border-amber-500/30 text-primary' : 'bg-surface-card border-border-subtle opacity-40'}`;
        div.innerHTML = `
            <div class="w-10 h-10 rounded-lg ${b.unlocked ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-muted'} flex items-center justify-center text-base flex-shrink-0">
                <i class="${b.icon}"></i>
            </div>
            <div>
                <h5 class="text-xs font-bold font-sans">${b.title} ${b.unlocked ? '✅' : '🔒'}</h5>
                <p class="text-[11px] text-muted">${b.desc}</p>
            </div>
        `;
        container.appendChild(div);
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

/* AMBIENT CANVAS PARTICLES */
function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.reset(true);
        }
        reset(initial = false) {
            this.x = Math.random() * width;
            this.y = initial ? Math.random() * height : height + 20;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = -(Math.random() * 0.6 + 0.2);
            this.radius = Math.random() * 2 + 1;
            this.alpha = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y < -10) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 158, 11, ${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 35; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* CELEBRATION CONFETTI ENGINE */
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
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.7) * 10,
            size: Math.random() * 5 + 3,
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
            p.vy += 0.18;
            p.alpha -= p.decay;

            if (p.alpha > 0) {
                active++;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            }
        });

        if (active > 0) {
            requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    render();
}

/* FORM SUBMIT SIMULATION */
function handleReservationSubmit() {
    gameAudio.playUnlock();
    const name = document.getElementById('res-name').value;
    const feedback = document.getElementById('res-feedback');
    const submitBtn = document.getElementById('res-submit-btn');

    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Dispatching...`;
    submitBtn.disabled = true;

    setTimeout(() => {
        feedback.className = 'p-4 rounded-xl text-xs font-sans bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 block';
        feedback.innerHTML = `Table invitation from <strong>${name}</strong> sent directly to Supervisor Amdadul Hoque! Expect a swift reply via WhatsApp / Email.`;
        document.getElementById('reservation-form').reset();
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send Reservation Dispatch`;
        submitBtn.disabled = false;
        launchConfetti();
    }, 700);
}

/* INITIALIZE DOM LISTENERS */
document.addEventListener('DOMContentLoaded', () => {
    initAmbientCanvas();
    initTypewriter();
    updateHUD();

    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileBtn && mobileMenu) {
        mobileBtn.onclick = () => {
            mobileMenu.classList.toggle('hidden');
        };
    }

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.onclick = () => mobileMenu && mobileMenu.classList.add('hidden');
    });
});
