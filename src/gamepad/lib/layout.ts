export function initControllerMapping() {
  let layout = {};

  // Get the correct mapping layout, if available
  if (this.constructor.layouts.has(this.name)) {
    unknownLayout = false;
    layout = this.constructor.layouts.get(this.name);
  } else if (gamepad.mapping === "standard") {
    unknownLayout = false;
    layout = this.constructor.layouts.get("standard");
  } else {
    console.warn(GC_Errors.MAP);
    layout = this.constructor.layouts.get("_unknown");
  }

  // Store layout info
  setLayoutInfo(layout);

  if (unknownLayout) {
    return layout;
  }

  // Check for browser-specific variant of layout
  const browser = getBrowser();

  if (browser && browser in layout) {
    layout = layout[browser];
  }

  // Map analog sticks to corresponding axes
  for (let name in layout.axes) {
    switch (name) {
      case "LEFT_ANALOG_STICK_HOR":
      case "LEFT_ANALOG_STICK_VERT":
      case "RIGHT_ANALOG_STICK_HOR":
      case "RIGHT_ANALOG_STICK_VERT":
        analogMap[name] = layout.axes[name];
        break;
    }
  }

  // Sets up references for analog to dpad conversion
  layout.misc = {
    L_DPAD_UP: 0,
    L_DPAD_DOWN: 1,
    L_DPAD_LEFT: 2,
    L_DPAD_RIGHT: 3,
    R_DPAD_UP: 4,
    R_DPAD_DOWN: 5,
    R_DPAD_LEFT: 6,
    R_DPAD_RIGHT: 7,
  };

  return layout;
}
