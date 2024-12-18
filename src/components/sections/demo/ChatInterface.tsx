import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Send, Mic } from 'lucide-react';
import type { Scenario } from './data';
import ChatMessage from './messages/ChatMessage';
import ChoiceButtons from './interactions/ChoiceButtons';

interface ChatInterfaceProps {
  messages: any[];
  isTyping: boolean;
  showCheckout: boolean;
  onUserChoice: (choice: string, isTextInput?: boolean) => void;
  chatRef: React.RefObject<HTMLDivElement>;
  scenario: Scenario;
  totalAmount: number;
}

export function ChatInterface({ 
  messages, 
  isTyping, 
  showCheckout, 
  onUserChoice,
  chatRef,
  scenario,
  totalAmount
}: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (inputMessage && !userTyping) {
      setUserTyping(true);
    } else if (!inputMessage && userTyping) {
      setUserTyping(false);
    }
    setLastActivity(Date.now());
    
    // Mise à jour des suggestions basées sur l'input
    if (inputMessage.length > 2) {
      const newSuggestions = getSuggestions(inputMessage.toLowerCase());
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputMessage, userTyping]);

  const getSuggestions = (text: string) => {
    if (text.includes('prix') || text.includes('coût') || text.includes('combien')) {
      return ["Voir les prix", "Commander maintenant"];
    }
    if (text.includes('livraison') || text.includes('délai')) {
      return ["Voir les zones de livraison", "Délais de livraison"];
    }
    if (text.includes('paiement') || text.includes('payer')) {
      return ["Modes de paiement", "Commander maintenant"];
    }
    return [];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    onUserChoice(inputMessage, true);
    setInputMessage("");
    setSuggestions([]);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col h-[600px]">
      {/* Header avec statut en ligne */}
      <div className="bg-white py-3 px-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-gray-600">
              {scenario.chatbotName} est en ligne
            </span>
          </div>
        </div>
      </div>

      {/* Zone des messages */}
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F0F2F5]"
      >
        <AnimatePresence>
          {messages.map((message, index) => {
            if (message.type === 'user-choices') {
              return (
                <ChoiceButtons
                  key={`choices-${index}`}
                  choices={message.choices}
                  onSelect={onUserChoice}
                  type={message.choices.includes('Wave') ? 'payment' : 'default'}
                />
              );
            }

            return (
              <ChatMessage
                key={`${message.type}-${index}`}
                message={message}
                isBot={message.type === 'assistant'}
                scenario={scenario}
                animate={true}
                showTimestamp={true}
              />
            );
          })}

          {/* Indicateur de frappe */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex space-x-1 p-3 bg-white rounded-2xl w-16 ml-1"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.5, delay: i * 0.15, repeat: Infinity }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bouton de paiement Wave */}
        {showCheckout && (
          <motion.div 
            className="flex justify-center py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={`https://pay.wave.com/m/M_OfAgT8X_IT6P/c/sn/?amount=${totalAmount}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1BA7FF] text-white px-6 py-3 rounded-xl flex items-center space-x-2 hover:bg-[#1697e6] transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image
                src="/images/payments/wave_1.svg"
                alt="Wave"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Payer {totalAmount.toLocaleString()} FCFA avec Wave</span>
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Zone de saisie */}
      <div className="px-4 py-3 bg-white border-t">
        {/* Suggestions */}
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div 
              className="flex flex-wrap gap-2 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onUserChoice(suggestion, true);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Tapez votre message..."
            className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-dukka-primary"
          />
          <motion.button
            onClick={handleSendMessage}
            className="p-2 text-dukka-primary hover:bg-gray-100 rounded-full transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!inputMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-2 text-gray-400 rounded-full cursor-not-allowed opacity-50"
            whileHover={{ scale: 1 }}
          >
            <Mic className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;