import { Subject } from "rxjs";

declare global {
  interface Window {
    webkitAudioContext: AudioContext;
  }
}

export class Metronome extends Subject<number> {
  private audioContext: AudioContext;

  private notesInQueue: Array<{ note: number; time: number }>;

  private currentQuarterNote: number;

  private tempo: number;

  private lookahead: number;

  private scheduleAheadTime: number;

  private nextNoteTime: number;

  private intervalID: NodeJS.Timeout | null;

  private soundOn: boolean;

  public isRunning: boolean;

  constructor(tempo: number, soundOn: boolean) {
    super();
    this.notesInQueue = []; // notes that have been put into the web audio and may or may not have been played yet {note, time}
    this.currentQuarterNote = 0;
    this.tempo = tempo;
    this.lookahead = 25; // How frequently to call scheduling function (in milliseconds)
    this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
    this.nextNoteTime = 0.0; // when the next note is due
    this.isRunning = false;
    this.intervalID = null;
    this.soundOn = soundOn;
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
  }

  private nextNote() {
    // Advance current note and time by a quarter note (crotchet if you're posh)
    const secondsPerBeat = 60.0 / this.tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
    this.nextNoteTime += secondsPerBeat; // Add beat length to last beat time

    this.currentQuarterNote++; // Advance the beat number, wrap to zero
    if (this.currentQuarterNote === 5) {
      this.currentQuarterNote = 1;
    }
  }

  private scheduleNote(beatNumber: number, time: number) {
    // push the note on the queue, even if we're not playing.
    this.notesInQueue.push({ note: beatNumber, time: time });

    // create an oscillator
    const osc = this.audioContext.createOscillator();
    if (this.soundOn) {
      const envelope = this.audioContext.createGain();

      osc.frequency.value = beatNumber % 4 == 0 ? 1000 : 800;
      envelope.gain.value = 1;
      envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
      envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

      osc.connect(envelope);
      envelope.connect(this.audioContext.destination);
    }

    osc.start(time);
    osc.stop(time + 0.03);
  }

  private scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (
      this.nextNoteTime <
      this.audioContext.currentTime + this.scheduleAheadTime
    ) {
      this.scheduleNote(this.currentQuarterNote, this.nextNoteTime);
      this.nextNote();
      this.next(this.currentQuarterNote);
    }
  }

  public start(tempo?: number): void {
    if (tempo) {
      this.tempo = tempo;
    }

    if (this.isRunning) return;

    this.isRunning = true;

    this.currentQuarterNote = 0;
    this.nextNoteTime = this.audioContext.currentTime + 0.05;

    this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
  }

  public stop(): void {
    this.isRunning = false;

    if (this.intervalID) {
      this.notesInQueue = [];
      clearInterval(this.intervalID);
    }
  }

  public updateTempo(tempo: number): void {
    this.tempo = tempo;
  }

  public toggleSound(): void {
    this.soundOn = !this.soundOn;
  }

  public startStop(): void {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }
}
