import '../scss/about-us.scss';
import Swiper, {Navigation, Thumbs, Scrollbar} from 'swiper';
import 'swiper/css';
import {gridGap, transitionTime} from './cssProperties';

const historyNavWrap = document.querySelector('.nav-history');
const historySliderWrap = document.querySelector('.slider-history');

if (historySliderWrap) {
    const historySlider = new Swiper(historySliderWrap, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: gridGap,
        speed: transitionTime,
        navigation: {
            nextEl: '.history__next',
            prevEl: '.history__prev'
        }
    })

    const historyNavList = document.querySelector('.nav-history__list');
    const historyNavBtns = historyNavList.querySelectorAll('.nav-history__btn');
    const slides = historySliderWrap.querySelectorAll('.swiper-slide');
    let previousActiveBtn = historyNavBtns[0];

    const changeActiveBtn = (btn) => {
        if (previousActiveBtn === btn) {return}

        if (previousActiveBtn) {
            previousActiveBtn.classList.remove("nav-history__btn--active");
        }

        previousActiveBtn = btn;
        btn.classList.add('nav-history__btn--active');
    }

    const switchSlide = (btn) => {
        const index = +btn.getAttribute('data-slide-index');

        if (!slides[index]) {return}

        changeActiveBtn(btn);
        historySlider.slideTo(index);
    }

    historyNavBtns.forEach( (btn, index) => {
        btn.setAttribute('data-slide-index', `${index}`);
    })

    historyNavList.addEventListener('click', (e) => {
        const self = e.target;

        if (self.closest('.nav-history__btn')) {
            switchSlide(self);
        } 
    });

    historySlider.on('slideChange', () => {
        const index = historySlider.activeIndex;
        const nextBtn = historyNavBtns[index];

        if (!nextBtn) {return}

        changeActiveBtn(nextBtn);
    })
}