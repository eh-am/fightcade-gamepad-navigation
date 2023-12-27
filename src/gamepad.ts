import { getCurrentFocusedElement } from "./dom";
import { handleTab } from "./dom";
import * as CL from "./circularList";

// TODO: receive this dynamically, or allow setting it up
const ARCADE_STICK_MAPPINGS = {
  DPAD_UP: 12,
  DPAD_DOWN: 13,
  DPAD_LEFT: 14,
  DPAD_RIGHT: 15,
  BUTTON_A: 0,
  BUTTON_B: 1,
};

// TODO: use requestAnimationFrame
export function initGamepad() {
  window.addEventListener("gamepadconnected", () => {
    setInterval(function () {
      gameLoop();
    }, 100);
  });
}

function gameLoop() {
  const gamepads = navigator.getGamepads();
  if (!gamepads) {
    return;
  }

  // TODO: technically any index could work
  const gp = gamepads[0];
  if (!gp) {
    return;
  }

  if (gp.buttons[ARCADE_STICK_MAPPINGS.BUTTON_A].pressed) {
    handleTab(CL.prev);
  }
  if (gp.buttons[ARCADE_STICK_MAPPINGS.BUTTON_B].pressed) {
    handleTab(CL.next);
  }
  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_UP].pressed) {
    getCurrentFocusedElement()?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true })
    );
  }
  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_DOWN].pressed) {
    getCurrentFocusedElement()?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
    );
  }
  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_RIGHT].pressed) {
    getCurrentFocusedElement()?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })
    );
  }
  if (gp.buttons[ARCADE_STICK_MAPPINGS.DPAD_LEFT].pressed) {
    getCurrentFocusedElement()?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true })
    );
  }
}
