import Link from "next/link";

export function CategoryPill({
  name,
  slug,
  color,
  active,
}: {
  name: string;
  slug: string;
  color: string;
  active?: boolean;
}) {
  return (
    <Link
      href={slug === "all" ? "/" : `/category/${slug}`}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-mono border transition-all ${
        active
          ? "border-transparent text-bg-primary"
          : "border-border text-text-secondary hover:text-text-primary hover:border-text-tertiary"
      }`}
      style={active ? { backgroundColor: color, borderColor: color } : {}}
    >
      {name}
    </Link>
  );
}
