import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { StructuredData } from '@/components/StructuredData'

// Disable static generation until database is set up
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog - Hany Rabah | Technical Insights & Web Development Tutorials',
  description: 'Technical blog by Hany Rabah, Senior Fullstack Engineer. Deep dives into React, Next.js, TypeScript, Node.js, AWS, and modern web development practices. Learn from 15+ years of industry experience.',
  keywords: [
    'Hany Rabah Blog',
    'Technical Blog',
    'Web Development Tutorials',
    'React Tutorials',
    'Next.js Guide',
    'TypeScript Tips',
    'Node.js Best Practices',
    'AWS Tutorials',
    'JavaScript Advanced',
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Software Engineering',
    'Technical Leadership',
    'Code Quality',
    'Performance Optimization',
    'Scalable Applications',
    'Developer Experience'
  ],
  openGraph: {
    title: 'Technical Blog - Hany Rabah',
    description: 'Technical insights, tutorials, and best practices from a Senior Fullstack Engineer with 15+ years of experience in React, Next.js, Node.js, and AWS.',
    type: 'website',
    locale: 'en_US',
    url: 'https://hanyrabah.com/blog',
    siteName: 'Hany Rabah Portfolio',
    images: [
      {
        url: '/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Hany Rabah Technical Blog - Web Development Insights',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Blog - Hany Rabah',
    description: 'Technical insights and tutorials from a Senior Fullstack Engineer. React, Next.js, TypeScript, and more.',
    images: ['/og-blog.jpg'],
    creator: '@hanyrabah',
  },
  alternates: {
    canonical: 'https://hanyrabah.com/blog',
    types: {
      'application/rss+xml': 'https://hanyrabah.com/blog/rss.xml',
    },
  },
  category: 'technology',
}

export default async function BlogPage() {
  let posts: any[] = []
  
  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    })
  } catch (error) {
    console.warn('Database not available, showing empty blog page')
  }

  // Structured data for SEO
  const blogData = {
    name: 'Hany Rabah Technical Blog',
    description: 'Technical insights, tutorials, and best practices from a Senior Fullstack Engineer with 15+ years of experience.',
    url: 'https://hanyrabah.com/blog',
    author: {
      name: 'Hany Rabah',
      url: 'https://hanyrabah.com'
    },
    posts: posts.map(post => ({
      title: post.title,
      slug: post.slug,
      datePublished: (post.publishedAt || post.createdAt).toISOString()
    }))
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-24">
      <StructuredData type="Blog" data={blogData} />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Technical insights, tutorials, and best practices from 15+ years of experience
        </p>

        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {post.coverImage && (
                  <div className="md:w-1/3">
                    <ImageWithFallback
                      src={post.coverImage}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full h-48"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt || post.content.substring(0, 150) + '...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-muted-foreground">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </time>
                    <div className="flex gap-2">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
