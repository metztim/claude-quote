"use client";

import { CATEGORIES } from "@/lib/constants";
import { CategoryPill } from "./CategoryPill";
import { SortOption } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

export function FilterBar({
  activeCategory,
  activeSort = "top",
}: {
  activeCategory?: string;
  activeSort?: SortOption;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSortChange(sort: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    const category = activeCategory;
    if (category) {
      router.push(`/category/${category}?${params.toString()}`);
    } else {
      router.push(`/?${params.toString()}`);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        <CategoryPill
          name="All"
          slug="all"
          color="#58A6FF"
          active={!activeCategory}
        />
        {CATEGORIES.map((cat) => (
          <CategoryPill
            key={cat.slug}
            name={cat.name}
            slug={cat.slug}
            color={cat.color}
            active={activeCategory === cat.slug}
          />
        ))}
      </div>

      <select
        value={activeSort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="bg-bg-secondary border border-border rounded px-3 py-1.5 text-sm font-mono text-text-secondary cursor-pointer focus:outline-none focus:border-accent-blue"
      >
        <option value="newest">Newest</option>
        <option value="top">Most upvoted</option>
      </select>
    </div>
  );
}
