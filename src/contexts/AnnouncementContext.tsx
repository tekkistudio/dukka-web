'use client'

import React, { createContext, useContext, useState } from 'react'

type AnnouncementContextType = {
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined)

export function useAnnouncement() {
  const context = useContext(AnnouncementContext)
  if (!context) {
    throw new Error('useAnnouncement must be used within an AnnouncementProvider')
  }
  return context
}

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true)
  
  const value = {
    isVisible,
    setIsVisible
  }

  return (
    <AnnouncementContext.Provider value={value}>
      {children}
    </AnnouncementContext.Provider>
  )
}