"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

declare global {
  var __supabase__: SupabaseClient | undefined;
}

export function getSupabaseBrowser(): SupabaseClient {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowser() called on the server");
  }

  if (globalThis.__supabase__) return globalThis.__supabase__;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!url || !anon) {
    throw new Error("Supabase env vars are missing in the client runtime.");
  }

  const client = createClient(url, anon, {
    auth: {
      storageKey: "ttk-public-auth",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });

  globalThis.__supabase__ = client;
  return client;
}
