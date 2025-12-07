"use client";

import { useEffect, useState } from "react";
import { Sparkles, Cpu, LampDesk, SeparatorVertical } from 'lucide-react'
import { ContactButton } from '@/components/ContactButton';
import Image from "next/image";
import { PageHeader } from "./PageHeader";

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

export function TechEssentialsPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`/api/resources?type=TECH_ESSENTIALS`);
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
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

  const handleResourceClick = async (resourceId: string, url: string) => {
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg"></div>
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
            <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Tech Essentials</h1>
            <p className="text-muted-foreground mb-8">Carefully curated tech products and software</p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive">Failed to load resources: {error}</p>
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
          title="Tech Essentials"
          icons={[Cpu, SeparatorVertical, LampDesk]}
          description="Carefully curated tech products, software tools, and gadgets that enhance productivity and creativity. Recommendations for developers, designers, and tech enthusiasts."
          gradient={true}
          splitColor={false}
        />

        {/* Grid */}
        {resources.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground">
              I'm currently curating the best tech essentials to share with you. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {resources.map((resource) => (
              <div
                key={resource.id}
                onClick={() => handleResourceClick(resource.id, resource.url)}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl hover:border-theme-primary/50 transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {resource.image ? (
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  {resource.isAffiliate && (
                    <div className="absolute top-2 right-2">
                      <div className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
                        Affiliate
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-1 group-hover:text-theme-primary transition-colors line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  {resource.category && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {resource.category}
                    </p>
                  )}

                  {/* Tags */}
                  {resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resource.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                      {resource.tags.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{resource.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-3">Have a suggestion?</h3>
            <p className="text-muted-foreground mb-6">
              Know of a great tech product that should be included? I'd love to hear about it!
            </p>
            <ContactButton 
              defaultReason="TECH_ESSENTIALS"
              variant="default"
              size="lg"
            >
              Suggest a Product
            </ContactButton>
          </div>
        </div>
      </div>
    </div>
  );
}
