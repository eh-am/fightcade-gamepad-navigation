// TODO: in dev mode show an inintrusive modal
export function notify(msg: string) {
  if (window.Notification) {
    new window.Notification(msg, {
      silent: true,
    });
  }
}
