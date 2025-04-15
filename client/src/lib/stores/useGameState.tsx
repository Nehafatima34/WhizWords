import { create } from "zustand";

export type GamePhase = "home" | "playing" | "levelComplete";
export type Difficulty = "easy" | "medium" | "hard";
export type ThemeType = "forest" | "ocean" | "space" | "castle" | "rainbow" | "default";

export interface Story {
  id: string;
  title: string;
  theme: ThemeType;
  content: string;
  difficulty: Difficulty;
}

interface GameState {
  // State
  phase: GamePhase;
  difficulty: Difficulty;
  currentLevel: number;
  totalLevels: number;
  stories: Story[];
  currentStory: Story | null;
  currentStoryTheme: ThemeType;
  levelsCompleted: number;
  currentWordIndex: number;
  isAudioEnabled: boolean;
  fontFamily: "lexend" | "opendyslexic";
  
  // Actions
  setDifficulty: (difficulty: Difficulty) => void;
  startGame: () => void;
  completeLevel: (success: boolean) => void;
  continueToNextLevel: () => void;
  goToHome: () => void;
  resetGame: () => void;
  toggleAudio: () => void;
  toggleFont: () => void;
  readNextWord: () => void;
}

// Sample stories by difficulty and theme
const storiesByDifficulty: Record<Difficulty, Story[]> = {
  easy: [
    {
      id: "bunny-garden",
      title: "Bunny's Garden Adventure",
      theme: "forest",
      difficulty: "easy",
      content: "Hop hop! Little Bunny jumps in the garden. He sees big red flowers. Bunny smells sweet grass. The sun is warm. Bunny finds a carrot! Yum yum! Bunny loves his garden home."
    },
    {
      id: "lost-fairy",
      title: "The Lost Fairy Wand",
      theme: "forest",
      difficulty: "easy",
      content: "Tink the fairy lost her magic wand. She looks in the flowers. She looks under leaves. Where is it? A bird has it! The bird gives it back. Now Tink can do magic again!"
    }
  ],
  medium: [
    {
      id: "ocean-colors",
      title: "Ocean of Colors",
      theme: "ocean",
      difficulty: "medium",
      content: "Deep in the blue ocean, fish swim between green seaweed. A yellow seahorse hides behind purple coral. Red starfish rest on the sandy floor. Orange crabs scuttle across rocks. The water sparkles with rainbow colors when sunlight touches the waves."
    },
    {
      id: "space-galaxy",
      title: "Rocket to Reading Galaxy",
      theme: "space",
      difficulty: "medium",
      content: "Captain Sam blasts off in her silver rocket. She zooms past twinkling stars and colorful planets. Her mission is to find the Reading Galaxy! She flies through a cloud of space dust. Finally, she sees it - a galaxy shaped like an open book!"
    }
  ],
  hard: [
    {
      id: "castle-escape",
      title: "WhizWords Castle Escape",
      theme: "castle",
      difficulty: "hard",
      content: "Princess Maya was trapped in the highest tower of the ancient WhizWords Castle. The mysterious enchanted books that surrounded her contained magical spells that could help her escape. Each time she read a difficult word correctly, one of the heavy stone blocks in the wall would disappear. She practiced reading every day, watching as more light streamed through the growing opening in the wall."
    },
    {
      id: "rainbow-unicorn",
      title: "The Rainbow Unicorn's Quest",
      theme: "rainbow",
      difficulty: "hard",
      content: "The magnificent rainbow unicorn galloped across the sparkling meadow, searching for the lost pieces of his magical crystal horn. Each fragment was hidden within a challenging puzzle that only someone with exceptional reading skills could solve. As he journeyed through the enchanted forest, friendly woodland creatures offered clues written in riddles. The unicorn knew that only by understanding every word perfectly would he restore his powerful horn and bring color back to the fading rainbow kingdom."
    }
  ]
};

export const useGameState = create<GameState>((set, get) => ({
  phase: "home",
  difficulty: "easy",
  currentLevel: 1,
  totalLevels: 6, // 2 stories per difficulty level x 3 difficulty levels
  stories: [],
  currentStory: null,
  currentStoryTheme: "default",
  levelsCompleted: 0,
  currentWordIndex: -1, // Not yet started reading
  isAudioEnabled: false,
  fontFamily: "lexend",
  
  setDifficulty: (difficulty) => {
    // Get stories for the selected difficulty
    const selectedStories = storiesByDifficulty[difficulty as keyof typeof storiesByDifficulty] || [];
    
    set({
      difficulty,
      stories: selectedStories,
      totalLevels: selectedStories.length
    });
  },
  
  startGame: () => {
    const { stories, difficulty } = get();
    // Just use the default stories if none are set yet
    let selectedStories: Story[] = [];
    
    if (Array.isArray(stories) && stories.length > 0) {
      selectedStories = stories;
    } else {
      // Try to fetch stories from the API
      fetch('/api/stories')
        .then(response => response.json())
        .then(data => {
          if (data.stories && Array.isArray(data.stories)) {
            // Filter by the selected difficulty
            const storiesForDifficulty = data.stories.filter(
              (story: Story) => story.difficulty === difficulty
            );
            
            if (storiesForDifficulty.length > 0) {
              set({
                stories: storiesForDifficulty,
                totalLevels: storiesForDifficulty.length,
                phase: "playing",
                currentLevel: 1,
                currentStory: storiesForDifficulty[0],
                currentStoryTheme: storiesForDifficulty[0].theme,
                currentWordIndex: -1,
                levelsCompleted: 0
              });
              return;
            }
          }
          
          // If API fetch fails or returns no stories, fall back to the pre-defined stories
          const fallbackStories = storiesByDifficulty[difficulty as keyof typeof storiesByDifficulty] || [];
          if (fallbackStories.length > 0) {
            set({
              stories: fallbackStories,
              totalLevels: fallbackStories.length,
              phase: "playing",
              currentLevel: 1,
              currentStory: fallbackStories[0],
              currentStoryTheme: fallbackStories[0].theme,
              currentWordIndex: -1,
              levelsCompleted: 0
            });
            return;
          }
          
          console.error("No stories available for difficulty:", difficulty);
        })
        .catch(error => {
          console.error("Failed to fetch stories:", error);
          
          // Fall back to predefined stories on error
          const fallbackStories = storiesByDifficulty[difficulty as keyof typeof storiesByDifficulty] || [];
          if (fallbackStories.length > 0) {
            set({
              stories: fallbackStories,
              totalLevels: fallbackStories.length,
              phase: "playing",
              currentLevel: 1,
              currentStory: fallbackStories[0],
              currentStoryTheme: fallbackStories[0].theme,
              currentWordIndex: -1,
              levelsCompleted: 0
            });
          }
        });
      return; // Return early as we're handling state updates in the Promise
    }
    
    if (selectedStories.length === 0) {
      console.error("No stories available for difficulty:", difficulty);
      return;
    }
    
    // Reset game state and start at level 1
    set({
      phase: "playing",
      currentLevel: 1,
      currentStory: selectedStories[0],
      currentStoryTheme: selectedStories[0].theme,
      currentWordIndex: -1, // Start before first word
      levelsCompleted: 0
    });
  },
  
  readNextWord: () => {
    const { currentStory, currentWordIndex } = get();
    
    if (!currentStory) return;
    
    const words = currentStory.content.split(' ');
    
    // If we've reached the end of the story, complete the level
    if (currentWordIndex >= words.length - 1) {
      get().completeLevel(true);
      return;
    }
    
    // Otherwise, move to the next word
    set({
      currentWordIndex: currentWordIndex + 1
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
    const { currentLevel, totalLevels, stories } = get();
    
    // If all levels completed, go back to home
    if (currentLevel >= totalLevels) {
      set({ phase: "home" });
      return;
    }
    
    // Otherwise, continue to next level
    const nextLevel = currentLevel + 1;
    const nextStory = stories[nextLevel - 1]; // Arrays are 0-indexed
    
    set({
      phase: "playing",
      currentLevel: nextLevel,
      currentStory: nextStory,
      currentStoryTheme: nextStory.theme,
      currentWordIndex: -1 // Reset word index for new story
    });
  },
  
  goToHome: () => {
    // Reset and go back to home screen
    set({
      phase: "home",
      currentLevel: 1,
      currentStory: null,
      currentWordIndex: -1
    });
  },
  
  resetGame: () => {
    // Complete reset of game state
    set({
      phase: "home",
      currentLevel: 1,
      stories: [],
      currentStory: null,
      currentStoryTheme: "default",
      levelsCompleted: 0,
      currentWordIndex: -1
    });
  },
  
  toggleAudio: () => {
    set((state) => ({
      isAudioEnabled: !state.isAudioEnabled
    }));
  },
  
  toggleFont: () => {
    set((state) => ({
      fontFamily: state.fontFamily === "lexend" ? "opendyslexic" : "lexend"
    }));
  }
}));
