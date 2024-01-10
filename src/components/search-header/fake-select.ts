import * as list from "@app/ds/circularList";

/**
 * For each select we find
 * Create a new, custom one.
 * Main motivation is to be able to control it via programatically
 * which the default one does not
 * source: https://chromestatus.com/feature/5718803933560832
 */
export function setupCustomSelect(el: HTMLSelectElement): Teardown {
  el.setAttribute("tabIndex", "-1");

  const wrapper = document.createElement("div");

  const realOptions = Array.from(el.querySelectorAll("option"));
  // For some reason it hasn't been initialized yet
  if (!realOptions.length) {
    return () => {};
  }

  // TODO: do i need this
  //el.addEventListener("change", () => {
  //  // TODO: fix this type
  //  findSelectedFakeOption(el)?.scrollIntoView();
  //});

  // Setup the fake options
  const options = realOptions.map(createFakeOption.bind(null, el));

  options.forEach((opt) => {
    setupFakeOptionsKeydownListeners(options, opt);
  });

  wrapper.style.position = "relative";
  // For some reason I could not do absolute
  //    el.style.position = "absolute";
  const newSelect = newFakeSelect();
  newSelect.setAttribute("role", "listbox");
  newSelect.setAttribute("aria-label", getClosestTitle(el) || "");

  newSelect.addEventListener("focusout", (ev) => {
    const to = ev.relatedTarget as HTMLElement;
    if (to && newSelect.contains(to)) {
      return;
    }

    // TODO: unify with another place where we set back to the initial state
    const normalHeight = el.offsetHeight;
    newSelect.style.height = `${normalHeight}px`;
    newSelect.style.overflowY = "hidden";
    const allOptions = newSelect.querySelectorAll<HTMLElement>("*");
    allOptions.forEach((el) => (el.style.pointerEvents = "none"));
  });

  el.setAttribute(
    "data-testid",
    `select-${getClosestTitle(el)?.toLowerCase() || ""}`
  );
  el.style.inset = "0";
  el.style.visibility = "hidden";

  el.parentNode?.appendChild(wrapper);
  newSelect.append(...options);
  wrapper.appendChild(el);
  wrapper.appendChild(newSelect);

  //  syncFromMirror(el);

  return () => {
    console.log("I am supposed to tear down");
  };
}

function setupFakeOptionsKeydownListeners(
  allOptions: HTMLElement[],
  el: HTMLElement
) {
  el.addEventListener("keydown", (e) => {
    const keyPressed = (e as KeyboardEvent).key;

    switch (keyPressed) {
      case "Enter": {
        e.preventDefault();
        e.stopPropagation();
        el.click();
        return;
      }
      case "ArrowUp": {
        e.preventDefault();
        e.stopPropagation();
        moveToNextOption(allOptions, el, list.prev);
        return;
      }
      case "ArrowDown": {
        e.preventDefault();
        e.stopPropagation();
        moveToNextOption(allOptions, el, list.next);
        return;
      }
    }
  });
}

function findSelectedFakeOption(el: HTMLSelectElement) {
  return el
    .closest(".filterItem")
    ?.querySelector<HTMLElement>(
      `.fgn-custom-select > [data-value="${el.value}"]`
    );
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

  clone.setAttribute("tabIndex", "-1");
  clone.setAttribute("data-value", el.value);
  clone.setAttribute("aria-label", content);
  clone.innerText = content;
  clone.style.padding = ".25rem";
  clone.style.pointerEvents = "none";
  // Cancel out the scrollbar
  clone.style.marginRight = "-8px";
  // Eyeballed it
  clone.style.paddingTop = "5px";

  // If that item was originally selected, scroll into te fake option to make it look like it was selected
  if (originalSelect.value === el.value) {
    console.log("trying to scroll here", originalSelect.value);
    // TODO: this is not working
    // it needs to be scrolled when the filter is visible
    // I wonder if we can set offset height
    // TODO: use https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    clone.scrollIntoView();
  }
  // Copied from the original
  //  clone.style.boxShadow =
  //    "inset 0 0 12px var(--accentColor),0 0 12px var(--accentColor)";
  //  clone.style.borderColor = "var(--accentColor)";

  const onClick = function (e: Event) {
    console.log("clicked on", el);
    e.preventDefault();
    // Since the parent tends focus back on the first item
    e.stopPropagation();

    const parent = clone.parentNode as HTMLElement;
    const allOptions = parent.querySelectorAll<HTMLElement>("*");
    allOptions.forEach((el) => (el.style.pointerEvents = "none"));

    // TODO: kinda ugly, but we need to make sure other instances have the same content
    // otherwise when changing views (eg welcome -> search), data will be out of sync
    //syncToMirror(originalSelect);

    originalSelect.value = el.value;
    syncToMirror(originalSelect);

    originalSelect.dispatchEvent(new Event("change"));
    //originalSelect.value = el.value;

    // Couldn't find an well supported way to do that, hint: we want to use fill-available
    const normalHeight = originalSelect.offsetHeight;
    parent.style.height = `${normalHeight}px`;

    parent.focus();

    // Scroll to the selected value so that's visible
    // Useful in 2 situations:
    // 1. Dev,
    // 2. and when a search has already happened, otherwise it opens an "All Games" page
    clone.scrollIntoView();

    // TODO: make all parent's styles go back to initial state
    parent.style.overflow = "hidden";
  };

  clone.addEventListener("click", onClick);
  return clone;
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

function findMirrorSelect(originalSelect: HTMLSelectElement) {
  const title = getClosestTitle(originalSelect);
  const mirror = Array.from(
    document.querySelectorAll<HTMLSelectElement>("select")
  )
    .filter((el) => getClosestTitle(el) === title)
    .find((el) => el !== originalSelect);

  return mirror;
}

function getClosestTitle(el: HTMLSelectElement) {
  return el.closest(".filterItem")?.querySelector(".title")?.textContent;
}

function findMirrorSelectedFakeOption(originalSelect: HTMLSelectElement) {
  const mirror = findMirrorSelect(originalSelect);
  if (!mirror) {
    return;
  }

  return findSelectedFakeOption(mirror);
}

function syncFromMirror(target: HTMLSelectElement) {
  console.log("syncing from mirror, original", target);
  const mirror = findMirrorSelect(target);
  console.log("mirror is", mirror);

  if (!mirror) {
    return;
  }

  console.log("mirorr value", mirror.value);
  console.log("target value", target.value);

  target.value = mirror.value;
  console.log("after syncing", target.value, mirror.value);

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

function newFakeSelect(): HTMLElement {
  const newSelect = document.createElement("div");
  newSelect.className += "fgn-custom-select";
  newSelect.setAttribute("tabIndex", "-1");

  // Copied from the original select
  newSelect.style.backgroundColor = "var(--mainColor)";
  newSelect.style.border = "2px solid var(--mainColor-light)";
  newSelect.style.borderRadius = "4px";
  //  newSelect.style.outline = "none";
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
  newSelect.addEventListener("click", () => {
    // TODO: ideally we would figure out a better value
    // downside is that for smaller selects it still shows an empty space
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
      // TODO: this doesn't seem to be working
      option.focus();
    }
  });

  return newSelect;
}

function moveToNextOption(
  array: HTMLElement[],
  myself: HTMLElement,
  nextFn: typeof list.next
) {
  // TODO: make all have tabIndex -1
  //  myself.removeAttribute("tabIndex");

  const next = nextFn(array, myself);

  // So that it's focusable
  next.setAttribute("tabIndex", "-1");
  next.focus();
}
