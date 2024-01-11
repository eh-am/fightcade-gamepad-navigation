import { GenericLayout } from "@app/gamepad/layouts";
import { EightBitDoArcadeStick } from "./8bitdo_arcade_stick";

export function identifyLayout(name: string): Layout {
  switch (name) {
    case EightBitDoArcadeStick.Name: {
      return EightBitDoArcadeStick;
    }

    default:
      return GenericLayout;
  }
}
