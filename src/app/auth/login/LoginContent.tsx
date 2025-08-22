"use client";

import { useEffect } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export default function LoginContent() {
  const account = useActiveAccount();

  useEffect(() => {
    if (account) {
      // Redirect to dashboard after successful connection
      window.location.href = "/dashboard";
    }
  }, [account]);

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
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center'
        }}>
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
          
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 40px)',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Welcome Back
          </h1>
          
          <p style={{
            fontSize: 'clamp(16px, 4vw, 18px)',
            color: '#6b7280',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Connect your Web3 wallet to access your GuidesChain account
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
              marginBottom: '12px'
            }}>🌟 Why Web3 Login?</h3>
            <ul style={{
              textAlign: 'left',
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6',
              margin: 0,
              paddingLeft: '20px'
            }}>
              <li>Secure, decentralized authentication</li>
              <li>No passwords to remember</li>
              <li>Direct USDC payments</li>
              <li>Own your data and identity</li>
            </ul>
          </div>

          <ConnectButton
            client={client}
            appMetadata={{
              name: "GuidesChain",
              url: "https://guideschain.vercel.app",
            }}
          />

          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#fef3c7',
            borderRadius: '12px'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#92400e',
              margin: 0
            }}>
              💡 New to Web3? We'll guide you through setting up your first wallet
            </p>
          </div>

          <div style={{
            marginTop: '32px',
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <a 
              href="/auth/register"
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
              New user? Register here
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