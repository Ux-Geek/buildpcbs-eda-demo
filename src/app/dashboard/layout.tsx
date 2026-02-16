"use client";

import { DashboardSidebar } from "@/components/DashboardSidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-[80px] md:ml-[280px] p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
