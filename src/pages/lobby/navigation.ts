import { Direction, NavigationProps } from "@app/types/navigation";
import { findFirstFocusableChild } from "@app/dom";
import { dispatchOOBEvent } from "@app/oobNavigator";

export function onOOBNavigation(root: HTMLElement, props: NavigationProps) {
  dispatchOOBEvent({
    ...props,
    root,
  });
}

export function onToolbarVerticalOOB(
  usersListRoot: HTMLElement,
  direction: Direction
) {
  if (direction === "END") {
    const next = findFirstFocusableChild(usersListRoot);
    next?.focus();
  }
}

export function onUserListVerticalOOB(
  toolbarRoot: HTMLElement,
  direction: Direction
) {
  if (direction === "START") {
    const next = findFirstFocusableChild(toolbarRoot);
    next?.focus();
  }
}

export function onUserListHorizontalOOB(
  chatRoot: HTMLElement,
  direction: Direction
) {
  if (direction === "START") {
    const next = findFirstFocusableChild(chatRoot);
    next?.focus();
  }
}

export function onChatHorizontalOOB(
  root: HTMLElement,
  userList: HTMLElement,
  direction: Direction,
  el: HTMLElement
) {
  if (direction === "END") {
    const next = findFirstFocusableChild(userList);
    next?.focus();
  } else if (direction === "START") {
    // Dispatch to
    onOOBNavigation(root, {
      axis: "HORIZONTAL",
      direction,
      el,
    });
  }
}

export function onChatVerticalOOB(
  toolbarRoot: HTMLElement,
  direction: Direction
) {
  if (direction === "START") {
    const next = findFirstFocusableChild(toolbarRoot);
    next?.focus();
  }
}
