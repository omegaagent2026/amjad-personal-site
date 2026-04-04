import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import type { Post } from '@/types/blog'

export const revalidate = 60

async function getPost(slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  return data as Post | null
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-8">
        <div className="flex gap-2 mb-3">
          {post.type === 'video' && (
            <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">Video</span>
          )}
          {post.tags?.map(tag => (
            <span key={tag} className="bg-stone-100 text-stone-600 text-xs px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-stone-900 mb-3">{post.title}</h1>
        <time className="text-stone-400 text-sm">
          {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>
      </div>

      {post.type === 'video' && post.video_url && (
        <div className="mb-8 aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={post.video_url.replace('watch?v=', 'embed/')}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )}

      <div className="prose prose-stone max-w-none">
        {post.content?.split('\n').map((line, i) => (
          <p key={i} className="mb-4 text-stone-700 leading-relaxed">{line}</p>
        ))}
      </div>
    </main>
  )
}
