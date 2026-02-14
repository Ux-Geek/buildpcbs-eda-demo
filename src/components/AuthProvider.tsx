"use client";

import { useEffect, useState } from "react";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { setAuthTokenGetter } from "@/lib/api/client";
import { syncUser } from "@/lib/api/auth";

function AuthBridge({ children }: { children: React.ReactNode }) {
  const privyState = usePrivy();
  const { getAccessToken, ready, authenticated, user, logout } = privyState;
  const [ready2, setReady2] = useState(false);

  useEffect(() => {
    console.log("[AuthBridge] mounted");
    console.log("[AuthBridge] usePrivy state:", {
      ready,
      authenticated,
      user: user?.email?.address,
    });
    // console.log("[AuthBridge] getAccessToken:", typeof getAccessToken);

    // Enforce Email-Only: Logout if connected via wallet (no email)
    if (ready && authenticated && !user?.email) {
      console.warn(
        "[AuthBridge] User connected without email (likely wallet). Forcing logout.",
      );
      logout();
      return;
    }

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
      // console.log("[AuthBridge] 2s timeout - forcing ready=true");
      setReady2(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [getAccessToken, ready, authenticated, user, logout]);

  return <>{children}</>;
}

export default function AuthProvider({
  children,
  appId,
}: {
  children: React.ReactNode;
  appId: string;
}) {
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
      }}
    >
      <AuthBridge>{children}</AuthBridge>
    </PrivyProvider>
  );
}
