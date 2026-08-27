'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PageHeader } from '@/components/PageHeader'
import { ProjectCard } from '@/components/ProjectCard'
import { Briefcase, Code, Palette } from 'lucide-react'
import { ScrollReveal, FadeIn } from '@/components/react-bits'

type WorkFilter = 'all' | 'development' | 'design'

interface WorkItem {
  id: string
  title: string
  slug: string
  description: string
  coverImage: string
  featured: boolean
  createdAt: string
  updatedAt: string
  type: 'development' | 'design'
  images?: string[]
  // Project-specific fields
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  status?: string
  // Design-specific fields
  tools?: string[]
  category?: string
  figmaUrl?: string
  behanceUrl?: string
  dribbbleUrl?: string
}

function WorkContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlFilter = searchParams.get('filter') as WorkFilter | null
  const [filter, setFilter] = useState<WorkFilter>(urlFilter || 'all')
  const [work, setWork] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWork()
  }, [])
  
  // Update filter when URL changes
  useEffect(() => {
    if (urlFilter && (urlFilter === 'development' || urlFilter === 'design')) {
      setFilter(urlFilter)
    }
  }, [urlFilter])
  
  // Update URL when filter changes
  const handleFilterChange = (newFilter: WorkFilter) => {
    setFilter(newFilter)
    if (newFilter === 'all') {
      router.push('/work')
    } else {
      router.push(`/work?filter=${newFilter}`)
    }
  }

  // Static fallback projects when database is empty
  const fallbackWork: WorkItem[] = [
    {
      id: 'fallback-1',
      title: 'Paylane Fintech Platform',
      slug: 'paylane-fintech',
      description: 'Modern payment infrastructure platform built with Next.js 14, TypeScript, and AWS. Features real-time transaction processing, multi-currency support, and comprehensive analytics dashboard.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      featured: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      type: 'development',
      technologies: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL', 'GraphQL', 'Docker'],
      liveUrl: 'https://www.godiligent.ai/',
      category: 'Fintech'
    },
    {
      id: 'fallback-2',
      title: 'OLX Service Marketplace',
      slug: 'olx-service-marketplace',
      description: 'Service marketplace platform connecting service providers with customers. Led the architecture modernization achieving 30% Time-to-Interactive improvement and 40% production-issue reduction.',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      featured: true,
      createdAt: '2023-06-01',
      updatedAt: '2023-06-01',
      type: 'development',
      technologies: ['React 18', 'TypeScript', 'GraphQL', 'Node.js', 'AWS'],
      liveUrl: 'https://www.olxgroup.com/',
      category: 'Marketplace'
    },
    {
      id: 'fallback-3',
      title: 'DigitalNext E-commerce Platform',
      slug: 'digitalnext-ecommerce',
      description: 'AI-driven digital solutions platform for industrial transformation. Reduced project delivery timelines by 40% via modular component libraries and agile pipelines.',
      coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      featured: false,
      createdAt: '2024-03-01',
      updatedAt: '2024-03-01',
      type: 'development',
      technologies: ['Next.js', 'AI Integration', 'Node.js', 'MongoDB', 'Docker'],
      category: 'E-commerce'
    },
    {
      id: 'fallback-4',
      title: 'Modern SaaS Dashboard UI',
      slug: 'saas-dashboard-ui',
      description: 'Comprehensive design system and dashboard interface for enterprise SaaS application. Features dark mode, data visualization components, and accessibility-first design.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      featured: false,
      createdAt: '2024-02-15',
      updatedAt: '2024-02-15',
      type: 'design',
      tools: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems'],
      category: 'UI/UX Design',
      figmaUrl: '#'
    },
    {
      id: 'fallback-5',
      title: 'Mobile Banking App Design',
      slug: 'mobile-banking-design',
      description: 'Complete mobile banking application design with focus on security, accessibility, and intuitive user experience. Includes wireframes, prototypes, and design system.',
      coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
      featured: false,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      type: 'design',
      tools: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
      category: 'Mobile Design',
      figmaUrl: '#'
    },
    {
      id: 'fallback-6',
      title: 'Portfolio Website System',
      slug: 'portfolio-website',
      description: 'Custom-built portfolio website with Next.js, featuring dynamic theming, blog system, and admin panel. Open source template for developers.',
      coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop',
      featured: false,
      createdAt: '2024-04-01',
      updatedAt: '2024-04-01',
      type: 'development',
      technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
      githubUrl: 'https://github.com/hanyrabah',
      category: 'Web Development'
    }
  ]

  const fetchWork = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/work')
      if (!response.ok) {
        throw new Error('Failed to fetch work')
      }
      const data = await response.json()
      // Use fallback if database is empty
      if (data.length === 0) {
        setWork(fallbackWork)
      } else {
        // Ensure all items have required fields
        const sanitizedData = data.map((item: WorkItem) => ({
          ...item,
          technologies: item.technologies || [],
          tools: item.tools || [],
          images: item.images || []
        }))
        setWork(sanitizedData)
      }
    } catch (error) {
      console.error('Error fetching work:', error)
      // Use fallback on error
      setWork(fallbackWork)
    } finally {
      setLoading(false)
    }
  }

  const filteredWork = work.filter(item => {
    if (filter === 'all') return true
    return item.type === filter
  })

  const featuredWork = filteredWork.filter(item => item.featured)
  const regularWork = filteredWork.filter(item => !item.featured)

  const getWorkCount = (type: WorkFilter) => {
    if (type === 'all') return work.length
    return work.filter(item => item.type === type).length
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Header */}
        <div className="px-6">
          <div className="max-w-4xl mx-auto">
            <PageHeader
              title="My Work"
              subtitle="Portfolio & Projects"
              description="A curated collection of development projects and design work. From full-stack applications to UI/UX designs, each piece represents a unique challenge solved with modern technologies and thoughtful creativity."
              icon={Briefcase}
              gradient={false}
              splitColor={true}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <section className="py-12 pt-4 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'all'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <Briefcase className="inline-block w-4 h-4 mr-2" />
                All Work ({getWorkCount('all')})
              </button>
              <button
                onClick={() => handleFilterChange('development')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'development'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <Code className="inline-block w-4 h-4 mr-2" />
                Development ({getWorkCount('development')})
              </button>
              <button
                onClick={() => handleFilterChange('design')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'design'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <Palette className="inline-block w-4 h-4 mr-2" />
                Design ({getWorkCount('design')})
              </button>
            </div>

            {loading ? (
              <div className="text-center py-24">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-theme-primary border-t-transparent"></div>
                <p className="mt-4 text-muted-foreground">Loading work...</p>
              </div>
            ) : filteredWork.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 flex items-center justify-center">
                  <Briefcase className="w-12 h-12 text-theme-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">No Work Found</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  No {filter !== 'all' ? filter : ''} work items available at the moment.
                </p>
              </div>
            ) : (
              <div className="space-y-16">
                {/* Featured Work */}
                {featuredWork.length > 0 && (
                  <div>
                    <FadeIn direction="up" delay={0.1}>
                      <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                          Featured Work
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                          Highlighted projects and designs that showcase expertise and innovation.
                        </p>
                      </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {featuredWork.map((item, index) => (
                        <ScrollReveal key={item.id} direction="up" delay={0.1 * index}>
                          <ProjectCard 
                            project={{
                              ...item,
                              technologies: item.technologies || item.tools || [],
                              category: item.type === 'development' ? 'Development' : 'Design',
                              type: item.type
                            }} 
                          />
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Work */}
                {regularWork.length > 0 && (
                  <div>
                    <FadeIn direction="up" delay={0.1}>
                      <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                          {featuredWork.length > 0 ? 'More Work' : 'Latest Work'}
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                          A comprehensive collection of projects and designs built with modern technologies.
                        </p>
                      </div>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {regularWork.map((item, index) => (
                        <ScrollReveal key={item.id} direction="up" delay={0.05 * (index % 6)}>
                          <ProjectCard 
                            project={{
                              ...item,
                              technologies: item.technologies || item.tools || [],
                              category: item.type === 'development' ? 'Development' : 'Design',
                              type: item.type
                            }} 
                          />
                        </ScrollReveal>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default function WorkPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-theme-primary border-t-transparent"></div>
      </div>
    }>
      <WorkContent />
    </Suspense>
  )
}
