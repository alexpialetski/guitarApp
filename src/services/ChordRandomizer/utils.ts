import { Note, Scale, ChordModification } from "types/notes";

export function buildChord(
  note: Note,
  scale: Scale,
  modification: ChordModification
): string {
  let result = note;

  // scale
  switch (modification) {
    case "triad":
    case "sept":
      if (scale === "minor") {
        result += "m";
      }
  }

  // modification
  switch (modification) {
    case "sus2":
    case "sus4":
    case "maj7":
      result += modification;
      break;
    case "sept":
      result += "7";
      break;
  }

  return result;
}
