"use client";

import { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { EnterpriseStats } from "@/components/dashboard/EnterpriseStats";
import { AdminUserManagement } from "@/components/dashboard/AdminUserManagement";
import { NotificationCenter } from "@/components/ui/NotificationCenter";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

const ADMIN_ADDRESS = "0xc84799A904EeB5C57aBBBc40176E7dB8be202C10";

export default function DashboardContent() {
  const account = useActiveAccount();
  const isAdmin = account?.address?.toLowerCase() === ADMIN_ADDRESS.toLowerCase();

  if (!account) {
    return (
      <div className="min-h-screen" style={{
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fef3c7 100%)'
      }}>
        <Header />
        <main className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center p-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Connect Wallet to Access Dashboard
              </h1>
              <p className="text-gray-600 mb-8">
                Secure access to your GuidesChain dashboard
              </p>
              <ConnectButton
                client={client}
                appMetadata={{
                  name: "GuidesChain",
                  url: "https://guideschain.vercel.app",
                }}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fef3c7 100%)'
    }}>
      <Header />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                📊 Dashboard
              </h1>
              <p className="text-xl text-gray-600">
                {isAdmin ? "🔧 Super Admin Panel" : "👤 User Dashboard"}
              </p>
              <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Connected: {account.address?.slice(0, 6)}...{account.address?.slice(-4)}
              </div>
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
      </main>
      <Footer />
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "analytics" | "notifications">("overview");

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex gap-2 bg-white/50 p-2 rounded-2xl">
        {[
          { id: "overview", label: "📊 Overview", count: null },
          { id: "users", label: "👥 Users", count: 47 },
          { id: "analytics", label: "📈 Analytics", count: null },
          { id: "notifications", label: "🔔 Notifications", count: null },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-white shadow-lg text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab.label}
            {tab.count && (
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <EnterpriseStats />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">⏳</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Pending Verifications</h3>
              </div>
              <p className="text-gray-600 mb-4">Review guide applications and verify credentials</p>
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all">
                📋 Review Applications (0)
              </button>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">👥</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
              </div>
              <p className="text-gray-600 mb-4">Manage users, guides, and platform access</p>
              <button 
                onClick={() => setActiveTab("users")}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all"
              >
                👥 Manage Users
              </button>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
              </div>
              <p className="text-gray-600 mb-4">View detailed platform analytics and reports</p>
              <button 
                onClick={() => setActiveTab("analytics")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                📈 View Analytics
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <AdminUserManagement />
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Page Views</h3>
              <p className="text-2xl font-bold text-gray-900">12,847</p>
              <p className="text-sm text-green-600">↗ +12.5%</p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Conversions</h3>
              <p className="text-2xl font-bold text-gray-900">3.2%</p>
              <p className="text-sm text-green-600">↗ +0.8%</p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Avg. Session</h3>
              <p className="text-2xl font-bold text-gray-900">4m 32s</p>
              <p className="text-sm text-red-600">↘ -0.3%</p>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Bounce Rate</h3>
              <p className="text-2xl font-bold text-gray-900">24.1%</p>
              <p className="text-sm text-green-600">↗ -2.1%</p>
            </div>
          </div>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
            <p className="text-gray-600 mb-6">Detailed analytics dashboard with custom reports</p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium">
              View Full Analytics
            </button>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <NotificationCenter />
      )}
    </div>
  );
}

function UserDashboard() {
  return (
    <div className="space-y-8">
      {/* User Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Active Bookings</h3>
            <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-blue-600 text-lg">🎫</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Completed Tours</h3>
            <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="text-green-600 text-lg">✅</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Total Spent</h3>
            <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-purple-600 text-lg">💰</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">$0</p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600">Reviews Given</h3>
            <div className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-yellow-600 text-lg">⭐</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* User Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">🧭</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Find Guides</h3>
              <p className="text-gray-600">Discover amazing local guides</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">Browse verified South African guides and book your next adventure</p>
          <a 
            href="/guides" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            🧭 Browse Guides
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl">⭐</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Become a Guide</h3>
              <p className="text-gray-600">Share your local expertise</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">Join our community of verified guides and earn from your local knowledge</p>
          <a 
            href="/verify" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-medium hover:from-green-700 hover:to-green-800 transition-all"
          >
            🚀 Apply Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}