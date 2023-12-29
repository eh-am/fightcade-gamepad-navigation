import { rovingTabIndex } from "../dom";
import * as CL from "../circularList";
import { log } from "../log";
import { Teardown } from "../types";

export function initSearchHeader(root: HTMLElement): boolean {
  // Although <input> doesn't need it, it's a good idea to leave it explitly
  const input = root.querySelector<HTMLElement>("input");
  input?.setAttribute("tabIndex", "0");

  // The filter button needs this to be tabbable
  const button = root.querySelector<HTMLElement>(".filtersButton");
  button?.setAttribute("tabIndex", "-1");

  // The clear filters button needs this to be tabbable
  const clearFiltersButton = getThirdRowItems(root);
  clearFiltersButton.forEach((el) => el.setAttribute("tabIndex", "-1"));

  // The select filters are tabbable by default, but since we are going to manage
  // navigation manually, let's make them not tabbable
  const selects = root.querySelectorAll<HTMLElement>("select");
  selects.forEach((el) => el.setAttribute("tabIndex", "-1"));

  setupKeyDownListeners(root);
  return true;
}

export function updateSearchHeader(root: HTMLElement) {}

function setupKeyDownListeners(root: HTMLElement): Teardown {
  const fn = (e: Event) => {
    const currentFocused = document.activeElement as HTMLElement;

    if (!currentFocused) {
      return;
    }

    // TODO: figure out why setting KeyboardEvent in the event doesn't type check
    const keyPressed = (e as KeyboardEvent).key;
    log("keypressed", keyPressed);

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
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();
      moveVertically(root, currentFocused, "UP");
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      moveVertically(root, currentFocused, "DOWN");
    }
  };

  log("adding listener to", root);
  root.addEventListener("keydown", fn);
  return () => {
    log("tearing down keydown");
    root.removeEventListener("keydown", fn);
  };
}

function getFirstRowItems(root: HTMLElement) {
  return root.querySelectorAll<HTMLElement>(".inputWrapper > *");
}

function getSecondRowItems(root: HTMLElement) {
  return root.querySelectorAll<HTMLElement>(".filtersList select");
}

function getThirdRowItems(root: HTMLElement) {
  return root.querySelectorAll<HTMLElement>(".filtersWrapper > .button-alt");
}

function moveVertically(
  root: HTMLElement,
  currentFocused: HTMLElement,
  direction: "UP" | "DOWN"
) {
  const row = identifyRow(currentFocused);
  let items: ReturnType<typeof getSecondRowItems>;

  switch (row) {
    case "FIRST": {
      items =
        direction === "UP" ? getThirdRowItems(root) : getSecondRowItems(root);
      break;
    }

    case "SECOND": {
      items =
        direction === "UP" ? getFirstRowItems(root) : getThirdRowItems(root);
      break;
    }

    case "THIRD": {
      items =
        direction === "UP" ? getSecondRowItems(root) : getFirstRowItems(root);
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
    case "THIRD": {
      // Do nothing, since there's only a single item in this row
      return;
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
function identifyRow(el: HTMLElement): "FIRST" | "SECOND" | "THIRD" {
  const isFirstRow = el.closest(".inputWrapper");
  if (isFirstRow) {
    return "FIRST";
  }

  const isSecondRow = el.closest(".filtersList");
  if (isSecondRow) {
    return "SECOND";
  }

  // Notice this happens before .filtersList, since items in the second row
  // Would also match here
  const isThirdRow = el.closest(".filtersWrapper");
  if (isThirdRow) {
    return "THIRD";
  }

  throw new Error("could not figure out what row");
}
