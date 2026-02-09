import { APIError } from "./types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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

  const response = await fetch(url.toString());
  return handleResponse(response);
}

/**
 * Make a POST request
 */
export async function post<T>(endpoint: string, body?: any): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse(response);
}

/**
 * Make a PUT request
 */
export async function put<T>(endpoint: string, body?: any): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse(response);
}

/**
 * Make a DELETE request
 */
export async function del<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
  });
  return handleResponse(response);
}

/**
 * Health check endpoint
 */
export async function healthCheck(): Promise<{ status: string }> {
  return get("/health");
}
