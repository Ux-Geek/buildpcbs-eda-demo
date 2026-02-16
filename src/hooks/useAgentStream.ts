import { useState, useCallback, useRef } from "react";
import {
  streamAgentExecution,
  type AgentExecuteRequest,
  type SSEEvent,
} from "@/lib/api";
import type { AgentTask, AgentTool } from "@/types";

export type AgentEvent = SSEEvent;

export interface UseAgentStreamReturn {
  /** Start agent execution with streaming */
  execute: (
    prompt: string,
    options?: { model?: string; projectId?: string },
  ) => Promise<void>;

  /** Stop the current stream */
  stop: () => void;

  /** Is the agent currently executing? */
  isStreaming: boolean;

  /** Accumulated events from the stream */
  events: AgentEvent[];

  /** Latest agent status (from 'thinking' events) */
  status: string | null;

  /** List of execution tasks */
  tasks: AgentTask[];

  /** List of tool executions */
  tools: AgentTool[];

  /** Opening note (plan summary) */
  openingNote: string | null;

  /** Closing note (final summary) */
  closingNote: string | null;

  /** Latest generated code (from 'code' events) */
  latestCode: string | null;

  /** Accumulated content (from 'content' events) */
  content: string;

  /** Any error that occurred */
  error: Error | null;

  /** Clear all events and reset state */
  clear: () => void;

  /** Toggle task expansion */
  toggleTask: (taskId: string) => void;

  /** Project name update */
  projectName: string | null;
}

/**
 * React hook for streaming AI Agent execution
 */
export function useAgentStream(projectId: string): UseAgentStreamReturn {
  const [isStreaming, setIsStreaming] = useState(false);
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [tools, setTools] = useState<AgentTool[]>([]);
  const [openingNote, setOpeningNote] = useState<string | null>(null);
  const [closingNote, setClosingNote] = useState<string | null>(null);
  const [latestCode, setLatestCode] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [projectName, setProjectName] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async (
      prompt: string,
      options?: { model?: string; projectId?: string },
    ) => {
      // Reset state
      setIsStreaming(true);
      setEvents([]);
      setStatus(null);
      setLatestCode(null);
      setContent("");
      setError(null);
      setTasks([]);
      setTools([]);
      setOpeningNote(null);
      setClosingNote(null);
      setProjectName(null);

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      try {
        const request: AgentExecuteRequest = {
          projectId: options?.projectId || projectId,
          prompt,
          model: options?.model,
        };

        // Stream agent execution
        for await (const event of streamAgentExecution(request)) {
          // Check if aborted
          if (abortControllerRef.current?.signal.aborted) {
            break;
          }

          console.log("useAgentStream received event:", event);

          const typedEvent: AgentEvent = {
            type: event.type,
            data: event.data || event,
          };

          // Add to events list
          setEvents((prev) => [...prev, typedEvent]);

          // Update specific state based on event type
          switch (event.type) {
            case "thinking":
              setStatus(event.data?.message || event.message);
              break;

            case "task_start":
              setTasks((prev) => {
                const taskId =
                  event.data?.taskId || event.taskId || `task-${Date.now()}`;
                // Prevent duplicates
                if (prev.some((t) => t.id === taskId)) {
                  return prev;
                }
                const label =
                  event.data?.taskLabel ||
                  event.taskLabel ||
                  event.data?.label ||
                  event.label ||
                  event.data?.title ||
                  event.title ||
                  "Unknown Task";

                return [
                  ...prev,
                  {
                    id: taskId,
                    label,
                    status: "running",
                  },
                ];
              });
              break;

            case "task_complete":
              setTasks((prev) =>
                prev.map((t) =>
                  t.id === (event.data?.taskId || event.taskId)
                    ? {
                        ...t,
                        status: "completed",
                        details: event.data?.taskDetails || event.taskDetails,
                        timing: event.data?.taskTiming || event.taskTiming,
                      }
                    : t,
                ),
              );
              break;

            case "task_error":
              setTasks((prev) =>
                prev.map((t) =>
                  t.id === (event.data?.taskId || event.taskId)
                    ? {
                        ...t,
                        status: "error",
                        details: event.data?.error || "Unknown error",
                      }
                    : t,
                ),
              );
              break;

            case "opening_note":
              setOpeningNote(event.data?.note || event.note);
              break;

            case "closing_note":
              setClosingNote(event.data?.note || event.note);
              break;

            case "code":
              setLatestCode(event.code || event.data?.code);
              break;

            case "tool_start":
              setTools((prev) => [
                ...prev,
                {
                  id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  name:
                    event.data?.toolName || event.toolName || "Unknown Tool",
                  args: event.data?.toolArgs || event.toolArgs || {},
                  status: "running",
                  timestamp: new Date(),
                },
              ]);
              break;

            case "tool_result":
              console.log(
                "[useAgentStream] tool_result event received:",
                event,
              );
              setTools((prev) => {
                const toolsReversed = [...prev].reverse();
                const toolIndex = toolsReversed.findIndex(
                  (t) =>
                    t.name === (event.data?.toolName || event.toolName) &&
                    t.status === "running",
                );

                if (toolIndex === -1) {
                  console.warn(
                    "[useAgentStream] No running tool found for result:",
                    event.data?.toolName || event.toolName,
                  );
                  return prev;
                }

                const actualIndex = prev.length - 1 - toolIndex;
                const newTools = [...prev];
                const toolResult = event.data?.toolResult || event.toolResult;

                console.log("[useAgentStream] Tool result extracted:", {
                  toolName: event.data?.toolName || event.toolName,
                  hasResult: !!toolResult,
                  resultKeys: toolResult ? Object.keys(toolResult) : [],
                  hasData: !!toolResult?.data,
                  dataKeys: toolResult?.data
                    ? Object.keys(toolResult.data)
                    : [],
                  hasBom: !!toolResult?.data?.bom,
                  hasCircuitJson: !!toolResult?.data?.circuitJson,
                });

                newTools[actualIndex] = {
                  ...newTools[actualIndex],
                  status: "completed",
                  result: toolResult,
                  timing:
                    Date.now() - newTools[actualIndex].timestamp.getTime(),
                };

                console.log(
                  "[useAgentStream] Updated tool:",
                  newTools[actualIndex],
                );
                return newTools;
              });
              break;

            case "content":
              setContent(
                (prev) => prev + (event.data?.content || event.content || ""),
              );
              break;

            case "error":
              // Fix type error: error is not on top level SSEEvent in types, but is in data
              setError(
                new Error(
                  event.message || event.data?.error || "Unknown error",
                ),
              );
              break;

            case "done":
              setStatus("Completed");
              break;

            case "project_name":
              setProjectName(event.data?.name || event.name);
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
    setTasks([]);
    setTools([]);
    setOpeningNote(null);
    setClosingNote(null);
    setLatestCode(null);
    setContent("");
    setContent("");
    setError(null);
    setProjectName(null);
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, isExpanded: !t.isExpanded } : t,
      ),
    );
  }, []);

  return {
    execute,
    stop,
    isStreaming,
    events,
    status,
    tasks,
    tools,
    openingNote,
    closingNote,
    latestCode,
    content,
    error,
    clear,
    toggleTask,
    projectName,
  };
}
