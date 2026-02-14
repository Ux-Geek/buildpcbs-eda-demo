"use client";

import React from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

const Workspace = dynamic(
  () => import("@/components/Workspace").then((mod) => mod.Workspace),
  { ssr: false },
);

export const runtime = "edge";

const ProjectPage: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) return null;

  return <Workspace key={id} initialProjectId={id} />;
};

export default ProjectPage;
