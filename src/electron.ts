import { isDev } from "@app/devOnly";

function tryRequire(name: string) {
  try {
    return require(name);
  } catch (e) {
    return {};
  }
}
const electronName = "electron";
const win = tryRequire(electronName);

export function hasFocus() {
  if (!isDev()) {
    // TODO: this is deprecated and should be removed in electron 14
    // https://www.electronjs.org/docs/latest/breaking-changes#removed-remote-module
    return win.remote.BrowserWindow.getAllWindows()[0].isFocused();
  }

  return true;
}

// https://stackoverflow.com/a/61725416
export function isElectron() {
  // Renderer process
  if (
    typeof window !== "undefined" &&
    typeof window.process === "object" &&
    "type" in window.process &&
    window.process.type === "renderer"
  ) {
    return true;
  }

  // Main process
  if (
    typeof process !== "undefined" &&
    typeof process.versions === "object" &&
    !!process.versions.electron
  ) {
    return true;
  }

  // Detect the user agent when the `nodeIntegration` option is set to true
  if (
    typeof navigator === "object" &&
    typeof navigator.userAgent === "string" &&
    navigator.userAgent.indexOf("Electron") >= 0
  ) {
    return true;
  }

  return false;
}
