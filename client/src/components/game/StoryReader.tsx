import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "../../lib/stores/useGameState";
import { useAudio } from "../../lib/stores/useAudio";
import BackButton from "./BackButton";
import ProgressBar from "./ProgressBar";

const StoryReader = () => {
  const { 
    currentLevel,
    currentStory,
    difficulty,
    completeLevel,
    goToHome,
    totalLevels,
    readNextWord,
    currentWordIndex,
    fontFamily
  } = useGameState();
  
  const { playPageFlip, speakWord, isMuted, toggleMute } = useAudio();
  const storyContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to keep current word in view
  useEffect(() => {
    if (currentWordIndex >= 0 && storyContainerRef.current) {
      const activeWord = storyContainerRef.current.querySelector('.word-reveal.highlighted');
      if (activeWord) {
        activeWord.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [currentWordIndex]);
  
  // Handle word progression via word click or screen tap
  const handleStoryClick = () => {
    // Play page flip sound
    playPageFlip();
    
    // Move to next word
    readNextWord();
  };
  
  // Speak the current word if audio is enabled
  useEffect(() => {
    if (currentWordIndex >= 0 && currentStory) {
      const words = currentStory.content.split(' ');
      if (currentWordIndex < words.length) {
        const currentWord = words[currentWordIndex];
        speakWord(currentWord);
      }
    }
  }, [currentWordIndex, currentStory, speakWord]);
  
  if (!currentStory) return null;
  
  // Format the story text with each word separated for animation
  const words = currentStory.content.split(' ');
  
  return (
    <div className={`min-h-screen flex flex-col p-4 sm:p-8 ${fontFamily === "lexend" ? "font-lexend" : "font-opendyslexic"}`}>
      <div className="flex justify-between items-center mb-6">
        <BackButton onClick={goToHome} />
        <div className={`text-lg font-semibold ${currentStory.theme === "space" ? "text-white" : "text-gray-800"}`}>
          Level: {currentLevel} / {totalLevels}
        </div>
      </div>
      
      {/* Progress Bar */}
      <ProgressBar 
        current={currentLevel} 
        total={totalLevels} 
        className="mb-6"
      />
      
      {/* Story Title */}
      <motion.h1
        className={`text-2xl sm:text-3xl font-bold text-center mb-4 ${currentStory.theme === "space" ? "text-white" : "text-gray-800"}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentStory.title}
      </motion.h1>
      
      <div className="flex-1 flex flex-col items-center overflow-hidden">
        {/* Main content area */}
        <motion.div 
          className={`bg-white bg-opacity-90 rounded-xl shadow-xl p-6 w-full max-w-2xl mb-8 dyslexia-friendly overflow-y-auto max-h-[60vh]`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          ref={storyContainerRef}
          onClick={handleStoryClick}
        >
          <div className="text-xl sm:text-2xl leading-relaxed text-gray-800 cursor-pointer">
            {words.map((word, index) => (
              <span 
                key={`word-${index}`}
                className={`word-reveal inline-block mx-1 transition-all duration-300 ease-out ${
                  index <= currentWordIndex ? 'active' : ''
                } ${
                  index === currentWordIndex ? 'highlighted' : ''
                }`}
                aria-hidden={index > currentWordIndex}
              >
                {word}
              </span>
            ))}
          </div>
        </motion.div>
        
        {/* Instructions */}
        <motion.div
          className="text-center max-w-md mx-auto mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className={`text-sm ${currentStory.theme === "space" ? "text-white" : "text-gray-600"}`}>
            Tap or click anywhere on the story to continue reading
          </p>
        </motion.div>
        
        {/* Controls */}
        <div className="flex justify-center space-x-4 mt-4">
          <motion.button
            className={`rounded-full p-3 bg-white shadow-md ${isMuted ? 'text-gray-400' : 'text-purple-600'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
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
            className="rounded-full p-3 bg-white shadow-md text-purple-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              const fontToggle = document.querySelector('.font-toggle');
              if (fontToggle) {
                (fontToggle as HTMLElement).click();
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </motion.button>
          
          {/* Hidden button to toggle font - actually controlled by the useGameState */}
          <button 
            className="font-toggle hidden"
            onClick={(e) => {
              e.stopPropagation();
              const gameState = useGameState.getState();
              gameState.toggleFont();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryReader;