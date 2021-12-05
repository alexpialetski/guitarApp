import { UserConfigProvider } from "types/UserConfigProvider";
import {
  DEFAULT_SOUND_ON,
  DEFAULT_TEMPO,
  USER_SOUND_ON_KEY,
  USER_TEMPO_KEY,
} from "constants/userConfig";

export class LSUserConfigProvider implements UserConfigProvider {
  public getUserTempo = (): number => {
    const parsedNumber = Number(localStorage.getItem(USER_TEMPO_KEY));

    return !parsedNumber || Number.isNaN(parsedNumber)
      ? DEFAULT_TEMPO
      : parsedNumber;
  };

  public setUserTempo = (tempo: number): void => {
    localStorage.setItem(USER_TEMPO_KEY, String(tempo));
  };

  public setUserSoundOn = (soundOn: boolean): void =>
    localStorage.setItem(USER_SOUND_ON_KEY, String(soundOn));

  public getUserSoundOn = (): boolean =>
    localStorage.getItem(USER_SOUND_ON_KEY) == null
      ? DEFAULT_SOUND_ON
      : localStorage.getItem(USER_SOUND_ON_KEY) === String(true);
}
