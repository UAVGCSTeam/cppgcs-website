-- Research Form Submissions Table
-- Run this SQL in your Supabase SQL Editor to create the table

CREATE TABLE IF NOT EXISTS research_form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  academic_year TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE research_form_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (submit forms)
-- But only authenticated users can read the data
CREATE POLICY "Anyone can submit forms"
  ON research_form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: Create a policy to allow authenticated users to read submissions
-- Uncomment if you want to view submissions in your application
-- CREATE POLICY "Authenticated users can read submissions"
--   ON research_form_submissions
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- Create an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_research_form_created_at 
  ON research_form_submissions(created_at DESC);
