// src/components/sections/DemoSection.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { GradientTitle } from '@/components/GradientTitle'
import { MessageCircle, ShoppingBag, CreditCard, CheckSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { 
  scenarios, 
  buildConversation, 
  botResponses, 
  checkoutFlow, 
  otherProducts,
  amaniFlow,
  ecoboomFlow 
} from './demo/data'
import { WaitlistButton } from '@/components/WaitlistButton'
import { isBrowser } from '@/utils/browser'
import ClientOnly from '@/components/client/ClientOnly'

// Chargement dynamique des composants interactifs côté client uniquement
const ChatInterface = dynamic(
  () => import('@/components/sections/demo/ChatInterface').then(mod => mod.ChatInterface),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[550px] bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-500">
        Chargement de l'interface...
      </div>
    )
  }
)

const ScenarioSelector = dynamic(
  () => import('@/components/sections/demo/ScenarioSelector'),
  { ssr: false }
)

// Features mise à jour avec des icônes plus pertinentes
const features = [
  {
    icon: MessageCircle,
    title: 'Conversation naturelle',
    description: 'Un dialogue simple et fluide qui guide le client du choix du produit jusqu\'à l\'achat, comme dans une boutique physique.'
  },
  {
    icon: CheckSquare,
    title: 'Checkout intégré',
    description: 'Le processus d\'achat se fait naturellement dans la conversation, sans formulaires complexes à remplir.'
  },
  {
    icon: CreditCard,
    title: 'Paiement mobile',
    description: 'Intégration directe des solutions de paiement que vos clients utilisent déjà (Wave, OM, etc.), en plus du paiement par carte bancaire.'
  }
]

export function DemoSection() {
  // États et fonctions du composant original
  const [activeScenario, setActiveScenario] = useState(scenarios[0])
  const [messages, setMessages] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<string>('')
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0)
  const [inCheckoutFlow, setInCheckoutFlow] = useState(false) // Nouvel état pour suivre si on est dans le flow d'achat
  const chatRef = useRef<HTMLDivElement>(null)
  const [orderData, setOrderData] = useState({
    quantity: 0,
    additionalProducts: [] as string[],
    size: '',
    accessories: [] as string[],
    deliveryTime: '',
    drinks: [] as string[],
    contactInfo: '',
    firstName: '',
    lastName: '',
    city: '',
    address: '',
    phone: '',
    paymentMethod: '',
    orderDetails: ''
  })

  // Cycle automatique à travers les fonctionnalités - seulement côté client
  useEffect(() => {
    if (!isBrowser()) return;
    
    const interval = setInterval(() => {
      setActiveFeatureIndex(prev => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMounted(true)
    setMessages(buildConversation(scenarios[0]))
  }, [])

  // Mise à jour de inCheckoutFlow en fonction de checkoutStep
  useEffect(() => {
    // Si checkoutStep a une valeur, nous sommes dans le flow d'achat
    setInCheckoutFlow(!!checkoutStep);
  }, [checkoutStep]);

  const calculateTotal = () => {
    const basePrice = activeScenario.product.price;
    let total = 0;
    let deliveryCost = orderData.city?.toLowerCase() === 'dakar' ? 0 : 3000;

    switch (activeScenario.id) {
      case 'viens-on-sconnait':
        const quantity = orderData.quantity || 1;
        
        // Calcul pour le pack approprié
        if (quantity >= 4) {
          total = basePrice * quantity * 0.8; // Pack Comité (-20%)
        } else if (quantity === 3) {
          total = 35700; // Pack Trio (prix fixe)
        } else if (quantity === 2) {
          total = 25200; // Pack Duo (prix fixe)
        } else {
          total = basePrice;
        }

        // Ajout des jeux additionnels
        if (orderData.additionalProducts.length > 0) {
          orderData.additionalProducts.forEach(product => {
            if (product.includes('Famille') || product.includes('Amis')) {
              total += 14000;
            } else if (product.includes('Couples')) {
              total += 14000 * 0.9; // -10% sur le jeu Couples
            }
          });
        }

        total += deliveryCost;
        break;

      case 'amani':
        // Prix de base pour la ceinture
        total = basePrice;
        
        // Gestion des accessoires
        if (orderData.accessories && orderData.accessories.length > 0) {
          const hasHousse = orderData.accessories.some(a => a.includes('housse'));
          const hasTisanes = orderData.accessories.some(a => a.includes('tisanes'));
          const hasBatterie = orderData.accessories.some(a => a.includes('batterie'));

          if (hasHousse && hasTisanes) {
            total = 38700; // Pack Complet
          } else if (hasHousse) {
            total = 32500; // Pack Sérénité
          } else {
            // Ajout individuel des accessoires
            if (hasHousse) total += 4500;
            if (hasTisanes) total += 6900;
            if (hasBatterie) total += 8500;
          }
        }
        
        // Livraison gratuite au-dessus de 30 000 FCFA
        if (total < 30000) {
          total += deliveryCost;
        }
        break;

      case 'ecoboom':
        // Prix selon la taille choisie
        let packPrice = basePrice;
        
        if (orderData.size) {
          switch(orderData.size) {
            case 'Nouveau-né':
              packPrice = 4800;
              break;
            case 'Taille S':
              packPrice = 5400;
              break;
            case 'Taille M':
              packPrice = 6400;
              break;
            case 'Taille L':
              packPrice = 6900;
              break;
            case 'Taille XL':
              packPrice = 7500;
              break;
          }
        }
        
        // Calcul des réductions selon la quantité
        const packQuantity = orderData.quantity || 1;
        
        if (packQuantity >= 5) {
          total = packPrice * packQuantity * 0.85; // -15%
        } else if (packQuantity >= 3) {
          total = packPrice * packQuantity * 0.9; // -10%
        } else {
          total = packPrice * packQuantity;
        }
        
        // Ajout des produits supplémentaires
        if (orderData.additionalProducts && orderData.additionalProducts.length > 0) {
          orderData.additionalProducts.forEach(product => {
            if (product.includes('lingettes')) {
              total += 3500;
            } else if (product.includes('crème')) {
              total += 2800;
            }
          });
        }

        total += deliveryCost;
        break;
    }
    
    return Math.round(total);
  };

  const getDiscount = () => {
    const quantity = orderData.quantity || 1;
    if (quantity > 3) return 20;
    if (quantity === 3) return 15;
    if (quantity === 2) return 10;
    return 0;
  }

  // Fonctions de gestion inchangées
  const handleScenarioChange = (scenario: any) => {
    setShowCheckout(false);
    setMessages(buildConversation(scenario));
    setActiveScenario(scenario);
    setCheckoutStep('');
    setOrderData({
      quantity: 0,
      additionalProducts: [],
      size: '',
      accessories: [],
      deliveryTime: '',
      drinks: [],
      contactInfo: '',
      firstName: '',
      lastName: '',
      city: '',
      address: '',
      phone: '',
      paymentMethod: '',
      orderDetails: ''
    });
  }

  const addBotResponse = async (responses: any[], delay = 1000) => {
    setIsTyping(true);
    
    for (const response of responses) {
      await new Promise(resolve => setTimeout(resolve, delay));
      const messageObject = response.type ? {
        ...response,
        content: typeof response.content === 'function' ? 
          response.content({ orderData, activeScenario, totalAmount: calculateTotal() }) : 
          response.content
      } : {
        type: 'assistant',
        content: response
      }
      setMessages(prev => [...prev, messageObject]);

      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }

    setIsTyping(false);
  };

  // Nouvelle fonction pour ajouter une réponse IA
  const handleAiResponse = (aiResponse: string) => {
    setIsTyping(true);
    
    // Simuler un délai de "frappe" pour une expérience plus réaliste
    setTimeout(() => {
      // Ajouter la réponse de l'IA avec le type 'assistant'
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: aiResponse
      }]);
      
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
      
      setIsTyping(false);
      
      // Ajouter des suggestions basées sur la réponse IA
      const suggestedResponses = getSuggestedResponsesFromAI(aiResponse);
      if (suggestedResponses.length > 0) {
        setMessages(prev => [...prev, {
          type: 'user-choices',
          choices: suggestedResponses
        }]);
      }
    }, 1000);
  };
  
  // Helper pour déterminer les suggestions basées sur la réponse IA
  const getSuggestedResponsesFromAI = (aiResponse: string): string[] => {
    if (aiResponse.includes('prix') || aiResponse.includes('FCFA')) {
      return ["Je souhaite commander", "Voir les options", "En savoir plus"];
    }
    
    if (aiResponse.includes('livraison')) {
      return ["Je souhaite commander", "Autres questions"];
    }
    
    // Suggestions par défaut selon le scénario
    switch (activeScenario.id) {
      case 'viens-on-sconnait':
        return ["Je souhaite commander", "Voir les packs", "Autres questions"];
      case 'amani':
        return ["Je souhaite commander", "Comment ça fonctionne ?", "Voir les avis clients"];
      case 'ecoboom':
        return ["Je souhaite commander", "Voir les tailles", "Questions fréquentes"];
      default:
        return ["Je souhaite commander", "En savoir plus"];
    }
  };

  const handleStartOrder = async () => {
    if (activeScenario.id === 'amani') {
      setCheckoutStep('size');
      await addBotResponse(amaniFlow.size);
    } else if (activeScenario.id === 'ecoboom') {
      setCheckoutStep('size');
      await addBotResponse(ecoboomFlow.size);
    } else {
      setCheckoutStep('quantity');
      await addBotResponse([{
        type: 'assistant',
        content: "C'est entendu ! Combien d'exemplaires souhaitez-vous commander ?"
      }, {
        type: 'user-choices',
        choices: ["1 exemplaire", "2 exemplaires", "3 exemplaires", "Plus"]
      }]);
    }
  };

  const handleQuantityChoice = async (choice: string) => {
    const quantity = parseInt(choice.split(' ')[0]) || 1;
    
    setOrderData(prev => ({ 
      ...prev, 
      quantity,
      orderDetails: `• ${activeScenario.product.name} (${quantity} exemplaire${quantity > 1 ? 's' : ''})`
    }));

    switch (activeScenario.id) {
      case 'amani':
        setCheckoutStep('accessories');
        await addBotResponse(amaniFlow.accessories);
        break;
      case 'ecoboom':
        if (choice.includes("M'abonner")) {
          setCheckoutStep('subscription');
          await addBotResponse(ecoboomFlow.subscription);
        } else {
          setCheckoutStep('additionalProducts');
          await addBotResponse(ecoboomFlow.additionalProducts);
        }
        break;
      case 'viens-on-sconnait':
        if (quantity > 1) {
          setOrderData(prev => ({
            ...prev,
            orderDetails: `• ${activeScenario.product.name} (${quantity} exemplaires avec -${getDiscount()}%)`
          }));
        }
        setCheckoutStep('additionalProducts');
        await addBotResponse([{
          type: 'assistant',
          content: "Excellent choix ! Souhaitez-vous découvrir les autres jeux de la gamme VIENS ON S'CONNAÎT ?"
        }, {
          type: 'user-choices',
          choices: ["Voir les autres jeux", "Continuer ma commande"]
        }]);
        break;
    }
  };

  const handleSizeChoice = async (choice: string) => {
    setOrderData(prev => ({ 
      ...prev, 
      size: choice,
      orderDetails: `• ${activeScenario.product.name} ${choice.includes('Taille') ? `(${choice})` : ''}`
    }));

    switch (activeScenario.id) {
      case 'amani':
        setCheckoutStep('quantity');
        await addBotResponse([{
          type: 'assistant',
          content: "Combien de ceintures souhaitez-vous commander ?"
        }, {
          type: 'user-choices',
          choices: ["1 ceinture", "2 ceintures (-10%)", "Pack famille"]
        }]);
        break;
      case 'ecoboom':
        setCheckoutStep('quantity');
        await addBotResponse(ecoboomFlow.quantity);
        break;
    }
  };

  const handleSubscriptionChoice = async (choice: string) => {
    if (choice === "Commander sans abonnement") {
      setCheckoutStep('additionalProducts');
      await addBotResponse(ecoboomFlow.additionalProducts);
      return;
    }

    setOrderData(prev => ({
      ...prev,
      orderDetails: prev.orderDetails + `\n• Abonnement: ${choice} (-20%)`
    }));
    
    setCheckoutStep('additionalProducts');
    await addBotResponse(ecoboomFlow.additionalProducts);
  };

  const handleAmaniFlow = async (choice: string) => {
    if (!choice) return;

    // Gestion des accessoires
    if (checkoutStep === 'accessories') {
      if (!choice.includes('Continuer')) {
        const accessory = choice.split('Ajouter ')[1];
        setOrderData(prev => ({
          ...prev,
          accessories: [...(prev.accessories || []), accessory],
          orderDetails: prev.orderDetails ? prev.orderDetails + `\n• ${accessory}` : `• ${accessory}`
        }));
        await addBotResponse([
          {
            type: 'assistant',
            content: `J'ai bien ajouté ${accessory} à votre commande. Souhaitez-vous ajouter un autre accessoire ?`
          },
          ...amaniFlow.accessories
        ]);
      } else {
        setCheckoutStep('contactInfo');
        await addBotResponse(checkoutFlow.contactInfo);
      }
    } else if (checkoutStep === 'quantity') {
      await handleQuantityChoice(choice);
    } else if (choice === "Comment ça fonctionne ?") {
      await addBotResponse([{
        type: 'assistant',
        content: `La ceinture chauffante Mia est très simple d'utilisation :

1️⃣ Placez la ceinture sur votre bas-ventre
2️⃣ Ajustez la sangle élastique pour un maintien confortable
3️⃣ Appuyez sur le bouton central pour l'allumer
4️⃣ Sélectionnez le niveau de chaleur souhaité (4 intensités)
5️⃣ Activez le mode massage vibrant si désiré (4 modes de vibration)

La chaleur diffusée pénètre profondément pour détendre les muscles et soulager les crampes. Vous pouvez porter Mia discrètement sous vos vêtements, afin de vous accompagner en toute sérénité tout au long de la journée, durant votre période du mois.`
      }, {
        type: 'user-choices',
        choices: [
          "Je souhaite commander",
          "Voir les avis clients",
          "En savoir plus"
        ]
      }]);
    } else if (choice === "Voir les avis clients") {
      await addBotResponse([{
        type: 'assistant',
        content: `🌟 Témoignages de nos clientes :

Sarah K. ⭐⭐⭐⭐⭐
"La ceinture Mia a changé ma vie ! Je peux enfin continuer mes activités pendant mes règles sans être handicapée par la douleur. L'autonomie est excellente et la chaleur vraiment efficace."

Aminata D. ⭐⭐⭐⭐⭐
"Je souffre d'endométriose et cette ceinture m'apporte un vrai soulagement. J'apprécie particulièrement la fonction massage qui détend les muscles. Je recommande absolument !"

Fatou N. ⭐⭐⭐⭐
"Produit de qualité qui tient ses promesses. La batterie tient bien la charge. Seul petit bémol : j'aurais aimé qu'elle soit un peu plus large pour couvrir davantage la zone lombaire."

Plus de 50 avis avec une note moyenne de 4.8/5 !`
      }, {
        type: 'user-choices',
        choices: [
          "Je souhaite commander",
          "Voir les prix",
          "Poser une autre question"
        ]
      }]);
    } else if (choice === "Choisir un pack") {
      await addBotResponse([{
        type: 'assistant',
        content: `Voici nos packs disponibles :

🌟 Pack Sérénité : 
• Ceinture Mia + Housse de transport = 32 500 FCFA (au lieu de 34 400 FCFA)

✨ Pack Complet : 
• Ceinture Mia + Housse + Tisanes bio = 38 700 FCFA (au lieu de 41 300 FCFA)

💝 Pack Famille (2 ceintures) : 
• 2 Ceintures Mia = 54 900 FCFA (au lieu de 59 800 FCFA)

La livraison est offerte sur tous les packs ! Que souhaitez-vous ?`
        }, {
          type: 'user-choices',
          choices: [
            "Choisir Pack Sérénité",
            "Choisir Pack Complet",
            "Choisir Pack Famille",
            "Commander la ceinture seule"
          ]
        }]);
    } else if (choice.includes("Choisir Pack")) {
      const packType = choice.split("Choisir ")[1];
      const accessories: Record<string, string[]> = {
        "Pack Sérénité": ["la housse de transport"],
        "Pack Complet": ["la housse de transport", "les tisanes bio"],
        "Pack Famille": []
      };

      setOrderData(prev => ({
        ...prev,
        accessories: accessories[packType] || [],
        quantity: packType === "Pack Famille" ? 2 : 1,
        orderDetails: `• ${packType}`
      }));

      setCheckoutStep('contactInfo');
      await addBotResponse(checkoutFlow.contactInfo);
    }
  };

  const handleEcoboomFlow = async (choice: string) => {
    if (!choice) return;
  
    if (checkoutStep === 'size') {
      await handleSizeChoice(choice);
    } else if (checkoutStep === 'quantity') {
      await handleQuantityChoice(choice);
    } else if (checkoutStep === 'subscription') {
      await handleSubscriptionChoice(choice);
    } else if (checkoutStep === 'additionalProducts') {
      if (!choice.includes('Continuer')) {
        const product = choice.split('Ajouter ')[1];
        setOrderData(prev => ({
          ...prev,
          additionalProducts: [...(prev.additionalProducts || []), product],
          orderDetails: prev.orderDetails + `\n• ${product}`
        }));
        await addBotResponse([
          {
            type: 'assistant',
            content: `J'ai bien ajouté ${product} à votre commande. Souhaitez-vous ajouter autre chose ?`
          },
          {
            type: 'user-choices',
            choices: [
              "Ajouter des lingettes biodégradables",
              "Ajouter un pack d'essai de crème change",
              "Continuer sans produit supplémentaire"
            ]
          }
        ]);
      } else {
        setCheckoutStep('contactInfo');
        await addBotResponse(checkoutFlow.contactInfo);
      }
    } else if (choice === "Questions fréquentes") {
      await addBotResponse([{
        type: 'assistant',
        content: `❓ Questions fréquentes sur nos couches Ecoboom :

🌱 En quoi sont-elles écologiques ?
Nos couches sont fabriquées à partir de fibres de bambou biodégradables. Le bambou est une ressource renouvelable qui pousse rapidement sans pesticides et avec peu d'eau.

⏱️ Combien de temps pour se dégrader ?
Nos couches se décomposent en 3-5 ans contre 500 ans pour les couches classiques.

🧪 Sont-elles hypoallergéniques ?
Oui ! Elles sont sans parfum, sans chlore, sans latex et sans phtalates, idéales pour les peaux sensibles.

🔄 Comment fonctionne l'abonnement ?
Vous recevez automatiquement vos couches à la fréquence choisie avec 20% de réduction, sans engagement.`
      }, {
        type: 'user-choices',
        choices: [
          "Je souhaite commander",
          "Voir les tailles et prix",
          "Programme d'abonnement"
        ]
      }]);
    } else if (choice === "Programme d'abonnement") {
      await addBotResponse([{
        type: 'assistant',
        content: `Notre programme d'abonnement Ecoboom vous simplifie la vie :

✅ 20% de réduction permanente sur tous les produits
✅ Livraison gratuite et prioritaire
✅ Flexibilité : modifiez ou suspendez votre abonnement à tout moment
✅ Possibilité d'ajuster les tailles au fur et à mesure que bébé grandit
✅ Facture mensuelle automatique
✅ Cadeaux surprise réguliers pour vous et votre bébé

Sans engagement, annulable à tout moment.`
      }, {
        type: 'user-choices',
        choices: [
          "M'abonner maintenant",
          "Commander sans abonnement",
          "Plus d'informations"
        ]
      }]);
    } else if (choice === "Voir les coffrets découverte") {
      await addBotResponse([{
        type: 'assistant',
        content: `Nos coffrets découverte sont parfaits pour tester nos produits :

🎁 Coffret Naissance (14 500 FCFA) :
• 10 couches nouveau-né
• 1 pack de lingettes biodégradables
• 1 mini crème change naturelle
• 1 savon doux bio pour bébé

🎁 Coffret Multi-tailles (18 900 FCFA) :
• 6 couches taille S
• 6 couches taille M
• 6 couches taille L
• 1 pack de lingettes biodégradables

🎁 Coffret Cadeau (21 500 FCFA) :
• 10 couches au choix
• 1 ensemble body + bonnet en coton bio
• 1 coffret soins essentiels bio`
      }, {
        type: 'user-choices',
        choices: [
          "Commander un coffret",
          "Commander des packs standard",
          "Voir les prix"
        ]
      }]);
    } else if (choice === "M'abonner maintenant") {
      setCheckoutStep('subscription');
      await addBotResponse(ecoboomFlow.subscription);
    }
  };

  const handleAdditionalProducts = async (choice: string) => {
    if (choice === "Voir les autres jeux") {
      await addBotResponse(otherProducts);
    } else if (choice.includes("Ajouter")) {
      const productName = choice.split("Ajouter ")[1];
      setOrderData(prev => ({
        ...prev,
        additionalProducts: [...prev.additionalProducts, productName],
        orderDetails: prev.orderDetails + `\n• ${productName}`
      }));
      await addBotResponse([{
        type: 'assistant',
        content: `Parfait ! J'ai bien ajouté ${productName} à votre commande. 🎉`
      }]);
      setCheckoutStep('contactInfo');
      await addBotResponse(checkoutFlow.contactInfo);
    } else {
      setCheckoutStep('contactInfo');
      await addBotResponse(checkoutFlow.contactInfo);
    }
  };

  const handleContactInfo = async (choice: string) => {
    const names = choice.trim().split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ');
    
    setOrderData(prev => ({ 
      ...prev, 
      contactInfo: choice,
      firstName,
      lastName
    }));
    
    setCheckoutStep('address');
    await addBotResponse(checkoutFlow.address.map(msg => ({
      ...msg,
      content: typeof msg.content === 'function' ? 
        msg.content({ firstName }) : 
        msg.content
    })));
  };

  const handleAddress = async (choice: string) => {
    setOrderData(prev => ({ ...prev, city: choice }));
    setCheckoutStep('deliveryAddress');
    await addBotResponse(checkoutFlow.deliveryAddress.map(msg => ({
      ...msg,
      content: typeof msg.content === 'function' ? 
        msg.content({ city: choice }) : 
        msg.content
    })));
  };

  const handleDeliveryAddress = async (choice: string) => {
    setOrderData(prev => ({ ...prev, address: choice }));
    setCheckoutStep('phone');
    await addBotResponse(checkoutFlow.phone.map(msg => ({
      ...msg,
      content: typeof msg.content === 'function' ? 
        msg.content({ firstName: orderData.firstName }) : 
        msg.content
    })));
  };

  const handlePhone = async (choice: string) => {
    setOrderData(prev => ({ ...prev, phone: choice }));
    setCheckoutStep('paymentMethod');
    
    // Création d'un objet de paramètres complet pour le template de paiement
    const paymentParams = { 
      orderData: { 
        ...orderData, 
        phone: choice 
      }, 
      totalAmount: calculateTotal(),
      activeScenario: activeScenario
    };
    
    // Préparation des messages de paiement
    const paymentMessages = checkoutFlow.paymentMethod.map(msg => {
      if (typeof msg.content === 'function') {
        return {
          ...msg,
          content: msg.content(paymentParams)
        };
      }
      return msg;
    });
    
    await addBotResponse(paymentMessages);
  };

  const handlePaymentMethod = async (choice: string) => {
    setOrderData(prev => ({ ...prev, paymentMethod: choice }));
    if (choice === 'Wave') {
      setShowCheckout(true);
      await addBotResponse(checkoutFlow.wavePayment);
    } else {
      await addBotResponse([{
        type: 'assistant',
        content: `Vous avez choisi le ${choice}. Un livreur va vous contacter pour procéder à la livraison. Si vous payez en espèce, assurez-vous d'avoir le montant précis de la commande.`
      }]);
    }
    setCheckoutStep('');
  };

  // Gestion de la saisie de message
  const handleTextInput = async (text: string) => {
    const textLower = text.toLowerCase();
    
    switch(checkoutStep) {
      case 'contactInfo':
        await handleContactInfo(text);
        break;
      case 'address':
        await handleAddress(text);
        break;
      case 'deliveryAddress':
        await handleDeliveryAddress(text);
        break;
      case 'phone':
        await handlePhone(text);
        break;
      default:
        // Nous ne traitons pas les entrées texte manuellement ici
        // lorsque nous ne sommes pas dans le flux de checkout
        // car cela sera géré par l'IA
        break;
    }
  };

  const handleUserChoice = async (choice: string, isTextInput: boolean = false) => {
    if (!isMounted) return;
  
    // Ajouter le message de l'utilisateur à la conversation
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: choice 
    }]);
  
    if (isTextInput) {
      // En checkout flow, traiter manuellement l'entrée texte
      if (inCheckoutFlow) {
        await handleTextInput(choice);
      }
      // Sinon, l'IA s'occupera de répondre via onAiResponse
      return;
    }

    // Gestion des choix utilisateur dans les différentes étapes
    switch(checkoutStep) {
      case 'quantity':
        await handleQuantityChoice(choice);
        break;
      case 'size':
        await handleSizeChoice(choice);
        break;
      case 'subscription':
        await handleSubscriptionChoice(choice);
        break;
      case 'accessories':
        if (activeScenario.id === 'amani') {
          await handleAmaniFlow(choice);
        }
        break;
      case 'additionalProducts':
        if (activeScenario.id === 'ecoboom') {
          await handleEcoboomFlow(choice);
        } else {
          await handleAdditionalProducts(choice);
        }
        break;
      case 'contactInfo':
        await handleContactInfo(choice);
        break;
      case 'address':
        await handleAddress(choice);
        break;
      case 'deliveryAddress':
        await handleDeliveryAddress(choice);
        break;
      case 'phone':
        await handlePhone(choice);
        break;
      case 'paymentMethod':
        await handlePaymentMethod(choice);
        break;
      default:
        // Gestion du scénario par défaut, selon le scénario actif
        if (activeScenario.id === 'viens-on-sconnait') {
          // Gestion des choix pour ce scénario
          switch(choice) {
            case "Je veux en savoir plus":
              await addBotResponse(botResponses[activeScenario.id as keyof typeof botResponses]['infos']);
              break;
            case "Je souhaite commander":
              await handleStartOrder();
              break;
            case "Combien coûte-t-il ?":
              await addBotResponse(botResponses[activeScenario.id as keyof typeof botResponses]['prix']);
              break;
            default:
              // Gestion des choix personnalisés
              if (choice.includes("Voir les")) {
                await addBotResponse([{
                  type: 'assistant',
                  content: `Bien sûr, je vais vous montrer les ${choice.split("Voir les ")[1]}. Quelle information spécifique recherchez-vous ?`
                }]);
                setMessages(prev => [...prev, {
                  type: 'user-choices',
                  choices: [
                    "Je souhaite commander",
                    "En savoir plus"
                  ]
                }]);
              } else {
                await addBotResponse([{
                  type: 'assistant',
                  content: `Je comprends que vous souhaitez ${choice.toLowerCase()}. Comment puis-je vous aider davantage avec notre ${activeScenario.product.name} ?`
                }]);
                setMessages(prev => [...prev, {
                  type: 'user-choices',
                  choices: [
                    "Je souhaite commander",
                    "Plus d'infos"
                  ]
                }]);
              }
              break;
          }
        } else if (activeScenario.id === 'ecoboom') {
          // Gestion des choix pour le scénario ecoboom
          switch(choice) {
            case "Je veux en savoir plus":
              await addBotResponse(botResponses[activeScenario.id as keyof typeof botResponses]['infos']);
              break;
            case "Je souhaite commander":
              await handleStartOrder();
              break;
            case "Voir les tailles et prix":
            case "Combien coûte-t-elle ?":
              await addBotResponse(botResponses[activeScenario.id as keyof typeof botResponses]['prix']);
              break;
            default:
              await handleEcoboomFlow(choice);
          }
        } else if (activeScenario.id === 'amani') {
          // Gestion des choix pour le scénario amani
          switch(choice) {
            case "Je veux en savoir plus":
              await addBotResponse(botResponses[activeScenario.id as keyof typeof botResponses]['infos']);
              break;
            case "Je souhaite commander":
            case "Commander maintenant":
            case "Commander la ceinture seule":
              await handleStartOrder();
              break;
            case "Voir les prix":
            case "Combien coûte-t-elle ?":
              await addBotResponse(botResponses[activeScenario.id as keyof typeof botResponses]['prix']);
              break;
            default:
              await handleAmaniFlow(choice);
          }
        }
        break;
    }
  };

  // Rendu du composant modifié pour prévenir les erreurs SSR
  if (!isMounted) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="demo">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <GradientTitle subtitle="De la découverte au paiement, tout se passe dans la conversation.">
              Une expérience d'achat naturelle
            </GradientTitle>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center min-h-[600px]">
            <div className="w-full md:w-auto flex justify-center">
              <div className="h-[600px] w-[350px] bg-gray-50 animate-pulse rounded-[40px] flex items-center justify-center text-gray-500">
                Chargement de l'interface...
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="demo">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <GradientTitle subtitle="De la découverte au paiement, tout se passe dans la conversation.">
            Une expérience d'achat naturelle
          </GradientTitle>
        </div>

        <ClientOnly>
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            {/* Colonne d'informations et CTA - maintenant à gauche */}
            <div className="w-full md:w-2/5 lg:w-1/3 space-y-6">
              {/* Features animées */}
              <motion.div 
                className="bg-white rounded-xl shadow-md p-6 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-900">Pourquoi vos clients vont l'adorer</h3>
                
                <div className="space-y-6 relative min-h-[120px]">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                          activeFeatureIndex === index ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10 pointer-events-none'
                        }`}
                      >
                        <div className="flex gap-4 items-start">
                          <div className="w-12 h-12 rounded-full bg-dukka-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-dukka-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{feature.title}</h4>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Indicateurs de navigation */}
                <div className="flex justify-center mt-6 gap-2">
                  {features.map((_, i) => (
                    <button
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeFeatureIndex ? 'bg-dukka-primary w-6' : 'bg-gray-300'
                      }`}
                      onClick={() => setActiveFeatureIndex(i)}
                    />
                  ))}
                </div>
              </motion.div>
              
              {/* Statistiques */}
              <motion.div 
                className="bg-gradient-to-br from-dukka-primary/5 to-dukka-primary/20 rounded-xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Résultats des marchands avec Dukka :</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-dukka-primary">+45%</div>
                    <div className="text-xs text-gray-600">ventes en plus</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-dukka-primary">60%</div>
                    <div className="text-xs text-gray-600">temps gagné</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-dukka-primary">75%</div>
                    <div className="text-xs text-gray-600">clients en plus</div>
                  </div>
                </div>
              </motion.div>
              
              {/* CTA */}
              <motion.div 
                className="bg-dukka-primary text-white rounded-xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-3">Prêt à rejoindre Dukka ?</h3>
                <p className="mb-6 text-white/90">Adoptez l'e-commerce conversationnelle et offrez à vos clients la meilleure expérience d'achat en ligne.</p>
                <WaitlistButton variant="secondary" className="w-full justify-center" />
              </motion.div>
            </div>
            
            {/* Smartphone avec interface de chat - maintenant à droite */}
            <div className="w-full md:w-auto">
              <motion.div 
                className="relative mx-auto w-[350px] h-[712px]"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Cadre smartphone */}
                <div className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-xl overflow-hidden">
                  {/* Barre du haut avec notch */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black z-10">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-xl"></div>
                  </div>
                  
                  {/* Écran du smartphone */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-white rounded-[38px] overflow-hidden m-[4px]">
                    {/* Barre de statut */}
                    <div className="h-12 bg-dukka-primary text-white flex items-center justify-between px-6 pt-6">
                      <div className="text-xs font-medium">9:41</div>
                      <div className="flex items-center space-x-1">
                        <div className="h-2 w-2 rounded-full bg-white opacity-70"></div>
                        <div className="h-2 w-2 rounded-full bg-white opacity-80"></div>
                        <div className="h-2 w-2 rounded-full bg-white opacity-90"></div>
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                      <div className="text-xs font-medium">100%</div>
                    </div>
                    
                    {/* Sélecteur de scénario */}
                    <div className="h-14 flex items-center justify-between px-4 pt-6 pb-2 bg-white border-b border-gray-100">
                      <div className="flex overflow-x-auto gap-2 no-scrollbar">
                        {scenarios.map((scenario) => (
                          <button
                            key={scenario.id}
                            onClick={() => handleScenarioChange(scenario)}
                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                              activeScenario.id === scenario.id
                                ? 'bg-dukka-primary text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            {scenario.title}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Interface de chat */}
                    <div className="h-[550px]">
                      <ChatInterface
                        messages={messages}
                        isTyping={isTyping}
                        showCheckout={showCheckout}
                        onUserChoice={handleUserChoice}
                        onAiResponse={handleAiResponse}
                        chatRef={chatRef}
                        scenario={activeScenario}
                        totalAmount={calculateTotal()}
                        inCheckoutFlow={inCheckoutFlow}
                      />
                    </div>
                    
                    {/* "Home bar" du smartphone */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </ClientOnly>
      </div>
    </section>
  );
}

export default DemoSection;