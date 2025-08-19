'use client';

import { useState, useEffect } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useBooking } from '@/hooks/useBooking';
import { useReputation } from '@/hooks/useReputation';

interface Booking {
  id: string;
  guide: string;
  amount: string;
  status: string;
  experienceId: string;
  createdAt: string;
  completedAt?: string;
}

export function TouristDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'reviews'>('bookings');
  const [mounted, setMounted] = useState(false);

  const address = useAddress();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-24 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const { getUserBookings, cancelExistingBooking } = useBooking();
  const { canSubmitReview } = useReputation();

  useEffect(() => {
    if (address) {
      loadBookings();
    }
  }, [address]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const userBookings = await getUserBookings();
      setBookings(userBookings);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await cancelExistingBooking(bookingId);
      await loadBookings(); // Refresh bookings
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '0': return 'bg-yellow-100 text-yellow-800'; // PENDING
      case '1': return 'bg-blue-100 text-blue-800'; // ACCEPTED
      case '2': return 'bg-green-100 text-green-800'; // COMPLETED
      case '3': return 'bg-gray-100 text-gray-800'; // CANCELLED
      case '4': return 'bg-red-100 text-red-800'; // DISPUTED
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case '0': return 'Pending';
      case '1': return 'Accepted';
      case '2': return 'Completed';
      case '3': return 'Cancelled';
      case '4': return 'Disputed';
      default: return 'Unknown';
    }
  };

  if (!address) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tourist Dashboard</h1>
          <p className="text-gray-600">Please connect your wallet to view your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Tourist Dashboard</h1>
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Reviews
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'bookings' && (
        <div>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No bookings found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Booking #{booking.id}</h3>
                      <p className="text-gray-600">Guide: {booking.guide}</p>
                      <p className="text-gray-600">Amount: {booking.amount} USDC</p>
                      <p className="text-gray-600">
                        Created: {new Date(parseInt(booking.createdAt) * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                      {booking.status === '0' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Cancel
                        </button>
                      )}
                      {booking.status === '2' && (
                        <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700">
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="text-center py-8">
          <p className="text-gray-600">Review management coming soon...</p>
        </div>
      )}
    </div>
  );
}