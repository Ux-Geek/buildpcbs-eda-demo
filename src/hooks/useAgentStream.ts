import { useState, useCallback, useRef } from "react";
import {
  streamAgentExecution,
  type AgentExecuteRequest,
  type SSEEvent,
} from "@/lib/api";

export type AgentEvent = SSEEvent;

export interface UseAgentStreamReturn {
  /** Start agent execution with streaming */
  execute: (prompt: string, options?: { model?: string }) => Promise<void>;

  /** Stop the current stream */
  stop: () => void;

  /** Is the agent currently executing? */
  isStreaming: boolean;

  /** Accumulated events from the stream */
  events: AgentEvent[];

  /** Latest agent status (from 'thinking' events) */
  status: string | null;

  /** Latest generated code (from 'code' events) */
  latestCode: string | null;

  /** Accumulated content (from 'content' events) */
  content: string;

  /** Any error that occurred */
  error: Error | null;

  /** Clear all events and reset state */
  clear: () => void;
}

/**
 * React hook for streaming AI Agent execution
 *
 * @example
 * ```tsx
 * const { execute, isStreaming, content, latestCode, status } = useAgentStream('project-123');
 *
 * <button onClick={() => execute('Add a LED')}>
 *   {isStreaming ? 'Thinking...' : 'Send'}
 * </button>
 * ```
 */
export function useAgentStream(projectId: string): UseAgentStreamReturn {
  const [isStreaming, setIsStreaming] = useState(false);
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [latestCode, setLatestCode] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async (prompt: string, options?: { model?: string }) => {
      // Reset state
      setIsStreaming(true);
      setEvents([]);
      setStatus(null);
      setLatestCode(null);
      setContent("");
      setError(null);

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      try {
        const request: AgentExecuteRequest = {
          projectId,
          prompt,
          model: options?.model,
        };

        // Stream agent execution
        for await (const event of streamAgentExecution(request)) {
          // Check if aborted
          if (abortControllerRef.current?.signal.aborted) {
            break;
          }

          const typedEvent: AgentEvent = {
            type: event.type,
            data: event.data || event,
          };

          // Add to events list
          setEvents((prev) => [...prev, typedEvent]);

          // Update specific state based on event type
          switch (event.type) {
            case "thinking":
              setStatus(event.data || event.message);
              break;

            case "code":
              setLatestCode(event.code || event.data?.code);
              break;

            case "content":
              setContent((prev) => prev + (event.data || event.content || ""));
              break;

            case "error":
              setError(new Error(event.message || event.data?.message));
              break;

            case "done":
              setStatus("Completed");
              break;
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsStreaming(false);
        abortControllerRef.current = null;
      }
    },
    [projectId],
  );

  const stop = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsStreaming(false);
    setStatus("Stopped by user");
  }, []);

  const clear = useCallback(() => {
    setEvents([]);
    setStatus(null);
    setLatestCode(null);
    setContent("");
    setError(null);
  }, []);

  return {
    execute,
    stop,
    isStreaming,
    events,
    status,
    latestCode,
    content,
    error,
    clear,
  };
}
