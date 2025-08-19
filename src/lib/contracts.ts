import { getContract } from '@thirdweb-dev/react';
import { CONTRACTS } from '@/constants/contracts';

// Contract addresses for direct use
export const GUIDE_REGISTRY_ADDRESS = CONTRACTS.GUIDE_REGISTRY;
export const BOOKING_ESCROW_ADDRESS = CONTRACTS.BOOKING_ESCROW;
export const REPUTATION_SYSTEM_ADDRESS = CONTRACTS.REPUTATION_SYSTEM;

// Simple contract getters - will be used with useContract hook
export const getGuideRegistryAddress = () => CONTRACTS.GUIDE_REGISTRY;
export const getBookingEscrowAddress = () => CONTRACTS.BOOKING_ESCROW;
export const getReputationSystemAddress = () => CONTRACTS.REPUTATION_SYSTEM;