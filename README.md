# Base64 Tool

A lightweight Base64 encoder and decoder for Chromium-based browsers, including Chrome, Microsoft Edge, Brave, and Opera.

## Features

- Encode and decode text with full Unicode support.
- Handle URL-safe Base64, missing padding, and whitespace.
- Decode selected text from the right-click context menu.
- Works offline and does not collect your data.

## Install

1. Clone or download this repository.
2. Open `chrome://extensions` in your browser.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project folder.

## Usage

Click the extension icon, enter or paste text, then choose **Encode** or **Decode**.

To decode selected text from a webpage, highlight it, right-click, and choose the Base64 Tool context-menu option. The decoded text is copied to your clipboard.

## Project Structure

```text
base64-extension/
├── background.js  # Context-menu behavior
├── manifest.json  # Manifest V3 extension configuration
├── popup.css      # Popup styles
├── popup.html     # Popup interface
├── popup.js       # Encoding and decoding logic
└── icons/         # Extension icons
```

## License

MIT
