import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

// Disable static generation until database is set up
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3001'),
  title: 'Blog',
  description: 'Thoughts, tutorials, and insights about web development and design',
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Thoughts, tutorials, and insights about web development and design
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
                    <Image
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
