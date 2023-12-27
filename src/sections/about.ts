import { isHidden } from "../dom";

export function initAbout(): boolean {
  if (isHidden(document.querySelector(".aboutWrapper"))) {
    return false;
  }

  console.log("initializing about...");

  // We don't want to focus on any of the items
  const tabbableElements =
    document
      .querySelector(".aboutWrapper")
      ?.querySelectorAll(
        "audio, button, canvas, details, iframe, input, select, summary, textarea, video, [accesskey], [contenteditable], [href], [tabindex]"
      ) || [];

  tabbableElements.forEach((el) => el.setAttribute("tabIndex", "-1"));
  return true;
}
