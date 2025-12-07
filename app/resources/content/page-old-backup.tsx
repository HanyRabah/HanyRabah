'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PageHeader } from '@/components/PageHeader'
import { BookMarked, Newspaper, Podcast, Play, Mail, Headphones, Clock } from 'lucide-react'
import Image from 'next/image'
import { ContactButton } from '@/components/ContactButton'

type ContentFilter = 'reading' | 'audiobooks' | 'newsletters' | 'podcasts'

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

const gradients = [
  "from-pink-500 via-rose-500 to-orange-500",
  "from-blue-500 via-cyan-500 to-teal-500",
  "from-purple-500 via-violet-500 to-indigo-500",
  "from-green-500 via-emerald-500 to-teal-500",
  "from-yellow-500 via-amber-500 to-orange-500",
  "from-red-500 via-pink-500 to-rose-500",
]

export default function ContentHubPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlFilter = searchParams.get('type') as ContentFilter | null
  const urlCategory = searchParams.get('category')
  
  const [filter, setFilter] = useState<ContentFilter>(urlFilter || 'reading')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(urlCategory)
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const handleFilterChange = (newFilter: ContentFilter) => {
    setFilter(newFilter)
    setSelectedCategory(null) // Reset category when changing type
    if (newFilter === 'reading') {
      router.push('/resources/content')
    } else {
      router.push(`/resources/content?type=${newFilter}`)
    }
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
    const params = new URLSearchParams()
    if (filter !== 'reading') {
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
        reading: 'READING_LIST',
        audiobooks: 'AUDIOBOOK',
        newsletters: 'NEWSLETTER',
        podcasts: 'PODCAST'
      }
      const response = await fetch(`/api/resources?type=${typeMap[filter]}`)
      if (!response.ok) {
        throw new Error('Failed to fetch resources')
      }
      const data = await response.json()
      // Ensure all items have required fields
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

  const handleResourceClick = async (resourceId: string, url: string) => {
    try {
      await fetch(`/api/resources/${resourceId}/click`, { method: 'POST' })
    } catch (err) {
      // Silent fail for analytics
    }
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Get all unique categories from current resources
  const allCategories = Array.from(new Set(resources.map(r => r.category).filter(Boolean))) as string[]

  // Filter resources by selected category
  const filteredResources = selectedCategory
    ? resources.filter(r => r.category === selectedCategory)
    : resources

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
                onClick={() => handleFilterChange('audiobooks')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'audiobooks'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <Headphones className="inline-block w-4 h-4 mr-2" />
                Audiobooks
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
                  All
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
                  {filter === 'reading' && <BookMarked className="w-12 h-12 text-theme-primary" />}
                  {filter === 'audiobooks' && <Headphones className="w-12 h-12 text-theme-primary" />}
                  {filter === 'newsletters' && <Newspaper className="w-12 h-12 text-theme-primary" />}
                  {filter === 'podcasts' && <Podcast className="w-12 h-12 text-theme-primary" />}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  No {selectedCategory || filter} found
                </h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  {selectedCategory ? `No ${filter} in "${selectedCategory}" category yet.` : `Check back soon for curated ${filter} recommendations!`}
                </p>
              </div>
            ) : (
              <>
                {/* Podcasts - Special UI */}
                {filter === 'podcasts' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource, index) => {
                      const gradient = gradients[index % gradients.length]
                      const isHovered = hoveredCard === resource.id
                      
                      return (
                        <div
                          key={resource.id}
                          onMouseEnter={() => setHoveredCard(resource.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                          onClick={() => handleResourceClick(resource.id, resource.url)}
                          className="group relative cursor-pointer"
                        >
                          {/* Card */}
                          <div className={`relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105`}>
                            {/* Sound Wave Animation Background */}
                            <div className="absolute inset-0 flex items-center justify-center gap-1 px-8 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                              {[...Array(40)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 bg-white rounded-full transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}
                                  style={{
                                    height: isHovered ? `${Math.random() * 70 + 15}%` : '30%',
                                    animationDelay: `${i * 0.05}s`,
                                    animationDuration: `${Math.random() * 0.4 + 0.6}s`,
                                    transitionDelay: `${i * 0.01}s`,
                                  }}
                                />
                              ))}
                            </div>
                            
                            {/* Decorative squares */}
                            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-lg"></div>
                            <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-lg"></div>
                            
                            {/* Content */}
                            <div className="relative z-10">
                              <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2">
                                {resource.title}
                              </h3>
                              {resource.category && (
                                <p className="text-white/80 text-sm">
                                  {resource.category}
                                </p>
                              )}
                            </div>

                            {/* Bottom Section */}
                            <div className="relative z-10 flex items-end justify-between">
                              {/* Play Button with Wave Animation */}
                              <div className="relative">
                                <button className="w-14 h-14 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                                  <Play className="h-6 w-6 text-gray-900 ml-0.5" fill="currentColor" />
                                </button>
                                
                                {/* Ripple Wave Animation */}
                                {isHovered && (
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    {[...Array(3)].map((_, i) => (
                                      <div
                                        key={i}
                                        className="absolute w-14 h-14 rounded-full border-2 border-white/40 animate-ping"
                                        style={{
                                          animationDelay: `${i * 0.3}s`,
                                          animationDuration: '1.5s',
                                        }}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>

                              {/* Host Image */}
                              {resource.image && (
                                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-white/30 bg-white/10 shadow-lg">
                                  <Image
                                    src={resource.image}
                                    alt={resource.title}
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                          </div>

                          {/* Description Below Card */}
                          {resource.description && (
                            <p className="mt-4 text-sm text-foreground leading-relaxed line-clamp-2">
                              {resource.description}
                            </p>
                          )}

                          {/* Tags */}
                          {resource.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {resource.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded border border-border"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Newsletters - List UI */}
                {filter === 'newsletters' && (
                  <div className="max-w-4xl mx-auto space-y-4">
                    {filteredResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="group bg-card border border-border rounded-xl hover:border-theme-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-theme-primary/10 cursor-pointer overflow-hidden"
                        onClick={() => handleResourceClick(resource.id, resource.url)}
                      >
                        <div className="flex items-center gap-6 p-6">
                          {/* Newsletter Logo */}
                          {resource.image && (
                            <div className="flex-shrink-0 w-20 h-20 relative bg-muted rounded-xl overflow-hidden border border-border group-hover:border-theme-primary/30 transition-colors">
                              <Image
                                src={resource.image}
                                alt={resource.title}
                                fill
                                className="object-contain p-2"
                              />
                            </div>
                          )}

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Title & Category */}
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-bold mb-1 group-hover:text-theme-primary transition-colors truncate">
                                  {resource.title}
                                </h3>
                                {resource.category && (
                                  <span className="inline-block px-2 py-1 bg-theme-primary/10 text-theme-primary text-xs font-medium rounded-full">
                                    {resource.category}
                                  </span>
                                )}
                              </div>
                              
                              {/* Subscribe Button */}
                              <button className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors text-sm font-medium">
                                <Mail className="w-4 h-4" />
                                Subscribe
                              </button>
                            </div>

                            {/* Description */}
                            {resource.description && (
                              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                {resource.description}
                              </p>
                            )}

                            {/* Tags */}
                            {resource.tags && resource.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {resource.tags.slice(0, 4).map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Affiliate Notice */}
                            {resource.isAffiliate && (
                              <p className="text-xs text-muted-foreground mt-2 italic">
                                * Affiliate link - I may earn a commission
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Audiobooks - List UI with Audio Player Style */}
                {filter === 'audiobooks' && (
                  <div className="max-w-4xl mx-auto space-y-4">
                    {filteredResources.map((resource, index) => {
                      const gradient = gradients[index % gradients.length]
                      
                      return (
                        <div
                          key={resource.id}
                          className="group bg-card border border-border rounded-xl hover:border-theme-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-theme-primary/10 cursor-pointer overflow-hidden"
                          onClick={() => handleResourceClick(resource.id, resource.url)}
                        >
                          <div className="flex items-center gap-6 p-6">
                            {/* Book Cover with Headphones Icon Overlay */}
                            {resource.image && (
                              <div className="flex-shrink-0 w-24 h-24 relative bg-muted rounded-lg overflow-hidden border border-border group-hover:border-theme-primary/30 transition-colors">
                                <Image
                                  src={resource.image}
                                  alt={resource.title}
                                  fill
                                  className="object-cover"
                                />
                                {/* Headphones Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                                  <Headphones className="w-10 h-10 text-white" />
                                </div>
                              </div>
                            )}

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              {/* Title & Category */}
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-bold mb-1 group-hover:text-theme-primary transition-colors truncate">
                                    {resource.title}
                                  </h3>
                                  <div className="flex items-center gap-3 flex-wrap">
                                    {resource.category && (
                                      <span className="inline-block px-2 py-1 bg-theme-primary/10 text-theme-primary text-xs font-medium rounded-full">
                                        {resource.category}
                                      </span>
                                    )}
                                    {/* Narrator */}
                                    {resource.narrator && (
                                      <span className="text-xs text-muted-foreground">
                                        Narrated by {resource.narrator}
                                      </span>
                                    )}
                                    {/* Duration */}
                                    {resource.audioDuration && (
                                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="w-3 h-3" />
                                        {resource.audioDuration}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Listen Button */}
                                <button className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors text-sm font-medium">
                                  <Headphones className="w-4 h-4" />
                                  Listen
                                </button>
                              </div>

                              {/* Description */}
                              {resource.description && (
                                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                  {resource.description}
                                </p>
                              )}

                              {/* Tags */}
                              {resource.tags && resource.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {resource.tags.slice(0, 4).map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Affiliate Notice */}
                              {resource.isAffiliate && (
                                <p className="text-xs text-muted-foreground mt-2 italic">
                                  * Affiliate link - I may earn a commission
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Reading List - Card UI */}
                {filter === 'reading' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="group bg-card border border-border rounded-xl overflow-hidden hover:border-theme-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-theme-primary/10 cursor-pointer"
                        onClick={() => handleResourceClick(resource.id, resource.url)}
                      >
                        {/* Image */}
                        {resource.image && (
                          <div className="relative w-full h-48 bg-muted overflow-hidden">
                            <Image
                              src={resource.image}
                              alt={resource.title}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
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
                          {resource.audioUrl && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                              <Headphones className="w-3 h-3" />
                              <span>Audiobook available</span>
                              {resource.audioDuration && (
                                <>
                                  <Clock className="w-3 h-3 ml-2" />
                                  <span>{resource.audioDuration}</span>
                                </>
                              )}
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

                          {/* Action Button */}
                          <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors text-sm font-medium">
                            <BookMarked className="w-4 h-4 mr-2" />
                            View Book
                          </button>

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

                {/* Call to Action */}
                <div className="mt-16 text-center max-w-2xl mx-auto">
                  <div className="bg-card border border-border rounded-lg p-8">
                    <h3 className="text-xl font-semibold mb-3">
                      {filter === 'reading' && 'Know a great book?'}
                      {filter === 'audiobooks' && 'Know a great audiobook?'}
                      {filter === 'newsletters' && 'Know a great newsletter?'}
                      {filter === 'podcasts' && 'Know a great podcast?'}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Have a recommendation? I'd love to hear about it and potentially add it to the list!
                    </p>
                    <ContactButton 
                      defaultReason={filter === 'reading' ? 'READING_LIST' : filter === 'audiobooks' ? 'READING_LIST' : filter === 'newsletters' ? 'OTHER' : 'PODCAST'}
                      variant="default"
                      size="lg"
                    >
                      Share Recommendation
                    </ContactButton>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
