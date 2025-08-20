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
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header />
      
      <main style={{ padding: '48px 0' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '16px'
            }}>
              🧭 Verified Local Guides
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover authentic South African experiences with our verified local guides
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {mockGuides.map((guide) => (
              <div key={guide.id} style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                border: '1px solid #f3f4f6',
                overflow: 'hidden',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              }}>
                <div style={{
                  height: '192px',
                  background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #fdf4ff 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#3b82f6'
                  }}>
                    {guide.name.charAt(0)}
                  </div>
                  {guide.verified && (
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      background: '#dcfce7',
                      color: '#166534',
                      fontSize: '12px',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontWeight: '500'
                    }}>
                      ✓ Verified
                    </div>
                  )}
                </div>
                
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    {guide.name}
                  </h3>
                  
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    📍 {guide.location}
                  </p>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {guide.specialties.map((specialty, index) => (
                        <span key={index} style={{
                          background: '#eff6ff',
                          color: '#1d4ed8',
                          fontSize: '12px',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontWeight: '500'
                        }}>
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #f3f4f6'
                  }}>
                    <div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#1f2937'
                      }}>
                        ${guide.pricePerHour}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#6b7280'
                      }}>
                        per hour
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#f59e0b',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '4px'
                      }}>
                        ⭐ {guide.rating} rating
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedGuide(guide)}
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '12px',
                        border: 'none',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      🚀 Book Now
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