'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mic } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { waitlistChat } from './waitlistChatData'
import { LoadingDots } from './LoadingDots'
import type { Message, UserData, WaitlistChatProps } from '@/types/waitlist'

export default function WaitlistChat({ onClose }: WaitlistChatProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      type: 'assistant',
      content: "👋 Bonjour ! Je suis l'Assistant Dukka. Nous sommes ravis de votre intérêt pour notre solution e-commerce conversationnelle pour l'Afrique. Je vais vous guider pour rejoindre notre liste d'attente. Pouvons-nous commencer ?"
    },
    {
      type: 'user-choices',
      content: ["Oui, allons-y", "Je veux en savoir plus"]
    }
  ])
  const [isTyping, setIsTyping] = React.useState(false)
  const [inputMessage, setInputMessage] = React.useState('')
  const [userData, setUserData] = React.useState<UserData>({
    full_name: '',
    email: '',
    phone: '',
    business_type: ''
  })
  const [currentStep, setCurrentStep] = React.useState(0)
  const chatRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = (): void => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }

  const addMessage = async (message: Message | Message[], delay = 1000): Promise<void> => {
    try {
      setIsTyping(true)
      await new Promise(resolve => setTimeout(resolve, delay))
      
      setMessages(prev => 
        Array.isArray(message) 
          ? [...prev, ...message] 
          : [...prev, message]
      )
      
      scrollToBottom()
    } catch (error) {
      console.error('Erreur lors de l\'ajout du message:', error)
    } finally {
      setIsTyping(false)
    }
  }

  const handleUserChoice = async (choice: string): Promise<void> => {
    await addMessage({
      type: 'user',
      content: choice
    }, 0)

    try {
      switch (choice) {
        case "Je veux en savoir plus":
          await addMessage(waitlistChat.moreInfo)
          break
          
        case "Oui, allons-y":
        case "Oui, je m'inscris":
        case "Je vais m'inscrire":
          setCurrentStep(prevStep => prevStep + 1)
          await addMessage({
            type: 'assistant',
            content: waitlistChat.questions[0].question
          })
          break
          
        case "Peut-être plus tard":
        case "Non merci":
          await addMessage(waitlistChat.exitAttempt.persuasion)
          break
          
        case "Oui, je suis sûr(e)":
          onClose()
          break
          
        default:
          if (choice && currentStep === 2) { 
            setUserData(prev => ({ ...prev, business_type: choice }))
            await handleNextStep()
          }
      }
    } catch (error) {
      console.error('Erreur lors du traitement du choix:', error)
      await addMessage({
        type: 'assistant',
        content: "Une erreur s'est produite. Pouvons-nous réessayer ?"
      })
    }
  }

  const handleUnexpectedMessage = async (): Promise<void> => {
    await addMessage({
      type: 'assistant',
      content: "Désolé ! Mon seul rôle est de vous aider à rejoindre notre liste d'attente. Je ne peux pas répondre à d'autres questions pour le moment. Souhaitez-vous poursuivre votre inscription ?"
    })
    await addMessage({
      type: 'user-choices',
      content: ["Oui, continuons", "Non merci"]
    })
  }

  const handleTextInput = async (text: string): Promise<void> => {
    if (!text.trim()) return

    await addMessage({
      type: 'user',
      content: text
    }, 0)

    try {
      if (!currentStep) {
        await handleUnexpectedMessage()
        setInputMessage('')
        return
      }

      const question = waitlistChat.questions[currentStep - 1]
      
      switch (question.id) {
        case 'full_name':
          setUserData(prev => ({ ...prev, full_name: text }))
          break
        case 'email':
          if (!text.includes('@')) {
            await addMessage({
              type: 'assistant',
              content: "Cette adresse email ne semble pas valide. Pouvez-vous la vérifier ?"
            })
            return
          }
          setUserData(prev => ({ ...prev, email: text }))
          break
        case 'phone':
          const updatedData = { ...userData, phone: text }
          setUserData(updatedData)
          break
      }

      await handleNextStep()
    } catch (error) {
      console.error('Erreur lors du traitement de la réponse:', error)
      await handleUnexpectedMessage()
    } finally {
      setInputMessage('')
    }
  }

  const handleNextStep = async (): Promise<void> => {
    try {
      if (currentStep >= waitlistChat.questions.length) {
        console.log('Debug - Final user data before save:', userData)
        
        const finalUserData = {
          ...userData,
          created_at: new Date().toISOString()
        }
  
        const { error } = await supabase
          .from('waitlist')
          .insert([finalUserData])
  
        if (error) {
          console.error('Waitlist save error:', error)
          throw error
        }
  
        await addMessage({
          type: 'assistant',
          content: waitlistChat.success.message({ name: userData.full_name })
        })
        await addMessage({
          type: 'user-choices',
          content: ['Fermer']
        })
  
        // Ajoutez un délai avant de fermer automatiquement
        setTimeout(() => {
          onClose()
        }, 3000)
        return
      }

      const nextQuestion = waitlistChat.questions[currentStep]
      const questionText = typeof nextQuestion.question === 'function' 
        ? nextQuestion.question({ name: userData.full_name })
        : nextQuestion.question

      await addMessage({
        type: 'assistant',
        content: questionText
      })

      if (nextQuestion.choices) {
        await addMessage({
          type: 'user-choices',
          content: nextQuestion.choices
        })
      }

      setCurrentStep(prevStep => prevStep + 1)
    } catch (error) {
      console.error('Erreur dans handleNextStep:', error)
      await addMessage({
        type: 'assistant',
        content: "Une erreur s'est produite lors de l'enregistrement. Veuillez vérifier vos informations ou réessayer plus tard."
      })
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-labelledby="waitlist-dialog-title"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="bg-white py-3 px-4 flex items-center justify-between border-b">
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-gray-600" id="waitlist-dialog-title">
              L'Assitant Dukka est en ligne
            </span>
          </div>
          <button 
            onClick={() => handleUserChoice("Non merci")}
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div 
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F0F2F5]"
        >
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'user-choices' ? (
                <div className="flex flex-wrap gap-2 w-full" role="group">
                  {Array.isArray(message.content) && message.content.map((choice) => (
                    <motion.button
                      key={choice}
                      onClick={() => handleUserChoice(choice)}
                      className="bg-white hover:bg-gray-50 text-dukka-primary px-4 py-2.5 rounded-full transition-colors text-sm border border-gray-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {choice}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    message.type === 'user' 
                      ? 'bg-dukka-primary text-white ml-auto'
                      : 'bg-white'
                  }`}
                >
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-gray-800">Dukka</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">Assistant</span>
                    </div>
                  )}
                  {typeof message.content === 'string' && message.content.split('\n').map((line, i) => (
                    <p key={i} className={`${i > 0 ? 'mt-2' : ''} ${line.startsWith('•') ? 'pl-4' : ''}`}>
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && <LoadingDots />}
        </div>

        {!messages.some(m => m.content === waitlistChat.success.action) && (
          <div className="px-4 py-3 bg-white border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputMessage.trim()) {
                    handleTextInput(inputMessage)
                  }
                }}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-dukka-primary"
              />
              <motion.button
                onClick={() => {
                  if (inputMessage.trim()) {
                    handleTextInput(inputMessage)
                  }
                }}
                className="p-2 text-dukka-primary hover:bg-gray-100 rounded-full transition-colors"
                whileTap={{ scale: 0.95 }}
                disabled={!inputMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </motion.button>
              <button
                className="p-2 text-gray-400 rounded-full cursor-not-allowed opacity-50"
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}