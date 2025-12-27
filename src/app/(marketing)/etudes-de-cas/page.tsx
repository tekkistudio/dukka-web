// src/app/(marketing)/etudes-de-cas/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  ShoppingCart,
  Star,
  CheckCircle,
  Users,
  MessageCircle,
  Sparkles
} from 'lucide-react';

// Données des études de cas
const caseStudies = [
  {
    id: '6c-no-filter',
    brand: '6C No Filter',
    logo: '/images/brand-logos/6cnofilter.webp',
    founder: 'Fatou Cissé',
    founderImage: '/images/testimonials/fatou-cisse.jpg',
    location: 'Dakar, Sénégal',
    category: 'Soins corporels naturels',
    description: 'Marque sénégalaise spécialisée dans le traitement des imperfections cutanées avec des produits 100% naturels à base de matières premières africaines.',
    problem: 'Des dizaines de messages WhatsApp par jour de clientes demandant quel produit utiliser contre l\'acné, les taches, l\'hyperpigmentation...',
    results: {
      conversion: '+52%',
      timesSaved: '3h/jour',
      avgCart: '+38%',
      questionsResolved: '91%'
    },
    quote: "Avant Chatseller, je passais mes journées à répondre aux mêmes questions. Maintenant, je me concentre sur le développement de nouveaux produits.",
    color: 'from-amber-500 to-orange-600',
    lightColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  },
  {
    id: 'ahovi-cosmetics',
    brand: 'Ahovi Cosmetics',
    logo: '/images/brand-logos/ahovi.svg',
    founder: 'Katia Koundé',
    founderImage: '/images/testimonials/katia.jpg',
    location: 'Dakar, Sénégal',
    category: 'Soins capillaires & corporels',
    description: 'Marque de soins capillaires et corporels 100% naturels, utilisant des ingrédients africains pour sublimer les cheveux crépus et défrisés.',
    problem: 'Les clientes ont des problématiques capillaires spécifiques (chute de cheveux, tempes dégarnies, cheveux cassants) et veulent des conseils personnalisés.',
    results: {
      conversion: '+78%',
      timesSaved: '2h30/jour',
      avgCart: '+39%',
      questionsResolved: '94%'
    },
    quote: "Les clientes ne se rendent même pas compte que c'est une IA. Elles me disent 'ta conseillère est super'. Chatseller comprend leurs problèmes capillaires mieux que moi parfois !",
    color: 'from-pink-500 to-rose-600',
    lightColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  {
    id: 'exclusiv',
    brand: 'Exclusiv',
    logo: '/images/brand-logos/fav-exclusiv.jpg',
    founder: 'Ibrahima & Becaye Hanne',
    founderImage: '/images/testimonials/hanne.jpg',
    location: 'Dakar, Sénégal',
    category: 'Soins de barbe pour hommes',
    description: 'Marque masculine de soins pour barbe, fondée par deux frères, célébrant l\'élégance et l\'héritage africain à travers des produits naturels.',
    problem: 'Des hommes qui veulent faire pousser leur barbe ou résoudre des problèmes (barbe clairsemée, démangeaisons, pellicules) sans savoir quels produits choisir.',
    results: {
      conversion: '+61%',
      timesSaved: '2h/jour',
      avgCart: '+45%',
      questionsResolved: '89%'
    },
    quote: "Nos clients hommes posent des questions qu'ils n'oseraient jamais poser en boutique. Chatseller les met en confiance et les guide parfaitement.",
    color: 'from-slate-700 to-slate-900',
    lightColor: 'bg-slate-50',
    borderColor: 'border-slate-200'
  }
];

// Métriques globales
const globalMetrics = [
  { value: '+64%', label: 'Conversion moyenne', icon: TrendingUp },
  { value: '2h30', label: 'Gagnées par jour', icon: Clock },
  { value: '+41%', label: 'Panier moyen', icon: ShoppingCart },
  { value: '91%', label: 'Questions résolues', icon: MessageCircle },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-dukka-blue-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-dukka-blue-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-8">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Résultats réels de marques africaines</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dukka-gray-900 mb-6 leading-tight">
              Comment les marques beauté
              <br />
              <span className="text-dukka-blue">augmentent leurs ventes</span>
              <br />
              grâce à Chatseller
            </h1>

            <p className="text-xl text-dukka-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment ces marques sénégalaises ont multiplié leurs conversions 
              et libéré des heures chaque jour grâce à Chatseller.
            </p>
          </motion.div>

          {/* Global Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
          >
            {globalMetrics.map((metric, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <metric.icon className="w-6 h-6 text-dukka-blue mx-auto mb-2" />
                <div className="text-2xl lg:text-3xl font-bold text-dukka-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-dukka-gray-600">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${study.lightColor} rounded-3xl overflow-hidden border ${study.borderColor}`}
              >
                <div className="grid lg:grid-cols-2">
                  {/* Left: Brand Info */}
                  <div className="p-8 lg:p-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden">
                          <Image
                            src={study.logo}
                            alt={study.brand}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">{study.brand}</h2>
                          <p className="text-sm text-gray-600">{study.category}</p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {study.description}
                    </p>

                    {/* Problem */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">
                        Le défi
                      </h4>
                      <p className="text-gray-600 italic">"{study.problem}"</p>
                    </div>

                    {/* Results Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white rounded-xl p-4 text-center">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                          {study.results.conversion}
                        </div>
                        <div className="text-xs text-gray-500">Conversions</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                          {study.results.timesSaved}
                        </div>
                        <div className="text-xs text-gray-500">Gagnées/jour</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                          {study.results.avgCart}
                        </div>
                        <div className="text-xs text-gray-500">Panier moyen</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center">
                        <div className={`text-2xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                          {study.results.questionsResolved}
                        </div>
                        <div className="text-xs text-gray-500">Questions auto</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/etudes-de-cas/${study.id}`}
                      className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${study.color} text-white font-semibold rounded-xl hover:opacity-90 transition-all group`}
                    >
                      <span>Lire l'étude de cas</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Right: Testimonial & Image */}
                  <div className="bg-white p-8 lg:p-10 flex flex-col justify-center">
                    {/* Quote */}
                    <div className="mb-8">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-6">
                        "{study.quote}"
                      </blockquote>
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                          <Image
                            src={study.founderImage}
                            alt={study.founder}
                            width={56}
                            height={56}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{study.founder}</p>
                          <p className="text-sm text-gray-500">Fondateur(rice) de {study.brand}</p>
                        </div>
                      </div>
                    </div>

                    {/* Location Tag */}
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>📍</span>
                      <span>{study.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Results Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dukka-gray-900 mb-4">
              Pourquoi ces résultats ?
            </h2>
            <p className="text-lg text-dukka-gray-600 max-w-2xl mx-auto">
              Ce qui fait la différence avec Chatseller.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Conseils personnalisés',
                description: 'Chatseller comprend la situation de chaque client : "taches depuis ma grossesse", "cheveux cassants depuis mon défrisage". Elle conseille comme une vraie experte.'
              },
              {
                icon: Clock,
                title: 'Disponible 24/7',
                description: '35% des conversations ont lieu entre 21h et 8h. Pendant que vous dormez, Chatseller continue de conseiller et vendre.'
              },
              {
                icon: ShoppingCart,
                title: 'Upsell naturel',
                description: 'Quand le conseil est pertinent, les clientes acceptent les produits complémentaires. Ce n\'est pas perçu comme de la vente forcée.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 bg-dukka-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-dukka-blue" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-dukka-blue via-dukka-blue to-[#1a3a7d]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à obtenir les mêmes résultats ?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
              Rejoignez ces marques et transformez vos conversations en ventes.
              Essai gratuit de 7 jours, sans carte bancaire.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://dashboard.chatseller.app/register"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-dukka-blue font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg group"
              >
                <span>Essayer Chatseller gratuitement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>Nous contacter</span>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 mt-10 text-white/70">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>7 jours gratuits</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Installation en 2 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Support WhatsApp inclus</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
