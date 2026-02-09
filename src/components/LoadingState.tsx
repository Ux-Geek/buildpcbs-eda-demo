
import React from 'react';

interface Props {
  text: string;
}

const LoadingState: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg, 
            rgba(234, 240, 255, 0.2) 0%, 
            rgba(0, 56, 223, 1) 50%, 
            rgba(234, 240, 255, 0.2) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
      <div className="text-[32px] font-bold tracking-tighter shimmer-text transition-all duration-500">
        {text}
      </div>
    </div>
  );
};

export default LoadingState;
