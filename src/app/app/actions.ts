"use server";

// Server-side helpers for the personal agenda.
//
// The client hook (use-saved-items.ts) talks to Supabase directly via the
// browser client, so these are a convenience for Server Components / future
// callers — e.g. server-rendering a user's saved set. Every function is
// auth-scoped and returns safe, narrow shapes; if Supabase is unconfigured or
// no user is present they degrade to a no-op ([] / false) rather than throwing.

import { createClient } from "@/lib/supabase/server";
import type { SavedItemType } from "@/lib/agenda/types";

const TABLE = "saved_agenda_items";

export type SavedRow = { item_id: string; item_type: string };

/**
 * The current user's saved items. Returns [] when signed out or on any error
 * (so it's always safe to call and never throws to a Server Component).
 */
export async function getSavedItemsForUser(): Promise<SavedRow[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from(TABLE)
      .select("item_id, item_type")
      .eq("user_id", user.id);

    if (error || !data) return [];
    return data
      .filter(
        (r): r is SavedRow =>
          typeof (r as SavedRow).item_id === "string" &&
          typeof (r as SavedRow).item_type === "string",
      )
      .map((r) => ({ item_id: r.item_id, item_type: r.item_type }));
  } catch {
    return [];
  }
}

/**
 * Persist one saved item for the current user. Returns true on success.
 * Bonus action — the browser client handles this in the hook; kept correct and
 * unused-safe (RLS still scopes the row to the authenticated user).
 */
export async function saveItem(
  itemId: string,
  itemType: SavedItemType,
): Promise<boolean> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from(TABLE)
      .upsert(
        { user_id: user.id, item_id: itemId, item_type: itemType },
        { onConflict: "user_id,item_id" },
      );
    return !error;
  } catch {
    return false;
  }
}

/**
 * Remove one saved item for the current user. Returns true on success.
 */
export async function unsaveItem(itemId: string): Promise<boolean> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from(TABLE)
      .delete()
      .eq("user_id", user.id)
      .eq("item_id", itemId);
    return !error;
  } catch {
    return false;
  }
}
