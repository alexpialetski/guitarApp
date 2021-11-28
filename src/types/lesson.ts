import { ChordRandomizerConfig } from "./chordRandomizer";

export type LessonLevel =
  | "easy"
  | "intermediate"
  | "upperIntermediate"
  | "hard"
  | "expert";

export type LessonConfig<T> = {
  configurations: [ChordRandomizerConfig, ...ChordRandomizerConfig[]];
  title: string;
  group?: T;
  groupTitle?: string;
  description: string;
  level: LessonLevel;
};
