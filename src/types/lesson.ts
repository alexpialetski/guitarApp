import { ChordRandomizerConfig } from "./chordRandomizer";

export type LessonLevel =
  | "easy"
  | "intermediate"
  | "upperIntermediate"
  | "hard"
  | "expert";

export type LessonConfig = {
  config: ChordRandomizerConfig;
  title: string;
  description: string;
  level: LessonLevel;
};
