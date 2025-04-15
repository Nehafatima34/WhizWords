import { WordPuzzle } from './stores/useGameState';

// Word lists by difficulty
const easyWords = [
  'cat', 'dog', 'sun', 'hat', 'pen', 'box', 'red', 'big', 'run', 'top',
  'map', 'sit', 'cup', 'bed', 'fan', 'hot', 'pot', 'ten', 'jam', 'pig'
];

const mediumWords = [
  'apple', 'happy', 'chair', 'party', 'night', 'plant', 'house', 'river', 'water', 'beach',
  'smile', 'bread', 'music', 'dance', 'green', 'phone', 'cloud', 'brush', 'tiger', 'space'
];

const hardWords = [
  'elephant', 'mountain', 'computer', 'exciting', 'birthday', 'chocolate', 'together', 'vacation', 'attention', 'beautiful',
  'adventure', 'community', 'dinosaur', 'wonderful', 'experience', 'breakfast', 'important', 'education', 'scientist', 'furniture'
];

// Get random items from an array
const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate a single word puzzle
export const generatePuzzle = (word: string, difficulty: 'easy' | 'medium' | 'hard'): WordPuzzle => {
  // Determine how many blanks to create based on difficulty
  let blankCount;
  switch (difficulty) {
    case 'easy':
      blankCount = Math.min(1, word.length - 1); // 1 blank for easy words
      break;
    case 'medium':
      blankCount = Math.min(2, word.length - 1); // 2 blanks for medium words
      break;
    case 'hard':
      blankCount = Math.min(3, word.length - 1); // 3 blanks for hard words
      break;
    default:
      blankCount = 1;
  }

  // Generate random positions for the blanks
  const positions = [];
  while (positions.length < blankCount) {
    const position = Math.floor(Math.random() * word.length);
    if (!positions.includes(position)) {
      positions.push(position);
    }
  }
  
  // Sort positions in ascending order
  positions.sort((a, b) => a - b);

  // Get the letters that will be missing
  const missingLetters = positions.map(pos => word[pos]);

  // Create the set of available letters (including the correct ones)
  // Add some distractors based on difficulty
  const distractorCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7;
  
  // All letters of the alphabet for potential distractors
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  
  // Exclude the missing letters from potential distractors
  const potentialDistractors = alphabet.filter(letter => !missingLetters.includes(letter));
  
  // Get random distractors
  const distractors = getRandomItems(potentialDistractors, distractorCount);
  
  // Combine with correct letters and shuffle
  let availableLetters = [...missingLetters, ...distractors];
  availableLetters = availableLetters.sort(() => 0.5 - Math.random());

  return {
    word,
    blanks: positions,
    missingLetters,
    availableLetters
  };
};

// Get a set of puzzles for a given difficulty
export const getPuzzlesForDifficulty = (
  difficulty: 'easy' | 'medium' | 'hard', 
  count: number
): WordPuzzle[] => {
  let wordList;
  
  switch (difficulty) {
    case 'easy':
      wordList = easyWords;
      break;
    case 'medium':
      wordList = mediumWords;
      break;
    case 'hard':
      wordList = hardWords;
      break;
    default:
      wordList = easyWords;
  }
  
  // Get random words from the appropriate list
  const selectedWords = getRandomItems(wordList, count);
  
  // Generate puzzles for each word
  return selectedWords.map(word => generatePuzzle(word, difficulty));
};
