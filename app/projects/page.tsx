import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { StructuredData } from '@/components/StructuredData'

// Disable static generation until database is set up
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL('https://hanyrabah.com'),
  title: 'Projects - Hany Rabah | Interactive Globe Map, AI Integration & React Applications',
  description: 'Explore my portfolio of fullstack projects including Interactive Globe Map, AI-powered fintech solutions, real-time applications, and scalable React/Next.js web applications. Built with TypeScript, Node.js, and AWS.',
  keywords: [
    'Hany Rabah Projects',
    'Interactive Globe Map Project',
    'AI Integration Projects',
    'React Applications Portfolio',
    'Next.js Projects',
    'Fullstack Projects Berlin',
    'TypeScript Projects',
    'Node.js Applications',
    'AWS Projects',
    'Real-time Applications',
    'Fintech Solutions',
    'Scalable Web Applications',
    'JavaScript Projects',
    'Web Development Portfolio',
    'Technical Projects'
  ],
  openGraph: {
    title: 'Projects - Hany Rabah | Interactive Globe Map & AI Integration',
    description: 'Portfolio of fullstack projects including Interactive Globe Map, AI-powered solutions, and scalable React applications. Built with modern technologies.',
    type: 'website',
    locale: 'en_US',
    url: 'https://hanyrabah.com/projects',
    siteName: 'Hany Rabah Portfolio',
    images: [
      {
        url: '/og-projects.png',
        width: 1200,
        height: 630,
        alt: 'Hany Rabah Projects - Interactive Globe Map and AI Integration Portfolio',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects - Hany Rabah | Interactive Globe Map & AI Integration',
    description: 'Portfolio of fullstack projects including Interactive Globe Map, AI-powered solutions, and scalable React applications.',
    images: ['/og-projects.png'],
    creator: '@hanyrabah',
  },
  alternates: {
    canonical: 'https://hanyrabah.com/projects',
  },
}

export default async function ProjectsPage() {
  let projects: any[] = []
  
  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.warn('Database not available, showing empty projects page')
  }

  // Structured data for SEO
  const websiteData = {
    name: 'Hany Rabah Projects Portfolio',
    description: 'Portfolio of fullstack projects including Interactive Globe Map, AI-powered solutions, and scalable React applications built by Hany Rabah.',
    url: 'https://hanyrabah.com/projects',
    author: {
      name: 'Hany Rabah',
      url: 'https://hanyrabah.com'
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <StructuredData type="WebSite" data={websiteData} />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <p className="text-xl text-muted-foreground mb-12">
          A showcase of my latest work and projects
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {project.coverImage && (
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-primary hover:underline"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
