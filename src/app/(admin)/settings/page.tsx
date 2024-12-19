'use client'

import dynamic from 'next/dynamic'
import AuthGuard from '@/components/AuthGuard'

const Settings = dynamic(
  () => import('@/components/admin/Settings'),
  { ssr: false }
)

export default function SettingsPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <Settings />
      </div>
    </AuthGuard>
  )
}