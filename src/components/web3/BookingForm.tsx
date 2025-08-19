'use client';

import { useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { useBooking } from '@/hooks/useBooking';
import { ConnectWallet } from '@thirdweb-dev/react';

interface BookingFormProps {
  guide: {
    address: string;
    name: string;
    experienceTitle: string;
    pricePerPerson: string;
    maxParticipants: number;
  };
}

export function BookingForm({ guide }: BookingFormProps) {
  const [participants, setParticipants] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [success, setSuccess] = useState(false);

  const address = useAddress();
  const { createNewBooking, isCreating, error, clearError } = useBooking();

  const totalAmount = (parseFloat(guide.pricePerPerson) * participants).toString();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) return;
    if (!selectedDate) return;

    try {
      clearError();
      
      const experienceId = `${guide.address}-${Date.now()}`;
      
      await createNewBooking(
        guide.address,
        totalAmount,
        experienceId
      );
      
      setSuccess(true);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  if (!address) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Connect Wallet to Book</h3>
        <ConnectWallet />
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Booking Submitted!
        </h3>
        <p className="text-green-700">
          Your booking request has been sent to {guide.name}. 
          You'll be notified when they accept your booking.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Book Experience</h2>
      <p className="text-gray-600 mb-4">{guide.experienceTitle}</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Number of Participants
        </label>
        <select
          value={participants}
          onChange={(e) => setParticipants(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
          required
        >
          {Array.from({ length: guide.maxParticipants }, (_, i) => i + 1).map(num => (
            <option key={num} value={num}>{num} participant{num > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Preferred Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Special Requests (Optional)
        </label>
        <textarea
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          className="w-full p-2 border rounded h-20"
          placeholder="Any special requirements or requests..."
        />
      </div>

      <div className="mb-6 p-3 bg-gray-50 rounded">
        <div className="flex justify-between items-center">
          <span>Total Amount:</span>
          <span className="font-semibold">{totalAmount} USDC</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={!selectedDate || isCreating}
        className="w-full bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCreating ? 'Creating Booking...' : 'Book Experience'}
      </button>
    </form>
  );
}