"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { MockDataBanner } from "@/components/ui/MockDataBanner";
import { AdvancedSearch } from "@/components/ui/AdvancedSearch";

export default function GuidesContent() {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fef3c7 100%)'
    }}>
      <Header />
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
        <div className="max-w-7xl mx-auto px-6">
          <MockDataBanner />
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              24 Verified Guides Available
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              🧭 Find Your Perfect Guide
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover verified South African guides with 
              <span className="text-blue-600 font-semibold">advanced search and filters</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="text-green-500">✓</span>
                <span className="text-sm font-medium text-gray-700">Verified Guides</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="text-blue-500">⚡</span>
                <span className="text-sm font-medium text-gray-700">Instant Booking</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="text-purple-500">🔍</span>
                <span className="text-sm font-medium text-gray-700">Smart Search</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <AdvancedSearch />
        </div>
      </main>
      <Footer />
    </div>
  );
}