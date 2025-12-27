// src/app/(marketing)/etudes-de-cas/exclusiv/page.tsx
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

export default function ExclusivCaseStudy() {
  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-16 overflow-hidden bg-gradient-to-br from-slate-100 via-gray-50 to-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-gray-200 rounded-full blur-3xl opacity-30" />
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
              <div className="w-20 h-20 bg-slate-900 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/brand-logos/fav-exclusiv.jpg"
                  alt="Exclusiv"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Exclusiv</h1>
                <p className="text-gray-600">Soins de barbe pour hommes • Dakar, Sénégal</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Résumé</h2>
              <p className="text-gray-700 leading-relaxed">
                Exclusiv, marque sénégalaise de soins pour barbe fondée par les frères Hanne, 
                a augmenté son taux de conversion de <span className="font-bold text-slate-700">+61%</span> et 
                libéré <span className="font-bold text-slate-700">2 heures par jour</span> grâce à Chatseller. 
                Les clients hommes, souvent hésitants à poser des questions, trouvent désormais des conseils 
                personnalisés sans gêne.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: '+61%', label: 'Taux de conversion', sublabel: 'vs visiteurs sans IA', icon: TrendingUp },
                { value: '2h', label: 'Gagnées par jour', sublabel: 'sur les réponses WhatsApp', icon: Clock },
                { value: '+45%', label: 'Panier moyen', sublabel: 'grâce aux routines complètes', icon: ShoppingCart },
                { value: '89%', label: 'Questions résolues', sublabel: 'sans intervention humaine', icon: MessageCircle },
              ].map((metric, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                  <metric.icon className="w-6 h-6 text-slate-700 mx-auto mb-2" />
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
                  <strong>Exclusiv</strong> est une marque sénégalaise de soins pour barbe, fondée par 
                  les frères Ibrahima et Becaye Hanne. Née d'une volonté de réinventer les soins masculins 
                  en Afrique, Exclusiv célèbre l'élégance, la confiance et l'authenticité à travers 
                  des produits qui respectent la peau et la barbe des hommes modernes.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6">
                  Ancrée dans les traditions africaines, la marque propose des huiles, baumes, 
                  shampoings et kits complets formulés avec des ingrédients locaux. Chaque soin 
                  raconte une histoire de transmission, de style et de fierté masculine.
                </p>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                  <h4 className="font-semibold text-gray-900 mb-3">En chiffres</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-slate-600" />
                      <span><strong>+8 produits</strong> (huiles, baumes, shampoings, kits)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-slate-600" />
                      <span><strong>Prix :</strong> 10 000 - 30 000 FCFA</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-slate-600" />
                      <span><strong>Ingrédients naturels</strong>, inspirés de l'Afrique</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-slate-600" />
                      <span><strong>Livraison :</strong> 24h à Dakar</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/case-studies/exclusiv/product.jpg"
                    alt="Produits Exclusiv"
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
                  "Les hommes ont des questions sur leur barbe, mais ils n'osent pas toujours 
                  les poser. 'Ma barbe pousse mal sur les joues', 'J'ai des plaques sans poils', 
                  'Ça me gratte après le rasage'... Ils veulent des réponses, mais pas forcément 
                  parler à quelqu'un directement. Et nous, on ne pouvait pas être disponibles 24h/24."
                </blockquote>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src="/images/testimonials/hanne.jpg"
                    alt="Ibrahima & Becaye Hanne"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Ibrahima & Becaye Hanne</p>
                  <p className="text-sm text-gray-500">Fondateurs de Exclusiv</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">Les symptômes</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '⏰', text: '2 heures par jour à répondre aux DMs Instagram et WhatsApp' },
                { icon: '🤫', text: 'Clients qui hésitent à poser leurs vraies questions' },
                { icon: '😴', text: 'Temps de réponse variable (surtout le week-end)' },
                { icon: '💸', text: 'Clients qui partent faute de conseils rapides' },
                { icon: '🔄', text: 'Mêmes questions sur les routines et l\'utilisation' },
                { icon: '📉', text: 'Taux de conversion stagnant malgré un bon trafic' },
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
                Les hommes ont des <strong>préoccupations qu'ils n'expriment pas facilement</strong> : 
                barbe clairsemée, démangeaisons, pellicules de barbe, pousse inégale... 
                Ils veulent des conseils <strong>discrets et personnalisés</strong>, 
                sans avoir à "expliquer leur problème" à un humain.
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
            
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Installation de Chatseller</h3>
              <div className="space-y-4">
                {[
                  { day: 'Jour 1', action: 'Installation du widget sur le site Shopify', time: '5 minutes' },
                  { day: 'Jours 2-3', action: 'Configuration de la conseillère IA : catalogue, problématiques barbe, routines recommandées', time: '2 heures' },
                  { day: 'Jour 4', action: 'Mise en ligne et personnalisation du ton (masculin, direct, expert)', time: '30 minutes' },
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-sm font-semibold text-slate-600">{step.day}</span>
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
                <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">Avant Chatseller (DM Instagram)</span>
              </div>
              <div className="bg-gray-100 rounded-2xl p-6 space-y-4">
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Salut, j'aimerais faire pousser ma barbe mais elle pousse pas bien sur les joues</p>
                    <p className="text-xs text-white/70 mt-1">16:45</p>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">⏳ Vu à 16:45 - Réponse le lendemain...</span>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%] shadow-sm">
                    <p className="text-sm text-gray-800">Salut ! Essaie notre Huile de Croissance, elle est top pour ça. 10 000 FCFA.</p>
                    <p className="text-xs text-gray-400 mt-1">Lendemain, 10:30</p>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-red-600 bg-red-100 px-3 py-1 rounded-full">❌ Client n'a plus jamais répondu</span>
                </div>
              </div>
            </div>

            {/* Chat After */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">Avec Chatseller (sur le site)</span>
              </div>
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 space-y-4 border border-slate-200">
                <div className="flex justify-end">
                  <div className="bg-slate-700 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Salut, j'aimerais faire pousser ma barbe mais elle pousse pas bien sur les joues</p>
                    <p className="text-xs text-slate-300 mt-1">16:45</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">E</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">Je vois exactement ce que tu veux dire. C'est un cas super courant. Les joues, c'est souvent la zone qui met le plus de temps. Tu as déjà une barbe de combien de temps là ?</p>
                      <p className="text-xs text-gray-400 mt-1">16:45</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-slate-700 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Genre 3 semaines, mais y'a des trous</p>
                    <p className="text-xs text-slate-300 mt-1">16:46</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">E</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">3 semaines c'est encore tôt, les follicules ont besoin de stimulation. Notre <strong>Huile à Barbe Exclusiv</strong> active les zones dormantes — elle contient du ricin et de l'argan qui boostent la pousse. Applique-la 2x/jour en massant bien les joues.</p>
                      <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🧴</span>
                          <div>
                            <p className="font-semibold text-sm">Huile à Barbe Exclusiv</p>
                            <p className="text-slate-700 font-bold">10 000 FCFA</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">16:46</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-slate-700 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Ok et pour les démangeaisons ? Ça me gratte parfois</p>
                    <p className="text-xs text-slate-300 mt-1">16:47</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">E</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] shadow-sm">
                      <p className="text-sm text-gray-800">Ah les démangeaisons, classique quand la barbe pousse ! C'est la peau en dessous qui est sèche. Le <strong>Baume à Barbe</strong> va hydrater en profondeur et calmer les irritations. En combo avec l'huile, tu auras une routine complète.</p>
                      <div className="mt-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">🫙</span>
                          <div>
                            <p className="font-semibold text-sm">Baume à Barbe Exclusiv</p>
                            <p className="text-slate-700 font-bold">10 000 FCFA</p>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-3">💡 <strong>Astuce</strong> : Notre <strong>Gamme Starter</strong> inclut les deux + un peigne pour 17 000 FCFA au lieu de 20 000 FCFA.</p>
                      <p className="text-xs text-gray-400 mt-2">16:47</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-slate-700 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Parfait, je prends le Starter alors !</p>
                    <p className="text-xs text-slate-300 mt-1">16:48</p>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-green-600 bg-green-100 px-3 py-1 rounded-full">✅ Commande de 17 000 FCFA en 3 minutes</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-100 to-gray-100">
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
                  <TrendingUp className="w-5 h-5 text-slate-600" />
                  <span>Taux de conversion</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Avant</span>
                      <span className="font-medium">2.1%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-gray-400 rounded-full" style={{ width: '21%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Après</span>
                      <span className="font-bold text-slate-700">3.4%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full">
                      <div className="h-full bg-gradient-to-r from-slate-600 to-slate-800 rounded-full" style={{ width: '34%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-green-600 font-semibold mt-3">+61% d'amélioration</p>
              </div>

              {/* Time Saved */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <span>Temps gagné</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Réponses DMs/WhatsApp</span>
                    <div className="text-right">
                      <span className="text-gray-400 line-through text-sm">2h/jour</span>
                      <span className="ml-2 font-bold text-slate-700">30min/jour</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Conseils routines</span>
                    <div className="text-right">
                      <span className="text-gray-400 line-through text-sm">45min/jour</span>
                      <span className="ml-2 font-bold text-slate-700">Automatisé</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-green-600 font-semibold mt-3">~2h gagnées par jour</p>
              </div>
            </div>

            {/* ROI */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-slate-600" />
                <span>Retour sur investissement</span>
              </h3>
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Coût Chatseller</p>
                  <p className="text-2xl font-bold text-gray-900">29 900 FCFA<span className="text-sm font-normal text-gray-500">/mois</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">CA généré par Chatseller</p>
                  <p className="text-2xl font-bold text-slate-700">~580 000 FCFA<span className="text-sm font-normal text-gray-500">/mois</span></p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">ROI</p>
                  <p className="text-3xl font-bold text-green-600">19.4x</p>
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
                  title: 'Les hommes osent avec l\'IA',
                  description: 'Les clients posent des questions qu\'ils n\'auraient jamais posées à un humain. "Ma barbe a des trous", "Ça me gratte"... L\'IA libère la parole.'
                },
                {
                  icon: Zap,
                  title: 'Les kits se vendent mieux',
                  description: 'Quand Chatseller recommande une routine complète (huile + baume + peigne), les clients comprennent la logique et achètent le kit. Panier +45%.'
                },
                {
                  icon: Users,
                  title: 'Le ton compte',
                  description: 'Un ton masculin, direct et expert (pas de "Bonjour madame") fait toute la différence. Les hommes se sentent compris.'
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <item.icon className="w-8 h-8 text-slate-600 mb-4" />
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
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-200">
                  <Image
                    src="/images/testimonials/hanne.jpg"
                    alt="Ibrahima & Becaye Hanne"
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
                  "Nos clients hommes posent des questions qu'ils n'oseraient jamais poser en boutique 
                  ou même en DM. 'Ma barbe a des trous sur les joues', 'J'ai des pellicules de barbe'... 
                  Chatseller les met en confiance et les guide parfaitement. Et nous, on peut se 
                  concentrer sur la création de nouveaux produits."
                </blockquote>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Ibrahima & Becaye Hanne</p>
                  <p className="text-gray-500">Fondateurs de Exclusiv</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-800 to-slate-900">
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
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              Comme Exclusiv, transformez vos conversations en ventes 
              avec Chatseller. Essai gratuit de 7 jours.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://dashboard.chatseller.app/register"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-slate-800 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg group"
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
