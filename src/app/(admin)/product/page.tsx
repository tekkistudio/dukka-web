// src/app/(admin)/product/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Star, Send, Mic, MessageCircle, ArrowLeft, ChevronLeft, ChevronRight, X, Eye, ShoppingBag, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const ProductImageGallery = ({ images, currentImage, setCurrentImage }) => {
    const [showZoom, setShowZoom] = useState(false);
    const [[page, direction], setPage] = useState([0, 0]);
  
    const imageIndex = wrap(0, images.length, page);
  
    const paginate = (newDirection) => {
      setPage([page + newDirection, newDirection]);
      setCurrentImage(wrap(0, images.length, page + newDirection));
    };
  
    const variants = {
      enter: (direction) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 1
      }),
      center: {
        zIndex: 1,
        x: 0,
        opacity: 1
      },
      exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 1
      })
    };
  
    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
      return Math.abs(offset) * velocity;
    };
  
    return (
      <div className="space-y-4">
        {/* Image principale avec navigation */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="absolute inset-0">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
  
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 cursor-zoom-in"
                onClick={() => setShowZoom(true)}
                style={{ touchAction: "pan-y" }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={images[imageIndex]}
                    alt={`Le Jeu Pour Les Couples - Vue ${imageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
  
          {/* Flèches de navigation */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
  
          {/* Indicateur de numéro d'image */}
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
            {currentImage + 1}/{images.length}
          </div>
        </div>
  
        {/* Miniatures */}
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              onClick={() => {
                const direction = idx > currentImage ? 1 : -1;
                setPage([idx, direction]);
                setCurrentImage(idx);
              }}
              className={`aspect-square rounded-lg overflow-hidden cursor-pointer ${
                currentImage === idx ? 'ring-2 ring-[#FF7E93]' : ''
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={img}
                alt={`Miniature ${idx + 1}`}
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            </motion.div>
          ))}
        </div>
  
        {/* Statistiques */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>47 personnes consultent ce jeu</span>
          </div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>3 562 ventes</span>
          </div>
        </div>
  
        {/* Modal de zoom */}
        <AnimatePresence>
          {showZoom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
              onClick={() => setShowZoom(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative w-[90vw] h-[90vh]"
              >
                <Image
                  src={images[currentImage]}
                  alt={`Le Jeu Pour Les Couples - Vue ${currentImage + 1}`}
                  fill
                  className="object-contain"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowZoom(false);
                  }}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  
  // Fonction utilitaire pour gérer le wrap des indices
  const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };
  
const ProductPage = () => {
  // États de base
  const [currentImage, setCurrentImage] = useState(0);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const chatRef = useRef(null);
  const [formStep, setFormStep] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [isRoseTyping, setIsRoseTyping] = useState(false);

  // États pour la version mobile
  const [isChatFullscreen, setIsChatFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // État des données de commande
  const [orderData, setOrderData] = useState({
    quantity: 0,
    additionalProducts: [] as string[],
    contactInfo: '',
    firstName: '',
    lastName: '',
    city: '',
    address: '',
    phone: '',
    paymentMethod: '',
    orderDetails: ''
  });

  // Composant WaveButton
  const WaveButton = ({ total }) => {
    return (
      <motion.div
        className="flex justify-center my-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <a
          href={`https://pay.wave.com/m/M_OfAgT8X_IT6P/c/sn/?amount=${total}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1BA7FF] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#1697e6] transition-colors"
        >
          <Image
            src="/images/payments/wave_2.svg"
            alt="Wave"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span>
            Payer {total.toLocaleString()} FCFA avec Wave
          </span>
        </a>
      </motion.div>
    );
  };

  // Messages initiaux
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Bonjour 👋 Je suis Rose, votre Assistante d'Achat. Je vois que vous vous intéressez à notre jeu pour les couples non mariés. C'est un excellent choix ! Comment puis-je vous aider ?"
    },
    {
      type: 'user-choices',
      choices: [
        "Je veux en savoir plus",
        "Je veux l'acheter maintenant",
        "Je veux voir les témoignages",
        "Comment y jouer ?"
      ]
    }
  ]);

  const formatMessageContent = (content) => {
    if (typeof content !== 'string') return content;
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Images du produit
  const images = [
    '/images/vosc/vosc_1.webp',
    '/images/vosc/vosc_2.webp',
    '/images/vosc/vosc_3.webp',
    '/images/vosc/vosc_4.webp'
  ];

  // Détection du mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  // Calcul du total
  const calculateTotal = () => {
    let total = 14000; // Prix de base
    const deliveryCost = orderData.city?.toLowerCase() === 'dakar' ? 0 : 3000;
    
    if (orderData.quantity > 1) {
      if (orderData.quantity >= 4) {
        total = total * orderData.quantity * 0.8; // -20%
      } else if (orderData.quantity === 3) {
        total = 35700; // Pack Trio (prix fixe)
      } else if (orderData.quantity === 2) {
        total = 25200; // Pack Duo (prix fixe)
      }
    }

    if (orderData.additionalProducts?.length > 0) {
      orderData.additionalProducts.forEach(product => {
        if (product.includes('Famille') || product.includes('Amis')) {
          total += 14000;
        } else if (product.includes('Couples')) {
          total += 14000 * 0.9; // -10% sur le jeu Couples
        }
      });
    }

    return Math.round(total + deliveryCost);
  };

  // Gestion des réponses du bot
  const addBotResponse = async (responses: any[], delay = 1000) => {
    setIsTyping(true);
    
    for (const response of responses) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setMessages(prev => [...prev, response]);

      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }

    setIsTyping(false);
  };

  // Gestion des choix utilisateur
  const handleUserChoice = async (choice: string) => {
    const userMessage = { type: 'user', content: choice };
    setMessages(prev => [...prev, userMessage]);

    switch(formStep) {
      case 'contact-info':
        const names = choice.split(' ');
        setOrderData(prev => ({
          ...prev,
          firstName: names[0],
          lastName: names.slice(1).join(' '),
          contactInfo: choice
        }));
        setFormStep('city');
        await addBotResponse([{
          type: 'assistant',
          content: `Merci ${names[0]} 🙂 Dans quelle ville habitez-vous ?`
        }]);
        break;

      case 'city':
        setOrderData(prev => ({ ...prev, city: choice }));
        setFormStep('address');
        await addBotResponse([{
          type: 'assistant',
          content: `Parfait ! Quelle est votre adresse exacte à ${choice} ?`
        }]);
        break;

      case 'address':
        setOrderData(prev => ({ ...prev, address: choice }));
        setFormStep('phone');
        await addBotResponse([{
          type: 'assistant',
          content: "Super ! Quel est votre numéro de téléphone 📱 pour la livraison ?"
        }]);
        break;

      case 'phone':
        setOrderData(prev => ({ ...prev, phone: choice }));
        setFormStep('payment');
        const total = calculateTotal();
        await addBotResponse([{
          type: 'assistant',
          content: `<strong>📋 Récapitulatif de votre commande :</strong>

${orderData.orderDetails}

<strong>📍 Informations de livraison :</strong>
• Nom complet : <strong>${orderData.firstName} ${orderData.lastName}</strong>
• Ville : <strong>${orderData.city}</strong>
• Adresse de livraison : <strong>${orderData.address}</strong>
• Téléphone : <strong>${choice}</strong>
• Frais de livraison : <strong>${orderData.city.toLowerCase() === 'dakar' ? '0' : '3 000'} FCFA</strong>

💰 Total à payer : <strong>${total.toLocaleString()} FCFA</strong>

Par quel moyen souhaitez-vous payer ?`,
        }, {
          type: 'user-choices',
          choices: ["Wave", "Orange Money", "Paiement à la livraison"]
        }]);
        break;

        case 'payment':
            setOrderData(prev => ({ ...prev, paymentMethod: choice }));
            if (choice === 'Wave' || choice === 'Orange Money') {
            setShowCheckout(true);
            await addBotResponse([{
            type: 'assistant',
            content: `Parfait ! Cliquez sur le bouton ci-dessous pour procéder au paiement sécurisé 🔒 avec ${choice}. Une fois le paiement effectué, vous recevrez une confirmation par SMS et WhatsApp.`
        }, {
            type: choice === 'Wave' ? 'wave-button' : 'om-button'
        }]);
        } else {
          await addBotResponse([{
            type: 'assistant',
            content: `Vous avez choisi le paiement ${choice === 'Paiement à la livraison' ? 'à la livraison' : 'par ' + choice}. 

Notre livreur vous contactera dans les plus brefs délais pour organiser la livraison.

⏱️ Délais de livraison :
• Dakar : 24h maximum
• Autres villes : 72h maximum

Merci de votre confiance ! 🙏`
          }]);
        }
        setFormStep('');
        break;

      default:
        // Gestion des choix généraux
        switch(choice) {
          case "Je veux en savoir plus":
            await addBotResponse([
              {
                type: 'assistant',
                content: `Le jeu contient 150 questions soigneusement élaborées pour les couples, réparties en 3 catégories :

💝 Connexion Émotionnelle 
💫 Projets & Rêves 
💑 Intimité & Complicité 

Chaque carte pose une question qui vous aide à mieux vous connaître et à renforcer votre lien. Plus de 3000 couples ont déjà adopté le jeu !`
              },
              {
                type: 'user-choices',
                choices: [
                  "Voir un exemple de questions",
                  "Voir les packs disponibles",
                  "Je veux l'acheter maintenant"
                ]
              }
            ]);
            break;

          case "Voir un exemple de questions":
            await addBotResponse([
              {
                type: 'assistant',
                content: `Voici quelques exemples de questions que vous découvrirez dans le jeu :

💫 "Comment aimerais-tu que nous communiquions lorsque nous sommes en désaccord ?"
💝 "Quelle est la chose que tu aimerais que je comprenne mieux sur toi ?"
💑 "Y a-t-il des différences dans nos valeurs que tu penses que nous devrions aborder ?"

Chaque question est conçue pour créer des moments de partage authentiques. 97% des couples qui jouent régulièrement notent une amélioration significative de leur relation !`
              },
              {
                type: 'user-choices',
                choices: [
                  "Voir les packs disponibles",
                  "Je veux l'acheter maintenant",
                  "Je veux voir les témoignages"
                ]
              }
            ]);
            break;

            case "Je veux voir les témoignages":
                await addBotResponse([
                  {
                    type: 'assistant',
                    content: `Voici ce que disent les couples qui utilisent le jeu :
    
    ⭐️ Aïssatou (Dakar) : "On joue depuis deux semaines et chaque partie est une nouvelle aventure. Ce jeu nous a vraiment aidés à ouvrir le dialogue sur des sujets qu'on évitait."
    
    ⭐️ Fadel (Abidjan) : "Nous sommes ensemble depuis 10 ans, et ce jeu nous a fait découvrir des choses que nous ignorions encore l'un de l'autre. Incroyable !"
    
    ⭐️ Oulimata (Nantes) : "J'ai hésité avant d'acheter, mais aucune déception. Ce jeu vaut largement son prix, pour les bons moments qu'il nous permet de passer."`
                  },
                  {
                    type: 'user-choices',
                    choices: [
                      "Voir les packs disponibles",
                      "Je veux l'acheter maintenant",
                      "Je veux en savoir plus"
                    ]
                  }
                ]);
                break;
    
              case "Voir les packs disponibles":
                await addBotResponse([
                  {
                    type: 'assistant',
                    content: `Nous avons plusieurs offres adaptées à vos besoins :
    
    🎁 Pack Solo (1 jeu) : 14 000 FCFA
    🎁 Pack Duo (-10%) : 25 200 FCFA
    🎁 Pack Trio (-15%) : 35 700 FCFA
    🎁 Pack Comité (-20%) : à partir de 4 jeux
    
    Bonus exclusif : -10% sur le jeu 'Couples non mariés' en complément !
    
    La livraison est gratuite à Dakar. Pour les autres villes du Sénégal 🇸🇳 et Abidjan 🇨🇮, elle est à 3000 FCFA.`
                  },
                  {
                    type: 'user-choices',
                    choices: [
                      "Commander 1 jeu",
                      "Commander plusieurs jeux",
                      "Je veux en savoir plus"
                    ]
                  }
                ]);
                break;
    
              case "Je veux l'acheter maintenant":
              case "Commander 1 jeu":
                setOrderData(prev => ({
                  ...prev,
                  quantity: 1,
                  orderDetails: "• 1 exemplaire du Jeu Pour Les Couples"
                }));
                setFormStep('contact-info');
                await addBotResponse([{
                  type: 'assistant',
                  content: "Entendu ! Pour finaliser votre achat, j'ai besoin de quelques infos. Tout d'abord, quel est votre nom complet ?"
                }]);
                break;
    
              case "Commander plusieurs jeux":
                await addBotResponse([
                  {
                    type: 'assistant',
                    content: "Excellent choix ! Combien d'exemplaires souhaitez-vous commander ?"
                  },
                  {
                    type: 'user-choices',
                    choices: ["2 exemplaires", "3 exemplaires", "4 exemplaires ou plus"]
                  }
                ]);
                break;
    
              case "Comment y jouer ?":
                await addBotResponse([
                  {
                    type: 'assistant',
                    content: `Le principe est simple et fun ! 🎮
    
    1️⃣ Installez-vous confortablement avec votre partenaire
    2️⃣ Tirez une carte à tour de rôle
    3️⃣ Répondez chacun honnêtement à la question
    4️⃣ Échangez sur vos réponses
    
    Pas de règles compliquées, pas de gagnant ni de perdant - juste des moments authentiques de connexion ! 💑
    
    Le jeu est parfait pour :
    • Vos soirées en couple
    • Un cadeau de mariage unique
    • Raviver la flamme
    • Mieux comprendre votre partenaire`
                  },
                  {
                    type: 'user-choices',
                    choices: [
                      "Voir un exemple de questions",
                      "Voir les packs disponibles",
                      "Je veux l'acheter maintenant"
                    ]
                  }
                ]);
                break;
    
              default:
                if (choice.includes('exemplaires')) {
                  const quantity = parseInt(choice);
                  const discount = quantity >= 4 ? 20 : quantity === 3 ? 15 : 10;
                  
                  setOrderData(prev => ({
                    ...prev,
                    quantity,
                    orderDetails: `• ${quantity} exemplaires du Jeu Pour Les Couples (-${discount}%)`
                  }));
                  
                  setFormStep('contact-info');
                  await addBotResponse([{
                    type: 'assistant',
                    content: "Entendu ! Pour finaliser votre achat, j'ai besoin de quelques infos. Tout d'abord, quel est votre nom complet ?"
                  }]);
                }
                break;
            }
        }
      };
    
      // Gestion de la saisie de message
      const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      };
    
      const handleSendMessage = () => {
        if (!inputMessage.trim()) return;
        handleUserChoice(inputMessage.trim());
        setInputMessage('');
      };

      // Rendu du composant
return (
  <div className="min-h-screen bg-gray-50">
    {/* Version Mobile */}
    {isMobile && (
      <>
        {/* Vue produit mobile */}
        <div className="pb-16">
          {/* Version Mobile */}
          <ProductImageGallery 
            images={images}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          />

          {/* Bouton Chat */}
          <button
            onClick={() => setIsChatFullscreen(true)}
            className="w-full mt-6 bg-[#FF7E93] text-white py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Ce jeu m'intéresse</span>
          </button>
        </div>

        {/* Chat en plein écran */}
        {isChatFullscreen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            {/* En-tête fixe */}
            <div className="bg-white py-3 px-4 border-b flex items-center gap-4">
              <button
                onClick={() => setIsChatFullscreen(false)}
                className="text-gray-600"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="font-semibold text-[#132D5D]">
                  Le Jeu Pour Les Couples
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-[#FF7E93] text-[#FF7E93]"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(39 avis)</span>
                </div>
              </div>
            </div>

              {/* Zone de chat */}
              <div
                ref={chatRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F0F2F5]"
              >
                <AnimatePresence>
                  {messages.map((message, index) => {
                // Gestion des choix utilisateur
                    if (message.type === 'user-choices') {
                    return (
                      <motion.div
                        key={`choices-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2"
                      >
                  {message.choices.map((choice, choiceIndex) => (
                <button
                  key={`${choice}-${choiceIndex}`}
                  onClick={() => handleUserChoice(choice)}
                  className="bg-white border border-[#FF7E93] text-[#FF7E93] rounded-full px-4 py-2 hover:bg-[#FF7E93] hover:text-white transition-colors text-sm"
                >
                {choice}
                </button>
              ))}
        </motion.div>
      );
    }

    // Gestion des boutons de paiement
if ((message.type === 'wave-button' || message.type === 'om-button') && showCheckout) {
    const isWave = message.type === 'wave-button';
    return (
      <motion.div
        key={`payment-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center my-4"
      >
        <a
          href={isWave 
            ? `https://pay.wave.com/m/M_OfAgT8X_IT6P/c/sn/?amount=${calculateTotal()}`
            : "https://qrcode.orange.sn/dcZJGzpsXklI13WNcvQl"
          }
          target="_blank"
          rel="noopener noreferrer"
          className={`px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-colors ${
            isWave 
              ? 'bg-[#1BA7FF] text-white' 
              : 'bg-[#F48022] text-white'
          }`}
        >
          <Image
            src={isWave ? '/images/payments/wave_2.svg' : '/images/payments/om_2.svg'}
            alt={isWave ? 'Wave' : 'Orange Money'}
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span>
            Payer {calculateTotal().toLocaleString()} FCFA avec {isWave ? 'Wave' : 'Orange Money'}
          </span>
        </a>
      </motion.div>
    );
  }

    // Gestion des messages normaux
return (
    <motion.div
      key={`message-${index}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full"
    >
      <div className={`p-3 ${
        message.type === 'user'
          ? 'bg-[#FF7E93] text-white ml-auto rounded-[20px] rounded-tr-sm max-w-[60%]'
          : 'bg-white text-gray-800 max-w-[85%] rounded-[20px] rounded-tl-sm'
      }`}
      >
        {message.type === 'assistant' && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">Rose</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              Assistante
            </span>
          </div>
        )}
        {message.content.includes('<strong>') ? (
        <div 
            className="mb-1 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: message.content }}
        />
        ) : (
        <div className="mb-1 whitespace-pre-line">
            {formatMessageContent(message.content)}
        </div>
        )}
        <div className="text-[11px] opacity-70 text-right">
          {new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit'
          })}
        </div>
      </div>
    </motion.div>
  );
  })}

  {isTyping && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex space-x-1 bg-white p-3 rounded-lg w-16"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 0.5,
            delay: i * 0.15,
            repeat: Infinity
          }}
        />
      ))}
    </motion.div>
  )}
</AnimatePresence>
              </div>

              {/* Zone de saisie */}
              <div className="px-4 py-3 bg-white border-t">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Tapez votre message..."
                                className="w-full px-4 py-2 bg-[#F0F2F5] rounded-full pr-20 focus:outline-none"
                                style={{ height: '44px' }}
                            />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button
                          className="p-2 text-gray-400 cursor-not-allowed"
                          disabled
                        >
                          <Mic className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleSendMessage}
                          className="p-2 text-[#FF7E93] hover:text-[#132D5D] transition-colors"
                          disabled={!inputMessage.trim()}
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          )}
        </>
      )}

      {/* Version Desktop */}
      {!isMobile && (
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Product Images */}
            {/* Version Desktop */}
                <div className="lg:w-5/12">
                    <ProductImageGallery 
                        images={images}
                        currentImage={currentImage}
                        setCurrentImage={setCurrentImage}
                    />
                </div>

            {/* Right Column - Chat Interface */}
            <div className="lg:w-7/12">
              <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm overflow-hidden ring-1 ring-gray-200">
                {/* Product Info in Chat Header */}
                <div className="bg-white py-4 px-6 border-b">
                  <h1 className="text-2xl font-bold text-[#132D5D] mb-2">
                    Le Jeu Pour Les Couples
                  </h1>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-[#FF7E93] text-[#FF7E93]"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">(39 avis)</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold">14.000 FCFA</span>
                      <span className="text-sm text-gray-500 line-through">
                        16.500 FCFA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chat Messages Area */}
                <div
                  ref={chatRef}
                  className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F0F2F5]"
                >
                  <AnimatePresence>
  {messages.map((message, index) => {
    // Gestion des choix utilisateur
    if (message.type === 'user-choices') {
      return (
        <motion.div
          key={`choices-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          {message.choices.map((choice, choiceIndex) => (
            <button
              key={`${choice}-${choiceIndex}`}
              onClick={() => handleUserChoice(choice)}
              className="bg-white border border-[#FF7E93] text-[#FF7E93] rounded-full px-4 py-2 hover:bg-[#FF7E93] hover:text-white transition-colors text-sm"
            >
              {choice}
            </button>
          ))}
        </motion.div>
      );
    }

    // Gestion des boutons de paiement
if ((message.type === 'wave-button' || message.type === 'om-button') && showCheckout) {
    const isWave = message.type === 'wave-button';
    return (
      <motion.div
        key={`payment-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center my-4"
      >
        <a
          href={isWave 
            ? `https://pay.wave.com/m/M_OfAgT8X_IT6P/c/sn/?amount=${calculateTotal()}`
            : "https://qrcode.orange.sn/dcZJGzpsXklI13WNcvQl"
          }
          target="_blank"
          rel="noopener noreferrer"
          className={`px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-colors ${
            isWave 
              ? 'bg-[#1BA7FF] text-white' 
              : 'bg-[#F48022] text-white'
          }`}
        >
          <Image
            src={isWave ? '/images/payments/wave_2.svg' : '/images/payments/om_2.svg'}
            alt={isWave ? 'Wave' : 'Orange Money'}
            width={24}
            height={24}
            className="w-6 h-6"
          />
          <span>
            Payer {calculateTotal().toLocaleString()} FCFA avec {isWave ? 'Wave' : 'Orange Money'}
          </span>
        </a>
      </motion.div>
    );
  }

    // Gestion des messages normaux
return (
    <motion.div
      key={`message-${index}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full"
    >
      <div className={`p-3 ${
        message.type === 'user'
          ? 'bg-[#FF7E93] text-white ml-auto rounded-[20px] rounded-tr-sm max-w-[60%]'
          : 'bg-white text-gray-800 max-w-[85%] rounded-[20px] rounded-tl-sm'
      }`}
      >
        {message.type === 'assistant' && (
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">Rose</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
              Assistante
            </span>
          </div>
        )}
        {message.content.includes('<strong>') ? (
        <div 
            className="mb-1 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: message.content }}
        />
        ) : (
        <div className="mb-1 whitespace-pre-line">
            {formatMessageContent(message.content)}
        </div>
        )}
        <div className="text-[11px] opacity-70 text-right">
          {new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit'
          })}
        </div>
      </div>
    </motion.div>
  );
  })}

  {isTyping && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex space-x-1 bg-white p-3 rounded-lg w-16"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 0.5,
            delay: i * 0.15,
            repeat: Infinity
          }}
        />
      ))}
    </motion.div>
  )}
</AnimatePresence>
                </div>

                {/* Chat Input */}
                <div className="px-4 py-3 bg-white border-t">
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Tapez votre message..."
                                className="w-full px-4 py-2 bg-[#F0F2F5] rounded-full pr-20 focus:outline-none"
                                style={{ height: '44px' }}
                            />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button
                          className="p-2 text-gray-400 cursor-not-allowed"
                          disabled
                        >
                          <Mic className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleSendMessage}
                          className="p-2 text-[#FF7E93] hover:text-[#132D5D] transition-colors"
                          disabled={!inputMessage.trim()}
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ProductPage;