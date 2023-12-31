declare global {
  export type ListOfHTML = NodeListOf<HTMLElement> | HTMLElement[];
  export type Teardown = () => void;
}

declare module "ally.js/src/query/tabsequence";
declare module "ally.js/src/is/visible";

/* Mostly for our vendored Controller.js */
declare module "*";
