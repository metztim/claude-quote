import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { shouldShowSeedContent } from "@/lib/seed";
import { CATEGORIES } from "@/lib/constants";

export async function GET() {
  const supabase = createServerClient();
  const showSeed = await shouldShowSeedContent();

  const { data: tags } = await supabase
    .from("tags")
    .select("id, name, slug")
    .order("name");

  // Get tag usage counts
  const { data: tagCounts } = await supabase
    .from("quote_tags")
    .select("tag_id");

  const countMap: Record<string, number> = {};
  tagCounts?.forEach((qt) => {
    countMap[qt.tag_id] = (countMap[qt.tag_id] || 0) + 1;
  });

  const tagsWithCounts = (tags || []).map((tag) => ({
    ...tag,
    count: countMap[tag.id] || 0,
  }));

  // Get category counts
  let categoryQuery = supabase
    .from("quotes")
    .select("category")
    .eq("status", "approved");

  if (!showSeed) {
    categoryQuery = categoryQuery.eq("is_seed", false);
  }

  const { data: quotes } = await categoryQuery;

  const categoryCounts: Record<string, number> = {};
  quotes?.forEach((q) => {
    categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
  });

  const categoriesWithCounts = CATEGORIES.map((cat) => ({
    ...cat,
    count: categoryCounts[cat.slug] || 0,
  }));

  return NextResponse.json({
    categories: categoriesWithCounts,
    tags: tagsWithCounts.sort((a, b) => b.count - a.count),
  });
}
