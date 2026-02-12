export function generateSlug(text: string): string {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6)
    .join("-");

  const suffix = Math.random().toString(36).substring(2, 6);
  return `${words}-${suffix}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + "...";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatModel(model: string | null): string {
  if (!model) return "Claude";
  return model
    .replace("claude-", "Claude ")
    .replace(/-/g, " ")
    .replace(/(\d)/g, " $1")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}
