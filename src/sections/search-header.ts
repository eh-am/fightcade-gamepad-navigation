import { rovingTabIndex } from "../dom";
import * as CL from "../circularList";
import { log } from "../log";
import { Teardown } from "../types";

function copyStylesFrom(origin: HTMLElement, dest: HTMLElement) {
  const styles = window.getComputedStyle(origin);
  if (styles.cssText !== "") {
    dest.style.cssText = styles.cssText;
  } else {
    const cssText = Array.from(styles).reduce(
      (css, propertyName) =>
        `${css}${propertyName}:${styles.getPropertyValue(propertyName)};`
    );

    dest.style.cssText = cssText;
  }
}

//function updateSearchHeader() {
//  // Instead of remove all event listeners and such
//  // We just delete the root node of the custom select
//  // TODO: apparently the listeners continue existing?
//  // https://stackoverflow.com/a/76239226
//}

/**
 * For each select we find
 * Create a new, custom one.
 * Main motivation is to be able to control it via programatically
 * which the default one does not
 * source: https://chromestatus.com/feature/5718803933560832
 */
//function setupSelect(el: HTMLSelectElement) {
//  el.setAttribute("tabIndex", "-1");
//
//  // TODO: create wrapper, newSelect etc
//  //
//  const optionsTeardown = Array.from(el.querySelectorAll("option")).map(
//    (opt) => {
//      return setupOption(opt);
//    }
//  );
//
//  // TODO: add more
//  return optionsTeardown;
//}

/**
 * Create a fake option
 */
function setupOption(originalSelect: HTMLSelectElement, el: HTMLOptionElement) {
  const clone = document.createElement("div");
  const content = (el.textContent || "").trim();

  clone.innerText = content;
  clone.style.padding = ".25rem";
  clone.style.pointerEvents = "none";
  // Cancel out the scrollbar
  clone.style.marginRight = "-8px";

  const onClick = function (e: Event) {
    console.log("clicked on child");

    const parent = clone.parentNode as HTMLElement;
    const allOptions = parent.querySelectorAll<HTMLElement>("*");
    allOptions.forEach((el) => (el.style.pointerEvents = "none"));

    e.preventDefault();
    // Since the parent focus back on the first item
    e.stopPropagation();

    // looks weird but it's correct
    originalSelect.value = el.value;
    originalSelect.dispatchEvent(new Event("change"));

    // Couldn't find an well supported way to do that, hint: we want to use fill-available
    const normalHeight = el.offsetHeight;
    parent.style.height = `${normalHeight}px`;
    parent.focus();

    clone.scrollIntoView();

    // TODO: make all parent's styles go back to initial state
    parent.style.overflowY = "hidden";
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

  // The select filters are tabbable by default, but since we are going to manage
  // navigation manually, let's make them not tabbable
  const selects = root.querySelectorAll<HTMLSelectElement>("select");
  selects.forEach((el) => {
    el.setAttribute("tabIndex", "-1");
    //   el.style.visibility = "hidden";

    // Create a fake <select> that we can programatically open
    //
    // Create a wrapper so that our select will have the same size
    const wrapper = document.createElement("div");
    const newSelect = document.createElement("div");

    // Couldn't find an well supported way to do that, hint: we want to use fill-available
    const normalHeight = el.offsetHeight;

    console.log(
      "found all these optiosn",
      Array.from(el.querySelectorAll("option"))
    );

    const options = Array.from(el.querySelectorAll("option")).map((option) => {
      return setupOption(el, option);
    });
    // TODO: create these when options change!
    // since they happen asynchronously, we have to watch them :\
    //    const options = Array.from(el.querySelectorAll("option")).map((opt) => {
    //      const clone = document.createElement("div");
    //      const content = (opt.textContent || "").trim();
    //
    //      clone.innerText = content;
    //      clone.style.padding = ".25rem";
    //      clone.style.pointerEvents = "none";
    //      // Cancel out the scrollbar
    //      clone.style.marginRight = "-8px";
    //
    //      // TODO: i eyeballed this
    //      // clone.style.marginTop = "-6px";
    //      //      height: 100%;
    //      //    display: flex;
    //      //    justify-content: center;
    //      //    align-items: center;
    //
    //      clone.addEventListener("click", (e) => {
    //        console.log("clicked on child");
    //
    //        const allOptions = newSelect.querySelectorAll<HTMLElement>("*");
    //        allOptions.forEach((el) => (el.style.pointerEvents = "none"));
    //
    //        e.preventDefault();
    //        // Since the parent focus back on the first item
    //        e.stopPropagation();
    //
    //        // looks weird but it's correct
    //        opt.value = opt.value;
    //        opt.dispatchEvent(new Event("change"));
    //
    //        const parent = clone.parentNode as HTMLElement;
    //        parent.style.height = `${normalHeight}px`;
    //        parent.focus();
    //
    //        clone.scrollIntoView();
    //
    //        // TODO: make all parent's styles go back to initial state
    //        parent.style.overflowY = "hidden";
    //      });
    //
    //      return clone;
    //    });
    //
    options.forEach((opt) => {
      opt.addEventListener("keydown", (e) => {
        console.log("pressed ");
        e.preventDefault();
        const keyPressed = (e as KeyboardEvent).key;

        switch (keyPressed) {
          case "Enter": {
            console.log("clickingon", opt);
            opt.click();
            return;
          }
          case "ArrowUp": {
            moveToNextOption(options, opt, CL.prev);
            return;
          }
          case "ArrowDown": {
            moveToNextOption(options, opt, CL.next);
            return;
          }
        }
      });
    });

    newSelect.className += "fbn-custom-select";

    newSelect.addEventListener("focusout", (e) => {
      //      console.log("focusing out");
      //      console.log("currentTarget", e.currentTarget);
      //      console.log("target", e.target);
      //      console.log("relatedTarget", e.relatedTarget);
    });
    wrapper.style.position = "relative";
    // For some reason I could not do absolute
    //    el.style.position = "absolute";

    // Copied from the original select
    newSelect.style.backgroundColor = "var(--mainColor)";
    newSelect.style.border = "2px solid var(--mainColor-light)";
    newSelect.style.borderRadius = "4px";
    newSelect.style.outline = "none";
    newSelect.style.color = "#fff";
    //    newSelect.style.fontSize = ".8rem";
    // newSelect.style.padding = ".25rem";

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

    newSelect.addEventListener("click", (e) => {
      console.log("clicked on parent", e);
      // TODO: ideally we would figure out a better value
      newSelect.style.height = "200px";
      newSelect.style.overflow = "auto";

      const allOptions = Array.from(
        newSelect.querySelectorAll<HTMLElement>("*")
      );
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

    el.style.inset = "0";
    el.style.visibility = "hidden";

    el.parentNode?.appendChild(wrapper);
    newSelect.append(...options);
    wrapper.appendChild(el);
    wrapper.appendChild(newSelect);

    //document.querySelector('.welcomeWrapper .filtersList .filterItem select').value = "2"
    // document.querySelector('.welcomeWrapper .filtersList .filterItem select').dispatchEvent(new Event("change"))
    //el.parentNode?.appendChild(newSelect);
  });

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
