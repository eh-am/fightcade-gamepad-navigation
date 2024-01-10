import * as cl from "@app/ds/circularList";

export function setupSelect(select: HTMLSelectElement) {
  const teardown: Teardown[] = [];

  teardown.push(setupKeydown(select));
  return () => {
    teardown.forEach((f) => f());
  };
}

function setupKeydown(select: HTMLSelectElement): Teardown {
  function onKeydown(ev: KeyboardEvent) {
    const pressed = ev.key;
    if (pressed === "Enter") {
      showCustomSelect(select);
      // TODO: show our custom
    }
  }

  select.addEventListener("keydown", onKeydown);
  return () => select.removeEventListener("keydown", onKeydown);
}

function showCustomSelect(select: HTMLSelectElement) {
  const fakeSelect = document.createElement("div");
  fakeSelect.classList.add("fgn-custom-select");
  const customOptions = Array.from(select.querySelectorAll("option")).map(
    createCustomOption
  );

  fakeSelect.append(...customOptions);

  // TODO: what if screen resizes?
  fakeSelect.style.position = "fixed";
  fakeSelect.style.left = select.offsetLeft + "px";
  fakeSelect.style.top = select.offsetTop + "px";
  fakeSelect.style.width = select.offsetWidth + "px";
  // 5 items at a time
  fakeSelect.style.height = select.offsetHeight * 5 + "px";
  fakeSelect.style.zIndex = "999";
  fakeSelect.style.textAlign = "left";

  fakeSelect.style.scrollbarGutter = "stable";
  fakeSelect.style.fontSize = "0.8rem";

  // Copied from the original select
  fakeSelect.style.backgroundColor = "var(--mainColor)";
  fakeSelect.style.border = "2px solid var(--mainColor-light)";
  fakeSelect.style.borderRadius = "4px";
  fakeSelect.style.color = "#fff";
  // We use scroll so that the focus outline is uniform whether a scrollbar is technically required or not
  fakeSelect.style.overflow = "hidden scroll";

  select.parentNode?.append(fakeSelect);

  // Focus on the first item
  // TODO: focus on the last selected value
  findSelectedCustomOption(select, customOptions)?.focus();
  //customOptions[0].focus();

  // TODO: teardown
  customOptions.map((opt) => {
    return createCustomOptionListeners(select, customOptions, opt);
  });

  // When the value changes, close the fake select
  select.addEventListener(
    "change",
    () => {
      select.focus();
    },
    { once: true }
  );

  // When focusing on anything else, don't let this show
  fakeSelect.addEventListener("focusout", (e: FocusEvent) => {
    const target = e.relatedTarget as Node | null;

    // !target means it's focusing on the body
    if (!target || (target && !fakeSelect.contains(target))) {
      // Focusing on a child
      fakeSelect.remove();
    }
  });
}

/**
 * Create a fake option
 */
function createCustomOption(el: HTMLOptionElement) {
  const clone = document.createElement("div");
  const content = (el.textContent || "").trim();

  clone.setAttribute("tabIndex", "-1");
  clone.setAttribute("data-value", el.value);
  clone.setAttribute("aria-label", content);
  clone.innerText = content;
  clone.style.padding = ".25rem";

  // Eyeballed it
  clone.style.paddingTop = "5px";

  // Counter the scrollbar
  // TODO: we should only add this when a scrollbar is not necessary
  //  clone.style.marginRight = "-8px";
  clone.style.paddingLeft = "8px";

  return clone;
}

function createCustomOptionListeners(
  select: HTMLSelectElement,
  customOptions: HTMLDivElement[],
  customOption: HTMLElement
): Teardown {
  function onKeydown(e: KeyboardEvent) {
    const keyPressed = e.key;

    switch (keyPressed) {
      case "Escape": {
        e.preventDefault();
        e.stopPropagation();
        select.focus();
        return;
      }
      case "Enter": {
        e.preventDefault();
        e.stopPropagation();
        customOption.click();
        return;
      }
      case "ArrowUp": {
        e.preventDefault();
        e.stopPropagation();
        moveToNextOption(customOptions, customOption, cl.prev);
        return;
      }
      case "ArrowDown": {
        e.preventDefault();
        e.stopPropagation();
        moveToNextOption(customOptions, customOption, cl.next);
        return;
      }
    }
  }

  function onClick(e: Event) {
    select.value = customOption.getAttribute("data-value") || "";
    select.dispatchEvent(new Event("change"));
  }
  customOption.addEventListener("keydown", onKeydown);
  customOption.addEventListener("click", onClick);
  return () => {
    customOption.removeEventListener("keydown", onKeydown);
    customOption.removeEventListener("click", onClick);
  };
}

function moveToNextOption(
  array: HTMLElement[],
  myself: HTMLElement,
  nextFn: typeof cl.next
) {
  const next = nextFn(array, myself);

  // So that it's focusable
  next.setAttribute("tabIndex", "-1");
  next.focus();
}

function findSelectedCustomOption(
  select: HTMLSelectElement,
  customOptions: HTMLDivElement[]
) {
  const value = select.value;
  const found = customOptions.find((el) => {
    return el.getAttribute("data-value") === value;
  });

  if (found) {
    return found;
  }

  return customOptions[0];
}
