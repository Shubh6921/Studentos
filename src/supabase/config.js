import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  return url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
};

if (!isValidUrl(supabaseUrl) || !supabaseAnonKey || supabaseAnonKey === 'undefined') {
  console.warn("Supabase credentials missing or invalid in site settings. Falling back to default project URL.");
}

// Fallback to default project URL and placeholder key if env variables are empty/string "undefined"
const safeUrl = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://eemirlomctypptttslgn.supabase.co';
const safeKey = (supabaseAnonKey && supabaseAnonKey !== 'undefined' && supabaseAnonKey !== 'null') ? supabaseAnonKey : 'placeholder-key-missing';

export const supabase = createClient(safeUrl, safeKey);
