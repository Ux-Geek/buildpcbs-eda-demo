
import React, { useState, useRef, useEffect } from 'react';
import { Send, History as HistoryIcon, X } from 'lucide-react';
import { ChangeCard } from '../types';

interface Props {
  isLanding: boolean;
  onPrompt: (text: string) => void;
  history: ChangeCard[];
  isLoading: boolean;
}

const PromptInterface: React.FC<Props> = ({ isLanding, onPrompt, history, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Placeholder for "movable" logic if expanded
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;
    onPrompt(prompt);
    setPrompt('');
    setShowHistory(false);
  };

  return (
    <div 
      className={`absolute transition-all duration-700 ease-in-out z-40 flex flex-col items-center
        ${isLanding 
          ? 'top-1/2 left-1/2 -translate-x-1/2 translate-y-4 w-[600px]' 
          : 'bottom-8 left-1/2 -translate-x-1/2 w-[600px]'
        }`}
    >
      {/* History Popup (only visible when not landing) */}
      {!isLanding && showHistory && (
        <div className="w-full mb-4 bg-[#101422cc] backdrop-blur-xl border border-[#ffffff1a] rounded-[24px] p-4 max-h-[300px] overflow-y-auto animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#777777]">Prompt History</span>
            <button onClick={() => setShowHistory(false)}><X size={14} /></button>
          </div>
          <div className="space-y-3">
            {history.map((h) => (
              <div key={h.id} className="p-3 bg-[#0B0D12] rounded-[14px] border border-[#ffffff0a]">
                <p className="text-[13px] text-[#EAF0FF] font-medium">{h.intent}</p>
                <p className="text-[11px] text-[#777777] mt-1">{h.description}</p>
              </div>
            ))}
            {history.length === 0 && <p className="text-[12px] text-center opacity-40 py-4">No history yet</p>}
          </div>
        </div>
      )}

      {/* Main Input Field */}
      <form 
        onSubmit={handleSubmit}
        className="w-full relative group"
      >
        <input 
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
          placeholder={isLanding ? "e.g. A dual-motor driver board with ESP32-S3..." : "Modify board or add components..."}
          className={`w-full bg-[#101422] border border-[#ffffff1a] rounded-[20px] py-6 px-8 text-[18px] text-[#EAF0FF] focus:outline-none focus:ring-2 focus:ring-[#0033DF] transition-all shadow-2xl
            ${isLanding ? 'py-8 text-[22px]' : ''}
          `}
        />
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {!isLanding && (
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="p-3 rounded-full hover:bg-[#ffffff0a] text-[#777777] transition-colors"
            >
              <HistoryIcon size={20} />
            </button>
          )}
          <button 
            type="submit"
            disabled={!prompt.trim() || isLoading}
            className="bg-[#0033DF] text-white p-3 rounded-full disabled:bg-[#444444] transition-transform hover:scale-105 active:scale-95"
          >
            <Send size={22} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInterface;
