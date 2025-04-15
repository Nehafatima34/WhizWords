import { useState, useEffect } from "react";
import HomePage from "./components/game/HomePage";
import GamePlay from "./components/game/GamePlay";
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

  return (
    <div className="min-h-screen overflow-hidden relative bg-gradient-to-br from-indigo-100 to-purple-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Game content */}
      <div className="relative z-10 min-h-screen">
        {gameState.phase === "home" && <HomePage />}
        {gameState.phase === "playing" && <GamePlay />}
        {gameState.phase === "levelComplete" && <LevelComplete />}
      </div>
    </div>
  );
}

export default App;
