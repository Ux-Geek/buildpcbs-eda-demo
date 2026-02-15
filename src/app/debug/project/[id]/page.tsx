"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const Workspace = dynamic(
  () => import("@/components/Workspace").then((mod) => mod.Workspace),
  { ssr: false },
);

export const runtime = "edge";

/**
 * DEBUG ROUTE - Admin/Support Access
 * Access any project without authentication for debugging purposes
 * URL: /debug/project/[id]
 *
 * PRODUCTION GUARD: This route is disabled in production
 */
const DebugProjectPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  // PRODUCTION GUARD: Block access in production
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.error("🚨 Debug route is disabled in production");
      router.push("/");
    }
  }, [router]);

  if (!id || process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div>
      {/* Debug Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white text-center py-2 text-sm font-bold">
        🛠️ DEBUG MODE - Support View Only
      </div>
      <div className="pt-10">
        <Workspace key={id} initialProjectId={id} debugMode={true} />
      </div>
    </div>
  );
};

export default DebugProjectPage;
