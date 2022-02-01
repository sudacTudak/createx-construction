const bodyStyles = window.getComputedStyle(document.body);
const gridGap = parseInt(bodyStyles.getPropertyValue('--grid-gap'));

export {gridGap};