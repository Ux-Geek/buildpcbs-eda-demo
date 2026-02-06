import type { Metadata } from "next";
import { DM_Sans } from "next/font/google"; // Using next/font is better than CDN
import "./globals.css";

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    style: ["normal", "italic"],
    variable: "--font-dm-sans",
});

export const metadata: Metadata = {
    title: "BuildPCBs | AI-Powered EDA",
    description: "AI-Powered Electronic Design Automation",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={dmSans.className}>
                {children}
            </body>
        </html>
    );
}
