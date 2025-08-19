import { useState } from 'react';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { CONTRACTS } from '@/constants/contracts';

export function useGuideVerification() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { contract } = useContract(CONTRACTS.GUIDE_REGISTRY);
  const { mutateAsync: verifyGuide, isLoading: isVerifying } = useContractWrite(contract, 'verifyGuide');

  const uploadToIPFS = async (file: File): Promise<string> => {
    setIsUploading(true);
    setUploadError(null);
    
    try {
      // TODO: Implement web3.storage upload
      // For now, return placeholder hash
      const hash = `Qm${Math.random().toString(36).substring(2, 15)}`;
      return hash;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      setUploadError(message);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const submitVerification = async (
    provincialRegFile: File,
    firstAidFile: File
  ) => {
    try {
      if (provincialRegFile.size > 10 * 1024 * 1024) throw new Error('Provincial registration file too large');
      if (firstAidFile.size > 10 * 1024 * 1024) throw new Error('First aid certificate file too large');
      
      const [provincialHash, firstAidHash] = await Promise.all([
        uploadToIPFS(provincialRegFile),
        uploadToIPFS(firstAidFile)
      ]);

      await verifyGuide({
        args: [provincialHash, firstAidHash]
      });

      return { provincialHash, firstAidHash };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Verification failed';
      setUploadError(message);
      throw error;
    }
  };

  return {
    submitVerification,
    isUploading,
    isVerifying,
    uploadError,
    clearError: () => setUploadError(null)
  };
}