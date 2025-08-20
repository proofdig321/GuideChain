"use client";

import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 safari-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GuideChain
              </span>
              <div className="text-xs text-gray-500 -mt-1">South Africa</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/guides" className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium">
              Discover Guides
            </Link>
            <Link href="/verify" className="px-4 py-2 text-gray-700 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 font-medium">
              Become Guide
            </Link>
            <Link href="/dashboard" className="px-4 py-2 text-gray-700 hover:text-green-600 rounded-lg hover:bg-green-50 transition-all duration-200 font-medium">
              Dashboard
            </Link>
            <Link href="/contact" className="px-4 py-2 text-gray-700 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-all duration-200 font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <ConnectButton
                client={client}
                appMetadata={{
                  name: "GuideChain",
                  url: "https://guidechain.vercel.app",
                }}
              />
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              <Link href="/guides" className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium">
                🧭 Discover Guides
              </Link>
              <Link href="/verify" className="px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 font-medium">
                ⭐ Become Guide
              </Link>
              <Link href="/dashboard" className="px-4 py-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium">
                📊 Dashboard
              </Link>
              <Link href="/contact" className="px-4 py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium">
                💬 Contact
              </Link>
              <div className="px-4 py-2 sm:hidden">
                <ConnectButton
                  client={client}
                  appMetadata={{
                    name: "GuideChain",
                    url: "https://guidechain.vercel.app",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}