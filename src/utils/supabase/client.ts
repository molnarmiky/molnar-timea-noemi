import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sxyjmnmmtdoahzxfwiyh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4eWptbm1tdGRvYWh6eGZ3aXloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4OTg3MTEsImV4cCI6MjA4NDQ3NDcxMX0.soHn_P9CmRHUmk_NvcMcZ2LtSlJV9MPz8MrviXZwxeQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage
  }
});