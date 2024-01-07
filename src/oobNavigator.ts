import { findFirstFocusableChild, isFocusable, isVisible } from "@app/dom";

interface Props {
  sidebar: HTMLElement;
  welcome: HTMLElement;
  search: HTMLElement;
  lobbies: HTMLElement[];
}

const teardown: Teardown[] = [];
export function startOOBNavigator(props: Props) {
  teardown.forEach((fn) => {
    fn();
  });
  teardown.length = 0;

  const pages = [props.welcome, props.search, props.lobbies].flatMap((e) => e);

  if (props.sidebar) {
    const sidebarFn = onSidebarOOB.bind(null, pages);

    props.sidebar.addEventListener("OOB_Event", sidebarFn);
    teardown.push(() =>
      props.sidebar.removeEventListener("OOB_Event", sidebarFn)
    );
  }

  // These all should be the same vertically
  if (props.welcome && props.sidebar) {
    const fn = onPageOOB.bind(null, props.sidebar);

    props.welcome.addEventListener("OOB_Event", fn);
    teardown.push(() => props.welcome.removeEventListener("OOB_Event", fn));
  }

  if (props.search && props.sidebar) {
    const fn = onPageOOB.bind(null, props.sidebar);

    props.search.addEventListener("OOB_Event", fn);
    teardown.push(() => props.search.removeEventListener("OOB_Event", fn));
  }
}

function onPageOOB(sidebar: HTMLElement, e: CustomEvent<OOB_Event>) {
  if (e.detail.axis === "HORIZONTAL" && e.detail.direction === "START") {
    const next = findFirstFocusableChild(sidebar);
    next?.focus();
  }
}

function onSidebarOOB(pages: HTMLElement[], e: CustomEvent<OOB_Event>) {
  if (e.detail.axis === "HORIZONTAL" && e.detail.direction === "END") {
    const visiblePages = pages.filter((e) => isVisible(e));
    if (visiblePages.length > 1) {
      console.warn("More than page visible at the same time", visiblePages);
    }

    if (visiblePages[0]) {
      // TODO: this should be smarter
      const next = findFirstFocusableChild(visiblePages[0]);
      next?.focus();
    }
  }
}

export function dispatchOOBEvent(
  from: HTMLElement,
  axis: "HORIZONTAL" | "VERTICAL",
  direction: "START" | "END"
) {
  from.dispatchEvent(
    new CustomEvent("OOB_Event", {
      bubbles: true,
      detail: {
        axis: axis,
        direction,
      },
    })
  );
}
