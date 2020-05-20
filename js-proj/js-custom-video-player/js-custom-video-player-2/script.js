const video = document.getElementById('video');
const play = document.getElementById('play');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');
const volume = document.getElementById('volume');
const stop = document.getElementById('stop');
const container = document.querySelector('.container');
const settings = document.getElementById('settings');
const dropdown = document.getElementById('dropdown');

initialHoverEffect();

progress.oninput = forOnInput(progress);

// Play and Pause Video
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  if (dropdown.classList.contains('dropdown-visible')) {
    showDropdown();
  }
}

// Update Play/Pause Icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
    container.insertAdjacentHTML(
      'afterbegin',
      '<ion-icon class="play-btn-onscreen" id="play-btn-onscreen" style="color: #d4d4d4" name="play-circle-outline"></ion-icon>'
    );
    onScreenPlayBtnClick();
  } else {
    play.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
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
  if (dropdown.classList.contains('dropdown-visible')) {
    showDropdown();
  }
}

// Mute volume
function setVolume() {
  if (!video.muted) {
    video.muted = true;
    volume.innerHTML = '<ion-icon name="volume-mute-outline"></ion-icon>';
  } else {
    video.muted = false;
    volume.innerHTML = '<ion-icon name="volume-high-outline"></ion-icon>';
  }
  if (dropdown.classList.contains('dropdown-visible')) {
    showDropdown();
  }
}

// Set color on video progress
function forOnInput(element) {
  element.style.background =
    'linear-gradient(to right, #fff 0%, #fff ' +
    element.value +
    '%, transparent ' +
    element.value +
    '%, transparent 100%)';
}

// Set play button on screen on video pause
function onScreenPlayBtnClick() {
  if (dropdown.classList.contains('dropdown-visible')) {
    showDropdown();
  }
  const onScreenPlayBtn = document.getElementById('play-btn-onscreen');

  if (onScreenPlayBtn) {
    onScreenPlayBtn.addEventListener('click', toggleVideoStatus);
  }
}

//Hover visibility effect on page load
function initialHoverEffect() {
  const controls = document.querySelector('.controls');
  controls.classList.add('visibility');
  setTimeout(() => {
    controls.classList.remove('visibility');
  }, 3000);
}

function showDropdown() {
  dropdown.classList.toggle('dropdown-visible');
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
settings.addEventListener('click', showDropdown);
