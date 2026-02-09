import { APIError } from "./types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Global auth token getter - set by PrivyProvider wrapper
 */
let getAuthToken: (() => Promise<string | null>) | null = null;

export function setAuthTokenGetter(getter: () => Promise<string | null>) {
  getAuthToken = getter;
}

/**
 * Get headers with auth token if available
 */
/**
 * Get headers with auth token if available
 */
export async function getHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (getAuthToken) {
    const token = await getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Handle API response and throw APIError if not ok
 */
export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new APIError(
      response.status,
      errorData.message || "API request failed",
      errorData,
    );
  }
  return response.json();
}

/**
 * Make a GET request
 */
export async function get<T>(
  endpoint: string,
  params?: Record<string, string>,
): Promise<T> {
  const url = new URL(endpoint, API_BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const headers = await getHeaders();
  const response = await fetch(url.toString(), { headers });
  return handleResponse(response);
}

/**
 * Make a POST request
 */
export async function post<T>(endpoint: string, body?: any): Promise<T> {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse(response);
}

/**
 * Make a PUT request
 */
export async function put<T>(endpoint: string, body?: any): Promise<T> {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse(response);
}

/**
 * Make a DELETE request
 */
export async function del<T>(endpoint: string): Promise<T> {
  const headers = await getHeaders();
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(response);
}

/**
 * Health check endpoint
 */
export async function healthCheck(): Promise<{ status: string }> {
  return get("/health");
}
