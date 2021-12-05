import React, { useEffect, useState, useMemo } from "react";
import { range, Subscription, Observable, of, concat } from "rxjs";
import { filter, map, scan } from "rxjs/operators";
import { useParams, Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";

import { ChordRandomizer } from "services/ChordRandomizer";
import { ChordCarousel } from "components/ChordCarousel";
import { LESSONS } from "constants/lessons";
import { LessonConfig } from "types";
import { MetronomeSlider } from "components/MetronomeSlider";
import { useMetronome } from "hooks/useMetronome";

const NUMBER_OF_INITIAL_CHORDS = 3;

type UuidChord = {
  id: ReturnType<typeof uuidv4>;
  chord: string;
};

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const CarouselContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  overflowX: "hidden",
  maxWidth: "100%",
  borderRadius: theme.spacing(2),
}));

function pipeWithRandomChords(
  observable$: Observable<number>,
  chordLesson: LessonConfig<string>
) {
  return observable$.pipe(
    map((num) => {
      const currentIndex = num % chordLesson.configurations.length;

      return ChordRandomizer.randomizeChord(
        chordLesson.configurations[currentIndex]
      );
    })
  );
}

export const Lesson: React.FC = () => {
  const [chords, setChords] = useState<UuidChord[]>([]);
  const { id } = useParams<{ id: string }>();
  const lesson = useMemo(() => LESSONS.get(id), [id]);
  const { metronome$, ...metronomeProps } = useMetronome();
  const isLessonActive = metronomeProps.enabled;

  useEffect(() => {
    let subscription: Subscription;

    if (lesson) {
      subscription = concat(
        of(""), // hidden left card on start
        pipeWithRandomChords(
          range(
            Math.max(NUMBER_OF_INITIAL_CHORDS, lesson.configurations.length)
          ),
          lesson
        )
      )
        .pipe(
          map((chord) => ({ id: uuidv4(), chord })),
          scan<UuidChord, UuidChord[]>((a, c) => [...a, c], [])
        )
        .subscribe(setChords);
    }

    return () => subscription?.unsubscribe();
  }, [lesson]);

  useEffect(() => {
    let subscription: Subscription;

    if (lesson && isLessonActive) {
      const firstBeatTick$ = metronome$.pipe(filter((cur) => !cur));

      subscription = pipeWithRandomChords(firstBeatTick$, lesson).subscribe(
        (chord) =>
          setChords((prev) => [...prev.slice(1), { id: uuidv4(), chord }])
      );
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, [lesson, metronome$, isLessonActive]);

  if (!lesson) {
    return <Redirect to="/games" />;
  }

  return (
    <Container>
      <MetronomeSlider {...metronomeProps} />
      <CarouselContainer>
        <ChordCarousel chords={chords} />
      </CarouselContainer>
    </Container>
  );
};
