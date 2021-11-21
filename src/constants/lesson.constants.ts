import { LessonLevel } from "types";

export const LESSON_LEVEL_NAME: Record<LessonLevel, string> = {
  easy: "Easy",
  intermediate: "Intermediate",
  upperIntermediate: "Upper Intermediate",
  hard: "Hard",
  expert: "Expert",
};

export const LESSONS_IMAGES: Record<LessonLevel, string> = {
  // https://pixabay.com/photos/mountains-dolomites-alps-6540497/
  easy: "lesson-easy.jpg",
  // https://pixabay.com/photos/mountain-nature-alpine-landscape-6596074/
  intermediate: "lesson-intermediate.jpg",
  // https://pixabay.com/photos/natural-autumn-yellow-leaves-6693234/
  upperIntermediate: "lesson-upper-intermediate.jpg",
  // https://pixabay.com/photos/mountains-peak-sunset-sunrise-dusk-440520/
  hard: "lesson-hard.jpg",
  //https://pixabay.com/photos/mountains-snow-sunset-dusk-862870/
  expert: "lesson-expert.jpg",
};
