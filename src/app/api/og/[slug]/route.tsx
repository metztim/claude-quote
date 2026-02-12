import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { CATEGORY_MAP } from "@/lib/constants";
import { CategorySlug } from "@/lib/types";

export const runtime = "edge";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = createServerClient();

  const { data: quote } = await supabase
    .from("quotes")
    .select("quote_text, category, model")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (!quote) {
    return new Response("Not found", { status: 404 });
  }

  const category = CATEGORY_MAP[quote.category as CategorySlug];
  const categoryColor = category?.color || "#58A6FF";
  const displayText =
    quote.quote_text.length > 280
      ? quote.quote_text.substring(0, 277) + "..."
      : quote.quote_text;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#0D1117",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              borderLeft: `4px solid ${categoryColor}`,
              paddingLeft: "24px",
            }}
          >
            <div
              style={{
                color: "#E6EDF3",
                fontSize: displayText.length > 150 ? 28 : 36,
                lineHeight: 1.6,
                fontFamily: "monospace",
              }}
            >
              &ldquo;{displayText}&rdquo;
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                color: categoryColor,
                fontSize: 18,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {category?.name || quote.category}
            </div>
            {quote.model && (
              <div style={{ color: "#484F58", fontSize: 18 }}>
                &middot; {quote.model}
              </div>
            )}
          </div>
          <div
            style={{
              color: "#8B949E",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            claudequote.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
