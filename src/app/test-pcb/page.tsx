"use client";

import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api/client";

/**
 * Test page to verify PCBViewer works with compiled circuitJson
 */
export default function PCBViewerTest() {
  const [Viewer, setViewer] = useState<any>(null);
  const [circuitJson, setCircuitJson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load PCBViewer
    import("@tscircuit/pcb-viewer").then((mod) => {
      setViewer(() => mod.PCBViewer);
    });

    // Fetch compiled circuit from backend
    fetch(`${API_BASE_URL}/api/test/compile`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCircuitJson(data.circuitJson);
        } else {
          setError(data.error || "Compilation failed");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !Viewer) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading test circuit...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-white text-xl font-bold">PCB Viewer Test</h1>
        <p className="text-white/50 text-sm">
          Testing backend compilation → circuitJson → PCBViewer
        </p>
      </div>
      <div
        className="flex-1 h-full relative"
        id="viewer-root"
        style={{ minHeight: 0 }}
      >
        {/* @ts-ignore */}
        <Viewer circuitJson={circuitJson} />
        <style jsx global>{`
          #viewer-root > div {
            height: 100% !important;
            width: 100% !important;
          }
        `}</style>
      </div>
    </div>
  );
}
