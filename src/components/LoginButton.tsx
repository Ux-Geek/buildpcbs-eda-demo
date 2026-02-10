import React from "react";
import { LogIn } from "lucide-react";

interface Props {
  onLogin: () => void;
  authenticated: boolean;
  onLogout?: () => void;
  user?: any;
}

export const LoginButton: React.FC<Props> = ({
  onLogin,
  authenticated,
  onLogout,
  user,
}) => {
  if (authenticated) {
    return (
      <button
        onClick={onLogout}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#101422] border border-[#ffffff1a] text-[#777777] text-[13px] font-medium hover:bg-[#ffffff0a] hover:text-[#EAF0FF] hover:border-[#EAF0FF] transition-all shadow-lg group"
        title={user?.email?.address || "Sign Out"}
      >
        <div className="w-2 h-2 rounded-full bg-[#00FF94] shadow-[0_0_8px_#00FF94]" />
        <span className="group-hover:hidden">
          {user?.email?.address?.split("@")[0] || "Connected"}
        </span>
        <span className="hidden group-hover:block text-[#FF4444]">
          Sign Out
        </span>
      </button>
    );
  }

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
