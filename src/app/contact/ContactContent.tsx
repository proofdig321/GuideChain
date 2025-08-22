"use client";

import { useState } from "react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { MockDataBanner } from "@/components/ui/MockDataBanner";
import { useWeb3Contact } from "@/hooks/useWeb3Contact";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general"
  });

  const { 
    loading, 
    error, 
    success, 
    canRetry, 
    submitContact, 
    retry, 
    clearError, 
    isConnected, 
    walletAddress 
  } = useWeb3Contact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    if (typeof window !== 'undefined') {
      const { trackContactEvent } = await import('@/lib/analytics');
      trackContactEvent('form_submit', formData.type);
    }
    
    const result = await submitContact(formData);
    
    if (result.success) {
      setFormData({ name: "", email: "", subject: "", message: "", type: "general" });
      // Track success
      if (typeof window !== 'undefined') {
        const { trackContactEvent } = await import('@/lib/analytics');
        trackContactEvent('form_success', formData.type);
      }
    } else {
      // Track error
      if (typeof window !== 'undefined') {
        const { trackContactEvent } = await import('@/lib/analytics');
        trackContactEvent('form_error', formData.type);
      }
    }
  };

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fef3c7 100%)'
    }}>
      <Header />
      
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <MockDataBanner />
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              24/7 Support Available
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              💬 Get in Touch
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Have questions about GuidesChain? Need help with your booking? 
              <span className="text-blue-600 font-semibold">We're here to help.</span>
            </p>
            
            {isConnected && (
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Connected:</span>
                <code className="text-xs">
                  {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
                </code>
              </div>
            )}
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <a href="mailto:support@guidechain.com" className="flex items-center gap-3 p-4 bg-white/95 rounded-xl border border-white/20 hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Email Support</h3>
                <p className="text-gray-600 text-xs">Get detailed help</p>
              </div>
            </a>
            
            <div className="flex items-center gap-3 p-4 bg-white/95 rounded-xl border border-white/20">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Live Chat</h3>
                <p className="text-gray-600 text-xs">Coming soon</p>
              </div>
            </div>
            
            <a href="/guides" className="flex items-center gap-3 p-4 bg-white/95 rounded-xl border border-white/20 hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Find Guides</h3>
                <p className="text-gray-600 text-xs">Browse guides</p>
              </div>
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-800">Message Sent Successfully!</h3>
                        <p className="text-green-600 text-sm">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-red-800">Error</h3>
                          <p className="text-red-600 text-sm">{error}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {canRetry && (
                          <button
                            onClick={retry}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Retry
                          </button>
                        )}
                        <button
                          onClick={clearError}
                          className="text-red-400 hover:text-red-500"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="guide">Guide Application</option>
                      <option value="booking">Booking Support</option>
                      <option value="technical">Technical Issue</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Brief subject line"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 focus:bg-white"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message {isConnected ? '(Web3 Enhanced)' : ''}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm">Email</p>
                      <p className="text-gray-600 text-xs break-all">support@guidechain.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm">Location</p>
                      <p className="text-gray-600 text-xs">Cape Town, South Africa</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 text-sm">Response Time</p>
                      <p className="text-gray-600 text-xs">Within 24 hours</p>
                    </div>
                  </div>

                  {isConnected && (
                    <div className="flex items-start gap-3 pt-3 border-t border-gray-200">
                      <div className="w-6 h-6 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-emerald-900 text-sm">Web3 Enhanced</p>
                        <p className="text-emerald-700 text-xs">Cryptographically signed</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <a href="/guides" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm">
                    <span>🧭</span> Find Guides
                  </a>
                  <a href="/verify" className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors text-sm">
                    <span>⭐</span> Become a Guide
                  </a>
                  <a href="/dashboard" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors text-sm">
                    <span>📊</span> Dashboard
                  </a>
                  <a href="#" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium transition-colors text-sm">
                    <span>🛡️</span> Safety Guidelines
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}