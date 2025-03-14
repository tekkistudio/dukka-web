// src/components/sections/demo/ChatInterface.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Send, Mic } from 'lucide-react';
import type { Scenario } from './data';
import ChatMessage from './messages/ChatMessage';
import ChoiceButtons from './interactions/ChoiceButtons';
import { 
  getAiResponse, 
  identifyOptions, 
  formatConversationHistory,
  getSuggestedResponses,
  type ChatMessage as AiChatMessage 
} from '@/services/aiService';
import { isBrowser } from '@/utils/browser';

interface ChatInterfaceProps {
  messages: any[];
  isTyping: boolean;
  showCheckout: boolean;
  onUserChoice: (choice: string, isTextInput?: boolean) => void;
  onAiResponse: (response: string) => void;
  chatRef: React.RefObject<HTMLDivElement>;
  scenario: Scenario;
  totalAmount: number;
  inCheckoutFlow: boolean;
}

export function ChatInterface({ 
  messages, 
  isTyping, 
  showCheckout, 
  onUserChoice,
  onAiResponse,
  chatRef,
  scenario,
  totalAmount,
  inCheckoutFlow
}: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [mounted, setMounted] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [lastActivity, setLastActivity] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isProcessingAi, setIsProcessingAi] = useState(false);
  const [aiEnabled, setAiEnabled] = useState(false);

  // Détecter si l'IA est activée en vérifiant si les clés API sont présentes
  useEffect(() => {
    const checkAiAvailability = async () => {
      if (!mounted) return;
      
      try {
        const response = await fetch('/api/ai/status');
        if (response.ok) {
          const data = await response.json();
          setAiEnabled(data.available);
        }
      } catch (error) {
        console.error('Failed to check AI status:', error);
        setAiEnabled(false);
      }
    };
    
    if (mounted) {
      checkAiAvailability();
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (inputMessage && !userTyping) {
      setUserTyping(true);
    } else if (!inputMessage && userTyping) {
      setUserTyping(false);
    }
    setLastActivity(Date.now());
    
    // Mise à jour des suggestions basées sur l'input
    if (inputMessage.length > 2) {
      const newSuggestions = identifyOptions(inputMessage, scenario.id);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputMessage, userTyping, scenario.id, mounted]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessingAi) return;
    
    // Récupérer le message avant de vider l'input
    const messageToSend = inputMessage.trim();
    
    // Envoyer le message de l'utilisateur (apparaîtra comme message "user")
    onUserChoice(messageToSend, true);
    
    // Effacer l'input et les suggestions
    setInputMessage("");
    setSuggestions([]);
    
    // Si l'IA est activée et nous ne sommes pas dans le flow d'achat, demander une réponse IA
    // Sinon, laisser le composant parent gérer la réponse (pour la collecte d'informations)
    if (aiEnabled && !inCheckoutFlow) {
      await requestAiResponse(messageToSend);
    }
  };

  // Fonction pour obtenir une réponse de l'IA
  const requestAiResponse = async (message: string) => {
    setIsProcessingAi(true);
    
    try {
      // Formatage de l'historique de conversation pour l'IA
      const conversationHistory = formatConversationHistory(messages);
      
      // Options pour l'IA
      const aiOptions = {
        scenario: scenario.context,
        productName: scenario.product.name,
        chatbotName: scenario.chatbotName,
        chatbotGender: scenario.genre
      };
      
      // Appel à l'API IA
      const response = await getAiResponse(message, conversationHistory, aiOptions);
      
      // Simuler un délai de "frappe" pour rendre l'expérience plus réaliste
      setTimeout(() => {
        // Utiliser le callback pour ajouter la réponse IA
        onAiResponse(response);
        
        // Suggérer des options de réponse basées sur la réponse de l'IA
        const suggestedResponses = getSuggestedResponses(response, scenario.id);
        
        // Ajouter des suggestions comme boutons de choix
        if (suggestedResponses.length > 0) {
          // Pas d'implémentation directe ici - la réponse est gérée par le composant parent
        }
        
        setIsProcessingAi(false);
      }, 1000);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setIsProcessingAi(false);
    }
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
        
        {/* Badge IA si activée */}
        {aiEnabled && (
          <div className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
            Vendeuse IA Active
          </div>
        )}
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
                src="/images/payments/wave_2.svg"
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

      {/* Zone de saisie - reste active pendant le checkout flow mais indique le contexte */}
      <div className="px-4 py-3 bg-white border-t">
        {/* Suggestions - n'apparaissent pas pendant le checkout flow */}
        <AnimatePresence>
          {suggestions.length > 0 && !inCheckoutFlow && (
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
            placeholder={inCheckoutFlow ? "Tapez votre réponse ici..." : "Tapez votre message..."}
            className={`flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-dukka-primary ${
              isProcessingAi ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isProcessingAi} // Champ input toujours actif pendant la collecte
          />
          <motion.button
            onClick={handleSendMessage}
            className={`p-2 rounded-full transition-colors ${
              isProcessingAi || !inputMessage.trim()
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-dukka-primary hover:bg-gray-100'
            }`}
            whileHover={{ scale: (!isProcessingAi && inputMessage.trim()) ? 1.05 : 1 }}
            whileTap={{ scale: (!isProcessingAi && inputMessage.trim()) ? 0.95 : 1 }}
            disabled={!inputMessage.trim() || isProcessingAi}
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