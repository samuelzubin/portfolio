const intro = document.querySelector('.about-intro');
const quote = document.querySelector('em');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

const quote_list = [
    "\"Tell me and I forget. Teach me and I may remember. Involve me and I learn.\"",
    "\"When you change the way you look at things, the things you look at change.\"",
    "\"We are often so caught up with whether or not we could, that we don't stop to think if we should.\""
];
let i = 0;

function toggleMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
}

function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
}

function changeQuote() {
    quote.textContent = quote_list[0];
    setInterval(() => {
        i = (i + 1) % quote_list.length;
        quote.textContent = quote_list[i];
    }, 15000);
}

function isOnScreen(div) {
    const rect = div.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
}

function beginTyping() {
    if (isOnScreen(intro)) {
        intro.classList.add('animate');
        window.removeEventListener('scroll', beginTyping);
    }
}

navToggle.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

setTimeout(changeQuote, 18000);
window.addEventListener('scroll', beginTyping);
beginTyping();
