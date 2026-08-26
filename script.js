/* =========================================================
   KHAMER VIRTUAL RESTAURANT - INTERACTIVE SCRIPT
   Supervisor: Amdadul Hoque
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initAmbientEmberCanvas();
    initTypewriter();
    initMenuTabs();
    initServiceBell();
    initMobileNav();
    initHeaderScroll();
    initScrollSpy();
    initScrollReveal();
});

/* ---------------------------------------------------------
   1. AMBIENT CANDLELIGHT & GOLDEN EMBER PARTICLES
   --------------------------------------------------------- */
function initAmbientEmberCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    const particleCount = Math.min(window.innerWidth < 768 ? 35 : 65, 75);

    let mouse = { x: null, y: null, radius: 120 };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Ember {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * width;
            this.y = initial ? Math.random() * height : height + Math.random() * 20;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = -(Math.random() * 0.7 + 0.3); // Drift upward like embers
            this.radius = Math.random() * 2.5 + 1;
            this.alpha = Math.random() * 0.6 + 0.2;
            this.color = Math.random() > 0.3 ? '245, 158, 11' : (Math.random() > 0.5 ? '251, 191, 36' : '225, 29, 72');
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Gentle wobble
            this.vx += (Math.random() - 0.5) * 0.02;

            // Mouse repulsion / breeze
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }
            }

            if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${this.color}, 0.8)`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Ember());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ---------------------------------------------------------
   2. TYPEWRITER EFFECT FOR RESTAURANT ROLES
   --------------------------------------------------------- */
function initTypewriter() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const words = [
        'Restaurant Supervisor',
        'Automation & AI Specialist',
        'Warehouse & Stock Controller',
        '5 Languages Hospitality Host',
        'Operations Problem Solver'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 85;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1800; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ---------------------------------------------------------
   3. INTERACTIVE RESUME MENU TABS
   --------------------------------------------------------- */
function initMenuTabs() {
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const menuPages = document.querySelectorAll('.menu-page');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            menuPages.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
        });
    });
}

/* ---------------------------------------------------------
   4. SYNTHETIC SERVICE BELL DING & TOAST NOTIFICATION
   --------------------------------------------------------- */
function initServiceBell() {
    const bellBtn = document.getElementById('bell-btn');
    const bellToast = document.getElementById('bell-toast');

    if (!bellBtn) return;

    // Web Audio API Dual Tone Bell Chime (Realistic Ding)
    function playBellSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();

            // Tone 1: High metallic ring
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(1760, ctx.currentTime); // A6
            gain1.gain.setValueAtTime(0.35, ctx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start();
            osc1.stop(ctx.currentTime + 1.4);

            // Tone 2: Warm fundamental
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(880, ctx.currentTime); // A5
            gain2.gain.setValueAtTime(0.2, ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start();
            osc2.stop(ctx.currentTime + 1.2);
        } catch (e) {
            console.log('Web Audio tone played.');
        }
    }

    bellBtn.addEventListener('click', () => {
        playBellSound();

        if (bellToast) {
            bellToast.classList.add('show');
            setTimeout(() => {
                bellToast.classList.remove('show');
            }, 4500);
        }
    });
}

/* ---------------------------------------------------------
   5. MOBILE NAVIGATION MENU
   --------------------------------------------------------- */
function initMobileNav() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });
}

/* ---------------------------------------------------------
   6. HEADER SCROLL BACKGROUND
   --------------------------------------------------------- */
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    });
}

/* ---------------------------------------------------------
   7. SCROLL SPY
   --------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav__list a[href*='${sectionId}']`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
}

/* ---------------------------------------------------------
   8. SCROLL REVEAL ANIMATIONS
   --------------------------------------------------------- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
}

/* ---------------------------------------------------------
   9. TABLE RESERVATION FORM HANDLER
   --------------------------------------------------------- */
function handleReservationSubmit() {
    const nameInput = document.getElementById('res-name');
    const feedback = document.getElementById('res-feedback');
    const submitBtn = document.getElementById('res-submit-btn');

    if (!nameInput || !feedback) return;

    submitBtn.innerHTML = `<span>Sending Reservation...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    submitBtn.disabled = true;

    setTimeout(() => {
        feedback.className = 'res-feedback success';
        feedback.innerHTML = `Thank you <strong>${nameInput.value}</strong>! Your table/inquiry message has been delivered to Supervisor Amdadul Hoque.`;
        
        document.getElementById('reservation-form').reset();
        submitBtn.innerHTML = `<i class="fa-solid fa-utensils"></i> <span>Send Reservation Message</span>`;
        submitBtn.disabled = false;

        setTimeout(() => {
            feedback.style.display = 'none';
        }, 5000);
    }, 800);
}