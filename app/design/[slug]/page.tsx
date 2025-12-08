import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Figma, Dribbble } from 'lucide-react'

interface DesignPageProps {
  params: Promise<{
    slug: string
  }>
}

// Force dynamic rendering to avoid database connection during build
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: DesignPageProps): Promise<Metadata> {
  const { slug } = await params
  const design = await prisma.design.findUnique({
    where: { slug },
  })

  if (!design) {
    return {
      title: 'Design Not Found',
    }
  }

  return {
    title: `${design.title} - Hany Rabah | Design Portfolio`,
    description: `${design.description} Created with ${design.tools.join(', ')}.`,
    keywords: [
      design.title,
      'Hany Rabah Design',
      ...design.tools,
      'UI/UX Design',
      'Web Design',
      'Design Portfolio'
    ],
    openGraph: {
      title: `${design.title} - Hany Rabah Design`,
      description: design.description,
      type: 'website',
      url: `https://hanyrabah.com/design/${design.slug}`,
      images: design.coverImage ? [{
        url: design.coverImage,
        width: 1200,
        height: 630,
        alt: `${design.title} - Design by Hany Rabah`
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${design.title} - Hany Rabah Design`,
      description: design.description,
      images: design.coverImage ? [design.coverImage] : [],
      creator: '@hanyrabah',
    },
    alternates: {
      canonical: `https://hanyrabah.com/design/${design.slug}`,
    },
  }
}

export default async function DesignPage({ params }: DesignPageProps) {
  const { slug } = await params
  const design = await prisma.design.findUnique({
    where: { slug },
  })

  if (!design) {
    notFound()
  }

  const formatCategory = (category: string) => {
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-16 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/work?filter=design" 
            className="inline-flex items-center text-muted-foreground hover:text-theme-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Designs
          </Link>

          <header className="mb-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-theme-primary/10 text-theme-primary text-sm font-medium rounded-full">
                {formatCategory(design.category)}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-4">{design.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{design.description}</p>
            
            {/* Tools */}
            <div className="flex flex-wrap gap-2 mb-6">
              {design.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Client Info */}
            {design.clientName && (
              <p className="text-muted-foreground mb-4">
                <span className="font-medium">Client:</span> {design.clientName}
              </p>
            )}

            {/* External Links */}
            <div className="flex flex-wrap gap-4 mb-8">
              {design.projectUrl && (
                <a
                  href={design.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Project
                </a>
              )}
              {design.figmaUrl && (
                <a
                  href={design.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <Figma className="w-4 h-4 mr-2" />
                  Figma
                </a>
              )}
              {design.behanceUrl && (
                <a
                  href={design.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
                  </svg>
                  Behance
                </a>
              )}
              {design.dribbbleUrl && (
                <a
                  href={design.dribbbleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  <Dribbble className="w-4 h-4 mr-2" />
                  Dribbble
                </a>
              )}
            </div>

            {/* Cover Image */}
            {design.coverImage && (
              <Image
                src={design.coverImage}
                alt={design.title}
                width={800}
                height={400}
                className="rounded-lg object-cover w-full mb-8"
              />
            )}
          </header>

          {/* Content */}
          {design.content && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: design.content }} />
            </div>
          )}

          {/* Additional Images Gallery */}
          {design.images.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Design Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {design.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${design.title} screenshot ${index + 1}`}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {design.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {design.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
