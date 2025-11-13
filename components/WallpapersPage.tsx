"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink, Monitor, Smartphone, SeparatorVertical } from "lucide-react";
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
  gumroadUrl: string | null;
  price: string | null;
}

export function WallpapersPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch(`/api/resources?type=WALLPAPERS`);
        if (!response.ok) {
          throw new Error('Failed to fetch wallpapers');
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

  const handleDownload = async (resourceId: string, url: string) => {
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
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-muted rounded-lg"></div>
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
            <Monitor className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Wallpapers</h1>
            <p className="text-muted-foreground mb-8">Beautiful wallpapers for your devices</p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive">Failed to load wallpapers: {error}</p>
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
          title="Wallpapers"
          subtitle="Desktop & Mobile"
          description="Beautiful, high-quality wallpapers for your desktop and mobile devices. Free to download and use."
          icons={[Monitor, SeparatorVertical, Smartphone]}
          gradient={true}
          splitColor={false}
        />

        {/* Wallpapers List */}
        {resources.length === 0 ? (
          <div className="text-center py-12">
            <Monitor className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No wallpapers yet</h3>
            <p className="text-muted-foreground">
              I'm currently creating beautiful wallpapers to share with you. Check back soon!
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8 mt-8">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-theme-primary/50 transition-all duration-300"
              >
                {/* Large Preview Image */}
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-theme-primary/10 to-theme-accent/10">
                  {resource.image ? (
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Monitor className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                    {resource.gumroadUrl ? (
                      <button
                        onClick={() => handleDownload(resource.id, resource.gumroadUrl!)}
                        className="px-6 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="h-5 w-5" />
                        {resource.price || 'Buy on Gumroad'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDownload(resource.id, resource.url)}
                        className="px-6 py-3 bg-theme-primary text-white rounded-lg font-semibold hover:bg-theme-primary/90 transition-colors flex items-center gap-2"
                      >
                        <Download className="h-5 w-5" />
                        Free Download
                      </button>
                    )}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-theme-primary transition-colors">
                        {resource.title}
                      </h3>
                      
                      {resource.description && (
                        <p className="text-muted-foreground mb-3">
                          {resource.description}
                        </p>
                      )}

                      {/* Device Icons */}
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Monitor className="h-4 w-4" />
                          <span>Desktop</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Smartphone className="h-4 w-4" />
                          <span>Mobile</span>
                        </div>
                      </div>
                    </div>

                    {/* Download/Buy Button */}
                    {resource.gumroadUrl ? (
                      <button
                        onClick={() => handleDownload(resource.id, resource.gumroadUrl!)}
                        className="flex-shrink-0 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {resource.price || 'Buy'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDownload(resource.id, resource.url)}
                        className="flex-shrink-0 px-4 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary/90 transition-colors flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Free
                      </button>
                    )}
                  </div>

                  {/* Tags */}
                  {resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full border border-border"
                        >
                          {tag}
                        </span>
                      ))}
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
            <h3 className="text-xl font-semibold mb-3">Want more wallpapers?</h3>
            <p className="text-muted-foreground mb-6">
              I create new wallpapers regularly. Follow me to get notified when new ones are available!
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-theme-primary text-white rounded-lg hover:bg-theme-primary/90 transition-colors"
            >
              Get in Touch
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
