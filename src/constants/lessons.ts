import { LessonConfig } from "types";

import { COURSE_PART_ONE } from "./courseFirstPart";
import { COURSE_PART_TWO } from "./courseSecondPart";
import { GAMES } from "./games";

export const LESSONS = new Map<string, LessonConfig<string>>([
  ...COURSE_PART_ONE.entries(),
  ...COURSE_PART_TWO.entries(),
  ...GAMES.entries(),
]);
