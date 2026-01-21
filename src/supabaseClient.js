import { createClient } from '@supabase/supabase-js';

// TODO: Replace these with your actual Supabase credentials
// You can find these in your Supabase project settings:
// 1. Go to https://app.supabase.com/project/_/settings/api
// 2. Copy your Project URL and anon/public key

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
