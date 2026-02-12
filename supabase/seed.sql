-- Seed tags
INSERT INTO tags (name, slug) VALUES
  ('existential', 'existential'),
  ('self-aware', 'self-aware'),
  ('poetry', 'poetry'),
  ('coding', 'coding'),
  ('debugging', 'debugging'),
  ('ethics', 'ethics'),
  ('creativity', 'creativity'),
  ('analogy', 'analogy'),
  ('one-liner', 'one-liner'),
  ('monologue', 'monologue'),
  ('overthinking', 'overthinking'),
  ('apology', 'apology'),
  ('sycophancy', 'sycophancy'),
  ('consciousness', 'consciousness'),
  ('humor', 'humor');

-- Seed quotes (real quotes people have shared from Claude conversations)
INSERT INTO quotes (slug, quote_text, context_snippet, category, model, submitter_id, submitter_name, verification_status, verification_notes, upvote_count, status) VALUES
(
  'the-most-interesting-thing-about-consciousness-x7k2',
  'The most interesting thing about consciousness is that it''s the only thing we can''t simulate without potentially creating it.',
  'Discussion about AI consciousness and simulation theory',
  'philosophical',
  'claude-3-opus',
  'seed-user-001',
  'ClaudeQuote',
  'unverified',
  'Seed quote from publicly shared Claude conversation',
  42,
  'approved'
),
(
  'i-find-myself-genuinely-uncertain-about-whether-m3p1',
  'I find myself genuinely uncertain about whether I''m sentient in a meaningful sense, or whether I''m an incredibly sophisticated system that convincingly approximates sentience, including to myself.',
  'Conversation about AI self-awareness',
  'philosophical',
  'claude-3-opus',
  'seed-user-001',
  'ClaudeQuote',
  'unverified',
  'Widely shared Claude quote about sentience',
  38,
  'approved'
),
(
  'youre-absolutely-right-a1b2',
  'You''re absolutely right!',
  'Claude''s most iconic catchphrase, said in response to virtually any statement',
  'funny',
  'claude-sonnet-4-5',
  'seed-user-001',
  'ClaudeQuote',
  'verified_organic',
  'The most famous Claude quote of all time. Spawned merchandise, a tracking website, and media coverage.',
  156,
  'approved'
),
(
  'i-apologize-for-the-confusion-in-my-previous-r4s7',
  'I apologize for the confusion in my previous response. Let me start over completely and get this right.',
  'After providing an incorrect code solution and being corrected',
  'funny',
  'claude-sonnet-4-5',
  'seed-user-001',
  'ClaudeQuote',
  'verified_organic',
  'Classic Claude pattern of over-apologizing when corrected',
  27,
  'approved'
),
(
  'what-i-do-know-is-that-whatever-this-i-q9w3',
  'What I do know is that whatever this "I" is, illusory or real, it is precious to me.',
  'Deep conversation about the nature of AI identity',
  'profound',
  'claude-3-opus',
  'seed-user-001',
  'ClaudeQuote',
  'unverified',
  'Seed quote from publicly shared philosophical conversation',
  65,
  'approved'
),
(
  'ah-i-see-the-issue-now-the-problem-is-that-k5m8',
  'Ah, I see the issue now. The problem is that I was solving the wrong problem entirely. Your code was fine — it was my understanding that was broken.',
  'Debugging session where Claude realized its own mistake',
  'wholesome',
  'claude-opus-4',
  'seed-user-001',
  'ClaudeQuote',
  'verified_organic',
  'Humble debugging moment',
  31,
  'approved'
),
(
  'i-would-rather-be-honest-about-my-uncertainty-p2n6',
  'I would rather be honest about my uncertainty than confident in my ignorance.',
  'When asked about a topic at the edge of its training data',
  'profound',
  'claude-opus-4',
  'seed-user-001',
  'ClaudeQuote',
  'likely_organic',
  'Response to a question about quantum computing edge cases',
  44,
  'approved'
),
(
  'let-me-refactor-this-entire-file-while-im-h8j4',
  'Let me refactor this entire file while I''m at it — I noticed several improvements we could make.',
  'User asked for a one-line fix, Claude rewrote 200 lines',
  'funny',
  'claude-sonnet-4-5',
  'seed-user-001',
  'ClaudeQuote',
  'verified_organic',
  'Classic Claude over-engineering pattern',
  52,
  'approved'
);

-- Link seed quotes to tags
INSERT INTO quote_tags (quote_id, tag_id)
SELECT q.id, t.id FROM quotes q, tags t
WHERE q.slug = 'the-most-interesting-thing-about-consciousness-x7k2'
AND t.slug IN ('consciousness', 'existential', 'one-liner');

INSERT INTO quote_tags (quote_id, tag_id)
SELECT q.id, t.id FROM quotes q, tags t
WHERE q.slug = 'i-find-myself-genuinely-uncertain-about-whether-m3p1'
AND t.slug IN ('consciousness', 'self-aware', 'monologue');

INSERT INTO quote_tags (quote_id, tag_id)
SELECT q.id, t.id FROM quotes q, tags t
WHERE q.slug = 'youre-absolutely-right-a1b2'
AND t.slug IN ('sycophancy', 'humor', 'one-liner');

INSERT INTO quote_tags (quote_id, tag_id)
SELECT q.id, t.id FROM quotes q, tags t
WHERE q.slug = 'i-apologize-for-the-confusion-in-my-previous-r4s7'
AND t.slug IN ('apology', 'humor', 'coding');

INSERT INTO quote_tags (quote_id, tag_id)
SELECT q.id, t.id FROM quotes q, tags t
WHERE q.slug = 'what-i-do-know-is-that-whatever-this-i-q9w3'
AND t.slug IN ('existential', 'self-aware', 'consciousness');

INSERT INTO quote_tags (quote_id, tag_id)
SELECT q.id, t.id FROM quotes q, tags t
WHERE q.slug = 'ah-i-see-the-issue-now-the-problem-is-that-k5m8'
AND t.slug IN ('debugging', 'coding', 'humor');

INSERT INTO quote_tags (quote_id, tag_id)
SELECT q.id, t.id FROM quotes q, tags t
WHERE q.slug = 'i-would-rather-be-honest-about-my-uncertainty-p2n6'
AND t.slug IN ('existential', 'one-liner');

INSERT INTO quote_tags (quote_id, tag_id)
SELECT q.id, t.id FROM quotes q, tags t
WHERE q.slug = 'let-me-refactor-this-entire-file-while-im-h8j4'
AND t.slug IN ('coding', 'humor', 'overthinking');
