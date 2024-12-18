'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/sections/footer/Footer'
import { X } from 'lucide-react'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [showAnnouncement, setShowAnnouncement] = useState(true)

  return (
    <div className="min-h-screen flex flex-col">
      {showAnnouncement && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-dukka-primary text-white h-10">
          <div className="container mx-auto h-full">
            <div className="relative flex items-center justify-center h-full px-4">
              <p className="text-base font-medium">
                Dukka, la Meilleure Alternative à Shopify en Afrique
              </p>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Fermer l'annonce"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      <Navbar showAnnouncement={showAnnouncement} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}