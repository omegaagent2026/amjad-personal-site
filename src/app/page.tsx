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
    <main className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-stone-200 px-6 py-4 flex justify-between items-center">
        <span className="text-xl font-bold text-stone-900">Amjad Chaudhry</span>
        <div className="flex items-center gap-6">
          <Link href="/blog" className="text-stone-600 hover:text-stone-900 text-sm transition">Blog</Link>
          <Link href="#about" className="text-stone-600 hover:text-stone-900 text-sm transition">About</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold text-stone-900 mb-4 leading-tight">
          Amjad<br/>Chaudhry
        </h1>
        <p className="text-xl text-stone-500 mb-8">Engineer · Educator · Traveler</p>
        <Link href="/blog" className="bg-stone-900 text-white px-6 py-3 rounded-lg hover:bg-stone-700 transition text-sm font-medium">
          Read my writing →
        </Link>
      </section>

      {/* About */}
      <section id="about" className="border-t border-stone-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">About</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '💻', title: 'Engineer', desc: 'Building technology that solves real problems.' },
              { icon: '📚', title: 'Educator', desc: 'Sharing knowledge through writing and teaching.' },
              { icon: '✈️', title: 'Traveler', desc: 'Exploring the world, one trip at a time.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-6 bg-stone-50 rounded-xl">
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-stone-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="border-t border-stone-100 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-stone-900">Recent Writing</h2>
            <Link href="/blog" className="text-stone-500 hover:text-stone-900 text-sm transition">All posts →</Link>
          </div>
          {recentPosts.length === 0 ? (
            <p className="text-stone-400 italic text-sm">Posts will appear here once Supabase is connected.</p>
          ) : (
            <div className="space-y-6">
              {recentPosts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-stone-900 group-hover:text-green-700 transition">{post.title}</h3>
                      <p className="text-stone-500 text-sm mt-1">{post.excerpt}</p>
                    </div>
                    <time className="text-stone-400 text-xs ml-6 shrink-0">
                      {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
