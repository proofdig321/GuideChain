import Link from "next/link";

export function Footer() {
  return (
    <footer style={{
      background: '#111827',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 24px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px'
        }}>
          {/* Brand Section */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(249, 115, 22, 0.3)'
              }}>
                <svg style={{ width: '28px', height: '28px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  GuideChain
                </div>
                <div style={{ fontSize: '14px', color: '#9ca3af' }}>
                  South Africa Tourism
                </div>
              </div>
            </div>
            
            <p style={{
              color: '#d1d5db',
              marginBottom: '32px',
              maxWidth: '400px',
              lineHeight: '1.6'
            }}>
              🌍 Connecting travelers with authentic South African experiences through verified local guides and secure Web3 payments.
            </p>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { icon: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z', color: '#3b82f6' },
                { icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', color: '#8b5cf6' },
                { icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z', color: '#10b981' }
              ].map((social, i) => (
                <a key={i} href="#" style={{
                  width: '40px',
                  height: '40px',
                  background: '#374151',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.background = social.color;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#374151';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '24px'
            }}>
              🧭 Explore
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { href: '/guides', label: '🏔️ Find Guides', color: '#3b82f6' },
                { href: '/verify', label: '⭐ Become Guide', color: '#8b5cf6' },
                { href: '/dashboard', label: '📊 Dashboard', color: '#10b981' },
                { href: '#', label: '🦁 Safari Tours', color: '#f59e0b' }
              ].map((link, i) => (
                <li key={i} style={{ marginBottom: '12px' }}>
                  <Link href={link.href} style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = link.color;
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                  }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '24px'
            }}>
              🤝 Support
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { href: '/contact', label: '💬 Contact Us', color: '#3b82f6' },
                { href: '#', label: '❓ Help Center', color: '#8b5cf6' },
                { href: '#', label: '🛡️ Safety Guide', color: '#10b981' },
                { href: '#', label: '📋 Terms', color: '#f59e0b' }
              ].map((link, i) => (
                <li key={i} style={{ marginBottom: '12px' }}>
                  <Link href={link.href} style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = link.color;
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                  }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid #374151',
          marginTop: '48px',
          paddingTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{
            color: '#9ca3af',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            © 2025 GuideChain. Built with ❤️ for South African tourism.
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <span style={{ color: '#9ca3af', fontSize: '14px' }}>Powered by</span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{
                padding: '4px 12px',
                background: 'rgba(139, 92, 246, 0.2)',
                color: '#a78bfa',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Polygon zkEVM
              </span>
              <span style={{
                padding: '4px 12px',
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#60a5fa',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                thirdweb
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}