import { useEffect } from "react";
import { motion } from "framer-motion";
import MotivationalMessage from "./MotivationalMessage";
import RibbonAnimation from "./RibbonAnimation";
import { useGameState } from "../../lib/stores/useGameState";
import { playSuccessSound } from "../../lib/audioManager";

const LevelComplete = () => {
  const { 
    currentLevel, 
    totalLevels, 
    difficulty, 
    continueToNextLevel, 
    goToHome,
    levelsCompleted
  } = useGameState();

  const isGameComplete = currentLevel >= totalLevels;

  useEffect(() => {
    // Play success sound when level complete screen appears
    playSuccessSound();
  }, []);

  // Automatically progress to next level after a certain time
  useEffect(() => {
    if (!isGameComplete) {
      const timer = setTimeout(() => {
        continueToNextLevel();
      }, 6000); // 6 seconds to see the celebration

      return () => clearTimeout(timer);
    }
  }, [isGameComplete, continueToNextLevel]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Ribbon animation at the top */}
      <RibbonAnimation />
      
      <motion.div
        className="max-w-lg w-full bg-white rounded-2xl p-8 shadow-xl text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {isGameComplete ? (
          <>
            <motion.div 
              className="text-6xl mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.7 }}
            >
              🏆
            </motion.div>
            <motion.h1 
              className="text-3xl sm:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-lexend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Congratulations!
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-700 mb-6 font-lexend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              You've completed all levels in {difficulty} mode!
            </motion.p>
            <motion.div
              className="mb-8 p-4 bg-purple-50 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-lg text-purple-800 font-lexend">
                You successfully completed {levelsCompleted} out of {totalLevels} levels.
              </p>
            </motion.div>
            <motion.button
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 font-lexend"
              onClick={goToHome}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Play Again
            </motion.button>
          </>
        ) : (
          <>
            <motion.div 
              className="text-6xl mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.7 }}
            >
              ✨
            </motion.div>
            <motion.h1 
              className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-lexend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Level {currentLevel} Complete!
            </motion.h1>
            
            {/* Motivational message */}
            <MotivationalMessage difficulty={difficulty} />
            
            <motion.p 
              className="mt-6 text-gray-600 font-lexend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Automatically continuing to next level...
            </motion.p>
          </>
        )}
      </motion.div>
      
      {/* Confetti-like elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: `hsl(${Math.random() * 360}, 80%, 60%)`,
            left: `${Math.random() * 100}%`,
            top: `-5%`,
          }}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: `${100 + Math.random() * 20}vh`,
            opacity: [0, 1, 1, 0],
            x: (Math.random() - 0.5) * 100,
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

export default LevelComplete;
