// src/components/sections/PricingSection.tsx
'use client'

import { useState, useRef } from 'react'
import { Check, AlertCircle } from 'lucide-react'
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
    description: 'Pour les petits commerçants qui souhaitent démarrer leur activité en ligne facilement',
    trialPeriod: '1 mois gratuit',
    features: [
      '1 boutique conversationnelle',
      'Jusqu\'à 50 produits',
      'Vendeur IA standard',
      'Paiements mobile money basiques',
      'Support via WhatsApp',
      '1 compte employé',
      'Interface en français',
      'Statistiques essentielles',
      'Notifications par SMS',
      'Mode Faible Connexion',
      'Formation de démarrage gratuite'
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
    description: 'Pour les boutiques et marques qui veulent développer leurs ventes en ligne',
    trialPeriod: '2 mois gratuits',
    features: [
      'Tout de l\'offre Tambali',
      'Produits illimités',
      'Vendeur IA personnalisé',
      'Assistant IA pour vous guider',
      '3 comptes employés',
      'Tous les moyens de paiement',
      'Support prioritaire',
      'Analytics avancés avec suggestions',
      'Français & Anglais (+ autres langues bientôt)',
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
    description: 'Solutions personnalisées pour grandes marques et entreprises établies',
    trialPeriod: 'Essai personnalisé',
    features: [
      'Tout de l\'offre Tekki',
      'Multi-boutiques',
      '10 comptes employés',
      'Vendeur IA sur mesure',
      'Account manager dédié',
      'Formation équipe complète',
      'Intégrations personnalisées',
      'Intégration langues locales',
      'Connexion API logistique',
      'Support premium 24/7',
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
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
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
      className="h-full"
    >
      <div 
        className={`relative rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500 hover:translate-y-[-4px] ${
          plan.popular
            ? 'shadow-xl border-2 border-dukka-primary translate-y-[-8px]'
            : 'shadow-sm border border-gray-200 hover:shadow-md'
        }`}
      >
        {/* Badge populaire */}
        {plan.popular && (
          <motion.div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-dukka-dark text-white px-4 py-1 rounded-full text-sm font-medium z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: (index * 0.2) + 0.3 }}
          >
            Le plus populaire
          </motion.div>
        )}

        <div className={`p-8 ${plan.popular ? 'bg-gradient-to-br from-dukka-primary to-dukka-dark text-white' : 'bg-white'}`}>
          <div className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
            plan.popular ? 'bg-white/20 text-white' : 'bg-dukka-primary/10 text-dukka-primary'
          }`}>
            {plan.trialPeriod}
          </div>

          {/* En-tête */}
          <div className="mb-6">
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
                    initial={{ opacity: 0, y: -10 }}
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

            <p className={`mt-4 ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
              {plan.description}
            </p>
          </div>

          {/* Features List */}
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: (index * 0.2) + 0.4 + (i * 0.05) }}
                className="flex items-start gap-3"
              >
                <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-dukka-primary'}`} />
                <span className="text-sm">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className={`p-6 mt-auto ${plan.popular ? 'bg-dukka-dark/80 text-white' : 'bg-gray-50 border-t border-gray-100'}`}>
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
        </div>
      </div>
    </motion.div>
  )
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true)
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })
  const ctaRef = useRef(null)
  const isCtaInView = useInView(ctaRef, { once: true })

  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <GradientTitle subtitle="Des offres adaptées à votre croissance, avec des périodes d'essai gratuites. Évoluez à votre rythme.">
            Choisissez votre offre
          </GradientTitle>
        </motion.div>

        {/* Toggle Annuel/Mensuel */}
        <div className="mt-16 mb-12">
          <div className="flex justify-center items-center">
            <div className="bg-gray-100 p-1 rounded-xl inline-flex relative">
              <button
                onClick={() => setIsYearly(false)}
                className={`relative z-10 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  !isYearly 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Mensuel
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`relative z-10 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isYearly 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annuel
              </button>
              <div
                className={`absolute top-1 h-[calc(100%-8px)] transition-all duration-300 ease-in-out bg-dukka-primary rounded-lg ${
                  isYearly ? 'translate-x-[calc(100%-4px)]' : 'translate-x-[4px]'
                }`}
                style={{ width: 'calc(50% - 8px)' }}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard 
              key={plan.name} 
              plan={plan} 
              isYearly={isYearly}
              index={index}
            />
          ))}
        </div>

        {/* Note en bas des prix */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-full">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">
              Tous les prix incluent l'hébergement, les mises à jour et le support technique.
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gray-50 rounded-2xl p-8 text-center max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3 text-left">
              <h3 className="text-2xl font-bold mb-4">Vous n'êtes pas sûr de l'offre qui vous convient ?</h3>
              <p className="text-gray-600">
                Notre équipe est là pour vous aider à choisir la solution qui correspond le mieux 
                à votre business et à vos objectifs de croissance.
              </p>
            </div>
            <div className="md:w-1/3">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-dukka-primary text-dukka-primary font-semibold hover:bg-dukka-primary hover:text-white transition-colors duration-200"
              >
                Parlons de votre projet
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}