"use client";

import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import Link from "next/link";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fdf4ff 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorations */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '40px',
        width: '128px',
        height: '128px',
        background: 'rgba(59, 130, 246, 0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '80px',
        right: '40px',
        width: '160px',
        height: '160px',
        background: 'rgba(139, 92, 246, 0.1)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }}></div>

      <div className="container section-padding" style={{ textAlign: 'center' }}>
        {/* Main heading */}
        <h1 className="hero-title">
          <div style={{ color: '#1f2937', marginBottom: '16px' }}>Explore</div>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            South Africa
          </div>
          <div style={{ 
            fontSize: 'clamp(1.5rem, 6vw, 4rem)', 
            color: '#4b5563', 
            fontWeight: '700',
            marginTop: '8px'
          }}>
            with Local Experts
          </div>
        </h1>

        <p className="hero-subtitle">
          🌍 Connect with verified local guides • 🔒 Secure Web3 payments • ⭐ Authentic experiences
        </p>

        {/* CTA buttons */}
        <div className="flex-responsive" style={{ marginBottom: '64px' }}>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "GuideChain",
              url: "https://guidechain.vercel.app",
            }}
          />
          <Link href="/guides" className="btn-primary">
            🧭 Browse Guides
          </Link>
        </div>

        {/* Feature cards */}
        <div className="responsive-grid-3" style={{ marginBottom: '64px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)'
            }}>
              <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              Local Expertise
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Discover hidden gems with verified South African guides who know every secret spot and story.
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 25px rgba(14, 165, 233, 0.3)'
            }}>
              <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              Secure Payments
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Pay with USDC through smart contracts. Escrow protection with only 7.5% platform fee.
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 25px rgba(5, 150, 105, 0.3)'
            }}>
              <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>
              Verified Reviews
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Blockchain-verified reviews from real travelers. Every rating is authentic and permanent.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="responsive-grid-4">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', color: '#3b82f6', marginBottom: '8px' }}>50+</div>
            <div style={{ color: '#6b7280', fontWeight: '500', fontSize: '14px' }}>Verified Guides</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', color: '#8b5cf6', marginBottom: '8px' }}>200+</div>
            <div style={{ color: '#6b7280', fontWeight: '500', fontSize: '14px' }}>Happy Travelers</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', color: '#059669', marginBottom: '8px' }}>9</div>
            <div style={{ color: '#6b7280', fontWeight: '500', fontSize: '14px' }}>Provinces</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', color: '#ea580c', marginBottom: '8px' }}>4.9</div>
            <div style={{ color: '#6b7280', fontWeight: '500', fontSize: '14px' }}>Avg Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}