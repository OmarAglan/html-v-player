# HTML5 Video Player

A beautiful and modern video player built with:
1. HTML5 and CSS
2. Tailwind CSS
3. JavaScript
4. Phosphor Icons

## Features

### Core Functionality
- Play/Pause control with smooth animations
- Enhanced progress bar with hover effects
- Vertical volume slider with visual feedback
- Cinema mode for distraction-free viewing
- Fullscreen support
- Error handling with user-friendly messages
- Loading state indicators with animated icons
- Multiple video format support

### Enhanced UI Features
- Beautiful gradient-based design
- Animated floating header
- Responsive controls that scale with screen size
- Smooth hover effects and transitions
- Backdrop blur effects for better readability
- Modern icon set from Phosphor Icons
- Elegant time display with monospace font

### Cinema Mode
- Darkens background while keeping video bright
- Hides header for distraction-free viewing
- Click outside video to exit
- Smooth transitions for all elements
- Keyboard shortcut support

### Keyboard Controls
| Key           | Action                    |
|---------------|---------------------------|
| Space         | Play/Pause                |
| Left Arrow    | Seek backward 5 seconds   |
| Right Arrow   | Seek forward 5 seconds    |
| Shift + Left  | Seek backward 10 seconds  |
| Shift + Right | Seek forward 10 seconds   |
| Up Arrow      | Increase volume           |
| Down Arrow    | Decrease volume           |
| M             | Mute/Unmute               |
| F             | Toggle fullscreen         |
| C             | Toggle cinema mode        |

### Visual Feedback
- Hover effects on all controls
- Progress bar preview on hover
- Volume level indicator
- Loading spinner animation
- Error messages with icons
- Smooth transitions for all state changes

### Error Handling
- Network error detection with icon feedback
- Video format compatibility checking
- Animated loading state indication
- User-friendly error messages with icons
- Graceful fallback for unsupported features

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

## Technical Details
### Dependencies
- Tailwind CSS for styling
- Phosphor Icons for modern iconography
- Vite for development and building

### Performance Optimizations
- Lazy loading of video content
- Efficient event handling
- Smooth animations with CSS transitions
- Proper cleanup of event listeners
- Memory leak prevention

## Known Issues
- Some older browsers might not support all HTML5 video formats
- Fullscreen API might require different handling for different browsers
- Volume slider behavior might vary across browsers

## Future Improvements
- Add support for playlists
- Implement video quality selector
- Add subtitle support
- Picture-in-picture mode
- Custom themes support
- Touch gesture controls for mobile

## Contributing
Feel free to contribute to this project. All contributions are welcome!

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
