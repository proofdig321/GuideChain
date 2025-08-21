# Admin Dashboard Access - GuidesChain

**Date**: August 21, 2025

## How to Access Admin Dashboard

### Admin Wallet Address
The admin dashboard is restricted to this specific wallet address:
```
0x25E1303E503Dc60B5Eee353183A002a645439328
```

### Steps to Access Admin Dashboard:

1. **Connect the Admin Wallet**
   - Go to `/dashboard` page
   - Click "Connect Wallet" 
   - Connect the wallet with address: `0x25E1303E503Dc60B5Eee353183A002a645439328`

2. **Admin Features Available**
   - 📊 Platform Statistics (Total Guides, Bookings, Fees)
   - ⏳ Pending Guide Verifications
   - 🔄 Recent Activity Monitoring
   - 📋 Review Applications
   - 📈 View Analytics

### For Testing/Development:

If you need to test admin functionality:

1. **Import Admin Wallet**
   - Use MetaMask or your preferred wallet
   - Import using the private key for the admin address
   - **Note**: Never share private keys in production

2. **Alternative: Change Admin Address**
   - Edit `src/app/dashboard/DashboardContent.tsx`
   - Change `ADMIN_ADDRESS` to your wallet address
   - Rebuild and redeploy

### Admin Dashboard Features:

**Current Admin Panel includes:**
- Platform statistics dashboard
- Guide verification management
- Booking oversight
- Fee collection monitoring
- User activity tracking

**Future Admin Features (Planned):**
- Guide approval/rejection workflow
- Platform fee withdrawal
- User management
- Analytics and reporting
- Smart contract management

### Security Notes:

- Admin access is hardcoded to specific wallet address
- No other wallet can access admin features
- All admin actions are logged on-chain
- Multi-signature support planned for production

---

**Current Admin Address**: `0x25E1303E503Dc60B5Eee353183A002a645439328`
**Dashboard URL**: `/dashboard`
**Status**: Development Ready

---
*Last Updated: August 21, 2025*