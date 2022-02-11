import smoothScrollPolyfillsMin from "smooth-scroll";

const heroMain = document.querySelector('.hero');
const heroPage = document.querySelector('.page-hero');
const goTopBtn = document.querySelector('.go-top');

const showGoTop = (trigger, y = 0) => {
    const triggerHeight = trigger.offsetHeight;
    if (y >= triggerHeight) {
        goTopBtn.classList.add('go-top--is-active');
    } else {
        goTopBtn.classList.remove('go-top--is-active');
    }
}

const checkScroll = (trigger) => {
    let y = window.scrollY;

    showGoTop(trigger, y);
}

const scrollTop = new smoothScrollPolyfillsMin('.go-top', {
    speed: 300,
});

if (heroMain) {
    showGoTop(heroMain);
    window.addEventListener('scroll', () => {
        checkScroll(heroMain)
    });
} else {
    showGoTop(heroPage);
    window.addEventListener('scroll', () => {
        checkScroll(heroPage)
    });
}
