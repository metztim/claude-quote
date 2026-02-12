import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { shouldShowSeedContent } from "@/lib/seed";
import { VALID_CATEGORIES } from "@/lib/constants";
import { generateSlug, slugifyTag } from "@/lib/utils";
import { QuoteSubmission } from "@/lib/types";

export async function GET(request: NextRequest) {
  const supabase = createServerClient();
  const showSeed = await shouldShowSeedContent();
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const sort = searchParams.get("sort") || "newest";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
  const offset = (page - 1) * limit;

  let query = supabase
    .from("quotes")
    .select("*, quote_tags(tag_id, tags(id, name, slug))", { count: "exact" })
    .eq("status", "approved");

  if (!showSeed) {
    query = query.eq("is_seed", false);
  }

  if (category) {
    query = query.eq("category", category);
  }

  if (sort === "top") {
    query = query.order("upvote_count", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Flatten tags from the join
  const quotes = (data || []).map((quote) => {
    const tags = (quote.quote_tags || [])
      .map((qt: { tags: { id: string; name: string; slug: string } }) => qt.tags)
      .filter(Boolean);
    const { quote_tags: _, ...rest } = quote;
    return { ...rest, tags };
  });

  // If filtering by tag, do it after fetching (simpler than a complex join filter)
  let filteredQuotes = quotes;
  if (tag) {
    filteredQuotes = quotes.filter((q) =>
      q.tags.some((t: { slug: string }) => t.slug === tag)
    );
  }

  return NextResponse.json({
    quotes: filteredQuotes,
    total: count || 0,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  });
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient();

  let body: QuoteSubmission;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Validate required fields
  if (!body.quote_text || body.quote_text.length < 10) {
    return NextResponse.json(
      { error: "Quote text must be at least 10 characters" },
      { status: 400 }
    );
  }
  if (body.quote_text.length > 2000) {
    return NextResponse.json(
      { error: "Quote text must be under 2000 characters" },
      { status: 400 }
    );
  }
  if (!body.category || !VALID_CATEGORIES.includes(body.category)) {
    return NextResponse.json(
      { error: `Category must be one of: ${VALID_CATEGORIES.join(", ")}` },
      { status: 400 }
    );
  }
  if (!body.submitter_id) {
    return NextResponse.json(
      { error: "submitter_id is required" },
      { status: 400 }
    );
  }
  if (!body.tags || body.tags.length === 0 || body.tags.length > 5) {
    return NextResponse.json(
      { error: "Must include 1-5 tags" },
      { status: 400 }
    );
  }

  // Rate limit: 5 submissions per submitter_id per hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count: recentCount } = await supabase
    .from("quotes")
    .select("id", { count: "exact", head: true })
    .eq("submitter_id", body.submitter_id)
    .gte("created_at", oneHourAgo);

  if ((recentCount || 0) >= 5) {
    return NextResponse.json(
      { error: "Rate limit: max 5 submissions per hour" },
      { status: 429 }
    );
  }

  const slug = generateSlug(body.quote_text);

  // Insert the quote
  const { data: quote, error: quoteError } = await supabase
    .from("quotes")
    .insert({
      slug,
      quote_text: body.quote_text,
      context_snippet: body.context_snippet || null,
      category: body.category,
      model: body.model || null,
      submitter_id: body.submitter_id,
      submitter_name: body.submitter_name || null,
      verification_status: body.verification_status || "unverified",
      verification_notes: body.verification_notes || null,
    })
    .select()
    .single();

  if (quoteError) {
    return NextResponse.json({ error: quoteError.message }, { status: 500 });
  }

  // Handle tags: find existing or create new ones
  for (const tagName of body.tags) {
    const tagSlug = slugifyTag(tagName);

    // Upsert the tag
    let { data: tag } = await supabase
      .from("tags")
      .select("id")
      .eq("slug", tagSlug)
      .single();

    if (!tag) {
      const { data: newTag } = await supabase
        .from("tags")
        .insert({ name: tagName.toLowerCase(), slug: tagSlug })
        .select("id")
        .single();
      tag = newTag;
    }

    if (tag) {
      await supabase
        .from("quote_tags")
        .insert({ quote_id: quote.id, tag_id: tag.id });
    }
  }

  return NextResponse.json({ quote, slug }, { status: 201 });
}
