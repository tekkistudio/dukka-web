// src/utils/browser.ts

/**
 * Vérifie si le code s'exécute dans un environnement navigateur
 */
export const isBrowser = (): boolean => {
    return typeof window !== 'undefined';
  };
  
  /**
   * Accès sécurisé à window - à utiliser lorsque l'accès à window est nécessaire
   * mais peut être appelé pendant le rendu côté serveur.
   * 
   * Exemple d'utilisation:
   * const myWindowObject = safeWindow(() => window.someProperty, defaultValue);
   */
  export function safeWindow<T>(accessor: () => T, defaultValue: T): T {
    if (isBrowser()) {
      try {
        return accessor();
      } catch (error) {
        console.error('Error accessing window:', error);
        return defaultValue;
      }
    }
    return defaultValue;
  }
  
  /**
   * Utilitaire pour obtenir le hash de l'URL en toute sécurité
   * Retourne une chaîne vide si exécuté côté serveur
   */
  export function getWindowHash(): string {
    return safeWindow(() => window.location.hash, '');
  }
  
  /**
   * Utilitaire pour effectuer un défilement vers un élément en toute sécurité
   * Ne fait rien si exécuté côté serveur
   */
  export function safeScrollToElement(elementId: string, behavior: ScrollBehavior = 'smooth'): void {
    if (isBrowser()) {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior });
      }
    }
  }