'use client'

import { X } from 'lucide-react'
import { useAnnouncement } from '@/contexts/AnnouncementContext'

export default function AnnouncementBar() {
  const { isVisible, setIsVisible } = useAnnouncement()

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-dukka-primary text-white h-15">
      <div className="container mx-auto h-full">
        <div className="relative flex items-center justify-center h-full px-4">
          <p className="text-base font-medium">
            Dukka, la Meilleure Alternative à Shopify en Afrique
          </p>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Fermer l'annonce"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}