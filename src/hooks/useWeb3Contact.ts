/**
 * Web3 Contact Hook - Handles contact form with blockchain integration
 * Gracefully handles Web3 operations with fallbacks
 */

import { useState, useCallback } from "react";
import { useActiveAccount } from "thirdweb/react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}

interface Web3ContactData extends ContactFormData {
  walletAddress?: string;
  timestamp?: string;
  messageHash?: string;
}

interface ContactState {
  loading: boolean;
  error: string | null;
  success: boolean;
  canRetry: boolean;
}

export function useWeb3Contact() {
  const account = useActiveAccount();
  const [state, setState] = useState<ContactState>({
    loading: false,
    error: null,
    success: false,
    canRetry: false,
  });

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

  const generateMessageHash = async (data: ContactFormData): Promise<string> => {
    return handleGracefully(
      async () => {
        const message = `${data.name}-${data.email}-${data.subject}-${Date.now()}`;
        const encoder = new TextEncoder();
        const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(message));
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      },
      `hash-${Date.now()}`,
      'Failed to generate message hash'
    );
  };

  const submitContact = useCallback(async (formData: ContactFormData) => {
    setState({ loading: true, error: null, success: false, canRetry: false });

    try {
      // Generate message hash
      const messageHash = await generateMessageHash(formData);
      
      // Prepare Web3 enhanced data
      const web3Data: Web3ContactData = {
        ...formData,
        walletAddress: account?.address,
        timestamp: new Date().toISOString(),
        messageHash,
      };

      // Simulate API call (replace with actual implementation)
      await handleGracefully(
        async () => {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Simulate potential failure for testing
          if (Math.random() < 0.1) {
            throw new Error('Network error');
          }
          
          // Log the contact submission (in real app, send to API)
          console.log('Contact submitted:', web3Data);
          
          return true;
        },
        false,
        'Failed to submit contact form'
      );

      setState({ 
        loading: false, 
        error: null, 
        success: true, 
        canRetry: false 
      });

      return { success: true, data: web3Data };

    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to submit contact form. Please try again.';

      setState({ 
        loading: false, 
        error: errorMessage, 
        success: false, 
        canRetry: true 
      });

      return { success: false, error: errorMessage };
    }
  }, [account]);

  const retry = useCallback(() => {
    setState(prev => ({ ...prev, error: null, canRetry: false }));
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    submitContact,
    retry,
    clearError,
    isConnected: !!account,
    walletAddress: account?.address,
  };
}