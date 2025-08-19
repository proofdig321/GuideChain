'use client';

import { TouristDashboard } from '@/components/dashboard/TouristDashboard';
import { GuideDashboard } from '@/components/dashboard/GuideDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { useAdmin } from '@/hooks/useAdmin';

export default function DashboardPage() {
  const { isAdmin } = useAdmin();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isAdmin && (
        <div className="mb-8">
          <AdminDashboard />
        </div>
      )}
      <div className="mb-8">
        <TouristDashboard />
      </div>
      <div>
        <GuideDashboard />
      </div>
    </div>
  );
}