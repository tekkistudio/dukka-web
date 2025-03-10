// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientProvider } from '@/components/providers/ClientProvider'
import { WaitlistProvider } from '@/contexts/WaitlistContext'

const inter = Inter({ subsets: ['latin'] })

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
        url: '/images/og-image.png', 
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
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        <WaitlistProvider>
          <ClientProvider>
            {children}
          </ClientProvider>
        </WaitlistProvider>
      </body>
    </html>
  )
}