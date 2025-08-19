'use client';

import { useState } from 'react';
import { useGuideVerification } from '@/hooks/useGuideVerification';

export function GuideVerificationForm() {
  const [provincialRegFile, setProvincialRegFile] = useState<File | null>(null);
  const [firstAidFile, setFirstAidFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  const { submitVerification, isUploading, isVerifying, uploadError, clearError } = useGuideVerification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!provincialRegFile || !firstAidFile) {
      return;
    }

    try {
      clearError();
      await submitVerification(provincialRegFile, firstAidFile);
      setSuccess(true);
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Verification Submitted
        </h3>
        <p className="text-green-700">
          Your documents have been uploaded and submitted for review. 
          You'll receive your verification SBT once approved.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Guide Verification</h2>
      
      {uploadError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
          {uploadError}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Provincial Registration Certificate
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setProvincialRegFile(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          First Aid Certificate
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setFirstAidFile(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!provincialRegFile || !firstAidFile || isUploading || isVerifying}
        className="w-full bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? 'Uploading...' : isVerifying ? 'Submitting...' : 'Submit for Verification'}
      </button>
    </form>
  );
}