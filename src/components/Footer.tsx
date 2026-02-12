export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-6 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-text-tertiary text-sm">
        <p className="font-mono">claudequote.com</p>
        <p>
          Every quote submitted from a real{" "}
          <a
            href="https://claude.com/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent-blue transition-colors"
          >
            Claude Code
          </a>{" "}
          conversation
        </p>
      </div>
    </footer>
  );
}
