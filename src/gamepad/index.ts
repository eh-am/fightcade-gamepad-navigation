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
  Controller.globalSettings.useAnalogAsDpad = "left";
  Controller.search();

  window.addEventListener(
    "gc.controller.found",
    function (event) {
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
    onPress(ev);
  });
}
