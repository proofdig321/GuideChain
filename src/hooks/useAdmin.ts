import { useState, useEffect } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { ADMIN_CONFIG } from '@/constants/contracts';

export function useAdmin() {
  const [mounted, setMounted] = useState(false);
  const address = useAddress();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return {
      isAdmin: false,
      adminWallet: ADMIN_CONFIG.ADMIN_WALLET,
      treasuryWallet: ADMIN_CONFIG.TREASURY_WALLET
    };
  }
  
  const isAdmin = address?.toLowerCase() === ADMIN_CONFIG.ADMIN_WALLET.toLowerCase();
  
  return {
    isAdmin,
    adminWallet: ADMIN_CONFIG.ADMIN_WALLET,
    treasuryWallet: ADMIN_CONFIG.TREASURY_WALLET
  };
}