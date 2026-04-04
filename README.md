# Amjad Chaudhry — Personal Website

Personal website and blog for Amjad Chaudhry: engineer, educator, traveler.

## Stack

- **Frontend + Hosting**: Next.js 14 (App Router) → Vercel (free tier)
- **Database**: Supabase (free tier) — posts table with RLS
- **Styling**: Tailwind CSS

## Features

- Landing page (hero, about, recent posts)
- Blog listing (essays + videos, fetched from Supabase)
- Individual post pages with ISR (60s revalidation)
- Video post support (YouTube embed)
- Tag support

## Setup

### 1. Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase-schema.sql`
3. Copy your **Project URL** and **anon public key** from Settings → API

### 2. Local dev

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase URL and anon key
npm run dev
```

### 3. Deploy to Vercel

1. Push to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) → New Project → Import `amjad-personal-site`
3. Add env vars: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy → connect your domain in Vercel settings

## Publishing a Post

Insert a row into the `posts` table in Supabase:
- Set `published = true` and `published_at = now()`
- For videos: set `type = 'video'` and `video_url = 'https://youtube.com/watch?v=...'`
