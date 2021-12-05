import React, { useCallback } from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider, { SliderProps } from "@mui/material/Slider";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Typography } from "@mui/material";

import { QuarterIndicator } from "./QuarterIndicator";

const MAX_BPM = 180;
const MIN_BPM = 20;

export type MetronomeSliderProps = {
  enabled: boolean;
  tempo: number;
  currentNote: number;
  soundOn: boolean;
  handleTempoChange: (tempo: number) => void;
  toggleEnabled: () => void;
  toggleSoundOn: () => void;
};

export const MetronomeSlider: React.FC<MetronomeSliderProps> = ({
  enabled,
  tempo,
  currentNote,
  soundOn,
  handleTempoChange,
  toggleEnabled,
  toggleSoundOn,
}) => {
  const onTempoDecrease = () => tempo > MIN_BPM && handleTempoChange(tempo - 1);
  const onTempoAdd = () => tempo < MAX_BPM && handleTempoChange(tempo + 1);

  const onSliderChange = useCallback<NonNullable<SliderProps["onChange"]>>(
    (_, newTempo) => {
      if (newTempo && !Array.isArray(newTempo)) {
        handleTempoChange(newTempo);
      }
    },
    [handleTempoChange]
  );

  return (
    <Box
      display="flex"
      maxWidth={320}
      width="100%"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h5">{tempo} bpm</Typography>
      <Box maxWidth="100%" width="100%" sx={{ borderRadius: 16 }}>
        <Stack spacing={1} direction="row" sx={{ mb: 1 }} alignItems="center">
          <IconButton color="primary" onClick={onTempoDecrease}>
            <RemoveIcon />
          </IconButton>
          <Slider
            aria-label="Tempo"
            step={1}
            value={tempo}
            min={MIN_BPM}
            max={MAX_BPM}
            onChange={onSliderChange}
          />
          <IconButton color="primary" onClick={onTempoAdd}>
            <AddIcon />
          </IconButton>
        </Stack>
      </Box>
      <Box display="flex" alignItems="center">
        <QuarterIndicator currentQuarter={currentNote} />
        <IconButton size="large" onClick={toggleEnabled}>
          {enabled ? (
            <PauseCircleOutlineIcon fontSize="large" color="primary" />
          ) : (
            <PlayCircleOutlineIcon fontSize="large" color="secondary" />
          )}
        </IconButton>
        <IconButton size="large" onClick={toggleSoundOn}>
          {soundOn ? (
            <VolumeUpIcon fontSize="large" color="primary" />
          ) : (
            <VolumeOffIcon fontSize="large" color="secondary" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};
