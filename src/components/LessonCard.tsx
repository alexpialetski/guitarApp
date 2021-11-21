import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { LESSONS_IMAGES, LESSON_LEVEL_NAME } from "constants/lesson.constants";
import { LessonConfig } from "types/lesson";

export const LessonCard: React.FC<LessonConfig> = ({
  level,
  title,
  description,
}) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      alt="green iguana"
      height="140"
      image={LESSONS_IMAGES[level]}
    />
    <CardContent>
      <Typography gutterBottom variant="h5">
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, display: "inline-block" }}>
        Level:
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, display: "inline-block" }}>
        {LESSON_LEVEL_NAME[level]}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);
