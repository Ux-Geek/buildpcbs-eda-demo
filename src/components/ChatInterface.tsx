
import React, { useRef, useEffect } from 'react';
import { Send, Sparkles, Maximize2, ArrowRight, ArrowUpRight } from 'lucide-react';
import { AppMode, Message } from '../types';

interface Props {
    mode: AppMode;
    messages: Message[];
    onSendMessage: (text: string) => void;
    onPreview: (changeId: string) => void;
    isLoading: boolean;
}

const ChatInterface: React.FC<Props> = ({ mode, messages, onSendMessage, onPreview, isLoading }) => {
    const [input, setInput] = React.useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        onSendMessage(input);
        setInput('');
    };

    // Determine container classes based on mode
    const containerClasses = (() => {
        switch (mode) {
            case 'LANDING':
                return 'absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px]';
            case 'CHAT_PREVIEW':
                return 'relative w-[720px] mx-auto mt-[10vh] h-[80vh] flex flex-col';
            case 'SPLIT_VIEW':
                return 'relative w-full h-full flex flex-col border-r border-[#ffffff1a] bg-[#0B0D12]';
            default:
                return '';
        }
    })();

    const showExamples = mode === 'LANDING' && !isLoading;

    return (
        <div className={`transition-all duration-700 ease-in-out z-40 ${containerClasses}`}>

            {/* Examples for Landing */}
            {showExamples && (
                <div className="flex flex-wrap justify-center gap-2 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    {["Dual motor driver", "High-efficiency buck converter", "OLED display carrier"].map((ex) => (
                        <button
                            key={ex}
                            onClick={() => onSendMessage(ex)}
                            className="px-4 py-2 rounded-full bg-[#101422] border border-[#ffffff10] text-[13px] text-[#BBBBBB] hover:border-[#0038DF] hover:text-[#EAF0FF] transition-all"
                        >
                            {ex}
                        </button>
                    ))}
                </div>
            )}

            {/* Chat History */}
            {(mode === 'CHAT_PREVIEW' || mode === 'SPLIT_VIEW') && (
                <div className={`flex-1 overflow-y-auto mb-4 custom-scrollbar px-4 ${mode === 'CHAT_PREVIEW' ? '' : 'pt-4'}`}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`mb-6 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[85%] rounded-[20px] p-4 ${msg.role === 'user'
                                        ? 'bg-[#1A1F2E] text-[#EAF0FF] border border-[#ffffff0a]'
                                        : 'bg-[#101422] text-[#BBBBBB] border border-[#ffffff1a]'
                                    }`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center gap-2 mb-2 text-[#0038DF]">
                                        <Sparkles size={14} />
                                        <span className="text-[11px] font-bold uppercase tracking-wider">Agent</span>
                                    </div>
                                )}

                                <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                                {/* Preview Action */}
                                {msg.previewData && (
                                    <div className="mt-4 pt-4 border-t border-[#ffffff0a]">
                                        <div className="flex items-center justify-between bg-[#0B0D12] rounded-[12px] p-3 border border-[#ffffff0a]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#0038DF22] flex items-center justify-center text-[#0038DF]">
                                                    <Maximize2 size={14} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[12px] font-medium text-[#EAF0FF]">PCB Generation</span>
                                                    <span className="text-[10px] text-[#555555]">Ready to review</span>
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
                            </div>
                        </div>
                    ))}

                    {isLoading && (
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
                className={`w-full relative group transition-all duration-500
          ${mode === 'LANDING'
                        ? 'shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]'
                        : mode === 'SPLIT_VIEW'
                            ? 'px-4 pb-4'
                            : 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]'
                    }
        `}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    placeholder={mode === 'LANDING' ? "Describe your board architecture..." : "Ask a follow-up..."}
                    className={`w-full bg-[#101422] border border-[#ffffff1a] rounded-[24px] px-6 text-[#EAF0FF] focus:outline-none focus:ring-1 focus:ring-[#0038DF] transition-all
            ${mode === 'LANDING' ? 'py-6 text-[18px]' : 'py-4 text-[14px]'}
          `}
                />

                <div className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-2
            ${mode === 'SPLIT_VIEW' ? 'right-6' : 'right-4'}
        `}>
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className={`
              ${mode === 'LANDING' ? 'p-3' : 'p-2'}
              bg-[#0038DF] text-white rounded-full disabled:bg-[#222222] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#0038DF33]
            `}
                    >
                        <Send size={mode === 'LANDING' ? 20 : 16} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;
