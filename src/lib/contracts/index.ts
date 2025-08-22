import { getContract, prepareContractCall, readContract, createThirdwebClient } from "thirdweb";
import { CONTRACT_ADDRESSES, PLATFORM_CONFIG } from "@/constants";
import { allMockGuides, mockApplications, mockBookings, mockReviews, mockPlatformStats } from "@/lib/contracts/mockData";
import type { Guide, Booking, Review, VerificationApplication } from "@/types";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

// Check if contracts are deployed
const contractsDeployed = CONTRACT_ADDRESSES.GUIDE_REGISTRY !== "0x0000000000000000000000000000000000000000";

// Contract instances (only create if deployed)
let guideRegistryContract: any = null;
let bookingEscrowContract: any = null;
let reputationSystemContract: any = null;

if (contractsDeployed) {
  guideRegistryContract = getContract({
    client,
    chain: PLATFORM_CONFIG.SUPPORTED_CHAIN,
    address: CONTRACT_ADDRESSES.GUIDE_REGISTRY,
  });

  bookingEscrowContract = getContract({
    client,
    chain: PLATFORM_CONFIG.SUPPORTED_CHAIN,
    address: CONTRACT_ADDRESSES.BOOKING_ESCROW,
  });

  reputationSystemContract = getContract({
    client,
    chain: PLATFORM_CONFIG.SUPPORTED_CHAIN,
    address: CONTRACT_ADDRESSES.REPUTATION_SYSTEM,
  });
}

export { guideRegistryContract, bookingEscrowContract, reputationSystemContract };

// Guide Registry Functions
export const guideRegistryFunctions = {
  // Read functions
  async getGuide(address: string): Promise<Guide | null> {
    try {
      if (!contractsDeployed) {
        // Use mock data when contracts are not deployed
        return allMockGuides.find(guide => guide.address.toLowerCase() === address.toLowerCase()) || null;
      }
      
      const result = await readContract({
        contract: guideRegistryContract,
        method: "function getGuide(address) view returns (bool verified, string memory name, string memory metadataHash, uint256 verificationDate)",
        params: [address],
      });
      
      if (!result[0]) return null; // Not verified
      
      return {
        id: address,
        address,
        name: result[1],
        verified: result[0],
        verificationDate: new Date(Number(result[3]) * 1000).toISOString(),
        documentsHash: result[2],
        // Additional fields will be populated from IPFS metadata
        location: "",
        specialties: [],
        pricePerHour: 0,
        rating: 0,
        totalBookings: 0,
        languages: [],
        experience: "",
        availability: true,
      };
    } catch (error) {
      console.error("Error fetching guide:", error);
      return null;
    }
  },

  async getAllVerifiedGuides(): Promise<Guide[]> {
    try {
      if (!contractsDeployed) {
        // Use mock data when contracts are not deployed
        return allMockGuides.filter(guide => guide.verified);
      }
      
      const result = await readContract({
        contract: guideRegistryContract,
        method: "function getAllVerifiedGuides() view returns (address[])",
        params: [],
      });
      
      const guides: Guide[] = [];
      for (const address of result) {
        const guide = await this.getGuide(address);
        if (guide) guides.push(guide);
      }
      
      return guides;
    } catch (error) {
      console.error("Error fetching verified guides:", error);
      return [];
    }
  },

  async getPendingApplications(): Promise<VerificationApplication[]> {
    try {
      if (!contractsDeployed) {
        // Use mock data when contracts are not deployed
        return mockApplications.filter(app => app.status === 0); // PENDING
      }
      
      const result = await readContract({
        contract: guideRegistryContract,
        method: "function getPendingApplications() view returns (address[])",
        params: [],
      });
      
      const applications: VerificationApplication[] = [];
      for (const address of result) {
        const app = await this.getApplication(address);
        if (app) applications.push(app);
      }
      
      return applications;
    } catch (error) {
      console.error("Error fetching pending applications:", error);
      return [];
    }
  },

  async getApplication(address: string): Promise<VerificationApplication | null> {
    try {
      if (!contractsDeployed) {
        // Use mock data when contracts are not deployed
        return mockApplications.find(app => app.applicantAddress.toLowerCase() === address.toLowerCase()) || null;
      }
      
      const result = await readContract({
        contract: guideRegistryContract,
        method: "function getApplication(address) view returns (string memory name, string memory metadataHash, uint256 submittedAt, uint8 status)",
        params: [address],
      });
      
      return {
        id: address,
        applicantAddress: address,
        name: result[0],
        documentsHash: result[1],
        submittedAt: new Date(Number(result[2]) * 1000).toISOString(),
        status: result[3],
        // Additional fields from IPFS metadata
        location: "",
        specialties: [],
        experience: "",
      };
    } catch (error) {
      console.error("Error fetching application:", error);
      return null;
    }
  },

  // Write functions
  submitApplication: (name: string, metadataHash: string) => {
    if (!contractsDeployed) {
      throw new Error("Contracts not deployed yet. Please wait for deployment.");
    }
    return prepareContractCall({
      contract: guideRegistryContract,
      method: "function submitApplication(string memory name, string memory metadataHash)",
      params: [name, metadataHash],
    });
  },

  approveGuide: (applicantAddress: string) => {
    if (!contractsDeployed) {
      throw new Error("Contracts not deployed yet. Please wait for deployment.");
    }
    return prepareContractCall({
      contract: guideRegistryContract,
      method: "function approveGuide(address applicant)",
      params: [applicantAddress],
    });
  },

  rejectGuide: (applicantAddress: string, reason: string) => {
    if (!contractsDeployed) {
      throw new Error("Contracts not deployed yet. Please wait for deployment.");
    }
    return prepareContractCall({
      contract: guideRegistryContract,
      method: "function rejectGuide(address applicant, string memory reason)",
      params: [applicantAddress, reason],
    });
  },
};

// Booking Escrow Functions
export const bookingEscrowFunctions = {
  // Read functions
  async getBooking(bookingId: string): Promise<Booking | null> {
    try {
      const result = await readContract({
        contract: bookingEscrowContract,
        method: "function getBooking(uint256) view returns (address guide, address tourist, uint256 amount, uint8 status, uint256 createdAt, string memory experienceId)",
        params: [BigInt(bookingId)],
      });
      
      return {
        id: bookingId,
        guideAddress: result[0],
        touristAddress: result[1],
        amount: result[2].toString(),
        status: result[3],
        createdAt: new Date(Number(result[4]) * 1000).toISOString(),
        experienceId: result[5],
        scheduledDate: "", // From IPFS metadata
        participants: 1, // From IPFS metadata
      };
    } catch (error) {
      console.error("Error fetching booking:", error);
      return null;
    }
  },

  async getUserBookings(userAddress: string): Promise<Booking[]> {
    try {
      const result = await readContract({
        contract: bookingEscrowContract,
        method: "function getUserBookings(address) view returns (uint256[])",
        params: [userAddress],
      });
      
      const bookings: Booking[] = [];
      for (const bookingId of result) {
        const booking = await this.getBooking(bookingId.toString());
        if (booking) bookings.push(booking);
      }
      
      return bookings;
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return [];
    }
  },

  async getGuideBookings(guideAddress: string): Promise<Booking[]> {
    try {
      const result = await readContract({
        contract: bookingEscrowContract,
        method: "function getGuideBookings(address) view returns (uint256[])",
        params: [guideAddress],
      });
      
      const bookings: Booking[] = [];
      for (const bookingId of result) {
        const booking = await this.getBooking(bookingId.toString());
        if (booking) bookings.push(booking);
      }
      
      return bookings;
    } catch (error) {
      console.error("Error fetching guide bookings:", error);
      return [];
    }
  },

  // Write functions
  createBooking: (guideAddress: string, amount: string, experienceId: string) => {
    return prepareContractCall({
      contract: bookingEscrowContract,
      method: "function createBooking(address guide, uint256 amount, string memory experienceId)",
      params: [guideAddress, BigInt(amount), experienceId],
      value: BigInt(amount),
    });
  },

  acceptBooking: (bookingId: string) => {
    return prepareContractCall({
      contract: bookingEscrowContract,
      method: "function acceptBooking(uint256 bookingId)",
      params: [BigInt(bookingId)],
    });
  },

  completeBooking: (bookingId: string) => {
    return prepareContractCall({
      contract: bookingEscrowContract,
      method: "function completeBooking(uint256 bookingId)",
      params: [BigInt(bookingId)],
    });
  },

  cancelBooking: (bookingId: string) => {
    return prepareContractCall({
      contract: bookingEscrowContract,
      method: "function cancelBooking(uint256 bookingId)",
      params: [BigInt(bookingId)],
    });
  },
};

// Reputation System Functions
export const reputationSystemFunctions = {
  // Read functions
  async getReview(reviewId: string): Promise<Review | null> {
    try {
      const result = await readContract({
        contract: reputationSystemContract,
        method: "function getReview(uint256) view returns (address reviewer, address guide, uint8 rating, string memory metadataHash, uint256 createdAt, bool verified)",
        params: [BigInt(reviewId)],
      });
      
      return {
        id: reviewId,
        reviewerAddress: result[0],
        guideAddress: result[1],
        rating: result[2],
        metadataHash: result[3],
        createdAt: new Date(Number(result[4]) * 1000).toISOString(),
        verified: result[5],
        // Additional fields from IPFS metadata
        bookingId: "",
        comment: "",
      };
    } catch (error) {
      console.error("Error fetching review:", error);
      return null;
    }
  },

  async getGuideReviews(guideAddress: string): Promise<Review[]> {
    try {
      const result = await readContract({
        contract: reputationSystemContract,
        method: "function getGuideReviews(address) view returns (uint256[])",
        params: [guideAddress],
      });
      
      const reviews: Review[] = [];
      for (const reviewId of result) {
        const review = await this.getReview(reviewId.toString());
        if (review) reviews.push(review);
      }
      
      return reviews;
    } catch (error) {
      console.error("Error fetching guide reviews:", error);
      return [];
    }
  },

  async getGuideRating(guideAddress: string): Promise<number> {
    try {
      if (!contractsDeployed) {
        // Use mock data when contracts are not deployed
        const guide = allMockGuides.find(g => g.address.toLowerCase() === guideAddress.toLowerCase());
        return guide?.rating || 0;
      }
      
      const result = await readContract({
        contract: reputationSystemContract,
        method: "function getGuideRating(address) view returns (uint256 totalRating, uint256 reviewCount)",
        params: [guideAddress],
      });
      
      if (result[1] === 0n) return 0;
      return Number(result[0]) / Number(result[1]);
    } catch (error) {
      console.error("Error fetching guide rating:", error);
      return 0;
    }
  },

  // Write functions
  submitReview: (guideAddress: string, bookingId: string, rating: number, metadataHash: string) => {
    return prepareContractCall({
      contract: reputationSystemContract,
      method: "function submitReview(address guide, uint256 bookingId, uint8 rating, string memory metadataHash)",
      params: [guideAddress, BigInt(bookingId), rating, metadataHash],
    });
  },
};

// Platform Statistics
export const platformFunctions = {
  async getPlatformStats() {
    try {
      if (!contractsDeployed) {
        // Use mock data when contracts are not deployed
        return mockPlatformStats;
      }
      
      const [totalGuides, totalBookings, platformFees] = await Promise.all([
        readContract({
          contract: guideRegistryContract,
          method: "function getTotalVerifiedGuides() view returns (uint256)",
          params: [],
        }),
        readContract({
          contract: bookingEscrowContract,
          method: "function getTotalBookings() view returns (uint256)",
          params: [],
        }),
        readContract({
          contract: bookingEscrowContract,
          method: "function getPlatformFees() view returns (uint256)",
          params: [],
        }),
      ]);

      return {
        totalGuides: Number(totalGuides),
        totalBookings: Number(totalBookings),
        totalRevenue: "0", // Calculate from bookings
        platformFees: platformFees.toString(),
        activeUsers: 0, // Calculate from unique addresses
        averageRating: 0, // Calculate from all reviews
      };
    } catch (error) {
      console.error("Error fetching platform stats:", error);
      return {
        totalGuides: 0,
        totalBookings: 0,
        totalRevenue: "0",
        platformFees: "0",
        activeUsers: 0,
        averageRating: 0,
      };
    }
  },
};