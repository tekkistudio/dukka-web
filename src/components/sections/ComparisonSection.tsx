// src/components/sections/ComparisonSection.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, ChevronRight } from 'lucide-react'
import { GradientTitle } from '@/components/GradientTitle'
import { useWaitlist } from '@/contexts/WaitlistContext'
import Image from 'next/image'

// Définition des types pour une meilleure inférence TypeScript
type FeaturePoint = {
  text: string;
  isPositive: boolean;
};

type PlatformFeatures = {
  title: string;
  points: FeaturePoint[];
};

type CategoryFeatures = {
  [platform: string]: PlatformFeatures;
};

type FeaturesData = {
  [category: string]: CategoryFeatures;
};

const features: FeaturesData = {
  'Coûts & Paiements': {
    'Shopify': {
      title: 'Cher et peu adapté',
      points: [
        { text: '21 000 FCFA/mois minimum', isPositive: false },
        { text: 'Pas de paiements mobile money', isPositive: false },
        { text: 'Thèmes et Extensions coûteux', isPositive: false },
        { text: 'Carte bancaire internationale exigée', isPositive: false },
        { text: 'Commission sur les ventes par CB', isPositive: false }
      ]
    },
    'Dukka': {
      title: 'Accessible et adapté',
      points: [
        { text: 'À partir de 12 000 FCFA/mois', isPositive: true },
        { text: 'Paiements mobiles africains intégrés', isPositive: true },
        { text: 'Pas besoin de carte bancaire', isPositive: true },
        { text: 'Pas de frais cachés', isPositive: true },
        { text: 'Pas de commission sur les ventes', isPositive: true }
      ]
    },
    'WooCommerce': {
      title: 'Coûts variables et imprévisibles',
      points: [
        { text: 'Coût initial élevé (développeur)', isPositive: false },
        { text: 'Plugins payants nécessaires', isPositive: false },
        { text: 'Hébergement à payer en plus', isPositive: false },
        { text: 'Maintenance technique régulière', isPositive: false },
        { text: 'Extensions parfois payantes', isPositive: false }
      ]
    }
  },
  'Facilité d\'utilisation': {
    'Shopify': {
      title: 'Complexe pour les débutants',
      points: [
        { text: 'Parcours d\'achat compliqué pour les clients', isPositive: false },
        { text: 'Configuration complexe de la boutique', isPositive: false },
        { text: 'Interface trop sophistiquée', isPositive: false },
        { text: 'Nécessite souvent une agence', isPositive: false },
        { text: 'Gestion logistique inadaptée à l\'Afrique', isPositive: false }
      ]
    },
    'Dukka': {
      title: 'Simple et intuitif',
      points: [
        { text: 'Parcours d\'achat conversationnel', isPositive: true },
        { text: 'Création de boutique en quelques clics', isPositive: true },
        { text: 'Interface intuitive, même pour débutants', isPositive: true },
        { text: 'Pas besoin de compétences techniques', isPositive: true },
        { text: 'Assistant IA disponible 24/7', isPositive: true },
        { text: 'Gestion logistique adaptée à l\'Afrique', isPositive: true }
      ]
    },
    'WooCommerce': {
      title: 'Très technique',
      points: [
        { text: 'Nécessite un développeur WordPress', isPositive: false },
        { text: 'Interface technique complexe', isPositive: false },
        { text: 'Compétences techniques exigées', isPositive: false },
        { text: 'Gestion compliquée au quotidien', isPositive: false },
        { text: 'Beaucoup de paramétrages techniques', isPositive: false }
      ]
    }
  },
  'Adaptation à l\'Afrique': {
    'Shopify': {
      title: 'Solution occidentale',
      points: [
        { text: 'Non adapté aux marchés africains', isPositive: false },
        { text: 'Méconnaissance des réalités locales', isPositive: false },
        { text: 'Support en anglais principalement', isPositive: false },
        { text: 'Dépendance au système bancaire', isPositive: false },
        { text: 'Pas optimisé pour faibles connexions', isPositive: false }
      ]
    },
    'Dukka': {
      title: 'Créé pour l\'Afrique',
      points: [
        { text: 'Vendeur IA qui parle comme au marché', isPositive: true },
        { text: 'Assistant IA pour vous guider', isPositive: true },
        { text: 'Support WhatsApp en français', isPositive: true },
        { text: 'Sites rapides, même en 2G/3G', isPositive: true },
        { text: 'Équipe locale qui comprend vos défis', isPositive: true }
      ]
    },
    'WooCommerce': {
      title: 'Solution généraliste',
      points: [
        { text: 'Non adapté aux habitudes locales', isPositive: false },
        { text: 'Support via forums en anglais', isPositive: false },
        { text: 'Performance selon votre hébergeur', isPositive: false },
        { text: 'Pas d\'aide à la vente conversationnelle', isPositive: false },
        { text: 'Aucun accompagnement local', isPositive: false }
      ]
    }
  }
};

const platforms = ['Shopify', 'Dukka', 'WooCommerce'];
const categories = Object.keys(features);

export function ComparisonSection() {
  const [activeCategory, setActiveCategory] = useState<string>('Coûts & Paiements');
  const { openWaitlist } = useWaitlist();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const logoRef = useRef(null);
  const isLogoInView = useInView(logoRef, { once: true });

  return (
    <section id="comparison" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <GradientTitle subtitle="Dukka est la première solution e-commerce réellement adaptée aux besoins spécifiques des consommateurs et marchands africains.">
            Voici pourquoi Dukka est différent et unique
          </GradientTitle>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto py-2">
          <div className="inline-flex rounded-xl p-1 bg-gray-100 shadow-inner">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-dukka-primary text-white shadow-md'
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
              className={`rounded-xl overflow-hidden ${
                platform === 'Dukka'
                  ? 'transform md:scale-105 shadow-xl relative z-10'
                  : 'shadow-sm'
              }`}
            >
              <div className={`p-6 ${
                platform === 'Dukka' ? 'bg-dukka-primary' : 'bg-white'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${
                    platform === 'Dukka' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {platform}
                  </h3>
                  {platform === 'Dukka' && (
                    <div className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Recommandé
                    </div>
                  )}
                </div>
                <p className={`text-sm mb-6 ${
                  platform === 'Dukka' ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {features[activeCategory]?.[platform]?.title}
                </p>
                <ul className="space-y-4">
                  {features[activeCategory]?.[platform]?.points.map((point: FeaturePoint, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      {platform === 'Dukka' || point.isPositive ? (
                        <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          platform === 'Dukka' ? 'text-white' : 'text-green-500'
                        }`} />
                      ) : (
                        <X className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-500" />
                      )}
                      <span className={`text-sm ${
                        platform === 'Dukka' 
                          ? 'text-white' 
                          : point.isPositive ? 'text-gray-800' : 'text-gray-600'
                      }`}>
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {platform === 'Dukka' ? (
                <div className="p-6 bg-dukka-dark text-white">
                  <button
                    onClick={openWaitlist}
                    className="w-full px-6 py-3 bg-white text-dukka-primary font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    Rejoindre la liste d'attente
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <div className="text-center text-sm text-gray-500">
                    {platform === 'Shopify' ? 
                      'Solution occidentale peu adaptée' : 
                      'Solution technique complexe'}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-dukka-primary/5 to-dukka-primary/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Créé spécifiquement pour les commerçants africains</h3>
            <p className="text-gray-600 mb-6">
            Notre mission chez Dukka est de simplifier la manière dont vous vendez et vos clients achètent en ligne.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Pas de compétence technique requise
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Tout inclus dans votre abonnement
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Support local disponible via WhatsApp
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}