"use client";

import { useEffect, useState } from "react";
import { 
  ExternalLink, 
  Star, 
  BookMarked, 
  Sparkles, 
  ShoppingBag, 
  Users, 
  Newspaper, 
  Podcast,
  Bookmark,
  Headphones,
  Clock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  audioUrl?: string | null;
  audioDuration?: string | null;
  narrator?: string | null;
}

interface ResourcePageProps {
  type: string;
  title: string;
  description: string;
  iconName: string;
}

// Icon mapping
const iconMap = {
  BookMarked,
  Sparkles,
  ShoppingBag,
  Users,
  Star,
  Newspaper,
  Podcast,
};

export function ResourcePage({ type, title, description, iconName }: ResourcePageProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get the icon component from the mapping
  const IconComponent = iconMap[iconName as keyof typeof iconMap] || Star;

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`/api/resources?type=${type.toUpperCase()}`);
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
  }, [type]);

  const handleResourceClick = async (resourceId: string, url: string) => {
    // Track click
    try {
      await fetch(`/api/resources/${resourceId}/click`, { method: 'POST' });
    } catch (err) {
      // Silent fail for analytics
    }
    
    // Open in new tab
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
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
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
            <IconComponent className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground mb-8">{description}</p>
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
          title={title}
          icon={IconComponent}
          description={description}
          gradient={true}
          splitColor={false}
        />
{/*         
        {resources.some(r => r.isAffiliate) && (
          <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg max-w-3xl mx-auto">
            <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
              <strong>Affiliate Disclosure:</strong> Some links on this page are affiliate links, 
              which means I may earn a small commission at no extra cost to you if you make a purchase.
            </p>
          </div>
        )} */}

        {/* Resources List */}
        {resources.length === 0 ? (
          <div className="text-center py-12">
            <IconComponent className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No resources yet</h3>
            <p className="text-muted-foreground">
              I'm currently curating the best {title.toLowerCase()} to share with you. Check back soon!
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-3">
            {resources.map((resource) => (
              <div
                key={resource.id}
                onClick={() => handleResourceClick(resource.id, resource.url)}
                className="group bg-card border border-border rounded-lg p-4 hover:border-theme-primary/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  {/* Favicon/Icon */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {resource.image ? (
                      <Image
                        src={resource.image}
                        alt={resource.title}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className="font-semibold text-base group-hover:text-theme-primary transition-colors">
                        {resource.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {resource.isAffiliate && (
                          <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full">
                            Affiliate
                          </span>
                        )}
                        <Bookmark className="h-4 w-4 text-muted-foreground group-hover:text-theme-primary transition-colors" />
                      </div>
                    </div>

                    {/* Description or URL */}
                    {resource.description ? (
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {resource.description}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground mb-2 truncate">
                        {resource.url}
                      </p>
                    )}

                    {/* Audiobook Info */}
                    {resource.audioUrl && (
                      <div className="flex flex-wrap items-center gap-3 mb-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Headphones className="h-3.5 w-3.5" />
                          <span>Audiobook available</span>
                        </div>
                        {resource.audioDuration && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{resource.audioDuration}</span>
                          </div>
                        )}
                        {resource.narrator && (
                          <span className="text-xs">
                            Narrated by {resource.narrator}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    {resource.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {resource.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
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
              Know of a great resource that should be included? I'd love to hear about it!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-theme-primary text-white rounded-lg hover:bg-theme-primary/90 transition-colors"
            >
              Suggest a Resource
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
