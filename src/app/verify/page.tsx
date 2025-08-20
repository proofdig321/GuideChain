"use client";

import dynamic from "next/dynamic";

const VerifyContent = dynamic(() => import("./VerifyContent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading verification form...</p>
      </div>
    </div>
  ),
});

export default function VerifyPage() {
  return <VerifyContent />;
}