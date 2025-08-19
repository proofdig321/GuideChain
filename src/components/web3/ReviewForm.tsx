'use client';

import { useState } from 'react';
import { useReputation, ReviewData } from '@/hooks/useReputation';

interface ReviewFormProps {
  bookingId: string;
  guideName: string;
  onSuccess?: () => void;
}

export function ReviewForm({ bookingId, guideName, onSuccess }: ReviewFormProps) {
  const [reviewData, setReviewData] = useState<ReviewData>({
    rating: 5,
    comment: '',
    experienceQuality: 5,
    communication: 5,
    value: 5,
    photos: []
  });
  const [success, setSuccess] = useState(false);

  const { submitNewReview, isSubmitting, error, clearError } = useReputation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      clearError();
      await submitNewReview(bookingId, reviewData);
      setSuccess(true);
      onSuccess?.();
    } catch (error) {
      console.error('Review submission failed:', error);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReviewData(prev => ({ ...prev, photos: files }));
  };

  const StarRating = ({ value, onChange, label }: { value: number; onChange: (rating: number) => void; label: string }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`text-2xl ${star <= value ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Review Submitted!
        </h3>
        <p className="text-green-700">
          Thank you for reviewing {guideName}. Your review has been published on the blockchain.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Review Your Experience</h2>
      <p className="text-gray-600 mb-6">Share your experience with {guideName}</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <StarRating
        value={reviewData.rating}
        onChange={(rating) => setReviewData(prev => ({ ...prev, rating }))}
        label="Overall Rating"
      />

      <StarRating
        value={reviewData.experienceQuality}
        onChange={(rating) => setReviewData(prev => ({ ...prev, experienceQuality: rating }))}
        label="Experience Quality"
      />

      <StarRating
        value={reviewData.communication}
        onChange={(rating) => setReviewData(prev => ({ ...prev, communication: rating }))}
        label="Communication"
      />

      <StarRating
        value={reviewData.value}
        onChange={(rating) => setReviewData(prev => ({ ...prev, value: rating }))}
        label="Value for Money"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Your Review
        </label>
        <textarea
          value={reviewData.comment}
          onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
          className="w-full p-2 border rounded h-24"
          placeholder="Share details about your experience..."
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Photos (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          className="w-full p-2 border rounded"
        />
        {reviewData.photos && reviewData.photos.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">
            {reviewData.photos.length} photo{reviewData.photos.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={!reviewData.comment.trim() || isSubmitting}
        className="w-full bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting Review...' : 'Submit Review'}
      </button>
    </form>
  );
}