const bodyStyles = window.getComputedStyle(document.body);
const headerStyles = window.getComputedStyle(document.querySelector('.header'));
const gridGap = parseInt(bodyStyles.getPropertyValue('--grid-gap'));
const transitionTime = parseFloat(bodyStyles.getPropertyValue('--transition-time')) * 1000;
const openMenuTime = parseFloat(headerStyles.getPropertyValue('--open-menu-time')) * 1000;
const mainSliderSpeed = 1500;
const mainSliderAutoplayDelay = 5000;

document.body.style.setProperty('--main-slider-speed', `${mainSliderSpeed}ms`);

export { gridGap, transitionTime, mainSliderSpeed, mainSliderAutoplayDelay, openMenuTime };