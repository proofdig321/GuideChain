/**
 * Guides List Component with Pagination
 * Following Development Rules V2 - NO MOCK DATA
 */

"use client";

import React, { useState } from "react";
import { Pagination } from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { useRealTimeWeb3 } from "@/hooks/useRealTimeWeb3";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Guide } from "@/types";

export function GuidesList(): React.JSX.Element {
  const { useVerifiedGuides } = useRealTimeWeb3();
  const { data: guides, loading, error, isEmpty } = useVerifiedGuides();
  const [filter, setFilter] = useState("");

  const filteredGuides = guides?.filter(guide =>
    guide.name.toLowerCase().includes(filter.toLowerCase()) ||
    guide.location.toLowerCase().includes(filter.toLowerCase()) ||
    guide.specialties.some(s => s.toLowerCase().includes(filter.toLowerCase()))
  ) || [];

  const {
    currentPage,
    totalPages,
    totalItems,
    currentData,
    goToPage,
  } = usePagination({
    data: filteredGuides,
    itemsPerPage: 6,
  });

  // Early returns for loading, error, and empty states
  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="text-center">
          <h3 className="font-semibold text-red-800 mb-2">Failed to Load Guides</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon="🧭"
        title="No Verified Guides Available"
        description="No guides have been verified yet. Be the first to apply and get verified as a guide on the platform."
        actionLabel="Apply to Become Guide"
        onAction={() => window.open('/verify', '_blank')}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Available Guides</h2>
        <input
          type="text"
          placeholder="Search guides, locations, specialties..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((guide) => (
          <div key={guide.id} className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold">
                {guide.name.charAt(0)}
              </div>
              {guide.verified && (
                <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>
              )}
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.name}</h3>
              <p className="text-gray-600 mb-3 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {guide.location}
              </p>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(guide.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">({guide.totalBookings} bookings)</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {guide.specialties.map((specialty, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {specialty}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">${guide.pricePerHour}/hr</span>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                  Book Now
                </button>
              </div>
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
    </div>
  );
}