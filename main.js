"use strict";

const _PlayPauseButton = document.querySelector("#play-pause");
const _Video = document.querySelector("video");
const _RewindButton = document.querySelector("#rewind");
const _FastForwardButton = document.querySelector("#fast-forward");
const _VolumeButton = document.querySelector("#volume");
const _ProgressIndicator = document.querySelector("#progress-indicator");
const _ProgressBar = document.querySelector("#progress-bar");

function PlayPause() {
  _Video.paused ? _Video.play() : _Video.pause();
}

function UpdatePlayPauseIcon() {
  const icon = _PlayPauseButton.querySelector("i");
  icon.textContent = "";

  icon.textContent = _Video.paused ? "play_arrow" : "paused";
}

function RewindForward(type) {
  _Video.currentTime += type === "rewind" ? -10 : 10;
}

function MuteUnmute() {
  _Video.muted = !_Video.muted;
}

function UpdateVolumeIcon() {
  const icon = _VolumeButton.querySelector("i");
  icon.textContent = "";
  icon.textContent = _Video.muted ? "volume_off" : "volume_up";
}

function UpdateProgress() {
  const progressPercentage = (_Video.currentTime / _Video.duration) * 100;

  _ProgressIndicator.style.width = `${progressPercentage}%`;
}

function Seeking(e) {
  _Video.currentTime = (e.offsetX / _ProgressBar.offsetWidth) * _Video.duration;
}

// Error handling and status messages
const showMessage = (message, type = 'error') => {
  const messageContainer = document.createElement('div');
  messageContainer.className = `message ${type} absolute top-4 right-4 p-4 rounded-lg text-white ${type === 'error' ? 'bg-red-600' : 'bg-green-600'} opacity-0 transition-opacity duration-300`;
  messageContainer.textContent = message;
  document.querySelector('#container').appendChild(messageContainer);
  
  // Show message
  setTimeout(() => messageContainer.classList.add('opacity-100'), 100);
  
  // Remove message after 3 seconds
  setTimeout(() => {
    messageContainer.classList.remove('opacity-100');
    setTimeout(() => messageContainer.remove(), 300);
  }, 3000);
};

// Enhanced error handling for video
_Video.addEventListener('error', () => {
  const error = _Video.error;
  let message = 'An error occurred while playing the video.';
  
  switch (error.code) {
    case 1:
      message = 'Video loading was aborted.';
      break;
    case 2:
      message = 'Network error occurred while loading the video.';
      break;
    case 3:
      message = 'Error decoding video file.';
      break;
    case 4:
      message = 'Video format not supported.';
      break;
  }
  
  showMessage(message);
});

// Loading state handling
_Video.addEventListener('waiting', () => {
  const loadingSpinner = document.createElement('div');
  loadingSpinner.id = 'loading-spinner';
  loadingSpinner.className = 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
  loadingSpinner.innerHTML = '<i class="material-icons animate-spin text-white text-4xl">refresh</i>';
  document.querySelector('#container').appendChild(loadingSpinner);
});

_Video.addEventListener('playing', () => {
  const spinner = document.querySelector('#loading-spinner');
  if (spinner) spinner.remove();
});

// PLAY AND PAUSE FUNCTIONALITY
_Video.addEventListener("play", UpdatePlayPauseIcon);
_Video.addEventListener("click", PlayPause);
_Video.addEventListener("pause", UpdatePlayPauseIcon);
_PlayPauseButton.addEventListener("click", PlayPause);

// REWIND AND FAST FORWARD
_RewindButton.addEventListener("click", () => RewindForward("rewind"));
_FastForwardButton.addEventListener("click", () => RewindForward("forward"));

// MUTE AND UNMUTE
_Video.addEventListener("volumechange", UpdateVolumeIcon);
_VolumeButton.addEventListener("click", MuteUnmute);

// PROGRESS
_Video.addEventListener("timeupdate", UpdateProgress);

// SEEKING
let mouseIsDown = false;

_ProgressBar.addEventListener("mousedown", () => (mouseIsDown = true));
_ProgressBar.addEventListener("mouseup", () => (mouseIsDown = false));
_ProgressBar.addEventListener("click", Seeking);
_ProgressBar.addEventListener("mousemove", () => mouseIsDown && Seeking);

// Enhanced keyboard controls
const VOLUME_STEP = 0.1;
const SEEK_STEP = 5;

window.addEventListener('keydown', (e) => {
  // Prevent default behavior for media keys
  if (['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'KeyM', 'KeyF'].includes(e.code)) {
    e.preventDefault();
  }
  
  switch(e.code) {
    case 'Space':
      PlayPause();
      break;
    case 'ArrowLeft':
      if (e.shiftKey) {
        RewindForward('rewind');  // 10 seconds back
      } else {
        _Video.currentTime -= SEEK_STEP;  // 5 seconds back
      }
      break;
    case 'ArrowRight':
      if (e.shiftKey) {
        RewindForward('forward');  // 10 seconds forward
      } else {
        _Video.currentTime += SEEK_STEP;  // 5 seconds forward
      }
      break;
    case 'ArrowUp':
      _Video.volume = Math.min(1, _Video.volume + VOLUME_STEP);
      showMessage(`Volume: ${Math.round(_Video.volume * 100)}%`, 'info');
      break;
    case 'ArrowDown':
      _Video.volume = Math.max(0, _Video.volume - VOLUME_STEP);
      showMessage(`Volume: ${Math.round(_Video.volume * 100)}%`, 'info');
      break;
    case 'KeyM':
      MuteUnmute();
      break;
    case 'KeyF':
      toggleFullscreen();
      break;
  }
});

// Fullscreen functionality
function toggleFullscreen() {
  const container = document.querySelector('#container');
  if (!document.fullscreenElement) {
    container.requestFullscreen().catch(err => {
      showMessage('Error attempting to enable fullscreen: ' + err.message);
    });
  } else {
    document.exitFullscreen();
  }
}
