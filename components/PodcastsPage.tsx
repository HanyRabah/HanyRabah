"use client";

import { useEffect, useState } from "react";
import { Play, Podcast } from "lucide-react";
import Image from "next/image";
import { PageHeader } from "./PageHeader";
import { ContactButton } from '@/components/ContactButton';

interface Resource {
  id: string;
  title: string;
  description: string | null;
  url: string;
  category: string | null;
  image: string | null;
  isAffiliate: boolean;
  tags: string[];
  clickCount: number;
}

const gradients = [
  "from-pink-500 via-rose-500 to-orange-500",
  "from-blue-500 via-cyan-500 to-teal-500",
  "from-purple-500 via-violet-500 to-indigo-500",
  "from-green-500 via-emerald-500 to-teal-500",
  "from-yellow-500 via-amber-500 to-orange-500",
  "from-red-500 via-pink-500 to-rose-500",
];

export function PodcastsPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`/api/resources?type=PODCAST`);
        if (!response.ok) {
          throw new Error('Failed to fetch podcasts');
        }
        const data = await response.json();
        setResources(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handlePodcastClick = async (resourceId: string, url: string) => {
    try {
      await fetch(`/api/resources/${resourceId}/click`, { method: 'POST' });
    } catch (err) {
      // Silent fail for analytics
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <Podcast className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Podcasts</h1>
            <p className="text-muted-foreground mb-8">Curated podcast recommendations</p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive">Failed to load podcasts: {error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <PageHeader
          title="Podcasts"
          subtitle="Audio Recommendations"
          description="Curated podcast recommendations covering tech, design, business, and personal development. Learn from industry experts and thought leaders."
          icon={Podcast}
          gradient={true}
          splitColor={false}
        />

        {/* Podcasts Grid */}
        {resources.length === 0 ? (
          <div className="text-center py-12">
            <Podcast className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No podcasts yet</h3>
            <p className="text-muted-foreground">
              I'm currently curating the best podcasts to share with you. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {resources.map((resource, index) => {
              const gradient = gradients[index % gradients.length];
              const isHovered = hoveredCard === resource.id;
              
              return (
                <div
                  key={resource.id}
                  onMouseEnter={() => setHoveredCard(resource.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handlePodcastClick(resource.id, resource.url)}
                  className="group relative cursor-pointer"
                >
                  {/* Card */}
                  <div className={`relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} p-6 flex flex-col justify-between transition-transform duration-300 hover:scale-105`}>
                    {/* Sound Wave Animation Background - Always Visible */}
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
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-3">Know a great podcast?</h3>
            <p className="text-muted-foreground mb-6">
              Have a podcast recommendation? I'd love to hear about it and potentially add it to the list!
            </p>
            <ContactButton 
              defaultReason="PODCAST"
              variant="default"
              size="lg"
            >
              Suggest a Topic
            </ContactButton>
          </div>
        </div>
      </div>
    </div>
  );
}
