// src/components/sections/HeroSection.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { WaitlistButton } from '@/components/WaitlistButton'
import { CheckCircle, Play, Bot, BarChart3, CreditCard } from 'lucide-react'
import { useEffect, useState } from 'react'

export function HeroSection() {
  // Tableau des différents textes à afficher en alternance
  const alternateTexts = ["l'Afrique achète.", "vos clients aiment."];
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Effet pour animer l'alternance des textes
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentText = alternateTexts[textIndex];
    
    // Si nous sommes en train de taper et n'avons pas atteint la fin du texte
    if (isTyping && !isDeleting && displayText !== currentText) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, displayText.length + 1));
      }, 100);
    } 
    // Si nous avons fini de taper, attendez avant de commencer à effacer
    else if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } 
    // Si nous sommes en train d'effacer
    else if (isDeleting && displayText !== "") {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, displayText.length - 1));
      }, 50);
    } 
    // Si nous avons fini d'effacer, changez de texte et recommencez à taper
    else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % alternateTexts.length);
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, isTyping, isDeleting, textIndex, alternateTexts]);

  return (
    <section className="relative overflow-hidden">
      {/* Gradient de fond */}
      <div className="absolute inset-x-0 -top-24 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-dukka-light to-dukka-primary opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 md:pt-24 md:pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-gray-900 block">
              Vendez comme
            </h1>
            
            <div className="relative h-16 sm:h-20 md:h-24 lg:h-32 mt-2 mb-2 overflow-hidden">
              <motion.span 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight block text-dukka-primary"
              >
                {displayText}
                <motion.span
                  animate={{
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                  className="inline-block ml-1 w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-dukka-primary"
                ></motion.span>
              </motion.span>
            </div>
          </motion.div>

          <motion.p
            className="mt-1 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Créez une boutique en ligne où vos clients achètent en discutant, comme dans une boutique physique. 
            Un vendeur IA répond à leurs questions 24/7 et les guide jusqu'à l'achat, pour plus de ventes sans effort.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <WaitlistButton className="w-full sm:w-auto px-6 py-3 text-base" />
            
            <a href="#demo" className="flex items-center gap-2 text-gray-900 hover:text-dukka-primary transition-colors px-6 py-3 rounded-lg border-2 border-gray-200 hover:border-dukka-primary w-full sm:w-auto justify-center">
              <Play className="w-5 h-5" />
              <span className="font-semibold">Voir une démo</span>
            </a>
          </motion.div>

          {/* Points forts */}
          <motion.div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 bg-dukka-primary/5 p-4 rounded-xl">
              <div className="text-3xl font-bold text-dukka-primary">+45%</div>
              <div className="text-sm text-gray-600">de ventes<br />en moyenne</div>
            </div>
            <div className="flex items-center justify-center gap-2 bg-dukka-primary/5 p-4 rounded-xl">
              <div className="text-3xl font-bold text-dukka-primary">60%</div>
              <div className="text-sm text-gray-600">de temps<br />gagné</div>
            </div>
            <div className="flex items-center justify-center gap-2 bg-dukka-primary/5 p-4 rounded-xl">
              <div className="text-3xl font-bold text-dukka-primary">75%</div>
              <div className="text-sm text-gray-600">de clients<br />en plus</div>
            </div>
          </motion.div>
        </div>

        {/* Dashboard */}
        <motion.div
          className="mt-14 relative mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {/* Écran d'ordinateur avec le dashboard */}
          <div className="relative mx-auto">
            {/* Partie supérieure de l'écran */}
            <div className="bg-gray-800 rounded-t-xl p-2 border-t border-l border-r border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-400">Page Produit + Dashboard Dukka</div>
                <div className="w-10"></div> {/* Pour équilibrer */}
              </div>
            </div>
            
            {/* Dashboard réel */}
            <div className="relative border-l border-r border-gray-700 bg-white shadow-2xl">
            <video
              src="/videos/demo-dukka2.mp4"
              poster="/images/dashboard/demo-dukka2.png" 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
              style={{ objectFit: 'cover' }}
            />
            </div>
            
            {/* Base de l'écran */}
            <div className="bg-gray-800 h-4 rounded-b-xl border-b border-l border-r border-gray-700"></div>
            <div className="bg-gray-700 h-2 mx-16 rounded-b-xl"></div>
          </div>
          
          {/* Badge "Propulsé par l'IA" */}
          <div className="absolute -top-4 right-8 bg-dukka-primary text-white px-4 py-2 rounded-full transform -rotate-2 shadow-lg">
            <span className="text-sm font-bold">L'E-commerce simplifié</span>
          </div>
        </motion.div>
        
        {/* Points principaux */}
        <motion.div
          className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="flex items-start gap-3">
            <Bot className="w-6 h-6 text-dukka-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Vendeur IA intégré</p>
              <p className="text-sm text-gray-600">Imaginez ChatGPT agir comme votre vendeur personnel et guider vos clients de la découverte à l'achat.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CreditCard className="w-6 h-6 text-dukka-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Tous les paiements acceptés</p>
              <p className="text-sm text-gray-600">Vos clients peuvent payer par mobile money, carte bancaire ou à la livraison, sans quitter la conversion.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-dukka-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Pas besoin de savoir coder</p>
              <p className="text-sm text-gray-600">Créez, gérez et développez facilement votre boutique, avec l'aide de votre Assistant IA.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}