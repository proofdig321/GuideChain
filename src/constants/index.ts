import { polygonZkEvmTestnet } from "thirdweb/chains";

// Platform Configuration
export const PLATFORM_CONFIG = {
  NAME: "GuideChain",
  DESCRIPTION: "Decentralized peer-to-peer tourism marketplace",
  URL: "https://guidechain.vercel.app",
  FEE_PERCENTAGE: 7.5, // 7.5% platform fee
  ADMIN_ADDRESS: "0x25E1303E503Dc60B5Eee353183A002a645439328",
  SUPPORTED_CHAIN: polygonZkEvmTestnet,
  USDC_ADDRESS: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // Polygon zkEVM Testnet USDC
} as const;

// Contract Addresses (Update after deployment)
export const CONTRACT_ADDRESSES = {
  GUIDE_REGISTRY: "0x0000000000000000000000000000000000000000",
  BOOKING_ESCROW: "0x0000000000000000000000000000000000000000",
  REPUTATION_SYSTEM: "0x0000000000000000000000000000000000000000",
} as const;

// IPFS Configuration
export const IPFS_CONFIG = {
  GATEWAY_URL: "https://gateway.pinata.cloud/ipfs/",
  API_URL: "https://api.pinata.cloud",
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: [
    "image/jpeg",
    "image/png", 
    "image/webp",
    "application/pdf",
    "text/plain"
  ],
} as const;

// UI Constants
export const UI_CONFIG = {
  ITEMS_PER_PAGE: 12,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 5000,
  ANIMATION_DURATION: 200,
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_PRICE: 1,
  MAX_PRICE: 1000,
  MAX_PARTICIPANTS: 20,
  MIN_RATING: 1,
  MAX_RATING: 5,
} as const;

// South African Locations
export const SA_LOCATIONS = [
  "Cape Town",
  "Johannesburg", 
  "Durban",
  "Pretoria",
  "Port Elizabeth",
  "Bloemfontein",
  "East London",
  "Pietermaritzburg",
  "Kimberley",
  "Polokwane",
  "Nelspruit",
  "Rustenburg",
  "George",
  "Stellenbosch",
  "Hermanus",
  "Knysna",
  "Plettenberg Bay",
  "Oudtshoorn",
  "Clarens",
  "Drakensberg"
] as const;

// Tourism Specialties
export const TOURISM_SPECIALTIES = [
  "Wine Tours",
  "Safari & Wildlife",
  "City Tours",
  "Historical Sites",
  "Adventure Sports",
  "Cultural Experiences",
  "Food & Culinary",
  "Photography Tours",
  "Nature & Hiking",
  "Beach Activities",
  "Art & Museums",
  "Township Tours",
  "Garden Route",
  "Whale Watching",
  "Shark Cage Diving",
  "Table Mountain",
  "Robben Island",
  "Kruger National Park",
  "Drakensberg Mountains",
  "Cape Winelands"
] as const;

// Languages
export const LANGUAGES = [
  "English",
  "Afrikaans", 
  "Zulu",
  "Xhosa",
  "Sotho",
  "Tswana",
  "Pedi",
  "Venda",
  "Tsonga",
  "Ndebele",
  "Swati",
  "German",
  "French",
  "Portuguese",
  "Mandarin",
  "Spanish"
] as const;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: "Please connect your wallet to continue",
  INSUFFICIENT_FUNDS: "Insufficient funds for this transaction",
  TRANSACTION_FAILED: "Transaction failed. Please try again",
  INVALID_INPUT: "Please check your input and try again",
  NETWORK_ERROR: "Network error. Please check your connection",
  UNAUTHORIZED: "You are not authorized to perform this action",
  FILE_TOO_LARGE: "File size exceeds maximum limit",
  INVALID_FILE_TYPE: "Invalid file type. Please upload a supported format",
  GUIDE_NOT_VERIFIED: "Guide is not verified",
  BOOKING_NOT_FOUND: "Booking not found",
  ALREADY_REVIEWED: "You have already reviewed this booking",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: "Wallet connected successfully",
  TRANSACTION_CONFIRMED: "Transaction confirmed successfully",
  APPLICATION_SUBMITTED: "Application submitted successfully",
  BOOKING_CREATED: "Booking created successfully",
  REVIEW_SUBMITTED: "Review submitted successfully",
  GUIDE_VERIFIED: "Guide verified successfully",
  PROFILE_UPDATED: "Profile updated successfully",
} as const;