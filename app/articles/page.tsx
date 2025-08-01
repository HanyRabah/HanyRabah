import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Clock } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Articles - Portfolio',
  description: 'Read my latest articles on web development, programming, and technology.',
  openGraph: {
    title: 'Articles - Portfolio',
    description: 'Read my latest articles on web development, programming, and technology.',
  },
}

async function getArticles() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        tags: true,
        publishedAt: true,
        createdAt: true,
      },
    })
    return posts
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

function formatDate(date: Date | null) {
  if (!date) return 'No date'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, programming, and technology.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles published yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="group hover:shadow-lg transition-shadow duration-300 border-border">
                  <CardHeader className="p-0">
                    {article.coverImage && (
                      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(article.publishedAt)}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-teal-primary transition-colors">
                      <Link href={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{article.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-teal-primary hover:text-teal-secondary font-medium text-sm transition-colors"
                    >
                      Read more →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
