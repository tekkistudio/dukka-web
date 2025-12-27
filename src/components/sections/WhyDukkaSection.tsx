'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Plug, Wrench, Rocket, CheckCircle } from 'lucide-react';

const differentiators = [
  {
    emoji: '🌍',
    icon: Globe,
    title: 'Pensé pour l\'Afrique. Vraiment.',
    description: 'Pas un outil américain "adapté". Chaque solution qu\'on propose est née d\'un problème qu\'on a vécu sur le terrain à Dakar, Abidjan, Kinshasa.',
    highlights: ['Achat conversationnel', 'WhatsApp Marketing', 'Reconciliation paiements'],
    colorClasses: {
      bg: 'bg-gradient-to-br from-emerald-50 to-green-50',
      border: 'border-emerald-200',
      text: 'text-emerald-600',
      highlight: 'bg-emerald-100'
    }
  },
  {
    emoji: '🔌',
    icon: Plug,
    title: 'S\'intègre à ce que vous avez déjà',
    description: 'Vous avez investi dans votre Shopify ou WooCommerce. On ne vous demande pas de tout changer. Nos solutions s\'ajoutent en quelques clics.',
    highlights: ['Shopify', 'WooCommerce', 'Pas de migration'],
    colorClasses: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      highlight: 'bg-blue-100'
    }
  },
  {
    emoji: '🛠️',
    icon: Wrench,
    title: 'Créé par des e-commerçants',
    description: 'On n\'est pas des devs qui imaginent vos problèmes. On les a vécus : +7 000 commandes gérées en Afrique. Chaque outil existe parce qu\'on en avait besoin.',
    highlights: ['11 ans d\'expérience', '2 marques actives', '+50 e-commerçants accompagnés'],
    colorClasses: {
      bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
      border: 'border-orange-200',
      text: 'text-orange-600',
      highlight: 'bg-orange-100'
    }
  },
  {
    emoji: '🚀',
    icon: Rocket,
    title: 'Une suite complète, pas des outils isolés',
    description: 'Conversion, communication, livraison, paiement : tout est pensé pour fonctionner ensemble. Un partenaire qui grandit avec votre business.',
    highlights: ['Chatseller', 'WhatsApp', 'Livraisons', 'Paiements'],
    colorClasses: {
      bg: 'bg-gradient-to-br from-purple-50 to-violet-50',
      border: 'border-purple-200',
      text: 'text-purple-600',
      highlight: 'bg-purple-100'
    }
  }
];

export default function WhyDukkaSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-dukka-blue-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-dukka-orange-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dukka-gray-900 mb-6">
            Pourquoi les e-commerçants africains
            <br />
            <span className="text-dukka-blue">choisissent Dukka</span>
          </h2>
          <p className="text-lg sm:text-xl text-dukka-gray-600 max-w-2xl mx-auto">
            Ce qui nous différencie des autres solutions sur le marché.
          </p>
        </motion.div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${item.colorClasses.bg} ${item.colorClasses.border} border rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start space-x-4">
                {/* Emoji/Icon */}
                <div className="flex-shrink-0">
                  <span className="text-4xl">{item.emoji}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-dukka-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-dukka-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map((highlight, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center text-xs font-medium px-3 py-1 rounded-full ${item.colorClasses.highlight} ${item.colorClasses.text}`}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm text-dukka-gray-600">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-dukka-green" />
              <span>Made in Africa</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-dukka-green" />
              <span>Support en français</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-dukka-green" />
              <span>Équipe disponible sur WhatsApp</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}