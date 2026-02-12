import { createServerClient } from "@/lib/supabase/server";
import { SEED_REMOVAL_THRESHOLD } from "@/lib/constants";

export async function shouldShowSeedContent(): Promise<boolean> {
  const supabase = createServerClient();
  const { count } = await supabase
    .from("quotes")
    .select("id", { count: "exact", head: true })
    .eq("status", "approved")
    .eq("is_seed", false);

  return (count || 0) < SEED_REMOVAL_THRESHOLD;
}
