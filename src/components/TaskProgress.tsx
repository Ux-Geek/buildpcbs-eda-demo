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
      return <Circle size={16} className="text-gray-500" />;
    case "running":
      return <Loader2 size={16} className="text-blue-500 animate-spin" />;
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
    <div className="flex flex-col gap-2 my-3 p-2 bg-[#ffffff05] rounded-lg border border-[#ffffff10]">
      {tasks.map((task) => (
        <div key={task.id} className="flex flex-col">
          <button
            onClick={() => onToggle(task.id)}
            className={`flex items-center gap-3 w-full text-left p-1 rounded hover:bg-[#ffffff05] transition-colors group ${
              task.status === "running" ? "opacity-100" : "opacity-80"
            }`}
          >
            <div className="mt-0.5">
              <TaskStatusIcon status={task.status} />
            </div>

            <span
              className={`text-[13px] flex-1 ${
                task.status === "completed" ? "text-gray-400" : "text-gray-200"
              }`}
            >
              {task.label}
            </span>

            {task.timing && (
              <span className="text-[10px] text-gray-500 font-mono">
                {task.timing}ms
              </span>
            )}

            {(task.details || task.status === "running") && (
              <div className="text-gray-600 group-hover:text-gray-400 transition-colors">
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
            <div className="ml-8 mt-1 p-2 text-[11px] font-mono text-gray-400 bg-[#00000030] rounded border border-[#ffffff05] overflow-x-auto">
              <pre className="whitespace-pre-wrap">{task.details}</pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
