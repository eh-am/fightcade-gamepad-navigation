declare var FBN_DEBUG: boolean;

// Although it's possible to drop all console logs
// I prefer to use my own logger, I case I want to handle things differently
// https://github.com/evanw/esbuild/issues/28#issuecomment-654016040
export function log(...msg: Parameters<typeof console.log>) {
  if (FBN_DEBUG) {
    console.log(...msg);
  }
}
