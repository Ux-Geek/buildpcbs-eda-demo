import { circuitJsonToSpice } from "circuit-json-to-spice";
import { getModelForComponent } from "./models";

export const generateNetlist = (circuitJson: any): string => {
  try {
    // Convert basic components using the library
    const spiceNetlistObj = circuitJsonToSpice(circuitJson);
    let spiceNetlist = spiceNetlistObj.toSpiceString();

    // Remove any existing .end directives so we can append our own commands
    spiceNetlist = spiceNetlist.replace(/^\s*\.end\s*$/gim, "");

    // Init models string
    let modelsString = "";

    // Add default simulation commands
    // We add a transient analysis by default: 10ms total, 10us step (roughly)
    // This can be parameterized later
    const simCommand = ".tran 10u 10m";

    // Detect used components and add models
    // This is a simple heuristic. A better approach would be to walk the circuitJson
    const jsonString = JSON.stringify(circuitJson);

    if (jsonString.includes("LED") || jsonString.includes("diode")) {
      // Naively add LED/Diode models if any diode is present
      // In reality, we should match specific component types
      // But for now, we include the generic D and LED models to be safe
      modelsString += "\n" + getModelForComponent("D", "diode");
      modelsString += "\n" + getModelForComponent("LED", "led");
    }

    if (jsonString.includes("NPN") || jsonString.includes("transistor")) {
      modelsString += "\n" + getModelForComponent("Q1", "transistor_npn");
    }

    // GMIN Injection
    // Fix for "Singular matrix" errors caused by floating nodes
    const nodes = detectNodesFromSpice(spiceNetlist);
    let gminString = "* GMIN Stepping (Auto-generated)\n";
    nodes.forEach((node) => {
      if (node !== "0" && node.toLowerCase() !== "gnd") {
        gminString += `R_gmin_${node} ${node} 0 1000G\n`;
      }
    });

    // Combine everything
    // Title line is already handled by toSpiceString?
    // The library output: "Circuit JSON to SPICE Netlist\n..."
    // So we just append our stuff

    return `${spiceNetlist}

* Models
${modelsString}

* GMIN (Convergence Helpers)
${gminString}

* Commands
${simCommand}
.end
`;
  } catch (e) {
    console.error("Failed to generate netlist:", e);
    return "* Error generating netlist\n.end";
  }
};

// Helper to extract unique nodes from SPICE netlist
const detectNodesFromSpice = (netlist: string): Set<string> => {
  const nodes = new Set<string>();
  const lines = netlist.split("\n");

  lines.forEach((line) => {
    const tokens = line.trim().split(/\s+/);
    if (tokens.length < 3) return; // Skip invalid/empty lines

    const type = tokens[0].toUpperCase();

    // Ignore commands and comments
    if (type.startsWith(".") || type.startsWith("*")) return;

    // Component parsing logic
    // R, C, L, V, I, S, D: First 2 args after name are nodes
    if (["R", "C", "L", "V", "I", "S", "D"].some((p) => type.startsWith(p))) {
      if (tokens[1]) nodes.add(tokens[1]);
      if (tokens[2]) nodes.add(tokens[2]);
    }
    // Q (BJT): First 3 args after name are nodes (C, B, E)
    else if (type.startsWith("Q")) {
      if (tokens[1]) nodes.add(tokens[1]);
      if (tokens[2]) nodes.add(tokens[2]);
      if (tokens[3]) nodes.add(tokens[3]);
    }
    // M (MOSFET): First 4 args? (D, G, S, B) - Usually 4
    else if (type.startsWith("M")) {
      if (tokens[1]) nodes.add(tokens[1]);
      if (tokens[2]) nodes.add(tokens[2]);
      if (tokens[3]) nodes.add(tokens[3]);
      if (tokens[4]) nodes.add(tokens[4]);
    }
  });

  return nodes;
};
