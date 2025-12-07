'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PageHeader } from '@/components/PageHeader'
import { BookCard } from '@/components/BookCard'
import { BookMarked, Newspaper, Podcast, Play, Mail } from 'lucide-react'
import Image from 'next/image'
import { ContactButton } from '@/components/ContactButton'
import { Badge } from '@/components/ui/badge'

type ContentFilter = 'books' | 'newsletters' | 'podcasts'
type RatingFilter = 'all' | '4plus' | '5star'

interface Resource {
  id: string
  title: string
  description: string | null
  url: string
  audioUrl: string | null
  category: string | null
  image: string | null
  isAffiliate: boolean
  tags: string[]
  clickCount: number
  rating: number | null
  author: string | null
  narrator: string | null
  audioDuration: string | null
}

const gradients = [
  "from-pink-500 via-rose-500 to-orange-500",
  "from-blue-500 via-cyan-500 to-teal-500",
  "from-purple-500 via-violet-500 to-indigo-500",
  "from-green-500 via-emerald-500 to-teal-500",
  "from-yellow-500 via-amber-500 to-orange-500",
  "from-red-500 via-pink-500 to-rose-500",
]

function ContentHubContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlFilter = searchParams.get('type') as ContentFilter | null
  const urlCategory = searchParams.get('category')
  
  const [filter, setFilter] = useState<ContentFilter>(urlFilter || 'books')
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(urlCategory)
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleFilterChange = (newFilter: ContentFilter) => {
    setFilter(newFilter)
    setSelectedCategory(null)
    setRatingFilter('all')
    if (newFilter === 'books') {
      router.push('/resources/content')
    } else {
      router.push(`/resources/content?type=${newFilter}`)
    }
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    const params = new URLSearchParams()
    if (filter !== 'books') {
      params.set('type', filter)
    }
    if (category) {
      params.set('category', category)
    }
    const queryString = params.toString()
    router.push(`/resources/content${queryString ? `?${queryString}` : ''}`)
  }

  useEffect(() => {
    fetchResources()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const fetchResources = async () => {
    setLoading(true)
    try {
      const typeMap = {
        books: 'BOOKS',
        newsletters: 'NEWSLETTER',
        podcasts: 'PODCAST'
      }
      const response = await fetch(`/api/resources?type=${typeMap[filter]}`)
      if (!response.ok) {
        throw new Error('Failed to fetch resources')
      }
      const data = await response.json()
      const sanitizedData = data.map((item: Resource) => ({
        ...item,
        tags: item.tags || [],
      }))
      setResources(sanitizedData)
    } catch (error) {
      console.error('Error fetching resources:', error)
      setResources([])
    } finally {
      setLoading(false)
    }
  }

  const handleResourceClick = async (resourceId: string) => {
    try {
      await fetch(`/api/resources/${resourceId}/click`, { method: 'POST' })
    } catch (err) {
      // Silent fail for analytics
    }
  }

  // Get all unique categories from current resources
  const allCategories = Array.from(new Set(resources.map(r => r.category).filter(Boolean))) as string[]

  // Filter resources by selected category and rating
  let filteredResources = selectedCategory
    ? resources.filter(r => r.category === selectedCategory)
    : resources

  // Apply rating filter for books
  if (filter === 'books') {
    if (ratingFilter === '4plus') {
      filteredResources = filteredResources.filter(r => r.rating && r.rating >= 4)
    } else if (ratingFilter === '5star') {
      filteredResources = filteredResources.filter(r => r.rating && r.rating === 5)
    }
  }

  // Calculate stats for books
  const bookStats = filter === 'books' ? {
    total: resources.length,
    withAudio: resources.filter(r => r.audioUrl).length,
    highRated: resources.filter(r => r.rating && r.rating >= 4.5).length,
  } : null

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
          </div>
        </div>

        {/* Filter Tabs */}
        <section className="py-2 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Type Filter Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <button
                onClick={() => handleFilterChange('books')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'books'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <BookMarked className="inline-block w-4 h-4 mr-2" />
                Books
                {bookStats && <span className="ml-2 text-xs opacity-80">({bookStats.total})</span>}
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

            {/* Category Filter Pills */}
            {allCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-8">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    !selectedCategory
                      ? 'bg-theme-primary/10 text-theme-primary border-2 border-theme-primary'
                      : 'bg-muted text-muted-foreground border-2 border-transparent hover:border-theme-primary/30'
                  }`}
                >
                  All Categories
                </button>
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-theme-primary/10 text-theme-primary border-2 border-theme-primary'
                        : 'bg-muted text-muted-foreground border-2 border-transparent hover:border-theme-primary/30'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {loading ? (
              <div className="text-center py-24">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-theme-primary border-t-transparent"></div>
                <p className="mt-4 text-muted-foreground">Loading {filter}...</p>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 flex items-center justify-center">
                  {filter === 'books' && <BookMarked className="w-12 h-12 text-theme-primary" />}
                  {filter === 'newsletters' && <Newspaper className="w-12 h-12 text-theme-primary" />}
                  {filter === 'podcasts' && <Podcast className="w-12 h-12 text-theme-primary" />}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  No {filter} found
                </h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  {selectedCategory 
                    ? `No ${filter} in "${selectedCategory}" category yet.` 
                    : ratingFilter !== 'all'
                    ? `No ${filter} match the selected rating filter.`
                    : `Check back soon for curated ${filter} recommendations!`}
                </p>
              </div>
            ) : (
              <>
                {/* Books - Netflix-style Grid */}
                {filter === 'books' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredResources.map((resource) => (
                      <BookCard
                        key={resource.id}
                        book={resource}
                        onTrackClick={handleResourceClick}
                      />
                    ))}
                  </div>
                )}

                {/* Podcasts - Special UI */}
                {filter === 'podcasts' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource, index) => {
                      const gradient = gradients[index % gradients.length]
                      const isHovered = hoveredCard === resource.id
                      
                      return (
                        <div
                          key={resource.id}
                          className="group relative"
                          onMouseEnter={() => setHoveredCard(resource.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          <div className={`relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105`}>
                            {/* Sound Wave Animation Background */}
                            <div className="absolute inset-0 flex items-center justify-center gap-1 px-8 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                              {[...Array(40)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 bg-white rounded-full transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}
                                  style={{
                                    height: isHovered ? `${Math.random() * 70 + 15}%` : '30%',
                                    animationDelay: `${i * 0.05}s`
                                  }}
                                />
                              ))}
                            </div>

                            {/* Podcast Artwork */}
                            {resource.image && (
                              <div className="absolute top-6 right-6 w-20 h-20 rounded-lg overflow-hidden shadow-lg border-2 border-white/20">
                                <Image
                                  src={resource.image}
                                  alt={resource.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}

                            {/* Content */}
                            <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                  <Podcast className="w-8 h-8 text-white" />
                                </div>
                                {resource.category && (
                                  <Badge variant="secondary" className="bg-white/30 text-white backdrop-blur-md border border-white/20 font-semibold shadow-lg">
                                    {resource.category}
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-2">{resource.title}</h3>
                              {resource.description && (
                                <p className="text-white/90 text-sm line-clamp-2">{resource.description}</p>
                              )}
                            </div>

                            {/* Play Button */}
                            <button
                              onClick={() => {
                                handleResourceClick(resource.id)
                                window.open(resource.url, '_blank', 'noopener,noreferrer')
                              }}
                              className="relative z-10 w-14 h-14 rounded-full bg-white text-gray-900 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-2xl"
                            >
                              <Play className="w-6 h-6 ml-1" fill="currentColor" />
                            </button>

                            {/* Tags */}
                            {resource.tags.length > 0 && (
                              <div className="relative z-10 flex flex-wrap gap-2 mt-4">
                                {resource.tags.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Newsletters - Card Grid */}
                {filter === 'newsletters' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="group bg-background border border-border rounded-xl overflow-hidden hover:border-theme-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-theme-primary/10"
                      >
                        {resource.image && (
                          <div className="relative h-48 overflow-hidden bg-muted">
                            <Image
                              src={resource.image}
                              alt={resource.title}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Mail className="w-5 h-5 text-theme-primary" />
                            {resource.category && (
                              <Badge variant="secondary">{resource.category}</Badge>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-theme-primary transition-colors">
                            {resource.title}
                          </h3>
                          {resource.description && (
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {resource.description}
                            </p>
                          )}
                          {resource.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {resource.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-theme-primary/10 text-theme-primary text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <button
                            onClick={() => {
                              handleResourceClick(resource.id)
                              window.open(resource.url, '_blank', 'noopener,noreferrer')
                            }}
                            className="w-full px-4 py-2 bg-theme-primary hover:bg-theme-secondary text-white rounded-lg font-medium transition-colors"
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-theme-primary/10 via-theme-secondary/5 to-transparent rounded-2xl p-12 border border-theme-primary/20">
              <h3 className="text-3xl font-bold mb-4">
                {filter === 'books' && "Found Your Next Read?"}
                {filter === 'newsletters' && "Stay Updated"}
                {filter === 'podcasts' && "Keep Learning"}
              </h3>
              <p className="text-muted-foreground text-lg mb-8">
                {filter === 'books' && "These resources have shaped my journey as a developer. I hope they inspire yours too."}
                {filter === 'newsletters' && "Subscribe to these newsletters to stay on top of the latest in tech and development."}
                {filter === 'podcasts' && "Tune in to these podcasts during your commute or workout for continuous learning."}
              </p>
              <ContactButton defaultReason="FEEDBACK" size="lg">
                Suggest a Resource
              </ContactButton>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function ContentHubPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-theme-primary border-t-transparent"></div>
      </div>
    }>
      <ContentHubContent />
    </Suspense>
  )
}
