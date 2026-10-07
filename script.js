const intro    = document.querySelector('.sz-about-intro');
const quoteEl  = document.querySelector('#quote em');
const quoteBox = document.getElementById('quote');
const navLinks = document.querySelectorAll('.sz-nav-link');
const navMenu  = document.getElementById('navMenu');

const QUOTES = [
    `"Tell me and I forget. Teach me and I may remember. Involve me and I learn."`,
    `"When you change the way you look at things, the things you look at change."`,
    `"We are often so caught up with whether or not we could, that we don't stop to think if we should."`,
    `"What I cannot create, I do not understand."`,
];

/* Continue from whichever quote the HTML starts with (-1 if it isn't listed, so the rotation starts at 0) */
let quoteIndex = quoteEl ? QUOTES.indexOf(quoteEl.textContent.trim()) : -1;

/* Close the Bootstrap collapse when a nav link is tapped (mobile) */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (typeof bootstrap === 'undefined') return; /* CDN blocked */
        const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (bsCollapse) bsCollapse.hide();
    });
});

/* Rotate quotes. The CSS animation wipes the text in and back out to fully hidden
   once per iteration, so swap the text exactly when an iteration ends. With
   prefers-reduced-motion there is no animation, so no event fires and the first
   quote simply stays. */
if (quoteBox && quoteEl) {
    quoteBox.addEventListener('animationiteration', e => {
        if (e.animationName !== 'quote-fade') return;
        quoteIndex = (quoteIndex + 1) % QUOTES.length;
        quoteEl.textContent = QUOTES[quoteIndex];
    });
}

/* Typewriter: start when the heading scrolls into view */
if (intro) {
    if ('IntersectionObserver' in window) {
        const typeObserver = new IntersectionObserver((entries, obs) => {
            if (entries.some(entry => entry.isIntersecting)) {
                intro.classList.add('animate');
                obs.disconnect();
            }
        });
        typeObserver.observe(intro.parentElement);
    } else {
        intro.classList.add('animate');
    }
}


/* Theme toggle (initial theme is applied by the inline script in <head>) */
const themeToggle = document.getElementById('themeToggle');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}

function switchTheme(next) {
    const root = document.documentElement;

    /* Reduced motion: switch instantly */
    if (prefersReducedMotion.matches) {
        applyTheme(next);
        return;
    }

    /* Icon spin-in */
    themeToggle.classList.remove('is-toggling');
    void themeToggle.offsetWidth; /* restart the animation if clicked again quickly */
    themeToggle.classList.add('is-toggling');

    /* Best case: a circular reveal that grows out of the button (View Transitions API) */
    if (typeof document.startViewTransition === 'function') {
        const rect = themeToggle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

        const transition = document.startViewTransition(() => applyTheme(next));
        transition.ready.then(() => {
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 550, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
            );
        }).catch(() => {});
        return;
    }

    /* Fallback: fade colors for a moment */
    root.classList.add('theme-fade');
    applyTheme(next);
    setTimeout(() => root.classList.remove('theme-fade'), 450);
}

if (themeToggle) {
    applyTheme(document.documentElement.dataset.theme || 'dark');
    themeToggle.addEventListener('click', () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        switchTheme(next);
        try { localStorage.setItem('sz-theme', next); } catch (e) { /* storage blocked */ }
    });
    themeToggle.addEventListener('animationend', () => themeToggle.classList.remove('is-toggling'));
}

/* Image lightbox */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

if (lightbox && typeof lightbox.showModal === 'function') {
    document.querySelectorAll('[data-lightbox]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            lightboxImg.src = trigger.dataset.lightbox;
            lightboxImg.alt = trigger.querySelector('img')?.alt ?? '';
            lightboxCaption.textContent = trigger.dataset.caption ?? '';
            lightbox.showModal();
        });
    });
    /* Click on the backdrop closes it */
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
}

/* Scroll reveal */
const revealEls = document.querySelectorAll('.sz-reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('is-visible'));
}

/* Footer year */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* Demo video: don't autoplay for visitors who prefer reduced motion */
const demoVideo = document.getElementById('demoVideo');
if (demoVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    demoVideo.removeAttribute('autoplay');
    demoVideo.pause();
    demoVideo.controls = true;
}
