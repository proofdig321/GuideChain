"use client";

import dynamic from "next/dynamic";

const GuidesContent = dynamic(() => import("./GuidesContent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 50%, #fef3c7 100%)'
    }}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading guides...</p>
      </div>
    </div>
  ),
});

export default function GuidesPage() {
  return <GuidesContent />;
}