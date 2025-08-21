# GuidesChain - Enterprise Web3 Tourism Platform

> Decentralized peer-to-peer tourism marketplace connecting tourists with verified South African guides

## 🚀 Modern Architecture (Re-scaffolded 08/20/2025)

### Technology Stack
- **Next.js 15.4.6** - Modern App Router with React 19
- **thirdweb v5** - Latest Web3 SDK with SSR support
- **TypeScript ES2020** - Full type safety with BigInt support
- **Tailwind CSS** - Utility-first styling
- **PWA** - Native app experience with offline support

### Key Features
- **Zero Vulnerabilities** - Clean dependency tree (1047 packages)
- **100% Type Safety** - Comprehensive TypeScript coverage
- **Enterprise Architecture** - Modular, scalable design
- **7.5% Platform Fees** - Sustainable revenue model
- **Admin Controls** - Complete platform management

## 🏗️ Project Structure

```
GuidesChain/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── client.ts          # thirdweb v5 client
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Homepage
│   │   ├── guides/            # Guide marketplace
│   │   ├── verify/            # Guide verification
│   │   └── dashboard/         # Admin & user dashboards
│   ├── components/            # UI Components
│   │   ├── ui/               # Reusable components
│   │   ├── web3/             # Web3-specific components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── forms/            # Form components
│   │   └── pwa/              # PWA components
│   ├── hooks/                # Custom React Hooks
│   │   ├── useGuides.ts      # Guide management
│   │   ├── useBookings.ts    # Booking lifecycle
│   │   ├── useVerification.ts # Guide verification
│   │   ├── useReviews.ts     # Review system
│   │   └── usePlatform.ts    # Platform statistics
│   ├── lib/                  # Core Libraries
│   │   ├── contracts/        # Smart contract interactions
│   │   ├── ipfs/             # IPFS file management
│   │   └── utils/            # Utility functions
│   ├── types/                # TypeScript definitions
│   └── constants/            # Configuration
├── contracts/                # Smart contracts
│   ├── GuideRegistry.sol     # SBT-based verification
│   ├── BookingEscrow.sol     # USDC payment handling
│   └── ReputationSystem.sol  # Review system
├── public/                   # Static assets
└── package.json              # Modern dependencies
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/proofdig321/GuidesChain.git
cd GuidesChain

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

### Environment Variables
```bash
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret_key
```

## 🚀 Deployment

### Smart Contract Deployment
```bash
# Get testnet funds from Polygon zkEVM faucet
# https://faucet.polygon.technology/

# Deploy contracts using thirdweb
npx thirdweb deploy contracts/GuideRegistry.sol
npx thirdweb deploy contracts/BookingEscrow.sol
npx thirdweb deploy contracts/ReputationSystem.sol

# Update contract addresses in src/constants/index.ts
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

## 🏛️ Platform Architecture

### Smart Contracts (Polygon zkEVM)
- **GuideRegistry**: SBT-based guide verification system
- **BookingEscrow**: USDC payment handling with 7.5% platform fees
- **ReputationSystem**: IPFS-anchored review and rating system

### Web3 Integration
- **thirdweb v5**: Modern contract interactions
- **Wallet Connection**: Multi-wallet support
- **IPFS Storage**: Decentralized file storage via Pinata
- **The Graph**: Blockchain data indexing (planned)

### User Roles
- **Tourists**: Browse guides, make bookings, leave reviews
- **Guides**: Get verified, manage bookings, earn from tours
- **Admin**: Verify guides, manage platform, collect fees

## 💰 Business Model

### Platform Economics
- **7.5% Platform Fee** on all completed bookings
- **Guide Earnings**: 92.5% of booking amount
- **Payment Currency**: USDC on Polygon zkEVM
- **Admin Wallet**: `0x25E1303E503Dc60B5Eee353183A002a645439328`

### Revenue Streams
1. **Booking Fees**: 7.5% of all transactions
2. **Premium Features**: Enhanced guide profiles (planned)
3. **Corporate Bookings**: Volume discounts with higher values
4. **API Access**: Third-party integrations (planned)

## 🛡️ Security Features

### Smart Contract Security
- **OpenZeppelin Standards**: Audited contract templates
- **ReentrancyGuard**: Protection against reentrancy attacks
- **Access Control**: Role-based permissions
- **Pausable**: Emergency stop functionality

### Frontend Security
- **Input Validation**: Comprehensive sanitization
- **XSS Prevention**: Content security policies
- **Environment Variables**: Secure credential management
- **Error Handling**: No sensitive data exposure

## 📱 PWA Features

### Native App Experience
- **Offline Support**: Service worker caching
- **Install Prompts**: Add to home screen
- **Push Notifications**: Booking updates (planned)
- **Background Sync**: Offline transaction queuing

### Mobile Optimization
- **Responsive Design**: Mobile-first approach
- **Touch Interactions**: Optimized gestures
- **Performance**: Fast loading on mobile networks
- **Battery Efficiency**: Optimized for mobile devices

## 🧪 Testing

### Test Commands
```bash
npm run test          # Run unit tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
npm run lint          # ESLint
npm run type-check    # TypeScript validation
```

### Testing Strategy
- **Unit Tests**: Component and hook testing
- **Integration Tests**: Contract interaction testing
- **E2E Tests**: Full user flow testing
- **Security Tests**: Vulnerability scanning

## 📊 Performance

### Metrics
- **Bundle Size**: Optimized for Vercel free tier
- **Build Time**: ~80 seconds
- **Dependencies**: 1047 packages (54% reduction from v1)
- **Vulnerabilities**: 0 (100% improvement)
- **Type Coverage**: 100%

### Optimizations
- **Code Splitting**: Dynamic imports
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: Next.js Image component
- **Caching**: Service worker and API caching
- **Lazy Loading**: Non-critical components

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow development rules in `DEVELOPMENT-RULES-V2.md`
4. Commit changes (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open Pull Request

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages
- **Documentation**: JSDoc for all functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: https://guidechain.vercel.app (after deployment)
- **Documentation**: See `/docs` folder
- **Smart Contracts**: See `/contracts` folder
- **API Reference**: See `/api-docs` folder

## 📞 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@guidechain.com
- **Discord**: GuidesChain Community (planned)

## 🎯 Roadmap

### Phase 1: Core Platform (Current)
- [x] Smart contract development
- [x] Frontend re-scaffolding
- [x] Admin dashboard
- [ ] Smart contract deployment
- [ ] Production deployment

### Phase 2: Enhanced Features (Q1 2025)
- [ ] Advanced search and filtering
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] The Graph integration

### Phase 3: Scale & Growth (Q2 2025)
- [ ] AI-powered matching
- [ ] Corporate booking portal
- [ ] Partner integrations
- [ ] International expansion

### Phase 4: Innovation (Q3 2025)
- [ ] DAO governance
- [ ] NFT experience certificates
- [ ] Cross-chain compatibility
- [ ] Metaverse integration

---

**Built with ❤️ for the South African tourism industry**
**Empowering local guides through Web3 technology**