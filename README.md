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
