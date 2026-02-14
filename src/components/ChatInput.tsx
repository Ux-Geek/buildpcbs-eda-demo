import React, { useRef, useEffect, useState } from "react";
import { Send, Sparkles, Paperclip, ChevronUp } from "lucide-react";

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
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini" },
  { id: "claude-3-5-sonnet-20241022", name: "Claude 3.5 Sonnet" },
];

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading,
  mode,
  selectedModel = "gemini-2.5-pro",
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
      const newHeight = Math.min(textarea.scrollHeight, 200); // Max height 200px
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  // Handle key press (Enter to send, Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  // Close model selector on click outside
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
        ${isLanding ? "max-w-[720px]" : "max-w-full"}
      `}
    >
      <div
        className={`
          relative flex flex-col bg-black/90 backdrop-blur-md
          border transition-all duration-300
          ${
            isFocused
              ? "border-brand/50 shadow-[0_0_20px_-5px_rgba(0,56,223,0.3)]"
              : isLanding
                ? "border-brand/40 shadow-[0_0_30px_-5px_rgba(0,56,223,0.4)] hover:border-brand/60"
                : "border-white/10 hover:border-white/20"
          }
          ${isLanding ? "rounded-[24px] p-1" : "rounded-t-[20px] rounded-b-none border-b-0 p-2"}
        `}
      >
        {/* Input Area */}
        <div className="flex items-end gap-2 px-3 pt-2 pb-2">
          {/* Model Selector Trigger (Compact) */}
          {onSelectModel && (
            <div className="relative mb-1" ref={selectorRef}>
              <button
                type="button"
                onClick={() => setShowModelSelector(!showModelSelector)}
                className={`
                  p-1.5 rounded-lg flex items-center justify-center transition-colors
                  ${showModelSelector ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70 hover:bg-white/5"}
                `}
                title="Select Model"
              >
                <Sparkles size={16} />
              </button>

              {/* Popup Menu */}
              {showModelSelector && (
                <div className="absolute bottom-full left-0 mb-3 w-48 bg-black border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="p-1.5 flex flex-col gap-0.5">
                    <div className="px-2 py-1.5 text-[10px] font-bold text-white/40 uppercase tracking-wider">
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
                          w-full text-left px-3 py-2 text-[12px] rounded-lg transition-colors
                          ${
                            selectedModel === m.id
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
            className={`flex-1 bg-transparent text-white placeholder-white/30 text-[15px] resize-none focus:outline-none max-h-[200px] py-1.5 custom-scrollbar ${!isAuthenticated ? "cursor-not-allowed opacity-50" : ""}`}
            rows={1}
            disabled={isLoading || !isAuthenticated}
            style={{ minHeight: "24px" }}
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mb-0.5">
            {/* Attachment (Future) */}
            <button
              type="button"
              className="p-2 text-[#555555] hover:text-[#EAF0FF] transition-colors rounded-full hover:bg-[#ffffff0a]"
              title="Add context (Coming soon)"
            >
              <Paperclip size={18} />
            </button>

            <button
              onClick={onSubmit}
              disabled={!isAuthenticated || !value.trim() || isLoading}
              className={`
                p-2 rounded-xl transition-all duration-300 flex items-center justify-center
                ${
                  !isAuthenticated || !value.trim() || isLoading
                    ? "bg-[#0038DF]/50 text-white/30 cursor-not-allowed"
                    : "bg-[#0038DF] text-white hover:bg-[#0038DF]/90 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,56,223,0.5)] border border-[#0038DF]/50"
                }
              `}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Status Bar (Active Model Display) */}
        {!isLanding && (
          <div className="px-4 pb-1.5 flex items-center justify-between">
            <div className="text-[10px] text-white/30 flex items-center gap-1.5 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              {MODELS.find((m) => m.id === selectedModel)?.name}
            </div>
            <div className="text-[10px] text-white/20">
              Return to send · Shift + Return for new line
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
