import { useState, useEffect } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { reputationSystemFunctions } from "@/lib/contracts";
import { ipfsService } from "@/lib/ipfs";
import type { Review, IPFSMetadata } from "@/types";

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  // Fetch reviews for a specific guide
  const fetchGuideReviews = async (guideAddress: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const guideReviews = await reputationSystemFunctions.getGuideReviews(guideAddress);
      
      // Enrich reviews with IPFS metadata
      const enrichedReviews = await Promise.all(
        guideReviews.map(async (review) => {
          try {
            const metadata = await ipfsService.getData<IPFSMetadata>(review.metadataHash);
            
            const bookingId = metadata.attributes?.find(attr => attr.trait_type === "Booking ID")?.value as string || "";
            
            return {
              ...review,
              bookingId,
              comment: metadata.description || "",
            };
          } catch (metadataError) {
            console.error(`Failed to fetch metadata for review ${review.id}:`, metadataError);
            return {
              ...review,
              bookingId: "",
              comment: "",
            };
          }
        })
      );
      
      setReviews(enrichedReviews);
    } catch (err) {
      console.error("Failed to fetch guide reviews:", err);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  // Submit a new review
  const submitReview = async (reviewData: {
    guideAddress: string;
    bookingId: string;
    rating: number;
    comment: string;
    photos?: File[];
  }) => {
    if (!account?.address) {
      throw new Error("Wallet not connected");
    }

    try {
      setLoading(true);
      setError(null);
      
      // Upload review metadata to IPFS
      const metadataHash = await ipfsService.uploadReviewMetadata({
        bookingId: reviewData.bookingId,
        guideAddress: reviewData.guideAddress,
        reviewerAddress: account.address,
        rating: reviewData.rating,
        comment: reviewData.comment,
        photos: reviewData.photos,
      });

      // Submit review transaction
      const transaction = reputationSystemFunctions.submitReview(
        reviewData.guideAddress,
        reviewData.bookingId,
        reviewData.rating,
        metadataHash
      );

      await new Promise((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Review submitted successfully:", result);
            resolve(result);
          },
          onError: (error) => {
            console.error("Review submission failed:", error);
            reject(error);
          },
        });
      });

      // Refresh reviews for the guide
      await fetchGuideReviews(reviewData.guideAddress);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to submit review";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Get review by ID
  const getReview = async (reviewId: string): Promise<Review | null> => {
    try {
      const review = await reputationSystemFunctions.getReview(reviewId);
      if (!review) return null;

      // Enrich with metadata
      const metadata = await ipfsService.getData<IPFSMetadata>(review.metadataHash);
      const bookingId = metadata.attributes?.find(attr => attr.trait_type === "Booking ID")?.value as string || "";
      
      return {
        ...review,
        bookingId,
        comment: metadata.description || "",
      };
    } catch (error) {
      console.error("Failed to fetch review:", error);
      return null;
    }
  };

  // Get guide's average rating
  const getGuideRating = async (guideAddress: string): Promise<number> => {
    try {
      return await reputationSystemFunctions.getGuideRating(guideAddress);
    } catch (error) {
      console.error("Failed to fetch guide rating:", error);
      return 0;
    }
  };

  // Filter reviews by rating
  const filterByRating = (minRating: number): Review[] => {
    return reviews.filter(review => review.rating >= minRating);
  };

  // Get reviews by rating (exact match)
  const getReviewsByRating = (rating: number): Review[] => {
    return reviews.filter(review => review.rating === rating);
  };

  // Sort reviews by date (newest first)
  const sortByDate = (reviewsToSort: Review[] = reviews): Review[] => {
    return [...reviewsToSort].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  // Sort reviews by rating (highest first)
  const sortByRating = (reviewsToSort: Review[] = reviews): Review[] => {
    return [...reviewsToSort].sort((a, b) => b.rating - a.rating);
  };

  // Get recent reviews (last 30 days)
  const getRecentReviews = (): Review[] => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return reviews.filter(review => 
      new Date(review.createdAt) >= thirtyDaysAgo
    );
  };

  // Get reviews with photos
  const getReviewsWithPhotos = (): Review[] => {
    return reviews.filter(review => {
      // This would need to be determined from IPFS metadata
      // For now, we'll assume reviews with longer comments might have photos
      return review.comment.length > 100;
    });
  };

  // Calculate rating distribution
  const getRatingDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating as keyof typeof distribution]++;
      }
    });
    
    return distribution;
  };

  // Get review statistics
  const getReviewStats = () => {
    const total = reviews.length;
    const averageRating = total > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / total 
      : 0;
    
    const distribution = getRatingDistribution();
    const recentCount = getRecentReviews().length;
    const withPhotosCount = getReviewsWithPhotos().length;
    
    return {
      total,
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      distribution,
      recentCount,
      withPhotosCount,
      verifiedCount: reviews.filter(r => r.verified).length,
    };
  };

  // Check if user has already reviewed a specific booking
  const hasUserReviewedBooking = (bookingId: string): boolean => {
    if (!account?.address) return false;
    
    return reviews.some(review => 
      review.bookingId === bookingId && 
      review.reviewerAddress.toLowerCase() === account.address?.toLowerCase()
    );
  };

  // Get user's reviews (reviews written by current user)
  const getUserReviews = (): Review[] => {
    if (!account?.address) return [];
    
    return reviews.filter(review => 
      review.reviewerAddress.toLowerCase() === account.address?.toLowerCase()
    );
  };

  // Get paginated reviews
  const getPaginatedReviews = (page: number, limit: number): Review[] => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return sortByDate().slice(startIndex, endIndex);
  };

  // Get total pages for pagination
  const getTotalPages = (limit: number): number => {
    return Math.ceil(reviews.length / limit);
  };

  // Search reviews by comment content
  const searchReviews = (query: string): Review[] => {
    if (!query.trim()) return reviews;
    
    const lowerQuery = query.toLowerCase();
    return reviews.filter(review =>
      review.comment.toLowerCase().includes(lowerQuery)
    );
  };

  // Clear error
  const clearError = () => setError(null);

  // Refresh reviews for current guide
  const refreshReviews = (guideAddress: string) => {
    fetchGuideReviews(guideAddress);
  };

  return {
    reviews,
    loading,
    error,
    fetchGuideReviews,
    submitReview,
    getReview,
    getGuideRating,
    filterByRating,
    getReviewsByRating,
    sortByDate,
    sortByRating,
    getRecentReviews,
    getReviewsWithPhotos,
    getRatingDistribution,
    getReviewStats,
    hasUserReviewedBooking,
    getUserReviews,
    getPaginatedReviews,
    getTotalPages,
    searchReviews,
    clearError,
    refreshReviews,
  };
}