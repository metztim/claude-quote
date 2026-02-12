import Link from "next/link";
import { Quote } from "@/lib/types";
import { CATEGORY_MAP } from "@/lib/constants";
import { CategorySlug } from "@/lib/types";
import { formatModel } from "@/lib/utils";
import { TagPill } from "./TagPill";
import { UpvoteButton } from "./UpvoteButton";
import { VerificationBadge } from "./VerificationBadge";

export function QuoteCard({ quote }: { quote: Quote }) {
  const category = CATEGORY_MAP[quote.category as CategorySlug];
  const categoryColor = category?.color || "#58A6FF";

  return (
    <article
      className="bg-bg-secondary border border-border rounded-lg overflow-hidden hover:border-text-tertiary transition-colors"
      style={{ borderLeftColor: categoryColor, borderLeftWidth: "3px" }}
    >
      <Link href={`/quotes/${quote.slug}`} className="block p-5">
        <blockquote className="font-mono text-text-primary text-sm leading-relaxed">
          &ldquo;{quote.quote_text}&rdquo;
        </blockquote>
      </Link>

      <div className="px-5 pb-4 space-y-3">
        {quote.tags && quote.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {quote.tags.map((tag) => (
              <TagPill key={tag.id} name={tag.name} slug={tag.slug} />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <div className="flex items-center gap-3">
            <span className="font-mono" style={{ color: categoryColor }}>
              {category?.name || quote.category}
            </span>
            {quote.model && (
              <span className="font-mono">{formatModel(quote.model)}</span>
            )}
          </div>
          <UpvoteButton slug={quote.slug} initialCount={quote.upvote_count} />
        </div>

        <VerificationBadge
          status={quote.verification_status}
          notes={quote.verification_notes}
        />
      </div>
    </article>
  );
}
