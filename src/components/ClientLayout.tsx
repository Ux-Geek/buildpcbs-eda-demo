"use client";

import dynamic from "next/dynamic";
import { MobileRestricted } from "@/components/MobileRestricted";

const AuthProvider = dynamic(() => import("@/components/AuthProvider"), {
  ssr: false,
});

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;
  // console.log("[RootLayout] Rendering with NEXT_PUBLIC_PRIVY_APP_ID:", appId);
  // console.log("[RootLayout] appId length:", appId?.length); // This line was commented out in the instruction, but not explicitly removed. Keeping it commented for now.

  if (!appId) {
    return (
      <div className="h-screen w-screen bg-black text-red-400 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Configuration Error</h1>
          <p className="text-sm">
            NEXT_PUBLIC_PRIVY_APP_ID is not set. Please check your .env.local
            file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider appId={appId}>
      {children}
      <MobileRestricted />
    </AuthProvider>
  );
}
