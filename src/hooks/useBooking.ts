import { useState, useEffect } from 'react';
import { useContract, useContractWrite, useAddress } from '@thirdweb-dev/react';
import { CONTRACTS } from '@/constants/contracts';
import { graphService } from '@/lib/graph';

export function useBooking() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const address = mounted ? useAddress() : null;
  const { contract } = mounted ? useContract(CONTRACTS.BOOKING_ESCROW) : { contract: null };
  
  // Only use contract writes if mounted and contract exists
  const createBookingWrite = mounted && contract ? useContractWrite(contract, 'createBooking') : null;
  const acceptBookingWrite = mounted && contract ? useContractWrite(contract, 'acceptBooking') : null;
  const completeBookingWrite = mounted && contract ? useContractWrite(contract, 'completeBooking') : null;
  const cancelBookingWrite = mounted && contract ? useContractWrite(contract, 'cancelBooking') : null;

  const createNewBooking = async (
    guide: string,
    amount: string,
    experienceId: string
  ) => {
    if (!mounted || !createBookingWrite) {
      throw new Error('Booking system not ready');
    }
    
    setIsCreating(true);
    setError(null);

    try {
      const result = await createBookingWrite.mutateAsync({
        args: [guide, amount, experienceId]
      });

      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Booking creation failed';
      setError(message);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const acceptExistingBooking = async (bookingId: string) => {
    if (!mounted || !acceptBookingWrite) {
      throw new Error('Booking system not ready');
    }
    
    try {
      setError(null);
      const result = await acceptBookingWrite.mutateAsync({
        args: [bookingId]
      });
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Booking acceptance failed';
      setError(message);
      throw error;
    }
  };

  const completeExistingBooking = async (bookingId: string) => {
    if (!mounted || !completeBookingWrite) {
      throw new Error('Booking system not ready');
    }
    
    try {
      setError(null);
      const result = await completeBookingWrite.mutateAsync({
        args: [bookingId]
      });
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Booking completion failed';
      setError(message);
      throw error;
    }
  };

  const cancelExistingBooking = async (bookingId: string) => {
    if (!mounted || !cancelBookingWrite) {
      throw new Error('Booking system not ready');
    }
    
    try {
      setError(null);
      const result = await cancelBookingWrite.mutateAsync({
        args: [bookingId]
      });
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Booking cancellation failed';
      setError(message);
      throw error;
    }
  };

  const getUserBookings = async () => {
    if (!address) return [];
    
    try {
      const bookings = await graphService.getTouristBookings(address);
      return bookings;
    } catch (error) {
      console.error('Failed to fetch user bookings:', error);
      return [];
    }
  };

  const getGuideBookings = async (guideAddress: string) => {
    try {
      const bookings = await graphService.getGuideBookings(guideAddress);
      return bookings;
    } catch (error) {
      console.error('Failed to fetch guide bookings:', error);
      return [];
    }
  };

  return {
    createNewBooking,
    acceptExistingBooking,
    completeExistingBooking,
    cancelExistingBooking,
    getUserBookings,
    getGuideBookings,
    isCreating,
    error,
    clearError: () => setError(null)
  };
}