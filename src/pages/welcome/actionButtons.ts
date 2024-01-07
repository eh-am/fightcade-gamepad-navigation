import * as list from "@app/ds/list";

type onChangeCard = (nextFn: typeof list.next) => void;

export function setupActionButton(
  allButtons: HTMLElement[],
  button: HTMLElement,
  onChangeCard: onChangeCard
): Teardown {
  // By default <a> tags are tabbable, so let's disable it
  // since we will handle that manually
  button.setAttribute("tabIndex", "-1");
  button.setAttribute("href", "#");

  return setupKeydown(allButtons, button, onChangeCard);
}

function setupKeydown(
  allButtons: HTMLElement[],
  button: HTMLElement,
  onChangeCategory: onChangeCard
): Teardown {
  function onKeydown(e: KeyboardEvent) {
    const keyPressed = e.key;

    if (keyPressed === "ArrowLeft") {
      e.preventDefault();
      e.stopPropagation();
      onChangeCategory(list.prev);
    } else if (keyPressed === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      onChangeCategory(list.next);
    } else if (keyPressed === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      button.click();
    } else if (keyPressed === "ArrowUp") {
      e.preventDefault();
      e.stopPropagation();
      moveVertically(allButtons, button, list.prev);
    } else if (keyPressed === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      moveVertically(allButtons, button, list.next);
    }
  }

  button.addEventListener("keydown", onKeydown);
  return () => button.removeEventListener("keydown", onKeydown);
}

function moveVertically(
  allButtons: HTMLElement[],
  button: HTMLElement,
  nextFn: typeof list.next
) {
  const next = nextFn(allButtons, button);
  if (next === "OOB") {
    return;
  }

  next.focus();
}
