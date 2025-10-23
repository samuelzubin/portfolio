const intro = document.querySelector('.about-intro');
const quote = document.querySelector('em')
const quote_list = ["\"Tell me and I forget. Teach me and I may remember. Involve me and I learn.\"", 
                    "\"When you change the way you look at things, the things you look at change.\"",
                    "\"We are often so caught up with whether or not we could, that we don't stop to think if we should.\""
                ]
let i = 0;

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

function changeQuote() {
    quote.textContent = quote_list[0]
    setInterval(() => {
        i = i + 1
        quote.textContent = quote_list[i % 3]
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

setTimeout(changeQuote, 18000)

window.addEventListener('scroll', beginTyping);
beginTyping();