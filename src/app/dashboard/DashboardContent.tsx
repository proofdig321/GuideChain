"use client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

const ADMIN_ADDRESS = "0xc84799A904EeB5C57aBBBc40176E7dB8be202C10";

export default function DashboardContent() {
  const account = useActiveAccount();
  const isAdmin = account?.address?.toLowerCase() === ADMIN_ADDRESS.toLowerCase();

  if (!account) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '0 16px' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', marginBottom: '24px', color: '#1f2937' }}>
            🔐 Connect Wallet to Access Dashboard
          </h1>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "GuidesChain",
              url: "https://guideschain.vercel.app",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <div className="container section-padding">
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth >= 640 ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: window.innerWidth >= 640 ? 'center' : 'flex-start',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>
              📊 Dashboard
            </h1>
            <p style={{ color: '#6b7280', fontSize: '18px' }}>
              {isAdmin ? "🔧 Admin Panel" : "👤 User Dashboard"}
            </p>
          </div>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "GuidesChain",
              url: "https://guideschain.vercel.app",
            }}
          />
        </div>

        {isAdmin ? <AdminDashboard /> : <UserDashboard />}
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="responsive-grid-3">
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
          📈 Platform Stats
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total Guides:</span>
            <span style={{ fontWeight: '700', color: '#3b82f6' }}>0</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Total Bookings:</span>
            <span style={{ fontWeight: '700', color: '#10b981' }}>0</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Platform Fees:</span>
            <span style={{ fontWeight: '700', color: '#f59e0b' }}>0 USDC</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
          ⏳ Pending Verifications
        </h3>
        <p style={{ color: '#6b7280' }}>No pending applications</p>
        <button className="btn-primary" style={{ marginTop: '16px', fontSize: '14px' }}>
          📋 Review Applications
        </button>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
          🔄 Recent Activity
        </h3>
        <p style={{ color: '#6b7280' }}>No recent activity</p>
        <button className="btn-primary" style={{ marginTop: '16px', fontSize: '14px' }}>
          📊 View Analytics
        </button>
      </div>
    </div>
  );
}

function UserDashboard() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px'
    }}>
      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
          🎫 My Bookings
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>No bookings yet</p>
        <a href="/guides" className="btn-primary" style={{ textDecoration: 'none' }}>
          🧭 Browse Guides
        </a>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
          ⭐ Guide Application
        </h3>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>Become a verified guide</p>
        <a href="/verify" className="btn-primary" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
          🚀 Apply Now
        </a>
      </div>
    </div>
  );
}