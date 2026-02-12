"use client";

import { useState } from "react";
import { truncateText } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";

export function ShareButtons({
  slug,
  quoteText,
}: {
  slug: string;
  quoteText: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/quotes/${slug}`;
  const tweetText = `"${truncateText(quoteText, 200)}" — Claude\n\n${url}`;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={copyLink}
        className="text-text-secondary hover:text-text-primary text-sm font-mono transition-colors"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text-secondary hover:text-text-primary text-sm font-mono transition-colors"
      >
        Share on X
      </a>
    </div>
  );
}
