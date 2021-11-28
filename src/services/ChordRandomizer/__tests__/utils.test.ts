import { Note, Scale, ChordModification, Form } from "types/notes";

import { buildChord } from "../utils";

describe("utils", () => {
  test.each<[Note, Form, Scale, ChordModification, string]>([
    ["C", "none", "major", "triad", "C"],
    ["C", "none", "minor", "triad", "Cm"],
    ["C", "none", "major", "sus2", "Csus2"],
    ["C", "none", "minor", "sus2", "Csus2"],
    ["C", "none", "major", "sus4", "Csus4"],
    ["C", "none", "minor", "sus4", "Csus4"],
    ["C", "none", "major", "maj7", "Cmaj7"],
    ["C", "none", "minor", "maj7", "Cmaj7"],
    ["C", "none", "major", "sept", "C7"],
    ["C", "none", "minor", "sept", "Cm7"],
    ["C", "A", "minor", "sept", "Cm7(A)"],
  ])(
    "buildChord -> note:%s, scale:%s, modification:%s",
    (note, form, scale, modification, expected) =>
      expect(buildChord(note, form, scale, modification)).toBe(expected)
  );
});
