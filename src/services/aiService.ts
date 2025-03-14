// src/services/aiService.ts

export type ChatMessage = {
    role: 'user' | 'assistant' | 'system';
    content: string;
  };
  
  interface AiResponseOptions {
    scenario: string;
    productName: string;
    chatbotName: string;
    chatbotGender: 'masculin' | 'feminin';
  }
  
  /**
   * Process a user message through the AI model and get a response
   */
  export async function getAiResponse(
    userMessage: string, 
    conversationHistory: ChatMessage[],
    options: AiResponseOptions
  ): Promise<string> {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: conversationHistory,
          options
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error calling AI service:', error);
      return "Je suis désolé, je n'ai pas pu traiter votre demande. Pourriez-vous essayer à nouveau ?";
    }
  }
  
  /**
   * Identifies AI-suggested options based on user message content
   */
  export function identifyOptions(
    userMessage: string,
    scenarioId: string
  ): string[] {
    const messageLower = userMessage.toLowerCase();
    
    // Common options across all scenarios
    if (messageLower.includes('prix') || messageLower.includes('coût') || messageLower.includes('combien')) {
      return ["Voir les prix", "Je souhaite commander"];
    }
    
    if (messageLower.includes('livraison') || messageLower.includes('délai')) {
      return ["Voir les délais de livraison", "Je souhaite commander"];
    }
    
    if (messageLower.includes('paiement') || messageLower.includes('payer')) {
      return ["Voir les modes de paiement", "Je souhaite commander"];
    }
    
    // Scenario-specific options
    switch (scenarioId) {
      case 'amani':
        if (messageLower.includes('douleur') || messageLower.includes('règle') || messageLower.includes('menstruel')) {
          return ["Comment ça fonctionne ?", "Voir les avis clients"];
        }
        if (messageLower.includes('batterie') || messageLower.includes('autonomie')) {
          return ["Voir les spécifications", "Commander maintenant"];
        }
        if (messageLower.includes('pack') || messageLower.includes('ensemble')) {
          return ["Choisir un pack", "Commander la ceinture seule"];
        }
        break;
        
      case 'ecoboom':
        if (messageLower.includes('bébé') || messageLower.includes('taille') || messageLower.includes('poids')) {
          return ["Voir les tailles disponibles", "Questions fréquentes"];
        }
        if (messageLower.includes('bio') || messageLower.includes('écolo') || messageLower.includes('environnement')) {
          return ["En savoir plus sur nos matériaux", "Voir les certifications"];
        }
        if (messageLower.includes('abonnement') || messageLower.includes('récurrent')) {
          return ["Programme d'abonnement", "Commander sans abonnement"];
        }
        break;
        
      case 'viens-on-sconnait':
        if (messageLower.includes('jeu') || messageLower.includes('carte') || messageLower.includes('règle')) {
          return ["Voir les règles du jeu", "Découvrir les autres jeux"];
        }
        if (messageLower.includes('pack') || messageLower.includes('duo') || messageLower.includes('trio')) {
          return ["Voir les packs", "Commander 1 jeu"];
        }
        break;
    }
    
    // Default options if no specific intent is detected
    return ["Je souhaite commander", "En savoir plus"];
  }
  
  /**
   * Format conversation history for display
   */
  export function formatConversationHistory(messages: any[]): ChatMessage[] {
    return messages
      .filter(msg => msg.type === 'assistant' || msg.type === 'user')
      .map(msg => ({
        role: msg.type === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }));
  }
  
  /**
   * Add AI response to messages array
   */
  export function addAiResponseToMessages(messages: any[], aiResponse: string): any[] {
    return [
      ...messages,
      {
        type: 'assistant',
        content: aiResponse
      }
    ];
  }
  
  /**
   * Generate suggested responses based on AI context
   */
  export function getSuggestedResponses(
    lastBotMessage: string,
    scenarioId: string
  ): string[] {
    // Default suggestions based on the scenario
    const defaultSuggestions = {
      'viens-on-sconnait': ["Je souhaite commander", "Voir les packs", "Combien coûte-t-il ?"],
      'amani': ["Je souhaite commander", "Comment ça fonctionne ?", "Voir les avis clients"],
      'ecoboom': ["Je souhaite commander", "Voir les tailles et prix", "Questions fréquentes"]
    };
    
    // If the message contains pricing information
    if (lastBotMessage.includes('FCFA') || lastBotMessage.includes('prix')) {
      return ["Je souhaite commander", "Voir les options", "En savoir plus"];
    }
    
    // If the message is about product features
    if (lastBotMessage.includes('fonction') || lastBotMessage.includes('caractéristique')) {
      return ["Commander maintenant", "Voir les avis clients", "Poser une question"];
    }
    
    // Default suggestions for the scenario
    return defaultSuggestions[scenarioId as keyof typeof defaultSuggestions] || 
           ["Je souhaite commander", "En savoir plus"];
  }