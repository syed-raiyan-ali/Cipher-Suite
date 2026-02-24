import { createClient } from '@supabase/supabase-js';

// Directly paste your Project URL and anon public key from Supabase dashboard here:
const supabaseUrl = 'https://uprqbtquzmlebbfxqqiy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwcnFidHF1em1sZWJiZnhxcWl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MDEyOTYsImV4cCI6MjA3NDE3NzI5Nn0.0fqd3nMEvH9E1lw0Cxx4zvX0fMcKOv2dBmLPUEi3lx0'; // <-- Your copied anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
