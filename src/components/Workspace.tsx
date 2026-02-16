"use client";

import React, { useState, useEffect, useRef } from "react";
import PCBRenderer from "@/components/PCBRenderer";
import ChatInterface from "@/components/ChatInterface";
import { ProjectSidebar } from "@/components/ProjectSidebar";
import { BOMDisplay } from "@/components/BOMDisplay";
import { Component, ViewMode, AppMode, Message } from "@/types";
import { useAgentStream } from "@/hooks/useAgentStream";
import {
  ChevronDown,
  Download,
  Cpu,
  Layers,
  Box,
  ScrollText,
} from "lucide-react";

import { API_BASE_URL } from "@/lib/api/client";
import { LoginButton } from "@/components/LoginButton";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import {
  createProject,
  getProjectState,
  getProjectStateDebug,
} from "@/lib/api/projects";
import { getChatHistory, getChatHistoryDebug } from "@/lib/api/agent";
import {
  convertSoupToGerberCommands,
  stringifyGerberCommandLayers,
  convertSoupToExcellonDrillCommands,
  stringifyExcellonDrill,
} from "circuit-json-to-gerber";
import JSZip from "jszip";

// Simulation Imports
import { generateNetlist } from "@/lib/simulation/netlistGenerator";
import { Simulator } from "@/lib/simulation/simulator";
import { SimulationCanvas } from "@/components/simulation/SimulationCanvas";

const Logo = () => (
  <svg
    width="100"
    height="23"
    viewBox="0 0 100 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="opacity-90"
  >
    <rect
      x="0.637891"
      y="0.637402"
      width="25.075"
      height="21.675"
      fill="#0038DF"
    />
    <rect
      x="0.637891"
      y="0.637402"
      width="25.075"
      height="21.675"
      stroke="black"
      strokeWidth="1.275"
    />
    <path
      d="M1.27539 21.6748V11.309H6.92285L10.9567 4.6748L15.7974 17.9431L19.8313 11.7236H25.0754V21.6748H1.27539Z"
      fill="white"
    />
    <path
      d="M13.1758 11.4748L10.6258 4.6748L6.37578 11.4748H2.12578"
      stroke="black"
      strokeWidth="1.7"
      strokeLinecap="square"
    />
    <path
      d="M13.1758 11.4749L15.7258 18.2749L19.9758 11.4749H24.2258"
      stroke="black"
      strokeWidth="1.7"
      strokeLinecap="square"
    />
    <path
      d="M35.9062 17.6789C35.4415 17.6789 35.0165 17.6109 34.6312 17.4749C34.2572 17.3502 33.9285 17.1745 33.6452 16.9479C33.3619 16.7212 33.1239 16.4605 32.9312 16.1659L32.7612 17.4749H31.2312V5.23485H32.9312V10.2499C33.2032 9.81919 33.5829 9.45652 34.0702 9.16185C34.5689 8.85585 35.1809 8.70285 35.9062 8.70285C36.7222 8.70285 37.4419 8.90119 38.0652 9.29785C38.6885 9.68319 39.1702 10.2159 39.5102 10.8959C39.8615 11.5645 40.0372 12.3352 40.0372 13.2079C40.0372 14.0579 39.8615 14.8229 39.5102 15.5029C39.1702 16.1829 38.6885 16.7155 38.0652 17.1009C37.4419 17.4862 36.7222 17.6789 35.9062 17.6789ZM35.6342 16.1999C36.1555 16.1999 36.6145 16.0752 37.0112 15.8259C37.4192 15.5765 37.7365 15.2252 37.9632 14.7719C38.2012 14.3185 38.3202 13.7915 38.3202 13.1909C38.3202 12.5902 38.2012 12.0689 37.9632 11.6269C37.7365 11.1735 37.4192 10.8222 37.0112 10.5729C36.6145 10.3122 36.1555 10.1819 35.6342 10.1819C35.1015 10.1819 34.6312 10.3122 34.2232 10.5729C33.8265 10.8222 33.5149 11.1735 33.2882 11.6269C33.0615 12.0689 32.9482 12.5902 32.9482 13.1909C32.9482 13.7915 33.0615 14.3185 33.2882 14.7719C33.5149 15.2252 33.8265 15.5765 34.2232 15.8259C34.6312 16.0752 35.1015 16.1999 35.6342 16.1999ZM44.4872 17.6789C43.8185 17.6789 43.2349 17.5429 42.7362 17.2709C42.2489 16.9989 41.8692 16.5909 41.5972 16.0469C41.3365 15.5029 41.2062 14.8172 41.2062 13.9899V8.90685H42.9062V13.8029C42.9062 14.6075 43.0819 15.2139 43.4332 15.6219C43.7845 16.0299 44.2889 16.2339 44.9462 16.2339C45.3882 16.2339 45.7849 16.1262 46.1362 15.9109C46.4989 15.6955 46.7822 15.3839 46.9862 14.9759C47.1902 14.5679 47.2922 14.0692 47.2922 13.4799V8.90685H48.9922V17.4749H47.4792L47.3602 16.0129C47.0995 16.5342 46.7199 16.9422 46.2212 17.2369C45.7225 17.5315 45.1445 17.6789 44.4872 17.6789ZM50.7587 17.4749V8.90685H52.4587V17.4749H50.7587ZM51.6257 7.29185C51.2971 7.29185 51.0251 7.18985 50.8097 6.98585C50.6057 6.78185 50.5037 6.52119 50.5037 6.20385C50.5037 5.89785 50.6057 5.64852 50.8097 5.45585C51.0251 5.25185 51.2971 5.14985 51.6257 5.14985C51.9431 5.14985 52.2094 5.25185 52.4247 5.45585C52.6401 5.64852 52.7477 5.89785 52.7477 6.20385C52.7477 6.52119 52.6401 6.78185 52.4247 6.98585C52.2094 7.18985 51.9431 7.29185 51.6257 7.29185ZM54.2097 17.4749V5.23485H55.9097V17.4749H54.2097ZM61.3719 17.6789C60.5559 17.6789 59.8363 17.4862 59.2129 17.1009C58.5896 16.7042 58.1023 16.1715 57.7509 15.5029C57.4109 14.8229 57.2409 14.0522 57.2409 13.1909C57.2409 12.3182 57.4109 11.5475 57.7509 10.8789C58.1023 10.2102 58.5896 9.68319 59.2129 9.29785C59.8476 8.90119 60.5729 8.70285 61.3889 8.70285C62.0576 8.70285 62.6469 8.83885 63.1569 9.11085C63.6669 9.37152 64.0636 9.74552 64.3469 10.2329V5.23485H66.0469V17.4749H64.5169L64.3469 16.1489C64.1769 16.4095 63.9559 16.6589 63.6839 16.8969C63.4119 17.1235 63.0833 17.3105 62.6979 17.4579C62.3126 17.6052 61.8706 17.6789 61.3719 17.6789ZM61.6439 16.1999C62.1766 16.1999 62.6469 16.0752 63.0549 15.8259C63.4629 15.5765 63.7746 15.2252 63.9899 14.7719C64.2166 14.3185 64.3299 13.7915 64.3299 13.1909C64.3299 12.5902 64.2166 12.0689 63.9899 11.6269C63.7746 11.1735 63.4629 10.8222 63.0549 10.5729C62.6469 10.3122 62.1766 10.1819 61.6439 10.1819C61.1339 10.1819 60.6749 10.3122 60.2669 10.5729C59.8589 10.8222 59.5416 11.1735 59.3149 11.6269C59.0883 12.0689 58.9749 12.5902 58.9749 13.1909C58.9749 13.7915 59.0883 14.3185 59.3149 14.7719C59.5416 15.2252 59.8589 15.5765 60.2669 15.8259C60.6749 16.0752 61.1339 16.1999 61.6439 16.1999ZM67.6915 21.2149V8.90685H69.2215L69.3915 10.2329C69.5729 9.97219 69.7995 9.72852 70.0715 9.50185C70.3435 9.26385 70.6665 9.07119 71.0405 8.92385C71.4259 8.77652 71.8735 8.70285 72.3835 8.70285C73.1995 8.70285 73.9135 8.90119 74.5255 9.29785C75.1489 9.69452 75.6305 10.2329 75.9705 10.9129C76.3219 11.5815 76.4975 12.3465 76.4975 13.2079C76.4975 14.0692 76.3219 14.8399 75.9705 15.5199C75.6192 16.1885 75.1319 16.7155 74.5085 17.1009C73.8965 17.4862 73.1825 17.6789 72.3665 17.6789C71.6979 17.6789 71.1085 17.5485 70.5985 17.2879C70.0885 17.0159 69.6862 16.6419 69.3915 16.1659V21.2149H67.6915ZM72.0945 16.1999C72.6159 16.1999 73.0749 16.0752 73.4715 15.8259C73.8795 15.5765 74.1969 15.2252 74.4235 14.7719C74.6615 14.3185 74.7805 13.7915 74.7805 13.1909C74.7805 12.5902 74.6615 12.0689 74.4235 11.6269C74.1969 11.1735 73.8795 10.8222 73.4715 10.5729C73.0749 10.3122 72.6159 10.1819 72.0945 10.1819C71.5619 10.1819 71.0915 10.3122 70.6835 10.5729C70.2869 10.8222 69.9752 11.1735 69.7485 11.6269C69.5219 12.0689 69.4085 12.5902 69.4085 13.1909C69.4085 13.7915 69.5219 14.3185 69.7485 14.7719C69.9752 15.2252 70.2869 15.5765 70.6835 15.8259C71.0915 16.0752 71.5619 16.1999 72.0945 16.1999ZM82.4776 17.6789C82.0129 17.6789 81.5879 17.6109 81.2026 17.4749C80.8286 17.3502 80.4999 17.1745 80.2166 16.9479C79.9332 16.7212 79.6952 16.4605 79.5026 16.1659L79.3326 17.4749H77.8026V5.23485H79.5026V10.2499C79.7746 9.81919 80.1542 9.45652 80.6416 9.16185C81.1402 8.85585 81.7522 8.70285 82.4776 8.70285C83.2936 8.70285 84.0132 8.90119 84.6366 9.29785C85.2599 9.68319 85.7416 10.2159 86.0816 10.8959C86.4329 11.5645 86.6086 12.3352 86.6086 13.2079C86.6086 14.0579 86.4329 14.8229 86.0816 15.5029C85.7416 16.1829 85.2599 16.7155 84.6366 17.1009C84.0132 17.4862 83.2936 17.6789 82.4776 17.6789ZM82.2056 16.1999C82.7269 16.1999 83.1859 16.0752 83.5826 15.8259C83.9906 15.5765 84.3079 15.2252 84.5346 14.7719C84.7726 14.3185 84.8916 13.7915 84.8916 13.1909C84.8916 12.5902 84.7726 12.0689 84.5346 11.6269C84.3079 11.1735 83.9906 10.8222 83.5826 10.5729C83.1859 10.3122 82.7269 10.1819 82.2056 10.1819C81.6729 10.1819 81.2026 10.3122 80.7946 10.5729C80.3979 10.8222 80.0862 11.1735 79.8596 11.6269C79.6329 12.0689 79.5196 12.5902 79.5196 13.1909C79.5196 13.7915 79.6329 14.3185 79.8596 14.7719C80.0862 15.2252 80.3979 15.5765 80.7946 15.8259C81.2026 16.0752 81.6729 16.1999 82.2056 16.1999ZM91.8746 17.6789C91.0472 17.6789 90.3106 17.4919 89.6646 17.1179C89.0186 16.7325 88.5086 16.2055 88.1346 15.5369C87.7719 14.8682 87.5906 14.0919 87.5906 13.2079C87.5906 12.3125 87.7719 11.5305 88.1346 10.8619C88.5086 10.1819 89.0186 9.65485 89.6646 9.28085C90.3106 8.89552 91.0472 8.70285 91.8746 8.70285C92.9172 8.70285 93.7899 8.97485 94.4926 9.51885C95.1952 10.0629 95.6429 10.7995 95.8356 11.7289H94.0676C93.9542 11.2302 93.6936 10.8449 93.2856 10.5729C92.8889 10.3009 92.4129 10.1649 91.8576 10.1649C91.4042 10.1649 90.9849 10.2839 90.5996 10.5219C90.2142 10.7485 89.9026 11.0885 89.6646 11.5419C89.4379 11.9839 89.3246 12.5335 89.3246 13.1909C89.3246 13.6782 89.3926 14.1145 89.5286 14.4999C89.6646 14.8739 89.8459 15.1912 90.0726 15.4519C90.3106 15.7125 90.5826 15.9109 90.8886 16.0469C91.1946 16.1715 91.5176 16.2339 91.8576 16.2339C92.2316 16.2339 92.5659 16.1772 92.8606 16.0639C93.1666 15.9392 93.4216 15.7579 93.6256 15.5199C93.8409 15.2819 93.9882 14.9985 94.0676 14.6699H95.8356C95.6429 15.5765 95.1952 16.3075 94.4926 16.8629C93.7899 17.4069 92.9172 17.6789 91.8746 17.6789Z"
      fill="#444444"
    />
  </svg>
);

interface WorkspaceProps {
  initialProjectId?: string;
  className?: string;
  debugMode?: boolean; // Bypass authentication for admin/debug access
}

const viewModeConfig: Record<
  ViewMode,
  { icon: React.ReactNode; label: string }
> = {
  Schematic: { icon: <Cpu size={18} />, label: "Schematic" },
  Layout: { icon: <Layers size={18} />, label: "Layout" },
  "3D": { icon: <Box size={18} />, label: "3D View" },
  BOM: { icon: <ScrollText size={18} />, label: "Bill of Materials" },
};

// Helper function to get last value from simulation arrays
const getLastValue = (arr: number[]) =>
  arr && arr.length > 0 ? arr[arr.length - 1] : 0;

export const Workspace: React.FC<WorkspaceProps> = ({
  initialProjectId,
  debugMode = false,
}) => {
  const router = useRouter();

  // Initialize app mode based on projectId presence
  const [appMode, setAppMode] = useState<AppMode>(
    initialProjectId ? "SPLIT_VIEW" : "LANDING",
  );

  const [messages, setMessages] = useState<Message[]>([]);
  const [components, setComponents] = useState<Component[]>([]);
  const [view, setView] = useState<ViewMode>("3D");
  const [componentContext, setComponentContext] = useState<
    Record<string, string>
  >({});
  const [selectedModel, setSelectedModel] = useState("claude-opus-4-6");
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(
    initialProjectId || null,
  );
  const [displayedCode, setDisplayedCode] = useState<string | null>(null);
  const [codeExplanation, setCodeExplanation] = useState<string | null>(null);
  const [circuitJson, setCircuitJson] = useState<any | null>(null);
  const [bom, setBom] = useState<any[] | null>(null);
  const [showCode, setShowCode] = useState(false);
  const isDev = process.env.NODE_ENV === "development";
  const [authInitTimeout, setAuthInitTimeout] = useState(false);

  // Simulation State
  const [simulationMode, setSimulationMode] = useState(false);
  const [simulationState, setSimulationState] = useState<{
    nodes: Record<string, number>;
    currents: Record<string, number>;
  }>({ nodes: {}, currents: {} });
  const simulatorRef = useRef<Simulator | null>(null);

  const privy = usePrivy();
  const { authenticated, login, logout, user, ready } = privy;

  // Agent Stream Hook - MUST be before any handlers that use 'execute'
  const {
    execute,
    isStreaming,
    status,
    latestCode,
    content,
    tasks,
    openingNote,
    closingNote,
    toggleTask,
    events,
    error,
    tools,
    projectName,
  } = useAgentStream(projectId || "temp-id");

  // Derived State
  const isSplit = appMode === "SPLIT_VIEW";

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setAuthInitTimeout(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sync projectId prop with state
  useEffect(() => {
    if (initialProjectId) {
      setProjectId(initialProjectId);
      setAppMode("SPLIT_VIEW");
    } else {
      setProjectId(null);
      setAppMode("LANDING");
      setMessages([]);
      setDisplayedCode(null);
      setCircuitJson(null);
      setComponents([]);
      setComponentContext({});
    }
  }, [initialProjectId]);

  // Load project history and data
  useEffect(() => {
    async function loadProject() {
      if (!projectId) return;

      if (!authenticated && !debugMode) {
        console.log("Waiting for authentication before loading project...");
        return;
      }

      try {
        const getProjectStateFn = debugMode
          ? getProjectStateDebug
          : getProjectState;
        const getChatHistoryFn = debugMode
          ? getChatHistoryDebug
          : getChatHistory;

        const projectDataPromise = getProjectStateFn(projectId);
        const historyDataPromise = getChatHistoryFn(projectId, { limit: 50 });

        const [projectData, historyData] = await Promise.all([
          projectDataPromise,
          historyDataPromise,
        ]);

        if (historyData?.messages) {
          const loadedMessages: Message[] = historyData.messages.map(
            (msg: any) => ({
              id: msg.id,
              role: msg.role === "user" ? "user" : "assistant",
              content: msg.content,
              timestamp: new Date(msg.createdAt),
              tasks: msg.metadata?.process?.tasks?.map((t: any) => ({
                id: t.id,
                label: t.label,
                status: t.status,
                details: t.result
                  ? JSON.stringify(t.result, null, 2)
                  : t.error || undefined,
                timing: t.timing,
              })),
              openingNote:
                msg.metadata?.process?.openingNote || msg.metadata?.openingNote,
              closingNote:
                msg.metadata?.process?.closingNote || msg.metadata?.closingNote,
            }),
          );
          setMessages((prev) => {
            if (isGenerating && prev.length > 0) {
              const lastMsg = prev[prev.length - 1];
              if (lastMsg.role === "user") {
                const isAlreadyLoaded = loadedMessages.some(
                  (m) =>
                    m.id === lastMsg.id ||
                    (m.role === "user" &&
                      m.content.trim() === lastMsg.content.trim()),
                );

                if (!isAlreadyLoaded) {
                  return [...loadedMessages, lastMsg];
                }
              }
            }
            return loadedMessages;
          });
        }

        if (projectData?.ecadCode) {
          setDisplayedCode(projectData.ecadCode);
          setCodeExplanation(projectData.ecadExplanation || null);
        }

        if (projectData?.circuitJson) {
          setCircuitJson(projectData.circuitJson);
        }

        if (projectData?.specifications?.components) {
          setBom(projectData.specifications.components);
        } else if (projectData?.bom) {
          setBom(projectData.bom);
        }
      } catch (err) {
        console.error("Failed to load project:", err);
      }
    }

    if (projectId) {
      loadProject();
    }
  }, [projectId, authenticated]);

  // Listen for real-time BOM updates from tool executions
  useEffect(() => {
    // specificially look for update_ecad_code tool result
    const lastEvent = events[events.length - 1];
    if (
      lastEvent?.type === "tool_result" &&
      (lastEvent.data?.toolName === "update_ecad_code" ||
        lastEvent.toolName === "update_ecad_code")
    ) {
      const result = lastEvent.data?.toolResult || lastEvent.toolResult;
      if (result?.success && result?.data?.bom) {
        setBom(result.data.bom);
      }
    }
  }, [events]);

  // Handle streaming completion to add final message
  const prevStreamingRef = useRef(false);

  useEffect(() => {
    // Check if we just finished streaming (transition from true -> false)
    if (prevStreamingRef.current && !isStreaming) {
      if (content || tasks.length > 0) {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content,
          timestamp: new Date(),
          tasks: [...tasks], // Create copy to avoid ref issues
          tools: [...tools],
          openingNote: openingNote || undefined,
          closingNote: closingNote || undefined,
        };
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];

          // If the last message was from the USER, then this is a new reply -> ALWAYS ADD IT.
          if (lastMsg && lastMsg.role === "user") {
            return [...prev, aiMsg];
          }

          // Prevent duplicate messages if the last one is identical (Assistant following Assistant)
          // Check content and if it was created very recently (to avoid false positives with history)
          if (
            lastMsg &&
            lastMsg.role === "assistant" &&
            lastMsg.content === content &&
            (new Date().getTime() - new Date(lastMsg.id).getTime() < 5000 ||
              (lastMsg.timestamp &&
                new Date().getTime() - new Date(lastMsg.timestamp).getTime() <
                  5000)) &&
            // Ensure we don't drop messages if tasks or notes are different
            lastMsg.tasks?.length === tasks.length &&
            lastMsg.openingNote === openingNote &&
            lastMsg.closingNote === closingNote
          ) {
            return prev;
          }
          return [...prev, aiMsg];
        });
      }
    }
    prevStreamingRef.current = isStreaming;
  }, [isStreaming, content, tasks, tools, openingNote, closingNote]);

  // Update document title when project name changes
  useEffect(() => {
    if (projectName) {
      document.title = `${projectName} | BuildPCBs`;
    }
  }, [projectName]);

  // Log errors for debugging
  useEffect(() => {
    if (error) {
      console.error("Agent execution error:", error);
    }
  }, [error]);

  // DEBUG: Log circuitJson changes
  useEffect(() => {
    console.log(
      "[Workspace] circuitJson state changed:",
      circuitJson ? "HAS DATA" : "NULL/UNDEFINED",
      circuitJson,
    );
  }, [circuitJson]);

  // DEBUG: Log BOM changes
  useEffect(() => {
    console.log(
      "[Workspace] BOM state changed:",
      bom ? `${bom.length} items` : "NULL/UNDEFINED",
      bom,
    );
  }, [bom]);

  // Sync displayedCode with streaming latestCode
  useEffect(() => {
    if (latestCode) {
      setDisplayedCode(latestCode);
    }
  }, [latestCode]);

  // Real-time BOM update from tool results
  useEffect(() => {
    if (tools && tools.length > 0) {
      const lastTool = tools[tools.length - 1];
      if (
        lastTool.status === "completed" &&
        lastTool.name === "update_ecad_code"
      ) {
        // Direct update from tool result for instant feedback
        if (lastTool.result?.data) {
          console.log("Auto-updating State from tool result");

          if (lastTool.result.data.bom) {
            setBom(lastTool.result.data.bom);
          }

          if (lastTool.result.data.circuitJson) {
            setCircuitJson(lastTool.result.data.circuitJson);
          }
        }

        // Fallback: fetch latest project state to ensure consistency
        if (projectId) {
          const getProjectStateFn = debugMode
            ? getProjectStateDebug
            : getProjectState;
          getProjectStateFn(projectId)
            .then((state) => {
              if (state?.circuitJson && !lastTool.result?.data?.circuitJson) {
                setCircuitJson(state.circuitJson);
              }
              // Optional: sync BOM again just to be sure
              if (state?.bom && !lastTool.result?.data?.bom) {
                setBom(state.bom);
              }
            })
            .catch(console.error);
        }
      }
    }
  }, [tools]);

  // Handlers
  const handlePreview = (changeId: string) => {
    setAppMode("SPLIT_VIEW");
  };

  const handlePrompt = async (text: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    if (appMode === "LANDING") {
      setAppMode("SPLIT_VIEW");
    }

    setIsGenerating(true);

    try {
      let activeProjectId = projectId;

      if (!activeProjectId) {
        try {
          const newProject = await createProject(
            "Untitled Project",
            undefined,
            text,
            "ecad",
          );
          activeProjectId = newProject.id;
          setProjectId(activeProjectId);
          window.history.pushState({}, "", `/p/${activeProjectId}`);
          setAppMode("SPLIT_VIEW");
        } catch (e) {
          console.error("Failed to create project", e);
          setIsGenerating(false);
          return;
        }
      }

      await execute(text, {
        model: selectedModel,
        projectId: activeProjectId!,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleSimulation = async () => {
    if (simulationMode) {
      setSimulationMode(false);
      return;
    }

    // Button is disabled if !circuitJson, so we don't need to alert here
    if (!circuitJson) return;

    setSimulationMode(true);

    try {
      const netlist = generateNetlist(circuitJson);
      console.log("Generated Netlist:", netlist);

      if (!simulatorRef.current) {
        simulatorRef.current = new Simulator();
      }

      simulatorRef.current.loadNetlist(netlist);

      const result = await simulatorRef.current.run();

      const nodes: Record<string, number> = {};
      const currents: Record<string, number> = {};

      Object.keys(result.nodes).forEach(
        (k) => (nodes[k] = getLastValue(result.nodes[k])),
      );
      Object.keys(result.currents).forEach(
        (k) => (currents[k] = getLastValue(result.currents[k])),
      );

      setSimulationState({ nodes, currents });
    } catch (e) {
      console.error("Simulation error:", e);
      alert("Simulation failed. See console for details.");
      setSimulationMode(false);
    }
  };

  const handleExport = async () => {
    if (!circuitJson || !Array.isArray(circuitJson)) {
      alert("No design to export yet! Generate a PCB design first.");
      return;
    }

    try {
      const gerberCommands = convertSoupToGerberCommands(circuitJson);
      const gerberFiles = stringifyGerberCommandLayers(gerberCommands);
      const drillCommands = convertSoupToExcellonDrillCommands({
        circuitJson,
        is_plated: true,
      });
      const drillFile = stringifyExcellonDrill(drillCommands);

      const zip = new JSZip();

      zip.file("project-F_Cu.gbr", gerberFiles.F_Cu);
      zip.file("project-B_Cu.gbr", gerberFiles.B_Cu);
      zip.file("project-F_SilkScreen.gbr", gerberFiles.F_SilkScreen);
      zip.file("project-B_SilkScreen.gbr", gerberFiles.B_SilkScreen);
      zip.file("project-F_Mask.gbr", gerberFiles.F_Mask);
      zip.file("project-B_Mask.gbr", gerberFiles.B_Mask);
      zip.file("project-F_Paste.gbr", gerberFiles.F_Paste);
      zip.file("project-B_Paste.gbr", gerberFiles.B_Paste);
      zip.file("project-Edge_Cuts.gbr", gerberFiles.Edge_Cuts);
      zip.file("project.drl", drillFile);

      if (displayedCode) {
        zip.file("source.tsx", displayedCode);
      }
      zip.file("circuit.json", JSON.stringify(circuitJson, null, 2));

      const zipBlob = await zip.generateAsync({ type: "blob" });

      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pcb-gerbers-${projectId || "untitled"}-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert(
        `Export failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const streamingMessage: Message | undefined = isStreaming
    ? {
        id: "streaming",
        role: "assistant",
        content,
        timestamp: new Date(),
        tasks,
        tools,
        openingNote: openingNote || undefined,
        closingNote: closingNote || undefined,
      }
    : undefined;

  if (!ready && !authInitTimeout) {
    return (
      <div className="h-screen w-screen bg-black text-white flex items-center justify-center">
        <div className="text-white/60 text-sm">
          Initializing authentication...
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-black text-white/70 overflow-hidden font-['DM_Sans']">
      {authenticated && (
        <ProjectSidebar currentProjectId={projectId || undefined} />
      )}

      {appMode !== "LANDING" && (
        <div
          className={`
                absolute
                ${appMode === "CHAT_PREVIEW" ? "inset-0 opacity-10 scale-110 blur-sm" : ""}
                ${appMode === "SPLIT_VIEW" ? "left-[25%] top-0 w-[75%] h-screen opacity-100 scale-100" : "inset-0 w-full"}
            `}
        >
          {showCode ? (
            <div className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] overflow-auto">
              {codeExplanation && (
                <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-blue-400 p-4 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-blue-400 text-lg">💡</div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-blue-300 uppercase tracking-wide mb-1.5">
                        Design Notes
                      </div>
                      <p className="text-sm text-white/90 leading-relaxed">
                        {codeExplanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="p-4">
                <textarea
                  className="w-full h-[calc(100%-1rem)] bg-transparent resize-none focus:outline-none font-mono"
                  value={displayedCode || ""}
                  readOnly
                  spellCheck={false}
                />
              </div>
            </div>
          ) : simulationMode ? (
            <SimulationCanvas
              circuitJson={circuitJson}
              simulationState={simulationState}
            />
          ) : view === "BOM" ? (
            <div className="w-full h-full">
              <BOMDisplay bom={bom} />
            </div>
          ) : (
            <div className="w-full h-full">
              <PCBRenderer
                components={components}
                selectedId={null}
                onSelect={() => {}}
                contextMap={componentContext}
                circuitJson={circuitJson}
                viewMode={view}
              />
            </div>
          )}
        </div>
      )}

      <div
        className={`
                z-40
                ${
                  appMode === "SPLIT_VIEW"
                    ? "fixed left-0 top-0 h-full w-[25%] bg-black border-r border-white/10 shadow-2xl"
                    : "absolute inset-0 pointer-events-none"
                }
            `}
      >
        <div className="w-full h-full pointer-events-auto">
          <ChatInterface
            mode={appMode}
            messages={messages}
            streamingMessage={streamingMessage}
            onSendMessage={handlePrompt}
            onPreview={handlePreview}
            onToggleTask={(taskId) => {
              // 1. Try to toggle in streaming state
              toggleTask(taskId);

              // 2. Try to toggle in historical messages state
              setMessages((prev) =>
                prev.map((msg) => ({
                  ...msg,
                  tasks: msg.tasks?.map((t) =>
                    t.id === taskId ? { ...t, isExpanded: !t.isExpanded } : t,
                  ),
                })),
              );
            }}
            isLoading={isStreaming}
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
            debugEvents={events}
            debugError={error}
            debugApiUrl={`${API_BASE_URL}/agent/execute`}
            isAuthenticated={authenticated}
            onLogin={login}
            error={error}
            streamingStatus={status}
          />
        </div>
      </div>

      {!isSplit && appMode !== "LANDING" && (
        <div className="absolute top-8 right-8 z-40">
          <button
            onClick={() => setAppMode("SPLIT_VIEW")}
            className="bg-[#101422] border border-[#ffffff1a] p-3 rounded-full hover:bg-[#ffffff0a] text-[#777777] hover:text-white transition-all"
          >
            <ChevronDown className="rotate-[-90deg]" size={20} />
          </button>
        </div>
      )}

      {appMode !== "LANDING" && (
        <div
          className={`absolute top-8 left-8 z-40 transition-all duration-500 ${isSplit ? "opacity-0" : "opacity-100"}`}
        >
          <div className="bg-[#101422] border border-[#ffffff1a] rounded-[20px] px-4 py-3 flex items-center gap-3 shadow-xl">
            <div className="scale-75">
              <Logo />
            </div>
            <p className="text-[13px] font-bold text-[#777777] tracking-tight uppercase">
              current_file.edat
            </p>
          </div>
        </div>
      )}

      {isSplit && (
        <div className="absolute top-24 right-8 z-40 flex flex-col gap-3">
          <button
            onClick={handleExport}
            disabled={true}
            className={`
              group relative flex items-center justify-center w-10 h-10 rounded-full transition-all
              bg-black border border-white/10 text-white/70 shadow-2xl
              hover:text-white hover:bg-white/10 hover:border-brand
              disabled:opacity-40 disabled:cursor-not-allowed
            `}
          >
            <Download size={18} />
            <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
              Export (Coming Soon)
            </span>
          </button>

          <button
            onClick={handleToggleSimulation}
            disabled={!circuitJson}
            className={`
              group relative flex items-center justify-center w-10 h-10 rounded-full transition-all
              ${simulationMode ? "bg-green-600 text-white shadow-lg scale-110" : "bg-black border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-green-500"}
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black disabled:hover:border-white/10 disabled:hover:text-white/70
              shadow-2xl
            `}
          >
            {simulationMode ? (
              <div className="w-3 h-3 bg-white rounded-[2px]" />
            ) : (
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-0.5" />
            )}

            <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
              {simulationMode ? "Stop Simulation" : "Simulate"}
            </span>
          </button>

          <div className="flex flex-col gap-2 bg-black border border-white/10 rounded-full p-2 shadow-2xl">
            {(["Schematic", "Layout", "3D", "BOM"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`
                  group relative flex items-center justify-center w-10 h-10 rounded-full transition-all
                  ${
                    view === v
                      ? "bg-[#0038DF] text-white shadow-lg scale-110"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                {viewModeConfig[v].icon}
                <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                  {viewModeConfig[v].label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isDev && appMode === "SPLIT_VIEW" && (
        <div className="absolute bottom-8 right-8 z-50 flex bg-black border border-white/10 rounded-full p-1 shadow-2xl">
          <button
            onClick={() => setShowCode(!showCode)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
              showCode
                ? "bg-[#0038DF] text-white shadow-lg"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>
      )}

      <LoginButton
        onLogin={login}
        authenticated={authenticated}
        onLogout={logout}
        user={user}
        ready={ready}
      />
    </div>
  );
};
