"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { MoreVertical, Folder, Cpu, Trash2 } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    updatedAt: string;
    description?: string;
  };
  onDelete?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDelete,
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/p/${project.id}`)}
      className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand/50 rounded-2xl p-5 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand/0 to-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
          <Cpu size={20} />
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="p-1 hover:bg-white/10 rounded-md text-white/40 hover:text-white transition-colors">
                <MoreVertical size={16} />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-black border border-white/10 rounded-lg p-1 min-w-[120px] shadow-xl z-50 text-sm"
                align="end"
              >
                <DropdownMenu.Item
                  className="flex items-center gap-2 px-2 py-1.5 text-red-400 hover:bg-white/10 rounded cursor-pointer outline-none"
                  onClick={() => onDelete?.(project.id)}
                >
                  <Trash2 size={14} />
                  Delete
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="font-semibold text-white mb-1 group-hover:text-brand transition-colors">
          {project.name || "Untitled Project"}
        </h3>
        <p className="text-white/50 text-xs line-clamp-2 mb-4 h-8">
          {project.description || "No description provided."}
        </p>

        <div className="flex items-center justify-between text-[11px] text-white/30 border-t border-white/5 pt-3">
          <span className="flex items-center gap-1.5">
            <Folder size={12} />
            Hardware
          </span>
          <span>
            Updated{" "}
            {formatDistanceToNow(new Date(project.updatedAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
