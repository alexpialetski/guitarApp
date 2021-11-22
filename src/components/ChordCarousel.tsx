import React from "react";
import { styled } from "@mui/material/styles";

import { ChordPaper } from "./ChordPaper";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  minWidth: "1000px",
  justifyContent: "center",
  alignItems: "center",
  overflowX: "hidden",
  padding: theme.spacing(1),
  position: "relative",
  borderRadius: theme.spacing(2),
}));

const ElevatingChordPaper = styled(ChordPaper)(() => ({
  position: "absolute",
  transitionProperty: "left",
  transitionDuration: "500ms",
  transitionTimingFunction: "ease",
}));

const HiddenChordPaper = styled(ChordPaper)(() => ({
  opacity: 0,
}));

const Fader = styled("div")(() => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  zIndex: 1,
  right: 0,
  background: `linear-gradient(to right, rgba(0,0,0,0) 60%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,1) 80%),
     linear-gradient(to left, rgba(255,255,0,0) 60%, rgba(255,255,255,0.7) 70%, rgba(255,255,255,1) 90%)`,
}));

export type ChordCarouselProps = {
  chords: { id: string; chord: string }[];
};

export const ChordCarousel: React.FC<ChordCarouselProps> = ({ chords }) => (
  <Container>
    <Fader />
    {chords.map((value, index) => (
      <ElevatingChordPaper
        key={value.id}
        chord={value.chord}
        sx={{ left: `${index ? 15 + index * 25 : 0}%` }}
      />
    ))}
    <HiddenChordPaper chord="C" />
  </Container>
);
