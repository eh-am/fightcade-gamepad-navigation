import * as cl from "@app/ds/circularList";
import tabsequence from "ally.js/src/query/tabsequence";
import focusable from "ally.js/src/query/focusable";

/**
 * Very naive implementation, since it doesn't deal with
 * tabIndex, disabled/items etc
 */
export function findFocusableElements(e?: Element): HTMLElement[] {
  const root = e ? e : document;

  return focusable({
    context: e,
    includeContext: false,
    strategy: "quick",
  });

  //  return root.querySelectorAll<HTMLElement>(
  //    "a, audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], [contenteditable], [href], [tabindex]"
  //  );
}

function tab(nextFn: typeof cl.next) {
  const tabbableElements = tabsequence({
    context: document,
    includeContext: true,
    strategy: "quick",
  });
  const currentFocused = document.activeElement;
  if (currentFocused) {
    nextFn(tabbableElements, currentFocused).focus();
  }
}
export function tabNext() {
  tab(cl.next);
}

export function tabPrev() {
  tab(cl.prev);
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

/**
 * roving tabIndex technique
 * https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
 */
export function rovingTabIndex(oldEl: Element, newEl: Element) {
  if (oldEl) {
    oldEl.setAttribute("tabIndex", "-1");
  }
  if (newEl) {
    newEl.setAttribute("tabIndex", "0");
  }
}

/**
 * Fake roving tabindex technique using data-tabIndex
 * Useful for when the item is not tabbable
 */
export function fakeRovingTabIndex(oldEl: Element, newEl: Element) {
  if (oldEl) {
    oldEl.setAttribute("data-tabIndex", "-1");
  }
  if (newEl) {
    newEl.setAttribute("data-tabIndex", "0");
  }
}
export function getFakeRovingTabindex(el: Element) {
  return el.getAttribute("data-tabIndex");
}
export function hasFakeRovingTabindex(el: Element) {
  return el.hasAttribute("data-tabIndex");
}
export function setFakeRovingTabindex(el: Element, index: string) {
  return el.setAttribute("data-tabIndex", index);
}

export function makeFocusableIfNeeded(
  el: HTMLElement,
  fakeRoving = false,
  index = "-1"
) {
  if (!el.hasAttribute("tabIndex")) {
    el.setAttribute("tabIndex", index);
  }
  if (fakeRoving && !hasFakeRovingTabindex(el)) {
    setFakeRovingTabindex(el, index);
  }
}
