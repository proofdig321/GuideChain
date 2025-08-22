"use client";

import dynamic from "next/dynamic";

const GuideProfileContent = dynamic(() => import("./GuideProfileContent"), {
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
          background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          animation: 'spin 1s linear infinite'
        }}>
          <span style={{ color: 'white', fontSize: '18px' }}>👤</span>
        </div>
        <h2 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
          Loading Guide Profile
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          Fetching guide information...
        </p>
      </div>
    </div>
  ),
});

export default function GuideProfilePage({ params }: { params: { id: string } }) {
  return <GuideProfileContent guideId={params.id} />;
}