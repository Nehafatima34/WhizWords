import { useMemo } from "react";

interface MotivationalMessageProps {
  difficulty: "easy" | "medium" | "hard";
}

const MotivationalMessage = ({ difficulty }: MotivationalMessageProps) => {
  // Select a random motivational message based on difficulty
  const message = useMemo(() => {
    const messages = {
      easy: [
        "You're becoming a better reader with each story!",
        "Your reading skills are growing stronger!",
        "Great job with those words! Keep going!",
        "You're making excellent progress!",
      ],
      medium: [
        "You're tackling more challenging words and doing great!",
        "Your reading is getting more fluid with each story!",
        "Impressive work with these longer stories!",
        "You're building strong reading skills!",
      ],
      hard: [
        "You're mastering complex words like a pro!",
        "Your dedication to reading is truly inspiring!",
        "Outstanding work with these challenging stories!",
        "You've achieved an impressive reading milestone!",
      ]
    };
    
    // Get messages for the current difficulty
    const difficultyMessages = messages[difficulty];
    
    // Pick a random message from the array
    const randomIndex = Math.floor(Math.random() * difficultyMessages.length);
    return difficultyMessages[randomIndex];
  }, [difficulty]);
  
  return (
    <div className="italic text-purple-600">
      "{message}"
    </div>
  );
};

export default MotivationalMessage;