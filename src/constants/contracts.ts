// Smart Contract Addresses (Polygon zkEVM)
export const CONTRACTS = {
  GUIDE_REGISTRY: '0x0000000000000000000000000000000000000000', // To be deployed tomorrow
  BOOKING_ESCROW: '0x0000000000000000000000000000000000000000', // To be deployed tomorrow
  REPUTATION_SYSTEM: '0x0000000000000000000000000000000000000000', // To be deployed tomorrow
  USDC_TOKEN: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', // USDC on Polygon zkEVM Testnet
};

// Admin Configuration
export const ADMIN_CONFIG = {
  ADMIN_WALLET: '0x25E1303E503Dc60B5Eee353183A002a645439328',
  TREASURY_WALLET: '0x25E1303E503Dc60B5Eee353183A002a645439328',
};

// Network Configuration
export const CHAIN_CONFIG = {
  chainId: 1442,
  name: 'Polygon zkEVM Testnet',
  rpcUrl: 'https://rpc.public.zkevm-test.net',
  blockExplorer: 'https://testnet-zkevm.polygonscan.com',
};

// Platform Constants
export const PLATFORM = {
  FEE_PERCENTAGE: 750, // 7.5% in basis points
  VERIFICATION_FEE: '10000000', // 10 USDC in wei (6 decimals)
  MIN_BOOKING_AMOUNT: '1000000', // 1 USDC minimum
};