import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a quote",
  description:
    "Submit memorable Claude quotes directly from your Claude Code conversation.",
};

export default function SubmitPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-mono text-3xl font-bold text-text-primary mb-3">
        Submit a quote
      </h1>
      <p className="text-text-secondary mb-10 text-lg">
        Share the best things Claude has said — directly from your conversation.
      </p>

      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent-blue text-bg-primary w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold font-mono">
              1
            </span>
            <h2 className="font-mono text-xl text-text-primary">
              Install the plugin
            </h2>
          </div>
          <p className="text-text-secondary mb-4">
            You need{" "}
            <a
              href="https://claude.com/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-blue hover:underline"
            >
              Claude Code
            </a>{" "}
            installed. Then add the ClaudeQuote skill:
          </p>
          <div className="bg-bg-secondary border border-border rounded-lg p-4 font-mono text-sm">
            <p className="text-text-tertiary mb-2">
              # Clone the repo and install as a plugin
            </p>
            <p className="text-text-primary">
              git clone https://github.com/metztim/claude-quote.git
            </p>
            <p className="text-text-primary">
              cd claude-quote/plugin && claude /plugin install .
            </p>
            <p className="text-text-tertiary mt-4 mb-2">
              # Or just copy the skill directly
            </p>
            <p className="text-text-primary">
              mkdir -p ~/.claude/skills && cp -r plugin/skills/submit-quote
              ~/.claude/skills/
            </p>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent-blue text-bg-primary w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold font-mono">
              2
            </span>
            <h2 className="font-mono text-xl text-text-primary">
              Find something quotable
            </h2>
          </div>
          <p className="text-text-secondary">
            Use Claude Code as you normally would. When Claude says something
            funny, profound, weird, or just memorable — that&apos;s your moment.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent-blue text-bg-primary w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold font-mono">
              3
            </span>
            <h2 className="font-mono text-xl text-text-primary">Submit it</h2>
          </div>
          <p className="text-text-secondary mb-4">
            Tell Claude to submit it. You can paste the exact text, or let
            Claude pick the best part:
          </p>
          <div className="bg-bg-secondary border border-border rounded-lg p-4 font-mono text-sm space-y-4">
            <div>
              <p className="text-text-tertiary mb-1">
                # Submit a specific part
              </p>
              <p className="text-accent-blue">
                &gt; Submit this to ClaudeQuote: &quot;The most interesting
                thing about consciousness is that it&apos;s the only thing we
                can&apos;t simulate without potentially creating it.&quot;
              </p>
            </div>
            <div>
              <p className="text-text-tertiary mb-1">
                # Or let Claude pick the highlight
              </p>
              <p className="text-accent-blue">
                &gt; Submit that last response to ClaudeQuote
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-accent-blue text-bg-primary w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold font-mono">
              4
            </span>
            <h2 className="font-mono text-xl text-text-primary">
              Review and confirm
            </h2>
          </div>
          <p className="text-text-secondary">
            Claude will automatically verify the quote is organic (not
            prompted), categorize it, tag it, and show you a preview. You can
            edit anything before confirming. Then it&apos;s live on ClaudeQuote
            with a shareable link.
          </p>
        </section>

        <div className="border-t border-border pt-8 mt-8">
          <h3 className="font-mono text-lg text-text-primary mb-3">
            What gets verified?
          </h3>
          <p className="text-text-secondary text-sm mb-4">
            The plugin checks whether the quote arose naturally in conversation
            or was specifically requested. Each quote gets a verification badge:
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-accent-green font-mono">&#10003;</span>
              <span className="text-text-secondary">
                <span className="text-text-primary">Verified organic</span>{" "}
                &mdash; emerged naturally during real work
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400/70 font-mono">&#10003;</span>
              <span className="text-text-secondary">
                <span className="text-text-primary">Likely organic</span>{" "}
                &mdash; probably organic, minor ambiguity
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400/70 font-mono">?</span>
              <span className="text-text-secondary">
                <span className="text-text-primary">Possibly prompted</span>{" "}
                &mdash; some signals suggest it was solicited
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
