"use client";

import React, { useEffect, useState } from "react";
import { getProjects } from "@/lib/api/projects";
import { useRouter } from "next/navigation";
import { Plus, History, ChevronLeft, ChevronRight, Folder } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  name: string;
  updatedAt: string;
}

interface ProjectSidebarProps {
  currentProjectId?: string;
  className?: string;
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  currentProjectId,
  className = "",
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      getProjects({ limit: 20 })
        .then((data) => setProjects(data))
        .catch((err) => console.error("Failed to load projects", err));
    }
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button */}
      <div
        className={`fixed left-4 top-1/2 -translate-y-1/2 z-50 ${isOpen ? "hidden" : "block"}`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black border border-white/10 p-2 rounded-r-lg hover:bg-white/5 text-white/50 hover:text-white transition-all shadow-xl"
          title="My Projects"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`fixed left-0 top-0 h-full w-[300px] bg-black border-r border-white/10 z-50 flex flex-col shadow-2xl ${className}`}
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-white font-medium text-sm flex items-center gap-2">
                  <Folder size={14} className="text-brand" />
                  My Projects
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/50 hover:text-white p-1"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/");
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors mb-2 border border-dashed border-white/10 hover:border-brand"
                >
                  <div className="w-8 h-8 rounded-full bg-brand/20 flex items-center justify-center text-brand">
                    <Plus size={16} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-medium">New Project</span>
                    <span className="text-[10px] text-white/40">
                      Start from scratch
                    </span>
                  </div>
                </button>

                <div className="space-y-1">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setIsOpen(false);
                        router.push(`/p/${p.id}`);
                      }}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left group
                        ${
                          p.id === currentProjectId
                            ? "bg-[#0038DF]/20 border border-[#0038DF] shadow-[0_0_15px_rgba(0,56,223,0.3)]"
                            : "hover:bg-white/5 border border-transparent hover:border-white/10"
                        }
                      `}
                    >
                      <div
                        className={`w-8 h-8 rounded bg-black flex items-center justify-center ${p.id === currentProjectId ? "text-brand" : "text-white/40 group-hover:text-white/50"}`}
                      >
                        <History size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-xs font-medium truncate ${p.id === currentProjectId ? "text-white" : "text-white/70"}`}
                        >
                          {p.name || "Untitled Project"}
                        </div>
                        <div className="text-[10px] text-white/40">
                          {new Date(p.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Version */}
              <div className="p-4 border-t border-white/10">
                <div className="text-center text-[10px] text-white/30 font-mono">
                  v1.1
                </div>
              </div>{" "}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
