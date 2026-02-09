import React from "react";
import { LogIn } from "lucide-react";

interface Props {
  onLogin: () => void;
  authenticated: boolean;
}

export const LoginButton: React.FC<Props> = ({ onLogin, authenticated }) => {
  if (authenticated) return null;

  return (
    <button
      onClick={onLogin}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#101422] border border-[#ffffff1a] text-[#EAF0FF] text-[13px] font-medium hover:bg-[#ffffff0a] hover:border-[#0038DF] transition-all shadow-lg"
    >
      <LogIn size={14} className="text-[#0038DF]" />
      <span>Sign In</span>
    </button>
  );
};
