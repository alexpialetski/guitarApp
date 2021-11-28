import { Form } from "types/notes";
import { NUMBERED_MAP_OF_FORMS } from "constants/notes.constants";
import { Randomizer } from "types/chordRandomizer";

import { MapOfStringRandomizer } from "./MapOfStringRandomizer";

export class FormRandomizer implements Randomizer<Form> {
  #map = new MapOfStringRandomizer<Form>(NUMBERED_MAP_OF_FORMS);

  randomize(): Form | undefined {
    return this.#map.randomize();
  }
}
