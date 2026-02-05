
import React, { useState } from 'react';
import PCBRenderer from './components/PCBRenderer';
import PromptInterface from './components/PromptInterface';
import LoadingState from './components/LoadingState';
import { Component, ChangeCard, ViewMode } from './types';
import { processPrompt } from './services/geminiService';
import { 
  ChevronDown, 
  ChevronUp, 
  History, 
  Settings, 
  Download
} from 'lucide-react';

const Logo = () => (
  <svg width="100" height="23" viewBox="0 0 100 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
    <rect x="0.637891" y="0.637402" width="25.075" height="21.675" fill="#0038DF"/>
    <rect x="0.637891" y="0.637402" width="25.075" height="21.675" stroke="black" stroke-width="1.275"/>
    <path d="M1.27539 21.6748V11.309H6.92285L10.9567 4.6748L15.7974 17.9431L19.8313 11.7236H25.0754V21.6748H1.27539Z" fill="white"/>
    <path d="M13.1758 11.4748L10.6258 4.6748L6.37578 11.4748H2.12578" stroke="black" stroke-width="1.7" stroke-linecap="square"/>
    <path d="M13.1758 11.4749L15.7258 18.2749L19.9758 11.4749H24.2258" stroke="black" stroke-width="1.7" stroke-linecap="square"/>
    <path d="M35.9062 17.6789C35.4415 17.6789 35.0165 17.6109 34.6312 17.4749C34.2572 17.3502 33.9285 17.1745 33.6452 16.9479C33.3619 16.7212 33.1239 16.4605 32.9312 16.1659L32.7612 17.4749H31.2312V5.23485H32.9312V10.2499C33.2032 9.81919 33.5829 9.45652 34.0702 9.16185C34.5689 8.85585 35.1809 8.70285 35.9062 8.70285C36.7222 8.70285 37.4419 8.90119 38.0652 9.29785C38.6885 9.68319 39.1702 10.2159 39.5102 10.8959C39.8615 11.5645 40.0372 12.3352 40.0372 13.2079C40.0372 14.0579 39.8615 14.8229 39.5102 15.5029C39.1702 16.1829 38.6885 16.7155 38.0652 17.1009C37.4419 17.4862 36.7222 17.6789 35.9062 17.6789ZM35.6342 16.1999C36.1555 16.1999 36.6145 16.0752 37.0112 15.8259C37.4192 15.5765 37.7365 15.2252 37.9632 14.7719C38.2012 14.3185 38.3202 13.7915 38.3202 13.1909C38.3202 12.5902 38.2012 12.0689 37.9632 11.6269C37.7365 11.1735 37.4192 10.8222 37.0112 10.5729C36.6145 10.3122 36.1555 10.1819 35.6342 10.1819C35.1015 10.1819 34.6312 10.3122 34.2232 10.5729C33.8265 10.8222 33.5149 11.1735 33.2882 11.6269C33.0615 12.0689 32.9482 12.5902 32.9482 13.1909C32.9482 13.7915 33.0615 14.3185 33.2882 14.7719C33.5149 15.2252 33.8265 15.5765 34.2232 15.8259C34.6312 16.0752 35.1015 16.1999 35.6342 16.1999ZM44.4872 17.6789C43.8185 17.6789 43.2349 17.5429 42.7362 17.2709C42.2489 16.9989 41.8692 16.5909 41.5972 16.0469C41.3365 15.5029 41.2062 14.8172 41.2062 13.9899V8.90685H42.9062V13.8029C42.9062 14.6075 43.0819 15.2139 43.4332 15.6219C43.7845 16.0299 44.2889 16.2339 44.9462 16.2339C45.3882 16.2339 45.7849 16.1262 46.1362 15.9109C46.4989 15.6955 46.7822 15.3839 46.9862 14.9759C47.1902 14.5679 47.2922 14.0692 47.2922 13.4799V8.90685H48.9922V17.4749H47.4792L47.3602 16.0129C47.0995 16.5342 46.7199 16.9422 46.2212 17.2369C45.7225 17.5315 45.1445 17.6789 44.4872 17.6789ZM50.7587 17.4749V8.90685H52.4587V17.4749H50.7587ZM51.6257 7.29185C51.2971 7.29185 51.0251 7.18985 50.8097 6.98585C50.6057 6.78185 50.5037 6.52119 50.5037 6.20385C50.5037 5.89785 50.6057 5.64852 50.8097 5.45585C51.0251 5.25185 51.2971 5.14985 51.6257 5.14985C51.9431 5.14985 52.2094 5.25185 52.4247 5.45585C52.6401 5.64852 52.7477 5.89785 52.7477 6.20385C52.7477 6.52119 52.6401 6.78185 52.4247 6.98585C52.2094 7.18985 51.9431 7.29185 51.6257 7.29185ZM54.2097 17.4749V5.23485H55.9097V17.4749H54.2097ZM61.3719 17.6789C60.5559 17.6789 59.8363 17.4862 59.2129 17.1009C58.5896 16.7042 58.1023 16.1715 57.7509 15.5029C57.4109 14.8229 57.2409 14.0522 57.2409 13.1909C57.2409 12.3182 57.4109 11.5475 57.7509 10.8789C58.1023 10.2102 58.5896 9.68319 59.2129 9.29785C59.8476 8.90119 60.5729 8.70285 61.3889 8.70285C62.0576 8.70285 62.6469 8.83885 63.1569 9.11085C63.6669 9.37152 64.0636 9.74552 64.3469 10.2329V5.23485H66.0469V17.4749H64.5169L64.3469 16.1489C64.1769 16.4095 63.9559 16.6589 63.6839 16.8969C63.4119 17.1235 63.0833 17.3105 62.6979 17.4579C62.3126 17.6052 61.8706 17.6789 61.3719 17.6789ZM61.6439 16.1999C62.1766 16.1999 62.6469 16.0752 63.0549 15.8259C63.4629 15.5765 63.7746 15.2252 63.9899 14.7719C64.2166 14.3185 64.3299 13.7915 64.3299 13.1909C64.3299 12.5902 64.2166 12.0689 63.9899 11.6269C63.7746 11.1735 63.4629 10.8222 63.0549 10.5729C62.6469 10.3122 62.1766 10.1819 61.6439 10.1819C61.1339 10.1819 60.6749 10.3122 60.2669 10.5729C59.8589 10.8222 59.5416 11.1735 59.3149 11.6269C59.0883 12.0689 58.9749 12.5902 58.9749 13.1909C58.9749 13.7915 59.0883 14.3185 59.3149 14.7719C59.5416 15.2252 59.8589 15.5765 60.2669 15.8259C60.6749 16.0752 61.1339 16.1999 61.6439 16.1999ZM67.6915 21.2149V8.90685H69.2215L69.3915 10.2329C69.5729 9.97219 69.7995 9.72852 70.0715 9.50185C70.3435 9.26385 70.6665 9.07119 71.0405 8.92385C71.4259 8.77652 71.8735 8.70285 72.3835 8.70285C73.1995 8.70285 73.9135 8.90119 74.5255 9.29785C75.1489 9.69452 75.6305 10.2329 75.9705 10.9129C76.3219 11.5815 76.4975 12.3465 76.4975 13.2079C76.4975 14.0692 76.3219 14.8399 75.9705 15.5199C75.6192 16.1885 75.1319 16.7155 74.5085 17.1009C73.8965 17.4862 73.1825 17.6789 72.3665 17.6789C71.6979 17.6789 71.1085 17.5485 70.5985 17.2879C70.0885 17.0159 69.6862 16.6419 69.3915 16.1659V21.2149H67.6915ZM72.0945 16.1999C72.6159 16.1999 73.0749 16.0752 73.4715 15.8259C73.8795 15.5765 74.1969 15.2252 74.4235 14.7719C74.6615 14.3185 74.7805 13.7915 74.7805 13.1909C74.7805 12.5902 74.6615 12.0689 74.4235 11.6269C74.1969 11.1735 73.8795 10.8222 73.4715 10.5729C73.0749 10.3122 72.6159 10.1819 72.0945 10.1819C71.5619 10.1819 71.0915 10.3122 70.6835 10.5729C70.2869 10.8222 69.9752 11.1735 69.7485 11.6269C69.5219 12.0689 69.4085 12.5902 69.4085 13.1909C69.4085 13.7915 69.5219 14.3185 69.7485 14.7719C69.9752 15.2252 70.2869 15.5765 70.6835 15.8259C71.0915 16.0752 71.5619 16.1999 72.0945 16.1999ZM82.4776 17.6789C82.0129 17.6789 81.5879 17.6109 81.2026 17.4749C80.8286 17.3502 80.4999 17.1745 80.2166 16.9479C79.9332 16.7212 79.6952 16.4605 79.5026 16.1659L79.3326 17.4749H77.8026V5.23485H79.5026V10.2499C79.7746 9.81919 80.1542 9.45652 80.6416 9.16185C81.1402 8.85585 81.7522 8.70285 82.4776 8.70285C83.2936 8.70285 84.0132 8.90119 84.6366 9.29785C85.2599 9.68319 85.7416 10.2159 86.0816 10.8959C86.4329 11.5645 86.6086 12.3352 86.6086 13.2079C86.6086 14.0579 86.4329 14.8229 86.0816 15.5029C85.7416 16.1829 85.2599 16.7155 84.6366 17.1009C84.0132 17.4862 83.2936 17.6789 82.4776 17.6789ZM82.2056 16.1999C82.7269 16.1999 83.1859 16.0752 83.5826 15.8259C83.9906 15.5765 84.3079 15.2252 84.5346 14.7719C84.7726 14.3185 84.8916 13.7915 84.8916 13.1909C84.8916 12.5902 84.7726 12.0689 84.5346 11.6269C84.3079 11.1735 83.9906 10.8222 83.5826 10.5729C83.1859 10.3122 82.7269 10.1819 82.2056 10.1819C81.6729 10.1819 81.2026 10.3122 80.7946 10.5729C80.3979 10.8222 80.0862 11.1735 79.8596 11.6269C79.6329 12.0689 79.5196 12.5902 79.5196 13.1909C79.5196 13.7915 79.6329 14.3185 79.8596 14.7719C80.0862 15.2252 80.3979 15.5765 80.7946 15.8259C81.2026 16.0752 81.6729 16.1999 82.2056 16.1999ZM91.8746 17.6789C91.0472 17.6789 90.3106 17.4919 89.6646 17.1179C89.0186 16.7325 88.5086 16.2055 88.1346 15.5369C87.7719 14.8682 87.5906 14.0919 87.5906 13.2079C87.5906 12.3125 87.7719 11.5305 88.1346 10.8619C88.5086 10.1819 89.0186 9.65485 89.6646 9.28085C90.3106 8.89552 91.0472 8.70285 91.8746 8.70285C92.9172 8.70285 93.7899 8.97485 94.4926 9.51885C95.1952 10.0629 95.6429 10.7995 95.8356 11.7289H94.0676C93.9542 11.2302 93.6936 10.8449 93.2856 10.5729C92.8889 10.3009 92.4129 10.1649 91.8576 10.1649C91.4042 10.1649 90.9849 10.2839 90.5996 10.5219C90.2142 10.7485 89.9026 11.0885 89.6646 11.5419C89.4379 11.9839 89.3246 12.5335 89.3246 13.1909C89.3246 13.6782 89.3926 14.1145 89.5286 14.4999C89.6646 14.8739 89.8459 15.1912 90.0726 15.4519C90.3106 15.7125 90.5826 15.9109 90.8886 16.0469C91.1946 16.1715 91.5176 16.2339 91.8576 16.2339C92.2316 16.2339 92.5659 16.1772 92.8606 16.0639C93.1666 15.9392 93.4216 15.7579 93.6256 15.5199C93.8409 15.2819 93.9882 14.9985 94.0676 14.6699H95.8356C95.6429 15.5765 95.1952 16.3075 94.4926 16.8629C93.7899 17.4069 92.9172 17.6789 91.8746 17.6789Z" fill="#444444"/>
  </svg>
);

const App: React.FC = () => {
  const [isLanding, setIsLanding] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [components, setComponents] = useState<Component[]>([]);
  const [history, setHistory] = useState<ChangeCard[]>([]);
  const [view, setView] = useState<ViewMode>('3D');
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const loadingStates = [
    "Compiling PCB architecture...",
    "Arranging core modules...",
    "Defining trace topology...",
    "Simulating signal integrity...",
    "Generating 3D assets..."
  ];

  const handlePrompt = async (text: string) => {
    setIsProcessing(true);
    let stateIdx = 0;
    const interval = setInterval(() => {
      setLoadingText(loadingStates[stateIdx % loadingStates.length]);
      stateIdx++;
    }, 2000);

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
    <div className="relative h-screen w-full bg-[#0B0D12] text-[#BBBBBB] overflow-hidden font-['DM_Sans']">
      
      {/* Immersive Background */}
      <div className={`absolute inset-0 transition-all duration-[1500ms] ${isLanding ? 'opacity-10 scale-125' : 'opacity-100 scale-100'}`}>
        <PCBRenderer components={components} selectedId={null} onSelect={() => {}} />
      </div>

      {/* Landing UI */}
      {isLanding && !isProcessing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
          <div className="mb-12 animate-in fade-in zoom-in-95 duration-1000">
            <Logo />
          </div>
          <h1 className="text-[40px] font-medium text-[#BBBBBB] tracking-[1px] mb-4 text-center leading-[1.1] max-w-[800px] animate-in slide-in-from-top-4 duration-1000">
            What do you want to build?
          </h1>
          <p className="text-[#555555] text-[18px] font-medium tracking-tight mb-12 animate-in fade-in duration-1000 delay-300">
            Design production-ready PCBs with natural language.
          </p>
        </div>
      )}

      {/* Loading Experience */}
      {isProcessing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-[#0B0D12dd] backdrop-blur-3xl animate-in fade-in duration-500">
          <LoadingState text={loadingText || "Initiating..."} />
        </div>
      )}

      {/* Minimal Foldable Navigation */}
      {!isLanding && (
        <div className="absolute top-8 left-8 z-40">
          <div className={`bg-[#101422] border border-[#ffffff1a] rounded-[20px] transition-all duration-300 overflow-hidden shadow-2xl ${isHeaderExpanded ? 'w-[300px]' : 'w-auto'}`}>
            <div 
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-[#ffffff0a]"
              onClick={() => setIsHeaderExpanded(!isHeaderExpanded)}
            >
              <div className="flex-shrink-0 scale-75 origin-left">
                <Logo />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-[13px] font-bold text-[#777777] truncate tracking-tight uppercase">current_file.edat</p>
              </div>
              {isHeaderExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {isHeaderExpanded && (
              <div className="p-3 border-t border-[#ffffff1a] grid grid-cols-3 gap-2">
                {[
                  { icon: History, label: 'History' },
                  { icon: Settings, label: 'Settings' },
                  { icon: Download, label: 'Export' },
                ].map((item) => (
                  <button key={item.label} className="flex flex-col items-center gap-2 p-3 rounded-[14px] text-[#777777] hover:bg-[#ffffff0a] hover:text-[#EAF0FF] transition-all">
                    <item.icon size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fidelity Control */}
      {!isLanding && (
        <div className="absolute top-8 right-8 z-40 flex bg-[#101422] border border-[#ffffff1a] rounded-[16px] p-1 shadow-2xl">
          {(['Schematic', 'Layout', '3D'] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-6 py-2 rounded-[12px] text-[12px] font-bold transition-all ${
                view === v ? 'bg-[#0038DF] text-white shadow-lg' : 'text-[#555555] hover:text-[#BBBBBB]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      {/* Immersive Prompt UI */}
      <PromptInterface 
        isLanding={isLanding} 
        onPrompt={handlePrompt} 
        history={history}
        isLoading={isProcessing}
      />

      {/* Footer / Status */}
      {!isLanding && (
        <div className="absolute bottom-8 right-8 z-40 flex items-center gap-4 bg-[#101422aa] backdrop-blur-md border border-[#ffffff0a] px-4 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#3EE28B]" />
            <span className="text-[11px] font-bold text-[#555555] uppercase tracking-widest">DRC: CLEAN</span>
          </div>
          <div className="w-px h-3 bg-[#ffffff1a]" />
          <span className="text-[11px] font-bold text-[#555555] uppercase tracking-widest">GRID: 0.1MM</span>
        </div>
      )}
    </div>
  );
};

export default App;
