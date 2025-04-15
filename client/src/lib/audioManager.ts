import { Howl } from "howler";

// Audio instances
let correctSound: Howl | null = null;
let incorrectSound: Howl | null = null;
let successSound: Howl | null = null;

// Initialize audio files
export const initAudio = async (): Promise<void> => {
  return new Promise((resolve) => {
    // Load sound effects
    correctSound = new Howl({
      src: ["/sounds/success.mp3"],
      volume: 0.4,
      preload: true,
    });

    incorrectSound = new Howl({
      src: ["/sounds/hit.mp3"], // Reusing hit.mp3 for incorrect sound
      volume: 0.3,
      preload: true,
    });

    successSound = new Howl({
      src: ["/sounds/background.mp3"], // Reusing background.mp3 for level complete
      volume: 0.5,
      preload: true,
    });

    // Wait for all sounds to load
    const checkLoaded = setInterval(() => {
      if (
        correctSound?.state() === "loaded" &&
        incorrectSound?.state() === "loaded" &&
        successSound?.state() === "loaded"
      ) {
        clearInterval(checkLoaded);
        resolve();
      }
    }, 100);

    // Timeout if loading takes too long
    setTimeout(() => {
      clearInterval(checkLoaded);
      resolve();
    }, 5000);
  });
};

// Play sound for correct answer
export const playCorrectSound = (): void => {
  if (correctSound) {
    correctSound.play();
  }
};

// Play sound for incorrect answer
export const playIncorrectSound = (): void => {
  if (incorrectSound) {
    incorrectSound.play();
  }
};

// Play sound for level completion
export const playSuccessSound = (): void => {
  if (successSound) {
    successSound.play();
  }
};

// Mute/unmute all sounds
export const setMuted = (muted: boolean): void => {
  Howler.mute(muted);
};
