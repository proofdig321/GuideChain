"use client";

import dynamic from "next/dynamic";

const LoginContent = dynamic(() => import("./LoginContent"), {
  ssr: false,
  loading: () => (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fef3c7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'spin 1s linear infinite'
      }}>
        <span style={{ color: 'white', fontSize: '18px' }}>🔐</span>
      </div>
    </div>
  ),
});

export default function LoginPage() {
  return <LoginContent />;
}