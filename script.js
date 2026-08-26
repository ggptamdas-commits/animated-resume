/* ==========================================================================
   VIRTUAL RESTAURANT GAME & INTERACTIVE RESUME - JAVASCRIPT ENGINE
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
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playBell() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        [1500, 3000, 4500].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.15 / (i + 1), now);
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
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.08);
            gain.gain.setValueAtTime(0.15, now + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + idx * 0.08);
            osc.stop(now + idx * 0.08 + 0.3);
        });
    }

    playShaker() {
        if (this.isMuted) return;
        this.init();
        if (!this.ctx) return;
        const bufferSize = this.ctx.sampleRate * 0.1;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1800;
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
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
        if (iconEl) iconEl.className = this.isMuted ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high';
        if (!this.isMuted) this.playClick();
    }
}

const gameAudio = new GameAudioEngine();

const gameState = {
    xp: 50,
    level: 1,
    unlockedCourses: [1],
    badges: [
        { id: 'welcome', title: 'Welcome Diner', desc: 'Arrived at Khamer Lounge', icon: '🍽️', unlocked: true },
        { id: 'taster', title: 'Grand Gourmet', desc: 'Explored all 5 Tasting Courses', icon: '🍲', unlocked: false },
        { id: 'rush_champ', title: 'Rush Hour Master', desc: 'Scored 300+ in Supervisor Rush', icon: '⚡', unlocked: false },
        { id: 'mixologist', title: 'Master Mixologist', desc: 'Crafted a custom skill cocktail', icon: '🍸', unlocked: false },
        { id: 'recruiter', title: 'VIP Recruiter', desc: 'Inspected official takeaway resume', icon: '📋', unlocked: false },
        { id: 'maestro', title: 'Operations Maestro', desc: 'Reached Max Level 5 (500 XP)', icon: '🌟', unlocked: false }
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
    const unlockedCount = document.getElementById('unlocked-badge-count');

    if (xpCounter) xpCounter.innerText = gameState.xp;
    if (progressBar) progressBar.style.width = `${(gameState.xp / 500) * 100}%`;

    const titles = [
        'Apprentice Diner',
        'VIP Food Critic',
        'Kitchen Inspector',
        'Senior Operations Critic',
        'Master Food Executive'
    ];
    const lvl = Math.min(Math.floor(gameState.xp / 100) + 1, 5);
    gameState.level = lvl;

    if (levelBadge) levelBadge.innerText = `Level ${lvl}`;
    if (playerTitle) playerTitle.innerText = titles[lvl - 1];

    const unlocked = gameState.badges.filter(b => b.unlocked).length;
    if (unlockedCount) unlockedCount.innerText = unlocked;
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
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = -(Math.random() * 0.8 + 0.3);
            this.radius = Math.random() * 2.5 + 1;
            this.alpha = Math.random() * 0.5 + 0.1;
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
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#F59E0B';
            ctx.fill();
        }
    }

    for (let i = 0; i < 40; i++) {
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

function initTypewriter() {
    const textEl = document.getElementById('typing-text');
    if (!textEl) return;
    const words = [
        'Amdadul Hoque (Restaurant Supervisor)',
        'Inventory & Logistics Specialist',
        'n8n & AI Automation Architect',
        'Bilingual Hospitality Manager (Arabic & English)'
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

        let speed = isDeleting ? 35 : 75;
        if (!isDeleting && charIdx === currentWord.length) {
            speed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    type();
}

function unlockCourse(courseNumber) {
    const card = document.getElementById(`course-${courseNumber}`);
    if (!card) return;
    
    gameAudio.playUnlock();
    card.classList.toggle('unlocked');
    
    const btn = card.querySelector('.btn-serve-dish');
    if (btn) {
        if (card.classList.contains('unlocked')) {
            btn.classList.add('dish-unlocked');
            btn.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>Tasted &amp; Explored</span>`;
            if (!gameState.unlockedCourses.includes(courseNumber)) {
                gameState.unlockedCourses.push(courseNumber);
                addXP(courseNumber === 1 || courseNumber === 5 ? 50 : 100);
            }
        } else {
            btn.classList.remove('dish-unlocked');
            btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> <span>Plate &amp; Taste Dish</span>`;
        }
    }

    if (gameState.unlockedCourses.length >= 5) {
        unlockBadge('taster');
    }
}

const rushGame = {
    active: false,
    score: 0,
    streak: 0,
    timeLeft: 30,
    timerId: null,
    currentTicketIdx: 0,
    tickets: [
        {
            prompt: "200kg raw meat batch arrived at receiving dock. Need immediate FIFO audit and inspection!",
            options: [
                { text: "Barcode Scan & Cold-Chain FIFO Audit", correct: true },
                { text: "Call Social Media Agency", correct: false },
                { text: "Leave it in hallway", correct: false }
            ]
        },
        {
            prompt: "Evening dinner rush! 15 kitchen & dining staff need optimized section rostering!",
            options: [
                { text: "Floor Leadership & Station Re-allocation", correct: true },
                { text: "Lock the restaurant doors", correct: false },
                { text: "Cancel all reservations", correct: false }
            ]
        },
        {
            prompt: "VIP Saudi guests arrived at Table #1 requesting special traditional dishes in Arabic!",
            options: [
                { text: "Fluent Arabic Hospitality & Concierge", correct: true },
                { text: "Hand them a printed flyer", correct: false },
                { text: "Ignore the table", correct: false }
            ]
        },
        {
            prompt: "Customer WhatsApp queries are backing up during peak hours!",
            options: [
                { text: "Trigger n8n Automated WhatsApp Bot", correct: true },
                { text: "Delete all messages", correct: false },
                { text: "Turn off Wi-Fi router", correct: false }
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

function startRushGame() {
    gameAudio.playClick();
    rushGame.active = true;
    rushGame.score = 0;
    rushGame.streak = 0;
    rushGame.timeLeft = 30;
    rushGame.currentTicketIdx = 0;

    document.getElementById('game-start-screen').classList.remove('active');
    document.getElementById('game-end-screen').classList.remove('active');
    document.getElementById('game-play-screen').classList.add('active');

    document.getElementById('game-score').innerText = '0';
    document.getElementById('game-timer').innerText = '30s';

    loadNextTicket();

    clearInterval(rushGame.timerId);
    rushGame.timerId = setInterval(() => {
        rushGame.timeLeft--;
        document.getElementById('game-timer').innerText = `${rushGame.timeLeft}s`;
        if (rushGame.timeLeft <= 0) {
            endRushGame();
        }
    }, 1000);
}

function loadNextTicket() {
    const ticket = rushGame.tickets[rushGame.currentTicketIdx % rushGame.tickets.length];
    document.getElementById('ticket-id').innerText = `ORDER #${100 + rushGame.currentTicketIdx + 1}`;
    document.getElementById('ticket-prompt').innerText = `"${ticket.prompt}"`;

    const optionsContainer = document.getElementById('game-options');
    optionsContainer.innerHTML = '';

    ticket.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'game-opt-btn';
        btn.innerHTML = `<i class="fa-solid fa-bolt text-gold"></i> <span>${opt.text}</span>`;
        btn.onclick = () => handleTicketAnswer(opt.correct);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('streak-indicator').innerText = `Combo Streak: ${rushGame.streak}x 🔥`;
}

function handleTicketAnswer(isCorrect) {
    if (!rushGame.active) return;
    if (isCorrect) {
        gameAudio.playUnlock();
        rushGame.streak++;
        const points = 100 + rushGame.streak * 20;
        rushGame.score += points;
    } else {
        gameAudio.playClick();
        rushGame.streak = 0;
        rushGame.score = Math.max(0, rushGame.score - 50);
    }
    document.getElementById('game-score').innerText = rushGame.score;
    rushGame.currentTicketIdx++;
    loadNextTicket();
}

function endRushGame() {
    clearInterval(rushGame.timerId);
    rushGame.active = false;

    document.getElementById('game-play-screen').classList.remove('active');
    document.getElementById('game-end-screen').classList.add('active');
    document.getElementById('final-score-val').innerText = rushGame.score;

    if (rushGame.score >= 300) {
        unlockBadge('rush_champ');
        addXP(150);
        launchConfetti();
    }
}

function toggleIngredient(btn, skillName) {
    gameAudio.playClick();
    btn.classList.toggle('selected');

    if (btn.classList.contains('selected')) {
        if (!gameState.selectedIngredients.includes(skillName)) {
            gameState.selectedIngredients.push(skillName);
        }
    } else {
        gameState.selectedIngredients = gameState.selectedIngredients.filter(s => s !== skillName);
    }

    const shakeBtn = document.getElementById('shake-btn');
    if (shakeBtn) {
        shakeBtn.disabled = gameState.selectedIngredients.length < 2;
    }
}

function shakeCocktail() {
    if (gameState.selectedIngredients.length < 2) return;
    gameAudio.playShaker();

    const shakerIcon = document.getElementById('shaker-icon');
    shakerIcon.classList.add('shaking');

    setTimeout(() => {
        shakerIcon.classList.remove('shaking');
        gameAudio.playUnlock();
        launchConfetti();

        const titleEl = document.getElementById('cocktail-title');
        const recipeEl = document.getElementById('cocktail-recipe');
        const emojiEl = document.getElementById('cocktail-emoji');

        const drinks = [
            { name: "The Sabya Grand Elixir", emoji: "🍹", desc: "A potent infusion of Arabic Hospitality with strict Inventory Control. Delivers seamless floor management and zero stock leakages." },
            { name: "The AI Operations Mojito", emoji: "🍸", desc: "Crisp blend of n8n automations, POS reconciliation, and HACCP compliance. Guarantees 25% faster service and automated workflows." },
            { name: "The Executive Maestro Punch", emoji: "🍷", desc: "Rich combination of 15+ staff leadership, barcode auditing, and multilingual guest relations. The ultimate hospitality blend!" }
        ];

        const drink = drinks[Math.floor(Math.random() * drinks.length)];
        if (titleEl) titleEl.innerText = `"${drink.name}"`;
        if (emojiEl) emojiEl.innerText = drink.emoji;
        if (recipeEl) recipeEl.innerText = `Synergy Created with: ${gameState.selectedIngredients.join(' + ')}. ${drink.desc}`;

        unlockBadge('mixologist');
        addXP(50);
    }, 900);
}

function ringReceptionBell() {
    gameAudio.playBell();
    launchConfetti();
    addXP(10);
}

function visitStation(stationId) {
    gameAudio.playClick();
    const mapping = {
        'host-stand': 'entrance',
        'main-kitchen': 'tasting-quest',
        'tech-lab': 'tasting-quest',
        'mixology-bar': 'mixology-bar',
        'study-cellar': 'tasting-quest',
        'checkout-desk': 'bill-checkout'
    };
    const target = mapping[stationId] || 'entrance';
    const el = document.getElementById(target);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

function openAchievementsModal() {
    gameAudio.playClick();
    const modal = document.getElementById('achievements-modal');
    const container = document.getElementById('badges-container');
    if (!container) return;

    container.innerHTML = '';
    gameState.badges.forEach(b => {
        const div = document.createElement('div');
        div.className = `badge-item ${b.unlocked ? 'unlocked' : ''}`;
        div.innerHTML = `
            <div class="badge-icon-box">${b.icon}</div>
            <div class="badge-details">
                <h5>${b.title} ${b.unlocked ? '✅' : '🔒'}</h5>
                <p>${b.desc}</p>
            </div>
        `;
        container.appendChild(div);
    });

    modal.classList.add('open');
}

function closeAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    if (modal) modal.classList.remove('open');
}

function toggleRecruiterMode() {
    gameAudio.playClick();
    unlockBadge('recruiter');
    const checkoutSec = document.getElementById('bill-checkout');
    if (checkoutSec) {
        checkoutSec.scrollIntoView({ behavior: 'smooth' });
    }
}

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#F59E0B', '#10B981', '#FBBF24', '#EF4444', '#06B6D4'];

    for (let i = 0; i < 75; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.7) * 12,
            size: Math.random() * 6 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: Math.random() * 0.02 + 0.015
        });
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeCount = 0;
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2;
            p.alpha -= p.decay;

            if (p.alpha > 0) {
                activeCount++;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            }
        });

        if (activeCount > 0) {
            requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    render();
}

function handleReservationSubmit() {
    gameAudio.playUnlock();
    const name = document.getElementById('res-name').value;
    const feedback = document.getElementById('res-feedback');
    const submitBtn = document.getElementById('res-submit-btn');

    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Dispatching...`;
    submitBtn.disabled = true;

    setTimeout(() => {
        feedback.className = 'res-feedback success';
        feedback.innerHTML = `Table invitation from <strong>${name}</strong> sent directly to Supervisor Amdadul Hoque! Expect a swift reply via WhatsApp / Email.`;
        document.getElementById('reservation-form').reset();
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Send Reservation Dispatch`;
        submitBtn.disabled = false;
        launchConfetti();
    }, 800);
}

document.addEventListener('DOMContentLoaded', () => {
    initAmbientCanvas();
    initTypewriter();
    updateHUD();

    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) navToggle.onclick = () => navMenu.classList.add('show-menu');
    if (navClose && navMenu) navClose.onclick = () => navMenu.classList.remove('show-menu');
    document.querySelectorAll('.nav__link').forEach(link => {
        link.onclick = () => navMenu && navMenu.classList.remove('show-menu');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
