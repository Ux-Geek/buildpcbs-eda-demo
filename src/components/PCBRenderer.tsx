"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Component } from "../types";

const PCBViewer = dynamic<React.ComponentType<{ code: string }>>(
  () => import("@tscircuit/pcb-viewer").then((mod) => mod.PCBViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center text-sm text-white/50">
        Loading PCB preview...
      </div>
    ),
  },
);

const EMPTY_BOARD_CODE = `
import { board } from "@tscircuit/core";

export const EmptyBoard = () => (
  <board width="100mm" height="80mm" />
);
`;

interface Props {
  components: Component[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  contextMap?: Record<string, string>;
  code?: string | null;
}

const PCBRenderer: React.FC<Props> = ({
  components,
  selectedId,
  onSelect,
  contextMap = {},
  code,
}) => {
  // Create a unique key based on code content to force remount on any change
  // This prevents React reconciliation issues with tscircuit internal state (duplicate keys)
  const viewerKey = React.useMemo(() => {
    if (!code) return "viewer-empty";
    let hash = 0;
    for (let i = 0; i < code.length; i++) {
      const char = code.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return `viewer-${hash}`;
  }, [code]);

  if (!code) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <div className="text-white/20 text-sm font-mono">
          {/* Waiting for design... */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <PCBViewer key={viewerKey} code={code} />
    </div>
  );
};

export default PCBRenderer;
