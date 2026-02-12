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
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/about"
            className="hidden sm:inline text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            About
          </Link>
          <a
            href="https://github.com/metztim/claude-quote"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            GitHub
          </a>
          <Link
            href="/submit"
            className="bg-accent-blue text-bg-primary px-3 py-1.5 sm:px-4 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <span className="sm:hidden">Submit</span>
            <span className="hidden sm:inline">Submit a quote</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
