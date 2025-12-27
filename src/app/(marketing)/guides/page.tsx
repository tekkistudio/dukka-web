// src/app/(marketing)/guides/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight,
  Clock,
  BookOpen,
  TrendingUp,
  MessageCircle,
  Truck,
  Sparkles,
  Search
} from 'lucide-react';

// Catégories de guides
const categories = [
  { id: 'all', label: 'Tous les guides', icon: BookOpen },
  { id: 'conversion', label: 'Conversion', icon: TrendingUp },
  { id: 'whatsapp', label: 'WhatsApp Commerce', icon: MessageCircle },
  { id: 'logistique', label: 'Logistique & Paiement', icon: Truck },
  { id: 'beaute', label: 'Marques Beauté', icon: Sparkles },
];

// Guides
const guides = [
  {
    id: 'paiement-livraison-afrique',
    title: 'Comment gérer le paiement à la livraison (COD) au Sénégal',
    description: 'Le paiement à la livraison représente 70% des transactions e-commerce en Afrique. Découvrez comment le gérer efficacement sans y perdre.',
    category: 'logistique',
    readTime: '8 min',
    image: '/images/guides/cod-senegal.jpg',
    tags: ['COD', 'Paiement', 'Sénégal'],
    featured: true,
    comingSoon: false,
  },
  {
    id: 'augmenter-conversion-ecommerce',
    title: 'Comment augmenter votre taux de conversion de 50%',
    description: 'Les 7 leviers qui font la différence entre une boutique qui stagne et une boutique qui explose. Basé sur l\'analyse de +50 marques africaines.',
    category: 'conversion',
    readTime: '12 min',
    image: '/images/guides/conversion-rate.jpg',
    tags: ['Conversion', 'Optimisation', 'Ventes'],
    featured: true,
    comingSoon: false,
  },
  {
    id: 'whatsapp-vs-email-afrique',
    title: 'WhatsApp vs Email : Les chiffres qui parlent en Afrique',
    description: '95% de taux d\'ouverture WhatsApp vs 2% pour les emails. Pourquoi vous devez repenser votre stratégie de communication client.',
    category: 'whatsapp',
    readTime: '6 min',
    image: '/images/guides/whatsapp-vs-email.jpg',
    tags: ['WhatsApp', 'Email', 'Marketing'],
    featured: false,
    comingSoon: false,
  },
  {
    id: 'lancer-marque-cosmetiques-senegal',
    title: 'Lancer une marque de cosmétiques au Sénégal : Le guide complet',
    description: 'De l\'idée à la première vente. Formulation, packaging, réglementation, e-commerce — tout ce qu\'il faut savoir pour lancer votre marque beauté.',
    category: 'beaute',
    readTime: '20 min',
    image: '/images/guides/lancer-marque-beaute.jpg',
    tags: ['Cosmétiques', 'Lancement', 'Sénégal'],
    featured: true,
    comingSoon: false,
  },
  {
    id: 'conseil-personnalise-beaute-en-ligne',
    title: 'Comment conseiller vos clientes beauté en ligne',
    description: 'Vos clientes veulent être écoutées avant d\'acheter. Comment recréer l\'expérience boutique en ligne et multiplier vos ventes.',
    category: 'beaute',
    readTime: '8 min',
    image: '/images/guides/conseil-beaute-en-ligne.jpg',
    tags: ['Beauté', 'Conseil', 'Conversion'],
    featured: false,
    comingSoon: false,
  },
  {
    id: 'automatiser-reponses-whatsapp',
    title: 'Automatiser vos réponses WhatsApp sans perdre en qualité',
    description: 'Vous passez 3h par jour à répondre aux mêmes questions ? Découvrez comment automatiser intelligemment sans frustrer vos clients.',
    category: 'whatsapp',
    readTime: '7 min',
    image: '/images/guides/automatiser-whatsapp.jpg',
    tags: ['WhatsApp', 'Automatisation', 'Productivité'],
    featured: false,
    comingSoon: true,
  },
  {
    id: 'gerer-livraisons-senegal',
    title: 'Gérer les livraisons au Sénégal : Dakar et régions',
    description: 'Livreurs, zones de livraison, tarifs, délais. Comment organiser votre logistique pour livrer partout au Sénégal.',
    category: 'logistique',
    readTime: '10 min',
    image: '/images/guides/livraison-senegal.jpg',
    tags: ['Livraison', 'Logistique', 'Sénégal'],
    featured: false,
    comingSoon: true,
  },
  {
    id: 'pourquoi-visiteurs-achètent-pas',
    title: 'Pourquoi vos visiteurs n\'achètent pas (et comment y remédier)',
    description: 'Vous avez du trafic mais pas de ventes ? Les 5 raisons principales et les solutions concrètes pour débloquer la situation.',
    category: 'conversion',
    readTime: '9 min',
    image: '/images/guides/visiteurs-n-achetent-pas.jpg',
    tags: ['Conversion', 'Diagnostic', 'Optimisation'],
    featured: false,
    comingSoon: true,
  },
];

// Guide Card Component
const GuideCard = ({ guide, featured = false }: { guide: typeof guides[0], featured?: boolean }) => {
  const isComingSoon = guide.comingSoon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group ${featured ? 'md:col-span-2' : ''}`}
    >
      <Link 
        href={isComingSoon ? '#' : `/guides/${guide.id}`}
        className={`block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all ${isComingSoon ? 'cursor-not-allowed opacity-75' : ''}`}
      >
        <div className={`${featured ? 'md:flex' : ''}`}>
          {/* Image */}
          <div className={`relative ${featured ? 'md:w-1/2' : ''} aspect-[16/9] ${featured ? 'md:aspect-auto' : ''} bg-gray-100 overflow-hidden`}>
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {isComingSoon && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-900">
                  Bientôt disponible
                </span>
              </div>
            )}
            {guide.featured && !isComingSoon && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-dukka-blue text-white text-xs font-semibold rounded-full">
                  Populaire
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`p-6 ${featured ? 'md:w-1/2 md:p-8 md:flex md:flex-col md:justify-center' : ''}`}>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {guide.tags.slice(0, 2).map((tag) => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className={`font-bold text-gray-900 mb-2 group-hover:text-dukka-blue transition-colors ${featured ? 'text-2xl' : 'text-lg'}`}>
              {guide.title}
            </h3>

            {/* Description */}
            <p className={`text-gray-600 mb-4 ${featured ? '' : 'text-sm line-clamp-2'}`}>
              {guide.description}
            </p>

            {/* Meta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{guide.readTime} de lecture</span>
              </div>
              {!isComingSoon && (
                <span className="text-dukka-blue font-medium text-sm flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Lire</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrer les guides
  const filteredGuides = guides.filter(guide => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Séparer les guides disponibles et à venir
  const availableGuides = filteredGuides.filter(g => !g.comingSoon);
  const comingSoonGuides = filteredGuides.filter(g => g.comingSoon);

  // Guides mis en avant
  const featuredGuides = availableGuides.filter(g => g.featured).slice(0, 2);
  const regularGuides = availableGuides.filter(g => !g.featured || featuredGuides.indexOf(g) === -1);

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-16 overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-8">
              <BookOpen className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Guides e-commerce Afrique</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dukka-gray-900 mb-6 leading-tight">
              Tout ce qu&apos;il faut savoir pour
              <br />
              <span className="text-green-600">vendre en ligne en Afrique</span>
            </h1>

            <p className="text-xl text-dukka-gray-600 max-w-3xl mx-auto mb-8">
              Des guides pratiques basés sur notre expérience avec +50 e-commerce africains. 
              Conversion, logistique, paiement, WhatsApp — tout y est.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un guide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-100 sticky top-20 bg-white z-30">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      {featuredGuides.length > 0 && !searchQuery && selectedCategory === 'all' && (
        <section className="py-12">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Guides populaires</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Guides */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          {(searchQuery || selectedCategory !== 'all') && (
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {filteredGuides.length} guide{filteredGuides.length > 1 ? 's' : ''} 
              {selectedCategory !== 'all' && ` dans ${categories.find(c => c.id === selectedCategory)?.label}`}
              {searchQuery && ` pour "${searchQuery}"`}
            </h2>
          )}

          {(!searchQuery && selectedCategory === 'all') && (
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Tous les guides</h2>
          )}

          {availableGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchQuery || selectedCategory !== 'all' ? availableGuides : regularGuides).map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Aucun guide trouvé.</p>
              <p className="text-gray-500 text-sm">Essayez avec d'autres termes ou une autre catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon */}
      {comingSoonGuides.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Bientôt disponibles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comingSoonGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Recevez nos prochains guides
            </h2>
            <p className="text-white/80 mb-8 max-w-lg mx-auto">
              Un guide pratique par semaine pour développer votre e-commerce en Afrique. 
              Pas de spam, que du contenu utile.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                S'inscrire
              </button>
            </form>
            <p className="text-white/60 text-sm mt-4">
              +150 e-commerçants africains nous lisent chaque semaine
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Prêt à passer à l'action ?
          </h2>
          <p className="text-gray-600 mb-8">
            Découvrez comment Chatseller peut vous aider à convertir plus de visiteurs en clients.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://dashboard.chatseller.app/register"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-dukka-blue text-white font-semibold rounded-xl hover:bg-dukka-blue-700 transition-all group"
            >
              <span>Essayer Chatseller gratuitement</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/etudes-de-cas"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
            >
              <span>Voir les études de cas</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
