import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { StructuredData } from '@/components/StructuredData'
import MainLayout from '@/components/layout/MainLayout'

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
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData type="Blog" data={blogData} />
      <MainLayout>
        <main>
          {/* Enhanced Header */}
          <section className="relative py-32 px-6 overflow-hidden mt-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-background to-theme-secondary/5"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.theme-primary/10),transparent_50%),radial-gradient(circle_at_70%_80%,theme(colors.theme-secondary/10),transparent_50%)]"></div>
            
            <div className="relative max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-theme-primary/10 text-theme-primary text-sm font-medium mb-8 bg-white">
                <span className="w-2 h-2 bg-theme-primary rounded-full mr-2 animate-pulse"></span>
                Latest Insights & Tutorials
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-foreground leading-tight">
                Technical
                <span className="bg-gradient-to-r from-theme-primary to-theme-secondary bg-clip-text text-transparent"> Blog</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed mb-12">
                Deep dives into modern web development, architectural patterns, and engineering best practices. 
                <span className="text-theme-primary font-medium">15+ years</span> of industry experience distilled into actionable insights.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-white">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-theme-primary rounded-full mr-2"></div>
                  React & Next.js
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-theme-secondary rounded-full mr-2"></div>
                  TypeScript & Node.js
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-theme-primary rounded-full mr-2"></div>
                  AWS & Architecture
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Blog Grid */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              {posts.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Coming Soon</h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">I'm working on some exciting technical articles. Check back soon for deep dives into modern web development!</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Featured Post */}
                  {posts.length > 0 && (
                    <article className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-theme-primary/10 to-theme-secondary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-background border border-border/50 rounded-2xl overflow-hidden hover:border-theme-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-theme-primary/10">
                        <div className="flex flex-col lg:flex-row">
                          {posts[0].coverImage && (
                            <div className="lg:w-2/5 relative overflow-hidden h-64 lg:h-auto">
                              <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-theme-primary text-white text-sm font-medium">
                                  <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                                  Featured
                                </span>
                              </div>
                              <ImageWithFallback
                                src={posts[0].coverImage}
                                alt={posts[0].title}
                                className="group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div className="flex-1 p-8 lg:p-12">
                            <div className="flex items-center gap-4 mb-6">
                              <time className="text-sm text-theme-primary font-medium">
                                {formatDate(posts[0].publishedAt || posts[0].createdAt)}
                              </time>
                              <div className="flex gap-2">
                                {posts[0].tags.slice(0, 2).map((tag: string) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 bg-theme-primary/10 text-theme-primary text-xs font-medium rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                              <Link
                                href={`/blog/${posts[0].slug}`}
                                className="hover:text-theme-primary transition-colors"
                              >
                                {posts[0].title}
                              </Link>
                            </h2>
                            
                            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                              {posts[0].excerpt || posts[0].content.substring(0, 200) + '...'}
                            </p>
                            
                            <Link
                              href={`/blog/${posts[0].slug}`}
                              className="inline-flex items-center text-theme-primary hover:text-theme-secondary font-semibold transition-colors group"
                            >
                              Read Article
                              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  )}
                  
                  {/* Regular Posts Grid */}
                  {posts.length > 1 && (
                    <div className="grid gap-8 lg:grid-cols-2">
                      {posts.slice(1).map((post) => (
                        <article
                          key={post.id}
                          className="group bg-background border border-border/50 rounded-xl overflow-hidden hover:border-theme-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-theme-primary/5"
                        >
                          {post.coverImage && (
                            <div className="relative overflow-hidden h-48">
                              <ImageWithFallback
                                src={post.coverImage}
                                alt={post.title}
                                className="group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                          )}
                          
                          <div className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <time className="text-sm text-theme-primary font-medium">
                                {formatDate(post.publishedAt || post.createdAt)}
                              </time>
                              <div className="flex gap-2">
                                {post.tags.slice(0, 2).map((tag: string) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-theme-primary/10 text-theme-primary text-xs font-medium rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold mb-3 leading-tight">
                              <Link
                                href={`/blog/${post.slug}`}
                                className="hover:text-theme-primary transition-colors"
                              >
                                {post.title}
                              </Link>
                            </h3>
                            
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {post.excerpt || post.content.substring(0, 120) + '...'}
                            </p>
                            
                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center text-theme-primary hover:text-theme-secondary font-medium transition-colors group"
                            >
                              Read More
                              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
      </MainLayout>
    </div>
  )
}
