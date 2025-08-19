import { useState } from 'react';
import { useContract, useContractWrite, useAddress } from '@thirdweb-dev/react';
import { CONTRACTS } from '@/constants/contracts';
import { graphService } from '@/lib/graph';

export function useBooking() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const address = useAddress();

  const { contract } = useContract(CONTRACTS.BOOKING_ESCROW);
  const { mutateAsync: createBooking } = useContractWrite(contract, 'createBooking');
  const { mutateAsync: acceptBooking } = useContractWrite(contract, 'acceptBooking');
  const { mutateAsync: completeBooking } = useContractWrite(contract, 'completeBooking');
  const { mutateAsync: cancelBooking } = useContractWrite(contract, 'cancelBooking');

  const createNewBooking = async (
    guide: string,
    amount: string,
    experienceId: string
  ) => {
    setIsCreating(true);
    setError(null);

    try {
      const result = await createBooking({
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
    try {
      setError(null);
      const result = await acceptBooking({
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
    try {
      setError(null);
      const result = await completeBooking({
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
    try {
      setError(null);
      const result = await cancelBooking({
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