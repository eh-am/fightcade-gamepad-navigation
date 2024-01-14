import { GC_Settings } from "forks/Controller.js/source/lib/GC_Settings";

const controllers: Record<string, Controller> = {};

type ButtonEvent = {
  name: string;
  button: GamepadButton;
  index: number;
  timestamp: number;
};

function onConnect(event: GamepadEvent) {
  const index = event.gamepad.index;
  console.log("✅ 🎮 A gamepad was connected:", event.gamepad);

  controllers[index] = new Controller(event.gamepad);
}

function onDisconnect(event: GamepadEvent) {
  const index = event.gamepad.index;
  console.log("✅ 🎮 A gamepad was DISCONNECTED:", event.gamepad);

  delete controllers[index];
}

export function search() {
  // TODO: teardown?
  window.addEventListener("gamepadconnected", onConnect);
  window.addEventListener("gamepaddisconnected", onDisconnect);
}

class Controller {
  private settings: unknown;

  RAF: ReturnType<typeof window.requestAnimationFrame> | null = null; // Stores the requestAnimationFrame id
  lastState: Record<number, GamepadButton> = {};
  index: number;

  constructor(gamepad: Gamepad) {
    this.index = gamepad.index;

    const data = {
      controller: this,
      id: gamepad.id,
      index: gamepad.index,
      timestamp: gamepad.timestamp,
    };

    //    this.settings = new GC_Settings();
    dispatchCustomEvent("gc.controller.connect", data);
    this.requestNextLoop();
    this.RAF = window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  requestNextLoop() {
    this.RAF = window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop() {
    // TODO: check for inputs
    // Updates timestamp

    const gamepad = this.getGamepad();
    if (!gamepad) {
      return;
    }

    this.checkButtons(gamepad);
    this.requestNextLoop();
  }

  getGamepad(): Gamepad | null {
    // If for example the gamepad is disconnected while the class instance
    // And the listeners have not been destroyed
    // This will return null
    const gamepad = navigator.getGamepads()[this.index];
    return gamepad;
  }

  checkButtons(gamepad: Gamepad) {
    const buttons = Array.from(gamepad.buttons);
    const events: ButtonEvent[] = [];

    const timestamp = performance.now();

    buttons.forEach((button, index) => {
      const lastState = this.lastState[index];

      // TODO: threshold?
      const isPressed = button.value > 0;
      const previouslyPressed = lastState?.value > 0;

      //console.log({ index, isPressed, previouslyPressed})
      if (isPressed && !previouslyPressed) {
        events.push({ name: "gc.button.press", button, index, timestamp });
      }

      if (isPressed && previouslyPressed) {
        events.push({ name: "gc.button.hold", button, index, timestamp });
      }

      if (!isPressed && previouslyPressed) {
        events.push({ name: "gc.button.release", button, index, timestamp });
      }

      this.lastState[index] = button;
    });

    this.processEvents(events);
  }

  processEvents(events: ButtonEvent[]) {
    for (let event of events) {
      dispatchCustomEvent(event.name, event.button);
    }
  }

  setup() {}
}

function dispatchCustomEvent(eventName: string, detail: unknown) {
  detail = detail || {};

  const event = new CustomEvent(eventName, {
    detail: detail,
    bubbles: true,
    cancelable: false,
  });

  window.dispatchEvent(event);
}
