'use client'

import { useState } from 'react'
import { GradientTitle } from '@/components/GradientTitle'
import { Check } from 'lucide-react'
import { useWaitlist } from '@/contexts/WaitlistContext'
import { useRouter } from 'next/navigation'

const plans = [
  {
    name: 'Tambali',
    nameTranslation: 'Démarrage',
    monthlyPrice: 9000,
    yearlyPrice: 7200,
    description: 'La solution idéale pour passer de WhatsApp/Instagram à une vraie boutique en ligne',
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
    description: 'Pour les boutiques qui veulent automatiser leurs ventes et grandir',
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

const faq = [
  {
    question: "Comment fonctionne l'essai gratuit ?",
    answer: "Vous pouvez essayer Dukka gratuitement pendant 1 à 2 mois selon l'offre choisie. Pas de carte bancaire requise pour commencer, vous n'êtes facturé qu'à la fin de la période d'essai."
  },
  {
    question: "Puis-je changer d'offre à tout moment ?",
    answer: "Oui, vous pouvez passer à une offre supérieure à tout moment. Le changement est immédiat et nous vous accompagnons dans la transition."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "Nous acceptons tous les principaux moyens de paiement mobiles africains : Wave, Orange Money, Free Money, MTN Money, et autres solutions locales."
  }
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true)
  const { openWaitlist } = useWaitlist()
  const router = useRouter()

  const handleAction = (actionType: string) => {
    if (actionType === 'waitlist') {
      openWaitlist()
    } else if (actionType === 'contact') {
      router.push('/contact')
    }
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <GradientTitle subtitle="Des offres transparentes adaptées à votre croissance. Commencez gratuitement, évoluez à votre rythme.">
              Choisissez votre offre
            </GradientTitle>
          </div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <div className="pt-12 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center mb-16">
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
                <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                  <span className="font-medium">Économisez 20%</span>
                </span>
              </div>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 transition-all duration-500 ease-out transform hover:-translate-y-1 ${
                  plan.popular
                    ? 'bg-dukka-primary text-white shadow-lg scale-105 my-4'
                    : 'bg-[#F2F2F2] text-gray-900 hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-dukka-dark text-white px-4 py-1 rounded-full text-sm">
                    Le plus populaire
                  </div>
                )}

                <div className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                  plan.popular ? 'bg-white/20' : 'bg-dukka-primary/10 text-dukka-primary'
                }`}>
                  {plan.trialPeriod}
                </div>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-1">
                    <h2 className="text-2xl font-bold">{plan.name}</h2>
                    <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
                      {plan.nameTranslation}
                    </span>
                  </div>
                  
                  {!plan.price ? (
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">
                          {isYearly ? plan.yearlyPrice?.toLocaleString() : plan.monthlyPrice?.toLocaleString()}
                        </span>
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

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-dukka-primary'}`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleAction(plan.cta.action)}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                    plan.popular
                      ? 'bg-white text-dukka-primary hover:bg-gray-100'
                      : 'bg-dukka-primary text-white hover:bg-dukka-dark'
                  }`}
                >
                  {plan.cta.text}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-24">
            <h2 className="text-2xl font-bold text-center mb-12">Questions fréquentes</h2>
            <div className="space-y-4">
              {faq.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Des questions ?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Notre équipe est là pour vous aider à choisir l'offre qui correspond le mieux à vos besoins.
          </p>
          <button
            onClick={() => router.push('/contact')}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-dukka-primary text-dukka-primary font-semibold hover:bg-dukka-primary hover:text-white transition-colors duration-200"
          >
            Parlons de votre projet
          </button>
        </div>
      </section>
    </main>
  )
}