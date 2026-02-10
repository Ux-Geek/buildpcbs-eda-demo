import React, { useRef, useEffect } from "react";
import { Send, Sparkles, Maximize2, ArrowRight } from "lucide-react";
import { AppMode, Message } from "@/types";
import { TaskProgress } from "./TaskProgress";
import { AgentTool } from "@/types";

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
                ? "bg-[#0038DF10] border-[#0038DF33] text-[#0038DF]"
                : t.status === "error"
                  ? "bg-[#ff000010] border-[#ff000033] text-[#ff4444]"
                  : "bg-[#ffffff05] border-[#ffffff0a] text-[#888888]"
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
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-[#000] border border-[#ffffff20] rounded p-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
            <div className="font-bold mb-1 border-b border-[#ffffff10] pb-1">
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
}

const MODELS = [
  { id: "gpt-5.2", name: "ChatGPT (GPT-5.2)" },
  { id: "claude-opus-4.6", name: "Claude Opus 4.6" },
  { id: "gemini-3-pro-preview", name: "Gemini 3 Pro" },
];

const ChatInterface: React.FC<Props> = ({
  mode,
  messages,
  streamingMessage,
  onSendMessage,
  onPreview,
  onToggleTask,
  isLoading,
  selectedModel = "gpt-5.2",
  onSelectModel,
  debugEvents,
  debugError,
  debugApiUrl,
  isAuthenticated,
  onLogin,
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

  useEffect(() => {
    scrollToBottom();
  }, [
    messages,
    streamingMessage?.content,
    streamingMessage?.tasks?.length,
    streamingMessage?.tasks?.map((t) => t.status).join(","),
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
        return "relative w-full h-full flex flex-col border-r border-[#ffffff1a] bg-[#0B0D12]";
      default:
        return "";
    }
  })();

  const showExamples = mode === "LANDING" && !isLoading;

  const renderMessageContent = (msg: Message) => (
    <>
      {msg.role === "assistant" && (
        <div className="flex items-center gap-2 mb-2 text-[#0038DF]">
          <Sparkles size={14} />
          <span className="text-[11px] font-bold uppercase tracking-wider">
            Agent
          </span>
        </div>
      )}

      {/* Opening Note */}
      {msg.openingNote && (
        <div className="mb-3 text-[13px] text-gray-400 italic border-l-2 border-[#0038DF] pl-3 py-1 bg-[#0038DF10] rounded-r">
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
        <p className="text-[14px] leading-relaxed whitespace-pre-wrap">
          {msg.content}
        </p>
      )}

      {/* Closing Note */}
      {msg.closingNote && (
        <div className="mt-3 text-[13px] text-gray-400 italic border-l-2 border-green-500 pl-3 py-1 bg-green-500/10 rounded-r">
          {msg.closingNote}
        </div>
      )}

      {/* Preview Action */}
      {msg.previewData && (
        <div className="mt-4 pt-4 border-t border-[#ffffff0a]">
          <div className="flex items-center justify-between bg-[#0B0D12] rounded-[12px] p-3 border border-[#ffffff0a]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0038DF22] flex items-center justify-center text-[#0038DF]">
                <Maximize2 size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] font-medium text-[#EAF0FF]">
                  PCB Generation
                </span>
                <span className="text-[10px] text-[#555555]">
                  Ready to review
                </span>
              </div>
            </div>

            <button
              onClick={() => onPreview(msg.previewData!.changeId)}
              className="px-4 py-2 bg-[#0038DF] text-white rounded-[8px] text-[11px] font-bold hover:bg-[#002db3] transition-colors flex items-center gap-2"
            >
              PREVIEW
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className={`z-40 ${containerClasses}`}>
      {/* Examples for Landing */}
      {showExamples && (
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
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
              className="px-4 py-2 rounded-full bg-[#101422] border border-[#ffffff10] text-[13px] text-[#BBBBBB] hover:border-[#0038DF] hover:text-[#EAF0FF] transition-all"
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
                    ? "bg-[#1A1F2E] text-[#EAF0FF] border border-[#ffffff0a]"
                    : "bg-[#101422] text-[#BBBBBB] border border-[#ffffff1a]"
                }`}
              >
                {renderMessageContent(msg)}
              </div>
            </div>
          ))}

          {/* Streaming Message */}
          {isLoading && streamingMessage && (
            <div className="mb-6 flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="max-w-[85%] rounded-[20px] p-4 bg-[#101422] text-[#BBBBBB] border border-[#ffffff1a] border-l-2 border-l-[#0038DF]">
                {renderMessageContent(streamingMessage)}
              </div>
            </div>
          )}

          {/* Loading Indicator (only if no streaming message yet) */}
          {isLoading && !streamingMessage && (
            <div className="flex justify-start mb-6 px-4">
              <div className="bg-[#101422] rounded-[20px] p-4 border border-[#ffffff1a] flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#0038DF] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#0038DF] animate-bounce delay-150" />
                <div className="w-2 h-2 rounded-full bg-[#0038DF] animate-bounce delay-300" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className={`w-full relative group
          ${
            mode === "LANDING"
              ? "shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]"
              : mode === "SPLIT_VIEW"
                ? "px-4 pb-4"
                : "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
          }
        `}
      >
        {/* Model Selector */}
        {onSelectModel && (
          <div
            ref={selectorRef}
            className={`absolute top-1/2 -translate-y-1/2 left-4 z-20 ${mode === "SPLIT_VIEW" ? "left-6" : "left-6"}`}
          >
            <button
              type="button"
              onClick={() => setShowModelSelector(!showModelSelector)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1F2E] border border-[#ffffff1a] hover:border-[#0038DF] transition-colors text-[11px] font-medium text-[#BBBBBB] hover:text-[#EAF0FF] whitespace-nowrap"
            >
              <Sparkles size={12} className="text-[#0038DF]" />
              <span className="max-w-[150px] truncate">
                {MODELS.find((m) => m.id === selectedModel)?.name || "Model"}
              </span>
            </button>

            {showModelSelector && (
              <div className="absolute bottom-full left-0 mb-2 w-max min-w-[12rem] bg-[#1A1F2E] border border-[#ffffff1a] rounded-[12px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-1 flex flex-col gap-0.5">
                  {MODELS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        onSelectModel(m.id);
                        setShowModelSelector(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-[12px] rounded-[8px] transition-colors whitespace-nowrap ${
                        selectedModel === m.id
                          ? "bg-[#0038DF22] text-[#0038DF] font-medium"
                          : "text-[#BBBBBB] hover:bg-[#ffffff0a] hover:text-[#EAF0FF]"
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          placeholder={
            mode === "LANDING"
              ? "Describe your board architecture..."
              : "Ask a follow-up..."
          }
          className={`w-full bg-[#101422] border border-[#ffffff1a] rounded-[24px] pr-12 text-[#EAF0FF] focus:outline-none focus:ring-1 focus:ring-[#0038DF] transition-all
            ${mode === "LANDING" ? "py-6 text-[18px]" : "py-4 text-[14px]"}
            pl-[200px]
          `}
        />

        <div
          className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-2
            ${mode === "SPLIT_VIEW" ? "right-6" : "right-4"}
        `}
        >
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`
              ${mode === "LANDING" ? "p-3" : "p-2"}
              bg-[#0038DF] text-white rounded-full disabled:bg-[#222222] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#0038DF33]
              flex items-center gap-2
            `}
          >
            {isAuthenticated ? (
              <Send size={mode === "LANDING" ? 20 : 16} />
            ) : (
              <span className="text-[12px] font-bold px-1">Login</span>
            )}
          </button>
        </div>
      </form>

      {/* Debug Panel (optional) */}
      {debugEvents && (
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
      )}
    </div>
  );
};

export default ChatInterface;
