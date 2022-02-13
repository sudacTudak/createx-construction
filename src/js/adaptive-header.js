import {transitionTime, openMenuTime} from './cssProperties';

const burgerBtn = document.querySelector('.icon-menu');
const navBody = document.querySelector('.nav');
const contactsHeader = document.querySelector('.contacts-header');
let isOpen = false;

const lockPadding = () => {
    const body = document.body;
    const fixBlocks = document.querySelectorAll('.fix-block');
    const paddingOffset = window.innerWidth - body.offsetWidth + 'px';

    fixBlocks.forEach(block => {
        block.style.paddingRight = paddingOffset;
    });
    body.style.paddingRight = paddingOffset;
}

const unlockPadding = () => {
    const body = document.body;
    const fixBlocks = document.querySelectorAll('.fix-block');

    fixBlocks.forEach(block => {
        block.style.paddingRight = 0 + 'px';
    });
    body.style.paddingRight = 0 + 'px';
}

const disableScroll = () => {
    const body = document.body;
    const currentPosition = window.scrollY;

    lockPadding();
    body.classList.add('disable-scroll')
    body.dataset.position = currentPosition;
    body.style.top = currentPosition + 'px';
}

const enableScroll = () => {
    const body = document.body;
    const currentPosition = parseInt(body.dataset.position, 10);

    unlockPadding();
    body.style.top = '';
    body.classList.remove('disable-scroll');
    window.scrollTo({top: currentPosition, left: 0});
    body.removeAttribute('data-position');
}

const openMenu = () => {
    burgerBtn.setAttribute('disabled', 'true');
    disableScroll();
    navBody.classList.add('is-open');
    burgerBtn.classList.add('--active');

    setTimeout(() => {
        isOpen = true;
        burgerBtn.removeAttribute('disabled');
    }, openMenuTime)
}

const closeMenu = () => {
    burgerBtn.setAttribute('disabled', 'true');
    navBody.classList.remove('is-open');
    burgerBtn.classList.remove('--active');

    setTimeout(() => {
        isOpen = false;
        burgerBtn.removeAttribute('disabled');
        enableScroll();
    }, openMenuTime)
}

if (burgerBtn && navBody) {
    burgerBtn.addEventListener('click', () => {
        isOpen ? closeMenu(): openMenu();
    });
}

const replaceContacts = () => {
    const pageWidth = Math.max(document.documentElement.offsetWidth, 
        document.documentElement.clientWidth,
        document.documentElement.scrollWidth);

    if (pageWidth <= 1024) {
        const navList = navBody.querySelector('.nav__list');

        navList.after(contactsHeader);
    } else {
        const headerContainer = document.querySelector('.header__container');

        headerContainer.append(contactsHeader);
    }
}


if (contactsHeader) {
    replaceContacts();

    window.addEventListener('resize', () => {
        replaceContacts();
    })
}


