import { useState } from "react";
import { motion } from "framer-motion";
import DifficultySelector from "./DifficultySelector";
import { useGameState } from "../../lib/stores/useGameState";

const HomePage = () => {
  const { setDifficulty, startGame } = useGameState();
  const [showDifficultySelector, setShowDifficultySelector] = useState(false);

  const handleStartClick = () => {
    setShowDifficultySelector(true);
  };

  const handleDifficultySelect = (difficulty: "easy" | "medium" | "hard") => {
    setDifficulty(difficulty);
    startGame();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {showDifficultySelector ? (
        <DifficultySelector onSelect={handleDifficultySelect} />
      ) : (
        <motion.div
          className="max-w-lg w-full bg-white rounded-2xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-lexend mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Welcome to WhizWords!
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-700 font-lexend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Ready to improve your word skills?
            </motion.p>
            
            <motion.p
              className="mt-4 text-lg text-gray-600 font-lexend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Get ready to conquer words, level by level!
            </motion.p>
          </div>
          
          <motion.button
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 font-lexend"
            onClick={handleStartClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Start Game
          </motion.button>
          
          {/* Animated ribbon decoration */}
          <motion.div
            className="absolute -top-3 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 to-pink-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default HomePage;
