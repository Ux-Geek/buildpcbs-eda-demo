"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * ErrorBoundary for PCBViewer
 * Catches and suppresses duplicate key warnings from @tscircuit/pcb-viewer
 */
export class PCBViewerErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error, but don't show it to user if it's a duplicate key warning
    if (
      error.message?.includes("duplicate") ||
      error.message?.includes("key")
    ) {
      console.warn("Suppressed PCB Viewer key warning:", error.message);
      // Don't set hasError to true, allow rendering to continue
      this.setState({ hasError: false });
    } else {
      console.error("PCBViewer Error:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">
            Failed to render PCB viewer
          </div>
        )
      );
    }

    return this.props.children;
  }
}
