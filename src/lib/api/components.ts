import { get, post } from "./client";
import type { Component, StockCheckRequest, StockCheckResponse } from "./types";

/**
 * Search for electronic components across internal DB, LCSC, and DigiKey
 */
export async function searchComponents(query: string): Promise<Component[]> {
  return get("/api/components/search", { q: query });
}

/**
 * Check stock availability for a BOM (Bill of Materials)
 */
export async function checkStock(
  bom: Array<{ partNumber: string; quantity: number }>,
): Promise<StockCheckResponse> {
  return post("/api/components/stock-check", { bom });
}

/**
 * AI suggests replacement components for out-of-stock parts
 */
export async function suggestAlternative(
  partNumber: string,
): Promise<Component[]> {
  return post("/api/components/suggest-alternative", { partNumber });
}
