import { tabNext, tabPrev } from "@app/dom";

/**
 * Buttons as defined by Controller.js
 * https://github.com/samiare/Controller.js/blob/347fc1416b7d5889983933a916cd7d1eeb3ee166/source/lib/GC_Layouts.js#L62-L81
 */
export type Button =
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

export type NavigationControls =
  | "Up"
  | "Down"
  | "Right"
  | "Left"
  | "Confirm"
  | "Return"
  | "TabPrev"
  | "TabNext";

/*
 * given a layout and a Controllerjs button
 * return the mapping
 * The reason is that the mapping is defined as a record where keys
 * are NavigationControls so that the domain is smaller
 * but when figuring out the mapping, we need the reverse operation
 */
export function convertToNavigationControl(
  mappings: Layout["Mappings"],
  button: Button
): NavigationControls | undefined {
  const reverse = Object.fromEntries(
    Object.entries(mappings).map(([key, value]) => [value, key])
  ) as Record<Button, NavigationControls>;
  return reverse[button];
}

export function toKeyboardEvent(
  mappings: Layout["Mappings"],
  button: Button,
  activeElement: Element | null
) {
  const nc = convertToNavigationControl(mappings, button);
  switch (nc) {
    case "TabPrev": {
      return tabPrev;
    }
    case "TabNext": {
      return tabNext;
    }

    case undefined: {
      return () => {};
    }

    default: {
      return () => {
        activeElement?.dispatchEvent(
          new KeyboardEvent("keydown", { key: toKey(nc), bubbles: true })
        );
      };
    }
  }
}

function toKey(nc: Exclude<NavigationControls, "TabPrev" | "TabNext">) {
  switch (nc) {
    case "Up":
    case "Right":
    case "Down":
    case "Left": {
      return `Arrow${nc}`;
    }
    case "Confirm": {
      return "Enter";
    }
    case "Return": {
      return "Escape";
    }
  }
}
