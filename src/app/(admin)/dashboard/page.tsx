'use client'

import dynamic from 'next/dynamic'
import AuthGuard from '@/components/AuthGuard'

const DashboardStats = dynamic(
  () => import('@/components/admin/DashboardStats'),
  { ssr: false }
)

export default function AdminDashboardPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dukka Admin</h1>
          <p className="text-gray-500">Vue d'ensemble des données</p>
        </div>
        <DashboardStats />
      </div>
    </AuthGuard>
  )
}