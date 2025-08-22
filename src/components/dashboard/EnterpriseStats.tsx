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
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        borderRadius: '24px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div style={{
              height: '16px',
              background: '#e5e7eb',
              borderRadius: '4px',
              width: '96px',
              animation: 'pulse 2s infinite'
            }}></div>
            <div style={{
              height: '32px',
              width: '32px',
              background: '#e5e7eb',
              borderRadius: '12px',
              animation: 'pulse 2s infinite'
            }}></div>
          </div>
          <div style={{
            height: '32px',
            background: '#e5e7eb',
            borderRadius: '4px',
            width: '64px',
            marginBottom: '8px',
            animation: 'pulse 2s infinite'
          }}></div>
          <div style={{
            height: '12px',
            background: '#e5e7eb',
            borderRadius: '4px',
            width: '80px',
            animation: 'pulse 2s infinite'
          }}></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      borderRadius: '24px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      cursor: 'default'
    }} onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.15)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }} onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: 'clamp(12px, 3vw, 14px)',
          fontWeight: '500',
          color: '#6b7280'
        }}>{title}</h3>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          backgroundColor: bgColor,
          color
        }}>
          {icon}
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between'
      }}>
        <div>
          <p style={{
            fontSize: 'clamp(20px, 5vw, 32px)',
            fontWeight: '700',
            color: '#1f2937',
            lineHeight: '1.2'
          }}>{value}</p>
          {change !== undefined && (
            <p style={{
              fontSize: '14px',
              fontWeight: '500',
              color: change >= 0 ? '#059669' : '#dc2626',
              marginTop: '4px'
            }}>
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
      <div style={{
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '24px',
        padding: '24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h3 style={{
                fontWeight: '600',
                color: '#991b1b'
              }}>Failed to Load Statistics</h3>
              <p style={{
                color: '#dc2626',
                fontSize: '14px'
              }}>{error}</p>
            </div>
          </div>
          <button
            onClick={refetch}
            style={{
              background: '#dc2626',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#b91c1c'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#dc2626'}
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <h2 style={{
          fontSize: 'clamp(20px, 5vw, 32px)',
          fontWeight: '700',
          color: '#1f2937'
        }}>Platform Statistics</h2>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            background: '#22c55e',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></div>
          Live Data
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px'
      }}>
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