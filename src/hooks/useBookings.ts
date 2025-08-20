import { useState, useEffect } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { bookingEscrowFunctions } from "@/lib/contracts";
import { ipfsService } from "@/lib/ipfs";
import type { Booking, IPFSMetadata } from "@/types";
import { BookingStatus } from "@/types";

export function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  // Fetch user's bookings (as tourist)
  const fetchUserBookings = async () => {
    if (!account?.address) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const userBookings = await bookingEscrowFunctions.getUserBookings(account.address);
      
      // Enrich bookings with IPFS metadata
      const enrichedBookings = await Promise.all(
        userBookings.map(async (booking) => {
          try {
            // For now, return booking as-is since we don't have experienceId metadata yet
            // In full implementation, we'd fetch IPFS metadata for additional details
            return booking;
          } catch (metadataError) {
            console.error(`Failed to fetch metadata for booking ${booking.id}:`, metadataError);
            return booking;
          }
        })
      );
      
      setBookings(enrichedBookings);
    } catch (err) {
      console.error("Failed to fetch user bookings:", err);
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // Fetch guide's bookings
  const fetchGuideBookings = async (guideAddress?: string) => {
    const address = guideAddress || account?.address;
    if (!address) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const guideBookings = await bookingEscrowFunctions.getGuideBookings(address);
      setBookings(guideBookings);
    } catch (err) {
      console.error("Failed to fetch guide bookings:", err);
      setError("Failed to load guide bookings");
    } finally {
      setLoading(false);
    }
  };

  // Create new booking
  const createBooking = async (
    guideAddress: string,
    amount: string,
    bookingData: {
      experienceTitle: string;
      scheduledDate: string;
      participants: number;
      specialRequests?: string;
    }
  ) => {
    if (!account?.address) {
      throw new Error("Wallet not connected");
    }

    try {
      setError(null);
      
      // Upload booking metadata to IPFS
      const metadataHash = await ipfsService.uploadBookingMetadata({
        guideAddress,
        touristAddress: account.address,
        experienceTitle: bookingData.experienceTitle,
        scheduledDate: bookingData.scheduledDate,
        participants: bookingData.participants,
        specialRequests: bookingData.specialRequests,
      });

      // Create booking transaction
      const transaction = bookingEscrowFunctions.createBooking(
        guideAddress,
        amount,
        metadataHash
      );

      // Send transaction
      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Booking created successfully:", result);
            resolve(result);
          },
          onError: (error) => {
            console.error("Booking creation failed:", error);
            reject(error);
          },
        });
      });

      // Refresh bookings
      await fetchUserBookings();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create booking";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Accept booking (guide only)
  const acceptBooking = async (bookingId: string) => {
    if (!account?.address) {
      throw new Error("Wallet not connected");
    }

    try {
      setError(null);
      
      const transaction = bookingEscrowFunctions.acceptBooking(bookingId);

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Booking accepted successfully:", result);
            resolve(result);
          },
          onError: (error) => {
            console.error("Booking acceptance failed:", error);
            reject(error);
          },
        });
      });

      // Refresh bookings
      await fetchGuideBookings();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to accept booking";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Complete booking (guide only)
  const completeBooking = async (bookingId: string) => {
    if (!account?.address) {
      throw new Error("Wallet not connected");
    }

    try {
      setError(null);
      
      const transaction = bookingEscrowFunctions.completeBooking(bookingId);

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Booking completed successfully:", result);
            resolve(result);
          },
          onError: (error) => {
            console.error("Booking completion failed:", error);
            reject(error);
          },
        });
      });

      // Refresh bookings
      await fetchGuideBookings();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to complete booking";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Cancel booking
  const cancelBooking = async (bookingId: string) => {
    if (!account?.address) {
      throw new Error("Wallet not connected");
    }

    try {
      setError(null);
      
      const transaction = bookingEscrowFunctions.cancelBooking(bookingId);

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Booking cancelled successfully:", result);
            resolve(result);
          },
          onError: (error) => {
            console.error("Booking cancellation failed:", error);
            reject(error);
          },
        });
      });

      // Refresh bookings
      await fetchUserBookings();
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to cancel booking";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Get booking by ID
  const getBooking = async (bookingId: string): Promise<Booking | null> => {
    try {
      return await bookingEscrowFunctions.getBooking(bookingId);
    } catch (error) {
      console.error("Failed to fetch booking:", error);
      return null;
    }
  };

  // Filter bookings by status
  const filterByStatus = (status: BookingStatus): Booking[] => {
    return bookings.filter(booking => booking.status === status);
  };

  // Get pending bookings
  const getPendingBookings = (): Booking[] => {
    return filterByStatus(BookingStatus.PENDING);
  };

  // Get accepted bookings
  const getAcceptedBookings = (): Booking[] => {
    return filterByStatus(BookingStatus.ACCEPTED);
  };

  // Get completed bookings
  const getCompletedBookings = (): Booking[] => {
    return filterByStatus(BookingStatus.COMPLETED);
  };

  // Get cancelled bookings
  const getCancelledBookings = (): Booking[] => {
    return filterByStatus(BookingStatus.CANCELLED);
  };

  // Get upcoming bookings (accepted and scheduled for future)
  const getUpcomingBookings = (): Booking[] => {
    const now = new Date();
    return bookings.filter(booking => 
      booking.status === BookingStatus.ACCEPTED &&
      new Date(booking.scheduledDate) > now
    );
  };

  // Get past bookings (completed)
  const getPastBookings = (): Booking[] => {
    return getCompletedBookings();
  };

  // Calculate total earnings (for guides)
  const calculateTotalEarnings = (): number => {
    return getCompletedBookings().reduce((total, booking) => {
      const amount = parseFloat(booking.amount);
      const platformFee = amount * 0.075; // 7.5% platform fee
      return total + (amount - platformFee);
    }, 0);
  };

  // Calculate total spent (for tourists)
  const calculateTotalSpent = (): number => {
    return getCompletedBookings().reduce((total, booking) => {
      return total + parseFloat(booking.amount);
    }, 0);
  };

  // Get booking statistics
  const getBookingStats = () => {
    const total = bookings.length;
    const pending = getPendingBookings().length;
    const accepted = getAcceptedBookings().length;
    const completed = getCompletedBookings().length;
    const cancelled = getCancelledBookings().length;
    
    return {
      total,
      pending,
      accepted,
      completed,
      cancelled,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
    };
  };

  // Clear error
  const clearError = () => setError(null);

  // Refresh bookings based on user type
  const refreshBookings = () => {
    fetchUserBookings();
  };

  useEffect(() => {
    if (account?.address) {
      fetchUserBookings();
    }
  }, [account?.address]);

  return {
    bookings,
    loading,
    error,
    createBooking,
    acceptBooking,
    completeBooking,
    cancelBooking,
    getBooking,
    fetchUserBookings,
    fetchGuideBookings,
    filterByStatus,
    getPendingBookings,
    getAcceptedBookings,
    getCompletedBookings,
    getCancelledBookings,
    getUpcomingBookings,
    getPastBookings,
    calculateTotalEarnings,
    calculateTotalSpent,
    getBookingStats,
    clearError,
    refreshBookings,
  };
}