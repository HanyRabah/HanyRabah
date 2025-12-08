'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PageHeader } from '@/components/PageHeader'
import { ProjectCard } from '@/components/ProjectCard'
import { Briefcase, Code, Palette } from 'lucide-react'

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

  const fetchWork = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/work')
      if (!response.ok) {
        throw new Error('Failed to fetch work')
      }
      const data = await response.json()
      // Ensure all items have required fields
      const sanitizedData = data.map((item: WorkItem) => ({
        ...item,
        technologies: item.technologies || [],
        tools: item.tools || [],
        images: item.images || []
      }))
      setWork(sanitizedData)
    } catch (error) {
      console.error('Error fetching work:', error)
      setWork([])
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
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        Featured Work
                      </h2>
                      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Highlighted projects and designs that showcase expertise and innovation.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {featuredWork.map((item) => (
                        <ProjectCard 
                          key={item.id} 
                          project={{
                            ...item,
                            technologies: item.technologies || item.tools || [],
                            category: item.type === 'development' ? 'Development' : 'Design',
                            type: item.type
                          }} 
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* All Work */}
                {regularWork.length > 0 && (
                  <div>
                    <div className="text-center mb-12">
                      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                        {featuredWork.length > 0 ? 'More Work' : 'Latest Work'}
                      </h2>
                      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A comprehensive collection of projects and designs built with modern technologies.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {regularWork.map((item) => (
                        <ProjectCard 
                          key={item.id} 
                          project={{
                            ...item,
                            technologies: item.technologies || item.tools || [],
                            category: item.type === 'development' ? 'Development' : 'Design',
                            type: item.type
                          }} 
                        />
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
