declare var FBN_DEBUG: boolean;

// Although it's possible to drop all console logs
// I prefer to use my own logger, I case I want to handle things differently
// https://github.com/evanw/esbuild/issues/28#issuecomment-654016040
// Also bind to the original console, so that we can see the log lines
// https://stackoverflow.com/a/24209742
export const log = FBN_DEBUG ? console.log.bind(console) : () => {};
