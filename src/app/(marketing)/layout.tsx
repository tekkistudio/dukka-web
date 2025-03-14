// src/app/(marketing)/layout.tsx
import dynamic from 'next/dynamic'

// Chargement dynamique du layout principal pour éviter les problèmes de window
const MainLayout = dynamic(
  () => import('@/components/layout/MainLayout'),
  { ssr: false }
)

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}