import React, { useEffect, useRef, useState } from "react";
import { SimMotor } from "./SimMotor";
import { SimLED } from "./SimLED";

interface SimulationCanvasProps {
  circuitJson: any;
  simulationState: {
    nodes: Record<string, number>; // Current voltage at each node
    currents: Record<string, number>; // Current through components
  };
}

export const SimulationCanvas: React.FC<SimulationCanvasProps> = ({
  circuitJson,
  simulationState,
}) => {
  const [scale, setScale] = useState(10); // pixels per mm
  const [offset, setOffset] = useState({ x: 300, y: 300 }); // Center of screen roughly

  // Extract components from circuitJson (array)
  // We look for pcb_component to get position
  const cJsonArray = Array.isArray(circuitJson) ? circuitJson : [];

  const relevantComponents = cJsonArray
    .filter((item: any) => item.type === "pcb_component")
    .map((item: any) => {
      // Find source component to match name/ftype
      const sourceComp = cJsonArray.find(
        (s: any) =>
          s.type === "source_component" &&
          s.source_component_id === item.source_component_id,
      );
      return {
        ...item,
        name: sourceComp?.name || item.pcb_component_id, // fallback
        ftype: sourceComp?.ftype || "unknown",
      };
    })
    .filter(
      (c: any) =>
        (c.name &&
          (c.name.includes("LED") ||
            c.name.includes("M") ||
            c.name.includes("D"))) ||
        (c.ftype && (c.ftype.includes("led") || c.ftype.includes("motor"))),
    );

  return (
    <div className="w-full h-full bg-[#1e1e1e] relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-4 left-4 text-white/50 text-xs font-mono z-10">
        Simulation View (Interactive)
      </div>

      {/* Render Components */}
      {relevantComponents.map((comp: any, idx: number) => {
        // Position
        const x = (comp.center?.x || 0) * scale + offset.x;
        const y = -(comp.center?.y || 0) * scale + offset.y;

        // State Mapping
        // Check currents/nodes.
        // If we have current for this component name directly (Simulated I(C))
        // let current = simulationState.currents[comp.name] || 0;
        // let voltage = simulationState.nodes[comp.name] || 0; // usually node voltage, not diff

        // Debug: If we have ANY current in simulationState, assume it flows through the first LED for demo
        // Real implementation requires netlist parsing
        const firstCurrentKey = Object.keys(simulationState.currents)[0];
        const debugCurrent = firstCurrentKey
          ? simulationState.currents[firstCurrentKey]
          : 0;

        const isMotor = comp.name.includes("M") || comp.ftype.includes("motor");
        const isLed =
          comp.name.includes("LED") ||
          comp.ftype.includes("led") ||
          comp.name.startsWith("D");

        if (isMotor) {
          return <SimMotor key={idx} x={x} y={y} voltage={5} />;
        }

        if (isLed) {
          // Use debug current if present, otherwise default to 20mA for visual check
          return (
            <SimLED key={idx} x={x} y={y} current={debugCurrent || 0.02} />
          );
        }

        return null;
      })}

      {relevantComponents.length === 0 && (
        <div className="text-white/20">
          No visualizable components found. Try adding an LED or Motor.
        </div>
      )}
    </div>
  );
};
