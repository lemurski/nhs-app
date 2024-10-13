import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://wrcnjpxsgpjyktgkuday.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyY25qcHhzZ3BqeWt0Z2t1ZGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3MzU4NTMsImV4cCI6MjA0NDMxMTg1M30.8qSvyVvUa16KY9jwHdJMvidaBXiPy4VsYDpPoasDvqY"
);
