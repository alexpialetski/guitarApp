import { Scale } from "types/notes";
import { NUMBERED_MAP_OF_SCALES } from "constants/notes.constants";
import { Randomizer } from "types/chordRandomizer";

import { MapOfStringRandomizer } from "./MapOfStringRandomizer";

export class ScaleRandomizer implements Randomizer<Scale> {
  #map = new MapOfStringRandomizer<Scale>(NUMBERED_MAP_OF_SCALES);

  randomize(): Scale | undefined {
    return this.#map.randomize();
  }
}
