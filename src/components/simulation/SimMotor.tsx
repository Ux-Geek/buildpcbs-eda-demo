import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface SimMotorProps {
  x: number;
  y: number;
  voltage: number; // Simulated voltage
  width?: number;
  height?: number;
}

export const SimMotor: React.FC<SimMotorProps> = ({
  x,
  y,
  voltage,
  width = 50,
  height = 50,
}) => {
  const controls = useAnimation();

  // Speed is proportional to voltage.
  // Arbitrary scaling: 5V = 1 rotation per second (360 deg/s)
  const speed = Math.abs(voltage) * 72; // degrees per frame (approx)

  useEffect(() => {
    if (Math.abs(voltage) > 0.1) {
      controls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          ease: "linear",
          duration: 5 / (Math.abs(voltage) || 0.1), // Duration of 1 rotation
        },
      });
    } else {
      controls.stop();
    }
  }, [voltage, controls]);

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
        className="w-full h-full rounded-full border-4 border-gray-600 bg-gray-800 flex items-center justify-center shadow-lg"
        animate={controls}
      >
        {/* Motor Shaft */}
        <div className="w-1/3 h-1/3 bg-gray-400 rounded-full relative">
          <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-black -translate-x-1/2"></div>
        </div>
        {/* Fan blades indication */}
        <div className="absolute w-full h-1 bg-gray-500/50 rotate-45"></div>
        <div className="absolute w-full h-1 bg-gray-500/50 -rotate-45"></div>
      </motion.div>

      {/* Label */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white whitespace-nowrap font-mono">
        {voltage.toFixed(2)}V
      </div>
    </div>
  );
};
