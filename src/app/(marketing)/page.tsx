// src/app/(marketing)/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
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
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section simplifiée */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Vendez comme l&apos;Afrique achète.
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Créez une boutique en ligne où vos clients achètent en discutant, comme dans une boutique physique.
            Un vendeur IA répond à leurs questions 24/7 et les guide jusqu'à l'achat.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/waitlist"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Rejoindre la liste d&apos;attente
            </Link>
            
            <a 
              href="#features"
              className="border-2 border-gray-200 hover:border-blue-500 text-gray-800 font-semibold px-6 py-3 rounded-lg transition"
            >
              Découvrir les fonctionnalités
            </a>
          </div>
        </div>
      </section>
      
      {/* Points forts */}
      <section id="features" className="py-16 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Principaux avantages de Dukka
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Vendeur IA intégré</h3>
              <p className="text-gray-600">
                Imaginez ChatGPT agir comme votre vendeur personnel et guider vos clients de la découverte à l'achat.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Paiements locaux</h3>
              <p className="text-gray-600">
                Vos clients peuvent payer par mobile money (Wave, Orange Money, etc.) et cartes bancaires, sans quitter la conversation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Simple à utiliser</h3>
              <p className="text-gray-600">
                Pas besoin de savoir coder. Créez, gérez et développez facilement votre boutique, avec l'aide de votre Assistant IA.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Prêt à transformer votre business en ligne ?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Rejoignez la liste d'attente pour être parmi les premiers à essayer Dukka.
          </p>
          
          <Link 
            href="/waitlist"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition"
          >
            Rejoindre la liste d&apos;attente
          </Link>
        </div>
      </section>
      
      {/* Footer simplifié */}
      <footer className="py-12 bg-gray-800 text-white px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">© 2025 Dukka - La Meilleure Alternative à Shopify et Woocommerce en Afrique</p>
          <div className="flex justify-center gap-4">
            <Link href="/a-propos" className="hover:underline">À propos</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/fonctionnalites" className="hover:underline">Fonctionnalités</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}