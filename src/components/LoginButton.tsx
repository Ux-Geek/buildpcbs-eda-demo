import React, { useState, useRef, useEffect } from "react";
import {
  LogIn,
  ChevronDown,
  Download,
  Cpu,
  Layers,
  Box,
  ScrollText,
  Activity,
  LayoutDashboard,
  LogOut,
  FolderOpen,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ViewMode } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onLogin: () => void;
  authenticated: boolean;
  onLogout?: () => void;
  user?: any;
  ready?: boolean;
  projectName?: string;
  viewMode?: ViewMode;
  onSetViewMode?: (mode: ViewMode) => void;
  onExport?: () => void;
  showViewControls?: boolean;
  onOpenProjects?: () => void;
}

interface ToolItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  action?: () => void;
  isViewMode?: ViewMode;
}

export const LoginButton: React.FC<Props> = ({
  onLogin,
  authenticated,
  onLogout,
  user,
  ready = true,
  projectName,
  viewMode,
  onSetViewMode,
  onExport,
  showViewControls = false,
  onOpenProjects,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Build tool items for dropdown
  const toolItems: ToolItem[] = [];
  if (showViewControls && onSetViewMode) {
    toolItems.push(
      { id: "schematic", icon: <Cpu size={16} />, label: "Schematic", isViewMode: "Schematic" },
      { id: "layout", icon: <Layers size={16} />, label: "Layout", isViewMode: "Layout" },
      { id: "3d", icon: <Box size={16} />, label: "3D View", isViewMode: "3D" },
      { id: "bom", icon: <ScrollText size={16} />, label: "BOM", isViewMode: "BOM" },
    );
  }
  if (onExport) {
    toolItems.push({ id: "export", icon: <Download size={16} />, label: "Export", action: onExport });
  }
  toolItems.push({ id: "simulation", icon: <Activity size={16} />, label: "Simulation", action: () => { } });

  if (!ready) {
    return (
      <div
        className="fixed top-6 right-6 z-50 w-[140px] h-[40px] animate-pulse rounded-2xl"
        style={{ background: "#232323" }}
      />
    );
  }

  if (authenticated) {
    return (
      <div ref={menuRef} className="fixed top-6 right-6 z-50">
        {/* Main pill button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-3 transition-all cursor-pointer"
          style={{
            background: "#232323",
            border: "0.5px solid #3A3A3A",
            boxShadow: "-2px 2px 16px 2px rgba(0, 0, 0, 0.25)",
            borderRadius: 14,
            height: 40,
          }}
          title={projectName || "Menu"}
        >
          {/* Favicon avatar with green active circle */}
          <div className="relative flex-shrink-0">
            <div
              className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center"
              style={{ background: "#0038DF" }}
            >
              <img
                src="/logo.png"
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full"
              style={{
                background: "#00FF94",
                border: "1.5px solid #232323",
                boxShadow: "0 0 4px #00FF94",
              }}
            />
          </div>

          {/* Project name */}
          <span
            className="select-none whitespace-nowrap"
            style={{
              fontWeight: 500,
              fontSize: 13,
              color: "#777777",
            }}
          >
            {projectName || "Untitled Project"}
          </span>

          <ChevronDown
            size={12}
            className="transition-transform duration-200"
            style={{
              color: "#666666",
              transform: showMenu ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-2 overflow-hidden"
              style={{
                background: "#232323",
                border: "0.5px solid #3A3A3A",
                boxShadow: "-2px 2px 20px 4px rgba(0, 0, 0, 0.4)",
                borderRadius: 14,
              }}
            >
              <div className="p-1.5 flex flex-col gap-0.5">
                {/* Tool icons — icon only with hover tooltip */}
                {toolItems.length > 0 && (
                  <>
                    <div className="flex items-center gap-1 p-1">
                      {toolItems.map((item) => (
                        <div key={item.id} className="relative group">
                          <button
                            onClick={() => {
                              if (item.isViewMode && onSetViewMode) {
                                onSetViewMode(item.isViewMode);
                              } else if (item.action) {
                                item.action();
                              }
                              setShowMenu(false);
                            }}
                            className="p-2 rounded-lg transition-all duration-150 flex items-center justify-center"
                            style={{
                              color:
                                item.isViewMode && viewMode === item.isViewMode
                                  ? "#FFFFFF"
                                  : "#777777",
                              background:
                                item.isViewMode && viewMode === item.isViewMode
                                  ? "rgba(0, 56, 223, 0.3)"
                                  : "transparent",
                            }}
                            onMouseEnter={(e) => {
                              if (!(item.isViewMode && viewMode === item.isViewMode)) {
                                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                                (e.currentTarget as HTMLElement).style.color = "#CCCCCC";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!(item.isViewMode && viewMode === item.isViewMode)) {
                                (e.currentTarget as HTMLElement).style.background = "transparent";
                                (e.currentTarget as HTMLElement).style.color = "#777777";
                              }
                            }}
                          >
                            {item.icon}
                          </button>
                          {/* Hover tooltip */}
                          <div
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50"
                            style={{
                              background: "#111111",
                              color: "#CCCCCC",
                              border: "0.5px solid #3A3A3A",
                            }}
                          >
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mx-1.5" style={{ height: 1, background: "#3A3A3A" }} />
                  </>
                )}

                {/* Projects button */}
                {onOpenProjects && (
                  <button
                    onClick={() => {
                      onOpenProjects();
                      setShowMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[12px] rounded-lg transition-colors flex items-center gap-2.5"
                    style={{ color: "#777777" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLElement).style.color = "#CCCCCC";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#777777";
                    }}
                  >
                    <FolderOpen size={14} />
                    <span>My Projects</span>
                  </button>
                )}

                {/* Dashboard */}
                <button
                  onClick={() => {
                    setShowMenu(false);
                    router.push("/dashboard");
                  }}
                  className="w-full text-left px-3 py-2 text-[12px] rounded-lg transition-colors flex items-center gap-2.5"
                  style={{ color: "#777777" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.color = "#CCCCCC";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#777777";
                  }}
                >
                  <LayoutDashboard size={14} />
                  <span>Dashboard</span>
                </button>

                <div className="mx-1.5" style={{ height: 1, background: "#3A3A3A" }} />

                {/* Sign Out */}
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onLogout?.();
                  }}
                  className="w-full text-left px-3 py-2 text-[12px] rounded-lg transition-colors flex items-center gap-2.5"
                  style={{ color: "#FF4444" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255, 0, 0, 0.06)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Not authenticated
  return (
    <button
      onClick={onLogin}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 text-white text-[13px] font-medium transition-all cursor-pointer"
      style={{
        background: "#232323",
        border: "0.5px solid #3A3A3A",
        boxShadow: "-2px 2px 16px 2px rgba(0, 0, 0, 0.25)",
        borderRadius: 14,
        height: 40,
      }}
    >
      <LogIn size={14} style={{ color: "#0038DF" }} />
      <span>Sign In</span>
    </button>
  );
};
