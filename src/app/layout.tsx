"use client";

import { useEffect } from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { PrivyProvider, usePrivy } from "@privy-io/react-auth";
import { setAuthTokenGetter } from "@/lib/api/client";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
});

function AuthBridge({ children }: { children: React.ReactNode }) {
  const { getAccessToken } = usePrivy();

  useEffect(() => {
    // Inject Privy token getter into global scope for API client
    setAuthTokenGetter(getAccessToken);
  }, [getAccessToken]);

  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dmSans.className}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
          config={
            {
              appearance: {
                theme: "dark",
                accentColor: "#0038DF",
              },
              embeddedWallets: {
                createOnLogin: "users-without-wallets",
              },
            } as any
          }
        >
          <AuthBridge>{children}</AuthBridge>
        </PrivyProvider>
      </body>
    </html>
  );
}
