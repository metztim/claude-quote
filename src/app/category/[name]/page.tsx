import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { CATEGORY_MAP, SITE_URL } from "@/lib/constants";
import { Quote, CategorySlug, SortOption } from "@/lib/types";
import { QuoteGrid } from "@/components/QuoteGrid";
import { FilterBar } from "@/components/FilterBar";

async function getQuotesByCategory(category: string, sort: SortOption) {
  const supabase = createServerClient();

  let query = supabase
    .from("quotes")
    .select("*, quote_tags(tag_id, tags(id, name, slug))")
    .eq("status", "approved")
    .eq("category", category);

  if (sort === "top") {
    query = query.order("upvote_count", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  query = query.limit(50);

  const { data } = await query;

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
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const category = CATEGORY_MAP[name as CategorySlug];

  if (!category) return { title: "Category not found" };

  return {
    title: `${category.name} Claude Quotes`,
    description: `${category.description}. Browse the best ${category.name.toLowerCase()} things Claude has ever said.`,
    openGraph: {
      title: `${category.name} Claude Quotes | ClaudeQuote`,
      description: category.description,
      url: `${SITE_URL}/category/${name}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { name } = await params;
  const resolvedSearchParams = await searchParams;
  const category = CATEGORY_MAP[name as CategorySlug];

  if (!category) notFound();

  const sort = (
    resolvedSearchParams.sort === "top" ? "top" : "newest"
  ) as SortOption;
  const quotes = await getQuotesByCategory(name, sort);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-10">
        <h1 className="font-mono text-3xl font-bold text-text-primary mb-2">
          <span style={{ color: category.color }}>{category.name}</span> quotes
        </h1>
        <p className="text-text-secondary">{category.description}</p>
      </div>

      <Suspense fallback={null}>
        <FilterBar activeCategory={name} activeSort={sort} />
      </Suspense>

      <QuoteGrid quotes={quotes} />
    </div>
  );
}
