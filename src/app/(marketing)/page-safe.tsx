// src/app/(marketing)/page-safe.tsx
import NoSSR from '@/components/NoSSR';

export default function HomePage() {
  return (
    <NoSSR>
      <div className="relative min-h-screen bg-white text-gray-900">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Dukka - La Meilleure Alternative à Shopify et Woocommerce en Afrique
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Venez découvrir comment Dukka réinvente l&apos;e-commerce pour l&apos;adapter aux habitudes d&apos;achat des consommateurs africains.
            </p>
            <a 
              href="/waitlist" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Rejoindre la liste d&apos;attente
            </a>
          </div>
        </div>
      </div>
    </NoSSR>
  );
}