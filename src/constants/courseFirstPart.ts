import { LessonConfig } from "types/lesson";

type FirstCourseGroup = "Scale, key" | "CAGED" | "Fingering";

export const COURSE_PART_ONE = new Map<string, LessonConfig<FirstCourseGroup>>([
  // --------------------------Scale, key-------------------------------
  [
    "scaleKeyNoteEAstring",
    {
      title: "Note on E/A string",
      description: "Find random note on E/A string",
      group: "Scale, key",
      configurations: [
        { modificationValue: "triad", formValue: "none", scaleValue: "major" },
      ],
      level: "easy",
    },
  ],
  [
    "scaleKeyNoteDstring",
    {
      title: "Note on D string",
      description: "Find random note on D string",
      group: "Scale, key",
      configurations: [
        { modificationValue: "triad", formValue: "none", scaleValue: "major" },
      ],
      level: "intermediate",
    },
  ],
  [
    "scaleKeyMajorScaleEAstring",
    {
      title: "Major scale E/A string",
      description: "Practice builting major scale for E and A string",
      group: "Scale, key",
      configurations: [
        { modificationValue: "triad", formValue: "none", scaleValue: "major" },
      ],
      level: "easy",
    },
  ],
  // --------------------------CAGED-------------------------------
  [
    "cagedCChordMixed",
    {
      title: "C chord in mixed E/A/C/G/D forms",
      description: "Practice C Major chord for mixed E/A/C/G/D forms",
      group: "CAGED",
      configurations: [
        { modificationValue: "triad", scaleValue: "major", noteValue: "C" },
      ],
      level: "intermediate",
    },
  ],
  [
    "cagedCMinorChordMixed",
    {
      title: "C minor in mixed E/A/C/G/D forms",
      description: "Practice C MINOR chord for mixed E/A/C/G/D forms",
      group: "CAGED",
      configurations: [
        { modificationValue: "triad", scaleValue: "minor", noteValue: "C" },
      ],
      level: "intermediate",
    },
  ],
  // --------------------------Fingering-------------------------------
  [
    "fingeringBEMajorMixedForms",
    {
      title: "B and E chords in mixed forms",
      description: "Practice two MAJOR(B and E) chords in random forms",
      group: "Fingering",
      configurations: [
        { modificationValue: "triad", scaleValue: "major", noteValue: "B" },
        { modificationValue: "triad", scaleValue: "major", noteValue: "E" },
      ],
      level: "intermediate",
    },
  ],
  [
    "fingeringCGMinorMixedForms",
    {
      title: "Cm and Gm chords in mixed forms",
      description: "Practice two MINOR(Cm and Gm) chords in random forms",
      group: "Fingering",
      configurations: [
        { modificationValue: "triad", scaleValue: "minor", noteValue: "C" },
        { modificationValue: "triad", scaleValue: "minor", noteValue: "G" },
      ],
      level: "intermediate",
    },
  ],
  [
    "fingeringCGAmFMixedForms",
    {
      title: "C-G-Am-F in mixed forms",
      description: "Practice C-G-Am-F in random forms",
      group: "Fingering",
      configurations: [
        { modificationValue: "triad", scaleValue: "major", noteValue: "C" },
        { modificationValue: "triad", scaleValue: "major", noteValue: "G" },
        { modificationValue: "triad", scaleValue: "minor", noteValue: "A" },
        { modificationValue: "triad", scaleValue: "major", noteValue: "F" },
      ],
      level: "upperIntermediate",
    },
  ],
  [
    "fingeringMajorChordsMixedForms",
    {
      title: "Random MAJOR chords in random forms",
      description: "Practice MAJOR chords in random forms",
      group: "Fingering",
      configurations: [{ modificationValue: "triad", scaleValue: "major" }],
      level: "upperIntermediate",
    },
  ],
  [
    "fingeringMinorsChordsMixedForms",
    {
      title: "Random MINOR chords in random forms",
      description: "Practice MINOR chords in random forms",
      group: "Fingering",
      configurations: [{ modificationValue: "triad", scaleValue: "minor" }],
      level: "upperIntermediate",
    },
  ],
  [
    "fingeringRandomChordsRandomForms",
    {
      title: "Major and minor chords in random forms",
      description: "Pracitce MAJOR and MINOR chords in MIXED forms",
      group: "Fingering",
      configurations: [{ modificationValue: "triad" }],
      level: "hard",
    },
  ],
]);
