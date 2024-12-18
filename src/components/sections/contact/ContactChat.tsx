'use client'

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import ChatMessage from '@/components/sections/demo/messages/ChatMessage';
import { LoadingDots } from '@/components/waitlist/LoadingDots';
import { 
  INITIAL_MESSAGES, 
  PERSONALIZED_PRESENTATIONS, 
  AVAILABLE_POSITIONS 
} from './data/contact_data';

type VisitorType = 'e-commerçant(e)' | 'commerçant(e)' | 'marque' | 'média' | 'équipe' | 'autre';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  visitorType: string;
  attachments?: string[];
}

// Fonction pour gérer l'upload des fichiers
async function handleFileUpload(file: File) {
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Le fichier est trop volumineux. La taille maximale est de 2Mo.");
  }

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/msword'
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Type de fichier non supporté. Formats acceptés : PDF, images, Word, PowerPoint");
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `contact_uploads/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('contact_uploads')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('contact_uploads')
    .getPublicUrl(filePath);

  return publicUrl;
}

async function saveContactMessage(formData: ContactFormData) {
  try {
    console.log('Tentative de sauvegarde avec les données :', formData);

    const insertData = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone || '', 
      subject: formData.subject,
      message: formData.message,
      visitor_type: formData.visitorType,
      attachments: formData.attachments || null,
      created_at: new Date().toISOString(),
      status: 'new' 
    };

    console.log('Données formatées pour insert :', insertData);

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([insertData])
      .select(); 

    if (error) {
      console.error('Détails de l\'erreur Supabase:', error);
      throw new Error(`Erreur Supabase: ${error.message}`);
    }

    console.log('Données sauvegardées avec succès:', data);
    return data;

  } catch (error) {
    console.error('Erreur complète:', error);
    throw error;
  }
}

async function saveToWaitlist(formData: ContactFormData) {
  const { data, error } = await supabase
    .from('waitlist')
    .insert([{
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone || '',
      business_type: formData.visitorType,
      created_at: new Date().toISOString() 
    }]);

  if (error) {
    console.error('Waitlist save error:', error);
    throw error;
  }
  return data;
}

export function ContactChat() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    visitorType: '',
    attachments: []
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCollectingInfo, setIsCollectingInfo] = useState(false);
  const [infoStep, setInfoStep] = useState('');
  const [isWaitlist, setIsWaitlist] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestion des messages
  const addMessage = async (content: string | Message, isUser = true) => {
    if (typeof content === 'string') {
      setMessages(prev => [...prev, {
        type: isUser ? 'user' : 'assistant',
        content
      }]);
    } else {
      setMessages(prev => [...prev, content]);
    }

    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  // Réponses du bot avec délais
  const addBotResponse = async (responses: string[], choices?: string[]) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    for (const response of responses) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await addMessage(response, false);
    }

    if (choices) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setMessages(prev => [...prev, {
        type: 'user-choices',
        choices
      }]);
    }
    
    setIsTyping(false);
  };

  // Gestion des fichiers
  const handleFileAdd = async (file: File) => {
    try {
      setUploadingFile(true);
      const fileUrl = await handleFileUpload(file);
      setFormData(prev => ({
        ...prev,
        attachments: [...(prev.attachments || []), fileUrl]
      }));
      await addMessage(`Le fichier '${file.name}' a bien été ajouté.`, false);
    } catch (error) {
      console.error('Erreur upload:', error); 
      await addBotResponse(["Une erreur est survenue lors de l'upload du fichier. Veuillez réessayer."]);
    } finally {
      setUploadingFile(false);
    }
  };

  // Gestion des profils
  const handleProfileSelection = async (profile: string) => {
    let visitorType: VisitorType;
    
    switch(profile) {
      case "Je suis e-commerçant(e)":
        visitorType = "e-commerçant(e)";
        break;
      case "Je suis commerçant(e)":
        visitorType = "commerçant(e)";
        break;
      case "Je représente une marque":
        visitorType = "marque";
        break;
      case "Je suis journaliste/média":
        visitorType = "média";
        break;
      case "Je veux rejoindre Dukka":
        visitorType = "équipe";
        break;
      default:
        visitorType = "autre";
    }
  
    setFormData(prev => ({ ...prev, visitorType }));
    await addMessage(profile);
  
    if (visitorType === "équipe") {
      await addBotResponse(
        ["C'est bien noté ! Comment puis-je vous aider ?"],
        [
          "Je veux en savoir plus sur Dukka",
          "Je veux voir les postes disponibles",
          "Je veux contacter l'équipe"
        ]
      );
    } else {
      await addBotResponse(
        [PERSONALIZED_PRESENTATIONS[visitorType], "Que puis-je faire d'autre pour vous ?"],
        ["Je veux en savoir plus sur Dukka", "Je veux contacter l'équipe"]
      );
    }
  };

  // Gestion du profil équipe
  const handleTeamChoices = async (choice: string) => {
    switch(choice) {
      case "Je veux en savoir plus sur Dukka":
        await addMessage(choice);
        if (formData.visitorType) {
        await addBotResponse(
          [PERSONALIZED_PRESENTATIONS[formData.visitorType as VisitorType], "Que puis-je faire d'autre pour vous ?"],
          ["Je veux contacter l'équipe", "Je veux rejoindre la liste d'attente"]
        );
      } else {
        await addBotResponse(
      [PERSONALIZED_PRESENTATIONS["autre"], "Que puis-je faire d'autre pour vous ?"],
      ["Je veux contacter l'équipe", "Je veux rejoindre la liste d'attente"]
    );
  }
  break;

      case "Je veux voir les postes disponibles":
        await addMessage(choice);
        await addBotResponse(
          [AVAILABLE_POSITIONS],
          ["Je veux en savoir plus sur Dukka", "Je veux contacter l'équipe"]
        );
        break;

      case "Je veux contacter l'équipe":
        setIsCollectingInfo(true);
        setInfoStep('name');
        await addBotResponse(["Pour vous mettre en relation avec notre équipe, j'aurais besoin de quelques informations. Quel est votre nom complet ?"]);
        break;
    }
  };

  // Gestion des informations collectées
  const handleInfoCollection = async (text: string) => {
    await addMessage(text);
  
    switch (infoStep) {
      case 'name':
        setFormData(prev => ({ ...prev, fullName: text }));
        setInfoStep('email');
        await addBotResponse([`Merci ${text.split(' ')[0]} ! Quelle est votre adresse email ?`]);
        break;
  
      case 'email':
        if (!text.includes('@')) {
          await addBotResponse(["Cette adresse email ne semble pas valide. Pourriez-vous vérifier ?"]);
          return;
        }
        setFormData(prev => ({ ...prev, email: text }));
        setInfoStep('phone');
        await addBotResponse(["Parfait ! Quel est votre numéro de téléphone ?"]);
        break;
  
      case 'phone':
        const updatedFormData = { ...formData, phone: text };
        setFormData(updatedFormData);
        
        if (isWaitlist) {
          try {
            await saveToWaitlist(updatedFormData); 
            await addBotResponse([
              "🎉 Félicitations ! Vous êtes maintenant sur notre liste d'attente.",
              "Nous vous contacterons dès que Dukka sera disponible afin que vous puissiez tester la solution avant tout le monde.",
              "À très bientôt !"
            ]);
            setIsCollectingInfo(false);
            setInfoStep('');
          } catch (error) {
            console.error('Waitlist error:', error);
            await addBotResponse(["Désolé, une erreur est survenue. Pouvez-vous réessayer plus tard ?"]);
          }
        } else {
          setInfoStep('subject');
          await addBotResponse(["Quel est le sujet de votre message ?"]);
        }
        break;
  
      case 'subject':
        setFormData(prev => ({ ...prev, subject: text }));
        setInfoStep('message');
        await addBotResponse(["Maintenant, vous pouvez écrire votre message. N'hésitez pas à être aussi détaillé que possible ! Vous pouvez ajouter un fichier de 2 Mo max en cliquant sur le bouton 'upload' ci-dessous."]);
        break;
  
        case 'message':
          try {
            const updatedFormData = { 
              ...formData, 
              message: text,
              status: 'new' 
            };
    
            await saveContactMessage(updatedFormData);
    
            await addBotResponse([
              "✅ Votre message a été envoyé avec succès !",
              "Notre équipe vous répondra dans les plus brefs délais.",
              "Souhaitez-vous autre chose ?"
            ], ["Je veux rejoindre la liste d'attente", "Non, merci !"]);
    
            setIsCollectingInfo(false);
            setInfoStep('');
          } catch (error) {
            console.error('Erreur détaillée:', error); // Pour le debug uniquement
            await addBotResponse([
              "Désolé, une erreur est survenue lors de l'envoi du message.",
              "Veuillez réessayer plus tard."
            ]);
          }
          break;
    }
  };

  // Gestion des choix utilisateur
  const handleNextStep = async (userResponse: string) => {
    if (isCollectingInfo) {
      await handleInfoCollection(userResponse);
      return;
    }

    if (INITIAL_MESSAGES[1].choices.includes(userResponse)) {
      await handleProfileSelection(userResponse);
      return;
    }

    // Gestion spécifique pour le profil équipe
    if (formData.visitorType === "équipe" && [
      "Je veux en savoir plus sur Dukka",
      "Je veux voir les postes disponibles",
      "Je veux contacter l'équipe"
    ].includes(userResponse)) {
      await handleTeamChoices(userResponse);
      return;
    }

    await addMessage(userResponse);

    switch (userResponse) {
      case "Je veux en savoir plus sur Dukka":
        await addBotResponse(
          [PERSONALIZED_PRESENTATIONS[formData.visitorType], "Que puis-je faire d'autre pour vous ?"],
          ["Je veux contacter l'équipe", "Je veux rejoindre la liste d'attente"]
        );
        break;

      case "Je veux contacter l'équipe":
        setIsCollectingInfo(true);
        setInfoStep('name');
        await addBotResponse(["Pour vous mettre en relation avec notre équipe, j'aurais besoin de quelques informations. Quel est votre nom complet ?"]);
        break;

      case "Je veux rejoindre la liste d'attente":
        setIsCollectingInfo(true);
        setIsWaitlist(true);
        setInfoStep('name');
        await addBotResponse(["Excellent ! Pour vous ajouter à notre liste d'attente, j'ai besoin de quelques informations. Quel est votre nom complet ?"]);
        break;

      case "Non, merci !":
        await addBotResponse(["Au revoir et à bientôt !"]);
        break;

      default:
        await addBotResponse([
          "Je suis programmé pour fournir des informations sur Dukka et faciliter le contact avec notre équipe. Si vous avez des questions spécifiques, je peux transmettre votre message à l'équipe qui vous répondra rapidement."
        ], ["Je veux contacter l'équipe", "Je veux rejoindre la liste d'attente"]);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        e.preventDefault();
        const cursorPosition = e.currentTarget.selectionStart;
        const textBeforeCursor = inputMessage.substring(0, cursorPosition);
        const textAfterCursor = inputMessage.substring(cursorPosition);
        setInputMessage(textBeforeCursor + '\n' + textAfterCursor);

        setTimeout(() => {
          if (e.currentTarget) {
            e.currentTarget.style.height = 'auto';
            e.currentTarget.style.height = Math.min(e.currentTarget.scrollHeight, 120) + 'px';
          }
        }, 0);
      } else {
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    handleNextStep(inputMessage.trim());
    setInputMessage('');
  };

  // Rendu du composant
  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-white py-3 px-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm text-gray-600">
            L'Assistant Dukka est en ligne
          </span>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={chatRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F0F2F5]"
      >
        {messages.map((message, index) => {
          if (message.type === 'user-choices') {
            return (
              <div
                key={`choices-${index}`}
                className="flex flex-wrap gap-2 w-full"
              >
                {message.choices.map((choice, choiceIndex) => (
                  <motion.button
                    key={`${choice}-${choiceIndex}`}
                    onClick={() => handleNextStep(choice)}
                    className="bg-white hover:bg-gray-50 text-dukka-primary px-4 py-2.5 rounded-full transition-colors text-sm border border-gray-200"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {choice}
                  </motion.button>
                ))}
              </div>
            );
          }

          return (
            <motion.div
              key={`message-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ChatMessage
                message={message}
                isBot={message.type === 'assistant'}
                scenario={{ chatbotName: 'Dukka', id: 'contact' }}
                animate={false}
                showTimestamp={true}
              />
            </motion.div>
          );
        })}

        {isTyping && <LoadingDots />}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-white border-t">
        <div className="flex items-end gap-2">
          {/* Zone de texte principal */}
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => {
                setInputMessage(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={handleKeyDown}
              placeholder="Tapez votre message..."
              className="w-full px-4 py-2 bg-gray-100 rounded-2xl pr-20 resize-none min-h-[44px] max-h-[120px] focus:outline-none focus:ring-2 focus:ring-dukka-primary"
              style={{ height: '44px' }}
            />
            
            {/* Boutons d'actions */}
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              {/* Bouton d'upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileAdd(file);
                }}
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
              />
              <motion.button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors"
                whileTap={{ scale: 0.95 }}
                disabled={uploadingFile}
              >
                <Upload className="w-5 h-5" />
              </motion.button>

              {/* Bouton d'envoi */}
              <motion.button
                onClick={handleSendMessage}
                className="p-2 text-dukka-primary hover:bg-gray-200 rounded-full transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactChat;