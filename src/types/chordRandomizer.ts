import { Note, ChordModification, Scale } from "types/notes";

export type Randomizer<TValue> = {
  randomize: () => TValue | undefined;
};

export type ChordRandomizerConfig = {
  noteValue?: Note;
  scaleValue?: Scale;
  modificationValue?: ChordModification;
};
