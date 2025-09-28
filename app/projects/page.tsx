import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { StructuredData } from '@/components/StructuredData'
import MainLayout from '@/components/layout/MainLayout'
import { ProjectCard } from '@/components/ProjectCard'

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
    const allProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
    
    // Filter projects with images for display
    projects = allProjects.filter(project => 
      project.coverImage && 
      project.coverImage.trim() !== ''
    )
    
    // Log projects without images for reference
    const projectsWithoutImages = allProjects.filter(project => 
      !project.coverImage || project.coverImage.trim() === ''
    )
    
    if (projectsWithoutImages.length > 0) {
      console.log('Projects without images (hidden from display):', 
        projectsWithoutImages.map(p => ({ id: p.id, title: p.title }))
      )
    }
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
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData type="WebSite" data={websiteData} />
      <MainLayout>
        <main>
          {/* Header */}
          <section className="py-24 px-6 border-b border-border mt-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Projects
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A showcase of my latest work and projects. From AI integration to interactive web applications.
              </p>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              {projects.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg">No projects yet. Check back soon!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </MainLayout>
    </div>
  )
}
