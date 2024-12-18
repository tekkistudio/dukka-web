// src/app/dashboard/layout.tsx
'use client'

import DashboardNavbar from '@/components/dashboard/DashboardNavbar'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/dashboard/login'

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {!isLoginPage && <DashboardNavbar />}
      <main className={`flex-1 transition-all duration-200 ${!isLoginPage ? 'md:ml-64' : ''}`}>
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}