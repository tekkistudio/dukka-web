// apps/web/src/components/sections/demo/interactions/ChoiceButtons.tsx
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

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
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
      {choices.map((choice, index) => (
        <motion.button
          key={`${choice}-${index}`}
          variants={item}
          onClick={() => !choice.includes('bientôt') && onSelect(choice)}
          className={getButtonStyle(choice)}
          whileHover={!choice.includes('bientôt') ? { scale: 1.02 } : undefined}
          whileTap={!choice.includes('bientôt') ? { scale: 0.98 } : undefined}
        >
          {choice}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default ChoiceButtons;