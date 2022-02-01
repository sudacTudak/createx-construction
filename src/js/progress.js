const progressElements = document.querySelectorAll('[data-progress-circle]');

const animateProgress = (circle, value, target, output, percentage = true) => {
    let percentageProgress = value / target * 100;

    const radius = +circle.getAttribute('r');
    const circleLength = 2 * Math.PI * radius;

    circle.setAttribute('stroke-dasharray', circleLength);
    circle.setAttribute('stroke-dashoffset', circleLength - circleLength * percentageProgress / 100);

    percentage ? output.textContent = `${value}%` : output.textContent = value;
}

progressElements.forEach(el => {
    const circle = el.querySelector('.progress');
    const value = el.dataset.progressValue;
    const target = el.dataset.progressTarget;
    const output = el.querySelector('[data-progress-show]');
    let percentage = true;

    el.dataset.progressCircle === 'number' ? percentage = false : percentage = true;

    animateProgress(circle, value, target, output, percentage);
});