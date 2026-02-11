"use client";

import { useEffect, useState } from "react";
import { DM_Sans } from "next/font/google";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { setAuthTokenGetter } from "@/lib/api/client";
import { syncUser } from "@/lib/api/auth";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

function AuthBridge({ children }: { children: React.ReactNode }) {
  const privyState = usePrivy();
  const { getAccessToken, ready, authenticated, user } = privyState;
  const [ready2, setReady2] = useState(false);

  useEffect(() => {
    console.log("[AuthBridge] mounted");
    console.log("[AuthBridge] usePrivy state:", {
      ready,
      authenticated,
      user: user?.email?.address,
    });
    console.log("[AuthBridge] getAccessToken:", typeof getAccessToken);

    // Expose for debugging
    (window as any).__privy = {
      ready,
      authenticated,
      user,
      getAccessToken,
      fullState: privyState,
    };

    if (authenticated && user) {
      syncUser()
        .then((data) => {
          console.log("[AuthBridge] User synced with backend:", data);
        })
        .catch((err) => {
          console.error("[AuthBridge] Failed to sync user:", err);
        });
    }

    if (getAccessToken) {
      setAuthTokenGetter(getAccessToken);
      console.log("[AuthBridge] setAuthTokenGetter called");
    } else {
      console.warn("[AuthBridge] getAccessToken is undefined!");
    }
    setReady2(true);
  }, [ready, authenticated, user, getAccessToken]);

  useEffect(() => {
    // Force show content after 2 seconds if Privy hangs
    const timer = setTimeout(() => {
      if (!ready2) {
        console.warn("[AuthBridge] Force rendering content after timeout");
        setReady2(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [ready2]);

  if (!ready2) {
    console.log("[AuthBridge] waiting for first effect...");
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-blue-500" />
          <p className="text-sm text-white/50">Initializing...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";

  console.log("[RootLayout] Rendering with NEXT_PUBLIC_PRIVY_APP_ID:", appId);
  console.log("[RootLayout] appId length:", appId.length);

  if (!appId) {
    console.error(
      "[RootLayout] CRITICAL: NEXT_PUBLIC_PRIVY_APP_ID is not set!",
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmSans.className}>
        <PrivyProvider
          appId={appId}
          config={{
            appearance: {
              theme: "dark",
              accentColor: "#0038DF",
            },
            embeddedWallets: {
              ethereum: {
                createOnLogin: "off",
              },
            },
            loginMethods: ["email", "wallet"],
          }}
        >
          <AuthBridge>{children}</AuthBridge>
        </PrivyProvider>
      </body>
    </html>
  );
}
