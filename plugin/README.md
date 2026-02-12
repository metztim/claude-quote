# ClaudeQuote Plugin for Claude Code

Submit memorable Claude quotes to [ClaudeQuote.com](https://claudequote.com) directly from your Claude Code conversations.

## Installation

### As a plugin

```bash
git clone https://github.com/metztim/claude-quote.git
cd claude-quote-plugin
claude /plugin install .
```

### As a personal skill

```bash
mkdir -p ~/.claude/skills && cp -r skills/submit-quote ~/.claude/skills/
```

## Usage

When Claude says something memorable during a conversation, just tell it:

```
> Submit that to ClaudeQuote
```

Or:

```
> /submit-quote
```

Claude will:
1. Identify the quote from the conversation
2. Verify it arose organically (not prompted)
3. Categorize and tag it
4. Let you review before submitting
5. Submit to ClaudeQuote.com and give you a shareable link

## How verification works

The plugin analyzes the conversation context to determine authenticity:

- **Verified organic** — The quote emerged naturally during real work
- **Likely organic** — Probably organic, minor ambiguity
- **Possibly prompted** — Some signals suggest the response was solicited

## Configuration

On first use, the plugin creates `~/.claudequote/config.json` with:
- A unique submitter ID (generated automatically)
- Your optional display name

Submissions can be anonymous or attributed to your chosen display name.

## License

MIT
