import { addCSS } from "@app/dom";
import { log } from "@app/log";

export function init(): boolean {
  log("Initializing search...");

  setupCSS();
  return true;
}

// TODO: scope all this?
function setupCSS() {
  addCSS(`
  /* with this grid implementation, focusing doesn't scrollIntoView for some reason */
  /*
  .welcomeListGrid, .welcomeListGridBig {
    overflow: auto !important;
    grid-auto-flow: column;
    grid-auto-columns: 200px;
  }
  */
  .welcomeListGrid, .welcomeListGridBig {
    display: flex !important;
    overflow: auto !important; /* show scrollbar if necessary */
  }
  .welcomeListGrid .gridWrapper, .welcomeListGridBig .gridWrapper {
    flex: 1 0 200px;
  }

  /* copy styles from hover 
   * although it could be easily done via javascript
     https://stackoverflow.com/a/66819918
  */
.button-generic:hover {
 transform: scale(1.05);
    color: var(--mainColor-dark);
    cursor: pointer;
}
   `);
}
