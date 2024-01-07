import { addCSS } from "@app/dom";

export function init(): boolean {
  addCSS(`
  .searchWrapper .contentWrapper {
    overflow: initial !important;
    display: flex;
    flex-direction: column;
    padding-bottom: 0 !important;
  }

  .searchWrapper .searchResultsWrapper {
    overflow: auto;
  }
  .searchWrapper .searchResultsWrapper .searchResultsGrid {
  /*
    overflow: auto !important;
    height: 100%;
    padding-bottom: 200px;
    */
  }

/*
  .searchWrapper .searchResultsWrapper .paginationWrapper {
    bottom: 0;
    background-color: var(--mainColor-light);
    z-index: 1;
  }
  */
  `);

  return true;
}
