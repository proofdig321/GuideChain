import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { platformFunctions } from "@/lib/contracts";
import { PLATFORM_CONFIG } from "@/constants";
import type { PlatformStats, UserProfile } from "@/types";

export function usePlatform() {
  const [stats, setStats] = useState<PlatformStats>({
    totalGuides: 0,
    totalBookings: 0,
    totalRevenue: "0",
    platformFees: "0",
    activeUsers: 0,
    averageRating: 0,
  });
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();

  // Check if user is admin
  const isAdmin = account?.address?.toLowerCase() === PLATFORM_CONFIG.ADMIN_ADDRESS.toLowerCase();

  // Fetch platform statistics
  const fetchPlatformStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const platformStats = await platformFunctions.getPlatformStats();
      setStats(platformStats);
    } catch (err) {
      console.error("Failed to fetch platform stats:", err);
      setError("Failed to load platform statistics");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async () => {
    if (!account?.address) return;
    
    try {
      // This would typically fetch from contracts or a subgraph
      // For now, we'll create a basic profile structure
      const profile: UserProfile = {
        address: account.address,
        isGuide: false, // Would be determined from GuideRegistry
        isAdmin: isAdmin,
        totalBookings: 0,
        totalSpent: "0",
        totalEarned: "0",
        reputation: 0,
        joinedAt: new Date().toISOString(), // Would be from first transaction
      };
      
      setUserProfile(profile);
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      setUserProfile(null);
    }
  };

  // Calculate platform revenue
  const calculatePlatformRevenue = (): number => {
    return parseFloat(stats.platformFees);
  };

  // Calculate total volume
  const calculateTotalVolume = (): number => {
    return parseFloat(stats.totalRevenue);
  };

  // Get platform fee percentage
  const getPlatformFeePercentage = (): number => {
    return PLATFORM_CONFIG.FEE_PERCENTAGE;
  };

  // Calculate guide earnings from total revenue
  const calculateTotalGuideEarnings = (): number => {
    const totalRevenue = parseFloat(stats.totalRevenue);
    const platformFees = parseFloat(stats.platformFees);
    return totalRevenue - platformFees;
  };

  // Get platform health metrics
  const getPlatformHealth = () => {
    const avgBookingsPerGuide = stats.totalGuides > 0 ? stats.totalBookings / stats.totalGuides : 0;
    const avgRevenuePerGuide = stats.totalGuides > 0 ? parseFloat(stats.totalRevenue) / stats.totalGuides : 0;
    
    return {
      avgBookingsPerGuide: Math.round(avgBookingsPerGuide * 100) / 100,
      avgRevenuePerGuide: Math.round(avgRevenuePerGuide * 100) / 100,
      platformUtilization: stats.totalGuides > 0 ? (stats.activeUsers / stats.totalGuides) * 100 : 0,
      averageRating: stats.averageRating,
    };
  };

  // Get growth metrics (would need historical data)
  const getGrowthMetrics = () => {
    // This would typically compare current stats with previous periods
    // For now, returning placeholder structure
    return {
      guidesGrowth: 0, // Percentage growth in guides
      bookingsGrowth: 0, // Percentage growth in bookings
      revenueGrowth: 0, // Percentage growth in revenue
      usersGrowth: 0, // Percentage growth in active users
    };
  };

  // Get top performing metrics
  const getTopMetrics = () => {
    return {
      totalValue: parseFloat(stats.totalRevenue),
      platformEarnings: parseFloat(stats.platformFees),
      guideEarnings: calculateTotalGuideEarnings(),
      averageBookingValue: stats.totalBookings > 0 ? parseFloat(stats.totalRevenue) / stats.totalBookings : 0,
    };
  };

  // Format currency for display
  const formatCurrency = (amount: string | number): string => {
    const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(numAmount);
  };

  // Format large numbers
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  // Get platform status
  const getPlatformStatus = (): "healthy" | "warning" | "critical" => {
    const health = getPlatformHealth();
    
    if (health.averageRating >= 4.0 && health.platformUtilization >= 50) {
      return "healthy";
    } else if (health.averageRating >= 3.0 && health.platformUtilization >= 25) {
      return "warning";
    } else {
      return "critical";
    }
  };

  // Get admin dashboard data
  const getAdminDashboardData = () => {
    if (!isAdmin) return null;
    
    return {
      stats,
      health: getPlatformHealth(),
      growth: getGrowthMetrics(),
      topMetrics: getTopMetrics(),
      status: getPlatformStatus(),
    };
  };

  // Get user dashboard data
  const getUserDashboardData = () => {
    if (!userProfile) return null;
    
    return {
      profile: userProfile,
      isGuide: userProfile.isGuide,
      totalBookings: userProfile.totalBookings,
      totalSpent: userProfile.totalSpent,
      totalEarned: userProfile.totalEarned,
      reputation: userProfile.reputation,
    };
  };

  // Check if platform is operational
  const isPlatformOperational = (): boolean => {
    return stats.totalGuides > 0 && getPlatformStatus() !== "critical";
  };

  // Get platform configuration
  const getPlatformConfig = () => {
    return {
      name: PLATFORM_CONFIG.NAME,
      feePercentage: PLATFORM_CONFIG.FEE_PERCENTAGE,
      adminAddress: PLATFORM_CONFIG.ADMIN_ADDRESS,
      supportedChain: PLATFORM_CONFIG.SUPPORTED_CHAIN.name,
      usdcAddress: PLATFORM_CONFIG.USDC_ADDRESS,
    };
  };

  // Clear error
  const clearError = () => setError(null);

  // Refresh all data
  const refreshData = () => {
    fetchPlatformStats();
    if (account?.address) {
      fetchUserProfile();
    }
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPlatformStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchPlatformStats();
  }, []);

  useEffect(() => {
    if (account?.address) {
      fetchUserProfile();
    }
  }, [account?.address, isAdmin]);

  return {
    stats,
    userProfile,
    loading,
    error,
    isAdmin,
    fetchPlatformStats,
    fetchUserProfile,
    calculatePlatformRevenue,
    calculateTotalVolume,
    getPlatformFeePercentage,
    calculateTotalGuideEarnings,
    getPlatformHealth,
    getGrowthMetrics,
    getTopMetrics,
    formatCurrency,
    formatNumber,
    getPlatformStatus,
    getAdminDashboardData,
    getUserDashboardData,
    isPlatformOperational,
    getPlatformConfig,
    clearError,
    refreshData,
  };
}