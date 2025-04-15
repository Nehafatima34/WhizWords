import { Howl } from "howler";
import { useAudio } from "./stores/useAudio";

// Audio instances
let pageFlipSound: Howl | null = null;
let successSound: Howl | null = null;
let backgroundMusic: Howl | null = null;

// Initialize audio files
export const initAudio = async (): Promise<void> => {
  return new Promise((resolve) => {
    // Load sound effects
    pageFlipSound = new Howl({
      src: ["/sounds/hit.mp3"], // Reusing hit.mp3 for page flip sound
      volume: 0.3,
      preload: true,
    });

    successSound = new Howl({
      src: ["/sounds/success.mp3"],
      volume: 0.4,
      preload: true,
    });

    backgroundMusic = new Howl({
      src: ["/sounds/background.mp3"],
      volume: 0.2,
      loop: true,
      preload: true,
    });

    // Initialize the audio store with these sounds
    const audioStore = useAudio.getState();
    const pageFlipAudio = new Audio("/sounds/hit.mp3");
    pageFlipAudio.volume = 0.3;
    
    const successAudio = new Audio("/sounds/success.mp3");
    successAudio.volume = 0.4;
    
    const backgroundAudio = new Audio("/sounds/background.mp3");
    backgroundAudio.volume = 0.2;
    backgroundAudio.loop = true;

    audioStore.setPageFlipSound(pageFlipAudio);
    audioStore.setSuccessSound(successAudio);
    audioStore.setBackgroundMusic(backgroundAudio);
    
    // Wait for all sounds to load
    const checkLoaded = setInterval(() => {
      if (
        pageFlipSound?.state() === "loaded" &&
        successSound?.state() === "loaded" &&
        backgroundMusic?.state() === "loaded"
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

// Play sound for page flip
export const playPageFlipSound = (): void => {
  if (pageFlipSound) {
    pageFlipSound.play();
  }
};

// Play sound for level completion
export const playSuccessSound = (): void => {
  if (successSound) {
    successSound.play();
  }
};

// Play background music
export const playBackgroundMusic = (): void => {
  if (backgroundMusic) {
    backgroundMusic.play();
  }
};

// Speak a word using the Web Speech API
export const speakWord = (word: string): void => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = 0.9; // Slightly slower than normal
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
};

// Mute/unmute all sounds
export const setMuted = (muted: boolean): void => {
  Howler.mute(muted);
};
