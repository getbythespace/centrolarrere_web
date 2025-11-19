// =====================================================
// LARRÈRE MVP - Database Types (Actualizado)
// Generado manualmente para incluir nuevas tablas
// =====================================================

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
      // ===== SERVICIOS =====
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          duration_min: number
          price_clp: number
          active: boolean
          requires_medical_eval: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          duration_min: number
          price_clp?: number
          active?: boolean
          requires_medical_eval?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          duration_min?: number
          price_clp?: number
          active?: boolean
          requires_medical_eval?: boolean
          created_at?: string
        }
      }
      
      // ===== PACIENTES =====
      patients: {
        Row: {
          id: string
          full_name: string
          email: string | null
          phone: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email?: string | null
          phone: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string | null
          phone?: string
          notes?: string | null
          updated_at?: string
        }
      }
      
      // ===== PLANES DE TRATAMIENTO =====
      treatment_plans: {
        Row: {
          id: string
          patient_id: string
          service_id: string
          total_sessions: number
          completed_sessions: number
          status: 'ACTIVE' | 'PAUSED' | 'COMPLETED'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          service_id: string
          total_sessions: number
          completed_sessions?: number
          status?: 'ACTIVE' | 'PAUSED' | 'COMPLETED'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          service_id?: string
          total_sessions?: number
          completed_sessions?: number
          status?: 'ACTIVE' | 'PAUSED' | 'COMPLETED'
          notes?: string | null
          updated_at?: string
        }
      }
      
      // ===== AJUSTES DE PLANES =====
      plan_adjustments: {
        Row: {
          id: string
          plan_id: string
          delta: number
          reason: string
          admin_email: string | null
          created_at: string
        }
        Insert: {
          id?: string
          plan_id: string
          delta: number
          reason: string
          admin_email?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          plan_id?: string
          delta?: number
          reason?: string
          admin_email?: string | null
        }
      }
      
      // ===== RESERVAS =====
      bookings: {
        Row: {
          id: string
          service_id: string
          patient_id: string | null
          client_name: string
          client_phone: string
          client_email: string
          start_at: string
          status: 'PENDIENTE' | 'HOLD' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA' | 'EXPIRED' | 'NO_SHOW'
          calcom_event_id: string | null
          gcal_event_id: string | null
          expires_at: string | null
          attended: boolean
          treatment_plan_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          service_id: string
          patient_id?: string | null
          client_name: string
          client_phone: string
          client_email: string
          start_at: string
          status?: 'PENDIENTE' | 'HOLD' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA' | 'EXPIRED' | 'NO_SHOW'
          calcom_event_id?: string | null
          gcal_event_id?: string | null
          expires_at?: string | null
          attended?: boolean
          treatment_plan_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          service_id?: string
          patient_id?: string | null
          client_name?: string
          client_phone?: string
          client_email?: string
          start_at?: string
          status?: 'PENDIENTE' | 'HOLD' | 'CONFIRMADA' | 'CANCELADA' | 'COMPLETADA' | 'EXPIRED' | 'NO_SHOW'
          calcom_event_id?: string | null
          gcal_event_id?: string | null
          expires_at?: string | null
          attended?: boolean
          treatment_plan_id?: string | null
          notes?: string | null
          updated_at?: string
        }
      }
      
      // ===== COMPROBANTES DE PAGO =====
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
        }
      }
      
      // ===== CONSENTIMIENTOS =====
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
        }
      }
      
      // ===== LOGS =====
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
        }
      }
    }
    
    // ===== VISTAS =====
    Views: {
      bookings_today: {
        Row: {
          id: string
          service_id: string
          patient_id: string | null
          client_name: string
          client_phone: string
          client_email: string
          start_at: string
          status: string
          service_name: string | null
          patient_name: string | null
          patient_phone: string | null
        }
      }
      active_plans_summary: {
        Row: {
          id: string
          patient_id: string
          service_id: string
          total_sessions: number
          completed_sessions: number
          status: string
          patient_name: string
          patient_phone: string
          service_name: string
          remaining_sessions: number
          progress_percent: number
        }
      }
    }
    
    Functions: {
      [_ in never]: never
    }
    
    Enums: {
      [_ in never]: never
    }
    
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// ===== TIPOS AUXILIARES =====

export type Service = Database['public']['Tables']['services']['Row']
export type ServiceInsert = Database['public']['Tables']['services']['Insert']
export type ServiceUpdate = Database['public']['Tables']['services']['Update']

export type Patient = Database['public']['Tables']['patients']['Row']
export type PatientInsert = Database['public']['Tables']['patients']['Insert']
export type PatientUpdate = Database['public']['Tables']['patients']['Update']

export type TreatmentPlan = Database['public']['Tables']['treatment_plans']['Row']
export type TreatmentPlanInsert = Database['public']['Tables']['treatment_plans']['Insert']
export type TreatmentPlanUpdate = Database['public']['Tables']['treatment_plans']['Update']

export type PlanAdjustment = Database['public']['Tables']['plan_adjustments']['Row']
export type PlanAdjustmentInsert = Database['public']['Tables']['plan_adjustments']['Insert']

export type Booking = Database['public']['Tables']['bookings']['Row']
export type BookingInsert = Database['public']['Tables']['bookings']['Insert']
export type BookingUpdate = Database['public']['Tables']['bookings']['Update']

export type BookingStatus = Booking['status']
export type PlanStatus = TreatmentPlan['status']

// ===== TIPOS COMPUESTOS =====

export interface BookingWithDetails extends Booking {
  service?: Service
  patient?: Patient | null
  treatment_plan?: TreatmentPlan | null
}

export interface PlanWithDetails extends TreatmentPlan {
  patient: Patient
  service: Service
  adjustments?: PlanAdjustment[]
  remaining_sessions?: number
  progress_percent?: number
}

export interface PatientWithDetails extends Patient {
  treatment_plans?: TreatmentPlan[]
  bookings?: Booking[]
}
