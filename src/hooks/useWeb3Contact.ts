import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

export function useWeb3Contact() {
  const account = useActiveAccount();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitContact = async (formData: ContactFormData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call with Web3 enhancement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log submission (in real app, send to API)
      console.log('Contact submitted:', {
        ...formData,
        walletAddress: account?.address,
        timestamp: new Date().toISOString(),
      });

      setSuccess(true);
      return { success: true };
    } catch (err) {
      const errorMessage = 'Failed to submit message. Please try again.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(false);

  return {
    loading,
    success,
    error,
    submitContact,
    clearError,
    clearSuccess,
    isConnected: !!account,
    walletAddress: account?.address,
  };
}