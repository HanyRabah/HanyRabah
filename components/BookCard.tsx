"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Star, BookOpen, Headphones, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface BookCardProps {
  book: {
    id: string;
    title: string;
    description: string | null;
    author: string | null;
    image: string | null;
    url: string; // Read URL
    audioUrl: string | null; // Listen URL
    rating: number | null;
    narrator: string | null;
    audioDuration: string | null;
    category: string | null;
    tags: string[];
    isAffiliate: boolean;
  };
  onTrackClick: (id: string, type: 'read' | 'listen') => void;
}

export function BookCard({ book, onTrackClick }: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  const hasReadUrl = !!book.url;
  const hasAudioUrl = !!book.audioUrl;

  const handleClick = (type: 'read' | 'listen') => {
    onTrackClick(book.id, type);
    const url = type === 'read' ? book.url : book.audioUrl;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="group relative bg-background border border-border rounded-xl overflow-hidden hover:border-theme-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-theme-primary/10 flex flex-col h-full">
      {/* Book Cover */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted flex-shrink-0">
        {book.image && !imageError ? (
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-theme-primary/20 to-theme-secondary/20">
            <BookOpen className="w-16 h-16 text-theme-primary/50" />
          </div>
        )}
        
        {/* Rating Badge */}
        {book.rating && (
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-semibold text-sm">{book.rating.toFixed(1)}</span>
          </div>
        )}

        {/* Category Badge */}
        {book.category && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-black/80 backdrop-blur-sm text-white text-xs font-semibold border border-white/20 shadow-lg">
              {book.category}
            </Badge>
          </div>
        )}

        {/* Hover Overlay with Actions - Desktop Only */}
        <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-end p-4 gap-2">
          {hasReadUrl && (
            <Button
              onClick={() => handleClick('read')}
              className="w-full bg-white hover:bg-white/90 text-black font-semibold"
              size="sm"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Read
            </Button>
          )}
          {hasAudioUrl && (
            <Button
              onClick={() => handleClick('listen')}
              className="w-full bg-theme-primary hover:bg-theme-secondary text-white font-semibold"
              size="sm"
            >
              <Headphones className="w-4 h-4 mr-2" />
              Listen
              {book.audioDuration && (
                <span className="ml-2 text-xs opacity-90">({book.audioDuration})</span>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Book Info - Flex grow to push buttons to bottom */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="font-bold text-foreground mb-1 line-clamp-2 group-hover:text-theme-primary transition-colors">
            {book.title}
          </h3>
          
          {book.author && (
            <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
          )}

          {book.narrator && hasAudioUrl && (
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <Headphones className="w-3 h-3" />
              Narrated by {book.narrator}
            </p>
          )}

          {book.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {book.description}
            </p>
          )}

          {/* Tags - Improved Design */}
          {book.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {book.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-theme-primary/10 to-theme-secondary/10 border border-theme-primary/20 text-theme-primary text-xs font-medium rounded-md hover:from-theme-primary/20 hover:to-theme-secondary/20 transition-colors"
                >
                  #{tag}
                </span>
              ))}
              {book.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 text-muted-foreground text-xs font-medium">
                  +{book.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Affiliate Notice */}
          {book.isAffiliate && (
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
              <ExternalLink className="w-3 h-3" />
              Affiliate link
            </p>
          )}
        </div>

        {/* Action Buttons - Always at bottom */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-border/50">
          {hasReadUrl && (
            <Button
              onClick={() => handleClick('read')}
              variant="outline"
              size="sm"
              className="flex-1 hover:bg-theme-primary/10 hover:text-theme-primary hover:border-theme-primary"
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Read
            </Button>
          )}
          {hasAudioUrl && (
            <Button
              onClick={() => handleClick('listen')}
              size="sm"
              className="flex-1 bg-theme-primary hover:bg-theme-secondary text-white"
              title={book.audioDuration ? `Duration: ${book.audioDuration}` : 'Listen'}
            >
              <Headphones className="w-4 h-4 mr-1.5" />
              <span className="truncate">Listen</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
