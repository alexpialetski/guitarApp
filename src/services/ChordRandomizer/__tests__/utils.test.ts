import { Note, Scale, ChordModification } from "types/notes";

import { buildChord } from "../utils";

describe("utils", () => {
  test.each<[Note, Scale, ChordModification, string]>([
    ["C", "major", "triad", "C"],
    ["C", "minor", "triad", "Cm"],
    ["C", "major", "sus2", "Csus2"],
    ["C", "minor", "sus2", "Csus2"],
    ["C", "major", "sus4", "Csus4"],
    ["C", "minor", "sus4", "Csus4"],
    ["C", "major", "maj7", "Cmaj7"],
    ["C", "minor", "maj7", "Cmaj7"],
    ["C", "major", "sept", "C7"],
    ["C", "minor", "sept", "Cm7"],
  ])(
    "buildChord -> note:%s, scale:%s, modification:%s",
    (note, scale, modification, expected) =>
      expect(buildChord(note, scale, modification)).toBe(expected)
  );
});
