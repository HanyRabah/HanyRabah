import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import { Calendar, Clock, Tag, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RelatedPosts } from '@/components/RelatedPosts'
import { StructuredData } from '@/components/StructuredData'

// Disable static generation until database is set up
export const dynamic = 'force-dynamic'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
  })

  if (!post) {
    return {
      title: 'Post Not Found - Hany Rabah Blog',
      description: 'The requested blog post could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  // Generate cover image if none exists
  const coverImageUrl = post.coverImage || generatePostImage(post.title, post.tags)
  
  // Calculate reading time
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)
  
  // Create rich description
  const description = post.excerpt || 
    post.content.replace(/<[^>]*>/g, '').substring(0, 155) + '...'
  
  // Format publish date
  const publishDate = post.publishedAt || post.createdAt
  const formattedDate = publishDate.toISOString()

  return {
    title: `${post.title} - Hany Rabah Blog`,
    description,
    keywords: [
      ...post.tags,
      'Hany Rabah',
      'Technical Blog',
      'Web Development',
      'Software Engineering',
      'Programming Tutorial',
      'Code Examples',
      'Best Practices'
    ],
    authors: [{ name: 'Hany Rabah', url: 'https://hanyrabah.com' }],
    creator: 'Hany Rabah',
    publisher: 'Hany Rabah',
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      locale: 'en_US',
      url: `https://hanyrabah.com/blog/${post.slug}`,
      siteName: 'Hany Rabah Blog',
      publishedTime: formattedDate,
      modifiedTime: post.updatedAt.toISOString(),
      authors: ['Hany Rabah'],
      tags: post.tags,
      images: [
        {
          url: coverImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [coverImageUrl],
      creator: '@hanyrabah',
    },
    alternates: {
      canonical: `https://hanyrabah.com/blog/${post.slug}`,
    },
    category: 'technology',
    other: {
      'article:author': 'Hany Rabah',
      'article:published_time': formattedDate,
      'article:modified_time': post.updatedAt.toISOString(),
      'article:section': 'Technology',
      'article:tag': post.tags.join(','),
      'twitter:label1': 'Reading time',
      'twitter:data1': `${readingTime} min read`,
      'twitter:label2': 'Published',
      'twitter:data2': publishDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    },
  }
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    })

    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    // Return empty array if database is not set up yet
    console.warn('Database not available during build, skipping static generation for blog posts')
    return []
  }
}

// Function to generate a placeholder image URL for posts without cover images
function generatePostImage(title: string, tags: string[]): string {
  const primaryTag = tags[0] || 'blog'
  const encodedTitle = encodeURIComponent(title.substring(0, 50))
  
  // Color schemes for different tags
  const colorSchemes = {
    react: { bg: '61DAFB', text: '20232A' },
    typescript: { bg: '3178C6', text: 'FFFFFF' },
    nextjs: { bg: '000000', text: 'FFFFFF' },
    javascript: { bg: 'F7DF1E', text: '000000' },
    nodejs: { bg: '339933', text: 'FFFFFF' },
    css: { bg: '1572B6', text: 'FFFFFF' },
    html: { bg: 'E34F26', text: 'FFFFFF' },
    default: { bg: '14B8A6', text: 'FFFFFF' }
  }
  
  const scheme = colorSchemes[primaryTag.toLowerCase() as keyof typeof colorSchemes] || colorSchemes.default
  
  return `https://via.placeholder.com/800x400/${scheme.bg}/${scheme.text}?text=${encodedTitle}`
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const [post, relatedPosts] = await Promise.all([
    prisma.post.findUnique({
      where: { slug: params.slug, published: true },
    }),
    prisma.post.findMany({
      where: { 
        published: true,
        slug: { not: params.slug }
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        tags: true,
        createdAt: true,
        publishedAt: true,
      },
      orderBy: { publishedAt: 'desc' },
      take: 6
    })
  ])

  if (!post) {
    notFound()
  }

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  // Generate cover image if none exists
  const coverImageUrl = post.coverImage || generatePostImage(post.title, post.tags)

  // Structured data for SEO
  const structuredData = {
    title: post.title,
    description: post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 155) + '...',
    image: coverImageUrl,
    author: {
      name: 'Hany Rabah',
      url: 'https://hanyrabah.com'
    },
    datePublished: (post.publishedAt || post.createdAt).toISOString(),
    dateModified: post.updatedAt.toISOString(),
    url: `https://hanyrabah.com/blog/${post.slug}`,
    keywords: post.tags,
    wordCount,
    readingTime
  }

  return (
    <div className="min-h-screen bg-background mt-24">
      <StructuredData type="Article" data={structuredData} />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              {post.excerpt}
            </p>
          )}

          {/* Meta information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt?.toISOString() || post.createdAt.toISOString()}>
                {formatDate(post.publishedAt || post.createdAt)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Cover Image */}
          <div className="relative aspect-video mb-12 rounded-xl overflow-hidden bg-muted">
            <Image
              src={coverImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} currentPostId={post.id} />
      </article>

    </div>
  )
}
