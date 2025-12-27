'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send, ShoppingCart, Star, CheckCircle, ArrowDown } from 'lucide-react';

// Photos des marques clientes (à remplacer par les vraies photos)
const clientBrands = [
  { name: '6C No Filter', image: '/images/testimonials/fatou-cisse.jpg' },
  { name: 'Yafa Beauty', image: '/images/testimonials/aminata.jpg' },
  { name: 'Racines Précieuses', image: '/images/testimonials/moussa.jpg' },
  { name: 'Karyal', image: '/images/testimonials/fatou.jpg' },
];

// Messages de chat pour l'animation
const chatMessages = [
  {
    type: 'ai' as const,
    avatar: 'A',
    name: 'Aïcha',
    role: 'Conseillère Beauté IA',
    message: 'Bonjour ! Je suis Aïcha, votre conseillère beauté. Comment puis-je vous aider aujourd\'hui ?',
    timestamp: '10:15'
  },
  {
    type: 'user' as const,
    message: 'Bonjour Aïcha ! J\'ai les genoux et les coudes très foncés, ça me complexe beaucoup. Vous avez quelque chose pour ça ?',
    timestamp: '10:16'
  },
  {
    type: 'ai' as const,
    message: 'Je comprends tout à fait, c\'est une préoccupation très courante et vous n\'êtes pas seule ! Avant de vous conseiller, j\'aimerais mieux comprendre votre situation. Depuis combien de temps avez-vous remarqué cet assombrissement ?',
    timestamp: '10:16'
  },
  {
    type: 'user' as const,
    message: 'Ça fait des années en fait. J\'ai essayé plusieurs produits mais rien ne marche vraiment',
    timestamp: '10:17'
  },
  {
    type: 'ai' as const,
    message: 'D\'accord, je vois. Et est-ce que votre peau est plutôt sensible, ou vous n\'avez jamais eu de réactions particulières aux soins ?',
    timestamp: '10:17'
  },
  {
    type: 'user' as const,
    message: 'Ma peau est un peu sensible oui. Les produits trop agressifs me donnent des irritations',
    timestamp: '10:18'
  },
  {
    type: 'ai' as const,
    message: 'Merci pour ces précisions, c\'est important ! Pour votre cas, je vous recommande notre **Lait Unifiant au Curcuma & Karité**. Il est 100% naturel et formulé spécialement pour les peaux sensibles. Le curcuma est reconnu pour son action éclaircissante douce, et le beurre de karité nourrit en profondeur sans irriter.',
    timestamp: '10:18',
    products: [
      {
        name: 'Lait Unifiant Curcuma & Karité',
        price: '12 500 FCFA',
        emoji: '✨'
      }
    ]
  },
  {
    type: 'user' as const,
    message: 'Le curcuma, ça ne tache pas la peau en jaune ?',
    timestamp: '10:19'
  },
  {
    type: 'ai' as const,
    message: 'Contente que vous posiez la question 😊 Non, notre formule est conçue pour éviter ce problème. Le curcuma est infusé dans le karité, pas appliqué pur. Il pénètre dans la peau sans laisser de traces. Beaucoup de nos clientes avaient la même inquiétude et sont aujourd\'hui ravies du résultat !',
    timestamp: '10:19'
  },
  {
    type: 'user' as const,
    message: 'Ok ça me rassure. Je l\'utilise comment exactement ?',
    timestamp: '10:20'
  },
  {
    type: 'ai' as const,
    message: 'C\'est très simple : appliquez le lait chaque soir après la douche sur les zones concernées (genoux, coudes, et vous pouvez aussi l\'utiliser sur les aisselles ou les entre-cuisses si besoin). Massez jusqu\'à absorption complète. Les premiers résultats apparaissent généralement après 2-3 semaines d\'utilisation régulière.',
    timestamp: '10:20'
  },
  {
    type: 'user' as const,
    message: 'D\'accord parfait ! Je vais le prendre',
    timestamp: '10:21'
  },
  {
    type: 'ai' as const,
    message: 'Excellent choix ! Pour maximiser les résultats, je vous conseille d\'ajouter notre **Gommage Doux à la Papaye**. Utilisé une fois par semaine avant le lait, il élimine les cellules mortes et permet au lait de mieux pénétrer. Ensemble, ils forment un duo très efficace pour unifier le teint.',
    timestamp: '10:21',
    products: [
      {
        name: 'Lait Unifiant Curcuma & Karité',
        price: '12 500 FCFA',
        emoji: '✨'
      },
      {
        name: 'Gommage Doux à la Papaye',
        price: '8 500 FCFA',
        emoji: '🧴'
      }
    ]
  },
  {
    type: 'user' as const,
    message: 'Ah oui bonne idée ! Je prends les deux alors',
    timestamp: '10:22'
  },
  {
    type: 'ai' as const,
    message: 'Parfait ! Le lait Unifiant + le Gommage Papaye = **21 000 FCFA**. Je viens d\'ajouter les 2 produits à votre panier. Il vous suffit de cliquer sur le bouton "Commander" pour finaliser votre achat. Avec une utilisation régulière, vous allez voir une vraie différence.',
    timestamp: '10:22'
  }
];

// Composant Social Proof
const SocialProof = () => (
  <div className="flex items-center space-x-4">
    {/* Photos empilées */}
    <div className="flex -space-x-3">
      {clientBrands.map((brand, index) => (
        <div
          key={brand.name}
          className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm"
          style={{ zIndex: clientBrands.length - index }}
        >
          <Image
            src={brand.image}
            alt={brand.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback si l'image n'existe pas
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-dukka-blue to-dukka-blue-700 flex items-center justify-center text-white text-xs font-bold">${brand.name.charAt(0)}</div>`;
            }}
          />
        </div>
      ))}
      <div className="w-10 h-10 rounded-full border-2 border-white bg-dukka-blue flex items-center justify-center text-white text-xs font-bold shadow-sm">
        +50
      </div>
    </div>
    
    {/* Texte et étoiles */}
    <div className="flex flex-col">
      <div className="flex items-center space-x-1 mb-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <span className="text-sm text-dukka-gray-600 font-medium">
        +50 e-commerçants africains nous font confiance
      </span>
    </div>
  </div>
);

// Composant Interface de Chat
const ChatInterface = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Animation des messages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex(prev => {
        if (prev < chatMessages.length - 1) {
          return prev + 1;
        } else {
          // Reset après avoir affiché tous les messages
          return 0;
        }
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentMessageIndex]);

  return (
    <div className="relative">
      {/* Chat Interface */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-dukka-gray-200 overflow-hidden max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-dukka-blue to-dukka-blue-700 px-4 sm:px-6 py-3 sm:py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm backdrop-blur-sm">
              A
            </div>
            <div>
              <div className="font-semibold text-sm sm:text-base">Aïcha</div>
              <div className="text-xs text-blue-100">Conseillère Beauté IA</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium">En ligne</span>
          </div>
        </div>

        {/* Chat Messages */}
        <div 
          ref={chatContainerRef}
          className="h-72 sm:h-80 md:h-96 p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto scroll-smooth bg-gradient-to-b from-gray-50/50 to-white"
        >
          {chatMessages.slice(0, currentMessageIndex + 1).map((msg, index) => (
            <motion.div 
              key={index} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              
              {msg.type === 'ai' && (
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-dukka-blue to-dukka-blue-700 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-1 shadow-sm">
                  {msg.avatar}
                </div>
              )}

              <div className={`max-w-[80%] sm:max-w-[85%] ${
                msg.type === 'user' 
                  ? 'bg-gradient-to-r from-dukka-blue to-dukka-blue-700 text-white' 
                  : 'bg-white border border-dukka-gray-200 shadow-sm'
              } rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4`}>
                <div className={`text-xs sm:text-sm leading-relaxed ${msg.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                  {msg.message.includes('**') ? (
                    <span dangerouslySetInnerHTML={{
                      __html: msg.message
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-dukka-blue">$1</strong>')
                    }} />
                  ) : (
                    msg.message
                  )}
                </div>
                
                {/* Produits recommandés */}
                {msg.products && (
                  <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                    {msg.products.map((product, prodIndex) => (
                      <div 
                        key={prodIndex}
                        className="flex items-center justify-between bg-gradient-to-r from-dukka-blue-50 to-blue-50 rounded-lg sm:rounded-xl p-2 sm:p-3 cursor-pointer hover:from-dukka-blue-100 hover:to-blue-100 transition-all duration-300 group border border-dukka-blue-100"
                      >
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <span className="text-base sm:text-xl">{product.emoji}</span>
                          <div>
                            <div className="text-xs sm:text-sm font-semibold text-gray-800">{product.name}</div>
                            <div className="text-xs text-dukka-blue font-bold">{product.price}</div>
                          </div>
                        </div>
                        <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-dukka-blue group-hover:scale-110 transition-transform duration-200" />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className={`text-xs mt-2 sm:mt-3 ${msg.type === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {currentMessageIndex < chatMessages.length - 1 && (
            <motion.div 
              className="flex justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-dukka-blue to-dukka-blue-700 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-1 shadow-sm">
                A
              </div>
              <div className="bg-white border border-dukka-gray-200 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-dukka-blue rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-dukka-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-dukka-blue-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 sm:p-6 border-t border-dukka-gray-200 bg-white">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <input 
              type="text" 
              placeholder="Posez votre question..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-dukka-gray-200 rounded-full text-xs sm:text-sm focus:outline-none focus:border-dukka-blue focus:ring-2 focus:ring-dukka-blue-100 transition-all duration-200"
              readOnly
            />
            <button 
              className="bg-gradient-to-r from-dukka-blue to-dukka-blue-700 hover:from-dukka-blue-700 hover:to-dukka-blue-800 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Badge flottant */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute -right-4 sm:-right-8 top-1/4 hidden lg:block"
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-bold">
          Réponse instantanée
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute -left-4 sm:-left-8 bottom-1/3 hidden lg:block"
      >
        <div className="bg-gradient-to-r from-dukka-orange to-orange-500 text-white px-4 py-3 rounded-xl shadow-xl text-sm font-bold">
          Disponible 24/7
        </div>
      </motion.div>

      {/* Éléments décoratifs */}
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-dukka-yellow rounded-lg opacity-20 blur-xl" />
      <div className="absolute -bottom-6 right-12 w-32 h-32 bg-dukka-orange rounded-lg opacity-20 blur-xl" />
    </div>
  );
};

export default function NewHeroSection() {
  return (
    <section className="relative bg-gray-50 pt-32 pb-20 lg:pt-44 lg:pb-28 overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-dukka-blue-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-dukka-orange-100 rounded-full blur-3xl opacity-15" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            {/* Social Proof Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center lg:justify-start mb-8"
            >
              <SocialProof />
            </motion.div>

            {/* Headline avec soulignement sous "n'a pas créés" */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dukka-gray-900 leading-tight mb-6">
              Les outils que Shopify{' '}
              <span className="relative inline-block">
                n&apos;a pas créés
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="8"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 5.5C50 1.5 100 1.5 199 5.5"
                    stroke="#3973e0"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              pour l&apos;Afrique.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-dukka-gray-600 mb-8 leading-relaxed">
              Achat conversationnel, Paiement à la livraison, Gestion des livreurs indépendants, Clients sur WhatsApp, Vente en live TikTok...
              <br />
              <span className="font-semibold text-dukka-gray-700">
                Shopify & WooCommerce n&apos;ont pas été pensés pour ça. <span className="text-dukka-blue">Dukka</span>, si.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="https://dashboard.chatseller.app/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-dukka-blue text-white font-semibold rounded-lg hover:bg-dukka-blue-700 transition-all hover:shadow-hover text-base"
              >
                Essayer Chatseller gratuitement
              </Link>

              <Link
                href="#pipeline"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-dukka-gray-300 text-dukka-gray-700 font-semibold rounded-lg hover:border-dukka-blue hover:text-dukka-blue transition-all text-base group"
              >
                Voir les solutions
                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-dukka-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>7 jours gratuits</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Sans carte bancaire</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Installation en 2 min</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Chat Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <ChatInterface />
          </motion.div>
        </div>
      </div>
    </section>
  );
}