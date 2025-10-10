const intro = document.querySelector('.about-intro');

function isOnScreen(div) {
    const rect = div.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom >= 0;
}

function checkScroll() {
    if (isOnScreen(intro)) {
        intro.classList.add('animate');
        window.removeEventListener('scroll', checkScroll);
    }
}

window.addEventListener('scroll', checkScroll);
checkScroll();