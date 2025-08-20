"use client";

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { BookingForm } from "@/components/web3/BookingForm";

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



  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Verified Local Guides</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover authentic South African experiences with our verified local guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockGuides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-blue-600">{guide.name.charAt(0)}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">{guide.name}</h3>
                    {guide.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {guide.location}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {guide.specialties.map((specialty, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">${guide.pricePerHour}</p>
                      <p className="text-sm text-gray-500">per hour</p>
                      <p className="text-sm text-yellow-600 flex items-center mt-1">
                        ⭐ {guide.rating} rating
                      </p>
                    </div>
                    <button 
                      onClick={() => setSelectedGuide(guide)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      
      {selectedGuide && (
        <BookingForm
          guideAddress={selectedGuide.id}
          guideName={selectedGuide.name}
          pricePerHour={selectedGuide.pricePerHour}
          onClose={() => setSelectedGuide(null)}
        />
      )}
      
      <Footer />
    </div>
  );
}