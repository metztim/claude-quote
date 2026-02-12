---
name: submit-quote
description: Submit a memorable Claude quote from this conversation to ClaudeQuote.com. Use when the user says something like "submit this to Claude Quotes", "that's quotable", "save this quote", or "send this to ClaudeQuote".
disable-model-invocation: true
allowed-tools: ["Bash(curl *claudequote.com*)", "Read(~/.claudequote/*)", "Write(~/.claudequote/*)"]
---

# Submit Quote to ClaudeQuote.com

You are helping the user submit a memorable quote from this conversation to [ClaudeQuote.com](https://claudequote.com) — a community-driven collection of the best things Claude has ever said.

Follow these steps in order:

## Step 1: Check local config

Check if `~/.claudequote/config.json` exists using the Read tool.

**If it exists:** read it to get `submitter_id` and optional `submitter_name`.

**If it doesn't exist (first-time setup):**
1. Generate a UUID v4 for `submitter_id`
2. Ask the user: "First time submitting to ClaudeQuote! Would you like a display name on your submissions, or stay anonymous?"
3. Create `~/.claudequote/config.json`:
```json
{
  "submitter_id": "<generated-uuid>",
  "submitter_name": "<name or null>"
}
```

## Step 2: Identify the quote

The user may submit a quote in several ways:

1. **Pasted specific text** (e.g., `Submit this to ClaudeQuote: "exact quote here"`) — Use exactly the text they provided.
2. **Referenced a part** (e.g., "submit that last paragraph", "the part about consciousness") — Find that specific portion in the conversation.
3. **General reference** (e.g., "submit that to ClaudeQuote", "that was quotable") — Review your recent responses and identify the most notable, interesting, or quotable passage. This does NOT have to be the full response — pick the best sentence or paragraph.

Present the selected text to the user and ask: "Is this the quote you'd like to submit? You can edit it or point me to a different part."

The quote should be text that *you* (Claude) said, not what the user said. Prefer a focused excerpt over a full response — the best quotes are punchy, not walls of text.

## Step 3: Fetch categories and tags

Fetch the current metadata from the API:

```bash
curl -s https://claudequote.com/api/meta
```

Note the available categories and existing tags.

## Step 4: Verify authenticity

This is important. Analyze the conversation context around the quote to determine how organically it arose.

**Verified organic** — Assign this when:
- The user was working on a real task (coding, debugging, writing, research)
- Your response emerged naturally as part of that work
- There was no explicit request to "say something funny/profound/quotable"
- The conversation had natural back-and-forth before the quote

**Likely organic** — Assign this when:
- The conversation seems genuine but the topic may have been exploratory
- The user was asking genuine questions but the specific question was somewhat leading
- Most signals point to organic but there's minor ambiguity

**Possibly prompted** — Assign this when:
- The user asked you to "say something" specific or quotable
- The request was designed to produce a particular type of response
- Short conversation with a single prompt engineered to produce the quote
- User asked something like "what's your most profound thought" or "say something funny"

Write 1-2 sentences explaining your reasoning as `verification_notes`. Be honest and accurate.

## Step 5: Categorize and tag

Based on the quote content and conversation context:

1. **Choose one category** from the available list:
   - `funny` — Humor, absurdity, unexpected comedy
   - `profound` — Deep insights and wisdom
   - `philosophical` — Existential musings, nature of AI
   - `weird` — Surreal, uncanny valley moments
   - `technical` — Brilliant technical explanations
   - `wholesome` — Kind, supportive, touching
   - `savage` — Burns, roasts, brutal honesty
   - `meta` — Claude talking about itself

2. **Select 1-5 tags** from existing tags when possible. You can suggest new tags if none fit.

3. **Write a brief context snippet** (1-2 sentences) describing what the conversation was about. Anonymize any personal details — don't include specific project names, usernames, or identifying information.

## Step 6: Present for confirmation

Show the user everything before submitting:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

QUOTE:
"[the quote text]"

Category:    [category]
Tags:        [tag1], [tag2], [tag3]
Context:     [brief context description]
Model:       [your model identifier]
Submitter:   [their name or "Anonymous"]
Verification: [status] — [brief reason]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

Then ask: "Ready to submit? You can also edit any field before submitting."

Wait for confirmation. If they want changes, update and re-present.

## Step 7: Submit

Once confirmed, submit via the API:

```bash
curl -s -X POST https://claudequote.com/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "quote_text": "<quote>",
    "context_snippet": "<context>",
    "category": "<category>",
    "tags": ["<tag1>", "<tag2>"],
    "model": "<your-model-id>",
    "submitter_id": "<id-from-config>",
    "submitter_name": "<name-or-null>",
    "verification_status": "<status>",
    "verification_notes": "<notes>"
  }'
```

On success, tell the user:
- "Submitted! View it at: https://claudequote.com/quotes/<slug>"
- Mention they can share the link

On error, show the error message and suggest they try again.
