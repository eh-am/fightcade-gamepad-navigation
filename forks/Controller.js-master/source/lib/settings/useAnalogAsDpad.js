/*
 * useAnalogAsDpad
 * ---------------
 * Specifies whether analog sticks should fire dpad events, and if so, which.
 *
 * default: 'none'
 * possible: 'none', 'left', 'right', 'both', false
 *
 */

export function useAnalogAsDpad(value) {
  const possible = ["none", "left", "right", "both", false];
  if (possible.indexOf(value) > -1) {
    return value;
  } else {
    console.warn('Not a valid option for "useAnalogAsDpad".');
    return null;
  }
}
