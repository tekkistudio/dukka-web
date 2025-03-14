// src/components/admin/Settings.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { User } from 'lucide-react'

// Définir le type pour le profil utilisateur
interface UserProfile {
  id?: string;
  email?: string;
  role?: string;
  // Ajouter d'autres propriétés du profil si nécessaire
}

export default function Settings() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (currentUser) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', currentUser.id)
            .single()
          
          setUser({ ...currentUser, ...profile })
        }
      } catch (error) {
        console.error('Error loading user profile:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900">Paramètres du compte</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-full">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <div className="font-medium">{user?.email}</div>
              <div className="text-sm text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}