"use client";

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

const ADMIN_ADDRESS = "0x25E1303E503Dc60B5Eee353183A002a645439328";

export default function DashboardContent() {
  const account = useActiveAccount();
  const isAdmin = account?.address?.toLowerCase() === ADMIN_ADDRESS.toLowerCase();

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Wallet to Access Dashboard</h1>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "GuideChain",
              url: "https://guidechain.vercel.app",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">
              {isAdmin ? "Admin Panel" : "User Dashboard"}
            </p>
          </div>
          <ConnectButton
            client={client}
            appMetadata={{
              name: "GuideChain",
              url: "https://guidechain.vercel.app",
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Platform Stats</h3>
        <div className="space-y-2">
          <p>Total Guides: <span className="font-bold">0</span></p>
          <p>Total Bookings: <span className="font-bold">0</span></p>
          <p>Platform Fees: <span className="font-bold">0 USDC</span></p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Pending Verifications</h3>
        <p className="text-gray-600">No pending applications</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-gray-600">No recent activity</p>
      </div>
    </div>
  );
}

function UserDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">My Bookings</h3>
        <p className="text-gray-600">No bookings yet</p>
        <a href="/guides" className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Browse Guides
        </a>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Guide Application</h3>
        <p className="text-gray-600">Become a verified guide</p>
        <a href="/verify" className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Apply Now
        </a>
      </div>
    </div>
  );
}