import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientLayout } from "@/components/ClientLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "BuildPCBS - AI-Powered PCB Design",
    template: "%s | BuildPCBS",
  },
  description:
    "AI-powered PCB design workspace. Design circuit boards with natural language prompts and see real-time 3D previews.",
  keywords: [
    "PCB design",
    "AI",
    "circuit board",
    "electronics",
    "CAD",
    "hardware",
    "tscircuit",
    "schematic",
    "layout",
  ],
  authors: [{ name: "BuildPCBS" }],
  creator: "BuildPCBS",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buildpcbs.com",
    siteName: "BuildPCBS",
    title: "BuildPCBS - AI-Powered PCB Design",
    description:
      "AI-powered PCB design workspace. Design circuit boards with natural language prompts and see real-time 3D previews.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BuildPCBS - AI-Powered PCB Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildPCBS - AI-Powered PCB Design",
    description:
      "AI-powered PCB design workspace. Design circuit boards with natural language prompts.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://buildpcbs.com",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} style={{ letterSpacing: '-0.015em', lineHeight: 1.25 }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
