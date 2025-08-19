# Amazon Q Prompt: GuideChain Web3 Tourism Platform

we are creating a web3 app ontop of this templates, https://github.com/Mawla/Agency-Starter-Framework , we  need to clone the template , study it and update our md documents also compile a new dated plan of implementation - obey all the rules , and add more rules in each and every new md file you create for notes, eg - no breaking changes, no duplicate code and files,be comprehensive, robust, only enhanements,maintain web3 principles, and web3 data priority over sanity, no mock data and sample data, etc.. plan
## Context
I'm building a Web3 peer-to-peer tourism marketplace called GuideChain using Next.js, Sanity CMS, and thirdweb SDK. The app connects tourists with verified South African tour guides through blockchain-powered bookings, payments, and reputation systems.

## Tech Stack Requirements
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Web3**: thirdweb SDK (free tier), wagmi hooks, RainbowKit wallet integration
- **CMS**: Sanity (headless CMS for marketing content only)
- **Blockchain**: Polygon zkEVM for low gas fees
- **Storage**: IPFS via web3.storage (no native databases)
- **Indexing**: The Graph Protocol for querying blockchain events
- **Hosting**: Vercel (optimized deployment)

## Architecture Principles
1. **Strict Separation**: Sanity handles marketing/SEO content, Web3 handles all business logic
2. **No Native Database**: All state lives on-chain, IPFS, or Sanity CMS
3. **100% Web3 Core**: Bookings, payments, verification, reputation all on blockchain
4. **South African Compliance**: Built-in guide verification per provincial requirements

## Core Smart Contracts Needed

### 1. GuideRegistry.sol (Soulbound NFTs)
```solidity
// Non-transferable credentials for verified guides
// Fields: provincial registration, first aid cert, SATSA membership
// Renewal every 2 years per SA tourism law
```

### 2. BookingEscrow.sol
```solidity
// USDC-based escrow system
// States: PENDING → ACCEPTED → COMPLETED → RELEASED
// Only verified guides can accept bookings
// Automatic fee distribution
```

### 3. ReputationSystem.sol
```solidity
// IPFS-anchored reviews tied to completed bookings
// Star ratings with weighted averages
// Anti-gaming through booking verification
```

## Key Features to Implement

### Tourist Features
- Wallet connection (custodial and non-custodial options)
- Browse guides with on-chain reputation and verification badges
- USDC booking payments with escrow protection
- NFT experience tickets as proof of participation
- Review system with IPFS storage + on-chain anchoring

### Guide Features
- Document upload for verification (provincial registration, first aid, SATSA)
- Soulbound NFT credential minting after admin approval
- Experience creation linked to Sanity marketing content
- Real-time USDC earnings dashboard
- Booking management (accept/reject)

### Admin Features
- Guide verification workflow with document review
- SBT minting for approved guides
- Dispute resolution with escrow control
- DAO governance for platform parameters

## Development Priorities
1. **Smart contract deployment** using thirdweb prebuilt contracts
2. **Wallet integration** with RainbowKit + thirdweb Connect
3. **IPFS document storage** for guide verification
4. **The Graph subgraph** for indexing events
5. **Responsive dashboards** for all user types
6. **Sanity integration** for marketing pages

## Specific Help Needed
Please help me with:
- Setting up the Next.js + thirdweb project structure
- Creating TypeScript interfaces for all contract interactions
- Building reusable components for wallet connection and transactions
- Implementing file upload to IPFS with progress indicators
- Creating responsive dashboard layouts with shadcn/ui
- Integrating The Graph for efficient data querying
- Setting up proper error handling and loading states
- Optimizing for Vercel deployment with edge functions

## Code Style Preferences
- Use TypeScript with strict type checking
- Implement proper error boundaries and loading states
- Follow React best practices with hooks and context
- Use Tailwind utility classes with shadcn/ui components
- Create reusable custom hooks for Web3 interactions
- Implement proper SEO with Next.js metadata API

## Constraints
- Must work within thirdweb free tier limits (1GB storage, 1000 users)
- No native databases or server-side state management
- All user data must be on-chain or IPFS
- Optimized for mobile-first responsive design
- Fast loading times with proper caching strategies

When providing code examples, please include:
1. Complete TypeScript interfaces and types
2. Error handling and loading states
3. Responsive design considerations
4. Comments explaining Web3-specific logic
5. Integration points with thirdweb SDK
6. Proper wallet connection patterns

Focus on creating a production-ready, enterprise-grade application that can scale within the Web3 ecosystem while maintaining compliance with South African tourism regulations.