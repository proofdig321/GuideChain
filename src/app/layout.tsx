import type { Metadata } from "next";
import './globals.css';
import { ThirdwebProvider } from "thirdweb/react";

export const metadata: Metadata = {
  title: 'GuidesChain - Web3 Tourism Platform',
  description: 'Decentralized peer-to-peer tourism marketplace connecting tourists with verified South African guides',
  manifest: '/manifest.json',
  icons: {
    apple: '/icons/icon-152x152.png',
  },
};

export const viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
        <meta name="apple-mobile-web-app-title" content="GuidesChain" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
      </head>
      <body>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}