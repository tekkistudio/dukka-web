// src/app/(marketing)/solutions/page.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  MessageCircle, 
  Sparkles,
  Truck,
  RefreshCw,
  Users,
  Star,
  BarChart3,
  Brain,
  ShoppingCart,
  Clock,
  Zap,
  Heart,
  Send,
  Loader2,
  X,
  Rocket
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

// Chatseller features détaillées
const chatsellerFeatures = [
  {
    icon: Brain,
    title: 'Expertise beauté intégrée',
    description: 'Formée sur +2000 ingrédients cosmétiques, types de peau, routines beauté. Elle conseille comme une vraie experte.',
  },
  {
    icon: Heart,
    title: 'Comprend les situations personnelles',
    description: 'Elle écoute, diagnostique, conseille et recommande le bon produit.',
  },
  {
    icon: ShoppingCart,
    title: 'Finalise la vente',
    description: 'Elle guide vers l\'achat, suggère des compléments, crée les commandes. C\'est une vendeuse, pas juste un support.',
  },
  {
    icon: BarChart3,
    title: 'Analytics de conversion',
    description: 'Mesurez le ROI exact : conversions IA, CA généré, panier moyen, insights clientèle beauté.',
  },
  {
    icon: Clock,
    title: 'Disponible 24h/24',
    description: 'Vos clientes posent des questions à 2h du matin. Chatseller répond instantanément.',
  },
  {
    icon: Zap,
    title: 'Installation en 2 minutes',
    description: 'Copiez un script, collez-le dans Shopify ou WooCommerce. Elle apprend votre catalogue automatiquement.',
  },
];

// Metrics Chatseller
const chatsellerMetrics = [
  { value: '+45%', label: 'Taux de conversion', description: 'vs visiteurs sans interaction IA' },
  { value: '31.9x', label: 'ROI moyen', description: 'pour 49€/mois investi' },
  { value: '94%', label: 'Questions résolues', description: 'sans intervention humaine' },
  { value: '<2min', label: 'Installation', description: 'sans code, sans migration' },
];

// Solutions à venir
const upcomingSolutions = [
  {
    id: 'whatsapp_contacts',
    icon: Users,
    emoji: '📱',
    name: 'WhatsApp CRM',
    tagline: 'Capturez des contacts WhatsApp sur votre site',
    problem: 'Votre formulaire newsletter a 10 inscrits en 6 mois. Vos emails ont 2% de taux d\'ouverture. Pendant ce temps, vos clients sont sur WhatsApp tous les jours.',
    solution: 'Un widget qui capture les numéros WhatsApp de vos visiteurs en 1 clic. Vous construisez une liste de prospects et clients que vous pouvez réellement contacter.',
    benefits: [
      'Widget d\'inscription en 1 clic', 
      'Liste de contacts WhatsApp dédiée', 
      'Segmentation par ville, pays et comportement',
      'Messages de masse personnalisés',
      '95% de taux d\'ouverture (contre 2% pour l\'e-mail)'
      
    ],
    color: 'from-green-500 to-emerald-600',
    lightColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-600',
    status: 'En développement',
    eta: 'Q1 2026'
  },
  {
    id: 'delivery_automation',
    icon: Truck,
    emoji: '🚚',
    name: 'Delivery Manager',
    tagline: 'Automatisez la gestion de vos livreurs et livraisons',
    problem: 'Pour chaque commande, vous copiez le nom, l\'adresse, le numéro depuis Shopify et vous l\'envoyez au livreur sur WhatsApp. Une erreur = commande annulée.',
    solution: 'Les infos de commande sont automatiquement envoyées au bon livreur par SMS ou WhatsApp, selon sa zone. Gain de temps garanti. Zéro risque d\'erreur.',
    benefits: [
      'Transmission automatique par zone',
      'Notifications SMS/WhatsApp aux livreurs',
      'Confirmation de prise en charge',
      'Confirmation de livraison au client',
      'Zéro erreur de copie'
    ],
    color: 'from-purple-500 to-violet-600',
    lightColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    status: 'En développement',
    eta: 'Q1 2026'
  },
  {
    id: 'order_sync',
    icon: RefreshCw,
    emoji: '🔄',
    name: 'Order automation',
    tagline: 'Automatisez la mise à jour de vos commandes COD',
    problem: 'Le client paie par Wave/OM/Cash. Vous avez reçu l\'argent. Mais Shopify affiche toujours "En attente". Vous devez mettre à jour chaque commande manuellement tous les jours.',
    solution: 'Dès qu\'une livraison est confirmée et le paiement reçu, Shopify est mis à jour automatiquement. Plus de mise à jour manuelle. Vous gagnez du temps et évitez les erreurs.',
    benefits: [
      'Détection automatique des livraisons effectuées',
      'Mise à jour des commandes Shopify en temps réel',
      'Gestion automatique des annulations',
      'Réconciliation des paiements',
      'Stock toujours à jour'
    ],
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    status: 'En développement',
    eta: 'Q2 2026'
  },
];

// Modal Waitlist
const WaitlistModal = ({ 
  isOpen, 
  onClose, 
  solution 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  solution: typeof upcomingSolutions[0] | null
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone || null,
          business_type: solution?.id || 'all',
          created_at: new Date().toISOString()
        }]);

      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ full_name: '', email: '', phone: '' });
      }, 3000);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className={`bg-gradient-to-r ${solution?.color || 'from-dukka-blue to-dukka-blue-700'} p-6 text-white relative`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">{solution?.emoji || '🚀'}</span>
              <div>
                <h3 className="text-xl font-bold">{solution?.name || 'Toutes les solutions'}</h3>
                <p className="text-sm text-white/80">Soyez prévenu du lancement</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Vous êtes inscrit !</h4>
                <p className="text-gray-600">Nous vous préviendrons dès que {solution?.name || 'la solution'} sera disponible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dukka-blue"
                    placeholder="Ex: Aminata Diallo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dukka-blue"
                    placeholder="Ex: aminata@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp <span className="text-gray-400">(optionnel)</span></label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dukka-blue"
                    placeholder="Ex: +221 77 123 45 67"
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r ${solution?.color || 'from-dukka-blue to-dukka-blue-700'} text-white font-semibold py-4 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center space-x-2`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Inscription...</span>
                    </>
                  ) : (
                    <>
                      <span>Rejoindre la liste d&apos;attente</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function SolutionsPage() {
  const [selectedSolution, setSelectedSolution] = useState<typeof upcomingSolutions[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWaitlist = (solution: typeof upcomingSolutions[0]) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white">
      
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-gray-50 to-dukka-blue-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-dukka-blue-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-dukka-orange-100 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-dukka-blue-50 border border-dukka-blue-200 mb-8">
              <Sparkles className="w-4 h-4 text-dukka-blue" />
              <span className="text-sm font-semibold text-dukka-blue-700">
                Infrastructure e-commerce pour l&apos;Afrique
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dukka-gray-900 mb-6 leading-tight">
              Des outils qui s&apos;intègrent à
              <br />
              <span className="text-dukka-blue">votre boutique existante</span>
            </h1>

            <p className="text-xl text-dukka-gray-600 max-w-3xl mx-auto leading-relaxed">
              Pas de migration. Pas de nouvelle plateforme à apprendre.
              <br />
              Ajoutez les fonctionnalités dont vous avez besoin à votre site actuel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chatseller - Solution Phare */}
      <section id="chatseller" className="py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#fefafcff' }}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20" />
            </div>
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-100 border border-green-200 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-green-700">Disponible maintenant</span>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-dukka-gray-900">
                Chatseller
              </h2>
            </div>

            <p className="text-2xl text-dukka-gray-700 font-medium mb-4">
              La conseillère beauté IA qui vend pour vous.
            </p>
            <p className="text-lg text-dukka-gray-600 max-w-2xl mx-auto">
              Vos clientes veulent être écoutées et conseillées avant d&apos;acheter.
              Chatseller comprend leur situation et les guide jusqu&apos;au panier.
            </p>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            {chatsellerMetrics.map((metric, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100 rounded-2xl p-6 text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1">{metric.label}</div>
                <div className="text-xs text-gray-500">{metric.description}</div>
              </div>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            
            {/* Left: Features */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Ce que Chatseller fait pour vous
              </h3>
              <div className="space-y-6">
                {chatsellerFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Dashboard Screenshot */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-2">
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <Image
                      src="/images/dashboard/chatseller.png"
                      alt="Dashboard Chatseller - Analytics de Conversion"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                {/* Caption */}
                <p className="text-center text-sm text-gray-500 mt-4">
                  Dashboard Chatseller — Analytics de conversion en temps réel
                </p>
              </div>
            </motion.div>
          </div>

          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 lg:p-10 border border-pink-100 mb-12"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
                    <Image
                      src="/images/testimonials/fatou-cisse.jpg"
                      alt="Fatou Cissé"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4 italic">
                  &quot;Depuis que j&apos;ai installé Chatseller, mes clientes commandent sans m&apos;envoyer 15 messages WhatsApp avant. 
                  Je gagne 2h par jour et mon taux de conversion a augmenté de 45%.&quot;
                </p>
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-bold text-gray-900">Fatou Cissé</p>
                    <p className="text-sm text-gray-600">Fondatrice de 6C No Filter</p>
                  </div>
                  <a 
                    href="https://6cnofilter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-pink-600 hover:text-pink-700 font-medium flex items-center"
                  >
                    Voir la boutique <ArrowRight className="w-3 h-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Link
              href="https://dashboard.chatseller.app/register"
              className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl group"
            >
              <span>Essayer Chatseller gratuitement</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              7 jours gratuits · Sans carte bancaire · Installation en 2 minutes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="border-t border-gray-200" />
      </div>

      {/* Solutions à venir */}
      <section id="coming-soon" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-dukka-blue-50 border border-dukka-blue-200 mb-6">
              <Rocket className="w-4 h-4 text-dukka-blue" />
              <span className="text-sm font-semibold text-dukka-blue-700">Prochainement</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-dukka-gray-900 mb-4">
              Les solutions qu'on construit
            </h2>
            <p className="text-lg text-dukka-gray-600 max-w-2xl mx-auto">
              Chaque solution résout un problème spécifique que vous vivez au quotidien.
              Inscrivez-vous pour être prévenu des lancements.
            </p>
          </motion.div>

          {/* Solutions Grid */}
          <div className="space-y-8">
            {upcomingSolutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="grid lg:grid-cols-2">
                  {/* Left: Info */}
                  <div className="p-8 lg:p-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`w-14 h-14 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <solution.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-2xl font-bold text-gray-900">{solution.name}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-dukka-blue-100 text-dukka-blue-700 font-medium">
                            {solution.eta}
                          </span>
                        </div>
                        <p className={`text-sm font-medium ${solution.textColor}`}>{solution.tagline}</p>
                      </div>
                    </div>

                    {/* Problem */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">Le problème</h4>
                      <p className="text-gray-600 leading-relaxed">{solution.problem}</p>
                    </div>

                    {/* Solution */}
                    <div className="mb-6">
                      <h4 className={`text-sm font-semibold ${solution.textColor} uppercase tracking-wide mb-2`}>Notre solution</h4>
                      <p className="text-gray-700 leading-relaxed font-medium">{solution.solution}</p>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => handleWaitlist(solution)}
                      className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${solution.color} text-white font-semibold rounded-xl hover:opacity-90 transition-all group`}
                    >
                      <span>Être prévenu du lancement</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Right: Benefits */}
                  <div className={`${solution.lightColor} p-8 lg:p-10 ${solution.borderColor} lg:border-l`}>
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Les bénéfices de cette solution</h4>
                    <ul className="space-y-4">
                      {solution.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-start space-x-3">
                          <CheckCircle className={`w-5 h-5 ${solution.textColor} flex-shrink-0 mt-0.5`} />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-dukka-blue via-dukka-blue to-[#1a3a7d]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à commencer ?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
              Chatseller est disponible maintenant. Essayez-le gratuitement pendant 7 jours
              et découvrez l'impact d'une conseillère IA sur vos ventes.
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
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Support WhatsApp inclus</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSolution(null);
        }}
        solution={selectedSolution}
      />
    </div>
  );
}