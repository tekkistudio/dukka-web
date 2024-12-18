'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Download } from 'lucide-react'

const businessTypeLabels = {
  'retail_store': 'Commerce de détail',
  'food_restaurant': 'Restaurant',
  'food_cafe': 'Café',
  'brand_fashion': 'Marque de mode',
  'beauty_cosmetics': 'Cosmétiques/Beauté'
  // Ajoutez d'autres mappings selon vos besoins
}

export default function WaitlistStats() {
  const [data, setData] = useState({
    count: 0,
    entries: [],
    error: null,
    loading: true
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: entries, error } = await supabase
          .from('waitlist')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setData({
          count: entries?.length || 0,
          entries: entries || [],
          error: null,
          loading: false
        })
      } catch (error) {
        console.error('Error:', error)
        setData({
          count: 0,
          entries: [],
          error: error.message,
          loading: false
        })
      }
    }

    fetchData()
  }, [])

  const exportToCSV = () => {
    // Préparer les données pour l'export
    const csvData = data.entries.map(entry => ({
      'Nom': entry.full_name,
      'Email': entry.email,
      'Téléphone': entry.phone,
      'Type de commerce': businessTypeLabels[entry.business_type] || entry.business_type,
      'Date d\'inscription': new Date(entry.created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }))

    // Créer l'en-tête CSV
    const headers = Object.keys(csvData[0])
    const csvContent = [
      headers.join(','), // En-tête
      ...csvData.map(row => headers.map(header => `"${row[header]}"`).join(',')) // Données
    ].join('\n')

    // Créer et télécharger le fichier
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `waitlist_export_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Statistiques de la liste d'attente</h2>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center px-4 py-2 bg-dukka-primary text-white rounded-md hover:bg-dukka-dark transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Exporter en CSV
        </button>
      </div>
      
      {data.error && (
        <div className="bg-red-50 text-red-600 p-4 mb-6 rounded-lg">
          Erreur: {data.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2">Total des inscriptions</h3>
          <p className="text-4xl font-bold text-blue-600">{data.count}</p>
        </div>
      </div>

      <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Téléphone
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type de commerce
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'inscription
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {entry.full_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {businessTypeLabels[entry.business_type] || entry.business_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(entry.created_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}