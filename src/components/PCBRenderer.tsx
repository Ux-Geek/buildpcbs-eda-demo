"use client";

import React, { useEffect, useState } from "react";
import { Component } from "../types";

// Force client-side only rendering for PCBViewer to avoid hydration/SSR mismatches
// and potentially reduce "duplicate key" issues from rapid re-renders
const BrowserPCBViewer = ({
  circuitJson,
  viewMode,
}: {
  circuitJson: any;
  viewMode: string;
}) => {
  const [Viewers, setViewers] = useState<{
    PCBViewer: any;
    SchematicViewer: any;
    CadViewer: any;
  }>({ PCBViewer: null, SchematicViewer: null, CadViewer: null });

  // Suppress the duplicate key warning from @tscircuit/pcb-viewer immediately
  // This is a known issue with the library's internal rendering
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;

    const suppressTscircuitErrors = (...args: any[]) => {
      const msg = args[0];
      if (typeof msg === "string") {
        // Suppress duplicate key errors from tscircuit
        if (
          msg.includes("Encountered two children with the same key") ||
          (msg.includes("silkscreen") && msg.includes("key"))
        ) {
          return;
        }
      }
      originalError.apply(console, args);
    };

    console.error = suppressTscircuitErrors;
    console.warn = suppressTscircuitErrors;

    // Load all viewers in parallel
    Promise.all([
      import("@tscircuit/pcb-viewer"),
      import("@tscircuit/schematic-viewer"),
      import("@tscircuit/3d-viewer"),
    ])
      .then(([pcbMod, schematicMod, cadMod]) => {
        console.log("Viewers loaded successfully");
        setViewers({
          PCBViewer: pcbMod.PCBViewer,
          SchematicViewer: schematicMod.SchematicViewer,
          CadViewer: cadMod.CadViewer,
        });
      })
      .catch((err) => {
        console.error("Failed to load viewers:", err);
      });

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("BrowserPCBViewer - circuitJson:", circuitJson);
    }
  }, [circuitJson]);

  const { PCBViewer, SchematicViewer, CadViewer } = Viewers;

  if (!PCBViewer || !SchematicViewer || !CadViewer) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-white/50">
        Loading circuit engines...
      </div>
    );
  }

  // Map our ViewMode to PCBViewer props.
  // We use key locally to force re-mount if the view changes, which is a brute-force way to ensure switching works
  // if the component doesn't react to prop updates for tabs.
  // Mapping: Layout -> pcb, Schematic -> schematic, 3D -> 3d (try lowercase)
  const tabMap: Record<string, string> = {
    Layout: "pcb",
    Schematic: "schematic",
    "3D": "3d",
  };
  const activeTab = tabMap[viewMode] || "pcb";

  return (
    <div id="pcb-viewer-container" style={{ width: "100%", height: "100%" }}>
      {activeTab === "schematic" ? (
        <SchematicViewer
          key={`${JSON.stringify(circuitJson)}-schematic`}
          circuitJson={circuitJson}
          debug={process.env.NODE_ENV === "development"}
        />
      ) : activeTab === "3d" ? (
        <CadViewer
          key={`${JSON.stringify(circuitJson)}-3d`}
          circuitJson={circuitJson}
        />
      ) : (
        <PCBViewer
          key={`${JSON.stringify(circuitJson)}-pcb`}
          circuitJson={circuitJson}
        />
      )}
    </div>
  );
};

interface Props {
  components: Component[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  contextMap?: Record<string, string>;
  circuitJson?: any | null;
  viewMode?: "Layout" | "Schematic" | "3D";
}

const PCBRenderer: React.FC<Props> = ({
  components,
  selectedId,
  onSelect,
  contextMap = {},
  circuitJson,
  viewMode = "3D", // Default
}) => {
  if (!circuitJson) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-white/20 text-sm font-mono opacity-50">
          {/*  Waiting for circuit data... */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <BrowserPCBViewer circuitJson={circuitJson} viewMode={viewMode} />
    </div>
  );
};

// Add debug logging for circuitJson
if (process.env.NODE_ENV === "development") {
  console.log("PCBRenderer - ID:", "PCBRenderer");
}

export default PCBRenderer;
