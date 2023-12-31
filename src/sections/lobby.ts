import * as CL from "../circularList";

export function initLobby(root: HTMLElement) {}

function setupToolbar(root: HTMLElement): Teardown {
  const buttons = root.querySelectorAll<HTMLElement>(".channelActions > *");
  const channelActions = root.querySelector<HTMLElement>(".channelActions");
  if (!channelActions) {
    return () => {};
  }

  console.log("adding listeners to channel actions", channelActions);
  function onKeydown(e: KeyboardEvent) {
    const pressed = e.key;
    const focusedElement = document.activeElement as HTMLElement;
    console.log("pressed", pressed, focusedElement);

    if (pressed === "Enter") {
      e.preventDefault();
      focusedElement?.click();
    } else if (pressed === "ArrowRight") {
      e.preventDefault();
      const next = CL.next2(buttons, focusedElement);
      console.log("focusing on", next);
      next.focus();
    } else if (pressed === "ArrowLeft") {
      e.preventDefault();
      const next = CL.prev2(buttons, focusedElement);
      next.focus();
    }
  }

  // Add a single listener
  channelActions.addEventListener("keydown", onKeydown);

  return () => {
    channelActions.removeEventListener("keydown", onKeydown);
  };
}

function setupUserList(root: HTMLElement): Teardown {
  const allUsers = root.querySelectorAll<HTMLElement>(
    ".usersListWrapper .userItem"
  );
  const container = root.querySelector<HTMLElement>(".usersListWrapper");

  if (!container || !allUsers) {
    return () => {};
  }

  allUsers.forEach((el, index) => {
    if (!el.hasAttribute("tabIndex")) {
      el.setAttribute("tabIndex", index === 0 ? "0" : "-1");
    }

    el.setAttribute("role", "button");
    const playerName = el.querySelector<HTMLElement>(".playerName");
    if (playerName) {
      el.setAttribute("aria-label", playerName.textContent || "");
    }
  });

  function onKeydown(e: KeyboardEvent) {
    const pressed = e.key;
    const focusedElement = document.activeElement as HTMLElement;
    console.log("pressed", pressed, focusedElement);

    // TODO: rovering tabindex
    if (pressed === "Enter") {
      e.preventDefault();
      focusedElement?.click();
    } else if (pressed === "ArrowDown") {
      e.preventDefault();
      const next = CL.next2(allUsers, focusedElement);
      console.log("focusing on", next);
      next.focus();
    } else if (pressed === "ArrowUp") {
      e.preventDefault();
      const next = CL.prev2(allUsers, focusedElement);
      next.focus();
    }
  }
  // Set up a single listener
  container.addEventListener("keydown", onKeydown);
  return () => {
    container.removeEventListener("keydown", onKeydown);
  };
}

function setupCancelChallengeButtons(root: HTMLElement): Teardown[] {
  // TODO: lazy, should handle keyboard navigation to/from maybe?
  const cancelChallengeBtns = Array.from(
    root.querySelectorAll<HTMLElement>(".challengeContainer .cancel-challenge")
  );

  cancelChallengeBtns.forEach((el) => {
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "Cancel Challenge");
    el.setAttribute("tabindex", "0");
  });

  return cancelChallengeBtns.map((el) => {
    function onKeydown(e: KeyboardEvent) {
      const pressed = e.key;
      if (pressed === "Enter") {
        e.preventDefault();
        el.click();
      }
    }
    el.addEventListener("keydown", onKeydown);
    return () => el.removeEventListener("keydown", onKeydown);
  });
}

// root should be .challengeContent
function setupBeenChallenged(root: HTMLElement): Teardown {
  if (root.classList.contains("challengeContainer")) {
    throw new Error("Expected '.challengeContainer' as the root");
  }
  const acceptChallengeBtn =
    root.querySelector<HTMLElement>(".accept-challenge");

  const declineChallengeBtn =
    root.querySelector<HTMLElement>(".decline-challenge");

  const parent = acceptChallengeBtn?.parentNode as HTMLElement;
  if (!acceptChallengeBtn || !declineChallengeBtn || !parent) {
    return () => {};
  }

  acceptChallengeBtn.setAttribute("tabIndex", "0");
  acceptChallengeBtn.setAttribute("role", "button");
  acceptChallengeBtn.setAttribute("aria-label", "Accept Challenge");

  declineChallengeBtn.setAttribute("tabIndex", "-1");
  declineChallengeBtn.setAttribute("role", "button");
  declineChallengeBtn.setAttribute("aria-label", "Decline Challenge");

  const buttons = [acceptChallengeBtn, declineChallengeBtn];

  const onKeydown = (e: KeyboardEvent) => {
    const pressed = e.key;
    const focusedElement = document.activeElement as HTMLElement;

    if (pressed === "Enter") {
      e.preventDefault();
      focusedElement?.click();
    } else if (pressed === "ArrowRight") {
      e.preventDefault();
      const next = CL.next2(buttons, focusedElement);
      next.focus();
    } else if (pressed === "ArrowLeft") {
      e.preventDefault();
      const next = CL.prev2(buttons, focusedElement);
      next.focus();
    }
  };

  parent.addEventListener("keydown", onKeydown);
  return () => {
    parent.removeEventListener("keydown", onKeydown);
  };
}

let teardown: Teardown[] = [];
export function updateLobby(root: HTMLElement) {
  teardown.forEach((fn) => {
    fn();
  });
  teardown = [];

  const testGameBtn = root.querySelector(".channelActions .testGame");
  const trainingBtn = root.querySelector(".channelActions .trainingGame");

  testGameBtn?.setAttribute("tabindex", "0");
  testGameBtn?.setAttribute("role", "button");
  testGameBtn?.setAttribute("aria-label", "Test Game");

  trainingBtn?.setAttribute("role", "button");
  trainingBtn?.setAttribute("aria-label", "Training");
  trainingBtn?.setAttribute("tabindex", "-1");

  teardown.push(setupToolbar(root));
  teardown.push(setupUserList(root));
  teardown.push(...setupCancelChallengeButtons(root));

  const challenges = Array.from(
    root.querySelectorAll<HTMLElement>(".challengeWrapper .challengeContent")
  );
  console.log({ challenges });
  teardown.push(...challenges.map((el) => setupBeenChallenged(el)));
}

// document.querySelectorAll('.usersListWrapper .userItem')
