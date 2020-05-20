const video = document.getElementById('video');
const play = document.getElementById('play');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const volume = document.getElementById('volume');
const stop = document.getElementById('stop');
// const next = document.getElementById('next');
// const expand = document.getElementById('expand');
const container = document.querySelector('.container');
const volSlider = document.getElementById('volume-slider');

initialHoverEffect();

volSlider.oninput = forOnInput(volSlider);
progress.oninput = forOnInput(progress);

// Play and Pause Video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play/Pause Icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<ion-icon name="play"></ion-icon>';
    container.insertAdjacentHTML(
      'afterbegin',
      '<ion-icon class="play-btn-onscreen" id="play-btn-onscreen" name="play-circle"></ion-icon>'
    );
    onScreenPlayBtnClick();
  } else {
    play.innerHTML = '<ion-icon name="pause"></ion-icon>';
    container.firstChild.remove();
  }
}

// Update progress and timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  forOnInput(progress);

  // Get Minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = '0' + String(mins);
  }

  // Get Seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = '0' + String(secs);
  }

  // Total duration
  let durationMin = Math.floor(video.duration / 60);
  let durationSec = Math.floor(video.duration % 60);

  if (durationMin < 10) {
    durationMin = '0' + String(durationMin);
  }
  if (durationSec < 10) {
    durationSec = '0' + String(durationSec);
  }

  timestamp.innerHTML = `${mins}: ${secs} / ${durationMin}: ${durationSec}`;
}

// Set the video progress on manual input range change
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

// Mute volume
function setVolume() {
  if (!video.muted) {
    video.muted = true;
    volume.innerHTML = '<ion-icon name="volume-mute"></ion-icon>';
    volSlider.value = 0;
    forOnInput(volSlider);
  } else {
    video.muted = false;
    volume.innerHTML = '<ion-icon name="volume-high"></ion-icon>';
    volSlider.value = 50;
    forOnInput(volSlider);
  }
}

// Set color on video progress
function forOnInput(element) {
  element.style.background =
    'linear-gradient(to right, #f8b864 0%, #f8b864 ' +
    element.value +
    '%, #b8b8b8 ' +
    element.value +
    '%, #b8b8b8 100%)';
}

// Set play button on screen on video pause
function onScreenPlayBtnClick() {
  const onScreenPlayBtn = document.getElementById('play-btn-onscreen');

  if (onScreenPlayBtn) {
    onScreenPlayBtn.addEventListener('click', toggleVideoStatus);
  }
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Set volume slider panel
function setVolumeRange() {
  video.volume = volSlider.value / 100;
  forOnInput(volSlider);
}

// function nextVideo() {
//   console.log(progress.value);
//   let vidArr = ['videoplayback.mp4', 'gone.mp4'];

//   video.src = 'assets/videos/' + vidArr[0 + 1];
// }

// Set full screen
// function fullScreen() {
//   if (expand.requestFullscreen) {
//     expand.requestFullscreen();
//   } else if (expand.mozRequestFullScreen) {
//     /* Firefox */
//     expand.mozRequestFullScreen();
//   } else if (expand.webkitRequestFullscreen) {
//     /* Chrome, Safari & Opera */
//     expand.webkitRequestFullscreen();
//   } else if (expand.msRequestFullscreen) {
//     /* IE/Edge */
//     expand.msRequestFullscreen();
//   }
// }

//Hover visibility effect on page load
function initialHoverEffect() {
  const controls = document.querySelector('.controls');
  controls.classList.add('visibility');
  setTimeout(() => {
    controls.classList.remove('visibility');
  }, 3000);
}

// keyboard functionality
document.addEventListener('keydown', function (event) {
  if (event.keyCode === '32' || event.which === 32) {
    toggleVideoStatus();
  }
});

// Eventlistener
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

progress.addEventListener('change', setVideoProgress);
play.addEventListener('click', toggleVideoStatus);
volume.addEventListener('click', setVolume);
stop.addEventListener('click', stopVideo);
// next.addEventListener('click', nextVideo);
// expand.addEventListener('click', fullScreen);
volSlider.addEventListener('change', setVolumeRange);
