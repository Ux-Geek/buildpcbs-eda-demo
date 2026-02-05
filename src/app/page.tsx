"use client";

import React, { useState, useEffect } from 'react';
import PCBRenderer from '@/components/PCBRenderer';
import PromptInterface from '@/components/PromptInterface';
import { Component, ChangeCard, ViewMode } from '@/types';
import { processPrompt } from '@/services/geminiService';
import {
  ChevronDown,
  ChevronUp,
  Cpu,
  History,
  Settings,
  Download,
  MoreHorizontal
} from 'lucide-react';

export default function Home() {
  const [isLanding, setIsLanding] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [components, setComponents] = useState<Component[]>([]);
  const [history, setHistory] = useState<ChangeCard[]>([]);
  const [view, setView] = useState<ViewMode>('Layout');
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const loadingStates = [
    "Synthesizing schematic...",
    "Defining board stackup...",
    "Placing core components...",
    "Routing critical nets...",
    "Verifying DRC constraints..."
  ];

  const handlePrompt = async (text: string) => {
    setIsProcessing(true);
    let stateIdx = 0;
    const interval = setInterval(() => {
      setLoadingText(loadingStates[stateIdx % loadingStates.length]);
      stateIdx++;
    }, 1500);

    try {
      const result = await processPrompt(text, components);
      setComponents(result.updatedComponents);
      setHistory(prev => [result.change, ...prev]);
      if (isLanding) setIsLanding(false);
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(interval);
      setIsProcessing(false);
      setLoadingText('');
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* Background Canvas (Always active but hidden/dimmed on landing) */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLanding ? 'opacity-20 grayscale' : 'opacity-100'}`}>
        <PCBRenderer components={components} selectedId={null} onSelect={() => { }} />
      </div>

      {/* Landing State: Big Bold Header */}
      {isLanding && !isProcessing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
          <h1 className="text-[64px] font-bold text-[#EAF0FF] tracking-tighter mb-8 text-center leading-tight">
            What do you want to build?
          </h1>
        </div>
      )}

      {/* Loading Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#0B0D12aa] backdrop-blur-md">
          <div className="w-16 h-16 border-4 border-[#444444] border-t-[#0033DF] rounded-full animate-spin mb-6" />
          <p className="text-[24px] font-bold text-[#EAF0FF] animate-pulse">
            {loadingText || "Processing request..."}
          </p>
        </div>
      )}

      {/* Top Left Foldable Header */}
      {!isLanding && (
        <div className="absolute top-6 left-6 z-40">
          <div className={`bg-[#101422] border border-[#ffffff1a] rounded-[18px] transition-all duration-300 overflow-hidden ${isHeaderExpanded ? 'w-[280px]' : 'w-auto'}`}>
            <div
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#ffffff0a]"
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
            >
              <div className="w-8 h-8 bg-[#0033DF] rounded-[10px] flex items-center justify-center flex-shrink-0">
                <Cpu className="text-white" size={18} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[14px] font-bold text-[#EAF0FF] truncate">Mock_Project_v1</p>
              </div>
              {isHeaderExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {isHeaderExpanded && (
              <div className="p-2 border-t border-[#ffffff1a] space-y-1">
                {[
                  { icon: History, label: 'History' },
                  { icon: Settings, label: 'Settings' },
                  { icon: Download, label: 'Export' },
                ].map((item) => (
                  <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-[#BBBBBB] hover:bg-[#ffffff0a] hover:text-[#EAF0FF] transition-colors">
                    <item.icon size={16} />
                    <span className="text-[13px] font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* View Mode Switcher (Visible only when not landing) */}
      {!isLanding && (
        <div className="absolute top-6 right-6 z-40 flex bg-[#101422] border border-[#ffffff1a] rounded-[14px] p-1">
          {(['Schematic', 'Layout', '3D'] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-[10px] text-[12px] font-bold transition-all ${view === v ? 'bg-[#0033DF] text-white' : 'text-[#BBBBBB] hover:text-[#EAF0FF]'
                }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      {/* Floating Prompt Interface */}
      <PromptInterface
        isLanding={isLanding}
        onPrompt={handlePrompt}
        history={history}
        isLoading={isProcessing}
      />
    </div>
  );
};
