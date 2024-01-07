import * as list from "@app/ds/list";
import { setupCard } from "@app/components/card";
import { rovingTabIndex } from "../../dom";

export function setupGrid(
  root: HTMLElement,
  onHorizontalOOB: (direction: "START" | "END") => void,
  onVerticalOOB: (direction: "START" | "END") => void
): { teardown: Teardown; allCards: HTMLElement[] } {
  const teardown: Teardown[] = [];
  const cards = Array.from(
    root.querySelectorAll<HTMLElement>(".channelWrapper")
  );

  const baseOffset = cards[0].offsetTop;
  const breakIndex = cards.findIndex((item) => item.offsetTop > baseOffset);
  const cardsPerRow = breakIndex === -1 ? cards.length : breakIndex;

  teardown.push(
    ...cards.map((el) => {
      return setupCard(
        cards,
        el,
        (allCards, currCard, direction) => {
          // move within grid
          // https://stackoverflow.com/a/49090306
          const baseOffset = allCards[0].offsetTop;
          const breakIndex = allCards.findIndex(
            (item) => item.offsetTop > baseOffset
          );
          const numPerRow = breakIndex === -1 ? allCards.length : breakIndex;
          const nextIndex = direction === "ArrowUp" ? -numPerRow : numPerRow;
          const next = list.to(cards, currCard, nextIndex);
          if (next.status === "OK") {
            rovingTabIndex(currCard, next.value);
            next.value.focus();
          } else {
            onVerticalOOB(direction === "ArrowUp" ? "START" : "END");
          }
        },
        (direction) => {
          onHorizontalOOB(direction);
        },
        cardsPerRow
      );
    })
  );

  return {
    allCards: cards,
    teardown: () => {
      teardown.forEach((v) => v());
    },
  };
}
