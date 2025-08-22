"use client";

import dynamic from "next/dynamic";

const GuideBookingContent = dynamic(() => import("./GuideBookingContent"), {
  ssr: false,
  loading: () => (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fef3c7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '48px',
          height: '48px',
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          animation: 'spin 1s linear infinite'
        }}>
          <span style={{ color: 'white', fontSize: '18px' }}>📅</span>
        </div>
        <h2 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
          Loading Guide Profile
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          Preparing booking details...
        </p>
      </div>
    </div>
  ),
});

export default function GuideBookingPage({ params }: { params: { guideId: string } }) {
  return <GuideBookingContent guideId={params.guideId} />;
}