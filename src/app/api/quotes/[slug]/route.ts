import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: quote, error } = await supabase
    .from("quotes")
    .select("*, quote_tags(tag_id, tags(id, name, slug))")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (error || !quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  // Flatten tags
  const tags = (quote.quote_tags || [])
    .map((qt: { tags: { id: string; name: string; slug: string } }) => qt.tags)
    .filter(Boolean);
  const { quote_tags: _, ...rest } = quote;

  return NextResponse.json({ quote: { ...rest, tags } });
}
