import { rovingTabIndex } from "../dom";
import * as CL from "../circularList";
import { log } from "../log";

export function initSearchHeader(root: HTMLElement): boolean {
  // Although <input> doesn't need it, it's a good idea to leave it explitly
  const input = root.querySelector<HTMLElement>("input");
  input?.setAttribute("tabIndex", "0");

  // The button needs this to be tabbable
  const button = root.querySelector<HTMLElement>(".filtersButton");
  button?.setAttribute("tabIndex", "-1");

  // The select filters are tabbable by default, but since we are going to manage
  // navigation manually, let's make them not tabbable
  const selects = root.querySelectorAll<HTMLElement>("select");
  selects.forEach((el) => el.setAttribute("tabIndex", "-1"));

  // TODO: if it ever changes, we will need a teardown setup
  setupKeyDownListeners(root);
  return true;
}

function setupKeyDownListeners(root: HTMLElement) {
  root.addEventListener("keydown", (e) => {
    const currentFocused = document.activeElement as HTMLElement;

    if (!currentFocused) {
      return;
    }

    // TODO: figure out why setting KeyboardEvent in the event doesn't type check
    const keyPressed = (e as KeyboardEvent).key;

    if (keyPressed === "ArrowLeft" || keyPressed === "ArrowRight") {
      e.preventDefault();

      const nextFn = keyPressed === "ArrowLeft" ? CL.prev : CL.next;
      moveHorizontally(root, currentFocused, nextFn);
    } else if (keyPressed === "Enter") {
      e.preventDefault();

      if (currentFocused.tagName === "select") {
        // TODO: apparently there's no way to trigger this programatically
      } else {
        currentFocused.click();
      }
    } else if (keyPressed === "ArrowUp" || keyPressed === "ArrowDown") {
      e.preventDefault();

      log("should move vertically");
      moveVertically(root, currentFocused);
    }
  });
}

function getFirstRowItems(root: HTMLElement) {
  return root.querySelectorAll<HTMLElement>(".inputWrapper > *");
}

function getSecondRowItems(root: HTMLElement) {
  return root.querySelectorAll<HTMLElement>(".filtersList select");
}

function moveVertically(root: HTMLElement, currentFocused: HTMLElement) {
  const row = identifyRow(currentFocused);
  let items: ReturnType<typeof getSecondRowItems>;

  switch (row) {
    case "FIRST": {
      items = getSecondRowItems(root);
      break;
    }

    case "SECOND": {
      items = getFirstRowItems(root);
      break;
    }
    default: {
      throw new Error("Could not identify correct row");
    }
  }

  log("items", items);

  if (items.length > 0) {
    const next = items[0];
    // Notice we don't do the roving tabindex trick here
    // since we always want users to easily go to the input
    //    rovingTabIndex(currentFocused, next);
    next.focus();
  }
}

function moveHorizontally(
  root: HTMLElement,
  currentFocused: HTMLElement,
  nextFn: typeof CL.next
) {
  const row = identifyRow(currentFocused);
  let items: ReturnType<typeof getSecondRowItems>;

  switch (row) {
    case "FIRST": {
      items = getFirstRowItems(root);
      break;
    }

    case "SECOND": {
      items = getSecondRowItems(root);
      break;
    }
    default: {
      throw new Error("Could not identify correct row");
    }
  }

  if (items.length > 0) {
    const myIndex = Array.from(items).findIndex((a) => a === currentFocused);

    const next = nextFn(items, myIndex);
    // Notice we don't do the roving tabindex trick here
    // since we always want users to easily go to the input
    //    rovingTabIndex(currentFocused, next);
    next.focus();
  }
}

// TODO: kinda naive
function identifyRow(el: HTMLElement): "FIRST" | "SECOND" {
  const isFirstRow = el.closest(".inputWrapper");
  if (isFirstRow) {
    return "FIRST";
  }

  const isSecondRow = el.closest(".filtersWrapper");
  if (isSecondRow) {
    return "SECOND";
  }

  throw new Error("could not figure out what row");
}
