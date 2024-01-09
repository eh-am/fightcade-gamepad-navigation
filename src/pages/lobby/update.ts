import { setupToolbar } from "./toolbar";
import { setupUserList } from "./userList";
import { setupChat } from "./chat";
import {
  onChatHorizontalOOB,
  onChatVerticalOOB,
  onOOBNavigation,
  onToolbarVerticalOOB,
  onUserListHorizontalOOB,
  onUserListVerticalOOB,
} from "@app/pages/lobby/navigation";

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
      onVerticalOOB: onToolbarVerticalOOB.bind(null, usersListRoot),
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
