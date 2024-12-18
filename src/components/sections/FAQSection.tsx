'use client'

import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { GradientTitle } from '@/components/GradientTitle'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const faqs = [
  {
    question: "Dois-je avoir des compétences techniques pour utiliser Dukka ?",
    answer: "Non, absolument pas ! Dukka a été conçu pour être utilisé sans aucune compétence technique. Notre interface intuitive et notre chatbot vous guident à chaque étape, de la création de votre boutique à la gestion des ventes."
  },
  {
    question: "Comment fonctionne la période d'essai gratuite ?",
    answer: "Vous pouvez essayer Dukka gratuitement pendant 1 à 2 mois selon l'offre choisie. Pendant cette période, vous avez accès à toutes les fonctionnalités de votre forfait. Pas de paiement requis pour commencer, et vous pouvez annuler à tout moment."
  },
  {
    question: "Quels moyens de paiement sont acceptés ?",
    answer: "Dukka intègre tous les principaux moyens de paiement mobile africains : Wave, Orange Money, Free Money, MaxIt et autres solutions locales. Nous ajoutons régulièrement de nouvelles options de paiement."
  },
  {
    question: "Comment fonctionne le support client ?",
    answer: "Nous offrons un support par WhatsApp pour tous nos clients. Les clients de l'offre Tekki bénéficient d'un support prioritaire, tandis que les clients Jambar ont un account manager dédié disponible 24/7."
  },
  {
    question: "Puis-je migrer d'une offre à une autre ?",
    answer: "Oui, vous pouvez changer d'offre à tout moment. La migration vers une offre supérieure est instantanée, et nous vous accompagnons dans le processus de transition."
  },
  {
    question: "Y a-t-il des frais cachés ?",
    answer: "Non, tous nos prix sont transparents. Vous ne payez que votre abonnement mensuel ou annuel. Aucun frais caché ni commission sur vos ventes. Les options supplémentaires (formation, domaine personnalisé) sont clairement indiquées."
  }
]

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true })

  return (
    <motion.div 
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-0"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-6 text-left hover:text-dukka-primary transition-colors duration-200"
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-semibold text-lg">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
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
            className="overflow-hidden"
          >
            <motion.p 
              className="text-gray-600 pb-6"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <section className="py-24 bg-[#F2F2F2]">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <GradientTitle subtitle="Retrouvez les réponses aux questions les plus fréquentes sur Dukka">
            Questions fréquentes
          </GradientTitle>
        </motion.div>

        <div className="mt-24 max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-4">
            Vous ne trouvez pas la réponse à votre question ?
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
  )
}