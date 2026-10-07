Base64 Tool
A minimal Base64 encoder/decoder extension for Chromium-based browsers (Chrome, Edge, Brave, Opera).

Encode and decode with full Unicode support
Handles URL-safe Base64, missing padding, and whitespace
Optional right-click menu to decode selected text
Works offline, no permissions, no data collection
Install
Clone or download this repo
Open chrome://extensions
Enable Developer mode
Click Load unpacked and select the project folder
Usage
Click the extension icon, paste your text, and hit Encode or Decode.

With background.js enabled, you can also highlight text on any page, right-click, and decode it straight to your clipboard.

Structure
manifest.json # Extension config (Manifest V3)popup.html/css/jsbackground.js # Optional context menuicons/ # Optional
License
MIT
