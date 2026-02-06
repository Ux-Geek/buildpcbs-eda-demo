
import React, { useState } from 'react';
import { Send, History as HistoryIcon, X } from 'lucide-react';
import { ChangeCard } from '../types';

interface Props {
  isLanding: boolean;
  onPrompt: (text: string) => void;
  history: ChangeCard[];
  isLoading: boolean;
}

const EXAMPLES = [
  "Dual motor driver with ESP32-S3",
  "High-efficiency buck converter 5V@3A",
  "OLED display carrier for RP2040",
  "LiPo charging circuit with USB-C"
];

const PromptInterface: React.FC<Props> = ({ isLanding, onPrompt, history, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onPrompt(prompt);
    setPrompt('');
    setShowHistory(false);
  };

  return (
    <div 
      className={`absolute transition-all duration-1000 ease-in-out z-40 flex flex-col items-center
        ${isLanding 
          ? 'top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px]' 
          : 'bottom-10 left-1/2 -translate-x-1/2 w-[680px]'
        }`}
    >
      {/* Examples Badges (Landing only) */}
      {isLanding && !isLoading && (
        <div className="flex flex-wrap justify-center gap-2 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
          {EXAMPLES.map((example) => (
            <button
              key={example}
              onClick={() => onPrompt(example)}
              className="px-4 py-2 rounded-full bg-[#101422] border border-[#ffffff10] text-[13px] text-[#BBBBBB] hover:border-[#0038DF] hover:text-[#EAF0FF] transition-all"
            >
              {example}
            </button>
          ))}
        </div>
      )}

      {/* History Popup */}
      {!isLanding && showHistory && (
        <div className="w-full mb-4 bg-[#101422cc] backdrop-blur-2xl border border-[#ffffff1a] rounded-[24px] p-5 max-h-[350px] overflow-y-auto animate-in slide-in-from-bottom-6">
          <div className="flex justify-between items-center mb-4 px-1">
            <span className="text-[12px] font-bold uppercase tracking-widest text-[#777777]">Log</span>
            <button onClick={() => setShowHistory(false)} className="text-[#777777] hover:text-white"><X size={16} /></button>
          </div>
          <div className="space-y-3">
            {history.map((h) => (
              <div key={h.id} className="p-4 bg-[#0B0D12] rounded-[18px] border border-[#ffffff0a] hover:border-[#0038DF33] transition-colors group">
                <div className="flex justify-between items-start">
                  <p className="text-[14px] text-[#EAF0FF] font-medium">{h.intent}</p>
                  <span className="text-[10px] text-[#444444] group-hover:text-[#0038DF]">
                    {h.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-[12px] text-[#777777] mt-1.5 leading-relaxed">{h.description}</p>
              </div>
            ))}
            {history.length === 0 && (
              <div className="text-center py-8 opacity-30 text-[13px]">No modifications yet.</div>
            )}
          </div>
        </div>
      )}

      {/* Main Input Field */}
      <form 
        onSubmit={handleSubmit}
        className="w-full relative group shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] rounded-[24px]"
      >
        <input 
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          placeholder={isLanding ? "Describe your board architecture..." : "Refine layout, add components, or route nets..."}
          className={`w-full bg-[#101422] border border-[#ffffff1a] rounded-[24px] px-8 text-[#EAF0FF] focus:outline-none focus:ring-1 focus:ring-[#0038DF] transition-all
            ${isLanding ? 'py-8 text-[20px]' : 'py-6 text-[16px]'}
          `}
        />
        
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {!isLanding && (
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className={`p-3 rounded-full hover:bg-[#ffffff0a] transition-colors ${showHistory ? 'text-[#0038DF]' : 'text-[#777777]'}`}
            >
              <HistoryIcon size={22} />
            </button>
          )}
          <button 
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="bg-[#0038DF] text-white p-3.5 rounded-full disabled:bg-[#222222] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#0038DF33]"
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInterface;
