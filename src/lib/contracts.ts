import { getContract } from '@thirdweb-dev/react';
import { CONTRACTS } from '@/constants/contracts';

// Guide Registry Contract (SBT for verified guides)
export const getGuideRegistryContract = () => {
  return getContract({
    address: CONTRACTS.GUIDE_REGISTRY,
    abi: [
      // Minimal ABI for guide verification
      'function verifyGuide(address guide, string memory provincialReg, string memory firstAidCert) external',
      'function isVerified(address guide) external view returns (bool)',
      'function getGuideInfo(address guide) external view returns (bool verified, string memory provincialReg, string memory firstAidCert, uint256 verifiedAt)',
      'event GuideVerified(address indexed guide, string provincialReg, string firstAidCert, uint256 timestamp)'
    ]
  });
};

// Booking Escrow Contract (USDC payments)
export const getBookingEscrowContract = () => {
  return getContract({
    address: CONTRACTS.BOOKING_ESCROW,
    abi: [
      // Minimal ABI for booking management
      'function createBooking(address guide, uint256 amount, string memory experienceId) external returns (uint256)',
      'function acceptBooking(uint256 bookingId) external',
      'function completeBooking(uint256 bookingId) external',
      'function getBooking(uint256 bookingId) external view returns (address tourist, address guide, uint256 amount, uint8 status, uint256 createdAt)',
      'event BookingCreated(uint256 indexed bookingId, address indexed tourist, address indexed guide, uint256 amount)',
      'event BookingCompleted(uint256 indexed bookingId, address indexed guide, uint256 amount)'
    ]
  });
};

// Reputation System Contract (review anchoring)
export const getReputationContract = () => {
  return getContract({
    address: CONTRACTS.REPUTATION_SYSTEM,
    abi: [
      // Minimal ABI for reputation management
      'function submitReview(uint256 bookingId, uint8 rating, string memory ipfsHash) external',
      'function getGuideRating(address guide) external view returns (uint256 totalRating, uint256 reviewCount)',
      'function getReview(uint256 reviewId) external view returns (uint256 bookingId, uint8 rating, string memory ipfsHash, uint256 timestamp)',
      'event ReviewSubmitted(uint256 indexed reviewId, uint256 indexed bookingId, address indexed tourist, uint8 rating, string ipfsHash)'
    ]
  });
};