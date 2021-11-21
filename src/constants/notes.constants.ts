import { Note, Scale, ChordModification } from "types/notes";

export const NUMBERED_MAP_OF_NOTES = new Map<number, Note>([
  [0, "C"],
  [1, "D"],
  [2, "E"],
  [3, "F"],
  [4, "G"],
  [5, "A"],
  [6, "B"],
]);

export const NUMBERED_MAP_OF_SCALES = new Map<number, Scale>([
  [0, "major"],
  [1, "minor"],
]);

export const NUMBERED_MAP_OF_MODIFICATIONS = new Map<number, ChordModification>(
  [
    [0, "triad"],
    [1, "sus2"],
    [2, "sus4"],
    [3, "maj7"],
    [4, "sept"],
  ]
);
