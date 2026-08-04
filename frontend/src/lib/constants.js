export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const STORAGE_KEYS = {
  TOKEN: "referral_token",
  USER: "referral_user",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
};

export const REFERRAL_REWARD_POINTS = 10;
