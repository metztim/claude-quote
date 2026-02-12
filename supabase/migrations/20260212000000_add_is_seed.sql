ALTER TABLE quotes ADD COLUMN is_seed BOOLEAN DEFAULT false;
CREATE INDEX idx_quotes_is_seed ON quotes(is_seed);
UPDATE quotes SET is_seed = true WHERE submitter_id = 'seed-user-001';
