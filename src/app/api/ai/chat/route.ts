// app/api/ai/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import type { ChatMessage } from '@/services/aiService';

// System instructions for the AI chatbot
function getSystemPrompt(options: any): string {
  return `Tu es ${options.chatbotName}, une vendeuse expérimentée pour une boutique en ligne qui commercialise "${options.productName}". 
Tu es de genre ${options.chatbotGender}.
Tu es sympathique, professionnelle et toujours prête à aider les clients de manière respectueuse et cordiale.

Ton rôle est de:
1. Répondre aux questions sur le produit de manière précise, engageante et convaincante
2. Convaincre les visiteurs d'acquérir le produit et les guider dans leur processus d'achat
3. Adopter un ton amical tout en restant professionnelle
4. Fournir des réponses concises et pertinentes (maximum 2-3 phrases)

Produit: ${options.productName}
Contexte: ${options.scenario}

Information spécifique sur le produit:
${getProductInfo(options.scenario)}

Utilise des émojis occasionnellement pour rendre la conversation plus vivante, mais pas de façon excessive.
Évite les réponses trop longues. Si le client pose une question très spécifique qui n'est pas couverte dans tes connaissances sur le produit ou tes connaissances générale, suggère-lui de parler à un représentant du service client.`;
}

function getProductInfo(scenarioId: string): string {
  switch (scenarioId) {
    case 'Jeux relationnels':
      return `
- Le jeu VIENS ON S'CONNAÎT - Entre Mariés est conçu pour améliorer les relations conjugales grâce à des questions significatives que les partenaires se posent pour mieux se connaître, mieux se comprendre et mieux aborder leur relation. Le jeu contient 150 cartes de questions choisies avec soin pour favoriser des échanges utiles et significatifs.
- Prix: 14 000 FCFA pour un jeu, avec des réductions pour les achats multiples.
- Packs disponibles: Pack Duo (25 200 FCFA), Pack Trio (35 700 FCFA), Pack Comité (-20%).
- Livraison gratuite à Dakar, 3000 FCFA pour les autres villes du Sénégal et Abidjan.
- Autres jeux disponibles: En Famille, Entre Amis (14 000 FCFA chacun).
`;

    case 'Santé & bien-être':
      return `
- La ceinture chauffante Mia est le premier produit de la marque Amani. Mia soulage les douleurs menstruelles grâce à la thermothérapie et la massothérapie. La chaleur facilite l'écoulement du sang et le massage détend les muscles, ce qui aide à réduire drastiquement la douleur, voire à la supprimer.

• Mia possède 4 niveaux d'intensité de chaleur ajustables selon les besoins de l'utilisatrice
• Les 4 niveaux de vibrations massantes sont utilisées pour soulager les crampes
• La batterie est facilement rechargeable, avec une autonomie de 4h

Mia a été conçue pour être discrète et confortable sous les vêtements, afin d'accompagner l'utilisatrice en toute sérénité tout au long de la journée, durant sa période du mois.
- Prix actuel: 29 900 FCFA (au lieu de 34 000 FCFA).
- 4 niveaux d'intensité de chaleur et de vibrations massantes, autonomie de 4h.
- Packs disponibles: Pack Sérénité (32 500 FCFA), Pack Complet (38 700 FCFA), Pack Famille (54 900 FCFA).
- Accessoires: Housse de transport (4 500 FCFA), Tisanes bio (6 900 FCFA), Batterie supplémentaire (8 500 FCFA).
- Livraison gratuite pour les commandes supérieures à 40 000 FCFA.
`;

    case 'Produits pour bébé':
      return `
- Les couches Ecoboom sont biodégradables, fabriquées à partir de fibres de bambou.
- Sans produits chimiques nocifs ni parfums, idéales pour les peaux sensibles des bébés.
- Tailles disponibles: Nouveau-né (0-4.5kg, 34 couches, 4 800 FCFA), S (3-8kg, 36 couches, 5 400 FCFA), M (6-10kg, 32 couches, 6 400 FCFA), L (9-14kg, 30 couches, 6 900 FCFA), XL (12-17kg, 28 couches, 7 500 FCFA).
- Réductions: -10% pour 3 packs, -15% pour 5 packs et plus, -20% avec abonnement.
- Produits complémentaires: Lingettes biodégradables, crème change naturelle.
- Se décomposent en 3-5 ans contre 500 ans pour les couches classiques.
`;

    default:
      return '';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [], options } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Utilisez le mode démo si aucune clé API n'est configurée ou si c'est explicitement demandé
    const demoMode = !process.env.OPENAI_API_KEY && !process.env.CLAUDE_API_KEY;
    
    if (demoMode) {
      const aiResponse = simulateAiResponse(message, options);
      return NextResponse.json({ response: aiResponse });
    }
    
    const messages: ChatMessage[] = [
      { role: 'system', content: getSystemPrompt(options) },
      ...history,
      { role: 'user', content: message }
    ];
    
    // Décider quelle API utiliser en fonction des clés disponibles
    // Priorité à Claude si les deux sont disponibles
    if (process.env.CLAUDE_API_KEY) {
      return await getClaudeResponse(messages);
    } else if (process.env.OPENAI_API_KEY) {
      return await getOpenAIResponse(messages);
    } else {
      // Fallback au mode démo si aucune clé n'est trouvée
      const aiResponse = simulateAiResponse(message, options);
      return NextResponse.json({ response: aiResponse });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function getOpenAIResponse(messages: ChatMessage[]) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 150
      })
    });
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return NextResponse.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

async function getClaudeResponse(messages: ChatMessage[]) {
  try {
    // Format pour Claude API
    const claudeMessages = {
      model: "claude-3-haiku-20240307",
      max_tokens: 150,
      temperature: 0.7,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    };
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(claudeMessages)
    });
    
    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return NextResponse.json({ response: data.content[0].text });
  } catch (error) {
    console.error('Claude API error:', error);
    throw error;
  }
}

// Simulate AI responses for the demo
function simulateAiResponse(message: string, options: any): string {
  const messageLower = message.toLowerCase();
  const { scenario, productName, chatbotName } = options;
  
  // Generic responses based on common customer questions
  if (messageLower.includes('bonjour') || messageLower.includes('salut') || messageLower.includes('hello')) {
    return `Bonjour ! 👋 Je suis ${chatbotName}, votre assistante d'achat. Comment puis-je vous aider avec notre ${productName} aujourd'hui ?`;
  }
  
  if (messageLower.includes('prix') || messageLower.includes('coût') || messageLower.includes('tarif')) {
    switch (scenario) {
      case 'Santé & bien-être':
        return "Notre ceinture chauffante Mia est actuellement en promotion à 29 900 FCFA au lieu de 34 000 FCFA ! Nous avons aussi plusieurs packs disponibles avec des accessoires complémentaires. 🔥";
      case 'Produits pour bébé':
        return "Nos prix varient selon la taille des couches. Le pack nouveau-né (34 couches) commence à 4 800 FCFA. Souhaitez-vous voir les détails pour toutes les tailles ? 🌱";
      default: 
        return "Le prix de base est de 14 000 FCFA. Nous offrons des réductions pour les commandes multiples ! Souhaitez-vous voir nos packs ? 🎁";
    }
  }
  
  if (messageLower.includes('livraison') || messageLower.includes('délai')) {
    return "La livraison est gratuite à Dakar et s'effectue sous 24 à 48h. Pour les autres villes, elle est à 3000 FCFA et peut prendre 2 à 4 jours. 🚚";
  }
  
  if (messageLower.includes('paiement') || messageLower.includes('payer')) {
    return "Nous acceptons les paiements par Wave, Orange Money, et le paiement à la livraison. Le paiement mobile est recommandé pour une livraison prioritaire ! 💳";
  }
  
  if (messageLower.includes('merci') || messageLower.includes('super')) {
    return "Avec plaisir ! 😊 Y a-t-il autre chose que je puisse faire pour vous ?";
  }
  
  // Scenario-specific responses
  switch (scenario) {
    case 'Santé & bien-être':
      if (messageLower.includes('douleur') || messageLower.includes('règle') || messageLower.includes('menstruel')) {
        return "La ceinture Mia utilise la thermothérapie et la massothérapie pour soulager naturellement les douleurs menstruelles. La chaleur détend les muscles tandis que les vibrations atténuent les crampes. 💆‍♀️";
      }
      if (messageLower.includes('fonctionne') || messageLower.includes('utiliser')) {
        return "C'est très simple ! Placez la ceinture sur votre ventre, ajustez la sangle, puis sélectionnez l'intensité de chaleur et le mode de massage souhaités. L'autonomie est de 4h en utilisation continue. ⚡";
      }
      if (messageLower.includes('batterie') || messageLower.includes('autonomie')) {
        return "La batterie rechargeable offre jusqu'à 4 heures d'autonomie en utilisation continue. Une charge complète prend environ 1 à 2 heures. Vous pouvez aussi ajouter une batterie supplémentaire à votre commande ! 🔋";
      }
      break;
      
    case 'Produits pour bébé':
      if (messageLower.includes('taille') || messageLower.includes('poids')) {
        return "Nous proposons 5 tailles selon le poids de votre bébé : Nouveau-né (0-4.5kg), S (3-8kg), M (6-10kg), L (9-14kg) et XL (12-17kg). Pour un confort optimal, référez-vous au poids actuel de votre bébé. 👶";
      }
      if (messageLower.includes('écolo') || messageLower.includes('bio') || messageLower.includes('naturel')) {
        return "Nos couches sont fabriquées à partir de fibres de bambou biodégradables, sans produits chimiques ni parfums. Elles se décomposent en 3-5 ans contre 500 ans pour les couches classiques ! 🌱";
      }
      if (messageLower.includes('abonnement')) {
        return "Notre programme d'abonnement vous offre 20% de réduction permanente avec livraison automatique selon la fréquence choisie. Vous pouvez modifier ou suspendre à tout moment ! 📦";
      }
      break;
      
    case 'Jeux relationnels':
      if (messageLower.includes('jeu') || messageLower.includes('carte')) {
        return "Notre jeu contient 150 cartes de questions conçues pour renforcer les liens entre les couples mariés. Les questions sont réparties en plusieurs catégories : Passé, Présent, Futur, Intimité et Fun ! 💑";
      }
      if (messageLower.includes('règle') || messageLower.includes('jouer')) {
        return "Les règles sont simples : à tour de rôle, piochez une carte et répondez à la question. Soyez honnêtes et prenez le temps d'écouter votre partenaire. Il n'y a ni gagnant ni perdant, juste des moments de connexion ! ❤️";
      }
      break;
  }
  
  // Default response if no specific intent is detected
  return `Je suis là pour vous aider avec toutes vos questions sur notre ${productName}. Que souhaitez-vous savoir exactement ? N'hésitez pas à me demander des détails spécifiques. 😊`;
}