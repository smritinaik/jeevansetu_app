import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pmkyciieymxjndksmbmr.supabase.co';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBta3ljaWlleW14am5ka3NtYm1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNTU5MDIsImV4cCI6MjEwNTczMTkwMn0.JCDY-5IbQzvMMuxxzVLDSX771A205gY7LMBdSgQoTcs';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);