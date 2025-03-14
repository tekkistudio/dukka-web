'use client';

import React, { useEffect, useState } from 'react';

export default function NoSSR({ 
  children,
  fallback = <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  }}>
    <div style={{ 
      width: '50px', 
      height: '50px', 
      border: '5px solid #f3f3f3', 
      borderTop: '5px solid #3498db', 
      borderRadius: '50%', 
      animation: 'spin 1s linear infinite' 
    }}></div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted ? children : fallback;
}