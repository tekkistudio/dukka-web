// src/app/(marketing)/page.tsx
'use client'

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Chargement statique pour le shell initial (optionnel)
import LoadingShell from '@/components/LoadingShell';

// Chargement dynamique côté client uniquement pour tous les composants utilisant window
const HeroSection = dynamic(
  () => import('@/components/sections/HeroSection').then(mod => mod.HeroSection),
  { ssr: false, loading: () => <div className="min-h-screen animate-pulse bg-gray-100"></div> }
);

const HowItWorksSection = dynamic(
  () => import('@/components/sections/HowItWorksSection').then(mod => mod.HowItWorksSection),
  { ssr: false, loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50"></div> }
);

const FeaturesSection = dynamic(
  () => import('@/components/sections/FeaturesSection').then(mod => mod.FeaturesSection),
  { ssr: false, loading: () => <div className="min-h-[600px] animate-pulse bg-gray-100"></div> }
);

const DemoSection = dynamic(
  () => import('@/components/sections/DemoSection').then(mod => mod.DemoSection),
  { ssr: false, loading: () => <div className="min-h-[800px] animate-pulse bg-gray-50"></div> }
);

const ComparisonSection = dynamic(
  () => import('@/components/sections/ComparisonSection').then(mod => mod.ComparisonSection),
  { ssr: false, loading: () => <div className="min-h-[600px] animate-pulse bg-gray-100"></div> }
);

const FAQSection = dynamic(
  () => import('@/components/sections/FAQSection').then(mod => mod.FAQSection),
  { ssr: false, loading: () => <div className="min-h-[400px] animate-pulse bg-gray-50"></div> }
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Suspense fallback={<div className="min-h-screen animate-pulse bg-gray-100"></div>}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px] animate-pulse bg-gray-50"></div>}>
        <HowItWorksSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[600px] animate-pulse bg-gray-100"></div>}>
        <FeaturesSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[800px] animate-pulse bg-gray-50"></div>}>
        <DemoSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[600px] animate-pulse bg-gray-100"></div>}>
        <ComparisonSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px] animate-pulse bg-gray-50"></div>}>
        <FAQSection />
      </Suspense>
    </main>
  );
}