'use client';

import { useState, useEffect } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useBooking } from '@/hooks/useBooking';
import { useReputation } from '@/hooks/useReputation';

interface Booking {
  id: string;
  tourist: string;
  amount: string;
  status: string;
  experienceId: string;
  createdAt: string;
  completedAt?: string;
}

export function GuideDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reputation, setReputation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'bookings' | 'earnings' | 'reputation'>('bookings');
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-24 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  const { getGuideBookings, acceptExistingBooking, completeExistingBooking } = useBooking();
  const { getGuideReputation } = useReputation();

  useEffect(() => {
    if (address) {
      loadDashboardData();
    }
  }, [address]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [guideBookings, guideReputation] = await Promise.all([
        getGuideBookings(address!),
        getGuideReputation(address!)
      ]);
      
      setBookings(guideBookings);
      setReputation(guideReputation);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      await acceptExistingBooking(bookingId);
      await loadDashboardData(); // Refresh data
    } catch (error) {
      console.error('Failed to accept booking:', error);
    }
  };

  const handleCompleteBooking = async (bookingId: string) => {
    try {
      await completeExistingBooking(bookingId);
      await loadDashboardData(); // Refresh data
    } catch (error) {
      console.error('Failed to complete booking:', error);
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

  const calculateEarnings = () => {
    const completedBookings = bookings.filter(b => b.status === '2');
    const totalEarnings = completedBookings.reduce((sum, booking) => {
      const amount = parseFloat(booking.amount);
      const platformFee = amount * 0.075; // 7.5% platform fee
      return sum + (amount - platformFee);
    }, 0);
    
    return {
      totalEarnings: totalEarnings.toFixed(2),
      completedBookings: completedBookings.length,
      pendingBookings: bookings.filter(b => b.status === '0').length
    };
  };

  if (!address) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Guide Dashboard</h1>
          <p className="text-gray-600">Please connect your wallet to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const earnings = calculateEarnings();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Guide Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Earnings</h3>
          <p className="text-2xl font-bold text-green-600">{earnings.totalEarnings} USDC</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Completed Bookings</h3>
          <p className="text-2xl font-bold text-blue-600">{earnings.completedBookings}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {reputation ? reputation.averageRating.toFixed(1) : '0.0'} ★
          </p>
        </div>
      </div>

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
              Bookings
            </button>
            <button
              onClick={() => setActiveTab('earnings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'earnings'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Earnings
            </button>
            <button
              onClick={() => setActiveTab('reputation')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reputation'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reviews
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
                      <p className="text-gray-600">Tourist: {booking.tourist}</p>
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
                          onClick={() => handleAcceptBooking(booking.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Accept
                        </button>
                      )}
                      {booking.status === '1' && (
                        <button
                          onClick={() => handleCompleteBooking(booking.id)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Complete
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

      {activeTab === 'earnings' && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Earnings Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Bookings Completed:</span>
              <span className="font-medium">{earnings.completedBookings}</span>
            </div>
            <div className="flex justify-between">
              <span>Gross Earnings:</span>
              <span className="font-medium">{earnings.totalEarnings} USDC</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fees (7.5%):</span>
              <span className="font-medium text-red-600">
                -{(parseFloat(earnings.totalEarnings) * 0.075 / 0.925).toFixed(2)} USDC
              </span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-semibold">
              <span>Net Earnings:</span>
              <span className="text-green-600">{earnings.totalEarnings} USDC</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'reputation' && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Your Reviews</h3>
          {reputation && reputation.reviews.length > 0 ? (
            <div className="space-y-4">
              {reputation.reviews.map((review: any, index: number) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-yellow-400">
                      {Array.from({ length: review.rating }, (_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(parseInt(review.timestamp) * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  {review.metadata && (
                    <p className="text-gray-700">{review.metadata.comment}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      )}
    </div>
  );
}