import { Note, ChordModification, Scale, Form } from "types/notes";

export type Randomizer<TValue> = {
  randomize: () => TValue | undefined;
};

export type ChordRandomizerConfig = {
  noteValue?: Note;
  scaleValue?: Scale;
  modificationValue?: ChordModification;
  formValue?: Form;
};
