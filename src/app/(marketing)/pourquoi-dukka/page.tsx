'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GradientTitle } from '@/components/GradientTitle'
import { useWaitlist } from '@/contexts/WaitlistContext'
import { Check, X, ArrowRight } from 'lucide-react'

const features = {
  'Coûts & Paiements': {
    'Shopify': {
      title: 'Cher et peu adapté',
      points: [
        '21 000 FCFA/mois minimum',
        'Pas de paiements mobile money',
        'Thèmes et Applications coûteux',
        'Carte bancaire exigée',
        'Commission sur les ventes par CB'
      ]
    },
    'Dukka': {
      title: 'Accessible et adapté',
      points: [
        'À partir de 9 000 FCFA/mois',
        'Paiement mobiles intégrés',
        'Pas besoin de carte bancaire',
        'Pas de frais cachés',
        'Pas de commission sur les ventes'
      ]
    },
    'WooCommerce': {
      title: 'Coûts variables',
      points: [
        'Coût initial élevé (développeur)',
        'Plugins payants nécessaires',
        'Hébergement à payer en plus',
        'Maintenance régulière exigée',
        'Extensions parfois payantes'
      ]
    }
  },
  'Facilité d\'utilisation': {
    'Shopify': {
      title: 'Complexe pour les débutants',
      points: [
        'Parcours d\'achat compliqué pour les clients',
        'Configuration complexe de la boutique',
        'Interface trop sophistiquée pour débutants',
        'Nécessite souvent une agence',
        'Manque de support pour les Africains',
        'Gestion logistique inadaptée à l\'Afrique'
      ]
    },
    'Dukka': {
      title: 'Simple et intuitif',
      points: [
        'Parcours d\'achat adapté à l\'Afrique',
        'Création de boutique simplifiée',
        'Interface intuitive, même pour débutants',
        'Pas besoin de compétences techniques',
        'Gestion facile au quotidien',
        'Assistant AI disponible 24/7'
      ]
    },
    'WooCommerce': {
      title: 'Très technique',
      points: [
        'Parcours d\'achat compliqué pour les clients',
        'Boutique nécessite un développeur',
        'Interface technique et trop complexe',
        'Compétences techniques fortement exigées',
        'Gestion compliquée au quotidien',
        'Beaucoup de paramétrages compliqués'
      ]
    }
  },
  'Adapté à l\'Afrique': {
    'Shopify': {
      title: 'Solution occidentale',
      points: [
        'Non adapté aux marchés africains',
        'Méconnaissance des besoins locaux',
        'Support en anglais uniquement',
        'Dépendance au système bancaire',
        'Pas de support local'
      ]
    },
    'Dukka': {
      title: 'Créé pour l\'Afrique',
      points: [
        'Vendeur IA qui parle au client',
        'Assistant IA qui aide le vendeur',
        'Support WhatsApp en français',
        'Sites rapides, même en 2G/3G',
        'Équipe locale disponible'
      ]
    },
    'WooCommerce': {
      title: 'Solution généraliste',
      points: [
        'Non adapté aux habitudes locales',
        'Support via forums en anglais',
        'Performance selon hébergeur',
        'Pas d\'aide à la vente',
        'Aucun accompagnement'
      ]
    }
  }
};

const challenges = [
  {
    title: "L'e-commerce traditionnel ne correspond pas à l'Afrique",
    description: "Les solutions existantes imposent un parcours d'achat transactionnnel qui ne correspond pas aux habitudes des consommateurs africains.",
    solutions: [
      "Dukka intègre la conversation dans l'expérience d'achat",
      "Interface adaptée aux habitudes locales",
      "Intégration des paiements mobiles"
    ]
  },
  {
    title: "Les coûts sont inadaptés aux marchés africains",
    description: "Les solutions comme Shopify sont trop chères et exigent des moyens de paiement que peu de consommateurs en Afrique utilisent.",
    solutions: [
      "Dukka propose une tarification adaptée aux marchés africains",
      "Pas de frais cachés ni de commission",
      "Paiement en monnaie locale"
    ]
  },
  {
    title: "La complexité technique est un frein pour les commerçants",
    description: "Créer, gérer et développer une boutique en ligne nécessite souvent des compétences techniques ou l'intervention d'une agence spécialisée.",
    solutions: [
      "Dukka propose aux vendeurs une interface simple et intuitive",
      "Pas besoin de compétences techniques",
      "Assistant IA pour guider les vendeurs"
    ]
  }
];

const faq = [
  {
    question: "En quoi Dukka est différent des autres solutions e-commerce ?",
    answer: "Dukka est conçu spécifiquement pour le marché africain. Nous réinventons l'expérience de vente et d'achat en ligne pour la rapprocher des pratiques culturelles africaines. Nous proposons une approche conversationnelle de la vente, l'intégration des moyens de paiement locaux, et une interface adaptée aux habitudes d'achat africaines."
  },
  {
    question: "Ai-je besoin de compétences techniques pour utiliser Dukka ?",
    answer: "Non, Dukka est conçu pour être utilisé sans aucune compétence technique. Notre interface intuitive et notre Assistant IA vous guident dans toutes les étapes."
  },
  {
    question: "Comment Dukka gère-t-il les paiements ?",
    answer: "Dukka intègre nativement les solutions de paiement mobile populaires en Afrique (Wave, Orange Money, etc.), sans nécessiter de compte bancaire ou de carte de crédit."
  },
  {
    question: "Quel support est disponible avec Dukka ?",
    answer: "Vous bénéficiez d'un support local en français et en langue locale via WhatsApp, d'un Assistant IA disponible 24/7, et de formations gratuites pour optimiser votre boutique."
  }
];

export default function WhyDukkaPage() {
  const [activeTab, setActiveTab] = useState('Coûts & Paiements');
  const { openWaitlist } = useWaitlist();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-blue-50/50" ref={heroRef}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <GradientTitle subtitle="Choisir Dukka, c'est choisir de vendre comme les Africains aiment acheter">
              Pourquoi choisir Dukka ?
            </GradientTitle>
          </motion.div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">
              L'e-commerce en Afrique mérite mieux que des solutions occidentales inadaptées
            </h2>
            <p className="text-gray-600 text-lg">
              Découvrez comment Dukka répond aux véritables défis des e-commerçants africains
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold mb-4">{challenge.title}</h3>
                <p className="text-gray-600 mb-6">{challenge.description}</p>
                <div className="space-y-3">
                  {challenge.solutions.map((solution, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-dukka-primary flex-shrink-0" />
                      <span className="text-sm">{solution}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Une comparaison détaillée
            </h2>
            <p className="text-gray-600 text-lg">
              Si vous vendez en Afrique, Dukka est votre meilleur choix.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg p-1 bg-white shadow-sm">
              {Object.keys(features).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === category
                      ? 'bg-dukka-primary text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Shopify', 'Dukka', 'WooCommerce'].map((platform) => (
              <div
                key={platform}
                className={`rounded-xl p-6 ${
                  platform === 'Dukka'
                    ? 'bg-dukka-primary text-white transform scale-105 shadow-xl'
                    : 'bg-white shadow-sm'
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${
                  platform === 'Dukka' ? 'text-white' : 'text-gray-900'
                }`}>
                  {platform}
                </h3>
                <p className={`text-sm mb-6 ${
                  platform === 'Dukka' ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {features[activeTab][platform].title}
                </p>
                <ul className="space-y-4">
                  {features[activeTab][platform].points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      {platform === 'Dukka' ? (
                        <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-white" />
                      ) : (
                        <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
                      )}
                      <span className={`text-sm ${
                        platform === 'Dukka' 
                          ? 'text-white' 
                          : 'text-gray-600'
                      }`}>
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Questions fréquentes
            </h2>
            <p className="text-gray-600 text-lg">
              Tout ce que vous devez savoir sur Dukka
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faq.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm"
                >
                  <h3 className="font-bold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à vendre comme l'Afrique aime acheter ?
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Rejoignez les commerçants et marques qui ont déjà choisi Dukka
            </p>
            <button
              onClick={openWaitlist}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-dukka-primary text-white font-semibold hover:bg-dukka-dark transition-colors"
            >
              Rejoindre la liste d'attente
            </button>
            <p className="mt-4 text-sm text-gray-500">
                Pas de compétence technique requise • Tout inclus • Support local disponible
              </p>
          </div>
        </div>
      </section>
    </main>
  )
}