import { getCurrentFocusedElement } from "./dom";
import { handleTab } from "./dom";
import * as CL from "./circularList";
import "../vendor/controllerjs/unminified/Controller.js";
import "../vendor/controllerjs/unminified/Controller.layouts.js";

Controller.search();

window.addEventListener(
  "gc.controller.found",
  function (event) {
    var controller = event.detail.controller;
    console.log("Controller found at index " + controller.index + ".");
    console.log("'" + controller.name + "' is ready!");
  },
  false
);

window.addEventListener(
  "gc.controller.lost",
  function (event) {
    console.log(
      "The controller at index " +
        event.detail.index +
        " has been disconnected."
    );
    console.log(Controller.getController(0));
  },
  false
);

window.addEventListener(
  "gc.button.press",
  function (event) {
    console.log(event.detail);
  },
  false
);

window.addEventListener(
  "gc.button.hold",
  function (event) {
    console.log("HOLDING", event.detail);
  },
  false
);
// TODO: receive this dynamically, or allow setting it up
//const ARCADE_STICK_MAPPINGS = {
//  DPAD_UP: 12,
//  DPAD_DOWN: 13,
//  DPAD_LEFT: 14,
//  DPAD_RIGHT: 15,
//  BUTTON_A: 0,
//  BUTTON_B: 1,
//};
//
//// TODO: use requestAnimationFrame
//export function initGamepad() {
//  window.addEventListener("gamepadconnected", () => {
//    setInterval(function () {
//      gameLoop();
//    }, 100);
//  });
//}
//
//function gameLoop() {
//  const gamepads = navigator.getGamepads();
//  if (!gamepads) {
//    return;
//  }
//
//  for (let gp of gamepads) {
//    console.log("dealingw ith gamepad");
//    if (!gp) {
//      continue;
//    }
//    for (let b = 0; b < gp.buttons.length; b++) {
//      if (gp.buttons[b].pressed) {
//        console.log("pressed", gp.buttons[b]);
//      }
//    }
//  }
//  // TODO: technically any index could work
//  const gp = gamepads[0];
//  if (!gp) {
//    return;
//  }
//
//  if (gp.buttons[ARCADE_STICK_MAPPINGS.BUTTON_A].pressed) {
//    handleTab(CL.prev);
//  }
//  if (gp.buttons[ARCADE_STICK_MAPPINGS.BUTTON_B].pressed) {
//    handleTab(CL.next);
//  }
//  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_UP].pressed) {
//    getCurrentFocusedElement()?.dispatchEvent(
//      new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true })
//    );
//  }
//  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_DOWN].pressed) {
//    getCurrentFocusedElement()?.dispatchEvent(
//      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
//    );
//  }
//  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_RIGHT].pressed) {
//    getCurrentFocusedElement()?.dispatchEvent(
//      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })
//    );
//  }
//  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_LEFT].pressed) {
//    getCurrentFocusedElement()?.dispatchEvent(
//      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true })
//    );
//  }
//}
