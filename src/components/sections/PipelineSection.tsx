'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Truck,
  RefreshCw,
  Rocket,
  ChevronRight,
  Sparkles,
  Target,
  ArrowRight,
  X,
  CheckCircle,
  Send,
  Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

// Données des solutions en développement
const futureSolutions = [
  {
    id: 'whatsapp_contacts',
    icon: MessageCircle,
    emoji: '📱',
    title: 'Collecte contacts WhatsApp',
    tagline: 'Capturez des contacts WhatsApp directement sur votre site, pas des emails que presque personne ne consulte.',
    description: 'Remplacez votre formulaire newsletter inutile par un widget WhatsApp. Vos visiteurs s\'inscrivent en un clic, vous récupérez leur numéro, et vous pouvez les recontacter quand vous voulez.',
    benefits: [
      '95% de taux d\'ouverture (vs 2% pour les emails)',
      'Widget d\'inscription en 1 clic',
      'Segmentation par ville, pays et comportement',
      'Messages de masse personnalisés (sans bannissement)'
    ],
    painSolved: 'Formulaire newsletter inexploité et inéfficace de votre site ',
    colorClasses: {
      bg: 'from-green-500 to-emerald-600',
      light: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-600'
    }
  },
  {
    id: 'delivery_automation',
    icon: Truck,
    emoji: '🚚',
    title: 'Gestion automatisée des livreurs',
    tagline: 'Automatisez la transmission des commandes aux livreurs selon leur zone, et économez du temps.',
    description: 'Quand une commande arrive sur Shopify, les infos sont automatiquement envoyées au bon livreur par SMS ou WhatsApp. Finies les erreurs et les commandes perdues.',
    benefits: [
      'Transmission automatique par zone',
      'Notifications SMS/WhatsApp aux livreurs',
      'Confirmation de prise en charge',
      'Confirmation de livraison au client'
    ],
    painSolved: 'Le danger de la transmission manuelle des commandes',
    colorClasses: {
      bg: 'from-purple-500 to-violet-600',
      light: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-600'
    }
  },
  {
    id: 'order_sync',
    icon: RefreshCw,
    emoji: '🔄',
    title: 'Gestion des commandes COD',
    tagline: 'Mettez à jour automatiquement le statut de vos commandes après confirmation de la livraison et du paiement.',
    description: 'Quand votre client paie par Wave/OM ou en espèces à la livraison, Shopify est mis à jour automatiquement. Plus besoin d\'ouvrir chaque commande pour la marquer comme payée.',
    benefits: [
      'Détection automatique des commandes livrées',
      'Mise à jour du statut Shopify en temps réel',
      'Gestion automatique des annulations',
      'Réconciliation des paiements'
    ],
    painSolved: 'Mise à jour manuelle de chaque commande après paiement',
    colorClasses: {
      bg: 'from-blue-500 to-indigo-600',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600'
    }
  }
];

// Composant Card Solution
const SolutionCard = ({ solution, index, onSelect }: { 
  solution: typeof futureSolutions[0], 
  index: number,
  onSelect: (id: string) => void 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full flex flex-col"
    onClick={() => onSelect(solution.id)}
  >
    {/* Header gradient */}
    <div className={`bg-gradient-to-r ${solution.colorClasses.bg} p-6 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{solution.emoji}</span>
          <div>
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
              En développement
            </span>
          </div>
        </div>
        <solution.icon className="w-8 h-8 opacity-50" />
      </div>
      <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
      <p className="text-white/90 text-sm">{solution.tagline}</p>
    </div>

    {/* Body */}
    <div className="p-6 flex-1 flex flex-col">
      {/* Pain solved */}
      <div className={`${solution.colorClasses.light} ${solution.colorClasses.border} border rounded-lg p-3 mb-4`}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-400 rounded-full" />
          <span className="text-xs font-medium text-gray-600">Problème résolu :</span>
        </div>
        <p className="text-sm text-gray-700 mt-1">{solution.painSolved}</p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{solution.description}</p>

      {/* Benefits */}
      <div className="space-y-2 flex-1">
        {solution.benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-start space-x-2">
            <CheckCircle className={`w-4 h-4 ${solution.colorClasses.text} flex-shrink-0 mt-0.5`} />
            <span className="text-xs text-gray-600">{benefit}</span>
          </div>
        ))}
      </div>

      {/* CTA hint */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className={`flex items-center justify-center space-x-2 ${solution.colorClasses.text} text-sm font-medium group-hover:translate-x-1 transition-transform`}>
          <span>Être prévenu du lancement</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </motion.div>
);

// Composant Modal Waitlist
const WaitlistModal = ({ 
  isOpen, 
  onClose, 
  preselectedSolution 
}: { 
  isOpen: boolean, 
  onClose: () => void,
  preselectedSolution?: string 
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    business_type: '',
    interested_solution: preselectedSolution || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Reset form when modal opens with preselected solution
  React.useEffect(() => {
    if (isOpen && preselectedSolution) {
      setFormData(prev => ({ ...prev, interested_solution: preselectedSolution }));
    }
  }, [isOpen, preselectedSolution]);

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
          business_type: formData.interested_solution, // On utilise ce champ pour la solution
          created_at: new Date().toISOString()
        }]);

      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          business_type: '',
          interested_solution: ''
        });
      }, 3000);
    } catch (err) {
      console.error('Erreur:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const solutionOptions = [
    { id: 'all', label: 'Toutes les solutions' },
    { id: 'whatsapp_contacts', label: '📱 Collecte Contacts WhatsApp' },
    { id: 'delivery_automation', label: '🚚 Gestion automatisée des livreurs' },
    { id: 'order_sync', label: '🔄 Reconciliation des paiements' }
  ];

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
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-dukka-blue to-dukka-blue-700 p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Rejoignez la liste d'attente</h3>
                <p className="text-sm text-white/80">Soyez prévenu en avant-première</p>
              </div>
            </div>
          </div>

          {/* Body */}
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
                <p className="text-gray-600">Nous vous préviendrons dès que les solutions seront disponibles.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dukka-blue focus:border-transparent transition-all"
                    placeholder="Ex: Aminata Diallo"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Votre email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dukka-blue focus:border-transparent transition-all"
                    placeholder="Ex: aminata@example.com"
                  />
                </div>

                {/* Téléphone (optionnel) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp <span className="text-gray-400">(optionnel)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dukka-blue focus:border-transparent transition-all"
                    placeholder="Ex: +221 77 123 45 67"
                  />
                </div>

                {/* Solution qui intéresse */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quelle solution vous intéresse le plus ? *
                  </label>
                  <select
                    required
                    value={formData.interested_solution}
                    onChange={e => setFormData(prev => ({ ...prev, interested_solution: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-dukka-blue focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Sélectionnez une option</option>
                    {solutionOptions.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Error */}
                {error && (
                  <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-dukka-blue to-dukka-blue-700 text-white font-semibold py-4 rounded-lg hover:from-dukka-blue-700 hover:to-dukka-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Inscription en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Rejoindre la liste d'attente</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  En vous inscrivant, vous acceptez de recevoir des emails de Dukka concernant nos nouveaux produits.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function PipelineSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<string | undefined>();

  const handleSolutionSelect = (solutionId: string) => {
    setSelectedSolution(solutionId);
    setIsModalOpen(true);
  };

  const handleGlobalCTA = () => {
    setSelectedSolution('all');
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="pipeline" className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-dukka-blue via-dukka-blue to-[#1a3a7d]">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1a3a7d]/30 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
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
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-white">
                Notre vision pour l'e-commerce africain
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Chatseller n'est que le début.
              <br />
              <span className="text-white/80">Voici ce qu'on construit.</span>
            </h2>

            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Chaque solution résout un problème spécifique que vous vivez au quotidien.
              <br className="hidden sm:block" />
              Notre mission est que votre Shopify fonctionne aussi bien à Dakar qu'à Paris.
            </p>
          </motion.div>

          {/* Solutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {futureSolutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
                onSelect={handleSolutionSelect}
              />
            ))}
          </div>

          {/* Vision Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Notre mission
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    Nous développons les outils que nous aurions voulu avoir pour gérer nos boutiques en ligne en Afrique. 
                    Pas des outils américains adaptés, mais des solutions nées des problèmes du terrain.
                    Chaque outil que nous développons, nous l'utilisons d'abord pour nos propres marques.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-4 lg:gap-8 max-w-3xl mx-auto mb-12"
          >
            {[
              { value: '1', label: 'solution déployée' },
              { value: '3', label: 'Solutions en développement' },
              { value: '+150', label: 'E-commerçants en attente' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Global CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={handleGlobalCTA}
              className="inline-flex items-center space-x-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-dukka-blue font-bold text-base sm:text-lg rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl group"
            >
              <Rocket className="w-5 h-5" />
              <span>Être prévenu des lancements</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="mt-4 text-sm text-white/60">
              Rejoignez les +150 e-commerçants déjà inscrits
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal Waitlist */}
      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSolution(undefined);
        }}
        preselectedSolution={selectedSolution}
      />
    </>
  );
}