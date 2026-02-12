import { Quote } from "@/lib/types";
import { QuoteCard } from "./QuoteCard";

export function QuoteGrid({ quotes }: { quotes: Quote[] }) {
  if (quotes.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-mono text-text-secondary text-lg">
          No quotes found
        </p>
        <p className="text-text-tertiary text-sm mt-2">
          Be the first to submit one from Claude Code!
        </p>
      </div>
    );
  }

  return (
    <div className="quote-grid">
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
    </div>
  );
}
