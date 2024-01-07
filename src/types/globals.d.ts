declare global {
  type ListOfHTML = NodeListOf<HTMLElement> | HTMLElement[];
  type Teardown = () => void;

  type OOB_Event = {
    direction: "START" | "END";
    axis: "HORIZONTAL" | "VERTICAL";
  };

  interface HTMLElementEventMap {
    OOB_Event: CustomEvent<OOB_Event>;
  }
  // https://github.com/microsoft/TypeScript/issues/28357#issuecomment-748550734
  interface DocumentEventMap {
    OOB_Event: CustomEvent<OOB_Event>;
  }
}

// Typescript requires it when adding global types
export {};
