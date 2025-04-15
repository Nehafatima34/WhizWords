import { motion } from "framer-motion";

const RibbonAnimation = () => {
  return (
    <div className="absolute top-0 left-0 right-0 overflow-hidden h-16 z-0 pointer-events-none">
      <motion.div
        className="h-8 bg-gradient-to-r from-pink-400 via-red-500 to-pink-400 w-[200%]"
        initial={{ x: "-100%" }}
        animate={{ 
          x: "0%",
          transition: { 
            duration: 3,
            ease: "easeOut" 
          }
        }}
      />
      
      <motion.div
        className="h-4 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400 w-[200%] mt-1"
        initial={{ x: "-100%" }}
        animate={{ 
          x: "0%", 
          transition: { 
            duration: 3.5,
            ease: "easeOut",
            delay: 0.2
          }
        }}
      />
      
      {/* Sparkles / confetti on the ribbon */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white"
          style={{
            top: `${Math.random() * 12}px`,
            left: `${(i / 20) * 100}%`,
            opacity: 0.6 + Math.random() * 0.4,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: 0.5 + i * 0.1,
            repeat: 2,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

export default RibbonAnimation;
