"use client";

import React, { useEffect, useState } from "react";
import { getProjects } from "@/lib/api/projects";
import { useRouter } from "next/navigation";
import { Plus, History, ChevronLeft, Folder } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  name: string;
  updatedAt: string;
}

interface ProjectSidebarProps {
  currentProjectId?: string;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
  currentProjectId,
  className = "",
  isOpen,
  onClose,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      getProjects({ limit: 20 })
        .then((data) => setProjects(data))
        .catch((err) => console.error("Failed to load projects", err));
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed left-0 top-0 h-full w-[300px] z-50 flex flex-col shadow-2xl ${className}`}
            style={{
              background: "#232323",
              borderRight: "1px solid #3A3A3A",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid #3A3A3A" }}
            >
              <h2 className="font-medium text-sm flex items-center gap-2" style={{ color: "#CCCCCC" }}>
                <Folder size={14} style={{ color: "#0038DF" }} />
                My Projects
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-white/10 transition-colors"
                style={{ color: "#666666" }}
              >
                <ChevronLeft size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
              {/* New Project button */}
              <button
                onClick={() => {
                  onClose();
                  router.push("/");
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors mb-3"
                style={{
                  border: "1px dashed #3A3A3A",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0, 56, 223, 0.15)" }}
                >
                  <Plus size={16} style={{ color: "#4D7AFF" }} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium" style={{ color: "#CCCCCC" }}>
                    New Project
                  </span>
                  <span className="text-[10px]" style={{ color: "#666666" }}>
                    Start from scratch
                  </span>
                </div>
              </button>

              {/* Project list */}
              <div className="space-y-1">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      router.push(`/p/${p.id}`);
                    }}
                    className={`
                      w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left group
                      ${p.id === currentProjectId
                        ? "shadow-sm"
                        : "hover:bg-white/5"
                      }
                    `}
                    style={{
                      border:
                        p.id === currentProjectId
                          ? "1px solid #0038DF"
                          : "1px solid transparent",
                      background:
                        p.id === currentProjectId
                          ? "rgba(0, 56, 223, 0.05)"
                          : undefined,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center"
                      style={{
                        background: "#1A1A1A",
                        color:
                          p.id === currentProjectId ? "#0038DF" : "#999999",
                      }}
                    >
                      <History size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xs font-medium truncate"
                        style={{
                          color:
                            p.id === currentProjectId
                              ? "#FFFFFF"
                              : "#AAAAAA",
                        }}
                      >
                        {p.name || "Untitled Project"}
                      </div>
                      <div className="text-[10px]" style={{ color: "#999999" }}>
                        {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : ""}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Version Footer */}
            <div className="p-4 border-t border-white/10">
              <div className="text-center text-[10px] text-white/30 font-mono">
                v1.1.0
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

  );
};
