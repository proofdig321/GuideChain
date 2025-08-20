"use client";

import { Header } from "@/components/ui/Header";
import { Hero } from "@/components/ui/Hero";
import { Footer } from "@/components/ui/Footer";
import Link from "next/link";

export default function HomeContent() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* How It Works */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 travel-pattern opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
              🚀 How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to your next South African adventure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 safari-gradient rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <span className="text-3xl font-black text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🔗 Connect Wallet</h3>
              <p className="text-gray-600 leading-relaxed">Connect your Web3 wallet to access secure USDC payments and start exploring.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 ocean-gradient rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <span className="text-3xl font-black text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🧭 Find Guide</h3>
              <p className="text-gray-600 leading-relaxed">Browse verified local guides, read authentic reviews, and choose your perfect experience.</p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mountain-gradient rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                <span className="text-3xl font-black text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🌍 Explore</h3>
              <p className="text-gray-600 leading-relaxed">Book securely with smart contracts and enjoy authentic local adventures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* For Guides */}
      <section className="py-20 travel-gradient relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8">
                🌟 For Local Guides
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                Share your passion for South Africa and earn from your expertise. Join our verified guide network.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">💰 Earn 92.5% of booking fees</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">🔒 Secure USDC payments</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold text-gray-800">⭐ Build blockchain reputation</span>
                </div>
              </div>
              
              <Link href="/verify" className="btn-primary inline-flex items-center">
                🚀 Become a Guide
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="card p-12 text-center bg-gradient-to-br from-white to-blue-50">
              <div className="text-6xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                92.5%
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-3">Guide Earnings</div>
              <div className="text-gray-600 text-lg leading-relaxed">
                Keep most of what you earn with our industry-low 7.5% platform fee
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}