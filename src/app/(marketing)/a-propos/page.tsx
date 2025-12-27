// src/app/(marketing)/a-propos/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  BookOpen, 
  ShoppingBag, 
  Users, 
  Lightbulb, 
  Rocket,
  MessageCircle,
  Target,
  TrendingUp,
  Globe,
  CheckCircle,
  Quote,
  MapPin
} from 'lucide-react';

// Timeline data
const timelineEvents = [
  {
    year: '2014',
    title: 'Kusoma — Les ebooks africains',
    description: 'Première aventure e-commerce : une plateforme permettant aux auteurs africains de publier et vendre leurs livres numériques. Trop tôt pour le marché. Pas de solutions de paiement adaptées. Pas l\'infrastructure.',
    icon: BookOpen,
    color: 'bg-purple-500',
    lesson: 'Leçon : Le timing et l\'infrastructure comptent autant que l\'idée.'
  },
  {
    year: '2018',
    title: 'Dropshipping — +270 000€ de bénéfice',
    description: 'Lancement dans le dropshipping depuis la Belgique. 3 ans à créer des boutiques Shopify, sourcer des produits "gagnants" et vendre en Europe et en Amérique. Une école intensive de l\'e-commerce.',
    icon: ShoppingBag,
    color: 'bg-green-500',
    lesson: 'Leçon : Maîtriser le sourcing produit, le marketing et le service client est crucial.'
  },
  {
    year: '2019',
    title: 'Retour au Sénégal',
    description: 'Retour avec l\'envie de partager ces opportunités. Réalisation rapide : ce qui marche en Europe ne marche pas en Afrique. Stripe indisponible, logistique différente, comportements d\'achat uniques.',
    icon: MapPin,
    color: 'bg-blue-500',
    lesson: 'Leçon : L\'Afrique a besoin de solutions pensées pour elle.'
  },
  {
    year: '2020',
    title: '+50 e-commerçants accompagnés',
    description: 'Création d\'une agence digitale pour aider les marques et commerçants du Sénégal à vendre en ligne. Sites e-commerce, publicité Meta, branding. Une immersion totale dans les problèmes des e-commerçants locaux.',
    icon: Users,
    color: 'bg-orange-500',
    lesson: 'Leçon : Les problèmes sont partout les mêmes. Ce sont les solutions efficaces qui manquent.'
  },
  {
    year: '2023',
    title: 'TEKKI Studio — Création de marques',
    description: 'Création d\'une fabrique de marques e-commerce. Lancement de VIENS ON S\'CONNAÎT (+8 000 jeux vendus en 2 ans) puis AMANI (+250 unités vendues). Constat : Shopify n\'est pas fait pour l\'Afrique.',
    icon: Rocket,
    color: 'bg-pink-500',
    lesson: 'Leçon : Vivre les problèmes soi-même pour penser et créer les solutions les plus adaptées et les plus efficaces.'
  },
  {
    year: '2025',
    title: 'Dukka v1 — L\'alternative africaine à Shopify',
    description: 'Création de Dukka : une plateforme e-commerce conversationnelle pensée pour l\'Afrique. Réalisation : les e-commerçants ne veulent pas quitter Shopify. Ils veulent des solutions qui s\'intègrent à leur site.',
    icon: Lightbulb,
    color: 'bg-dukka-blue',
    lesson: 'Leçon : Parler à la cible avant de construire. Écouter plus que parler. Le marché a toujours raison.'
  },
  {
    year: '2025',
    title: 'Le pivot — Naissance de Chatseller',
    description: 'Les e-commerçants ne veulent pas migrer vers Dukka, mais ils sont séduits par le chatbot IA intégré sur la page produit. Chatseller voit le jour : une conseillère IA qui s\'intègre à Shopify et WooCommerce, et aide les marques beauté à convertir plus de visiteurs en clients.',
    icon: MessageCircle,
    color: 'bg-gradient-to-r from-pink-500 to-purple-500',
    lesson: 'Leçon : Écouter le marché, pas son ego.'
  },
  {
    year: '2026',
    title: 'L\'infrastructure e-commerce africaine',
    description: 'Dukka devient la start-up qui développe les outils que Shopify n\'a pas créés pour l\'Afrique. La mission : offrir aux e-commerçants en Afrique les solutions tech adaptées à leurs réalités, qui s\'intègrent à leur boutique existante, et leur font gagner du temps et de l\'argent.',
    icon: Globe,
    color: 'bg-dukka-blue',
    lesson: 'Leçon : parfois, de ce qui ressembler à un échec naît une opportunité plus grande encore.'
  }
];

// Values
const values = [
  {
    title: 'Terrain d\'abord',
    description: 'On ne crée pas de solutions depuis une tour d\'ivoire. Chaque outil existe parce qu\'on en a eu besoin nous-mêmes.',
    icon: Target
  },
  {
    title: 'Pragmatisme',
    description: 'Pas de révolution forcée. On s\'intègre à ce qui existe déjà. Votre Shopify reste votre Shopify. Nous venons l\'améliorer.',
    icon: CheckCircle
  },
  {
    title: 'Impact réel',
    description: 'On mesure notre succès au temps que vous gagnez et aux ventes que vous faites, pas aux fonctionnalités qu\'on ajoute.',
    icon: TrendingUp
  }
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      
      {/* Hero Section - Version fond clair */}
      <section className="relative pt-32 lg:pt-40 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-gray-50 to-dukka-blue-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-dukka-blue-100 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-dukka-orange-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-dukka-blue-50 border border-dukka-blue-200 mb-8">
              <span className="text-sm font-semibold text-dukka-blue">Notre histoire</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dukka-gray-900 mb-6 leading-tight">
              11 ans d'e-commerce.
              <br />
              <span className="text-dukka-blue">Des milliers de commandes.</span>
              <br />
              Un constat.
            </h1>

            <p className="text-xl text-dukka-gray-600 max-w-3xl mx-auto leading-relaxed">
              Les outils e-commerce occidentaux ne sont pas faits pour l'Afrique.
              <br />
              Alors on a décidé de créer ceux qui manquaient.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-dukka-gray-900 mb-6">
                Notre mission
              </h2>
              <div className="space-y-4 text-lg text-dukka-gray-600 leading-relaxed">
                <p>
                  <span className="font-semibold text-dukka-gray-900">Dukka construit l'infrastructure e-commerce de l'Afrique.</span>
                </p>
                <p>
                  Pas des outils américains "adaptés". Pas des fonctionnalités copiées-collées.
                  Des solutions nées des problèmes du terrain, parce qu'on les a vécus nous-mêmes.
                </p>
                <p>
                  Achat conversationnel, paiement à la livraison, gestion des livreurs, clients sur WhatsApp, 
                  ventes en live TikTok... Ce sont nos réalités. Et elles méritent des outils à la hauteur.
                </p>
              </div>

              <div className="mt-8 p-6 bg-dukka-blue-50 rounded-2xl border border-dukka-blue-100">
                <div className="flex items-start space-x-4">
                  <Quote className="w-8 h-8 text-dukka-blue flex-shrink-0" />
                  <div>
                    <p className="text-dukka-gray-700 italic leading-relaxed">
                      "Chaque solution tech que nous développons, nous l'utilisons d'abord 
                      pour nos propres marques. Si ça ne résout pas notre problème, 
                      on ne la lance pas."
                    </p>
                    <p className="mt-3 font-semibold text-dukka-gray-900">
                      — Ibuka, Fondateur de Dukka
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '11', label: 'ans d\'e-commerce' },
                { value: '2', label: 'marques créées' },
                { value: '+7 000', label: 'commandes gérées' },
                { value: '270k€', label: 'de bénéfices générés' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl font-bold text-dukka-blue mb-1">{stat.value}</div>
                  <div className="text-sm text-dukka-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Le chemin parcouru jusqu'ici
            </h2>
            <p className="text-lg text-dukka-gray-600 max-w-2xl mx-auto">
              11 ans d'expériences, d'échecs et d'apprentissages qui ont mené à Dukka.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform lg:-translate-x-1/2" />

            {/* Timeline events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-white border-4 border-dukka-blue transform -translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-16 lg:ml-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${index % 2 === 0 ? 'lg:ml-auto' : ''} max-w-lg`}>
                      <div className={`flex items-center space-x-3 mb-3 ${index % 2 === 0 ? 'lg:justify-end' : ''}`}>
                        <div className={`w-10 h-10 ${event.color} rounded-xl flex items-center justify-center`}>
                          <event.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-dukka-blue">{event.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-dukka-gray-900 mb-2">{event.title}</h3>
                      <p className="text-dukka-gray-600 mb-3">{event.description}</p>
                      <p className="text-sm text-dukka-blue font-medium italic">{event.lesson}</p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Pivot Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-dukka-gray-900 mb-4">
              Le pivot qui a tout changé
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-100 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 font-medium">Avant</span>
                  <h3 className="text-xl font-bold text-gray-700">Dukka : Plateforme e-commerce</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Une plateforme e-commerce complète, alternative africaine à Shopify, avec
                une page produit dynamique, paiements locaux intégrés, gestion automatisée des livreurs, WhatsApp CRM...
              </p>
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <p className="text-red-700 font-medium">
                  ❌ Problème : Personne ne voulait migrer de Shopify ou WooCommerce vers une nouvelle plateforme.
                </p>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-dukka-blue-50 rounded-2xl p-8 border-2 border-dukka-blue-200"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-dukka-blue rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🚀</span>
                </div>
                <div>
                  <span className="text-sm text-dukka-blue font-medium">Aujourd'hui</span>
                  <h3 className="text-xl font-bold text-dukka-gray-900">Dukka : Suite d'outils e-commerce</h3>
                </div>
              </div>
              <p className="text-dukka-gray-700 mb-4">
                Des outils qui résolvent vos problèmes quotidiens et s'intègrent à votre Shopify ou WooCommerce existant.
                Pas de migration. Ajoutez ce dont vous avez besoin.
              </p>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                <p className="text-green-700 font-medium">
                  ✅ Solution : On s'adapte à vous, pas l'inverse. Vous installez uniquement ce dont vous avez besoin.
                </p>
              </div>
            </motion.div>
          </div>

          {/* The story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
          >
            <h4 className="text-lg font-bold text-dukka-gray-900 mb-4">
              💡 Le déclic
            </h4>
            <p className="text-dukka-gray-600 leading-relaxed">
              Lors d'une rencontre avec la fondatrice d'une marque de cosmétiques sénégalaise, après qu'elle nous ait expliqué 
              pourquoi elle ne quitterait pas Shopify pour rejoindre Dukka, elle nous a demandé :{' '}
              <span className="font-semibold text-dukka-gray-900">
                "Est-ce possible d'avoir juste votre IA sur mon site Shopify ?"
              </span>
            </p>
            <p className="text-dukka-gray-600 leading-relaxed mt-4">
              Ce jour-là, on a compris. Les e-commerçants n'ont pas besoin d'une nouvelle plateforme.
              Ils ont besoin d'outils qui résolvent leurs problèmes spécifiques, sans tout changer.
            </p>
            <p className="text-dukka-blue font-semibold mt-4">
              Dukka est né de cette question. Et Chatseller est notre première réponse.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              Nos valeurs
            </h2>
            <p className="text-lg text-dukka-gray-600">
              Ce qui guide chaque décision chez Dukka.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-14 h-14 bg-dukka-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-dukka-blue" />
                </div>
                <h3 className="text-xl font-bold text-dukka-gray-900 mb-3">{value.title}</h3>
                <p className="text-dukka-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-dukka-gray-900 mb-6">
                Qui est derrière Dukka ?
              </h2>
              <div className="space-y-4 text-lg text-dukka-gray-600 leading-relaxed">
                <p>
                  <span className="font-semibold text-dukka-gray-900">Ibuka Ndjoli</span> — 
                  Fondateur et Lead Product de Dukka.
                </p>
                <p>
                  11 ans d'e-commerce, de la vente d'ebooks africains au dropshipping, 
                  de l'agence digitale à la création de marques. Un parcours atypique 
                  avec un fil rouge : comprendre comment vendre en ligne.
                </p>
                <p>
                  Après avoir généré +270 000€ de bénéfice en dropshipping en Europe, 
                  et géré +7000 commandes en Afrique, Ibuka a une conviction : l'e-commerce africain 
                  a besoin de ses propres outils.
                </p>
                <p>
                  Aujourd'hui, Ibuka dirige Dukka tout en gérant ses propres marques e-commerce,
                  parce que la meilleure façon de créer des outils utiles, c'est de les utiliser soi-même.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a 
                  href="https://linkedin.com/in/ibukandjoli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-dukka-gray-700 font-medium transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com/ibukandjoli" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-dukka-gray-700 font-medium transition-colors"
                >
                  <span>Twitter</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/team/ibuka-assis.jpg"
                    alt="Ibuka Ndjoli - Fondateur de Dukka"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-dukka-orange-100 rounded-2xl -z-10" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-dukka-blue-100 rounded-2xl -z-10" />
              </div>
            </motion.div>
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
              Prêt à découvrir nos solutions ?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
              Commencez avec Chatseller, la conseillère IA pour marques beauté.
              Gratuit pendant 7 jours.
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
                href="/solutions"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                <span>Voir nos solutions</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}