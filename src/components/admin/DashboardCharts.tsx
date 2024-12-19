'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Users, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const DashboardCharts = dynamic(
  () => import('@/components/admin/DashboardCharts'),
  { ssr: false }
)

export default function DashboardStats() {
  const [stats, setStats] = useState({
    waitlistCount: 0,
    messagesCount: 0,
    loading: true,
    error: null
  })

  useEffect(() => {
    async function fetchStats() {
      try {
        const { count: waitlistCount, error: waitlistError } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true })

        if (waitlistError) throw waitlistError

        const { count: messagesCount, error: messagesError } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true })

        if (messagesError) throw messagesError

        setStats({
          waitlistCount: waitlistCount || 0,
          messagesCount: messagesCount || 0,
          loading: false,
          error: null
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Erreur lors du chargement des statistiques'
        }))
      }
    }

    fetchStats()
  }, [])

  if (stats.loading) {
    return <div className="text-center py-4">Chargement des statistiques...</div>
  }

  if (stats.error) {
    return <div className="text-red-500 text-center py-4">{stats.error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/waitlist" className="block">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">Liste d'attente</h3>
              <Users className="h-4 w-4 text-gray-500" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{stats.waitlistCount}</div>
              <p className="text-xs text-gray-500">inscrits au total</p>
            </div>
          </div>
        </Link>

        <Link href="/messages" className="block">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900">Messages reçus</h3>
              <MessageCircle className="h-4 w-4 text-gray-500" />
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{stats.messagesCount}</div>
              <p className="text-xs text-gray-500">messages au total</p>
            </div>
          </div>
        </Link>
      </div>

      <DashboardCharts />
    </div>
  )
}