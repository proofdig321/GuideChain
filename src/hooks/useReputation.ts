import { useState } from 'react';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { CONTRACTS } from '@/constants/contracts';
import { ipfsService } from '@/lib/ipfs';
import { graphService } from '@/lib/graph';

export interface ReviewData {
  rating: number;
  comment: string;
  experienceQuality: number;
  communication: number;
  value: number;
  photos?: File[];
}

export function useReputation() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { contract } = useContract(CONTRACTS.REPUTATION_SYSTEM);
  const { mutateAsync: submitReview } = useContractWrite(contract, 'submitReview');

  const submitNewReview = async (bookingId: string, reviewData: ReviewData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Upload photos to IPFS if provided
      const photoHashes = [];
      if (reviewData.photos && reviewData.photos.length > 0) {
        for (const photo of reviewData.photos) {
          const result = await ipfsService.uploadFile(photo);
          photoHashes.push(result.cid);
        }
      }

      // Create review metadata
      const reviewMetadata = {
        rating: reviewData.rating,
        comment: reviewData.comment,
        experienceQuality: reviewData.experienceQuality,
        communication: reviewData.communication,
        value: reviewData.value,
        photos: photoHashes,
        timestamp: Date.now()
      };

      // Upload metadata to IPFS
      const metadataResult = await ipfsService.uploadJSON(reviewMetadata);

      // Submit review to blockchain
      const result = await submitReview({
        args: [bookingId, reviewData.rating, metadataResult.cid]
      });

      return {
        transactionResult: result,
        ipfsHash: metadataResult.cid,
        metadata: reviewMetadata
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Review submission failed';
      setError(message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGuideReputation = async (guideAddress: string) => {
    try {
      const reviews = await graphService.getGuideReviews(guideAddress);
      
      if (reviews.length === 0) {
        return {
          averageRating: 0,
          totalReviews: 0,
          reviews: []
        };
      }

      // Fetch review metadata from IPFS
      const reviewsWithMetadata = await Promise.all(
        reviews.map(async (review: any) => {
          try {
            const metadata = await ipfsService.fetchFromIPFS(review.ipfsHash);
            return {
              ...review,
              metadata
            };
          } catch (error) {
            console.error('Failed to fetch review metadata:', error);
            return {
              ...review,
              metadata: null
            };
          }
        })
      );

      const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;

      return {
        averageRating,
        totalReviews: reviews.length,
        reviews: reviewsWithMetadata
      };
    } catch (error) {
      console.error('Failed to fetch guide reputation:', error);
      return {
        averageRating: 0,
        totalReviews: 0,
        reviews: []
      };
    }
  };

  const canSubmitReview = async (bookingId: string, touristAddress: string) => {
    try {
      // This would typically be a contract call
      // For now, we'll check via The Graph
      const booking = await graphService.getBookingDetails(bookingId);
      
      return (
        booking &&
        booking.tourist.toLowerCase() === touristAddress.toLowerCase() &&
        booking.status === '2' && // COMPLETED
        booking.completedAt > 0
      );
    } catch (error) {
      console.error('Failed to check review eligibility:', error);
      return false;
    }
  };

  return {
    submitNewReview,
    getGuideReputation,
    canSubmitReview,
    isSubmitting,
    error,
    clearError: () => setError(null)
  };
}