"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _sb: SupabaseClient | null = null;

export function getSupabaseBrowser(): SupabaseClient {
  if (typeof window === "undefined") {
    // Prevent accidental server usage during prerender/SSR
    throw new Error("getSupabaseBrowser() called on the server");
  }

  if (_sb) return _sb;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    throw new Error("Supabase env vars are missing in the client runtime.");
  }

  _sb = createClient(url, anon, {
    auth: {
      storageKey: "ttk-public-auth",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });
  return _sb;
}
