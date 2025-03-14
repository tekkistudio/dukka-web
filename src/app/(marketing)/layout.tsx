// src/app/(marketing)/layout.tsx
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Importation directe du composant de chargement
import LoadingLayout from '@/components/layout/LoadingLayout';

// Chargement dynamique avec SSR désactivé pour le layout qui utilise window
const MainLayout = dynamic(
  () => import('@/components/layout/MainLayout'),
  { 
    ssr: false,
    loading: () => <LoadingLayout />
  }
);

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