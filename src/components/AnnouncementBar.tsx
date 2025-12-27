'use client';

import { X, Sparkles } from 'lucide-react';
import { useAnnouncement } from '@/contexts/AnnouncementContext'; // Ajuste le chemin selon ta structure

export default function AnnouncementBar() {
  const { isVisible, closeAnnouncement } = useAnnouncement();

  // On affiche toujours le composant mais on le cache visuellement quand fermé
  // pour éviter les problèmes de layout
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-dukka-blue text-white z-50">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="relative flex items-center justify-center h-12">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 animate-pulse hidden sm:block" />

            {/* Texte mobile */}
            <p className="text-xs sm:hidden font-semibold text-center">
              🚀 Chatseller 2.0 est disponible
            </p>

            {/* Texte desktop */}
            <p className="text-sm font-semibold hidden sm:block">
              Découvrez Chatseller, notre Vendeuse IA pour les marques beauté
            </p>

            <a
              href="https://chatseller.app"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-xs font-bold underline hover:no-underline transition-all whitespace-nowrap"
            >
              Essayer maintenant →
            </a>
          </div>
          <button
            onClick={closeAnnouncement}
            className="absolute right-0 sm:right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Fermer l'annonce"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}