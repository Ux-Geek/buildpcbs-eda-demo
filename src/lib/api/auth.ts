import { post, get } from "./client";

export interface UserProfile {
  id: string;
  privyId: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  walletAddress?: string;
  email?: string;
  isBuilder: boolean;
  createdAt: string;
}

export interface SyncResponse {
  id: string;
  privyId: string;
  isNewUser: boolean;
  synced: boolean;
}

/**
 * Sync the authenticated user with the backend database
 * Call this after successful Privy login
 */
export async function syncUser(): Promise<SyncResponse> {
  const response = await post<{ success: boolean; data: SyncResponse }>(
    "/auth/sync",
  );
  return response.data;
}

/**
 * Get the current authenticated user's profile
 */
export async function getMe(): Promise<UserProfile> {
  const response = await get<{ success: boolean; data: UserProfile }>(
    "/auth/me",
  );
  return response.data;
}
