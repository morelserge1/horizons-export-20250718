import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nthvvfqcfaqyeqkfdqfo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50aHZ2ZnFjZmFxeWVxa2ZkcWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3ODAwODAsImV4cCI6MjA2ODM1NjA4MH0.-DaMt9EBIS2XRv6XSJe7jg-ZtSYE4Y9qGZvjrDljKb8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);