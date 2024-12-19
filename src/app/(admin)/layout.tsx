// src/app/(admin)/layout.tsx
'use client'

import AdminNavbar from '@/components/admin/AdminNavbar'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <AdminNavbar />}
      <main className={`mx-auto max-w-7xl ${!isLoginPage ? 'px-4 sm:px-6 lg:px-8 py-6' : ''}`}>
        {children}
      </main>
    </div>
  )
}