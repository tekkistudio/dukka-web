// src/components/sections/demo/WindowCheck.tsx
'use client'

import { useEffect, useState } from 'react'

export default function WindowCheck({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return <div className="h-[550px] bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-500">
      Chargement de l'interface...
    </div>
  }
  
  return <>{children}</>
}