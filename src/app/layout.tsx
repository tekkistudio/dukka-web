// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientProvider } from '@/components/providers/ClientProvider'
import { WaitlistProvider } from '@/contexts/WaitlistContext'
import { AnnouncementProvider } from '@/contexts/AnnouncementContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://getdukka.com'),
  title: {
    default: 'Dukka - Des Solutions tech pour l\'e-commerce en Afrique',
    template: '%s | Dukka'
  },
  description: 'Nous développons les outils que Shopify n\'a pas créés pour l\'Afrique. Chatseller, gestion des paiements Wave, transmission aux livreurs - des solutions qui s\'intègrent à votre boutique existante.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/images/logo/fav.png',
    apple: '/images/logo/fav.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://getdukka.com',
    siteName: 'Dukka',
    title: 'Dukka - Des Solutions tech pour l\'e-commerce en Afrique',
    description: 'Nous développons les outils que Shopify n\'a pas créés pour l\'Afrique. Des solutions qui s\'intègrent à votre Shopify ou WooCommerce.',
    images: [
      {
        url: 'https://getdukka.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dukka - Infrastructure e-commerce pour l\'Afrique'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dukka - Des Solutions tech pour l\'e-commerce en Afrique',
    description: 'Nous développons les outils que Shopify n\'a pas créés pour l\'Afrique.',
    images: ['https://getdukka.com/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <AnnouncementProvider>
          <WaitlistProvider>
            <ClientProvider>
              {children}
            </ClientProvider>
          </WaitlistProvider>
        </AnnouncementProvider>
      </body>
    </html>
  )
}