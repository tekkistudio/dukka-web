'use client'

import { useState, useRef } from 'react'
import { Check } from 'lucide-react'
import { GradientTitle } from '@/components/GradientTitle'
import { motion, useInView } from 'framer-motion'
import { useWaitlist } from '@/contexts/WaitlistContext'
import { useRouter } from 'next/navigation'

const plans = [
  {
    name: 'Tambali',
    nameTranslation: 'Démarrage',
    monthlyPrice: 9000,
    yearlyPrice: 7200,
    description: 'Idéal pour passer de WhatsApp/Instagram à une vraie boutique en ligne',
    trialPeriod: '1 mois gratuit',
    features: [
      '1 boutique en ligne',
      'Jusqu\'à 50 produits',
      'Chatbot standard',
      'Paiements mobile money basiques',
      'Support technique via WhatsApp',
      '1 compte employé',
      'Interface en français',
      'Statistiques basiques',
      'Notifications par SMS',
      'Mode Faible Connexion',
      'Formation de démarrage gratuite',
      'Protection contre la fraude'
    ],
    cta: {
      text: 'Rejoindre la liste d\'attente',
      action: 'waitlist'
    },
    popular: false
  },
  {
    name: 'Tekki',
    nameTranslation: 'Croissance',
    monthlyPrice: 12000,
    yearlyPrice: 9600,
    description: 'Pour les boutiques et marques qui veulent automatiser leurs ventes et grandir',
    trialPeriod: '2 mois gratuits',
    features: [
      'Tout de l\'offre Tambali',
      'Produits illimités',
      'Vendeur IA personnalisé',
      'Assistant IA intégré',
      '3 comptes employés',
      'Tous les moyens de paiement',
      'Support prioritaire',
      'Analytics avancés',
      'Français & Anglais',
      'Session de formation incluse',
      'Export des données',
      'Intégrations avancées'
    ],
    cta: {
      text: 'Rejoindre la liste d\'attente',
      action: 'waitlist'
    },
    popular: true
  },
  {
    name: 'Jambar',
    nameTranslation: 'Entreprise',
    price: 'Sur mesure',
    description: 'Solutions personnalisées pour marques établies et grands comptes',
    trialPeriod: 'Essai sur mesure',
    features: [
      'Tout de l\'offre Tekki',
      'Multi-boutiques',
      '10 comptes employés',
      'Vendeur IA sur mesure',
      'Account manager dédié',
      'Formation équipe complète',
      'Intégrations personnalisées',
      'Intégration Langues locales',
      'Connexion API Logistique',
      'Support premium garanti 24/7',
      'Statistiques personnalisées',
      'Déploiement dédié'
    ],
    startingAt: 'À partir de 70 000 FCFA/mois',
    cta: {
      text: 'Nous contacter',
      action: 'contact'
    },
    popular: false
  }
];

function PricingCard({ plan, isYearly, index }: any) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true })
  const { openWaitlist } = useWaitlist()
  const router = useRouter()

  const handleCtaClick = () => {
    if (plan.cta.action === 'waitlist') {
      openWaitlist()
    } else if (plan.cta.action === 'contact') {
      router.push('/contact')
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.21, 1.11, 0.81, 0.99]
      }}
      className={`relative rounded-2xl p-8 transition-all duration-500 hover:translate-y-[-4px] ${
        plan.popular
          ? 'bg-dukka-primary text-white shadow-lg translate-y-[-8px]'
          : 'bg-[#F2F2F2] text-gray-900 hover:shadow-md'
      }`}
    >
      {/* Badge populaire */}
      {plan.popular && (
        <motion.div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-dukka-dark text-white px-4 py-1 rounded-full text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ delay: (index * 0.2) + 0.3 }}
        >
          Le plus populaire
        </motion.div>
      )}

      <div className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
        plan.popular ? 'bg-white/20' : 'bg-dukka-primary/10 text-dukka-primary'
      }`}>
        {plan.trialPeriod}
      </div>

      {/* En-tête */}
      <div className="mb-8">
        <div className="flex items-baseline gap-2 mb-1">
          <h3 className="text-2xl font-bold">{plan.name}</h3>
          <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
            {plan.nameTranslation}
          </span>
        </div>

        {/* Prix */}
        {plan.price !== 'Sur mesure' ? (
          <div>
            <div className="flex items-baseline gap-1">
              <motion.span 
                className="text-4xl font-bold"
                key={isYearly ? 'yearly' : 'monthly'}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isYearly ? plan.yearlyPrice?.toLocaleString() : plan.monthlyPrice?.toLocaleString()}
              </motion.span>
              <span className={`${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                FCFA/mois
              </span>
            </div>
            {isYearly && (
              <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                Facturé annuellement
              </p>
            )}
          </div>
        ) : (
          <div>
            <p className="text-3xl font-bold">{plan.price}</p>
            <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
              {plan.startingAt}
            </p>
          </div>
        )}

        <p className={`mt-4 ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
          {plan.description}
        </p>
      </div>

      {/* Features List */}
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature: string, i: number) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: (index * 0.2) + 0.4 + (i * 0.1) }}
            className="flex items-start gap-3"
          >
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-dukka-primary'}`} />
            <span className="text-sm">{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.button
        onClick={handleCtaClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
          plan.popular
            ? 'bg-white text-dukka-primary hover:bg-gray-100'
            : 'bg-dukka-primary text-white hover:bg-dukka-dark'
        }`}
      >
        {plan.cta.text}
      </motion.button>
    </motion.div>
  )
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <GradientTitle subtitle="Des offres adaptées à votre croissance. Testez gratuitement, évoluez à votre rythme.">
            Choisissez votre offre
          </GradientTitle>
        </motion.div>

        {/* Toggle Annuel/Mensuel */}
        <div className="mt-24 mb-12">
          <div className="flex justify-center items-center">
            <div className="bg-gray-100 p-1 rounded-xl inline-flex relative">
              <button
                onClick={() => setIsYearly(false)}
                className={`relative z-10 px-6 py-2 rounded-lg text-sm transition-all duration-300 ${
                  !isYearly 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`relative z-10 px-6 py-2 rounded-lg text-sm transition-all duration-300 ${
                  isYearly 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annuel
              </button>
              <div
                className={`absolute top-1 h-[calc(100%-8px)] transition-all duration-300 ease-in-out bg-dukka-primary rounded-lg ${
                  isYearly ? 'translate-x-full' : 'translate-x-0'
                }`}
                style={{ width: 'calc(50% - 4px)', left: '4px' }}
              />
            </div>
            {isYearly && (
              <div className="ml-3">
                <motion.span 
                  className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-medium">Économisez 20%</span>
                </motion.span>
              </div>
            )}
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              isYearly={isYearly}
              index={index}
            />
          ))}
        </div>

        {/* FAQ et CTA */}
        <div className="mt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-6">Des questions ?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Notre équipe est là pour vous aider à choisir l'offre qui correspond le mieux à vos besoins.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-dukka-primary text-dukka-primary font-semibold hover:bg-dukka-primary hover:text-white transition-colors duration-200"
            >
              Parlons de votre projet
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}