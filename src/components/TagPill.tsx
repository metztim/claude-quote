import Link from "next/link";

export function TagPill({ name, slug }: { name: string; slug: string }) {
  return (
    <Link
      href={`/?tag=${slug}`}
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono text-accent-purple border border-accent-purple/30 hover:border-accent-purple/60 transition-colors"
    >
      {name}
    </Link>
  );
}
