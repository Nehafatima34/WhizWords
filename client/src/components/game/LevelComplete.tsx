import { useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useGameState } from "../../lib/stores/useGameState";
import { useAudio } from "../../lib/stores/useAudio";
import MotivationalMessage from "./MotivationalMessage";

const LevelComplete = () => {
  const { 
    completeLevel, 
    continueToNextLevel, 
    goToHome, 
    currentLevel, 
    totalLevels, 
    levelsCompleted,
    difficulty 
  } = useGameState();
  
  const { playSuccess } = useAudio();
  
  // Play success sound when component mounts
  useEffect(() => {
    playSuccess();
  }, [playSuccess]);
  
  // Determine if this is the final level
  const isFinalLevel = currentLevel >= totalLevels;
  
  // Animation variants for elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Confetti celebration effect */}
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={isFinalLevel ? 500 : 200}
        gravity={0.1}
      />
      
      <motion.div
        className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            {isFinalLevel ? (
              <div className="text-3xl font-bold text-purple-600 mb-3">All Stories Complete!</div>
            ) : (
              <div className="text-3xl font-bold text-purple-600 mb-3">Story Complete!</div>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex justify-center my-3">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              {isFinalLevel
                ? "Amazing job! You've read all the stories in this difficulty level."
                : "Great reading! You've completed this story successfully."}
            </p>
            
            <div className="mb-4">
              <MotivationalMessage difficulty={difficulty} />
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
              <div>Progress:</div>
              <div className="font-bold">{levelsCompleted} / {totalLevels}</div>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                  style={{ width: `${Math.min(100, (levelsCompleted / totalLevels) * 100)}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-x-4">
            {isFinalLevel ? (
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-md"
                onClick={goToHome}
              >
                Back to Home
              </button>
            ) : (
              <>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full shadow-md"
                  onClick={continueToNextLevel}
                >
                  Next Story
                </button>
                <button
                  className="text-purple-600 hover:text-purple-800 py-2 px-4"
                  onClick={goToHome}
                >
                  Exit
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LevelComplete;