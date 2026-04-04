import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import type { Post } from '@/types/blog'

export const revalidate = 60 // ISR: revalidate every 60s

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
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-stone-900 mb-2">Blog</h1>
      <p className="text-stone-500 mb-10">Essays and videos on technology, education, and travel.</p>

      {posts.length === 0 ? (
        <p className="text-stone-400 italic">No posts yet — connect your Supabase DB to publish.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="border-b border-stone-100 pb-8">
              <div className="flex items-center gap-2 mb-2">
                {post.type === 'video' && (
                  <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">Video</span>
                )}
                {post.tags?.map(tag => (
                  <span key={tag} className="bg-stone-100 text-stone-600 text-xs px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-xl font-semibold text-stone-900 group-hover:text-green-700 transition mb-1">{post.title}</h2>
              </Link>
              <p className="text-stone-600 text-sm mb-2">{post.excerpt}</p>
              <time className="text-stone-400 text-xs">
                {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
