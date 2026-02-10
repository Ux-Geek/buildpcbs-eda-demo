"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoginButton } from "@/components/LoginButton";

export default function DashboardPage() {
  const { authenticated, login, logout, user } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.push("/");
    }
  }, [authenticated, router]);

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <LoginButton
        onLogin={login}
        authenticated={authenticated}
        onLogout={logout}
        user={user}
      />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-white/50 mb-12">
            Welcome back, {user?.email?.address}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Projects Card */}
            <div
              onClick={() => router.push("/")}
              className="p-6 rounded-[20px] bg-black border border-white/10 hover:border-brand transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Projects</h2>
                <span className="text-2xl">🔧</span>
              </div>
              <p className="text-[#777777] text-sm">
                View and manage your hardware designs
              </p>
              <div className="mt-4 text-brand text-sm font-medium group-hover:underline">
                View Projects →
              </div>
            </div>

            {/* Profile Card */}
            <div className="p-6 rounded-[20px] bg-black border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Profile</h2>
                <span className="text-2xl">👤</span>
              </div>
              <p className="text-white/50 text-sm mb-3">
                {user?.email?.address}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00FF94] shadow-[0_0_8px_#00FF94]" />
                <span className="text-[#00FF94] text-xs font-medium">
                  Connected
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
