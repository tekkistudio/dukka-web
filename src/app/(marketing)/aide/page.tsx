// src/app/(marketing)/aide/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Search,
  ChevronDown,
  MessageCircle,
  Zap,
  Settings,
  CreditCard,
  Plug,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Mail,
  Clock,
  CheckCircle
} from 'lucide-react';

// Catégories d'aide
const helpCategories = [
  {
    id: 'getting-started',
    icon: Zap,
    title: 'Démarrage rapide',
    description: 'Installation et premiers pas avec Chatseller',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 'configuration',
    icon: Settings,
    title: 'Configuration',
    description: 'Personnaliser votre conseillère IA',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'billing',
    icon: CreditCard,
    title: 'Facturation',
    description: 'Plans, paiements et factures',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'integrations',
    icon: Plug,
    title: 'Intégrations',
    description: 'Shopify, WooCommerce et autres',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'troubleshooting',
    icon: AlertCircle,
    title: 'Dépannage',
    description: 'Résoudre les problèmes courants',
    color: 'bg-red-100 text-red-600',
  },
];

// FAQ par catégorie
const faqData = [
  {
    category: 'getting-started',
    questions: [
      {
        q: 'Comment installer Chatseller sur mon site ?',
        a: `L'installation de Chatseller prend moins de 2 minutes :

1. Créez votre compte sur dashboard.chatseller.app
2. Connectez votre boutique (Shopify ou WooCommerce)
3. Copiez le code du widget fourni dans votre dashboard
4. Collez-le dans le thème de votre boutique (avant la balise </body>)

Pour Shopify : Paramètres → Fichiers du thème → theme.liquid
Pour WooCommerce : Apparence → Éditeur de thème → footer.php

Votre conseillère IA sera active immédiatement et apprendra automatiquement votre catalogue.`
      },
      {
        q: 'Combien de temps pour configurer ma conseillère IA ?',
        a: `La configuration de base prend environ 30 minutes à 2 heures selon la taille de votre catalogue :

• Import du catalogue : Automatique (5 minutes)
• Personnalisation du ton : 15-30 minutes
• Ajout d'informations spécifiques : 30 minutes à 1 heure

Votre conseillère fonctionne dès l'installation avec les informations de vos fiches produits. Vous pouvez ensuite l'améliorer progressivement en ajoutant des informations sur les ingrédients, les problématiques clients, etc.`
      },
      {
        q: 'Chatseller fonctionne-t-il avec ma plateforme e-commerce ?',
        a: `Chatseller est actuellement compatible avec :

✅ Shopify - Intégration native complète
✅ WooCommerce - Intégration native complète

Bientôt disponible :
• PrestaShop
• Wix
• Squarespace

Si vous utilisez une autre plateforme, contactez-nous pour discuter d'une intégration personnalisée.`
      },
    ]
  },
  {
    category: 'configuration',
    questions: [
      {
        q: 'Comment personnaliser le ton de ma conseillère ?',
        a: `Dans votre dashboard Chatseller, allez dans Paramètres → Personnalité :

1. Ton général : Choisissez entre professionnel, amical, expert, etc.
2. Formules de politesse : Personnalisez les salutations et conclusions
3. Vocabulaire : Ajoutez des termes spécifiques à votre marque
4. Émojis : Activez/désactivez selon votre image de marque

Vous pouvez aussi fournir des exemples de conversations idéales pour que l'IA s'en inspire.`
      },
      {
        q: 'Comment ajouter des informations sur mes produits ?',
        a: `Chatseller importe automatiquement les informations de vos fiches produits. Pour enrichir ces données :

1. Allez dans Produits dans votre dashboard
2. Cliquez sur un produit pour le modifier
3. Ajoutez des informations supplémentaires :
   • Ingrédients et leurs bienfaits
   • Problématiques résolues
   • Conseils d'utilisation
   • Contre-indications
   • Produits complémentaires

Plus vous ajoutez d'informations, plus votre conseillère sera précise.`
      },
      {
        q: 'Comment créer une base de connaissances ?',
        a: `La base de connaissances permet à votre conseillère de répondre à des questions générales sur votre domaine :

1. Allez dans Base de connaissances dans votre dashboard
2. Cliquez sur Ajouter un article
3. Rédigez des articles sur :
   • Les problématiques de vos clients (ex: "L'alopécie de traction")
   • Les ingrédients clés (ex: "Les bienfaits du beurre de karité")
   • Les routines recommandées
   • Les FAQ de votre secteur

L'IA utilisera ces informations pour conseiller vos clients.`
      },
    ]
  },
  {
    category: 'billing',
    questions: [
      {
        q: 'Quels sont les tarifs de Chatseller ?',
        a: `Chatseller propose plusieurs plans adaptés à votre activité :

Plan Starter - 29 900 FCFA/mois
• Jusqu'à 500 conversations/mois
• 1 conseillère IA
• Support WhatsApp

Plan Growth - 59 900 FCFA/mois
• Jusqu'à 2000 conversations/mois
• 3 conseillères IA
• Analytics avancés
• Support prioritaire

Plan Enterprise - Sur devis
• Conversations illimitées
• Personnalisation avancée
• Account manager dédié

Tous les plans incluent un essai gratuit de 7 jours.`
      },
      {
        q: 'Comment payer mon abonnement ?',
        a: `Nous acceptons plusieurs moyens de paiement :

💳 Carte bancaire (Visa, Mastercard)
📱 Wave
📱 Orange Money

Pour payer par mobile money, contactez notre support qui vous enverra un lien de paiement.

Les factures sont envoyées automatiquement par email chaque mois.`
      },
      {
        q: 'Comment annuler mon abonnement ?',
        a: `Vous pouvez annuler à tout moment sans engagement :

1. Connectez-vous à votre dashboard
2. Allez dans Paramètres → Facturation
3. Cliquez sur Annuler l'abonnement

Votre accès reste actif jusqu'à la fin de la période payée. Vos données sont conservées 30 jours après l'annulation au cas où vous souhaiteriez revenir.

Aucune pénalité ni frais d'annulation.`
      },
    ]
  },
  {
    category: 'integrations',
    questions: [
      {
        q: 'Comment connecter Shopify à Chatseller ?',
        a: `La connexion Shopify est automatique :

1. Dans votre dashboard Chatseller, cliquez sur Intégrations
2. Cliquez sur Connecter Shopify
3. Entrez l'URL de votre boutique (ex: maboutique.myshopify.com)
4. Autorisez Chatseller dans la popup Shopify
5. C'est fait ! Vos produits sont importés automatiquement

Chatseller se synchronise automatiquement avec votre catalogue. Les nouveaux produits et les modifications de stock sont mis à jour en temps réel.`
      },
      {
        q: 'Comment connecter WooCommerce à Chatseller ?',
        a: `Pour connecter WooCommerce :

1. Dans WooCommerce, allez dans WooCommerce → Paramètres → Avancé → API REST
2. Créez une nouvelle clé API avec les permissions "Lecture"
3. Dans Chatseller, allez dans Intégrations → WooCommerce
4. Entrez l'URL de votre site et la clé API
5. Cliquez sur Connecter

Vos produits seront importés en quelques minutes selon la taille de votre catalogue.`
      },
      {
        q: 'Chatseller peut-il créer des commandes automatiquement ?',
        a: `Oui ! Quand un client finalise son achat via Chatseller :

• Sur Shopify : Un panier pré-rempli est créé avec les produits recommandés. Le client est redirigé vers le checkout Shopify.

• Sur WooCommerce : Même fonctionnement, le panier est ajouté automatiquement.

Chatseller ne gère pas le paiement directement — il utilise votre système de checkout existant pour garantir la sécurité.`
      },
    ]
  },
  {
    category: 'troubleshooting',
    questions: [
      {
        q: 'Le widget ne s\'affiche pas sur mon site',
        a: `Vérifiez ces points :

1. Le code est-il bien installé ?
   Ouvrez votre site, faites clic droit → "Afficher le code source"
   Recherchez "chatseller" — le script doit apparaître

2. Le script est-il avant </body> ?
   Il doit être placé juste avant la balise de fermeture </body>

3. Votre abonnement est-il actif ?
   Vérifiez dans votre dashboard que votre compte n'est pas suspendu

4. Cache du navigateur
   Videz le cache de votre navigateur ou testez en navigation privée

5. Bloqueurs de publicité
   Désactivez temporairement uBlock ou AdBlock pour tester

Si le problème persiste, contactez notre support avec une capture d'écran.`
      },
      {
        q: 'Ma conseillère donne des réponses incorrectes',
        a: `Si votre conseillère se trompe, vous pouvez l'améliorer :

1. Vérifiez vos fiches produits
   Les informations sont-elles complètes et à jour ?
   
2. Enrichissez la base de connaissances
   Ajoutez des articles sur les sujets où elle se trompe

3. Signalez la conversation
   Dans votre dashboard, ouvrez la conversation problématique
   Cliquez sur "Signaler" pour nous aider à améliorer l'IA

4. Ajoutez des exemples
   Dans Paramètres → Entraînement, ajoutez des exemples de bonnes réponses

L'IA s'améliore avec le temps et vos retours.`
      },
      {
        q: 'Comment contacter le support ?',
        a: `Notre équipe est disponible pour vous aider :

📱 WhatsApp (réponse la plus rapide)
+221 78 136 46 98
Disponible du lundi au samedi, 9h-20h

📧 Email
support@dfrdy.com
Réponse sous 24h

💬 Chat dans le dashboard
Disponible quand vous êtes connecté

Pour un traitement plus rapide, incluez :
• Votre email de compte
• Une description détaillée du problème
• Des captures d'écran si possible`
      },
    ]
  },
];

// Composant FAQ Item
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-4 -mx-4 rounded-lg"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-5 text-gray-600 leading-relaxed whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HelpCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les FAQ par recherche
  const filteredFAQ = searchQuery
    ? faqData.flatMap(cat => 
        cat.questions.filter(q => 
          q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.a.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(q => ({ ...q, category: cat.category }))
      )
    : [];

  // FAQ de la catégorie sélectionnée
  const categoryFAQ = selectedCategory 
    ? faqData.find(cat => cat.category === selectedCategory)?.questions || []
    : [];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-16 overflow-hidden bg-gradient-to-br from-dukka-blue-50 via-white to-blue-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-dukka-blue-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-dukka-gray-900 mb-6">
              Comment pouvons-nous vous aider ?
            </h1>
            <p className="text-xl text-dukka-gray-600 mb-8">
              Trouvez rapidement des réponses à vos questions sur Chatseller.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedCategory(null);
                }}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-dukka-blue focus:border-transparent text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      {searchQuery && (
        <section className="py-12">
          <div className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {filteredFAQ.length} résultat{filteredFAQ.length > 1 ? 's' : ''} pour "{searchQuery}"
            </h2>
            {filteredFAQ.length > 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                {filteredFAQ.map((item, index) => (
                  <FAQItem key={index} question={item.q} answer={item.a} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <p className="text-gray-600 mb-4">Aucun résultat trouvé.</p>
                <p className="text-gray-500 text-sm">
                  Essayez avec d'autres termes ou contactez notre support.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Categories Grid */}
      {!searchQuery && !selectedCategory && (
        <section className="py-12">
          <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Parcourir par catégorie
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {helpCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-dukka-blue-200 transition-all text-left group"
                  whileHover={{ y: -2 }}
                >
                  <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-dukka-blue transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category FAQ */}
      {!searchQuery && selectedCategory && (
        <section className="py-12">
          <div className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center space-x-2 text-dukka-blue hover:text-dukka-blue-700 mb-6 transition-colors"
            >
              <ChevronDown className="w-4 h-4 rotate-90" />
              <span>Retour aux catégories</span>
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {helpCategories.find(c => c.id === selectedCategory)?.title}
            </h2>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              {categoryFAQ.map((item, index) => (
                <FAQItem key={index} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Support Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="text-gray-600">
              Notre équipe est là pour vous aider.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* WhatsApp */}
            <a
              href="https://wa.me/221767826804"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-7 h-7 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                    WhatsApp
                  </h3>
                  <p className="text-green-600 font-medium mb-2">+221 76 782 68 04</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>Lun-Sam, 9h-20h</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Réponse en moins de 2h</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:support@dfrdy.com"
              className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-dukka-blue-200 transition-all group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-dukka-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-dukka-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-dukka-blue transition-colors">
                    Email
                  </h3>
                  <p className="text-dukka-blue font-medium mb-2">support@getdukka.com</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <CheckCircle className="w-4 h-4" />
                    <span>Réponse sous 24h</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Pour les demandes détaillées</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-dukka-blue transition-colors" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pas encore client ?
          </h2>
          <p className="text-gray-600 mb-8">
            Découvrez comment Chatseller peut transformer vos ventes en ligne.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://dashboard.chatseller.app/register"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-dukka-blue text-white font-semibold rounded-xl hover:bg-dukka-blue-700 transition-all group"
            >
              <span>Essayer gratuitement</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/solutions#chatseller"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
            >
              <span>En savoir plus</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
