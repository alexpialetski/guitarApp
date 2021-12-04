import { debounce } from "@mui/material";
import { MetronomeProps } from "components/MetronomeComp";
import { useCallback, useEffect, useRef, useState } from "react";
import { Metronome } from "./Metronome";

const getUserTempo = () => {
  try {
    return Number(localStorage.getItem("userTempo"));
  } catch (e) {
    console.error("User tempo setting is invalid!");
  }
};

const setUserTempo = debounce((tempo: number) => {
  localStorage.setItem("userTempo", String(tempo));
}, 200);

const getUserSoundOn = () => {
  try {
    return localStorage.getItem("userSoundOn") === "true";
  } catch (e) {
    console.error("User sound setting is invalid!");
  }
};

const setUserSoundOn = (soundOn: boolean) => {
  localStorage.setItem("userSoundOn", String(soundOn));
};

const initialTempo = getUserTempo() || 60;
const initialSoundOn = getUserSoundOn() ?? true;

export interface UseMetronomeReturn extends MetronomeProps {
  metronome$: Metronome;
}

export const useMetronome = (): UseMetronomeReturn => {
  const [enabled, setEnabled] = useState(false);
  const [soundOn, setSoundOn] = useState(initialSoundOn);
  const [tempo, setTempo] = useState<number>(initialTempo);
  const [currentNote, setCurrentNote] = useState(-1);
  const metronome$ = useRef<Metronome>(
    new Metronome(initialTempo, initialSoundOn)
  ).current;

  /**
   * Change note effect
   */
  useEffect(() => {
    const subscription = metronome$.subscribe((currentQuarterNote) =>
      setCurrentNote(currentQuarterNote)
    );
    return () => subscription.unsubscribe();
  }, [metronome$]);

  /**
   * Update tempo effect
   */
  useEffect(() => {
    if (enabled) {
      metronome$.start(tempo);
    }
  }, [tempo, enabled, metronome$]);

  /**
   * Optimize local storage updates
   */
  useEffect(() => setUserTempo(tempo), [tempo]);

  const toggleEnabled = useCallback(() => {
    metronome$.startStop();

    if (enabled) {
      setCurrentNote(-1); // reset indicator
    }
    setEnabled(!enabled);
  }, [enabled, metronome$]);

  const toggleSoundOn = useCallback(() => {
    const newSoundOn = !soundOn;
    metronome$.toggleSound();
    setUserSoundOn(newSoundOn);
    setSoundOn(newSoundOn);
  }, [metronome$, soundOn]);

  return {
    metronome$,
    enabled,
    tempo,
    currentNote,
    soundOn,
    setTempo,
    setEnabled,
    setCurrentNote,
    toggleEnabled,
    toggleSoundOn,
  };
};
