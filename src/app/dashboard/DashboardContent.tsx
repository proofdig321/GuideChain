"use client";

import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { MockDataBanner } from "@/components/ui/MockDataBanner";
import { EnterpriseStats } from "@/components/dashboard/EnterpriseStats";
import { AdminUserManagement } from "@/components/dashboard/AdminUserManagement";
import { NotificationCenter } from "@/components/ui/NotificationCenter";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

const ADMIN_ADDRESS = "0xc84799A904EeB5C57aBBBc40176E7dB8be202C10";

export default function DashboardContent() {
  const account = useActiveAccount();
  const isAdmin = account?.address?.toLowerCase() === ADMIN_ADDRESS.toLowerCase();

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
              <svg style={{ width: '40px', height: '40px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="hero-title" style={{ marginBottom: '16px' }}>
              🔐 Connect Wallet
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '32px', lineHeight: '1.6' }}>
              Connect your Web3 wallet to access your secure GuidesChain dashboard
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
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fdf4ff 100%)',
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
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}></div>
        
        <div className="container" style={{ textAlign: 'center' }}>
          <MockDataBanner />
          <h1 className="hero-title" style={{ marginBottom: '16px' }}>
            📊 Dashboard
          </h1>
          <p className="hero-subtitle">
            {isAdmin 
              ? "Manage your platform with comprehensive admin tools and analytics" 
              : "Track your bookings, manage your profile, and explore new adventures"
            }
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginTop: '40px',
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
                background: isAdmin ? '#8b5cf6' : '#10b981',
                borderRadius: '50%'
              }}></div>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#1f2937'
              }}>
                {isAdmin ? 'Super Admin' : 'User'}: {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
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

      <section className="section-padding">
        <div className="container">
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {isAdmin ? <AdminDashboard /> : <UserDashboard />}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "analytics" | "notifications">("overview");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.5)',
        padding: '8px',
        borderRadius: '24px',
        flexWrap: 'wrap'
      }}>
        {[
          { id: "overview", label: "📊 Overview", count: null },
          { id: "users", label: "👥 Users", count: 47 },
          { id: "analytics", label: "📈 Analytics", count: null },
          { id: "notifications", label: "🔔 Notifications", count: null },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              padding: '12px 16px',
              borderRadius: '16px',
              fontWeight: '500',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(12px, 3vw, 14px)',
              whiteSpace: 'nowrap',
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
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = '#1f2937';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = '#6b7280';
              }
            }}
          >
            {tab.label}
            {tab.count && (
              <span style={{
                background: '#dbeafe',
                color: '#2563eb',
                padding: '2px 8px',
                borderRadius: '20px',
                fontSize: '12px'
              }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          paddingBottom: 'clamp(24px, 6vw, 48px)'
        }}>
          <EnterpriseStats />
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
            gap: 'clamp(16px, 4vw, 24px)',
            padding: '0 clamp(8px, 2vw, 0px)'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '14px' }}>⏳</span>
                </div>
                <h3 style={{
                  fontSize: 'clamp(16px, 4vw, 18px)',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>Pending Verifications</h3>
              </div>
              <p style={{
                color: '#6b7280',
                marginBottom: '16px',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>Review guide applications and verify credentials</p>
              <button style={{
                width: '100%',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '16px',
                fontWeight: '500',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '14px'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
              }}>
                📋 Review Applications (0)
              </button>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '14px' }}>👥</span>
                </div>
                <h3 style={{
                  fontSize: 'clamp(16px, 4vw, 18px)',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>User Management</h3>
              </div>
              <p style={{
                color: '#6b7280',
                marginBottom: '16px',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>Manage users, guides, and platform access</p>
              <button 
                onClick={() => setActiveTab("users")}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
                }}
              >
                👥 Manage Users
              </button>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span style={{ color: 'white', fontSize: '14px' }}>📊</span>
                </div>
                <h3 style={{
                  fontSize: 'clamp(16px, 4vw, 18px)',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>Analytics</h3>
              </div>
              <p style={{
                color: '#6b7280',
                marginBottom: '16px',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>View detailed platform analytics and reports</p>
              <button 
                onClick={() => setActiveTab("analytics")}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
                }}
              >
                📈 View Analytics
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <AdminUserManagement />
      )}

      {activeTab === "analytics" && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '8px'
              }}>Page Views</h3>
              <p style={{
                fontSize: 'clamp(20px, 5vw, 32px)',
                fontWeight: '700',
                color: '#1f2937'
              }}>12,847</p>
              <p style={{
                fontSize: '14px',
                color: '#059669'
              }}>↗ +12.5%</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '8px'
              }}>Conversions</h3>
              <p style={{
                fontSize: 'clamp(20px, 5vw, 32px)',
                fontWeight: '700',
                color: '#1f2937'
              }}>3.2%</p>
              <p style={{
                fontSize: '14px',
                color: '#059669'
              }}>↗ +0.8%</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '8px'
              }}>Avg. Session</h3>
              <p style={{
                fontSize: 'clamp(20px, 5vw, 32px)',
                fontWeight: '700',
                color: '#1f2937'
              }}>4m 32s</p>
              <p style={{
                fontSize: '14px',
                color: '#dc2626'
              }}>↘ -0.3%</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#6b7280',
                marginBottom: '8px'
              }}>Bounce Rate</h3>
              <p style={{
                fontSize: 'clamp(20px, 5vw, 32px)',
                fontWeight: '700',
                color: '#1f2937'
              }}>24.1%</p>
              <p style={{
                fontSize: '14px',
                color: '#059669'
              }}>↗ -2.1%</p>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: '24px',
            padding: '32px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <span style={{ color: 'white', fontSize: '18px' }}>📈</span>
            </div>
            <h3 style={{
              fontSize: 'clamp(18px, 4vw, 24px)',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '8px'
            }}>Advanced Analytics</h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '24px',
              fontSize: '16px'
            }}>Detailed analytics dashboard with custom reports</p>
            <button style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '16px',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              View Full Analytics
            </button>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <NotificationCenter />
      )}
    </div>
  );
}

function UserDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* User Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280'
            }}>Active Bookings</h3>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#dbeafe',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#2563eb', fontSize: '18px' }}>🎫</span>
            </div>
          </div>
          <p style={{
            fontSize: 'clamp(20px, 5vw, 32px)',
            fontWeight: '700',
            color: '#1f2937'
          }}>0</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280'
            }}>Completed Tours</h3>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#dcfce7',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#16a34a', fontSize: '18px' }}>✅</span>
            </div>
          </div>
          <p style={{
            fontSize: 'clamp(20px, 5vw, 32px)',
            fontWeight: '700',
            color: '#1f2937'
          }}>0</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280'
            }}>Total Spent</h3>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#f3e8ff',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#8b5cf6', fontSize: '18px' }}>💰</span>
            </div>
          </div>
          <p style={{
            fontSize: 'clamp(20px, 5vw, 32px)',
            fontWeight: '700',
            color: '#1f2937'
          }}>$0</p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280'
            }}>Reviews Given</h3>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#fef3c7',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#f59e0b', fontSize: '18px' }}>⭐</span>
            </div>
          </div>
          <p style={{
            fontSize: 'clamp(20px, 5vw, 32px)',
            fontWeight: '700',
            color: '#1f2937'
          }}>0</p>
        </div>
      </div>

      {/* User Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontSize: '18px' }}>🧭</span>
            </div>
            <div>
              <h3 style={{
                fontSize: 'clamp(18px, 4vw, 24px)',
                fontWeight: '700',
                color: '#1f2937'
              }}>Find Guides</h3>
              <p style={{
                color: '#6b7280',
                fontSize: '14px'
              }}>Discover amazing local guides</p>
            </div>
          </div>
          <p style={{
            color: '#6b7280',
            marginBottom: '24px',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>Browse verified South African guides and book your next adventure</p>
          <a 
            href="/guides" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '16px',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.2s',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🧭 Browse Guides
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontSize: '18px' }}>⭐</span>
            </div>
            <div>
              <h3 style={{
                fontSize: 'clamp(18px, 4vw, 24px)',
                fontWeight: '700',
                color: '#1f2937'
              }}>Become a Guide</h3>
              <p style={{
                color: '#6b7280',
                fontSize: '14px'
              }}>Share your local expertise</p>
            </div>
          </div>
          <p style={{
            color: '#6b7280',
            marginBottom: '24px',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>Join our community of verified guides and earn from your local knowledge</p>
          <a 
            href="/verify" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '16px',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.2s',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #15803d 0%, #166534 100%)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🚀 Apply Now
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}