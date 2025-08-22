/**
 * Advanced Search Hook
 * Comprehensive search with filters and pagination
 */

import { useState, useCallback, useMemo } from "react";
import { useGuides } from "@/hooks/useGuides";
import type { Guide } from "@/types";
import { SA_LOCATIONS, TOURISM_SPECIALTIES } from "@/constants";

export interface SearchFilters {
  query: string;
  location: string;
  specialty: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  verified: boolean;
  availability: boolean;
  languages: string[];
  sortBy: "relevance" | "rating" | "price_low" | "price_high" | "newest";
}

export interface SearchResult {
  guides: Guide[];
  totalResults: number;
  searchTime: number;
  suggestions: string[];
  facets: {
    locations: Array<{ name: string; count: number }>;
    specialties: Array<{ name: string; count: number }>;
    priceRanges: Array<{ range: string; count: number }>;
    ratings: Array<{ rating: number; count: number }>;
  };
}

const defaultFilters: SearchFilters = {
  query: "",
  location: "",
  specialty: "",
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  verified: false,
  availability: false,
  languages: [],
  sortBy: "relevance",
};

export function useAdvancedSearch() {
  const { guides, loading: guidesLoading } = useGuides();
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleGracefully = async <T>(
    operation: () => Promise<T>,
    fallback: T,
    errorMessage?: string
  ): Promise<T> => {
    try {
      return await operation();
    } catch (error) {
      console.error(errorMessage || 'Operation failed gracefully:', error);
      return fallback;
    }
  };

  // Advanced search algorithm
  const searchResults = useMemo((): SearchResult => {
    const startTime = Date.now();
    
    let filteredGuides = [...guides];

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredGuides = filteredGuides.filter(guide =>
        guide.name.toLowerCase().includes(query) ||
        guide.location.toLowerCase().includes(query) ||
        guide.experience.toLowerCase().includes(query) ||
        guide.specialties.some(s => s.toLowerCase().includes(query))
      );
    }

    // Location filter
    if (filters.location) {
      filteredGuides = filteredGuides.filter(guide =>
        guide.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Specialty filter
    if (filters.specialty) {
      filteredGuides = filteredGuides.filter(guide =>
        guide.specialties.some(s => 
          s.toLowerCase().includes(filters.specialty.toLowerCase())
        )
      );
    }

    // Price range filter
    filteredGuides = filteredGuides.filter(guide =>
      guide.pricePerHour >= filters.minPrice && 
      guide.pricePerHour <= filters.maxPrice
    );

    // Rating filter
    if (filters.minRating > 0) {
      filteredGuides = filteredGuides.filter(guide =>
        guide.rating >= filters.minRating
      );
    }

    // Verified filter
    if (filters.verified) {
      filteredGuides = filteredGuides.filter(guide => guide.verified);
    }

    // Availability filter
    if (filters.availability) {
      filteredGuides = filteredGuides.filter(guide => guide.availability);
    }

    // Languages filter
    if (filters.languages.length > 0) {
      filteredGuides = filteredGuides.filter(guide =>
        filters.languages.some(lang => 
          guide.languages.some(guideLang => 
            guideLang.toLowerCase().includes(lang.toLowerCase())
          )
        )
      );
    }

    // Sorting
    filteredGuides.sort((a, b) => {
      switch (filters.sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price_low":
          return a.pricePerHour - b.pricePerHour;
        case "price_high":
          return b.pricePerHour - a.pricePerHour;
        case "newest":
          return new Date(b.verificationDate || 0).getTime() - new Date(a.verificationDate || 0).getTime();
        case "relevance":
        default:
          // Relevance scoring based on query match
          if (!filters.query) return b.rating - a.rating;
          
          const getRelevanceScore = (guide: Guide) => {
            const query = filters.query.toLowerCase();
            let score = 0;
            
            if (guide.name.toLowerCase().includes(query)) score += 10;
            if (guide.specialties.some(s => s.toLowerCase().includes(query))) score += 5;
            if (guide.location.toLowerCase().includes(query)) score += 3;
            if (guide.experience.toLowerCase().includes(query)) score += 1;
            
            return score + guide.rating;
          };
          
          return getRelevanceScore(b) - getRelevanceScore(a);
      }
    });

    const searchTime = Date.now() - startTime;

    return {
      guides: filteredGuides,
      totalResults: filteredGuides.length,
      searchTime,
      suggestions: [],
      facets: {
        locations: [],
        specialties: [],
        priceRanges: [],
        ratings: [],
      },
    };
  }, [guides, filters]);

  const updateFilter = useCallback(<K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const search = useCallback(async (query: string) => {
    setLoading(true);
    
    await handleGracefully(
      async () => {
        // Simulate search delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        updateFilter("query", query);
        
        // Add to search history
        if (query && !searchHistory.includes(query)) {
          setSearchHistory(prev => [query, ...prev.slice(0, 9)]);
        }
        
        return true;
      },
      false,
      'Search operation failed'
    );
    
    setLoading(false);
  }, [updateFilter, searchHistory]);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  const saveSearch = useCallback((name: string) => {
    const savedSearch = {
      name,
      filters: { ...filters },
      timestamp: new Date().toISOString(),
    };
    
    // In a real app, save to localStorage or API
    console.log("Saved search:", savedSearch);
  }, [filters]);

  return {
    filters,
    searchResults,
    loading: loading || guidesLoading,
    searchHistory,
    updateFilter,
    updateFilters,
    resetFilters,
    search,
    clearSearchHistory,
    saveSearch,
  };
}