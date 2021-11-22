import React, { useEffect, useState, useMemo } from "react";
import { interval, range, Subscription, Observable, of, concat } from "rxjs";
import { finalize, map, scan } from "rxjs/operators";
import { useParams, Redirect } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { v4 as uuidv4 } from "uuid";
import { styled } from "@mui/material/styles";

import { ChordRandomizer } from "services/ChordRandomizer";
import { ChordCarousel } from "components/ChordCarousel";
import { LESSONS } from "constants/lessons";
import { LessonConfig } from "types";
import { Typography } from "@mui/material";

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

export const Lesson: React.FC = () => {
  const [chords, setChords] = useState<UuidChord[]>([]);
  const [start, setStart] = useState(false);
  const [intervalTime, setintervalTime] = useState(4);
  const [timerValue, setTimerValue] = useState(intervalTime);
  const { id } = useParams<{ id: string }>();
  const lesson = useMemo(() => LESSONS.get(id), [id]);

  function pipeWithRandomChords(
    observable$: Observable<number>,
    chordLesson: LessonConfig
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
  const handleStartChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setStart(event.target.checked);
  const handleTimeoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.currentTarget.value, 10);
    setintervalTime(value);
    if (value) {
      setTimerValue(value);
    }
  };

  useEffect(() => {
    let subscription: Subscription;

    if (lesson) {
      subscription = concat(
        of(""),
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
    let timerSubscription: Subscription;

    if (lesson && start && !Number.isNaN(intervalTime)) {
      subscription = pipeWithRandomChords(
        interval(intervalTime * 1000),
        lesson
      ).subscribe((chord) =>
        setChords((prev) => [...prev.slice(1), { id: uuidv4(), chord }])
      );

      timerSubscription = interval(1000)
        .pipe(finalize(() => setTimerValue(intervalTime)))
        .subscribe(() =>
          setTimerValue((prev) => (prev > 1 ? --prev : intervalTime))
        );
    }

    return () => {
      subscription?.unsubscribe();
      timerSubscription?.unsubscribe();
    };
  }, [lesson, start, intervalTime]);

  if (!lesson) {
    return <Redirect to="/games" />;
  }

  return (
    <Container>
      <Box display="flex" mb={2} alignItems="center">
        <FormControlLabel
          control={<Switch onChange={handleStartChange} />}
          label="Start"
          value={start}
        />
        <TextField
          id="outlined-number"
          label="Interval"
          type="number"
          value={intervalTime}
          onChange={handleTimeoutChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Typography variant="h2">{timerValue}</Typography>
      <CarouselContainer>
        <ChordCarousel chords={chords} />
      </CarouselContainer>
    </Container>
  );
};
