import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "npm:googleapis@108";

serve(async (req: Request) => {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json",
  });

  if (req.method === "OPTIONS") return new Response(null, { headers });

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Only POST allowed" }), {
        status: 405,
        headers,
      });
    }

    // Expect Supabase DB Webhook payload
    const payload = await req.json();
    if (payload?.type !== "INSERT" || payload?.table !== "contacts" || !payload?.record) {
      return new Response(JSON.stringify({ error: "Expected INSERT on contacts" }), {
        status: 400,
        headers,
      });
    }
    const contact = payload.record;

    // Load service account (RAW JSON recommended)
    const raw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
    if (!raw) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON");
    let sa: any;
    try {
      sa = JSON.parse(raw);
    } catch {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON");
    }
    if (!sa.client_email || !sa.private_key) {
      throw new Error("Service account JSON missing client_email/private_key");
    }

    const auth = new google.auth.JWT({
      email: sa.client_email,
      key: sa.private_key,
      scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });
    const calendar = google.calendar({ version: "v3", auth });

    // Build event (15 min)
    const start = new Date();
    const end = new Date(start.getTime() + 15 * 60 * 1000);
    const event = {
      summary: `New Contact: ${contact.contact_name ?? "Unknown"}`,
      description:
        `Email: ${contact.contact_email ?? "-"}\n` +
        `Phone: ${contact.contact_phone ?? "-"}\n` +
        `Message: ${contact.contact_message ?? "-"}`,
      start: { dateTime: start.toISOString(), timeZone: "UTC" },
      end:   { dateTime: end.toISOString(),   timeZone: "UTC" },
      reminders: { useDefault: true },
    };

    const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID") ?? "primary";

    // Insert event; surface Google errors
    let resp;
    try {
      resp = await calendar.events.insert({ calendarId, requestBody: event });
    } catch (err: any) {
      const gerr = err?.response?.data || err?.message || String(err);
      console.error("Google API error:", gerr);
      return new Response(JSON.stringify({ success: false, step: "events.insert", error: gerr }), {
        status: 400,
        headers,
      });
    }

    return new Response(JSON.stringify({ success: true, event: resp.data }), {
      status: 200,
      headers,
    });
  } catch (e: any) {
    console.error("Handler error:", e?.message ?? String(e));
    return new Response(JSON.stringify({ success: false, error: e?.message ?? String(e) }), {
      status: 400,
      headers,
    });
  }
});
