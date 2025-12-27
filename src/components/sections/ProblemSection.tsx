'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  RefreshCw, 
  Copy, 
  Users,
  Clock,
  AlertTriangle,
  XCircle,
  TrendingDown,
  Smartphone,
  CreditCard,
  Mail
} from 'lucide-react';

// Données des problèmes
const problemsData = [
  {
    icon: <MessageCircle className="h-7 w-7" />,
    title: '"J\'ai des tâches depuis ma grossesse. Je ne sais pas comment m\'en débarrasser."',
    description: 'Vos clientes ne cherchent pas juste un produit. Elles viennent avec leur situation personnelle et veulent être écoutées, conseillées et accompagnées.',
    colorClasses: {
      bg: 'from-orange-50/80 via-amber-50/50 to-orange-50/80',
      border: 'border-orange-200',
      text: 'text-orange-600',
      badge: 'bg-gradient-to-r from-orange-500 to-red-500',
      light: 'bg-orange-100',
      medium: 'bg-orange-200'
    },
    painPoints: [
      '2 à 3 heures par jour perdues à répondre aux mêmes questions',
      'Des clientes déçues parce que vous ne répondez pas assez vite',
      'Les fiches produits et FAQ sur votre site sont insuffisantes',
      'Impossible de faire croître votre business de cette façon'
    ],
    metric: '2-3h perdues/jour',
    visual: 'whatsapp-questions',
    stats: {
      primary: '+50',
      primaryLabel: 'Messages/jour',
      secondary: '70%',
      secondaryLabel: 'De questions répétitives'
    }
  },
  {
    icon: <RefreshCw className="h-7 w-7" />,
    title: 'Commande livrée et payée, mais Shopify affiche "En attente de paiement".',
    description: 'Shopify ne gère pas les paiements effectuées hors de sa plateforme. Vous devez donc mettre à jour manuellement chaque commande payée via Wave, OM ou cash.',
    colorClasses: {
      bg: 'from-blue-50/80 via-sky-50/50 to-blue-50/80',
      border: 'border-blue-200',
      text: 'text-blue-600',
      badge: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      light: 'bg-blue-100',
      medium: 'bg-blue-200'
    },
    painPoints: [
      '30 commandes = 30 mises à jour manuelles',
      'Risques d\'erreurs dans la mise à jour des commandes',
      'Inventaire souvent incorrect après réconciliation',
      'Aucune automatisation possible'
    ],
    metric: '30 clics/jour',
    visual: 'wave-shopify',
    stats: {
      primary: '90%',
      primaryLabel: 'Paiements par Wave/OM',
      secondary: '0%',
      secondaryLabel: 'Automatisation'
    }
  },
  {
    icon: <Copy className="h-7 w-7" />,
    title: 'Chaque nouvelle commande est transmise manuellement à votre livreur.',
    description: 'Pour chaque commande, vous faites la même chose : ouvrir Shopify, récupérer les infos de la commande, les copier, puis les transmettre au livreur.',
    colorClasses: {
      bg: 'from-purple-50/80 via-violet-50/50 to-purple-50/80',
      border: 'border-purple-200',
      text: 'text-purple-600',
      badge: 'bg-gradient-to-r from-purple-500 to-violet-500',
      light: 'bg-purple-100',
      medium: 'bg-purple-200'
    },
    painPoints: [
      'Erreur de saisie = risque d\'annulation de la commande',
      'Clients mécontents à cause des retards',
      'Livreur payé pour rien, en cas d\'annulation',
      'Client perdu définitivement'
    ],
    metric: '2 - 3 min/commande',
    visual: 'copy-paste',
    stats: {
      primary: '2 à 3 min',
      primaryLabel: 'Par commande',
      secondary: '15%',
      secondaryLabel: 'Taux d\'erreur'
    }
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: 'Vous avez des clients que vous ne pouvez pas atteindre sans passer par la pub.',
    description: 'Vous avez vendu à des centaines de clients. Ils vous ont fait confiance. Mais aujourd\'hui, vous n\'avez aucun moyen de les recontacter directement sans payer de la pub.',
    colorClasses: {
      bg: 'from-slate-50/80 via-gray-50/50 to-slate-50/80',
      border: 'border-slate-200',
      text: 'text-slate-600',
      badge: 'bg-gradient-to-r from-slate-500 to-gray-600',
      light: 'bg-slate-100',
      medium: 'bg-slate-200'
    },
    painPoints: [
      'Formulaire newsletter : 10 inscrits en 6 mois',
      'Emails : personne ne les consulte réellement',
      'Numéros WhatsApp éparpillés dans les commandes',
      'Dépendance totale à la publicité payante (Meta, Google...)'
    ],
    metric: '0 contact direct',
    visual: 'no-list',
    stats: {
      primary: '2%',
      primaryLabel: 'Ouverture emails',
      secondary: '95%',
      secondaryLabel: 'Utilisent WhatsApp'
    }
  }
];

// Composants visuels pour chaque problème
const WhatsAppQuestionsVisual = () => (
  <div className="bg-white/70 rounded-xl p-4 border border-green-200/50 backdrop-blur-sm">
    <div className="space-y-3">
      <div className="text-sm font-semibold text-green-700 mb-2 flex items-center">
        <Smartphone className="w-4 h-4 mr-2" />
        Messages WhatsApp fréquents
      </div>
      
      <div className="space-y-2">
        {[
          { time: '09:12', msg: 'J\'ai la peau grasse mais elle tiraille. Que dois-je faire ?' },
          { time: '09:34', msg: 'Je perds des cheveux au niveau des tempes. Comment empêcher ça ?' },
          { time: '10:15', msg: 'Je veux offrir un parfum à mon mari, mais je ne sais pas lequel choisir' },
        ].map((item, index) => (
          <div key={index} className="bg-green-50 rounded-lg p-2 border-l-4 border-green-400">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-black-500 font-medium">{item.time}</span>
              <span className="text-xs text-orange-500">En attente...</span>
            </div>
            <p className="text-xs text-gray-700 line-clamp-2">{item.msg}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-300">
        <div className="flex items-center text-xs text-red-500">
          <AlertTriangle className="w-3 h-3 mr-1" />
          <span className="font-medium">12 messages non lus</span>
        </div>
        <div className="flex items-center text-xs text-orange-500">
          <Clock className="w-3 h-3 mr-1" />
          <span>~3h pour répondre</span>
        </div>
      </div>
    </div>
  </div>
);

const WaveShopifyVisual = () => (
  <div className="bg-white/70 rounded-xl p-4 border border-blue-200/50 backdrop-blur-sm">
    <div className="space-y-3">
      <div className="text-sm font-semibold text-blue-700 mb-2">
        Votre routine quotidienne
      </div>
      
      <div className="flex items-center justify-between gap-3">
        {/* Wave */}
        <div className="flex-1 bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
          <div className="w-10 h-10 mx-auto mb-2 bg-blue-500 rounded-full flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div className="text-xs font-bold text-blue-700">Wave</div>
          <div className="text-xs text-green-600 font-medium mt-1">+15 000 F reçus ✓</div>
        </div>

        {/* Flèche */}
        <div className="flex flex-col items-center">
          <RefreshCw className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-400 mt-1">Manuel</span>
        </div>

        {/* Shopify */}
        <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
          <div className="w-10 h-10 mx-auto mb-2 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          <div className="text-xs font-bold text-gray-700">Shopify</div>
          <div className="text-xs text-orange-500 font-medium mt-1">⏳ En attente...</div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
        <div className="text-xs text-amber-800">
          <span className="font-bold">Ce que vous faites :</span> Ouvrir Shopify → Trouver la commande #1847 → 
          Marquer comme payée et traitée → Archiver
        </div>
        <div className="text-xs text-amber-600 mt-1 font-medium">
          30 commandes = 30 fois cette manipulation
        </div>
      </div>
    </div>
  </div>
);

const CopyPasteVisual = () => (
  <div className="bg-white/70 rounded-xl p-4 border border-purple-200/50 backdrop-blur-sm">
    <div className="space-y-3">
      <div className="text-sm font-semibold text-purple-700 mb-2">
        Transmission au livreur — Commande #1847
      </div>
      
      {/* Shopify source */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
        <div className="text-xs text-gray-500 mb-2">Depuis Shopify :</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center">
            <span className="text-gray-400 w-16">Nom:</span>
            <span className="font-medium bg-purple-100 px-1 rounded">Aminata Diallo</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 w-16">Tél:</span>
            <span className="font-medium bg-purple-100 px-1 rounded">77 123 45 67</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 w-16">Adresse:</span>
            <span className="font-medium bg-purple-100 px-1 rounded">Sacré-Cœur 3, Villa 12</span>
          </div>
        </div>
      </div>

      {/* Flèche copier-coller */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 text-purple-500">
          <Copy className="w-4 h-4" />
          <span className="text-xs font-medium">Copier-coller manuel</span>
        </div>
      </div>

      {/* WhatsApp destination */}
      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
        <div className="text-xs text-green-700 mb-2 font-medium">Message à Mamadou (livreur) :</div>
        <div className="text-xs text-gray-700 bg-white p-2 rounded border">
          &quot;Aminata Diallo, 77 123 45 67, Sacré-Cœur 3, Villa 12. 
          Commande : 2x Crème hydratante&quot;
        </div>
      </div>

      <div className="flex items-center justify-center text-xs text-red-500 bg-red-50 p-2 rounded-lg">
        <XCircle className="w-3 h-3 mr-1" />
        <span>Une erreur de copie = commande annulée</span>
      </div>
    </div>
  </div>
);

const NoListVisual = () => (
  <div className="bg-white/70 rounded-xl p-4 border border-slate-200/50 backdrop-blur-sm">
    <div className="space-y-3">
      <div className="text-sm font-semibold text-slate-700 mb-2">
        Vos canaux de communication
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Newsletter */}
        <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
          <Mail className="w-6 h-6 mx-auto mb-2 text-red-400" />
          <div className="text-xs font-bold text-gray-700">Newsletter</div>
          <div className="text-lg font-bold text-red-500">12</div>
          <div className="text-xs text-gray-500">inscrits en 6 mois</div>
        </div>

        {/* Taux d'ouverture */}
        <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
          <TrendingDown className="w-6 h-6 mx-auto mb-2 text-red-400" />
          <div className="text-xs font-bold text-gray-700">Taux d&apos;ouverture</div>
          <div className="text-lg font-bold text-red-500">2%</div>
          <div className="text-xs text-gray-500">des emails</div>
        </div>
      </div>

      <div className="bg-slate-100 rounded-lg p-3 border border-slate-200">
        <div className="text-xs text-slate-600 mb-2">
          <span className="font-bold">Nouvelle collection disponible !</span>
        </div>
        <div className="text-xs text-slate-500">
          → 500 clients ont déjà acheté chez vous
        </div>
        <div className="text-xs text-slate-500">
          → 0 moyen de les prévenir
        </div>
        <div className="text-xs text-red-500 font-medium mt-2">
          → Vous repartez de zéro avec la pub payante
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full">
          <Smartphone className="w-3 h-3 mr-1" />
          Pourtant, 95% de vos clients sont sur WhatsApp tous les jours
        </div>
      </div>
    </div>
  </div>
);

// Fonction pour obtenir le bon visuel
const getVisualComponent = (visualType: string) => {
  switch (visualType) {
    case 'whatsapp-questions':
      return <WhatsAppQuestionsVisual />;
    case 'wave-shopify':
      return <WaveShopifyVisual />;
    case 'copy-paste':
      return <CopyPasteVisual />;
    case 'no-list':
      return <NoListVisual />;
    default:
      return null;
  }
};

// Carte problème complète
interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClasses: any;
  painPoints: string[];
  metric: string;
  visual: string;
  stats: {
    primary: string;
    primaryLabel: string;
    secondary: string;
    secondaryLabel: string;
  };
  isActive?: boolean;
  delay?: number;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
  icon,
  title,
  description,
  colorClasses,
  painPoints,
  metric,
  visual,
  stats,
  isActive = false,
  delay = 0
}) => {
  return (
    <div 
      className={`relative p-6 rounded-2xl border bg-gradient-to-br ${colorClasses.bg} ${colorClasses.border} shadow-xl transition-all duration-700 transform ${
        isActive ? 'scale-105 shadow-2xl' : 'scale-100'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Badge métrique */}
      <div className="absolute -top-3 right-6 z-10">
        <span className={`text-xs font-bold px-4 py-2 rounded-full ${colorClasses.badge} text-white shadow-lg border-2 border-white`}>
          {metric}
        </span>
      </div>

      {/* Header avec icon et titre */}
      <div className="flex items-start justify-between mb-6 pt-2">
        <div className="flex items-start space-x-4">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClasses.text} bg-white/80 shadow-lg`}>
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
              {title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="text-center p-3 bg-white/60 rounded-xl border border-white/50">
          <div className={`text-xl font-bold ${colorClasses.text} mb-1`}>
            {stats.primary}
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {stats.primaryLabel}
          </div>
        </div>
        <div className="text-center p-3 bg-white/60 rounded-xl border border-white/50">
          <div className={`text-xl font-bold ${colorClasses.text} mb-1`}>
            {stats.secondary}
          </div>
          <div className="text-xs text-gray-600 font-medium">
            {stats.secondaryLabel}
          </div>
        </div>
      </div>

      {/* Visuel dynamique */}
      <div className="mb-5">
        {getVisualComponent(visual)}
      </div>

      {/* Liste des pain points */}
      <ul className="space-y-2">
        {painPoints.map((point, index) => (
          <li 
            key={index} 
            className="flex items-start text-sm text-gray-700"
          >
            <XCircle className={`w-4 h-4 mt-0.5 mr-3 flex-shrink-0 text-red-400`} />
            <span className="font-medium">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Header content
const HeaderContent = () => (
  <>
    <div className="inline-flex items-center px-6 py-3 mb-8 border border-white/30 rounded-full bg-white/10 text-sm font-semibold text-white backdrop-blur-sm">
      <AlertTriangle className="w-4 h-4 mr-2" />
      Les défis de l&apos;e-commerce en Afrique
    </div>
    
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
      Voici les galères que Shopify{' '}
      <span className="relative inline-block whitespace-nowrap">
        <span className="relative z-10">ne résout pas</span>
        <svg
          className="absolute -bottom-2 left-0 w-full"
          height="10"
          viewBox="0 0 200 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M1 6C50 2 100 2 199 6"
            stroke="#ffc107"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </span>{' '}
      pour vous
    </h2>
    
    <p className="text-lg text-white/80">
      Vous avez créé votre boutique en ligne. Mais chaque jour, vous perdez du temps 
      sur des tâches que votre plateforme ne gère pas.
    </p>
  </>
);

// Layout Mobile
const MobileProblemsLayout = () => {
  return (
    <>
      <div className="text-center max-w-4xl mx-auto mb-12">
        <HeaderContent />
      </div>

      <div className="space-y-12 max-w-xl mx-auto">
        {problemsData.map((problem, index) => (
          <ProblemCard
            key={index}
            {...problem}
            delay={index * 200}
          />
        ))}
      </div>
    </>
  );
};

// Layout Desktop avec navigation cliquable
const DesktopProblemsLayout = ({ 
  activeProblem,
  setActiveProblem
}: { 
  activeProblem: number,
  setActiveProblem: (index: number) => void
}) => {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
      
      {/* Contenu gauche - Navigation */}
      <div className="space-y-8">
        <HeaderContent />
        
        {/* Navigation des problèmes */}
        <div className="space-y-4">
          {problemsData.map((problem, index) => (
            <div 
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-500 hover:shadow-lg ${
                index === activeProblem 
                  ? 'bg-white shadow-xl border-2 border-orange-200 scale-105' 
                  : 'bg-white/20 hover:bg-white/40 border border-white/20'
              }`}
              onClick={() => setActiveProblem(index)}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                index === activeProblem 
                  ? `${problem.colorClasses.text} bg-white shadow-lg scale-110` 
                  : 'text-white/70 bg-white/20'
              }`}>
                {problem.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold transition-colors duration-300 line-clamp-1 ${
                  index === activeProblem ? 'text-gray-900' : 'text-white'
                }`}>
                  {problem.title.length > 50 ? problem.title.substring(0, 50) + '...' : problem.title}
                </h3>
                <p className={`text-sm line-clamp-1 ${
                  index === activeProblem ? 'text-gray-500' : 'text-white/60'
                }`}>
                  {problem.description}
                </p>
              </div>
              {index === activeProblem && (
                <div className={`ml-auto px-3 py-1 rounded-full text-xs font-bold text-white ${problem.colorClasses.badge}`}>
                  {problem.metric}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Indicateur de sélection */}
        <div className="flex items-center space-x-3">
          <div className="text-sm text-white/70 font-medium">
            {activeProblem + 1} / {problemsData.length}
          </div>
          <div className="flex space-x-2">
            {problemsData.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeProblem 
                    ? 'bg-gradient-to-r from-orange-400 to-amber-400 w-6' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                onClick={() => setActiveProblem(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="text-xs text-white/50 italic">
          Cliquez sur un problème pour l&apos;explorer
        </div>
      </div>
      
      {/* Carte droite */}
      <div className="flex justify-center lg:sticky lg:top-32">
        <div className="w-full max-w-lg">
          <ProblemCard 
            key={activeProblem}
            {...problemsData[activeProblem]} 
            isActive={true}
            delay={0}
          />
        </div>
      </div>
    </div>
  );
};

// Composant principal
export default function ProblemSection() {
  const [activeProblem, setActiveProblem] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="problems" className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-dukka-blue via-dukka-blue to-[#1a3a7d]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#1a3a7d]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        {isMobile ? (
          <MobileProblemsLayout />
        ) : (
          <DesktopProblemsLayout 
            activeProblem={activeProblem}
            setActiveProblem={setActiveProblem}
          />
        )}

        {/* Transition Phrase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 lg:mt-24"
        >
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/20">
            <p className="text-xl lg:text-2xl text-white font-semibold mb-2">
              Ces problèmes, on les a vécus pendant des années.
            </p>
            <p className="text-lg text-white/90">
              C&apos;est justement pour ça qu&apos;on a créé Dukka.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}