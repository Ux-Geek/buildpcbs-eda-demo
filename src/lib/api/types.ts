// Agent Types

export interface AgentExecuteRequest {
  projectId: string;
  prompt: string;
  model?: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: "openai" | "anthropic" | "gemini";
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  metadata?: any;
}

export interface ChatHistoryResponse {
  messages: ChatMessage[];
}

// Compiler Types

export interface CompileRequest {
  code: string;
}

export interface CompileResponse {
  success: boolean;
  outputs?: {
    schematicSvg?: string;
    pcbSvg?: string;
    bom?: any[];
    dimensions?: { width: number; height: number; unit: string };
  };
  errors: string[];
  warnings: string[];
  timing?: { parseMs: number; compileMs: number; totalMs: number };
}

export interface ValidateResponse {
  valid: boolean;
  errors: string[];
}

export interface DRCResponse {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

export interface CodeReviewResponse {
  score: number;
  issues: Array<{ severity: string; message: string; line: number }>;
  suggestions: string[];
}

// Project Types

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface CreateProjectResponse {
  id: string;
}

export interface ProjectState {
  id: string;
  name: string;
  ecadCode?: string;
  ecadExplanation?: string;
  mcadCode?: string;
  mcadExplanation?: string;
  circuitJson?: any;
  bom?: any[];
  specifications?: {
    components?: any[];
  } & Record<string, any>;
  metadata?: Record<string, any>;
}

export interface SnapshotRequest {
  version: string;
}

export interface ForkResponse {
  id: string;
}

// Component Types

export interface Component {
  id: string;
  name: string;
  manufacturer: string;
  partNumber: string;
  description: string;
  category: string;
  footprint?: string;
  datasheet?: string;
  stock?: number;
  price?: number;
}

export interface StockCheckRequest {
  bom: Array<{ partNumber: string; quantity: number }>;
}

export interface StockCheckResponse {
  available: boolean;
  items: Array<{
    partNumber: string;
    inStock: boolean;
    quantity: number;
    alternatives?: string[];
  }>;
}

// Error Types

export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any,
  ) {
    super(message);
    this.name = "APIError";
  }
}

// SSE Event Types

// SSE Event Types

export type SSEEventType =
  | "thinking"
  | "tool_start"
  | "tool_result"
  | "code"
  | "content"
  | "error"
  | "done"
  | "task_start"
  | "task_complete"
  | "task_error"
  | "opening_note"
  | "closing_note"
  | "project_name";

export interface SSEEvent {
  type: SSEEventType;
  data?: any;
  message?: string;
  code?: string;
  content?: string;
  toolName?: string;
  args?: any;
  success?: boolean;
  // Task specific fields
  taskId?: string;
  taskLabel?: string;
  taskDetails?: string;
  taskTiming?: number;
  note?: string;
  projectId?: string;
  toolArgs?: any;
  toolResult?: any;
  name?: string;
  label?: string;
  title?: string;
}
