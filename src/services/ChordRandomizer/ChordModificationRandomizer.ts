import { Randomizer, ChordModification } from "types";
import { NUMBERED_MAP_OF_MODIFICATIONS } from "constants/notes.constants";

import { MapOfStringRandomizer } from "./MapOfStringRandomizer";

export class ChordModificationRandomizer
  implements Randomizer<ChordModification>
{
  #map = new MapOfStringRandomizer<ChordModification>(
    NUMBERED_MAP_OF_MODIFICATIONS
  );

  randomize(): ChordModification | undefined {
    return this.#map.randomize();
  }
}
