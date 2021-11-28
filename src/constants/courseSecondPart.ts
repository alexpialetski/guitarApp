import { LessonConfig } from "types/lesson";

type SecondCourseGroup = "caged";

export const COURSE_PART_TWO = new Map<string, LessonConfig<SecondCourseGroup>>(
  [
    [
      "eString",
      {
        title: "Notes on E string",
        description: "Use E string(6) to find the note",
        configurations: [
          {
            scaleValue: "major",
            modificationValue: "triad",
            formValue: "none",
          },
        ],
        level: "easy",
      },
    ],
  ]
);
