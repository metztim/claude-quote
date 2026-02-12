export interface Quote {
  id: string;
  slug: string;
  quote_text: string;
  context_snippet: string | null;
  category: string;
  model: string | null;
  submitter_id: string;
  submitter_name: string | null;
  verification_status: VerificationStatus;
  verification_notes: string | null;
  upvote_count: number;
  is_seed: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface TagWithCount extends Tag {
  count: number;
}

export type VerificationStatus =
  | "verified_organic"
  | "likely_organic"
  | "possibly_prompted"
  | "unverified";

export type CategorySlug =
  | "funny"
  | "profound"
  | "philosophical"
  | "weird"
  | "technical"
  | "wholesome"
  | "savage"
  | "meta";

export interface Category {
  name: string;
  slug: CategorySlug;
  description: string;
  color: string;
}

export interface QuoteSubmission {
  quote_text: string;
  context_snippet?: string;
  category: string;
  tags: string[];
  model?: string;
  submitter_id: string;
  submitter_name?: string;
  verification_status: VerificationStatus;
  verification_notes?: string;
}

export type SortOption = "newest" | "top";
