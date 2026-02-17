import React, { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Send,
  Sparkles,
  Maximize2,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";
import { AppMode, Message } from "@/types";
import { TaskProgress } from "./TaskProgress";
import { AgentTool } from "@/types";
import { ChatInput } from "./ChatInput";

const ToolPills: React.FC<{ tools: AgentTool[] }> = ({ tools }) => {
  if (!tools || tools.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-3 px-1">
      {tools.map((t) => (
        <div
          key={t.id}
          className={`
            flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono border transition-colors cursor-help group relative
            ${
              t.status === "running"
                ? "bg-brand/10 border-brand/20 text-brand"
                : t.status === "error"
                  ? "bg-red-500/10 border-red-500/20 text-red-500"
                  : "bg-white/5 border-white/10 text-white/50"
            }
          `}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              t.status === "running"
                ? "bg-[#0038DF] animate-pulse"
                : t.status === "error"
                  ? "bg-[#ff4444]"
                  : "bg-[#555555]"
            }`}
          />
          <span>{t.name}</span>

          {/* Tooltip for args/result */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-black border border-white/20 rounded p-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
            <div className="font-bold mb-1 border-b border-white/10 pb-1">
              Args
            </div>
            <pre className="text-[9px] overflow-hidden whitespace-pre-wrap font-mono text-[#aaa]">
              {JSON.stringify(t.args, null, 2).slice(0, 100)}
              {JSON.stringify(t.args).length > 100 && "..."}
            </pre>
            {t.result && (
              <>
                <div className="font-bold mt-1 mb-1 border-b border-[#ffffff10] pb-1">
                  Result
                </div>
                <pre className="text-[9px] overflow-hidden whitespace-pre-wrap font-mono text-[#aaa]">
                  {JSON.stringify(t.result, null, 2).slice(0, 100)}
                  {JSON.stringify(t.result).length > 100 && "..."}
                </pre>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

interface Props {
  mode: AppMode;
  messages: Message[];
  streamingMessage?: Message;
  onSendMessage: (text: string) => void;
  onPreview: (changeId: string) => void;
  onToggleTask?: (taskId: string) => void;
  isLoading: boolean;
  selectedModel?: string;
  onSelectModel?: (model: string) => void;
  debugEvents?: unknown[];
  debugError?: Error | null;
  debugApiUrl?: string;
  isAuthenticated: boolean;
  onLogin: () => void;
  error?: Error | null;
  streamingStatus?: string | null;
}

const MODELS = [
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
  { id: "gemini-3-pro-preview", name: "Gemini 3 Pro Preview" },
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini" },
  { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
  { id: "claude-3-opus-20240229", name: "Claude 3 Opus" },
  { id: "claude-opus-4-6", name: "Claude Opus Preview (4.6)" },
  { id: "claude-sonnet-4-5-20250929", name: "Claude 4.5" },
];

const ChatInterface: React.FC<Props> = ({
  mode,
  messages,
  streamingMessage,
  onSendMessage,
  onPreview,
  onToggleTask,
  isLoading,
  selectedModel = "claude-opus-4-6",
  onSelectModel,
  debugEvents,
  debugError,
  debugApiUrl,
  isAuthenticated,
  onLogin,
  error,
  streamingStatus,
}) => {
  // ... (existing state)
  const [input, setInput] = React.useState("");
  const [showModelSelector, setShowModelSelector] = React.useState(false);
  const [showDebug, setShowDebug] = React.useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  // Close selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setShowModelSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    // Scroll if a new message is added
    if (messages.length > prevMessagesLength.current) {
      scrollToBottom();
      prevMessagesLength.current = messages.length;
    }
    // Scroll if streaming content changes (but checking this might still be too aggressive if tasks toggle during stream)
    // Actually, for streaming, we usually want to follow the tail.
    // But for historical messages (which is where the issue is), we only want to scroll on add.

    // Let's refine:
    // 1. If we are streaming (isLoading is true), we should probably stick to bottom.
    // 2. If we are NOT streaming, we should only scroll if a new message was added.
  }, [messages.length, isLoading]);

  // Separate effect for streaming content updates to keep it smooth
  useEffect(() => {
    if (isLoading && streamingMessage) {
      scrollToBottom();
    }
  }, [
    isLoading,
    streamingMessage?.content,
    streamingMessage?.tasks?.length,
    // explicitly exclude task expansion state from dependencies
  ]);
  // ... (existing useEffect and handlers)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!isAuthenticated) {
      onLogin();
      return;
    }

    onSendMessage(input);
    setInput("");
  };

  // ... (existing containerClasses logic)
  const containerClasses = (() => {
    switch (mode) {
      case "LANDING":
        return "absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px]";
      case "CHAT_PREVIEW":
        return "relative w-[720px] mx-auto mt-[10vh] h-[80vh] flex flex-col";
      case "SPLIT_VIEW":
        return "relative w-full h-full flex flex-col border-r border-white/10 bg-black";
      default:
        return "";
    }
  })();

  const showExamples = mode === "LANDING" && !isLoading;

  const renderMessageContent = (msg: Message) => {
    console.log("🎨 Rendering message:", {
      id: msg.id,
      role: msg.role,
      hasOpening: !!msg.openingNote,
      hasClosing: !!msg.closingNote,
      hasContent: !!msg.content,
      tasks: msg.tasks?.length || 0,
      tools: msg.tools?.length || 0,
    });
    return (
      <>
        {msg.role === "assistant" && (
          <div className="flex items-center gap-2 mb-2 text-brand">
            <Sparkles size={14} />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Agent
            </span>
          </div>
        )}

        {/* Opening Note */}
        {msg.openingNote && (
          <div className="mb-3 text-[13px] text-white/80 italic border-l-2 border-brand pl-3 py-1 bg-brand/10 rounded-r">
            {msg.openingNote}
          </div>
        )}

        {/* Tool Usage */}
        {msg.tools && <ToolPills tools={msg.tools} />}

        {/* Task Progress */}
        {msg.tasks && msg.tasks.length > 0 && onToggleTask && (
          <div className="mb-4">
            <TaskProgress tasks={msg.tasks} onToggle={onToggleTask} />
          </div>
        )}

        {/* Main Content */}
        {msg.content && (
          <div className="text-[14px] leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-lg font-bold mt-4 mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-base font-bold mt-3 mb-2" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-sm font-bold mt-2 mb-1" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />
                ),
                li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                p: ({ node, ...props }) => (
                  <p className="mb-2 last:mb-0" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-brand hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                code: ({ node, className, children, ...props }: any) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const isInline = !match && !String(children).includes("\n");
                  return isInline ? (
                    <code
                      className="bg-white/10 rounded px-1 py-0.5 font-mono text-[12px] text-brand/90"
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <div className="my-2 rounded-lg overflow-hidden border border-white/10 bg-black/50">
                      <div className="px-3 py-1 bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-wider text-white/40 font-mono flex justify-between">
                        <span>{match?.[1] || "code"}</span>
                      </div>
                      <div className="p-3 overflow-x-auto">
                        <code
                          className={`font-mono text-[12px] ${className}`}
                          {...props}
                        >
                          {children}
                        </code>
                      </div>
                    </div>
                  );
                },
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        )}

        {/* Closing Note */}
        {msg.closingNote && (
          <div className="mt-3 text-[13px] text-white/80 italic border-l-2 border-green-500 pl-3 py-1 bg-green-500/10 rounded-r">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 my-2">
                    {children}
                  </ul>
                ),
                li: ({ children }) => <li className="ml-2">{children}</li>,
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">
                    {children}
                  </strong>
                ),
              }}
            >
              {msg.closingNote}
            </ReactMarkdown>
          </div>
        )}

        {/* Preview Action */}
        {msg.previewData && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between bg-black rounded-[12px] p-3 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand">
                  <Maximize2 size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-medium text-white">
                    PCB Generation
                  </span>
                  <span className="text-[10px] text-white/40">
                    Ready to review
                  </span>
                </div>
              </div>

              <button
                onClick={() => onPreview(msg.previewData!.changeId)}
                className="px-4 py-2 bg-brand text-white rounded-[8px] text-[11px] font-bold hover:bg-brand/80 transition-colors flex items-center gap-2"
              >
                PREVIEW
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className={`z-40 ${containerClasses}`}>
      {/* Logo and Title for Landing */}
      {mode === "LANDING" && (
        <div className="flex flex-col items-center gap-3 mb-12 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white/90">BuildPCBS</span>
            <span className="text-sm font-medium text-white/40 bg-white/5 px-2 py-1 rounded-full border border-white/10">
              BETA
            </span>
          </div>
        </div>
      )}

      {/* Examples for Landing */}
      {showExamples && (
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
          {[
            "Dual motor driver",
            "High-efficiency buck converter",
            "OLED display carrier",
          ].map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setInput(ex);
                // focusing the input
                const inputEl = document.querySelector('input[type="text"]');
                if (inputEl instanceof HTMLElement) inputEl.focus();
              }}
              className="px-4 py-2 rounded-full bg-black border border-white/10 text-[13px] text-white/70 hover:border-brand hover:text-white transition-all"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      {/* Chat History */}
      {(mode === "CHAT_PREVIEW" || mode === "SPLIT_VIEW") && (
        <div
          className={`flex-1 overflow-y-auto mb-4 custom-scrollbar px-4 ${mode === "CHAT_PREVIEW" ? "" : "pt-4"}`}
        >
          {/* Historic Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-6 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-[20px] p-4 ${
                  msg.role === "user"
                    ? "bg-[#0038DF] text-white shadow-[0_4px_20px_rgba(0,56,223,0.3)]"
                    : "bg-black text-white/80 border border-white/10"
                }`}
              >
                {renderMessageContent(msg)}
              </div>
            </div>
          ))}

          {/* Streaming Message */}
          {isLoading && streamingMessage && (
            <div className="mb-6 flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="max-w-[85%] rounded-[20px] p-4 bg-black text-white/70 border border-white/10 border-l-2 border-l-[#0038DF]">
                {renderMessageContent(streamingMessage)}
              </div>
            </div>
          )}

          {/* Loading Indicator (only if no streaming message yet) */}
          {isLoading && !streamingMessage && (
            <div className="flex justify-start mb-6 px-4">
              <div className="bg-black rounded-[20px] p-4 border border-white/10 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#0038DF] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#0038DF] animate-bounce delay-150" />
                <div className="w-2 h-2 rounded-full bg-[#0038DF] animate-bounce delay-300" />
                {streamingStatus && (
                  <span className="text-[13px] text-white/50 animate-pulse ml-2">
                    {streamingStatus}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Persistent Status Indicator (if streaming message exists but still loading) */}
          {isLoading && streamingMessage && streamingStatus && (
            <div className="flex justify-start mb-2 px-6 -mt-4 opacity-70">
              <span className="text-[11px] text-brand/80 font-mono animate-pulse flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-ping" />
                {streamingStatus}...
              </span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mx-4 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-red-500/10 border border-red-500/20 rounded-[12px] p-4 flex items-start gap-3">
                <AlertTriangle
                  className="text-red-400 shrink-0 mt-0.5"
                  size={16}
                />
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] font-medium text-red-200">
                    Something went wrong
                  </span>
                  <span className="text-[12px] text-red-300/80">
                    {error.message ||
                      "An unknown error occurred while processing your request."}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      <div
        className={`w-full flex justify-center z-50
        ${
          mode === "LANDING"
            ? "relative w-[720px] px-0"
            : mode === "SPLIT_VIEW"
              ? "px-4 pb-0 bg-black" // Removed heavy padding/shadow for cleaner look
              : "fixed bottom-8 left-1/2 -translate-x-1/2 w-[720px] px-0"
        }`}
      >
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={() => {
            console.log("ChatInput onSubmit triggered", {
              input,
              isLoading,
              isAuthenticated,
            });
            if (!input.trim() || isLoading) return;
            if (!isAuthenticated) {
              console.log("User not authenticated, calling onLogin");
              onLogin();
              return;
            }
            console.log("Sending message", input);
            onSendMessage(input);
            setInput("");
          }}
          isLoading={isLoading}
          mode={
            mode === "LANDING"
              ? "LANDING"
              : mode === "SPLIT_VIEW"
                ? "SPLIT"
                : "CHAT"
          }
          selectedModel={selectedModel}
          onSelectModel={onSelectModel}
          isAuthenticated={isAuthenticated}
        />
      </div>

      {/* Debug Panel (optional) */}
      {/* {debugEvents && (
        <div className="mt-3 px-4">
          <button
            type="button"
            onClick={() => setShowDebug((prev) => !prev)}
            className="text-[11px] text-[#777777] hover:text-[#EAF0FF] transition-colors"
          >
            {showDebug ? "Hide" : "Show"} debug stream
          </button>

          {showDebug && (
            <div className="mt-2 bg-[#0B0D12] border border-[#ffffff1a] rounded-[12px] p-3 text-[11px] text-[#BBBBBB] max-h-[220px] overflow-y-auto custom-scrollbar">
              <div className="mb-2 text-[#777777]">
                API: {debugApiUrl || "(unknown)"}
              </div>
              {debugError && (
                <div className="mb-2 text-red-400">
                  Error: {debugError.message}
                </div>
              )}
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(debugEvents, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default ChatInterface;
