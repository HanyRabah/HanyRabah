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
          {/* Enhanced Header */}
          <section className="relative py-32 px-6 overflow-hidden mt-16">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-background to-theme-secondary/5"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,theme(colors.theme-primary/8),transparent_50%),radial-gradient(circle_at_80%_70%,theme(colors.theme-secondary/8),transparent_50%)]"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-theme-primary/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-theme-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            
            <div className="relative max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-theme-primary/10 text-theme-primary text-sm font-medium mb-8 bg-white">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Featured Work & Case Studies
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-foreground leading-tight">
                My
                <span className="bg-gradient-to-r from-theme-primary to-theme-secondary bg-clip-text text-transparent"> Projects</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-white max-w-4xl mx-auto leading-relaxed mb-12">
                A curated collection of full-stack applications, AI integrations, and interactive experiences. 
                Each project represents a unique challenge solved with modern technologies and 
                <span className="text-theme-primary font-medium"> thoughtful engineering</span>.
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 text-center">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-theme-primary">{projects.length}+</span>
                  <span className="text-sm text-muted-white">Projects Built</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-theme-secondary">15+</span>
                  <span className="text-sm text-muted-white">Technologies Used</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-theme-primary">5+</span>
                  <span className="text-sm text-muted-white">Years Experience</span>
                </div>
              </div>
            </div>
          </section>

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
                  <div className="text-center py-16">
                    <div className="max-w-3xl mx-auto">
                      <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                        Interested in Working Together?
                      </h3>
                      <p className="text-muted-foreground text-lg mb-8">
                        I'm always excited to take on new challenges and collaborate on innovative projects. 
                        Let's discuss how we can bring your ideas to life.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                          href="mailto:hany.rabah@gmail.com"
                          className="inline-flex items-center px-6 py-3 bg-theme-primary hover:bg-theme-secondary text-white font-semibold rounded-xl transition-colors duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Get In Touch
                        </a>
                        <a
                          href="/Hany_Elsaydawy_full-stack_engineer.pdf"
                          target="_blank"
                          className="inline-flex items-center px-6 py-3 border border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white font-semibold rounded-xl transition-colors duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download Resume
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </MainLayout>
    </div>
  )
}
