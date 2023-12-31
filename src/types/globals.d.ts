declare global {
  type ListOfHTML = NodeListOf<HTMLElement> | HTMLElement[];
  type Teardown = () => void;
}

// Typescript requires it when adding global types
export {};
