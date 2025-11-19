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
      services: {
        Row: {
          id: string
          name: string
          duration_min: number
          price_clp: number
          active: boolean
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          duration_min: number
          price_clp: number
          active?: boolean
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          duration_min?: number
          price_clp?: number
          active?: boolean
          description?: string | null
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          service_id: string
          client_name: string
          client_phone: string
          client_email: string
          start_at: string
          status: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA'
          calcom_event_id: string | null
          gcal_event_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          service_id: string
          client_name: string
          client_phone: string
          client_email: string
          start_at: string
          status?: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA'
          calcom_event_id?: string | null
          gcal_event_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          service_id?: string
          client_name?: string
          client_phone?: string
          client_email?: string
          start_at?: string
          status?: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA'
          calcom_event_id?: string | null
          gcal_event_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payment_proofs: {
        Row: {
          id: string
          booking_id: string
          file_url: string
          amount_clp: number
          received_at: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          file_url: string
          amount_clp: number
          received_at?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          file_url?: string
          amount_clp?: number
          received_at?: string
          notes?: string | null
          created_at?: string
        }
      }
      consents: {
        Row: {
          id: string
          booking_id: string
          file_url: string
          signed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          file_url: string
          signed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          file_url?: string
          signed_at?: string
          created_at?: string
        }
      }
      logs: {
        Row: {
          id: string
          type: string
          payload_json: Json
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          payload_json: Json
          created_at?: string
        }
        Update: {
          id?: string
          type?: string
          payload_json?: Json
          created_at?: string
        }
      }
    }
  }
}
