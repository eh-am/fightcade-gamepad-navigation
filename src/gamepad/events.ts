import { Button } from "./buttons";

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
  name: Button;
  value: number;
  pressed: true;
  time: number;
}>;
