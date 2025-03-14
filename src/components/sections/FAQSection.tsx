// src/components/sections/FAQSection.tsx
'use client'

import { useState, useRef } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { GradientTitle } from '@/components/GradientTitle'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { WaitlistButton } from '@/components/WaitlistButton'

const faqs = [
  {
    question: "Dois-je avoir des compétences techniques pour utiliser Dukka ?",
    answer: "Non, absolument pas ! Dukka a été conçu pour être utilisé sans aucune compétence technique. Notre interface intuitive et notre Assistant IA vous guident à chaque étape, de la création de votre boutique jusqu'à l'optimisation de vos ventes."
  },
  {
    question: "Comment fonctionne la période d'essai gratuite ?",
    answer: "Vous pouvez essayer Dukka gratuitement pendant 1 à 2 mois selon l'offre choisie. Pendant cette période, vous avez accès à toutes les fonctionnalités. Aucun paiement n'est requis pour commencer, et vous pouvez annuler à tout moment sans engagement."
  },
  {
    question: "Quels moyens de paiement sont acceptés ?",
    answer: "Dukka intègre tous les principaux moyens de paiement mobile africains : Wave, Orange Money, Free Money, MTN Money, Moov Money et autres solutions locales. Les paiements se font directement dans la conversation, ce qui rend l'expérience fluide pour vos clients."
  },
  {
    question: "Comment fonctionne l'expérience conversationnelle pour mes clients ?",
    answer: "Vos clients découvrent vos produits et interagissent avec un Vendeur IA qui répond à leurs questions, les conseille et les guide vers l'achat. Ce chatbot simule l'expérience d'un marché physique africain, où l'achat commence par une conversation. Tout le processus d'achat, de la découverte au paiement, se fait naturellement dans cette conversation."
  },
  {
    question: "Comment l'Assistant IA m'aide-t-il dans mon business ?",
    answer: "L'Assistant IA intégré au tableau de bord de votre boutique vous aide à comprendre vos performances, vous alerte sur les opportunités de vente, vous explique les tendances et vous donne des conseils personnalisés pour optimiser votre business. Il répond aussi à toutes vos questions concernant l'utilisation de la plateforme."
  },
  {
    question: "Comment fonctionne le support client ?",
    answer: "Nous offrons un support par WhatsApp pour tous nos clients. Les clients de l'offre Tekki bénéficient d'un support prioritaire, tandis que les clients Jambar ont un account manager dédié disponible 24/7. Notre équipe est basée en Afrique et comprend parfaitement les défis auxquels vous faites face."
  },
  {
    question: "Puis-je migrer d'une offre à une autre ?",
    answer: "Oui, vous pouvez changer d'offre à tout moment. La migration vers une offre supérieure est instantanée, et nous vous accompagnons dans le processus de transition pour que vous puissiez profiter des fonctionnalités supplémentaires immédiatement."
  },
  {
    question: "Y a-t-il des frais cachés ?",
    answer: "Non, tous nos prix sont transparents. Vous ne payez que votre abonnement mensuel ou annuel. Aucun frais caché, aucune commission sur vos ventes, ni de frais de mise en place ou de formation initiale."
  }
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`border-b border-gray-200 last:border-0 ${isOpen ? 'bg-gray-50/50' : ''}`}
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left hover:text-dukka-primary transition-colors duration-200"
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="font-semibold text-lg">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-100 rounded-full p-1"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pb-5"
          >
            <motion.p 
              className="text-gray-600"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const titleRef = useRef(null);
  const ctaRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const isCtaInView = useInView(ctaRef, { once: true });

  return (
    <section className="py-24 bg-gray-50" id="faq">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <GradientTitle subtitle="Retrouvez les réponses aux questions les plus fréquentes sur Dukka">
            Questions fréquentes
          </GradientTitle>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl p-6 shadow-sm divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} index={index} />
              ))}
            </div>
          </div>

          <motion.div 
            ref={ctaRef}
            className="w-full lg:w-1/3 sticky top-24"
            initial={{ opacity: 0, x: 20 }}
            animate={isCtaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-dukka-primary/95 to-dukka-dark text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Une question spécifique ?
              </h3>
              <p className="mb-6 text-white/90">
                Notre équipe est disponible pour répondre à toutes vos questions et vous accompagner dans votre projet e-commerce.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Support WhatsApp</p>
                    <p className="text-sm text-white/80">Réponse rapide à vos questions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Démo personnalisée</p>
                    <p className="text-sm text-white/80">Voyez Dukka en action pour votre business</p>
                  </div>
                </div>
              </div>

              <WaitlistButton variant="white" className="w-full justify-center" />
              
              <a 
                href="/contact" 
                className="mt-4 text-center block text-white/90 hover:text-white transition-colors"
              >
                Ou contactez-nous directement
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Vous ne trouvez pas la réponse à votre question ? Notre équipe basée à Dakar est prête à vous aider dans votre langue.
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center text-dukka-primary hover:text-dukka-dark font-medium group"
            whileHover={{ x: 4 }}
          >
            Contactez notre équipe
            <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg] transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}