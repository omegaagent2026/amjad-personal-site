import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Post } from '@/types/blog'

export const revalidate = 60

async function getRecentPosts(): Promise<Post[]> {
  const { data } = await supabase
    .from('posts')
    .select('id,title,slug,excerpt,type,published_at,tags')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(3)
  return (data as Post[]) ?? []
}

export default async function Home() {
  const recentPosts = await getRecentPosts()

  return (
    <main className="min-h-screen bg-[#0f0f11] text-white">

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0f0f11]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif text-lg font-semibold tracking-tight">AC</span>
          <div className="flex items-center gap-8 text-sm text-white/60">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
            <Link href="#contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 text-xs text-violet-400 bg-violet-400/10 border border-violet-400/20 rounded-full px-3 py-1 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Engineer · Educator · Traveler
          </div>
          <h1 className="font-serif text-6xl md:text-8xl font-bold leading-[1.05] mb-6 gradient-text">
            Amjad<br />Chaudhry
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
            Building technology that matters. Writing about ideas worth sharing.
            Exploring the world one mile at a time.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Read the blog →
            </Link>
            <Link
              href="#about"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-violet-400 text-xs uppercase tracking-widest font-medium mb-3">About</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">A few things I care about</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: '⚡',
                title: 'Engineering',
                desc: 'Building software systems that are fast, reliable, and actually useful. I love the intersection of clean architecture and real-world impact.',
              },
              {
                icon: '📖',
                title: 'Education',
                desc: 'Teaching demystifies the world. I write and create videos to break down complex ideas into things anyone can understand.',
              },
              {
                icon: '🗺️',
                title: 'Travel',
                desc: "There's no better way to challenge your assumptions than to show up somewhere you've never been. Trying to see it all.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group relative rounded-2xl border border-white/8 bg-white/[0.03] p-7 card-glow transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Writing ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-violet-400 text-xs uppercase tracking-widest font-medium mb-3">Writing</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Recent essays &amp; videos</h2>
            </div>
            <Link href="/blog" className="text-white/40 hover:text-white text-sm transition-colors hidden md:block">
              All posts →
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-10 text-center">
              <p className="text-white/30 text-sm">Posts will appear here once Supabase is connected.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-6 card-glow transition-all duration-300 hover:bg-white/[0.05]"
                >
                  {post.type === 'video' && (
                    <span className="self-start mb-3 bg-red-500/15 text-red-400 text-xs font-medium px-2.5 py-1 rounded-full border border-red-400/20">
                      ▶ Video
                    </span>
                  )}
                  <h3 className="font-semibold text-white group-hover:text-violet-300 transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                  <time className="text-white/25 text-xs">
                    {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-6 md:hidden">
            <Link href="/blog" className="text-white/40 hover:text-white text-sm transition-colors">All posts →</Link>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-10 md:p-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Let&apos;s connect</h2>
            <p className="text-white/50 max-w-md mx-auto mb-8">
              Whether you want to discuss an idea, collaborate on a project, or just say hello — my inbox is open.
            </p>
            <a
              href="mailto:hello@amjadchaudhry.com"
              className="inline-flex items-center gap-2 bg-white text-[#0f0f11] px-6 py-3 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Say hello →
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-serif text-white/30 text-sm">Amjad Chaudhry</span>
          <p className="text-white/20 text-xs">© {new Date().getFullYear()} · Built with Next.js &amp; Supabase</p>
        </div>
      </footer>
    </main>
  )
}
