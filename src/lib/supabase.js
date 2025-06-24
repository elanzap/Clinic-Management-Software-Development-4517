import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fzdarwgulpsauhlalxlf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6ZGFyd2d1bHBzYXVobGFseGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3Mzk3NjEsImV4cCI6MjA2NjMxNTc2MX0.nxalIvLBMojD-aIDEkbv7JB8Bdxu2HMIiWrS7wtiFbw'

if(SUPABASE_URL === 'https://<PROJECT-ID>.supabase.co' || SUPABASE_ANON_KEY === '<ANON_KEY>') {
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})