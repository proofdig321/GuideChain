"use client";

import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export default function VerifyContent() {
  const account = useActiveAccount();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    specialties: "",
    experience: "",
    documents: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Guide verification will be implemented with smart contracts");
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Wallet to Apply as Guide</h1>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "GuideChain",
              url: "https://guidechain.vercel.app",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Apply as Guide</h1>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "GuideChain",
              url: "https://guidechain.vercel.app",
            }}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialties (comma separated)
              </label>
              <input
                type="text"
                required
                value={formData.specialties}
                onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                placeholder="Wine Tours, City History, Adventure Sports"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Description
              </label>
              <textarea
                required
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Documents
              </label>
              <input
                type="file"
                required
                onChange={(e) => setFormData({...formData, documents: e.target.files?.[0] || null})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Upload your tourism guide license or certification
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}