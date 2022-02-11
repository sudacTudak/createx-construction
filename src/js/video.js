const videoBlock = document.querySelector('.about-section__video');
const video = videoBlock.querySelector('video');
const playBtn = videoBlock.querySelector('.block-video__play');

const pauseVideo = () => {
    video.controls = false;
    videoBlock.classList.remove('block-video--played');
    playBtn.classList.remove('block-video__play--played');
}

const startVideo = () => {
    videoBlock.classList.add('block-video--played');
    playBtn.classList.add('block-video__play--played');
    video.play();
    video.controls = true;
}

playBtn.addEventListener('click', startVideo);
video.addEventListener('pause', pauseVideo);