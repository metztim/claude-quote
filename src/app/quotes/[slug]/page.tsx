import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { CATEGORY_MAP, SITE_URL } from "@/lib/constants";
import { Quote, CategorySlug } from "@/lib/types";
import { formatModel, formatDate, truncateText } from "@/lib/utils";
import { UpvoteButton } from "@/components/UpvoteButton";
import { VerificationBadge } from "@/components/VerificationBadge";
import { ShareButtons } from "@/components/ShareButtons";
import { TagPill } from "@/components/TagPill";
import { QuoteGrid } from "@/components/QuoteGrid";

async function getQuote(slug: string): Promise<Quote | null> {
  const supabase = createServerClient();

  const { data: quote } = await supabase
    .from("quotes")
    .select("*, quote_tags(tag_id, tags(id, name, slug))")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (!quote) return null;

  const tags = (quote.quote_tags || [])
    .map((qt: { tags: { id: string; name: string; slug: string } }) => qt.tags)
    .filter(Boolean);
  const { quote_tags: _, ...rest } = quote;
  return { ...rest, tags } as Quote;
}

async function getRelatedQuotes(
  category: string,
  excludeId: string
): Promise<Quote[]> {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("quotes")
    .select("*, quote_tags(tag_id, tags(id, name, slug))")
    .eq("status", "approved")
    .eq("category", category)
    .neq("id", excludeId)
    .order("upvote_count", { ascending: false })
    .limit(3);

  return (data || []).map((quote) => {
    const tags = (quote.quote_tags || [])
      .map(
        (qt: { tags: { id: string; name: string; slug: string } }) => qt.tags
      )
      .filter(Boolean);
    const { quote_tags: _, ...rest } = quote;
    return { ...rest, tags } as Quote;
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quote = await getQuote(slug);

  if (!quote) {
    return { title: "Quote not found" };
  }

  const truncated = truncateText(quote.quote_text, 200);
  const category = CATEGORY_MAP[quote.category as CategorySlug];

  return {
    title: `"${truncated}"`,
    description: `A ${category?.name?.toLowerCase() || quote.category} Claude quote${quote.context_snippet ? ": " + quote.context_snippet : ""}`,
    openGraph: {
      title: `"${truncated}"`,
      description: `${category?.name || quote.category} | ${formatModel(quote.model)} | ${quote.upvote_count} upvotes`,
      type: "article",
      url: `${SITE_URL}/quotes/${slug}`,
      images: [
        {
          url: `${SITE_URL}/api/og/${slug}`,
          width: 1200,
          height: 630,
          alt: truncated,
        },
      ],
      siteName: "ClaudeQuote",
    },
    twitter: {
      card: "summary_large_image",
      title: `"${truncated}"`,
      description: `${category?.name || quote.category} quote from Claude`,
      images: [`${SITE_URL}/api/og/${slug}`],
    },
  };
}

export default async function QuotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quote = await getQuote(slug);

  if (!quote) notFound();

  const category = CATEGORY_MAP[quote.category as CategorySlug];
  const categoryColor = category?.color || "#58A6FF";
  const relatedQuotes = await getRelatedQuotes(quote.category, quote.id);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="text-text-secondary hover:text-text-primary text-sm font-mono transition-colors mb-8 inline-block"
      >
        &larr; All quotes
      </Link>

      <article className="mb-12">
        <div
          className="border-l-4 pl-6 mb-6"
          style={{ borderColor: categoryColor }}
        >
          <blockquote className="font-mono text-xl sm:text-2xl leading-relaxed text-text-primary">
            &ldquo;{quote.quote_text}&rdquo;
          </blockquote>
        </div>

        {quote.context_snippet && (
          <p className="text-text-tertiary text-sm mb-6 italic">
            Context: {quote.context_snippet}
          </p>
        )}

        {quote.tags && quote.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {quote.tags.map((tag) => (
              <TagPill key={tag.id} name={tag.name} slug={tag.slug} />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-t border-b border-border">
          <div className="flex items-center gap-4 text-sm">
            <span className="font-mono" style={{ color: categoryColor }}>
              {category?.name || quote.category}
            </span>
            {quote.model && (
              <span className="text-text-tertiary font-mono">
                {formatModel(quote.model)}
              </span>
            )}
            <span className="text-text-tertiary">
              {formatDate(quote.created_at)}
            </span>
            {quote.submitter_name && (
              <span className="text-text-tertiary">
                by {quote.submitter_name}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <UpvoteButton
              slug={quote.slug}
              initialCount={quote.upvote_count}
            />
            <ShareButtons slug={quote.slug} quoteText={quote.quote_text} />
          </div>
        </div>

        <div className="mt-4">
          <VerificationBadge
            status={quote.verification_status}
            notes={quote.verification_notes}
          />
        </div>
      </article>

      {relatedQuotes.length > 0 && (
        <section>
          <h2 className="font-mono text-lg text-text-secondary mb-6">
            More {category?.name?.toLowerCase() || quote.category} quotes
          </h2>
          <QuoteGrid quotes={relatedQuotes} />
        </section>
      )}
    </div>
  );
}
