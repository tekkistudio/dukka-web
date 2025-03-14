// src/components/sections/FeaturesSection.tsx
'use client'

import { GradientTitle } from '@/components/GradientTitle'
import { 
  MessageSquare, 
  CreditCard, 
  BarChart3, 
  Wifi, 
  ShieldCheck, 
  Smartphone,
  Users,
  BadgePercent
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    Icon: MessageSquare,
    title: 'Expérience conversationnelle',
    description: 'Un vendeur IA accueille vos clients, répond à leurs questions 24/7 et les guide naturellement vers l\'achat, comme dans une boutique physique.',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    Icon: CreditCard,
    title: 'Paiements locaux',
    description: 'Acceptez les paiements par mobiles money (Wave, Orange Money, MTN Money, etc.) et cartes bancaires sans configuration complexe. Vos clients paient comme ils en ont l\'habitude.',
    color: 'bg-green-100 text-green-600'
  },
  {
    Icon: BarChart3,
    title: 'Analytics intelligents',
    description: 'Un assistant IA intégré à votre espace marchand vous explique les performances de votre business et vous guide pour optimiser vos résultats et augmenter vos ventes, même si vous êtes débutant(e).',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    Icon: Wifi,
    title: 'Mode Faible Connexion',
    description: 'Ne perdez plus de ventes à cause d\'une mauvaise connexion Internet. Votre boutique en ligne continue de fonctionner parfaitement même sur les réseaux 2G/3G ou instables.',
    color: 'bg-orange-100 text-orange-600'
  },
  {
    Icon: ShieldCheck,
    title: 'Sécurité adaptée',
    description: 'La sécurité de votre site est une priorité chez Dukka. Vos données et celles de vos clients sont protégées aux standards internationaux, pour des transactions en toute sécurité et en toute confiance.',
    color: 'bg-red-100 text-red-600'
  },
  {
    Icon: Smartphone,
    title: 'Affichage sur tous les écrans',
    description: 'Votre boutique en ligne s\'adapte parfaitement à tous les appareils, pour une expérience d\'achat fluide et agréable, même sur les Smartphones bas de gamme.',
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    Icon: Users,
    title: 'Support humain local',
    description: 'Parce qu\'être proche de vous est important pour nous, nos équipes, basées en Afrique, sont disponible via WhatsApp, appel et e-mail, pour vous accompagner dans votre réussite en ligne.',
    color: 'bg-pink-100 text-pink-600'
  },
  {
    Icon: BadgePercent,
    title: 'Sans commission sur vos ventes',
    description: 'Contrairement à d\'autres solutions, Dukka ne prend aucune commission sur vos ventes. Vous ne payez qu\'un abonnement fixe, sans mauvaise surprise.',
    color: 'bg-teal-100 text-teal-600'
  }
]

function FeatureCard({ feature, index }: { feature: any, index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { Icon, title, description, color } = feature

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
      className="group"
    >
      <div className="h-full p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div className={`rounded-full w-12 h-12 flex items-center justify-center ${color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

export function FeaturesSection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const isLeftColInView = useInView(leftColRef, { once: true })
  const isRightColInView = useInView(rightColRef, { once: true })

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="features">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GradientTitle subtitle="Dukka intègre tout ce dont vous avez besoin pour réussir dans la vente en ligne : de la création de votre boutique en ligne jusqu'au développement de vos ventes.">
            Tout ce qu'il vous faut pour vendre plus en ligne
          </GradientTitle>
        </motion.div>

        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <motion.div 
              ref={leftColRef}
              className="md:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={isLeftColInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Conçu pour l'Afrique</h3>
              <p className="text-gray-600 mb-8">
                Dukka est né d'une observation simple : en Afrique, l'achat n'est pas qu'une simple transaction. C'est avant tout une conversation. Nous avons créé une solution qui respecte cette réalité culturelle.
              </p>
              <ul className="space-y-3">
                {['Interface inspirée des habitudes locales', 'Paiements mobiles africains intégrés', 'Optimisé pour les réseaux 2G/3G', 'Support dans les langues locales'].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isLeftColInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-dukka-primary" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              ref={rightColRef}
              className="md:col-span-2 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isRightColInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative bg-gradient-to-br from-dukka-primary/5 to-dukka-primary/10 rounded-2xl p-6 overflow-hidden">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/2">
                    <Image 
                      src="/images/hero/mockup-dukka.png"
                      alt="Interface Dukka"
                      width={400}
                      height={600}
                      className="object-cover rounded-xl shadow-lg"
                    />
                  </div>
                  <div className="w-full md:w-1/2 space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900">L'achat devient une conversation</h4>
                    <p className="text-gray-600">
                      Dukka transforme l'achat en ligne en une expérience conversationnelle qui ressemble aux interactions dans une boutique physique.
                    </p>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="flex gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">C</span>
                        </div>
                        <div className="bg-gray-100 rounded-lg py-2 px-3 text-sm">
                          Cette robe est disponible en quelle taille ?
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-dukka-primary/20 flex items-center justify-center">
                          <span className="text-dukka-primary font-medium">D</span>
                        </div>
                        <div className="bg-dukka-primary/10 rounded-lg py-2 px-3 text-sm">
                          Elle est disponible en S, M, L et XL. Quelle taille vous intéresse ?
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div 
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-dukka-primary/10 rounded-full blur-xl z-0"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
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
            className="inline-flex items-center text-dukka-primary hover:text-dukka-dark font-semibold group transition-all duration-300"
          >
            Découvrir toutes les fonctionnalités
            <svg
              className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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