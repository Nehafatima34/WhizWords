import { useState, useEffect } from "react";
import HomePage from "./components/game/HomePage";
import StoryReader from "./components/game/StoryReader";
import LevelComplete from "./components/game/LevelComplete";
import { useGameState } from "./lib/stores/useGameState";
import { initAudio } from "./lib/audioManager";
import "@fontsource/inter";

// Main App component that orchestrates the game flow
function App() {
  const gameState = useGameState();
  const [isLoading, setIsLoading] = useState(true);

  // Initialize audio and any other resources
  useEffect(() => {
    const loadResources = async () => {
      try {
        await initAudio();
        // Allow a short delay to ensure everything is loaded
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to load resources:", error);
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mx-auto mb-4"></div>
          <h2 className="text-white text-2xl font-lexend">Loading WhizWords...</h2>
        </div>
      </div>
    );
  }

  // Determine background based on current story theme
  const getBackgroundElements = () => {
    const theme = gameState.currentStoryTheme;
    
    if (gameState.phase === "home") {
      return (
        // Magical homepage background with flying books and stars
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          
          {/* Animated flying books */}
          <div className="absolute w-16 h-12 bg-white shadow-md rounded transform rotate-12 animate-float animation-delay-1000" style={{ top: '15%', left: '10%' }}></div>
          <div className="absolute w-20 h-14 bg-white shadow-md rounded transform -rotate-6 animate-float-reverse animation-delay-3000" style={{ top: '25%', right: '20%' }}></div>
          <div className="absolute w-14 h-10 bg-white shadow-md rounded transform rotate-3 animate-float animation-delay-5000" style={{ bottom: '30%', left: '25%' }}></div>
          
          {/* Twinkling stars */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      );
    }
    
    // Theme-specific backgrounds for story pages
    switch (theme) {
      case "forest":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-green-100 to-green-200"></div>
            {/* Forest elements - trees, leaves */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-green-600 opacity-20"></div>
            <div className="absolute top-20 left-10 w-20 h-40 bg-green-800 rounded-t-full opacity-30"></div>
            <div className="absolute top-30 right-20 w-16 h-32 bg-green-800 rounded-t-full opacity-30"></div>
            {/* Birds */}
            <div className="absolute w-3 h-1 bg-black rounded-full animate-bird" style={{ top: '15%', left: '30%' }}></div>
            <div className="absolute w-3 h-1 bg-black rounded-full animate-bird animation-delay-2000" style={{ top: '10%', left: '60%' }}></div>
          </div>
        );
      case "ocean":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-300"></div>
            {/* Water ripples */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-blue-500 opacity-20 animate-wave"></div>
            {/* Fish */}
            <div className="absolute w-6 h-3 bg-orange-400 rounded-full animate-fish" style={{ bottom: '30%', left: '10%' }}></div>
            <div className="absolute w-4 h-2 bg-blue-600 rounded-full animate-fish animation-delay-3000" style={{ bottom: '50%', right: '20%' }}></div>
          </div>
        );
      case "space":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 to-purple-900"></div>
            {/* Stars */}
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
            {/* Spaceship */}
            <div className="absolute w-12 h-6 bg-gray-300 rounded-full animate-float-slow" style={{ top: '20%', right: '30%' }}></div>
          </div>
        );
      case "castle":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-100 to-amber-200"></div>
            {/* Castle towers */}
            <div className="absolute bottom-0 left-10 w-20 h-64 bg-gray-500 opacity-30"></div>
            <div className="absolute bottom-0 left-20 w-12 h-72 bg-gray-600 opacity-30"></div>
            <div className="absolute bottom-0 right-10 w-20 h-64 bg-gray-500 opacity-30"></div>
            <div className="absolute bottom-0 right-20 w-12 h-72 bg-gray-600 opacity-30"></div>
            {/* Clouds */}
            <div className="absolute w-24 h-10 bg-white rounded-full opacity-70 animate-float-slow" style={{ top: '15%', left: '20%' }}></div>
            <div className="absolute w-32 h-10 bg-white rounded-full opacity-70 animate-float-slow animation-delay-3000" style={{ top: '10%', right: '30%' }}></div>
          </div>
        );
      case "rainbow":
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-purple-100"></div>
            {/* Rainbow */}
            <div className="absolute top-20 left-0 right-0 h-40 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 opacity-30 rounded-full transform scale-150"></div>
            {/* Clouds */}
            <div className="absolute w-24 h-10 bg-white rounded-full opacity-70 animate-float-slow" style={{ top: '25%', left: '10%' }}></div>
            <div className="absolute w-32 h-10 bg-white rounded-full opacity-70 animate-float-slow animation-delay-2000" style={{ top: '20%', right: '10%' }}></div>
          </div>
        );
      default:
        return (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen overflow-hidden relative ${gameState.phase === "playing" && gameState.currentStoryTheme === "space" ? "text-white" : "text-gray-800"}`}>
      {/* Theme-based animated background elements */}
      {getBackgroundElements()}

      {/* Game content */}
      <div className="relative z-10 min-h-screen">
        {gameState.phase === "home" && <HomePage />}
        {gameState.phase === "playing" && <StoryReader />}
        {gameState.phase === "levelComplete" && <LevelComplete />}
      </div>
    </div>
  );
}

export default App;
