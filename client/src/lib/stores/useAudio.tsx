import { create } from "zustand";

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  pageFlipSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  wordSound: HTMLAudioElement | null;
  isMuted: boolean;
  
  // Setter functions
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setPageFlipSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  setWordSound: (sound: HTMLAudioElement) => void;
  
  // Control functions
  toggleMute: () => void;
  playPageFlip: () => void;
  playSuccess: () => void;
  speakWord: (word: string) => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  pageFlipSound: null,
  successSound: null,
  wordSound: null,
  isMuted: true, // Start muted by default
  
  setBackgroundMusic: (music) => set({ backgroundMusic: music }),
  setPageFlipSound: (sound) => set({ pageFlipSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  setWordSound: (sound) => set({ wordSound: sound }),
  
  toggleMute: () => {
    const { isMuted } = get();
    const newMutedState = !isMuted;
    
    // Just update the muted state
    set({ isMuted: newMutedState });
    
    // Log the change
    console.log(`Sound ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  playPageFlip: () => {
    const { pageFlipSound, isMuted } = get();
    if (pageFlipSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Page flip sound skipped (muted)");
        return;
      }
      
      // Clone the sound to allow overlapping playback
      const soundClone = pageFlipSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.3;
      soundClone.play().catch(error => {
        console.log("Page flip sound play prevented:", error);
      });
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Success sound skipped (muted)");
        return;
      }
      
      successSound.currentTime = 0;
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  },
  
  speakWord: (word: string) => {
    const { isMuted } = get();
    if (isMuted) {
      console.log("Word speech skipped (muted)");
      return;
    }
    
    // Use the Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.9; // Slightly slower than normal
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }
}));
