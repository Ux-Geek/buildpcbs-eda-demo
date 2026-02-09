import { post } from "./client";
import type {
  ValidateResponse,
  CompileResponse,
  DRCResponse,
  CodeReviewResponse,
} from "./types";

/**
 * Validate ECAD (tscircuit) code without full compilation
 */
export async function validateECAD(code: string): Promise<ValidateResponse> {
  return post("/api/compiler/validate/ecad", { code });
}

/**
 * Validate MCAD (replicad) code without full compilation
 */
export async function validateMCAD(code: string): Promise<ValidateResponse> {
  return post("/api/compiler/validate/mcad", { code });
}

/**
 * Compile ECAD code to outputs (Schematic SVG, PCB SVG, Gerbers, BOM)
 */
export async function compileECAD(code: string): Promise<CompileResponse> {
  return post("/api/compiler/compile/ecad", { code });
}

/**
 * Compile MCAD code to outputs (STEP, STL files)
 */
export async function compileMCAD(code: string): Promise<CompileResponse> {
  return post("/api/compiler/compile/mcad", { code });
}

/**
 * Run Design Rule Check on compiled circuit JSON
 * Validates trace widths, clearances, via sizes
 */
export async function runDRC(circuitJson: any): Promise<DRCResponse> {
  return post("/api/compiler/drc", circuitJson);
}

/**
 * AI-assisted code review with score and suggestions
 */
export async function reviewCode(
  code: string,
  type: "ecad" | "mcad",
): Promise<CodeReviewResponse> {
  return post("/api/compiler/review", { code, type });
}
