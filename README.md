# Fightcade Keyboard Navigation

The objective is to be able to control the FightCade frontend (not the emulator part,
like setting Inputs, since that's too hard),
entirely with a Arcade Stick.

The approach is to make everything more keyboard accessible, and then translate the stick
controls into keyboard events.

# Meta
To run Fightcade2 (an Electron app) and be able to run the developer tools, run:
```
/Applications/FightCade2.app/Contents/MacOS/Fightcade2  --remote-debugging-port=8315
```

I downloaded all the pages manually, so that developing is faster.
Also added an import to `inject.js`, ideally we would use https://github.com/tapio/live-server/issues/338 instead

To test I symlink
```
ln -s /Users/eduardo/projects/keyboard-navigation-playground/inject.js /Applications/FightCade2.app/Contents/Resources/app/inject/inject.js
```


# TODO:
- [ ] login page
- [ ] search page, hidden gems is not working
- [ ] when focusing manually, set scroll into
- [ ] handle asynchronousness, ex when a lobby is added to the sidebar
- [ ] inject custom js, like the <script src="inject.js"/> in dev mode
- [ ] handle stick (axis) https://developer.mozilla.org/en-US/docs/Web/API/Gamepad/axes
- [x] use flexbox instead of grid? .wrapper: { display: flex, flexwrap }, children: { flex: 1 0 6rem; }
- [x] add bundling
- [ ] reduce number of event listeners, ideally one per category?
- [ ] handle mix and matching keyboard focus and hover
- [ ] make circular list take an element, not an index
- [ ] focus on join first
- [ ] upon joining, also enter lobby
- [ ] in search there's a bug where multiple items may ge tfocus
- [ ] make outside links unclickable, or give a warning
- [ ] upon clicking "JOIN" | "FAV", bring focus back
- [ ] pressing escape should go to next tabbable parent?
- [X] prepare a teardown, so that dynamic movement works
- [ ] TESTS: if upon changing the dom (to trigger delete an item), it still works
- [ ] DEV: add an easy way to kill an item (to trigger a DOM reload)
- [ ] create a custom select, since we cant trigger it manually :(
- [ ] bug: sometimes pagination gets two items with tabindex == 0
- [ ] BUG: welcome page stops working after doing a search :\
- [ ] do tab roving for the filters, clear them and default to input when they are collapsed
- [ ] implement escape

# Pages

- Search
- Search Result
- All Games -> open when you search for an empty string
- Lobby
