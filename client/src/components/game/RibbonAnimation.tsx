import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface RibbonAnimationProps {
  show: boolean;
  onComplete?: () => void;
}

const RibbonAnimation = ({ show, onComplete }: RibbonAnimationProps) => {
  const animationRef = useRef<HTMLDivElement>(null);
  
  // Handle animation completion
  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000); // Animation lasts for 2 seconds
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);
  
  if (!show) return null;
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
      ref={animationRef}
    >
      <motion.div
        className="w-full h-full absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top ribbon */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-purple-500 to-purple-600"
          initial={{ height: 0 }}
          animate={{ height: '30vh' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Bottom ribbon */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-purple-500 to-purple-600"
          initial={{ height: 0 }}
          animate={{ height: '30vh' }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Central text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="bg-white rounded-full p-6 shadow-xl">
            <h2 className="text-3xl font-bold text-purple-600">Great Reading!</h2>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RibbonAnimation;