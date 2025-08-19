// Core Web3 Types
export interface Guide {
  id: string;
  address: string;
  isVerified: boolean;
  provincialRegistration: string;
  firstAidCert: string;
  satsaMembership?: string;
  reputation: number;
  totalBookings: number;
  createdAt: number;
}

export interface Booking {
  id: string;
  tourist: string;
  guide: string;
  experienceId: string;
  amount: string;
  status: BookingStatus;
  createdAt: number;
  completedAt?: number;
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
  booking: string;
  rating: number;
  ipfsHash: string;
  timestamp: number;
}

export interface Experience {
  id: string;
  guide: string;
  title: string;
  description: string;
  price: string;
  duration: number;
  maxParticipants: number;
  isActive: boolean;
}