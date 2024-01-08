export function setupChat(root: HTMLElement): Teardown {
  const teardown: Teardown[] = [];
  const challenges = Array.from(
    root.querySelectorAll<HTMLElement>(".challengeWrapper .challengeContent")
  );

  teardown.push(...challenges.map((el) => setupBeenChallenged(el)));
  teardown.push(...setupCancelChallengeButtons(root));

  return () => {
    teardown.forEach((f) => f());
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
      const next = cl.next(buttons, focusedElement);
      next.focus();
    } else if (pressed === "ArrowLeft") {
      e.preventDefault();
      const next = cl.prev(buttons, focusedElement);
      next.focus();
    }
  };

  parent.addEventListener("keydown", onKeydown);
  return () => {
    parent.removeEventListener("keydown", onKeydown);
  };
}
