"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '8px' : '12px',
          textDecoration: 'none'
        }}>
          <div style={{
            width: isMobile ? '32px' : '40px',
            height: isMobile ? '32px' : '40px',
            background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
          }}>
            <svg style={{ width: isMobile ? '18px' : '24px', height: isMobile ? '18px' : '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <div style={{
              fontSize: isMobile ? '16px' : '20px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              GuideChain
            </div>
            {!isMobile && (
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '-2px' }}>
                South Africa
              </div>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {[
              { href: '/guides', label: '🧭 Find Guides', color: '#3b82f6', bg: '#eff6ff' },
              { href: '/verify', label: '⭐ Become Guide', color: '#8b5cf6', bg: '#faf5ff' },
              { href: '/dashboard', label: '📊 Dashboard', color: '#059669', bg: '#ecfdf5' },
              { href: '/contact', label: '💬 Contact', color: '#ea580c', bg: '#fff7ed' }
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{
                color: '#4b5563',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = item.color;
                e.currentTarget.style.background = item.bg;
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4b5563';
                e.currentTarget.style.background = 'transparent';
              }}>
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {!isMobile && (
            <ConnectButton
              client={client}
              appMetadata={{
                name: "GuideChain",
                url: "https://guidechain.vercel.app",
              }}
            />
          )}
          
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                background: 'none',
                border: 'none',
                borderRadius: '8px',
                color: '#4b5563',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#3b82f6';
                e.currentTarget.style.background = '#eff6ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4b5563';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div style={{
          background: 'white',
          borderTop: '1px solid #f3f4f6',
          padding: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { href: '/guides', label: '🧭 Find Guides', color: '#3b82f6', bg: '#eff6ff' },
              { href: '/verify', label: '⭐ Become Guide', color: '#8b5cf6', bg: '#faf5ff' },
              { href: '/dashboard', label: '📊 Dashboard', color: '#059669', bg: '#ecfdf5' },
              { href: '/contact', label: '💬 Contact', color: '#ea580c', bg: '#fff7ed' }
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{
                color: '#4b5563',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '12px 16px',
                borderRadius: '8px',
                transition: 'all 0.2s',
                display: 'block'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = item.color;
                e.currentTarget.style.background = item.bg;
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4b5563';
                e.currentTarget.style.background = 'transparent';
              }} onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            
            <div style={{
              padding: '12px 16px',
              borderTop: '1px solid #f3f4f6',
              marginTop: '8px'
            }}>
              <ConnectButton
                client={client}
                appMetadata={{
                  name: "GuideChain",
                  url: "https://guidechain.vercel.app",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}