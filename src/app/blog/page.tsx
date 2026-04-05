import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import type { Post } from '@/types/blog'

export const revalidate = 60

async function getPosts(): Promise<Post[]> {
  const { data } = await supabase
    .from('posts')
    .select('id,title,slug,excerpt,type,video_url,published_at,tags')
    .eq('published', true)
    .order('published_at', { ascending: false })
  return (data as Post[]) ?? []
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-[#0f0f11] text-white">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0f0f11]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif text-lg font-semibold tracking-tight">AC</Link>
          <div className="flex items-center gap-8 text-sm text-white/60">
            <Link href="/blog" className="text-white transition-colors">Blog</Link>
            <Link href="/#about" className="hover:text-white transition-colors">About</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-36 pb-24">
        <div className="mb-16">
          <p className="text-violet-400 text-xs uppercase tracking-widest font-medium mb-3">Writing</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-white/40 text-lg max-w-xl">
            Essays and videos on technology, education, and the world.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-16 text-center">
            <p className="text-white/30 text-sm">No posts yet — connect your Supabase DB to publish.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] px-6 py-5 card-glow transition-all duration-300 hover:bg-white/[0.05]"
              >
                <div className="flex items-start gap-4">
                  {post.type === 'video' && (
                    <span className="shrink-0 mt-0.5 bg-red-500/15 text-red-400 text-xs font-medium px-2.5 py-1 rounded-full border border-red-400/20">
                      ▶ Video
                    </span>
                  )}
                  <div>
                    <h2 className="font-semibold text-white group-hover:text-violet-300 transition-colors mb-1">
                      {post.title}
                    </h2>
                    <p className="text-white/40 text-sm leading-relaxed">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags?.map(tag => (
                        <span key={tag} className="bg-white/5 text-white/40 text-xs px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <time className="text-white/25 text-xs shrink-0">
                  {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
