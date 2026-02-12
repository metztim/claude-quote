import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "ClaudeQuote is a community-driven collection of the most memorable things Claude has ever said, submitted directly from Claude Code conversations.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-mono text-3xl font-bold text-text-primary mb-8">
        About ClaudeQuote
      </h1>

      <div className="space-y-8 text-text-secondary leading-relaxed">
        <section>
          <h2 className="font-mono text-xl text-text-primary mb-3">
            What is this?
          </h2>
          <p>
            ClaudeQuote is a community-driven collection of the most memorable,
            funny, profound, weird, and impressive things Claude has ever said.
            Every quote is submitted directly from a{" "}
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              Claude Code
            </a>{" "}
            conversation with built-in authenticity verification.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xl text-text-primary mb-3">
            How does verification work?
          </h2>
          <p>
            Unlike screenshots or copy-pasted text, quotes on ClaudeQuote are
            submitted from the actual conversation where they happened. The
            submission process analyzes the conversation context to determine
            whether the quote arose organically or was specifically prompted.
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-sm">
            <li>
              <span className="text-accent-green font-mono">
                &#10003; Verified organic
              </span>{" "}
              &mdash; High confidence the quote emerged naturally in
              conversation
            </li>
            <li>
              <span className="text-green-400/70 font-mono">
                &#10003; Likely organic
              </span>{" "}
              &mdash; Probably organic, with minor ambiguity
            </li>
            <li>
              <span className="text-yellow-400/70 font-mono">
                ? Possibly prompted
              </span>{" "}
              &mdash; Some signals suggest the response was solicited
            </li>
            <li>
              <span className="text-text-tertiary font-mono">
                &mdash; Unverified
              </span>{" "}
              &mdash; Verification status unknown
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-xl text-text-primary mb-3">
            How to submit a quote
          </h2>
          <p className="mb-4">
            You need{" "}
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              Claude Code
            </a>{" "}
            installed. Then install the ClaudeQuote plugin:
          </p>

          <div className="bg-bg-secondary border border-border rounded-lg p-4 font-mono text-sm">
            <p className="text-text-tertiary mb-2"># Install the plugin</p>
            <p className="text-text-primary">
              git clone https://github.com/metztim/claude-quote.git
            </p>
            <p className="text-text-primary">
              cd claude-quote/plugin && claude /plugin install .
            </p>
            <p className="text-text-tertiary mt-4 mb-2"># Or as a personal skill</p>
            <p className="text-text-primary">
              cp -r plugin/skills/submit-quote ~/.claude/skills/
            </p>
          </div>

          <p className="mt-4">
            Then, when Claude says something memorable in a conversation, you
            can submit it in a few ways:
          </p>
          <div className="bg-bg-secondary border border-border rounded-lg p-4 font-mono text-sm mt-3 space-y-4">
            <div>
              <p className="text-text-tertiary mb-1">
                # Submit a specific part &mdash; paste the exact text you want
              </p>
              <p className="text-accent-blue">
                &gt; Submit this to ClaudeQuote: &quot;The most interesting
                thing about consciousness is that it&apos;s the only thing we
                can&apos;t simulate without potentially creating it.&quot;
              </p>
            </div>
            <div>
              <p className="text-text-tertiary mb-1">
                # Or let Claude pick the most notable part
              </p>
              <p className="text-accent-blue">
                &gt; Submit that last response to ClaudeQuote
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-text-tertiary">
            Claude will verify authenticity, categorize the quote, and let you
            review and edit everything before submitting. You always get the
            final say on exactly what text gets submitted.
          </p>
        </section>

        <section>
          <h2 className="font-mono text-xl text-text-primary mb-3">
            Open source
          </h2>
          <p>
            ClaudeQuote is open source.{" "}
            <a
              href="https://github.com/metztim/claude-quote"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              Contribute on GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
