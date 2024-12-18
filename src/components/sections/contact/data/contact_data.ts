// src/components/sections/contact/data/contact_data.ts

export const INITIAL_MESSAGES = [
    {
      type: 'assistant',
      content: "Bonjour 👋 Je suis l'Assistant Dukka. Pour mieux répondre à votre besoin, pouvez-vous me dire quel est votre profil ?"
    },
    {
      type: 'user-choices',
      choices: [
        "Je suis e-commerçant(e)",
        "Je suis commerçant(e)",
        "Je représente une marque",
        "Je suis journaliste/média",
        "Je veux rejoindre Dukka",
        "Autre"
      ]
    }
  ];
  
  export const PERSONALIZED_PRESENTATIONS = {
    'e-commerçant(e)': `Dukka est la première solution e-commerce qui comprend vraiment comment les Africains achètent et s'adapte à leurs habitudes d'achat. 
  
  Contrairement à Shopify ou WooCommerce qui imposent un parcours d'achat occidental (voir le produit > ajouter au panier > remplir un formulaire > payer), nous mettons la conversation au cœur de l'expérience d'achat de vos clients, en leur permettant d'obtenir des réponses personnalisées à leurs questions sur vos produits, et en les guidant de manière naturelle dans tout le processus d'achat.
  
  Ce que nous faisons est simple. Nous automatisons ce que vous faites déjà manuellement :
  • Discuter avec vos clients potentiels sur WhatsApp
  • Les accompagner de la découverte de vos produits à l'achat
  • Collecter les paiements mobiles (Wave, OM, etc.)
  • Suivre les commandes à travers différentes plateformes`,
  
    'commerçant(e)': `Dukka transforme votre façon de vendre sur WhatsApp et les réseaux sociaux en une véritable boutique en ligne professionnelle, sans perdre ce qui fait votre succès : la conversation avec vos clients.
  
  En créant votre boutique en ligne avec Dukka, vous obtenez :
  • Un vendeur AI disponible 24h/24, 7j/7 pour répondre aux questions de vos clients
  • Une intégration native des solutions de paiement mobile locaux (Wave, OM, etc.)
  • Un assistant qui vous permet de comprendre vos performances et optimiser vos ventes
  • Une solution simple et intuitive que vous pouvez gérer sans compétences techniques 
  
  Et tout ça sans changer votre façon de travailler. Nous nous adaptons à vous, pas l'inverse.`,
  
    'marque': `Dukka est la solution e-commerce créée spécifiquement pour les marques africaines qui souhaitent vendre efficacement en ligne.
  
  Notre plateforme :
  • Met en valeur votre marque et vos produits de manière personnalisée
  • Convertit les visiteurs en clients grâce à une approche conversationnelle
  • Gère automatiquement le support client
  • Accepte tous les moyens de paiement locaux
  • Vous donne des insights précieux sur vos clients et vos performances
  
  Nous l'avons d'abord testée avec notre propre marque, VIENS ON S'CONNAÎT, qui a vu ses ventes augmenter de 45% dès le premier mois.`,
  
    'média': `Dukka réinvente l'e-commerce pour l'adapter aux habitudes d'achat africaines, afin d'augmenter les taux de conversions sur les boutiques en ligne. Notre innovation majeure ? Mettre la conversation au cœur de l'expérience d'achat.
  
  Cette approche unique permet à un maximum de personnes en Afrique d'acheter en ligne, et aux e-commerçants d'augmenter leurs ventes de 45% en moyenne.
  
  Dukka est la première solution e-commerce qui comprend vraiment comment les Africains achètent et s'adapte à leurs habitudes d'achat.`,
  
    'autre': `Dukka est une solution innovante qui réinvente l'e-commerce en Afrique en mettant la conversation au cœur de l'expérience d'achat. Nous aidons les commerçants et les marques à vendre en ligne comme les Africains aiment acheter, afin d'attirer plus de clients et réaliser plus de ventes.`,
  
    'équipe': `Dukka réinvente l'e-commerce pour l'adapter aux habitudes d'achat africaines.
Notre vision est simple mais ambitieuse : en Afrique, l'achat est une expérience conversationnelle. Nous transformons cette réalité culturelle en avantage technologique, permettant aux commerçants de vendre plus en offrant à leurs clients une expérience d'achat naturelle et familière.
Nous sommes une startup en pleine croissance, et nous construisons quelque chose d'unique : la première solution e-commerce véritablement pensée par l'Afrique, pour l'Afrique.
  
  Pourquoi nous rejoindre ? :
  • Impact direct : Participez à la transformation du commerce en Afrique
  • Innovation : Développez des solutions uniques qui changent la donne
  • Croissance : Évoluez rapidement dans un environnement dynamique
  • Culture : Rejoignez une équipe diverse qui repousse les limites
  
  Nos valeurss :
  • Excellence : Nous visons l'excellence dans tout ce que nous faisons
  • Innovation : Nous osons penser différemment
  • Collaboration : Nous réussissons ensemble
  • Authenticité : Nous restons fidèles à notre identité africaine
  • Impact : Nous mesurons notre succès par notre impact sur le commerce africain
  
  Si vous êtes passionné(e) par la tech, motivé(e) par l'impact, et excité(e) à l'idée de construire quelque chose d'unique, nous devrions parler.`
  };
  
  export const AVAILABLE_POSITIONS = `Nous recherchons actuellement :
  
  🎨 Product Designer
  • Expertise en UX/UI design
  • Maîtrise de Figma
  • Expérience en produits centrés utilisateur
  • Compréhension du marché africain
  
  💻 Fullstack Developer
  • Expertise React.js et Node.js
  • Expérience en architecture système
  • Passion pour les nouvelles technologies
  • Goût pour les défis techniques
  
  👨‍💻 Frontend Developer (React)
  • Expertise React et Next.js
  • Maîtrise de Tailwind CSS
  • Sensibilité UI/UX
  • Rigueur et attention aux détails
  
  📈 Growth Manager
  • Expérience en growth hacking
  • Connaissance du marché africain
  • Approche data-driven
  • Leadership et créativité
  
  🤝 Commercial
  • Connaissance du marché africain
  • Excellent relationnel
  • Bilingue français/wolof
  • Orientation résultats
  
  Les postes sont basés à Dakar avec possibilité de remote partiel.`;