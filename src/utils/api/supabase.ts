import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../../database.types";

export function getSupabaseServer() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
	const key =
		process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
	return createClient<Database>(url, key, { auth: { persistSession: false } });
}