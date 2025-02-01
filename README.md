# HTML5 Video Player

A modern, feature-rich video player built with:
1. HTML5 and CSS
2. Tailwind CSS
3. JavaScript

## Features

### Core Functionality
- Play/Pause control
- Seek functionality with progress bar
- Volume control
- Fullscreen support
- Error handling with user-friendly messages
- Loading state indicators
- Multiple video format support

### Keyboard Controls
| Key           | Action                    |
|---------------|---------------------------|
| Space         | Play/Pause               |
| Left Arrow    | Seek backward 5 seconds   |
| Right Arrow   | Seek forward 5 seconds    |
| Shift + Left  | Seek backward 10 seconds  |
| Shift + Right | Seek forward 10 seconds   |
| Up Arrow      | Increase volume          |
| Down Arrow    | Decrease volume          |
| M             | Mute/Unmute              |
| F             | Toggle fullscreen        |

### Error Handling
- Network error detection
- Video format compatibility checking
- Loading state indication
- User-friendly error messages

## How To Use
### Clone the Repository
``` 
git clone https://github.com/OmarAglan/html-v-player.git
cd html-v-player
```
### Installation
First, You Need To Install The Dependencies:
```
npm install
```
### Run
```
npm run dev
```
You Can see Results Here: http://localhost:3000

### Live Demo
You Can see The Live Demo Here: [Here](https://simple-video-player.onrender.com)

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Known Issues
- Some older browsers might not support all HTML5 video formats
- Fullscreen API might require different handling for different browsers
