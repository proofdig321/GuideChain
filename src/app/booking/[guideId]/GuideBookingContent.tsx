"use client";

import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

interface GuideBookingContentProps {
  guideId: string;
}

// Mock guide data
const mockGuideData: Record<string, any> = {
  "1": {
    id: "1",
    name: "Sarah Johnson",
    location: "Cape Town",
    specialty: "Wine Tours",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 45,
    verified: true,
    image: "🍷",
    description: "Expert wine guide with 8 years experience in Cape Town wine regions. I specialize in boutique wineries and hidden gems that most tourists never discover.",
    languages: ["English", "Afrikaans"],
    experience: "8 years",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
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
    image: "🏛️",
    description: "Local historian specializing in South African cultural heritage and apartheid history tours.",
    languages: ["English", "Zulu", "Sotho"],
    experience: "6 years",
    availability: ["Mon", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "3": {
    id: "3",
    name: "Lisa van der Merwe",
    location: "Durban",
    specialty: "Adventure Tours",
    rating: 4.7,
    reviews: 156,
    hourlyRate: 55,
    verified: true,
    image: "🏄♀️",
    description: "Adventure specialist offering surfing, hiking, and extreme sports experiences along the KwaZulu-Natal coast.",
    languages: ["English", "Afrikaans"],
    experience: "10 years",
    availability: ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  }
};

export default function GuideBookingContent({ guideId }: GuideBookingContentProps) {
  const account = useActiveAccount();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [duration, setDuration] = useState<number>(2);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const guide = mockGuideData[guideId];

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
              The guide you're looking for doesn't exist.
            </p>
            <a href="/booking" style={{
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
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'
            }}>
              <span style={{ color: 'white', fontSize: '32px' }}>📅</span>
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
              Connect your Web3 wallet to book {guide.name}
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

  const totalCost = guide.hourlyRate * duration;
  const platformFee = Math.round(totalCost * 0.075 * 100) / 100;
  const guideFee = totalCost - platformFee;

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
            marginBottom: '24px'
          }}>
            <a href="/booking" style={{
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
                gap: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px'
                }}>
                  {guide.image}
                </div>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <h1 style={{
                      fontSize: 'clamp(24px, 6vw, 32px)',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}>{guide.name}</h1>
                    {guide.verified && (
                      <div style={{
                        background: '#dcfce7',
                        color: '#16a34a',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        ✓ Verified
                      </div>
                    )}
                  </div>
                  <p style={{
                    fontSize: '16px',
                    color: '#6b7280',
                    marginBottom: '8px'
                  }}>{guide.location} • {guide.specialty}</p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <span style={{ color: '#f59e0b', fontSize: '16px' }}>⭐</span>
                      <span style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>
                        {guide.rating}
                      </span>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        ({guide.reviews} reviews)
                      </span>
                    </div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#059669'
                    }}>
                      ${guide.hourlyRate}/hour
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
            gap: '32px'
          }}>
            
            {/* Guide Details */}
            <div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
                marginBottom: '24px'
              }}>
                <h2 style={{
                  fontSize: 'clamp(18px, 4vw, 24px)',
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
                  gap: '16px'
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
              </div>
            </div>

            {/* Booking Form */}
            <div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <h2 style={{
                  fontSize: 'clamp(18px, 4vw, 24px)',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '24px'
                }}>📅 Book Your Tour</h2>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      minHeight: '44px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>Select Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      minHeight: '44px'
                    }}
                  >
                    <option value="">Choose time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>Duration (hours)</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1px solid #d1d5db',
                      fontSize: '14px',
                      minHeight: '44px'
                    }}
                  >
                    <option value={1}>1 hour</option>
                    <option value={2}>2 hours</option>
                    <option value={3}>3 hours</option>
                    <option value={4}>4 hours</option>
                    <option value={6}>6 hours</option>
                    <option value={8}>Full day (8 hours)</option>
                  </select>
                </div>

                {/* Cost Breakdown */}
                <div style={{
                  background: '#f9fafb',
                  borderRadius: '16px',
                  padding: '20px',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '12px'
                  }}>Cost Breakdown</h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>
                      ${guide.hourlyRate}/hour × {duration} hours
                    </span>
                    <span style={{ fontSize: '14px', color: '#1f2937' }}>${totalCost}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>Platform fee (7.5%)</span>
                    <span style={{ fontSize: '14px', color: '#1f2937' }}>${platformFee}</span>
                  </div>
                  <div style={{
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Total</span>
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#059669' }}>${totalCost} USDC</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowBookingForm(true)}
                  disabled={!selectedDate || !selectedTime}
                  style={{
                    width: '100%',
                    background: selectedDate && selectedTime 
                      ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                      : '#d1d5db',
                    color: 'white',
                    padding: '16px',
                    borderRadius: '16px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed',
                    fontSize: '16px',
                    minHeight: '44px',
                    transition: 'all 0.2s'
                  }}
                >
                  💳 Pay with USDC
                </button>
              </div>
            </div>
          </div>

          {/* Payment Modal */}
          {showBookingForm && (
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
                    💳 USDC Payment
                  </h2>
                  <button
                    onClick={() => setShowBookingForm(false)}
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
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
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
                    USDC Payment Integration
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}>
                    Smart contract integration with BookingEscrow.sol coming next
                  </p>
                  <div style={{
                    background: '#f9fafb',
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '24px',
                    textAlign: 'left'
                  }}>
                    <p style={{ fontSize: '14px', color: '#374151', marginBottom: '8px' }}>
                      <strong>Booking Details:</strong>
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                      Guide: {guide.name}
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                      Date: {selectedDate}
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                      Time: {selectedTime}
                    </p>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                      Duration: {duration} hours
                    </p>
                    <p style={{ fontSize: '14px', color: '#059669', fontWeight: '600' }}>
                      Total: ${totalCost} USDC
                    </p>
                  </div>
                  <button
                    onClick={() => setShowBookingForm(false)}
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