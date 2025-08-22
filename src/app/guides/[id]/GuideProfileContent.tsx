"use client";

import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

interface GuideProfileContentProps {
  guideId: string;
}

// Mock guide data with detailed profiles
const mockGuideProfiles: Record<string, any> = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    location: "Cape Town",
    specialty: "Wine Tours",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 45,
    verified: true,
    sbtVerified: true,
    image: "🍷",
    coverImage: "🏔️",
    description: "Expert wine guide with 8 years experience in Cape Town wine regions. I specialize in boutique wineries and hidden gems that most tourists never discover. My passion for South African wines and local culture creates unforgettable experiences.",
    languages: ["English", "Afrikaans", "German"],
    experience: "8 years",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    walletAddress: "0x1234567890123456789012345678901234567890",
    portfolio: [
      { type: "image", title: "Stellenbosch Wine Estate", description: "Private tasting at boutique winery" },
      { type: "image", title: "Franschhoek Valley Tour", description: "Scenic wine route experience" },
      { type: "image", title: "Cape Point Vineyards", description: "Coastal wine tasting adventure" }
    ],
    reviews: [
      { id: 1, author: "John D.", rating: 5, text: "Amazing wine tour! Sarah's knowledge is incredible.", date: "2024-01-15" },
      { id: 2, author: "Maria S.", rating: 5, text: "Best guide in Cape Town. Highly recommended!", date: "2024-01-10" },
      { id: 3, author: "David L.", rating: 4, text: "Great experience, learned so much about local wines.", date: "2024-01-05" }
    ],
    achievements: ["Top Rated Guide 2024", "Wine Expert Certified", "100+ Tours Completed"]
  },
  "2": {
    id: "2", 
    name: "Michael Ndaba",
    location: "Johannesburg",
    specialty: "Cultural Tours",
    rating: 4.8,
    reviews: 89,
    hourlyRate: 35,
    verified: true,
    sbtVerified: true,
    image: "🏛️",
    coverImage: "🌆",
    description: "Local historian specializing in South African cultural heritage and apartheid history tours. I bring stories to life with authentic experiences and deep cultural insights.",
    languages: ["English", "Zulu", "Sotho", "Xhosa"],
    experience: "6 years",
    availability: ["Mon", "Wed", "Thu", "Fri", "Sat", "Sun"],
    walletAddress: "0x2345678901234567890123456789012345678901",
    portfolio: [
      { type: "image", title: "Apartheid Museum Tour", description: "Deep dive into South African history" },
      { type: "image", title: "Soweto Cultural Experience", description: "Authentic township tour" },
      { type: "image", title: "Constitutional Hill", description: "Journey through justice and freedom" }
    ],
    reviews: [
      { id: 1, author: "Emma W.", rating: 5, text: "Incredibly moving and educational experience.", date: "2024-01-12" },
      { id: 2, author: "Robert K.", rating: 5, text: "Michael's storytelling is captivating.", date: "2024-01-08" },
      { id: 3, author: "Lisa M.", rating: 4, text: "Eye-opening cultural tour, highly recommend.", date: "2024-01-03" }
    ],
    achievements: ["Cultural Heritage Expert", "History Guide Certified", "Community Leader Award"]
  }
};

export default function GuideProfileContent({ guideId }: GuideProfileContentProps) {
  const account = useActiveAccount();
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "reviews">("overview");

  const guide = mockGuideProfiles[guideId];

  if (!guide) {
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
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(24px, 6vw, 48px)', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              Guide Not Found
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px' }}>
              The guide profile you're looking for doesn't exist.
            </p>
            <a href="/guides" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '16px',
              fontWeight: '500',
              textDecoration: 'none',
              fontSize: '16px'
            }}>
              ← Back to Guides
            </a>
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
        padding: '40px 0',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '32px'
          }}>
            <a href="/guides" style={{
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '8px 16px',
              borderRadius: '20px',
              textDecoration: 'none',
              color: '#6b7280',
              fontSize: '14px',
              fontWeight: '500',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center'
            }}>
              ← Back to Guides
            </a>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '32px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  borderRadius: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '40px',
                  boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
                }}>
                  {guide.image}
                </div>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                  }}>
                    <h1 style={{
                      fontSize: 'clamp(28px, 6vw, 40px)',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}>{guide.name}</h1>
                    {guide.sbtVerified && (
                      <div style={{
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        🏆 SBT Verified
                      </div>
                    )}
                  </div>
                  <p style={{
                    fontSize: '18px',
                    color: '#6b7280',
                    marginBottom: '12px'
                  }}>{guide.location} • {guide.specialty}</p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{ color: '#f59e0b', fontSize: '18px' }}>⭐</span>
                      <span style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>
                        {guide.rating}
                      </span>
                      <span style={{ fontSize: '16px', color: '#6b7280' }}>
                        ({guide.reviews} reviews)
                      </span>
                    </div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#059669'
                    }}>
                      ${guide.hourlyRate}/hour
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <a 
                href={`/booking/${guide.id}`}
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '20px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '18px',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 15px rgba(5, 150, 105, 0.3)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px rgba(5, 150, 105, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px rgba(5, 150, 105, 0.3)';
                }}
              >
                📅 Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.5)',
            padding: '8px',
            borderRadius: '24px',
            marginBottom: '32px',
            flexWrap: 'wrap'
          }}>
            {[
              { id: "overview", label: "📋 Overview" },
              { id: "portfolio", label: "📸 Portfolio" },
              { id: "reviews", label: "⭐ Reviews" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '16px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  minHeight: '44px',
                  ...(activeTab === tab.id
                    ? {
                        background: 'white',
                        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                        color: '#2563eb'
                      }
                    : {
                        background: 'transparent',
                        color: '#6b7280'
                      })
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
              gap: '32px'
            }}>
              
              {/* About Section */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{
                  fontSize: 'clamp(20px, 4vw, 24px)',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '16px'
                }}>About {guide.name}</h2>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '24px'
                }}>
                  {guide.description}
                </p>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '4px'
                    }}>Experience</h4>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{guide.experience}</p>
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '4px'
                    }}>Languages</h4>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{guide.languages.join(", ")}</p>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '12px'
                  }}>Achievements</h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {guide.achievements.map((achievement: string, index: number) => (
                      <span
                        key={index}
                        style={{
                          background: '#dbeafe',
                          color: '#2563eb',
                          padding: '6px 12px',
                          borderRadius: '16px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                      >
                        🏆 {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking Info */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{
                  fontSize: 'clamp(20px, 4vw, 24px)',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '20px'
                }}>Booking Information</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>Availability</h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <span
                        key={day}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500',
                          ...(guide.availability.includes(day)
                            ? {
                                background: '#dcfce7',
                                color: '#16a34a'
                              }
                            : {
                                background: '#f3f4f6',
                                color: '#6b7280'
                              })
                        }}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  background: '#f0f9ff',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '16px', color: '#374151' }}>Hourly Rate</span>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#059669' }}>
                      ${guide.hourlyRate}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    + 7.5% platform fee • Paid in USDC
                  </p>
                </div>

                <a 
                  href={`/booking/${guide.id}`}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    color: 'white',
                    padding: '16px',
                    borderRadius: '16px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '16px',
                    minHeight: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  📅 Book This Guide
                </a>
              </div>
            </div>
          )}

          {activeTab === "portfolio" && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
              gap: '24px'
            }}>
              {guide.portfolio.map((item: any, index: number) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '24px',
                    padding: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '200px',
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '48px',
                    marginBottom: '16px'
                  }}>
                    📸
                  </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>{item.title}</h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.5'
                  }}>{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            }}>
              {guide.reviews.map((review: any) => (
                <div
                  key={review.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '24px',
                    padding: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}>
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#1f2937',
                          margin: 0
                        }}>{review.author}</h4>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {[...Array(review.rating)].map((_, i) => (
                            <span key={i} style={{ color: '#f59e0b', fontSize: '14px' }}>⭐</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>{review.date}</span>
                  </div>
                  <p style={{
                    fontSize: '16px',
                    color: '#374151',
                    lineHeight: '1.6',
                    margin: 0
                  }}>{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}