declare global {
  type ListOfHTML = NodeListOf<HTMLElement> | HTMLElement[];
  type Teardown = () => void;
}

declare module "ally.js/src/query/tabsequence";
declare module "ally.js/src/is/visible";

/* Mostly for our vendored Controller.js */
declare module "*";

export {};
