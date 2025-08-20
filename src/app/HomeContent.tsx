"use client";

import { Header } from "@/components/ui/Header";
import { Hero } from "@/components/ui/Hero";
import { Footer } from "@/components/ui/Footer";
import Link from "next/link";

export default function HomeContent() {
  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>
      <Header />
      <Hero />
      
      {/* How It Works */}
      <section style={{
        padding: '80px 0',
        background: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              color: '#1f2937',
              marginBottom: '24px'
            }}>
              🚀 How It Works
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Three simple steps to your next South African adventure
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '48px'
          }}>
            {[
              { num: '1', title: '🔗 Connect Wallet', desc: 'Connect your Web3 wallet to access secure USDC payments and start exploring.', gradient: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)' },
              { num: '2', title: '🧭 Find Guide', desc: 'Browse verified local guides, read authentic reviews, and choose your perfect experience.', gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)' },
              { num: '3', title: '🌍 Explore', desc: 'Book securely with smart contracts and enjoy authentic local adventures.', gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }
            ].map((step, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: step.gradient,
                  borderRadius: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 32px auto',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                  transition: 'transform 0.3s'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}>
                  <span style={{
                    fontSize: '36px',
                    fontWeight: '900',
                    color: 'white'
                  }}>
                    {step.num}
                  </span>
                </div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '16px'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6'
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Guides */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fdf4ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          width: '128px',
          height: '128px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          width: '160px',
          height: '160px',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>
        
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '64px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '900',
                color: '#1f2937',
                marginBottom: '32px'
              }}>
                🌟 For Local Guides
              </h2>
              <p style={{
                fontSize: '20px',
                color: '#6b7280',
                marginBottom: '40px',
                lineHeight: '1.6'
              }}>
                Share your passion for South Africa and earn from your expertise. Join our verified guide network.
              </p>
              
              <div style={{ marginBottom: '40px' }}>
                {[
                  { icon: '💰', text: 'Earn 92.5% of booking fees', color: '#10b981' },
                  { icon: '🔒', text: 'Secure USDC payments', color: '#3b82f6' },
                  { icon: '⭐', text: 'Build blockchain reputation', color: '#8b5cf6' }
                ].map((benefit, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '24px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: benefit.color,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {benefit.icon} {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
              
              <Link href="/verify" className="btn-primary" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                🚀 Become a Guide
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="card" style={{
              padding: '48px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, white 0%, #f0f9ff 100%)'
            }}>
              <div style={{
                fontSize: '72px',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '16px'
              }}>
                92.5%
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '12px'
              }}>
                Guide Earnings
              </div>
              <div style={{
                color: '#6b7280',
                fontSize: '18px',
                lineHeight: '1.6'
              }}>
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