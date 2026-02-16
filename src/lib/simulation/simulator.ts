// @ts-ignore - spicey might not have types
import { simulate } from "spicey";

export interface SimulationResult {
  time: number[];
  nodes: Record<string, number[]>; // Node name -> Array of voltages
  currents: Record<string, number[]>; // Component name -> Array of currents
}

export class Simulator {
  private netlist: string = "";

  constructor() {}

  loadNetlist(netlist: string) {
    this.netlist = netlist;
  }

  async run(): Promise<SimulationResult> {
    if (!this.netlist) throw new Error("No netlist loaded");

    console.log("Starting simulation with netlist:", this.netlist);

    try {
      // spicey.simulate returns { circuit, ac, tran }
      const { tran } = simulate(this.netlist);

      if (!tran) {
        throw new Error(
          "Simulation yielded no transient analysis results. Did you include a .tran directive?",
        );
      }

      return {
        time: tran.times,
        nodes: tran.nodeVoltages,
        currents: tran.elementCurrents,
      };
    } catch (e) {
      console.error("Simulation failed:", e);
      throw e;
    }
  }
}
