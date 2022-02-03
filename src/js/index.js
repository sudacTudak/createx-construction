import '../scss/index.scss'
import Swiper, {Navigation} from 'swiper';
import 'swiper/css';
import './progress';
import { gridGap, transitionTime } from './cssProperties';

if (module.hot) {
	module.hot.accept()
}



const sliderPortfolio = new Swiper('.portfolio__works', {
    modules: [Navigation],
    speed: transitionTime,
    loop: true,
    slidesPerView: 3,
    spaceBetween: gridGap,
    navigation: {
        nextEl: '.portfolio__next',
        prevEl: '.portfolio__prev',
    },
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
