import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MotivationalMessageProps {
  difficulty: "easy" | "medium" | "hard";
}

const MotivationalMessage = ({ difficulty }: MotivationalMessageProps) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const easyMessages = [
      "Great job! You're getting better with every word!",
      "Well done! Keep up the good work!",
      "You're making great progress! Keep it up!",
      "Fantastic! You're mastering these words!"
    ];

    const mediumMessages = [
      "Well done! You're on fire!",
      "Impressive work! You're really getting the hang of this!",
      "You're doing so well! Keep pushing yourself!",
      "Amazing progress! You're tackling these words like a pro!"
    ];

    const hardMessages = [
      "Keep going, you're unstoppable!",
      "Outstanding work! You're mastering even the toughest words!",
      "Incredible job! Your hard work is really paying off!",
      "Phenomenal! You're conquering these challenging words!"
    ];

    let messageList;
    switch (difficulty) {
      case "easy":
        messageList = easyMessages;
        break;
      case "medium":
        messageList = mediumMessages;
        break;
      case "hard":
        messageList = hardMessages;
        break;
      default:
        messageList = easyMessages;
    }

    // Randomly select a message
    const randomIndex = Math.floor(Math.random() * messageList.length);
    setMessage(messageList[randomIndex]);
  }, [difficulty]);

  // Animation for the text to appear letter by letter
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.8,
        staggerChildren: 0.03
      }
    }
  };

  const letter = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.p
      className="text-xl text-purple-600 mb-4 font-lexend"
      variants={sentence}
      initial="hidden"
      animate="visible"
    >
      {message.split("").map((char, index) => (
        <motion.span key={`char-${index}`} variants={letter}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default MotivationalMessage;
