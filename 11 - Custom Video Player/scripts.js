const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const max = player.querySelector('.maximize');
const maxvid = document.querySelector('video');

// build our functions

function togglePlay() {
  video.paused ? video.play() : video.pause();
};

function updateButton() {
  this.paused ? toggle.textContent = '►' : toggle.textContent = '❚ ❚';
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
};

function handleRangeUpdate() {
  video[this.name] = this.value;
};

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

function toggleMax() {
  if(maxvid.requestFullscreen) {
    maxvid.requestFullscreen();
  } else if(maxvid.mozRequestFullScreen) {
    maxvid.mozRequestFullScreen();
  } else if(maxvid.webkitRequestFullscreen) {
    maxvid.webkitRequestFullscreen();
  } else if(maxvid.msRequestFullscreen) {
    maxvid.msRequestFullscreen();
  }
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true );
progress.addEventListener('mouseup', () => mouseDown = false );
max.addEventListener('click', toggleMax);

