"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { MockDataBanner } from "@/components/ui/MockDataBanner";
import { AdvancedSearch } from "@/components/ui/AdvancedSearch";

export default function GuidesContent() {
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{
        padding: '64px 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fdf4ff 100%)'
      }}>
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          width: '96px',
          height: '96px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <MockDataBanner />
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#eff6ff',
              color: '#1d4ed8',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '16px'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                background: '#3b82f6',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></span>
              24 Verified Guides Available
            </div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              color: '#1f2937',
              marginBottom: '24px'
            }}>
              Find Your Perfect Guide
            </h1>
            <p style={{
              fontSize: '20px',
              color: '#6b7280',
              maxWidth: '768px',
              margin: '0 auto 32px auto',
              lineHeight: '1.6'
            }}>
              Discover verified South African guides with advanced search and filters
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <svg style={{ width: '16px', height: '16px', color: '#22c55e' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Verified Guides</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <svg style={{ width: '16px', height: '16px', color: '#3b82f6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Instant Booking</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <svg style={{ width: '16px', height: '16px', color: '#8b5cf6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Smart Search</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main style={{ paddingBottom: '48px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <AdvancedSearch />
        </div>
      </main>
      <Footer />
    </div>
  );
}