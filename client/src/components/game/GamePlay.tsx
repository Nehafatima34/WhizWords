import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "../../lib/stores/useGameState";
import BackButton from "./BackButton";
import ProgressBar from "./ProgressBar";
import { playCorrectSound, playIncorrectSound } from "../../lib/audioManager";

const GamePlay = () => {
  const { 
    currentLevel,
    currentPuzzle,
    difficulty,
    completeLevel,
    goToHome,
    totalLevels
  } = useGameState();
  
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [incorrectAttempts, setIncorrectAttempts] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(getDifficultyTime());
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Set timer based on difficulty
  function getDifficultyTime() {
    switch(difficulty) {
      case "easy": return 60;
      case "medium": return 45;
      case "hard": return 30;
      default: return 60;
    }
  }

  // Reset the puzzle state when the current puzzle changes
  useEffect(() => {
    if (currentPuzzle) {
      setSelectedLetters([]);
      setIncorrectAttempts([]);
      setIsCorrect(null);
      setTimeLeft(getDifficultyTime());
    }
  }, [currentPuzzle]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && currentPuzzle && isCorrect === null) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isCorrect === null) {
      handleTimeOut();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, currentPuzzle, isCorrect]);

  const handleTimeOut = () => {
    // Handle time running out - we'll proceed to the next level anyway
    // but could add a specific feedback here
    setTimeout(() => {
      completeLevel(false);
    }, 1500);
  };

  const handleLetterClick = (letter: string, index: number) => {
    if (isCorrect !== null || !currentPuzzle) return;

    // Check if the letter is correct for the current position
    const currentPosition = selectedLetters.length;
    if (currentPosition < currentPuzzle.missingLetters.length) {
      const expectedLetter = currentPuzzle.missingLetters[currentPosition];
      
      if (letter.toLowerCase() === expectedLetter.toLowerCase()) {
        // Correct letter
        playCorrectSound();
        const newSelectedLetters = [...selectedLetters, letter];
        setSelectedLetters(newSelectedLetters);
        
        // Check if word is complete
        if (newSelectedLetters.length === currentPuzzle.missingLetters.length) {
          setIsCorrect(true);
          
          // Delay level completion to show success animation
          setTimeout(() => {
            completeLevel(true);
          }, 1500);
        }
      } else {
        // Incorrect letter
        playIncorrectSound();
        setIncorrectAttempts(prev => [...prev, index]);
        
        // Clear incorrect indication after a short delay
        setTimeout(() => {
          setIncorrectAttempts(prev => prev.filter(i => i !== index));
        }, 800);
      }
    }
  };

  if (!currentPuzzle) return null;

  // Format the current word with blanks for missing letters
  const wordWithBlanks = currentPuzzle.word.split('').map((letter, index) => {
    if (currentPuzzle.blanks.includes(index)) {
      const position = currentPuzzle.blanks.indexOf(index);
      return position < selectedLetters.length ? selectedLetters[position] : '_';
    }
    return letter;
  }).join('');
  
  // Create an array of letters for the player to choose from
  const availableLetters = currentPuzzle.availableLetters;

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-8 font-lexend">
      <div className="flex justify-between items-center mb-6">
        <BackButton onClick={goToHome} />
        <div className="text-lg font-semibold text-purple-800">
          Level: {currentLevel} / {totalLevels}
        </div>
      </div>
      
      <ProgressBar 
        current={currentLevel} 
        total={totalLevels} 
        className="mb-6"
      />
      
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Timer */}
        <div className="mb-6 w-full max-w-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Time Remaining:</span>
            <span 
              className={`font-bold ${timeLeft < 10 ? 'text-red-600' : 'text-gray-800'}`}
            >
              {timeLeft}s
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / getDifficultyTime()) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Current word puzzle */}
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg text-center mb-8">
          <h2 className="text-xl text-gray-700 mb-4">Complete the word:</h2>
          
          <div className="flex justify-center space-x-3 mb-8">
            {wordWithBlanks.split('').map((letter, index) => {
              const isBlank = letter === '_';
              return (
                <motion.div 
                  key={`word-${index}`}
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center 
                    text-2xl font-bold rounded-lg 
                    ${isBlank ? 'border-2 border-dashed border-gray-400 bg-gray-100' : 'bg-purple-100'}
                  `}
                  initial={isBlank ? { scale: 1 } : { scale: 0.8, opacity: 0 }}
                  animate={isBlank ? { scale: 1 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {letter}
                </motion.div>
              );
            })}
          </div>
          
          {/* Letter options */}
          <div className="grid grid-cols-5 gap-3 max-w-sm mx-auto">
            {availableLetters.map((letter, index) => {
              const isSelected = selectedLetters.includes(letter);
              const isIncorrect = incorrectAttempts.includes(index);
              
              return (
                <motion.button
                  key={`letter-${index}`}
                  className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-lg font-bold text-lg shadow-md
                    ${isSelected ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 
                      isIncorrect ? 'bg-red-200 text-red-800' : 
                      'bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:from-purple-500 hover:to-pink-500'}
                  `}
                  whileHover={!isSelected ? { scale: 1.05 } : {}}
                  whileTap={!isSelected ? { scale: 0.95 } : {}}
                  onClick={() => !isSelected && handleLetterClick(letter, index)}
                  disabled={isSelected}
                  animate={isIncorrect ? { x: [0, -5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  {letter}
                </motion.button>
              );
            })}
          </div>
        </div>
        
        {/* Success or failure feedback */}
        <AnimatePresence>
          {isCorrect === true && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-8 rounded-xl shadow-xl text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Correct!</h2>
                <p className="text-gray-600">Great job! Moving to next level...</p>
              </motion.div>
            </motion.div>
          )}
          
          {isCorrect === false && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-8 rounded-xl shadow-xl text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="text-6xl mb-4">⏱️</div>
                <h2 className="text-2xl font-bold text-amber-600 mb-2">Time's Up!</h2>
                <p className="text-gray-600">Let's try the next one...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamePlay;
