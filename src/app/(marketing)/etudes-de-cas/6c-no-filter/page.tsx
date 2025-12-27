// src/app/(marketing)/etudes-de-cas/6c-no-filter/page.tsx
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

export default function SixCNoFilterCaseStudy() {
  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-16 overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30" />
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
                  src="/images/brand-logos/6cnofilter.webp"
                  alt="6C No Filter"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">6C No Filter</h1>
                <p className="text-gray-600">Soins corporels naturels • Dakar, Sénégal</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Résumé</h2>
              <p className="text-gray-700 leading-relaxed">
                6C No Filter, marque sénégalaise de soins naturels contre les imperfections cutanées, 
                a augmenté son taux de conversion de <span className="font-bold text-amber-600">+52%</span> et 
                libéré <span className="font-bold text-amber-600">3 heures par jour</span> grâce à Chatseller. 
                La fondatrice Fatou Cissé peut désormais se concentrer sur le développement de nouveaux produits 
                au lieu de répondre aux mêmes questions sur WhatsApp.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: '+52%', label: 'Taux de conversion', sublabel: 'vs visiteurs sans IA', icon: TrendingUp },
                { value: '3h', label: 'Gagnées par jour', sublabel: 'sur les réponses WhatsApp', icon: Clock },
                { value: '+38%', label: 'Panier moyen', sublabel: 'grâce aux recommandations', icon: ShoppingCart },
                { value: '91%', label: 'Questions résolues', sublabel: 'sans intervention humaine', icon: MessageCircle },
              ].map((metric, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                  <metric.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
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
                  <strong>6C No Filter</strong> est une marque sénégalaise de produits cosmétiques 
                  spécialisée dans le traitement des imperfections cutanées. Fondée par Fatou Cissé, 
                  la marque propose des solutions naturelles à base de matières premières africaines 
                  pour lutter contre l'acné, les taches, l'hyperpigmentation et autres problèmes de peau.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Avec une gamme complète de crèmes, masques, savons et packs (du savon pomme de terre 
                  au pack anti-imperfections), 6C No Filter s'adresse principalement aux femmes 
                  africaines souhaitant "assumer leur véritable teint naturel" sans recourir 
                  à des produits chimiques agressifs.
                </p>

                <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                  <h4 className="font-semibold text-gray-900 mb-3">En chiffres</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      <span><strong>12+ produits</strong> (crèmes, masques, savons, packs)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      <span><strong>Prix :</strong> 2 000 - 22 000 FCFA</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      <span><strong>100% naturel</strong>, matières premières africaines</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-amber-500" />
                      <span><strong>Livraison :</strong> 24h Dakar, 48h régions</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/case-studies/6c-no-filter/product.png"
                    alt="Produits 6C No Filter"
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
                  "Je recevais 50 à 70 messages WhatsApp par jour. Les mêmes questions encore et encore : 
                  'C'est pour quel type de peau ?', 'Ça marche contre les taches de grossesse ?', 
                  'Lequel choisir entre le masque correcteur et le purifiant ?'. Je passais mes 
                  journées à répondre au lieu de développer ma marque."
                </blockquote>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/images/testimonials/fatou-cisse.jpg"
                    alt="Fatou Cissé"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Fatou Cissé</p>
                  <p className="text-sm text-gray-500">Fondatrice de 6C No Filter</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Les symptômes</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '⏰', text: '3-4 heures par jour à répondre aux messages WhatsApp' },
                { icon: '🔄', text: '80% de questions répétitives sur les mêmes sujets' },
                { icon: '😴', text: 'Temps de réponse de 2-4 heures (voire plus le week-end)' },
                { icon: '💸', text: 'Clientes qui abandonnent faute de réponse rapide' },
                { icon: '🌙', text: 'Impossible de répondre la nuit ou pendant les heures off' },
                { icon: '📉', text: 'Taux de conversion bloqué malgré le trafic' },
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
                Les clientes de 6C No Filter ont des <strong>situations cutanées spécifiques</strong> : 
                taches depuis une grossesse, hyperpigmentation après l'arrêt d'un produit éclaircissant, 
                acné hormonale... Elles ne veulent pas lire des fiches produits génériques. 
                Elles veulent être <strong>écoutées</strong> et <strong>conseillées </strong>  
                 comme dans une boutique physique.
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
            
            <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation de Chatseller</h3>
              <div className="space-y-4">
                {[
                  { day: 'Jour 1', action: 'Installation du widget sur le site Shopify', time: '5 minutes' },
                  { day: 'Jours 2-3', action: 'Configuration de la conseillère IA : import du catalogue, ajout des informations sur les ingrédients et les problématiques cutanées', time: '2 heures' },
                  { day: 'Jour 4', action: 'Mise en ligne et premiers tests', time: '30 minutes' },
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-sm font-semibold text-amber-600">{step.day}</span>
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
                    <p className="text-sm">Bonjour, j'ai des taches sur le visage depuis que j'ai arrêté ma crème éclaircissante. Vous avez quelque chose ?</p>
                    <p className="text-xs text-green-100 mt-1">14:32</p>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">⏳ 3 heures plus tard...</span>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] shadow-sm">
                    <p className="text-sm text-gray-800">Bonjour ! Oui, notre Pack Anti-Imperfections serait parfait pour vous. Il est à 18 000 FCFA.</p>
                    <p className="text-xs text-gray-400 mt-1">17:45</p>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-red-600 bg-red-100 px-3 py-1 rounded-full">❌ La cliente n'a jamais répondu. Elle a probablement acheté ailleurs</span>
                </div>
              </div>
            </div>

            {/* Chat After */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">Avec Chatseller (sur le site)</span>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 space-y-4 border border-amber-100">
                <div className="flex justify-end">
                  <div className="bg-amber-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Bonjour, j'ai des taches sur le visage depuis que j'ai arrêté ma crème éclaircissante. Vous avez quelque chose ?</p>
                    <p className="text-xs text-amber-100 mt-1">14:32</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">IA</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">Je comprends, c'est très courant après l'arrêt de ce type de produits. Votre peau a besoin de retrouver son équilibre naturel. Depuis combien de temps avez-vous arrêté ?</p>
                      <p className="text-xs text-gray-400 mt-1">14:32</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-amber-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Ça fait 3 mois environ. Les taches sont surtout sur les joues.</p>
                    <p className="text-xs text-amber-100 mt-1">14:33</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">IA</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">3 mois, c'est encore récent — votre peau est en phase de "désintoxication". Les taches sur les joues sont souvent liées à l'hyperpigmentation post-inflammatoire. Notre <strong>Crème de visage</strong> contient des actifs naturels qui régulent la mélanine progressivement.</p>
                      <div className="mt-3 bg-amber-50 rounded-xl p-3 border border-amber-100">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🧴</span>
                          <div>
                            <p className="font-semibold text-sm">Crème de visage</p>
                            <p className="text-amber-600 font-bold">6 000 FCFA</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">14:33</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-amber-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Et pour accélérer les résultats, il y a autre chose ?</p>
                    <p className="text-xs text-amber-100 mt-1">14:34</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">IA</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">Oui ! Notre <strong>Pack Anti-Imperfections</strong> combine la crème avec le masque correcteur. Le masque travaille en profondeur 2x/semaine, et la crème maintient les résultats au quotidien. Vous verrez une différence visible en 3-4 semaines.</p>
                      <div className="mt-3 bg-amber-50 rounded-xl p-3 border border-amber-100">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">📦</span>
                          <div>
                            <p className="font-semibold text-sm">Pack Anti-Imperfections</p>
                            <p className="text-amber-600 font-bold">18 000 FCFA</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">14:34</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-amber-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">OK je prends le pack ! Vous livrez à Thiès ?</p>
                    <p className="text-xs text-amber-100 mt-1">14:35</p>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full">✅ Commande de 18 000 FCFA en 3 minutes</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-amber-50 to-orange-50">
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
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  <span>Taux de conversion</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Avant</span>
                      <span className="font-medium">1.9%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-gray-400 rounded-full" style={{ width: '19%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Après</span>
                      <span className="font-bold text-amber-600">2.9%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: '29%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-green-600 font-semibold mt-3">+52% d'amélioration</p>
              </div>

              {/* Time Saved */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span>Temps gagné</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Réponses WhatsApp</span>
                    <div className="text-right">
                      <span className="text-gray-400 line-through text-sm">3-4h/jour</span>
                      <span className="ml-2 font-bold text-amber-600">45min/jour</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conseils produits</span>
                    <div className="text-right">
                      <span className="text-gray-400 line-through text-sm">1h/jour</span>
                      <span className="ml-2 font-bold text-amber-600">Automatisé</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-green-600 font-semibold mt-3">~3h gagnées par jour</p>
              </div>
            </div>

            {/* ROI */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-amber-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-amber-500" />
                <span>Retour sur investissement</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Coût Chatseller</p>
                  <p className="text-2xl font-bold text-gray-900">29 900 FCFA<span className="text-sm font-normal text-gray-500">/mois</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">CA généré par Chatseller</p>
                  <p className="text-2xl font-bold text-amber-600">~720 000 FCFA<span className="text-sm font-normal text-gray-500">/mois</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">ROI</p>
                  <p className="text-3xl font-bold text-green-600">24x</p>
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
                  title: 'L\'expertise fait la différence',
                  description: 'Chatseller ne dit pas juste "voici nos produits". Elle comprend les problématiques (taches de grossesse, hyperpigmentation, acné hormonale) et conseille en conséquence.'
                },
                {
                  icon: Zap,
                  title: 'La rapidité convertit',
                  description: 'Une réponse instantanée vs 3h d\'attente change tout. Les clientes ont leur réponse quand elles sont encore en mode "achat".'
                },
                {
                  icon: Users,
                  title: 'La nuit génère des ventes',
                  description: '32% des conversations Chatseller ont lieu entre 21h et 8h — quand Fatou dormait avant.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                  <item.icon className="w-8 h-8 text-amber-500 mb-4" />
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
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-100">
                  <Image
                    src="/images/testimonials/fatou-cisse.jpg"
                    alt="Fatou Cissé"
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
                  "Avant Chatseller, je passais mes journées à répondre aux mêmes questions. 
                  Maintenant, je me concentre sur le développement de nouveaux produits et ma présence 
                  sur les réseaux sociaux. Et le plus fou ? Mes clientes me disent que 'ma conseillère' 
                  est super réactive et connaît bien les produits. Elles ne savent même pas que c'est une IA !"
                </blockquote>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Fatou Cissé</p>
                  <p className="text-gray-500">Fondatrice de 6C No Filter</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-amber-500 to-orange-600">
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
              Comme 6C No Filter, transformez vos conversations en ventes 
              avec Chatseller. Essai gratuit de 7 jours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://dashboard.chatseller.app/register"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-amber-600 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg group"
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
