-- ClaudeQuote.com Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- Quotes table
CREATE TABLE quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  quote_text TEXT NOT NULL,
  context_snippet TEXT,
  category TEXT NOT NULL,
  model TEXT,
  submitter_id TEXT NOT NULL,
  submitter_name TEXT,
  verification_status TEXT NOT NULL DEFAULT 'unverified',
  verification_notes TEXT,
  upvote_count INTEGER DEFAULT 0,
  is_seed BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'approved',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_quotes_category ON quotes(category);
CREATE INDEX idx_quotes_is_seed ON quotes(is_seed);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_created ON quotes(created_at DESC);
CREATE INDEX idx_quotes_upvotes ON quotes(upvote_count DESC);
CREATE INDEX idx_quotes_slug ON quotes(slug);

-- Tags table
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- Quote-tag join table
CREATE TABLE quote_tags (
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (quote_id, tag_id)
);

-- Upvotes table
CREATE TABLE upvotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
  voter_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(quote_id, voter_id)
);

-- Trigger to increment upvote_count on quotes
CREATE OR REPLACE FUNCTION increment_upvote_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE quotes SET upvote_count = upvote_count + 1 WHERE id = NEW.quote_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_upvote_insert
AFTER INSERT ON upvotes
FOR EACH ROW EXECUTE FUNCTION increment_upvote_count();

-- Row Level Security
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read approved quotes" ON quotes
  FOR SELECT USING (status = 'approved');
CREATE POLICY "Service role has full access to quotes" ON quotes
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read tags" ON tags
  FOR SELECT USING (true);
CREATE POLICY "Service role has full access to tags" ON tags
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE quote_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read quote_tags" ON quote_tags
  FOR SELECT USING (true);
CREATE POLICY "Service role has full access to quote_tags" ON quote_tags
  FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE upvotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert upvotes" ON upvotes
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role has full access to upvotes" ON upvotes
  FOR ALL USING (auth.role() = 'service_role');
