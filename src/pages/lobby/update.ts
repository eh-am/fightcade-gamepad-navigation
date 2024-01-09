import { setupToolbar } from "./toolbar";
import { setupUserList } from "./userList";
import { setupChat } from "./chat";
import { Direction, NavigationProps } from "@app/types/navigation";
import { findFirstFocusableChild } from "@app/dom";
import { dispatchOOBEvent } from "@app/oobNavigator";

const teardown: Teardown[] = [];
export function updateLobby(root: HTMLElement) {
  teardown.forEach((fn) => {
    fn();
  });
  teardown.length = 0;

  const usersListRoot = root.querySelector<HTMLElement>(".usersListWrapper");
  if (!usersListRoot) {
    return;
  }

  const toolbarRoot = root.querySelector<HTMLElement>(".channelToolbar");
  if (!toolbarRoot) {
    return;
  }

  const chatRoot = root.querySelector<HTMLElement>(".chatWrapper");
  if (!chatRoot) {
    return;
  }

  teardown.push(
    setupUserList({
      root: usersListRoot,
      onVerticalOOB: onUserListVerticalOOB.bind(null, toolbarRoot),
      onHorizontalOOB: onUserListHorizontalOOB.bind(null, chatRoot),
    })
  );

  teardown.push(
    setupToolbar({
      root,
      onOOBNavigation: onOOBNavigation.bind(null, root),
      onVerticalOOB: onToolbarOOB.bind(null, usersListRoot),
    })
  );
  teardown.push(
    setupChat({
      root: chatRoot,
      onHorizontalOOB: onChatHorizontalOOB.bind(null, root, usersListRoot),
      onVerticalOOB: onChatVerticalOOB.bind(null, toolbarRoot),
      onOOBNavigation: onOOBNavigation.bind(null, root),
    })
  );
}

function onOOBNavigation(root: HTMLElement, props: NavigationProps) {
  dispatchOOBEvent({
    ...props,
    root,
  });
}

function onToolbarOOB(usersListRoot: HTMLElement, direction: Direction) {
  if (direction === "END") {
    const next = findFirstFocusableChild(usersListRoot);
    next?.focus();
  }
}

function onUserListVerticalOOB(toolbarRoot: HTMLElement, direction: Direction) {
  if (direction === "START") {
    const next = findFirstFocusableChild(toolbarRoot);
    next?.focus();
  }
}

function onUserListHorizontalOOB(chatRoot: HTMLElement, direction: Direction) {
  if (direction === "START") {
    const next = findFirstFocusableChild(chatRoot);
    next?.focus();
  }
}

function onChatHorizontalOOB(
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
function onChatVerticalOOB(toolbarRoot: HTMLElement, direction: Direction) {
  if (direction === "START") {
    const next = findFirstFocusableChild(toolbarRoot);
    next?.focus();
  }
}
