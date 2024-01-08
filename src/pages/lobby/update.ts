import { setupToolbar } from "./toolbar";
import { setupUserList } from "./userList";
import { setupChat } from "./chat";

const teardown: Teardown[] = [];
export function updateLobby(root: HTMLElement) {
  teardown.forEach((fn) => {
    fn();
  });
  teardown.length = 0;

  teardown.push(setupToolbar(root));
  teardown.push(setupUserList(root));
  teardown.push(setupChat(root));
}
