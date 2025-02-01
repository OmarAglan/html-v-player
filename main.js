// Get DOM elements
const _Video = document.querySelector("video");
const _Controls = document.getElementById("controls");
const _PlayPauseButton = document.getElementById("play-pause");
const _RewindButton = document.getElementById("rewind");
const _FastForwardButton = document.getElementById("fast-forward");
const _VolumeButton = document.getElementById("volume");
const _VolumeSlider = document.getElementById("volume-slider");
const _FullscreenButton = document.getElementById("fullscreen");
const _ProgressBar = document.getElementById("progress-bar");
const _ProgressIndicator = document.getElementById("progress-indicator");
const _CurrentTime = document.getElementById("current-time");
const _Duration = document.getElementById("duration");
const _LoadingSpinner = document.getElementById("loading-spinner");
const _ErrorMessage = document.getElementById("error-message");
const _CinemaModeToggle = document.getElementById("cinema-mode-toggle");
const _CinemaMode = document.getElementById("cinema-mode");

// State
let isPlaying = false;
let isCinemaMode = false;
let previousVolume = 1;

// Initialize
_Video.volume = _VolumeSlider.value / 100;

// Format time in MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Update progress bar
function UpdateProgress() {
  const progress = (_Video.currentTime / _Video.duration) * 100;
  _ProgressIndicator.style.width = `${progress}%`;
  _CurrentTime.textContent = formatTime(_Video.currentTime);
  _Duration.textContent = formatTime(_Video.duration);
}

// Play/Pause
function PlayPause() {
  if (_Video.paused) {
    _Video.play().catch(handleError);
    _PlayPauseButton.querySelector("i").classList.replace("ph-play", "ph-pause");
    isPlaying = true;
  } else {
    _Video.pause();
    _PlayPauseButton.querySelector("i").classList.replace("ph-pause", "ph-play");
    isPlaying = false;
  }
}

// Volume control
function UpdateVolumeIcon() {
  const volumeIcon = _VolumeButton.querySelector("i");
  volumeIcon.classList.remove("ph-speaker-none", "ph-speaker-low", "ph-speaker-high");
  
  if (_Video.volume === 0) {
    volumeIcon.classList.add("ph-speaker-none");
  } else if (_Video.volume < 0.5) {
    volumeIcon.classList.add("ph-speaker-low");
  } else {
    volumeIcon.classList.add("ph-speaker-high");
  }
}

function MuteUnmute() {
  if (_Video.volume === 0) {
    _Video.volume = previousVolume;
    _VolumeSlider.value = previousVolume * 100;
  } else {
    previousVolume = _Video.volume;
    _Video.volume = 0;
    _VolumeSlider.value = 0;
  }
  UpdateVolumeIcon();
}

// Cinema mode
function toggleCinemaMode() {
  isCinemaMode = !isCinemaMode;
  _CinemaMode.classList.toggle('active');
  document.body.classList.toggle('cinema-mode');
  
  // Update icon
  const icon = _CinemaModeToggle.querySelector('i');
  icon.className = isCinemaMode ? 'ph ph-monitor-x text-white text-3xl sm:text-4xl' : 'ph ph-monitor-play text-white text-3xl sm:text-4xl';
}

_CinemaModeToggle.addEventListener('click', toggleCinemaMode);

// Exit cinema mode when clicking outside video
document.addEventListener('click', (e) => {
  if (isCinemaMode && !_Video.parentElement.contains(e.target) && !_CinemaModeToggle.contains(e.target)) {
    toggleCinemaMode();
  }
});

// Fullscreen
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    _Video.parentElement.parentElement.requestFullscreen().catch(err => {
      handleError(err);
    });
    _FullscreenButton.querySelector("i").classList.replace("ph-corners-out", "ph-corners-in");
  } else {
    document.exitFullscreen();
    _FullscreenButton.querySelector("i").classList.replace("ph-corners-in", "ph-corners-out");
  }
}

// Event listeners
_PlayPauseButton.addEventListener("click", PlayPause);
_Video.addEventListener("click", PlayPause);
_Video.addEventListener("timeupdate", UpdateProgress);

_RewindButton.addEventListener("click", () => {
  _Video.currentTime = Math.max(_Video.currentTime - 10, 0);
});

_FastForwardButton.addEventListener("click", () => {
  _Video.currentTime = Math.min(_Video.currentTime + 10, _Video.duration);
});

_VolumeButton.addEventListener("click", MuteUnmute);
_VolumeSlider.addEventListener("input", (e) => {
  _Video.volume = e.target.value / 100;
  UpdateVolumeIcon();
});

_FullscreenButton.addEventListener("click", toggleFullscreen);

_ProgressBar.addEventListener("click", (e) => {
  const rect = _ProgressBar.getBoundingClientRect();
  const pos = (e.clientX - rect.left) / rect.width;
  _Video.currentTime = pos * _Video.duration;
});

// Loading and error handling
_Video.addEventListener("waiting", () => {
  _LoadingSpinner.classList.remove("hidden");
});

_Video.addEventListener("canplay", () => {
  _LoadingSpinner.classList.add("hidden");
});

_Video.addEventListener("error", () => {
  _ErrorMessage.classList.remove("hidden");
  _ErrorMessage.querySelector("p").textContent = "Error loading video";
});

// Keyboard controls
window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    PlayPause();
  } else if (e.code === "ArrowLeft") {
    _Video.currentTime = Math.max(_Video.currentTime - 5, 0);
  } else if (e.code === "ArrowRight") {
    _Video.currentTime = Math.min(_Video.currentTime + 5, _Video.duration);
  } else if (e.code === "ArrowUp") {
    _Video.volume = Math.min(_Video.volume + 0.1, 1);
    _VolumeSlider.value = _Video.volume * 100;
    UpdateVolumeIcon();
  } else if (e.code === "ArrowDown") {
    _Video.volume = Math.max(_Video.volume - 0.1, 0);
    _VolumeSlider.value = _Video.volume * 100;
    UpdateVolumeIcon();
  } else if (e.code === "KeyF") {
    toggleFullscreen();
  } else if (e.code === "KeyM") {
    MuteUnmute();
  } else if (e.code === "KeyC") {
    toggleCinemaMode();
  }
});

// Video event listeners
_Video.addEventListener("play", () => {
  _PlayPauseButton.querySelector("i").classList.replace("ph-play", "ph-pause");
  isPlaying = true;
});
_Video.addEventListener("pause", () => {
  _PlayPauseButton.querySelector("i").classList.replace("ph-pause", "ph-play");
  isPlaying = false;
});
_Video.addEventListener("volumechange", UpdateVolumeIcon);
_Video.addEventListener("loadedmetadata", () => {
  _Duration.textContent = formatTime(_Video.duration);
});
_Video.addEventListener("playing", () => {
  _LoadingSpinner.classList.add("hidden");
  _ErrorMessage.classList.add("hidden");
});
_Video.addEventListener("error", (error) => {
  const message = _Video.error;
  let errorMessage = "An error occurred while playing the video.";
  
  switch (message.code) {
    case 1:
      errorMessage = "Video loading was aborted.";
      break;
    case 2:
      errorMessage = "Network error occurred while loading the video.";
      break;
    case 3:
      errorMessage = "Error decoding video file.";
      break;
    case 4:
      errorMessage = "Video format not supported.";
      break;
  }
  
  handleError({ message: errorMessage });
});

function handleError(error) {
  _LoadingSpinner.classList.add("hidden");
  _ErrorMessage.classList.remove("hidden");
  const message = _ErrorMessage.querySelector("p");
  message.textContent = error.message || "An error occurred while playing the video.";
}
