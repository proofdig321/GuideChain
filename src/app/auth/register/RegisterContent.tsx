"use client";

import { useState, useEffect } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export default function RegisterContent() {
  const account = useActiveAccount();
  const [userType, setUserType] = useState<"tourist" | "guide" | null>(null);
  const [step, setStep] = useState<"select" | "connect" | "complete">("select");

  useEffect(() => {
    if (account && step === "connect") {
      setStep("complete");
    }
  }, [account, step]);

  const handleUserTypeSelect = (type: "tourist" | "guide") => {
    setUserType(type);
    setStep("connect");
  };

  const handleComplete = () => {
    if (userType === "guide") {
      window.location.href = "/verify";
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header />
      
      <section style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fef3c7 100%)',
        minHeight: 'calc(100vh - 128px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          borderRadius: '32px',
          padding: 'clamp(32px, 8vw, 48px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center'
        }}>
          
          {step === "select" && (
            <>
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
                <span style={{ color: 'white', fontSize: '32px' }}>✨</span>
              </div>
              
              <h1 style={{
                fontSize: 'clamp(28px, 6vw, 40px)',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                Join GuidesChain
              </h1>
              
              <p style={{
                fontSize: 'clamp(16px, 4vw, 18px)',
                color: '#6b7280',
                marginBottom: '40px',
                lineHeight: '1.6'
              }}>
                Choose your role to get started with Web3 tourism
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
                gap: '24px',
                marginBottom: '32px'
              }}>
                <button
                  onClick={() => handleUserTypeSelect("tourist")}
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '2px solid #3b82f6',
                    borderRadius: '24px',
                    padding: '32px 24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minHeight: '44px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧳</div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>I'm a Tourist</h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.5'
                  }}>
                    Book verified guides and explore South Africa
                  </p>
                </button>

                <button
                  onClick={() => handleUserTypeSelect("guide")}
                  style={{
                    background: 'rgba(5, 150, 105, 0.1)',
                    border: '2px solid #059669',
                    borderRadius: '24px',
                    padding: '32px 24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minHeight: '44px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(5, 150, 105, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(5, 150, 105, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧭</div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>I'm a Guide</h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    lineHeight: '1.5'
                  }}>
                    Share your expertise and earn from tours
                  </p>
                </button>
              </div>
            </>
          )}

          {step === "connect" && (
            <>
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
                <span style={{ color: 'white', fontSize: '32px' }}>🔐</span>
              </div>
              
              <h2 style={{
                fontSize: 'clamp(24px, 6vw, 32px)',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                Connect Your Wallet
              </h2>
              
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                marginBottom: '32px'
              }}>
                {userType === "guide" 
                  ? "Connect your wallet to start the guide verification process"
                  : "Connect your wallet to start booking amazing tours"
                }
              </p>

              <ConnectButton
                client={client}
                appMetadata={{
                  name: "GuidesChain",
                  url: "https://guideschain.vercel.app",
                }}
              />

              <button
                onClick={() => setStep("select")}
                style={{
                  marginTop: '24px',
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  fontSize: '14px',
                  cursor: 'pointer',
                  minHeight: '44px'
                }}
              >
                ← Back to selection
              </button>
            </>
          )}

          {step === "complete" && account && (
            <>
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
                <span style={{ color: 'white', fontSize: '32px' }}>✅</span>
              </div>
              
              <h2 style={{
                fontSize: 'clamp(24px, 6vw, 32px)',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                Welcome to GuidesChain!
              </h2>
              
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                marginBottom: '24px'
              }}>
                Your wallet is connected: {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
              </p>

              <div style={{
                background: '#f0f9ff',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '32px'
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '8px'
                }}>
                  {userType === "guide" ? "🧭 Next: Get Verified" : "🧳 Ready to Explore"}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  {userType === "guide" 
                    ? "Complete the verification process to start offering tours"
                    : "Browse verified guides and book your first South African adventure"
                  }
                </p>
              </div>

              <button
                onClick={handleComplete}
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '16px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  minHeight: '44px'
                }}
              >
                {userType === "guide" ? "🚀 Start Verification" : "🧭 Explore Guides"}
              </button>
            </>
          )}

          <div style={{
            marginTop: '32px',
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <a 
              href="/auth/login"
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Already have an account?
            </a>
            <span style={{ color: '#d1d5db' }}>•</span>
            <a 
              href="/"
              style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '14px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              Back to home
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}