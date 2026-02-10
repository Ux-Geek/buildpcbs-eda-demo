import { get, post } from "./client";
import type {
  CreateProjectRequest,
  CreateProjectResponse,
  ProjectState,
  ForkResponse,
  SnapshotRequest,
} from "./types";

/**
 * Create a new project
 */
export async function createProject(
  name: string,
  description?: string,
  prompt?: string,
  hardwareType?: "ecad" | "mcad" | "full",
): Promise<CreateProjectResponse> {
  const response = await post<{
    success: boolean;
    data: CreateProjectResponse;
  }>("/api/projects", {
    name,
    description,
    prompt,
    hardwareType,
  });
  return response.data;
}

/**
 * Get all projects for the user
 */
export async function getProjects(options?: {
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<any[]> {
  const response = await get<{ success: boolean; data: any[] }>(
    "/api/projects",
    options as any,
  );
  return response.data;
}

/**
 * Get project state (code, BOM, metadata)
 */
export async function getProjectState(
  projectId: string,
): Promise<ProjectState> {
  const response = await get<{ success: boolean; data: ProjectState }>(
    `/api/projects/${projectId}/state`,
  );
  return response.data;
}

/**
 * Fork an existing project to create a copy
 */
export async function forkProject(projectId: string): Promise<ForkResponse> {
  return post(`/api/projects/${projectId}/fork`);
}

/**
 * Create a named snapshot/version (e.g., v1.0, v1.1)
 */
export async function createSnapshot(
  projectId: string,
  version: string,
): Promise<{ id: string }> {
  return post(`/api/projects/${projectId}/snapshot`, { version });
}

/**
 * Get diff between two project versions
 */
export async function getProjectDiff(
  projectId: string,
  fromVersion: string,
  toVersion: string,
): Promise<any> {
  return get(`/api/projects/${projectId}/diff`, {
    from: fromVersion,
    to: toVersion,
  });
}

/**
 * Lock project (freeze for manufacturing)
 */
export async function lockProject(
  projectId: string,
): Promise<{ locked: boolean }> {
  return post(`/api/projects/${projectId}/lock`);
}
