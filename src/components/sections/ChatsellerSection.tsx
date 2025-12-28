'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Send,
  ShoppingCart,
  Brain,
  Heart,
  Zap,
  Star,
  CheckCircle
} from 'lucide-react';

// Messages de chat pour l'animation - Style Chatseller
const chatMessages = [
  {
    type: 'ai' as const,
    avatar: 'A',
    name: 'Anta',
    message: 'Bonjour ! Je suis Anta, votre conseillère capillaire. Comment puis-je vous aider aujourd\'hui ?',
    timestamp: '14:23'
  },
  {
    type: 'user' as const,
    message: "Bonjour ! Je perds beaucoup de cheveux au niveau des tempes depuis quelques mois. J'ai tout essayé mais rien ne marche... 😔",
    timestamp: '14:23'
  },
  {
    type: 'ai' as const,
    avatar: 'A',
    name: 'Anta',
    message: "Je comprends, c'est vraiment frustrant 💛 Cette zone est souvent fragilisée. Est-ce que vous portez régulièrement des tresses, des tissages ou des coiffures serrées ?",
    timestamp: '14:23'
  },
  {
    type: 'user' as const,
    message: "Oui, je fais des tresses pratiquement tous les mois...",
    timestamp: '14:24'
  },
  {
    type: 'ai' as const,
    avatar: 'A',
    name: 'Anta',
    message: "C'est probablement de l'alopécie de traction — très courante avec les coiffures répétées. Bonne nouvelle : c'est réversible ! Notre **Sérum Densifiant** stimule les follicules et renforce la repousse.",
    timestamp: '14:24',
    product: { name: 'Sérum Densifiant Cuir Chevelu', price: '18 500 FCFA', emoji: '🧴' }
  },
  {
    type: 'user' as const,
    message: "Il fonctionne vraiment ? En combien de temps ?",
    timestamp: '14:25'
  },
  {
    type: 'ai' as const,
    avatar: 'A',
    name: 'Anta',
    message: "87% de nos clientes voient des résultats visibles en 6-8 semaines. Appliquez-le 3x/semaine sur les tempes en massant doucement. Voulez-vous l'ajouter au panier ?",
    timestamp: '14:25'
  }
];

// Données des bénéfices Chatseller
const benefitsData = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'Experte, pas un chatbot générique',
    description: 'Chatseller maîtrise +2000 ingrédients, types de peau et de cheveux, routines et tendances beauté, les problématiques locales, pour conseiller comme une vraie experte.',
    metric: '+94%',
    metricLabel: 'questions résolues',
    colorClasses: {
      bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      badge: 'bg-purple-600'
    }
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Elle comprend la situation de chaque cliente',
    description: '"J\'ai des tâches sur le visage", "Je perds mes cheveux"... Votre conseillère IA écoute, comprend, conseille et recommande le bon produit, le tout dans une conversation naturelle.',
    metric: '+73%',
    metricLabel: 'satisfaction client',
    colorClasses: {
      bg: 'bg-gradient-to-br from-rose-50 to-pink-50',
      border: 'border-rose-200',
      text: 'text-rose-600',
      badge: 'bg-rose-600'
    }
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: 'Elle vend, elle ne fait pas que répondre',
    description: 'Votre conseillère IA ne fait pas que répondre aux questions. Elle guide vers l\'achat, suggère des produits complémentaires, et collecte les commandes. C\'est une vendeuse, pas un support.',
    metric: '+45%',
    metricLabel: 'taux de conversion',
    colorClasses: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      border: 'border-green-200',
      text: 'text-green-600',
      badge: 'bg-green-600'
    }
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: '2 minutes pour l\'installer. Zéro code.',
    description: 'Copiez un script, collez-le dans votre site Shopify. Chatseller recupère automatiquement les données de votre site pour se former. Votre Conseillère IA est prête en 2 min.',
    metric: '<2min',
    metricLabel: 'd\'installation',
    colorClasses: {
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
      border: 'border-amber-200',
      text: 'text-amber-600',
      badge: 'bg-amber-600'
    }
  }
];

// Composant Interface de Chat Chatseller
const ChatsellerInterface = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex(prev => {
        if (prev < chatMessages.length - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentMessageIndex]);

  return (
    <div className="relative">
      {/* Chat Interface - Couleurs Chatseller */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-pink-200 overflow-hidden max-w-sm sm:max-w-md mx-auto">
        
        {/* Chat Header - Gradient Chatseller */}
        <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 px-4 sm:px-6 py-3 sm:py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm backdrop-blur-sm">
              A
            </div>
            <div>
              <div className="font-semibold text-sm sm:text-base">Anta</div>
              <div className="text-xs text-pink-100">Conseillère Capillaire IA</div>
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
          className="h-80 sm:h-96 p-4 sm:p-6 space-y-4 overflow-y-auto scroll-smooth bg-gradient-to-b from-pink-50/30 to-white"
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
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-1">
                  {msg.avatar}
                </div>
              )}

              <div className={`max-w-[80%] ${
                msg.type === 'user' 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                  : 'bg-white border border-pink-100 shadow-sm'
              } rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3`}>
                <div className={`text-xs sm:text-sm leading-relaxed ${msg.type === 'user' ? 'text-white' : 'text-gray-800'}`}>
                  {msg.message.includes('**') ? (
                    <span dangerouslySetInnerHTML={{
                      __html: msg.message.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-pink-600">$1</strong>')
                    }} />
                  ) : (
                    msg.message
                  )}
                </div>
                
                {/* Produit recommandé */}
                {msg.product && (
                  <div className="mt-3 flex items-center justify-between bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-2 sm:p-3 border border-pink-100">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{msg.product.emoji}</span>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-800">{msg.product.name}</div>
                        <div className="text-xs text-pink-600 font-bold">{msg.product.price}</div>
                      </div>
                    </div>
                    <ShoppingCart className="w-4 h-4 text-pink-600" />
                  </div>
                )}
                
                <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-pink-200' : 'text-gray-400'}`}>
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
              <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 sm:mr-3 mt-1">
                A
              </div>
              <div className="bg-white border border-pink-100 rounded-xl px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-pink-100 bg-white">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Posez votre question..."
              className="flex-1 px-4 py-2 sm:py-3 border border-pink-200 rounded-full text-xs sm:text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              readOnly
            />
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2 sm:p-3 shadow-lg">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Badges flottants */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute -right-4 top-1/4 hidden lg:block"
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl shadow-xl text-sm font-bold">
          +45% de conversion
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="absolute -left-4 bottom-1/3 hidden lg:block"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow-xl text-sm font-bold">
          Recommandation de produits
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute -right-2 bottom-1/4 hidden lg:block"
      >
        <div className="bg-white text-pink-600 border border-pink-200 px-3 py-2 rounded-lg shadow-lg text-xs font-medium flex items-center">
          <Heart className="w-3 h-3 mr-1 fill-pink-500" />
          Conseil personnalisé
        </div>
      </motion.div>
    </div>
  );
};

// Composant Carte Bénéfice
const BenefitCard = ({ benefit, isActive, onClick }: { benefit: typeof benefitsData[0], isActive: boolean, onClick: () => void }) => (
  <div 
    className={`flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-500 hover:shadow-lg ${
      isActive 
        ? 'bg-white shadow-xl border-2 border-pink-200 scale-105' 
        : 'bg-white/50 hover:bg-white/70 border border-pink-100'
    }`}
    onClick={onClick}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
      isActive 
        ? `${benefit.colorClasses.text} bg-white shadow-lg` 
        : 'text-gray-400 bg-gray-100'
    }`}>
      {benefit.icon}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className={`font-semibold transition-colors duration-300 text-sm ${
        isActive ? 'text-gray-900' : 'text-gray-600'
      }`}>
        {benefit.title}
      </h3>
      {isActive && (
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {benefit.description}
        </p>
      )}
    </div>
    {isActive && (
      <div className={`ml-auto px-3 py-1 rounded-full text-xs font-bold text-white ${benefit.colorClasses.badge}`}>
        {benefit.metric}
      </div>
    )}
  </div>
);

// Composant Carte Bénéfice Détaillée (pour mobile)
const BenefitCardFull = ({ benefit }: { benefit: typeof benefitsData[0] }) => (
  <div className={`relative p-6 rounded-2xl border ${benefit.colorClasses.bg} ${benefit.colorClasses.border} shadow-lg`}>
    <div className="absolute -top-3 right-6">
      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${benefit.colorClasses.badge} text-white shadow-lg`}>
        {benefit.metric} {benefit.metricLabel}
      </span>
    </div>

    <div className="flex items-start space-x-4 pt-2">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${benefit.colorClasses.text} bg-white shadow-md`}>
        {benefit.icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
      </div>
    </div>
  </div>
);

export default function ChatsellerSection() {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="chatseller" className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#fbf1f6' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white border border-pink-200 mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-semibold text-pink-700">
              Disponible maintenant — Essai gratuit 14 jours
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Chatseller</span>
            <br />
            <span className="text-dukka-gray-900">La conseillère IA qui vend pour vous.</span>
          </h2>

          <p className="text-lg sm:text-xl text-dukka-gray-600 max-w-3xl mx-auto">
            Vos clientes veulent être écoutées et conseillées avant d&apos;acheter.
            <br className="hidden sm:block" />
            Chatseller comprend leur situation et les guide jusqu&apos;à l&apos;achat.
          </p>
        </motion.div>

        {/* Main Content */}
        {isMobile ? (
          /* Mobile Layout */
          <div className="space-y-8">
            {/* Interface de chat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ChatsellerInterface />
            </motion.div>

            {/* Bénéfices empilés */}
            <div className="space-y-4">
              {benefitsData.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BenefitCardFull benefit={benefit} />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Layout */
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Bénéfices */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Pourquoi Chatseller est la solution qu&apos;il faut à votre marque?
              </h3>

              <div className="space-y-3">
                {benefitsData.map((benefit, index) => (
                  <BenefitCard 
                    key={index}
                    benefit={benefit}
                    isActive={index === activeBenefit}
                    onClick={() => setActiveBenefit(index)}
                  />
                ))}
              </div>

              {/* Indicateurs */}
              <div className="flex items-center space-x-3 pt-4">
                <div className="text-sm text-gray-500 font-medium">
                  {activeBenefit + 1} / {benefitsData.length}
                </div>
                <div className="flex space-x-2">
                  {benefitsData.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        index === activeBenefit 
                          ? 'bg-gradient-to-r from-pink-500 to-purple-500 w-6' 
                          : 'bg-pink-200 hover:bg-pink-300'
                      }`}
                      onClick={() => setActiveBenefit(index)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Interface de chat */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-32"
            >
              <ChatsellerInterface />
            </motion.div>
          </div>
        )}

        {/* Témoignage 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 lg:mt-20"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-pink-100 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Photo 
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg">
                    <Image
                      src="/images/testimonials/fatou-cisse.jpg"
                      alt="Fatou Cissé - Fondatrice de 6C No Filter"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-1.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Contenu 
              <div className="flex-1">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-4 italic">
                  &quot;Depuis que j&apos;ai installé Chatseller, mes clientes commandent sans m&apos;envoyer 15 messages WhatsApp avant. Je gagne 2h par jour et mon taux de conversion a augmenté de 45%.&quot;
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div>
                    <p className="font-bold text-gray-900">Fatou Cissé</p>
                    <p className="text-sm text-gray-600">Fondatrice de 6C No Filter</p>
                  </div>
                  <a 
                    href="https://6cnofilter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Voir la boutique
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        */}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://dashboard.chatseller.app/register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-base sm:text-lg rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl group"
          >
            <span>Essayer Chatseller gratuitement</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <p className="mt-4 text-sm text-gray-600">
            14 jours gratuits · Sans carte bancaire · Installation en 2 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
}