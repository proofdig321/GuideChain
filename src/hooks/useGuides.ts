import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { guideRegistryFunctions, reputationSystemFunctions } from "@/lib/contracts";
import { ipfsService } from "@/lib/ipfs";
import type { Guide, IPFSMetadata } from "@/types";

export function useGuides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const account = useActiveAccount();

  // Fetch all verified guides
  const fetchGuides = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const verifiedGuides = await guideRegistryFunctions.getAllVerifiedGuides();
      
      // Enrich guides with IPFS metadata and ratings
      const enrichedGuides = await Promise.all(
        verifiedGuides.map(async (guide) => {
          try {
            // Fetch IPFS metadata
            const metadata = await ipfsService.getData<IPFSMetadata>(guide.documentsHash);
            
            // Fetch rating
            const rating = await reputationSystemFunctions.getGuideRating(guide.address);
            
            // Extract additional info from metadata
            const location = metadata.attributes?.find(attr => attr.trait_type === "Location")?.value as string || "";
            const specialties = (metadata.attributes?.find(attr => attr.trait_type === "Specialties")?.value as string || "").split(", ").filter(Boolean);
            const languages = (metadata.attributes?.find(attr => attr.trait_type === "Languages")?.value as string || "").split(", ").filter(Boolean);
            
            return {
              ...guide,
              location,
              specialties,
              languages,
              experience: metadata.description || "",
              rating: rating || 0,
              profileImageHash: metadata.image,
            };
          } catch (metadataError) {
            console.error(`Failed to fetch metadata for guide ${guide.address}:`, metadataError);
            return guide;
          }
        })
      );
      
      setGuides(enrichedGuides);
    } catch (err) {
      console.error("Failed to fetch guides:", err);
      setError("Failed to load guides");
    } finally {
      setLoading(false);
    }
  };

  // Get guide by address
  const getGuide = async (address: string): Promise<Guide | null> => {
    try {
      const guide = await guideRegistryFunctions.getGuide(address);
      if (!guide) return null;

      // Enrich with metadata and rating
      const metadata = await ipfsService.getData<IPFSMetadata>(guide.documentsHash);
      const rating = await reputationSystemFunctions.getGuideRating(address);
      
      const location = metadata.attributes?.find(attr => attr.trait_type === "Location")?.value as string || "";
      const specialties = (metadata.attributes?.find(attr => attr.trait_type === "Specialties")?.value as string || "").split(", ").filter(Boolean);
      const languages = (metadata.attributes?.find(attr => attr.trait_type === "Languages")?.value as string || "").split(", ").filter(Boolean);
      
      return {
        ...guide,
        location,
        specialties,
        languages,
        experience: metadata.description || "",
        rating: rating || 0,
        profileImageHash: metadata.image,
      };
    } catch (error) {
      console.error("Failed to fetch guide:", error);
      return null;
    }
  };

  // Filter guides by location
  const filterByLocation = (location: string): Guide[] => {
    if (!location) return guides;
    return guides.filter(guide => 
      guide.location.toLowerCase().includes(location.toLowerCase())
    );
  };

  // Filter guides by specialty
  const filterBySpecialty = (specialty: string): Guide[] => {
    if (!specialty) return guides;
    return guides.filter(guide =>
      guide.specialties.some(s => 
        s.toLowerCase().includes(specialty.toLowerCase())
      )
    );
  };

  // Filter guides by price range
  const filterByPriceRange = (minPrice: number, maxPrice: number): Guide[] => {
    return guides.filter(guide =>
      guide.pricePerHour >= minPrice && guide.pricePerHour <= maxPrice
    );
  };

  // Filter guides by rating
  const filterByRating = (minRating: number): Guide[] => {
    return guides.filter(guide => guide.rating >= minRating);
  };

  // Search guides by name or description
  const searchGuides = (query: string): Guide[] => {
    if (!query) return guides;
    const lowerQuery = query.toLowerCase();
    return guides.filter(guide =>
      guide.name.toLowerCase().includes(lowerQuery) ||
      guide.experience.toLowerCase().includes(lowerQuery) ||
      guide.specialties.some(s => s.toLowerCase().includes(lowerQuery))
    );
  };

  // Sort guides
  const sortGuides = (guides: Guide[], sortBy: "rating" | "price" | "name" | "newest"): Guide[] => {
    return [...guides].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price":
          return a.pricePerHour - b.pricePerHour;
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
          return new Date(b.verificationDate || 0).getTime() - new Date(a.verificationDate || 0).getTime();
        default:
          return 0;
      }
    });
  };

  // Get featured guides (highest rated)
  const getFeaturedGuides = (limit = 6): Guide[] => {
    return sortGuides(guides, "rating").slice(0, limit);
  };

  // Get guides by location with limit
  const getGuidesByLocation = (location: string, limit = 10): Guide[] => {
    return filterByLocation(location).slice(0, limit);
  };

  // Check if user is a verified guide
  const isUserVerifiedGuide = (): boolean => {
    if (!account?.address) return false;
    return guides.some(guide => guide.address.toLowerCase() === account.address?.toLowerCase());
  };

  // Get user's guide profile if they are a guide
  const getUserGuideProfile = (): Guide | null => {
    if (!account?.address) return null;
    return guides.find(guide => guide.address.toLowerCase() === account.address?.toLowerCase()) || null;
  };

  // Refresh guides data
  const refreshGuides = () => {
    fetchGuides();
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  return {
    guides,
    loading,
    error,
    fetchGuides,
    getGuide,
    filterByLocation,
    filterBySpecialty,
    filterByPriceRange,
    filterByRating,
    searchGuides,
    sortGuides,
    getFeaturedGuides,
    getGuidesByLocation,
    isUserVerifiedGuide,
    getUserGuideProfile,
    refreshGuides,
  };
}