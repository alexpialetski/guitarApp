import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { GAMES } from "constants/games";
import { LessonCard } from "components/LessonCard";

const CardLink = styled(Link)({ textDecoration: "none" });

export const Games: React.FC = () => (
  <Grid container spacing={2} justifyContent="center">
    {Array.from(GAMES.entries()).map(([id, config]) => (
      <Grid key={id} item md={4} sm={6} xs={12}>
        <CardLink to={`/lesson/${id}`}>
          <LessonCard {...config} />
        </CardLink>
      </Grid>
    ))}
  </Grid>
);
