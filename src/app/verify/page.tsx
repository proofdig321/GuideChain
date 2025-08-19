'use client';

import { GuideVerificationForm } from '@/components/web3/GuideVerificationForm';

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Become a Verified Guide
          </h1>
          <p className="text-lg text-gray-600">
            Upload your credentials to get verified and start accepting bookings
          </p>
        </div>
        
        <GuideVerificationForm />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Required documents:</p>
          <ul className="mt-2 space-y-1">
            <li>• Valid provincial tour guide registration</li>
            <li>• Current first aid certification</li>
            <li>• SATSA membership (optional but recommended)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}