Mind How You Go — Website

A Next.js 13+ App Router site for a BABCP-accredited CBT therapy service in Bristol.
Fast, accessible, SEO-friendly, and deployable to Vercel or Docker.

✨ Features

Next.js App Router (/src/app) with Server/Client component split

TypeScript + Tailwind CSS

Supabase (DB + Edge Functions) with a public client for forms

Contact form with react-hook-form → Stores in Supabase → triggers Edge Function to create a calendar event

SEO ready via Next.js Metadata API (static page metadata + global defaults)

Accessible UI: keyboard-navigable services tabs & reduced-motion support

Docker & docker compose for containerized local/prod runs

🧱 Tech Stack

Framework: Next.js 13+ (App Router, ISR)

Language: TypeScript

Styling: Tailwind CSS

Data: Supabase (Postgres, Edge Functions)

Forms: react-hook-form

Animation: Framer Motion

Auth Helpers: @supabase/auth-helpers-react (context provider)

Build/Run: Node 18+, Docker (optional) npm run dev
