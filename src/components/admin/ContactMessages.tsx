'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { ChevronDown, ChevronUp, Filter } from 'lucide-react'

// Définir un type pour le statut avec des valeurs spécifiques
type MessageStatus = 'new' | 'in_progress' | 'done';

interface Message {
  id: string
  created_at: string
  full_name: string
  email: string
  visitor_type: string
  subject: string
  message: string
  status: MessageStatus // Type spécifique au lieu de string
  phone?: string
  attachments?: string[] | null
}

export default function ContactMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    fetchMessages()
  }, [sortOrder])

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: sortOrder === 'asc' })

      if (error) throw error

      // Vérifier si chaque message a un statut valide, sinon utiliser 'new' par défaut
      const validatedMessages = (data || []).map(msg => ({
        ...msg,
        // Assurez-vous que status est l'une des valeurs autorisées
        status: (msg.status === 'new' || msg.status === 'in_progress' || msg.status === 'done') 
          ? msg.status as MessageStatus 
          : 'new'
      })) as Message[];

      setMessages(validatedMessages)
      setError(null)
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error)
      setError('Impossible de charger les messages')
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (messageId: string, newStatus: MessageStatus) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: newStatus })
        .eq('id', messageId)

      if (error) throw error

      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      ))
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
    }
  }

  const getStatusColor = (status: MessageStatus) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'done':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: MessageStatus) => {
    switch (status) {
      case 'new':
        return 'Nouveau'
      case 'in_progress':
        return 'En cours'
      case 'done':
        return 'Traité'
      default:
        return status
    }
  }

  const filteredMessages = messages.filter(message => 
    statusFilter === 'all' ? true : message.status === statusFilter
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Chargement des messages...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Messages de contact</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border-gray-300 rounded-md text-sm focus:ring-dukka-primary focus:border-dukka-primary"
            >
              <option value="all">Tous les statuts</option>
              <option value="new">Nouveaux</option>
              <option value="in_progress">En cours</option>
              <option value="done">Traités</option>
            </select>
          </div>
          <button
            onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            {sortOrder === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Date
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <div 
            key={message.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="bg-gray-50 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{message.full_name}</h3>
                  <p className="text-sm text-gray-500">{message.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">
                    {format(new Date(message.created_at), 'PPp', { locale: fr })}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(message.status)}`}>
                    {getStatusLabel(message.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white">
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-500">Profil:</span>
                <span className="ml-2 text-sm text-gray-900">{message.visitor_type}</span>
              </div>
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-500">Sujet:</span>
                <span className="ml-2 text-sm text-gray-900">{message.subject}</span>
              </div>
              <div className="relative">
                <div 
                  className={`text-sm text-gray-700 whitespace-pre-wrap ${
                    expandedMessage === message.id ? '' : 'max-h-24 overflow-hidden'
                  }`}
                >
                  {message.message}
                </div>
                {message.message.length > 200 && expandedMessage !== message.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
                )}
              </div>
              {message.message.length > 200 && (
                <button
                  onClick={() => setExpandedMessage(
                    expandedMessage === message.id ? null : message.id
                  )}
                  className="mt-2 text-sm text-dukka-primary hover:text-dukka-dark"
                >
                  {expandedMessage === message.id ? 'Voir moins' : 'Voir plus'}
                </button>
              )}
            </div>

            <div className="bg-gray-50 p-4 border-t">
              <div className="flex items-center justify-end gap-3">
                <span className="text-sm text-gray-500">Statut:</span>
                <select
                  value={message.status}
                  onChange={(e) => updateMessageStatus(message.id, e.target.value as MessageStatus)}
                  className="text-sm border-gray-300 rounded-md focus:ring-dukka-primary focus:border-dukka-primary"
                >
                  <option value="new">Nouveau</option>
                  <option value="in_progress">En cours</option>
                  <option value="done">Traité</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMessages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Aucun message {statusFilter !== 'all' ? `avec le statut "${getStatusLabel(statusFilter as MessageStatus)}"` : ''}
        </div>
      )}
    </div>
  )
}