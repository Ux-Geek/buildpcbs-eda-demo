
import React, { useRef, useEffect } from 'react';
import { Send, Sparkles, Maximize2, ArrowRight } from 'lucide-react';
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
                return 'absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px]';
            case 'CHAT_PREVIEW':
                return 'relative w-[640px] mx-auto mt-[10vh] h-[80vh] flex flex-col';
            case 'SPLIT_VIEW':
                return 'relative w-full h-full flex flex-col border-r border-gray-200 bg-white';
            default:
                return 'hidden';
        }
    })();

    const showExamples = mode === 'LANDING' && !isLoading;

    return (
        <div className={`transition-all duration-700 ease-in-out z-40 ${containerClasses}`}>

            {/* Examples for Landing */}
            {showExamples && (
                <div className="flex flex-wrap justify-center gap-2 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    {["Dual motor driver", "High-efficiency buck converter", "OLED display carrier"].map((ex) => (
                        <button
                            key={ex}
                            onClick={() => onSendMessage(ex)}
                            className="px-4 py-2 rounded-full bg-white border border-gray-200 text-[13px] text-gray-600 hover:border-[#0038DF] hover:text-[#0038DF] transition-all shadow-sm"
                        >
                            {ex}
                        </button>
                    ))}
                </div>
            )}

            {/* Chat History */}
            {(mode === 'CHAT_PREVIEW' || mode === 'SPLIT_VIEW') && (
                <div className={`flex-1 overflow-y-auto mb-2 custom-scrollbar px-4 ${mode === 'CHAT_PREVIEW' ? '' : 'pt-4'}`}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[90%] rounded-[16px] p-3 text-[14px] leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'bg-white border border-gray-200 text-gray-800'
                                    }`}
                            >
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center gap-1.5 mb-1 text-[#0038DF]">
                                        <Sparkles size={12} />
                                        <span className="text-[10px] font-bold uppercase tracking-wider">Agent</span>
                                    </div>
                                )}

                                <p className="whitespace-pre-wrap">{msg.content}</p>

                                {/* Preview Action */}
                                {msg.previewData && (
                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                        <div className="flex items-center justify-between bg-gray-50 rounded-[10px] p-2 border border-gray-100">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-[#0038DF11] flex items-center justify-center text-[#0038DF]">
                                                    <Maximize2 size={12} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] font-medium text-gray-900">PCB Update</span>
                                                    <span className="text-[9px] text-gray-500">Ready to review</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => onPreview(msg.previewData!.changeId)}
                                                className="px-3 py-1.5 bg-[#0038DF] text-white rounded-[6px] text-[10px] font-bold hover:bg-[#002db3] transition-colors flex items-center gap-1.5 shadow-sm"
                                            >
                                                PREVIEW
                                                <ArrowRight size={10} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start mb-4 px-4">
                            <div className="bg-white rounded-[16px] p-3 border border-gray-200 flex items-center gap-2 shadow-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0038DF] animate-bounce" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0038DF] animate-bounce delay-150" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0038DF] animate-bounce delay-300" />
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            )}

            {/* Input Area */}
            <form
                onSubmit={handleSubmit}
                className={`w-full relative group transition-all duration-500 z-50
          ${mode === 'LANDING'
                        ? 'shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] rounded-[20px]'
                        : mode === 'SPLIT_VIEW'
                            ? 'px-4 pb-4 bg-white'
                            : 'shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] rounded-[20px] bg-white'
                    }
        `}
            >
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    placeholder={mode === 'LANDING' ? "Describe your board architecture..." : "Ask a follow-up..."}
                    className={`w-full bg-white border border-gray-200 rounded-[20px] px-5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0038DF]/20 focus:border-[#0038DF] transition-all shadow-sm
            ${mode === 'LANDING' ? 'py-4 text-[16px]' : 'py-3 text-[14px]'}
          `}
                />

                <div className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-2
            ${mode === 'SPLIT_VIEW' ? 'right-6' : 'right-3'}
        `}>
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className={`
              ${mode === 'LANDING' ? 'p-2' : 'p-1.5'}
              bg-[#0038DF] text-white rounded-full disabled:bg-gray-200 disabled:text-gray-400 transition-all hover:scale-105 active:scale-95 shadow-md shadow-[#0038DF]/20
            `}
                    >
                        <Send size={mode === 'LANDING' ? 18 : 14} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;
