import type { ListOfHTML } from "./types";

// TODO: sometimes it returns the body
export function getCurrentFocusedElement() {
  return document.activeElement;
}

/**
 * Very naive implementation, since it doesn't deal with
 * tabIndex, disabled/items etc
 */
export function findFocusableElements(e?: Element) {
  const root = e ? e : document;

  return root.querySelectorAll<HTMLElement>(
    "a, audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], [contenteditable], [href], [tabindex]"
  );
}
/*
 * Reimplement tabbing naively
 * Notice that it follows only the DOM order
 * Source: https://stackoverflow.com/a/7329696
 */
export function handleTab(
  nextItemFn: (a: ListOfHTML, i: number) => HTMLElement
) {
  // Find all tablable elements
  const tabbableElements = Array.from(
    document.querySelectorAll<HTMLElement>(
      "audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], [contenteditable], [href], [tabindex]"
    )
  ).filter((a) => a.getAttribute("tabindex") !== "-1");

  const currentFocused = document.activeElement;
  const currentFocusedIndex = Array.from(tabbableElements).findIndex(
    (a) => a === currentFocused
  );

  let focusOn: HTMLElement;
  if (currentFocused) {
    focusOn = nextItemFn(tabbableElements, currentFocusedIndex);
  } else {
    focusOn = tabbableElements[0];
  }

  focusOn.focus();
}

export const addCSS = (css: string) =>
  (document.head.appendChild(document.createElement("style")).innerHTML = css);

// A simple way to test against display: none
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
// It takes null to make it easier to pass queries
export function isHidden(el: HTMLElement | null) {
  if (!el) {
    return true;
  }

  return el.offsetParent === null;
}
