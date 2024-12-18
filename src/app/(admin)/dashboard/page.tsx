// src/app/(admin)/dashboard/page.tsx
'use client'

import dynamic from 'next/dynamic'
import AuthGuard from '@/components/AuthGuard'

const WaitlistStats = dynamic(
  () => import('@/components/waitlist/WaitlistStats'),
  { ssr: false }
)

const ContactMessages = dynamic(
  () => import('@/components/admin/ContactMessages'),
  { ssr: false }
)

export default function AdminDashboardPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <WaitlistStats />
        <ContactMessages />
      </div>
    </AuthGuard>
  )
}