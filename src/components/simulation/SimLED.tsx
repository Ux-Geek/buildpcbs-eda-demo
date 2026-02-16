import React from "react";
import { motion } from "framer-motion";

interface SimLEDProps {
  x: number;
  y: number;
  current: number; // Simulated current in Amps
  color?: string;
  width?: number;
  height?: number;
}

export const SimLED: React.FC<SimLEDProps> = ({
  x,
  y,
  current,
  color = "#ff0000",
  width = 20,
  height = 20,
}) => {
  // Brightness logic
  // Assume 20mA is full brightness
  const maxCurrent = 0.02; // 20mA
  const brightness = Math.min(Math.abs(current) / maxCurrent, 1.5); // Allow some overdriving bloom

  const opacity = Math.min(Math.max(brightness, 0.2), 1);
  const glow = brightness * 10;

  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: x,
        top: y,
        width,
        height,
        transform: "translate(-50%, -50%)",
      }}
    >
      <motion.div
        className="w-full h-full rounded-full border border-white/20"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 ${glow}px ${glow / 2}px ${color}`,
          opacity: opacity,
        }}
      ></motion.div>
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-black/80 text-[8px] text-white whitespace-nowrap px-1 rounded">
        {(current * 1000).toFixed(1)}mA
      </div>
    </div>
  );
};
