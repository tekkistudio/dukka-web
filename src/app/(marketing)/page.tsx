// src/app/(marketing)/page.tsx
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load sections
const NewHeroSection = dynamic(() => import('@/components/sections/NewHeroSection'), {
  ssr: true,
});

const ProblemSection = dynamic(
  () => import('@/components/sections/ProblemSection'),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const FounderStorySection = dynamic(
  () => import('@/components/sections/FounderStorySection'),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const ChatsellerSection = dynamic(
  () => import('@/components/sections/ChatsellerSection'),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const PipelineSection = dynamic(
  () => import('@/components/sections/PipelineSection'),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const WhyDukkaSection = dynamic(
  () => import('@/components/sections/WhyDukkaSection'),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const FinalCTASection = dynamic(
  () => import('@/components/sections/FinalCTASection'),
  {
    ssr: false,
    loading: () => <SectionSkeleton height="small" />,
  }
);

// Loading skeleton
function SectionSkeleton({ height = 'normal' }: { height?: 'small' | 'normal' }) {
  return (
    <div className={`w-full ${height === 'small' ? 'py-16' : 'py-24'} flex items-center justify-center bg-white`}>
      <div className="animate-pulse space-y-8 w-full max-w-7xl px-4">
        <div className="h-12 bg-dukka-gray-200 rounded-xl w-3/4 mx-auto" />
        <div className="h-6 bg-dukka-gray-200 rounded-lg w-1/2 mx-auto" />
        {height === 'normal' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-dukka-gray-200 rounded-2xl" />
            <div className="h-64 bg-dukka-gray-200 rounded-2xl" />
            <div className="h-64 bg-dukka-gray-200 rounded-2xl" />
          </div>
        )}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Dukka - Les outils que Shopify n\'a pas créés pour l\'Afrique',
  description:
    "L'infrastructure e-commerce pensée pour l'Afrique. Chatseller (conseillère IA beauté), gestion des paiements Wave, transmission automatique aux livreurs.",
  keywords: [
    'e-commerce Afrique',
    'Shopify Afrique',
    'WooCommerce Afrique',
    'Chatseller',
    'conseillère beauté IA',
    'paiement Wave',
    'paiement à la livraison',
    'e-commerce Sénégal',
    'e-commerce Côte d\'Ivoire',
  ],
  openGraph: {
    title: 'Dukka - Les outils que Shopify n\'a pas créés pour l\'Afrique',
    description: 'L\'infrastructure e-commerce pensée pour l\'Afrique.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Dukka',
  },
};

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero */}
      <NewHeroSection />

      {/* Section 2: Problems */}
      <Suspense fallback={<SectionSkeleton />}>
        <ProblemSection />
      </Suspense>

      {/* Section 3: Founder Story */}
      <Suspense fallback={<SectionSkeleton />}>
        <FounderStorySection />
      </Suspense>

      {/* Section 4: Chatseller */}
      <Suspense fallback={<SectionSkeleton />}>
        <ChatsellerSection />
      </Suspense>

      {/* Section 5: Pipeline */}
      <Suspense fallback={<SectionSkeleton />}>
        <PipelineSection />
      </Suspense>

      {/* Section 6: Why Dukka */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhyDukkaSection />
      </Suspense>

      {/* Section 7: Final CTA */}
      <Suspense fallback={<SectionSkeleton height="small" />}>
        <FinalCTASection />
      </Suspense>
    </>
  );
}