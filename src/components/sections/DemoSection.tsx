'use client'

import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { GradientTitle } from '@/components/GradientTitle'
import { MessageCircle, ShoppingBag, Banknote } from 'lucide-react'
import { 
  scenarios, 
  buildConversation, 
  botResponses, 
  checkoutFlow, 
  otherProducts,
  shopModeFlow,
  restaurantFlow 
} from './demo/data'

const ChatInterface = dynamic(
  () => import('@/components/sections/demo/ChatInterface').then(mod => mod.ChatInterface),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[600px] bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-500">
        Chargement de l'interface...
      </div>
    )
  }
)

const ScenarioSelector = dynamic(
  () => import('@/components/sections/demo/ScenarioSelector').then(mod => mod.ScenarioSelector),
  { ssr: false }
)

const FeatureList = dynamic(
  () => import('@/components/sections/demo/FeatureList').then(mod => mod.FeatureList),
  { ssr: false }
)

const features = [
  {
    icon: MessageCircle,
    title: 'Conversation naturelle',
    description: 'Un dialogue simple et fluide qui guide le client du choix du produit à l\'achat'
  },
  {
    icon: ShoppingBag,
    title: 'Checkout intégré',
    description: 'Le processus d\'achat se fait naturellement dans la conversation'
  },
  {
    icon: Banknote,
    title: 'Paiement mobile',
    description: 'Intégration des modes de paiement que vos clients préfèrent (Wave, OM, etc.)'
  }
]

export function DemoSection() {
  // États initiaux inchangés
  const [activeScenario, setActiveScenario] = useState(scenarios[0])
  const [messages, setMessages] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<string>('')
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

  useEffect(() => {
    setIsMounted(true)
    setMessages(buildConversation(scenarios[0]))
  }, [])

  const calculateTotal = () => {
    const basePrice = activeScenario.product.price;
    let total = 0;
    let deliveryCost = orderData.city.toLowerCase() === 'dakar' ? 0 : 3000;

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

      case 'shop-mode':
        // Gestion des ensembles
        if (orderData.accessories.length > 0) {
          const hasRobe = true; // La robe est toujours incluse
          const hasSac = orderData.accessories.some(a => a.includes('Sac'));
          const hasEcharpe = orderData.accessories.some(a => a.includes('Écharpe'));
          const hasBandeau = orderData.accessories.some(a => a.includes('Bandeau'));

          if (hasRobe && hasSac && hasEcharpe) {
            total = 68000; // Ensemble Complet
          } else if (hasRobe && hasSac) {
            total = 55000; // Ensemble Essentiel
          } else if (hasRobe && hasEcharpe) {
            total = 45000; // Duo Élégant
          } else {
            total = basePrice;
            if (hasSac) total += 25000;
            if (hasEcharpe) total += 15000;
            if (hasBandeau) total += 8000;
          }
        } else {
          total = basePrice;
        }

        // Ajout des frais de livraison si nécessaire
        if (total < 54000) {
          total += deliveryCost;
        }
        break;

      case 'restaurant':
        const boxQuantity = orderData.quantity || 1;
        const boxPrice = 13000;
        
        // Prix de base pour les box avec remises
        if (boxQuantity >= 3) {
          total = boxPrice * boxQuantity * 0.85; // -15%
        } else if (boxQuantity === 2) {
          total = boxPrice * 2 * 0.9; // -10%
        } else {
          total = boxPrice;
        }
        
        // Ajout des boissons
        orderData.drinks.forEach(drink => {
          total += drink.includes('Cocktail') ? 2500 : 2000;
        });

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

  const handleStartOrder = async () => {
    if (activeScenario.id === 'shop-mode') {
      setCheckoutStep('size');
      await addBotResponse(shopModeFlow.size);
    } else if (activeScenario.id === 'restaurant') {
      setCheckoutStep('quantity');
      await addBotResponse(restaurantFlow.quantity);
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
      case 'shop-mode':
        setCheckoutStep('size');
        await addBotResponse(shopModeFlow.size);
        break;
      case 'restaurant':
        if (!orderData.deliveryTime) {
          setCheckoutStep('timeSlot');
          await addBotResponse([{
            type: 'assistant',
            content: `Super ! Pour vos ${quantity} box, à quelle heure souhaitez-vous les recevoir ? 🕒`
          }, {
            type: 'user-choices',
            choices: ["12h - 13h", "13h - 14h", "19h - 20h", "20h - 21h"]
          }]);
        } else {
          setCheckoutStep('addons');
          await addBotResponse(restaurantFlow.addons);
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

  const handleTimeSlot = async (choice: string) => {
    setOrderData(prev => ({
      ...prev,
      deliveryTime: choice,
      orderDetails: prev.orderDetails + `\n• Livraison prévue : ${choice}`
    }));
    
    setCheckoutStep('addons');
    await addBotResponse([{
      type: 'assistant',
      content: `Super ! Voici notre sélection de boissons fraîches faites maison pour accompagner vos snacks 🥤

• Bissap frais (2 000 FCFA)
• Gingembre frais (2 000 FCFA)
• Cocktail detox (2 500 FCFA)`
    }, {
      type: 'user-choices',
      choices: [
        "Ajouter le Bissap",
        "Ajouter le Gingembre",
        "Ajouter le Cocktail detox",
        "Continuer sans boisson"
      ]
    }]);
  };

  const handleShopModeFlow = async (choice: string) => {
    if (!choice) return;

    if (choice === "Voir les ensembles") {
      await addBotResponse([{
        type: 'assistant',
        content: `Voici nos ensembles coordonnés :

🌟 Ensemble Complet :
• Robe + Sac + Écharpe = 68 000 FCFA (au lieu de 75 000 FCFA)

✨ Ensemble Essentiel :
• Robe + Sac = 55 000 FCFA (au lieu de 60 000 FCFA)

💝 Duo Élégant :
• Robe + Écharpe = 45 000 FCFA (au lieu de 50 000 FCFA)

La livraison est offerte sur tous les ensembles ! Que souhaitez-vous ?`
      }, {
        type: 'user-choices',
        choices: [
          "Choisir Ensemble Complet",
          "Choisir Ensemble Essentiel",
          "Choisir Duo Élégant",
          "Commander la robe seule"
        ]
      }]);
      return;
    }

    if (choice.includes("Choisir Ensemble")) {
      setCheckoutStep('size');
      await addBotResponse(shopModeFlow.size);
      return;
    }
    
    if (checkoutStep === 'size') {
      setOrderData(prev => ({ 
        ...prev, 
        size: choice,
        quantity: orderData.quantity || 1,  
        orderDetails: `• Robe Bogolan (${orderData.quantity || 1} exemplaire${orderData.quantity > 1 ? 's' : ''}, Taille ${choice})`
      }));
      setCheckoutStep('accessories');
      await addBotResponse(shopModeFlow.accessories);
    } else if (checkoutStep === 'accessories') {
      if (!choice.includes('Continuer')) {
        const accessory = choice.split('Ajouter ')[1];
        setOrderData(prev => ({
          ...prev,
          accessories: [...prev.accessories, accessory],
          orderDetails: prev.orderDetails + `\n• ${accessory}`
        }));
        await addBotResponse([
          {
            type: 'assistant',
            content: `J'ai bien ajouté ${accessory} à votre commande 👜 Souhaitez-vous ajouter un autre accessoire ?`
          },
          ...shopModeFlow.accessories
        ]);
      } else {
        setCheckoutStep('contactInfo');
        await addBotResponse(checkoutFlow.contactInfo);
      }
    }
  };

  const handleRestaurantFlow = async (choice: string) => {
    if (!choice) return;
  
    if (checkoutStep === 'addons') {
      if (!choice.includes('Continuer')) {
        const drink = choice.split('Ajouter ')[1];
        setOrderData(prev => ({
          ...prev,
          drinks: [...prev.drinks, drink],
          orderDetails: prev.orderDetails + `\n• ${drink}`
        }));
        await addBotResponse([
          {
            type: 'assistant',
            content: `J'ai bien ajouté ${drink} à votre commande 🥤 Souhaitez-vous ajouter une autre boisson ?`
          },
          ...restaurantFlow.addons
        ]);
      } else {
        setCheckoutStep('contactInfo');
        await addBotResponse(checkoutFlow.contactInfo);
      }
    } else if (choice === "Commander avec boisson" || choice === "Commander sans boisson") {
      setCheckoutStep('quantity');
      await addBotResponse(restaurantFlow.quantity);
    } else if (checkoutStep === 'timeSlot') {
      await handleTimeSlot(choice);
    } else if (choice === "Voir les accompagnements") {
      await addBotResponse([{
        type: 'assistant',
        content: `Voici notre sélection de boissons fraîches faites maison 🥤

• Bissap frais (2 000 FCFA)
• Gingembre frais (2 000 FCFA)
• Cocktail detox (2 500 FCFA)`
      }, {
        type: 'user-choices',
        choices: [
          "Commander avec boisson",
          "Commander sans boisson",
          "Voir les prix"
        ]
      }]);
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
    await addBotResponse(checkoutFlow.paymentMethod.map(msg => ({
      ...msg,
      content: typeof msg.content === 'function' ? 
        msg.content({ 
          orderData: { 
            ...orderData, 
            phone: choice 
          }, 
          activeScenario, 
          totalAmount: calculateTotal() 
        }) : 
        msg.content
    })));
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

  const handleTextInput = async (text: string) => {
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
        await addBotResponse([{
          type: 'assistant',
          content: "Je comprends votre question. Que souhaitez-vous faire ?"
        }]);
        setMessages(prev => [...prev, {
          type: 'user-choices',
          choices: [
            "Je souhaite commander",
            activeScenario.genre === 'masculin' ? "Combien coûte-t-il ?" : "Combien coûte-t-elle ?"
          ]
        }]);
    }
  };

  const handleUserChoice = async (choice: string, isTextInput: boolean = false) => {
    if (!isMounted) return;
  
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: choice 
    }]);
  
    if (isTextInput) {
      await handleTextInput(choice);
      return;
    }

    switch(checkoutStep) {
      case 'quantity':
        await handleQuantityChoice(choice);
        break;
      case 'size':
      case 'accessories':
        await handleShopModeFlow(choice);
        break;
      case 'timeSlot':
        await handleTimeSlot(choice);
        break;
      case 'addons':
        await handleRestaurantFlow(choice);
        break;
      case 'additionalProducts':
        await handleAdditionalProducts(choice);
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
          // Gestion du scénario Viens on s'connaît
          if (activeScenario.id === 'viens-on-sconnait') {
            switch(choice) {
              case "Je veux en savoir plus":
                await addBotResponse(botResponses[activeScenario.id]['infos']);
                break;
        
              case "Je souhaite commander":
                setCheckoutStep('quantity');
                await addBotResponse([{
                  type: 'assistant',
                  content: "C'est entendu ! Combien d'exemplaires souhaitez-vous commander ?"
                }, {
                  type: 'user-choices',
                  choices: ["1 exemplaire", "2 exemplaires", "3 exemplaires", "Plus"]
                }]);
                break;
        
              case "Ajouter le jeu pour les non mariés":
              case "Ajouter le jeu Couples":
                setOrderData(prev => ({
                  ...prev,
                  additionalProducts: [...prev.additionalProducts, "Jeu pour les Couples non mariés"],
                  orderDetails: `• Jeu pour les Mariés\n• Jeu pour les Couples non mariés (-10%)`
                }));
                await addBotResponse([{
                  type: 'assistant',
                  content: "Super ! Le jeu pour les Couples non mariés a bien été ajouté à votre commande avec une réduction de 10%. Vous profitez donc du Pack Duo ! Souhaitez-vous ajouter autre chose ?"
                }, {
                  type: 'user-choices',
                  choices: [
                    "Découvrir les autres jeux",
                    "Finaliser la commande"
                  ]
                }]);
                break;
        
              case "Ajouter le jeu pour la Famille":
                setOrderData(prev => ({
                  ...prev,
                  additionalProducts: [...prev.additionalProducts, "Jeu pour la Famille"],
                  orderDetails: `${prev.orderDetails}\n• Jeu pour la Famille`
                }));
                await addBotResponse([{
                  type: 'assistant',
                  content: "Super ! Le jeu pour la Famille a bien été ajouté à votre commande. Souhaitez-vous ajouter autre chose ?"
                }, {
                  type: 'user-choices',
                  choices: [
                    "Ajouter le jeu pour les Amis",
                    "Finaliser la commande"
                  ]
                }]);
                break;
        
              case "Ajouter le jeu pour les Amis":
                setOrderData(prev => ({
                  ...prev,
                  additionalProducts: [...prev.additionalProducts, "Jeu pour les Amis"],
                  orderDetails: `${prev.orderDetails}\n• Jeu pour les Amis`
                }));
                await addBotResponse([{
                  type: 'assistant',
                  content: "Parfait ! Le jeu pour les Amis a bien été ajouté à votre commande. Que souhaitez-vous faire ?"
                }, {
                  type: 'user-choices',
                  choices: [
                    "Finaliser la commande",
                    "Voir les autres jeux"
                  ]
                }]);
                break;
        
              case "Finaliser la commande":
              case "Non merci, continuer ma commande":
                setCheckoutStep('contactInfo');
                await addBotResponse(checkoutFlow.contactInfo);
                break;
        
              case "Voir les autres jeux":
              case "Découvrir les autres jeux":
                await addBotResponse(otherProducts);
                break;
        
              case "Commander plusieurs jeux":
                setCheckoutStep('quantity');
                await addBotResponse([{
                  type: 'assistant',
                  content: "Excellent choix ! Combien d'exemplaires souhaitez-vous commander ?"
                }, {
                  type: 'user-choices',
                  choices: ["2 exemplaires", "3 exemplaires", "4 exemplaires ou plus"]
                }]);
                break;
        
              case "Commander 1 jeu":
                setOrderData(prev => ({
                  ...prev,
                  quantity: 1,
                  orderDetails: `• Jeu pour les Mariés (1 exemplaire)`
                }));
                setCheckoutStep('contactInfo');
                await addBotResponse(checkoutFlow.contactInfo);
                break;
        
              case "Voir les packs":
              case "Voir les packs disponibles":
                await addBotResponse([{
                  type: 'assistant',
                  content: `Voici nos différents packs :
        
        - Pack Solo : 14 000 FCFA
        - Pack Duo (-10%) : 25 200 FCFA
        - Pack Trio (-15%) : 35 700 FCFA
        - Pack Comité (-20%) : à partir de 4 jeux
        
        🎁 Bonus : -10% sur le jeu "Couples non mariés" en complément !
        
        La livraison est gratuite à Dakar. Dans les autres villes du Sénégal 🇸🇳 et à Abidjan 🇨🇮, elle est à 3000 FCFA.`
                }, {
                  type: 'user-choices',
                  choices: [
                    "Commander 1 jeu",
                    "Commander plusieurs jeux",
                    "Ajouter le jeu Couples"
                  ]
                }]);
                break;
        
              case "Combien coûte-t-il ?":
                await addBotResponse(botResponses[activeScenario.id]['prix']);
                break;
            }
          }
        // Gestion du scénario Yamo'o
        else if (activeScenario.id === 'restaurant') {
          switch(choice) {
            case "Je veux en savoir plus":
              await addBotResponse(botResponses[activeScenario.id]['infos']);
              break;
      
            case "Commander avec boisson":
              await addBotResponse([{
                type: 'assistant',
                content: `Excellent choix ! Quelle boisson souhaitez-vous ajouter à votre commande ?
      
      - Bissap frais (2 000 FCFA)
      - Gingembre frais (2 000 FCFA)
      - Cocktail detox (2 500 FCFA)`
              }, {
                type: 'user-choices',
                choices: [
                  "Ajouter Bissap",
                  "Ajouter Gingembre",
                  "Ajouter Cocktail detox",
                  "Continuer sans boisson"
                ]
              }]);
              break;
      
            case "Commander sans boisson":
              setCheckoutStep('quantity');
              await addBotResponse([{
                type: 'assistant',
                content: "D'accord ! Combien de box souhaitez-vous commander ?"
              }, {
                type: 'user-choices',
                choices: ["1 box", "2 box (-10%)", "3 box (-15%)", "Plus"]
              }]);
              break;
      
            case "Ajouter Bissap":
            case "Ajouter Gingembre":
            case "Ajouter Cocktail detox":
              const drinkName = choice.split('Ajouter ')[1];
              setOrderData(prev => ({
                ...prev,
                drinks: [...prev.drinks, drinkName],
                orderDetails: prev.orderDetails ? `${prev.orderDetails}\n• ${drinkName}` : `• ${drinkName}`
              }));
              await addBotResponse([{
                type: 'assistant',
                content: `Parfait ! J'ai ajouté ${drinkName} à votre commande. Souhaitez-vous ajouter une autre boisson ?`
              }, {
                type: 'user-choices',
                choices: [
                  "Ajouter Bissap",
                  "Ajouter Gingembre",
                  "Ajouter Cocktail detox",
                  "Passer à la commande"
                ]
              }]);
              break;
      
            case "Passer à la commande":
            case "Continuer sans boisson":
              setCheckoutStep('quantity');
              await addBotResponse([{
                type: 'assistant',
                content: "Très bien ! Combien de box souhaitez-vous commander ?"
              }, {
                type: 'user-choices',
                choices: ["1 box", "2 box (-10%)", "3 box (-15%)", "Plus"]
              }]);
              break;
      
            case "Je souhaite commander":
            case "Commander maintenant":
              setCheckoutStep('quantity');
              await addBotResponse(restaurantFlow.quantity);
              break;
      
            case "Voir les boissons":
            case "Voir les accompagnements":
              await addBotResponse([{
                type: 'assistant',
                content: `Voici notre sélection de boissons fraîches maison 🥤
      
      - Bissap frais (2 000 FCFA)
      - Gingembre frais (2 000 FCFA)
      - Cocktail detox (2 500 FCFA)`
              }, {
                type: 'user-choices',
                choices: [
                  "Commander avec boisson",
                  "Commander sans boisson",
                  "Voir les prix"
                ]
              }]);
              break;
      
            case "Combien coûte-t-elle ?":
            case "Voir les prix":
              await addBotResponse(botResponses[activeScenario.id]['prix']);
              break;
          }
        }
        // Gestion du scénario Othentic
        else {
          if (choice.includes("Choisir Ensemble")) {
            setOrderData(prev => ({
              ...prev,
              accessories: choice === "Choisir Ensemble Complet" 
                ? ["Sac", "Écharpe"]
                : choice === "Choisir Ensemble Essentiel"
                  ? ["Sac"]
                  : ["Écharpe"],
              orderDetails: `• Ensemble ${choice.split("Choisir ")[1]}`
            }));
            setCheckoutStep('size');
            await addBotResponse(shopModeFlow.size);
          }
          else if (choice === "Commander la robe seule") {
            setCheckoutStep('size');
            await addBotResponse(shopModeFlow.size);
          }
          else if (choice === "Je veux en savoir plus") {
            await addBotResponse(botResponses[activeScenario.id]['infos']);
          }
          else if (choice.includes("Combien coûte") || choice === "Voir les prix") {
            await addBotResponse(botResponses[activeScenario.id]['prix']);
          }
          else if (choice === "Voir les ensembles" || choice === "Choisir un ensemble") {
            await handleShopModeFlow("Voir les ensembles");
          }
          else if (choice.toLowerCase().includes("commander") || choice === "Je souhaite commander") {
            await handleStartOrder();
          }
        }
        break;
    }
  };

  if (!isMounted) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="demo">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <GradientTitle subtitle="De la découverte au paiement, tout se passe dans la conversation.">
              Une expérience d'achat naturelle
            </GradientTitle>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 items-stretch min-h-[600px]">
            <div className="w-full lg:w-3/5 flex flex-col">
              <div className="h-[600px] bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-500">
                Chargement de l'interface...
              </div>
            </div>
            <div className="w-full lg:w-2/5">
              <div className="h-[600px] bg-gray-50 animate-pulse rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50" id="demo">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <GradientTitle subtitle="De la découverte au paiement, tout se passe dans la conversation.">
            Une expérience d'achat naturelle
          </GradientTitle>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch min-h-[600px]">
          <div className="w-full lg:w-3/5 flex flex-col">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden ring-1 ring-gray-200">
              <ScenarioSelector 
                scenarios={scenarios}
                activeScenario={activeScenario}
                onSelect={handleScenarioChange}
              />
              <ChatInterface
                messages={messages}
                isTyping={isTyping}
                showCheckout={showCheckout}
                onUserChoice={handleUserChoice}
                chatRef={chatRef}
                scenario={activeScenario}
                totalAmount={calculateTotal()}
              />
            </div>
          </div>

          <FeatureList features={features} />
        </div>
      </div>
    </section>
  );
}

export default DemoSection;