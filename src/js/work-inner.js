import '../scss/work-inner.scss';
import { Swiper, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import {gridGap, transitionTime} from './cssProperties';

const workImages = document.querySelector('.work-images__slider');
const workImagesSmall = document.querySelector('.work-images__slider-small');
const similarProjectsWorks = document.querySelector('.similar-projects__works')

if (workImages) {
    const sliderWorkImagesSmall = new Swiper(workImagesSmall, {
        modules: [Navigation, Thumbs],
        spaceBetween: 20,
        slidesPerView: 10,
        speed: transitionTime,
        freeMode: true,
        watchSlidesProgress: true,
    });
    
    const sliderWorkImages = new Swiper(workImages, {
        modules: [Navigation, Thumbs],
        slidesPerView: 1,
        spaceBetween: 20,
        speed: transitionTime,
        thumbs: {
            swiper: sliderWorkImagesSmall,
        },
        navigation: {
            nextEl: '.work-images__next',
            prevEl: '.work-images__prev'
        }
    });
}

if (similarProjectsWorks) {
    const sliderSimilarProjectsWorks = new Swiper(similarProjectsWorks, {
        modules: [Navigation],
        speed: transitionTime,
        loop: true,
        slidesPerView: 3,
        spaceBetween: gridGap,
        navigation: {
            nextEl: '.similar-projects__next',
            prevEl: '.similar-projects__prev',
        },
    })
}