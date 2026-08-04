import { API_BASE_URL } from "@/lib/constants";
import { storage } from "@/lib/storage";

class ApiClient {
  async request(endpoint, options = {}) {
    const { body, auth = false, headers = {}, ...rest } = options;
    const token = storage.getToken();

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...rest,
      headers: {
        "Content-Type": "application/json",
        ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    let payload = null;

    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok) {
      const error = new Error(payload?.message || "Request failed");
      error.statusCode = payload?.statusCode || response.status;
      error.errors = payload?.errors || [];
      throw error;
    }

    return payload;
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: "POST", body });
  }
}

export const apiClient = new ApiClient();
