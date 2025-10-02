import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { google } from "npm:googleapis@latest";

// Entry point for the Edge Function
serve(async (req: Request) => {
  // Set CORS headers
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*", // Allow all origins (or specify your frontend URL, e.g., "http://localhost:3000")
    "Access-Control-Allow-Methods": "POST, OPTIONS", // Allow POST and OPTIONS requests
    "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow these headers
  });

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  try {
    // 1. Check if the request method is POST
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Only POST allowed" }), {
        status: 405,
        headers,
      });
    }

    // 2. Parse the incoming request payload
    const payload = await req.json();
    console.log("Edge function payload:", payload);

    // 3. Validate the payload
    if (payload.type !== "INSERT" || payload.table !== "contacts") {
      throw new Error("Invalid payload type or table. Expected INSERT on contacts.");
    }
    const contact = payload.record;

    // 4. Read Google service account credentials from environment variables
    const serviceAccount = JSON.parse(Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON")!);
    console.log("Private Key:", serviceAccount.private_key);

    if (!serviceAccount.client_email || !serviceAccount.private_key) {
      throw new Error("Missing client_email or private_key in service account JSON");
    }

    // 5. Authenticate with Google Calendar API using JWT
    const auth = new google.auth.JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ["https://www.googleapis.com/auth/calendar.events"],
    });

    // 6. Initialize the Calendar API
    const calendar = google.calendar({ version: "v3", auth });

    // 7. Build the calendar event
    const event = {
      summary: `New Contact: ${contact.contact_name}`, // Include the contact's name in the summary
      description: `
        Email: ${contact.contact_email}
        Phone: ${contact.contact_phone}
        Message: ${contact.contact_message}
      `, // Include all contact details in the description
      start: {
        dateTime: new Date().toISOString(), // Start now
        timeZone: "UTC", // Use UTC time zone (or update to a specific time zone if needed)
      },
      end: {
        dateTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour later
        timeZone: "UTC", // Use UTC time zone (or update to a specific time zone if needed)
      },
      reminders: { useDefault: true }, // Use default reminders
    };

    // 8. Insert the event into the calendar
    const calendarId = "bfb5595179ae458d42a50a2ac2ff8d5917c544d06994ae86b66256efb6f7f5fc@group.calendar.google.com";
    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });

    console.log("Calendar event created:", response.data.htmlLink);

    // 9. Return a success response with CORS headers
    return new Response(
      JSON.stringify({ success: true, event: response.data }),
      { status: 200, headers }
    );
  } catch (error: unknown) {
    console.error("Error in createCalendarEntry function:", error);
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 400, headers }
    );
  }
});