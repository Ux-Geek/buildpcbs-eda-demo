"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Settings,
  Plus,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";

interface DashboardSidebarProps {
  className?: string;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  className = "",
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = usePrivy();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const navigation = [
    { name: "Projects", href: "/dashboard", icon: LayoutGrid },
    { name: "Community", href: "/community", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <motion.div
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={`h-screen bg-black border-r border-white/10 flex flex-col fixed left-0 top-0 z-40 ${className}`}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="font-bold text-xl tracking-tight">BuildPCBs</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-lg">B</span>
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white/40 hover:text-white transition-colors absolute -right-3 top-8 bg-black border border-white/10 rounded-full p-1"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* New Project Button */}
      <div className="px-4 mb-8">
        <button
          onClick={() => router.push("/")}
          className={`w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl p-3 flex items-center justify-center gap-2 transition-all group ${
            isCollapsed ? "aspect-square p-0" : ""
          }`}
        >
          <Plus className="text-brand group-hover:scale-110 transition-transform" />
          {!isCollapsed && <span className="font-medium">New Project</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-brand/10 text-brand"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <Icon size={20} />
              {!isCollapsed && <span className="font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User / Footer */}
      <div className="p-4 border-t border-white/10">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
            {user?.email?.address?.substring(0, 2).toUpperCase() || "U"}
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.email?.address || "User"}
              </p>
              <button
                onClick={handleLogout}
                className="text-xs text-white/40 hover:text-red-400 flex items-center gap-1 mt-0.5 transition-colors"
              >
                <LogOut size={10} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
