import { useCallback, useEffect, useMemo, useState } from "react";

import { MetronomeObservable } from "services/MetronomeObservable";
import { LSUserConfigProvider } from "services/UserConfigProvider";
import { Subscription } from "rxjs";

const userConfigProvider = new LSUserConfigProvider();

const USER_TEMPO = userConfigProvider.getUserTempo();
const USER_SOUND = userConfigProvider.getUserSoundOn();

export const useMetronome = () => {
  const [enabled, setEnabled] = useState(false);
  const [soundOn, setSoundOn] = useState(USER_SOUND);
  const [tempo, setTempo] = useState(USER_TEMPO);
  const [currentNote, setCurrentNote] = useState(0);

  const metronome$ = useMemo(
    () => new MetronomeObservable(USER_TEMPO, USER_SOUND),
    []
  );

  // Change note effect
  useEffect(() => {
    let subscription: Subscription;

    if (enabled) {
      subscription = metronome$.subscribe(setCurrentNote);
    }

    return () => subscription?.unsubscribe();
  }, [metronome$, enabled]);

  useEffect(() => {
    return () => metronome$.stop();
  }, [metronome$]);

  /**
   * Update tempo effect
   */
  useEffect(() => {
    if (enabled) {
      metronome$.updateTempo(tempo);
    }
  }, [tempo, enabled, metronome$]);

  const toggleEnabled = useCallback(() => {
    metronome$.startStop();

    if (enabled) {
      setCurrentNote(metronome$.getCurrentQuarterNote()); // reset indicator
    }
    setEnabled(!enabled);
  }, [enabled, metronome$]);

  const toggleSoundOn = useCallback(() => {
    metronome$.toggleSound();
    setSoundOn((prev) => !prev);
  }, [metronome$]);

  return {
    metronome$,
    enabled,
    tempo,
    currentNote,
    soundOn,
    handleTempoChange: setTempo,
    toggleEnabled,
    toggleSoundOn,
  };
};
