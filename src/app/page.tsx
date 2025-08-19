'use client';

import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react';
import { PWAInstallPrompt } from '@/components/pwa/PWAInstallPrompt';
import { OfflineIndicator } from '@/components/pwa/OfflineIndicator';

export default function Home() {
  return (
    <>
      <OfflineIndicator />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
          <h1 className="text-4xl font-bold text-center mb-8">
            GuideChain
          </h1>
          <p className="text-center mb-8 text-gray-600">
            Web3 Tourism Platform - Connecting Tourists with Verified South African Guides
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <ConnectWallet />
            
            <div className="flex gap-4 mt-4">
              <Link 
                href="/verify" 
                className="px-6 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                Become a Guide
              </Link>
              <Link 
                href="/guides" 
                className="px-6 py-2 bg-secondary-600 text-white rounded hover:bg-secondary-700"
              >
                Find Guides
              </Link>
            </div>
          </div>
        </div>
      </main>
      <PWAInstallPrompt />
    </>
  );
}