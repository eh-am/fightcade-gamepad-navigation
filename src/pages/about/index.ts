export * from "./init";
export * from "./update";

export const getRoot = () =>
  document.querySelector<HTMLElement>(".aboutWrapper");
