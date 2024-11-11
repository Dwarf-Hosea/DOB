// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jjsjiboooefiebnwdpss.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqc2ppYm9vb2VmaWVibndkcHNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExMjY4OTcsImV4cCI6MjA0NjcwMjg5N30.BE4dNhY_KPqQQ6rXy34Ve-YaKdlsBejCZhi4zJJRNHM'; // Use your API key
export const supabase = createClient(supabaseUrl, supabaseKey);
