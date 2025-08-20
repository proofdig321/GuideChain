// Core Web3 Types
export interface Guide {
  id: string;
  address: string;
  name: string;
  location: string;
  specialties: string[];
  pricePerHour: number;
  rating: number;
  verified: boolean;
  verificationDate?: string;
  totalBookings: number;
  profileImageHash?: string;
  documentsHash: string;
  languages: string[];
  experience: string;
  availability: boolean;
}

export interface Booking {
  id: string;
  guideAddress: string;
  touristAddress: string;
  experienceId: string;
  amount: string;
  status: BookingStatus;
  createdAt: string;
  scheduledDate: string;
  completedAt?: string;
  cancelledAt?: string;
  specialRequests?: string;
  participants: number;
}

export enum BookingStatus {
  PENDING = 0,
  ACCEPTED = 1,
  COMPLETED = 2,
  CANCELLED = 3,
  DISPUTED = 4
}

export interface Review {
  id: string;
  bookingId: string;
  reviewerAddress: string;
  guideAddress: string;
  rating: number;
  comment: string;
  createdAt: string;
  metadataHash: string;
  verified: boolean;
}

export interface PlatformStats {
  totalGuides: number;
  totalBookings: number;
  totalRevenue: string;
  platformFees: string;
  activeUsers: number;
  averageRating: number;
}

export interface VerificationApplication {
  id: string;
  applicantAddress: string;
  name: string;
  location: string;
  specialties: string[];
  experience: string;
  documentsHash: string;
  status: VerificationStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewerAddress?: string;
  rejectionReason?: string;
}

export enum VerificationStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2
}

export interface IPFSMetadata {
  name: string;
  description: string;
  image?: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  documents?: string[];
  timestamp: number;
}

export interface ContractEvent {
  transactionHash: string;
  blockNumber: number;
  timestamp: string;
  eventName: string;
  args: Record<string, any>;
}

export interface UserProfile {
  address: string;
  isGuide: boolean;
  isAdmin: boolean;
  totalBookings: number;
  totalSpent: string;
  totalEarned: string;
  reputation: number;
  joinedAt: string;
}