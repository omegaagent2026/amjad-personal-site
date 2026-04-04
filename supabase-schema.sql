-- Run this in your Supabase SQL editor

create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  type text check (type in ('essay', 'video')) default 'essay',
  video_url text,
  published boolean default false,
  published_at timestamptz,
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Public can read published posts
create policy "Public can read published posts" on posts
  for select using (published = true);

-- Seed with a sample post
insert into posts (title, slug, excerpt, content, type, published, published_at, tags)
values (
  'Welcome to my blog',
  'welcome',
  'First post — introducing my writing on technology, education, and travel.',
  '# Welcome

This is the beginning of my writing here. Expect essays on technology, reflections on education, and stories from the road.',
  'essay',
  true,
  now(),
  array['intro', 'technology']
);
