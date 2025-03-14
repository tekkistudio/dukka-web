import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Composant de chargement pour les sections
const SectionLoading = ({ height = "400px" }: { height?: string }) => (
  <div className={`min-h-[${height}] animate-pulse bg-gray-100 rounded-lg`}></div>
);

// Chargement dynamique côté client uniquement des composants qui utilisent window
const HeroSection = dynamic(
  () => import('@/components/sections/HeroSection').then(mod => mod.HeroSection),
  { 
    ssr: false,
    loading: () => <SectionLoading height="500px" />
  }
);

// Les autres sections peuvent être chargées normalement avec Suspense
const HowItWorksSection = dynamic(
  () => import('@/components/sections/HowItWorksSection').then(mod => mod.HowItWorksSection),
  { loading: () => <SectionLoading /> }
);

const FeaturesSection = dynamic(
  () => import('@/components/sections/FeaturesSection').then(mod => mod.FeaturesSection),
  { loading: () => <SectionLoading height="600px" /> }
);

// Ce composant doit être chargé côté client seulement
const DemoSection = dynamic(
  () => import('@/components/sections/DemoSection').then(mod => mod),
  { 
    ssr: false,
    loading: () => <SectionLoading height="800px" />
  }
);

const ComparisonSection = dynamic(
  () => import('@/components/sections/ComparisonSection').then(mod => mod.ComparisonSection),
  { loading: () => <SectionLoading height="600px" /> }
);

const FAQSection = dynamic(
  () => import('@/components/sections/FAQSection').then(mod => mod.FAQSection),
  { loading: () => <SectionLoading /> }
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-white text-gray-900">
      <Suspense fallback={<SectionLoading height="500px" />}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <HowItWorksSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading height="600px" />}>
        <FeaturesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading height="800px" />}>
        <DemoSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading height="600px" />}>
        <ComparisonSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoading />}>
        <FAQSection />
      </Suspense>
    </main>
  );
}