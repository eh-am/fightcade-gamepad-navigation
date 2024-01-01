# Fightcade Gamepad Navigation

Control the [Fightcade](https://www.fightcade.com/) frontend with a gamepad (or a keyboard).

https://github.com/eh-am/fightcade-gamepad-navigation/assets/6951209/40c2b094-30bb-4f95-9e02-0f6e204baed9

# Motivation
I have Steam Deck docked and plugged to a TV and an [Arcade Stick](https://www.8bitdo.com/arcade-stick/),
so I wanted to control the Fightcade frontend with only the stick, without requiring a keyboard/mouse.

# How to use
## Installation
Download the latest Release.

Then copy the `inject.js` app to "INJECT_JS_PATH", which depends on the OS/way of installation:
* On steam deck (no flatpak), it's under `/home/deck/Documents/Fightcade/fc2-electron/resources/app/inject/`
* On a mac, it's under `/home/deck/Documents/Fightcade/fc2-electron/resources/app/inject/`

## Running
Open Fightcade, then press any button for the plugin to recognize the controller,
a notification message should tell the controller has been recognized.

Then navigate with the D-pad (or equivalent).
By default, BUTTON_1 is translated to "Enter", and BUTTON_3 and BUTTON_4 as 
Shift+Tab and Tab, respectively.

# Caveats
* It only handles the frontend, ie not the emulators part. So initial setup for the inputs still requires a mouse/keyboard.
* It relies on the DOM structure, so if it ever changes, it will break this plugin and will require updates. PRs welcome :)

# Strategy
The approach is to make everything more keyboard accessible, and then translate gamepad
inputs to keyboard events.

# Acknowledgments
* [blueminder/fightcade-joystick-kb-controls](https://github.com/blueminder/fightcade-joystick-kb-controls/tree/main), for the initial inspiratino
* [Controller.js](https://samiare.github.io/Controller.js/), for handling the gamepad inputs
* [ally.js](https://allyjs.io/), for helping handling tab navigation and debugging focusable elements
