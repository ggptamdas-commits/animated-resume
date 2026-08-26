/* =========================================================
   EMDADUL - INTERACTIVE & ANIMATED RESUME SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    initCanvasBackground();
    initTypewriter();
    initMobileNav();
    initHeaderScroll();
    initScrollSpy();
    initScrollReveal();
    initStatCounters();
    initCardTilt();
});

/* ---------------------------------------------------------
   1. CANVAS INTERACTIVE PARTICLE NETWORK
   --------------------------------------------------------- */
function initCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];
    const particleCount = Math.min(window.innerWidth < 768 ? 40 : 80, 100);
    const maxDistance = 140;

    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

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

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(139, 92, 246, ';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
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
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + '0.7)';
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color + '0.8)';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    const alpha = (1 - dist / maxDistance) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.shadowBlur = 0;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ---------------------------------------------------------
   2. DYNAMIC TYPEWRITER EFFECT
   --------------------------------------------------------- */
function initTypewriter() {
    const textElement = document.getElementById('typing-text');
    if (!textElement) return;

    const words = [
        'AI & Workflow Engineer',
        'n8n Automation Specialist',
        'Full Stack Web Developer',
        'Cloud Solutions Architect'
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
            typeSpeed = 50;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
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
   3. MOBILE NAVIGATION MENU
   --------------------------------------------------------- */
function initMobileNav() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
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
   4. HEADER SCROLL EFFECT
   --------------------------------------------------------- */
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    });
}

/* ---------------------------------------------------------
   5. SCROLL SPY (ACTIVE NAV LINK)
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
   6. SCROLL REVEAL ANIMATIONS
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
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
}

/* ---------------------------------------------------------
   7. STAT COUNTERS ANIMATION
   --------------------------------------------------------- */
function initStatCounters() {
    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('.stat__number');
    if (!statsSection || counters.length === 0) return;

    let hasStarted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
            hasStarted = true;
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.innerText.includes('%') ? '%' : '+';
                let current = 0;
                const increment = Math.max(1, Math.floor(target / 40));
                const duration = 1500;
                const stepTime = Math.abs(Math.floor(duration / (target / increment)));

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.innerText = current + suffix;
                }, stepTime);
            });
        }
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
}

/* ---------------------------------------------------------
   8. CARD 3D TILT EFFECT ON HOVER
   --------------------------------------------------------- */
function initCardTilt() {
    const cards = document.querySelectorAll('.project__card, .stat__card, .skill__card');
    
    if (window.innerWidth < 768) return; // Skip on mobile devices

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `perspective(1000px) rotateX(${-deltaY * 5}deg) rotateY(${deltaX * 5}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });
}

/* ---------------------------------------------------------
   9. CONTACT FORM HANDLER
   --------------------------------------------------------- */
function handleFormSubmit() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');

    if (!nameInput || !emailInput || !feedback) return;

    submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
    submitBtn.disabled = true;

    setTimeout(() => {
        feedback.className = 'form-feedback success';
        feedback.innerHTML = `Thank you <strong>${nameInput.value}</strong>! Your message has been received. I will reach out to you shortly.`;
        
        document.getElementById('contact-form').reset();
        submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-regular fa-paper-plane"></i>`;
        submitBtn.disabled = false;

        setTimeout(() => {
            feedback.style.display = 'none';
        }, 5000);
    }, 1000);
}