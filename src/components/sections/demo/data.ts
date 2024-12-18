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
    id: 'shop-mode',
    title: "Othentic",
    subtitle: "Vêtements traditionnels",
    context: "Mode traditionnelle",
    chatbotName: "Fatim",
    genre: "feminin",
    product: {
      name: "Robe Bogolan",
      price: 35000,
      description: "Robe moderne en tissu Bogolan"
    }
  },
  {
    id: 'restaurant',
    title: "Yamo'o",
    subtitle: "Restaurant à domicile",
    context: "Restauration",
    chatbotName: "Rosy",
    genre: "feminin",
    product: {
      name: "Box de snacks",
      price: 13000,
      description: "Notre box signature (bestseller)"
    }
  }
];

export function buildConversation(scenario: Scenario) {
  return [
    {
      type: 'assistant',
      content: `Bonjour 👋 Je suis ${scenario.chatbotName}. Je suis là pour répondre à vos questions et vous guider dans votre achat. Je vois que notre ${scenario.product.name} vous intéresse. C'est un excellent choix ! Comment puis-je vous aider ?`
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
        content: `Le jeu VIENS ON S'CONNAÎT - Entre Mariés a été spécialement conçu pour les couples mariés qui souhaitent renforcer leur lien conjugal et raviver la passion dans leur relation. Il offre une opportunité unique d'explorer les aspects les plus intimes et significatifs de votre vie à deux, tout en créant des moments de connexion authentique et de croissance mutuelle. Le jeu contient 150 cartes réparties en 3 catégories :
💝 Connexion Émotionnelle 
💫 Projets & Rêves 
💑 Intimité & Complicité 

Chaque carte pose une question ou propose une activité pour renforcer votre lien conjugal.`,
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
          "Commander maintenant",
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
  'shop-mode': {
    'infos': [
      {
        type: 'assistant',
        content: `Cette robe Bogolan est une création unique qui allie modernité et tradition. Elle est confectionnée avec :

• Tissu Bogolan authentique du Mali
• Coupe moderne et élégante
• Finitions soignées à la main
• Doublure en coton respirant

Vous pouvez l'acheter toute seule ou opter pour l'un de nos ensembles.`,
        media: [{
          type: 'image',
          url: '/images/products/robe-bogolan.webp',
          alt: 'Robe en tissu Bogolan',
          caption: 'Notre robe signature en Bogolan'
        }]
      },
      {
        type: 'user-choices',
        choices: [
          "Voir les ensembles",
          "Commander la robe",
          "Voir les prix"
        ]
      }
    ],
    'prix': [
      {
        type: 'assistant',
        content: `La robe seule est à 35 000 FCFA. Cependant, vous pouvez bénéficier des offres suivantes :

• Ensemble Complet (Robe + Sac + Écharpe) : 68 000 FCFA au lieu de 75 000 FCFA
• Ensemble Essentiel (Robe + Sac) : 55 000 FCFA au lieu de 60 000 FCFA
• Duo Élégant (Robe + Écharpe) : 45 000 FCFA au lieu de 50 000 FCFA

💫 La livraison est offerte sur tous les ensembles !`
      },
      {
        type: 'assistant',
        content: `Articles individuels :
• Robe Bogolan : 35 000 FCFA
• Sac assorti : 25 000 FCFA
• Écharpe : 15 000 FCFA
• Bandeau : 8 000 FCFA

La livraison est offerte à partir de 54 000 FCFA d'achat.`,
      },
      {
        type: 'user-choices',
        choices: [
          "Choisir un ensemble",
          "Commander la robe",
          "Voir les accessoires"
        ]
      }
    ]
  },
  'restaurant': {
    'infos': [{
      type: 'assistant',
      content: "Notre box signature est préparée chaque jour avec des produits frais et locaux. Elle contient :",
      media: [{
        type: 'image',
        url: '/images/products/box-de-snacks.webp',
        alt: 'Box de snacks',
        caption: 'Notre box signature'
      }]
    }, {
      type: 'assistant',
      content: `• Une sélection de snacks variés et équilibrés
- Des ingrédients 100% naturels et locaux
- Des portions généreuses
- Un packaging écologique`,
    }, {
      type: 'user-choices',
      choices: [
        "Je souhaite commander",
        "Voir les prix",
        "Voir les accompagnements"
      ]
    }],
    'prix': [{
      type: 'assistant',
      content: `Voici nos offres pour la box de snacks :

- 1 box : 13 000 FCFA
- 2 box : 23 400 FCFA (-10%)
- 3 box et plus : -15%

Les boissons :
- Bissap frais : 2 000 FCFA
- Gingembre frais : 2 000 FCFA
- Cocktail detox : 2 500 FCFA

🚚 La livraison est gratuite à Dakar 🇸🇳`
    }, {
      type: 'user-choices',
      choices: [
        "Commander maintenant",
        "En savoir plus",
        "Voir les boissons"
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
    content: "Excellent choix ! 🎉 Savez-vous que nous avons d'autres jeux qui pourraient vous intéresser ?"
  }, {
    type: 'user-choices',
    choices: ["Voir les autres jeux", "Continuer avec ma commande"]
  }],
  
  contactInfo: [{
    type: 'assistant',
    content: "Pour procéder à la livraison de votre commande, j'aurais besoin de quelques informations. Commençons par la base : quel est votre nom complet ?"
  }],
  
  address: [{
    type: 'assistant',
    content: ({ firstName }) => `Merci ${firstName} ! 🙂 Dans quelle ville habitez-vous ?`
  }],
  
  deliveryAddress: [{
    type: 'assistant',
    content: ({ city }) => `Parfait ! Quelle est votre adresse exacte à ${city} ?`
  }],
  
  phone: [{
    type: 'assistant',
    content: ({ firstName }) => `Super ${firstName} ! Quel est votre numéro de téléphone 📱 ? C'est important pour la livraison.`
  }],
  
  paymentMethod: [{
    type: 'assistant',
    content: ({ orderData, activeScenario, totalAmount }) => {
      const deliveryCost = orderData.city.toLowerCase() === 'dakar' ? 0 : 3000;
      
      return `📋 Voici le récapitulatif de votre commande :

${orderData.orderDetails}

📍 Informations de livraison :
• Ville : ${orderData.city}
• Adresse : ${orderData.address}
• Frais de livraison : ${deliveryCost} F CFA
• Téléphone : ${orderData.phone}

💰 Total à payer : ${totalAmount.toLocaleString()} F CFA

Choisissez votre mode de paiement ci-dessous.

⚠️ Les personnes qui paient à l'avance sont prioritaires pour la livraison.`
    }
  }, {
    type: 'user-choices',
    choices: ["Wave", "Orange Money (bientôt disponible)", "Free Money (bientôt disponible)", "Paiement à la livraison"]
  }],
  
  wavePayment: [{
    type: 'assistant',
    content: "Super ! Vous avez choisi de payer avec Wave. Cliquez sur le bouton ci-dessous pour procéder au paiement sécurisé et sans frais. 🔒"
  }]
};

export const shopModeFlow = {
  ...checkoutFlow,
  size: [{
    type: 'assistant',
    content: `Pour vous aider à choisir la bonne taille de la robe Bogolan :

📏 Voici notre guide des tailles :
• S : 36-38 (tour de poitrine : 85-90cm)
• M : 38-40 (tour de poitrine : 90-95cm)
• L : 40-42 (tour de poitrine : 95-100cm)
• XL : 42-44 (tour de poitrine : 100-105cm)
• XXL : 44-46 (tour de poitrine : 105-110cm)

Quelle taille souhaitez-vous commander ?`
  }, {
    type: 'user-choices',
    choices: ["S", "M", "L", "XL", "XXL"]
  }],
  
  accessories: [{
    type: 'assistant',
    content: "Pour sublimer votre tenue, voici notre sélection d'accessoires assortis :",
    media: [
      {
        type: 'image',
        url: '/images/products/sac-bogolan.webp',
        alt: 'Sac en Bogolan',
        caption: 'Sac en Bogolan (25 000 FCFA)'
      },
      {
        type: 'image',
        url: '/images/products/echarpe.webp',
        alt: 'Écharpe assortie',
        caption: 'Écharpe (15 000 FCFA)'
      },
      {
        type: 'image',
        url: '/images/products/bandeau.webp',
        alt: 'Bandeau coordonné',
        caption: 'Bandeau (8 000 FCFA)'
      }
    ]
  }, {
    type: 'user-choices',
    choices: [
      "Ajouter le sac",
      "Ajouter l'écharpe",
      "Ajouter le bandeau",
      "Continuer sans accessoire"
    ]
  }]
};

export const restaurantFlow = {
  ...checkoutFlow,
  quantity: [{
    type: 'assistant',
    content: ({previousOrders} = {}) => `
${previousOrders ? "Ravi de vous revoir ! " : ""}Notre box signature contient une sélection de snacks préparés avec des produits frais du jour 😋

Combien souhaitez-vous en commander ?
• 1 box : 13 000 FCFA
• 2 box : 23 400 FCFA (-10%)
• 3 box : 33 150 FCFA (-15%)`
  }, {
    type: 'user-choices',
    choices: ["1 box", "2 box (-10%)", "3 box (-15%)", "Plus"]
  }],
  
  timeSlot: [{
    type: 'assistant',
    content: ({boxQuantity}) => `Super ! Pour vos ${boxQuantity} box${boxQuantity > 1 ? 's' : ''}, à quelle heure souhaitez-vous recevoir votre commande ? 🕒`
  }, {
    type: 'user-choices',
    choices: ["12h - 13h", "13h - 14h", "19h - 20h", "20h - 21h"]
  }],
  
  addons: [{
    type: 'assistant',
    content: "Et pour accompagner vos snacks, nous avons une sélection de boissons fraîches faites maison 🥤\n\n• Bissap frais (2 000 FCFA)\n• Gingembre frais (2 000 FCFA)\n• Cocktail detox (2 500 FCFA)"
  }, {
    type: 'user-choices',
    choices: [
      "Ajouter le Bissap",
      "Ajouter le Gingembre",
      "Ajouter le Cocktail detox",
      "Continuer sans boisson"
    ]
  }],
  
  orderSummary: [{
    type: 'assistant',
    content: ({ orderData, totalAmount }) => `
Voici le récapitulatif de votre commande 📝

${orderData.quantity} Box ${orderData.quantity > 1 ? `(-${orderData.quantity >= 3 ? '15' : '10'}%)` : ''}
${orderData.drinks.length > 0 ? `\nBoissons :\n${orderData.drinks.map(drink => `• ${drink}`).join('\n')}` : ''}

Livraison : ${orderData.deliveryTime}
Total : ${totalAmount.toLocaleString()} FCFA`
  }]
};