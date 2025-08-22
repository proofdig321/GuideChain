"use client";

import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { MockDataBanner } from "@/components/ui/MockDataBanner";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

// Mock guides data for booking
const mockGuides = [
  {
    id: "1",
    name: "Sarah Johnson",
    location: "Cape Town",
    specialty: "Wine Tours",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 45,
    verified: true,
    image: "🍷",
    description: "Expert wine guide with 8 years experience in Cape Town wine regions"
  },
  {
    id: "2", 
    name: "Michael Ndaba",
    location: "Johannesburg",
    specialty: "Cultural Tours",
    rating: 4.8,
    reviews: 89,
    hourlyRate: 35,
    verified: true,
    image: "🏛️",
    description: "Local historian specializing in South African cultural heritage"
  },
  {
    id: "3",
    name: "Lisa van der Merwe",
    location: "Durban",
    specialty: "Adventure Tours",
    rating: 4.7,
    reviews: 156,
    hourlyRate: 55,
    verified: true,
    image: "🏄‍♀️",
    description: "Adventure specialist offering surfing, hiking, and extreme sports"
  }
];

export default function BookingContent() {
  const account = useActiveAccount();
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  if (!account) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        <Header />
        <div style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 16px'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
            }}>
              <span style={{ color: 'white', fontSize: '32px' }}>🎫</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(24px, 6vw, 48px)', 
              fontWeight: '700', 
              color: '#1f2937', 
              marginBottom: '16px' 
            }}>
              🔐 Connect to Book
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px', lineHeight: '1.6' }}>
              Connect your Web3 wallet to book verified South African guides
            </p>
            <ConnectButton
              client={client}
              appMetadata={{
                name: "GuidesChain",
                url: "https://guideschain.vercel.app",
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fef3c7 100%)',
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '100px',
          height: '100px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}></div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
          <MockDataBanner />
          <h1 style={{ 
            fontSize: 'clamp(32px, 8vw, 64px)', 
            fontWeight: '700', 
            color: '#1f2937', 
            marginBottom: '16px' 
          }}>
            🎫 Book Your Guide
          </h1>
          <p style={{ 
            fontSize: 'clamp(16px, 4vw, 20px)', 
            color: '#6b7280', 
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px auto'
          }}>
            Discover and book verified South African guides for unforgettable experiences
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#10b981',
                borderRadius: '50%'
              }}></div>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#1f2937'
              }}>
                Connected: {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
              </span>
            </div>
            <ConnectButton
              client={client}
              appMetadata={{
                name: "GuidesChain",
                url: "https://guideschain.vercel.app",
              }}
            />
          </div>
        </div>
      </section>

      {/* Booking Interface */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          
          {/* Search & Filter Bar */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: '24px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            marginBottom: '32px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
              gap: '16px',
              alignItems: 'end'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>Location</label>
                <select style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  background: 'white'
                }}>
                  <option>All Locations</option>
                  <option>Cape Town</option>
                  <option>Johannesburg</option>
                  <option>Durban</option>
                </select>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>Specialty</label>
                <select style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  background: 'white'
                }}>
                  <option>All Specialties</option>
                  <option>Wine Tours</option>
                  <option>Cultural Tours</option>
                  <option>Adventure Tours</option>
                </select>
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '8px'
                }}>Price Range</label>
                <select style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  background: 'white'
                }}>
                  <option>Any Price</option>
                  <option>$20-40/hour</option>
                  <option>$40-60/hour</option>
                  <option>$60+/hour</option>
                </select>
              </div>
              
              <button style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                minHeight: '44px'
              }}>
                🔍 Search
              </button>
            </div>
          </div>

          {/* Available Guides */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: 'clamp(16px, 4vw, 24px)'
          }}>
            {mockGuides.map((guide) => (
              <div
                key={guide.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '24px',
                  padding: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Guide Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {guide.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <h3 style={{
                        fontSize: 'clamp(16px, 4vw, 18px)',
                        fontWeight: '600',
                        color: '#1f2937'
                      }}>{guide.name}</h3>
                      {guide.verified && (
                        <div style={{
                          background: '#dcfce7',
                          color: '#16a34a',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          ✓ Verified
                        </div>
                      )}
                    </div>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>{guide.location} • {guide.specialty}</p>
                  </div>
                </div>

                {/* Guide Stats */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{ color: '#f59e0b', fontSize: '14px' }}>⭐</span>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                      {guide.rating}
                    </span>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      ({guide.reviews})
                    </span>
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#059669'
                  }}>
                    ${guide.hourlyRate}/hour
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.5',
                  marginBottom: '20px'
                }}>
                  {guide.description}
                </p>

                {/* Book Button */}
                <button
                  onClick={() => setSelectedGuide(guide.id)}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    color: 'white',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    minHeight: '44px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #047857 0%, #065f46 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                  }}
                >
                  📅 Book Now
                </button>
              </div>
            ))}
          </div>

          {/* Booking Modal Placeholder */}
          {selectedGuide && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '16px'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '32px',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px'
                }}>
                  <h2 style={{
                    fontSize: 'clamp(20px, 5vw, 24px)',
                    fontWeight: '700',
                    color: '#1f2937'
                  }}>
                    🎫 Book Guide
                  </h2>
                  <button
                    onClick={() => setSelectedGuide(null)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '24px',
                      cursor: 'pointer',
                      color: '#6b7280',
                      minHeight: '44px',
                      minWidth: '44px'
                    }}
                  >
                    ✕
                  </button>
                </div>
                
                <div style={{
                  textAlign: 'center',
                  padding: '40px 0'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto'
                  }}>
                    <span style={{ color: 'white', fontSize: '24px' }}>🚧</span>
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Booking Form Coming Soon
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '24px'
                  }}>
                    Full booking form with USDC payment integration will be implemented next
                  </p>
                  <button
                    onClick={() => setSelectedGuide(null)}
                    style={{
                      background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                      color: 'white',
                      padding: '12px 24px',
                      borderRadius: '16px',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}