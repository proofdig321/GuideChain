/**
 * Real-time Web3 Data Hook
 * Eliminates all mock data - Web3 only
 */

import { useState, useEffect, useCallback } from "react";
import { useActiveAccount } from "thirdweb/react";
import { guideRegistryFunctions, bookingEscrowFunctions, platformFunctions } from "@/lib/contracts";
import type { Guide, Booking, PlatformStats } from "@/types";

interface Web3State<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export function useRealTimeWeb3() {
  const account = useActiveAccount();

  const handleGracefully = async <T>(
    operation: () => Promise<T>,
    fallback: T,
    errorMessage?: string
  ): Promise<T> => {
    try {
      return await operation();
    } catch (error) {
      console.error(errorMessage || 'Web3 operation failed gracefully:', error);
      return fallback;
    }
  };

  // Real-time platform statistics
  const usePlatformStats = () => {
    const [state, setState] = useState<Web3State<PlatformStats>>({
      data: null,
      loading: true,
      error: null,
      isEmpty: false,
    });

    const fetchStats = useCallback(async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const stats = await handleGracefully(
        () => platformFunctions.getPlatformStats(),
        {
          totalGuides: 0,
          totalBookings: 0,
          totalRevenue: "0",
          platformFees: "0",
          activeUsers: 0,
          averageRating: 0,
        },
        'Failed to fetch platform statistics'
      );

      const isEmpty = stats.totalGuides === 0 && stats.totalBookings === 0;

      setState({
        data: stats,
        loading: false,
        error: null,
        isEmpty,
      });
    }, []);

    useEffect(() => {
      fetchStats();
      // Refresh every 30 seconds
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }, [fetchStats]);

    return { ...state, refetch: fetchStats };
  };

  // Real-time verified guides
  const useVerifiedGuides = () => {
    const [state, setState] = useState<Web3State<Guide[]>>({
      data: null,
      loading: true,
      error: null,
      isEmpty: false,
    });

    const fetchGuides = useCallback(async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const guides = await handleGracefully(
        () => guideRegistryFunctions.getAllVerifiedGuides(),
        [],
        'Failed to fetch verified guides'
      );

      setState({
        data: guides,
        loading: false,
        error: null,
        isEmpty: guides.length === 0,
      });
    }, []);

    useEffect(() => {
      fetchGuides();
    }, [fetchGuides]);

    return { ...state, refetch: fetchGuides };
  };

  // Real-time user bookings
  const useUserBookings = () => {
    const [state, setState] = useState<Web3State<Booking[]>>({
      data: null,
      loading: true,
      error: null,
      isEmpty: false,
    });

    const fetchBookings = useCallback(async () => {
      if (!account?.address) {
        setState({
          data: [],
          loading: false,
          error: null,
          isEmpty: true,
        });
        return;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      const bookings = await handleGracefully(
        () => bookingEscrowFunctions.getUserBookings(account.address!),
        [],
        'Failed to fetch user bookings'
      );

      setState({
        data: bookings,
        loading: false,
        error: null,
        isEmpty: bookings.length === 0,
      });
    }, [account?.address]);

    useEffect(() => {
      fetchBookings();
    }, [fetchBookings]);

    return { ...state, refetch: fetchBookings };
  };

  // Real-time guide bookings
  const useGuideBookings = (guideAddress?: string) => {
    const [state, setState] = useState<Web3State<Booking[]>>({
      data: null,
      loading: true,
      error: null,
      isEmpty: false,
    });

    const fetchBookings = useCallback(async () => {
      const address = guideAddress || account?.address;
      if (!address) {
        setState({
          data: [],
          loading: false,
          error: null,
          isEmpty: true,
        });
        return;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      const bookings = await handleGracefully(
        () => bookingEscrowFunctions.getGuideBookings(address),
        [],
        'Failed to fetch guide bookings'
      );

      setState({
        data: bookings,
        loading: false,
        error: null,
        isEmpty: bookings.length === 0,
      });
    }, [guideAddress, account?.address]);

    useEffect(() => {
      fetchBookings();
    }, [fetchBookings]);

    return { ...state, refetch: fetchBookings };
  };

  // Get all unique users from contracts
  const useAllUsers = () => {
    const [state, setState] = useState<Web3State<string[]>>({
      data: null,
      loading: true,
      error: null,
      isEmpty: false,
    });

    const fetchUsers = useCallback(async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const [guides, allBookings] = await Promise.all([
        handleGracefully(
          () => guideRegistryFunctions.getAllVerifiedGuides(),
          [],
          'Failed to fetch guides'
        ),
        handleGracefully(
          async () => {
            // Get all bookings to extract tourist addresses
            // This is a simplified approach - in production, you'd have a more efficient method
            const stats = await platformFunctions.getPlatformStats();
            const bookings: Booking[] = [];
            
            // Get bookings for each guide
            for (const guide of guides) {
              const guideBookings = await bookingEscrowFunctions.getGuideBookings(guide.address);
              bookings.push(...guideBookings);
            }
            
            return bookings;
          },
          [],
          'Failed to fetch bookings'
        ),
      ]);

      // Extract unique addresses
      const uniqueAddresses = new Set<string>();
      
      // Add guide addresses
      guides.forEach(guide => uniqueAddresses.add(guide.address));
      
      // Add tourist addresses from bookings
      allBookings.forEach(booking => uniqueAddresses.add(booking.touristAddress));

      const users = Array.from(uniqueAddresses);

      setState({
        data: users,
        loading: false,
        error: null,
        isEmpty: users.length === 0,
      });
    }, []);

    useEffect(() => {
      fetchUsers();
    }, [fetchUsers]);

    return { ...state, refetch: fetchUsers };
  };

  return {
    usePlatformStats,
    useVerifiedGuides,
    useUserBookings,
    useGuideBookings,
    useAllUsers,
  };
}