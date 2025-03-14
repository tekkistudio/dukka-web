// src/app/(marketing)/layout.tsx
'use client';
// src/app/(marketing)/layout.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Chargement dynamique du layout principal
const MainLayout = dynamic(
  () => import('@/components/layout/MainLayout'),
  { loading: () => <LoadingLayout /> }
);

// Composant de chargement simple pour le layout
function LoadingLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header placeholder */}
      <div className="h-16 bg-gray-50 animate-pulse"></div>
      
      {/* Contenu principal */}
      <main>
        {children || (
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-dukka-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </main>
      
      {/* Footer placeholder */}
      <div className="h-16 bg-gray-50 animate-pulse"></div>
    </div>
  );
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<LoadingLayout />}>
      <MainLayout>{children}</MainLayout>
    </Suspense>
  );
}