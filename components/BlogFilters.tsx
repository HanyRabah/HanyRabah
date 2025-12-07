"use client";

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Badge } from './ui/badge';

interface BlogFiltersProps {
  allTags: string[];
  onFilterChange: (searchTerm: string, selectedTags: string[]) => void;
}

export function BlogFilters({ allTags, onFilterChange }: BlogFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFilterChange(value, selectedTags);
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    onFilterChange(searchTerm, newTags);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    onFilterChange('', []);
  };

  const hasActiveFilters = searchTerm || selectedTags.length > 0;

  return (
    <div className="mb-12 space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search articles by title, content, or tags..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-12 pr-12 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-primary/50 focus:border-theme-primary transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => handleSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tag Filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground mr-2">Filter by:</span>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                selectedTags.includes(tag)
                  ? 'bg-theme-primary text-white hover:bg-theme-secondary'
                  : 'hover:border-theme-primary hover:text-theme-primary'
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-theme-primary hover:text-theme-secondary font-medium ml-2 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="text-center text-sm text-muted-foreground">
          {searchTerm && (
            <span>Searching for "{searchTerm}"</span>
          )}
          {searchTerm && selectedTags.length > 0 && <span> • </span>}
          {selectedTags.length > 0 && (
            <span>Filtered by {selectedTags.length} tag{selectedTags.length > 1 ? 's' : ''}</span>
          )}
        </div>
      )}
    </div>
  );
}
