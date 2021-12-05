export type UserConfigProvider = {
  getUserTempo: () => number;
  setUserTempo: (tempo: number) => void;
  getUserSoundOn: () => boolean;
  setUserSoundOn: (soundOn: boolean) => void;
};
