// apps/web/src/contexts/WaitlistContext.tsx
'use client'

import React, { createContext, useContext, useState } from 'react'
import dynamic from 'next/dynamic'

const WaitlistChat = dynamic(() => import('@/components/waitlist/WaitlistChat'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black/50 z-50" />
})

type WaitlistContextType = {
  openWaitlist: () => void
  closeWaitlist: () => void
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined)

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openWaitlist = () => setIsOpen(true)
  const closeWaitlist = () => setIsOpen(false)

  return (
    <WaitlistContext.Provider value={{ openWaitlist, closeWaitlist }}>
      {children}
      {isOpen && <WaitlistChat onClose={closeWaitlist} />}
    </WaitlistContext.Provider>
  )
}

export function useWaitlist() {
  const context = useContext(WaitlistContext)
  if (!context) {
    throw new Error('useWaitlist must be used within a WaitlistProvider')
  }
  return context
}