import { rovingTabIndex } from "../dom";
import * as CL from "../circularList";
import { log } from "../log";
import { Teardown } from "../types";

function findSelectedFakeOption(el: HTMLSelectElement) {
  return el
    .closest(".filterItem")
    ?.querySelector<HTMLElement>(
      `.fbn-custom-select > [data-value="${el.value}"]`
    );
}
function findMirrorSelectedFakeOption(originalSelect: HTMLSelectElement) {
  const mirror = findMirrorSelect(originalSelect);
  if (!mirror) {
    return;
  }

  return findSelectedFakeOption(mirror);
}

function findMirrorSelect(originalSelect: HTMLSelectElement) {
  const getClosestTitle = (el: HTMLElement) =>
    el.closest(".filterItem")?.querySelector(".title")?.textContent;

  const title = getClosestTitle(originalSelect);
  const mirror = Array.from(
    document.querySelectorAll<HTMLSelectElement>("select")
  )
    .filter((el) => getClosestTitle(el) === title)
    .find((el) => el !== originalSelect);

  return mirror;
}

function syncToMirror(originalSelect: HTMLSelectElement) {
  const mirror = findMirrorSelect(originalSelect);
  if (!mirror) {
    return;
  }

  mirror.value = originalSelect.value;

  const mirrorOption = findMirrorSelectedFakeOption(originalSelect);
  if (!mirrorOption) {
    return;
  }

  mirrorOption.scrollIntoView();
}

function syncFromMirror(target: HTMLSelectElement) {
  const mirror = findMirrorSelect(target);
  console.log("syncing from mirror. original", target, "mirror", mirror);

  if (!mirror) {
    return;
  }

  target.value = mirror.value;

  // Find the mirror of the option of the mirror
  // Aka my own option
  const option = findMirrorSelectedFakeOption(mirror);
  if (!option) {
    return;
  }

  // Crazy trick
  // scrollIntoView will only work if it's visible, aka not display: none
  // Therefore we expand the wrapper, then expand it back again
  const wrapper = target.closest(".filtersWrapper");
  if (!wrapper) {
    return;
  }

  // It's possible it's already have
  if (wrapper.classList.contains("active")) {
    option.scrollIntoView();
  } else {
    wrapper.classList.add("active");
    option.scrollIntoView();
    wrapper.classList.remove("active");
  }
}

export function updateSearchHeader(root: HTMLElement) {
  // Instead of remove all event listeners and such
  // We just delete the root node of the custom select
  // TODO: apparently the listeners continue existing?
  // https://stackoverflow.com/a/76239226
  const fakeSelects = root.querySelectorAll<HTMLElement>(".fbn-custom-select");
  fakeSelects.forEach((el) => el.remove());

  const selects = root.querySelectorAll<HTMLSelectElement>("select");
  selects.forEach((select) => setupSelect(select));
}

/**
 * For each select we find
 * Create a new, custom one.
 * Main motivation is to be able to control it via programatically
 * which the default one does not
 * source: https://chromestatus.com/feature/5718803933560832
 */
function setupSelect(el: HTMLSelectElement) {
  el.setAttribute("tabIndex", "-1");

  const wrapper = document.createElement("div");
  //    const newSelect = document.createElement("div");

  const realOptions = Array.from(el.querySelectorAll("option"));
  // For some reason it hasn't been initialized yet
  if (!realOptions.length) {
    return;
  }

  el.addEventListener("change", (e: Event) => {
    // TODO: fix this type
    const value = (e?.target as any)?.value;

    console.log("it changed to", value);
    // TODO: scroll HEREEEEEEEEEEEEEE
    console.log("i should be scrolling");
    findSelectedFakeOption(el)?.scrollIntoView();
  });

  // Setup the fake options
  const options = realOptions.map(createFakeOption.bind(null, el));

  options.forEach((opt) => {
    setupFakeOptionsKeydownListeners(options, opt);
  });

  wrapper.style.position = "relative";
  // For some reason I could not do absolute
  //    el.style.position = "absolute";
  const newSelect = newFakeSelectFrom();

  el.style.inset = "0";
  el.style.visibility = "hidden";

  el.parentNode?.appendChild(wrapper);
  newSelect.append(...options);
  wrapper.appendChild(el);
  wrapper.appendChild(newSelect);

  syncFromMirror(el);
}
//
//
function newFakeSelectFrom(): HTMLElement {
  const newSelect = document.createElement("div");
  newSelect.className += "fbn-custom-select";

  // Copied from the original select
  newSelect.style.backgroundColor = "var(--mainColor)";
  newSelect.style.border = "2px solid var(--mainColor-light)";
  newSelect.style.borderRadius = "4px";
  newSelect.style.outline = "none";
  newSelect.style.color = "#fff";

  // Custom
  //newSelect.style.width = "max-content";
  newSelect.style.width = "100%";
  //    newSelect.style.minWidth = "100%";
  newSelect.style.height = "100%";
  newSelect.style.top = "0";
  newSelect.style.left = "0";
  newSelect.style.position = "absolute";
  //newSelect.style.overflowY = "auto";
  //newSelect.style.overflowX = "hidden";
  newSelect.style.zIndex = "2"; // To be bigger than the section below
  // we don't want a scrollbar
  newSelect.style.overflow = "hidden";
  newSelect.style.scrollbarGutter = "stable";
  // Only doing this to fit everything, if i use width: max-content
  // Then the father won't know about this increased size, making spacing between elements all funky
  newSelect.style.fontSize = "0.8rem";

  // Add listener
  newSelect.addEventListener("click", (e) => {
    console.log("clicked on parent", e);
    // TODO: ideally we would figure out a better value
    newSelect.style.height = "200px";
    newSelect.style.overflowY = "auto";
    newSelect.style.overflowX = "hidden";

    // TODO: receive this as an argument
    const allOptions = Array.from(newSelect.querySelectorAll<HTMLElement>("*"));
    for (let option of allOptions) {
      option.style.pointerEvents = "initial";
    }

    const option = newSelect.querySelector<HTMLElement>("*");
    if (option) {
      option.setAttribute("tabIndex", "-1");
      option.focus();
    }
    // TODO: focus first item
  });

  return newSelect;
}

function setupFakeOptionsKeydownListeners(
  allOptions: HTMLElement[],
  el: HTMLElement
) {
  el.addEventListener("keydown", (e) => {
    console.log("pressed ");
    e.preventDefault();
    const keyPressed = (e as KeyboardEvent).key;

    switch (keyPressed) {
      case "Enter": {
        console.log("clickingon", el);
        el.click();
        return;
      }
      case "ArrowUp": {
        moveToNextOption(allOptions, el, CL.prev);
        return;
      }
      case "ArrowDown": {
        moveToNextOption(allOptions, el, CL.next);
        return;
      }
    }
  });
}
/**
 * Create a fake option
 */
function createFakeOption(
  originalSelect: HTMLSelectElement,
  el: HTMLOptionElement
) {
  const clone = document.createElement("div");
  const content = (el.textContent || "").trim();

  clone.setAttribute("data-value", el.value);
  clone.innerText = content;
  clone.style.padding = ".25rem";
  clone.style.pointerEvents = "none";
  // Cancel out the scrollbar
  clone.style.marginRight = "-8px";

  const onClick = function (e: Event) {
    e.preventDefault();
    // Since the parent tends focus back on the first item
    e.stopPropagation();

    const parent = clone.parentNode as HTMLElement;
    const allOptions = parent.querySelectorAll<HTMLElement>("*");
    allOptions.forEach((el) => (el.style.pointerEvents = "none"));

    // TODO: kinda ugly, but we need to make sure other instances have the same content
    // otherwise when changing views (eg welcome -> search), data will be out of sync
    syncToMirror(originalSelect);

    originalSelect.value = el.value;
    originalSelect.dispatchEvent(new Event("change"));

    // Couldn't find an well supported way to do that, hint: we want to use fill-available
    const normalHeight = originalSelect.offsetHeight;
    parent.style.height = `${normalHeight}px`;

    console.log("should be focusing on parent now", parent);
    parent.focus();

    clone.scrollIntoView();

    // TODO: make all parent's styles go back to initial state
    parent.style.overflow = "hidden";
  };

  clone.addEventListener("click", onClick);
  return clone;
}

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

  clearFiltersButton.forEach((el) => {
    el.addEventListener("click", () => {
      // Set up the form
      const selects = el
        .closest(".filtersWrapper")
        ?.querySelectorAll<HTMLSelectElement>("select");

      selects?.forEach((sel) => {
        sel.selectedIndex = 0;
        sel.dispatchEvent(new Event("change"));
      });
    });
  });

  updateSearchHeader(root);

  setupKeyDownListeners(root);
  return true;
}

function moveToNextOption(
  array: HTMLElement[],
  myself: HTMLElement,
  nextFn: typeof CL.next
) {
  myself.removeAttribute("tabIndex");

  const myIndex = array.findIndex((el) => el === myself);
  const next = nextFn(array, myIndex);

  // So that it's focusable
  next.setAttribute("tabIndex", "-1");
  next.focus();
}

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
  //  root.addEventListener("keydown", fn);
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
