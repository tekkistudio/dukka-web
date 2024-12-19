'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { GradientTitle } from '@/components/GradientTitle'
import { useWaitlist } from '@/contexts/WaitlistContext'

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
        'Assistant AI disponible 24/7',
        'Gestion logistique adaptée à l\'Afrique'
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

const platforms = ['Shopify', 'Dukka', 'WooCommerce'];
const categories = Object.keys(features);

export function ComparisonSection() {
  const [activeCategory, setActiveCategory] = useState('Coûts & Paiements');
  const { openWaitlist } = useWaitlist();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <GradientTitle subtitle="Choisir Dukka, c'est choisir de vendre comme l'Afrique aime acheter">
            Pourquoi Dukka est différent ?
          </GradientTitle>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg p-1 bg-gray-100">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-dukka-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-xl p-6 ${
                platform === 'Dukka'
                  ? 'bg-dukka-primary text-white transform scale-105 shadow-xl'
                  : 'bg-gray-50'
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
                {features[activeCategory][platform].title}
              </p>
              <ul className="space-y-4">
                {features[activeCategory][platform].points.map((point, i) => (
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
              
              {platform === 'Dukka' && (
                <button
                  onClick={openWaitlist}
                  className="w-full mt-8 px-6 py-3 bg-white text-dukka-primary font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Rejoindre la liste d'attente
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-6">
          Une solution créée spécifiquement pour les commerçants africains
          </p>
          <p className="text-sm text-gray-500">
            Pas de compétence technique requise • Tout inclus • Support local disponible
          </p>
        </motion.div>
      </div>
    </section>
  )
}