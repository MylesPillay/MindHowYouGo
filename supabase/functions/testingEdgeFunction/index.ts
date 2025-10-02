import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
 const { body } = await req.json()
 const data = {
  message: `This is the body of the request: ${body}`,
 }

 return new Response(JSON.stringify(data), {
  headers: {
   "Content-Type": "application/json"
  }
 },
 )
})
