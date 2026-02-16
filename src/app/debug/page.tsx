"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export const runtime = "edge";

/**
 * DEBUG LANDING PAGE
 * Simple input to jump to a project debug view
 * URL: /debug
 */
const DebugPage: React.FC = () => {
  const [projectId, setProjectId] = useState("");
  const router = useRouter();

  // PRODUCTION GUARD: Block access in production
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.error("🚨 Debug route is disabled in production");
      router.push("/");
    }
  }, [router]);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectId.trim()) {
      router.push(`/debug/project/${projectId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-2 text-red-500 flex items-center gap-2">
          <span>🛠️</span> Debug Tools
        </h1>
        <p className="text-white/50 mb-6 text-sm">
          Internal tools for inspecting projects without authentication.
          <br />
          <span className="text-yellow-500/80 font-mono text-xs">
            DEV MODE ONLY
          </span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-white/40 uppercase mb-2">
              Project ID
            </label>
            <input
              type="text"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              placeholder="e.g. 123e4567-e89b-..."
              className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none font-mono text-sm"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!projectId.trim()}
            className="bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Open Project Debug View
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5">
          <h2 className="text-xs font-bold text-white/30 uppercase mb-3">
            Quick Links
          </h2>
          <div className="flex flex-col gap-2">
            <a
              href="/"
              className="text-sm text-blue-400 hover:text-blue-300 hover:underline"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
