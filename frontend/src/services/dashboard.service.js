import { apiClient } from "./api";

export const dashboardService = {
  getDashboard: async () => {
    const response = await apiClient.get("/dashboard", { auth: true });
    return response.data;
  },
};
