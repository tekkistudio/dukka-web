'use client'

import AdminNavbar from '../../components/admin/AdminNavbar'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  // Simple check without hooks
  const isLoginPage = pathname === '/admin/login'

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <AdminNavbar />}
      <div className={`${!isLoginPage ? 'py-6' : ''}`}>
        {children}
      </div>
    </div>
  )
}