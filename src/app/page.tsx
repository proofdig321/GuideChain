"use client";

import dynamic from "next/dynamic";

const HomeContent = dynamic(() => import("./HomeContent"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          GuideChain
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Decentralized peer-to-peer tourism marketplace connecting tourists with verified South African guides
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-8"></div>
      </div>
    </main>
  ),
});

export default function Home() {
  return <HomeContent />;
}