# GuideChain Development Rules - Progressive Development Framework

## 🚨 MANDATORY RULES (Never Break)

### 1. No Breaking Changes
- **Never remove** existing functionality
- **Never modify** existing APIs without backward compatibility
- **Always extend** rather than replace
- **Version control** all breaking changes with migration paths

### 2. No Duplicate Code
- **DRY principle** strictly enforced
- **Reuse components** from template and existing codebase
- **Single source of truth** for all configurations
- **Shared utilities** for common operations

### 3. Web3 Data Priority
- **Blockchain first** for all business logic
- **IPFS storage** for user-generated content
- **Sanity CMS** only for marketing/static content
- **No traditional databases** for core functionality

### 4. No Mock/Sample Data
- **Real blockchain data** only
- **Actual IPFS hashes** for content
- **Live smart contract** interactions
- **Authentic user-generated** content

### 5. Comprehensive Testing
- **Unit tests** for all components
- **Integration tests** for Web3 interactions
- **E2E tests** for critical user flows
- **Security audits** for smart contracts

### 6. Robust Error Handling
- **Try-catch blocks** for all async operations
- **User-friendly error** messages
- **Fallback mechanisms** for network failures
- **Error boundaries** for React components

### 7. Enhancement-Only Approach
- **Build upon** existing foundations
- **Extend functionality** progressively
- **Maintain compatibility** with previous versions
- **Document all enhancements**

### 8. Maintain Web3 Principles
- **Decentralization** over centralization
- **User ownership** of data and assets
- **Transparency** in all operations
- **Trustless interactions** via smart contracts

## 📋 PROGRESSIVE DEVELOPMENT RULES

### Code Quality Standards
```typescript
// ✅ REQUIRED: Strict TypeScript
interface ComponentProps {
  required: string;
  optional?: number;
}

// ✅ REQUIRED: Error handling
try {
  const result = await web3Operation();
  return result;
} catch (error) {
  console.error('Operation failed:', error);
  throw new Error('User-friendly message');
}

// ✅ REQUIRED: Loading states
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Component Structure Rules
- **Single responsibility** per component
- **Props interface** always defined
- **Error boundaries** for Web3 components
- **Loading states** for async operations
- **Accessibility** attributes required

### File Organization Rules
```
src/
├── app/                    # Next.js 14 App Router
├── components/
│   ├── ui/                # Reusable UI components
│   ├── web3/              # Web3-specific components
│   └── pwa/               # PWA-specific components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── types/                 # TypeScript interfaces
└── constants/             # Configuration constants
```

### Web3 Integration Rules
- **thirdweb SDK** for all blockchain interactions
- **IPFS via web3.storage** for file uploads
- **The Graph** for blockchain data querying
- **Error handling** for network failures
- **Offline support** for PWA functionality

### Security Rules
- **Environment variables** for all secrets
- **Input validation** on all user inputs
- **Sanitization** of user-generated content
- **Rate limiting** for API endpoints
- **Audit trails** for all transactions

### Performance Rules
- **Lazy loading** for non-critical components
- **Image optimization** with Next.js Image
- **Bundle splitting** for optimal loading
- **Caching strategies** for IPFS content
- **Service worker** for offline functionality

### Testing Rules
- **Test coverage** minimum 80%
- **Mock Web3 interactions** in tests
- **Test error scenarios** thoroughly
- **Performance testing** for critical paths
- **Security testing** for vulnerabilities

### Documentation Rules
- **JSDoc comments** for all functions
- **README updates** for new features
- **API documentation** for endpoints
- **User guides** for complex features
- **Change logs** for all releases

## 🔄 PROGRESSIVE ENHANCEMENT WORKFLOW

### Phase 1: Foundation (Current)
- [x] Template integration
- [x] Web3 infrastructure
- [x] PWA optimization
- [x] Basic wallet connection

### Phase 2: Core Features
- [ ] Smart contract deployment
- [ ] Guide verification system
- [ ] Booking engine
- [ ] IPFS document upload

### Phase 3: Advanced Features
- [ ] AI integration
- [ ] DAO governance
- [ ] Advanced analytics
- [ ] Multi-language support

### Phase 4: Optimization
- [ ] Performance tuning
- [ ] Security hardening
- [ ] Scalability improvements
- [ ] User experience polish

## 🛡️ QUALITY GATES

### Before Each Commit
- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] Linting rules satisfied
- [ ] No console.log statements
- [ ] Documentation updated

### Before Each PR
- [ ] Code review completed
- [ ] Integration tests passing
- [ ] Performance benchmarks met
- [ ] Security scan clean
- [ ] Accessibility compliance

### Before Each Release
- [ ] E2E tests passing
- [ ] Security audit completed
- [ ] Performance optimization verified
- [ ] User acceptance testing done
- [ ] Documentation complete

## 📊 METRICS & MONITORING

### Development Metrics
- Code coverage percentage
- Build time optimization
- Bundle size monitoring
- Performance benchmarks
- Error rate tracking

### User Experience Metrics
- Page load times
- Wallet connection success rate
- Transaction completion rate
- PWA installation rate
- Offline functionality usage

### Business Metrics
- Guide verification rate
- Booking completion rate
- User retention rate
- Platform fee collection
- Dispute resolution time

## 🚀 CONTINUOUS IMPROVEMENT

### Weekly Reviews
- Code quality assessment
- Performance monitoring
- Security vulnerability scan
- User feedback analysis
- Technical debt evaluation

### Monthly Assessments
- Architecture review
- Scalability planning
- Technology stack evaluation
- Team productivity analysis
- Process optimization

---

*These rules must be followed for every commit, PR, and release. No exceptions.*
*Updated: 08/19/2025 - Progressive Development Framework v1.0*