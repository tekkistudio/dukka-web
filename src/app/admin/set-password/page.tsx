'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function SetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Récupérer le token depuis l'URL côté client uniquement
  const getToken = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      return params.get('token')
    }
    return null
  }

  const handleSetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const token = getToken()
    
    if (!token) {
      setError('Token manquant. Veuillez utiliser le lien envoyé par email.')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      setLoading(false)
      return
    }

    try {
      // Utiliser le token pour définir le mot de passe
      const { error: supabaseError } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: 'invite',
        password: password,
      })

      if (supabaseError) throw supabaseError

      // Rediriger vers la page de connexion après succès
      router.push('/admin/login?success=true')
    } catch (error) {
      console.error('Error setting password:', error)
      setError('Erreur lors de la définition du mot de passe. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Définir votre mot de passe
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Choisissez un mot de passe sécurisé pour votre compte admin
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSetPassword}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Nouveau mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-dukka-primary focus:border-dukka-primary sm:text-sm mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-dukka-primary focus:border-dukka-primary sm:text-sm mt-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !password || !confirmPassword}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-dukka-primary hover:bg-dukka-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dukka-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'En cours...' : 'Définir le mot de passe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}