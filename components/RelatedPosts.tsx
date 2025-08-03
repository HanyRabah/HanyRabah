import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { Calendar, Clock, Tag } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  tags: string[]
  createdAt: Date
  publishedAt: Date | null
}

interface RelatedPostsProps {
  posts: Post[]
  currentPostId: string
}

// Function to generate a placeholder image URL
function generatePlaceholderImage(title: string, tags: string[]): string {
  const primaryTag = tags[0] || 'blog'
  const encodedTitle = encodeURIComponent(title)
  
  // Using a service like Unsplash or a custom image generation service
  // For now, we'll use a gradient-based placeholder
  const colors = {
    react: '61DAFB,20232A',
    typescript: '3178C6,FFFFFF', 
    nextjs: '000000,FFFFFF',
    javascript: 'F7DF1E,000000',
    nodejs: '339933,FFFFFF',
    default: '14B8A6,0D9488'
  }
  
  const colorScheme = colors[primaryTag.toLowerCase() as keyof typeof colors] || colors.default
  
  return `https://via.placeholder.com/600x300/${colorScheme.replace(',', '/')}/FFFFFF?text=${encodedTitle}`
}

export function RelatedPosts({ posts, currentPostId }: RelatedPostsProps) {
  // Filter out current post and limit to 3 related posts
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 pt-16 border-t border-border/40">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          More Articles
        </h2>
        <p className="text-muted-foreground">
          Continue reading with these related posts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => {
          // Calculate reading time
          const wordCount = post.excerpt ? post.excerpt.split(/\s+/).length : 100
          const readingTime = Math.ceil(wordCount / 200)
          
          // Generate image if none exists
          const imageUrl = post.coverImage || generatePlaceholderImage(post.title, post.tags)

          return (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-video overflow-hidden rounded-t-lg bg-muted">
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardContent className="p-6">
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-theme-primary transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <time dateTime={post.publishedAt?.toISOString() || post.createdAt.toISOString()}>
                        {formatDate(post.publishedAt || post.createdAt)}
                      </time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{readingTime} min</span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
