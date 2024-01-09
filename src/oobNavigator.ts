import { findFirstFocusableChild, isFocusable, isVisible } from "@app/dom";
import { NavigationProps } from "@app/types/navigation";

interface Props {
  sidebar: HTMLElement;
  welcome: HTMLElement;
  search: HTMLElement;
  lobbies: HTMLElement[];
}

const teardown: Teardown[] = [];
let cameFrom: HTMLElement | undefined;

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

  if (props.lobbies.length && props.sidebar) {
    const fn = onPageOOB.bind(null, props.sidebar);

    teardown.push(
      ...props.lobbies.map((lobby) => {
        lobby.addEventListener("OOB_Event", fn);
        return () => lobby.removeEventListener("OOB_Event", fn);
      })
    );
  }
}

function onPageOOB(sidebar: HTMLElement, e: CustomEvent<OOB_Event>) {
  if (e.detail.axis === "HORIZONTAL" && e.detail.direction === "START") {
    if (e.detail.el) {
      cameFrom = e.detail.el;
    }
    const next = findFirstFocusableChild(sidebar);
    next?.focus();
  }
}

function onSidebarOOB(pages: HTMLElement[], e: CustomEvent<OOB_Event>) {
  if (e.detail.axis === "HORIZONTAL" && e.detail.direction === "END") {
    if (cameFrom && isVisible(cameFrom)) {
      // https://stackoverflow.com/a/54581689
      // not exactly the same issue but it works nevertheless
      window.setTimeout(function () {
        cameFrom?.focus();
        cameFrom = undefined;
      }, 0);

      return;
    }

    const visiblePages = pages.filter((e) => isVisible(e));
    if (visiblePages.length > 1) {
      console.warn("More than one page visible at the same time", visiblePages);
    }

    if (visiblePages[0]) {
      // TODO: this should be smarter
      const next = findFirstFocusableChild(visiblePages[0]);
      next?.focus();
    }
  }
}

export function dispatchOOBEvent(
  props: NavigationProps & { root: HTMLElement }
) {
  const { root, axis, direction, el } = props;
  root.dispatchEvent(
    new CustomEvent("OOB_Event", {
      bubbles: true,
      detail: {
        axis,
        direction,
        el,
      },
    })
  );
}
