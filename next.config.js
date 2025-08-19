/** @type {import('next').NextConfig} */
const nextConfig = {

  env: {
    NEXT_PUBLIC_CHAIN_ID: '1442',
    NEXT_PUBLIC_NETWORK_NAME: 'polygon-zkevm-testnet',
  },
  images: {
    domains: ['cdn.sanity.io', 'ipfs.io', 'gateway.ipfs.io'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    config.externals = config.externals || [];
    config.externals.push('pino-pretty');
    return config;
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        }
      }
    },
    {
      urlPattern: /^https:\/\/gateway\.ipfs\.io\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'ipfs-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60 // 1 day
        }
      }
    }
  ]
});

module.exports = withPWA(nextConfig);