"use client";

import { CONTRACT_ADDRESSES } from "@/constants";

export function MockDataBanner() {
  const contractsDeployed = CONTRACT_ADDRESSES.GUIDE_REGISTRY !== "0x0000000000000000000000000000000000000000";

  if (contractsDeployed) return null;

  return (
    <div style={{
      background: 'rgba(254, 243, 199, 0.8)',
      border: '1px solid #fcd34d',
      borderRadius: '12px',
      padding: '8px 12px',
      marginBottom: '16px',
      textAlign: 'center',
      maxWidth: '400px',
      margin: '0 auto 16px auto'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }}>
        <svg style={{
          width: '14px',
          height: '14px',
          color: '#f59e0b',
          flexShrink: 0
        }} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p style={{
          fontSize: '12px',
          color: '#92400e',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.2'
        }}>
          Development Mode - Using Mock Data
        </p>
      </div>
    </div>
  );
}