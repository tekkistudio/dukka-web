export interface Message {
  type: 'assistant' | 'user' | 'user-choices'
  content: string | string[] | ((params: { name: string }) => string)
}

export interface UserData {
  full_name: string
  email: string
  phone: string
  business_type: string
  created_at: string
}

export interface WaitlistQuestion {
  id: 'full_name' | 'email' | 'phone' | 'business_type'
  question: string | ((params: { name: string }) => string)
  type?: 'text' | 'email' | 'tel'
  choices?: string[]
}

export interface WaitlistChatData {
  initial: Message[]
  moreInfo: Message[]
  exitAttempt: {
    persuasion: Message[]
  }
  questions: WaitlistQuestion[]
  success: {
    message: (params: { name: string }) => string
    action: string
  }
}

export interface WaitlistChatProps {
  onClose: () => void
}