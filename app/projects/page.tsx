import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { StructuredData } from '@/components/StructuredData'
import { ProjectCard } from '@/components/ProjectCard'
import { PageHeader } from '@/components/PageHeader'
import { Briefcase } from 'lucide-react'
import { ProjectsCTA } from '@/components/ProjectsCTA'

// Enable ISR with 1-hour revalidation for projects list
export const revalidate = 3600; // Revalidate every 1 hour

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
    // Only fetch published projects
    projects = await prisma.project.findMany({
      where: { published: true },
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
    <div className="min-h-screen bg-background text-foreground">
      <StructuredData type="WebSite" data={websiteData} />
      <main>
        {/* Header */}
        <div className="px-6">
          <div className="max-w-4xl mx-auto">
            <PageHeader
              title="My Projects"
              subtitle="Featured Work & Case Studies"
              description="A curated collection of full-stack applications, AI integrations, and interactive experiences. Each project represents a unique challenge solved with modern technologies and thoughtful engineering."
              icon={Briefcase}
              gradient={false}
              splitColor={true}
            />
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-theme-primary/50 transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent mb-2">
                    250+
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Projects Built</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-theme-primary/50 transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent mb-2">
                    20+
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Technologies Used</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-theme-primary/50 transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent mb-2">
                    20+
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Projects Grid */}
        <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              {projects.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">Projects Coming Soon</h3>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">I'm currently working on some exciting projects. Check back soon to see my latest work!</p>
                </div>
              ) : (
                <div className="space-y-16">
                  {/* Featured Projects Section */}
                  {projects.filter(p => p.featured).length > 0 && (
                    <div>
                      <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                          Featured Projects
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                          Highlighted work that showcases my expertise in full-stack development and innovative solutions.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        {projects.filter(p => p.featured).map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* All Projects Section */}
                  <div>
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        {projects.filter(p => p.featured).length > 0 ? 'All Projects' : 'Latest Projects'}
                      </h2>
                      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A comprehensive collection of applications, tools, and experiments built with modern technologies.
                      </p>
                    </div>
                    
                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {projects.filter(p => !p.featured).map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                  
                  {/* Call to Action */}
                  <ProjectsCTA />
                </div>
              )}
            </div>
          </section>
      </main>
    </div>
  )
}
