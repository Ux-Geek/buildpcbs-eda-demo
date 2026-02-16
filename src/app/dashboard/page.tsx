"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProjects } from "@/lib/api/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  updatedAt: string;
  description?: string;
  hardwareType?: "ecad" | "mcad" | "full";
}

export default function DashboardPage() {
  const { authenticated, user, ready } = usePrivy();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  useEffect(() => {
    if (authenticated) {
      getProjects()
        .then((data) => {
          setProjects(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load projects", err);
          setLoading(false);
        });
    }
  }, [authenticated]);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (!ready || !authenticated) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-white/50" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-white/50">Welcome back, {user?.email?.address}</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            size={18}
          />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-brand/50 transition-colors"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-2xl bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-3xl">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Search className="text-white/20" size={32} />
          </div>
          <h3 className="text-lg font-medium text-white mb-1">
            No projects found
          </h3>
          <p className="text-white/50 max-w-sm mx-auto mb-6">
            {searchTerm
              ? `No projects found matching "${searchTerm}"`
              : "You haven't created any projects yet. Start by creating a new one!"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => router.push("/")}
              className="bg-brand hover:bg-brand/90 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create New Project
            </button>
          )}
        </div>
      )}
    </div>
  );
}
