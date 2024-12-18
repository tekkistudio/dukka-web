'use client'

import { Store, MessageCircle, CreditCard, Rocket } from 'lucide-react'
import { GradientTitle } from '@/components/GradientTitle'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    Icon: Store,
    title: 'Créez votre boutique',
    description: 'Personnalisez votre boutique en ligne en quelques clics et importez vos produits facilement.'
  },
  {
    Icon: MessageCircle,
    title: 'Vendez par la conversation',
    description: 'Votre Vendeur IA répond à vos clients 24/7 et les guide naturellement vers l\'achat.'
  },
  {
    Icon: CreditCard,
    title: 'Encaissez simplement',
    description: 'Acceptez tous les paiements locaux (Wave, Orange Money, etc.) sans friction et en toute sécurité.'
  },
  {
    Icon: Rocket,
    title: 'Développez vos ventes',
    description: 'Comprenez vos performances et recevez des conseils personnalisés pour augmenter vos ventes.'
  }
]

function StepCard({ Icon, title, description, index }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.2,
        ease: [0.21, 1.11, 0.81, 0.99] // Ease out back
      }}
    >
      <div className="relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div className="absolute -top-4 left-6 w-8 h-8 bg-dukka-primary text-white rounded-lg flex items-center justify-center">
          {index + 1}
        </div>
        <div className="mt-4">
          <Icon className="w-8 h-8 text-dukka-primary mb-4" />
          <motion.h3 
            className="text-xl font-semibold mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: (index * 0.2) + 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: (index * 0.2) + 0.3 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}

export function HowItWorksSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <section className="bg-gradient-to-b from-white to-dukka-bg py-24" id="how-it-works">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GradientTitle subtitle="Transformez les conversations avec vos clients en ventes avec Dukka, la première solution e-commerce qui s'adapte à la façon dont les Africains aiment acheter.">
            Lancez votre boutique en ligne en 4 étapes simples
          </GradientTitle>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
        </motion.div>
      </div>
    </section>
  )
}