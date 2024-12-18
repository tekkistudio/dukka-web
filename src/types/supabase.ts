export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string
          created_at: string
          full_name: string
          email: string
          phone: string
          business_type: string
        }
        Insert: {
          id?: string
          created_at?: string
          full_name: string
          email: string
          phone: string
          business_type: string
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string
          email?: string
          phone?: string
          business_type?: string
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          role: string
        }
        Insert: {
          id: string
          created_at?: string
          role?: string
        }
        Update: {
          id?: string
          created_at?: string
          role?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}