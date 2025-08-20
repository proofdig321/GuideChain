"use client";

import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #f3f4f6'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textDecoration: 'none'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
          }}>
            <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <div style={{
              fontSize: '20px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              GuideChain
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '-2px' }}>
              South Africa
            </div>
          </div>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/guides" style={{
            color: '#4b5563',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.2s'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.color = '#3b82f6';
            e.currentTarget.style.background = '#eff6ff';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.color = '#4b5563';
            e.currentTarget.style.background = 'transparent';
          }}>
            🧭 Find Guides
          </Link>
          <Link href="/verify" style={{
            color: '#4b5563',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.2s'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.color = '#8b5cf6';
            e.currentTarget.style.background = '#faf5ff';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.color = '#4b5563';
            e.currentTarget.style.background = 'transparent';
          }}>
            ⭐ Become Guide
          </Link>
          <Link href="/dashboard" style={{
            color: '#4b5563',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.2s'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.color = '#059669';
            e.currentTarget.style.background = '#ecfdf5';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.color = '#4b5563';
            e.currentTarget.style.background = 'transparent';
          }}>
            📊 Dashboard
          </Link>
          <Link href="/contact" style={{
            color: '#4b5563',
            textDecoration: 'none',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.2s'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ea580c';
            e.currentTarget.style.background = '#fff7ed';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.color = '#4b5563';
            e.currentTarget.style.background = 'transparent';
          }}>
            💬 Contact
          </Link>
        </nav>

        <ConnectButton
          client={client}
          appMetadata={{
            name: "GuideChain",
            url: "https://guidechain.vercel.app",
          }}
        />
      </div>
    </header>
  );
}