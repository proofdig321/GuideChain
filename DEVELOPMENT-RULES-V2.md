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

### Error Handling
```typescript
// ✅ REQUIRED: Comprehensive error handling
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  // 1. Log error for debugging
  console.error('Operation failed:', error);
  
  // 2. Create user-friendly message
  const message = error instanceof Error 
    ? error.message 
    : 'Operation failed';
  
  // 3. Set error state
  setError(message);
  
  // 4. Re-throw if needed
  throw new Error(message);
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