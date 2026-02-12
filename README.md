# ClaudeQuote

Things Claude said while vibing. A community collection of remarkable Claude quotes, submitted from real Claude Code conversations with built-in authenticity verification.

**[claudequote.com](https://claudequote.com)**

## What is this?

People share Claude quotes everywhere — Twitter, Medium, Reddit, LinkedIn. But screenshots can be faked, and there's no central place to browse and share them.

ClaudeQuote solves this with two key ideas:

1. **Direct submission from Claude Code** — Quotes are submitted from the actual conversation where they happened, not copy-pasted from screenshots
2. **Authenticity verification** — The submission process analyzes conversation context to determine if a quote arose organically or was prompted

## How it works

### Submitting quotes

Install the [Claude Code plugin](./plugin) and when Claude says something memorable:

```
> Submit that to ClaudeQuote
```

Claude will extract the quote, verify its authenticity, categorize it, and let you review before submitting.

### Browsing quotes

Visit [claudequote.com](https://claudequote.com) to browse quotes by category:

- **Funny** — Humor, absurdity, unexpected comedy
- **Profound** — Deep insights and wisdom
- **Philosophical** — Existential musings, nature of AI
- **Weird** — Surreal, uncanny valley moments
- **Technical** — Brilliant technical explanations
- **Wholesome** — Kind, supportive, touching
- **Savage** — Burns, roasts, brutal honesty
- **Meta** — Claude talking about itself

### Verification badges

Each quote shows how organically it arose:

- **Verified organic** — Natural conversation, quote emerged incidentally
- **Likely organic** — Probably organic, minor ambiguity
- **Possibly prompted** — Some signals suggest the response was solicited

## Local development

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)

### Setup

```bash
# Clone the repo
git clone https://github.com/metztim/claude-quote.git
cd claude-quote

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Set up the database
# Run supabase/schema.sql in your Supabase SQL Editor
# Optionally run supabase/seed.sql for sample data

# Start dev server
npm run dev
```

### Tech stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [Supabase](https://supabase.com) (PostgreSQL)
- [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Vercel](https://vercel.com)

## Contributing

Contributions welcome! Areas where help is especially appreciated:

- **UI/UX improvements** — Better card designs, animations, mobile experience
- **New features** — Search, trending algorithm, user profiles
- **Plugin improvements** — Better verification heuristics, multi-model support
- **Bug fixes** — Always welcome

## License

MIT
