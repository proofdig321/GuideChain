import { useAddress } from '@thirdweb-dev/react';
import { ADMIN_CONFIG } from '@/constants/contracts';

export function useAdmin() {
  const address = useAddress();
  
  const isAdmin = address?.toLowerCase() === ADMIN_CONFIG.ADMIN_WALLET.toLowerCase();
  
  return {
    isAdmin,
    adminWallet: ADMIN_CONFIG.ADMIN_WALLET,
    treasuryWallet: ADMIN_CONFIG.TREASURY_WALLET
  };
}