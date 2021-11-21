import { getRandomInt } from "utils/math";
import { Randomizer } from "types/chordRandomizer";

export class MapOfStringRandomizer<TValue> implements Randomizer<TValue> {
  #map: Map<number, TValue>;

  constructor(mapOfString: Map<number, TValue>) {
    this.#map = mapOfString;
  }

  public randomize(): TValue | undefined {
    return this.#map.get(getRandomInt(0, this.#map.size));
  }
}
