"use client";

import { VerificationStatus } from "@/lib/types";
import { useState } from "react";

const CONFIG: Record<
  VerificationStatus,
  { label: string; color: string; icon: string }
> = {
  verified_organic: {
    label: "Verified organic",
    color: "text-accent-green",
    icon: "\u2713",
  },
  likely_organic: {
    label: "Likely organic",
    color: "text-green-400/70",
    icon: "\u2713",
  },
  possibly_prompted: {
    label: "Possibly prompted",
    color: "text-yellow-400/70",
    icon: "?",
  },
  unverified: {
    label: "Unverified",
    color: "text-text-tertiary",
    icon: "\u2014",
  },
};

export function VerificationBadge({
  status,
  notes,
}: {
  status: VerificationStatus;
  notes?: string | null;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = CONFIG[status];

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className={`text-xs font-mono ${config.color} flex items-center gap-1`}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </button>
      {showTooltip && notes && (
        <div className="absolute bottom-full left-0 mb-2 p-2 bg-bg-tertiary border border-border rounded text-xs text-text-secondary max-w-64 z-10 whitespace-normal">
          {notes}
        </div>
      )}
    </div>
  );
}
