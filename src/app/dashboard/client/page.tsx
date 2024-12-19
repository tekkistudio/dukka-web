'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, ChevronDown, Bell, Send, 
  TrendingUp, Users, ShoppingBag,
  ArrowUpRight, MessageCircle,
  Mic
} from 'lucide-react';
import { LoadingDots } from '@/components/waitlist/LoadingDots';

const initialQuickResponses = [
  "Comment se porte mon business aujourd'hui ?",
  "Quel est mon produit qui se vend le mieux ?",
  "D'où viennent les visiteurs de ma boutique ?",
  "Comment augmenter mes ventes ?"
];

export default function DashboardPage() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Bonjour Mouhamadou 👋 Je suis votre assistant personnel. Je suis là pour vous aider à comprendre vos performances et augmenter vos ventes. Comment puis-je vous aider aujourd'hui ?"
    }
  ]);

  const availableResponses = initialQuickResponses.filter(
    question => !askedQuestions.includes(question)
  );

  const handleSendMessage = async (text = message) => {
    if (!text.trim()) return;

    // Ajouter le message de l'utilisateur
    setMessages(prev => [...prev, { type: 'user', content: text }]);
    
    // Ajouter la question à la liste des questions posées
    if (initialQuickResponses.includes(text)) {
      setAskedQuestions(prev => [...prev, text]);
    }

    // Afficher l'animation de chargement
    setIsLoading(true);

    // Simuler une réponse de l'assistant basée sur la question
    await new Promise(resolve => setTimeout(resolve, 1500));

    let response = "";
    switch (text) {
      case "Comment se porte mon business aujourd'hui ?":
        response = "Votre business se porte très bien aujourd'hui ! Vous avez reçu 20 visiteurs et 9 d'entre eux ont acheté, ce qui est super !\n\n Vos mocassins tressés se vendent très bien, avec une augmentation des ventes de 45% ce mois-ci. Attention par contre, il ne vous reste presque plus de pointures 42 et 43 en stock. Il faudrait en commander rapidement pour ne pas manquer de futures ventes.\n\nVoulez-vous que je vous aide à gérer votre stock pour ne jamais être en rupture ?";
        break;
      case "Quel est mon produit qui se vend le mieux ?":
        response = "Vos Mocassins Tressés sont clairement les stars de la semaine ! Les clients les adorent. Pour en vendre encore plus, vous pourriez :\n\n• Ajouter plus de tailles disponibles\n• Proposer de nouvelles couleurs\n• Faire plus de photos pour montrer différentes façons de les porter\n\nVoulez-vous voir le classement complet de vos produits les plus vendus ?";
        break;
      case "D'où viennent les visiteurs de ma boutique ?":
        response = "La majorité de vos clients vous découvrent sur TikTok - 63 visiteurs sur 100 viennent de là ! Instagram vous apporte aussi beaucoup de visites (27 sur 100).\n\nLe reste se répartit entre :\n• Facebook : 6 visiteurs sur 100\n• Google : 3 visiteurs sur 100\n• Visites directes : 1 visiteur sur 100\n\nVoulez-vous que je vous montre comment attirer encore plus de visiteurs ?";
        break;
      case "Comment augmenter mes ventes ?":
        response = "Bonne nouvelle : votre boutique convertit très bien ! Sur 20 visiteurs, 9 achètent déjà. C'est excellent ! La clé pour vendre plus est donc simple : faire venir plus de visiteurs.\n\nVoici comment :\n\n1. Créer plus de contenu sur TikTok et Instagram - c'est de là que viennent la plupart de vos clients actuels\n\n2. Tester la publicité payante - même avec un petit budget, vous pouvez toucher plus de monde\n\n3. Collaborer avec des influenceurs qui parlent à votre cible\n\n4. Essayer de nouveaux réseaux sociaux comme WhatsApp Business\n\nPar quoi voulez-vous commencer ?";
        break;
      default:
        response = "Oups! Je sais que vous avez hâte de discuter avec moi, mais je ne suis pas encore officiellement opérationnel. Veuillez choisir l'une des réponses proposées en attendant.";
    }

    setIsLoading(false);
    setMessages(prev => [...prev, { type: 'assistant', content: response }]);
    setMessage('');
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Bonjour Mouhamadou 👋</h1>
          <p className="text-gray-600">Voici un aperçu de votre business aujourd'hui</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Dernière mise à jour : il y a 5 minutes
          </div>

          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-50">
              <Store className="w-4 h-4" />
              <span>SAPATOU</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-medium">Ventes du jour</h3>
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              +12.5%
            </div>
          </div>
          <div className="text-3xl font-bold">407,000 FCFA</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-500">9 commandes</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">Voir détails</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium">Conversations actives</h3>
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              +5
            </div>
          </div>
          <div className="text-3xl font-bold">8</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-500">3 prêts à commander</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">Gérer</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium">Taux de conversion</h3>
            </div>
            <div className="flex items-center gap-1 text-green-500 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              +2.3%
            </div>
          </div>
          <div className="text-3xl font-bold">45%</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-500">Moyenne du mois: 37%</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">Analyser</span>
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
              <img src="/images/logo/fav.svg" alt="Dukka" className="h-7" />
            </div>
            <div>
              <h2 className="font-semibold">Assistant Dukka</h2>
              <p className="text-sm text-gray-500">Votre conseiller business personnel disponible 24/7</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 bg-green-50 text-green-600 text-sm px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            En ligne
          </span>
        </div>

        <div className="h-[400px] overflow-y-auto p-6 space-y-4 bg-[#F0F2F5]">
          {messages.map((message, index) => (
            <div key={index} className="flex gap-4">
              {message.type === 'assistant' && (
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <img src="/images/logo/fav.svg" alt="Dukka" className="h-7" />
                </div>
              )}
              <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                {message.type === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">Assistant Dukka</span>
                  </div>
                )}
                <div className={`p-4 rounded-lg ${
                  message.type === 'assistant' 
                    ? 'bg-white' 
                    : 'bg-blue-600 text-white'
                } whitespace-pre-line`}>
                  <div className="text-sm">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'assistant' ? 'text-gray-500' : 'text-blue-200'
                  }`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Animation */}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <img src="/images/logo/fav.svg" alt="Dukka" className="h-7" />
              </div>
              <LoadingDots />
            </div>
          )}

          {/* Quick Responses */}
          {availableResponses.length > 0 && !isLoading && (
            <div className="flex flex-wrap gap-2">
              {availableResponses.map((response, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSendMessage(response)}
                  className="bg-white hover:bg-gray-50 text-dukka-primary px-4 py-2.5 rounded-full transition-colors text-sm border border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {response}
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-3">
            <input 
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Posez votre question..."
              className="flex-1 bg-transparent px-2 focus:outline-none"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && message.trim()) {
                  handleSendMessage();
                }
              }}
            />
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2 rounded-lg transition-colors ${
                isRecording ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleSendMessage()}
              className={`p-2 rounded-lg transition-colors ${
                message.trim() ? 'text-blue-600 hover:bg-blue-50' : 'text-gray-400'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}