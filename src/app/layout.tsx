import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientProvider } from '@/components/providers/ClientProvider'
import { WaitlistProvider } from '@/contexts/WaitlistContext'
import MainLayout from '@/components/layout/MainLayout'
import { headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

// Metadata pour le SEO
export const metadata: Metadata = {
  title: {
    default: 'Dukka - La Meilleure Alternative à Shopify en Afrique',
    template: '%s | Dukka'
  },
  description: 'Dukka réinvente l\'e-commerce pour l\'adapter à la réalité africaine, en permettant aux commerçants et marques de créer des boutiques en ligne où la conversation est au cœur de l\'expérience d\'achat.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/images/logo/fav.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://getdukka.com',
    siteName: 'Dukka',
    title: 'Dukka - La Meilleure Alternative à Shopify en Afrique',
    description: 'Dukka réinvente l\'e-commerce pour l\'adapter à la réalité africaine.',
    images: [
      {
        url: '/images/og-image.jpg', // Assurez-vous d'avoir cette image
        width: 1200,
        height: 630,
        alt: 'Dukka Preview'
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const pathname = headersList.get("x-pathname") || "/"
  const isAdmin = pathname.startsWith('/admin')

  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <WaitlistProvider>
          <ClientProvider>
            {isAdmin ? (
              // Layout admin simple
              <div className="min-h-screen bg-gray-50">
                {children}
              </div>
            ) : (
              // Layout public avec navigation et footer
              <MainLayout>
                {children}
              </MainLayout>
            )}
          </ClientProvider>
        </WaitlistProvider>
      </body>
    </html>
  )
}