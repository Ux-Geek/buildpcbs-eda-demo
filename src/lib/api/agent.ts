import { get, post, API_BASE_URL, getHeaders } from "./client";
import type {
  AgentExecuteRequest,
  AIModel,
  ChatHistoryResponse,
  SSEEvent,
} from "./types";

/**
 * Get available AI models
 */
export async function getAvailableModels(): Promise<AIModel[]> {
  const response = await get<{
    success: boolean;
    data: { models: AIModel[]; default: string };
  }>("/api/chat/models");
  return response.data.models;
}

/**
 * Get chat history for a project
 */
export async function getChatHistory(
  projectId: string,
  options?: { limit?: number; beforeId?: string },
): Promise<ChatHistoryResponse> {
  const params: Record<string, string> = {};
  if (options?.limit) params.limit = options.limit.toString();
  if (options?.beforeId) params.beforeId = options.beforeId;

  const response = await get<{ success: boolean; data: ChatHistoryResponse }>(
    `/api/chat/history/${projectId}`,
    params,
  );
  return response.data;
}

/**
 * Stream agent execution using fetch with ReadableStream
 * Provides more control over the stream than EventSource
 *
 * @example
 * ```ts
 * for await (const event of streamAgentExecution({ projectId, prompt })) {
 *   if (event.type === 'code') {
 *     console.log('Generated code:', event.code);
 *   }
 * }
 * ```
 */
export async function* streamAgentExecution(
  request: AgentExecuteRequest,
): AsyncGenerator<SSEEvent> {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}/api/agent/execute`, {
    method: "POST",
    headers,
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to start agent execution: ${response.statusText}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6).trim();
          if (data === "[DONE]") return;

          try {
            const event = JSON.parse(data) as SSEEvent;
            yield event;
          } catch (e) {
            console.error("Failed to parse SSE data:", data);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

/**
 * Execute agent and return EventSource (alternative to streaming)
 * Useful for simpler use cases where you want browser-native SSE handling
 */
export function executeAgentWithEventSource(
  request: AgentExecuteRequest,
): EventSource {
  const url = new URL("/api/agent/execute", API_BASE_URL);
  url.searchParams.set("projectId", request.projectId);
  url.searchParams.set("prompt", request.prompt);
  if (request.model) url.searchParams.set("model", request.model);

  return new EventSource(url.toString());
}
