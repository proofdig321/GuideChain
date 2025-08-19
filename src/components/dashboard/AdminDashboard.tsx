'use client';

import { useState, useEffect } from 'react';
import { useAdmin } from '@/hooks/useAdmin';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { CONTRACTS } from '@/constants/contracts';
import { graphService } from '@/lib/graph';

export function AdminDashboard() {
  const [pendingGuides, setPendingGuides] = useState<any[]>([]);
  const [platformStats, setPlatformStats] = useState({
    totalBookings: 0,
    totalVolume: 0,
    totalFees: 0,
    activeGuides: 0
  });

  const { isAdmin } = useAdmin();
  const { contract } = useContract(CONTRACTS.GUIDE_REGISTRY);
  const { mutateAsync: verifyGuide } = useContractWrite(contract, 'verifyGuide');

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin]);

  const loadAdminData = async () => {
    try {
      // Load pending guide verifications and platform stats
      // This would typically come from The Graph or backend
      setPlatformStats({
        totalBookings: 1250,
        totalVolume: 62500,
        totalFees: 4687.5,
        activeGuides: 45
      });
    } catch (error) {
      console.error('Failed to load admin data:', error);
    }
  };

  const handleVerifyGuide = async (guideAddress: string, provincialReg: string, firstAidCert: string) => {
    try {
      await verifyGuide({
        args: [guideAddress, provincialReg, firstAidCert, '']
      });
      await loadAdminData(); // Refresh data
    } catch (error) {
      console.error('Failed to verify guide:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">Admin access required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
          <p className="text-2xl font-bold text-blue-600">{platformStats.totalBookings}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Volume</h3>
          <p className="text-2xl font-bold text-green-600">{platformStats.totalVolume.toLocaleString()} USDC</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Platform Fees (7.5%)</h3>
          <p className="text-2xl font-bold text-purple-600">{platformStats.totalFees.toLocaleString()} USDC</p>
        </div>
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Active Guides</h3>
          <p className="text-2xl font-bold text-orange-600">{platformStats.activeGuides}</p>
        </div>
      </div>

      {/* Pending Verifications */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Pending Guide Verifications</h2>
        {pendingGuides.length === 0 ? (
          <p className="text-gray-600">No pending verifications.</p>
        ) : (
          <div className="space-y-4">
            {pendingGuides.map((guide, index) => (
              <div key={index} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{guide.address}</h3>
                    <p className="text-sm text-gray-600">Provincial Reg: {guide.provincialReg}</p>
                    <p className="text-sm text-gray-600">First Aid: {guide.firstAidCert}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerifyGuide(guide.address, guide.provincialReg, guide.firstAidCert)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium">Add Verifier</h3>
            <p className="text-sm text-gray-600">Grant verification permissions</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium">Platform Settings</h3>
            <p className="text-sm text-gray-600">Configure platform parameters</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
            <h3 className="font-medium">Export Data</h3>
            <p className="text-sm text-gray-600">Download platform analytics</p>
          </button>
        </div>
      </div>
    </div>
  );
}