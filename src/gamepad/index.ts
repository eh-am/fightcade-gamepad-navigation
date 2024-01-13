import { Controller } from "@controllerjs";
import { notify } from "@app/notify";
import { toKeyboardEvent } from "@app/gamepad/buttons";
import { identifyLayout } from "@app/gamepad/layouts/identify";
import { findFirstFocusableChild } from "@app/dom";
import { ControllerButtonPressed } from "@app/gamepad/events";

type ControllerInfo = {
  name: string;
  layout: Layout;
};
type ControllerIndex = number;
const controllers: Record<ControllerIndex, ControllerInfo> = [];

const lastValidPress: Record<
  ControllerIndex,
  ControllerButtonPressed["detail"]
> = {};
const THROTTLE_MS = 200;

export function initGamepad() {
  const steamLayout = {
    match: "Microsoft X-Box 360 pad",
    matchFn: (name: string) => {
      return /Microsoft X-Box 360 pad \d/.test(name);
    },
    name: "Steam Deck Controller",
    description: "",
    buttons: {
      FACE_1: 0,
      FACE_2: 1,
      FACE_3: 2,
      FACE_4: 3,
      LEFT_SHOULDER: 4,
      RIGHT_SHOULDER: 5,
      LEFT_ANALOG_BUTTON: 9,
      RIGHT_ANALOG_BUTTON: 11,
      START: 11,
      SELECT: 10,
    },
    // The dpad is actually considered an axe
    // So what this + useAnalogAsDpad effectively do
    // is to enable dpad!
    axes: {
      LEFT_ANALOG_STICK_VERT: 7,
      LEFT_ANALOG_STICK_HOR: 6,
    },
    options: {
      useAnalogAsDpad: "left",
    },
  };

  Controller.layouts.register(Controller, steamLayout);

  Controller.globalSettings.useAnalogAsDpad = "left";
  Controller.search();

  window.addEventListener(
    "gc.controller.found",
    function (event) {
      //      Controller.unwatchAll();
      //      Controller.watchAll();

      const ci: ControllerInfo = {
        layout: identifyLayout(event.detail.controller.name),
        name: event.detail.controller.name,
      };

      controllers[event.detail.controller.index] = ci;

      const controller = event.detail.controller;
      notify(
        `[CONNECTED]: Controller ${controller.name} recognized at index ${controller.index} with layout ${ci.layout.Name}`
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

  window.addEventListener("gc.button.hold", function (event) {
    const controllerIndex = event.detail.controllerIndex;
    const prevEventTime = lastValidPress[controllerIndex].time;
    const currEventTime = event.detail.time;

    if (currEventTime - prevEventTime > THROTTLE_MS) {
      onPress(event);
    }
  });

  function onPress(event: ControllerButtonPressed) {
    const activeElement = document.activeElement;

    // If nothing is focused, navigation won't work
    if (!activeElement || activeElement === document.body) {
      const firstFocusable = findFirstFocusableChild(document.body);
      firstFocusable?.focus();
    }

    const controllerIndex = event.detail.controllerIndex;
    lastValidPress[controllerIndex] = event.detail;

    // It may be possible that this event is dispatched before the controller initialization
    const controller = controllers[controllerIndex];
    if (!controller) {
      return;
    }

    const ev = toKeyboardEvent(
      controller.layout.Mappings,
      event.detail.name,
      document.activeElement
    );

    if (ev) {
      ev();
    }
  }

  window.addEventListener("gc.button.press", (ev) => {
    console.log("press ev", ev.detail);
    onPress(ev);
  });
}
