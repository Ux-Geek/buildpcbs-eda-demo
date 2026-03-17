import React, { useRef, useEffect, useState } from "react";
import { Send, Sparkles, Paperclip } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  mode: "LANDING" | "CHAT" | "SPLIT";
  selectedModel?: string;
  onSelectModel?: (model: string) => void;
  isAuthenticated: boolean;
}

const MODELS = [
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
  { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview" },
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini" },
  { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
  { id: "claude-3-opus-20240229", name: "Claude 3 Opus" },
  { id: "claude-opus-4-6", name: "Claude Opus Preview (4.6)" },
  { id: "claude-sonnet-4-5-20250929", name: "Claude 4.5" },
];

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  mode,
  selectedModel = "gemini-3.1-pro-preview",
  onSelectModel,
  isAuthenticated,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const newHeight = Math.min(textarea.scrollHeight, 160);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLanding = mode === "LANDING";

  return (
    <div
      className={`
        relative w-full transition-all duration-500 ease-out
        ${isLanding ? "max-w-[560px]" : "max-w-full"}
      `}
    >
      <div
        className={`
          relative flex flex-col backdrop-blur-md
          border transition-all duration-300
          ${isFocused
            ? "border-brand/50 shadow-[0_0_20px_-5px_rgba(0,56,223,0.3)]"
            : isLanding
              ? "border-brand/40 shadow-[0_0_30px_-5px_rgba(0,56,223,0.4)] hover:border-brand/60"
              : "border-white/10 hover:border-white/20"
          }
          ${isLanding ? "rounded-[18px] px-2 py-3" : "rounded-[16px] px-[16px] py-[15px]"}
        `}
        style={{ background: "#121212" }}
      >
        {/* Input Area */}
        <div className="relative flex flex-col gap-1">
          <div className="flex items-start gap-1.5">
            {/* Model Selector Trigger - only on landing */}
            {isLanding && onSelectModel && (
              <div className="relative mt-[4px]" ref={selectorRef}>
                <button
                  type="button"
                  onClick={() => setShowModelSelector(!showModelSelector)}
                  className={`
                    p-1 rounded-md flex items-center justify-center transition-colors
                    ${showModelSelector ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"}
                  `}
                  title="Select Model"
                >
                  <Sparkles size={14} />
                </button>

                {showModelSelector && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200"
                    style={{ background: "#1A1A1A" }}
                  >
                    <div className="p-1.5 flex flex-col gap-0.5">
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: "#555555" }}>
                        Select Model
                      </div>
                      {MODELS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            onSelectModel(m.id);
                            setShowModelSelector(false);
                          }}
                          className={`
                            w-full text-left px-3 py-1.5 text-[12px] rounded-lg transition-colors
                            ${selectedModel === m.id
                              ? "bg-white/20 text-white font-medium"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                            }
                          `}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={
                !isAuthenticated
                  ? "Sign in to start generating..."
                  : isLanding
                    ? "Describe your hardware design..."
                    : "Ask a follow-up..."
              }
              className={`flex-1 bg-transparent placeholder-white/30 text-[14px] resize-none focus:outline-none max-h-[160px] ${isLanding ? "py-2.5" : "py-0"} custom-scrollbar ${!isAuthenticated ? "cursor-not-allowed opacity-50" : ""}`}
              rows={1}
              disabled={isLoading || !isAuthenticated}
              style={{
                minHeight: "22px",
                color: "#777777",
                letterSpacing: "-0.015em",
                lineHeight: 1.25,
              }}
            />

            {/* Action Buttons - pinned 4px from top */}
            <div className="flex items-center gap-1 mt-[4px] flex-shrink-0">
              <button
                type="button"
                className="p-1.5 transition-colors rounded-md hover:bg-white/5"
                style={{ color: "#555555" }}
                title="Add context (Coming soon)"
              >
                <Paperclip size={16} />
              </button>

              <button
                onClick={onSubmit}
                disabled={!isAuthenticated || !value.trim() || isLoading}
                className={`
                  p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center
                  ${!isAuthenticated || !value.trim() || isLoading
                    ? "bg-[#0038DF]/50 text-white/30 cursor-not-allowed"
                    : "bg-[#0038DF] text-white hover:bg-[#0038DF]/90 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,56,223,0.4)]"
                  }
                `}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Bottom Status Bar - 4px from bottom */}
          {!isLanding && (
            <div className="flex items-center justify-between mt-[4px]">
              <div className="text-[9px] flex items-center gap-1.5 font-mono" style={{ color: "#555555" }}>
                <span className="w-1 h-1 rounded-full bg-brand"></span>
                {MODELS.find((m) => m.id === selectedModel)?.name}
              </div>
              <div className="text-[9px]" style={{ color: "#444444" }}>
                Return to send · Shift + Return for new line
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
