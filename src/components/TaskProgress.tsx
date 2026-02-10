import React from "react";
import { AgentTask } from "@/types";
import {
  CheckCircle2,
  Circle,
  Loader2,
  XCircle,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface TaskProgressProps {
  tasks: AgentTask[];
  onToggle: (taskId: string) => void;
}

const TaskStatusIcon = ({ status }: { status: AgentTask["status"] }) => {
  switch (status) {
    case "pending":
      return <Circle size={16} className="text-white/30" />;
    case "running":
      return <Loader2 size={16} className="text-brand animate-spin" />;
    case "completed":
      return <CheckCircle2 size={16} className="text-green-500" />;
    case "error":
      return <XCircle size={16} className="text-red-500" />;
  }
};

export const TaskProgress: React.FC<TaskProgressProps> = ({
  tasks,
  onToggle,
}) => {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 my-3 p-2 bg-white/5 rounded-lg border border-white/10">
      {tasks.map((task) => (
        <div key={task.id} className="flex flex-col">
          <button
            onClick={() => onToggle(task.id)}
            className={`flex items-center gap-3 w-full text-left p-1 rounded hover:bg-white/5 transition-colors group ${
              task.status === "running" ? "opacity-100" : "opacity-80"
            }`}
          >
            <div className="mt-0.5">
              <TaskStatusIcon status={task.status} />
            </div>

            <span
              className={`text-[13px] flex-1 ${
                task.status === "completed" ? "text-white/50" : "text-white/80"
              }`}
            >
              {task.label}
            </span>

            {task.timing && (
              <span className="text-[10px] text-white/40 font-mono">
                {task.timing}ms
              </span>
            )}

            {(task.details || task.status === "running") && (
              <div className="text-white/40 group-hover:text-white/60 transition-colors">
                {task.isExpanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </div>
            )}
          </button>

          {/* Collapsible Details */}
          {task.isExpanded && task.details && (
            <div className="ml-8 mt-1 p-2 text-[11px] font-mono text-white/50 bg-black/30 rounded border border-white/5 overflow-x-auto">
              <pre className="whitespace-pre-wrap">{task.details}</pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
