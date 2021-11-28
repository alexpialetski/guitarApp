import { Note, ChordModification, Scale, Form } from "types/notes";
import { ChordRandomizerConfig } from "types/chordRandomizer";

import { ChordModificationRandomizer } from "./ChordModificationRandomizer";
import { NoteRandomizer } from "./NoteRandomizer";
import { FormRandomizer } from "./FormRandomizer";
import { ScaleRandomizer } from "./ScaleRandomizer";
import { buildChord } from "./utils";

const DEFAULT_NOTE: Note = "C";
const DEFAULT_FORM: Form = "none";
const DEFAULT_SCALE: Scale = "major";
const DEFAULT_MODIFICATION: ChordModification = "triad";

export class ChordRandomizer {
  static noteRandomizer = new NoteRandomizer();

  static formRandomizer = new FormRandomizer();

  static scaleRandomizer = new ScaleRandomizer();

  static chordModificationRandomizer = new ChordModificationRandomizer();

  static randomizeChord({
    noteValue,
    scaleValue,
    modificationValue,
    formValue,
  }: ChordRandomizerConfig): string {
    const note = noteValue || this.noteRandomizer.randomize() || DEFAULT_NOTE;
    const form = formValue || this.formRandomizer.randomize() || DEFAULT_FORM;
    const scale =
      scaleValue || this.scaleRandomizer.randomize() || DEFAULT_SCALE;
    const modification =
      modificationValue ||
      this.chordModificationRandomizer.randomize() ||
      DEFAULT_MODIFICATION;

    return buildChord(note, form, scale, modification);
  }
}
