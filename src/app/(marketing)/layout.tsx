// src/app/(marketing)/layout.tsx
'use client';

import React, { useEffect, useState } from 'react';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Afficher un écran de chargement jusqu'à ce que le composant soit monté côté client
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de Dukka...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* En-tête simplifié */}
      <header className="bg-white shadow-sm py-4 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">Dukka</a>
          <nav className="hidden md:flex gap-6">
            <a href="/fonctionnalites" className="text-gray-700 hover:text-blue-600">Fonctionnalités</a>
            <a href="/a-propos" className="text-gray-700 hover:text-blue-600">À propos</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </nav>
          <a 
            href="/waitlist" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Liste d&apos;attente
          </a>
        </div>
      </header>
      
      {/* Contenu principal */}
      {children}
    </div>
  );
}