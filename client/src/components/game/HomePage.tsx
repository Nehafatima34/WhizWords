import { useState } from "react";
import { motion } from "framer-motion";
import { useGameState } from "../../lib/stores/useGameState";
import { useAudio } from "../../lib/stores/useAudio";
import DifficultySelector from "./DifficultySelector";

// The main HomePage component that serves as the entry point to the game
const HomePage = () => {
  const { setDifficulty, startGame, toggleFont, fontFamily, toggleAudio } = useGameState();
  const { toggleMute, isMuted } = useAudio();
  const [showDifficulty, setShowDifficulty] = useState(false);
  
  // Handle start button click
  const handleStartClick = () => {
    setShowDifficulty(true);
  };
  
  // Handle difficulty selection
  const handleDifficultySelect = (difficulty: "easy" | "medium" | "hard") => {
    setDifficulty(difficulty);
    startGame();
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Logo and Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-5xl font-bold text-purple-800 mb-2 ${fontFamily === "lexend" ? "font-lexend" : "font-opendyslexic"}`}>
          WhizWords
        </h1>
        <p className="text-purple-600 text-xl">
          Turn pages into play where stories come alive one word at a time
        </p>
      </motion.div>
      
      {/* Book Animation */}
      <motion.div
        className="relative w-64 h-64 mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-white rounded-md shadow-lg transform -rotate-6 animate-float-slow"></div>
        <div className="absolute inset-0 bg-white rounded-md shadow-lg transform rotate-3 animate-float-reverse animation-delay-1000"></div>
        <div className="absolute inset-0 bg-indigo-100 rounded-md shadow-lg flex items-center justify-center">
          <div className="text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-lg text-purple-800 font-semibold">
              A reading adventure
            </p>
            <p className="text-sm text-gray-600">
              Helping with dyslexia through storytelling
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* Action Buttons */}
      {!showDifficulty ? (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg mb-4 transform transition hover:scale-105"
            onClick={handleStartClick}
          >
            Start Reading
          </button>
          
          {/* Settings Buttons */}
          <div className="flex space-x-4 mt-4">
            <motion.button
              className={`rounded-full p-3 bg-white shadow-md ${isMuted ? 'text-gray-400' : 'text-purple-600'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                toggleMute();
                toggleAudio();
              }}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </motion.button>
            
            <motion.button
              className={`rounded-full p-3 bg-white shadow-md text-purple-600`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleFont}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </motion.button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-purple-600">
              Current Font: {fontFamily === "lexend" ? "Lexend" : "OpenDyslexic"}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DifficultySelector onSelect={handleDifficultySelect} />
          
          <div className="mt-4 text-center">
            <button
              className="text-purple-600 underline"
              onClick={() => setShowDifficulty(false)}
            >
              Back to Main Menu
            </button>
          </div>
        </motion.div>
      )}
      
      {/* Footer info */}
      <motion.div
        className="absolute bottom-4 text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p>A dyslexia-friendly reading game</p>
      </motion.div>
    </div>
  );
};

export default HomePage;