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

  // Helper functions defined outside useMemo
  const generateLocationFacets = useCallback((guides: Guide[]) => {
    const locationCounts = guides.reduce((acc, guide) => {
      acc[guide.location] = (acc[guide.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(locationCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, []);

  const generateSpecialtyFacets = useCallback((guides: Guide[]) => {
    const specialtyCounts = guides.reduce((acc, guide) => {
      guide.specialties.forEach(specialty => {
        acc[specialty] = (acc[specialty] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(specialtyCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, []);

  const generatePriceRangeFacets = useCallback((guides: Guide[]) => {
    const ranges = [
      { range: "$0 - $50", min: 0, max: 50 },
      { range: "$51 - $100", min: 51, max: 100 },
      { range: "$101 - $200", min: 101, max: 200 },
      { range: "$201 - $500", min: 201, max: 500 },
      { range: "$500+", min: 500, max: Infinity },
    ];

    return ranges.map(({ range, min, max }) => ({
      range,
      count: guides.filter(guide => 
        guide.pricePerHour >= min && guide.pricePerHour <= max
      ).length,
    })).filter(item => item.count > 0);
  }, []);

  const generateRatingFacets = useCallback((guides: Guide[]) => {
    const ratings = [5, 4, 3, 2, 1];
    
    return ratings.map(rating => ({
      rating,
      count: guides.filter(guide => 
        Math.floor(guide.rating) === rating
      ).length,
    })).filter(item => item.count > 0);
  }, []);

  const generateSuggestions = useCallback((query: string, guides: Guide[]): string[] => {
    if (!query || query.length < 2) return [];

    const suggestions = new Set<string>();
    const lowerQuery = query.toLowerCase();

    SA_LOCATIONS.forEach(location => {
      if (location.toLowerCase().includes(lowerQuery)) {
        suggestions.add(location);
      }
    });

    TOURISM_SPECIALTIES.forEach(specialty => {
      if (specialty.toLowerCase().includes(lowerQuery)) {
        suggestions.add(specialty);
      }
    });

    guides.forEach(guide => {
      if (guide.name.toLowerCase().includes(lowerQuery)) {
        suggestions.add(guide.name);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }, []);

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