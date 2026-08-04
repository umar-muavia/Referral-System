import { apiClient } from "./api";

export const authService = {
  register: async ({ name, email, password, referralCode }) => {
    const response = await apiClient.post("/auth/register", {
      name,
      email,
      password,
      ...(referralCode ? { referralCode } : {}),
    });

    return response.data;
  },

  login: async ({ email, password }) => {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  },
};
