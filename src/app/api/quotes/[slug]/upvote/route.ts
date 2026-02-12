import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createServerClient();

  let body: { voter_id: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.voter_id) {
    return NextResponse.json(
      { error: "voter_id is required" },
      { status: 400 }
    );
  }

  // Find the quote
  const { data: quote } = await supabase
    .from("quotes")
    .select("id, upvote_count")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (!quote) {
    return NextResponse.json({ error: "Quote not found" }, { status: 404 });
  }

  // Try to insert upvote (unique constraint will prevent duplicates)
  const { error } = await supabase
    .from("upvotes")
    .insert({ quote_id: quote.id, voter_id: body.voter_id });

  if (error) {
    if (error.code === "23505") {
      // Already upvoted
      return NextResponse.json({
        upvoted: false,
        upvote_count: quote.upvote_count,
        message: "Already upvoted",
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    upvoted: true,
    upvote_count: quote.upvote_count + 1,
  });
}
