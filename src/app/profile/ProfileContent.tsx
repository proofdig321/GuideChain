"use client";

import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export default function ProfileContent() {
  const account = useActiveAccount();
  const [activeTab, setActiveTab] = useState<"profile" | "bookings" | "settings">("profile");

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
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
            }}>
              <span style={{ color: 'white', fontSize: '32px' }}>👤</span>
            </div>
            <h1 style={{ 
              fontSize: 'clamp(24px, 6vw, 48px)', 
              fontWeight: '700', 
              color: '#1f2937', 
              marginBottom: '16px' 
            }}>
              🔐 Connect to View Profile
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px', lineHeight: '1.6' }}>
              Connect your Web3 wallet to access your profile
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
        padding: '40px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: 'white',
              fontWeight: '600'
            }}>
              {account.address?.slice(2, 4).toUpperCase()}
            </div>
            <div>
              <h1 style={{
                fontSize: 'clamp(24px, 6vw, 32px)',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                My Profile
              </h1>
              <p style={{
                fontSize: '16px',
                color: '#6b7280'
              }}>
                {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
              </p>
            </div>
          </div>
          
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
                Connected
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
              { id: "profile", label: "👤 Profile" },
              { id: "bookings", label: "📅 Bookings" },
              { id: "settings", label: "⚙️ Settings" },
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
          {activeTab === "profile" && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
              gap: '32px'
            }}>
              
              {/* Profile Info */}
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
                  marginBottom: '24px'
                }}>Profile Information</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>Display Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
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
                  }}>Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
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

                <div style={{ marginBottom: '24px' }}>
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
                    minHeight: '44px'
                  }}>
                    <option>Select your location</option>
                    <option>Cape Town</option>
                    <option>Johannesburg</option>
                    <option>Durban</option>
                    <option>Other</option>
                  </select>
                </div>

                <button style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  minHeight: '44px'
                }}>
                  💾 Save Profile
                </button>
              </div>

              {/* Account Stats */}
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
                  marginBottom: '24px'
                }}>Account Stats</h2>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '20px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: 'clamp(24px, 6vw, 32px)',
                      fontWeight: '700',
                      color: '#3b82f6',
                      marginBottom: '4px'
                    }}>0</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>Bookings</div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: 'clamp(24px, 6vw, 32px)',
                      fontWeight: '700',
                      color: '#059669',
                      marginBottom: '4px'
                    }}>$0</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>Spent</div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: 'clamp(24px, 6vw, 32px)',
                      fontWeight: '700',
                      color: '#f59e0b',
                      marginBottom: '4px'
                    }}>0</div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>Reviews</div>
                  </div>
                </div>

                <div style={{
                  marginTop: '24px',
                  padding: '16px',
                  background: '#f0f9ff',
                  borderRadius: '12px'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#374151',
                    margin: 0,
                    textAlign: 'center'
                  }}>
                    🎯 Complete your first booking to unlock rewards!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: '48px 32px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto'
              }}>
                <span style={{ fontSize: '24px' }}>📅</span>
              </div>
              <h3 style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '12px'
              }}>No Bookings Yet</h3>
              <p style={{
                color: '#6b7280',
                marginBottom: '32px',
                fontSize: '16px'
              }}>
                Start exploring and book your first South African adventure
              </p>
              <a 
                href="/guides"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '16px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  fontSize: '16px',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                🧭 Browse Guides
              </a>
            </div>
          )}

          {activeTab === "settings" && (
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
                marginBottom: '24px'
              }}>Account Settings</h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>Email Notifications</h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: 0
                    }}>Receive booking updates via email</p>
                  </div>
                  <input type="checkbox" style={{ minWidth: '44px', minHeight: '44px' }} />
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  background: '#f9fafb',
                  borderRadius: '12px'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#1f2937',
                      marginBottom: '4px'
                    }}>Marketing Updates</h4>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: 0
                    }}>Get notified about new guides and features</p>
                  </div>
                  <input type="checkbox" style={{ minWidth: '44px', minHeight: '44px' }} />
                </div>

                <div style={{
                  padding: '20px',
                  background: '#fef2f2',
                  borderRadius: '12px',
                  border: '1px solid #fecaca'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#dc2626',
                    marginBottom: '8px'
                  }}>⚠️ Danger Zone</h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#7f1d1d',
                    marginBottom: '16px'
                  }}>
                    This action cannot be undone. Your profile and booking history will be permanently deleted.
                  </p>
                  <button style={{
                    background: '#dc2626',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    minHeight: '44px'
                  }}>
                    Delete Account
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