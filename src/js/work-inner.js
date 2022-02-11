import { Swiper, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import '../scss/work-inner.scss';
import { gridGap, transitionTime } from './cssProperties';
import './go-top';
import 'focus-visible';

const workImages = document.querySelector('.work-images__slider');
const workImagesSmall = document.querySelector('.work-images__slider-small');
const similarProjects = document.querySelector('.similar-projects__works');

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

if (similarProjects) {
    const sliderSimilarProjectsWorks = new Swiper(similarProjects, {
        modules: [Navigation],
        speed: transitionTime,
        slidesPerView: 3,
        loop: true,
        spaceBetween: gridGap,
        navigation: {
            nextEl: '.similar-projects__next',
            prevEl: '.similar-projects__prev',
        },
    });
}