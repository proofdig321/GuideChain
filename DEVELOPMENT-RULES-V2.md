# GuideChain Development Rules V2 - Modern Architecture Framework

## 🚨 MANDATORY RULES (Never Break)

### 1. Modern Stack Compliance
- **thirdweb v5 Only** - Never use deprecated v4 APIs
- **Next.js 15+** - Use App Router and modern features
- **React 19+** - Leverage concurrent features
- **TypeScript ES2020+** - Full BigInt and modern syntax support
- **Zero Vulnerabilities** - Maintain clean dependency tree

### 2. Enterprise Architecture Standards
- **Comprehensive Type Safety** - 100% TypeScript coverage
- **Modular Design** - Separation of concerns
- **Error Boundaries** - Graceful error handling
- **Performance First** - Optimized bundle size
- **Security First** - Input validation and sanitization

### 3. Web3 Integration Standards
- **thirdweb v5 SDK** - Modern contract interactions
- **BigInt Support** - Proper blockchain number handling
- **Client-Side Rendering** - SSR-safe Web3 components
- **Error Handling** - Comprehensive transaction error management
- **Type Safety** - Typed contract interactions

### 4. Code Quality Standards
- **Single Responsibility** - One purpose per component/function
- **Comprehensive Hooks** - Business logic in custom hooks
- **Utility Functions** - Reusable helper functions
- **Consistent Patterns** - Standardized code structure
- **Documentation** - JSDoc for all functions

### 5. Data Integrity Standards (CRITICAL)
- **NO MOCK DATA** - Never use fake/sample data in production
- **Real Web3 Only** - All data must come from contracts or IPFS
- **Graceful Empty States** - Professional handling when no data exists
- **Contract-First** - Always prioritize blockchain data over fallbacks
- **IPFS Integration** - Metadata must be stored in decentralized storage

## 📋 ARCHITECTURE PRINCIPLES

### Component Structure
```typescript
// ✅ REQUIRED: Comprehensive component structure
interface ComponentProps {
  required: string;
  optional?: number;
}

export function Component({ required, optional }: ComponentProps) {
  // 1. State management
  const [state, setState] = useState<Type>(initialValue);
  
  // 2. Custom hooks
  const { data, loading, error } = useCustomHook();
  
  // 3. Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // 4. Event handlers
  const handleEvent = useCallback(() => {
    // Event logic
  }, [dependencies]);
  
  // 5. Early returns
  if (loading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;
  
  // 6. Render
  return <JSX />;
}
```

### Hook Structure
```typescript
// ✅ REQUIRED: Comprehensive hook structure
export function useCustomHook() {
  const [data, setData] = useState<Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Core functionality
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Implementation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  // Utility functions
  const filterData = (criteria: FilterCriteria) => {
    return data.filter(item => matchesCriteria(item, criteria));
  };
  
  return {
    data,
    loading,
    error,
    fetchData,
    filterData,
    clearError: () => setError(null),
  };
}
```

### Contract Integration
```typescript
// ✅ REQUIRED: thirdweb v5 contract pattern
import { getContract, prepareContractCall, readContract } from "thirdweb";

const contract = getContract({
  client,
  chain: PLATFORM_CONFIG.SUPPORTED_CHAIN,
  address: CONTRACT_ADDRESS,
});

// Read function
const readData = async () => {
  return await readContract({
    contract,
    method: "function getData() view returns (uint256)",
    params: [],
  });
};

// Write function
const writeData = (value: string) => {
  return prepareContractCall({
    contract,
    method: "function setData(uint256 value)",
    params: [BigInt(value)],
  });
};
```

## 🔧 DEVELOPMENT WORKFLOW

### File Organization
```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                # Reusable UI components
│   ├── web3/              # Web3-specific components
│   ├── dashboard/         # Dashboard components
│   ├── forms/             # Form components
│   └── pwa/               # PWA components
├── hooks/                 # Custom React hooks
├── lib/
│   ├── contracts/         # Smart contract interactions
│   ├── ipfs/              # IPFS services
│   └── utils/             # Utility functions
├── types/                 # TypeScript definitions
└── constants/             # Configuration constants
```

### Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useGuides.ts`)
- **Utilities**: camelCase (`formatCurrency.ts`)
- **Constants**: UPPER_SNAKE_CASE (`PLATFORM_CONFIG`)
- **Types**: PascalCase (`UserProfile`, `BookingStatus`)

### Import Organization
```typescript
// 1. React imports
import { useState, useEffect } from "react";

// 2. Third-party imports
import { useActiveAccount } from "thirdweb/react";

// 3. Internal imports (absolute paths)
import { contractFunctions } from "@/lib/contracts";
import { PLATFORM_CONFIG } from "@/constants";
import type { User } from "@/types";

// 4. Relative imports
import { Button } from "./Button";
```

## 🛡️ SECURITY STANDARDS

### Input Validation
```typescript
// ✅ REQUIRED: Comprehensive validation
import { validateGuideName, sanitizeInput } from "@/lib/utils";

const handleSubmit = (input: string) => {
  // 1. Sanitize input
  const sanitized = sanitizeInput(input);
  
  // 2. Validate input
  const error = validateGuideName(sanitized);
  if (error) throw new Error(error);
  
  // 3. Process validated input
  processInput(sanitized);
};
```

### Graceful Error Handling (MANDATORY)
```typescript
// ✅ REQUIRED: Handle everything gracefully - never crash the app

// Universal graceful handler
const handleGracefully = async <T>(
  operation: () => Promise<T>,
  fallback: T,
  errorMessage?: string
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error(errorMessage || 'Operation failed gracefully:', error);
    return fallback;
  }
};

// Component-level graceful error handling
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  // 1. Log error for debugging (never expose to user)
  console.error('Operation failed:', error);
  
  // 2. Create user-friendly message
  const message = error instanceof Error 
    ? error.message 
    : 'Something went wrong. Please try again.';
  
  // 3. Set error state with recovery options
  setError({
    message,
    canRetry: true,
    fallbackAction: () => setError(null)
  });
  
  // 4. Return graceful fallback (never crash)
  return fallbackValue;
}

// Web3 graceful handling
const handleWeb3Gracefully = async (web3Operation: () => Promise<any>) => {
  try {
    return await web3Operation();
  } catch (error) {
    // Handle specific Web3 errors gracefully
    if (error?.code === 4001) {
      return { success: false, message: 'Transaction cancelled by user' };
    }
    if (error?.code === -32603) {
      return { success: false, message: 'Network error. Please check your connection.' };
    }
    // Generic Web3 error
    return { success: false, message: 'Web3 operation failed. Please try again.' };
  }
};
```

### Error Boundaries
```typescript
// ✅ REQUIRED: React Error Boundary for graceful UI recovery
class GracefulErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Graceful error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We're sorry for the inconvenience. Please refresh the page.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Environment Variables
```typescript
// ✅ REQUIRED: Secure environment handling
const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
if (!clientId) {
  throw new Error("Missing required environment variable");
}
```

## 📊 PERFORMANCE STANDARDS

### Bundle Optimization
- **Dynamic Imports**: Use for large components
- **Tree Shaking**: Import only what's needed
- **Code Splitting**: Route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Non-critical components

### Memory Management
- **Cleanup Effects**: Always cleanup subscriptions
- **Memoization**: Use useMemo/useCallback appropriately
- **State Management**: Minimize state complexity
- **Event Listeners**: Remove on unmount
- **Timers**: Clear intervals/timeouts

### Network Optimization
- **Request Batching**: Combine API calls
- **Caching**: Implement appropriate caching
- **Error Retry**: Implement retry logic
- **Loading States**: Show progress indicators
- **Offline Support**: PWA capabilities

## 🧪 TESTING STANDARDS

### Component Testing
```typescript
// ✅ REQUIRED: Component test structure
import { render, screen, fireEvent } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component required="test" />);
    expect(screen.getByText('test')).toBeInTheDocument();
  });
  
  it('handles user interaction', () => {
    const onAction = jest.fn();
    render(<Component required="test" onAction={onAction} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onAction).toHaveBeenCalled();
  });
});
```

### Hook Testing
```typescript
// ✅ REQUIRED: Hook test structure
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  it('initializes correctly', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
```

## 🚀 DEPLOYMENT STANDARDS

### Build Validation
- **TypeScript**: Zero type errors
- **Linting**: Zero lint errors
- **Bundle Size**: Under size limits
- **Performance**: Lighthouse scores >90
- **Security**: Zero vulnerabilities

### Environment Configuration
- **Development**: Local development setup
- **Staging**: Pre-production testing
- **Production**: Live deployment
- **Testing**: Automated test environment

### Monitoring
- **Error Tracking**: Comprehensive error logging
- **Performance**: Real-time performance monitoring
- **Analytics**: User behavior tracking
- **Uptime**: Service availability monitoring

## 🔄 GRACEFUL HANDLING PRINCIPLES

### Core Principles
1. **Never Crash**: Always provide fallback UI and functionality
2. **Progressive Enhancement**: Core features work without Web3/advanced features
3. **User-Friendly**: Error messages are helpful, not technical
4. **Recovery Options**: Always provide ways to recover from errors
5. **Logging**: Comprehensive error logging for debugging (not user-facing)
6. **NO MOCK DATA**: Never show fake data - use empty states instead
7. **Real Data First**: Always attempt Web3/IPFS before showing empty states

### Data Handling Rules (MANDATORY)
```typescript
// ❌ FORBIDDEN: Mock data generation
const mockData = generateFakeData();

// ✅ REQUIRED: Real Web3 data with empty state fallback
const data = await contractFunction.getData();
if (data.length === 0) {
  return <EmptyState 
    title="No Data Available" 
    description="Be the first to add data"
    actionLabel="Get Started"
  />;
}

// ✅ REQUIRED: Graceful error handling
try {
  const realData = await fetchFromBlockchain();
  return realData;
} catch (error) {
  return <ErrorState 
    message="Failed to load data"
    onRetry={() => fetchFromBlockchain()}
  />;
}
```

### Implementation Checklist
- [ ] All async operations wrapped in try-catch
- [ ] Fallback UI for all error states
- [ ] User-friendly error messages
- [ ] Recovery/retry mechanisms
- [ ] Error boundaries for component crashes
- [ ] Web3 error handling with specific messages
- [ ] Network error handling with offline support
- [ ] Form validation with helpful feedback
- [ ] **NO MOCK DATA** - All data from Web3/IPFS or empty states
- [ ] **Empty State Components** - Professional no-data handling
- [ ] **Contract Event Listeners** - Real-time blockchain updates
- [ ] **IPFS Metadata Integration** - Decentralized data storage

## 📝 DOCUMENTATION STANDARDS

### Code Documentation
```typescript
/**
 * Calculates platform fee for a given amount
 * @param amount - The base amount in USDC
 * @param feePercentage - The fee percentage (default: 7.5%)
 * @returns The calculated fee amount
 * @example
 * const fee = calculatePlatformFee("100", 7.5); // Returns "7.50"
 */
export function calculatePlatformFee(
  amount: string | number, 
  feePercentage = 7.5
): string {
  // Implementation
}
```

### API Documentation
- **Function Signatures**: Complete parameter documentation
- **Return Types**: Detailed return value descriptions
- **Examples**: Usage examples for complex functions
- **Error Cases**: Document possible error conditions

## 🔄 CONTINUOUS IMPROVEMENT

### Code Review Checklist
- [ ] Follows architecture principles
- [ ] Comprehensive error handling
- [ ] Type safety maintained
- [ ] Performance optimized
- [ ] Security validated
- [ ] Tests included
- [ ] Documentation updated

### Refactoring Guidelines
- **Small Changes**: Incremental improvements
- **Backward Compatibility**: Maintain existing APIs
- **Test Coverage**: Maintain or improve coverage
- **Performance**: Measure before/after
- **Documentation**: Update affected docs

---

**DEVELOPMENT RULES V2 - MODERN ARCHITECTURE**
**Enterprise-grade standards for scalable Web3 applications**
**Zero compromise on quality, security, and performance**
**HANDLE EVERYTHING GRACEFULLY - NO CRASHES, ALWAYS FALLBACKS**