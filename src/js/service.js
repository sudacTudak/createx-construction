import Accordion from './vendors/Accordion';
import Swiper, {Navigation} from 'swiper';
import 'swiper/css';
import '../scss/service.scss';
import './go-top';
import 'focus-visible';
import { gridGap, transitionTime } from './cssProperties';

const startCounter = () => {
    const counters = document.querySelectorAll('.how-we-do__counter');

    if (counters) {
        let count = 0;
    
        counters.forEach(counter => {
            count++;
            count < 10 ? counter.textContent = `0${count}` : counter.textContent = count;
            counter.setAttribute('aria-label', `${count}`);
        })
    }
}

if (document.querySelector('.we-offer__accordion')) {
    const accordionOffer = new Accordion('.we-offer__accordion', {});
}

if (document.querySelector('.related-projects__works')) {
    const sliderRelatedProjects = new Swiper('.related-projects__works', {
        modules: [Navigation],
        speed: transitionTime,
        spaceBetween: gridGap,
        loop: true,
        slidesPerView: 3,
        navigation: {
            nextEl: '.related-projects__next',
            prevEl: '.related-projects__prev'
        }
    })
}

startCounter();

