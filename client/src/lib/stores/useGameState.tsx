import { create } from "zustand";
import { generatePuzzle, getPuzzlesForDifficulty } from "../wordLists";

export type GamePhase = "home" | "playing" | "levelComplete";
export type Difficulty = "easy" | "medium" | "hard";

export interface WordPuzzle {
  word: string;
  blanks: number[];
  missingLetters: string[];
  availableLetters: string[];
}

interface GameState {
  // State
  phase: GamePhase;
  difficulty: Difficulty;
  currentLevel: number;
  totalLevels: number;
  puzzles: WordPuzzle[];
  currentPuzzle: WordPuzzle | null;
  levelsCompleted: number;
  
  // Actions
  setDifficulty: (difficulty: Difficulty) => void;
  startGame: () => void;
  completeLevel: (success: boolean) => void;
  continueToNextLevel: () => void;
  goToHome: () => void;
  resetGame: () => void;
}

export const useGameState = create<GameState>((set, get) => ({
  phase: "home",
  difficulty: "easy",
  currentLevel: 1,
  totalLevels: 10,
  puzzles: [],
  currentPuzzle: null,
  levelsCompleted: 0,
  
  setDifficulty: (difficulty) => {
    // Generate puzzles based on the selected difficulty
    const puzzles = getPuzzlesForDifficulty(difficulty, 10); // 10 puzzles per game
    
    set({
      difficulty,
      puzzles,
      totalLevels: puzzles.length
    });
  },
  
  startGame: () => {
    const { puzzles } = get();
    
    // Reset game state and start at level 1
    set({
      phase: "playing",
      currentLevel: 1,
      currentPuzzle: puzzles[0], // First puzzle
      levelsCompleted: 0
    });
  },
  
  completeLevel: (success) => {
    // Mark current level as complete and show completion screen
    set((state) => ({
      phase: "levelComplete",
      levelsCompleted: success ? state.levelsCompleted + 1 : state.levelsCompleted
    }));
  },
  
  continueToNextLevel: () => {
    const { currentLevel, totalLevels, puzzles } = get();
    
    // If all levels completed, go back to home
    if (currentLevel >= totalLevels) {
      set({ phase: "home" });
      return;
    }
    
    // Otherwise, continue to next level
    const nextLevel = currentLevel + 1;
    set({
      phase: "playing",
      currentLevel: nextLevel,
      currentPuzzle: puzzles[nextLevel - 1] // Arrays are 0-indexed
    });
  },
  
  goToHome: () => {
    // Reset and go back to home screen
    set({
      phase: "home",
      currentLevel: 1,
      currentPuzzle: null
    });
  },
  
  resetGame: () => {
    // Complete reset of game state
    set({
      phase: "home",
      currentLevel: 1,
      puzzles: [],
      currentPuzzle: null,
      levelsCompleted: 0
    });
  }
}));
