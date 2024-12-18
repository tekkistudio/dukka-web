// src/app/admin/messages/page.tsx
'use client'

import dynamic from 'next/dynamic'
import AuthGuard from '@/components/AuthGuard'
import AdminNavbar from '@/components/admin/AdminNavbar'

const ContactMessages = dynamic(
  () => import('@/components/admin/ContactMessages'),
  { ssr: false }
)

export default function MessagesPage() {
  return (
    <AuthGuard>
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        <ContactMessages />
      </div>
    </AuthGuard>
  )
}