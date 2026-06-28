const intro    = document.querySelector('.sz-about-intro');
const quoteEl  = document.querySelector('#quote em');
const navLinks = document.querySelectorAll('.sz-nav-link');
const navMenu  = document.getElementById('navMenu');

const QUOTES = [
    '"Tell me and I forget. Teach me and I may remember. Involve me and I learn."',
    '"When you change the way you look at things, the things you look at change."',
    '"We are often so caught up with whether or not we could, that we don\'t stop to think if we should."',
];
let quoteIndex = 0;

/* Close the Bootstrap collapse when a nav link is tapped (mobile) */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
        if (bsCollapse) bsCollapse.hide();
    });
});

/* Rotate quotes */
function startQuoteRotation() {
    quoteEl.textContent = QUOTES[0];
    setInterval(() => {
        quoteIndex = (quoteIndex + 1) % QUOTES.length;
        quoteEl.textContent = QUOTES[quoteIndex];
    }, 15000);
}
setTimeout(startQuoteRotation, 18000);

/* Typewriter */
function isOnScreen(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
}

function beginTyping() {
    if (intro && isOnScreen(intro)) {
        intro.classList.add('animate');
        window.removeEventListener('scroll', beginTyping);
    }
}

window.addEventListener('scroll', beginTyping);
beginTyping();