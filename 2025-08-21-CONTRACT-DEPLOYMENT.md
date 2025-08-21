# GuidesChain Smart Contract Deployment Guide

**Date**: August 21, 2025  
**Network**: Polygon zkEVM Testnet  
**Super Admin**: 0xc84799A904EeB5C57aBBBc40176E7dB8be202C10

## 📋 Pre-Deployment Checklist

### 1. **Environment Setup**
```bash
# Install thirdweb CLI
npm install -g @thirdweb-dev/cli

# Verify installation
thirdweb --version
```

### 2. **Network Configuration**
- **Network**: Polygon zkEVM Testnet
- **Chain ID**: 1442
- **RPC URL**: https://rpc.public.zkevm-test.net
- **Block Explorer**: https://testnet-zkevm.polygonscan.com/

### 3. **Get Testnet Funds**
- Visit: https://faucet.polygon.technology/
- Select "Polygon zkEVM Testnet"
- Enter Super Admin address: `0xc84799A904EeB5C57aBBBc40176E7dB8be202C10`
- Request testnet ETH for gas fees

## 🚀 Deployment Commands

### **Step 1: Deploy GuideRegistry (SBT Contract)**
```bash
cd /workspaces/GuideChain
npx thirdweb deploy contracts/GuideRegistry.sol --network polygon-zkevm-testnet
```

**Expected Output:**
- Contract address for GuideRegistry
- Transaction hash
- Verification status

### **Step 2: Deploy USDC Mock (For Testing)**
```bash
# Deploy mock USDC for testing
npx thirdweb deploy contracts/MockUSDC.sol --network polygon-zkevm-testnet
```

### **Step 3: Deploy BookingEscrow**
```bash
# Deploy with USDC contract address from Step 2
npx thirdweb deploy contracts/BookingEscrow.sol --network polygon-zkevm-testnet
```

**Constructor Parameters:**
- `_usdc`: Address of USDC contract from Step 2

### **Step 4: Deploy ReputationSystem**
```bash
npx thirdweb deploy contracts/ReputationSystem.sol --network polygon-zkevm-testnet
```

## 📝 Post-Deployment Tasks

### **Update Contract Addresses**
Edit `src/constants/index.ts`:
```typescript
export const CONTRACT_ADDRESSES = {
  GUIDE_REGISTRY: "0x...", // From Step 1
  BOOKING_ESCROW: "0x...", // From Step 3
  REPUTATION_SYSTEM: "0x...", // From Step 4
  USDC: "0x...", // From Step 2 (testnet only)
};
```

### **Verify Contracts**
```bash
# Verify on block explorer
npx thirdweb verify <contract-address> --network polygon-zkevm-testnet
```

### **Test Admin Access**
1. Connect wallet with Super Admin address: `0xc84799A904EeB5C57aBBBc40176E7dB8be202C10`
2. Go to `/dashboard` page
3. Verify admin panel appears
4. Test guide verification functionality

## 🧪 Testing Workflow

### **1. Guide Registration Test**
```bash
# Test guide registration
# Use /verify page to register a test guide
# Check GuideRegistry contract for new token
```

### **2. Booking Flow Test**
```bash
# Test complete booking flow
# Create booking with USDC
# Confirm booking as guide
# Complete booking as tourist
```

### **3. Review System Test**
```bash
# Submit review after completed booking
# Verify review appears in ReputationSystem
# Check guide rating calculation
```

## 📊 Contract Verification

### **GuideRegistry Features**
- ✅ Soulbound tokens (non-transferable)
- ✅ Super Admin verification system
- ✅ IPFS metadata storage
- ✅ Guide registration and verification

### **BookingEscrow Features**
- ✅ USDC payment handling
- ✅ 7.5% platform fee collection
- ✅ Escrow protection
- ✅ Booking lifecycle management

### **ReputationSystem Features**
- ✅ 1-5 star rating system
- ✅ IPFS review storage
- ✅ Average rating calculation
- ✅ Review verification system

## 🔐 Security Considerations

### **Access Control**
- Super Admin: `0xc84799A904EeB5C57aBBBc40176E7dB8be202C10`
- Only Super Admin can verify guides
- Only Super Admin can verify reviews
- Platform fees go to Super Admin wallet

### **Smart Contract Security**
- ReentrancyGuard on all payable functions
- OpenZeppelin security standards
- Input validation on all parameters
- Emergency withdrawal functions

## 📈 Monitoring & Analytics

### **Track Deployment Success**
- [ ] All contracts deployed successfully
- [ ] Contract addresses updated in frontend
- [ ] Admin dashboard accessible
- [ ] Test transactions working
- [ ] Platform fees collecting correctly

### **Performance Metrics**
- Gas costs for each contract deployment
- Transaction confirmation times
- Contract interaction success rates
- Platform fee collection amounts

---

**Next Steps After Deployment:**
1. Update frontend with contract addresses
2. Test complete user flow end-to-end
3. Deploy to production (Vercel)
4. Monitor contract interactions
5. Prepare for mainnet deployment

*Deployment Guide Created: August 21, 2025*