const bodyStyles = window.getComputedStyle(document.body);
const gridGap = parseInt(bodyStyles.getPropertyValue('--grid-gap'));
const transitionTime = parseFloat(bodyStyles.getPropertyValue('--transition-time')) * 1000;

export {gridGap, transitionTime};