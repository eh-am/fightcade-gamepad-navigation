import { isElectron } from "./electron";

let timer: ReturnType<typeof setTimeout>;

// TODO: in dev mode show an inintrusive modal
export function notify(msg: string) {
  if (isElectron()) {
    // Notice that if doesn't work, you need to:
    // Enable it. For ex, on mac it's under System Preferences -> Notifications
    // If on mac, turn off Do Not Disturb
    if (window.Notification) {
      new window.Notification(msg, {
        silent: true,
      });
    }
  } else {
    // Very naive solution, but since it only applies to local dev it should be fine
    let snackbar = document.getElementById("#fgn-snackbar");

    if (!snackbar) {
      snackbar = document.createElement("div");
      snackbar.setAttribute("id", "#fgn-snackbar");
      document.body.appendChild(snackbar);
    }

    snackbar.style.visibility = "visible";
    snackbar.style.position = "fixed";
    snackbar.style.right = "20px";
    snackbar.style.bottom = "20px";
    snackbar.style.background = "#222";
    snackbar.style.border = "2px solid #4d4b4b";
    snackbar.style.borderRadius = "4px";
    snackbar.style.padding = "20px";
    snackbar.style.color = "#fff";
    snackbar.style.fontFamily = "Arial";
    snackbar.style.zIndex = "1";
    snackbar.style.minHeight = "100px";
    snackbar.style.display = "flex";
    snackbar.style.justifyContent = "center";
    snackbar.style.alignItems = "center";

    snackbar.textContent = msg;
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      if (snackbar) {
        snackbar.style.visibility = "hidden";
      }
    }, 3000);
  }
}
