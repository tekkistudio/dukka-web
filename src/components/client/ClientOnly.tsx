// src/components/client/ClientOnly.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Wrapper pour les composants qui doivent être rendus uniquement côté client
 * 
 * Utilisation:
 * <ClientOnly>
 *   <ComponentQuiUtiliseWindowOuDocument />
 * </ClientOnly>
 */
export default function ClientOnly({ 
  children, 
  fallback = <div className="min-h-[100px] bg-gray-100 animate-pulse rounded-lg"></div>
}: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
}