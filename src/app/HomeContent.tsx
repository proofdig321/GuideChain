"use client";

import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          GuideChain
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Decentralized peer-to-peer tourism marketplace connecting tourists with verified South African guides
        </p>
        
        <div className="mb-8">
          <ConnectButton
            client={client}
            appMetadata={{
              name: "GuideChain",
              url: "https://guidechain.vercel.app",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">For Tourists</h3>
            <p className="text-gray-600">Find verified local guides for authentic South African experiences</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">For Guides</h3>
            <p className="text-gray-600">Get verified and earn from sharing your local knowledge</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Web3 Powered</h3>
            <p className="text-gray-600">Secure payments and reputation system on blockchain</p>
          </div>
        </div>
      </div>
    </main>
  );
}