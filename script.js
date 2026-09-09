gsap.registerPlugin(ScrollTrigger);

/* ─── Lenis Smooth Scroll ─── */
let lenis;
if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

/* ─── Smooth scroll redirection for # links ─── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                if (lenis && typeof lenis.scrollTo === 'function') {
                    lenis.scrollTo(targetEl, { duration: 1.2 });
                } else {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });
});

/* ─── Topnav scroll state ─── */
if (document.querySelector('.topnav')) {
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { targets: '.topnav', className: 'scrolled' },
    });
}

/* ─── Hero animations ─── */
if (document.querySelector('.hero-section')) {
    const heroTl = gsap.timeline({ delay: 0.3 });

    if (document.querySelector('.hero-eyebrow-line')) {
        heroTl.from('.hero-eyebrow-line', { scaleX: 0, duration: 0.8, ease: 'power3.out' });
    }

    if (document.querySelector('.hero-eyebrow .eyebrow-accent')) {
        heroTl.from('.hero-eyebrow .eyebrow-accent', { opacity: 0, y: 12, duration: 0.6, ease: 'power3.out' }, '-=0.4');
    }

    // Char-by-char reveal if data-char-reveal element exists (e.g. Our Story page)
    const heroTitleChar = document.querySelector('[data-char-reveal]');
    if (heroTitleChar) {
        const text = heroTitleChar.textContent.trim();
        heroTitleChar.innerHTML = '';
        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00a0' : char;
            heroTitleChar.appendChild(span);
        });
        heroTl.from('.hero-title .char', {
            opacity: 0,
            rotateX: -90,
            y: 20,
            stagger: 0.03,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.2');
    } else if (document.querySelector('.hero-title .line-inner')) {
        heroTl.from('.hero-title .line-inner', {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.08,
            ease: 'expo.out',
        }, '-=0.3');
    }

    if (document.querySelector('.hero-sub')) {
        heroTl.from('.hero-sub', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.5');
    }

    if (document.querySelector('.scroll-cue-line')) {
        heroTl.from('.scroll-cue-line', { scaleY: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3');
    }

    if (document.querySelector('.scroll-cue-text')) {
        heroTl.from('.scroll-cue-text', { opacity: 0, duration: 0.5 }, '-=0.3');
    }

    /* Scroll cue pulse */
    if (document.querySelector('.scroll-cue-line')) {
        gsap.to('.scroll-cue-line', {
            scaleY: 0.5,
            opacity: 0.4,
            duration: 1,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });
    }
    if (document.querySelector('.scroll-cue-text')) {
        gsap.to('.scroll-cue-text', {
            opacity: 0.3,
            duration: 1.2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
        });
    }
}

/* ─── Intro Statement — word-by-word reveal on scroll ─── */
const introEl = document.querySelector('[data-reveal-words]');
if (introEl) {
    const text = introEl.textContent.trim();
    introEl.innerHTML = '';
    text.split(/\s+/).forEach((word) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        introEl.appendChild(span);
        introEl.appendChild(document.createTextNode(' '));
    });

    const words = introEl.querySelectorAll('.word');
    gsap.to(words, {
        opacity: 1,
        stagger: 0.02,
        scrollTrigger: {
            trigger: '.intro-section',
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 0.5,
        },
    });

    if (document.querySelector('.intro-accent-line')) {
        gsap.to('.intro-accent-line', {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.intro-section',
                start: 'top 60%',
                end: 'bottom 40%',
                scrub: 0.3,
            },
        });
    }
}

/* ─── Who We Are — parallax image & text reveals ─── */
if (document.querySelector('.who-section')) {
    if (document.querySelector('.who-image')) {
        gsap.from('.who-image', {
            scale: 1.12,
            ease: 'none',
            scrollTrigger: {
                trigger: '.who-section',
                start: 'top 80%',
                end: 'bottom 20%',
                scrub: 0.5,
            },
        });
    }
    if (document.querySelector('.who-heading')) {
        gsap.from('.who-heading', {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.who-section',
                start: 'top 65%',
            },
        });
    }
    if (document.querySelector('.who-text')) {
        gsap.from('.who-text', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.who-section',
                start: 'top 55%',
            },
        });
    }
}

/* ─── Timeline animations (Our Story page) ─── */
const timelineLineFill = document.querySelector('.timeline-line-fill');
if (timelineLineFill) {
    gsap.to(timelineLineFill, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: '.timeline-wrapper',
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 0.3,
        },
    });
}

const timelineNodes = document.querySelectorAll('.timeline-node');
if (timelineNodes.length > 0) {
    timelineNodes.forEach((node, i) => {
        const dot = node.querySelector('.timeline-dot');
        const contents = node.querySelectorAll('.timeline-node-content');

        if (dot) {
            ScrollTrigger.create({
                trigger: node,
                start: 'top 60%',
                onEnter: () => dot.classList.add('active'),
                onLeaveBack: () => dot.classList.remove('active'),
            });

            gsap.from(dot, {
                scale: 0,
                duration: 0.6,
                ease: 'back.out(2)',
                scrollTrigger: { trigger: node, start: 'top 65%' },
            });
        }

        const isOdd = i % 2 === 0;
        contents.forEach((content, ci) => {
            const xStart = (ci === 0 && isOdd) || (ci === 1 && !isOdd) ? -60 : 60;
            gsap.from(content, {
                opacity: 0,
                x: xStart,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: node, start: 'top 60%' },
            });

            const img = content.querySelector('img');
            if (img) {
                gsap.from(img, {
                    scale: 1.15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: node,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: 0.5,
                    },
                });
            }
        });
    });
}

/* ─── Quote section reveal ─── */
if (document.querySelector('.quote-section')) {
    if (document.querySelector('.quote-mark')) {
        gsap.from('.quote-mark', {
            opacity: 0, scale: 0.8, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.quote-section', start: 'top 60%' },
        });
    }
    if (document.querySelector('.quote-text')) {
        gsap.from('.quote-text', {
            opacity: 0, y: 32, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: '.quote-section', start: 'top 50%' },
        });
    }
    if (document.querySelector('.quote-attribution')) {
        gsap.from('.quote-attribution', {
            opacity: 0, y: 16, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.quote-section', start: 'top 40%' },
        });
    }
}

/* ─── Expertise — marquee animation ─── */
const marquees = document.querySelectorAll('[data-marquee]');
marquees.forEach((track, index) => {
    const totalWidth = track.scrollWidth / 2;
    if (totalWidth > 0) {
        const isReverse = track.dataset.direction === 'reverse' || track.classList.contains('duplicate') || (index % 2 === 1);
        if (isReverse) {
            // Bottom row: Left to Right
            gsap.fromTo(track,
                { x: -totalWidth },
                {
                    x: 0,
                    duration: 30,
                    ease: 'none',
                    repeat: -1,
                }
            );
        } else {
            // Top row: Right to Left
            gsap.fromTo(track,
                { x: 0 },
                {
                    x: -totalWidth,
                    duration: 30,
                    ease: 'none',
                    repeat: -1,
                }
            );
        }
    }
});

/* ─── Expertise — stagger tags ─── */
if (document.querySelector('.marquee-tag')) {
    gsap.from('.marquee-tag', {
        opacity: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.expertise-section',
            start: 'top 70%',
        },
    });
}

/* ─── Counters ─── */
document.querySelectorAll('.expertise-stat').forEach((stat) => {
    const target = parseInt(stat.dataset.count, 10);
    const counterEl = stat.querySelector('.counter');
    if (!counterEl || isNaN(target)) return;
    const obj = { val: 0 };
    gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: stat,
            start: 'top 80%',
        },
        onUpdate: () => {
            counterEl.textContent = Math.round(obj.val).toLocaleString();
        },
    });
});

/* ─── As Seen On — logo marquee ─── */
const logosTrack = document.querySelector('[data-marquee-logos]');
if (logosTrack) {
    const logosWidth = logosTrack.scrollWidth;
    gsap.to(logosTrack, {
        x: -logosWidth,
        duration: 40,
        ease: 'none',
        repeat: -1,
    });
}

/* ─── Capability — radar sweep rotation ─── */
if (document.querySelector('.radar-sweep')) {
    gsap.to('.radar-sweep', {
        rotation: 360,
        duration: 12,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
    });
}

/* ─── Capability — chips stagger ─── */
if (document.querySelector('.capability-chips')) {
    gsap.from('.capability-chip', {
        opacity: 0,
        y: 24,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.capability-chips',
            start: 'top 85%',
        },
    });
}
if (document.querySelector('.capability-content')) {
    gsap.from('.capability-heading', {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.capability-content',
            start: 'top 70%',
        },
    });
}

/* ─── CTA — magnetic button ─── */
const magneticBtn = document.querySelector('[data-magnetic]');
if (magneticBtn) {
    magneticBtn.addEventListener('mousemove', (e) => {
        const rect = magneticBtn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(magneticBtn, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.4,
            ease: 'power2.out',
        });
    });
    magneticBtn.addEventListener('mouseleave', () => {
        gsap.to(magneticBtn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    });
}

/* ─── CTA section reveal ─── */
if (document.querySelector('.cta-section')) {
    gsap.from('.cta-heading', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 65%',
        },
    });
    gsap.from('.cta-text', {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 55%',
        },
    });
    gsap.from('.cta-btn', {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 50%',
        },
    });
}

/* ─── Prefers reduced motion ─── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    if (lenis && typeof lenis.destroy === 'function') {
        lenis.destroy();
    }
    gsap.globalTimeline.clear();
    gsap.killTweensOf('*');
    document.querySelectorAll('.reveal, .mask-reveal, .char').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.clipPath = 'none';
    });
    document.querySelectorAll('.timeline-dot').forEach(d => d.classList.add('active'));
    document.querySelectorAll('.hero-sub, .scroll-cue-line, .scroll-cue-text').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
    if (timelineLineFill) timelineLineFill.style.height = '100%';
}

/* ─── Mobile Hamburger Toggle ─── */
const hamburgerBtn = document.getElementById('hamburger-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const topnav = document.querySelector('.topnav');

if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        mobileDrawer.classList.toggle('active');
        if (topnav) topnav.classList.toggle('drawer-open');
        document.body.classList.toggle('no-scroll');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('active');
            mobileDrawer.classList.remove('active');
            if (topnav) topnav.classList.remove('drawer-open');
            document.body.classList.remove('no-scroll');
        });
    });
}

/* ─── Back to Top Button ─── */
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        if (typeof lenis !== 'undefined' && lenis && typeof lenis.scrollTo === 'function') {
            lenis.scrollTo(0, { duration: 1.2 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}
