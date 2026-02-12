"use client";

import { useState, useEffect } from "react";

function getVoterId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("cq_voter_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("cq_voter_id", id);
  }
  return id;
}

export function UpvoteButton({
  slug,
  initialCount,
}: {
  slug: string;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const votedQuotes = JSON.parse(
      localStorage.getItem("cq_voted") || "[]"
    ) as string[];
    if (votedQuotes.includes(slug)) {
      setVoted(true);
    }
  }, [slug]);

  async function handleUpvote() {
    if (voted || loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/quotes/${slug}/upvote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voter_id: getVoterId() }),
      });

      const data = await res.json();

      if (data.upvoted) {
        setCount(data.upvote_count);
        setVoted(true);
        const votedQuotes = JSON.parse(
          localStorage.getItem("cq_voted") || "[]"
        ) as string[];
        votedQuotes.push(slug);
        localStorage.setItem("cq_voted", JSON.stringify(votedQuotes));
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleUpvote}
      disabled={voted || loading}
      className={`flex items-center gap-1 text-sm font-mono transition-colors ${
        voted
          ? "text-accent-blue"
          : "text-text-secondary hover:text-accent-blue"
      } ${loading ? "opacity-50" : ""}`}
    >
      <span className={voted ? "text-accent-blue" : ""}>&#9650;</span>
      <span>{count}</span>
    </button>
  );
}
