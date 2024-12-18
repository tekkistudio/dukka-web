'use client'

import { GradientTitle } from '@/components/GradientTitle'
import { 
  MessageSquare, 
  CreditCard, 
  BarChart3, 
  Globe, 
  ShieldCheck, 
  Smartphone 
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const features = [
  {
    Icon: MessageSquare,
    title: 'Expérience conversationnelle',
    description: 'Un vendeur virtuel qui parle à vos clients dans leur langue, répond à leurs questions 24/7 et les guide naturellement vers l\'achat, comme au marché.',
    color: 'text-blue-600'
  },
  {
    Icon: CreditCard,
    title: 'Paiements locaux',
    description: 'Acceptez tous les paiements locaux (Wave, Orange Money, MTN Money, etc.) sans configuration complexe. Vos clients paient comme ils en ont l\'habitude.',
    color: 'text-green-600'
  },
  {
    Icon: BarChart3,
    title: 'Analytics adaptés',
    description: 'Un assistant IA intégré à votre espace marchand vous explique les performances de votre business et vous guide pour augmenter vos ventes, même si vous êtes débutant(e).',
    color: 'text-purple-600'
  },
  {
    Icon: Globe,
    title: 'Mode Faible Connexion',
    description: 'Ne perdez plus de ventes à cause d\'une mauvaise connexion. Votre boutique en ligne continue de fonctionner même quand internet ne suit pas.',
    color: 'text-orange-600'
  },
  {
    Icon: ShieldCheck,
    title: 'Sécurité renforcée',
    description: 'Vos données et celles de vos clients sont protégées aux standards internationaux, pour des transactions en toute sécurité et en toute confiance.',
    color: 'text-red-600'
  },
  {
    Icon: Smartphone,
    title: 'Multi-support',
    description: 'Votre boutique en ligne s\'adapte parfaitement à tous les écrans, pour une expérience d\'achat fluide, peu importe les appareils de vos clients.',
    color: 'text-indigo-600'
  }
]

function FeatureCard({ Icon, title, description, color, index }: any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1, 
        ease: [0.21, 1.11, 0.81, 0.99]
      }}
    >
      <div className="p-6 bg-[#F2F2F2] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <div className={`rounded-lg w-12 h-12 flex items-center justify-center ${color} bg-opacity-10 mb-6`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ 
              duration: 0.4,
              delay: (index * 0.1) + 0.2,
              type: "spring",
              stiffness: 200
            }}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </motion.div>
        </div>
        <motion.h3 
          className="text-xl font-semibold mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.4, delay: (index * 0.1) + 0.3 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.4, delay: (index * 0.1) + 0.4 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <section className="py-24" id="features">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GradientTitle subtitle="Dukka vous offre une solution complète qui s'adapte à votre façon de vendre et à la façon dont vos clients aiment acheter.">
          Tout ce qu'il vous faut pour vendre plus en ligne
          </GradientTitle>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a
            href="/fonctionnalites"
            className="inline-flex items-center text-dukka-primary hover:text-dukka-dark font-semibold"
          >
            Découvrir toutes les fonctionnalités
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}