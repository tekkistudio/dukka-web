// src/components/admin/DashboardCharts.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Définir un type pour l'état des statistiques
interface StatsState {
  waitlistCount: number;
  messagesCount: number;
  loading: boolean;
  error: string | null; // Permettre à error d'être une chaîne ou null
}

export default function DashboardCharts() {
  // Initialiser l'état avec le type correct
  const [stats, setStats] = useState<StatsState>({
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
    return <div className="mt-12 bg-white rounded-lg shadow-lg p-6 text-center">Chargement des graphiques...</div>
  }

  if (stats.error) {
    return <div className="mt-12 bg-white rounded-lg shadow-lg p-6 text-center text-red-500">{stats.error}</div>
  }

  const data = [
    {
      name: 'Liste d\'attente',
      value: stats.waitlistCount
    },
    {
      name: 'Messages',
      value: stats.messagesCount
    }
  ]

  return (
    <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Aperçu des données</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3490dc" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}