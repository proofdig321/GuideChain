/**
 * Enterprise Statistics Component
 * Real-time platform metrics with graceful error handling
 * Following Development Rules V2 - NO MOCK DATA
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRealTimeWeb3 } from "@/hooks/useRealTimeWeb3";
import { EmptyState } from "@/components/ui/EmptyState";

interface PlatformStats {
  totalGuides: number;
  activeBookings: number;
  totalRevenue: string;
  platformFees: string;
  verifiedGuides: number;
  completedTours: number;
  averageRating: number;
  monthlyGrowth: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  color: string;
  bgColor: string;
  loading?: boolean;
}

function StatCard({ title, value, change, icon, color, bgColor, loading }: StatCardProps) {
  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
          style={{ backgroundColor: bgColor, color }}
        >
          {icon}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '↗' : '↘'} {Math.abs(change)}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function EnterpriseStats(): React.JSX.Element {
  const { usePlatformStats } = useRealTimeWeb3();
  const { data: stats, loading, error, isEmpty, refetch } = usePlatformStats();

  // Early returns for error and empty states
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Failed to Load Statistics</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={refetch}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isEmpty && !loading) {
    return (
      <EmptyState
        icon="📊"
        title="No Platform Data Available"
        description="Platform statistics will appear here once contracts are deployed and users start interacting"
        actionLabel="Deploy Contracts"
        onAction={() => window.open('https://thirdweb.com/dashboard', '_blank')}
      />
    );
  }

  const statCards = [
    {
      title: "Total Guides",
      value: stats?.totalGuides || 0,
      change: 0,
      icon: "🧭",
      color: "#3b82f6",
      bgColor: "#eff6ff",
    },
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      change: 0,
      icon: "📅",
      color: "#8b5cf6",
      bgColor: "#faf5ff",
    },
    {
      title: "Total Revenue (USDC)",
      value: `$${stats?.totalRevenue || "0"}`,
      change: 0,
      icon: "💰",
      color: "#059669",
      bgColor: "#ecfdf5",
    },
    {
      title: "Platform Fees (USDC)",
      value: `$${stats?.platformFees || "0"}`,
      change: 0,
      icon: "🏦",
      color: "#dc2626",
      bgColor: "#fef2f2",
    },
    {
      title: "Active Users",
      value: stats?.activeUsers || 0,
      change: 0,
      icon: "👥",
      color: "#ea580c",
      bgColor: "#fff7ed",
    },
    {
      title: "Average Rating",
      value: stats?.averageRating ? `${stats.averageRating.toFixed(1)}/5` : "0/5",
      change: 0,
      icon: "⭐",
      color: "#f59e0b",
      bgColor: "#fffbeb",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Platform Statistics</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Live Data
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            {...card}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}