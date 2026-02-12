import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b border-border px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-accent-blue font-mono text-lg font-bold">
            &gt;_
          </span>
          <span className="font-mono text-lg font-semibold text-text-primary">
            ClaudeQuote
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/about"
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            About
          </Link>
          <a
            href="https://github.com/metztim/claude-quote"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
