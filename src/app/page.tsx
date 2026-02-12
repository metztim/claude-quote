import { Suspense } from "react";
import { createServerClient } from "@/lib/supabase/server";
import { shouldShowSeedContent } from "@/lib/seed";
import { Quote, SortOption } from "@/lib/types";
import { QuoteGrid } from "@/components/QuoteGrid";
import { FilterBar } from "@/components/FilterBar";

async function getQuotes(sort: SortOption = "newest", tag?: string) {
  const supabase = createServerClient();
  const showSeed = await shouldShowSeedContent();

  let query = supabase
    .from("quotes")
    .select("*, quote_tags(tag_id, tags(id, name, slug))")
    .eq("status", "approved");

  if (!showSeed) {
    query = query.eq("is_seed", false);
  }

  if (sort === "top") {
    query = query.order("upvote_count", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  query = query.limit(50);

  const { data } = await query;

  const quotes: Quote[] = (data || []).map((quote) => {
    const tags = (quote.quote_tags || [])
      .map(
        (qt: { tags: { id: string; name: string; slug: string } }) => qt.tags
      )
      .filter(Boolean);
    const { quote_tags: _, ...rest } = quote;
    return { ...rest, tags } as Quote;
  });

  if (tag) {
    return quotes.filter((q) =>
      q.tags?.some((t) => t.slug === tag)
    );
  }

  return quotes;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const sort = (params.sort === "newest" ? "newest" : "top") as SortOption;
  const tag = params.tag;
  const quotes = await getQuotes(sort, tag);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-10">
        <h1 className="font-mono text-3xl font-bold text-text-primary mb-2">
          <span className="text-accent-blue">&gt;_</span> ClaudeQuote
        </h1>
        <p className="text-text-secondary text-lg">
          Things Claude said while vibing
        </p>
        <p className="text-text-tertiary text-sm mt-1">
          Submitted by humans from real Claude Code chats.
        </p>
      </div>

      <Suspense fallback={null}>
        <FilterBar activeSort={sort} />
      </Suspense>

      {tag && (
        <p className="text-text-secondary text-sm mb-4 font-mono">
          Filtered by tag: <span className="text-accent-purple">{tag}</span>
        </p>
      )}

      <QuoteGrid quotes={quotes} />
    </div>
  );
}
