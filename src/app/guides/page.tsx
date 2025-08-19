'use client';

import { useState, useEffect } from 'react';
import { graphService } from '@/lib/graph';
import { BookingForm } from '@/components/web3/BookingForm';

interface Guide {
  id: string;
  verified: boolean;
  provincialReg: string;
  firstAidCert: string;
  satsaMembership?: string;
  verifiedAt: string;
  expiresAt: string;
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      setLoading(true);
      const verifiedGuides = await graphService.getVerifiedGuides();
      setGuides(verifiedGuides);
    } catch (error) {
      console.error('Failed to load guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockGuideData = (guide: Guide) => ({
    address: guide.id,
    name: `Guide ${guide.id.slice(0, 6)}...`,
    experienceTitle: 'Cape Town City Tour',
    pricePerPerson: '50',
    maxParticipants: 8,
    description: 'Explore the beautiful city of Cape Town with a verified local guide.',
    specialties: ['City Tours', 'Wine Tasting', 'Historical Sites'],
    languages: ['English', 'Afrikaans']
  });

  if (selectedGuide) {
    const guideData = mockGuideData(selectedGuide);
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => setSelectedGuide(null)}
            className="mb-6 text-primary-600 hover:text-primary-800"
          >
            ← Back to Guides
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-4">{guideData.name}</h1>
              <div className="mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Verified Guide
                </span>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">{guideData.experienceTitle}</h2>
              <p className="text-gray-600 mb-4">{guideData.description}</p>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Specialties:</h3>
                <div className="flex flex-wrap gap-2">
                  {guideData.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium mb-2">Languages:</h3>
                <div className="flex flex-wrap gap-2">
                  {guideData.languages.map((language, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-2xl font-bold text-primary-600">
                {guideData.pricePerPerson} USDC per person
              </div>
            </div>
            
            <div>
              <BookingForm guide={guideData} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Verified Guides</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading verified guides...</p>
          </div>
        ) : guides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No verified guides found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => {
              const guideData = mockGuideData(guide);
              return (
                <div key={guide.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{guideData.name}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ✓ Verified
                      </span>
                    </div>
                    
                    <h4 className="font-medium text-primary-600 mb-2">{guideData.experienceTitle}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{guideData.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {guideData.specialties.slice(0, 2).map((specialty, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                      {guideData.specialties.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{guideData.specialties.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-primary-600">
                        {guideData.pricePerPerson} USDC
                      </div>
                      <button
                        onClick={() => setSelectedGuide(guide)}
                        className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
                      >
                        View & Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}