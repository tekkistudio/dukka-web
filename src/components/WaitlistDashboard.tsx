// src/components/WaitlistDashboard.tsx
'use client'

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { supabase } from '@/lib/supabaseClient'

const businessTypeLabels = {
  retail_store: 'Commerce de détail',
  food_restaurant: 'Restaurant',
  food_cafe: 'Café',
  food_fastfood: 'Fast-food',
  fashion_clothing: 'Boutique de vêtements',
  fashion_accessories: 'Accessoires de mode',
  beauty_cosmetics: 'Cosmétiques/Beauté',
  beauty_salon: 'Salon de beauté',
  electronics: 'Électronique/Téléphonie',
  supermarket: 'Supermarché/Épicerie',
  brand_fashion: 'Marque de mode',
  brand_cosmetics: 'Marque de cosmétiques',
  brand_food: 'Marque alimentaire',
  brand_beverages: 'Marque de boissons',
  manufacturer_textiles: 'Fabricant textile',
  manufacturer_crafts: 'Artisanat',
  manufacturer_food: 'Production alimentaire',
  service_delivery: 'Service de livraison',
  service_catering: 'Service de traiteur',
  service_events: 'Organisation d\'événements',
  ecommerce_fashion: 'E-commerce mode',
  ecommerce_food: 'E-commerce alimentaire',
  ecommerce_beauty: 'E-commerce beauté',
  ecommerce_electronics: 'E-commerce électronique',
  ecommerce_general: 'E-commerce généraliste',
  marketplace: 'Place de marché',
  other: 'Autre type de commerce'
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8',
  '#82CA9D', '#FDB462', '#B3DE69', '#FCCDE5', '#BC80BD'
]

export default function WaitlistDashboard() {
  const [stats, setStats] = React.useState({
    total: 0,
    byType: [],
    loading: true,
    error: null
  })

  React.useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      console.log('Début fetchStats')
      
      const { data, error, count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact' })

      console.log('Données reçues:', { data, error, count })

      if (error) throw error

      // Calculer les statistiques par type
      const typeCount = {}
      data.forEach(entry => {
        typeCount[entry.business_type] = (typeCount[entry.business_type] || 0) + 1
      })

      const typeStats = Object.entries(typeCount).map(([type, count]) => ({
        type,
        label: businessTypeLabels[type] || type,
        count,
        percentage: ((count / data.length) * 100).toFixed(1)
      }))

      console.log('Stats calculées:', typeStats)

      // Trier par nombre décroissant
      typeStats.sort((a, b) => b.count - a.count)

      setStats({
        total: count || 0,
        byType: typeStats,
        loading: false,
        error: null
      })
    } catch (error) {
      console.error('Erreur détaillée:', error)
      setStats(prev => ({
        ...prev,
        loading: false,
        error: "Erreur lors du chargement des statistiques"
      }))
    }
  }

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Chargement des statistiques...</div>
      </div>
    )
  }

  if (stats.error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">{stats.error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Statistiques de la liste d'attente
      </h2>
      
      {/* Statistiques générales */}
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total des inscriptions
          </h3>
          <p className="text-4xl font-bold text-dukka-primary">
            {stats.total}
          </p>
        </div>
      </div>

      {/* Graphique */}
      {stats.byType.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Répartition par type de commerce
          </h3>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={stats.byType}
                  nameKey="label"
                  dataKey="count"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {stats.byType.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-white p-2 shadow rounded border">
                          <p className="font-semibold">{data.label}</p>
                          <p className="text-sm">
                            {data.count} inscriptions ({data.percentage}%)
                          </p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tableau détaillé */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Détails par type de commerce
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Type de commerce</th>
                <th className="px-6 py-3 text-right">Nombre</th>
                <th className="px-6 py-3 text-right">Pourcentage</th>
              </tr>
            </thead>
            <tbody>
              {stats.byType.map((stat, index) => (
                <tr
                  key={stat.type}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {stat.label}
                  </td>
                  <td className="px-6 py-4 text-right">{stat.count}</td>
                  <td className="px-6 py-4 text-right">{stat.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}