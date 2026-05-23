"use client";

// Personal-agenda "save" store for the IAMA Meeting App.
//
// Design goal: work offline-first on day one, with zero backend required, and
// transparently upgrade to cloud sync the moment a Supabase user is present.
//
//   - Signed in  → mode "cloud": source of truth is `saved_agenda_items` in
//                  Supabase (RLS scopes rows to the user). Mirrored to
//                  localStorage so reads are instant on the next cold start.
//   - Signed out → mode "local": source of truth is localStorage on this
//                  device only.
//   - Supabase missing/misconfigured/erroring → silently fall back to "local".
//
// State lives in a single MODULE-LEVEL store wired to React via
// `useSyncExternalStore`. That means every <SaveButton> (and the My Agenda
// page) shares one Set and re-renders together — without requiring any provider
// in the layout. The key in the Set is just the itemId; agenda ids are globally
// unique across sessions + talks, so no prefixing is needed.

import { useCallback, useSyncExternalStore } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SavedItemType } from "@/lib/agenda/types";

const STORAGE_KEY = "iama_saved";
const TABLE = "saved_agenda_items";

type Mode = "cloud" | "local";

type StoreState = {
  /** Set of saved itemIds. */
  saved: Set<string>;
  /** Where writes go right now. */
  mode: Mode;
  /** True once the initial load (local read + optional cloud sync) settled. */
  ready: boolean;
  /** True when a Supabase user is present (mode is "cloud"). */
  signedIn: boolean;
};

// ---- module-level store + pub/sub -------------------------------------------

let state: StoreState = {
  saved: new Set<string>(),
  mode: "local",
  ready: false,
  signedIn: false,
};

const listeners = new Set<() => void>();

/** A stable snapshot reference; only replaced when state actually changes. */
let snapshot: StoreState = state;

function emit() {
  // Fresh object identity so useSyncExternalStore detects the change. The
  // `saved` Set is also re-created on every mutation for the same reason.
  snapshot = state;
  for (const l of listeners) l();
}

function setState(patch: Partial<StoreState>) {
  state = { ...state, ...patch };
  emit();
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): StoreState {
  return snapshot;
}

// Server render: a stable empty/loading snapshot so markup is deterministic and
// hydration never mismatches. The real load happens after mount.
const SERVER_SNAPSHOT: StoreState = {
  saved: new Set<string>(),
  mode: "local",
  ready: false,
  signedIn: false,
};
function getServerSnapshot(): StoreState {
  return SERVER_SNAPSHOT;
}

// ---- localStorage helpers (resilient; never throw) --------------------------

function readLocal(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((x): x is string => typeof x === "string"));
    }
  } catch {
    // Corrupt/blocked storage — treat as empty.
  }
  return new Set();
}

function writeLocal(saved: Set<string>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved]));
  } catch {
    // Quota/private-mode — best effort only.
  }
}

// ---- one-time async initialization ------------------------------------------

let initStarted = false;

/**
 * Load the initial Set. Runs exactly once for the lifetime of the page.
 *
 * 1. Read localStorage immediately so the UI is correct even with no network.
 * 2. Ask Supabase for a user. If none (or anything throws) we stay in local
 *    mode — the feature is fully functional offline.
 * 3. If a user exists, merge any local-only saves up to the cloud (local→cloud
 *    transition on first login), then adopt the cloud set as source of truth.
 */
function ensureInit() {
  if (initStarted || typeof window === "undefined") return;
  initStarted = true;

  // Step 1 — instant local hydrate.
  const local = readLocal();
  setState({ saved: new Set(local) });

  // Step 2/3 — best-effort cloud upgrade.
  void (async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser();

      if (userErr || !user) {
        // Stay local. We're ready.
        setState({ mode: "local", signedIn: false, ready: true });
        return;
      }

      // Pull this user's cloud rows.
      const { data: rows, error: selErr } = await supabase
        .from(TABLE)
        .select("item_id")
        .eq("user_id", user.id);

      if (selErr) {
        // Cloud unreachable — keep working locally.
        setState({ mode: "local", signedIn: false, ready: true });
        return;
      }

      const cloud = new Set<string>(
        (rows ?? [])
          .map((r) => (r as { item_id?: unknown }).item_id)
          .filter((x): x is string => typeof x === "string"),
      );

      // local→cloud merge: push up anything saved on this device that the
      // cloud doesn't have yet. Resilient: failures here don't block.
      const toUpload = [...local].filter((id) => !cloud.has(id));
      if (toUpload.length > 0) {
        try {
          const localTypes = readLocalTypes();
          const payload = toUpload.map((id) => ({
            user_id: user.id,
            item_id: id,
            // Best-effort type; default to "session" if unknown. Both pass the
            // CHECK constraint and the type is non-critical for the Set.
            item_type: localTypes[id] ?? "session",
          }));
          await supabase.from(TABLE).upsert(payload, { onConflict: "user_id,item_id" });
          for (const id of toUpload) cloud.add(id);
        } catch {
          // Ignore — we'll still adopt the cloud set we have.
        }
      }

      // Adopt cloud as source of truth and mirror locally.
      writeLocal(cloud);
      setState({
        saved: new Set(cloud),
        mode: "cloud",
        signedIn: true,
        ready: true,
      });
    } catch {
      // Supabase not configured / threw — fully fall back to local mode.
      setState({ mode: "local", signedIn: false, ready: true });
    }
  })();
}

// ---- per-item type memory (for cloud merge) ---------------------------------
//
// localStorage only stores the Set of ids. To populate item_type when merging
// local→cloud we keep a tiny companion map so a freshly-logged-in user's local
// saves land with the right type. This is best-effort and non-critical.

const TYPES_KEY = "iama_saved_types";

function readLocalTypes(): Record<string, SavedItemType> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(TYPES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, SavedItemType>;
    }
  } catch {
    // ignore
  }
  return {};
}

function writeLocalType(itemId: string, itemType: SavedItemType, remove = false) {
  if (typeof window === "undefined") return;
  try {
    const map = readLocalTypes();
    if (remove) delete map[itemId];
    else map[itemId] = itemType;
    window.localStorage.setItem(TYPES_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

// ---- mutation ---------------------------------------------------------------

/**
 * Toggle an item on/off. Optimistic: the Set updates (and the UI with it)
 * before any network call, and we never throw to the UI. On cloud-write failure
 * we keep the optimistic local state — the localStorage mirror means it isn't
 * lost, and it will reconcile on the next load.
 */
async function toggle(itemId: string, itemType: SavedItemType): Promise<void> {
  const currentlySaved = state.saved.has(itemId);
  const next = new Set(state.saved);
  if (currentlySaved) next.delete(itemId);
  else next.add(itemId);

  // Optimistic update + local mirror (always, regardless of mode).
  setState({ saved: next });
  writeLocal(next);
  writeLocalType(itemId, itemType, /* remove */ currentlySaved);

  if (state.mode !== "cloud") return;

  // Best-effort cloud persistence.
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return; // Lost session — local mirror still holds the change.

    if (currentlySaved) {
      await supabase
        .from(TABLE)
        .delete()
        .eq("user_id", user.id)
        .eq("item_id", itemId);
    } else {
      await supabase.from(TABLE).upsert(
        { user_id: user.id, item_id: itemId, item_type: itemType },
        { onConflict: "user_id,item_id" },
      );
    }
  } catch {
    // Network/Supabase error — optimistic + localStorage state is retained.
  }
}

// ---- public hook ------------------------------------------------------------

export type UseSavedItems = {
  saved: Set<string>;
  isSaved: (itemId: string) => boolean;
  toggle: (itemId: string, itemType: SavedItemType) => Promise<void>;
  mode: Mode;
  ready: boolean;
  signedIn: boolean;
};

export function useSavedItems(): UseSavedItems {
  // Kick off the singleton init on first use (idempotent).
  ensureInit();

  const snap = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isSaved = useCallback(
    (itemId: string) => snap.saved.has(itemId),
    [snap.saved],
  );

  return {
    saved: snap.saved,
    isSaved,
    toggle,
    mode: snap.mode,
    ready: snap.ready,
    signedIn: snap.signedIn,
  };
}
