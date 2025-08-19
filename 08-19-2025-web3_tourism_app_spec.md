# GuideChain: Web3 P2P Tourism Platform
## Complete Technical Specification & Implementation Guide

### 🎯 Vision
A fully decentralized peer-to-peer tourism marketplace where travelers connect directly with verified local guides through blockchain-powered bookings, payments, and reputation systems. Built on Sanity + Next.js + Thirdweb with zero native databases and 100% Web3 core logic.

---

## 🏗️ Architecture Overview

### Core Principle: Strict Separation of Concerns
- **Marketing Layer (Sanity)**: SEO content, destination guides, public-facing pages
- **Web3 Core (Thirdweb + Next.js)**: All business logic, bookings, payments, verification
- **No Native Database**: All state lives on-chain, IPFS, or Sanity CMS

### Technology Stack
```
Frontend:     Next.js 14 (App Router) + Tailwind + shadcn/ui
Web3 SDK:     Thirdweb (Starter plan - $0 for MVP)
CMS:          Sanity (Free tier)
Hosting:      Vercel (Free tier)
Blockchain:   Polygon zkEVM (low gas fees)
Storage:      IPFS via web3.storage
Indexing:     The Graph (free tier)
Wallets:      RainbowKit + WalletConnect
```

---

## 🛡️ South African Compliance Integration

### Guide Verification Requirements (Based on SATSA & SA Tourism Law)

#### 1. Provincial Tourist Guide Registration
Tourist guides must be trained by accredited training providers and registration must be renewed every 2 years. Registered guides are issued with identity cards and badges which must be worn at all times when conducting tours.

**Smart Contract Implementation:**
```solidity
struct GuideCredentials {
    string provincialRegNumber;    // Provincial registrar ID
    uint256 registrationExpiry;    // Unix timestamp
    string firstAidCertHash;       // IPFS hash of certificate
    string qualificationHash;      // IPFS hash of training cert
    bool isActive;
}
```

#### 2. SATSA Membership (Optional Premium Tier)
Each Member must be financially stable and display the highest levels of integrity, as determined by the SATSA Code of Conduct.

**Benefits in App:**
- "SATSA Verified" badge
- Higher booking limits
- Premium placement in search results
- Access to exclusive experiences

#### 3. First Aid Certification
Prospective Tour Guides must have an up-to-date tour guide card and a valid first aid certificate. They must also adhere to a code of conduct and ethics.

---

## 📋 Smart Contract Architecture

### Core Contracts

#### 1. GuideRegistry.sol (Soulbound NFTs)
```solidity
contract GuideRegistry {
    // Mint non-transferable guide credentials
    function mintGuideCredential(
        address guide,
        string memory provincialRegNumber,
        uint256 registrationExpiry,
        string memory certificationHash
    ) external onlyVerifier;
    
    // Renewal every 2 years (SA requirement)
    function renewCredential(uint256 tokenId) external;
    
    // Emergency revocation for misconduct
    function revokeCredential(uint256 tokenId) external onlyDAO;
}
```

#### 2. BookingEscrow.sol
```solidity
contract BookingEscrow {
    enum BookingStatus { PENDING, ACCEPTED, ACTIVE, COMPLETED, DISPUTED, CANCELLED }
    
    struct Booking {
        address tourist;
        address guide;
        uint256 amount;        // USDC amount
        uint256 startTime;
        uint256 endTime;
        BookingStatus status;
        string experienceIpfsHash;
    }
    
    // Only verified guides can accept bookings
    modifier onlyVerifiedGuide(address guide) {
        require(guideRegistry.isVerified(guide), "Guide not verified");
        _;
    }
    
    function createBooking(
        address guide,
        uint256 amount,
        uint256 startTime,
        uint256 endTime,
        string memory experienceHash
    ) external payable;
    
    function acceptBooking(uint256 bookingId) external onlyVerifiedGuide(msg.sender);
    
    function completeBooking(uint256 bookingId) external;
    
    function disputeBooking(uint256 bookingId) external;
}
```

#### 3. ReputationSystem.sol
```solidity
contract ReputationSystem {
    struct Review {
        address reviewer;
        address guide;
        uint8 rating;        // 1-5 stars
        string ipfsHash;     // Full review content on IPFS
        uint256 timestamp;
        uint256 bookingId;   // Links to completed booking
    }
    
    function submitReview(
        address guide,
        uint8 rating,
        string memory ipfsHash,
        uint256 bookingId
    ) external onlyCompletedBooking(bookingId);
    
    function getGuideRating(address guide) external view returns (uint256 average, uint256 totalReviews);
}
```

#### 4. SATSARegistry.sol (Premium Verification)
```solidity
contract SATSARegistry {
    struct SATSAMember {
        string membershipId;
        uint256 membershipExpiry;
        string codeOfConductHash;   // IPFS hash of signed agreement
        bool isActive;
    }
    
    function verifySATSAMembership(
        address guide,
        string memory membershipId,
        string memory membershipProofHash
    ) external onlyVerifier;
}
```

---

## 🎛️ Dashboard Features

### Tourist Dashboard
- **My Bookings**: Active, completed, cancelled bookings from The Graph
- **NFT Tickets**: Proof-of-experience NFTs with metadata
- **Review History**: Reviews submitted via IPFS
- **Wallet Management**: USDC balance, transaction history
- **Travel Portfolio**: Collection of experience NFTs

### Guide Dashboard
- **Verification Status**: Provincial registration, first aid, SATSA (if applicable)
- **Experience Listings**: Linked to Sanity content + on-chain availability
- **Booking Management**: Accept/reject pending bookings
- **Earnings**: Real-time USDC payouts, fee breakdown
- **Reputation**: Star rating, review highlights, performance metrics
- **Compliance Alerts**: Registration renewal reminders

### Admin/DAO Dashboard
- **Verification Queue**: Review guide applications, mint SBTs
- **Dispute Resolution**: Mediate booking disputes, manage escrow releases
- **Governance Proposals**: Platform fee changes, new verification requirements
- **Treasury Management**: Platform revenue, DAO fund allocation
- **Analytics**: Platform usage, guide performance, tourist satisfaction

---

## 🔄 User Flows

### Guide Onboarding (Compliance-First)
1. **Connect Wallet** → thirdweb Connect UI
2. **Upload Documents** → IPFS storage
   - Provincial guide registration certificate
   - First aid certification
   - ID document (redacted)
   - SATSA membership (optional)
3. **Admin Verification** → Manual review + SBT mint
4. **Profile Creation** → Link to Sanity experience content
5. **Set Availability** → On-chain calendar or IPFS-stored schedule

### Tourist Booking Flow
1. **Browse Experiences** → Sanity content + The Graph data
2. **Select Guide** → View on-chain reputation + verification badges
3. **Connect Wallet / Onboard** → Custodial or non-custodial options
4. **Book & Pay** → USDC escrow smart contract
5. **Receive NFT Ticket** → Proof of booking with experience metadata
6. **Complete Experience** → Confirm completion, release escrow
7. **Leave Review** → Upload to IPFS, anchor hash on-chain

### Dispute Resolution
1. **Initiate Dispute** → Tourist or guide can flag booking
2. **Evidence Submission** → Both parties upload proof to IPFS
3. **DAO/Admin Review** → Community vote or admin decision
4. **Resolution** → Escrow release, partial refund, or full refund

---

## 🤖 AI-Powered Features

### 1. Smart Matching Engine
- **AI Guide Recommendations**: ML algorithms analyze tourist preferences, past bookings, and guide specialties
- **Dynamic Pricing**: AI suggests optimal pricing based on demand, seasonality, and guide performance
- **Experience Personalization**: Custom itinerary generation based on interests, budget, and time constraints
- **Language Processing**: Auto-translate reviews and experience descriptions

### 2. Intelligent Verification
- **Document OCR**: Automatically extract data from uploaded certificates and IDs
- **Fraud Detection**: AI flags suspicious verification documents or fake reviews
- **Compliance Monitoring**: Auto-check guide credential expiry dates and renewal requirements
- **Risk Assessment**: ML models evaluate guide and tourist profiles for safety scoring

### 3. Conversational AI
- **24/7 Support Bot**: Handle common queries about bookings, payments, and verification
- **Experience Discovery**: Natural language search for activities ("family-friendly wine tours near Cape Town")
- **Booking Assistant**: Guide tourists through complex multi-day itinerary planning
- **Guide Coaching**: AI insights on improving ratings, optimizing availability, and pricing strategies

### 4. Predictive Analytics
- **Demand Forecasting**: Predict peak booking periods for guides
- **Reputation Insights**: Early warning system for declining guide performance
- **Market Trends**: Identify emerging tourism niches and popular experiences
- **Revenue Optimization**: Suggest optimal fee structures and promotional strategies

## 💡 Key Web3 Features

### 1. Verifiable Credentials (SBTs)
- **Provincial Guide SBT**: Non-transferable proof of legal registration
- **First Aid SBT**: Valid certification with expiry tracking
- **SATSA Member SBT**: Premium verification badge
- **Experience SBT**: Proof of completed successful tours

### 2. NFT Experience Tickets
- **Booking Proof**: Immutable record of tour participation
- **Collectible Value**: Unique designs per experience/location
- **Utility**: Can unlock discounts, special access, or future perks
- **Transferable**: Can be gifted or sold (if experience allows)

### 3. Decentralized Reputation
- **Immutable Reviews**: Stored on IPFS, hash anchored on-chain
- **Weighted Ratings**: More weight for verified bookings
- **Portable Reputation**: Guides own their rating history
- **Anti-Gaming**: Reviews tied to completed, paid bookings

### 4. DAO Governance
- **Token Distribution**: Earned through platform usage (guides + tourists)
- **Voting Rights**: Platform fees, verification standards, dispute procedures
- **Treasury Management**: Community-controlled development fund
- **Code of Conduct**: Community-driven behavioral standards

---

## 🔧 Implementation Phases

### Phase 1: MVP (Month 1)
**Week 1:**
- Deploy core smart contracts (BookingEscrow, GuideRegistry)
- Set up Sanity schema for experiences and marketing content
- Integrate thirdweb SDK with Next.js

**Week 2:**
- Build wallet connection and guide verification UI
- Create booking flow with USDC payments
- Set up The Graph subgraph for indexing

**Week 3:**
- Implement tourist and guide dashboards
- Add review system (IPFS + on-chain anchoring)
- Integrate Sanity content with Web3 booking logic

**Week 4:**
- Testing, bug fixes, security review
- Deploy to Vercel and prepare demo

### Phase 2: Enhancement (Month 2-3)
- SATSA integration and premium verification
- NFT ticketing system
- AI-powered matching and recommendations
- Advanced dispute resolution with ML insights
- Mobile PWA optimization

### Phase 3: AI & Governance (Month 4+)
- Advanced AI matching and pricing optimization
- Conversational AI support system
- DAO token distribution
- Community governance implementation
- Predictive analytics dashboard
- International expansion framework

---

## 💰 Revenue Model (Web3 Native)

### Platform Fees
- **2.5% booking fee** (split: 2% to treasury, 0.5% to DAO rewards pool)
- **Verification fees** (one-time SBT minting: ~$10 USDC equivalent)
- **Premium listings** (SATSA members get boosted visibility)

### Token Economy
- **Governance tokens** earned through platform usage
- **Reputation tokens** (non-transferable) for voting weight
- **Staking rewards** for long-term guides and active DAO participants

---

## 🔒 Security & Compliance

### Smart Contract Security
- **Audited contracts** via thirdweb's pre-built templates
- **Upgradeable patterns** with DAO governance
- **Emergency pause** functionality
- **Multi-sig treasury** (Gnosis Safe)

### Legal Compliance
- **Provincial registration verification** before guide activation
- **KYC/AML** for high-value transactions
- **Data protection** (POPIA compliance via IPFS + encryption)
- **Tax reporting** tools for guides' crypto earnings

### Insurance Integration
- **Parametric insurance** smart contracts
- **Guide bonding** requirements for high-value experiences
- **Tourist protection** fund managed by DAO

---

## 📊 Success Metrics

### Platform Health
- Active verified guides
- Booking completion rate
- Average dispute resolution time
- Treasury growth rate

### User Experience
- Wallet connection success rate
- Time to first booking
- Review submission rate
- User retention (monthly active users)

### Compliance
- Guide verification rate
- Renewal compliance
- SATSA membership growth
- Zero compliance violations

---

## 🚀 Competitive Advantages

1. **True P2P**: No middleman data silos or payment delays
2. **Compliance-First**: Built-in SA tourism law compliance
3. **Portable Reputation**: Guides own their professional history
4. **Transparent Fees**: All platform economics visible on-chain
5. **Community Governed**: Stakeholders control platform evolution
6. **Global Payments**: Instant USDC settlements worldwide
7. **Verifiable Trust**: Immutable reviews and credentials

---

## 📝 Next Steps

1. **Fork Sanity Agency Starter**: Set up marketing layer foundation
2. **Deploy thirdweb contracts**: Start with basic escrow and SBT registry
3. **Configure The Graph**: Index booking and verification events
4. **Build verification UI**: Guide onboarding with document upload
5. **Implement booking flow**: End-to-end transaction testing
6. **Create dashboards**: Tourist, guide, and admin interfaces

---

*This specification serves as the single source of truth for the GuideChain platform development. All features are designed to work within thirdweb's free tier limits during MVP phase.*