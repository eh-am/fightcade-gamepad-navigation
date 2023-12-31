import { getCurrentFocusedElement } from "./dom";
import { tabNext, tabPrev } from "./dom";
import { Controller } from "../vendor/controllerjs/unminified/Controller.js";
import { notify } from "./notify";

// Source: https://github.com/microsoft/TypeScript/issues/28357#issuecomment-748550734
declare global {
  interface GlobalEventHandlersEventMap {
    "gc.controller.found": ControllerConnectEvent;
    "gc.controller.lost": ControllerDisconnectEvent;
    "gc.button.press": ControllerButtonPressed;
  }
}

type ControllerConnectEvent = CustomEvent<{
  index: number;
  controller: {
    index: number;
    name: string;
  };
}>;
type ControllerDisconnectEvent = CustomEvent<{ index: number }>;
type ControllerButtonPressed = CustomEvent<{
  controllerIndex: number;
  // https://github.com/samiare/Controller.js/blob/347fc1416b7d5889983933a916cd7d1eeb3ee166/source/lib/GC_Layouts.js#L62-L81
  //  name: string;
  name:
    | "FACE_1"
    | "FACE_2"
    | "FACE_3"
    | "FACE_4"
    | "LEFT_SHOULDER"
    | "RIGHT_SHOULDER"
    | "LEFT_SHOULDER_BOTTOM"
    | "RIGHT_SHOULDER_BOTTOM"
    | "SELECT"
    | "START"
    | "LEFT_ANALOG_BUTTON"
    | "RIGHT_ANALOG_BUTTON"
    | "DPAD_UP"
    | "DPAD_DOWN"
    | "DPAD_LEFT"
    | "DPAD_RIGHT"
    | "HOME";

  value: number;
  pressed: true;
  time: number;
}>;

export function initGamepad() {
  Controller.search();

  window.addEventListener(
    "gc.controller.found",
    function (event) {
      var controller = event.detail.controller;
      notify(
        `[CONNECTED]: Controller ${controller.name} recognized at index ${controller.index}`
      );
    },
    false
  );
  window.addEventListener(
    "gc.controller.lost",
    function (event) {
      notify(`[DISCONNECTED]: Controller at index ${event.detail.index}`);
    },
    false
  );

  window.addEventListener("gc.button.press", function (event) {
    // TODO: ideally these mappings should be able to be set by the user
    switch (event.detail.name) {
      case "FACE_1": {
        getCurrentFocusedElement()?.dispatchEvent(
          new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
        );
        break;
      }

      case "DPAD_UP": {
        getCurrentFocusedElement()?.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true })
        );
        break;
      }
      case "DPAD_RIGHT": {
        getCurrentFocusedElement()?.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })
        );
        break;
      }
      case "DPAD_DOWN": {
        getCurrentFocusedElement()?.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
        );
        break;
      }
      case "DPAD_LEFT": {
        getCurrentFocusedElement()?.dispatchEvent(
          new KeyboardEvent("keydown", { key: "ArrowLeft", bubbles: true })
        );
        break;
      }
      case "FACE_3": {
        tabPrev();
        break;
      }
      case "FACE_4": {
        tabNext();
        break;
      }
    }
  });
}
