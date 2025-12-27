// src/app/(marketing)/etudes-de-cas/ahovi-cosmetics/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  TrendingUp,
  ShoppingCart,
  MessageCircle,
  Star,
  Quote,
  Users,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';

export default function AhoviCosmeticsCaseStudy() {
  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-16 overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-pink-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-rose-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">
          {/* Back Link */}
          <Link 
            href="/etudes-de-cas"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Toutes les études de cas</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Brand Header */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/brand-logos/ahovi.svg"
                  alt="Ahovi Cosmetics"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Ahovi Cosmetics</h1>
                <p className="text-gray-600">Soins capillaires & corporels naturels • Dakar, Sénégal</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Résumé</h2>
              <p className="text-gray-700 leading-relaxed">
                Ahovi Cosmetics, marque sénégalaise de soins capillaires et corporels 100% naturels, 
                a augmenté son taux de conversion de <span className="font-bold text-pink-600">+78%</span> et 
                libéré <span className="font-bold text-pink-600">2h30 par jour</span> grâce à Chatseller. 
                La fondatrice Katia Koundé peut désormais accompagner ses clientes sans passer des heures 
                à expliquer les mêmes routines capillaires.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: '+78%', label: 'Taux de conversion', sublabel: 'vs visiteurs sans IA', icon: TrendingUp },
                { value: '2h30', label: 'Gagnées par jour', sublabel: 'sur les réponses WhatsApp', icon: Clock },
                { value: '+39%', label: 'Panier moyen', sublabel: 'grâce aux recommandations', icon: ShoppingCart },
                { value: '94%', label: 'Questions résolues', sublabel: 'sans intervention humaine', icon: MessageCircle },
              ].map((metric, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                  <metric.icon className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm font-medium text-gray-700">{metric.label}</div>
                  <div className="text-xs text-gray-500">{metric.sublabel}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Context */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">La marque</h2>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <strong>Ahovi Cosmetics</strong> (Ahôvï Beauty Cosmetics) est une marque sénégalaise 
                  qui puise dans la richesse des ingrédients africains pour créer des soins capillaires 
                  et corporels alliant savoir traditionnel et approche scientifique. Fondée par Katia Koundé, 
                  la marque propose des produits 100% naturels pour sublimer les cheveux crépus et défrisés.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Du Lait Capillaire Hydratant à la Brume Anti-Chute, en passant par la célèbre 
                  Douceur d'Hibiscus (chantilly capillaire), Ahovi Cosmetics offre une gamme complète 
                  pour les femmes africaines qui veulent prendre soin de leurs cheveux naturellement.
                </p>

                <div className="bg-pink-50 rounded-xl p-5 border border-pink-100">
                  <h4 className="font-semibold text-gray-900 mb-3">En chiffres</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-pink-500" />
                      <span><strong>+15 produits</strong> capillaires et corporels</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-pink-500" />
                      <span><strong>Prix :</strong> 3 500 - 8 000 FCFA</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-pink-500" />
                      <span><strong>100% naturel</strong>, ingrédients africains</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-pink-500" />
                      <span><strong>Livraison :</strong> 24h Dakar, 48h régions</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/case-studies/ahovi-cosmetics/product.png"
                    alt="Produits Ahovi Cosmetics"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 lg:py-20 bg-red-50">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Le problème</h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-100 mb-8">
              <div className="flex items-start space-x-4 mb-6">
                <Quote className="w-8 h-8 text-red-400 flex-shrink-0" />
                <blockquote className="text-lg text-gray-700 italic leading-relaxed">
                  "Chaque cliente a une situation capillaire unique. 'J'ai les tempes dégarnies depuis 
                  mon accouchement', 'Mes cheveux cassent depuis mon défrisage', 'J'ai des pellicules 
                  et le cuir chevelu qui gratte'... Elles ne peuvent pas choisir seules. Elles ont 
                  besoin d'être guidées. Et je ne pouvais pas être disponible 24h/24."
                </blockquote>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/images/testimonials/katia.jpg"
                    alt="Katia Koundé"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Katia Koundé</p>
                  <p className="text-sm text-gray-500">Fondatrice de Ahovi Cosmetics</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Les symptômes</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '⏰', text: '2-3 heures par jour à répondre aux messages WhatsApp' },
                { icon: '🔄', text: '80% de questions sur les mêmes problématiques capillaires' },
                { icon: '😴', text: 'Temps de réponse moyen de 2-4 heures' },
                { icon: '💸', text: 'Clientes qui abandonnent sans avoir été conseillées' },
                { icon: '🌙', text: 'Impossible de répondre la nuit ou le week-end' },
                { icon: '📉', text: 'Taux de conversion bloqué à 1.8%' },
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white rounded-xl p-4 border border-red-100">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-red-100 rounded-xl border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Le vrai problème</h4>
              <p className="text-red-700">
                Les clientes d'Ahovi Cosmetics ont des <strong>problématiques capillaires spécifiques</strong> : 
                alopécie de traction (tempes dégarnies), cheveux cassants post-défrisage, cuir chevelu sensible, 
                chute de cheveux post-partum... Elles ne veulent pas lire des fiches produits. 
                Elles veulent savoir <strong>"lequel est fait pour MOI"</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">La solution</h2>
            
            <div className="bg-pink-50 rounded-2xl p-8 border border-pink-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation de Chatseller</h3>
              <div className="space-y-4">
                {[
                  { day: 'Jour 1', action: 'Installation du widget sur le site Shopify', time: '5 minutes' },
                  { day: 'Jours 2-3', action: 'Configuration de la conseillère IA : import du catalogue, ajout des informations sur les ingrédients et problématiques capillaires courantes', time: '2 heures' },
                  { day: 'Jour 4', action: 'Mise en ligne', time: '—' },
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-sm font-semibold text-pink-600">{step.day}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{step.action}</p>
                      <p className="text-sm text-gray-500">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exemple de conversation réelle</h3>
            
            {/* Chat Before */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">Avant Chatseller (WhatsApp)</span>
              </div>
              <div className="bg-gray-100 rounded-2xl p-6 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Bonjour ! Je perds beaucoup de cheveux au niveau des tempes depuis quelques mois. J'ai tout essayé mais rien ne marche... 😔</p>
                    <p className="text-xs text-green-100 mt-1">14:23</p>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">⏳ 3 heures plus tard...</span>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] shadow-sm">
                    <p className="text-sm text-gray-800">Bonjour ! Essayez notre Brume Anti-Chute, elle est très efficace. 7 000 FCFA.</p>
                    <p className="text-xs text-gray-400 mt-1">17:30</p>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-red-600 bg-red-100 px-3 py-1 rounded-full">❌ La cliente n'a plus jamais répondu</span>
                </div>
              </div>
            </div>

            {/* Chat After */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">Avec Chatseller (sur le site)</span>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 space-y-4 border border-pink-100">
                <div className="flex justify-end">
                  <div className="bg-pink-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Bonjour ! Je perds beaucoup de cheveux au niveau des tempes depuis quelques mois. J'ai tout essayé mais rien ne marche... 😔</p>
                    <p className="text-xs text-pink-100 mt-1">14:23</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">IA</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">Je comprends, c'est vraiment frustrant. Cette zone des tempes est souvent fragilisée. Est-ce que vous portez régulièrement des tresses, des tissages ou des coiffures serrées ?</p>
                      <p className="text-xs text-gray-400 mt-1">14:23</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-pink-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Oui, je fais des tresses pratiquement tous les mois...</p>
                    <p className="text-xs text-pink-100 mt-1">14:24</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">IA</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">C'est probablement de <strong>l'alopécie de traction</strong> — très courante avec les coiffures répétées. Bonne nouvelle : c'est réversible avec les bons soins ! Notre <strong>Brume Capillaire Anti-Chute</strong> stimule les follicules et renforce la repousse.</p>
                      <div className="mt-3 bg-pink-50 rounded-xl p-3 border border-pink-100">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">💧</span>
                          <div>
                            <p className="font-semibold text-sm">Brume Capillaire Anti-Chute</p>
                            <p className="text-pink-600 font-bold">7 000 FCFA</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">14:24</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-pink-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Elle fonctionne vraiment ? En combien de temps ?</p>
                    <p className="text-xs text-pink-100 mt-1">14:25</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">IA</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">87% de nos clientes voient des résultats visibles en 6-8 semaines. Appliquez-la 3x/semaine sur les tempes en massant doucement. Pour maximiser les résultats, je vous conseille aussi notre <strong>Masque Capillaire Protéiné</strong> 1x/semaine pour renforcer la fibre.</p>
                      <div className="mt-3 bg-pink-50 rounded-xl p-3 border border-pink-100">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🧴</span>
                          <div>
                            <p className="font-semibold text-sm">Masque Capillaire Protéiné</p>
                            <p className="text-pink-600 font-bold">6 000 FCFA</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">14:25</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-pink-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Super, je prends les deux ! Vous livrez à Saint-Louis ?</p>
                    <p className="text-xs text-pink-100 mt-1">14:26</p>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full">✅ Panier de 13 000 FCFA au lieu de 7 000 FCFA (+86%)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Les résultats après 30 jours</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Conversion */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-pink-500" />
                  <span>Taux de conversion</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Avant</span>
                      <span className="font-medium">1.8%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-gray-400 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Après</span>
                      <span className="font-bold text-pink-600">3.2%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-gradient-to-r from-pink-400 to-rose-500 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-green-600 font-semibold mt-3">+78% d'amélioration</p>
              </div>

              {/* Time Saved */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-pink-500" />
                  <span>Temps gagné</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Réponses WhatsApp</span>
                    <div className="text-right">
                      <span className="text-gray-400 line-through text-sm">2-3h/jour</span>
                      <span className="ml-2 font-bold text-pink-600">30min/jour</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conseils capillaires</span>
                    <div className="text-right">
                      <span className="text-gray-400 line-through text-sm">1h/jour</span>
                      <span className="ml-2 font-bold text-pink-600">Automatisé</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-green-600 font-semibold mt-3">~2h30 gagnées par jour</p>
              </div>
            </div>

            {/* ROI */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-pink-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-pink-500" />
                <span>Retour sur investissement</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Coût Chatseller</p>
                  <p className="text-2xl font-bold text-gray-900">29 900 FCFA<span className="text-sm font-normal text-gray-500">/mois</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">CA généré par Chatseller</p>
                  <p className="text-2xl font-bold text-pink-600">~847 000 FCFA<span className="text-sm font-normal text-gray-500">/mois</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">ROI</p>
                  <p className="text-3xl font-bold text-green-600">28.3x</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Ce qu'on a appris</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: 'L\'expertise capillaire fait la différence',
                  description: 'Chatseller ne dit pas juste "essayez ça". Elle diagnostique (alopécie de traction, cheveux poreux, cuir chevelu sensible) et conseille en conséquence.'
                },
                {
                  icon: Zap,
                  title: 'L\'upsell naturel fonctionne',
                  description: 'Quand le conseil est pertinent, les clientes acceptent les produits complémentaires. Le panier moyen a augmenté de 39%.'
                },
                {
                  icon: Users,
                  title: 'La nuit capture des ventes perdues',
                  description: '35% des conversations Chatseller ont lieu entre 21h et 8h — quand Katia dormait avant.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-pink-50 rounded-2xl p-6 border border-pink-100">
                  <item.icon className="w-8 h-8 text-pink-500 mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Testimonial */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-pink-100">
                  <Image
                    src="/images/testimonials/katia.jpg"
                    alt="Katia Koundé"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl text-gray-700 italic leading-relaxed mb-6">
                  "Ce qui m'a le plus surprise, c'est que les clientes ne se rendent pas compte que 
                  c'est une IA. Elles me disent 'ta conseillère est super, elle m'a vraiment aidée'. 
                  Chatseller comprend leurs problèmes capillaires mieux que moi parfois ! Et surtout, 
                  elle répond à 2h du matin quand moi je dors."
                </blockquote>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Katia Koundé</p>
                  <p className="text-gray-500">Fondatrice de Ahovi Cosmetics</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-pink-500 to-rose-600">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Prêt à obtenir les mêmes résultats ?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Comme Ahovi Cosmetics, transformez vos conversations en ventes 
              avec Chatseller. Essai gratuit de 7 jours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://dashboard.chatseller.app/register"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-pink-600 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg group"
              >
                <span>Essayer Chatseller gratuitement</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/etudes-de-cas"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>Voir les autres études de cas</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
