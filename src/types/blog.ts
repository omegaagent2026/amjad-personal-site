export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  type: 'essay' | 'video'
  video_url?: string
  published_at: string
  created_at: string
  tags: string[]
}
