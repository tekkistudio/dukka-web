// apps/web/src/components/sections/demo/data.ts
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
  const priceQuestion = scenario.genre === 'masculin' ? "Quel est son prix ?" : "Quel est son prix ?";
  return [
    {
      type: 'assistant',
      content: `Bonjour 👋 Je suis ${scenario.chatbotName}. Je suis là pour répondre à vos questions et vous guider dans votre achat. Je vois que notre ${scenario.product.name} vous intéresse. C'est un excellent choix ! Comment puis-je vous aider ?`
    },
    {
      type: 'user-choices',
      choices: [
        "J'aimerais plus d'informations",
        "Je souhaite commander",
        priceQuestion
      ]
    }
  ];
}

export const botResponses = {
  'viens-on-sconnait': {
    'infos': [{
      type: 'assistant',
      content: "Ce jeu a été spécialement conçu pour les couples mariés qui souhaitent raviver la passion, améliorer leur communication et renforcer votre lien conjugal, peu importe leur nombre d'années de mariage. Il contient 150 cartes de questions pour :",
      media: [{
        type: 'image',
        url: '/images/products/maries-1.jpg',
        alt: 'Jeu pour les couples mariés',
        caption: 'Le jeu pour les couples mariés'
      }]
    }, {
      type: 'assistant',
      content: "• redécouvrir votre partenaire\n• discuter de sujets cruciaux\n• renouveler la connexion",
      media: [{
        type: 'image',
        url: '/images/products/maries-2.jpg',
        alt: 'Cartes du jeu pour les couples mariés',
        caption: 'Aperçu des cartes du jeu'
      }]
    }, {
      type: 'assistant',
      content: "Que souhaitez-vous faire ?"
    }, {
      type: 'user-choices',
      choices: [
        "Je souhaite commander",
        "Combien coûte-t-il ?"
      ]
    }],
    'prix': [{
      type: 'assistant',
      content: "Il coûte 14 000 FCFA, et la livraison est gratuite à Dakar. Dans les autres villes du Sénégal, elle est à 3000F CFA."
    }, {
      type: 'assistant',
      content: "Nous proposons des remises selon la quantité commandée :\n• 2 exemplaires : -10%\n• 3 exemplaires : -15%\n• Plus de 3 exemplaires : -20%\n\nDe plus, une remise de 10% est appliquée sur le jeu pour les couples non mariés si vous l'ajoutez à votre commande.",
      media: [{
        type: 'image',
        url: '/images/products/couples-1.jpg',
        alt: 'Jeu pour les couples non mariés',
        caption: 'Le jeu pour les couples non mariés'
      }]
    }, {
      type: 'assistant',
      content: "Que souhaitez-vous faire ?"
    }, {
      type: 'user-choices',
      choices: [
        "Poursuivre ma commande",
        "Ajouter le jeu pour les couples non mariés"
      ]
    }]
  },
  'shop-mode': {
    'infos': [{
      type: 'assistant',
      content: "Cette robe Bogolan est une création unique qui allie modernité et tradition :",
      media: [{
        type: 'image',
        url: '/images/products/robe-bogolan.webp',
        alt: 'Robe en tissu Bogolan',
        caption: 'Notre robe signature en Bogolan'
      }]
    }, {
      type: 'assistant',
      content: "• Tissu Bogolan authentique du Mali\n• Coupe moderne adaptable\n• Tailles disponibles: S à XXL\n• Personnalisation possible"
    }, {
      type: 'assistant',
      content: "Que souhaitez-vous faire ?"
    }, {
      type: 'user-choices',
      choices: [
        "Je souhaite commander",
        "Combien coûte-t-elle ?"
      ]
    }],
    'prix': [{
      type: 'assistant',
      content: "La robe est à 35 000 FCFA. La livraison est offerte à partir de 54 000 FCFA d'achat, sinon elle est à 3 000 FCFA."
    }, {
      type: 'assistant',
      content: "Pour atteindre ce montant, vous pouvez :\n• commander deux robes (-15% sur la deuxième)\n• ajouter des accessoires assortis",
      media: [
        {
          type: 'image',
          url: '/images/products/sac-bogolan.webp',
          alt: 'Sac en Bogolan',
          caption: 'Sac assorti (25 000 FCFA)'
        },
        {
          type: 'image',
          url: '/images/products/echarpe.webp',
          alt: 'Écharpe assortie',
          caption: 'Écharpe (15 000 FCFA)'
        }
      ]
    }, {
      type: 'assistant',
      content: "Que souhaitez-vous faire ?"
    }, {
      type: 'user-choices',
      choices: [
        "Poursuivre ma commande",
        "Commander deux robes",
        "Voir les accessoires"
      ]
    }]
  },
  'restaurant': {
    'infos': [{
      type: 'assistant',
      content: "Notre box est préparée chaque jour avec des produits frais et locaux :",
      media: [{
        type: 'image',
        url: '/images/products/box-de-snacks.webp',
        alt: 'Box de snacks',
        caption: 'Notre box signature'
      }]
    }, {
      type: 'assistant',
      content: "• Ingrédients 100% naturels\n• Recettes traditionnelles revisitées\n• Portions généreuses\n• Packaging écologique"
    }, {
      type: 'assistant',
      content: "Que souhaitez-vous faire ?"
    }, {
      type: 'user-choices',
      choices: [
        "Je souhaite commander",
        "Quel est son prix ?"
      ]
    }],
    'prix': [{
      type: 'assistant',
      content: "La box individuelle est à 13 000 FCFA, livraison incluse."
    }, {
      type: 'assistant',
      content: "Nous proposons des réductions sur les commandes multiples :\n• 2 box : -10%\n• 3 box et plus : -15%"
    }, {
      type: 'assistant',
      content: "Que souhaitez-vous faire ?"
    }, {
      type: 'user-choices',
      choices: [
        "Commander 1 box",
        "Commander 2 box (-10%)",
        "Commander 3 box (-15%)"
      ]
    }]
  }
};

export const otherProducts = [{
  type: 'assistant',
  content: "Voici nos autres jeux disponibles :\n\n• VIENS ON S'CONNAÎT - En Famille (14 000 FCFA) : conçu pour renforcer les relations entre les Parents et les Enfants\n• VIENS ON S'CONNAÎT - Entre Amis (14 000 FCFA) : conçu pour les amis qui veulent mieux se connaître et passer un moment fun et agréable ensemble.",
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
}, {
  type: 'user-choices',
  choices: [
    "Ajouter le jeu pour la Famille",
    "Ajouter le jeu pour les Amis",
    "Non merci, continuer ma commande"
  ]
}];

export const checkoutFlow = {
  quantity: [{
    type: 'assistant',
    content: "Entendu ! Combien d'exemplaires souhaitez-vous commander ?"
  }, {
    type: 'user-choices',
    choices: ["1 exemplaire", "2 exemplaires", "3 exemplaires", "Plus"]
  }],
  additionalProducts: [{
    type: 'assistant',
    content: "C'est noté ! Savez-vous que nous avons d'autres jeux qui pourraient vous intéresser ?"
  }, {
    type: 'user-choices',
    choices: ["Voir les autres jeux", "Continuer avec ma commande"]
  }],
  contactInfo: [{
    type: 'assistant',
    content: "Pour procéder à la livraison de votre commande, j'aurais besoin de quelques informations. Puis-je avoir votre nom complet ?"
  }],
  address: [{
    type: 'assistant',
    content: ({ firstName }) => `Merci ${firstName} ! Dans quelle ville habitez-vous ?`
  }],
  deliveryAddress: [{
    type: 'assistant',
    content: ({ city }) => `Parfait ! Quelle est votre adresse exacte à ${city} ?`
  }],
  phone: [{
    type: 'assistant',
    content: ({ firstName }) => `Super ${firstName} ! Quel est votre numéro de téléphone ?`
  }],
  paymentMethod: [{
    type: 'assistant',
    content: ({ orderData, activeScenario, totalAmount }) => {
      let deliveryCost = orderData.city.toLowerCase() === 'dakar' ? 0 : 3000;
      let total = totalAmount;
      
      return `Voici le récapitulatif de votre commande :\n${orderData.orderDetails}\n\n` +
        `Livraison : ${orderData.city}\n` +
        `Adresse : ${orderData.address}\n` +
        `Coût de la livraison : ${deliveryCost} F CFA\n` +
        `Téléphone : ${orderData.phone}\n\n` +
        `Total : ${total.toLocaleString()} F CFA\n\n` +
        `Par quel moyen souhaitez-vous payer ?\n\n` +
        `⚠️ Les personnes qui payent à l'avance sont prioritaires pour la livraison.`
    }
  }, {
    type: 'user-choices',
    choices: ["Wave", "Orange Money (bientôt disponible)", "Free Money (bientôt disponible)", "Paiement à la livraison"]
  }],
  wavePayment: [{
    type: 'assistant',
    content: "Vous avez choisi de payer avec Wave. Cliquez sur le bouton ci-dessous pour procéder au paiement."
  }]
};

export const shopModeFlow = {
  ...checkoutFlow,
  size: [{
    type: 'assistant',
    content: "Quelle taille souhaitez-vous commander ?"
  }, {
    type: 'user-choices',
    choices: ["S", "M", "L", "XL", "XXL"]
  }],
  accessories: [{
    type: 'assistant',
    content: "Voici nos accessoires assortis :\n• Sac en Bogolan (25 000 FCFA)\n• Écharpe assortie (15 000 FCFA)\n• Bandeau coordonné (8 000 FCFA)",
    media: [
      {
        type: 'image',
        url: '/images/products/sac-bogolan.webp',
        alt: 'Sac en Bogolan',
        caption: 'Sac en Bogolan'
      },
      {
        type: 'image',
        url: '/images/products/echarpe.webp',
        alt: 'Écharpe assortie',
        caption: 'Écharpe assortie'
      },
      {
        type: 'image',
        url: '/images/products/bandeau.webp',
        alt: 'Bandeau coordonné',
        caption: 'Bandeau coordonné'
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
    content: "Pour quelle heure souhaitez-vous être livré(e) ?"
  }, {
    type: 'user-choices',
    choices: ["12h - 13h", "13h - 14h", "19h - 20h", "20h - 21h"]
  }],
  addons: [{
    type: 'assistant',
    content: "Souhaitez-vous ajouter des boissons ?\n• Bissap frais (2 000 FCFA)\n• Gingembre frais (2 000 FCFA)\n• Cocktail detox (2 500 FCFA)"
  }, {
    type: 'user-choices',
    choices: [
      "Ajouter Bissap",
      "Ajouter Gingembre",
      "Ajouter Cocktail detox",
      "Continuer sans boisson"
    ]
  }]
};