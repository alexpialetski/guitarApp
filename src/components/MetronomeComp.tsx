import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, Typography } from "@mui/material";

const MAX_BPM = 180;
const MIN_BPM = 20;

const MetronomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      width="3em"
      height="3em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 1.75l-3.43.92l-4.51 16.86c-.03.15-.06.31-.06.47c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2c0-.16-.03-.32-.06-.47l-1.36-5.11L17 16l.2 1h-3.79l2.84-2.84l-1.41-1.41L10.59 17H6.8l3.49-13h3.42l1.46 5.43l1.63-1.64l-1.37-5.12L12 1.75M11.25 5v9.75l1.5-1.5V5h-1.5m8.54 2.8l-2.83 2.83l-.71-.71l-1.41 1.42l2.82 2.82l1.42-1.41l-.71-.71l2.83-2.83l-1.41-1.41z"
        fill="#2196f3"
      />
    </svg>
  );
};

const NotesIndicator = ({ note }: { note: number }) => {
  const icons = [1, 2, 3, 4].map((cur) => {
    const iconColor = cur === 1 ? "secondary" : "primary";
    const IconComponent = cur === note ? CircleIcon : CircleOutlinedIcon;
    return <IconComponent key={cur} fontSize="large" color={iconColor} />;
  });

  return <Box>{icons}</Box>;
};

const getNewBpm = (newBpm: number, prevBpm: number) => {
  return newBpm <= MAX_BPM && newBpm >= MIN_BPM ? newBpm : prevBpm;
};

export interface MetronomeProps {
  enabled: boolean;
  tempo: number;
  currentNote: number;
  soundOn: boolean;
  toggleEnabled: () => void;
  toggleSoundOn: () => void;
  setTempo: (tempo: number) => void;
  setEnabled: (enabled: boolean) => void;
  setCurrentNote: (note: number) => void;
}

export const MetronomeComp = ({
  enabled,
  tempo,
  currentNote,
  soundOn,
  toggleEnabled,
  toggleSoundOn,
  setTempo,
}: MetronomeProps): JSX.Element => {
  const updateTempo = (newTempo: number) => {
    const validNewTempo = getNewBpm(newTempo, tempo);

    setTempo(validNewTempo);
  };
  const handleChange = (event: Event, newTempo: number | number[]) =>
    updateTempo(newTempo as number);
  const decrease = () => updateTempo(tempo - 1);
  const onAdd = () => updateTempo(tempo + 1);

  const enabledIcon = enabled ? (
    <PauseCircleOutlineIcon fontSize="large" color="primary" />
  ) : (
    <PlayCircleOutlineIcon fontSize="large" color="secondary" />
  );

  const soundIcon = soundOn ? (
    <VolumeUpIcon fontSize="large" color="primary" />
  ) : (
    <VolumeOffIcon fontSize="large" color="secondary" />
  );

  return (
    <Box display="flex" mb={2} alignItems="center" flexDirection="column">
      <MetronomeIcon />
      <Box width={320} sx={{ borderRadius: 16 }}>
        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
          <IconButton color="primary" onClick={decrease}>
            <RemoveIcon />
          </IconButton>
          <Slider
            aria-label="Tempo"
            step={1}
            disabled={false}
            value={tempo}
            min={MIN_BPM}
            max={MAX_BPM}
            onChange={handleChange}
          />
          <IconButton color="primary" onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Stack>
      </Box>
      <NotesIndicator note={currentNote} />
      <Typography variant="h4">{tempo} bpm</Typography>
      <Box>
        <IconButton size="large" onClick={toggleEnabled}>
          {enabledIcon}
        </IconButton>
        <IconButton size="large" onClick={toggleSoundOn}>
          {soundIcon}
        </IconButton>
      </Box>
    </Box>
  );
};
