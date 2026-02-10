import React, { useState, useRef, useEffect } from "react";
import { LogIn, User, LayoutDashboard, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  onLogin: () => void;
  authenticated: boolean;
  onLogout?: () => void;
  user?: any;
  ready?: boolean;
}

export const LoginButton: React.FC<Props> = ({
  onLogin,
  authenticated,
  onLogout,
  user,
  ready = true,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!ready) {
    return (
      <div className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full bg-black border border-white/10 w-[110px] h-[38px] animate-pulse" />
    );
  }

  if (authenticated) {
    return (
      <div ref={menuRef} className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-white/10 text-white/50 text-[13px] font-medium hover:bg-brand/10 hover:text-white hover:border-brand/50 transition-all shadow-lg"
          title={user?.email?.address || "User Menu"}
        >
          <div className="w-2 h-2 rounded-full bg-[#00FF94] shadow-[0_0_8px_#00FF94]" />
          <span>{user?.email?.address?.split("@")[0] || "Connected"}</span>
        </button>

        {showMenu && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-black border border-white/10 rounded-[12px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-1 flex flex-col gap-0.5">
              <button
                onClick={() => {
                  setShowMenu(false);
                  router.push("/dashboard");
                }}
                className="w-full text-left px-3 py-2 text-[13px] rounded-[8px] transition-colors text-white/70 hover:bg-white/5 hover:text-white flex items-center gap-2"
              >
                <LayoutDashboard size={14} />
                <span>Dashboard</span>
              </button>

              <div className="h-px bg-[#ffffff0a] my-0.5" />

              <button
                onClick={() => {
                  setShowMenu(false);
                  onLogout?.();
                }}
                className="w-full text-left px-3 py-2 text-[13px] rounded-[8px] transition-colors text-[#FF4444] hover:bg-[#ff000010] flex items-center gap-2"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={onLogin}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-white/10 text-white text-[13px] font-medium hover:bg-[#0038DF]/20 hover:border-[#0038DF] hover:shadow-[0_0_15px_rgba(0,56,223,0.4)] transition-all shadow-lg"
    >
      <LogIn size={14} className="text-[#0038DF]" />
      <span>Sign In</span>
    </button>
  );
};
