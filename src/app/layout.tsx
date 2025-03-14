// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientProvider } from '@/components/providers/ClientProvider'
import { WaitlistProvider } from '@/contexts/WaitlistContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://getdukka.com'), // Assure une bonne résolution des URLs
  title: {
    default: 'Dukka - La Meilleure Alternative à Shopify et Woocommerce en Afrique',
    template: '%s | Dukka'
  },
  description: 'Dukka réinvente l\'e-commerce pour l\'adapter à la réalité africaine, en permettant aux commerçants et marques de créer des boutiques en ligne où la conversation est au cœur de l\'expérience d\'achat.',
  icons: {
    icon: '/favicon.ico', // Assure-toi que le favicon est bien dans `public/`
    shortcut: '/images/logo/fav.png', // Alternative
    apple: '/images/logo/fav.png', // Pour iOS
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://getdukka.com',
    siteName: 'Dukka',
    title: 'Dukka - La Meilleure Alternative à Shopify et Woocommerce en Afrique',
    description: 'Dukka réinvente l\'e-commerce pour l\'adapter aux habitudes d\'achat des consommateurs en Afrique.',
    images: [
      {
        url: 'https://getdukka.com/images/og-image.png', // URL absolue requise pour Open Graph
        width: 1200,
        height: 630,
        alt: 'Dukka Preview'
      }
    ]
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
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