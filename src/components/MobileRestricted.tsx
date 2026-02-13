"use client";

import React from "react";
import { Hammer, Smartphone } from "lucide-react";

export const MobileRestricted = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-8 text-center lg:hidden">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-[#0038DF] blur-2xl opacity-20 rounded-full" />
        <div className="relative bg-[#101422] border border-white/10 p-6 rounded-[24px] shadow-2xl">
          <Smartphone size={48} className="text-white/80" />
          <div className="absolute -bottom-2 -right-2 bg-[#0038DF] text-white p-2 rounded-full border-4 border-black">
            <Hammer size={16} />
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-white mb-3">Desktop Only</h1>

      <p className="text-white/50 max-w-[280px] leading-relaxed text-sm">
        BuildPCBS is currently optimized for desktop integration. Mobile support
        is under active development.
      </p>

      <div className="mt-8 py-2 px-4 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-brand uppercase tracking-widest">
        Coming Soon
      </div>
    </div>
  );
};
