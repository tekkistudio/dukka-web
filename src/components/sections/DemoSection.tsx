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
    const basePrice = activeScenario.product.price
    let total = 0
    let deliveryCost = orderData.city.toLowerCase() === 'dakar' ? 0 : 3000;

    switch (activeScenario.id) {
      case 'viens-on-sconnait':
        const quantity = orderData.quantity || 1
        total = basePrice * quantity
        
        if (quantity > 3) {
          total = total * 0.8  // -20%
        } else if (quantity === 3) {
          total = total * 0.85  // -15%
        } else if (quantity === 2) {
          total = total * 0.9  // -10%
        }

        if (orderData.additionalProducts.length > 0) {
          orderData.additionalProducts.forEach(() => {
            total += 14000 * 0.9  
          })
        }

        total += deliveryCost
        break

      case 'shop-mode':
        total = basePrice
        if (orderData.quantity === 2) {
          total = basePrice + (basePrice * 0.85)
        }
        orderData.accessories.forEach(accessory => {
          if (accessory.includes('Sac')) total += 25000
          if (accessory.includes('Écharpe')) total += 15000
          if (accessory.includes('Bandeau')) total += 8000
        })
        
        if (total < 54000) {
          total += deliveryCost
        }
        break

      case 'restaurant':
        const boxQuantity = orderData.quantity || 1
        total = basePrice * boxQuantity
        if (boxQuantity >= 3) {
          total = total * 0.85 // -15%
        } else if (boxQuantity === 2) {
          total = total * 0.9 // -10%
        }
        
        orderData.drinks.forEach(drink => {
          total += drink.includes('Cocktail') ? 2500 : 2000
        })
        break
    }
    
    return total
  }

  const getDiscount = () => {
    const quantity = orderData.quantity || 1
    if (quantity > 3) return 20
    if (quantity === 3) return 15
    if (quantity === 2) return 10
    return 0
  }

  const handleScenarioChange = (scenario: any) => {
    setShowCheckout(false)
    setMessages(buildConversation(scenario))
    setActiveScenario(scenario)
    setCheckoutStep('')
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
    })
  }

  const addBotResponse = async (responses: any[], delay = 1000) => {
    setIsTyping(true)
    
    for (const response of responses) {
      await new Promise(resolve => setTimeout(resolve, delay))
      const messageObject = response.type ? {
        ...response,
        content: typeof response.content === 'function' ? 
          response.content({ orderData, activeScenario, totalAmount: calculateTotal() }) : 
          response.content
      } : {
        type: 'assistant',
        content: response
      }
      setMessages(prev => [...prev, messageObject])

      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight
      }
    }

    setIsTyping(false)
  }

  const handleQuantityChoice = async (choice: string) => {
    const quantity = parseInt(choice) || 1
    
    setOrderData(prev => ({ 
      ...prev, 
      quantity,
      orderDetails: `• ${activeScenario.product.name} (${quantity} exemplaire${quantity > 1 ? 's' : ''})`
    }))

    switch (activeScenario.id) {
      case 'shop-mode':
        if (!orderData.size) {
          setCheckoutStep('size')
          await addBotResponse(shopModeFlow.size)
        } else {
          setCheckoutStep('accessories')
          await addBotResponse(shopModeFlow.accessories)
        }
        break
      case 'restaurant':
        if (!orderData.deliveryTime) {
          setCheckoutStep('timeSlot')
          await addBotResponse(restaurantFlow.quantity)
        } else {
          setCheckoutStep('addons')
          await addBotResponse(restaurantFlow.addons)
        }
        break
      case 'viens-on-sconnait':
        if (quantity > 1) {
          setOrderData(prev => ({
            ...prev,
            orderDetails: `• ${activeScenario.product.name} (${quantity} exemplaires avec -${getDiscount()}%)`
          }))
        }
        setCheckoutStep('additionalProducts')
        await addBotResponse(checkoutFlow.additionalProducts)
        break
    }
  }

  const handleTimeSlot = async (choice: string) => {
    setOrderData(prev => ({
      ...prev,
      deliveryTime: choice,
      orderDetails: prev.orderDetails + `\n• Livraison prévue : ${choice}`
    }))
    
    setCheckoutStep('addons')
    await addBotResponse(restaurantFlow.addons)
  }

  const handleShopModeFlow = async (choice: string) => {
    if (!choice) return
    
    if (checkoutStep === 'size') {
      setOrderData(prev => ({ 
        ...prev, 
        size: choice,
        quantity: orderData.quantity || 1,  
        orderDetails: `• Robe Bogolan (${orderData.quantity || 1} exemplaire${orderData.quantity > 1 ? 's' : ''}, Taille ${choice})`
      }))
      setCheckoutStep('accessories')
      await addBotResponse(shopModeFlow.accessories)
    } else if (checkoutStep === 'accessories') {
      if (!choice.includes('Continuer')) {
        const accessory = choice.split('Ajouter ')[1]
        setOrderData(prev => ({
          ...prev,
          accessories: [...prev.accessories, accessory],
          orderDetails: prev.orderDetails + `\n• ${accessory}`
        }))
        // Réafficher les options d'accessoires avec un message de confirmation
        await addBotResponse([
          {
            type: 'assistant',
            content: `J'ai bien ajouté ${accessory} à votre commande. Souhaitez-vous en ajouter un autre ?`
          },
          ...shopModeFlow.accessories
        ])
      } else {
        setCheckoutStep('contactInfo')
        await addBotResponse(checkoutFlow.contactInfo)
      }
    }
  }

  const handleRestaurantFlow = async (choice: string) => {
    if (!choice) return
  
    if (checkoutStep === 'addons') {
      if (!choice.includes('Continuer')) {
        const drink = choice.split('Ajouter ')[1]
        setOrderData(prev => ({
          ...prev,
          drinks: [...prev.drinks, drink],
          orderDetails: prev.orderDetails + `\n• ${drink}`
        }))
        // Réafficher les options de boissons avec un message de confirmation
        await addBotResponse([
          {
            type: 'assistant',
            content: `J'ai bien ajouté le ${drink} à votre commande. Souhaitez-vous ajouter une autre boisson ?`
          },
          ...restaurantFlow.addons
        ])
      } else {
        setCheckoutStep('contactInfo')
        await addBotResponse(checkoutFlow.contactInfo)
      }
    }
  }

  const handleAdditionalProducts = async (choice: string) => {
    if (choice.includes("Voir les autres")) {
      await addBotResponse(otherProducts)
    } else if (choice.includes("Ajouter")) {
      const productName = choice.split("Ajouter ")[1]
      setOrderData(prev => ({
        ...prev,
        additionalProducts: [...prev.additionalProducts, productName],
        orderDetails: `• ${activeScenario.product.name}\n• ${productName}`
      }))
      await addBotResponse([{
        type: 'assistant',
        content: `Parfait ! J'ai bien ajouté ${productName} à votre commande.`
      }])
      setCheckoutStep('contactInfo')
      await addBotResponse(checkoutFlow.contactInfo)
    } else {
      setCheckoutStep('contactInfo')
      await addBotResponse(checkoutFlow.contactInfo)
    }
  }

  const handleContactInfo = async (choice: string) => {
    const names = choice.trim().split(' ')
    const firstName = names[0]
    const lastName = names.slice(1).join(' ')
    
    setOrderData(prev => ({ 
      ...prev, 
      contactInfo: choice,
      firstName,
      lastName
    }))
    
    setCheckoutStep('address')
    await addBotResponse(checkoutFlow.address.map(msg => ({
      ...msg,
      content: typeof msg.content === 'function' ? 
        msg.content({ firstName }) : 
        msg.content
    })))
  }

  const handleAddress = async (choice: string) => {
    setOrderData(prev => ({ ...prev, city: choice }))
    setCheckoutStep('deliveryAddress')
    await addBotResponse(checkoutFlow.deliveryAddress.map(msg => ({
      ...msg,
      content: typeof msg.content === 'function' ? 
        msg.content({ city: choice }) : 
        msg.content
    })))
  }

  const handleDeliveryAddress = async (choice: string) => {
    setOrderData(prev => ({ ...prev, address: choice }))
    setCheckoutStep('phone')
    await addBotResponse(checkoutFlow.phone.map(msg => ({
      ...msg,
      content: typeof msg.content === 'function' ? 
        msg.content({ firstName: orderData.firstName }) : 
        msg.content
    })))
  }

  const handlePhone = async (choice: string) => {
    setOrderData(prev => ({ ...prev, phone: choice }))
    setCheckoutStep('paymentMethod')
    await addBotResponse(checkoutFlow.paymentMethod.map(msg => ({
      ...msg,
      content: typeof msg.content === 'function' ? 
        msg.content({ orderData: { ...orderData, phone: choice }, activeScenario, totalAmount: calculateTotal() }) : 
        msg.content
    })))
  }

  const handlePaymentMethod = async (choice: string) => {
    setOrderData(prev => ({ ...prev, paymentMethod: choice }))
    if (choice === 'Wave') {
      setShowCheckout(true)
      await addBotResponse(checkoutFlow.wavePayment)
    } else {
      await addBotResponse([{
        type: 'assistant',
        content: `Vous avez choisi le ${choice}. Un livreur va vous contacter pour vous apporter votre commande. Si vous payez en espèce, assurez-vous d'avoir le montant précis de la commande.`
      }])
    }
    setCheckoutStep('')
  }

  const handleTextInput = async (text: string) => {
    switch(checkoutStep) {
      case 'contactInfo':
        await handleContactInfo(text)
        break
      case 'address':
        await handleAddress(text)
        break
      case 'deliveryAddress':
        await handleDeliveryAddress(text)
        break
      case 'phone':
        await handlePhone(text)
        break
      default:
        await addBotResponse([{
          type: 'assistant',
          content: "Je comprends votre question. Que souhaitez-vous faire ?"
        }])
        setMessages(prev => [...prev, {
          type: 'user-choices',
          choices: [
            "Je souhaite commander",
            "Combien coûte-t-il ?"
          ]
        }])
    }
  }

  const handleUserChoice = async (choice: string, isTextInput: boolean = false) => {
    if (!isMounted) return
  
    setMessages(prev => [...prev, { 
      type: 'user', 
      content: choice 
    }])
  
    if (isTextInput) {
      await handleTextInput(choice)
      return
    }
  
    switch(checkoutStep) {
      case 'quantity':
        await handleQuantityChoice(choice)
        break
      case 'size':
      case 'accessories':
        await handleShopModeFlow(choice)
        break
      case 'timeSlot':
        await handleTimeSlot(choice)
        break
      case 'addons':
        await handleRestaurantFlow(choice)
        break
      case 'additionalProducts':
        await handleAdditionalProducts(choice)
        break
      case 'contactInfo':
        await handleContactInfo(choice)
        break
      case 'address':
        await handleAddress(choice)
        break
      case 'deliveryAddress':
        await handleDeliveryAddress(choice)
        break
      case 'phone':
        await handlePhone(choice)
        break
      case 'paymentMethod':
        await handlePaymentMethod(choice)
        break
      default:
        if (choice === "Ajouter le jeu pour les couples non mariés") {
          setOrderData(prev => ({
            ...prev,
            additionalProducts: [...prev.additionalProducts, "Le jeu pour les couples non mariés"],
            orderDetails: `• ${activeScenario.product.name}\n• Le jeu pour les couples non mariés`
          }))
          setCheckoutStep('contactInfo')
          await addBotResponse(checkoutFlow.contactInfo)
        }
        else if (
          choice === "Poursuivre ma commande" || 
          choice === "Je souhaite commander" || 
          choice.toLowerCase().includes("commander")
        ) {
          if (activeScenario.id === 'shop-mode') {
            setCheckoutStep('size')
            await addBotResponse(shopModeFlow.size)
          } else if (activeScenario.id === 'restaurant') {
            setCheckoutStep('timeSlot')
            await addBotResponse(restaurantFlow.quantity)
          } else {
            setCheckoutStep('quantity')
            await addBotResponse([{
              type: 'assistant',
              content: "C'est entendu ! Combien d'exemplaires souhaitez-vous commander ?"
            }, {
              type: 'user-choices',
              choices: ["1 exemplaire", "2 exemplaires", "3 exemplaires", "Plus"]
            }])
          }
        }
        else if (choice.toLowerCase().includes("information")) {
          await addBotResponse(botResponses[activeScenario.id]['infos'])
        } 
        else if (choice.toLowerCase().includes("combien") || choice.toLowerCase().includes("prix")) {
          await addBotResponse(botResponses[activeScenario.id]['prix'])
        } 
        break
    }
  }

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
    )
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
  )
}

export default DemoSection