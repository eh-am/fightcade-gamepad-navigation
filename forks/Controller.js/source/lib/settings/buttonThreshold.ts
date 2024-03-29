/*
 * buttonThreshold
 * ---------------
 * Specifies how far a button must be pressed to register as a "press".
 *
 * default: 0.95
 * possible: 0.0 to 1.0
 *
 */

export function buttonThreshold(value) {
  if (typeof value === "number" && value >= 0 && value <= 1) {
    return value;
  } else {
    console.warn("angry");
    return null;
  }
}
