# HTML5 Custom Video Player

A feature-rich, customizable HTML5 video player built with vanilla JavaScript and styled with Tailwind CSS.

This project demonstrates how to build a modern video player from scratch, incorporating numerous features and UI/UX enhancements.

## Features

*   **Dynamic Loading:** Upload video and subtitle (.vtt) files directly.
*   **Custom Controls:** Fully custom controls overlay with smooth transitions.
*   **Playback:** Play/Pause, Rewind (-10s), Fast-Forward (+10s).
*   **Progress Bar:** Clickable and draggable/touch-scrubbable progress bar with time tooltip (desktop).
*   **Volume Control:** Vertical volume slider (appears on hover/tap), mute toggle, volume memory.
*   **Playback Speed:** Select playback speed from a dropdown (0.5x, 0.75x, 1x, 1.5x, 2x).
*   **Time Display:** Shows current time and total video duration.
*   **Subtitles:** Toggle uploaded WebVTT subtitles on/off.
*   **Display Modes:** Fullscreen and Picture-in-Picture (PiP) toggles.
*   **Keyboard Shortcuts:**
    *   `Space` / `k`: Play/Pause
    *   `Left Arrow`: Rewind
    *   `Right Arrow`: Forward
    *   `m`: Mute/Unmute
    *   `f`: Toggle Fullscreen
*   **Responsive Design:** Adapts layout and controls for different screen sizes (mobile to desktop).
*   **Touch Optimized:** Specific interactions for touch devices (control visibility, seeking, volume slider access).
*   **Error Handling:** Basic feedback for invalid file types and video loading errors.
*   **Modern Stack:** Built with Vite, Tailwind CSS, and vanilla JavaScript (ES6+ Class structure).

## How To Use

### Clone the Repository
```bash
git clone https://github.com/OmarAglan/html-v-player.git
cd html-v-player
```

### Installation
Install the necessary development dependencies (Vite, Tailwind):
```bash
npm install
# or
yarn install
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
```
Navigate to `http://localhost:5173` (or the port specified by Vite) in your browser.

### Build for Production
```bash
npm run build
# or
yarn build
```
This will create optimized static assets in the `dist` folder.

### Live Demo
(Note: This link might point to an older version)
[Here](https://simple-video-player.onrender.com)
