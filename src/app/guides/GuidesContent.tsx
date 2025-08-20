"use client";

import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "../client";

interface Guide {
  id: string;
  name: string;
  location: string;
  specialties: string[];
  pricePerHour: number;
  rating: number;
  verified: boolean;
}

const mockGuides: Guide[] = [
  {
    id: "1",
    name: "Thabo Mthembu",
    location: "Cape Town",
    specialties: ["Wine Tours", "Table Mountain", "City History"],
    pricePerHour: 50,
    rating: 4.9,
    verified: true
  },
  {
    id: "2", 
    name: "Sarah Johnson",
    location: "Johannesburg",
    specialties: ["Soweto Tours", "Apartheid History", "Local Culture"],
    pricePerHour: 45,
    rating: 4.8,
    verified: true
  }
];

export default function GuidesContent() {
  const account = useActiveAccount();
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Wallet to View Guides</h1>
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
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Verified Guides</h1>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "GuideChain", 
              url: "https://guidechain.vercel.app",
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGuides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{guide.name}</h3>
                {guide.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    ✓ Verified
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-2">{guide.location}</p>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {guide.specialties.map((specialty, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold">${guide.pricePerHour}/hour</p>
                  <p className="text-sm text-gray-500">⭐ {guide.rating}</p>
                </div>
                <button 
                  onClick={() => setSelectedGuide(guide)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Book {selectedGuide.name}</h2>
              <p className="text-gray-600 mb-4">Booking functionality will be implemented with smart contracts</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedGuide(null)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded">
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}