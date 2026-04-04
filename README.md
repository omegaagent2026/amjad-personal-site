# Amjad Chaudhry — Personal Website

Personal website and blog for Amjad Chaudhry: engineer, educator, and traveler.

## Stack

- **Frontend**: Next.js 14 (App Router)
- **Database/Auth**: Supabase (free tier)
- **Styling**: Tailwind CSS
- **Hosting**: To be configured (domain integration with TaskFlow Omega dashboard)

## Features Planned

- [ ] Landing / hero page
- [ ] About section (engineer, educator, traveler)
- [ ] Blog section — publish essays and videos
- [ ] Omega Dashboard integration (hosted at this domain)

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

## Tech Choices

- **Next.js**: Full-stack React with SSR/SSG and API routes — free on Vercel
- **Supabase**: Free tier PostgreSQL + auth + storage — perfect for blog posts and media
- **Tailwind**: Utility-first CSS, no component library lock-in

## Structure

```
src/
  app/          # Next.js App Router pages
  components/   # Reusable UI components
public/         # Static assets
```
