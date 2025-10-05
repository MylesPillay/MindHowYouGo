import { NextResponse } from "next/server";

export async function GET() {
  const needed = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "GOOGLE_CALENDAR_SECRET_ADDRESS",
  ];
  const missing = needed.filter((k) => !process.env[k] || process.env[k] === "");
  return NextResponse.json({ ok: missing.length === 0, missing });
}