import { motion } from "framer-motion";
import { useState } from "react";

interface DifficultySelectorProps {
  onSelect: (difficulty: "easy" | "medium" | "hard") => void;
}

const DifficultySelector = ({ onSelect }: DifficultySelectorProps) => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const difficulties = [
    {
      id: "easy",
      name: "Easy",
      description: "Short words, slower pace, fewer distractions",
      color: "from-green-400 to-green-500",
      hoverColor: "from-green-500 to-green-600"
    },
    {
      id: "medium",
      name: "Medium",
      description: "Moderate challenge with moderate pace and medium-difficulty words",
      color: "from-blue-400 to-blue-500",
      hoverColor: "from-blue-500 to-blue-600"
    },
    {
      id: "hard",
      name: "Hard",
      description: "Complex words and faster pace for a more challenging experience",
      color: "from-red-400 to-red-500",
      hoverColor: "from-red-500 to-red-600"
    }
  ];

  return (
    <motion.div 
      className="max-w-2xl w-full bg-white rounded-2xl p-8 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 font-lexend">
        Choose Your Difficulty
      </h2>
      
      <div className="space-y-4">
        {difficulties.map((difficulty) => (
          <motion.button
            key={difficulty.id}
            className={`w-full p-6 rounded-xl text-left transition duration-300 shadow-md 
                       bg-gradient-to-r ${hoveredOption === difficulty.id ? difficulty.hoverColor : difficulty.color} text-white`}
            onClick={() => onSelect(difficulty.id as "easy" | "medium" | "hard")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setHoveredOption(difficulty.id)}
            onHoverEnd={() => setHoveredOption(null)}
          >
            <h3 className="text-2xl font-bold mb-2 font-lexend">{difficulty.name}</h3>
            <p className="text-sm opacity-90 font-lexend">{difficulty.description}</p>
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="mt-8 text-center text-gray-600 text-sm font-lexend"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Select the option that best matches your comfort level
      </motion.div>
    </motion.div>
  );
};

export default DifficultySelector;
