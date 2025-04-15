import { motion } from "framer-motion";

interface DifficultySelectorProps {
  onSelect: (difficulty: "easy" | "medium" | "hard") => void;
}

const DifficultySelector = ({ onSelect }: DifficultySelectorProps) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">Choose Difficulty</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 max-w-3xl">
        {/* Easy Mode */}
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("easy")}
        >
          <div className="bg-green-500 h-2"></div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-green-600 mb-2">Easy</h3>
            <p className="text-gray-600 text-sm">
              Simple words and short stories perfect for beginners.
            </p>
            <ul className="mt-4 text-sm text-gray-500">
              <li className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Short, simple stories
              </li>
              <li className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Basic vocabulary
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Relaxed reading pace
              </li>
            </ul>
          </div>
        </motion.div>
        
        {/* Medium Mode */}
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("medium")}
        >
          <div className="bg-blue-500 h-2"></div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-blue-600 mb-2">Medium</h3>
            <p className="text-gray-600 text-sm">
              Slightly more complex words and engaging stories.
            </p>
            <ul className="mt-4 text-sm text-gray-500">
              <li className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Medium-length stories
              </li>
              <li className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Expanded vocabulary
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Moderate reading pace
              </li>
            </ul>
          </div>
        </motion.div>
        
        {/* Hard Mode */}
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:scale-105"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("hard")}
        >
          <div className="bg-purple-500 h-2"></div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-purple-600 mb-2">Hard</h3>
            <p className="text-gray-600 text-sm">
              More complex words and richer, longer stories.
            </p>
            <ul className="mt-4 text-sm text-gray-500">
              <li className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Longer, detailed stories
              </li>
              <li className="flex items-center mb-1">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Advanced vocabulary
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Challenging reading pace
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DifficultySelector;