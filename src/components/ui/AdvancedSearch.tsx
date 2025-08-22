/**
 * Advanced Search Component
 * Comprehensive search interface with filters
 */

"use client";

import { useState } from "react";
import { useAdvancedSearch } from "@/hooks/useAdvancedSearch";
import { Pagination } from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { SA_LOCATIONS, TOURISM_SPECIALTIES } from "@/constants";

export function AdvancedSearch() {
  const {
    filters,
    searchResults,
    loading,
    searchHistory,
    updateFilter,
    resetFilters,
    search,
  } = useAdvancedSearch();

  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState(filters.query);

  const {
    currentPage,
    totalPages,
    totalItems,
    currentData,
    goToPage,
  } = usePagination({
    data: searchResults.guides,
    itemsPerPage: 6,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(searchInput);
  };

  const handleFilterChange = (key: string, value: any) => {
    updateFilter(key as any, value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Search Bar */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Search guides, locations, specialties..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  background: loading ? '#9ca3af' : 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  padding: '12px 16px',
                  border: showFilters ? '1px solid #3b82f6' : '1px solid #d1d5db',
                  background: showFilters ? '#eff6ff' : 'white',
                  color: showFilters ? '#1d4ed8' : '#374151',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </svg>
                <span style={{ display: window.innerWidth >= 640 ? 'inline' : 'none' }}>Filters</span>
              </button>
            </div>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Recent:</span>
              {searchHistory.slice(0, 5).map((term, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSearchInput(term);
                    search(term);
                  }}
                  style={{
                    padding: '4px 12px',
                    background: '#f3f4f6',
                    color: '#374151',
                    borderRadius: '20px',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#e5e7eb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#f3f4f6'}
                >
                  {term}
                </button>
              ))}
            </div>
          )}
        </form>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>Advanced Filters</h3>
            <button
              onClick={resetFilters}
              style={{
                color: '#2563eb',
                fontSize: '14px',
                fontWeight: '500',
                padding: '4px 12px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#eff6ff'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Reset All
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            {/* Location Filter */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Location</label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  background: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
              >
                <option value="">All Locations</option>
                {SA_LOCATIONS.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Specialty Filter */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Specialty</label>
              <select
                value={filters.specialty}
                onChange={(e) => handleFilterChange("specialty", e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  background: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
              >
                <option value="">All Specialties</option>
                {TOURISM_SPECIALTIES.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Price Range (USD)</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ""}
                  onChange={(e) => handleFilterChange("minPrice", Number(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice === 1000 ? "" : filters.maxPrice}
                  onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value) || 1000)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}>Minimum Rating</label>
              <select
                value={filters.minRating}
                onChange={(e) => handleFilterChange("minRating", Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '12px',
                  background: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4+ Stars</option>
                <option value={4.5}>4.5+ Stars</option>
                <option value={5}>5 Stars</option>
              </select>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={filters.verified}
                onChange={(e) => handleFilterChange("verified", e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: '#2563eb'
                }}
              />
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Verified guides only</span>
            </label>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={filters.availability}
                onChange={(e) => handleFilterChange("availability", e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: '#2563eb'
                }}
              />
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Available now</span>
            </label>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937'
            }}>
              Search Results ({searchResults.totalResults})
            </h2>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Found in {searchResults.searchTime}ms
            </p>
          </div>
          
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              background: 'white',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
          >
            <option value="relevance">Most Relevant</option>
            <option value="rating">Highest Rated</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {loading ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ animation: 'pulse 2s infinite' }}>
                <div style={{
                  width: '100%',
                  height: '192px',
                  background: '#e5e7eb',
                  borderRadius: '16px',
                  marginBottom: '16px'
                }}></div>
                <div style={{
                  height: '16px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  width: '75%',
                  marginBottom: '8px'
                }}></div>
                <div style={{
                  height: '12px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  width: '50%'
                }}></div>
              </div>
            ))}
          </div>
        ) : currentData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#f3f4f6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <svg style={{ width: '32px', height: '32px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>No guides found</h3>
            <p style={{ color: '#6b7280' }}>Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '24px'
            }}>
              {currentData.map((guide) => (
                <div key={guide.id} style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}>
                  <div style={{
                    width: '100%',
                    height: '192px',
                    background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '36px',
                    fontWeight: '700',
                    marginBottom: '16px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}>
                    {guide.name.charAt(0)}
                  </div>
                  <h3 style={{
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px',
                    fontSize: '18px'
                  }}>{guide.name}</h3>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '14px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {guide.location}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          style={{
                            width: '16px',
                            height: '16px',
                            color: i < Math.floor(guide.rating) ? '#fbbf24' : '#d1d5db'
                          }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>({guide.totalBookings} bookings)</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid #f3f4f6'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#1f2937'
                      }}>${guide.pricePerHour}</span>
                      <span style={{
                        color: '#6b7280',
                        fontSize: '14px'
                      }}>/hour</span>
                    </div>
                    <button style={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}>
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              totalItems={totalItems}
              itemsPerPage={6}
            />
          </>
        )}
      </div>
    </div>
  );
}