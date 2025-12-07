'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { PageHeader } from '@/components/PageHeader'
import { Layers, Sparkles, Download, ExternalLink, Monitor, Link as LinkIcon } from 'lucide-react'
import Image from 'next/image'

type ResourceFilter = 'tech' | 'links' | 'wallpapers'

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
  gumroadUrl: string | null
}

function ResourcesContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlFilter = searchParams.get('type') as ResourceFilter | null
  const [filter, setFilter] = useState<ResourceFilter>(urlFilter || 'tech')
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  const handleFilterChange = (newFilter: ResourceFilter) => {
    setFilter(newFilter)
    if (newFilter === 'tech') {
      router.push('/resources/marketplace')
    } else {
      router.push(`/resources/marketplace?type=${newFilter}`)
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
        tech: 'TECH_ESSENTIALS',
        links: 'USEFUL_LINKS',
        wallpapers: 'WALLPAPERS'
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
              title="Resources"
              subtitle="Tools, Links & Digital Goods"
              description="Discover handpicked tech products, useful developer tools, and digital downloads. From productivity essentials to beautiful wallpapers, find quality resources that enhance your workflow."
              icon={Layers}
              gradient={false}
              splitColor={true}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <section className="py-2 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <button
                onClick={() => handleFilterChange('tech')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'tech'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <Sparkles className="inline-block w-4 h-4 mr-2" />
                Tech Essentials
              </button>
              <button
                onClick={() => handleFilterChange('links')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'links'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <LinkIcon className="inline-block w-4 h-4 mr-2" />
                Useful Links
              </button>
              <button
                onClick={() => handleFilterChange('wallpapers')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === 'wallpapers'
                    ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
                    : 'bg-card border border-border hover:border-theme-primary/50 text-foreground'
                }`}
              >
                <Monitor className="inline-block w-4 h-4 mr-2" />
                Wallpapers
              </button>
            </div>

            {/* Affiliate Disclosure */}
            <div className="max-w-4xl mx-auto mb-8 p-4 bg-muted/50 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Disclosure:</strong> Some links on this page are affiliate links. I may earn a commission if you make a purchase through these links, at no additional cost to you. I only recommend products I personally use and believe in.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-24">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-theme-primary border-t-transparent"></div>
                <p className="mt-4 text-muted-foreground">Loading {filter}...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20 flex items-center justify-center">
                  {filter === 'tech' && <Sparkles className="w-12 h-12 text-theme-primary" />}
                  {filter === 'wallpapers' && <Monitor className="w-12 h-12 text-theme-primary" />}
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
                      <div className="relative w-full h-48 bg-white dark:bg-gray-100 overflow-hidden flex items-center justify-center p-4">
                        <Image
                          src={resource.image}
                          alt={resource.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Price Badge */}
                        {resource.price && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-theme-primary text-white text-sm font-bold rounded-full shadow-lg">
                            {resource.price}
                          </div>
                        )}
                        {!resource.price && filter === 'wallpapers' && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm font-bold rounded-full shadow-lg">
                            Free
                          </div>
                        )}
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
                        {filter === 'wallpapers' && resource.gumroadUrl ? (
                          <a
                            href={resource.gumroadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors text-sm font-medium"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        ) : (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-secondary transition-colors text-sm font-medium"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {filter === 'tech' && resource.price ? 'Buy Now' : 'View Product'}
                          </a>
                        )}
                      </div>

                      {/* Affiliate Notice */}
                      {resource.isAffiliate && (
                        <p className="text-xs text-muted-foreground mt-3 italic">
                          * Affiliate link
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

export default function ResourcesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-theme-primary border-t-transparent"></div>
      </div>
    }>
      <ResourcesContent />
    </Suspense>
  )
}
