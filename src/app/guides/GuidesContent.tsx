"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AdvancedSearch } from "@/components/ui/AdvancedSearch";

export default function GuidesContent() {
  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fef3c7 100%)'
    }}>
      <Header />
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🧭 Find Your Perfect Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover verified South African guides with advanced search and filters
            </p>
          </div>
          <AdvancedSearch />
        </div>
      </main>
      <Footer />
    </div>
  );
}