# Contributing

# Quick start
`npm install`
`npm run watch`

Then open `http://localhost:5001/testdata`.

# Running against fightcade

To launch Fightcade2 (an Electron app) and be able to run the developer tools, run:
```
/Applications/FightCade2.app/Contents/MacOS/Fightcade2 --remote-debugging-port=8315
```

I downloaded all the pages manually, so that developing is faster.
Also added an import to `inject.js`, ideally we would use https://github.com/tapio/live-server/issues/338 instead

To test I symlink
```
ln -s /Users/eduardo/projects/keyboard-navigation-playground/inject.js /Applications/FightCade2.app/Contents/Resources/app/inject/inject.js
```

# Testing
There are playwright tests under the `tests` directory. They test the static HTML files,
which are faster in most cases, but ideally we would test against a real Fightcade instance.

# Recipes

## Debugging the application on steam deck

1. Create a `Fightcade_debug.desktop` file
```
!/usr/bin/env xdg-open
[Desktop Entry]
Version=1.0
Type=Application
Terminal=false
Exec=/home/deck/Documents/Fightcade/Fightcade2.sh --remote-debugging-port=8315
Name=Fightcade Debug
Comment=Fightcade
Categories=Game;Emulator;ArcadeGame
Icon=/home/deck/Documents/Fightcade/fc2-electron/resources/app/icon.png
~
```

2. Open desktop mode, open fightcade_debug

3. Make a ssh tunnel (from your pc)

```
ssh -L 8315:localhost:8315 deck@steamdeck
```

4. Open `http://localhost:8315` in chrome

## Debugging playwright
Use

`PWDEBUG=1 npm run test:ui`

to open Playwright Inspector
