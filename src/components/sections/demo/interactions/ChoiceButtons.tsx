import React from 'react';
import { motion } from 'framer-motion';

interface ChoiceButtonsProps {
  choices: string[];
  onSelect: (choice: string) => void;
  type?: 'default' | 'payment';
}

const ChoiceButtons = ({ 
  choices, 
  onSelect, 
  type = 'default' 
}: ChoiceButtonsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  const getButtonStyle = (choice: string) => {
    if (type === 'payment') {
      const isDisabled = choice.includes('bientôt');
      return `
        ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50 text-dukka-primary'}
        px-4 py-3 rounded-xl transition-colors text-sm border border-gray-200
      `;
    }
    return 'bg-white hover:bg-gray-50 text-dukka-primary px-4 py-2.5 rounded-full transition-colors text-sm border border-gray-200';
  };

  return (
    <motion.div 
      className="flex flex-wrap gap-2 w-full"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {choices.map((choice, index) => {
        const isDisabled = choice.includes('bientôt');
        return (
          <motion.button
            key={`${choice}-${index}`}
            custom={index}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            onClick={() => !isDisabled && onSelect(choice)}
            className={getButtonStyle(choice)}
            whileHover={!isDisabled ? { scale: 1.02 } : undefined}
            whileTap={!isDisabled ? { scale: 0.98 } : undefined}
            disabled={isDisabled}
          >
            {choice}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default ChoiceButtons;