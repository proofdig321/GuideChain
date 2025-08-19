'use client';

import { useOffline } from '@/hooks/useOffline';

export function OfflineIndicator() {
  const isOffline = useOffline();

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm z-50">
      You're offline. Some features may be limited.
    </div>
  );
}