export const waitlistChat = {
    initial: [
      {
        type: 'assistant',
        content: "👋 Bonjour ! Je suis l'Assistant Dukka. Nous sommes ravis de votre intérêt pour notre solution e-commerce conversationnelle pour l'Afrique. Je vais vous guider pour rejoindre notre liste d'attente. Pouvons-nous commencer ?"
      },
      {
        type: 'user-choices',
        content: ["Oui, allons-y", "Je veux en savoir plus"]
      }
    ],
  
    moreInfo: [
      {
        type: 'assistant',
        content: "Dukka est la première solution e-commerce qui comprend vraiment comment les Africains achètent et s'adapte à leurs habitudes d'achat.\n\n Contrairement à Shopify ou WooCommerce qui imposent un parcours d'achat occidental (voir le produit > ajouter au panier > remplir un formulaire > payer), nous mettons la conversation au cœur de l'expérience d'achat de vos clients, en leur permettant d'obtenir des réponses personnalisées à leurs questions sur vos produits, et en les guidant de manière naturelle dans tout le processus d'achat, le tout sans avoir à quitter la conversation."
      },
      {
        type: 'assistant',
        content: "Ce que nous faisons est simple. Nous automatisons ce que vous faites déjà manuellement :\n\n• Discuter avec vos clients potentiels sur WhatsApp ou DM Instagram/Facebook/TikTok\n• Les accompagner de la découverte de vos produits jusqu'à l'achat\n• Collecter les paiements mobiles (Wave, Orange Money, MTN Money, etc.)\n• Suivre les commandes à travers différentes plateformes."
      },
      {
        type: 'assistant',
        content: "Souhaitez-vous rejoindre nos premiers utilisateurs ?"
      },
      {
        type: 'user-choices',
        content: ["Oui, je m'inscris", "Peut-être plus tard"]
      }
    ],
  
    exitAttempt: {
      persuasion: [
        {
          type: 'assistant',
          content: "Je comprends votre hésitation. Cependant, en faisant partie de nos premiers utilisateurs, vous bénéficierez :\n\n• D'un accès prioritaire à la plateforme\n• De 30 jours d'essai offerts\n• D'un accès à notre communauté d'e-commerçants en Afrique.\n• D'une invitation à notre cérémonie de lancement\n\nÊtes-vous sûr(e) de vouloir manquer tout cela ?"
        },
        {
          type: 'user-choices',
          content: ["Je vais m'inscrire", "Oui, je suis sûr(e)"]
        }
      ]
    },
  
    questions: [
      {
        id: 'full_name',
        question: "Excellent ! Pour commencer, quel est votre nom complet ?",
        type: 'text'
      },
      {
        id: 'business_type',
        question: "Quel type de business gérez-vous ?",
        choices: [
          "Marque de produits",
          "Commerce de détail",
          "Business E-commerce",
          "Dropshipping",
          "Produits digitaux",
          "Aucun, pour le moment"
        ]
      },
      {
        id: 'email',
        question: ({ name }) => `Merci ${name.split(' ')[0]} ! Quelle est votre adresse e-mail ?`,
        type: 'email'
      },
      {
        id: 'phone',
        question: "Enfin, quel est votre numéro de téléphone ? Avec l'indicatif de votre pays",
        type: 'tel'
      }
    ],
  
    success: {
      message: ({ name }) => `Merci ${name.split(' ')[0]} ! 🎉\n\nVous êtes maintenant sur notre liste d'attente. Nous vous contacterons dès que Dukka sera disponible afin que vous puissiez tester la solution avant tout le monde.\n\nÀ très bientôt !`,
      action: "Fermer"
    }
  }