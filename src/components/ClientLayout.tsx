"use client";

import { useEffect, useState } from "react";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { setAuthTokenGetter } from "@/lib/api/client";
import { syncUser } from "@/lib/api/auth";
import { MobileRestricted } from "@/components/MobileRestricted";

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
      console.log("[AuthBridge] Set auth token getter");
    }

    const timer = setTimeout(() => {
      console.log("[AuthBridge] 2s timeout - forcing ready=true");
      setReady2(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [getAccessToken, ready, authenticated, user]);

  return <>{children}</>;
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;
  console.log("[RootLayout] Rendering with NEXT_PUBLIC_PRIVY_APP_ID:", appId);
  console.log("[RootLayout] appId length:", appId?.length);

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
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ["email"],
        appearance: {
          theme: "dark",
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "off",
          },
          solana: {
            createOnLogin: "off",
          },
        },
        walletConnectCloudProjectId: undefined,
      }}
    >
      <MobileRestricted />
      <AuthBridge>{children}</AuthBridge>
    </PrivyProvider>
  );
}
