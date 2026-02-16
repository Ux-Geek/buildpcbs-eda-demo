import React from "react";
import { motion } from "framer-motion";

interface VisualizerOverlayProps {
  children: React.ReactNode;
  visible: boolean;
}

export const VisualizerOverlay: React.FC<VisualizerOverlayProps> = ({
  children,
  visible,
}) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      {children}
    </div>
  );
};
