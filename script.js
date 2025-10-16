const intro = document.querySelector('.about-intro');
let clicked = false;

function toggleMenu() {
    const menu = document.getElementById("menu");
    
    if (!clicked) {
        menu.style.visibility = "visible";
        menu.classList.add('open');
        clicked = true;
    }
    
    else {
        menu.classList.remove('open');
        clicked = false;
    }
}

function closeMenu() {
    clicked = true;
    toggleMenu();
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

window.addEventListener('scroll', beginTyping);
beginTyping();