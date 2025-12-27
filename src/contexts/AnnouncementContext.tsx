'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AnnouncementContextType {
  isVisible: boolean;
  closeAnnouncement: () => void;
  announcementHeight: number;
}

const AnnouncementContext = createContext<AnnouncementContextType>({
  isVisible: true,
  closeAnnouncement: () => {},
  announcementHeight: 48,
});

export const useAnnouncement = () => useContext(AnnouncementContext);

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolledPast, setHasScrolledPast] = useState(false);
  
  const announcementHeight = 48; // h-12 = 48px

  useEffect(() => {
    const handleScroll = () => {
      // Si on a scrollé au-delà de la hauteur de la barre
      setHasScrolledPast(window.scrollY > announcementHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [announcementHeight]);

  const closeAnnouncement = () => {
    setIsVisible(false);
  };

  // La barre est considérée "active" seulement si elle est visible ET qu'on n'a pas scrollé au-delà
  const effectivelyVisible = isVisible && !hasScrolledPast;

  return (
    <AnnouncementContext.Provider 
      value={{ 
        isVisible: effectivelyVisible, 
        closeAnnouncement,
        announcementHeight
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
}