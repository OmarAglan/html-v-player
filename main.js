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
  _Video.muted = _Video.muted ? false : true;
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
  const updatedTime = (e.offsetX / _ProgressBar.offsetWidth) * _Video.duration;

  _Video.currentTime = updatedTime;
}

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
_ProgressBar.addEventListener("mousemove", (e) => mouseIsDown && Seeking);

// KEYBOARD Navigation
window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    PlayPause();
  } else if (e.code === "ArrowLeft") {
    RewindForward("rewind");
  } else if (e.code === "ArrowRight") {
    RewindForward("forward");
  } else {
    return;
  }
});
