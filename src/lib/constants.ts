import { Category, CategorySlug } from "./types";

export const CATEGORIES: Category[] = [
  {
    name: "Funny",
    slug: "funny",
    description: "Humor, absurdity, unexpected comedy",
    color: "#F0883E",
  },
  {
    name: "Profound",
    slug: "profound",
    description: "Deep insights and wisdom",
    color: "#58A6FF",
  },
  {
    name: "Philosophical",
    slug: "philosophical",
    description: "Existential musings and meta-commentary",
    color: "#BC8CFF",
  },
  {
    name: "Weird",
    slug: "weird",
    description: "Surreal, uncanny valley moments",
    color: "#F778BA",
  },
  {
    name: "Technical",
    slug: "technical",
    description: "Brilliant technical explanations",
    color: "#39D353",
  },
  {
    name: "Wholesome",
    slug: "wholesome",
    description: "Kind, supportive, touching responses",
    color: "#FDCC55",
  },
  {
    name: "Savage",
    slug: "savage",
    description: "Burns, roasts, brutal honesty",
    color: "#FF7B72",
  },
  {
    name: "Meta",
    slug: "meta",
    description: "Claude talking about itself",
    color: "#79C0FF",
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
) as Record<CategorySlug, Category>;

export const VALID_CATEGORIES: string[] = CATEGORIES.map((c) => c.slug);

export const SEED_REMOVAL_THRESHOLD = 25;

export const SITE_NAME = "ClaudeQuote";
export const SITE_URL = "https://claudequote.com";
export const SITE_DESCRIPTION =
  "Things Claude said while vibing. Submitted by humans from real Claude Code chats, with built-in authenticity verification.";
