'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PageHeader } from '@/components/PageHeader'
import { BookMarked, Newspaper, Podcast, Play, Mail } from 'lucide-react'
import Image from 'next/image'

type ContentFilter = 'reading' | 'newsletters' | 'podcasts'

interface Resource {
  id: string
  title: string
  description: string | null
  url: string
  category: string | null
  image: string | null
  isAffiliate: boolean
  tags: string[]
  clickCount: number
  price: string | null
  audioUrl: string | null
  audioDuration: string | null
  narrator: string | null
}

export default function ContentHubPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlFilter = searchParams.get('type') as ContentFilter | null
  const [filter, setFilter] = useState<ContentFilter>(urlFilter || 'reading')
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  const handleFilterChange = (newFilter: ContentFilter) => {
    setFilter(newFilter)
    if (newFilter === 'reading') {
      router.push('/resources/content')
    } else {
      router.push(`/resources/content?type=${newFilter}`)
    }
  }

  useEffect(() => {
    fetchResources()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const fetchResources = async () => {
    setLoading(true)
    try {
      const typeMap = {
        reading: 'READING_LIST',
        newsletters: 'NEWSLETTER',
        podcasts: 'PODCAST'
      }
      const response = await fetch(`/api/resources?type=${typeMap[filter]}`)
      if (response.ok) {
        const data = await response.json()
        setResources(data)
      }
    } catch (error) {
      console.error('Error fetching resources:', error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Header */}
        <div className="px-6">
          <div className="max-w-4xl mx-auto">
            <PageHeader
              title="Content Hub"
              subtitle="Curated Learning Resources"
              description="Discover handpicked books, newsletters, and podcasts to fuel your growth. From technical deep-dives to creative inspiration, find your next favorite resource."
              icon={BookMarked}
              gradient={false}
              splitColor={true}
            />
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-theme-primary/50 transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent mb-2">
                    {filter === 'reading' ? resources.length : '—'}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Books & Articles</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-theme-primary/50 transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent mb-2">
                    {filter === 'newsletters' ? resources.length : '—'}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Newsletters</div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-card border border-border rounded-xl p-6 hover:border-theme-primary/50 transition-all duration-300">
                  <div className="text-4xl font-bold bg-gradient-to-r from-theme-primary to-theme-accent bg-clip-text text-transparent mb-2">
                    {filter === 'podcasts' ? resources.length : '—'}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">Podcasts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <button
                onClick={() => handleFilterChange('reading')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'reading'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <BookMarked className="inline-block w-4 h-4 mr-2" />
                Reading List
              </button>
              <button
                onClick={() => handleFilterChange('newsletters')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'newsletters'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <Newspaper className="inline-block w-4 h-4 mr-2" />
                Newsletters
              </button>
              <button
                onClick={() => handleFilterChange('podcasts')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'podcasts'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <Podcast className="inline-block w-4 h-4 mr-2" />
                Podcasts
              </button>
            </div>

            {loading ? (
              <div className="text-center py-24">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-theme-primary border-t-transparent"></div>
                <p className="mt-4 text-muted-foreground">Loading {filter}...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 flex items-center justify-center">
                  {filter === 'reading' && <BookMarked className="w-12 h-12 text-theme-primary" />}
                  {filter === 'newsletters' && <Newspaper className="w-12 h-12 text-theme-primary" />}
                  {filter === 'podcasts' && <Podcast className="w-12 h-12 text-theme-primary" />}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">No {filter} yet</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Check back soon for curated {filter} recommendations!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:border-theme-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-theme-primary/10"
                  >
                    {/* Image */}
                    {resource.image && (
                      <div className="relative w-full h-48 bg-muted overflow-hidden">
                        <Image
                          src={resource.image}
                          alt={resource.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      {resource.category && (
                        <span className="inline-block px-3 py-1 bg-theme-primary/10 text-theme-primary text-xs font-medium rounded-full mb-3">
                          {resource.category}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-bold mb-2 group-hover:text-theme-primary transition-colors">
                        {resource.title}
                      </h3>

                      {/* Description */}
                      {resource.description && (
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {resource.description}
                        </p>
                      )}

                      {/* Audiobook Info */}
                      {filter === 'reading' && resource.audioUrl && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                          <Play className="w-3 h-3" />
                          <span>Audiobook available</span>
                          {resource.audioDuration && <span>• {resource.audioDuration}</span>}
                        </div>
                      )}

                      {/* Tags */}
                      {resource.tags && resource.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {resource.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors text-sm font-medium"
                        >
                          {filter === 'reading' && <BookMarked className="w-4 h-4 mr-2" />}
                          {filter === 'newsletters' && <Mail className="w-4 h-4 mr-2" />}
                          {filter === 'podcasts' && <Play className="w-4 h-4 mr-2" />}
                          {filter === 'reading' && 'View Book'}
                          {filter === 'newsletters' && 'Subscribe'}
                          {filter === 'podcasts' && 'Listen'}
                        </a>
                        {filter === 'reading' && resource.audioUrl && (
                          <a
                            href={resource.audioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 border border-theme-primary text-theme-primary rounded-lg hover:bg-theme-primary hover:text-white transition-colors text-sm font-medium"
                            title="Listen to audiobook"
                          >
                            <Play className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      {/* Affiliate Notice */}
                      {resource.isAffiliate && (
                        <p className="text-xs text-muted-foreground mt-3 italic">
                          * Affiliate link - I may earn a commission
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
