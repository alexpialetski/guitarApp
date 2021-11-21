import { Note } from "types/notes";
import { NUMBERED_MAP_OF_NOTES } from "constants/notes.constants";
import { Randomizer } from "types/chordRandomizer";

import { MapOfStringRandomizer } from "./MapOfStringRandomizer";

export class NoteRandomizer implements Randomizer<Note> {
  #map = new MapOfStringRandomizer<Note>(NUMBERED_MAP_OF_NOTES);

  randomize(): Note | undefined {
    return this.#map.randomize();
  }
}
