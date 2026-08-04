import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Netlify site settings.");
}

// Fallback to placeholder strings to prevent createClient from throwing an unhandled exception and crashing Vite/React on load
const safeUrl = supabaseUrl || 'https://eemirlomctypptttslgn.supabase.co';
const safeKey = supabaseAnonKey || 'placeholder-key-missing';

export const supabase = createClient(safeUrl, safeKey);
