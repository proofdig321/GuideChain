import './globals.css';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { PolygonZkevmTestnet } from '@thirdweb-dev/chains';

export const metadata = {
  title: 'GuideChain - Web3 Tourism Platform',
  description: 'Decentralized peer-to-peer tourism marketplace connecting tourists with verified South African guides',
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'GuideChain',
  },
  icons: {
    apple: '/icons/icon-152x152.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GuideChain" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
      </head>
      <body>
        <ThirdwebProvider
          activeChain={PolygonZkevmTestnet}
          clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
        >
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}