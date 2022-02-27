import '../scss/index.scss';
import './go-top';
import 'focus-visible';
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';
import 'swiper/css';
import { gridGap, transitionTime, mainSliderSpeed, mainSliderAutoplayDelay } from './cssProperties';
import './adaptive-header';
import './progress';
import './video';
import './forms';

if (module.hot) {
	module.hot.accept()
}


const sliderHeroMain = new Swiper('.hero-slider ', {
    modules: [Navigation, Pagination, Autoplay],
    speed: mainSliderSpeed,
    loop: false,
    slidesPerView: 1,
    autoplay: {
        delay: mainSliderAutoplayDelay,
        disableOnInteraction: true,
    },
    navigation: {
        nextEl: '.hero-slider__next',
        prevEl: '.hero-slider__prev',
    },

    pagination: {
        el: '.hero-slider__pagination',
        type: 'bullets',
        clickable: true,
    },
    on: {
        'init': () => {
            const paginationItems = document.
                querySelectorAll('.hero-slider__pagination .swiper-pagination-bullet');
            let counter = 0;

            paginationItems.forEach(el => {
                counter++;

                el.textContent = counter < 10 ? `0${counter}` : `${counter}`;
                el.innerHTML += '<span class="hero-slider__bar"></span>'
            })
        }
    },
});


const sliderPortfolio = new Swiper('.portfolio-section__works', {
    modules: [Navigation],
    speed: transitionTime,
    loop: true,
    slidesPerView: 1,
    spaceBetween: gridGap,
    navigation: {
        nextEl: '.portfolio-section__next',
        prevEl: '.portfolio-section__prev',
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        }
    }
});

const sliderTestimonials = new Swiper('.testimonials__items', {
    modules: [Navigation],
    speed: transitionTime,
    slidesPerView: 1,
    loop: true,
    navigation: {
        nextEl: '.testimonials__next',
        prevEl: '.testimonials__prev',
    },
});
