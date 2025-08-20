"use client";

import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import Link from "next/link";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center travel-pattern overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 travel-gradient"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="block text-gray-900 text-shadow">Explore</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                South Africa
              </span>
              <span className="block text-gray-700 text-4xl sm:text-5xl lg:text-6xl font-bold mt-2">
                with Local Experts
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              🌍 Connect with verified local guides • 🔒 Secure Web3 payments • ⭐ Authentic experiences
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <ConnectButton
              client={client}
              appMetadata={{
                name: "GuideChain",
                url: "https://guidechain.vercel.app",
              }}
            />
            <Link href="/guides" className="btn-secondary">
              🧭 Browse Guides
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="card p-8 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 safari-gradient rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Local Expertise</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover hidden gems with verified South African guides who know every secret spot, story, and tradition.
              </p>
            </div>

            <div className="card p-8 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 ocean-gradient rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Payments</h3>
              <p className="text-gray-600 leading-relaxed">
                Pay with USDC through smart contracts. Escrow protection with only 7.5% platform fee. Your money is safe.
              </p>
            </div>

            <div className="card p-8 group hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 mountain-gradient rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Verified Reviews</h3>
              <p className="text-gray-600 leading-relaxed">
                Blockchain-verified reviews from real travelers. Every rating is authentic and permanently recorded.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-black text-blue-600 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Verified Guides</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-600 mb-2">200+</div>
              <div className="text-gray-600 font-medium">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-green-600 mb-2">9</div>
              <div className="text-gray-600 font-medium">Provinces</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange-600 mb-2">4.9</div>
              <div className="text-gray-600 font-medium">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}