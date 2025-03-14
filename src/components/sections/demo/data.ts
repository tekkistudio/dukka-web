// src/components/sections/demo/data.ts
export interface Media {
  type: 'image' | 'video';
  url: string;
  alt: string;
  caption?: string;
}

export interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  context: string;
  chatbotName: string;
  genre: 'masculin' | 'feminin';
  product: {
    name: string;
    price: number;
    description: string;
  };
}

// Interface pour les paramètres des fonctions avec des callbacks
interface FirstNameParam {
  firstName: string;
}

interface CityParam {
  city: string;
}

interface BoxQuantityParam {
  boxQuantity: number;
}

interface PreviousOrdersParam {
  previousOrders?: boolean;
}

interface OrderSummaryParam {
  orderData: {
    quantity: number;
    additionalProducts: string[];
    size: string;
    accessories: string[];
    deliveryTime: string;
    drinks: string[];
    contactInfo: string;
    firstName: string;
    lastName: string;
    city: string;
    address: string;
    phone: string;
    paymentMethod: string;
    orderDetails: string;
  };
  totalAmount: number;
}

interface PaymentMethodParam extends OrderSummaryParam {
  activeScenario: Scenario;
}

export const scenarios: Scenario[] = [
  {
    id: 'viens-on-sconnait',
    title: "Viens On s'Connaît",
    subtitle: "Jeux de société",
    context: "Jeux relationnels",
    chatbotName: "Rose",
    genre: "masculin",
    product: {
      name: "jeu pour les Mariés",
      price: 14000,
      description: "Le jeu de cartes qui renforce les liens du mariage"
    }
  },
  {
    id: 'amani',
    title: "Amani",
    subtitle: "Bien-être féminin",
    context: "Santé & bien-être",
    chatbotName: "Aïcha",
    genre: "feminin",
    product: {
      name: "Ceinture chauffante Mia",
      price: 29900,
      description: "Soulage les douleurs menstruelles de manière naturelle"
    }
  },
  {
    id: 'ecoboom',
    title: "Ecoboom",
    subtitle: "Couches écologiques",
    context: "Produits pour bébé",
    chatbotName: "Awa",
    genre: "feminin",
    product: {
      name: "Couches biodégradables",
      price: 4800,
      description: "Couches écologiques en fibres de bambou"
    }
  }
];

export function buildConversation(scenario: Scenario) {
  return [
    {
      type: 'assistant',
      content: `Bonjour 👋 Je suis ${scenario.chatbotName}, votre Assistante d'achat. Je vois que vous vous intéressez à notre ${scenario.product.name}. C'est un excellent choix ! Comment puis-je vous aider ?`
    },
    {
      type: 'user-choices',
      choices: [
        "Je veux en savoir plus",
        "Je souhaite commander",
        scenario.genre === 'masculin' ? "Combien coûte-t-il ?" : "Combien coûte-t-elle ?"
      ]
    }
  ];
}

export const botResponses = {
  'viens-on-sconnait': {
    'infos': [
      {
        type: 'assistant',
        content: `Le jeu VIENS ON S'CONNAÎT - Entre Mariés est conçu pour les couples mariés qui souhaitent renforcer leur lien conjugal et raviver la passion dans leur relation. Il offre une opportunité unique d'explorer les aspects les plus intimes et significatifs de votre vie à deux, tout en créant des moments de connexion authentique et de croissance mutuelle.`,
        media: [{
          type: 'image',
          url: '/images/products/maries-1.jpg',
          alt: 'Jeu pour les couples mariés',
          caption: 'Le jeu pour les couples mariés'
        }]
      },
      {
        type: 'assistant',
        content: "Que souhaitez-vous faire ?"
      },
      {
        type: 'user-choices',
        choices: [
          "Voir les packs disponibles",
          "Je souhaite commander",
          "Découvrir les autres jeux"
        ]
      }
    ],
    'prix': [
      {
        type: 'assistant',
        content: `Le jeu coûte 14 000F CFA. Cependant, vous avez la possibilité d'obtenir une réduction en commandant plus. Voici nos offres :

• 1 jeu : 14 000 FCFA
• Pack Duo (-10%) : 25 200 FCFA
• Pack Trio (-15%) : 35 700 FCFA
• Pack Comité (-20%) : plus de 3 jeux

🎁 Vous pouvez ajouter le jeu pour les Couples non mariés pour composer le Pack Duo !
La livraison est gratuite à Dakar. Dans les autres villes du Sénégal 🇸🇳 et à Abidjan 🇨🇮, elle est à 3000 FCFA.`,
      },
      {
        type: 'user-choices',
        choices: [
          "Commander 1 jeu",
          "Voir les packs",
          "Ajouter le jeu pour les non mariés"
        ]
      }
    ]
  },
  'amani': {
    'infos': [
      {
        type: 'assistant',
        content: `Mia est une solution innovante pour soulager les douleurs menstruelles grâce à la therapie par la chaleur et le massage.

La chaleur facilite l'écoulement du sang et le massage détend les muscles, ce qui aide à réduire drastiquement la douleur, voire à la supprimer.

Mia a été conçue pour être discrète et confortable sous vos vêtements, afin de vous accompagner en toute sérénité tout au long de la journée, durant votre période du mois.`,
        media: [{
          type: 'image',
          url: '/images/products/mia-belt.jpg',
          alt: 'Ceinture chauffante Mia',
          caption: 'Notre ceinture chauffante Mia'
        }]
      },
      {
        type: 'user-choices',
        choices: [
          "Comment ça fonctionne ?",
          "Commander maintenant",
          "Voir les prix"
        ]
      }
    ],
    'prix': [
      {
        type: 'assistant',
        content: `La ceinture chauffante Mia est actuellement en promotion à 29 900 FCFA au lieu de 34 000 FCFA !

Nous proposons également plusieurs packs avantageux :

• Pack Sérénité (Ceinture + Housse de transport) : 32 500 FCFA
• Pack Complet (Ceinture + Housse + Tisanes bio) : 38 700 FCFA
• Pack Famille (2 ceintures) : 54 900 FCFA (-10%)

💝 La livraison est gratuite pour toute commande supérieure à 40 000 FCFA.`
      },
      {
        type: 'assistant',
        content: `Accessoires disponibles séparément :
• Housse de transport imperméable : 4 500 FCFA
• Pochette de tisanes bio (30 sachets) : 6 900 FCFA
• Batterie de rechange supplémentaire : 8 500 FCFA

Garantie 1 an incluse sur tous nos produits.`,
      },
      {
        type: 'user-choices',
        choices: [
          "Choisir un pack",
          "Commander la ceinture seule",
          "Voir les accessoires"
        ]
      }
    ]
  },
  'ecoboom': {
    'infos': [{
      type: 'assistant',
      content: "Nos couches biodégradables Ecoboom sont spécialement conçues pour le confort de votre bébé et le respect de l'environnement :",
      media: [{
        type: 'image',
        url: '/images/products/ecoboom-diapers.jpg',
        alt: 'Couches Ecoboom',
        caption: 'Nos couches biodégradables en bambou'
      }]
    }, {
      type: 'assistant',
      content: `• Nos couches sont fabriquées à partir de fibres de bambou biodégradables
• Sans produits chimiques nocifs ni parfums
• Absorption supérieure jusqu'à 12h
• Toucher ultra-doux pour la peau sensible de votre bébé
• Emballage recyclable et éco-responsable`,
    }, {
      type: 'user-choices',
      choices: [
        "Je souhaite commander",
        "Voir les tailles et prix",
        "Questions fréquentes"
      ]
    }],
    'prix': [{
      type: 'assistant',
      content: `Voici nos packs de couches Ecoboom disponibles :

• Pack Nouveau-né (0-4.5kg) : 34 couches - 4 800 FCFA
• Pack Taille S (3-8kg) : 36 couches - 5 400 FCFA
• Pack Taille M (6-10kg) : 32 couches - 6 400 FCFA
• Pack Taille L (9-14kg) : 30 couches - 6 900 FCFA
• Pack Taille XL (12-17kg) : 28 couches - 7 500 FCFA

🌿 Réduction de 10% pour 3 packs achetés, 15% pour 5 packs et plus`
    }, {
      type: 'user-choices',
      choices: [
        "Commander maintenant",
        "Programme d'abonnement",
        "Voir les coffrets découverte"
      ]
    }]
  }
};

export const otherProducts = [
  {
    type: 'assistant',
    content: `Découvrez nos autres jeux de la gamme Viens On s'Connaît :

• En Famille (14 000 FCFA) : Renforcez les liens Parents-Enfants avec 150 cartes spécialement conçues pour créer des moments de partage uniques
• Entre Amis (14 000 FCFA) : Approfondissez vos amitiés et créez des souvenirs mémorables avec ce jeu qui mélange questions profondes et moments fun`,
    media: [
      {
        type: 'image',
        url: '/images/products/famille-1.jpg',
        alt: 'Jeu pour la famille',
        caption: 'Le Jeu pour la Famille'
      },
      {
        type: 'image',
        url: '/images/products/amis-1.jpg',
        alt: 'Jeu entre amis',
        caption: 'Le Jeu pour les Amis'
      }
    ]
  },
  {
    type: 'user-choices',
    choices: [
      "Ajouter le jeu pour la Famille",
      "Ajouter le jeu pour les Amis",
      "Non merci, continuer ma commande"
    ]
  }
];

export const checkoutFlow = {
  quantity: [{
    type: 'assistant',
    content: "Parfait ! Combien d'exemplaires souhaitez-vous commander ?"
  }, {
    type: 'user-choices',
    choices: ["1 exemplaire", "2 exemplaires", "3 exemplaires", "Plus"]
  }],
  
  additionalProducts: [{
    type: 'assistant',
    content: "Excellent choix ! 🎉 Savez-vous que nous avons d'autres produits qui pourraient vous intéresser ?"
  }, {
    type: 'user-choices',
    choices: ["Voir les autres produits", "Continuer avec ma commande"]
  }],
  
  contactInfo: [{
    type: 'assistant',
    content: "Pour procéder à la livraison de votre commande, j'aurais besoin de quelques informations. Commençons par la base : quel est votre nom complet ?"
  }],
  
  address: [{
    type: 'assistant',
    content: ({ firstName }: FirstNameParam) => `Merci ${firstName} ! 🙂 Dans quelle ville habitez-vous ?`
  }],
  
  deliveryAddress: [{
    type: 'assistant',
    content: ({ city }: CityParam) => `Parfait ! Quelle est votre adresse exacte à ${city} ?`
  }],
  
  phone: [{
    type: 'assistant',
    content: ({ firstName }: FirstNameParam) => `Super ${firstName} ! Quel est votre numéro de téléphone 📱 ? C'est important pour la livraison.`
  }],
  
  paymentMethod: [{
    type: 'assistant',
    content: ({ orderData, totalAmount }: Omit<PaymentMethodParam, 'activeScenario'>) => {
      const deliveryCost = orderData.city.toLowerCase() === 'dakar' ? 0 : 3000;
      
      return `📋 <strong>Voici le récapitulatif de votre commande :</strong>
  
  ${orderData.orderDetails}
  
  📍 Informations de livraison :
  • Ville : <strong>${orderData.city}</strong>
  • Adresse : <strong>${orderData.address}</strong>
  • Frais de livraison : <strong>${deliveryCost} F CFA</strong>
  • Téléphone : <strong>${orderData.phone}</strong>
  
  💰 Total à payer : <strong>${totalAmount.toLocaleString()} F CFA</strong>
  
  Choisissez votre mode de paiement ci-dessous.
  
  ⚠️ Les personnes qui paient à l'avance sont prioritaires pour la livraison.`
    }
  }, {
    type: 'user-choices',
    choices: ["Wave", "Paiement à la livraison"]
  }],
  
  wavePayment: [{
    type: 'assistant',
    content: "Super ! Vous avez choisi de payer avec Wave. Cliquez sur le bouton ci-dessous pour procéder au paiement sécurisé et sans frais. 🔒"
  }]
};

export const amaniFlow = {
  ...checkoutFlow,
  size: [{
    type: 'assistant',
    content: `Pour votre ceinture chauffante Mia, nous avons un modèle unique qui s'ajuste à tous les tours de taille grâce à sa sangle élastique ajustable.

Avez-vous besoin d'accessoires complémentaires pour optimiser votre expérience ?`
  }, {
    type: 'user-choices',
    choices: ["Ajouter la housse de transport", "Ajouter les tisanes bio", "Ajouter une batterie supplémentaire", "Continuer sans accessoire"]
  }],
  
  accessories: [{
    type: 'assistant',
    content: "Pour compléter votre ceinture Mia, voici les accessoires disponibles :",
    media: [
      {
        type: 'image',
        url: '/images/products/amani-case.jpg',
        alt: 'Housse de transport',
        caption: 'Housse de transport (4 500 FCFA)'
      },
      {
        type: 'image',
        url: '/images/products/amani-tea.jpg',
        alt: 'Tisanes bio',
        caption: 'Tisanes bio - 30 sachets (6 900 FCFA)'
      },
      {
        type: 'image',
        url: '/images/products/amani-battery.jpg',
        alt: 'Batterie supplémentaire',
        caption: 'Batterie de rechange (8 500 FCFA)'
      }
    ]
  }, {
    type: 'user-choices',
    choices: [
      "Ajouter la housse",
      "Ajouter les tisanes",
      "Ajouter la batterie",
      "Continuer sans accessoire"
    ]
  }]
};

export const ecoboomFlow = {
  ...checkoutFlow,
  size: [{
    type: 'assistant',
    content: `Quelle taille de couches souhaitez-vous commander pour votre bébé ?
    
• Nouveau-né : 0-4.5kg (34 couches)
• Taille S : 3-8kg (36 couches)
• Taille M : 6-10kg (32 couches)
• Taille L : 9-14kg (30 couches)
• Taille XL : 12-17kg (28 couches)

Pour choisir la taille idéale, référez-vous au poids actuel de votre bébé.`
  }, {
    type: 'user-choices',
    choices: ["Nouveau-né", "Taille S", "Taille M", "Taille L", "Taille XL"]
  }],
  
  quantity: [{
    type: 'assistant',
    content: ({ previousOrders }: PreviousOrdersParam = {}) => `
${previousOrders ? "Ravi de vous revoir ! " : ""}Nos couches Ecoboom sont vendues par pack :

• 1 pack au prix standard
• 3 packs : -10% sur le total
• 5 packs et plus : -15% sur le total

L'abonnement mensuel vous offre -20% sur chaque livraison récurrente.
      
Combien de packs souhaitez-vous commander ?`
  }, {
    type: 'user-choices',
    choices: ["1 pack", "3 packs (-10%)", "5 packs (-15%)", "M'abonner (-20%)"]
  }],
  
  subscription: [{
    type: 'assistant',
    content: `Notre programme d'abonnement vous permet de recevoir vos couches automatiquement selon la fréquence de votre choix, avec 20% de réduction permanente !

Choisissez votre fréquence de livraison :`
  }, {
    type: 'user-choices',
    choices: [
      "Toutes les 2 semaines",
      "Tous les mois",
      "Tous les 2 mois",
      "Commander sans abonnement"
    ]
  }],
  
  additionalProducts: [{
    type: 'assistant',
    content: "Souhaitez-vous ajouter d'autres produits de notre gamme pour bébé ?"
  }, {
    type: 'user-choices',
    choices: [
      "Ajouter des lingettes biodégradables",
      "Ajouter un pack d'essai de crème change",
      "Continuer sans produit supplémentaire"
    ]
  }]
};