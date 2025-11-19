import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types.mvp'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey
)
