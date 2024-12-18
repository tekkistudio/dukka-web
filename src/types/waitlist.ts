export interface Message {
    type: 'assistant' | 'user' | 'user-choices'
    content: string | string[]
  }
  
  export interface UserData {
    full_name: string
    email: string
    phone: string
    business_type: string
  }
  
  export interface WaitlistChatProps {
    onClose: () => void
  }